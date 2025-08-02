import React, { useState, useRef } from 'react';
import { 
  Send, 
  Paperclip, 
  FileText, 
  Image, 
  X,
  Loader2,
  Settings,
  Bot,
  User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { validateFile, convertToBase64, getFileFormat, generateDocId } from '../utils/fileUtils';
import { analyzeMedicalBillEnhanced } from '../services/vivaranApi';

interface UploadSettings {
  language: string;
  stateCode: string;
  insuranceType: string;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  file?: File;
  timestamp: Date;
  isLoading?: boolean;
}

export const UploadPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    type: 'bot',
    content: 'Hello! I\'m here to help you analyze your medical bills. You can upload a file and ask me questions about it, or just start a conversation about medical billing.',
    timestamp: new Date()
  }]);
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<UploadSettings>({
    language: 'english',
    stateCode: 'DL',
    insuranceType: 'cghs'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (file: File) => {
    const validation = validateFile(file);
    if (!validation.isValid) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: `Sorry, I can't process this file: ${validation.error}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }
    
    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() && !selectedFile) return;
    if (!currentUser) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText || 'File uploaded for analysis',
      file: selectedFile || undefined,
      timestamp: new Date()
    };

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: 'Analyzing...',
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInputText('');
    const currentFile = selectedFile;
    setSelectedFile(null);

    try {
      if (currentFile) {
        console.log('📁 Processing file:', currentFile.name, 'Size:', currentFile.size);
        
        // Update loading message to show processing status
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: 'Converting file to base64...'
          };
          return updated;
        });
        
        const base64Content = await convertToBase64(currentFile);
        const docId = generateDocId();
        const fileFormat = getFileFormat(currentFile);
        
        // Update loading message
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: 'Sending to analysis server... This may take a moment...'
          };
          return updated;
        });
        
        const result = await analyzeMedicalBillEnhanced(
          base64Content,
          docId,
          currentUser.id,
          fileFormat,
          settings.language,
          settings.stateCode,
          settings.insuranceType,
          inputText || 'Analyze this medical document'
        );
        
        // Parse the actual API response structure based on the provided JSON
        let verdict = 'No verdict available';
        let overcharge = 0;
        let confidence = 0;
        let totalBillAmount = 0;
        let recommendations = [];
        let message = '';
        let aiNotes = '';
        let lineItems = [];
        let queryResponse = '';
        
        // The actual structure has data nested in processing_stages.domain_analysis.result.domain_result
        if (result.processing_stages?.domain_analysis?.result?.domain_result) {
          const domainResult = result.processing_stages.domain_analysis.result.domain_result;
          verdict = domainResult.verdict || verdict;
          overcharge = domainResult.total_overcharge || overcharge;
          confidence = domainResult.confidence_score || confidence;
          totalBillAmount = domainResult.total_bill_amount || 0;
          recommendations = domainResult.recommendations || [];
          message = domainResult.message || '';
          aiNotes = domainResult.ai_analysis_notes || '';
          lineItems = domainResult.line_items || [];
        }
        // Check for final_result format (also present in this response)
        else if (result.final_result?.domain_analysis) {
          const domainAnalysis = result.final_result.domain_analysis;
          verdict = domainAnalysis.verdict || verdict;
          overcharge = domainAnalysis.total_overcharge || overcharge;
          confidence = domainAnalysis.confidence_score || confidence;
          totalBillAmount = domainAnalysis.total_bill_amount || 0;
          recommendations = domainAnalysis.recommendations || [];
          message = domainAnalysis.message || '';
          aiNotes = domainAnalysis.ai_analysis_notes || '';
          lineItems = domainAnalysis.line_items || [];
        }
        // Check for direct final_result format
        else if (result.final_result) {
          verdict = result.final_result.verdict || verdict;
          overcharge = result.final_result.total_overcharge || overcharge;
          confidence = result.final_result.confidence_score || confidence;
        }
        
        // Get query response if available
        queryResponse = result.query_response || '';
        
        let responseContent = `Analysis Complete!\n\n**Verdict:** ${verdict.toUpperCase()}\n\n**Total Bill Amount:** ₹${totalBillAmount.toLocaleString()}\n\n**Total Overcharge:** ₹${overcharge}\n\n**Confidence Score:** ${confidence * 100}%`;
        
        if (lineItems && lineItems.length > 0) {
          responseContent += `\n\n**Line Items:**`;
          lineItems.forEach((item, index) => {
            responseContent += `\n${index + 1}. ${item.description} - ₹${item.amount} (Qty: ${item.quantity})${item.is_suspicious ? ' ⚠️ Suspicious' : ''}`;
          });
        }
        
        if (recommendations.length > 0) {
          responseContent += `\n\n**Recommendations:**\n${recommendations.map(rec => `• ${rec}`).join('\n')}`;
        }
        
        if (aiNotes) {
          responseContent += `\n\n**AI Analysis:** ${aiNotes}`;
        }
        
        if (queryResponse) {
          responseContent += `\n\n**Detailed Analysis:** ${queryResponse}`;
        }
        
        if (message) {
          responseContent += `\n\n**System Notes:** ${message}`;
        }
        
        responseContent += `\n\n**Status:** ${result.success ? '✅ Success' : '❌ Failed'}`;
        
        if (result.doc_id) {
          responseContent += `\n**Document ID:** ${result.doc_id}`;
        }
        
        const botResponse: Message = {
          id: (Date.now() + 2).toString(),
          type: 'bot',
          content: responseContent,
          timestamp: new Date()
        };

        setMessages(prev => prev.slice(0, -1).concat([botResponse]));
        
      } else {
        const botResponse: Message = {
          id: (Date.now() + 2).toString(),
          type: 'bot',
          content: 'I understand you want to discuss medical billing. Please upload a medical bill file if you\'d like me to analyze it, or feel free to ask me any questions about medical billing in general.',
          timestamp: new Date()
        };
        
        setMessages(prev => prev.slice(0, -1).concat([botResponse]));
      }
      
    } catch (err) {
      console.error('❌ Error in handleSendMessage:', err);
      
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'bot',
        content: `Sorry, I encountered an error while analyzing your file:\n\n${err instanceof Error ? err.message : 'Unknown error occurred'}\n\nPlease try again or contact support if the issue persists.`,
        timestamp: new Date()
      };
      
      setMessages(prev => prev.slice(0, -1).concat([errorMessage]));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const getFileIcon = (file: File) => {
    if (file.type === 'application/pdf') {
      return <FileText className="text-red-500" size={24} />;
    }
    return <Image className="text-blue-500" size={24} />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Medical Bill Assistant</h1>
              <p className="text-gray-600 text-sm">
                Upload bills and get instant analysis
              </p>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <Settings size={16} />
              <span>Settings</span>
            </button>
          </div>
          
          {showSettings && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Analysis Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({...settings, language: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    value={settings.stateCode}
                    onChange={(e) => setSettings({...settings, stateCode: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="DL">Delhi</option>
                    <option value="MH">Maharashtra</option>
                    <option value="KA">Karnataka</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="UP">Uttar Pradesh</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Insurance Type
                  </label>
                  <select
                    value={settings.insuranceType}
                    onChange={(e) => setSettings({...settings, insuranceType: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">General</option>
                    <option value="cghs">CGHS</option>
                    <option value="esi">ESI</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`max-w-[85%] p-4 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 shadow-sm'
                  }`}
                >
                  {message.isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="animate-spin" size={16} />
                      <span>{message.content}</span>
                    </div>
                  ) : (
                    <>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      {message.file && (
                        <div className="mt-3 p-3 bg-black/10 rounded-lg flex items-center space-x-2">
                          {getFileIcon(message.file)}
                          <span className="text-sm font-medium">{message.file.name}</span>
                          <span className="text-xs opacity-75">({formatFileSize(message.file.size)})</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Fixed Input Area at Bottom */}
      <div className="bg-white border-t border-gray-200 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* File Preview */}
          {selectedFile && (
            <div className="py-3 border-b border-gray-200">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getFileIcon(selectedFile)}
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-gray-600">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Input Controls */}
          <div className="py-4">
            <div className="flex items-end space-x-3">
              <button
                onClick={handleFileUpload}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Paperclip size={20} />
              </button>
              <div className="flex-1">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Message Medical Bill Assistant..."
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
                  rows={1}
                  style={{
                    minHeight: '44px',
                    maxHeight: '120px',
                    height: 'auto'
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() && !selectedFile}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Supported files: PDF, JPEG, PNG (max 10MB) • Press Enter to send
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  );
};