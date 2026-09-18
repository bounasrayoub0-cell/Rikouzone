import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { ar } from './ar';
import { en } from './en';
import { fr } from './fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
  t: typeof ar;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, typeof ar> = {
  ar,
  en,
  fr
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('rikouzone_language') as Language;
      if (saved && (saved === 'ar' || saved === 'en' || saved === 'fr')) {
        return saved;
      }
    } catch {
      // localStorage may fail in some iframe environments
    }
    return 'ar'; // Default Arabic
  });

  const dir: 'rtl' | 'ltr' = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    try {
      localStorage.setItem('rikouzone_language', language);
    } catch {
      // ignore
    }
  }, [language, dir]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const isRTL = dir === 'rtl';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, isRTL, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
