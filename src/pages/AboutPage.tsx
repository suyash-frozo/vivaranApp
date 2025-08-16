import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Users, Award, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t, language } = useLanguage();

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
            {language === 'hi' ? 'होम पर वापस जाएं' : 'Back to Home'}
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('aboutTitle')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('aboutDescription')}
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {language === 'hi' ? 'हमारा मिशन' : 'Our Mission'}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            {language === 'hi' ? (
              <div className="space-y-4">
                <p>
                  विवरण में, हमारा मिशन मेडिकल बिलिंग में पारदर्शिता लाना और मरीजों को उनके स्वास्थ्य सेवा खर्चों के बारे में सूचित निर्णय लेने में मदद करना है। हम मानते हैं कि हर व्यक्ति को अपने मेडिकल बिल को समझने और निष्पक्ष मूल्य निर्धारण सुनिश्चित करने का अधिकार है।
                </p>
                <p>
                  हमारा AI-संचालित प्लेटफॉर्म जटिल मेडिकल बिलों को सरल, समझने योग्य अंतर्दृष्टि में बदल देता है। हम अधिक चार्ज का पता लगाते हैं, बीमा लाभों को स्पष्ट करते हैं, और आपको पैसे बचाने में मदद करते हैं।
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p>
                  At Vivaran, our mission is to bring transparency to medical billing and empower patients to make informed decisions about their healthcare costs. We believe that everyone deserves to understand their medical bills and ensure fair pricing.
                </p>
                <p>
                  Our AI-powered platform transforms complex medical bills into simple, actionable insights. We detect overcharges, clarify insurance benefits, and help you save money on healthcare expenses.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <Shield className="text-blue-600 mr-3" size={32} />
              <h3 className="text-xl font-bold text-gray-900">
                {language === 'hi' ? 'पारदर्शिता' : 'Transparency'}
              </h3>
            </div>
            <p className="text-gray-600">
              {language === 'hi' 
                ? 'हम मेडिकल बिलिंग में स्पष्टता और ईमानदारी को बढ़ावा देते हैं, जिससे मरीज़ों को अपने खर्चों की पूरी जानकारी मिल सके।'
                : 'We promote clarity and honesty in medical billing, ensuring patients have complete visibility into their healthcare costs.'
              }
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <Users className="text-green-600 mr-3" size={32} />
              <h3 className="text-xl font-bold text-gray-900">
                {language === 'hi' ? 'सशक्तिकरण' : 'Empowerment'}
              </h3>
            </div>
            <p className="text-gray-600">
              {language === 'hi' 
                ? 'हम मरीज़ों को उनके स्वास्थ्य सेवा निर्णयों में सशक्त बनाने के लिए आवश्यक जानकारी और उपकरण प्रदान करते हैं।'
                : 'We provide patients with the knowledge and tools they need to take control of their healthcare decisions.'
              }
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <Award className="text-purple-600 mr-3" size={32} />
              <h3 className="text-xl font-bold text-gray-900">
                {language === 'hi' ? 'सटीकता' : 'Accuracy'}
              </h3>
            </div>
            <p className="text-gray-600">
              {language === 'hi' 
                ? 'हमारा AI मॉडल उच्च सटीकता के साथ मेडिकल बिलों का विश्लेषण करता है, जिससे विश्वसनीय परिणाम मिलते हैं।'
                : 'Our AI model analyzes medical bills with high precision, delivering reliable and trustworthy results.'
              }
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <Heart className="text-red-600 mr-3" size={32} />
              <h3 className="text-xl font-bold text-gray-900">
                {language === 'hi' ? 'सहानुभूति' : 'Compassion'}
              </h3>
            </div>
            <p className="text-gray-600">
              {language === 'hi' 
                ? 'हम समझते हैं कि स्वास्थ्य सेवा तनावपूर्ण हो सकती है, इसलिए हम दयालु और सहायक समाधान प्रदान करते हैं।'
                : 'We understand that healthcare can be stressful, so we provide compassionate and supportive solutions.'
              }
            </p>
          </div>
        </div>

        {/* What We Do Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {language === 'hi' ? 'हम क्या करते हैं' : 'What We Do'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {language === 'hi' ? 'बिल विश्लेषण' : 'Bill Analysis'}
              </h4>
              <p className="text-gray-600 text-sm">
                {language === 'hi' 
                  ? 'आपके मेडिकल बिलों का गहन विश्लेषण करके त्रुटियों और अधिक चार्ज का पता लगाते हैं।'
                  : 'Deep analysis of your medical bills to detect errors and overcharges.'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600" size={32} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {language === 'hi' ? 'बीमा मार्गदर्शन' : 'Insurance Guidance'}
              </h4>
              <p className="text-gray-600 text-sm">
                {language === 'hi' 
                  ? 'आपके बीमा लाभों को समझने और अधिकतम कवरेज प्राप्त करने में सहायता।'
                  : 'Help you understand your insurance benefits and maximize coverage.'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="text-purple-600" size={32} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {language === 'hi' ? 'लागत बचत' : 'Cost Savings'}
              </h4>
              <p className="text-gray-600 text-sm">
                {language === 'hi' 
                  ? 'स्वास्थ्य सेवा लागतों को कम करने के लिए व्यावहारिक सुझाव और रणनीतियां।'
                  : 'Practical recommendations and strategies to reduce healthcare costs.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            {language === 'hi' ? 'हमसे जुड़ें' : 'Get in Touch'}
          </h3>
          <p className="text-blue-100 mb-6">
            {language === 'hi' 
              ? 'कोई प्रश्न है? हमें आपकी सहायता करने में खुशी होगी।'
              : 'Have questions? We\'d love to help you understand your medical bills better.'
            }
          </p>
          <Link
            to="/upload"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {language === 'hi' ? 'शुरू करें' : 'Get Started'}
          </Link>
        </div>
      </div>
    </div>
  );
};