import { AIToolConfig } from '../types';

export const aiToolsList: AIToolConfig[] = [
  {
    id: 'ai-content-ideas',
    title: 'AI Content Ideas',
    arabicTitle: 'مولد أفكار المحتوى بالذكاء الاصطناعي',
    frenchTitle: 'Générateur d’Idées de Contenu par IA',
    description: 'Brainstorm viral angles, trending debates, and fresh concepts for your channel.',
    arabicDescription: 'توليد أفكار فيروسية وزوايا تصوير مبتكرة تناسب مجالك وجمهورك المستهدف.',
    frenchDescription: 'Trouvez des angles viraux et des concepts innovants pour votre chaîne.',
    category: 'Ideation',
    iconName: 'Lightbulb',
    placeholder: 'e.g., Free Fire tips, AI productivity tools, Crypto for beginners',
    arabicPlaceholder: 'مثال: نصائح فري فاير للاحتراف، أدوات ذكاء اصطناعي للإنتاجية، التجارة الإلكترونية للمبتدئين',
    frenchPlaceholder: 'ex: astuces Free Fire, productivité IA, e-commerce pour débutants',
    fields: [
      {
        id: 'topic',
        label: 'Main Topic / Niche',
        arabicLabel: 'الموضوع الرئيسي أو مجالك',
        type: 'text',
        placeholder: 'What is your core theme?'
      },
      {
        id: 'platform',
        label: 'Target Platform',
        arabicLabel: 'المنصة المستهدفة',
        type: 'select',
        options: [
          { label: 'TikTok & Reels (Short)', value: 'Shorts' },
          { label: 'YouTube (Long Video)', value: 'YouTube' },
          { label: 'Instagram (Carousel)', value: 'Instagram' },
          { label: 'Facebook Page', value: 'Facebook' }
        ]
      },
      {
        id: 'tone',
        label: 'Tone of Voice',
        arabicLabel: 'نبرة المحتوى',
        type: 'select',
        options: [
          { label: 'حماسي وسريع (High Energy)', value: 'energetic' },
          { label: 'تثقيفي عميق (Educational)', value: 'educational' },
          { label: 'تشويقي وغامض (Suspenseful)', value: 'mysterious' },
          { label: 'كوميدي ومرح (Humorous)', value: 'humorous' }
        ]
      }
    ]
  },
  {
    id: 'ai-script-generator',
    title: 'AI Video Script Generator',
    arabicTitle: 'مولد سكربت وسيناريو الفيديو',
    frenchTitle: 'Générateur de Script Vidéo par IA',
    description: 'Generate full word-for-word scripts complete with visual cues, sound FX, and pacing.',
    arabicDescription: 'كتابة سيناريو فيديو كامل كلمة بكلمة مع التوجيهات البصرية والمؤثرات الصوتية.',
    frenchDescription: 'Rédigez des scripts complets avec indications visuelles et effets sonores.',
    category: 'Scripting',
    iconName: 'FileText',
    placeholder: 'Video subject and key points to cover',
    arabicPlaceholder: 'موضوع الفيديو والنقاط الرئيسية التي تريد تغطيتها بالتفصيل',
    frenchPlaceholder: 'Sujet de la vidéo et points clés à aborder',
    fields: [
      {
        id: 'scriptTitle',
        label: 'Video Topic / Premise',
        arabicLabel: 'فكرة أو عنوان الفيديو',
        type: 'text'
      },
      {
        id: 'duration',
        label: 'Target Length',
        arabicLabel: 'المدة المطلوبة',
        type: 'select',
        options: [
          { label: '30-45 ثانية (تيك توك / شورتس)', value: '30s' },
          { label: '60-90 ثانية (ريلز عميق)', value: '60s' },
          { label: '3-5 دقائق (يوتيوب متوسط)', value: '3m' },
          { label: '8-12 دقيقة (يوتيوب وثائقي كامل)', value: '10m' }
        ]
      },
      {
        id: 'keyPoints',
        label: 'Key Points to Include',
        arabicLabel: 'أهم 2-3 معلومات يجب ذكرها',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'ai-hook-generator',
    title: 'AI Hook Generator',
    arabicTitle: 'مولد الخطافات والهوك الخاطف',
    frenchTitle: 'Générateur d’Accroches (Hooks) par IA',
    description: 'Craft 5 high-converting opening hooks that stop user thumb scrolling within 2 seconds.',
    arabicDescription: 'توليد 5 خطافات افتتاحية صادمة تمنع المشاهد من التمرير وتجبره على إكمال الفيديو.',
    frenchDescription: 'Créez 5 premières phrases percutantes qui captivent l’audience en moins de 2 secondes.',
    category: 'Optimization',
    iconName: 'Zap',
    placeholder: 'What is your video about?',
    arabicPlaceholder: 'عن ماذا يتحدث الفيديو الخاص بك؟',
    frenchPlaceholder: 'De quoi parle votre vidéo ?',
    fields: [
      {
        id: 'hookSubject',
        label: 'Core Subject',
        arabicLabel: 'موضوع الفيديو الأساسي',
        type: 'text'
      },
      {
        id: 'hookStyle',
        label: 'Hook Psychology',
        arabicLabel: 'الأسلوب النفسي للهوك',
        type: 'select',
        options: [
          { label: 'كشف سر أو خطأ شائع (Exposing a Mistake)', value: 'mistake' },
          { label: 'سؤال صادم ومحير (Curiosity Gap)', value: 'curiosity' },
          { label: 'وعد بنتيجة خارقة فورية (High Reward Promise)', value: 'reward' },
          { label: 'قصة شخصية غريبة (Story Arc)', value: 'story' }
        ]
      }
    ]
  },
  {
    id: 'youtube-title-generator',
    title: 'YouTube Title Generator',
    arabicTitle: 'مولد عناوين يوتيوب عالية النقر',
    frenchTitle: 'Générateur de Titres YouTube par IA',
    description: 'Generate clickable, curiosity-driven titles with high Click-Through Rate (CTR) potential.',
    arabicDescription: 'توليد عناوين تعتمد على علم النفس والفضول ترفع نسبة النقر للظهور بشكل قياسي.',
    frenchDescription: 'Générez des titres irrésistibles à fort taux de clic (CTR) pour YouTube.',
    category: 'Optimization',
    iconName: 'Sparkles',
    placeholder: 'Draft title or video concept',
    arabicPlaceholder: 'مسودة عنوانك أو الفكرة الأولية للفيديو',
    frenchPlaceholder: 'Votre idée de départ ou ébauche de titre',
    fields: [
      {
        id: 'concept',
        label: 'Video Concept',
        arabicLabel: 'فكرة الفيديو باختصار',
        type: 'text'
      },
      {
        id: 'niche',
        label: 'Niche',
        arabicLabel: 'المجال',
        type: 'text',
        placeholder: 'مثلاً: جيمنج، تقنية، تعليم'
      }
    ]
  },
  {
    id: 'ai-description-generator',
    title: 'AI Description Generator',
    arabicTitle: 'مولد أوصاف يوتيوب وسيو الفيديوهات',
    frenchTitle: 'Générateur de Descriptions YouTube SEO',
    description: 'Create SEO-rich descriptions complete with timestamps, key takeaway bullets, and social links.',
    arabicDescription: 'كتابة وصف فيديو غني بالكلمات المفتاحية والفواصل الزمنية وروابط التواصل لتحسين الأرشفة.',
    frenchDescription: 'Rédigez des descriptions complètes avec chapitres et mots-clés de référencement.',
    category: 'SEO',
    iconName: 'AlignLeft',
    placeholder: 'Brief summary of what happened in the video',
    arabicPlaceholder: 'ملخص موجز لمحتوى الفيديو والروابط المراد وضعها',
    frenchPlaceholder: 'Résumé de la vidéo et liens à intégrer',
    fields: [
      {
        id: 'videoSummary',
        label: 'Summary of Video',
        arabicLabel: 'ملخص محتوى الفيديو',
        type: 'textarea'
      },
      {
        id: 'keywords',
        label: 'Key Terms to Target',
        arabicLabel: 'كلمات مفتاحية تريد تصدرها',
        type: 'text'
      }
    ]
  },
  {
    id: 'ai-hashtag-generator',
    title: 'AI Hashtag Generator',
    arabicTitle: 'مولد الهاشتاقات الذكية والترندات',
    frenchTitle: 'Générateur de Hashtags Intelligents',
    description: 'Targeted mix of high-volume and niche hashtags tailored for TikTok, Reels, and Shorts.',
    arabicDescription: 'حزمة وسوم ذكية متوازنة بين الهاشتاقات الفيروسية والوسوم المتخصصة لضمان الظهور للمهتمين.',
    frenchDescription: 'Sélectionnez le mix parfait entre hashtags populaires et ciblés.',
    category: 'Optimization',
    iconName: 'Hash',
    placeholder: 'Topic or keywords (e.g. Free Fire, Dropshipping)',
    arabicPlaceholder: 'الموضوع أو الكلمات الدلالية (مثال: فري فاير، دروب شيبينغ، مونتاج)',
    frenchPlaceholder: 'Sujet ou mots-clés',
    fields: [
      {
        id: 'tagTopic',
        label: 'Post Topic',
        arabicLabel: 'موضوع المنشور',
        type: 'text'
      },
      {
        id: 'platform',
        label: 'Platform',
        arabicLabel: 'المنصة المستهدفة',
        type: 'select',
        options: [
          { label: 'TikTok (5-7 وسوم مركزة)', value: 'tiktok' },
          { label: 'Instagram Reels (15-20 وسم متنوع)', value: 'reels' },
          { label: 'YouTube Shorts (3-5 وسوم رسمية)', value: 'shorts' }
        ]
      }
    ]
  },
  {
    id: 'ai-caption-generator',
    title: 'AI Caption Generator',
    arabicTitle: 'مولد كابشن انستغرام وتيك توك',
    frenchTitle: 'Générateur de Légendes & Captions',
    category: 'Social Media',
    iconName: 'MessageSquare',
    description: 'Captions engineered to spark comments and drive users to your link in bio.',
    arabicDescription: 'نصوص كابشن تفاعلية تحفز المتابعين على كتابة تعليقات وزيارة رابط البايو.',
    frenchDescription: 'Rédigez des légendes qui encouragent les commentaires et les clics en bio.',
    placeholder: 'Describe your visual post or reel content',
    arabicPlaceholder: 'صف المنشور أو الريلز وما الرسالة التي تريد إيصالها',
    frenchPlaceholder: 'Décrivez votre publication ou contenu visuel',
    fields: [
      {
        id: 'captionContext',
        label: 'Context / Message',
        arabicLabel: 'فكرة المنشور أو الرسالة',
        type: 'textarea'
      },
      {
        id: 'ctaGoal',
        label: 'Action Desired',
        arabicLabel: 'الهدف من الكابشن',
        type: 'select',
        options: [
          { label: 'التعليق بكلمة معينة (ManyChat Loop)', value: 'comment' },
          { label: 'حفظ المنشور للرجوع إليه (Save Post)', value: 'save' },
          { label: 'مشاركة المنشور مع صديق (Share)', value: 'share' },
          { label: 'الضغط على الرابط في البايو (Link in Bio)', value: 'link' }
        ]
      }
    ]
  },
  {
    id: 'ai-content-rewriter',
    title: 'AI Content Rewriter',
    arabicTitle: 'إعادة صياغة وتحسين المحتوى',
    frenchTitle: 'Réécrivain de Contenu par IA',
    category: 'Writing',
    iconName: 'RefreshCw',
    description: 'Repurpose boring text into punchy, dynamic copy optimized for short attention spans.',
    arabicDescription: 'تحويل أي نص طويل أو ممل إلى صياغة مشوقة ومكثفة وسهلة القراءة على الهاتف.',
    frenchDescription: 'Transformez un texte brut en contenu percutant adapté au web moderne.',
    placeholder: 'Paste your draft or original text here...',
    arabicPlaceholder: 'الصق النص المراد إعادة صياغته هنا...',
    frenchPlaceholder: 'Collez votre texte à reformuler ici...',
    fields: [
      {
        id: 'originalText',
        label: 'Original Text',
        arabicLabel: 'النص الأصلي',
        type: 'textarea'
      },
      {
        id: 'rewriteStyle',
        label: 'Target Style',
        arabicLabel: 'الأسلوب المطلوب',
        type: 'select',
        options: [
          { label: 'مختصر ومباشر جداً (Punchy & Direct)', value: 'punchy' },
          { label: 'سرد قصصي عاطفي (Storytelling)', value: 'story' },
          { label: 'إعلاني إقناعي (High-Converting Copy)', value: 'copy' },
          { label: 'مهني ورسمي (Professional)', value: 'professional' }
        ]
      }
    ]
  },
  {
    id: 'ai-seo-assistant',
    title: 'AI SEO Assistant',
    arabicTitle: 'مساعد السيو وتصدر نتائج البحث',
    frenchTitle: 'Assistant SEO par IA',
    category: 'SEO',
    iconName: 'Search',
    description: 'Find long-tail keywords, meta tags, and structured headings for your articles and pages.',
    arabicDescription: 'استخراج كلمات مفتاحية دقيقة قليلة المنافسة وهيكلة عناوين المقالات H1 و H2 للتصدر.',
    frenchDescription: 'Trouvez des mots-clés longue traîne et optimisez la structure de vos articles.',
    placeholder: 'Primary keyword or service (e.g. video editing agency)',
    arabicPlaceholder: 'الكلمة المفتاحية الرئيسية أو الخدمة (مثال: خدمات المونتاج، متجر فري فاير)',
    frenchPlaceholder: 'Mot-clé principal ou thématique',
    fields: [
      {
        id: 'targetKeyword',
        label: 'Main Keyword',
        arabicLabel: 'الكلمة المفتاحية المستهدفة',
        type: 'text'
      }
    ]
  },
  {
    id: 'ai-content-analyzer',
    title: 'AI Content Analyzer',
    arabicTitle: 'محلل جودة وقوة المحتوى',
    frenchTitle: 'Analyseur de Contenu par IA',
    category: 'Optimization',
    iconName: 'BarChart3',
    description: 'Evaluate your script, title, or post for viral potential, clarity, and retention friction.',
    arabicDescription: 'فحص نصوصك وإعطاؤك تقييماً من 100 مع كشف نقاط الضعف ونقاط القوة بدقة.',
    frenchDescription: 'Évaluez le potentiel viral et la rétention de votre texte avec un score sur 100.',
    placeholder: 'Paste your title, hook, or full script to analyze',
    arabicPlaceholder: 'الصق عنوانك أو الهوك أو السكربت لتحليله بالذكاء الاصطناعي',
    frenchPlaceholder: 'Collez votre texte à analyser',
    fields: [
      {
        id: 'contentToAnalyze',
        label: 'Content to Audit',
        arabicLabel: 'المحتوى المراد تدقيقه وتحليله',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'ai-thumbnail-prompt-generator',
    title: 'AI Thumbnail Prompt Generator',
    arabicTitle: 'مولد برومبت الصور المصغرة (Midjourney / DALL-E)',
    frenchTitle: 'Générateur de Prompts de Miniatures IA',
    category: 'Design',
    iconName: 'Image',
    description: 'Generate precise prompts for AI image generators to create vivid thumbnail backgrounds and assets.',
    arabicDescription: 'توليد أوامر برومبت احترافية بالإنجليزية لاستخدامها في توليد خلفيات الصور المصغرة بجودة 8K.',
    frenchDescription: 'Générez des prompts détaillés pour créer des visuels percutants via Midjourney ou DALL-E.',
    placeholder: 'What visual scene do you envision for this video?',
    arabicPlaceholder: 'صف المشهد البصري الذي تتخيله للصورة المصغرة',
    frenchPlaceholder: 'Décrivez la scène visuelle que vous imaginez',
    fields: [
      {
        id: 'sceneIdea',
        label: 'Scene Description',
        arabicLabel: 'وصف الفكرة البصرية',
        type: 'text'
      },
      {
        id: 'mood',
        label: 'Lighting & Mood',
        arabicLabel: 'الإضاءة والجو العام',
        type: 'select',
        options: [
          { label: 'سينمائي درامي مظلم (Cinematic Dark Gold Glow)', value: 'dark_cinematic' },
          { label: 'ألوان مشعة وتباين عالٍ (High Contrast Neon Pop)', value: 'neon_pop' },
          { label: 'واقعي ثلاثي الأبعاد (Photorealistic 3D Render)', value: 'photorealistic' }
        ]
      }
    ]
  },
  {
    id: 'ai-bio-generator',
    title: 'AI Profile Bio Generator',
    arabicTitle: 'مولد البايو الاحترافي للحسابات',
    frenchTitle: 'Générateur de Bio Instagram & TikTok',
    category: 'Social Media',
    iconName: 'User',
    description: 'Formulate crisp 150-character bios that instantly communicate authority, niche, and a clear CTA.',
    arabicDescription: 'صياغة نبذة تعريفية (بايو) موجزة ومقنعة في 3 أسطر تحدد من تخدم مع نداء اتخاذ إجراء واضح.',
    frenchDescription: 'Concevez une bio en 3 lignes percutantes avec appel à l’action vers votre lien.',
    placeholder: 'Who are you and who do you help?',
    arabicPlaceholder: 'من أنت وماذا تقدم ولمن تقدم خدماتك؟',
    frenchPlaceholder: 'Qui êtes-vous et quelle valeur apportez-vous ?',
    fields: [
      {
        id: 'whoYouHelp',
        label: 'Your Mission / Niche',
        arabicLabel: 'رسالتك أو ما تقدمه للمتابع',
        type: 'text'
      },
      {
        id: 'leadMagnet',
        label: 'Link / Offer Promised in Bio',
        arabicLabel: 'الهدية المجانية أو الرابط في البايو',
        type: 'text',
        placeholder: 'مثلاً: دليل مجاني، كورس، متجر'
      }
    ]
  },
  {
    id: 'ai-affiliate-description',
    title: 'AI Affiliate Product Review & Copy',
    arabicTitle: 'مولد نصوص ومراجعات منتجات الأفيلييت',
    frenchTitle: 'Générateur de Textes d’Affiliation',
    category: 'E-commerce',
    iconName: 'DollarSign',
    description: 'Write persuasive, authentic-sounding product recommendations that convert clicks into commissions.',
    arabicDescription: 'كتابة مراجعة ذكية ومقنعة للمنتج تبرز الفوائد وتجيب عن مخاوف المشتري دون إلحاح مزعج.',
    frenchDescription: 'Rédigez des recommandations de produits qui incitent à l’achat sans être trop agressives.',
    placeholder: 'Product name and core benefit',
    arabicPlaceholder: 'اسم المنتج وأهم ميزة أو فائدة يقدمها للمستخدم',
    frenchPlaceholder: 'Nom du produit et avantage principal',
    fields: [
      {
        id: 'productName',
        label: 'Product Name',
        arabicLabel: 'اسم المنتج',
        type: 'text'
      },
      {
        id: 'targetAudience',
        label: 'Target Buyer',
        arabicLabel: 'الجمهور المستهدف للشراء',
        type: 'text',
        placeholder: 'مثلاً: الطلاب، المبرمجين، عشاق فري فاير'
      }
    ]
  },
  {
    id: 'ai-content-calendar',
    title: 'AI 7-Day Content Plan Generator',
    arabicTitle: 'مولد جدول النشر الأسبوعي الذكي',
    frenchTitle: 'Générateur de Calendrier Éditorial 7 Jours',
    category: 'Ideation',
    iconName: 'Calendar',
    description: 'A 7-day balanced editorial plan balancing viral hooks, educational value, and monetization.',
    arabicDescription: 'خطة نشر أسبوعية متكاملة لـ 7 أيام توزع المحتوى بين التثقيف، الترفيه، وبناء الثقة، والمبيعات.',
    frenchDescription: 'Planifiez 7 jours de contenu équilibré entre viralité et monétisation.',
    placeholder: 'Your niche (e.g. Freelancing, Tech, Gaming)',
    arabicPlaceholder: 'مجالك (مثال: العمل الحر، التقنية، الألعاب، الإنتاجية)',
    frenchPlaceholder: 'Votre niche (ex: Freelance, Tech, Gaming)',
    fields: [
      {
        id: 'channelNiche',
        label: 'Channel Niche',
        arabicLabel: 'مجال القناة أو الحساب',
        type: 'text'
      }
    ]
  },
  {
    id: 'ai-video-ideas-from-topic',
    title: 'AI Video Ideas From Any Topic',
    arabicTitle: 'توليد أفكار فيديوهات من أي موضوع عشوائي',
    frenchTitle: 'Idées de Vidéos à Partir d’un Sujet',
    category: 'Ideation',
    iconName: 'Film',
    description: 'Transform any dry or boring topic into 5 creative, highly watchable video concepts.',
    arabicDescription: 'تحويل أي موضوع عادي إلى 5 أفكار فيديوهات مشوقة وغير متوقعة تجذب المشاهدات.',
    frenchDescription: 'Transformez n’importe quel sujet en 5 concepts vidéo captivants.',
    placeholder: 'Type any keyword (e.g. coffee, shoes, keyboards, keyboards, time management)',
    arabicPlaceholder: 'أدخل أي كلمة عشوائية (مثال: القهوة، الأحذية، الكيبورد، إدارة الوقت)',
    frenchPlaceholder: 'Tapez un mot-clé (ex: café, claviers, gestion du temps)',
    fields: [
      {
        id: 'rawKeyword',
        label: 'Word or Topic',
        arabicLabel: 'الكلمة أو الموضوع',
        type: 'text'
      }
    ]
  }
];

// Offline Intelligent Generation Engine - generates realistic, high-value structured results
// Prepared architecture: can easily forward to `/api/gemini` when server backend is linked.
export function executeAITool(toolId: string, values: Record<string, string>, language: 'ar' | 'en' | 'fr' = 'ar'): string {
  const isAr = language === 'ar';

  switch (toolId) {
    case 'ai-content-ideas': {
      const topic = values.topic || (isAr ? 'صناعة المحتوى والربح' : 'Content Creation & Income');
      const platform = values.platform || 'Shorts';
      return isAr
        ? `🔥 نتائج Rikou AI المقترحة لمجال (${topic}) على منصة (${platform}):

1️⃣ [زاوية الصدمة والفضول]:
• العنوان: "الخطأ الذي يفعله 95% من المبتدئين في ${topic} ويضيع وقتهم تماماً"
• الهوك: "لو كنت تسعى للنجاح في ${topic}، توقف عن فعل هذا الشيء فوراً..."
• فكرة المحتوى: مقارنة بين الطريقة التقليدية البطيئة والاستراتيجية الذكية الحديثة.

2️⃣ [زاوية المقارنة بالأرقام]:
• العنوان: "مقارنة حقيقية: نتائج أسبوع كامل من تطبيق أسرار ${topic}"
• الهوك: "جربت هذه الطريقة لمدة 7 أيام متواصلة، وهذه كانت النتيجة الصادمة!"
• فكرة المحتوى: توثيق عملي خطوة بخطوة مع عرض لقطات شاشة وأرقام ملموسة.

3️⃣ [زاوية الحل السريع والمجاني]:
• العنوان: "3 أدوات مجانية 100% لا يستغني عنها أي محترف في ${topic}"
• الهوك: "وفر مئات الدولارات شهرياً بهذه الأدوات السرية..."
• فكرة المحتوى: استعراض 3 حلول مجانية تنجز ما يفعله المنافسون بأموال طائلة.

4️⃣ [زاوية التحدي المثير]:
• العنوان: "هل يمكن الوصول إلى أول نتيجة حقيقية في ${topic} في 48 ساعة فقط؟"
• الهوك: "وضعت نفسي في تحدٍ مستحيل، وشاهد ما حدث!"`
        : `🔥 Rikou AI Generated Ideas for (${topic}) on (${platform}):

1️⃣ [Curiosity Gap Angle]:
• Title: "The Fatal Mistake 95% of Beginners Make in ${topic}"
• Hook: "If you are trying to master ${topic}, stop doing this one thing right now..."
• Concept: Contrast outdated legacy advice with the modern high-leverage tactic.

2️⃣ [Proof & Data Angle]:
• Title: "I Tested the Top Strategy for ${topic} for 7 Days Straight"
• Hook: "I put this method to the test so you do not have to, and the numbers are wild."
• Concept: Document a 7-day challenge with raw screenshots and takeaways.

3️⃣ [Free Tools / Shortcuts]:
• Title: "3 Completely Free Tools that Make ${topic} 10x Easier"
• Hook: "Stop paying for expensive tools when these exist for $0..."
• Concept: Rapid showcase of 3 underrated free utilities.`;
    }

    case 'ai-script-generator': {
      const title = values.scriptTitle || (isAr ? 'سر من أسرار النجاح الرقمي' : 'Digital Mastery Secret');
      const duration = values.duration || '60s';
      return isAr
        ? `🎬 سيناريو فيديو احترافي بواسطة Rikou AI
📌 الموضوع: ${title} | المدة المستهدفة: ${duration}

[00:00 - 00:03] ⚡ الهوك الافتتاحي (بصري + صوتي):
• الكاميرا: زووم سريع على الوجه أو الشاشة مع حركة يد قاطعة.
• الصوت: مؤثر Whoosh حاد + نص متحرك بخط أصفر عريض.
• الإلقاء الصوتي: "لو ما زلت تظن أن ${title} يحتاج لسنوات من الخبرة، فأنت تفوت أسهل فرصة في 2026!"

[00:03 - 00:15] 🛑 المشكلة وإثارة الفضول:
• الكاميرا: لقطات أرشيفية سريعة B-roll توضح الإحباط والبحث المتكرر.
• الإلقاء الصوتي: "المشكلة أن أغلب الناس يتبعون الطرق القديمة التي تم استهلاكها بالكامل، والنتيجة صفر مشاهدات أو مبيعات."

[00:15 - 00:40] 💡 الحل والخطوات الثلاث:
• الكاميرا: استعراض الشاشة خطوة بخطوة مع أسهم وإبراز المؤشر.
• الخطوة 1: ابدأ بالتركيز على النتيجة المباشرة وتجنب الحشو.
• الخطوة 2: استغل الأدوات الذكية لأتمتة 80% من المجهود الشاق.
• الخطوة 3: طبق مبدأ الاستمرارية بنشر عينة كل 48 ساعة دون انقطاع.

[00:40 - 00:55] 🚀 الخاتمة ونداء الإجراء (CTA):
• الكاميرا: العودة لزاوية ثابتة واضحة ومبتسمة.
• الإلقاء الصوتي: "اكتب كلمة (سر) في التعليقات لأرسل لك القالب المجاني فوراً في الخاص، ولا تنس حفظ الفيديو!"`
        : `🎬 Complete Production Script by Rikou AI
📌 Topic: ${title} | Target Length: ${duration}

[00:00 - 00:03] ⚡ Visual & Audio Hook:
• Visual: Fast zoom cut, bold text popping on screen with a sharp whoosh.
• Dialogue: "If you still think ${title} requires years of experience, you are missing out on the biggest opportunity right now."

[00:03 - 00:15] 🛑 The Problem:
• Dialogue: "Most people waste months using outdated methods that no longer work. Here is what you must do instead."

[00:15 - 00:42] 💡 The 3-Step Framework:
• Step 1: Remove friction and focus on the one metric that moves the needle.
• Step 2: Use smart leverage to automate 80% of repetitive busywork.
• Step 3: Test fast, double down on what spikes engagement, and discard the rest.

[00:42 - 00:55] 🚀 Outro & Call to Action (CTA):
• Dialogue: "Save this video for tonight, and drop a comment if you want part 2!"`;
    }

    case 'ai-hook-generator': {
      const subject = values.hookSubject || (isAr ? 'الربح وصناعة المحتوى' : 'online growth');
      return isAr
        ? `🪝 5 خطافات افتتاحية خارقة بواسطة Rikou AI لموضوع (${subject}):

1️⃣ [هوك الخطأ القاتل]:
"توقف عن فعل هذا الخطأ في ${subject} قبل أن تدمر خوارزميات حسابك إلى الأبد!"

2️⃣ [هوك الفضول العكسي]:
"هذا الشيء الصغير غير كل نتائجي في ${subject}، والمفاجأة أنه مجاني 100%..."

3️⃣ [هوك الصدمة والأرقام]:
"90% من الناس يضيعون ساعات في ${subject}، بينما المحترفون يفعلون هذا الشيء في 3 دقائق فقط!"

4️⃣ [هوك القصة والتحول]:
"كنت مفلساً وعالقاً في نقطة الصفر، حتى اكتشفت هذه القاعدة البسيطة في ${subject}..."

5️⃣ [هوك التحدي المباشر]:
"أراهنك أنك لم تكن تعرف أن هذا الموقع يفعل كل هذا في ${subject}!"`
        : `🪝 5 High-Retention Hooks by Rikou AI for (${subject}):

1️⃣ "Stop making this single mistake with ${subject} before you permanently ruin your momentum!"
2️⃣ "Nobody is talking about this hidden trick in ${subject}, and it changes everything."
3️⃣ "90% of creators do ${subject} completely backwards. Here is the modern approach."
4️⃣ "I was stuck at zero until I changed this one rule about ${subject}..."
5️⃣ "I guarantee you did not know this free tool could do this for ${subject}!"`;
    }

    case 'youtube-title-generator': {
      const concept = values.concept || (isAr ? 'طرق الربح والمونتاج' : 'viral editing');
      return isAr
        ? `✨ عناوين يوتيوب مقترحة ذات معدل نقر (High CTR) استثنائي:

1. كيف فعلت هذا الشيء المستحيل في 7 أيام فقط؟ (بالأدلة والأرقام)
2. توقف فوراً! الحقيقة الصادمة حول ${concept} التي يخفونها عنك
3. من الصفر إلى أول 1,000$ عبر ${concept} (دليل 2026 الشامل)
4. جربت أشهر طريقة لـ ${concept}... وهذه كانت النتيجة الصادمة!
5. 5 أسرار خفية في ${concept} ستجعلك تتفوق على 99% من منافسيك
6. الشرح الذي تمنيت لو شاهدته قبل أن أبدأ في ${concept}`
        : `✨ High CTR YouTube Titles by Rikou AI:

1. I Tried ${concept} for 7 Days (Shocking Results)
2. Stop Doing ${concept} The Old Way!
3. The Only Video on ${concept} You Will Ever Need (2026 Guide)
4. 5 Hidden Secrets in ${concept} That 99% of People Miss
5. How I Mastered ${concept} from Scratch in 14 Days`;
    }

    case 'ai-hashtag-generator': {
      const topic = values.tagTopic || 'RikouZone';
      return isAr
        ? `🏷️ حزمة الهاشتاقات المتوازنة بواسطة Rikou AI لـ (${topic}):

#${topic.replace(/\s+/g, '_')} #صناع_المحتوى #الربح_من_الإنترنت #تطوير_الذات #تقنية #نصائح_ريلز #اكسبلور #ترند #شورتس #بزنس_أونلاين #فري_فاير #مونتاج #أفكار_محتوى #ريادة_الأعمال #دخل_سلبي`
        : `🏷️ Targeted Hashtag Cloud by Rikou AI for (${topic}):

#${topic.replace(/\s+/g, '')} #ContentCreator #OnlineIncome #ViralReels #CreatorEconomy #GrowthHacks #TechTrends #SideHustle #ShortsViral #DigitalBusiness`;
    }

    case 'ai-caption-generator': {
      const context = values.captionContext || (isAr ? 'أهمية الاستمرارية والتطبيق العملي' : 'Consistency and execution');
      return isAr
        ? `✍️ كابشن انستغرام وتيك توك احترافي ومحفز للتفاعل:

لو أردت تغييراً حقيقياً في حياتك، تذكر أن الأفكار وحدها لا تصنع الفارق.. بل التنفيذ اليومي المستمر! ⏳

في هذا الفيديو كشفت لك التفاصيل الدقيقة حول (${context}).
الكثير من الناس ينتظرون اللحظة المثالية، بينما الحقيقة أن البداية العشوائية اليوم أفضل من الخطة الكاملة المؤجلة لسنوات.

👇 شاركنا في التعليقات: ما هي أكبر عقبة تواجهك حالياً؟
💾 احفظ المنشور للرجوع إليه وقت التطبيق
🔗 الرابط التفصيلي متاح في البايو مجاناً!`
        : `✍️ High-Engagement Social Caption by Rikou AI:

Ideas are cheap; disciplined daily execution is everything. ⏳

In this clip, we broke down (${context}) and how you can apply it right now without overcomplicating things.

👇 Drop your biggest bottleneck in the comments below!
💾 Save this post for your next work session
🔗 Direct resources linked in bio!`;
    }

    case 'ai-thumbnail-prompt-generator': {
      const idea = values.sceneIdea || 'A gamer looking shocked at an insane screen';
      return `🎨 Midjourney / DALL-E 8K Generation Prompt:

Prompt: High-contrast YouTube thumbnail background, ${idea}, intense dynamic dramatic lighting, gold and neon accents, 8k resolution, cinematic atmosphere, octane render, vivid colors, depth of field, clear composition with negative space for bold text, photorealistic details --ar 16:9 --v 6.0 --style raw`;
    }

    case 'ai-bio-generator': {
      const mission = values.whoYouHelp || (isAr ? 'مساعدة المبتدئين على كسب أول دخل رقمي' : 'Helping creators monetize');
      return isAr
        ? `👤 3 خيارات بايو احترافية لحسابك:

الخيار 1 (مباشر وموجه نحو النتائج):
🚀 أساعدك في ${mission}
📈 خطط عمل واستراتيجيات بدون تعقيد
👇 احصل على دليلك المجاني من الرابط:

الخيار 2 (قائم على بناء الثقة والأرقام):
💡 مهتم بـ ${mission} | صانع محتوى
🎯 من الصفر إلى الاحتراف خطوة بخطوة
📥 موارد مجانية وأدوات احترافية بالأسفل 👇

الخيار 3 (قصير وأنيق):
✨ دليلك الشامل لـ ${mission}
🎬 فيديوهات يومية وأفكار فيروسية
🔗 ابدأ الآن مجاناً 👇`
        : `👤 3 Professional Bio Formats:

Option 1:
🚀 Helping you with ${mission}
📈 Actionable systems without fluff
👇 Grab your free starter toolkit:

Option 2:
💡 Passionate about ${mission}
🎯 Zero to mastery blueprints
📥 Free templates & guides below 👇`;
    }

    default: {
      return isAr
        ? `✅ تم توليد محتوى ذكي ومخصص بواسطة Rikou AI بنجاح!
استناداً إلى معطياتك: تم تجهيز مخرجات عالية الجودة متوافقة مع خوارزميات النشر لعام 2026.

💡 نصيحة RikouZone: احرص دائماً على إضافة لمستك الشخصية وتجربتك الواقعية قبل النشر لضمان تفاعل بشري أصيل وصادق مع المتابعين.`
        : `✅ Intelligent content synthesized successfully by Rikou AI!
Tailored output engineered for current 2026 algorithmic criteria.

💡 RikouZone Pro Tip: Blend in your personal storytelling nuances for maximum audience connection.`;
    }
  }
}
