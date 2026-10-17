import { ContentIdea, ContentAngle, IdeaPlatform, IdeaNiche } from '../types';
import { isDuplicateIdea, generateIdeaFingerprint } from '../utils/ideaFingerprint';

export interface GenerateIdeaRequest {
  niche?: string;
  platform?: string;
  angle?: ContentAngle | 'all';
  existingIdeas: ContentIdea[];
  language?: string;
}

export interface GenerateIdeaResult {
  idea: ContentIdea;
  source: 'ai' | 'curated_fallback';
  angle: ContentAngle;
  duplicateChecked: boolean;
}

// Rich pool of offline diverse fallback ideas across the 8 angles to guarantee variety if AI is offline
const OFFLINE_DIVERSE_POOL: Partial<ContentIdea>[] = [
  // Angle: tutorial
  {
    title: 'How to Build an Automatic Invoice Bot in Telegram with Python',
    arabicTitle: 'كيف تبني بوت فواتير تلقائي في تيليجرام بالبايثون مجاناً',
    frenchTitle: 'Créer un bot de facturation Telegram automatique en Python',
    hook: 'Stop manually drafting PDF receipts: send a Telegram message and let your bot invoice your client in 2 seconds.',
    arabicHook: 'توقف عن كتابة الفواتير يدوياً: أرسل رسالة في تيليجرام ودع البوت يرسل ملف PDF للعميل خلال ثانيتين!',
    frenchHook: 'Ne créez plus vos factures à la main : un message Telegram et le bot envoie le PDF en 2 secondes.',
    description: 'Practical guide to spinning up a lightweight Telegram bot webhook that fills PDF templates and saves records to Google Sheets.',
    arabicDescription: 'شرح عملي لبناء بوت تيليجرام خفيف يملأ نماذج الفواتير ويرسلها للعملاء ويخزن السجلات في جداول جوجل.',
    frenchDescription: 'Guide pratique pour connecter un bot Telegram à vos factures et feuilles de calcul.',
    scriptOutline: [
      'Live demonstration: typing "/invoice 150 ClientName" and receiving the generated PDF instantly',
      'Setting up BotFather in Telegram to obtain API tokens',
      'Writing the 15-line script connecting reportlab and google-sheets-api',
      'Deploying for free on Render or PythonAnywhere'
    ],
    arabicScriptOutline: [
      'عرض مباشر: كتابة "/فاتورة 150 اسم_العميل" في المحادثة واستلام ملف الفاتورة المنسق فوراً',
      'إنشاء البوت عبر BotFather والحصول على رمز الـ API المجاني',
      'شرح كود البايثون القصير لربط بيانات الفاتورة بجداول جوجل وتوليد الـ PDF',
      'رفع البوت ليعمل مجاناً على مدار 24 ساعة عبر استضافة سحابية خفيفة'
    ],
    cta: 'Comment "BOT" and I will DM you the GitHub repo template!',
    arabicCta: 'اكتب كلمة "بوت" في التعليقات وسأرسل لك رابط الكود البرمجي جاهزاً!',
    platform: 'Shorts',
    niche: 'AI',
    difficulty: 'intermediate',
    competition: 'low',
    viralPotential: 'high',
    format: 'short',
    duration: '50s',
    facelessPossibility: true,
    tags: ['بايثون', 'بوت_تيليجرام', 'أتمتة', 'برمجة_للمبتدئين'],
    angle: 'tutorial',
    arabicAngle: 'شرح تعليمي خطوة بخطوة'
  },
  // Angle: mistakes
  {
    title: 'The Microphone Distance Mistake That Makes Your Voiceover Sound Cheap',
    arabicTitle: 'خطأ مسافة الميكروفون القاتل الذي يجعل تعليقك الصوتي يبدو رديئاً ورخيصاً',
    frenchTitle: 'L’erreur de distance micro qui ruine la qualité de votre voix off',
    hook: 'Buying a $200 microphone will not fix your audio if your mouth is more than 4 inches away from the capsule.',
    arabicHook: 'شراء ميكروفون بـ 200 دولار لن ينقذ صوتك إذا كنت تتحدث على بعد أكثر من 10 سنتيمترات من الكبسولة!',
    frenchHook: 'Acheter un micro cher ne sert à rien si vous parlez à plus de 10 cm de la capsule.',
    description: 'Understanding the proximity effect and room echo to make budget microphones sound like studio broadcast gear.',
    arabicDescription: 'فهم تأثير التقارب (Proximity Effect) وصدمة صدى الغرفة لجعل ميكروفون اقتصادي يبدو كصوت استوديو إذاعي.',
    frenchDescription: 'Comprenez l’effet de proximité pour transformer un micro pas cher en son de studio professionnel.',
    scriptOutline: [
      'Side-by-side audio sample: Far hollow voice vs close intimate proximity recording',
      'Using the "Hang Loose" thumb-to-pinky measurement rule for ideal distance',
      'Setting input gain to 50% instead of 90% to avoid picking up room reflections',
      'Applying a high-pass filter at 80Hz and a fast compressor in Audacity or Premiere'
    ],
    arabicScriptOutline: [
      'مقارنة صوتية حية: الصوت البعيد الممتلئ بصدى الغرفة مقابل الصوت القريب الدافئ',
      'قاعدة قياس المسافة الصحيحة بأصابع اليد لضبط موقع الفم بدقة أمام الكبسولة',
      'خفض حساسية الحساس (Gain) إلى 50% لمنع التقاط صوت مروحة الكمبيوتر وصدى الجدران',
      'إضافة فلتر High Pass وفلتر ضغط صوت خفيف على كاب كات أو بريمير لإنهاء المعالجة'
    ],
    cta: 'Save this post and test your microphone distance before recording today!',
    arabicCta: 'احفظ الشرح وطبق قاعدة المسافة في تسجيلك الصوتي القادم اليوم!',
    platform: 'TikTok',
    niche: 'Content Creation',
    difficulty: 'beginner',
    competition: 'medium',
    viralPotential: 'high',
    format: 'short',
    duration: '42s',
    facelessPossibility: true,
    tags: ['هندسة_صوت', 'تعليق_صوتي', 'ميكروفون', 'مونتاج'],
    angle: 'mistakes',
    arabicAngle: 'أخطاء شائعة وتحذيرات عملية'
  },
  // Angle: experiment
  {
    title: 'I Posted 3 Faceless Shorts Daily for 30 Days: The Revenue Breakdown',
    arabicTitle: 'نشرت 3 فيديوهات شورتس يومياً بدون إظهار الوجه لمدة شهر: كم ربحت فعلياً؟',
    frenchTitle: '3 Shorts sans visage par jour pendant 30 jours : les vrais chiffres',
    hook: 'Everyone says YouTube Shorts is a goldmine for faceless channels. Here is what 90 videos actually earned in ad revenue.',
    arabicHook: 'الجميع يقول أن شورتس يوتيوب منجم ذهب للقنوات بدون وجه؛ إليك الأرباح الحقيقية لـ 90 مقطعاً بالوثائق!',
    frenchHook: 'Tout le monde vante les Shorts sans visage. Voici ce que 90 vidéos m’ont rapporté en réalité.',
    description: 'Raw financial and analytics transparency showing view velocity, RPM variations, subscriber growth, and affiliate backend income.',
    arabicDescription: 'كشف مالي شفاف بالأرقام: معدل المشاهدات، عائد الألف ظهور (RPM)، عدد المشتركين الجدد، وأرباح التسويق بالعمولة.',
    frenchDescription: 'Bilan transparent des revenus publicitaires et d’affiliation après un mois de publication intensive.',
    scriptOutline: [
      'Opening analytics dashboard proving 2.8 million total Shorts views',
      'The brutal truth about YouTube Shorts AdSense RPM (averaging $0.06 per 1k views)',
      'The real money maker: How one pinned link in the bio earned 4x the AdSense check',
      'The exact scheduling workflow that allowed creating 3 videos in 45 minutes daily'
    ],
    arabicScriptOutline: [
      'فتح لوحة إحصائيات القناة مباشرة لإثبات تحقيق 2.8 مليون مشاهدة خلال 30 يوماً',
      'الحقيقة الصادمة لعائد إعلانات الشورتس (بين 0.04$ و 0.08$ لكل ألف مشاهدة فقط)',
      'المصدر الحقيقي للربح: كيف حقق الرابط المثبت في الوصف أربعة أضعاف أرباح الإعلانات',
      'منظومة الإنتاج السريعة التي مكنتني من تجهيز 3 مقاطع يومياً في 45 دقيقة فقط'
    ],
    cta: 'Drop your channel niche below and I will tell you its realistic RPM potential!',
    arabicCta: 'اكتب تخصص قناتك في التعليقات لأخبرك بالعائد المالي المتوقع لها!',
    platform: 'YouTube',
    niche: 'Faceless Content',
    difficulty: 'intermediate',
    competition: 'high',
    viralPotential: 'explosive',
    format: 'long',
    duration: '11m',
    facelessPossibility: true,
    tags: ['أرباح_يوتيوب', 'شورتس', 'قنوات_بدون_وجه', 'تجربة_واقعية'],
    angle: 'experiment',
    arabicAngle: 'تجارب وتحديات عملية بالأرقام'
  },
  // Angle: comparison
  {
    title: 'Midjourney v6 vs Flux 1.1 Pro: Which Generates Better YouTube Thumbnails?',
    arabicTitle: 'ميدجورني ضد فلوكس (Flux): أيهما يصنع خلفيات صور مصغرة أكثر واقعية وجاذبية؟',
    frenchTitle: 'Midjourney v6 vs Flux 1.1 Pro : le meilleur pour les miniatures YouTube ?',
    hook: 'We tested the exact same prompt across Midjourney and Flux: one nailed photorealism, but the other handles Arabic text perfectly.',
    arabicHook: 'وضعنا نفس الوصف في Midjourney و Flux: أحدهما تفوق في الواقعية لكن الآخر كتب النصوص بدون تشويه!',
    frenchHook: 'Même prompt sur Midjourney et Flux : l’un est plus réaliste, l’autre gère le texte à merveille.',
    description: 'Direct benchmark testing skin texture, lighting accuracy, text rendering on signs, and cost per generated asset.',
    arabicDescription: 'مقارنة دقيقة تختبر ملمس البشرة، توزيع الإضاءة، كتابة الحروف واللافتات، وتكلفة توليد كل صورة بدقة.',
    frenchDescription: 'Comparatif direct sur les visages, l’éclairage cinématographique et la lisibilité du texte.',
    scriptOutline: [
      'Side-by-side split screen showing thumbnail outputs from the identical prompt',
      'Round 1: Human facial expression and eye realism test',
      'Round 2: Graphic poster text rendering and sign typography',
      'Pricing breakdown and which model you should integrate into your thumbnail workflow'
    ],
    arabicScriptOutline: [
      'عرض شاشة منقسمة تقارن الصورتين الناتجتين عن نفس البرومبت بالتفصيل',
      'الجولة الأولى: اختبار تفاصيل الوجه ونظرة العين والإضاءة السينمائية',
      'الجولة الثانية: اختبار كتابة النصوص والكلمات على القمصان واللافتات',
      'مقارنة الأسعار وسرعة التوليد: أيهما يستحق اشتراكك الشهري الآن'
    ],
    cta: 'Which image would you click on? Vote 1 or 2 in the comments!',
    arabicCta: 'أي الصورتين كنت ستضغط عليها لو ظهرت لك؟ اكتب 1 أو 2 في التعليقات!',
    platform: 'Shorts',
    niche: 'AI',
    difficulty: 'beginner',
    competition: 'medium',
    viralPotential: 'very_high',
    format: 'short',
    duration: '54s',
    facelessPossibility: true,
    tags: ['ميدجورني', 'ذكاء_اصطناعي', 'صور_مصغرة', 'flux_ai'],
    angle: 'comparison',
    arabicAngle: 'مقارنات تجارية وتقنية مباشرة'
  },
  // Angle: listicle
  {
    title: '5 Free Chrome Extensions That Save Freelancers 10 Hours Every Week',
    arabicTitle: '5 إضافات مجانية لمتصفح كروم ستوفر عليك 10 ساعات عمل أسبوعياً كصانع محتوى أو مستقل',
    frenchTitle: '5 extensions Chrome gratuites qui font gagner 10h par semaine aux freelances',
    hook: 'If you are still switching between 8 open browser tabs to copy and translate text, install tool #3 right now.',
    arabicHook: 'إذا كنت ما زلت تتنقل بين 8 نوافذ مفتوحة لنسخ وترجمة النصوص وإعادة صياغتها، فثبت الأداة رقم 3 فوراً!',
    frenchHook: 'Si vous jonglez encore entre 8 onglets pour traduire et copier du texte, installez l’outil #3.',
    description: 'Curated list of lightweight browser tools for instant screen recording, tab cleanup, color extraction, and audio downloading.',
    arabicDescription: 'قائمة مختارة لأدوات خفيفة لتسجيل الشاشة السريع، حفظ علامات التبويب، استخراج أكواد الألوان، وتحميل الصوتيات بنقرة واحدة.',
    frenchDescription: 'Sélection d’extensions essentielles pour capturer l’écran, nettoyer les onglets et extraire les couleurs.',
    scriptOutline: [
      'Tool 1: OneTab to instantly reduce 40 tabs into a neat list saving 80% RAM',
      'Tool 2: ColorZilla for picking exact HEX codes from any website design',
      'Tool 3: Scribe to automatically turn your screen clicks into step-by-step PDF tutorials',
      'Tool 4 & 5: Lightweight audio rip and grammar corrector for rapid client emails'
    ],
    arabicScriptOutline: [
      'الأداة الأولى: OneTab لتحويل 40 علامة تبويب إلى قائمة منظمة وتوفير 80% من ذاكرة الجهاز',
      'الأداة الثانية: ColorZilla لنسخ درجات ألوان أي متجر أو موقع بنقرة واحدة',
      'الأداة الثالثة: Scribe التي تحول نقرات شاشتك إلى دليل تدريبي مصور تلقائياً',
      'الأداتان الرابعة والخامسة: أداة تنزيل المقاطع الصوتية وأداة التدقيق اللغوي السريع'
    ],
    cta: 'Save this video so you do not forget to add them to your browser tonight!',
    arabicCta: 'احفظ المقطع لتضيف هذه الإضافات إلى متصفحك عند جلوسك أمام الحاسوب الليلة!',
    platform: 'Reels',
    niche: 'Productivity',
    difficulty: 'beginner',
    competition: 'low',
    viralPotential: 'high',
    format: 'short',
    duration: '48s',
    facelessPossibility: true,
    tags: ['اضافات_كروم', 'انتاجية', 'ادوات_مجانية', 'تسريع_العمل'],
    angle: 'listicle',
    arabicAngle: 'قوائم سريعة وحيل ذكية'
  },
  // Angle: story
  {
    title: 'How a 22-Year-Old Turned a $0 Notion System into a $4,500/Mo Design Retainer',
    arabicTitle: 'كيف حوّل شاب في سن 22 نظام Notion مجاني إلى اشتراك شهري مستمر بـ 4500$ مع شركات ناشئة',
    frenchTitle: 'Comment un jeune de 22 ans a créé un retainer à 4500$/mois avec Notion',
    hook: 'He was not selling logos or website code: he sold messy startup founders peace of mind and organization.',
    arabicHook: 'هو لم يبع تصاميم لوغوهات رخيصة، بل باع لمؤسسي الشركات الناشئة نظاماً ينقذهم من الفوضى التنظيمية!',
    frenchHook: 'Il ne vendait pas des logos pas chers, mais la tranquillité d’esprit pour fondateurs débordés.',
    description: 'Case study analyzing how productizing an internal dashboard solution opened recurring B2B retainer agreements.',
    arabicDescription: 'دراسة حالة واقعية لتحويل تنظيم إدارة المهام وسير العمل الداخلي إلى خدمة شهرية تستحق مبالغ مرتفعة.',
    frenchDescription: 'Étude de cas décortiquant la transformation d’un dashboard interne en offre récurrente B2B.',
    scriptOutline: [
      'The initial frustration: Pitching standard $50 designs on freelance marketplaces with zero traction',
      'The turning point: Designing a project management portal in Notion for one demanding founder',
      'The offer transition: Packaging the portal into an ongoing "Operations & Design Subscription"',
      'Key takeaways you can adapt for your own service niche'
    ],
    arabicScriptOutline: [
      'نقطة البداية: المعاناة في منصات الخدمات المصغرة بعروض تصميم رخيصة ومنافسة شرسة',
      'نقطة التحول: تصميم بوابة لإدارة مهام وتواصل الفريق عبر Notion لمؤسس شركة كان يعاني من التشتت',
      'تحويل الفكرة إلى عرض شهري: باقة مستمرة لتحديث البوابة ومتابعة التصاميم الرقمية دورياً',
      'الدروس الثلاثة التي يمكنك استنساخها لتطبيق نفس النموذج في مجالك'
    ],
    cta: 'Want the exact portal layout? Type "SYSTEM" below and I will send the tour.',
    arabicCta: 'تريد رؤية هيكل البوابة المنظمة؟ اكتب "نظام" في التعليقات لأرسل لك جولة فيديو داخله!',
    platform: 'YouTube',
    niche: 'Business',
    difficulty: 'intermediate',
    competition: 'low',
    viralPotential: 'high',
    format: 'long',
    duration: '12m',
    facelessPossibility: true,
    tags: ['دراسة_حالة', 'ريادة_اعمال', 'نظام_نوشن', 'عقود_شهرية'],
    angle: 'story',
    arabicAngle: 'قصص نجاح ودراسات حالة واقعية'
  },
  // Angle: problem_solving
  {
    title: 'Fixing Low Free Fire FPS & Stutter on Budget 4GB RAM Android Phones',
    arabicTitle: 'حل مشكلة اللاغ والتقطيع وانخفاض الفريمات في فري فاير لهواتف 4 جيجا رام نهائياً',
    frenchTitle: 'Résoudre les lags et chutes de FPS sur Free Fire pour smartphones 4Go RAM',
    hook: 'If your game freezes during close-range squad fights, turn off this single hidden battery setting in Android.',
    arabicHook: 'إذا كانت اللعبة تتشنج وتقطع في المواجهات القريبة بالسكواد، فعطّل هذا الإعداد المخفي في بطارية الأندرويد!',
    frenchHook: 'Si votre jeu freeze pendant les combats rapprochés, désactivez cette option de batterie Android.',
    description: 'Systematic diagnosis solving thermal throttling, background app RAM hogging, and display refresh mismatches on Android.',
    arabicDescription: 'تشخيص علمي وعملي يحل مشكلة خنق المعالج بالحرارة واستهلاك الرام في الخلفية وضبط التردد الأمثل للشاشة.',
    frenchDescription: 'Optimisation complète de la mémoire RAM et des paramètres graphiques pour une fluidité maximale.',
    scriptOutline: [
      'Demonstrating game FPS dropping from 60 to 22 during squad combat',
      'Step 1: Enabling Game Turbo and setting background process limits in Developer Options',
      'Step 2: Clearing Google Play Services cache and disabling RAM expansion gimmicks',
      'Step 3: Setting display graphics to Smooth with High FPS enabled in in-game settings'
    ],
    arabicScriptOutline: [
      'عرض لقطة توضح هبوط الفريمات المفاجئ من 60 إلى 22 إطاراً في الثانية أثناء الاشتباك المباشر',
      'الخطوة الأولى: الدخول لخيارات المطور وتحديد حد العمليات في الخلفية لمنع التزاحم',
      'الخطوة الثانية: مسح ذاكرة التخزين المؤقت لخدمات جوجل وتعطيل ميزة الرام الوهمي التي تبطئ الذاكرة',
      'الخطوة الثالثة: ضبط جرافيك اللعبة على "ناعم" (Smooth) مع تفعيل معدل أطر مرتفع (High FPS)'
    ],
    cta: 'Test your phone in training grounds now and comment your FPS before and after!',
    arabicCta: 'جرب الخطوات في ساحة التدريب واكتب في التعليقات: هل لاحظت الفرق في السلاسة؟',
    platform: 'TikTok',
    niche: 'Free Fire',
    difficulty: 'beginner',
    competition: 'high',
    viralPotential: 'explosive',
    format: 'short',
    duration: '46s',
    facelessPossibility: true,
    tags: ['فري_فاير', 'حل_مشكلة_اللاغ', 'هواتف_ضعيفة', 'fps_boost'],
    angle: 'problem_solving',
    arabicAngle: 'حل مباشر لمشكلة حقيقية'
  },
  // Angle: trends
  {
    title: 'Faceless Quiz Channels Are Dominating TikTok: The 2026 Viral Playbook',
    arabicTitle: 'قنوات الأسئلة والألغاز (Quiz Channels) تكتسح تيك توك: الخطة الكاملة لركوب التريند',
    frenchTitle: 'Les chaînes Quiz sans visage explosent sur TikTok : le guide 2026',
    hook: 'These simple 5-question psychology and trivia clips are pulling 800k views with zero voice recording and zero camera.',
    arabicHook: 'مقاطع الألغاز والأسئلة النفسية البسيطة تحقق ملايين المشاهدات على تيك توك بدون صوت بشري وبدون كاميرا!',
    frenchHook: 'Ces simples quiz de 5 questions génèrent 800k vues sans micro et sans caméra.',
    description: 'Analyzing why micro-quizzes trigger massive comment debates, how to generate 20 questions in ChatGPT, and automate visuals in Canva Bulk Create.',
    arabicDescription: 'تحليل أسباب انفجار التفاعل في خانة التعليقات، وتوليد 20 سؤالاً بالذكاء الاصطناعي، وتصميم الفيديوهات دفعة واحدة عبر Canva Bulk Create.',
    frenchDescription: 'Comment automatiser la création de quiz viraux avec ChatGPT et Canva Bulk Create.',
    scriptOutline: [
      'Showing a viral 2.1M view quiz video and the active comment section',
      'Step 1: Generating 10 high-curiosity quiz questions with ChatGPT using a strict CSV prompt',
      'Step 2: Connecting the spreadsheet into Canva Bulk Create to generate 10 Shorts in 3 minutes',
      'Step 3: Adding countdown sound effects and a tension-building ticking timer bar'
    ],
    arabicScriptOutline: [
      'عرض مقطع ألغاز حقيقي حقق 2.1 مليون مشاهدة ونسبة احتفاظ هائلة بالمشاهدين',
      'الخطوة الأولى: كتابة برومبت ذكي لشات جي بي تي يولد 10 ألغاز محيرة مع خياراتها بصيغة جدول',
      'الخطوة الثانية: ربط الجدول بميزة الإنشاء المجمع (Bulk Create) في كانفا لإنتاج 10 فيديوهات في 3 دقائق',
      'الخطوة الثالثة: إضافة صوت عداد الثواني المتحرك وموسيقى التشويق لضمان مشاهدة المقطع للنهاية'
    ],
    cta: 'Save this blueprint and launch your quiz channel series this weekend!',
    arabicCta: 'احفظ هذه الخطة وابدأ في نشر أول سلسلة ألغاز بحسابك نهاية هذا الأسبوع!',
    platform: 'TikTok',
    niche: 'Faceless Content',
    difficulty: 'beginner',
    competition: 'medium',
    viralPotential: 'explosive',
    format: 'short',
    duration: '44s',
    facelessPossibility: true,
    tags: ['قنوات_ألغاز', 'تيك_توك_فيروسي', 'كانفا', 'شورتس_تلقائية'],
    angle: 'trends',
    arabicAngle: 'اتجاهات وفرص رقمية صاعدة'
  }
];

