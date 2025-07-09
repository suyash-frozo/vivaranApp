import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { MedicalBill } from '../types';

export const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [bills, setBills] = useState<MedicalBill[]>([]);
  const [stats, setStats] = useState({
    totalBills: 0,
    totalSavings: 0,
    pendingAnalysis: 0,
    avgProcessingTime: '2-3 minutes'
  });

  useEffect(() => {
    const mockBills: MedicalBill[] = [
      {
        id: '1',
        userId: currentUser?.id || '',
        fileName: 'Hospital_Bill_Jan_2024.pdf',
        fileType: 'pdf',
        fileSize: 1.2,
        uploadDate: '2024-01-15',
        status: 'completed',
        analysisResult: {
          verdict: 'Overcharges detected',
          totalOvercharge: 1250,
          confidenceScore: 89,
          itemizedCharges: [
            { item: 'Medicine A', chargedAmount: 500, marketPrice: 350, overcharge: 150, category: 'medication' },
            { item: 'Lab Test', chargedAmount: 800, marketPrice: 650, overcharge: 150, category: 'diagnostic' }
          ],
          recommendations: ['Contact insurance for reimbursement', 'Request itemized bill clarification']
        }
      },
      {
        id: '2',
        userId: currentUser?.id || '',
        fileName: 'Clinic_Visit_Feb_2024.jpg',
        fileType: 'jpg',
        fileSize: 0.8,
        uploadDate: '2024-02-10',
        status: 'processing',
      }
    ];

    setBills(mockBills);
    setStats({
      totalBills: mockBills.length,
      totalSavings: mockBills.reduce((sum, bill) => sum + (bill.analysisResult?.totalOvercharge || 0), 0),
      pendingAnalysis: mockBills.filter(bill => bill.status === 'processing').length,
      avgProcessingTime: '2-3 minutes'
    });
  }, [currentUser]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'processing':
        return <Clock className="text-yellow-500" size={20} />;
      case 'error':
        return <AlertTriangle className="text-red-500" size={20} />;
      default:
        return <FileText className="text-gray-500" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Analysis Complete';
      case 'processing':
        return 'Processing...';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {currentUser?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your medical bill analysis dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{stats.totalBills}</h3>
                <p className="text-sm text-gray-600">Total Bills</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">₹{stats.totalSavings}</h3>
                <p className="text-sm text-gray-600">Total Savings</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{stats.pendingAnalysis}</h3>
                <p className="text-sm text-gray-600">Pending Analysis</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{stats.avgProcessingTime}</h3>
                <p className="text-sm text-gray-600">Avg Processing</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Bills</h2>
                  <Link
                    to="/upload"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Upload size={16} />
                    <span>Upload New</span>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {bills.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-lg font-medium text-gray-900">No bills uploaded yet</h3>
                    <p className="text-gray-600 mt-2">
                      Upload your first medical bill to get started with analysis
                    </p>
                    <Link
                      to="/upload"
                      className="mt-4 inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Upload size={20} />
                      <span>Upload Bill</span>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bills.map((bill) => (
                      <div
                        key={bill.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(bill.status)}
                            <div>
                              <h3 className="font-medium text-gray-900">{bill.fileName}</h3>
                              <p className="text-sm text-gray-600">
                                {new Date(bill.uploadDate).toLocaleDateString()} • {bill.fileSize} MB
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {getStatusText(bill.status)}
                            </p>
                            {bill.analysisResult && (
                              <p className="text-sm text-green-600">
                                ₹{bill.analysisResult.totalOvercharge} saved
                              </p>
                            )}
                          </div>
                        </div>
                        {bill.analysisResult && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-700">Verdict</p>
                                <p className="text-sm text-gray-900">{bill.analysisResult.verdict}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700">Confidence</p>
                                <p className="text-sm text-gray-900">{bill.analysisResult.confidenceScore}%</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/upload"
                  className="w-full flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Upload className="text-blue-600" size={20} />
                  <span className="text-blue-700 font-medium">Upload New Bill</span>
                </Link>
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <TrendingUp className="text-green-600" size={20} />
                  <span className="text-green-700 font-medium">View Analytics</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <Calendar className="text-purple-600" size={20} />
                  <span className="text-purple-700 font-medium">Schedule Analysis</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips</h3>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Tip:</strong> Upload clear, high-resolution images for better analysis accuracy.
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> Include your insurance details for more accurate claim recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};