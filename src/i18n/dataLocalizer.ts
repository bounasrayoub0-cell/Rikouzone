import { Language, IncomePath, ContentIdea } from '../types';

export interface LocalizedItemText {
  title: string;
  shortDesc: string;
  category?: string;
}

// Translations for all 35 Income Paths across 9 languages
export const PATH_TRANSLATIONS: Record<string, Record<Language, LocalizedItemText>> = {
  'affiliate-marketing': {
    ary: {
      title: 'أفيلييت ماركيتينغ (التسويق بالعمولة)',
      shortDesc: 'ترويج منتجات وسيرفيسات ديال شركات أخرى بروابط خاصة وربح عمولة محترمة على كل مبيعة ناجحة.',
      category: 'التسويق الرقمي'
    },
    ar: {
      title: 'التسويق بالعمولة (Affiliate Marketing)',
      shortDesc: 'الترويج لمنتجات أو خدمات شركات أخرى عبر روابط تتبع خاصة وكسب عمولة مجزية عن كل عملية بيع ناجحة.',
      category: 'التسويق الرقمي'
    },
    en: {
      title: 'Affiliate Marketing',
      shortDesc: 'Earn commissions by promoting digital or physical products with dedicated tracking links.',
      category: 'Digital Marketing'
    },
    fr: {
      title: 'Marketing d’Affiliation',
      shortDesc: 'Gagnez des commissions en faisant la promotion de produits et services avec des liens affiliés sécurisés.',
      category: 'Marketing Digital'
    },
    es: {
      title: 'Marketing de Afiliados',
      shortDesc: 'Genera comisiones recomendando productos digitales o físicos mediante enlaces de seguimiento dedicados.',
      category: 'Marketing Digital'
    },
    de: {
      title: 'Affiliate-Marketing',
      shortDesc: 'Verdienen Sie Provisionen durch die Empfehlung von Produkten über individuelle Partnerlinks.',
      category: 'Digitales Marketing'
    },
    it: {
      title: 'Marketing di Affiliazione',
      shortDesc: 'Guadagna commissioni promuovendo prodotti digitali o fisici tramite link di tracciamento personalizzati.',
      category: 'Marketing Digitale'
    },
    pt: {
      title: 'Marketing de Afiliados',
      shortDesc: 'Ganhe comissões recomendando produtos digitais ou físicos por meio de links de afiliados exclusivos.',
      category: 'Marketing Digital'
    },
    zh: {
      title: '联盟营销 (Affiliate Marketing)',
      shortDesc: '通过推广数字或实体产品专属分销链接赚取丰厚佣金，无需库存与售后。',
      category: '数字营销'
    }
  },
  'tiktok-affiliate': {
    ary: {
      title: 'أفيلييت تيك توك و تيك توك شوب',
      shortDesc: 'ترويج منتجات طالعة فـ التيك توك بفيديوهات قصيرة واستغلال الخوارزمية باش تجيب آلاف المبيعات.',
      category: 'التجارة الإلكترونية'
    },
    ar: {
      title: 'أفيلييت تيك توك وتيك توك شوب',
      shortDesc: 'ترويج المنتجات الرائجة عبر مقاطع تيك توك قصيرة واستغلال قوة الخوارزمية لتحقيق مبيعات متتالية.',
      category: 'التجارة الإلكترونية'
    },
    en: {
      title: 'TikTok Shop & Affiliate',
      shortDesc: 'Promote trending physical and digital products directly through viral short-form TikTok videos.',
      category: 'E-commerce'
    },
    fr: {
      title: 'Affiliation TikTok & TikTok Shop',
      shortDesc: 'Monétisez des produits tendance directement via des vidéos TikTok courtes et virales.',
      category: 'E-commerce'
    },
    es: {
      title: 'Afiliados de TikTok & TikTok Shop',
      shortDesc: 'Promociona productos virales mediante videos cortos de TikTok y aprovecha el alcance orgánico.',
      category: 'Comercio Electrónico'
    },
    de: {
      title: 'TikTok Shop & Affiliate',
      shortDesc: 'Bewerben Sie Trendprodukte über virale Kurzvideos auf TikTok mit direkter Kaufanbindung.',
      category: 'E-Commerce'
    },
    it: {
      title: 'Affiliazione TikTok & TikTok Shop',
      shortDesc: 'Promuovi prodotti virali con video brevi su TikTok sfruttando la straordinaria portata organica.',
      category: 'E-commerce'
    },
    pt: {
      title: 'Afiliados TikTok & TikTok Shop',
      shortDesc: 'Divulgue produtos em alta com vídeos curtos e virais no TikTok alcançando milhares de vendas.',
      category: 'Comércio Eletrônico'
    },
    zh: {
      title: 'TikTok 小店与带货联盟',
      shortDesc: '通过TikTok爆款短视频精准带货，借助算法推荐快速实现规模化出单与佣金变现。',
      category: '电子商务'
    }
  },
  'youtube-monetization': {
    ary: {
      title: 'الربح من يوتيوب و AdSense',
      shortDesc: 'بناء قناة يوتيوب متخصصة والربح من إعلانات أدسنس، الرعايات، وعروض الأفيلييت باستمرار.',
      category: 'صناعة المحتوى'
    },
    ar: {
      title: 'تحقيق الدخل من يوتيوب و AdSense',
      shortDesc: 'بناء قناة يوتيوب مستدامة والربح من إعلانات أدسنس والرعايات وعروض التسويق التابعة.',
      category: 'صناعة المحتوى'
    },
    en: {
      title: 'YouTube Monetization (AdSense & Beyond)',
      shortDesc: 'Build a long-term YouTube channel monetized through Google AdSense, sponsorships, and affiliate offers.',
      category: 'Content Creation'
    },
    fr: {
      title: 'Monétisation YouTube & AdSense',
      shortDesc: 'Développez une chaîne YouTube rentable grâce aux revenus publicitaires AdSense et aux partenariats de marque.',
      category: 'Création de Contenu'
    },
    es: {
      title: 'Monetización de YouTube & AdSense',
      shortDesc: 'Construye un canal de YouTube rentable a través de anuncios de AdSense, patrocinios y marketing de afiliados.',
      category: 'Creación de Contenido'
    },
    de: {
      title: 'YouTube-Monetarisierung & AdSense',
      shortDesc: 'Bauen Sie einen nachhaltigen YouTube-Kanal mit Einnahmen aus AdSense-Werbung und Markensponsoring auf.',
      category: 'Content Creation'
    },
    it: {
      title: 'Monetizzazione YouTube & AdSense',
      shortDesc: 'Crea un canale YouTube duraturo monetizzato tramite annunci AdSense, sponsorizzazioni e affiliazioni.',
      category: 'Creazione di Contenuti'
    },
    pt: {
      title: 'Monetização do YouTube & AdSense',
      shortDesc: 'Construa um canal sólido no YouTube gerando receita com AdSense, patrocínios e parcerias.',
      category: 'Criação de Conteúdo'
    },
    zh: {
      title: 'YouTube 频道变现与 AdSense',
      shortDesc: '搭建长期高价值YouTube频道，通过Google AdSense广告分成、商业赞助与联盟分销实现被动收益。',
      category: '内容创作'
    }
  },
  'instagram-monetization': {
    ary: {
      title: 'الربح من انستغرام والريلز',
      shortDesc: 'تكبير صفحة انستغرام بالريلز المخدومين مزيان، وبيع الرعايات، الاشتراكات والمنتجات الرقمية.',
      category: 'صناعة المحتوى'
    },
    ar: {
      title: 'تحقيق الدخل من انستغرام والريلز',
      shortDesc: 'تنمية حساب انستغرام متخصص وتحقيق أرباح عبر صفقات الرعاية، الاشتراكات وبيع المنتجات الرقمية.',
      category: 'صناعة المحتوى'
    },
    en: {
      title: 'Instagram Monetization & Reels',
      shortDesc: 'Grow an engaged Instagram audience with viral Reels and monetize through sponsorships and digital products.',
      category: 'Content Creation'
    },
    fr: {
      title: 'Monétisation Instagram & Reels',
      shortDesc: 'Développez une communauté active sur Instagram et monétisez via des partenariats et infoproduits.',
      category: 'Création de Contenu'
    },
    es: {
      title: 'Monetización de Instagram & Reels',
      shortDesc: 'Crea una comunidad comprometida en Instagram y monetiza con patrocinios y productos digitales.',
      category: 'Creación de Contenido'
    },
    de: {
      title: 'Instagram-Monetarisierung & Reels',
      shortDesc: 'Wachsen Sie auf Instagram mit Reels und monetarisieren Sie durch Sponsoring und digitale Produkte.',
      category: 'Content Creation'
    },
    it: {
      title: 'Monetizzazione Instagram & Reels',
      shortDesc: 'Fai crescere un pubblico su Instagram con i Reels e monetizza con collaborazioni e prodotti digitali.',
      category: 'Creazione di Contenuti'
    },
    pt: {
      title: 'Monetização do Instagram & Reels',
      shortDesc: 'Cresça no Instagram com Reels e monetize com parcerias com marcas e infoprodutos.',
      category: 'Criação de Conteúdo'
    },
    zh: {
      title: 'Instagram 变现与 Reels 增长',
      shortDesc: '深耕高互动Instagram垂直账号，借助爆款Reels与主页外链变现品牌赞助与数字产品。',
      category: '内容创作'
    }
  },
  'facebook-monetization': {
    ary: {
      title: 'الربح من فيسبوك والصفحات',
      shortDesc: 'استغلال ملايين المشاهدات فـ فيسبوك ريلز وصفحات المحتوى للربح من الإعلانات المضمنة والرعايات.',
      category: 'صناعة المحتوى'
    },
    ar: {
      title: 'تحقيق الدخل من فيسبوك و Reels',
      shortDesc: 'تحويل ملايين المشاهدات على صفحات فيسبوك إلى أرباح حقيقية عبر الإعلانات المضمنة ومكافآت الريلز.',
      category: 'صناعة المحتوى'
    },
    en: {
      title: 'Facebook Monetization & Reels',
      shortDesc: 'Monetize high-volume organic views on Facebook Pages via in-stream ads and Reels performance bonuses.',
      category: 'Content Creation'
    },
    fr: {
      title: 'Monétisation Facebook & Reels',
      shortDesc: 'Transformez des millions de vues sur vos pages Facebook en revenus réels grâce aux publicités in-stream.',
      category: 'Création de Contenu'
    },
    es: {
      title: 'Monetización de Facebook & Reels',
      shortDesc: 'Monetiza millones de reproducciones en páginas de Facebook mediante anuncios in-stream y bonificaciones.',
      category: 'Creación de Contenido'
    },
    de: {
      title: 'Facebook-Monetarisierung & Reels',
      shortDesc: 'Monetarisieren Sie organische Reichweiten auf Facebook-Seiten durch In-Stream-Anzeigen und Reels-Boni.',
      category: 'Content Creation'
    },
    it: {
      title: 'Monetizzazione Facebook & Reels',
      shortDesc: 'Monetizza le visualizzazioni sulle pagine Facebook tramite annunci in-stream e bonus per i Reels.',
      category: 'Creazione di Contenuti'
    },
    pt: {
      title: 'Monetização do Facebook & Reels',
      shortDesc: 'Monetize visualizações orgânicas em páginas do Facebook por meio de anúncios in-stream e bônus.',
      category: 'Criação de Conteúdo'
    },
    zh: {
      title: 'Facebook 页面与 Reels 收益变现',
      shortDesc: '借助Facebook海量自然流量与长视频插播广告(In-Stream Ads)，实现规模化广告收益。',
      category: '内容创作'
    }
  },
  'blogging': {
    ary: {
      title: 'إنشاء المدونات والربح من AdSense',
      shortDesc: 'كتابة مقالات متخصصة تتصدر محركات البحث، وجني أرباح مستمرة من إعلانات أدسنس والتسويق بالعمولة.',
      category: 'العمل الحر والخدمات'
    },
    ar: {
      title: 'الربح من المدونات و AdSense',
      shortDesc: 'إطلاق موقع تدوين متخصص يتصدر محركات البحث وتحقيق أرباح عبر شبكات الإعلانات والعمولة.',
      category: 'العمل الحر والخدمات'
    },
    en: {
      title: 'Niche Blogging & AdSense',
      shortDesc: 'Build SEO-driven niche blogs that capture targeted search traffic and monetize via ad networks and affiliates.',
      category: 'Freelancing'
    },
    fr: {
      title: 'Blogging de Niche & AdSense',
      shortDesc: 'Créez des sites de contenu optimisés SEO captant du trafic qualifié et monétisés par la publicité et l’affiliation.',
      category: 'Freelance & Services'
    },
    es: {
      title: 'Blogging de Nicho & AdSense',
      shortDesc: 'Crea blogs temáticos optimizados para SEO que moneticen mediante redes publicitarias y afiliación.',
      category: 'Freelance y Servicios'
    },
    de: {
      title: 'Nischen-Blogging & AdSense',
      shortDesc: 'Erstellen Sie SEO-optimierte Nischen-Websites mit stabilen Einnahmen aus Werbenetzwerken und Partnerprogrammen.',
      category: 'Freelancing & Services'
    },
    it: {
      title: 'Blogging di Nicchia & AdSense',
      shortDesc: 'Crea blog di nicchia posizionati su Google che monetizzano con circuiti pubblicitari e affiliazioni.',
      category: 'Freelance e Servizi'
    },
    pt: {
      title: 'Blogging de Nicho & AdSense',
      shortDesc: 'Crie blogs nichados otimizados para SEO que faturam com redes de anúncios e programas de afiliados.',
      category: 'Freelance e Serviços'
    },
    zh: {
      title: '利基博客搭建与 AdSense 盈利',
      shortDesc: '打造高质量SEO利基站点，获取精准搜索流量并通过AdSense、Mediavine及联盟佣金变现。',
      category: '自由职业与服务'
    }
  },
  'seo-services': {
    ary: {
      title: 'خدمات السيو (SEO Consulting)',
      shortDesc: 'تحسين ترتيب مواقع الشركات فـ Google، بيع تدقيقات الـ SEO الشهرية، وعقود إدارة طويلة المدى.',
      category: 'العمل الحر والخدمات'
    },
    ar: {
      title: 'خدمات تحسين محركات البحث (SEO)',
      shortDesc: 'مساعدة الشركات والمتاجر على تصدر نتائج جوجل وتقديم استشارات وتدقيقات SEO بعقود شهرية مجزية.',
      category: 'العمل الحر والخدمات'
    },
    en: {
      title: 'SEO Consulting & Agency Services',
      shortDesc: 'Rank businesses on Google search results and close high-ticket monthly SEO retainer contracts.',
      category: 'Freelancing'
    },
    fr: {
      title: 'Services & Conseil SEO',
      shortDesc: 'Positionnez les entreprises sur Google et proposez des forfaits d’audit et d’optimisation mensuels.',
      category: 'Freelance & Services'
    },
    es: {
      title: 'Consultoría y Servicios SEO',
      shortDesc: 'Posiciona empresas en los resultados de Google y cierra contratos mensuales recurrentes de optimización SEO.',
      category: 'Freelance y Servicios'
    },
    de: {
      title: 'SEO-Beratung & Agenturdienstleistungen',
      shortDesc: 'Bringen Sie Unternehmen auf die vorderen Google-Plätze und sichern Sie sich monatliche Betreuungsverträge.',
      category: 'Freelancing & Services'
    },
    it: {
      title: 'Consulenza & Servizi SEO',
      shortDesc: 'Posiziona le aziende sui motori di ricerca e vendi pacchetti di ottimizzazione SEO a canone mensile.',
      category: 'Freelance e Servizi'
    },
    pt: {
      title: 'Consultoria e Serviços de SEO',
      shortDesc: 'Posicione empresas no topo do Google e feche contratos mensais recorrentes de otimização de sites.',
      category: 'Freelance e Serviços'
    },
    zh: {
      title: 'SEO 搜索引擎优化咨询与代运营',
      shortDesc: '为出海独立站与企业提供关键词排名、站内优化及外链建设服务，签订高客单价按月代运营合同。',
      category: '自由职业与服务'
    }
  },
  'freelance-writing': {
    ary: {
      title: 'كتابة المحتوى المستقل (Freelance Writing)',
      shortDesc: 'كتابة مقالات، نصوص مواقع، وأدلة تعليمية للشركات والمنصات العالمية بأجر مرتفع لكل كلمة.',
      category: 'العمل الحر والخدمات'
    },
    ar: {
      title: 'كتابة المحتوى المستقل (Freelance Writing)',
      shortDesc: 'صياغة مقالات وأدلة تسويقية للشركات والمنصات العالمية والحصول على دخل احترافي لكل مقال أو مشروع.',
      category: 'العمل الحر والخدمات'
    },
    en: {
      title: 'Freelance Content Writing',
      shortDesc: 'Write compelling blog posts, whitepapers, and guides for global brands as a premium freelance writer.',
      category: 'Freelancing'
    },
    fr: {
      title: 'Rédaction Web Freelance',
      shortDesc: 'Rédigez des articles de blog, pages web et guides de qualité pour des clients et marques internationales.',
      category: 'Freelance & Services'
    },
    es: {
      title: 'Redacción de Contenidos Freelance',
      shortDesc: 'Escribe artículos, páginas web y guías especializadas para marcas de todo el mundo con tarifas competitivas.',
      category: 'Freelance y Servicios'
    },
    de: {
      title: 'Freiberufliches Content-Writing',
      shortDesc: 'Verfassen Sie Fachartikel, Blogbeiträge und Guides für globale Unternehmen als bezahlter Texter.',
      category: 'Freelancing & Services'
    },
    it: {
      title: 'Scrittura di Contenuti Freelance',
      shortDesc: 'Scrivi articoli di blog, guide e testi web per aziende internazionali con tariffe professionali.',
      category: 'Freelance e Servizi'
    },
    pt: {
      title: 'Redação de Conteúdo Freelance',
      shortDesc: 'Escreva artigos de blog, e-books e conteúdos para marcas internacionais com remuneração em moeda forte.',
      category: 'Freelance e Serviços'
    },
    zh: {
      title: '自由职业内容写作 (Freelance Writing)',
      shortDesc: '为海外科技博客与跨国品牌撰写深度行业文章与商业文案，按字数或项目赚取外汇收益。',
      category: '自由职业与服务'
    }
  },
  'copywriting': {
    ary: {
      title: 'الكتابة الإعلانية والإقناعية (Copywriting)',
      shortDesc: 'كتابة صفحات هبوط وإيميلات إعلانية تقنع القارئ بالشراء، مع أخذ نسب مئوية من المبيعات.',
      category: 'العمل الحر والخدمات'
    },
    ar: {
      title: 'الكتابة الإعلانية والإقناعية (High-Ticket Copywriting)',
      shortDesc: 'كتابة نصوص إعلانية وصفحات هبوط ورسائل بريدية إقناعية تحول الزوار إلى مشترين مع كسب عمولات بيع.',
      category: 'العمل الحر والخدمات'
    },
    en: {
      title: 'High-Ticket Copywriting',
      shortDesc: 'Craft high-converting landing pages, sales letters, and email sequences that drive massive revenue.',
      category: 'Freelancing'
    },
    fr: {
      title: 'Copywriting & Vente Persuasive',
      shortDesc: 'Rédigez des pages de vente et e-mails percutants qui maximisent les conversions et génèrent du chiffre d’affaires.',
      category: 'Freelance & Services'
    },
    es: {
      title: 'Copywriting de Alta Conversión',
      shortDesc: 'Redacta páginas de ventas, correos y anuncios persuasivos que multipliquen los ingresos de tus clientes.',
      category: 'Freelance y Servicios'
    },
    de: {
      title: 'High-Ticket Copywriting',
      shortDesc: 'Schreiben Sie verkaufsstarke Landing Pages und E-Mail-Kampagnen, die Leser in treue Käufer verwandeln.',
      category: 'Freelancing & Services'
    },
    it: {
      title: 'Copywriting Persuasivo ad Alta Conversione',
      shortDesc: 'Scrivi landing page, email promozionali e annunci capaci di trasformare i lettori in clienti paganti.',
      category: 'Freelance e Servizi'
    },
    pt: {
      title: 'Copywriting de Alta Conversão',
      shortDesc: 'Crie páginas de vendas, e-mails e anúncios persuasivos que geram faturamento alto e recorrente.',
      category: 'Freelance e Serviços'
    },
    zh: {
      title: '高客单价商业文案 (High-Ticket Copywriting)',
      shortDesc: '撰写高转化率销售落地页、营销电邮序列与广告文案，收取固定服务费加业绩提成分成。',
      category: '自由职业与服务'
    }
  },
  'video-editing': {
    ary: {
      title: 'مونطاج الفيديوهات والريلز (Video Editing)',
      shortDesc: 'مونطاج فيديوهات تيك توك، يوتيوب والريلز بمؤثرات ورتم سريع يخطف الانتباه، وخدمة صناع المحتوى.',
      category: 'صناعة المحتوى'
    },
    ar: {
      title: 'مونتاج الفيديو والريلز (Video Editing)',
      shortDesc: 'تحرير الفيديوهات القصيرة والطويلة باحترافية وتوفير خدمات المونتاج لصناع المحتوى والشركات.',
      category: 'صناعة المحتوى'
    },
    en: {
      title: 'Short & Long-Form Video Editing',
      shortDesc: 'Edit viral TikToks, Reels, and YouTube videos for creators and businesses using Premiere & CapCut.',
      category: 'Content Creation'
    },
    fr: {
      title: 'Montage Vidéo Shorts & Long Format',
      shortDesc: 'Montez des vidéos dynamiques pour YouTube, TikTok et Instagram avec des effets et sous-titres percutants.',
      category: 'Création de Contenu'
    },
    es: {
      title: 'Edición de Video para Creadores',
      shortDesc: 'Edita videos virales para TikTok, Reels y YouTube para creadores y marcas con ritmos dinámicos.',
      category: 'Creación de Contenido'
    },
    de: {
      title: 'Video-Editing & Shorts-Produktion',
      shortDesc: 'Schneiden Sie professionelle YouTube- und TikTok-Videos mit schnellen Übergängen und Effekten.',
      category: 'Content Creation'
    },
    it: {
      title: 'Video Editing per Creator & Brand',
      shortDesc: 'Monta video accattivanti per YouTube, TikTok e Reels con ritmo dinamico ed effetti coinvolgenti.',
      category: 'Creazione di Contenuti'
    },
    pt: {
      title: 'Edição de Vídeo para Criadores',
      shortDesc: 'Edite vídeos curtos e longos dinâmicos para YouTube, TikTok e Reels atendendo criadores e marcas.',
      category: 'Criação de Conteúdo'
    },
    zh: {
      title: '短视频与长视频专业剪辑 (Video Editing)',
      shortDesc: '精通CapCut与Premiere爆款节奏剪辑、动态字幕与视觉特效，为全球博主与品牌代剪视频。',
      category: '内容创作'
    }
  },
  'graphic-design': {
    ary: {
      title: 'التصميم الجرافيكي والهويات البصرية',
      shortDesc: 'تصميم هويات بصرية، لوغويات، وبوستات احترافية للسوشيال ميديا للمشاريع والشركات.',
      category: 'العمل الحر والخدمات'
    },
    ar: {
      title: 'التصميم الجرافيكي والهويات البصرية',
      shortDesc: 'تصميم هويات العلامات التجارية، الشعارات، وتصاميم منصات التواصل للمتاجر والشركات الناشئة.',
      category: 'العمل الحر والخدمات'
    },
    en: {
      title: 'Brand & Graphic Design',
      shortDesc: 'Design distinctive brand identities, logos, and high-impact social media assets on Figma & Photoshop.',
      category: 'Freelancing'
    },
    fr: {
      title: 'Design Graphique & Identité de Marque',
      shortDesc: 'Concevez des logos, chartes graphiques et visuels percutants pour les marques et créateurs digitaux.',
      category: 'Freelance & Services'
    },
    es: {
      title: 'Diseño Gráfico & Identidad de Marca',
      shortDesc: 'Crea identidades visuales únicas, logotipos y piezas gráficas impactantes para redes sociales.',
      category: 'Freelance y Servicios'
    },
    de: {
      title: 'Grafikdesign & Brand Identity',
      shortDesc: 'Gestalten Sie überzeugende Logos, Markenauftritte und Social-Media-Grafiken für Unternehmen.',
      category: 'Freelancing & Services'
    },
    it: {
      title: 'Graphic Design & Brand Identity',
      shortDesc: 'Crea loghi, identità visive e grafiche accattivanti per social media destinate a brand e startup.',
      category: 'Freelance e Servizi'
    },
    pt: {
      title: 'Design Gráfico & Identidade Visual',
      shortDesc: 'Desenvolva identidades visuais marcantes, logotipos e criativos de alto impacto para marcas.',
      category: 'Freelance e Serviços'
    },
    zh: {
      title: '品牌视觉识别与平面设计 (Brand & Graphic Design)',
      shortDesc: '运用Figma与Photoshop为初创企业设计高质感品牌VI、商业Logo及社交媒体营销素材。',
      category: '自由职业与服务'
    }
  },
  'thumbnail-design': {
    ary: {
      title: 'تصميم صور مصغرة لليوتيوب (Thumbnails)',
      shortDesc: 'تصميم صور مصغرة بنسبة نقر خيالية (High CTR) لقنوات يوتيوب الكبيرة بمدخول شهري واعر.',
      category: 'صناعة المحتوى'
    },
    ar: {
      title: 'تصميم الصور المصغرة لليوتيوب (Thumbnails)',
      shortDesc: 'صناعة صور مصغرة جاذبة ترفع معدل النقر (CTR) لقنوات يوتيوب وتحقيق دخل ثابت من صناع المحتوى.',
      category: 'صناعة المحتوى'
    },
    en: {
      title: 'YouTube Thumbnail Design (High CTR)',
      shortDesc: 'Design psychology-driven YouTube thumbnails that multiply CTR for top creators and media brands.',
      category: 'Content Creation'
    },
    fr: {
      title: 'Design de Miniatures YouTube (High CTR)',
      shortDesc: 'Créez des miniatures YouTube irrésistibles qui boostent le taux de clic (CTR) des chaînes populaires.',
      category: 'Création de Contenu'
    },
    es: {
      title: 'Diseño de Miniaturas para YouTube (Alto CTR)',
      shortDesc: 'Diseña miniaturas visualmente irresistibles que maximicen el CTR de creadores consolidados en YouTube.',
      category: 'Creación de Contenido'
    },
    de: {
      title: 'YouTube-Thumbnail-Design (High-CTR)',
      shortDesc: 'Gestalten Sie klickstarke YouTube-Miniaturbilder für reichweitenstarke Creator und Brands.',
      category: 'Content Creation'
    },
    it: {
      title: 'Design Miniature YouTube (Alto CTR)',
      shortDesc: 'Crea miniature accattivanti per YouTube che moltiplicano il CTR per creator e canali in forte crescita.',
      category: 'Creazione di Contenuti'
    },
    pt: {
      title: 'Design de Thumbnails para YouTube (Alto CTR)',
      shortDesc: 'Desenvolva miniaturas magnéticas que aumentam expressivamente o CTR de canais no YouTube.',
      category: 'Criação de Conteúdo'
    },
    zh: {
      title: 'YouTube 高点击率封面设计 (High CTR Thumbnails)',
      shortDesc: '结合视觉心理学与构图技巧打造超高点击率(CTR)视频封面，签约顶流博主提供长期稳定包月设计。',
      category: '内容创作'
    }
  },
  'web-development': {
    ary: {
      title: 'تطوير المواقع وصفحات الهبوط (Web Dev)',
      shortDesc: 'برمجة مواقع سريعة وصفحات بيع مقنعة للمتاجر والشركات باستعمال أدوات حديثة بحال React و Next.js.',
      category: 'التقنية والذكاء الاصطناعي'
    },
    ar: {
      title: 'تطوير المواقع وصفحات الهبوط (Web Development)',
      shortDesc: 'بناء مواقع ويب سريعة وصفحات هبوط مخصصة للمشاريع والشركات وتحقيق عوائد قوية لكل مشروع.',
      category: 'التقنية والذكاء الاصطناعي'
    },
    en: {
      title: 'Web & Landing Page Development',
      shortDesc: 'Build fast, high-converting web applications and marketing landing pages using modern frontend stacks.',
      category: 'Tech & AI'
    },
    fr: {
      title: 'Développement Web & Landing Pages',
      shortDesc: 'Développez des sites web ultra-rapides et des pages de capture optimisées pour les entreprises.',
      category: 'Tech & IA'
    },
    es: {
      title: 'Desarrollo Web & Landing Pages',
      shortDesc: 'Crea páginas web rápidas y de alta conversión para empresas y tiendas digitales usando React y Next.js.',
      category: 'Tecnología e IA'
    },
    de: {
      title: 'Web- & Landing-Page-Entwicklung',
      shortDesc: 'Erstellen Sie performante Webseiten und verkaufsstarke Landing Pages für Unternehmen und E-Commerce.',
      category: 'Technologie & KI'
    },
    it: {
      title: 'Sviluppo Web & Landing Page',
      shortDesc: 'Sviluppa siti web veloci e pagine di atterraggio ad alta conversione per brand e professionisti.',
      category: 'Tech e IA'
    },
    pt: {
      title: 'Desenvolvimento Web & Landing Pages',
      shortDesc: 'Crie sites modernos e páginas de captura ultra-rápidas para empresas e lançamentos digitais.',
      category: 'Tecnologia e IA'
    },
    zh: {
      title: '独立站与营销落地页开发 (Web Development)',
      shortDesc: '使用现代前端技术栈(React/Next.js/Tailwind)快速交付极致加载速度与高转化率商业网站。',
      category: '科技与AI'
    }
  },
  'app-development': {
    ary: {
      title: 'برمجة وتطوير تطبيقات الموبايل',
      shortDesc: 'صناعة تطبيقات الهواتف الذكية للـ Android و iOS والربح من الاشتراكات والإعلانات والخدمات.',
      category: 'التقنية والذكاء الاصطناعي'
    },
    ar: {
      title: 'تطوير تطبيقات الهواتف الذكية (Mobile Apps)',
      shortDesc: 'إنشاء تطبيقات عملية للآيفون والأندرويد وتحقيق الدخل عبر الاشتراكات الشهرية أو الإعلانات.',
      category: 'التقنية والذكاء الاصطناعي'
    },
    en: {
      title: 'Mobile App Development (iOS & Android)',
      shortDesc: 'Build cross-platform mobile apps using Flutter or React Native and monetize via subscriptions and IAPs.',
      category: 'Tech & AI'
    },
    fr: {
      title: 'Développement d’Applications Mobiles',
      shortDesc: 'Créez des applications iOS et Android performantes et monétisez-les par abonnements et achats intégrés.',
      category: 'Tech & IA'
    },
    es: {
      title: 'Desarrollo de Aplicaciones Móviles',
      shortDesc: 'Construye aplicaciones móviles para iOS y Android y monetízalas mediante suscripciones o anuncios.',
      category: 'Tecnología e IA'
    },
    de: {
      title: 'Mobile App-Entwicklung (iOS & Android)',
      shortDesc: 'Entwickeln Sie plattformübergreifende Apps mit Flutter oder React Native und monatlichen Abos.',
      category: 'Technologie & KI'
    },
    it: {
      title: 'Sviluppo di Applicazioni Mobili',
      shortDesc: 'Sviluppa app multipiattaforma per iOS e Android monetizzando tramite abbonamenti e acquisti in-app.',
      category: 'Tech e IA'
    },
    pt: {
      title: 'Desenvolvimento de Aplicativos Mobile',
      shortDesc: 'Crie aplicativos para iOS e Android com Flutter ou React Native monetizados por assinaturas e anúncios.',
      category: 'Tecnologia e IA'
    },
    zh: {
      title: '移动端应用开发 (iOS & Android)',
      shortDesc: '采用跨平台框架(Flutter/React Native)研发实用工具与出海移动App，通过内购订阅与广告变现。',
      category: '科技与AI'
    }
  },
  'social-media-management': {
    ary: {
      title: 'إدارة حسابات السوشيال ميديا (SMM)',
      shortDesc: 'إدارة وتكبير حسابات انستغرام، تيك توك، ولينكد إن للشركات والمطاعم بعقود شهرية قارة.',
      category: 'العمل الحر والخدمات'
    },
    ar: {
      title: 'إدارة حسابات التواصل الاجتماعي (SMM)',
      shortDesc: 'إدارة وتنمية منصات الشركات والمتاجر وصناعة المحتوى التفاعلي بعقود شهرية مستدامة.',
      category: 'العمل الحر والخدمات'
    },
    en: {
      title: 'Social Media Management (SMM Agency)',
      shortDesc: 'Manage and grow Instagram, TikTok, and LinkedIn accounts for local businesses with monthly retainer packages.',
      category: 'Freelancing'
    },
    fr: {
      title: 'Gestion des Réseaux Sociaux (SMM)',
      shortDesc: 'Gérez et développez la présence des entreprises sur Instagram, TikTok et LinkedIn avec des forfaits mensuels.',
      category: 'Freelance & Services'
    },
    es: {
      title: 'Gestión de Redes Sociales (SMM)',
      shortDesc: 'Gestiona el crecimiento y contenido de marcas en Instagram, TikTok y LinkedIn con contratos mensuales fijos.',
      category: 'Freelance y Servicios'
    },
    de: {
      title: 'Social Media Management (SMM)',
      shortDesc: 'Betreuen und skalieren Sie Social-Media-Kanäle für Unternehmen im monatlichen Retainer-Modell.',
      category: 'Freelancing & Services'
    },
    it: {
      title: 'Gestione dei Social Media (SMM)',
      shortDesc: 'Gestisci e fai crescere i profili social di brand e attività commerciali con abbonamenti mensili.',
      category: 'Freelance e Servizi'
    },
    pt: {
      title: 'Gestão de Mídias Sociais (SMM)',
      shortDesc: 'Gerencie e escale perfis corporativos no Instagram, TikTok e LinkedIn com contratos mensais fixos.',
      category: 'Freelance e Serviços'
    },
    zh: {
      title: '社交媒体代运营 (Social Media Management)',
      shortDesc: '为本地企业与出海品牌全盘代运营Instagram、TikTok与LinkedIn，按月收取稳定服务费。',
      category: '自由职业与服务'
    }
  },
  'ugc-content': {
    ary: {
      title: 'صناعة محتوى الـ UGC (بدون متابعين)',
      shortDesc: 'تصوير فيديوهات تجربة المنتجات بالهاتف للبراندات والشركات والربح من كل فيديو بلا ما تكون عندك قاعدة جماهيرية.',
      category: 'صناعة المحتوى'
    },
    ar: {
      title: 'صناعة محتوى الـ UGC (User Generated Content)',
      shortDesc: 'تصوير فيديوهات إعلانية وتجريبية واقعية للعلامات التجارية باستخدام الهاتف دون الحاجة لمتابعين.',
      category: 'صناعة المحتوى'
    },
    en: {
      title: 'UGC (User Generated Content) Creation',
      shortDesc: 'Create authentic product review and unboxing videos for brands without needing a social media following.',
      category: 'Content Creation'
    },
    fr: {
      title: 'Création de Contenu UGC (Sans abonnés requis)',
      shortDesc: 'Réalisez des vidéos authentiques d’évaluation de produits pour les marques sans avoir besoin d’une communauté.',
      category: 'Création de Contenu'
    },
    es: {
      title: 'Creación de Contenido UGC (Sin seguidores previos)',
      shortDesc: 'Graba videos auténticos de demostración de productos para marcas y cobra por cada video sin necesidad de seguidores.',
      category: 'Creación de Contenido'
    },
    de: {
      title: 'UGC-Content-Creation (Ohne Follower-Pflicht)',
      shortDesc: 'Erstellen Sie authentische Produktvideos mit dem Smartphone für Marken und lassen Sie sich pro Video bezahlen.',
      category: 'Content Creation'
    },
    it: {
      title: 'Creazione di Contenuti UGC',
      shortDesc: 'Gira video autentici di recensione prodotti per brand direttamente dallo smartphone senza bisogno di follower.',
      category: 'Creazione di Contenuti'
    },
    pt: {
      title: 'Criação de Conteúdo UGC (Sem precisar de seguidores)',
      shortDesc: 'Grave vídeos autênticos de unboxing e teste de produtos para marcas recebendo por cada vídeo produzido.',
      category: 'Criação de Conteúdo'
    },
    zh: {
      title: 'UGC 用户原创短视频代拍 (零粉起步)',
      shortDesc: '用手机为各大消费品品牌拍摄真实测评与开箱种草广告视频，无需个人粉丝积累直接按条结算收益。',
      category: '内容创作'
    }
  },
  'ai-content-services': {
    ary: {
      title: 'خدمات المحتوى بالذكاء الاصطناعي (AI Content)',
      shortDesc: 'كتابة المقالات والسكربتات والترجمة للشركات بأدوات الذكاء الاصطناعي مع لمسة احترافية.',
      category: 'الذكاء الاصطناعي'
    },
    ar: {
      title: 'خدمات المحتوى المعزز بالذكاء الاصطناعي (AI Content)',
      shortDesc: 'تقديم خدمات صناعة المحتوى، كتابة المقالات والسكربتات والترجمة بالاستعانة بأحدث نماذج الذكاء الاصطناعي.',
      category: 'خدمات الذكاء الاصطناعي'
    },
    en: {
      title: 'AI-Powered Content Services',
      shortDesc: 'Deliver high-converting blog posts, video scripts, and marketing copy using cutting-edge AI models.',
      category: 'AI Services'
    },
    fr: {
      title: 'Services de Contenu par IA',
      shortDesc: 'Fournissez des articles, scripts et rédactions publicitaires aux entreprises grâce aux outils d’IA avancés.',
      category: 'Services IA'
    },
    es: {
      title: 'Servicios de Contenido con IA',
      shortDesc: 'Ofrece redacción de artículos, guiones de video y textos publicitarios a empresas utilizando herramientas de IA.',
      category: 'Servicios de IA'
    },
    de: {
      title: 'KI-gestützte Content-Dienstleistungen',
      shortDesc: 'Erstellen Sie Blogbeiträge, Videoskripte und Werbetexte für Unternehmen mithilfe moderner KI-Tools.',
      category: 'KI-Dienste'
    },
    it: {
      title: 'Servizi di Contenuti con IA',
      shortDesc: 'Offri redazione di articoli, script video e copywriting per aziende sfruttando i migliori strumenti di IA.',
      category: 'Servizi IA'
    },
    pt: {
      title: 'Serviços de Conteúdo com IA',
      shortDesc: 'Forneça artigos, roteiros de vídeo e copys persuasivas para marcas utilizando inteligência artificial.',
      category: 'Serviços de IA'
    },
    zh: {
      title: 'AI 内容创作与代运营服务',
      shortDesc: '利用顶尖AI大模型为出海企业与品牌提供高转化长文、短视频脚本与多语言文案服务。',
      category: 'AI 服务'
    }
  },
  'ai-automation-services': {
    ary: {
      title: 'أتمتة الأعمال بالذكاء الاصطناعي (AAA)',
      shortDesc: 'تصميم أنظمة أتمتة ذكية بدون كود (Make و Zapier) للشركات وتوفير الوقت والفلوس.',
      category: 'الذكاء الاصطناعي'
    },
    ar: {
      title: 'أتمتة الأعمال بالذكاء الاصطناعي (AI Automation Agency)',
      shortDesc: 'بناء أنظمة أتمتة بدون كود وشات بوتات ذكية لربط العمليات ومساعدة الشركات على خفض التكاليف.',
      category: 'خدمات الذكاء الاصطناعي'
    },
    en: {
      title: 'AI & Workflow Automation (No-Code AAA)',
      shortDesc: 'Build automated workflows and AI agents with Make & Zapier for businesses on monthly retainer contracts.',
      category: 'AI Services'
    },
    fr: {
      title: 'Agence d’Automatisation IA (No-Code AAA)',
      shortDesc: 'Créez des flux automatisés et chatbots intelligents pour entreprises avec Make et Zapier sous contrats mensuels.',
      category: 'Services IA'
    },
    es: {
      title: 'Automatización y Agencias de IA (AAA)',
      shortDesc: 'Construye flujos de trabajo automatizados y chatbots inteligentes para empresas con Make y Zapier.',
      category: 'Servicios de IA'
    },
    de: {
      title: 'KI- und Workflow-Automatisierung (AAA)',
      shortDesc: 'Bauen Sie automatisierte Prozesse und KI-Chatbots für Unternehmen mit Make und Zapier auf Monatsbasis.',
      category: 'KI-Dienste'
    },
    it: {
      title: 'Automazione Aziendale con IA (AAA)',
      shortDesc: 'Sviluppa flussi di lavoro automatizzati e chatbot intelligenti per aziende tramite Make e Zapier.',
      category: 'Servizi IA'
    },
    pt: {
      title: 'Automação de Processos com IA (AAA)',
      shortDesc: 'Construa integrações automatizadas e agentes de IA para empresas com Make e Zapier com receita recorrente.',
      category: 'Serviços de IA'
    },
    zh: {
      title: '企业级AI与工作流无代码自动化 (AAA)',
      shortDesc: '利用 Make、Zapier 与智能体为中小企业搭建无代码自动化流程与客服系统，收取月度服务费。',
      category: 'AI 服务'
    }
  },
  'selling-digital-products': {
    ary: {
      title: 'بيع المنتجات الرقمية (كتب وأدلة)',
      shortDesc: 'صناعة كتب إلكترونية وأدلة تطبيقية كتصايبها مرة وحدة وكتبيعها آلاف المرات بأرباح 100%.',
      category: 'التجارة الإلكترونية'
    },
    ar: {
      title: 'بيع المنتجات الرقمية والكتب الإلكترونية',
      shortDesc: 'إنشاء وبيع الكتب الرقمية والأدلة الإرشادية بهامش ربح يقارب 100% وبدون تكاليف شحن أو مخزون.',
      category: 'التجارة الإلكترونية'
    },
    en: {
      title: 'Selling Digital Products & E-books',
      shortDesc: 'Create and sell digital guides, e-books, and toolkits once with nearly 100% profit margins and zero shipping.',
      category: 'E-commerce'
    },
    fr: {
      title: 'Vente de Produits Digitaux & E-books',
      shortDesc: 'Créez et vendez des guides, ebooks et fiches pratiques avec une marge proche de 100% sans frais de livraison.',
      category: 'E-commerce'
    },
    es: {
      title: 'Venta de Productos Digitales y E-books',
      shortDesc: 'Crea y vende guías digitales, libros electrónicos y recursos descargables con casi 100% de margen y sin envíos.',
      category: 'Comercio Electrónico'
    },
    de: {
      title: 'Verkauf digitaler Produkte & E-Books',
      shortDesc: 'Erstellen und verkaufen Sie digitale Ratgeber, E-Books und Vorlagen mit nahezu 100% Marge ohne Versandkosten.',
      category: 'E-Commerce'
    },
    it: {
      title: 'Vendita di Prodotti Digitali & E-book',
      shortDesc: 'Crea e vendi guide digitali, ebook e checklist informative con margini del 100% e senza spese di spedizione.',
      category: 'E-commerce'
    },
    pt: {
      title: 'Venda de Produtos Digitais e E-books',
      shortDesc: 'Crie e venda e-books, guias práticos e materiais digitais uma única vez com margens de lucro de quase 100%.',
      category: 'Comércio Eletrônico'
    },
    zh: {
      title: '虚拟数字产品与电子书销售',
      shortDesc: '一次制作电子书、实操指南与数字工具包，通过Gumroad与独立站反复销售，净利润率近100%。',
      category: '电子商务'
    }
  },
  'selling-templates': {
    ary: {
      title: 'بيع القوالب الجاهزة (Notion & Canva)',
      shortDesc: 'تصميم قوالب احترافية فـ Notion و Canva وبيعها للناس والمشاريع كدخل سلبي.',
      category: 'التصميم'
    },
    ar: {
      title: 'بيع القوالب الجاهزة (Notion & Canva Templates)',
      shortDesc: 'تصميم قوالب عملية لتنظيم الأعمال والإنتاجية وبيعها عبر المنصات الرقمية كدخل سلبي متكرر.',
      category: 'التصميم'
    },
    en: {
      title: 'Selling Notion & Canva Templates',
      shortDesc: 'Design high-utility workflow and social media templates for Notion, Canva, and Figma as passive income.',
      category: 'Design'
    },
    fr: {
      title: 'Vente de Templates Notion & Canva',
      shortDesc: 'Concevez des modèles prêts à l’emploi pour Notion et Canva et générez des revenus passifs récurrents.',
      category: 'Design'
    },
    es: {
      title: 'Venta de Plantillas de Notion y Canva',
      shortDesc: 'Diseña plantillas útiles de productividad y diseño para Notion, Canva y Figma generando ingresos pasivos.',
      category: 'Diseño'
    },
    de: {
      title: 'Verkauf von Notion- & Canva-Vorlagen',
      shortDesc: 'Gestalten Sie praktische Produktivitäts- und Social-Media-Vorlagen für Notion und Canva als passives Einkommen.',
      category: 'Design'
    },
    it: {
      title: 'Vendita di Template Notion & Canva',
      shortDesc: 'Progetta modelli di produttività per Notion, Canva e Figma generando flussi di reddito passivo continuo.',
      category: 'Design'
    },
    pt: {
      title: 'Venda de Templates do Notion e Canva',
      shortDesc: 'Desenvolva templates práticos de organização e design para Notion e Canva e gere receita passiva.',
      category: 'Design'
    },
    zh: {
      title: 'Notion与Canva实用高颜值模板变现',
      shortDesc: '设计高需求工作流、个人生产力与社媒视觉模板，上架Etsy与独立站实现持续被动收入。',
      category: '设计'
    }
  },
  'print-on-demand': {
    ary: {
      title: 'الطباعة عند الطلب (Print on Demand - POD)',
      shortDesc: 'تصميم تيشرتات وديكورات، المنصات كيطبعو ويشحنو للمشتري، ونتا كتاخد ربحك بلا ما تشري والو.',
      category: 'التجارة الإلكترونية'
    },
    ar: {
      title: 'الطباعة عند الطلب (Print on Demand - POD)',
      shortDesc: 'تصميم منتجات ملبوسة وديكورات بدون شراء مخزون مسبق، حيث تتولى شركات الطباعة التصنيع والشحن.',
      category: 'التجارة الإلكترونية'
    },
    en: {
      title: 'Print on Demand (POD)',
      shortDesc: 'Sell customized apparel and home decor globally without inventory; products are manufactured upon purchase.',
      category: 'E-commerce'
    },
    fr: {
      title: 'Impression à la Demande (POD)',
      shortDesc: 'Vendez des vêtements et accessoires personnalisés sans stock; le fournisseur imprime et livre chaque commande.',
      category: 'E-commerce'
    },
    es: {
      title: 'Impresión bajo Demanda (POD)',
      shortDesc: 'Vende ropa y artículos personalizados a nivel mundial sin inventario; los productos se fabrican tras cada compra.',
      category: 'Comercio Electrónico'
    },
    de: {
      title: 'Print on Demand (POD)',
      shortDesc: 'Verkaufen Sie individualisierte Textilien und Wohnartikel weltweit ohne eigenes Lager oder Vorabinvestition.',
      category: 'E-Commerce'
    },
    it: {
      title: 'Stampa su Richiesta (POD)',
      shortDesc: 'Vendi abbigliamento e articoli personalizzati senza magazzino; i prodotti vengono stampati e spediti all’ordine.',
      category: 'E-commerce'
    },
    pt: {
      title: 'Impressão Sob Demanda (POD)',
      shortDesc: 'Comercialize roupas e itens decorativos personalizados sem estoque; o parceiro produz e envia cada pedido.',
      category: 'Comércio Eletrônico'
    },
    zh: {
      title: '按需打印定制电商 (Print on Demand - POD)',
      shortDesc: '零库存销售个性化服饰与家居周边，由海外供应链接单后直接生产并发货，赚取设计溢价。',
      category: '电子商务'
    }
  },
  'dropshipping': {
    ary: {
      title: 'الدروب شيبينغ الحديث (Modern Dropshipping)',
      shortDesc: 'بيع منتجات تريند بمتجر إلكتروني احترافي وشحنها مباشرة من المورد للعميل مع التركيز على الإعلانات.',
      category: 'التجارة الإلكترونية'
    },
    ar: {
      title: 'الدروب شيبينغ الحديث (Modern Dropshipping)',
      shortDesc: 'بناء متجر إلكتروني لمنتجات رابحة وشحنها من المورد للمشتري مباشرة مع التركيز على التسويق بالفيديو.',
      category: 'التجارة الإلكترونية'
    },
    en: {
      title: 'Modern Dropshipping',
      shortDesc: 'Sell trending e-commerce products without inventory by routing orders directly from vetted suppliers to customers.',
      category: 'E-commerce'
    },
    fr: {
      title: 'Dropshipping Moderne',
      shortDesc: 'Commercialisez des produits tendance sans stock en acheminant les commandes directement du fournisseur au client.',
      category: 'E-commerce'
    },
    es: {
      title: 'Dropshipping Moderno',
      shortDesc: 'Vende productos en tendencia sin stock gestionando pedidos directamente de proveedores verificados a clientes.',
      category: 'Comercio Electrónico'
    },
    de: {
      title: 'Modernes Dropshipping',
      shortDesc: 'Verkaufen Sie Trendprodukte ohne eigenes Lager mit Direktversand vom geprüften Lieferanten an den Endkunden.',
      category: 'E-Commerce'
    },
    it: {
      title: 'Dropshipping Moderno',
      shortDesc: 'Vendi prodotti di tendenza senza magazzino spedendo direttamente dai fornitori verificati ai clienti finali.',
      category: 'E-commerce'
    },
    pt: {
      title: 'Dropshipping Moderno',
      shortDesc: 'Venda produtos validados sem manter estoque, enviando pedidos diretamente do fornecedor para o consumidor.',
      category: 'Comércio Eletrônico'
    },
    zh: {
      title: '新一代一件代发电商 (Modern Dropshipping)',
      shortDesc: '依托优质供应链代发爆款商品，主攻短视频内容引流与高转化独立站，无需压货与重资产投入。',
      category: '电子商务'
    }
  },
  'ecommerce': {
    ary: {
      title: 'التجارة الإلكترونية بعلامة تجارية (Branded E-commerce)',
      shortDesc: 'بناء براند محلي أو عالمي بمنتجات مميزة، تغليف خاص، وتجربة عميل قوية باش دير بيزنس مستدام.',
      category: 'التجارة الإلكترونية'
    },
    ar: {
      title: 'التجارة الإلكترونية بعلامة تجارية (Branded E-commerce)',
      shortDesc: 'إطلاق علامة تجارية خاصة بمنتجات متميزة وخدمة عملاء راقية لبناء أصول رقمية مستدامة.',
      category: 'التجارة الإلكترونية'
    },
    en: {
      title: 'Branded E-commerce & Direct-to-Consumer',
      shortDesc: 'Build a private-label e-commerce brand with tailored packaging, high customer retention, and scalable margins.',
      category: 'E-commerce'
    },
    fr: {
      title: 'E-commerce de Marque & D2C',
      shortDesc: 'Développez une marque e-commerce propre avec packaging sur mesure et forte fidélisation client.',
      category: 'E-commerce'
    },
    es: {
      title: 'Comercio Electrónico de Marca Propia',
      shortDesc: 'Crea una marca de comercio electrónico propia con empaque personalizado y alta fidelización de clientes.',
      category: 'Comercio Electrónico'
    },
    de: {
      title: 'Marken-E-Commerce (D2C)',
      shortDesc: 'Bauen Sie eine eigene E-Commerce-Marke mit individuellem Packaging und hoher Kundenbindung auf.',
      category: 'E-Commerce'
    },
    it: {
      title: 'E-commerce di Marchio Proprio (D2C)',
      shortDesc: 'Costruisci un brand e-commerce proprietario con packaging curato e forte fidelizzazione dei clienti.',
      category: 'E-commerce'
    },
    pt: {
      title: 'E-commerce de Marca Própria (D2C)',
      shortDesc: 'Crie uma marca sólida de e-commerce com embalagem personalizada e clientes recorrentes fiéis.',
      category: 'Comércio Eletrônico'
    },
    zh: {
      title: 'DTC 原创品牌出海与本地电商品牌',
      shortDesc: '建立具备独立包装、极致用户体验与高复购率的DTC电商品牌，沉淀长效资产。',
      category: '电子商务'
    }
  },
  'online-courses': {
    ary: {
      title: 'صناعة وبيع الكورسات والتكوينات (Online Courses)',
      shortDesc: 'تغليف المعرفة والخبرة ديالك فـ دورات مسجلة ومفيدة وبيعها للجمهور المهتم.',
      category: 'التعليم والتدريب'
    },
    ar: {
      title: 'صناعة وبيع الدورات التدريبية الرقمية',
      shortDesc: 'تحويل خبرتك العملية إلى برامج تدريبية مسجلة وبيعها لآلاف الطلاب والمهنيين بعوائد متكررة.',
      category: 'التعليم والتدريب'
    },
    en: {
      title: 'Creating & Selling Online Courses',
      shortDesc: 'Package your professional expertise into recorded courses and cohorts to monetize your knowledge at scale.',
      category: 'Education'
    },
    fr: {
      title: 'Création et Vente de Formations en Ligne',
      shortDesc: 'Transformez votre expertise en cours vidéo enregistrés et monétisez votre savoir à grande échelle.',
      category: 'Éducation'
    },
    es: {
      title: 'Creación y Venta de Cursos Online',
      shortDesc: 'Convierte tu experiencia profesional en cursos grabados y monetiza tus conocimientos a gran escala.',
      category: 'Educación'
    },
    de: {
      title: 'Erstellung und Verkauf von Online-Kursen',
      shortDesc: 'Bündeln Sie Ihr Fachwissen in digitalen Videokursen und monetarisieren Sie Ihr Know-how skalierbar.',
      category: 'Bildung'
    },
    it: {
      title: 'Creazione e Vendita di Corsi Online',
      shortDesc: 'Trasforma le tue competenze in video corsi registrati e monetizza la tua conoscenza su scala globale.',
      category: 'Formazione'
    },
    pt: {
      title: 'Criação e Venda de Cursos Online',
      shortDesc: 'Empacote suas habilidades em cursos gravados de alto valor e monetize seu conhecimento em escala.',
      category: 'Educação'
    },
    zh: {
      title: '知识付费与在线系统课程变现',
      shortDesc: '将专业技能与行业经验体系化录制为高价值精品课程，通过学员社群与复利分发实现规模化变现。',
      category: '在线教育'
    }
  },
  'online-coaching': {
    ary: {
      title: 'الكوتشينغ والاستشارات الفردية (1-on-1 Coaching)',
      shortDesc: 'تقديم حصص استشارية شخصية للناس أو المشاريع ومساعدتهم يوصلو لأهدافهم بتسعيرة محترمة.',
      category: 'الخدمات الرقمية'
    },
    ar: {
      title: 'التدريب والاستشارات الفردية (1-on-1 Coaching)',
      shortDesc: 'تقديم جلسات توجيه مخصصة واستشارات تخصصية لمساعدة العملاء على تجاوز التحديات بأعلى عائد للساعة.',
      category: 'الخدمات الرقمية'
    },
    en: {
      title: '1-on-1 Online Coaching & Consulting',
      shortDesc: 'Offer high-ticket specialized coaching and advisory sessions helping clients achieve specific tangible goals.',
      category: 'Digital Services'
    },
    fr: {
      title: 'Coaching & Conseil Individuel en Ligne',
      shortDesc: 'Proposez des séances d’accompagnement sur mesure et conseils stratégiques à fort taux horaire.',
      category: 'Services Digitaux'
    },
    es: {
      title: 'Coaching y Consultoría 1 a 1 Online',
      shortDesc: 'Ofrece sesiones de asesoría personalizada de alto valor ayudando a clientes a alcanzar metas específicas.',
      category: 'Servicios Digitales'
    },
    de: {
      title: '1-zu-1 Online-Coaching & Beratung',
      shortDesc: 'Bieten Sie hochpreisige Fachberatung und individuelle Coaching-Sessions für messbare Erfolge an.',
      category: 'Digitale Dienste'
    },
    it: {
      title: 'Coaching e Consulenza 1 a 1 Online',
      shortDesc: 'Offri sessioni di consulenza specialistica e mentoring individuale con tariffe orarie elevate.',
      category: 'Servizi Digitali'
    },
    pt: {
      title: 'Coaching e Consultoria Individual Online',
      shortDesc: 'Ofereça mentorias exclusivas e consultorias estratégicas ajudando clientes com resultados rápidos.',
      category: 'Serviços Digitais'
    },
    zh: {
      title: '1对1 在线高客单教练与咨询 (Coaching)',
      shortDesc: '提供定制化专属咨询与陪跑辅导，以高客单价时长制解决客户高价值业务痛点。',
      category: '数字服务'
    }
  },
  'newsletter': {
    ary: {
      title: 'النشرات البريدية والرعايات (Newsletters)',
      shortDesc: 'بناء قاعدة قراء فـ النشرة البريدية وإرسال إيميلات مفيدة، والربح من الرعايات والاشتراكات.',
      category: 'كتابة المحتوى'
    },
    ar: {
      title: 'النشرات البريدية المدفوعة والرعايات (Newsletters)',
      shortDesc: 'بناء قاعدة مشتركين مخلصين عبر البريد الإلكتروني والربح من إعلانات الرعاية المباشرة والاشتراكات.',
      category: 'كتابة المحتوى'
    },
    en: {
      title: 'Curated Paid & Sponsored Newsletters',
      shortDesc: 'Build a high-trust email audience and monetize via sponsored placements, classifieds, and premium tiers.',
      category: 'Writing'
    },
    fr: {
      title: 'Newsletters Rémunérées et Sponsoring',
      shortDesc: 'Fédérez une audience engagée par e-mail et monétisez par des encarts publicitaires et des abonnements VIP.',
      category: 'Rédaction'
    },
    es: {
      title: 'Boletines de Correo Patrocinados (Newsletters)',
      shortDesc: 'Crea una audiencia leal por correo electrónico y monetiza mediante patrocinios directos y membresías de pago.',
      category: 'Redacción'
    },
    de: {
      title: 'Bezahlte & Gesponserte Newsletter',
      shortDesc: 'Bauen Sie eine treue E-Mail-Leserschaft auf und monetarisieren Sie über Sponsoring und Premium-Abos.',
      category: 'Texterstellung'
    },
    it: {
      title: 'Newsletter a Pagamento e Sponsorizzazioni',
      shortDesc: 'Costruisci una base di lettori fidelizzati via email e guadagna tramite sponsorizzazioni e abbonamenti.',
      category: 'Scrittura'
    },
    pt: {
      title: 'Newsletters Pagas e Patrocinadas',
      shortDesc: 'Construa uma lista engajada de e-mails e monetize com anúncios patrocinados e planos premium.',
      category: 'Redação'
    },
    zh: {
      title: '精品垂直邮件通讯变现 (Newsletters)',
      shortDesc: '构建私域高净值订阅邮件受众，通过品牌商业赞助植入与付费订阅会员赚取美元被动收入。',
      category: '写作与文案'
    }
  },
  'micro-saas': {
    ary: {
      title: 'البرمجيات الصغيرة بالاشتراك (Micro-SaaS)',
      shortDesc: 'بناء أداة ويب أو إضافة بسيطة كتحل مشكل محدد، والربح من اشتراكات شهرية متكررة (MRR).',
      category: 'البرمجة والتقنية'
    },
    ar: {
      title: 'تطوير البرمجيات الصغيرة كخدمة (Micro-SaaS)',
      shortDesc: 'إنشاء أدوات برمجية ذكية تحل مشكلة محددة وتوليد دخل شهري متكرر عبر اشتراكات المستخدمين.',
      category: 'البرمجة والتقنية'
    },
    en: {
      title: 'Micro SaaS & AI Web Wrappers',
      shortDesc: 'Build focused software solutions that solve a single painful problem and charge monthly recurring subscriptions.',
      category: 'Development'
    },
    fr: {
      title: 'Micro-SaaS & Outils Logiciels par Abonnement',
      shortDesc: 'Développez des micro-applications résolvant un problème ciblé avec un modèle d’abonnement mensuel récurrent.',
      category: 'Développement'
    },
    es: {
      title: 'Micro SaaS y Software por Suscripción',
      shortDesc: 'Crea pequeñas herramientas de software que resuelven un problema concreto y cobra suscripciones recurrentes.',
      category: 'Desarrollo'
    },
    de: {
      title: 'Micro-SaaS & Web-Tools im Abo',
      shortDesc: 'Entwickeln Sie fokussierte Softwarelösungen für spezifische Probleme mit wiederkehrenden Monatsbeiträgen (MRR).',
      category: 'Entwicklung'
    },
    it: {
      title: 'Micro SaaS e Software in Abbonamento',
      shortDesc: 'Sviluppa strumenti software mirati che risolvono problemi specifici con entrate mensili ricorrenti.',
      category: 'Sviluppo'
    },
    pt: {
      title: 'Micro SaaS e Software por Assinatura',
      shortDesc: 'Crie softwares focados que resolvem problemas pontuais e fature receitas mensais recorrentes (MRR).',
      category: 'Desenvolvimento'
    },
    zh: {
      title: '垂直微型SaaS软件与AI工具箱',
      shortDesc: '开发解决垂直痛点的轻量级Web或浏览器插件工具，以月度订阅制(MRR)获得高毛利被动现金流。',
      category: '开发与技术'
    }
  },
  'cpa-marketing': {
    ary: {
      title: 'التسويق بالأداء (CPA Marketing)',
      shortDesc: 'ترويج عروض كتربح عليها فاش كيدير الشخص إجراء بسيط بحال تسجيل إيميل أو تيليشارجي تطبيق.',
      category: 'التسويق الرقمي'
    },
    ar: {
      title: 'التسويق بالعمولة مقابل الإجراء (CPA Marketing)',
      shortDesc: 'الحصول على أرباح مقابل قيام الزائر بإجراء محدد كالتسجيل أو تحميل تطبيق دون اشتراط الشراء.',
      category: 'التسويق الرقمي'
    },
    en: {
      title: 'CPA (Cost Per Action) Marketing',
      shortDesc: 'Earn payouts when users perform simple actions like lead registrations, app installs, or form submissions.',
      category: 'Marketing'
    },
    fr: {
      title: 'Marketing CPA (Coût par Action)',
      shortDesc: 'Gagnez des rémunérations lorsqu’un utilisateur effectue une action (inscription, téléchargement, formulaire).',
      category: 'Marketing'
    },
    es: {
      title: 'Marketing CPA (Coste por Acción)',
      shortDesc: 'Genera ingresos cuando los usuarios realizan acciones simples como registros, descargas de apps o formularios.',
      category: 'Marketing'
    },
    de: {
      title: 'CPA-Marketing (Cost per Action)',
      shortDesc: 'Verdienen Sie Vergütungen für konkrete Aktionen wie Registrierungen, App-Installationen oder Formulare.',
      category: 'Marketing'
    },
    it: {
      title: 'Marketing CPA (Costo per Azione)',
      shortDesc: 'Guadagna commissioni quando gli utenti compiono azioni come registrazioni, installazioni app o lead.',
      category: 'Marketing'
    },
    pt: {
      title: 'Marketing CPA (Custo por Ação)',
      shortDesc: 'Ganhe comissões quando os usuários realizam ações específicas como cadastros, downloads ou preenchimento de formulários.',
      category: 'Marketing'
    },
    zh: {
      title: 'CPA 效果营销与线索激励变现',
      shortDesc: '无需用户完成实际购物支付，引导用户完成注册、问卷、APP安装等动作即可赚取美金结算收益。',
      category: '数字营销'
    }
  },
  'lead-generation': {
    ary: {
      title: 'جلب الزبائن للمشاريع (Lead Generation)',
      shortDesc: 'جمع بيانات العملاء المهتمين بسيرفيسات معينة وبيع هاد الفرص للشركات والمشاريع المحلية.',
      category: 'الخدمات الرقمية'
    },
    ar: {
      title: 'توليد العملاء المحتملين للشركات (Lead Generation)',
      shortDesc: 'استقطاب بيانات عملاء ذوي نية شراء عالية وبيع هذه الفرص البيعية لشركات المقاولات والخدمات المحلية.',
      category: 'الخدمات الرقمية'
    },
    en: {
      title: 'B2B & Local Lead Generation',
      shortDesc: 'Generate and qualify high-intent prospect leads for local businesses and professional service agencies.',
      category: 'Digital Services'
    },
    fr: {
      title: 'Génération de Leads pour Entreprises',
      shortDesc: 'Captez des prospects qualifiés à forte intention d’achat et vendez ces contacts aux entreprises locales.',
      category: 'Services Digitaux'
    },
    es: {
      title: 'Generación de Clientes Potenciales (Leads)',
      shortDesc: 'Capta prospectos cualificados con alta intención de compra y vende estos contactos a empresas locales.',
      category: 'Servicios Digitales'
    },
    de: {
      title: 'Lead-Generierung für Unternehmen',
      shortDesc: 'Gewinnen Sie qualifizierte Interessenten mit hoher Kaufabsicht und verkaufen Sie diese an lokale Firmen.',
      category: 'Digitale Dienste'
    },
    it: {
      title: 'Generazione di Lead per Aziende',
      shortDesc: 'Acquisisci contatti qualificati ad alto valore e vendi questi lead ad aziende e professionisti locali.',
      category: 'Servizi Digitali'
    },
    pt: {
      title: 'Geração de Leads para Empresas Locais',
      shortDesc: 'Capture contatos altamente qualificados e venda essas oportunidades para negócios locais e prestadores de serviço.',
      category: 'Serviços Digitais'
    },
    zh: {
      title: 'B2B 与本地企业销售线索挖掘 (Lead Gen)',
      shortDesc: '为本地高客单企业（装修/法律/齿科）精准获客并清洗销售意向线索，按有效商机结算佣金。',
      category: '数字服务'
    }
  },
  'stock-content': {
    ary: {
      title: 'بيع الصور والفيديوهات (Stock Content)',
      shortDesc: 'تصوير مقاطع احترافية ومؤثرات صوتية ورفعها فـ منصات الستوك العالمية كدخل سلبي.',
      category: 'التصميم'
    },
    ar: {
      title: 'بيع الصور والفيديوهات والمقاطع الصوتية (Stock Content)',
      shortDesc: 'إنتاج مواد مرئية وصوتية عالية الجودة وبيع تراخيص استخدامها للمصممين والشركات عبر منصات الستوك.',
      category: 'التصميم'
    },
    en: {
      title: 'Selling Stock Footage, Photos & Audio',
      shortDesc: 'Produce high-quality b-roll footage, photos, and sound effects to license on Adobe Stock, Shutterstock, and Pond5.',
      category: 'Design'
    },
    fr: {
      title: 'Vente de Photos et Vidéos Stock',
      shortDesc: 'Produisez des rushs vidéo, photos et effets audio de qualité sous licence sur Adobe Stock et Shutterstock.',
      category: 'Design'
    },
    es: {
      title: 'Venta de Fotografías y Videos de Stock',
      shortDesc: 'Produce videos de apoyo, fotografías y efectos de sonido para licenciar en Adobe Stock y Shutterstock.',
      category: 'Diseño'
    },
    de: {
      title: 'Verkauf von Stock-Fotos & Video-Footage',
      shortDesc: 'Produzieren Sie hochauflösende Videos und Fotos zur Lizenzierung auf Adobe Stock, Shutterstock und Pond5.',
      category: 'Design'
    },
    it: {
      title: 'Vendita di Foto e Video Stock',
      shortDesc: 'Produci filmati di supporto, fotografie ed effetti sonori da concedere in licenza su Adobe Stock e Shutterstock.',
      category: 'Design'
    },
    pt: {
      title: 'Venda de Fotos e Vídeos de Stock',
      shortDesc: 'Produza imagens, vídeos b-roll e trilhas sonoras de alta qualidade para licenciar no Adobe Stock e Shutterstock.',
      category: 'Design'
    },
    zh: {
      title: '商业免版税图片、视频与音效素材销售',
      shortDesc: '拍摄并制作高需求商业B-Roll视频切片、4K照片与特效音效，上传Adobe Stock与Shutterstock赚取长尾版税。',
      category: '设计'
    }
  },
  'gaming-content': {
    ary: {
      title: 'صناعة محتوى الألعاب والستريمينغ (Gaming)',
      shortDesc: 'لعب وتصوير لقطات الألعاب، الستريم فـ Kick و Twitch، وبناء مجتمع مخلص والربح من الإعلانات والدعم.',
      category: 'صناعة المحتوى'
    },
    ar: {
      title: 'صناعة محتوى الألعاب والبث المباشر (Gaming Content)',
      shortDesc: 'بث ألعاب الفيديو وتقديم لقطات اللعب الممتعة وبناء مجتمع داعم وتحقيق دخل من الإعلانات والتبرعات.',
      category: 'صناعة المحتوى'
    },
    en: {
      title: 'Gaming Content & Streaming',
      shortDesc: 'Broadcast gameplay, create high-energy highlights, and build a dedicated community monetized via subs and sponsors.',
      category: 'Content Creation'
    },
    fr: {
      title: 'Création de Contenu Gaming & Streaming',
      shortDesc: 'Diffusez vos sessions de jeux, créez des clips captivants et monétisez par les dons, abonnements et sponsors.',
      category: 'Création de Contenu'
    },
    es: {
      title: 'Contenido de Videojuegos y Streaming',
      shortDesc: 'Transmite partidas, crea resúmenes dinámicos y construye una comunidad monetizada con donaciones y patrocinios.',
      category: 'Creación de Contenido'
    },
    de: {
      title: 'Gaming-Content & Livestreaming',
      shortDesc: 'Streamen Sie Gameplay, schneiden Sie Highlights und bauen Sie eine treue Community mit Subs und Sponsoring auf.',
      category: 'Content Creation'
    },
    it: {
      title: 'Contenuti Gaming e Live Streaming',
      shortDesc: 'Trasmetti sessioni di gioco, crea highlight coinvolgenti e monetizza tramite abbonamenti, donazioni e sponsor.',
      category: 'Creazione di Contenuti'
    },
    pt: {
      title: 'Criação de Conteúdo Gamer e Streaming',
      shortDesc: 'Transmita gameplays ao vivo, edite melhores momentos e construa uma comunidade com assinaturas e marcas.',
      category: 'Criação de Conteúdo'
    },
    zh: {
      title: '游戏短视频与跨平台游戏直播 (Gaming)',
      shortDesc: '输出高能精彩击杀集锦与实况解说，通过粉丝打赏、平台播放分成与电竞外设赞助变现。',
      category: '内容创作'
    }
  },
  'free-fire-content': {
    ary: {
      title: 'صناعة محتوى فري فاير المتخصص (Free Fire)',
      shortDesc: 'احتراف مونتاج الوان تاب والـ Beat Sync، إعدادات الحساسية، رومات التحدي، والوصول لشراكة جارينا الرسمية (V-Badge).',
      category: 'صناعة المحتوى'
    },
    ar: {
      title: 'صناعة محتوى فري فاير المتخصص (Free Fire)',
      shortDesc: 'إتقان مونتاج الوان تاب والـ Beat Sync، إعدادات الحساسية DPI، وبطولات الرومات والتأهل لبرنامج شراكة جارينا (V-Badge).',
      category: 'صناعة المحتوى'
    },
    en: {
      title: 'Free Fire Specialized Content Creation',
      shortDesc: 'Master one-tap beat-sync montages, phone sensitivity DPI setups, custom rooms, and qualify for the Garena V-Badge.',
      category: 'Content Creation'
    },
    fr: {
      title: 'Création de Contenu Spécialisé Free Fire',
      shortDesc: 'Maîtrisez les montages One-Tap Beat Sync, réglages DPI, parties personnalisées et visez le badge partenaire V-Badge.',
      category: 'Création de Contenu'
    },
    es: {
      title: 'Contenido Especializado de Free Fire',
      shortDesc: 'Domina montajes de one-tap sincronizados, configuraciones DPI, salas personalizadas y califica para la V-Badge.',
      category: 'Creación de Contenido'
    },
    de: {
      title: 'Free Fire Spezialisierter Gaming-Content',
      shortDesc: 'Beherrschen Sie One-Tap Beat-Sync Montagen, DPI-Einstellungen und qualifizieren Sie sich für das Garena V-Badge.',
      category: 'Content Creation'
    },
    it: {
      title: 'Contenuti Specializzati Free Fire',
      shortDesc: 'Padroneggia montaggi one-tap a ritmo di musica, settaggi DPI e qualificati per il badge partner ufficiale Garena.',
      category: 'Creazione di Contenuti'
    },
    pt: {
      title: 'Criação de Conteúdo Focado em Free Fire',
      shortDesc: 'Domine montagens de capa sincronizadas, ajustes de DPI para celular e conquiste o verificado oficial (V-Badge).',
      category: 'Criação de Conteúdo'
    },
    zh: {
      title: 'Free Fire 战术与高光特效垂直创作',
      shortDesc: '专精一击必杀卡点卡镜剪辑、手机DPI压枪灵敏度教学与水友自定义房间赛，冲击Garena官方V标签约。',
      category: '内容创作'
    }
  },
  'faceless-youtube': {
    ary: {
      title: 'قنوات يوتيوب بدون إظهار الوجه (Faceless YouTube)',
      shortDesc: 'إنشاء وإدارة قنوات يوتيوب مربحة بلا ما تبان، بالصوت، التعليق الصوتي وفيديوهات السرد الممتعة.',
      category: 'صناعة المحتوى'
    },
    ar: {
      title: 'قنوات يوتيوب بدون إظهار الوجه (Faceless Automation)',
      shortDesc: 'بناء قنوات يوتيوب مربحة تعتمد على التعليق الصوتي والمونتاج والصور التعبيرية وتحقيق دخل قوي من AdSense.',
      category: 'صناعة المحتوى'
    },
    en: {
      title: 'Faceless YouTube Automation',
      shortDesc: 'Build automated YouTube channels using voiceovers, licensed footage, and storytelling without showing your face.',
      category: 'Content Creation'
    },
    fr: {
      title: 'Chaînes YouTube sans Visage (Faceless Automation)',
      shortDesc: 'Créez des chaînes YouTube rentables grâce aux voix off et montages dynamiques sans jamais montrer votre visage.',
      category: 'Création de Contenu'
    },
    es: {
      title: 'Automatización de YouTube sin Rostro (Faceless)',
      shortDesc: 'Construye canales rentables de YouTube utilizando locución en off y edición visual sin mostrar tu rostro.',
      category: 'Creación de Contenido'
    },
    de: {
      title: 'Faceless YouTube Automation',
      shortDesc: 'Bauen Sie profitable YouTube-Kanäle mit Voiceover und Stock-Footage auf, ohne Ihr Gesicht zu zeigen.',
      category: 'Content Creation'
    },
    it: {
      title: 'Canali YouTube Senza Volto (Faceless Automation)',
      shortDesc: 'Costruisci canali YouTube remunerativi basati su voce narrante e montaggio video senza mostrare il viso.',
      category: 'Creazione di Contenuti'
    },
    pt: {
      title: 'Canais do YouTube Sem Rosto (Faceless Automation)',
      shortDesc: 'Crie canais lucrativos no YouTube com locução e edição dinâmica sem precisar aparecer em frente às câmeras.',
      category: 'Criação de Conteúdo'
    },
    zh: {
      title: '无脸 YouTube 自动化频道 (Faceless Automation)',
      shortDesc: '无需真人露脸，借助优质旁白配音、素材拼接与深层叙事搭建自动化矩阵频道，持续斩获美金分成。',
      category: '内容创作'
    }
  },
  'faceless-tiktok': {
    ary: {
      title: 'حسابات تيك توك بدون وجه (Faceless TikTok)',
      shortDesc: 'صناعة فيديوهات قصيرة جذابة، حكم، قصص أو نصائح يومية بدون ما تبيّن وجهك والربح من المشاهدات.',
      category: 'صناعة المحتوى'
    },
    ar: {
      title: 'حسابات تيك توك بدون إظهار الوجه (Faceless TikTok)',
      shortDesc: 'نشر مقاطع قصيرة سريعة الانتشار قائمة على النصوص واللقطات الجذابة والربح من برنامج الإبداع والتسويق.',
      category: 'صناعة المحتوى'
    },
    en: {
      title: 'Faceless TikTok & Short-Form Brand',
      shortDesc: 'Launch viral short-form accounts using text hooks, kinetic captions, and curated b-roll without personal exposure.',
      category: 'Content Creation'
    },
    fr: {
      title: 'Comptes TikTok sans Visage (Faceless TikTok)',
      shortDesc: 'Créez des vidéos courtes virales avec sous-titres animés et plans immersifs sans exposer votre identité.',
      category: 'Création de Contenu'
    },
    es: {
      title: 'Cuentas de TikTok sin Rostro (Faceless TikTok)',
      shortDesc: 'Lanza cuentas virales de videos cortos usando ganchos de texto y planos dinámicos sin mostrar tu identidad.',
      category: 'Creación de Contenido'
    },
    de: {
      title: 'Faceless TikTok & Kurzvideo-Marken',
      shortDesc: 'Starten Sie virale Kurzvideo-Accounts mit Texteinblendungen und B-Roll ohne persönliche Erkennbarkeit.',
      category: 'Content Creation'
    },
    it: {
      title: 'Account TikTok Senza Volto (Faceless TikTok)',
      shortDesc: 'Lancia video brevi virali sfruttando ganci visivi e sottotitoli dinamici senza mai mostrarti in video.',
      category: 'Creazione di Contenuti'
    },
    pt: {
      title: 'Contas do TikTok Sem Rosto (Faceless TikTok)',
      shortDesc: 'Lance perfis virais de vídeos curtos com legendas dinâmicas e vídeos de apoio sem precisar aparecer.',
      category: 'Criação de Conteúdo'
    },
    zh: {
      title: 'TikTok 无真人出镜爆款短视频矩阵',
      shortDesc: '运用爆款文案Hook、动效字幕与沉浸式画面批量制作高完播短视频，变现创作者基金与带货商单。',
      category: '内容创作'
    }
  },
  'local-business-digital-services': {
    ary: {
      title: 'الخدمات الرقمية للمشاريع المحلية (Local Business)',
      shortDesc: 'مساعدة المحلات والريسطورات المحلية يتقاد ليهم Google Maps، السوشل ميديا، ومواقع الويب باشتراك شهري.',
      category: 'الخدمات الرقمية'
    },
    ar: {
      title: 'الخدمات الرقمية للمشاريع المحلية (Local Business Services)',
      shortDesc: 'تحسين التواجد الرقمي للأنشطة التجارية المحلية (خرائط جوجل، إدارة الحسابات، الحملات والمواقع).',
      category: 'الخدمات الرقمية'
    },
    en: {
      title: 'Local Business Digital Services',
      shortDesc: 'Help local clinics, restaurants, and shops modernize their Google Business profile, social channels, and web presence.',
      category: 'Digital Services'
    },
    fr: {
      title: 'Services Digitaux pour Commerces Locaux',
      shortDesc: 'Optimisez la présence des commerces locaux (Google Maps, réseaux sociaux, sites web) contre rémunération mensuelle.',
      category: 'Services Digitaux'
    },
    es: {
      title: 'Servicios Digitales para Negocios Locales',
      shortDesc: 'Ayuda a comercios locales a modernizar su perfil de Google Maps, redes sociales y sitio web con pagos recurrentes.',
      category: 'Servicios Digitales'
    },
    de: {
      title: 'Digitale Dienstleistungen für lokale Unternehmen',
      shortDesc: 'Optimieren Sie Google Business, Social Media und Websites für lokale Geschäfte gegen monatliche Servicegebühren.',
      category: 'Digitale Dienste'
    },
    it: {
      title: 'Servizi Digitali per Imprese Locali',
      shortDesc: 'Migliora la presenza online di attività commerciali locali (Google Maps, social, siti web) con contratti mensili.',
      category: 'Servizi Digitali'
    },
    pt: {
      title: 'Serviços Digitais para Negócios Locais',
      shortDesc: 'Ajude empresas e comércios locais a modernizar Google Maps, redes sociais e sites com mensalidades fixas.',
      category: 'Serviços Digitais'
    },
    zh: {
      title: '本地实体商户数字化营销全案服务',
      shortDesc: '为本地餐饮、医美与门店优化谷歌地图商户配置、私域社媒与轻量独立站，建立稳定本地月费合作。',
      category: '数字服务'
    }
  }
};

