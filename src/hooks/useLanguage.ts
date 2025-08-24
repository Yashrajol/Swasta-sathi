import { useState, useEffect } from 'react';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
];

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState<any>({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('swasthya-language') || 'en';
    setCurrentLanguage(savedLanguage);
    loadTranslations(savedLanguage);
  }, []);

  const loadTranslations = async (languageCode: string) => {
    try {
      const response = await import(`../data/translations/${languageCode}.json`);
      setTranslations(response.default);
    } catch (error) {
      console.error('Failed to load translations:', error);
      // Fallback to English
      const response = await import('../data/translations/en.json');
      setTranslations(response.default);
    }
  };

  const changeLanguage = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('swasthya-language', languageCode);
    loadTranslations(languageCode);
  };

  const t = (key: string) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        return key;
      }
    }
    
    return value || key;
  };

  return {
    currentLanguage,
    translations,
    changeLanguage,
    t,
    supportedLanguages: SUPPORTED_LANGUAGES
  };
};