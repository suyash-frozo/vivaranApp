import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navbar
    home: 'Home',
    features: 'Features',
    about: 'About',
    dashboard: 'Dashboard',
    upload: 'Upload',
    signIn: 'Sign In',
    logout: 'Logout',
    uploadBill: 'Upload Bill',
    
    // Landing Page
    welcomeTitle: 'Welcome to Vivaran',
    welcomeSubtitle: 'Your AI-powered medical bill analyzer',
    welcomeDescription: 'Upload your medical bills and get instant analysis to detect overcharging, understand insurance benefits, and make informed healthcare decisions.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // Upload Page
    medicalBillAssistant: 'Medical Bill Assistant',
    uploadBillsInstant: 'Upload bills and get instant analysis',
    settings: 'Settings',
    analysisSettings: 'Analysis Settings',
    language: 'Language',
    state: 'State',
    insuranceType: 'Insurance Type',
    messagePlaceholder: 'Message Medical Bill Assistant...',
    supportedFiles: 'Supported files: PDF, JPEG, PNG (max 10MB) • Voice input supported • Press Enter to send',
    
    // Common
    english: 'English',
    hindi: 'Hindi',
    general: 'General',
    private: 'Private',
    
    // Features
    featuresTitle: 'Powerful Features',
    featuresSubtitle: 'Everything you need to understand your medical bills',
    
    // About
    aboutTitle: 'About Vivaran',
    aboutDescription: 'We help you understand and analyze your medical bills to ensure fair pricing and maximize your insurance benefits.',
    
    // Tutorial
    tutorialTitle: 'How to Use Vivaran',
    tutorialStep1: 'Upload your medical bill (PDF, JPEG, or PNG)',
    tutorialStep2: 'Our AI analyzes the bill for overcharges and errors',
    tutorialStep3: 'Get detailed insights and recommendations',
    tutorialStep4: 'Understand your insurance benefits and coverage'
  },
  hi: {
    // Navbar
    home: 'होम',
    features: 'विशेषताएं',
    about: 'हमारे बारे में',
    dashboard: 'डैशबोर्ड',
    upload: 'अपलोड',
    signIn: 'साइन इन',
    logout: 'लॉगआउट',
    uploadBill: 'बिल अपलोड करें',
    
    // Landing Page
    welcomeTitle: 'विवरण में आपका स्वागत है',
    welcomeSubtitle: 'आपका AI-संचालित मेडिकल बिल विश्लेषक',
    welcomeDescription: 'अपने मेडिकल बिल अपलोड करें और अधिक चार्ज का पता लगाने, बीमा लाभों को समझने और सूचित स्वास्थ्य सेवा निर्णय लेने के लिए तुरंत विश्लेषण प्राप्त करें।',
    getStarted: 'शुरू करें',
    learnMore: 'और जानें',
    
    // Upload Page
    medicalBillAssistant: 'मेडिकल बिल सहायक',
    uploadBillsInstant: 'बिल अपलोड करें और तुरंत विश्लेषण प्राप्त करें',
    settings: 'सेटिंग्स',
    analysisSettings: 'विश्लेषण सेटिंग्स',
    language: 'भाषा',
    state: 'राज्य',
    insuranceType: 'बीमा प्रकार',
    messagePlaceholder: 'मेडिकल बिल सहायक को संदेश...',
    supportedFiles: 'समर्थित फाइलें: PDF, JPEG, PNG (अधिकतम 10MB) • वॉयस इनपुट समर्थित • भेजने के लिए Enter दबाएं',
    
    // Common
    english: 'अंग्रेजी',
    hindi: 'हिंदी',
    general: 'सामान्य',
    private: 'निजी',
    
    // Features
    featuresTitle: 'शक्तिशाली विशेषताएं',
    featuresSubtitle: 'आपके मेडिकल बिल को समझने के लिए सब कुछ',
    
    // About
    aboutTitle: 'विवरण के बारे में',
    aboutDescription: 'हम आपको अपने मेडिकल बिल को समझने और विश्लेषण करने में मदद करते हैं ताकि निष्पक्ष मूल्य निर्धारण सुनिश्चित हो सके और आपके बीमा लाभों को अधिकतम किया जा सके।',
    
    // Tutorial
    tutorialTitle: 'विवरण का उपयोग कैसे करें',
    tutorialStep1: 'अपना मेडिकल बिल अपलोड करें (PDF, JPEG, या PNG)',
    tutorialStep2: 'हमारा AI अधिक चार्ज और त्रुटियों के लिए बिल का विश्लेषण करता है',
    tutorialStep3: 'विस्तृत अंतर्दृष्टि और सिफारिशें प्राप्त करें',
    tutorialStep4: 'अपने बीमा लाभों और कवरेज को समझें'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('vivaran-language') as 'en' | 'hi';
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    localStorage.setItem('vivaran-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};