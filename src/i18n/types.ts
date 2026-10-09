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
    titleHighlight: string;
    description: string;
    exploreIncome: string;
    tryAi: string;
    browseIdeas: string;
    creatorTools: string;
    statPaths: string;
    statIdeas: string;
    statTools: string;
    statAi: string;
    featurePractical: string;
    featureTools: string;
    featureGaming: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
  };
  stats: {
    paths: string;
    ideas: string;
    tools: string;
    ai: string;
    freeSuite: string;
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
    browseAllPaths: string;
    browseAllIdeas: string;
    browseAllTools: string;
    tryTool: string;
    startLearning: string;
    openChat: string;
    quickActions: string;
    gamingBannerTag: string;
    gamingBannerTitle: string;
    gamingBannerDesc: string;
    gamingBannerBtnGuide: string;
    gamingBannerBtnIdeas: string;
    viewScriptOutline: string;
    openingHookCallout: string;
    copyHookBtn: string;
    hookCopiedFeedback: string;
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
    monthlyPotential: string;
    learningCurve: string;
    startupCapital: string;
    requiredSkills: string;
    recommendedTools: string;
    targetPlatforms: string;
    realisticWarning: string;
    copySummary: string;
    interactiveTrackBadge: string;
    openFullCourse: string;
    categoryHeader: string;
    trackUpgradedBadge: string;
    facelessPossible: string;
    beginnerFriendly: string;
    stepByStepTitle: string;
    advantagesTitle: string;
    challengesTitle: string;
    realityCheckTitle: string;
    topPathsTitle: string;
    browseAllPathsBtn: string;
    difficultyLevel: string;
    learningTime: string;
    openPathCourse: string;
    categoriesList: {
      all: string;
      contentCreation: string;
      freelancing: string;
      ecommerce: string;
      marketing: string;
      techAi: string;
      gaming: string;
      microServices: string;
    };
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
    avgRpm: string;
    payoutMethods: string;
    growthTacticsTitle: string;
    topFormatsTitle: string;
    monetizationPolicies: string;
    payoutChannels: string;
    avgRpmLabel: string;
    nextStep: string;
    nextStepDesc: string;
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
    selectCalc: string;
    resultsEstimated: string;
    inputsTitle: string;
    calculatorsCount: string;
    utilitiesCount: string;
    topicPlaceholder: string;
    generateHooks: string;
    youtubeTitles: string;
    smartHashtags: string;
    quickIdea: string;
    generatedOutput: string;
    copyText: string;
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
    openingHookTitle: string;
    scriptStructureTitle: string;
    closingCtaTitle: string;
    libraryBadge: string;
    readyToPublish: string;
    openingHookCallout: string;
    copyHookBtn: string;
    hookCopied: string;
    ctaFormulaTitle: string;
    ctaCopied: string;
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
    online: string;
    welcomeTitle: string;
    welcomeSubtitle: string;
    quickActionsTitle: string;
    quickActionsSubtitle: string;
    prepareInChat: string;
    nextSteps: string;
    send: string;
    enterHint: string;
    ready: string;
    dismiss: string;
    activeAction: string;
    thinking: string;
    unifiedTitle: string;
    chatStatus: string;
    multilingualSupport: string;
    howCanIHelp: string;
    howCanIHelpDesc: string;
    conversation: string;
    searchConversations: string;
    fileTooLarge: string;
    analyzeFile: string;
    responseCopied: string;
    nextActionSuggestions: string;
    activeActionLabel: string;
    pressEnterToSend: string;
    quickActionsBarTitle: string;
    quickActionsBarSubtitle: string;
    loadInChat: string;
    askAnything: string;
    noResults: string;
    networkError: string;
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
    appearanceMode: string;
    appearanceDesc: string;
    darkMode: string;
    darkModeDesc: string;
    lightMode: string;
    lightModeDesc: string;
    clearAll: string;
    clearConfirm: string;
    savedPathsCount: string;
    savedIdeasCount: string;
    accountTitle: string;
    accountDesc: string;
    savedLearningPaths: string;
    savedContentIdeas: string;
    noSavedTitle: string;
    noSavedDesc: string;
  };
  footer: {
    description: string;
    exploreTitle: string;
    toolsTitle: string;
    disclaimer: string;
    rightsReserved: string;
    foundedBy: string;
    brandDescription: string;
    statsSummary: string;
    founderCredit: string;
  };
  toasts: {
    savedIncome: string;
    removedIncome: string;
    savedIdea: string;
    removedIdea: string;
    clearedAll: string;
    copySuccess: string;
    copyError: string;
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
    sponsored: string;
    sponsorSpace: string;
    savedItems: string;
    view: string;
    copy: string;
    sponsoredPartner: string;
    freeTier: string;
    resetFilters: string;
    notFound: string;
    notFoundDesc: string;
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
