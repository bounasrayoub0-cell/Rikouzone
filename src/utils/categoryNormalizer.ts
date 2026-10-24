import { Language } from '../types';

export type CanonicalCategory =
  | 'all'
  | 'content-creation'
  | 'freelancing'
  | 'ecommerce'
  | 'marketing'
  | 'tech-ai'
  | 'gaming'
  | 'micro-services';

export interface CategoryDefinition {
  canonical: CanonicalCategory;
  legacyName: string;
  labels: Record<Language, string>;
  aliases: string[];
}

export const CATEGORY_DEFINITIONS: Record<CanonicalCategory, CategoryDefinition> = {
  all: {
    canonical: 'all',
    legacyName: 'all',
    labels: {
      ar: 'الكل (35)',
      ary: 'كولشي (35)',
      en: 'All (35)',
      fr: 'Tous (35)',
      es: 'Todos (35)',
      de: 'Alle (35)',
      it: 'Tutti (35)',
      pt: 'Todos (35)',
      zh: '全部 (35)',
      ja: 'すべて (35)',
      ko: '전체 (35)',
      tr: 'Tümü (35)',
      hi: 'सभी (35)',
      ru: 'Все (35)',
      nl: 'Alles (35)',
      id: 'Semua (35)',
      pl: 'Wszystkie (35)'
    },
    aliases: [
      'all', 'all paths', 'all (35)', 'كل', 'الكل', 'الكل (35)', 'كولشي', 'كولشي (35)',
      'tous', 'todos', 'alle', 'tutti', '全部', '全部 (35)'
    ]
  },
  'content-creation': {
    canonical: 'content-creation',
    legacyName: 'Content Creation',
    labels: {
      ar: 'صناعة المحتوى',
      ary: 'صناعة المحتوى',
      en: 'Content Creation',
      fr: 'Création de Contenu',
      es: 'Creación de Contenido',
      de: 'Content Creation',
      it: 'Creazione di Contenuti',
      pt: 'Criação de Conteúdo',
      zh: '内容创作',
      ja: 'コンテンツ制作',
      ko: '콘텐츠 제작',
      tr: 'İçerik Üretimi',
      hi: 'कंटेंट क्रिएशन',
      ru: 'Создание контента',
      nl: 'Contentcreatie',
      id: 'Pembuatan Konten',
      pl: 'Tworzenie Treści'
    },
    aliases: [
      'content creation', 'content-creation', 'content_creation', 'contentcreation',
      'صناعة المحتوى', 'صناعة محتوى', 'صانع محتوى', 'المحتوى',
      'création de contenu', 'creación de contenido', 'creazione di contenuti',
      'criação de conteúdo', '内容创作'
    ]
  },
  freelancing: {
    canonical: 'freelancing',
    legacyName: 'Freelancing',
    labels: {
      ar: 'العمل الحر والخدمات',
      ary: 'الخدمة الحرة والخدمات',
      en: 'Freelancing & Services',
      fr: 'Freelance & Services',
      es: 'Freelance y Servicios',
      de: 'Freelancing & Services',
      it: 'Freelance e Servizi',
      pt: 'Freelance e Serviços',
      zh: '自由职业与服务',
      ja: 'フリーランス＆サービス',
      ko: '프리랜싱 및 서비스',
      tr: 'Freelance ve Hizmetler',
      hi: 'फ्रीलांसिंग और सेवाएँ',
      ru: 'Фриланс и услуги',
      nl: 'Freelancing & Diensten',
      id: 'Freelance & Layanan',
      pl: 'Freelancing i Usługi'
    },
    aliases: [
      'freelancing', 'freelance', 'freelance & services', 'freelancing & services',
      'freelance and services', 'freelancing and services', 'freelance-services',
      'freelance y servicios', 'freelance e servizi', 'freelance e serviços', '自由职业与服务',
      'العمل الحر والخدمات', 'العمل الحر', 'عمل حر', 'الخدمة الحرة والخدمات', 'الخدمة الحرة',
      'الخدمات والعمل الحر', 'الفريلانس', 'فريلانس', 'فريلانسر'
    ]
  },
  ecommerce: {
    canonical: 'ecommerce',
    legacyName: 'E-commerce',
    labels: {
      ar: 'التجارة الإلكترونية',
      ary: 'التجارة الإلكترونية',
      en: 'E-commerce',
      fr: 'E-commerce',
      es: 'Comercio Electrónico',
      de: 'E-Commerce',
      it: 'E-commerce',
      pt: 'Comércio Eletrônico',
      zh: '电子商务',
      ja: 'Eコマース',
      ko: '이커머스',
      tr: 'E-Ticaret',
      hi: 'ई-कॉमर्स',
      ru: 'Электронная коммерция',
      nl: 'E-commerce',
      id: 'E-commerce',
      pl: 'E-commerce'
    },
    aliases: [
      'e-commerce', 'ecommerce', 'e_commerce', 'e commerce', 'commerce',
      'التجارة الإلكترونية', 'التجارة الالكترونية', 'تجارة إلكترونية', 'تجارة الكترونية',
      'comercio electrónico', 'comercio electronico', 'comércio eletrônico',
      'comercio digital', '电子商务'
    ]
  },
  marketing: {
    canonical: 'marketing',
    legacyName: 'Marketing',
    labels: {
      ar: 'التسويق الرقمي',
      ary: 'التسويق الرقمي',
      en: 'Digital Marketing',
      fr: 'Marketing Digital',
      es: 'Marketing Digital',
      de: 'Digitales Marketing',
      it: 'Marketing Digitale',
      pt: 'Marketing Digital',
      zh: '数字营销',
      ja: 'デジタルマーケティング',
      ko: '디지털 마케팅',
      tr: 'Dijital Pazarlama',
      hi: 'डिजिटल मार्केटिंग',
      ru: 'Цифровой маркетинг',
      nl: 'Digitale Marketing',
      id: 'Pemasaran Digital',
      pl: 'Marketing Cyfrowy'
    },
    aliases: [
      'marketing', 'digital marketing', 'digital-marketing', 'digital_marketing',
      'التسويق الرقمي', 'التسويق', 'تسويق رقمي', 'تسويق',
      'marketing digital', 'digitales marketing', 'marketing digitale', '数字营销'
    ]
  },
  'tech-ai': {
    canonical: 'tech-ai',
    legacyName: 'Tech & AI',
    labels: {
      ar: 'التقنية والذكاء الاصطناعي',
      ary: 'التقنية والذكاء الاصطناعي',
      en: 'Tech & AI',
      fr: 'Tech & IA',
      es: 'Tecnología e IA',
      de: 'Technologie & KI',
      it: 'Tech e IA',
      pt: 'Tecnologia e IA',
      zh: '科技与AI',
      ja: 'テクノロジー＆AI',
      ko: '기술 및 AI',
      tr: 'Teknoloji ve Yapay Zeka',
      hi: 'तकनीक और एआई',
      ru: 'Технологии и ИИ',
      nl: 'Tech & AI',
      id: 'Teknologi & AI',
      pl: 'Technologia i AI'
    },
    aliases: [
      'tech & ai', 'tech-ai', 'tech_ai', 'tech and ai', 'techai', 'tech & ia', 'tech-ia',
      'tecnología e ia', 'tecnologia e ia', 'technologie & ki', 'technologie und ki',
      'tech e ia', '科技与ai', '科技与人工智能',
      'التقنية والذكاء الاصطناعي', 'تقنية وذكاء اصطناعي', 'التقنية والذكاء الإصطناعي',
      'التقنية', 'الذكاء الاصطناعي', 'الذكاء الإصطناعي', 'خدمات الذكاء الاصطناعي',
      'البرمجة والتقنية', 'البرمجة'
    ]
  },
  gaming: {
    canonical: 'gaming',
    legacyName: 'Gaming',
    labels: {
      ar: 'الألعاب والجيمنج',
      ary: 'الألعاب والجيمنغ',
      en: 'Gaming & Streaming',
      fr: 'Gaming & Streaming',
      es: 'Gaming y Streaming',
      de: 'Gaming & Streaming',
      it: 'Gaming e Streaming',
      pt: 'Gaming e Transmissão',
      zh: '游戏与直播',
      ja: 'ゲーム＆配信',
      ko: '게이밍 및 스트리밍',
      tr: 'Oyun ve Yayıncılık',
      hi: 'गेमिंग और स्ट्रीमिंग',
      ru: 'Гейминг и стриминг',
      nl: 'Gaming & Streaming',
      id: 'Game & Streaming',
      pl: 'Gaming i Streaming'
    },
    aliases: [
      'gaming', 'gaming & streaming', 'gaming and streaming', 'gaming-streaming',
      'gaming y streaming', 'gaming e streaming', 'gaming e transmissão', '游戏与直播',
      'الألعاب والجيمنج', 'الألعاب والجيمنغ', 'الألعاب', 'ألعاب', 'جيمنج', 'جيمنغ', 'العاب'
    ]
  },
  'micro-services': {
    canonical: 'micro-services',
    legacyName: 'Micro Services',
    labels: {
      ar: 'الخدمات المصغرة',
      ary: 'الخدمات المصغرة',
      en: 'Micro Services',
      fr: 'Micro-services',
      es: 'Microservicios',
      de: 'Micro-Services',
      it: 'Microservizi',
      pt: 'Microserviços',
      zh: '微服务',
      ja: 'マイクロサービス',
      ko: '마이크로 서비스',
      tr: 'Mikro Hizmetler',
      hi: 'माइक्रो सेवाएँ',
      ru: 'Микро-услуги',
      nl: 'Microdiensten',
      id: 'Layanan Mikro',
      pl: 'Mikrousługi'
    },
    aliases: [
      'micro services', 'micro-services', 'micro_services', 'microservices',
      'micro-service', 'micro service', 'microservicios', 'microservizi',
      'microserviços', '微服务',
      'الخدمات المصغرة', 'خدمات مصغرة', 'الخدمات الرقمية', 'خدمات رقمية'
    ]
  }
};

