import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, Brain, Calendar, Globe, ArrowRight, Stethoscope, Heart, Shield } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Mic className="h-8 w-8 text-blue-600" />,
      title: t('home.features.voice'),
      description: "Speak naturally in your preferred language"
    },
    {
      icon: <Brain className="h-8 w-8 text-green-600" />,
      title: t('home.features.ai'),
      description: "Get intelligent health advice powered by AI"
    },
    {
      icon: <Calendar className="h-8 w-8 text-purple-600" />,
      title: t('home.features.booking'),
      description: "Book appointments with healthcare professionals"
    },
    {
      icon: <Globe className="h-8 w-8 text-orange-600" />,
      title: t('home.features.multilingual'),
      description: "Available in English, Hindi, and Marathi"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-full shadow-lg">
                <Stethoscope className="h-16 w-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('home.welcome')}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('home.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/voice"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Mic className="h-5 w-5" />
                <span>{t('home.getStarted')}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                to="/about"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the future of healthcare with our AI-powered assistant
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Speak Your Symptoms
              </h3>
              <p className="text-gray-600">
                Use your voice to describe your health concerns in your preferred language
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Get AI Advice
              </h3>
              <p className="text-gray-600">
                Our AI analyzes your symptoms and provides personalized health advice
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Book Appointment
              </h3>
              <p className="text-gray-600">
                If needed, easily book an appointment with a healthcare professional
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Trusted Healthcare Assistant
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Compassionate Care
                </h3>
                <p className="text-gray-600">
                  Designed with empathy and understanding for your health concerns
                </p>
              </div>
              
              <div className="text-center">
                <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Privacy Protected
                </h3>
                <p className="text-gray-600">
                  Your health data is kept secure and private at all times
                </p>
              </div>
              
              <div className="text-center">
                <Brain className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  AI-Powered
                </h3>
                <p className="text-gray-600">
                  Advanced artificial intelligence for accurate health insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;