// Localize an IncomePath reliably with authentic language output
export function getLocalizedPath(path: IncomePath | null | undefined, language: Language): {
  title: string;
  shortDesc: string;
  category: string;
} {
  if (!path) {
    return { title: '', shortDesc: '', category: '' };
  }

  // 1. Check custom translation dictionary first
  const custom = PATH_TRANSLATIONS[path.id]?.[language];
  if (custom) {
    return {
      title: custom.title,
      shortDesc: custom.shortDesc,
      category: custom.category || path.category
    };
  }

  // 2. Fallbacks based on language
  if (language === 'ary') {
    return {
      title: (path as any).darijaTitle || path.arabicTitle || path.title,
      shortDesc: (path as any).darijaShortDescription || path.arabicShortDescription || path.shortDescription,
      category: path.category
    };
  }

  if (language === 'ar') {
    return {
      title: path.arabicTitle || path.title,
      shortDesc: path.arabicShortDescription || path.shortDescription,
      category: path.category
    };
  }

  if (language === 'fr') {
    return {
      title: path.frenchTitle || path.title,
      shortDesc: path.frenchShortDescription || path.shortDescription,
      category: path.category
    };
  }

  // For es, de, it, pt, zh, en: NEVER use French as a fallback! Use English title/description
  return {
    title: path.title,
    shortDesc: path.shortDescription || (path as any).description || '',
    category: path.category
  };
}

