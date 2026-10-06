import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Language } from '../types';
import { TranslationSchema, LanguageMeta, SUPPORTED_LANGUAGES } from './types';
import { ary } from './ary';
import { ar } from './ar';
import { en } from './en';
import { fr } from './fr';
import { es } from './es';
import { de } from './de';
import { it } from './it';
import { pt } from './pt';
import { zh } from './zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
  t: TranslationSchema;
  languages: LanguageMeta[];
  currentMeta: LanguageMeta;
  localize: (item: Record<string, any> | null | undefined, field: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, TranslationSchema> = {
  ary,
  ar,
  en,
  fr,
  es,
  de,
  it,
  pt,
  zh
};

const VALID_LANGUAGES = new Set<Language>([
  'ary', 'ar', 'en', 'fr', 'es', 'de', 'it', 'pt', 'zh'
]);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('rikouzone_language') as Language;
      if (saved && VALID_LANGUAGES.has(saved)) {
        return saved;
      }
    } catch {
      // localStorage may fail in some iframe environments
    }
    return 'ar'; // Default Arabic
  });

  const dir: 'rtl' | 'ltr' = (language === 'ar' || language === 'ary') ? 'rtl' : 'ltr';
  const isRTL = dir === 'rtl';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language === 'ary' ? 'ar-MA' : language;
    try {
      localStorage.setItem('rikouzone_language', language);
    } catch {
      // ignore
    }
  }, [language, dir]);

  const setLanguage = useCallback((lang: Language) => {
    if (VALID_LANGUAGES.has(lang)) {
      setLanguageState(lang);
    }
  }, []);

  const currentMeta = useMemo(() => {
    return SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[1];
  }, [language]);

  // Scalable helper for localizing items (paths, lessons, tools, etc.)
  const localize = useCallback((item: Record<string, any> | null | undefined, field: string): string => {
    if (!item) return '';

    const cap = capitalize(field);

    if (language === 'ary') {
      return (
        item[`darija${cap}`] ||
        item[`arabic${cap}`] ||
        item[field] ||
        item[`english${cap}`] ||
        ''
      );
    }
    if (language === 'ar') {
      return (
        item[`arabic${cap}`] ||
        item[field] ||
        item[`english${cap}`] ||
        ''
      );
    }
    if (language === 'fr') {
      return (
        item[`french${cap}`] ||
        item[field] ||
        item[`english${cap}`] ||
        ''
      );
    }
    if (language === 'es') {
      return (
        item[`spanish${cap}`] ||
        item[field] ||
        item[`english${cap}`] ||
        ''
      );
    }
    if (language === 'de') {
      return (
        item[`german${cap}`] ||
        item[field] ||
        item[`english${cap}`] ||
        ''
      );
    }
    if (language === 'it') {
      return (
        item[`italian${cap}`] ||
        item[field] ||
        item[`english${cap}`] ||
        ''
      );
    }
    if (language === 'pt') {
      return (
        item[`portuguese${cap}`] ||
        item[field] ||
        item[`english${cap}`] ||
        ''
      );
    }
    if (language === 'zh') {
      return (
        item[`chinese${cap}`] ||
        item[field] ||
        item[`english${cap}`] ||
        ''
      );
    }

    // Default English / fallback
    return item[field] || item[`english${cap}`] || item[`arabic${cap}`] || '';
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    dir,
    isRTL,
    t: translations[language] || translations.ar,
    languages: SUPPORTED_LANGUAGES,
    currentMeta,
    localize
  }), [language, setLanguage, dir, isRTL, currentMeta, localize]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
