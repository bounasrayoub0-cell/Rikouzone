import { Language } from '../types';

export interface TranslationSchema {
  brand: {
    name: string;
    subtitle: string;
    tagline: string;
    badge: string;
  };
  nav: {
    home: string;
    income: string;
    creators: string;
    tools: string;
    ideas: string;
    ai: string;
    profile: string;
  };
  hero: {
    welcome: string;
    badge: string;
    title: string;
    description: string;
    exploreIncome: string;
    creatorTools: string;
    statPaths: string;
    statIdeas: string;
    statTools: string;
    statAi: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
  };
  sections: {
    incomeOpportunities: string;
    incomeOpportunitiesDesc: string;
    creatorHub: string;
    creatorHubDesc: string;
    contentIdeas: string;
    contentIdeasDesc: string;
    rikouAi: string;
    rikouAiDesc: string;
    viewAll: string;
    exploreNow: string;
  };
  income: {
    pageTitle: string;
    pageSubtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    allDifficulties: string;
    allCosts: string;
    difficulty: string;
    cost: string;
    beginnerOnly: string;
    facelessOnly: string;
    showing: string;
    of: string;
    paths: string;
    loadMore: string;
    viewDetails: string;
    savePath: string;
    saved: string;
    skills: string;
    tools: string;
    platforms: string;
    incomeRange: string;
    timeToIncome: string;
    steps: string;
    pros: string;
    cons: string;
    warning: string;
    filterReset: string;
    sortRecent: string;
    sortIncome: string;
    sortEasy: string;
    sortCost: string;
    emptyState: string;
  };
  creators: {
    pageTitle: string;
    pageSubtitle: string;
    tabYouTube: string;
    tabTikTok: string;
    tabInstagram: string;
    tabFacebook: string;
    tabGaming: string;
    tabFreeFire: string;
    tabShorts: string;
    monetizationReqs: string;
    growthTips: string;
    bestFormats: string;
    gearAndTools: string;
    algorithmHacks: string;
  };
  tools: {
    pageTitle: string;
    pageSubtitle: string;
    calculatorsTab: string;
    contentToolsTab: string;
    calculate: string;
    reset: string;
    resultTitle: string;
    formulaNote: string;
  };
  ideas: {
    pageTitle: string;
    pageSubtitle: string;
    searchPlaceholder: string;
    randomIdea: string;
    dailyIdea: string;
    allPlatforms: string;
    allNiches: string;
    viralPotential: string;
    competition: string;
    format: string;
    duration: string;
    hook: string;
    scriptOutline: string;
    cta: string;
    planIdea: string;
    copyHook: string;
    copied: string;
    facelessBadge: string;
  };
  ai: {
    pageTitle: string;
    pageSubtitle: string;
    generateBtn: string;
    generating: string;
    copyResult: string;
    resetFields: string;
    resultHeader: string;
    geminiPrepared: string;
    inputPlaceholder: string;
    outputPlaceholder: string;
    newChat: string;
    copy: string;
    copied: string;
    regenerate: string;
    history: string;
    delete: string;
    deleteAll: string;
    attachFile: string;
    removeFile: string;
    confirmDelete: string;
    confirmDeleteAll: string;
    noHistory: string;
    fileAttached: string;
  };
  profile: {
    pageTitle: string;
    pageSubtitle: string;
    creatorLevel: string;
    targetTitle: string;
    targetHelp: string;
    saveTarget: string;
    savedPathsTab: string;
    savedIdeasTab: string;
    savedToolsTab: string;
    languageSection: string;
    noSavedPaths: string;
    noSavedIdeas: string;
    noSavedTools: string;
  };
  common: {
    close: string;
    back: string;
    share: string;
    free: string;
    beginner: string;
    intermediate: string;
    advanced: string;
    low: string;
    medium: string;
    high: string;
    explosive: string;
    save: string;
    remove: string;
    clear: string;
    copied: string;
    search: string;
    filter: string;
    all: string;
    selectLanguage: string;
    searchLanguage: string;
  };
}

export interface LanguageMeta {
  code: Language;
  name: string;
  nativeName: string;
  dir: 'rtl' | 'ltr';
  flag: string;
  badge: string;
  description: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  {
    code: 'ary',
    name: 'Moroccan Darija',
    nativeName: 'الدارجة المغربية',
    dir: 'rtl',
    flag: '🇲🇦',
    badge: 'RTL',
    description: 'العربية الدارجة المغربية'
  },
  {
    code: 'ar',
    name: 'Modern Standard Arabic',
    nativeName: 'العربية الفصحى',
    dir: 'rtl',
    flag: '🇸🇦',
    badge: 'RTL',
    description: 'اللغة العربية الفصحى المعتمدة'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇺🇸',
    badge: 'LTR',
    description: 'Global international interface'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr',
    flag: '🇫🇷',
    badge: 'LTR',
    description: 'Interface francophone standard'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    dir: 'ltr',
    flag: '🇪🇸',
    badge: 'LTR',
    description: 'Español para creadores y emprendedores'
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    dir: 'ltr',
    flag: '🇩🇪',
    badge: 'LTR',
    description: 'Deutsche Benutzeroberfläche'
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    dir: 'ltr',
    flag: '🇮🇹',
    badge: 'LTR',
    description: 'Interfaccia in lingua italiana'
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    dir: 'ltr',
    flag: '🇵🇹',
    badge: 'LTR',
    description: 'Português para criadores de conteúdo'
  },
  {
    code: 'zh',
    name: 'Simplified Chinese',
    nativeName: '简体中文',
    dir: 'ltr',
    flag: '🇨🇳',
    badge: 'LTR',
    description: '简体中文创作者与变现中心'
  }
];