// Localize a ContentIdea reliably
export function getLocalizedIdea(idea: ContentIdea | null | undefined, language: Language): {
  title: string;
  hook: string;
  desc: string;
  cta: string;
} {
  if (!idea) {
    return { title: '', hook: '', desc: '', cta: '' };
  }

  if (language === 'ary') {
    return {
      title: (idea as any).darijaTitle || idea.arabicTitle || idea.title,
      hook: (idea as any).darijaHook || idea.arabicHook || idea.hook,
      desc: (idea as any).darijaDescription || idea.arabicDescription || idea.description,
      cta: (idea as any).darijaCta || idea.arabicCta || idea.cta
    };
  }

  if (language === 'ar') {
    return {
      title: idea.arabicTitle || idea.title,
      hook: idea.arabicHook || idea.hook,
      desc: idea.arabicDescription || idea.description,
      cta: idea.arabicCta || idea.cta
    };
  }

  if (language === 'fr') {
    return {
      title: idea.frenchTitle || idea.title,
      hook: idea.frenchHook || idea.hook,
      desc: idea.frenchDescription || idea.description,
      cta: (idea as any).frenchCta || idea.cta
    };
  }

  // Default international fallback (English) - NEVER French for non-French!
  return {
    title: idea.title,
    hook: idea.hook,
    desc: idea.description,
    cta: idea.cta
  };
}

