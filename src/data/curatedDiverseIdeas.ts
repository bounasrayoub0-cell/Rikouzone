import { ContentIdea, IdeaPlatform, IdeaNiche, DifficultyLevel } from '../types';

export type ContentAngle =
  | 'tutorial'
  | 'mistakes'
  | 'experiment'
  | 'comparison'
  | 'listicle'
  | 'story'
  | 'problem_solving'
  | 'trends';

export interface ExtendedContentIdea extends ContentIdea {
  angle: ContentAngle;
  arabicAngle: string;
}

export const DIVERSE_CONTENT_IDEAS: ExtendedContentIdea[] = [
  // ==========================================
  // ANGLE 1: الشروحات التعليمية (TUTORIALS & HOW-TO)
  // ==========================================
  {
    id: 'idea-tut-01',
    angle: 'tutorial',
    arabicAngle: 'شرح تعليمي خطوة بخطوة',
    title: 'How to Build an Automated Lead Magnet with Notion & Tally',
    arabicTitle: 'كيف تبني نموذج جذب عملاء مؤتمت مجاناً باستعمال Notion و Tally',
    frenchTitle: 'Comment créer un lead magnet automatisé avec Notion et Tally',
    hook: 'Stop paying $90/month for complex funnel builders when this free stack does it in 5 minutes.',
    arabicHook: 'لماذا تدفع 90$ شهرياً في منصات بناء القوائم البريدية بينما يمكنك فعلها مجاناً في 5 دقائق؟',
    frenchHook: 'Arrêtez de payer 90$/mois pour des funnels alors que ce duo gratuit fait tout en 5 minutes.',
    description: 'A practical technical tutorial showing how to connect a Tally form directly into a public Notion page with instant automated delivery.',
    arabicDescription: 'شرح تطبيقي يوضح خطوة بخطوة كيفية ربط نموذج Tally بصفحة Notion للتسليم الفوري للملف الرقمي بدون تكاليف.',
    frenchDescription: 'Tutoriel pratique étape par étape pour automatiser la livraison de vos guides numériques sans frais.',
    scriptOutline: [
      'Screen recording showing the end-user download experience',
      'Creating the 3-field form in Tally and embedding the confirmation redirect',
      'Setting up the Notion database to store lead emails cleanly',
      'Testing the live flow with a real email in under 60 seconds'
    ],
    arabicScriptOutline: [
      'تصوير شاشة سريع يوضح تجربة العميل أثناء تحميل الملف بنقرة واحدة',
      'إنشاء نموذج Tally من 3 حقول وضبط صفحة التحويل التلقائي',
      'ربط قاعدة بيانات Notion لاستقبال وتخزين إيميلات الزوار بانتظام',
      'اختبار التدفق كاملاً على الهواء مباشرة بإيميل حقيقي خلال دقيقة'
    ],
    cta: 'Grab the free Notion template link from my bio to clone it now!',
    arabicCta: 'انسخ قالب Notion الجاهز مجاناً من الرابط المثبت في البايو وابدأ الآن!',
    platform: 'Shorts',
    niche: 'Websites',
    difficulty: 'beginner',
    competition: 'low',
    viralPotential: 'high',
    format: 'short',
    duration: '52s',
    facelessPossibility: true,
    tags: ['notion', 'tally', 'أتمتة', 'أدوات_مجانية', 'تسويق']
  },
  {
    id: 'idea-tut-02',
    angle: 'tutorial',
    arabicAngle: 'شرح تعليمي خطوة بخطوة',
    title: 'Perfect CapCut Keyframe Text Tracking for Action Clips',
    arabicTitle: 'طريقة تتبع النصوص ثلاثية الأبعاد الاحترافية في كاب كات (Text Tracking)',
    frenchTitle: 'Suivi de texte cinématique sur CapCut pour vidéos dynamiques',
    hook: 'If your text overlays still look static and amateur, turn on this one CapCut toggle.',
    arabicHook: 'إذا كانت نصوص فيديوهاتك ما زالت جامدة وتبدو كالمبتدئين، فعّل هذا الزر المخفي في كاب كات!',
    frenchHook: 'Si vos textes vidéo semblent encore rigides, activez cette option cachée dans CapCut.',
    description: 'Mastering optical flow and motion tracking inside CapCut Mobile to make titles float naturally beside moving subjects.',
    arabicDescription: 'احتراف خاصية التتبع الحركي في CapCut للهاتف لجعل النصوص والأسهم تلتصق بالأجسام المتحركة بأسلوب سينمائي.',
    frenchDescription: 'Maîtrisez le tracking de mouvement sur CapCut Mobile pour coller vos textes aux objets en mouvement.',
    scriptOutline: [
      'Before vs After side-by-side clip highlighting the cinematic difference',
      'Adding text and adjusting stroke and drop shadow for maximum legibility',
      'Selecting the Motion Tracking tool and setting the target box on the moving subject',
      'Exporting with motion blur enabled for silky smooth playback'
    ],
    arabicScriptOutline: [
      'مقارنة بصرية سريعة بين النص الثابت الممل والنص المتحرك بالـ Tracking',
      'كتابة النص وضبط الظل والحدود ليكون واضحاً فوق أي خلفية متحركة',
      'تحديد أداة Motion Tracking ووضع مربع التتبع على الهدف بدقة',
      'تصدير المقطع مع تفعيل خاصية Motion Blur لضمان سلاسة فائقة'
    ],
    cta: 'Save this tutorial before your next video edit session tonight.',
    arabicCta: 'احفظ هذا الشرح على هاتفك لتطبقه في مونتاجك القادم الليلة!',
    platform: 'TikTok',
    niche: 'Content Creation',
    difficulty: 'intermediate',
    competition: 'medium',
    viralPotential: 'very_high',
    format: 'short',
    duration: '45s',
    facelessPossibility: true,
    tags: ['كاب_كات', 'مونتاج_هاتف', 'تأثيرات', 'صناعة_محتوى']
  },
  {
    id: 'idea-tut-03',
    angle: 'tutorial',
    arabicAngle: 'شرح تعليمي خطوة بخطوة',
    title: 'Complete Free Fire Beat Sync Editing with CapCut Beat Markers',
    arabicTitle: 'شرح ضبط لقطات الوان تاب مع نقرات الإيقاع بالملي ثانية (Beat Sync)',
    frenchTitle: 'Montage Beat Sync Free Fire parfait avec marqueurs audio CapCut',
    hook: 'Stop missing your beat drops: here is how pro Free Fire editors sync 10 kills in 8 seconds.',
    arabicHook: 'توقف عن إضاعة نقرات البيت: هكذا يربط محترفو فري فاير لقطات الوان تاب باللحن بدقة 100%!',
    frenchHook: 'Ne manquez plus vos beat drops : voici comment synchroniser vos kills Free Fire au millimètre.',
    description: 'Step-by-step masterclass on importing phonk tracks, auto-generating yellow beat markers, and razor-cutting headshots at the drop.',
    arabicDescription: 'درس تطبيقي على استيراد تراك فونك، توليد النقاط الصفراء بالـ Auto Beats، وقص لقطات الهيدشوت مع كل ارتداد باحترافية.',
    frenchDescription: 'Tutoriel complet pour couper vos headshots exactement sur les crêtes sonores dans CapCut.',
    scriptOutline: [
      'Dynamic 3-second teaser of 4 headshots hitting on the beat',
      'Extracting audio and tapping Auto Beats to highlight bass drops',
      'Trimming raw game clips to snap precisely to the yellow dots',
      'Adding the Flash White transition and shake keyframes on impact'
    ],
    arabicScriptOutline: [
      'عرض خاطف لـ 3 لقطات هيدشوت متزامنة مع نبضات الباس في بداية المقطع',
      'استخراج الصوت وتفعيل Auto Beats لتوليد النقاط الصفراء على الإيقاع',
      'قص اللقطات ومحاذاة لحظة تصويب الرأس مع النقطة بالضبط',
      'إضافة تأثير Flash White مع اهتزاز خفيف (Camera Shake) عند كل ضربة'
    ],
    cta: 'Comment your favorite weapon and I will send you the beat pack!',
    arabicCta: 'اكتب في التعليقات سلاحك المفضل وسأرسل لك حزمة الموسيقى المستخدمة مجاناً!',
    platform: 'Free Fire',
    niche: 'Free Fire',
    difficulty: 'intermediate',
    competition: 'medium',
    viralPotential: 'explosive',
    format: 'short',
    duration: '50s',
    facelessPossibility: true,
    tags: ['فري_فاير', 'وان_تاب', 'مونتاج_العاب', 'beat_sync']
  },

  // ==========================================
  // ANGLE 2: الأخطاء الشائعة وكيفية تجنبها (COMMON MISTAKES)
  // ==========================================
  {
    id: 'idea-mis-01',
    angle: 'mistakes',
    arabicAngle: 'أخطاء شائعة وتحذيرات عملية',
    title: '3 TikTok Bio Mistakes Killing Your Link Click-Through Rate',
    arabicTitle: '3 أخطاء شائعة في بايو تيك توك تجعل الزائر يهرب دون النقر على رابطك',
    frenchTitle: '3 erreurs critiques dans votre bio TikTok qui détruisent vos clics',
    hook: 'You got 50,000 views yesterday but zero link clicks? Look at line 2 of your bio.',
    arabicHook: 'حصلت على 50 ألف مشاهدة أمس ولكن صفر نقرات في الرابط؟ انظر للسطر الثاني في البايو الخاص بك فوراً!',
    frenchHook: '50 000 vues hier mais aucun clic sur votre lien ? Regardez la ligne 2 de votre bio.',
    description: 'Analyzing why vague promises, multiple competing links, and missing action triggers destroy bio traffic conversion.',
    arabicDescription: 'تحليل دقيق للأخطاء القاتلة: الروابط المشتتة، الوعود المبهمة، وغياب السهم التوجيهي الصريح فوق الرابط.',
    frenchDescription: 'Analyse des erreurs de bio qui font fuir vos visiteurs au lieu de convertir vers votre offre.',
    scriptOutline: [
      'Screenshot of a bad confusing bio vs high-converting clean bio',
      'Mistake #1: Having 8 different links in a tree instead of one clear offer',
      'Mistake #2: Explaining who you are instead of what the viewer gets',
      'The winning 3-line formula you can copy right now'
    ],
    arabicScriptOutline: [
      'عرض سكرين شوت لبايو مشتت فوضوي مقارنة ببايو احترافي واضح',
      'الخطأ الأول: وضع 8 روابط متنافسة تجعل الزائر يحتار ويخرج دون نقر',
      'الخطأ الثاني: كتابة سيرة ذاتية عن نفسك بدلاً من إخبار الزائر بما سيستفيده هو',
      'المعادلة الثلاثية الفائزة لصياغة بايو يجبر الزائر على النقر في 3 أسطر'
    ],
    cta: 'Apply this formula now and drop your handle for a quick review!',
    arabicCta: 'طبق هذه الصياغة في حسابك الآن واكتب يوزرك لألقي عليه نظرة في التعليقات!',
    platform: 'TikTok',
    niche: 'Content Creation',
    difficulty: 'beginner',
    competition: 'medium',
    viralPotential: 'high',
    format: 'short',
    duration: '42s',
    facelessPossibility: true,
    tags: ['تيك_توك', 'تحسين_الحساب', 'بايو', 'تسويق_بالمحتوى']
  },
  {
    id: 'idea-mis-02',
    angle: 'mistakes',
    arabicAngle: 'أخطاء شائعة وتحذيرات عملية',
    title: 'Why 90% of Dropshipping Beginners Lose Their First $300 on Ads',
    arabicTitle: 'السبب الحقيقي وراء خسارة 90% من المبتدئين لأول 300 دولار في إعلانات الدروب شيبينغ',
    frenchTitle: 'Pourquoi 90% des débutants en Dropshipping perdent leurs premiers 300$ en pub',
    hook: 'Do not launch your Facebook campaign tonight until you check these 2 cart friction points.',
    arabicHook: 'لا تطلق حملتك الإعلانية الليلة قبل فحص هاتين النقطتين القاتلتين في صفحة الدفع بمتجرك!',
    frenchHook: 'Ne lancez pas votre campagne ce soir avant de vérifier ces 2 points critiques au checkout.',
    description: 'Exposing hidden checkout friction, unexpected shipping fees, and untrusted payment gateways that kill conversions.',
    arabicDescription: 'كشف الأسباب الخفية لهروب المشترين في صفحة الدفع: مصاريف الشحن المفاجئة، وبوابات الدفع المشبوهة، وبطء المتجر.',
    frenchDescription: 'Décryptage des frais cachés et problèmes de checkout qui ruinent la rentabilité de vos pubs.',
    scriptOutline: [
      'Showing Shopify abandoned cart analytics graph',
      'Root cause 1: Surprise shipping costs revealed on the final step',
      'Root cause 2: Cluttered forms asking for redundant customer information',
      'Actionable checklist to double checkout completion rates before spending $1'
    ],
    arabicScriptOutline: [
      'عرض شاشة إحصائيات السلات المتروكة (Abandoned Carts) في شوبيفاي',
      'السبب الأول: صدمة الزبون بمصاريف شحن غير متوقعة في الخطوة الأخيرة',
      'السبب الثاني: طلب بيانات وحقول معقدة لا داعي لها تطيل عملية الشراء',
      'قائمة فحص من 3 خطوات لتصحيح صفحة الدفع قبل صرف أي دولار إعلاني'
    ],
    cta: 'Save this post before wasting budget on ads that will not convert.',
    arabicCta: 'احفظ هذا المنشور في المفضلة قبل أن تحرق ميزانيتك على إعلانات لا تحقق مبيعات.',
    platform: 'Instagram',
    niche: 'E-commerce',
    difficulty: 'intermediate',
    competition: 'medium',
    viralPotential: 'high',
    format: 'carousel',
    duration: 'Carousel',
    facelessPossibility: true,
    tags: ['دروب_شيبينغ', 'شوبيفاي', 'اعلانات_فيسبوك', 'تجارة_الكترونية']
  },
  {
    id: 'idea-mis-03',
    angle: 'mistakes',
    arabicAngle: 'أخطاء شائعة وتحذيرات عملية',
    title: 'The Free Fire Sensitivity Myth That Ruins Your Aim (DPI Trap)',
    arabicTitle: 'خرافة رفع الـ DPI إلى الحد الأقصى في فري فاير ولماذا تدمر إيمك بالكامل',
    frenchTitle: 'Le piège du DPI excessif sur Free Fire qui ruine votre visée',
    hook: 'Setting your phone DPI to 900 does not give you auto-headshots—it is literally breaking your aim.',
    arabicHook: 'رفع الـ DPI إلى 900 في هاتفك لن يجعلك ملك الوان تاب، بل يدمر دقة تصويبك ويسخن جهازك!',
    frenchHook: 'Mettre votre DPI à 900 ne vous donne pas des headshots auto, cela détruit votre précision.',
    description: 'Debunking the extreme DPI myth with actual game physics, explaining touch-sampling rate vs pixel skipping on Android.',
    arabicDescription: 'تفكيك الخرافة الشائعة بالأدلة التقنية: الفرق بين سرعة استجابة اللمس وتخطي البكسلات وضياع الرصاص فوق الرأس.',
    frenchDescription: 'Démystification technique du DPI extrême et explication des vrais réglages de sensibilité stables.',
    scriptOutline: [
      'Clip showing crosshair jumping wildly over the enemy head at ultra-high DPI',
      'Technical explanation of pixel-skipping when Android resolution scale is forced',
      'Demonstrating the sweet spot formula based on screen size (between 410 and 520)',
      'Side-by-side recoil stability test proving smooth dragging wins'
    ],
    arabicScriptOutline: [
      'لقطة توضح طيران الطلقات فوق رأس الخصم وتشتت الرصاص بسبب الـ DPI الزائد',
      'شرح تقني مبسط لظاهرة تخطي البكسلات (Pixel Skipping) التي تحدث في المعالج',
      'المعادلة الصحيحة لتحديد DPI المستقر حسب حجم شاشتك (بين 410 و 520 غالباً)',
      'اختبار ميداني في ساحة التدريب يثبت ثبات الإيم وسهولة الرفع دون ارتباك'
    ],
    cta: 'Write your phone model below to get the calibrated DPI for your screen.',
    arabicCta: 'اكتب اسم ونوع هاتفك في التعليقات لأعطيك أنسب رقم DPI مجرب ومستقر له!',
    platform: 'TikTok',
    niche: 'Free Fire',
    difficulty: 'beginner',
    competition: 'high',
    viralPotential: 'explosive',
    format: 'short',
    duration: '48s',
    facelessPossibility: true,
    tags: ['فري_فاير', 'حساسية_فري_فاير', 'dpi', 'وان_تاب_هيدشوت']
  },

  // ==========================================
  // ANGLE 3: التجارب والتحديات (EXPERIMENTS & CHALLENGES)
  // ==========================================
  {
    id: 'idea-exp-01',
    angle: 'experiment',
    arabicAngle: 'تجارب وتحديات عملية بالأرقام',
    title: 'I Spent 7 Days Building a Faceless YouTube Channel with AI Only',
    arabicTitle: 'تحديت نفسي أطلق قناة يوتيوب بدون وجه لمدة 7 أيام بالذكاء الاصطناعي فقط (النتائج الصادمة)',
    frenchTitle: '7 jours pour lancer une chaîne YouTube Faceless uniquement avec l’IA',
    hook: 'Can an AI script, AI voice, and stock footage get monetized views in 2026? Here is the unedited truth.',
    arabicHook: 'هل يمكنك كسب مشاهدات حقيقية في 2026 عبر سكريبت وصوت وصور ذكاء اصطناعي؟ إليكم التجربة بدون فلتر!',
    frenchHook: 'Une chaîne automatisée par IA peut-elle encore faire des vues en 2026 ? Voici le test réel.',
    description: 'A transparent 7-day experiment documenting niche selection, prompt creation, ElevenLabs narration, editing time, and YouTube Studio analytics.',
    arabicDescription: 'توثيق صادق لتجربة 7 أيام كاملة: النيتش المختار، تكاليف الأدوات، عدد الساعات المستثمرة، والأرقام الحقيقية في استوديو يوتيوب.',
    frenchDescription: 'Expérience transparente de 7 jours avec coûts réels, temps de montage et statistiques YouTube.',
    scriptOutline: [
      'Day 1-2: Niche research and picking Stoic Philosophy vs History Mysteries',
      'Day 3-4: Generating 3 complete scripts and rendering natural voiceovers with ElevenLabs',
      'Day 5-6: Editing dynamic B-roll and adding motion captions',
      'Day 7: Analytics reveal: Impressions, Click-Through-Rate, Average View Duration, and the verdict'
    ],
    arabicScriptOutline: [
      'اليوم 1-2: مرحلة اختيار النيتش والمقارنة بين الفلسفة التاريخية والقصص الغامضة',
      'اليوم 3-4: توليد السكريبتات وتوليد أصوات واقعية عبر ElevenLabs ومونتاج المقاطع',
      'اليوم 5-6: تصميم الصور المصغرة والرفع مع الالتزام بسياسات المحتوى الأصلي',
      'اليوم 7: فتح استوديو يوتيوب وكشف المشاهدات ومعدل النقر CTR والدروس المستفادة'
    ],
    cta: 'Watch the full breakdown on YouTube or check the pinned tool sheet!',
    arabicCta: 'شاهد التجربة كاملة وتفاصيل الأدوات المستخدمة في الرابط بالبايو!',
    platform: 'YouTube',
    niche: 'Faceless Content',
    difficulty: 'intermediate',
    competition: 'high',
    viralPotential: 'explosive',
    format: 'long',
    duration: '14m',
    facelessPossibility: true,
    tags: ['يوتيوب_بدون_وجه', 'ذكاء_اصطناعي', 'تحدي_7_ايام', 'تجربة_واقعية']
  },
  {
    id: 'idea-exp-02',
    angle: 'experiment',
    arabicAngle: 'تجارب وتحديات عملية بالأرقام',
    title: 'Testing 3 Local Outreaches to Neighborhood Cafes: Here is What Happened',
    arabicTitle: 'جربت النزول الميداني وعرضت خدمات الخرائط على 3 مقاهي في حيي: ماذا حدث؟',
    frenchTitle: 'J’ai démarché 3 cafés de mon quartier pour Google Maps : voici le résultat',
    hook: 'I walked into 3 local coffee shops with nothing but my phone and a free audit sheet.',
    arabicHook: 'نزلت إلى 3 مقاهي في حيي بدون شركة ولا أوراق رسمية، معي فقط هاتفي وفحص بسيط لخرائطهم!',
    frenchHook: 'Je suis entré dans 3 cafés locaux avec juste mon téléphone et un audit gratuit.',
    description: 'Real-world field breakdown of merchant reactions, the exact words used to get the manager to listen, and the first client closed.',
    arabicDescription: 'كواليس النزول الميداني الحقيقي: ردود أفعال أصحاب المقاهي، الكلمات الدقيقة التي أقنعت المدير بالاستماع، وكيف وقعت أول اتفاق.',
    frenchDescription: 'Retour d’expérience terrain sur le démarchage local direct et la première signature obtenue.',
    scriptOutline: [
      'Walking down the commercial street and identifying 3 neglected Google Maps listings',
      'Shop 1: The rude brush-off and what I learned from bad timing during peak lunch rush',
      'Shop 2: The warm manager who wanted new photos for the updated breakfast menu',
      'Shop 3: Closing a $300 monthly retainer for Google Profile and WhatsApp link maintenance'
    ],
    arabicScriptOutline: [
      'التجول في الشارع التجاري ورصد 3 مقاهي ذات تقييمات مهملة وصور قديمة على الخريطة',
      'المحل الأول: الرفض السريع والدرس المستفاد من اختيار التوقيت الخاطئ أثناء زحمة الغداء',
      'المحل الثاني: ترحيب المدير بالحديث عن تحديث صور وجبات الإفطار الجديدة',
      'المحل الثالث: إغلاق أول اشتراك شهري بقيمة 300$ لإدارة الخريطة وتحديث المحتوى'
    ],
    cta: 'Would you dare do this in your neighborhood? Vote in the comments!',
    arabicCta: 'هل تمتلك الشجاعة للنزول وتطبيق نفس الخطوة في حيك؟ شاركني رأيك في التعليقات!',
    platform: 'Shorts',
    niche: 'Freelancing',
    difficulty: 'beginner',
    competition: 'low',
    viralPotential: 'very_high',
    format: 'short',
    duration: '58s',
    facelessPossibility: false,
    tags: ['خدمات_محلية', 'عمل_حر', 'تحدي_ميداني', 'خرائط_جوجل']
  },

  // ==========================================
  // ANGLE 4: المقارنات والتجارب العملية (COMPARISONS & VERSUS)
  // ==========================================
  {
    id: 'idea-cmp-01',
    angle: 'comparison',
    arabicAngle: 'مقارنات تجارية وتقنية مباشرة',
    title: 'Shopify vs WooCommerce in 2026: The Honest Zero-BS Cost Comparison',
    arabicTitle: 'شوبيفاي ضد ووكومرس للمبتدئين: المقارنة الصريحة للأرباح والتكاليف الخفية',
    frenchTitle: 'Shopify vs WooCommerce : La comparaison honnête des coûts réels',
    hook: 'WooCommerce is NOT free, and Shopify is NOT as cheap as $1/month—here is the real math.',
    arabicHook: 'ووكومرس ليس مجانياً كما يروجون، وشوبيفاي ليس بريال واحد شهرياً: إليك الحسبة الحقيقية!',
    frenchHook: 'WooCommerce n’est pas gratuit et Shopify coûte plus cher qu’1$ : voici les vrais chiffres.',
    description: 'Detailed financial and technical breakdown comparing server hosting, SSL, payment fees, plugin costs, and maintenance headaches.',
    arabicDescription: 'مقارنة مالية وتقنية صريحة بين المنصتين: تكاليف الاستضافة، الإضافات المدفوعة، بوابات الدفع، والجهد التقني المطلوب.',
    frenchDescription: 'Comparatif complet entre la simplicité de Shopify et le contrôle technique de WooCommerce.',
    scriptOutline: [
      'The misleading marketing claim: "Free Open Source" vs "$1/month"',
      'True cost calculator of WooCommerce (Hosting + Elementor + Security + Plugins = ~$250/yr)',
      'True cost of Shopify (Base tier + App subscriptions + 2% transaction fee = ~$450/yr)',
      'Clear verdict rule: Who should pick Shopify vs who should pick WooCommerce today'
    ],
    arabicScriptOutline: [
      'فضح الفخ الإعلاني: شعار "مجاني ومفتوح المصدر" مقابل "ابدأ بدولار واحد فقط"',
      'حساب التكلفة الحقيقية لـ WooCommerce: استضافة + قالب + إضافات كاش وأمان = ~250$ سنوياً',
      'حساب التكلفة الحقيقية لـ Shopify: الاشتراك الأساسي + تطبيقات السلات المتروكة + عمولة البوابة',
      'القاعدة الذهبية للاختيار: متى تختار شوبيفاي بنقرة واحدة ومتى يكون ووكومرس أوفر لك؟'
    ],
    cta: 'Save this comparison table before starting your first online store!',
    arabicCta: 'احفظ جدول المقارنة قبل أن تستثمر أي فلس في منصة لا تناسب ميزانيتك!',
    platform: 'Instagram',
    niche: 'E-commerce',
    difficulty: 'intermediate',
    competition: 'high',
    viralPotential: 'high',
    format: 'carousel',
    duration: 'Carousel',
    facelessPossibility: true,
    tags: ['شوبيفاي', 'ووكومرس', 'مقارنات', 'تجارة_الكترونية']
  },
  {
    id: 'idea-cmp-02',
    angle: 'comparison',
    arabicAngle: 'مقارنات تجارية وتقنية مباشرة',
    title: 'Midjourney v6 vs Flux.1: Which AI Image Generator Wins for Commercial Ads?',
    arabicTitle: 'مقارنة واقعية: Midjourney ضد Flux.1 في تصميم بوسترات وإعلانات المنتجات التجارية',
    frenchTitle: 'Midjourney v6 vs Flux.1 : Quel générateur d’images gagne pour la pub ?',
    hook: 'Can the free open-source Flux model beat Midjourney at rendering realistic product labels?',
    arabicHook: 'هل يستطيع نموذج Flux المجاني التفوق على Midjourney في كتابة النصوص داخل صور المنتجات؟',
    frenchHook: 'Le modèle open-source Flux peut-il battre Midjourney pour le texte publicitaire ?',
    description: 'Side-by-side prompt testing assessing typography generation, photo-realism, human skin textures, and commercial licensing.',
    arabicDescription: 'اختبار لنفس البرومبت التجاري وجهاً لوجه: فحص رسم الكلمات المكتوبة، واقعية ملامح الوجه، ونقاء إضاءة الاستوديو للمنتجات.',
    frenchDescription: 'Test comparatif de prompts identiques sur le rendu des packagings et textures réelles.',
    scriptOutline: [
      'Prompt #1: Luxury perfume bottle with clear gold typography embossed on glass',
      'Reviewing Midjourney output: Gorgeous aesthetics but scrambled gibberish letters',
      'Reviewing Flux output: Crisp readable spelling with accurate reflection highlights',
      'Final verdict and recommended workflow for social media ad designers'
    ],
    arabicScriptOutline: [
      'البرومبت الأول: زجاجة عطر فاخرة مع اسم واضح محفور بالذهب على الزجاج',
      'فحص نتيجة Midjourney: جمالية فائقة ولكن الحروف مشوهة وغير مفهومة',
      'فحص نتيجة Flux: قراءة دقيقة 100% للكلمات المكتوبة مع انعكاسات إضاءة متقنة',
      'الخلاصة وتوصية مسار العمل الأنسب لمصممي إعلانات السوشيال ميديا اليوم'
    ],
    cta: 'Which result looked more realistic to you? Comment Flux or Midjourney!',
    arabicCta: 'أي نتيجة بدت لك أكثر واقعية وإقناعاً؟ اكتب في التعليقات: Flux أم Midjourney؟',
    platform: 'TikTok',
    niche: 'AI',
    difficulty: 'beginner',
    competition: 'medium',
    viralPotential: 'explosive',
    format: 'short',
    duration: '46s',
    facelessPossibility: true,
    tags: ['ذكاء_اصطناعي', 'midjourney', 'flux', 'تصميم_اعلانات']
  },

  // ==========================================
  // ANGLE 5: القوائم والنصائح السريعة (LISTICLES & ACTIONABLE TIPS)
  // ==========================================
  {
    id: 'idea-lst-01',
    angle: 'listicle',
    arabicAngle: 'قوائم سريعة وحيل ذكية',
    title: '5 Free Websites that Save 10+ Hours of Video Editing Every Week',
    arabicTitle: '5 مواقع مجانية وسرية تختصر عليك أكثر من 10 ساعات مونتاج أسبوعياً',
    frenchTitle: '5 sites gratuits qui économisent 10h de montage vidéo par semaine',
    hook: 'If you still manually cut out silences and look for sound effects, stop wasting your life.',
    arabicHook: 'إذا كنت ما زلت تقص فترات الصمت يدوياً وتبحث عن المؤثرات الصوتية ساعة كاملة، وفر وقتك فوراً!',
    frenchHook: 'Si vous coupez encore les blancs à la main, arrêtez de gaspiller votre temps.',
    description: 'Curated list of 5 high-utility browser tools: AI vocal isolation, auto jump-cutters, free sound design libraries, and dynamic subtitle generators.',
    arabicDescription: 'استعراض سريع لـ 5 أدوات ذكية: عزل الضوضاء تلقائياً، قص الصمت بضغطة زر، مكتبات مؤثرات مجانية، وتوليد نصوص متحركة.',
    frenchDescription: 'Sélection de 5 outils en ligne indispensables pour accélérer drastiquement votre workflow de montage.',
    scriptOutline: [
      'Fast 2-second hook cutting directly to tool #1 (Auto Silence Remover)',
      'Tool #2: Studio sound enhancer that turns phone mics into podcast quality',
      'Tool #3: High-speed royalty-free sound effect soundboard with one-click download',
      'Tools #4 & #5: Background motion graphic patterns and instant subtitle styler'
    ],
    arabicScriptOutline: [
      'انطلاقة خاطفة واستعراض الموقع الأول: أداة قص فترات الصمت والتنفس بضغطة زر واحدة',
      'الموقع الثاني: منقي الصوت الذكي الذي يحول مايك الهاتف إلى استوديو احترافي',
      'الموقع الثالث: أضخم مكتبة مؤثرات صوتية (SFX) مجانية بدون حقوق ملكية',
      'الموقعان 4 و 5: خلفيات متحركة مجانية ومولد ترجمات تلقائية ملونة'
    ],
    cta: 'Bookmark this video so you can access all 5 links next time you edit.',
    arabicCta: 'احفظ هذا المقطع الآن لترجع للروابط في المرة القادمة التي تفتح فيها برنامج المونتاج!',
    platform: 'Shorts',
    niche: 'Content Creation',
    difficulty: 'beginner',
    competition: 'high',
    viralPotential: 'explosive',
    format: 'short',
    duration: '45s',
    facelessPossibility: true,
    tags: ['مونتاج', 'مواقع_مجانية', 'ادوات_صانع_المحتوى', 'انتاجية']
  },
  {
    id: 'idea-lst-02',
    angle: 'listicle',
    arabicAngle: 'قوائم سريعة وحيل ذكية',
    title: '4 High-Ticket Digital Products You Can Create in a Single Weekend',
    arabicTitle: '4 منتجات رقمية مربحة يمكنك تصميمها وتجهيزها في عطلة نهاية أسبوع واحدة',
    frenchTitle: '4 produits digitaux rentables à créer en un seul week-end',
    hook: 'Do not spend 6 months building a 20-hour video course. Sell these 4 high-value assets instead.',
    arabicHook: 'لا تضيع 6 أشهر في تسجيل كورس فيديو من 20 ساعة! ابنِ واحداً من هذه المنتجات الأربعة في 48 ساعة فقط!',
    frenchHook: 'Ne passez pas 6 mois sur une formation vidéo : vendez plutôt ces 4 actifs digitaux rapides.',
    description: 'Practical list of high-margin digital assets: Notion productivity systems, Canva social bundles, prompt libraries, and automation blueprints.',
    arabicDescription: 'قائمة منتجات رقمية مطلوبة: قوالب Notion المتخصصة، حزم قوالب Canva للأنشطة المحلية، بنوك البرومبتات، ومخططات الأتمتة.',
    frenchDescription: 'Guide de 4 produits digitaux à forte marge réalisables sans compétences de programmation.',
    scriptOutline: [
      'Asset 1: Specialized Notion dashboard for a specific niche (e.g. Real Estate lead tracker)',
      'Asset 2: 60-day themed Canva carousel templates for aesthetic wellness creators',
      'Asset 3: Curated ChatGPT & Claude mega-prompt database for copywriting & outreach',
      'Asset 4: Standard Operating Procedure (SOP) onboarding checklist for local businesses'
    ],
    arabicScriptOutline: [
      'المنتج الأول: لوحة تحكم Notion متخصصة لنشاط محدد (مثل متابعة عملاء الوسطاء العقاريين)',
      'المنتج الثاني: حزمة 60 قالباً جاهزاً في Canva لمراكز التجميل أو الصالونات',
      'المنتج الثالث: بنك برومبتات ذكية مجربة لكتابة الرسائل الإعلانية وصياغة الإيميلات',
      'المنتج الرابع: كتيب إجراءات عمل قياسية (SOP) لمساعدة أصحاب المحلات في إدارة العمال'
    ],
    cta: 'Comment "PRODUCT" and I will send you the pricing blueprint for each one.',
    arabicCta: 'اكتب كلمة "منتج" في التعليقات لأرسل لك دليل تسعير هذه المنتجات بالتفصيل!',
    platform: 'Reels',
    niche: 'Affiliate Marketing',
    difficulty: 'beginner',
    competition: 'medium',
    viralPotential: 'high',
    format: 'short',
    duration: '54s',
    facelessPossibility: true,
    tags: ['منتجات_رقمية', 'دخل_سلبي', 'قوالب_جاهزة', 'ربح_من_الانترنت']
  },

  // ==========================================
  // ANGLE 6: القصص ودراسة الحالات (CASE STUDIES & STORYTELLING)
  // ==========================================
  {
    id: 'idea-sty-01',
    angle: 'story',
    arabicAngle: 'قصص نجاح ودراسات حالة واقعية',
    title: 'How a 22-Year Old College Student Replaced His Job with Notion Freelance Templates',
    arabicTitle: 'دراسة حالة: كيف استقال شاب عمره 22 سنة من وظيفته عبر بيع قوالب Notion فقط؟',
    frenchTitle: 'Étude de cas : Comment un étudiant vit entièrement de ses templates Notion',
    hook: 'He had no coding degree, no venture capital, and only 800 followers when his first template blew up.',
    arabicHook: 'لم يكن مبرمجاً ولا يملك رأس مال، وكان حسابه لا يتجاوز 800 متابع عندما حقق أول 1000 دولار!',
    frenchHook: 'Sans diplôme en informatique et avec 800 abonnés, il a généré son premier millier d’euros.',
    description: 'Deconstructing a real case study: how finding an underserved niche (fitness coaches needing client trackers) unlocked sustainable organic sales.',
    arabicDescription: 'تفكيك استراتيجية حقيقية: كيف استهدف مدربي اللياقة البدنية الذين يحتاجون لمتابعة متدربيهم وحول القالب إلى مصدر دخل شهري مستمر.',
    frenchDescription: 'Analyse détaillée d’un cas réel de création de templates ciblés pour coachs sportifs.',
    scriptOutline: [
      'The initial frustration: Building templates nobody wanted because they were too generic',
      'The breakthrough: Reaching out to 15 personal trainers and asking about their client logging pain',
      'Building the dedicated "Client Progression Tracker" in 4 days',
      'The organic distribution engine: Posting 15-second screen recordings on TikTok and Gumroad'
    ],
    arabicScriptOutline: [
      'الإحباط الأول: تصميم قوالب عامة لم يشترها أحد لأنها كانت تفتقر للتخصص',
      'نقطة التحول: التواصل مع 15 مدرب رياضي وسؤالهم عن أكبر صداع يواجههم مع المشتركين',
      'بناء قالب مخصص لحساب السعرات ومتابعة الأوزان خلال 4 أيام فقط',
      'خطة النشر الفيروسي: مقاطع تيك توك قصيرة من 15 ثانية توضح القالب وطريقة التحميل عبر Gumroad'
    ],
    cta: 'What niche would you build a template for? Share your idea below!',
    arabicCta: 'لو كنت ستبني قالباً اليوم، ما هو التخصص الذي ستختاره؟ شاركنا فكرتك في التعليقات!',
    platform: 'YouTube',
    niche: 'Productivity',
    difficulty: 'intermediate',
    competition: 'low',
    viralPotential: 'high',
    format: 'long',
    duration: '11m',
    facelessPossibility: false,
    tags: ['دراسة_حالة', 'قصة_نجاح', 'نوشن', 'عمل_حر']
  },
  {
    id: 'idea-sty-02',
    angle: 'story',
    arabicAngle: 'قصص نجاح ودراسات حالة واقعية',
    title: 'How a Local Dental Clinic Added 40 Patients/Month with One Google Maps Strategy',
    arabicTitle: 'قصة عيادة أسنان ضاعفت زبائنها الجدد من 5 إلى 45 مريضاً شهرياً بتغيير واحد على الخريطة',
    frenchTitle: 'Comment un cabinet dentaire a gagné 40 patients/mois grâce à Google Maps',
    hook: 'They were spending $1,200 on roadside flyers that ended up in the trash—until they fixed this.',
    arabicHook: 'كانت العيادة تطبع منشورات ورقية بـ 1000$ ترمى في الشارع، حتى طبقت هذا التعديل البسيط في الخرائط!',
    frenchHook: 'Ils dépensaient 1 200$ en prospectus jetés à la poubelle avant d’optimiser cette fiche.',
    description: 'Case study analyzing local SEO optimization, geo-tagged clinical photos, and setting up an automated post-treatment review card via QR code.',
    arabicDescription: 'تحليل دقيق لخطة العمل: تجديد ملف العيادة، رفع صور نظيفة للأجهزة، وتفعيل بطاقة QR ذكية لجمع تقييمات الزوار فور خروجهم.',
    frenchDescription: 'Étude d’impact d’une stratégie Google Business Profile et cartes d’avis QR code pour médecins.',
    scriptOutline: [
      'The baseline problem: Clinic hidden on page 2 of local search results',
      'The technical remedy: Restructuring primary category from "Doctor" to "Cosmetic Dentist"',
      'The review flywheel: Introducing a clean NFC/QR stand at reception that generated 35 five-star reviews in 30 days',
      'The measurable ROI: Inbound phone calls rose by 320% with zero paid ads'
    ],
    arabicScriptOutline: [
      'المشكلة الأولية: العيادة كانت مدفونة في الصفحة الثانية عند البحث عن طبيب أسنان في الحي',
      'التصحيح التقني: تغيير التصنيف الأساسي من "طبيب" إلى "عيادة تجميل وزراعة الأسنان"',
      'نظام التقييمات التلقائي: وضع ستاند QR أنيق عند مكتب الاستقبال جلب 35 تقييماً إيجابياً في شهر واحد',
      'النتيجة الملموسة بالأرقام: ارتفاع الاتصالات وحجوزات الكشف بنسبة 320% بدون إعلانات ممولة'
    ],
    cta: 'Tag a local business owner who needs to see this real case study!',
    arabicCta: 'منشن صاحب مشروع أو عيادة في مدينتك يحتاج لتطبيق هذه الخطوة اليوم!',
    platform: 'Facebook',
    niche: 'Websites',
    difficulty: 'beginner',
    competition: 'low',
    viralPotential: 'high',
    format: 'short',
    duration: '58s',
    facelessPossibility: true,
    tags: ['خرائط_جوجل', 'سيو_محلي', 'مشاريع_محلية', 'تسويق']
  },

  // ==========================================
  // ANGLE 7: حل مشكلات الجمهور العميقة (PROBLEM SOLVING & PAIN POINTS)
  // ==========================================
  {
    id: 'idea-prb-01',
    angle: 'problem_solving',
    arabicAngle: 'حل مباشر لمشكلة حقيقية',
    title: 'How to Get Your First Freelance Upwork Client with Zero Prior Reviews',
    arabicTitle: 'حل أزمة البداية: كيف تحصل على أول عميل في Upwork و فايفر بدون أي تقييم سابق؟',
    frenchTitle: 'Comment décrocher son premier client freelance sans aucun avis précédent',
    hook: 'Nobody wants to hire a freelancer with zero reviews. Here is the backdoor strategy to break that loop.',
    arabicHook: 'لا أحد يريد توظيف مستقل جديد بصفر تقييمات! إليك الحيلة الذكية لكسر هذه الحلقة المغلقة فوراً.',
    frenchHook: 'Personne ne veut embaucher un freelance sans avis. Voici la stratégie pour briser ce cercle.',
    description: 'Providing a concrete 3-step proposal hack using custom Loom video audits that prove capability before the client even awards the contract.',
    arabicDescription: 'حل عملي لمشكلة البداية: إرسال فيديو Loom مصغر من 60 ثانية يحل جزءاً من مشكلة العميل مباشرة في رسالة العرض.',
    frenchDescription: 'Solution concrète pour décrocher son premier contrat grâce à des audits vidéo personnalisés.',
    scriptOutline: [
      'Why generic copy-paste proposals get deleted in 10 seconds',
      'The "Loom Trojan Horse" technique: Recording a 60-second screen teardown of the client problem',
      'The risk-reversal offer: Proposing a micro-deliverable within 24 hours at introductory terms',
      'How to request the 5-star review immediately upon successful delivery'
    ],
    arabicScriptOutline: [
      'لماذا يتجاهل أصحاب المشاريع عروضك المنسوخة الجاهزة في أول 5 ثوانٍ',
      'استراتيجية فيديو Loom السريعة: تصوير 60 ثانية تشرح فيها للعميل كيف ستحل مشكلته تحديداً',
      'تخفيف المخاطرة على العميل: اقتراح تسليم عينة أولية خلال 24 ساعة قبل توقيع العقد الكامل',
      'طريقة طلب التقييم الخماسي فور تسليم العمل بنجاح لبناء الثقة في حسابك'
    ],
    cta: 'Save this script and use it on your next 3 Upwork proposals today.',
    arabicCta: 'احفظ هذا السكريبت وطبقه في عروضك الثلاثة القادمة على منصات العمل الحر!',
    platform: 'TikTok',
    niche: 'Freelancing',
    difficulty: 'beginner',
    competition: 'high',
    viralPotential: 'high',
    format: 'short',
    duration: '50s',
    facelessPossibility: true,
    tags: ['عمل_حر', 'ابورك', 'فريلانس', 'عملاء_جدد']
  },
  {
    id: 'idea-prb-02',
    angle: 'problem_solving',
    arabicAngle: 'حل مباشر لمشكلة حقيقية',
    title: 'Fixing the "0 Views" Bug on New TikTok Accounts in 2026',
    arabicTitle: 'حل مشكلة الصفر مشاهدة (0 Views) في حسابات تيك توك الجديدة خطوة بخطوة',
    frenchTitle: 'Comment débloquer le bug des 0 vues sur un compte TikTok neuf',
    hook: 'If your brand new TikTok account is stuck at literally 0 views after 3 hours, do NOT delete the video.',
    arabicHook: 'إذا نشرت في حساب تيك توك جديد وبقي الفيديو عند 0 مشاهدة لساعات، إياك أن تحذف الفيديو فوراً!',
    frenchHook: 'Si votre vidéo reste bloquée à 0 vue après 3 heures, ne la supprimez surtout pas.',
    description: 'Technical troubleshooting guide covering IP flags, copyright audio mutes, warm-up engagement protocol, and device hardware signatures.',
    arabicDescription: 'دليل تشخيصي لحل مشكلة تجميد المشاهدات: فحص حقوق الصوت، تهيئة الحساب، وتجنب حظر الـ Shadowban للمبتدئين.',
    frenchDescription: 'Guide de dépannage technique pour chauffer un nouveau compte et passer les filtres antispam.',
    scriptOutline: [
      'Step 1: Check if the video is under automated review or flagged for copyrighted background audio',
      'Step 2: The 48-hour warming up routine (watching videos, liking niche creators, searching keywords)',
      'Step 3: Verification test: Share video link to a secondary device in private browser',
      'Step 4: Safe re-upload guidelines to prevent shadowban flags'
    ],
    arabicScriptOutline: [
      'الخطوة الأولى: التأكد هل الفيديو تحت المراجعة التلقائية أو معطل بسبب حقوق الموسيقى',
      'الخطوة الثانية: بروتوكول تسخين الحساب لمدة 48 ساعة (تصفح وتفاعل طبيعي داخل نفس النيتش)',
      'الخطوة الثالثة: اختبار المشاركة عبر متصفح خفي للتأكد هل الفيديو مرئي للعامة',
      'الخطوة الرابعة: الطريقة السليمة لإعادة الرفع دون التعرض لحظر الحساب كحساب سبام'
    ],
    cta: 'Share this with a fellow creator who is struggling with TikTok reach right now.',
    arabicCta: 'شارك هذا الفيديو مع صديق يعاني من ثبات المشاهدات في حسابه الجديد!',
    platform: 'Shorts',
    niche: 'Content Creation',
    difficulty: 'beginner',
    competition: 'medium',
    viralPotential: 'very_high',
    format: 'short',
    duration: '47s',
    facelessPossibility: true,
    tags: ['تيك_توك', 'خوارزميات_تيك_توك', 'مشاهدات', 'حلول_تقنية']
  },

  // ==========================================
  // ANGLE 8: الاتجاهات والفرص الجديدة (TRENDS & EMERGING OPPORTUNITIES)
  // ==========================================
  {
    id: 'idea-trd-01',
    angle: 'trends',
    arabicAngle: 'اتجاهات وفرص رقمية صاعدة',
    title: 'The Rise of Micro-SaaS: Why Solo Developers are Making $5k/Month with Tiny Tools',
    arabicTitle: 'ثورة الـ Micro-SaaS: كيف يكسب مطور واحد 5000$ شهرياً من أداة برمجية بسيطة واحدة؟',
    frenchTitle: 'L’essor du Micro-SaaS : Pourquoi des devs solos génèrent 5k$/mois avec des micro-outils',
    hook: 'You do not need a 20-person startup or millions in VC funding to make serious software money in 2026.',
    arabicHook: 'لست بحاجة لشركة من 20 موظفاً ولا مستثمرين أمريكيين لتبني مشروعاً برمجياً يدخل آلاف الدولارات شهرياً!',
    frenchHook: 'Plus besoin d’une équipe de 20 personnes ni de levée de fonds pour vivre de son propre logiciel.',
    description: 'Analyzing the micro-software business model: Chrome extensions, Shopify micro-plugins, and AI wrapper utilities with high recurring retention.',
    arabicDescription: 'تحليل نموذج البرمجيات المصغرة: إضافات كروم، أدوات الذكاء الاصطناعي المتخصصة، وتطبيقات الاشتراكات الشهرية المستدامة.',
    frenchDescription: 'Analyse du modèle Micro-SaaS basé sur des extensions Chrome et outils spécialisés rentables.',
    scriptOutline: [
      'Deconstructing a real example: A simple Chrome extension that organizes Amazon receipts making $4,200 MRR',
      'Why businesses happily pay $19/month for a tool that solves one specific friction point',
      'The modern tech stack: Supabase + Next.js + Stripe Checkout built in 10 days',
      'How to validate your software idea before writing a single line of code'
    ],
    arabicScriptOutline: [
      'تفكيك مثال حي: إضافة متصفح كروم تقوم بتنظيم فواتير أمازون فقط وتدر 4200$ شهرياً',
      'لماذا تدفع الشركات 19$ شهرياً وهي سعيدة مقابل أداة تحل لها مشكلة واحدة مزعجة',
      'الأدوات الحديثة للبناء السريع: Next.js + Supabase + بوابة دفع Stripe في 10 أيام',
      'كيف تتأكد من وجود طلب حقيقي على فكرتك البرمجية قبل كتابة سطر كود واحد'
    ],
    cta: 'Comment "SAAS" and I will drop my favorite 5 micro-SaaS opportunities for this year.',
    arabicCta: 'اكتب "SAAS" في التعليقات لأرسل لك قائمة بأبرز 5 أفكار برمجية مصغرة مطلوبة حالياً!',
    platform: 'YouTube',
    niche: 'Technology',
    difficulty: 'advanced',
    competition: 'low',
    viralPotential: 'explosive',
    format: 'long',
    duration: '13m',
    facelessPossibility: true,
    tags: ['مايكرو_ساس', 'برمجة', 'ريادة_اعمال', 'دخل_متكرر']
  },
  {
    id: 'idea-trd-02',
    angle: 'trends',
    arabicAngle: 'اتجاهات وفرص رقمية صاعدة',
    title: 'Faceless TikTok Affiliate Series: The New Way to Earn Without Showing Products',
    arabicTitle: 'الترند الصاعد: كيف تروج لمنتجات أمازون على تيك توك بدون شراء المنتج ولا إظهار وجهك؟',
    frenchTitle: 'Affiliation TikTok Faceless : Vendre des produits sans les avoir chez soi',
    hook: 'You do not need to buy products or wait for Amazon packages to make affiliate commissions on TikTok.',
    arabicHook: 'لست مضطراً لشراء المنتجات بنفسك ولا انتظار طرود الشحن لتربح عمولات أفيلييت على تيك توك!',
    frenchHook: 'Pas besoin d’acheter les produits ni d’attendre les colis pour faire de l’affiliation TikTok.',
    description: 'Explaining the emerging review & curation format: aggregating consumer reviews, animation mockups, and problem-solution short hooks.',
    arabicDescription: 'شرح أسلوب التنسيق التجميعي الجديد: تحويل مراجعات المشترين وتجاربهم إلى مقاطع فيديو رسومية تعلق على مزايا وعيوب المنتج بأمانة.',
    frenchDescription: 'Méthode légale de curation de contenu et d’animation pour présenter des produits en affiliation.',
    scriptOutline: [
      'The traditional affiliate mistake: Wasting $200 buying random gadgets that do not get views',
      'The Curation Framework: Finding trending Amazon products with thousands of positive reviews',
      'Using Canva motion graphics and 3D mockups to visually illustrate the product problem-solver',
      'Structuring the 3-second hook around the consumer pain point and placing the bio link'
    ],
    arabicScriptOutline: [
      'الخطأ التقليدي: صرف مئات الدولارات على شراء منتجات عشوائية لا تحقق مشاهدات',
      'أسلوب التنسيق الذكي (Curation): البحث عن منتجات أمازون الأعلى مبيعاً وتقييماً',
      'استخدام موك أب ثلاثي الأبعاد ورسوم متحركة في كانفا لتوضيح فائدة المنتج في 5 ثوانٍ',
      'بناء الخطاف الافتتاحي حول مشكلة يعاني منها المشاهد ووضع الرابط في البايو بطريقة قانونية'
    ],
    cta: 'Save this blueprint and check out our full free affiliate course on the platform!',
    arabicCta: 'احفظ هذه الخطة وطبقها، وراجع مسار التسويق بالعمولة المجاني بالكامل في المنصة!',
    platform: 'TikTok',
    niche: 'Affiliate Marketing',
    difficulty: 'intermediate',
    competition: 'medium',
    viralPotential: 'very_high',
    format: 'short',
    duration: '49s',
    facelessPossibility: true,
    tags: ['تسويق_بالعمولة', 'تيك_توك_شوب', 'أمازون', 'بدون_وجه']
  }
];
