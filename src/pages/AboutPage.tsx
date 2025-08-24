import React from 'react';
import { Heart, Shield, Brain, Mic, Calendar, Globe, Users, Award } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Mic className="h-8 w-8 text-blue-600" />,
      title: "Voice Recognition",
      description: "Advanced speech recognition technology that understands multiple languages and accents"
    },
    {
      icon: <Brain className="h-8 w-8 text-green-600" />,
      title: "AI-Powered Analysis",
      description: "Intelligent health assessment using advanced AI to provide personalized recommendations"
    },
    {
      icon: <Calendar className="h-8 w-8 text-purple-600" />,
      title: "Easy Appointment Booking",
      description: "Seamless integration with healthcare providers for quick appointment scheduling"
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Privacy Protected",
      description: "Your health information is kept secure and private with end-to-end encryption"
    },
    {
      icon: <Globe className="h-8 w-8 text-orange-600" />,
      title: "Multi-language Support",
      description: "Available in English, Hindi, and Marathi to serve diverse communities"
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: "Accessible Healthcare",
      description: "Making healthcare accessible to everyone, regardless of language or location"
    }
  ];

  const stats = [
    { number: "10K+", label: "Users Helped" },
    { number: "5K+", label: "Appointments Booked" },
    { number: "3", label: "Languages Supported" },
    { number: "24/7", label: "Available Support" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('about.description')}
            </p>
            <div className="flex justify-center">
              <Heart className="h-16 w-16 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('about.features.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive suite of features designed to make healthcare accessible and convenient for everyone
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Swasthya Sathi Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our simple three-step process makes healthcare consultation easy and accessible
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Voice Your Concerns
              </h3>
              <p className="text-gray-600">
                Simply speak your symptoms or health concerns in your preferred language. Our advanced voice recognition technology will understand you clearly.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Get AI Analysis
              </h3>
              <p className="text-gray-600">
                Our AI-powered health assistant analyzes your symptoms and provides personalized recommendations, including when to seek professional help.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Book Appointment
              </h3>
              <p className="text-gray-600">
                If professional consultation is recommended, easily book an appointment with qualified healthcare providers through our integrated booking system.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              To make quality healthcare accessible to everyone, breaking down language barriers and geographical constraints through innovative AI technology.
            </p>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <Award className="h-12 w-12 text-white mx-auto mb-2" />
                <p className="text-lg font-semibold">Quality Care</p>
              </div>
              <div className="text-center">
                <Globe className="h-12 w-12 text-white mx-auto mb-2" />
                <p className="text-lg font-semibold">Global Access</p>
              </div>
              <div className="text-center">
                <Heart className="h-12 w-12 text-white mx-auto mb-2" />
                <p className="text-lg font-semibold">Compassionate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-yellow-600 mt-1 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Important Disclaimer
                </h3>
                <p className="text-yellow-700 text-sm">
                  {t('about.disclaimer')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;