// Localize a Tool/Calculator reliably
export function getLocalizedTool(tool: any, language: Language): {
  title: string;
  desc: string;
} {
  if (!tool) {
    return { title: '', desc: '' };
  }

  if (language === 'ary') {
    return {
      title: tool.darijaTitle || tool.arabicTitle || tool.title,
      desc: tool.darijaDescription || tool.arabicDescription || tool.description
    };
  }

  if (language === 'ar') {
    return {
      title: tool.arabicTitle || tool.title,
      desc: tool.arabicDescription || tool.description
    };
  }

  if (language === 'fr') {
    return {
      title: tool.frenchTitle || tool.title,
      desc: tool.frenchDescription || tool.description
    };
  }

  if (language === 'es') {
    return {
      title: tool.spanishTitle || tool.title,
      desc: tool.spanishDescription || tool.description
    };
  }

  if (language === 'de') {
    return {
      title: tool.germanTitle || tool.title,
      desc: tool.germanDescription || tool.description
    };
  }

  if (language === 'it') {
    return {
      title: tool.italianTitle || tool.title,
      desc: tool.italianDescription || tool.description
    };
  }

  if (language === 'pt') {
    return {
      title: tool.portugueseTitle || tool.title,
      desc: tool.portugueseDescription || tool.description
    };
  }

  if (language === 'zh') {
    return {
      title: tool.chineseTitle || tool.title,
      desc: tool.chineseDescription || tool.description
    };
  }

  return {
    title: tool.title,
    desc: tool.description
  };
}