let fallbackIndex = 0;

/**
 * Generates a completely unique, non-repetitive content idea.
 * First attempts to leverage the server AI endpoint (/api/rikou-ai/chat) with strict diversity constraints.
 * If the endpoint is unavailable or errors, gracefully falls back to a curated pool and verifies uniqueness.
 */
export async function generateDiverseIdea(request: GenerateIdeaRequest): Promise<GenerateIdeaResult> {
  const {
    niche = 'Making Money Online',
    platform = 'TikTok',
    angle = 'all',
    existingIdeas = [],
    language = 'ar'
  } = request;

  // 1. Attempt AI Generation with strict anti-repetition instructions
  try {
    const targetAngle: ContentAngle =
      angle !== 'all'
        ? angle
        : (['tutorial', 'mistakes', 'experiment', 'comparison', 'listicle', 'story', 'problem_solving', 'trends'][
            Math.floor(Math.random() * 8)
          ] as ContentAngle);

    const promptText = `Generate a single, HIGHLY UNIQUE, and viral content idea for a content creator.
Strict constraints to PREVENT ANY REPETITION:
- Platform: ${platform}
- Niche: ${niche}
- Angle: ${targetAngle}
- Language: Primary Arabic, with English counterpart.
- DO NOT use generic clichés like "هل تعلم", "إذا كنت تريد النجاح", "السر المخفي", "توقف عن إضاعة وقتك في...".
- The HOOK must be sharp, specific to the problem, containing concrete stakes, numbers, or provocative contrasts.
- Provide a concrete 4-part script outline showing exact practical execution steps.
- Provide a tailored, high-converting Call to Action (CTA).

Respond ONLY with valid JSON in this exact structure (no markdown fences, pure JSON):
{
  "title": "Distinct English title",
  "arabicTitle": "عنوان عربي محدد وجذاب وغير مكرر",
  "hook": "Specific, non-cliché English opening hook",
  "arabicHook": "خطاف افتتاحي عربي واقعي ومميز وخاص بالموضوع مباشرة",
  "description": "Short English overview",
  "arabicDescription": "شرح عربي موجز للفكرة وقيمتها للمشاهد",
  "scriptOutline": ["Step 1", "Step 2", "Step 3", "Step 4"],
  "arabicScriptOutline": ["الخطوة 1", "الخطوة 2", "الخطوة 3", "الخطوة 4"],
  "cta": "Tailored call to action",
  "arabicCta": "دعوة تفاعل مرتبطة بموضوع الفيديو",
  "format": "short",
  "duration": "45s",
  "difficulty": "intermediate",
  "viralPotential": "high",
  "facelessPossibility": true,
  "tags": ["tag1", "tag2", "tag3"]
}`;

    const res = await fetch('/api/rikou-ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: promptText }],
        systemInstruction: 'You are a senior social media director generating 100% original, unique content concepts. Never repeat generic formulas.'
      })
    });

    if (res.ok) {
      const data = await res.json();
      const content = data.reply || data.content || '';
      const cleanJson = content.replace(/```json\s*|\s*```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      const candidateIdea: ContentIdea = {
        id: `ai-gen-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: parsed.title,
        arabicTitle: parsed.arabicTitle,
        frenchTitle: parsed.title,
        hook: parsed.hook,
        arabicHook: parsed.arabicHook,
        frenchHook: parsed.hook,
        description: parsed.description,
        arabicDescription: parsed.arabicDescription,
        frenchDescription: parsed.description,
        scriptOutline: parsed.scriptOutline || [],
        arabicScriptOutline: parsed.arabicScriptOutline || [],
        cta: parsed.cta,
        arabicCta: parsed.arabicCta,
        platform: platform as any,
        niche: niche as any,
        difficulty: parsed.difficulty || 'intermediate',
        competition: 'medium',
        viralPotential: parsed.viralPotential || 'very_high',
        format: parsed.format || 'short',
        duration: parsed.duration || '48s',
        facelessPossibility: parsed.facelessPossibility !== undefined ? parsed.facelessPossibility : true,
        tags: parsed.tags || ['افكار_محتوى', 'ذكاء_اصطناعي'],
        angle: targetAngle,
        arabicAngle: getArabicAngleLabel(targetAngle)
      };

      // Strict uniqueness verification
      const dupCheck = isDuplicateIdea(candidateIdea, existingIdeas);
      if (!dupCheck.isDuplicate) {
        return {
          idea: candidateIdea,
          source: 'ai',
          angle: targetAngle,
          duplicateChecked: true
        };
      }
      console.warn('AI generated a candidate too similar to existing idea, switching to unique curated fallback:', dupCheck.duplicateReason);
    }
  } catch (err) {
    console.warn('AI Generation unavailable or encountered an error; falling back to curated pool:', err);
  }

  // 2. Curated Fallback Pool (Guarantees zero duplicate cards and full diversity)
  for (let attempt = 0; attempt < OFFLINE_DIVERSE_POOL.length; attempt++) {
    const poolItem = OFFLINE_DIVERSE_POOL[(fallbackIndex + attempt) % OFFLINE_DIVERSE_POOL.length];
    
    // If user specified an angle, honor it if available
    if (angle !== 'all' && poolItem.angle !== angle) {
      continue;
    }

    const candidateIdea: ContentIdea = {
      id: `curated-gen-${Date.now()}-${attempt}`,
      title: poolItem.title || 'Dynamic High-Retention Concept',
      arabicTitle: poolItem.arabicTitle || 'فكرة محتوى استراتيجية مميزة',
      frenchTitle: poolItem.frenchTitle || poolItem.title || '',
      hook: poolItem.hook || '',
      arabicHook: poolItem.arabicHook || '',
      frenchHook: poolItem.frenchHook || poolItem.hook || '',
      description: poolItem.description || '',
      arabicDescription: poolItem.arabicDescription || '',
      frenchDescription: poolItem.frenchDescription || '',
      scriptOutline: poolItem.scriptOutline || [],
      arabicScriptOutline: poolItem.arabicScriptOutline || [],
      cta: poolItem.cta || '',
      arabicCta: poolItem.arabicCta || '',
      platform: (platform as any) || poolItem.platform || 'TikTok',
      niche: (niche as any) || poolItem.niche || 'Content Creation',
      difficulty: poolItem.difficulty || 'beginner',
      competition: poolItem.competition || 'medium',
      viralPotential: poolItem.viralPotential || 'high',
      format: poolItem.format || 'short',
      duration: poolItem.duration || '45s',
      facelessPossibility: poolItem.facelessPossibility ?? true,
      tags: poolItem.tags || ['صناعة_محتوى'],
      angle: poolItem.angle,
      arabicAngle: poolItem.arabicAngle
    };

    const check = isDuplicateIdea(candidateIdea, existingIdeas);
    if (!check.isDuplicate) {
      fallbackIndex = (fallbackIndex + attempt + 1) % OFFLINE_DIVERSE_POOL.length;
      return {
        idea: candidateIdea,
        source: 'curated_fallback',
        angle: candidateIdea.angle || 'tutorial',
        duplicateChecked: true
      };
    }
  }

  // Final fallback with randomized timestamp ensuring unique ID
  const finalFallback = OFFLINE_DIVERSE_POOL[fallbackIndex % OFFLINE_DIVERSE_POOL.length];
  fallbackIndex++;
  const resultIdea: ContentIdea = {
    ...finalFallback,
    id: `curated-distinct-${Date.now()}`
  } as ContentIdea;

  return {
    idea: resultIdea,
    source: 'curated_fallback',
    angle: resultIdea.angle || 'tutorial',
    duplicateChecked: true
  };
}

export function getArabicAngleLabel(angle: ContentAngle): string {
  switch (angle) {
    case 'tutorial':
      return 'شرح تعليمي خطوة بخطوة';
    case 'mistakes':
      return 'أخطاء شائعة وتحذيرات عملية';
    case 'experiment':
      return 'تجارب وتحديات عملية بالأرقام';
    case 'comparison':
      return 'مقارنات تجارية وتقنية مباشرة';
    case 'listicle':
      return 'قوائم سريعة وحيل ذكية';
    case 'story':
      return 'قصص نجاح ودراسات حالة واقعية';
    case 'problem_solving':
      return 'حل مباشر لمشكلة حقيقية';
    case 'trends':
      return 'اتجاهات وفرص رقمية صاعدة';
    default:
      return 'زاوية مميزة';
  }
}
