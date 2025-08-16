import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Search, FileText, Shield, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const TutorialPage: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Upload className="text-blue-600" size={48} />,
      title: t('tutorialStep1'),
      description: 'Drag and drop your medical bill or click to select a file. We support PDF, JPEG, and PNG formats up to 10MB.',
      descriptionHi: 'अपना मेडिकल बिल ड्रैग और ड्रॉप करें या फाइल चुनने के लिए क्लिक करें। हम 10MB तक PDF, JPEG, और PNG फॉर्मेट का समर्थन करते हैं।'
    },
    {
      icon: <Search className="text-green-600" size={48} />,
      title: t('tutorialStep2'),
      description: 'Our advanced AI analyzes your bill line by line, checking for overcharges, duplicate entries, and billing errors.',
      descriptionHi: 'हमारा उन्नत AI आपके बिल का लाइन-बाई-लाइन विश्लेषण करता है, अधिक चार्ज, डुप्लिकेट एंट्री, और बिलिंग त्रुटियों की जांच करता है।'
    },
    {
      icon: <FileText className="text-purple-600" size={48} />,
      title: t('tutorialStep3'),
      description: 'Get comprehensive insights including cost breakdown, suspicious items, and money-saving recommendations.',
      descriptionHi: 'लागत विवरण, संदिग्ध आइटम, और पैसे बचाने की सिफारिशों सहित व्यापक अंतर्दृष्टि प्राप्त करें।'
    },
    {
      icon: <Shield className="text-orange-600" size={48} />,
      title: t('tutorialStep4'),
      description: 'Learn about your insurance coverage, claim eligibility, and how to maximize your benefits.',
      descriptionHi: 'अपने बीमा कवरेज, दावा पात्रता, और अपने लाभों को अधिकतम करने के तरीके के बारे में जानें।'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('tutorialTitle')}
          </h1>
          <p className="text-xl text-gray-600">
            Learn how to analyze your medical bills in 4 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 border border-gray-200"
            >
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full mr-4">
                      Step {index + 1}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {/* {step.description} */}
                    {step.descriptionHi && t('language') === 'Hindi' ? step.descriptionHi : step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Overview */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-gray-900">Overcharge Detection</h4>
                <p className="text-gray-600">Identify inflated prices and unnecessary charges</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-gray-900">Insurance Analysis</h4>
                <p className="text-gray-600">Understand your coverage and claim benefits</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-gray-900">Voice Input</h4>
                <p className="text-gray-600">Ask questions using voice commands in Hindi or English</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-gray-900">Detailed Reports</h4>
                <p className="text-gray-600">Get comprehensive analysis with actionable insights</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="bg-blue-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-blue-100 mb-6">
              Upload your first medical bill and see how much you can save
            </p>
            <Link
              to="/upload"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Analyzing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};