// Localize a Creator Guide reliably
export function getLocalizedGuide(guide: any, language: Language): {
  name: string;
  tagline: string;
} {
  if (!guide) {
    return { name: '', tagline: '' };
  }

  if (language === 'ary') {
    return {
      name: guide.darijaName || guide.arabicName || guide.name,
      tagline: guide.taglineAr || guide.taglineEn || ''
    };
  }

  if (language === 'ar') {
    return {
      name: guide.arabicName || guide.name,
      tagline: guide.taglineAr || guide.taglineEn || ''
    };
  }

  if (language === 'fr') {
    return {
      name: guide.frenchName || guide.name,
      tagline: guide.taglineFr || guide.taglineEn || ''
    };
  }

  if (language === 'es') {
    return {
      name: guide.spanishName || guide.name,
      tagline: guide.taglineEs || guide.taglineEn || ''
    };
  }

  if (language === 'de') {
    return {
      name: guide.germanName || guide.name,
      tagline: guide.taglineDe || guide.taglineEn || ''
    };
  }

  if (language === 'it') {
    return {
      name: guide.italianName || guide.name,
      tagline: guide.taglineIt || guide.taglineEn || ''
    };
  }

  if (language === 'pt') {
    return {
      name: guide.portugueseName || guide.name,
      tagline: guide.taglinePt || guide.taglineEn || ''
    };
  }

  if (language === 'zh') {
    return {
      name: guide.chineseName || guide.name,
      tagline: guide.taglineZh || guide.taglineEn || ''
    };
  }

  return {
    name: guide.name,
    tagline: guide.taglineEn || ''
  };
}