/**
 * Normalizes any category string (English legacy, Arabic label, translation, or slug)
 * into a single canonical category ID.
 */
export function normalizeCategory(input?: string | null): CanonicalCategory {
  if (!input) return 'all';

  // Standardize string: lowercase, remove parens and numbers, trim whitespace
  const raw = input.toString().trim().toLowerCase();
  const clean = raw
    .replace(/[()0-9+]/g, '')
    .replace(/&amp;/g, '&')
    .replace(/[ـ_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!clean || clean === 'all') return 'all';

  // 1. Direct match on canonical key
  if (clean in CATEGORY_DEFINITIONS) {
    return clean as CanonicalCategory;
  }

  // 2. Exact match against aliases or localized labels
  for (const [key, def] of Object.entries(CATEGORY_DEFINITIONS)) {
    if (def.legacyName.toLowerCase() === clean) {
      return key as CanonicalCategory;
    }
    if (def.aliases.some((a) => a.toLowerCase() === clean)) {
      return key as CanonicalCategory;
    }
    for (const label of Object.values(def.labels)) {
      const cleanLabel = label.toLowerCase().replace(/[()0-9+]/g, '').trim();
      if (cleanLabel === clean) {
        return key as CanonicalCategory;
      }
    }
  }

  // 3. Substring / inclusion match (e.g. "العمل الحر" inside "العمل الحر والخدمات")
  for (const [key, def] of Object.entries(CATEGORY_DEFINITIONS)) {
    if (def.aliases.some((a) => clean.includes(a.toLowerCase()) || a.toLowerCase().includes(clean))) {
      return key as CanonicalCategory;
    }
  }

  return 'all';
}

/**
 * Checks if a given path matches the selected category filter,
 * supporting all formats (slug, legacy English name, localized Arabic/other).
 */
export function matchesCategory(pathCategory?: string | null, selectedCategory?: string | null): boolean {
  const normSelected = normalizeCategory(selectedCategory);
  if (normSelected === 'all') return true;
  const normPath = normalizeCategory(pathCategory);
  return normPath === normSelected;
}

/**
 * Returns the localized label for a category across all 9 supported languages.
 */
export function getLocalizedCategoryName(categoryKey: string | null | undefined, language: Language): string {
  const canonical = normalizeCategory(categoryKey);
  if (canonical === 'all') {
    return CATEGORY_DEFINITIONS.all.labels[language] || CATEGORY_DEFINITIONS.all.labels.ar;
  }
  const def = CATEGORY_DEFINITIONS[canonical];
  return def?.labels[language] || def?.labels.ar || def?.legacyName || categoryKey || '';
}

/**
 * Normalizes Arabic text for tolerant search matching:
 * unifies alef forms, taa marbuta/ha, yaa/alef maksura, and strips tashkeel/tatweel.
 */
export function normalizeArabicText(str?: string | null): string {
  if (!str) return '';
  return str
    .toString()
    .toLowerCase()
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/[ة]/g, 'ه')
    .replace(/[ى]/g, 'ي')
    .replace(/[ـ]/g, '') // tatweel
    .replace(/[\u064B-\u065F\u0670]/g, '') // tashkeel
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Tolerant search matching supporting Arabic prepositions (الـ, للـ, بالـ, كالـ)
 * and multi-word token checks.
 */
export function tolerantSearchMatch(targetText: string, searchPhrase: string): boolean {
  if (!searchPhrase) return true;
  if (!targetText) return false;

  const rawTarget = targetText.toLowerCase();
  const rawQuery = searchPhrase.toLowerCase();
  if (rawTarget.includes(rawQuery)) return true;

  const normTarget = normalizeArabicText(targetText);
  const normQuery = normalizeArabicText(searchPhrase);
  if (normTarget.includes(normQuery)) return true;

  // Split query into tokens (e.g. "المشاريع المحلية")
  const tokens = normQuery.split(/\s+/).filter((t) => t.length > 0);
  if (tokens.length === 0) return true;

  return tokens.every((token) => {
    if (normTarget.includes(token)) return true;
    // Strip common Arabic prefixes: 'الـ', 'للـ', 'بالـ', 'فالـ', 'والـ'
    if ((token.startsWith('ال') || token.startsWith('لل') || token.startsWith('بال')) && token.length > 3) {
      const stripped = token.replace(/^(ال|لل|بال)/, '');
      if (normTarget.includes(stripped)) return true;
    }
    return false;
  });
}

