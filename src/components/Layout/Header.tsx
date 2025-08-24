import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const Header: React.FC = () => {
  const { t, currentLanguage, changeLanguage, supportedLanguages } = useLanguage();
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('navigation.home') },
    { path: '/voice', label: t('navigation.voice') },
    { path: '/appointments', label: t('navigation.appointments') },
    { path: '/about', label: t('navigation.about') }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-full">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t('app.title')}</h1>
              <p className="text-xs text-gray-500">{t('app.subtitle')}</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <Link
              to="/doctor/login"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-md border border-gray-300 hover:border-blue-300"
            >
              Doctor Portal
            </Link>
            <Link
              to="/patient/login"
              className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200 px-3 py-2 rounded-md border border-gray-300 hover:border-green-300"
            >
              Patient Portal
            </Link>
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => changeLanguage(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {supportedLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName}
                  </option>
                ))}
              </select>
              <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <nav className="px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block py-2 text-sm font-medium transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;