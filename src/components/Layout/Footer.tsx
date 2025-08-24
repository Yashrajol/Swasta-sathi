import React from 'react';
import { Heart, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('app.title')}</h3>
            <p className="text-gray-300 text-sm">
              {t('about.description')}
            </p>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-500" />
                <span className="text-sm">Emergency: 108</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Health Helpline: 1075</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-500" />
                <span className="text-sm">help@swasthyasathi.com</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Important</h3>
            <p className="text-gray-300 text-sm">
              {t('about.disclaimer')}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for better healthcare
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;