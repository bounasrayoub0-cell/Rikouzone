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

    // Specialized language mapping
    if (language === 'ary') {
      if (item[`darija${capitalize(field)}`]) return item[`darija${capitalize(field)}`];
      if (item[`arabic${capitalize(field)}`]) return item[`arabic${capitalize(field)}`];
    } else if (language === 'ar') {
      if (item[`arabic${capitalize(field)}`]) return item[`arabic${capitalize(field)}`];
    } else if (language === 'fr') {
      if (item[`french${capitalize(field)}`]) return item[`french${capitalize(field)}`];
    } else if (language === 'es') {
      if (item[`spanish${capitalize(field)}`]) return item[`spanish${capitalize(field)}`];
    } else if (language === 'de') {
      if (item[`german${capitalize(field)}`]) return item[`german${capitalize(field)}`];
    } else if (language === 'it') {
      if (item[`italian${capitalize(field)}`]) return item[`italian${capitalize(field)}`];
    } else if (language === 'pt') {
      if (item[`portuguese${capitalize(field)}`]) return item[`portuguese${capitalize(field)}`];
    } else if (language === 'zh') {
      if (item[`chinese${capitalize(field)}`]) return item[`chinese${capitalize(field)}`];
    }

    // Default fallback to requested field or english field
    return item[field] || item[`english${capitalize(field)}`] || '';
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
