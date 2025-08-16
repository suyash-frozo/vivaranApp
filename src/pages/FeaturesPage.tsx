import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Search, 
  Shield, 
  Calculator,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Mic,
  Clock,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const FeaturesPage: React.FC = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: <FileText className="text-blue-600" size={48} />,
      title: language === 'hi' ? 'स्मार्ट बिल अपलोड' : 'Smart Bill Upload',
      description: language === 'hi' 
        ? 'PDF, JPEG, PNG फॉर्मेट में अपने मेडिकल बिल आसानी से अपलोड करें। हमारा AI तुरंत फाइल को प्रोसेस करके विश्लेषण शुरू कर देता है।'
        : 'Easily upload your medical bills in PDF, JPEG, or PNG format. Our AI instantly processes the file and begins analysis.',
      features: [
        language === 'hi' ? 'मल्टी-फॉर्मेट समर्थन' : 'Multi-format support',
        language === 'hi' ? 'तुरंत प्रोसेसिंग' : 'Instant processing',
        language === 'hi' ? '10MB तक फाइल साइज़' : 'Up to 10MB file size'
      ]
    },
    {
      icon: <Search className="text-green-600" size={48} />,
      title: language === 'hi' ? 'एडवांस्ड AI विश्लेषण' : 'Advanced AI Analysis',
      description: language === 'hi' 
        ? 'हमारा उन्नत AI मॉडल आपके बिल की हर लाइन का विस्तृत विश्लेषण करता है, छुपी हुई लागतों और त्रुटियों को खोजता है।'
        : 'Our advanced AI model performs detailed line-by-line analysis of your bill, uncovering hidden costs and errors.',
      features: [
        language === 'hi' ? 'लाइन-बाई-लाइन विश्लेषण' : 'Line-by-line analysis',
        language === 'hi' ? 'त्रुटि पहचान' : 'Error detection',
        language === 'hi' ? 'पैटर्न रिकग्निशन' : 'Pattern recognition'
      ]
    },
    {
      icon: <AlertTriangle className="text-red-600" size={48} />,
      title: language === 'hi' ? 'ओवरचार्ज डिटेक्शन' : 'Overcharge Detection',
      description: language === 'hi' 
        ? 'मार्केट रेट्स और इंश्योरेंस गाइडलाइन्स के साथ तुलना करके अनुचित चार्जेस की पहचान करते हैं।'
        : 'Identify unfair charges by comparing against market rates and insurance guidelines.',
      features: [
        language === 'hi' ? 'मार्केट रेट तुलना' : 'Market rate comparison',
        language === 'hi' ? 'डुप्लिकेट चार्ज पहचान' : 'Duplicate charge detection',
        language === 'hi' ? 'अनावश्यक टेस्ट फ्लैगिंग' : 'Unnecessary test flagging'
      ]
    },
    {
      icon: <Shield className="text-purple-600" size={48} />,
      title: language === 'hi' ? 'इंश्योरेंस एनालिसिस' : 'Insurance Analysis',
      description: language === 'hi' 
        ? 'आपके इंश्योरेंस कवरेज का विस्तृत विश्लेषण और क्लेम प्रोसेस में मदद करते हैं।'
        : 'Detailed analysis of your insurance coverage and assistance with the claim process.',
      features: [
        language === 'hi' ? 'कवरेज वेरिफिकेशन' : 'Coverage verification',
        language === 'hi' ? 'क्लेम एलिजिबिलिटी' : 'Claim eligibility',
        language === 'hi' ? 'बेनिफिट ऑप्टिमाइज़ेशन' : 'Benefit optimization'
      ]
    },
    {
      icon: <Calculator className="text-orange-600" size={48} />,
      title: language === 'hi' ? 'कॉस्ट ब्रेकडाउन' : 'Cost Breakdown',
      description: language === 'hi' 
        ? 'आपके मेडिकल बिल का विस्तृत कॉस्ट एनालिसिस और प्राइसिंग ट्रांसपैरेंसी।'
        : 'Detailed cost analysis of your medical bill with complete pricing transparency.',
      features: [
        language === 'hi' ? 'आइटम-वाइज़ कॉस्ट' : 'Item-wise costs',
        language === 'hi' ? 'सर्विस कैटेगराइज़ेशन' : 'Service categorization',
        language === 'hi' ? 'प्राइस जस्टिफिकेशन' : 'Price justification'
      ]
    },
    {
      icon: <Mic className="text-teal-600" size={48} />,
      title: language === 'hi' ? 'वॉयस इनपुट' : 'Voice Input',
      description: language === 'hi' 
        ? 'हिंदी और अंग्रेजी में वॉयस कमांड्स का उपयोग करके अपने सवाल पूछें।'
        : 'Ask questions using voice commands in both Hindi and English for easier interaction.',
      features: [
        language === 'hi' ? 'मल्टी-लैंग्वेज सपोर्ट' : 'Multi-language support',
        language === 'hi' ? 'हैंड्स-फ्री ऑपरेशन' : 'Hands-free operation',
        language === 'hi' ? 'रियल-टाइम ट्रांसक्रिप्शन' : 'Real-time transcription'
      ]
    }
  ];

  const benefits = [
    {
      icon: <DollarSign className="text-green-600" size={24} />,
      title: language === 'hi' ? 'पैसे बचाएं' : 'Save Money',
      description: language === 'hi' 
        ? 'ओवरचार्जेस की पहचान करके हज़ारों रुपए बचाएं'
        : 'Save thousands by identifying overcharges and billing errors'
    },
    {
      icon: <Clock className="text-blue-600" size={24} />,
      title: language === 'hi' ? 'समय बचाएं' : 'Save Time',
      description: language === 'hi' 
        ? 'मैन्युअल बिल रिव्यू के घंटों को मिनटों में बदलें'
        : 'Turn hours of manual bill review into minutes of insights'
    },
    {
      icon: <CheckCircle className="text-purple-600" size={24} />,
      title: language === 'hi' ? 'सटीक विश्लेषण' : 'Accurate Analysis',
      description: language === 'hi' 
        ? 'AI-पावर्ड टेक्नोलॉजी से 99% सटीक परिणाम'
        : '99% accurate results powered by advanced AI technology'
    },
    {
      icon: <TrendingUp className="text-orange-600" size={24} />,
      title: language === 'hi' ? 'बेहतर निर्णय' : 'Better Decisions',
      description: language === 'hi' 
        ? 'सूचित निर्णय लेने के लिए विस्तृत इनसाइट्स'
        : 'Detailed insights to make informed healthcare decisions'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            {language === 'hi' ? 'होम पर वापस जाएं' : 'Back to Home'}
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('featuresTitle')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('featuresSubtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm text-gray-500">
                        <CheckCircle size={16} className="text-green-600 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'hi' ? 'विवरण के फायदे' : 'Why Choose Vivaran?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {language === 'hi' ? 'उपयोग के मामले' : 'Common Use Cases'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === 'hi' ? 'हॉस्पिटल बिल्स' : 'Hospital Bills'}
              </h4>
              <p className="text-gray-600 text-sm">
                {language === 'hi' 
                  ? 'सर्जरी, ट्रीटमेंट, और हॉस्पिटलाइजेशन के बिल्स का विश्लेषण'
                  : 'Analyze surgery, treatment, and hospitalization bills for accuracy'
                }
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === 'hi' ? 'इंश्योरेंस क्लेम्स' : 'Insurance Claims'}
              </h4>
              <p className="text-gray-600 text-sm">
                {language === 'hi' 
                  ? 'इंश्योरेंस क्लेम प्रोसेस में सहायता और कवरेज वेरिफिकेशन'
                  : 'Assistance with insurance claim process and coverage verification'
                }
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === 'hi' ? 'आउटपेशेंट केयर' : 'Outpatient Care'}
              </h4>
              <p className="text-gray-600 text-sm">
                {language === 'hi' 
                  ? 'डॉक्टर विज़िट, टेस्ट्स, और प्रोसीजर्स की कॉस्ट एनालिसिस'
                  : 'Cost analysis of doctor visits, tests, and procedures'
                }
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">
            {language === 'hi' ? 'आज ही शुरू करें' : 'Start Today'}
          </h3>
          <p className="text-blue-100 mb-6 text-lg">
            {language === 'hi' 
              ? 'अपना पहला मेडिकल बिल अपलोड करें और देखें कि आप कितना पैसा बचा सकते हैं'
              : 'Upload your first medical bill and discover how much you can save'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/upload"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {language === 'hi' ? 'बिल अपलोड करें' : 'Upload Bill'}
            </Link>
            <Link
              to="/tutorial"
              className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              {language === 'hi' ? 'ट्यूटोरियल देखें' : 'View Tutorial'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};