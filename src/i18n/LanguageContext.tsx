import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Language, IncomePath, ContentIdea } from '../types';
import { TranslationSchema, LanguageMeta, SUPPORTED_LANGUAGES } from './types';
import { getLocalizedPath, getLocalizedIdea, getLocalizedTool, getLocalizedGuide } from './dataLocalizer';
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
  localizePath: (path: IncomePath | null | undefined) => { title: string; shortDesc: string; category: string };
  localizeIdea: (idea: ContentIdea | null | undefined) => { title: string; hook: string; desc: string; cta: string };
  localizeTool: (tool: any) => { title: string; desc: string };
  localizeGuide: (guide: any) => { name: string; tagline: string };
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

  const localizePath = useCallback((path: IncomePath | null | undefined) => {
    return getLocalizedPath(path, language);
  }, [language]);

  const localizeIdea = useCallback((idea: ContentIdea | null | undefined) => {
    return getLocalizedIdea(idea, language);
  }, [language]);

  const localizeTool = useCallback((tool: any) => {
    return getLocalizedTool(tool, language);
  }, [language]);

  const localizeGuide = useCallback((guide: any) => {
    return getLocalizedGuide(guide, language);
  }, [language]);

  const safeT = useMemo(() => {
    const raw = translations[language] || translations.ar;
    return createFallbackProxy(raw, translations.ar, translations.en);
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    dir,
    isRTL,
    t: safeT,
    languages: SUPPORTED_LANGUAGES,
    currentMeta,
    localize,
    localizePath,
    localizeIdea,
    localizeTool,
    localizeGuide
  }), [language, setLanguage, dir, isRTL, safeT, currentMeta, localize, localizePath, localizeIdea, localizeTool, localizeGuide]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

function createFallbackProxy<T extends object>(target: T, fallback: any, defaultFallback: any): T {
  return new Proxy(target, {
    get(obj: any, prop: string | symbol) {
      if (typeof prop === 'symbol') return obj[prop];
      const val = obj[prop];
      if (val !== undefined && val !== null && val !== '') {
        if (typeof val === 'object' && !Array.isArray(val)) {
          const subFallback = fallback ? fallback[prop] : undefined;
          const subDefault = defaultFallback ? defaultFallback[prop] : undefined;
          return createFallbackProxy(val, subFallback, subDefault);
        }
        return val;
      }
      const fbVal = fallback ? fallback[prop] : undefined;
      if (fbVal !== undefined && fbVal !== null && fbVal !== '') {
        if (typeof fbVal === 'object' && !Array.isArray(fbVal)) {
          const subDefault = defaultFallback ? defaultFallback[prop] : undefined;
          return createFallbackProxy(fbVal, subDefault, subDefault);
        }
        return fbVal;
      }
      const defVal = defaultFallback ? defaultFallback[prop] : undefined;
      if (defVal !== undefined && defVal !== null && defVal !== '') {
        if (typeof defVal === 'object' && !Array.isArray(defVal)) {
          return createFallbackProxy(defVal, {}, {});
        }
        return defVal;
      }
      return typeof prop === 'string' ? prop : '';
    }
  });
}

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
