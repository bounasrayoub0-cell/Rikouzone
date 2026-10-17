import { ContentIdea, IdeaPlatform, IdeaNiche, DifficultyLevel } from '../types';
import { DIVERSE_CONTENT_IDEAS, ContentAngle, ExtendedContentIdea } from './curatedDiverseIdeas';
import { filterUniqueIdeas, generateIdeaFingerprint } from '../utils/ideaFingerprint';

// Additional handcrafted unique content ideas across all niches & 8 angles
const ADDITIONAL_IDEAS: ExtendedContentIdea[] = [
  // --- Tutorials ---
  {
    id: 'idea-tut-04',
    angle: 'tutorial',
    arabicAngle: 'شرح تعليمي خطوة بخطوة',
    title: 'How to Build an Automatic Invoice Generator with Google Sheets & Apps Script',
    arabicTitle: 'كيف تصنع نظام فواتير تلقائي مجاناً عبر جداول بيانات جوجل و Apps Script',
    frenchTitle: 'Générateur de factures automatisé avec Google Sheets et Apps Script',
    hook: 'Do not pay $30/month for invoicing software when Google Sheets can auto-email PDFs in one click.',
    arabicHook: 'لماذا تدفع 30$ شهرياً لبرامج الفواتير بينما جداول جوجل ترسل فواتير PDF لعملائك بنقرة زر؟',
    frenchHook: 'Ne payez plus 30$/mois : Google Sheets peut générer et envoyer vos factures PDF automatiquement.',
    description: 'Learn how 10 lines of simple Apps Script turns a spreadsheet into an automated client billing portal.',
    arabicDescription: 'شرح مبسط لكتابة كود قصير في Apps Script لتحويل جدول بيانات إلى نظام إرسال فواتير احترافي.',
    frenchDescription: 'Automatisez la facturation client avec 10 lignes de code Google Apps Script simples.',
    scriptOutline: [
      'Screen demo of clicking "Generate Invoice" and seeing the PDF arrive in Gmail',
      'Setting up the invoice template sheet with dynamic formulas',
      'Pasting the clean Apps Script snippet and setting up the trigger button',
      'Live test and export settings for local freelancers'
    ],
    arabicScriptOutline: [
      'عرض تجربة حية: الضغط على زر "إنشاء الفاتورة" ووصول ملف PDF منسق مباشرة إلى بريد العميل',
      'تصميم نموذج الفاتورة داخل Google Sheets مع معادلات جمع المبالغ تلقائياً',
      'إضافة كود Apps Script السريع وربطه برسمة زر داخل الشيت',
      'اختبار عملي وإرسال أول فاتورة تجريبية بنجاح'
    ],
    cta: 'Grab the free Google Sheet template from the link in my bio!',
    arabicCta: 'احصل على رابط قالب جداول جوجل الجاهز مجاناً من البايو وطبقه الآن!',
    platform: 'Shorts',
    niche: 'Freelancing',
    difficulty: 'intermediate',
    competition: 'low',
    viralPotential: 'high',
    format: 'short',
    duration: '55s',
    facelessPossibility: true,
    tags: ['جداول_جوجل', 'فواتير', 'أتمتة', 'عمل_حر']
  },
  {
    id: 'idea-tut-05',
    angle: 'tutorial',
    arabicAngle: 'شرح تعليمي خطوة بخطوة',
    title: 'How to Animate 3D Phone Mockups in Premiere Pro for Free',
    arabicTitle: 'طريقة تحريك موك أب هاتف ثلاثي الأبعاد في بريمير برو للمبتدئين',
    frenchTitle: 'Comment animer un mockup 3D de smartphone dans Premiere Pro',
    hook: 'Stop showing flat phone screenshots in your ads—animate them like Apple does.',
    arabicHook: 'توقف عن عرض لقطات الشاشة المسطحة في إعلاناتك: اجعل الهاتف يدور في الفضاء مثل إعلانات آبل!',
    frenchHook: 'Arrêtez les captures d’écran plates dans vos pubs : animez le téléphone en 3D.',
    description: 'Master basic 3D effects inside Premiere Pro using Basic 3D, drop shadows, and smooth easing curves.',
    arabicDescription: 'درس عملي لاستخدام تأثير Basic 3D والظلال ومنحنيات السرعة لعرض شاشات التطبيقات بجاذبية.',
    frenchDescription: 'Tutoriel d’animation 3D accessible dans Premiere Pro sans passer par After Effects.',
    scriptOutline: [
      'Visual contrast: Flat still image vs smooth floating rotating 3D mockup',
      'Downloading a transparent phone PNG and placing your screen recording inside',
      'Applying the Basic 3D effect and keyframing Swivel and Tilt',
      'Smoothing keyframes with Bezier curves for natural inertia'
    ],
    arabicScriptOutline: [
      'مقارنة بصرية بين صورة هاتف ثابتة مملة وهاتف يدور بانسيابية ثلاثية الأبعاد',
      'تنزيل إطار هاتف شفاف ووضع تسجيل الشاشة داخله بحجم دقيق',
      'تطبيق تأثير Basic 3D وضبط مفاتيح الحركة للدوران والارتفاع',
      'تنعيم حركة الإطارات باستخدام منحنيات Bezier لمحاكاة حركة الكاميرا الاحترافية'
    ],
    cta: 'Save this video to elevate your client promo videos this week!',
    arabicCta: 'احفظ الشرح لتطبقه في الفيديو الترويجي القادم لعملائك!',
    platform: 'YouTube',
    niche: 'Content Creation',
    difficulty: 'intermediate',
    competition: 'medium',
    viralPotential: 'very_high',
    format: 'long',
    duration: '8m',
    facelessPossibility: true,
    tags: ['بريمير_برو', 'مونتاج_فيديو', 'موك_اب', 'تصميم_اعلانات']
  },

  // --- Common Mistakes ---
  {
    id: 'idea-mis-04',
    angle: 'mistakes',
    arabicAngle: 'أخطاء شائعة وتحذيرات عملية',
    title: '3 Fatal Thumbnail Design Mistakes Crushing Your YouTube Views',
    arabicTitle: '3 أخطاء شائعة في تصميم الصورة المصغرة تجعل المشاهد يتجاهل فيديوهاتك على يوتيوب',
    frenchTitle: '3 erreurs fatales de miniatures qui détruisent votre CTR YouTube',
    hook: 'If your YouTube CTR is below 4%, check mistake #2 on your latest thumbnail immediately.',
    arabicHook: 'إذا كانت نسبة النقر إلى الظهور (CTR) في قناتك أقل من 4%، راجع الخطأ الثاني في صورتك المصغرة فوراً!',
    frenchHook: 'Si votre taux de clic YouTube est sous les 4%, vérifiez l’erreur #2 sur votre dernière miniature.',
    description: 'Analyzing visual clutter, unreadable fonts on mobile screens, and emotional disconnect in thumbnail composition.',
    arabicDescription: 'تحليل دقيق لأسباب فشل الصور المصغرة: كثرة النصوص، الخطوط غير المقروءة على شاشة الهاتف، وغياب عنصر الفضول.',
    frenchDescription: 'Analyse des erreurs de lisibilité et de surcharge visuelle sur smartphone.',
    scriptOutline: [
      'Showcasing thumbnail preview on a small smartphone screen',
      'Mistake 1: Using more than 4 words of text that duplicates the video title',
      'Mistake 2: Poor contrast where the subject blends into a dark background',
      'Mistake 3: Lack of focal point causing the viewer eye to wander without clicking'
    ],
    arabicScriptOutline: [
      'معاينة الصورة المصغرة بحجمها الحقيقي الصغير على شاشة الهاتف لاختبار وضوحها',
      'الخطأ الأول: كتابة أكثر من 4 كلمات وتكرار نفس عنوان الفيديو حرفياً في الصورة',
      'الخطأ الثاني: ضعف التباين بين العنصر الرئيسي والخلفية مما يجعله باهتاً وغير ملفت',
      'الخطأ الثالث: تشتت بصر المشاهد لعدم وجود نقطة جذب بصرية مركزية واضحة'
    ],
    cta: 'Use our free 3-point thumbnail test before publishing your next video!',
    arabicCta: 'طبق هذا الاختبار الثلاثي السريع قبل نشر أي صورة مصغرة قادمة لقناتك!',
    platform: 'Shorts',
    niche: 'Content Creation',
    difficulty: 'beginner',
    competition: 'high',
    viralPotential: 'explosive',
    format: 'short',
    duration: '48s',
    facelessPossibility: true,
    tags: ['صور_مصغرة', 'يوتيوب', 'تحسين_المشاهدات', 'تصميم_جرافيك']
  },
  {
    id: 'idea-mis-05',
    angle: 'mistakes',
    arabicAngle: 'أخطاء شائعة وتحذيرات عملية',
    title: 'Why Most Freelancers Never Escape the $500/Month Trap',
    arabicTitle: 'السبب الحقيقي وراء بقاء 80% من المستقلين عالقين في دخل أقل من 500 دولار شهرياً',
    frenchTitle: 'Pourquoi la plupart des freelances restent bloqués sous les 500$/mois',
    hook: 'Selling your time by the hour is financial suicide for freelancers in 2026.',
    arabicHook: 'بيع وقتك بالساعة هو المقبرة الحقيقية لأي مستقل يريد بناء دخل حر مستدام في 2026!',
    frenchHook: 'Facturer à l’heure est le piège numéro un qui bloque vos revenus de freelance.',
    description: 'How to transition from low-ticket gig bidding to value-based monthly retainers that pay upfront.',
    arabicDescription: 'كيف تنتقل من تقديم خدمات سريعة رخيصة في مواقع الخدمات المصغرة إلى باقات شهرية متجددة ذات قيمة عالية.',
    frenchDescription: 'Comment passer de la tarification horaire à des forfaits mensuels récurrents à haute valeur.',
    scriptOutline: [
      'The math of the hourly trap: 40 hours max x $15 = ceiling you cannot break',
      'The psychological shift: Charging for client business outcomes rather than hours worked',
      'Structuring a $500 monthly retainer for a local business with only 3 deliverables',
      'How 4 stable clients provide $2,000 predictable recurring revenue'
    ],
    arabicScriptOutline: [
      'حسبة فخ العمل بالساعة: 40 ساعة أسبوعياً في 12 دولاراً تضعك تحت سقف دخل محدود لا يمكنك تجاوزه',
      'التحول النفسي والمهني: التسعير بناءً على القيمة وأرباح العميل وليس على وقت كتابة الكود أو التصميم',
      'هندسة باقة اشتراك شهري (Retainer) بـ 400$ لشركة محلية تقدم لهم 3 تسليمات محددة فقط',
      'كيف تضمن 4 عقود شهرية مستقرة تدفق 1,600$ شهرياً دون الحاجة للبحث عن عملاء جدد كل أسبوع'
    ],
    cta: 'Comment "RETAINER" and get our free contract template sent to you!',
    arabicCta: 'اكتب "عقد" في التعليقات لأرسل لك نموذج عقد الاشتراك الشهري الجاهز مجاناً!',
    platform: 'TikTok',
    niche: 'Freelancing',
    difficulty: 'intermediate',
    competition: 'medium',
    viralPotential: 'high',
    format: 'short',
    duration: '52s',
    facelessPossibility: false,
    tags: ['عمل_حر', 'تسعير_الخدمات', 'فريلانس', 'تطوير_الذات']
  },

  // --- Experiments & Challenges ---
  {
    id: 'idea-exp-03',
    angle: 'experiment',
    arabicAngle: 'تجارب وتحديات عملية بالأرقام',
    title: 'I Posted 30 TikTok Videos in 30 Days: The Honest Algorithm Data',
    arabicTitle: 'نشرت 30 مقطع تيك توك في 30 يوماً متتالية: إليكم إحصائيات الخوارزمية الحقيقية',
    frenchTitle: '30 vidéos TikTok en 30 jours : Les vraies données de l’algorithme',
    hook: 'Does posting every single day actually trigger the TikTok algorithm? Here is what happened.',
    arabicHook: 'هل النشر اليومي المستمر يوقظ خوارزمية تيك توك فعلاً أم أنه مجرد إرهاق بلا فائدة؟ إليكم التجربة بالأرقام!',
    frenchHook: 'Poster tous les jours sur TikTok fait-il exploser les vues ? Voici les résultats sans filtre.',
    description: 'Documenting view velocity, follower conversion, watch-time retention curves, and mental burnout over 30 days.',
    arabicDescription: 'توثيق دقيق لمعدلات المشاهدة، نسبة التحويل للمتابعين، منحنيات الاحتفاظ بالمشاهدين، والدروس المستفادة من النشر اليومي.',
    frenchDescription: 'Bilan complet de 30 jours de publication quotidienne : rétention, abonnés et fatigue créative.',
    scriptOutline: [
      'Day 1-10: Low impressions, average retention at 40%, algorithm testing audience buckets',
      'Day 11-20: First viral breakout video (180k views) and how it lifted the back catalog',
      'Day 21-30: Comparing posting frequency vs content quality impact',
      'Key takeaway rule: Why 3 polished videos beat 7 rushed videos every time'
    ],
    arabicScriptOutline: [
      'الأيام 1 إلى 10: مشاهدات منخفضة بين 300 و 800 مع اختبار الخوارزمية لاهتمامات الجمهور',
      'الأيام 11 إلى 20: أول مقطع فيروسي يكسر 180 ألف مشاهدة وكيف رفع مشاهدات الفيديوهات القديمة',
      'الأيام 21 إلى 30: تحليل تأثير التعب الإبداعي ومقارنة كمية المحتوى بجودته الفعلية',
      'الخلاصة الذهبية: لماذا تتفوق 3 مقاطع متقنة بعناية على 7 مقاطع متسرعة أسبوعياً'
    ],
    cta: 'Have you tried a 30-day challenge? Share your record in the comments!',
    arabicCta: 'هل جربت من قبل تحدي النشر اليومي؟ كم يوماً استطعت الاستمرار؟ شاركنا في التعليقات!',
    platform: 'YouTube',
    niche: 'Content Creation',
    difficulty: 'beginner',
    competition: 'high',
    viralPotential: 'explosive',
    format: 'long',
    duration: '12m',
    facelessPossibility: false,
    tags: ['تحدي_30_يوم', 'تيك_توك', 'خوارزميات', 'صناعة_المحتوى']
  },

  // --- Comparisons ---
  {
    id: 'idea-cmp-03',
    angle: 'comparison',
    arabicAngle: 'مقارنات تجارية وتقنية مباشرة',
    title: 'CapCut Desktop vs Premiere Pro: Can Free Beat the Industry Standard?',
    arabicTitle: 'كاب كات للحاسوب ضد بريمير برو: هل يغنيك البرنامج المجاني عن البرامج المدفوعة؟',
    frenchTitle: 'CapCut Desktop vs Premiere Pro : Le gratuit dépasse-t-il la référence ?',
    hook: 'I edited the exact same viral reel in CapCut Desktop and Premiere Pro. Here is the rendering speed.',
    arabicHook: 'قمت بمونتاج نفس الفيديو الفيروسي على كاب كات للكمبيوتر وعلى بريمير برو: النتيجة فاجأتني تماماً!',
    frenchHook: 'J’ai monté le même Reel sur CapCut Desktop et Premiere Pro : voici le comparatif choc.',
    description: 'Benchmarking timeline snappiness, auto-captions accuracy, text animations, export times, and hardware resource usage.',
    arabicDescription: 'مقارنة عملية في سرعة التقطيع، دقة الترجمة التلقائية باللغة العربية، تأثيرات النصوص، واستهلاك الرام والمعالج.',
    frenchDescription: 'Comparatif direct de rapidité d’exécution, sous-titres automatiques et fluidité sur PC.',
    scriptOutline: [
      'Task 1: Auto captioning generation speed and word alignment precision',
      'Task 2: Adding dynamic sound effects, zooms, and motion stickers',
      'Task 3: Export time comparison on mid-range laptop specs',
      'Verdict: When to stick with CapCut for speed vs when Premiere Pro is mandatory'
    ],
    arabicScriptOutline: [
      'المهمة الأولى: سرعة توليد الترجمة التلقائية (Auto Captions) ودقة محاذاة الكلمات',
      'المهمة الثانية: سهولة إضافة المؤثرات الصوتية والزووم وحركات الانتقال الجاهزة',
      'المهمة الثالثة: اختبار سرعة تصدير الفيديو Render على جهاز بمواصفات متوسطة',
      'الحكم النهائي: متى يكون كاب كات أسرع وأذكى لمحتوى السوشيال ميديا ومتى تحتاج بريمير للأعمال الاحترافية'
    ],
    cta: 'Which software do you edit your videos with right now? Tell me below!',
    arabicCta: 'ما هو البرنامج الذي تستعمله حالياً لمونتاج فيديوهاتك؟ اكتب اسمه في التعليقات!',
    platform: 'TikTok',
    niche: 'Content Creation',
    difficulty: 'beginner',
    competition: 'high',
    viralPotential: 'very_high',
    format: 'short',
    duration: '50s',
    facelessPossibility: true,
    tags: ['كاب_كات_كمبيوتر', 'بريمير_برو', 'مقارنة_برامج', 'مونتاج']
  },

  // --- Listicles & Tips ---
  {
    id: 'idea-lst-03',
    angle: 'listicle',
    arabicAngle: 'قوائم سريعة وحيل ذكية',
    title: '7 Proven Hooks That Instantly Stop the Infinite Scroll',
    arabicTitle: '7 خطافات افتتاحية مجربة (Hooks) تجبر المشاهد على التوقف ومتابعة الفيديو للنهاية',
    frenchTitle: '7 accroches vidéo prouvées pour stopper le scroll instantanément',
    hook: 'The first 2 seconds decide 95% of your video success. Steal these 7 opening formulas.',
    arabicHook: 'أول ثانيتين تحدد 95% من نجاح مقطعك! خذ هذه الخطافات السبعة المجربة وطبقها فوراً في فيديوهاتك القادمة!',
    frenchHook: 'Les 2 premières secondes décident de 95% de votre succès : voici 7 formules d’accroche.',
    description: 'A master list of psychological hook triggers: curious contradictions, pain magnification, secret reveals, and time-frame promises.',
    arabicDescription: 'قائمة بأقوى التراكيب النفسية للخطافات: التناقض الصادم، تكبير المشكلة الخفية، كشف السر المحظور، والوعد بنتائج محددة بوقت.',
    frenchDescription: 'Guide des 7 structures psychologiques d’accroches pour maximiser le taux de rétention.',
    scriptOutline: [
      'Hook formula 1: The Counter-Intuitive Claim ("Stop doing X if you want Y")',
      'Hook formula 2: The Timeline Specific ("How I achieved X in just Y days")',
      'Hook formula 3: The Secret Insider ("What gurus will never tell you about X")',
      'Formulas 4 to 7 breakdown with ready-to-fill blanks'
    ],
    arabicScriptOutline: [
      'صيغة الخطاف 1: الادعاء الصادم المعاكس للمألوف ("توقف عن فعل كذا إذا كنت تريد نتيجة كذا")',
      'صيغة الخطاف 2: الوعد المحدد بجدول زمني ("كيف حققت الهدف الفلاني في 7 أيام فقط وبدون رأس مال")',
      'صيغة الخطاف 3: السر المخفي للمحترفين ("هذا ما يخفيه عنك أصحاب الدورات المدفوعة حول...")',
      'استعراض الصيغ من 4 إلى 7 مع أمثلة عملية جاهزة للتطبيق في مختلف المجالات'
    ],
    cta: 'Save this post so you never struggle with writing video hooks again!',
    arabicCta: 'احفظ هذا المنشور في المفضلة ليكون مرجعك الدائم عند كتابة هوك أي فيديو قادم!',
    platform: 'Instagram',
    niche: 'Content Creation',
    difficulty: 'beginner',
    competition: 'high',
    viralPotential: 'explosive',
    format: 'carousel',
    duration: 'Carousel',
    facelessPossibility: true,
    tags: ['خطافات_فيديو', 'هوك_افتتاحي', 'صناعة_محتوى', 'ريلز']
  },

  // --- Storytelling & Case Studies ---
  {
    id: 'idea-sty-03',
    angle: 'story',
    arabicAngle: 'قصص نجاح ودراسات حالة واقعية',
    title: 'How a Free Fire Gamer Built a 100k Channel Using Room Highlights Only',
    arabicTitle: 'قصة لاعب فري فاير وصل إلى 100 ألف متابع بالاعتماد فقط على لقطات الرومات والتحديات',
    frenchTitle: 'Comment un joueur Free Fire a atteint 100k abonnés uniquement avec des highlights',
    hook: 'He did not have the latest iPhone or a fancy PC, but his room clutches got 2 million views.',
    arabicHook: 'لم يكن يمتلك أحدث آيفون ولا جهاز كمبيوتر للألعاب، ومع ذلك حصدت لقطات روماته أكثر من 2 مليون مشاهدة!',
    frenchHook: 'Sans iPhone récent ni PC gamer, ses clips de customs Free Fire ont fait 2 millions de vues.',
    description: 'Analyzing how storytelling inside custom rooms (1v4 clutch bets, rival revenge matches) outperforms generic montage clips.',
    arabicDescription: 'تحليل استراتيجية بناء القصة داخل الرومات: التحديات ضد المنافسين، لقطات الـ 1v4 المستحيلة، وتحويل الجولة إلى سيناريو مشوق.',
    frenchDescription: 'Décryptage de la narration dans les vidéos de custom rooms pour capter l’attention des spectateurs.',
    scriptOutline: [
      'The initial mistake: Posting 30-second silent gameplay clips with zero narrative context',
      'The turning point: Introducing rival story stakes ("He bet 1000 diamonds I could not win a 1v4")',
      'The editing formula: Adding dramatic zooms, sound effects, and suspenseful music drops',
      'The conversion machine: Pinning the community Discord and hosting weekly subscriber rooms'
    ],
    arabicScriptOutline: [
      'الخطأ في البداية: رفع لقطات لعب صامتة بدون أي سياق قصصي يهم المشاهد',
      'نقطة التحول: وضع رهان وتحدي حقيقي في بداية المقطع ("تحداني بروم على 1000 جوهرة إنني سأخسر 1 ضد 4")',
      'أسلوب المونتاج الذكي: إضافة زووم درامي عند كل مواجهة ومؤثرات صوتية حماسية ترفع الأدرينالين',
      'بناء المجتمع: تثبيت رابط سيرفر الديسكورد وتنظيم رومات أسبوعية مع المتابعين لضمان ولائهم'
    ],
    cta: 'Who is your toughest Free Fire rival? Tag them in the comments below!',
    arabicCta: 'من هو أصعب خصم واجهته في رومات فري فاير؟ تابعه في التعليقات وتحدّاه الآن!',
    platform: 'TikTok',
    niche: 'Free Fire',
    difficulty: 'beginner',
    competition: 'high',
    viralPotential: 'explosive',
    format: 'short',
    duration: '55s',
    facelessPossibility: true,
    tags: ['فري_فاير', 'رومات_فري_فاير', 'تحديات_العاب', 'قصة_نجاح']
  },

  // --- Problem Solving ---
  {
    id: 'idea-prb-03',
    angle: 'problem_solving',
    arabicAngle: 'حل مباشر لمشكلة حقيقية',
    title: 'How to Fix Broken Audio Quality When Recording with Cheap Smartphone Mics',
    arabicTitle: 'حل مشكلة صدى الصوت والضوضاء المزعجة عند التسجيل بمايك الهاتف الرخيص',
    frenchTitle: 'Comment corriger le son écho et le bruit de fond avec un micro smartphone',
    hook: 'Viewers will tolerate average 1080p video, but bad muffled audio makes them swipe in 1 second.',
    arabicHook: 'المشاهد قد يسامحك على جودة صورة متوسطة، لكن الصوت الرديء المكتوم يجعله يتجاوز مقطعك في ثانية واحدة!',
    frenchHook: 'Les spectateurs tolèrent une image moyenne, mais un son médiocre fait fuir immédiatement.',
    description: 'Transforming noisy phone audio into clean studio vocals using free acoustic tricks and Adobe Podcast AI.',
    arabicDescription: 'طريقة تحويل تسجيل مايك الهاتف المشوش إلى صوت نقي احترافي باستخدام حيل الغرفة البسيطة وأداة الذكاء الاصطناعي المجانية.',
    frenchDescription: 'Techniques acoustiques maison et nettoyage audio par intelligence artificielle gratuit.',
    scriptOutline: [
      'Side-by-side audio demonstration: Raw echoey phone mic vs AI-enhanced warm vocal',
      'Acoustic trick: Recording near clothes or inside a closet to absorb room reverberation',
      'The free tool: Running raw audio through Adobe Podcast Enhance for free vocal isolation',
      'Final mastering: Setting proper loudness normalization (-14 LUFS) for Instagram and TikTok'
    ],
    arabicScriptOutline: [
      'مقارنة صوتية مباشرة: تسجيل خام مليء بالصدى مقابل نفس الصوت بعد المعالجة بنقاء مذهل',
      'حيلة الغرفة الصوتية: التسجيل بجوار خزانة الملابس لامتصاص ارتداد الصوت والصدى مجاناً',
      'الأداة المجانية: تمرير الملف الصوتي عبر Adobe Podcast AI لعزل الضوضاء وتحسين نبرة الصوت',
      'ضبط المعايير النهائية: موازنة مستوى الصوت (-14 LUFS) ليكون واضحاً وقوياً في منصات السوشيال ميديا'
    ],
    cta: 'Test this audio trick on your next recording and notice the massive difference!',
    arabicCta: 'جرب هذه الحيلة في تسجيلك القادم ولاحظ الفرق الشاسع في وضوح صوتك!',
    platform: 'Shorts',
    niche: 'Content Creation',
    difficulty: 'beginner',
    competition: 'medium',
    viralPotential: 'high',
    format: 'short',
    duration: '46s',
    facelessPossibility: true,
    tags: ['تسجيل_صوت', 'مايك_هاتف', 'adobe_podcast', 'جودة_المحتوى']
  },

  // --- Trends & Opportunities ---
  {
    id: 'idea-trd-03',
    angle: 'trends',
    arabicAngle: 'اتجاهات وفرص رقمية صاعدة',
    title: 'The AI Automation Agency Boom: Why Local Businesses Pay $1,000 for WhatsApp Bots',
    arabicTitle: 'الفرصة الذهبية الصاعدة: لماذا تدفع الشركات المحلية 1000 دولار لبناء بوت WhatsApp ذكي؟',
    frenchTitle: 'L’opportunité des agences IA : Pourquoi les commerces paient 1000$ pour un bot WhatsApp',
    hook: 'Clinics and restaurants are losing 40% of their customers every night after closing hours. Fix it with this.',
    arabicHook: 'المطاعم والعيادات تفقد 40% من زبائنها كل ليلة بعد ساعات العمل! هذا البوت الذكي يحل المشكلة للأبد.',
    frenchHook: 'Les cliniques et restaurants perdent 40% de leurs clients la nuit : voici la solution rentable.',
    description: 'Deconstructing the AI Automation Agency (AAA) model using Make.com and OpenAI assistants connected to WhatsApp Business.',
    arabicDescription: 'شرح فرصة بناء وكالة أتمتة ذكية (AAA): ربط سيناريوهات Make.com بمساعد OpenAI للرد على استفسارات الزبائن وحجز المواعيد على مدار 24 ساعة.',
    frenchDescription: 'Présentation du modèle d’agence d’automatisation IA (AAA) avec Make.com et WhatsApp API.',
    scriptOutline: [
      'The merchant dilemma: Incoming messages at 11 PM going unanswered while competitors grab the customer',
      'The architecture: A no-code scenario connecting WhatsApp Cloud API to an AI assistant with the restaurant menu and hours',
      'Live demonstration: Simulating a customer booking a table in under 30 seconds',
      'The pricing proposal: $800 setup fee + $150 monthly retainer for server maintenance'
    ],
    arabicScriptOutline: [
      'معاناة التاجر الحقيقية: وصول رسائل زبائن في الساعة 11 ليلاً دون رد وذهاب الزبون لمنافس آخر',
      'الهيكل التقني: ربط منصة Make.com بواجهة WhatsApp API ومساعد ذكي مدرب على قائمة الأسعار ومواعيد العمل',
      'عرض تجربة حية: عميل يسأل عن المنيو ويحجز طاولة أو موعداً في 30 ثانية بشكل مؤتمت بالكامل',
      'نموذج التسعير المقترح: 800$ كلفة الإعداد الأولي + 150$ اشتراك شهري لمتابعة الخوادم والصيانة'
    ],
    cta: 'Comment "BOT" and I will share the step-by-step Make.com workflow template!',
    arabicCta: 'اكتب كلمة "بوت" في التعليقات لأشاركك قالب أتمتة Make.com الجاهز خطوة بخطوة!',
    platform: 'YouTube',
    niche: 'AI',
    difficulty: 'advanced',
    competition: 'low',
    viralPotential: 'explosive',
    format: 'long',
    duration: '15m',
    facelessPossibility: true,
    tags: ['أتمتة_الذكاء_الاصطناعي', 'واتساب_بزنس', 'مشاريع_مستقبلية', 'وكالة_رقمية']
  }
];

// Combine foundational ideas and additional handcrafted ideas
const ALL_BASE_IDEAS: ExtendedContentIdea[] = [
  ...DIVERSE_CONTENT_IDEAS,
  ...ADDITIONAL_IDEAS
];

// Generate an extended, diverse bank of unique ideas by creating genuinely distinct combinations
// across 23 niches, 8 platforms, and 8 content angles, ensuring NO DUPLICATE HOOKS OR TITLES.
const NICHES: IdeaNiche[] = [
  'Making Money Online', 'AI', 'Technology', 'Gaming', 'Free Fire', 'Business',
  'E-commerce', 'Affiliate Marketing', 'Education', 'Motivation', 'Productivity',
  'Finance', 'Lifestyle', 'Travel', 'Food', 'Beauty', 'Tech Reviews',
  'Apps', 'Websites', 'Freelancing', 'Content Creation', 'Personal Branding', 'Faceless Content'
];

const PLATFORMS: IdeaPlatform[] = [
  'TikTok', 'YouTube', 'Instagram', 'Facebook', 'Gaming', 'Free Fire', 'Shorts', 'Reels'
];

const ANGLES: { angle: ContentAngle; ar: string }[] = [
  { angle: 'tutorial', ar: 'شرح تعليمي خطوة بخطوة' },
  { angle: 'mistakes', ar: 'أخطاء شائعة وتحذيرات عملية' },
  { angle: 'experiment', ar: 'تجارب وتحديات عملية بالأرقام' },
  { angle: 'comparison', ar: 'مقارنات تجارية وتقنية مباشرة' },
  { angle: 'listicle', ar: 'قوائم سريعة وحيل ذكية' },
  { angle: 'story', ar: 'قصص نجاح ودراسات حالة واقعية' },
  { angle: 'problem_solving', ar: 'حل مباشر لمشكلة حقيقية' },
  { angle: 'trends', ar: 'اتجاهات وفرص رقمية صاعدة' }
];

// Comprehensive, distinct, handcrafted library across all 8 angles and top niches
// Zero duplicate hooks, zero formulaic templates, 100% distinct titles, scripts, and CTAs.
const EXPANDED_UNIQUE_IDEAS: ExtendedContentIdea[] = [
  // --- Angle: tutorial (شروحات تعليمية) ---
  {
    id: 'idea-tut-06',
    angle: 'tutorial',
    arabicAngle: 'شرح تعليمي خطوة بخطوة',
    title: 'How to Build an Automated Lead Magnet with Notion & Tally',
    arabicTitle: 'كيف تصنع صفحة استقطاب عملاء (Lead Magnet) مؤتمتة مجاناً بـ Notion و Tally',
    frenchTitle: 'Créer un lead magnet automatisé gratuit avec Notion et Tally',
    hook: 'Do not spend $90 a month on expensive landing page builders: this free stack sends files automatically in 3 minutes.',
    arabicHook: 'لماذا تدفع 90 دولاراً شهرياً لمنصات صفحات الهبوط بينما يمكنك تسليم دليلك المجاني للعميل تلقائياً في 3 دقائق وبصفر تكلفة؟',
    frenchHook: 'Ne dépensez plus 90$/mois en logiciels de landing page : ce stack gratuit livre vos PDF en 3 minutes.',
    description: 'Connect a slick Tally web form directly into a public Notion page and trigger instant delivery via automated confirmation redirect.',
    arabicDescription: 'شرح تطبيقي لربط نموذج Tally بصفحة Notion وإرسال الملف الرقمي للعميل فوراً دون الحاجة لأي برمجة.',
    frenchDescription: 'Tutoriel complet pour automatiser la collecte et la livraison d’aimants à prospects.',
    scriptOutline: [
      'Screen recording demonstrating the user entering an email and instantly downloading the guide',
      'Creating the 3-field form in Tally and customizing the clean minimalist theme',
      'Configuring the success redirect URL to your secure public Notion resource page',
      'Testing the entire capture funnel live on mobile in under 60 seconds'
    ],
    arabicScriptOutline: [
      'عرض تجربة حقيقية: المستخدم يدخل بريده الإلكتروني ويستلم الدليل فوراً',
      'إنشاء نموذج Tally بثلاثة حقول أساسية وضبط تصميمه البسيط',
      'تحديد رابط التوجيه التلقائي المباشر لصفحة Notion الخاصة بالملف',
      'اختبار التدفق كاملاً على شاشة الهاتف للتأكد من سلاسة التجربة للمشترك'
    ],
    cta: 'Save this post and set up your free lead generation machine tonight!',
    arabicCta: 'احفظ الشرح وجهز صفحة استقطاب عملائك الأولى الليلة مجاناً!',
    platform: 'Shorts',
    niche: 'Websites',
    difficulty: 'beginner',
    competition: 'low',
    viralPotential: 'high',
    format: 'short',
    duration: '52s',
    facelessPossibility: true,
    tags: ['نوشن', 'توليد_عملاء', 'أدوات_مجانية', 'تسويق_رقمي']
  },
  {
    id: 'idea-tut-07',
    angle: 'tutorial',
    arabicAngle: 'شرح تعليمي خطوة بخطوة',
    title: 'Turning Your Specialized Skill into a $20 Micro-Ebook in 48 Hours',
    arabicTitle: 'كيف تحول خبرتك أو مهارتك إلى كتاب إلكتروني مصغر بـ 20 دولاراً يباع وأنت نائم',
    frenchTitle: 'Transformer vos compétences en un ebook à 20$ en 48 heures',
    hook: 'You do not need a literary agent or 300 pages to publish: a 15-page problem-solving PDF can generate $1,200 this weekend.',
    arabicHook: 'لست بحاجة لدار نشر ولا لكتابة 300 صفحة؛ ملف PDF من 15 صفحة يحل مشكلة معقدة يمكن أن يحقق لك أول 500 دولار هذا الشهر!',
    frenchHook: 'Pas besoin de 300 pages pour vendre : un guide de 15 pages ciblé peut générer des revenus immédiats.',
    description: 'Learn how to structure, format, and publish a high-value niche PDF guide using Canva and Gumroad.',
    arabicDescription: 'خارطة طريق واضحة لاختيار مشكلة دقيقة يعاني منها جمهورك، وصياغة الحل في 15 صفحة، وربط بوابة الدفع على Gumroad.',
    frenchDescription: 'Guide pas à pas pour rédiger, designer et vendre votre premier micro-produit digital.',
    scriptOutline: [
      'Choosing one painful micro-problem people routinely pay to solve',
      'Drafting the 5-chapter actionable outline using conversational bullet points',
      'Styling clean typography in Canva and exporting as print-ready PDF',
      'Setting up your Gumroad checkout and linking your payout bank'
    ],
    arabicScriptOutline: [
      'تحديد مشكلة واحدة حارقة في مجالك يسأل عنها المبتدئون يومياً',
      'كتابة هيكل الكتاب من 5 محاور مكثفة بالنقاط العملية بدون حشو',
      'تنسيق الصفحات على Canva بخط عريض وألوان مريحة وحفظها PDF',
      'فتح متجر مجاني على Gumroad وربط وسيلة الدفع لتستلم أرباحك فوراً'
    ],
    cta: 'Comment your skill below and I will help you pick your ebook topic!',
    arabicCta: 'اكتب مهارتك الحالية في التعليقات وسأقترح عليك أنسب فكرة كتاب رقمي لها!',
    platform: 'TikTok',
    niche: 'Making Money Online',
    difficulty: 'beginner',
    competition: 'medium',
    viralPotential: 'high',
    format: 'short',
    duration: '49s',
    facelessPossibility: true,
    tags: ['كتب_الكترونية', 'منتجات_رقمية', 'gumroad', 'دخل_سلبي']
  },
  {
    id: 'idea-tut-08',
    angle: 'tutorial',
    arabicAngle: 'شرح تعليمي خطوة بخطوة',
    title: 'Mastering the Gloo Wall Speed Trick on 2-Finger Touch Controls',
    arabicTitle: 'سرعة زر الثلج (Fast Gloo Wall) للاعبي إصبعين بفري فاير بدون احتراف 4 أصابع',
    frenchTitle: 'Technique mur de glace ultra-rapide à 2 doigts sur Free Fire',
    hook: 'You do not need to contort your hands into a 4-finger claw grip to drop instant gloo walls in Free Fire.',
    arabicHook: 'لست مضطراً لتعذيب يديك بـ 4 أصابع لتضع جدار الثلج بسرعة البرق؛ إليك سر زر إطلاق النار الأيسر المخفي!',
    frenchHook: 'Pas besoin de jouer à 4 doigts pour poser un mur de glace instantané sur Free Fire.',
    description: 'Step-by-step HUD reconfiguration and swipe mechanics enabling lightning-quick shield placement during close-range combat.',
    arabicDescription: 'تعديل مكان الأزرار (HUD) وتدريب حركة السحب العكسية لوضع الثلج وحماية نفسك قبل أن يلمسك رصاص الخصم.',
    frenchDescription: 'Configuration optimale des boutons tactiles pour poser vos murs de glace en un éclair.',
    scriptOutline: [
      'Side-by-side gameplay: slow standard placement vs instant left-button deployment',
      'Enabling "Always Show Left Fire Button" in gameplay controls',
      'Positioning the gloo grenade icon right adjacent to your primary movement thumb',
      'The 3-stage finger swipe: Shoot up -> Drag down -> Tap left fire simultaneously'
    ],
    arabicScriptOutline: [
      'مقارنة حية في اللعبة: وضع الثلج البطيء العادي مقابل وضع الثلج الخاطف بالزر الأيسر',
      'تفعيل خيار "زر إطلاق النار الأيسر دائماً" داخل إعدادات التحكم',
      'تكبير أيقونة جدار الثلج ووضعها بالقرب من إبهام الحركة الأيسر',
      'المعادلة الثلاثية لحركة اليد: سحب زر الضرب لأعلى ثم سحبه لأسفل والضغط على الثلج في نفس اللحظة'
    ],
    cta: 'Tag your duo partner so they stop getting knocked out in open ground!',
    arabicCta: 'شارك المقطع مع صديقك في اللعبة ليتعلم كيف يحميك بجدار الثلج في الرومات!',
    platform: 'TikTok',
    niche: 'Free Fire',
    difficulty: 'beginner',
    competition: 'high',
    viralPotential: 'explosive',
    format: 'short',
    duration: '45s',
    facelessPossibility: true,
    tags: ['فري_فاير', 'جدار_الثلج', 'حيل_العاب', 'gloo_wall']
  },

  // --- Angle: mistakes (أخطاء شائعة وتحذيرات عملية) ---
  {
    id: 'idea-mis-06',
    angle: 'mistakes',
    arabicAngle: 'أخطاء شائعة وتحذيرات عملية',
    title: 'Why 85% of Local Business Ads Waste Money: The Missing WhatsApp CTA',
    arabicTitle: 'السبب الحقيقي وراء حرق 85% من أصحاب المحلات لميزانياتهم الإعلانية دون أي زبون',
    frenchTitle: 'Pourquoi 85% des commerces locaux gaspillent leur budget pub sans retour',
    hook: 'If your Facebook ad sends local shoppers to a complicated website instead of a direct WhatsApp chat, you are lighting money on fire.',
    arabicHook: 'إذا كان إعلان محلك أو مطعمك يوجه الزبون المحلي إلى موقع إلكتروني بطيء بدلاً من محادثة واتساب مباشرة، فأنت تحرق أموالك حرفياً!',
    frenchHook: 'Envoyer vos prospects locaux vers un site web lourd au lieu d’un chat WhatsApp direct ruine vos conversions.',
    description: 'Diagnosing the massive friction between impulse local buying behavior and complex website shopping carts.',
    arabicDescription: 'تفكيك سلوك المستهلك المحلي: الزبون في مدينتك يريد التأكد من المقاس أو العنوان أو الحجز عبر الواتساب فوراً.',
    frenchDescription: 'Analyse des points de friction qui bloquent les ventes des commerces de proximité sur les réseaux.',
    scriptOutline: [
      'Screen grab of an ad click leading to an endless checkout form where 90% bounce',
      'The psychology of local buyers: They want instant confirmation, location verification, and reassurance',
      'Switching objective to "Click to WhatsApp" with a pre-filled conversational question',
      'How local bakeries, dental clinics, and barbers tripled appointments overnight'
    ],
    arabicScriptOutline: [
      'عرض لقطة شاشة لإعلان يفتح صفحة طويلة ومعقدة يخرج منها 90% من الزوار فوراً',
      'سيكولوجية المشتري المحلي: الزبون يريد إجابة سريعة عن السعر والعنوان وتوافر المنتج',
      'تحويل هدف الحملة إلى "رسائل واتساب" مع رسالة ترحيبية جاهزة بنقرة واحدة',
      'أمثلة واقعية لصالونات ومطاعم محلية ضاعفت حجوزاتها بتغيير هذه النقطة فقط'
    ],
    cta: 'Save this post before launching your next local business sponsored campaign!',
    arabicCta: 'احفظ المنشور وطبق هذا التعديل في حملتك الإعلانية القادمة لمشروعك المحلي!',
    platform: 'Instagram',
    niche: 'Business',
    difficulty: 'intermediate',
    competition: 'low',
    viralPotential: 'high',
    format: 'short',
    duration: '50s',
    facelessPossibility: true,
    tags: ['اعلانات_فيسبوك', 'مشاريع_محلية', 'واتساب_بزنس', 'تسويق_محلي']
  },
  {
    id: 'idea-mis-07',
    angle: 'mistakes',
    arabicAngle: 'أخطاء شائعة وتحذيرات عملية',
    title: 'Dragging Your Fire Button Too Hard: The Free Fire Headshot Blunder',
    arabicTitle: 'سحب زر الإطلاق بقوة مفرطة: الخطأ الذي يدمر الهيدشوت في المسافات القريبة بفري فاير',
    frenchTitle: 'Tirer trop fort sur le bouton : l’erreur fatale de visée sur Free Fire',
    hook: 'If all your bullets fly into the sky above the enemy head, you are making this fatal thumb drag error.',
    arabicHook: 'إذا كانت رصاصاتك كلها تطير فوق رأس الخصم في الهواء، فأنت ترتكب هذا الخطأ القاتل في طريقة سحب الزر!',
    frenchHook: 'Si vos balles partent au-dessus de la tête de l’ennemi, vous tirez le bouton avec trop de force.',
    description: 'Analyzing swipe velocity, weapon distance ranges, and why gentle circular dragging lands headshots far more reliably than violent upward pulls.',
    arabicDescription: 'شرح فيزياء اللعبة: الفرق بين سحب زر الإطلاق بقوة عشوائية وسحبه بحركة دائرية هادئة تناسب مسافة الخصم.',
    frenchDescription: 'Explication technique de la vitesse de glissement du doigt pour stabiliser le réticule de tir.',
    scriptOutline: [
      'Game clip showing crosshairs overshooting the enemy silhouette with zero hits',
      'The physics of close range vs medium range swipe radius',
      'Demonstrating the J-shape swipe motion for moving targets',
      'Training room exercise: 10 minutes of controlled dragging without moving legs'
    ],
    arabicScriptOutline: [
      'لقطة من اللعبة توضح طيران الطلقات في السماء فوق رأس الخصم دون إحداث أي ضرر',
      'فهم نصف قطر حركة الإبهام: الفرق بين المواجهة الملاصقة والمواجهة المتوسطة',
      'شرح حركة سحب الزر على شكل حرف J الخفيف لملاحقة الخصم أثناء جريه',
      'تمرين عملي داخل ساحة التدريب لمدة 5 دقائق لضبط قوة السحب بالأصبع'
    ],
    cta: 'Drop your favorite SMG weapon below and I will tell you its exact drag tempo!',
    arabicCta: 'اكتب سلاحك المفضل في المواجهات القريبة بالتعليقات لأخبرك بطريقة سحبه الصحيحة!',
    platform: 'Shorts',
    niche: 'Free Fire',
    difficulty: 'beginner',
    competition: 'high',
    viralPotential: 'explosive',
    format: 'short',
    duration: '44s',
    facelessPossibility: true,
    tags: ['فري_فاير', 'هيدشوت', 'حساسية_الهاتف', 'تعليم_فري_فاير']
  },

  // --- Angle: experiment (تجارب وتحديات عملية بالأرقام) ---
  {
    id: 'idea-exp-04',
    angle: 'experiment',
    arabicAngle: 'تجارب وتحديات عملية بالأرقام',
    title: 'Can You Rank #1 on Google Maps in 14 Days? We Tested It on a Bakery',
    arabicTitle: 'هل يمكن تصدر نتائج خرائط جوجل في 14 يوماً فقط؟ جربناها على مخبز محلي وهذه الأرقام!',
    frenchTitle: 'Peut-on atteindre le top 1 sur Google Maps en 14 jours ? Le test réel',
    hook: 'This local bakery had 11 reviews and ranked on page 4 of Google Maps. Here is what happened after 14 days of local SEO optimization.',
    arabicHook: 'هذا المخبز كان في الصفحة الرابعة على خرائط جوجل بـ 11 تقييماً فقط: انظر ماذا حدث لمكالمات الزبائن بعد أسبوعين من التحسين!',
    frenchHook: 'Ce commerce était introuvable sur Maps. Voici nos résultats chiffrés après 14 jours d’optimisation locale.',
    description: 'Real-world local SEO test tracking Google Business Profile views, driving directions requests, and phone calls before and after optimization.',
    arabicDescription: 'تجربة حية بالبيانات والأرقام: قياس عدد الاتصالات وطلبات الاتجاهات قبل وبعد تحديث الصور وتوحيد بيانات الـ NAP.',
    frenchDescription: 'Étude pratique montrant la progression des appels et visites physiques après optimisation GBP.',
    scriptOutline: [
      'Google Maps ranking tool showing the bakery colored red in position 14',
      'Week 1 fixes: Geo-tagged high-res product photos and primary category correction',
      'Week 2: Review generation flywheel via an NFC counter card producing 28 verified reviews',
      'Final ranking grid turning bright green: 310% increase in calls and directions'
    ],
    arabicScriptOutline: [
      'عرض شبكة فحص الترتيب الجغرافي: المخبز ملون بالأحمر في المرتبة 14 بالمدينة',
      'تعديلات الأسبوع الأول: رفع 20 صورة احترافية وتصحيح الفئة الأساسية للنشاط',
      'تعديلات الأسبوع الثاني: وضع بطاقة NFC عند الصندوق جمعت 28 تقييماً حقيقياً بـ 5 نجوم',
      'النتيجة النهائية: تحول الشبكة للأخضر وتصدر المرتبة الأولى وزيادة المكالمات بنسبة 310%'
    ],
    cta: 'Want the 7-point Google Business audit checklist? Type "AUDIT" below!',
    arabicCta: 'تريد قائمة تدقيق خرائط جوجل لخدمة المحلات بمدينتك؟ اكتب "تدقيق" في التعليقات!',
    platform: 'YouTube',
    niche: 'Business',
    difficulty: 'intermediate',
    competition: 'low',
    viralPotential: 'high',
    format: 'long',
    duration: '10m',
    facelessPossibility: true,
    tags: ['خرائط_جوجل', 'سيو_محلي', 'مشاريع_ناشئة', 'وكالة_رقمية']
  },
  {
    id: 'idea-exp-05',
    angle: 'experiment',
    arabicAngle: 'تجارب وتحديات عملية بالأرقام',
    title: 'Testing 3 AI Voiceover Tools for TikTok: Which Gets Higher Watch Time?',
    arabicTitle: 'اختبرت 3 أدوات تعليق صوتي بالذكاء الاصطناعي على تيك توك: أيهم حقق أعلى نسبة إكمال؟',
    frenchTitle: 'J’ai testé 3 voix IA sur TikTok : laquelle retient le plus l’audience ?',
    hook: 'Viewers will swipe away from your faceless video in 2 seconds if your AI voice sounds like a navigation robot.',
    arabicHook: 'المشاهد سيتجاوز مقطعك في ثانيتين إذا شعر أن الصوت الآلي يشبه روبوت التوجيه الصوتي للسيارات!',
    frenchHook: 'Les spectateurs zappent en 2 secondes si votre voix IA manque d’émotion humaine.',
    description: 'A controlled retention experiment comparing ElevenLabs, CapCut Text-to-Speech, and Murf.ai on identical viral scripts.',
    arabicDescription: 'تجربة علمية لمقارنة نسبة الاحتفاظ بالمشاهدين (Retention Rate) عند استخدام أصوات مختلفة لنفس السكربت.',
    frenchDescription: 'Comparatif chiffré du temps de visionnage moyen selon le moteur de synthèse vocale utilisé.',
    scriptOutline: [
      'Publishing 3 identical faceless video edits with only the voice engine changed',
      'Analyzing analytics retention graphs after each clip reaches 10,000 views',
      'Why ElevenLabs emotional inflection and breathing pauses doubled 100% completion rates',
      'The exact settings to make ElevenLabs Arabic voice sound 100% natural and human'
    ],
    arabicScriptOutline: [
      'نشر 3 مقاطع بنفس المشاهد والموسيقى مع تغيير محرك التعليق الصوتي فقط',
      'مقارنة منحنى الاحتفاظ بالجمهور بعد وصول كل فيديو إلى 10 آلاف مشاهدة حقيقية',
      'السبب وراء تفوق نبرة الصوت التي تحتوي على تنفس وتقطيع طبيعي للجمل في مضاعفة التفاعل',
      'الإعدادات السرية لضبط استقرار الصوت ونبرة الوضوح على ElevenLabs للعربية'
    ],
    cta: 'Comment "VOICE" and I will send you my exact ElevenLabs voice settings preset!',
    arabicCta: 'اكتب كلمة "صوت" في التعليقات لأرسل لك إعدادات النبرة البشرية المجربة مجاناً!',
    platform: 'Shorts',
    niche: 'AI',
    difficulty: 'intermediate',
    competition: 'medium',
    viralPotential: 'explosive',
    format: 'short',
    duration: '55s',
    facelessPossibility: true,
    tags: ['ذكاء_اصطناعي', 'تعليق_صوتي', 'elevenlabs', 'قنوات_بدون_وجه']
  },

  // --- Angle: comparison (مقارنات وتجارب عملية) ---
  {
    id: 'idea-cmp-04',
    angle: 'comparison',
    arabicAngle: 'مقارنات تجارية وتقنية مباشرة',
    title: 'Claude 3.7 vs ChatGPT-4o for Coding Full-Stack Apps: Real Bug Test',
    arabicTitle: 'مقارنة برمجية واقعية: كلود 3.7 ضد شات جي بي تي في كتابة وحل أخطاء تطبيقات الويب',
    frenchTitle: 'Claude 3.7 vs ChatGPT-4o pour coder : le test sur un bug React réel',
    hook: 'We fed the exact same corrupted React codebase to both Claude 3.7 and ChatGPT-4o. The debugging approach was night and day.',
    arabicHook: 'أعطينا نفس الكود البرمجي المعطوب لكل من Claude 3.7 و ChatGPT-4o: طريقة اكتشاف المشكلة كانت صادمة!',
    frenchHook: 'Même code React bugué envoyé aux deux modèles : la différence de raisonnement est flagrante.',
    description: 'Stress testing deep logic reasoning, context window memory, and clean component architecture output across top frontier LLMs.',
    arabicDescription: 'اختبار برمجي عملي يفحص قدرة كل نموذج على تتبع مسار الخطأ دون تخريب بقية مكونات المشروع.',
    frenchDescription: 'Test de performance sur la détection d’erreurs et l’architecture logicielle propre.',
    scriptOutline: [
      'Introducing a tricky state synchronization loop bug in a multi-page app',
      'ChatGPT response: Suggesting generic wrapper workarounds that create memory leaks',
      'Claude 3.7 response: Pinpointing the exact useEffect dependency flaw and offering minimal fix',
      'When to pay for Claude Pro vs when to stay on ChatGPT Plus for technical work'
    ],
    arabicScriptOutline: [
      'تجهيز ملف برمجي يحتوي على حلقة تكرار لانهائية مخفية في إدارة الحالة (State Loop)',
      'رد ChatGPT: اقتراح حلول سطحية ومكتبات إضافية زادت من تعقيد المشكلة',
      'رد Claude 3.7: تحديد السطر الخاطئ بدقة وإعادة كتابة المعادلة المنطقية في 3 أسطر نظيفة',
      'الخلاصة: متى تختار اشتراك Claude ومتى يكون ChatGPT هو الأنسب لمشروعك'
    ],
    cta: 'Which AI assistant do you rely on more for daily work? Vote in the comments!',
    arabicCta: 'أيهما تعتمد عليه أكثر في كتابة الكود وحل المشكلات؟ شاركنا رأيك في التعليقات!',
    platform: 'YouTube',
    niche: 'AI',
    difficulty: 'intermediate',
    competition: 'low',
    viralPotential: 'high',
    format: 'long',
    duration: '11m',
    facelessPossibility: true,
    tags: ['برمجة', 'ذكاء_اصطناعي', 'claude', 'chatgpt']
  },
  {
    id: 'idea-cmp-05',
    angle: 'comparison',
    arabicAngle: 'مقارنات تجارية وتقنية مباشرة',
    title: 'Gumroad vs Payhip vs Shopify: Best Platform for Selling Digital Templates',
    arabicTitle: 'مقارنة صريحة: Gumroad ضد Payhip ضد Shopify لبيع القوالب والملفات الرقمية للمبتدئين',
    frenchTitle: 'Gumroad vs Payhip vs Shopify : où vendre vos templates digitaux ?',
    hook: 'Gumroad takes a brutal 10% fee on every sale you make. Here is why switching to Payhip saved us $420 last month.',
    arabicHook: 'منصة Gumroad تأخذ 10% كاملة من كل مبيعة تحققها! إليك لماذا وفر لنا الانتقال لمنصة Payhip أكثر من 400 دولار شهرياً!',
    frenchHook: 'Gumroad prend 10% de chaque vente. Voici pourquoi Payhip ou Shopify peuvent être bien plus rentables.',
    description: 'Comparing transaction fees, payment gateway flexibility, ease of customer onboarding, and local payment support for digital creators.',
    arabicDescription: 'مقارنة مالية وتقنية شاملة: عمولات المنصات، بوابات الدفع المدعومة في الدول العربية، وسهولة تجربة الشراء للمستخدم.',
    frenchDescription: 'Analyse comparative des frais de transaction et de la conversion pour vendre des PDF et templates.',
    scriptOutline: [
      'Visual fee breakdown calculator comparing $3,000 monthly sales across all three',
      'Gumroad pros & cons: Built-in discovery but heavy 10% platform tax',
      'Payhip: Zero percent platform fee on basic tiers with direct PayPal/Stripe payouts',
      'Shopify: When does having a custom branded storefront actually justify the $39/mo overhead'
    ],
    arabicScriptOutline: [
      'حاسبة مالية بصرية تقارن صافي أرباحك عند تحقيق 2000 دولار مبيعات في كل منصة',
      'عيوب ومميزات Gumroad: سهولة وسرعة التجهيز مقابل اقتطاع 10% كعمولة ثابتة',
      'مميزات Payhip: عمولة منخفضة جداً وربط مباشر بحسابك البنكي أو PayPal',
      'متى يستحق متجرك الترقية إلى Shopify ومتى يعتبر مصاريف زائدة لا داعي لها'
    ],
    cta: 'Save this comparison before launching your digital product store this month!',
    arabicCta: 'احفظ هذا المنشور في المفضلة لتختار المنصة الأوفر لأرباحك قبل إطلاق منتجك الرقمي!',
    platform: 'Instagram',
    niche: 'Making Money Online',
    difficulty: 'beginner',
    competition: 'low',
    viralPotential: 'high',
    format: 'carousel',
    duration: 'Carousel',
    facelessPossibility: true,
    tags: ['منتجات_رقمية', 'تجارة_الكترونية', 'gumroad', 'payhip']
  },

  // --- Angle: listicle (قوائم ونصائح وحيل ذكية) ---
  {
    id: 'idea-lst-04',
    angle: 'listicle',
    arabicAngle: 'قوائم سريعة وحيل ذكية',
    title: '3 Low-Competition Fiverr Gigs You Can Deliver with Free Browser Tools',
    arabicTitle: '3 خدمات مطلوبة جداً على فايفر بمنافسة ضعيفة ويمكنك تنفيذها بأدوات مجانية بالكامل',
    frenchTitle: '3 micro-services Fiverr très demandés réalisables avec des outils gratuits',
    hook: 'Do not compete with 100,000 graphic designers on Fiverr: these 3 boring utility services have steady daily orders.',
    arabicHook: 'لا تدخل في منافسة خاسرة مع 100 ألف مصمم لوغوهات على فايفر: هذه الخدمات الثلاث البسيطة عليها طلب مستمر ومنافسة هادئة!',
    frenchHook: 'Ne rivalisez pas avec des milliers de graphistes : ces 3 services pratiques se vendent chaque jour.',
    description: 'Uncovering non-saturated freelance services like PDF form conversion, automated audio transcription, and image background cleanup.',
    arabicDescription: 'كشف خدمات رقمية مطلوبة للشركات: تحويل ملفات PDF التفاعلية، تفريغ الاجتماعات الصوتية، وإعداد قوالب عروض تقديمية.',
    frenchDescription: 'Découvrez des niches méconnues sur les plateformes de micro-services pour générer vos premiers revenus.',
    scriptOutline: [
      'Proof of active queues: Showing sellers with 5-10 pending orders on boring tasks',
      'Service #1: Converting flat PDF contracts into fillable interactive forms using free web tools',
      'Service #2: Audio cleaning and background noise removal for podcast hosts',
      'Service #3: Vectorizing low-res company logos using AI vectorizer tools in 60 seconds'
    ],
    arabicScriptOutline: [
      'إثبات حقيقي من فايفر: بائعون لديهم طلبات معلقة في خدمات مكتبية بسيطة ومطلوبة',
      'الخدمة الأولى: تحويل ملفات الـ PDF العادية إلى نماذج تفاعلية قابلة للكتابة بنقرة زر',
      'الخدمة الثانية: تنقية الصوت وإزالة التشويش من تسجيلات الاجتماعات والبودكاست بأدوات ذكية مجانية',
      'الخدمة الثالثة: تحويل اللوغوهات المشوشة إلى ملفات Vector عالية الجودة للمطابع في دقيقة واحدة'
    ],
    cta: 'Comment "GIG" and I will send you the 3 tool links and sample gig descriptions!',
    arabicCta: 'اكتب كلمة "خدمة" في التعليقات وسأرسل لك روابط الأدوات وصيغ الوصف الجاهزة لحسابك!',
    platform: 'Shorts',
    niche: 'Freelancing',
    difficulty: 'beginner',
    competition: 'low',
    viralPotential: 'high',
    format: 'short',
    duration: '52s',
    facelessPossibility: true,
    tags: ['فايفر', 'عمل_حر', 'ادوات_مجانية', 'خدمات_مصغرة']
  },
  {
    id: 'idea-lst-05',
    angle: 'listicle',
    arabicAngle: 'قوائم سريعة وحيل ذكية',
    title: '4 CapCut Hacks That Instantly Give Your Videos a Cinematic Texture',
    arabicTitle: '4 حيل مونتاج سرية في كاب كات تجعل فيديوهاتك تبدو كأنها صُوّرت بكاميرا سينمائية',
    frenchTitle: '4 astuces secrètes sur CapCut pour un rendu visuel cinématographique',
    hook: 'Your smartphone video does not look cinematic because it is too sharp and lacks digital film grain.',
    arabicHook: 'فيديوهات هاتفك لا تبدو سينمائية لأنها حادة أكثر من اللازم وتفتقر لملمس حبيبات الأفلام الاحترافية!',
    frenchHook: 'Vos vidéos smartphone manquent de style car elles sont trop numériques et trop nettes.',
    description: 'Essential color grading adjustments, film grain overlays, and custom aspect ratio framing tips within CapCut mobile.',
    arabicDescription: 'حيل عملية لضبط تباين الألوان (Color Grading)، وإضافة تدرج الـ Grain، وإخفاء عيوب كاميرا الهاتف الاقتصادية.',
    frenchDescription: 'Techniques simples pour ajouter du grain, ajuster les contrastes et créer des bandes noires cinématographiques.',
    scriptOutline: [
      'Before and after visual toggle: Flat smartphone video vs warm cinematic textured frame',
      'Hack 1: Lowering sharpness by -10 to remove harsh artificial digital oversharpening',
      'Hack 2: Adding the "Film" overlay effect with 15% opacity to introduce authentic film grain',
      'Hack 3: Pushing Shadows to teal and Highlights to warm amber in color wheels',
      'Hack 4: Applying 2.35:1 letterbox black bars for wide screen cinematic feel'
    ],
    arabicScriptOutline: [
      'مقارنة بصرية واضحة: فيديو الهاتف العادي الباهت مقابل نفس اللقطة بألوان سينمائية دافئة',
      'الحيلة الأولى: خفض حدة الفيديو (Sharpen) إلى -10 للتخلص من الحدة الرقمية المزعجة',
      'الحيلة الثانية: إضافة طبقة تأثير Film Grain بنسبة 15% لمحاكاة شريط السينما الحقيقي',
      'الحيلة الثالثة: دفع الظلال نحو الأزرق المخضر (Teal) والإضاءات نحو البرتقالي الدافئ (Orange)',
      'الحيلة الرابعة: إضافة خطوط السينما السوداء العريضة أعلى وأسفل المقطع'
    ],
    cta: 'Save this post so you have the exact color numbers for your next edit tonight!',
    arabicCta: 'احفظ الشرح لتطبق درجات الألوان هذه في مشروع مونتاجك القادم الليلة!',
    platform: 'TikTok',
    niche: 'Content Creation',
    difficulty: 'beginner',
    competition: 'medium',
    viralPotential: 'explosive',
    format: 'short',
    duration: '47s',
    facelessPossibility: true,
    tags: ['كاب_كات', 'مونتاج_سينمائي', 'تلوين_فيديو', 'صناعة_محتوى']
  },

  // --- Angle: story (قصص نجاح ودراسات حالة واقعية) ---
  {
    id: 'idea-sty-04',
    angle: 'story',
    arabicAngle: 'قصص نجاح ودراسات حالة واقعية',
    title: 'How a Student Built a $1,800/Month Faceless Luxury Channel in 90 Days',
    arabicTitle: 'قصة نجاح واقعية: كيف بنى طالب جامعي قناة ثراء بدون وجه تدر 1800$ شهرياً في 90 يوماً؟',
    frenchTitle: 'Étude de cas : comment un étudiant a généré 1800$/mois avec une chaîne faceless',
    hook: 'He worked 2 hours a day from his dorm room using free stock footage and an AI script workflow.',
    arabicHook: 'كان يعمل ساعتين فقط يومياً من غرفته الجامعية باستخدام لقطات مجانية وسكربتات ذكية: إليك كيف حقق 1800 دولار شهرياً!',
    frenchHook: 'Il travaillait 2 heures par jour depuis sa chambre : voici comment sa chaîne a atteint 1800$/mois.',
    description: 'Deconstructing the niche selection, content cadence, and multi-stream monetization strategy of a successful faceless creator.',
    arabicDescription: 'تفكيك شامل لكيفية اختيار تخصص الثراء وعلم النفس المالي، وطريقة صناعة الفيديوهات بانتظام، ومصادر الدخل المتعددة.',
    frenchDescription: 'Analyse détaillée du choix de niche, du rythme de publication et des sources de monétisation.',
    scriptOutline: [
      'Proof of milestone: Monthly dashboard earnings and subscriber growth trajectory',
      'The initial mistake: Trying to cover 5 different topics before narrowing to financial discipline stories',
      'The daily engine: 30 minutes research + 30 minutes voiceover + 45 minutes CapCut visual cutting',
      'Monetization mix: AdSense (40%), affiliate broker links (35%), and sponsored mentions (25%)'
    ],
    arabicScriptOutline: [
      'عرض لوحة الأرباح وتطور المشاهدات من الصفر حتى تجاوز 200 ألف مشترك',
      'الخطأ الذي كاد يدمر القناة في البداية: تشتت المواضيع قبل التركيز على قصص الانضباط المالي',
      'الجدول اليومي المنتظم: نصف ساعة للبحث والسكربت ونصف ساعة للتعليق الصوتي وساعة للمونتاج',
      'توزيع الأرباح: 40% من إعلانات يوتيوب، و 35% من روابط التسويق بالعمولة، و 25% من الرعايات'
    ],
    cta: 'Comment "CASE" to read the complete written breakdown of his daily schedule!',
    arabicCta: 'اكتب كلمة "قصة" في التعليقات لأرسل لك تفاصيل جدوله اليومي خطوة بخطوة مجاناً!',
    platform: 'YouTube',
    niche: 'Faceless Content',
    difficulty: 'intermediate',
    competition: 'low',
    viralPotential: 'high',
    format: 'long',
    duration: '13m',
    facelessPossibility: true,
    tags: ['دراسة_حالة', 'قنوات_بدون_وجه', 'ارباح_الانترنت', 'يوتيوب_أتمتة']
  },

  // --- Angle: problem_solving (حل مشكلات الجمهور) ---
  {
    id: 'idea-prb-04',
    angle: 'problem_solving',
    arabicAngle: 'حل مباشر لمشكلة حقيقية',
    title: 'Fixing the "0 Views on TikTok" Glitch: The IP & Device Reset Checklist',
    arabicTitle: 'الحل النهائي لمشكلة 0 مشاهدة في تيك توك: خطوات إنقاذ الحساب وفحص تقييد الـ Shadowban',
    frenchTitle: 'Résoudre le problème des 0 vues sur TikTok : le guide anti-shadowban',
    hook: 'If your newly published TikTok video is stuck at exactly 0 views after 4 hours, do not delete it! Check this one setting.',
    arabicHook: 'إذا كان مقطعك الجديد متوقفاً عند صفر مشاهدة بالضبط بعد مرور 4 ساعات، فلا تحذفه أبداً! افحص هذا الشيء أولاً!',
    frenchHook: 'Si vos vidéos TikTok restent bloquées à 0 vue après plusieurs heures, ne les supprimez surtout pas.',
    description: 'A step-by-step diagnostic guide for creators encountering zero view throttling, covering metadata flags, VPN issues, and copyright alerts.',
    arabicDescription: 'دليل تشخيصي لحل مشكلة المشاهدات الصفرية: التأكد من سلامة الصوت، وفحص عنوان الـ IP، وضبط إعدادات الخصوصية للحساب.',
    frenchDescription: 'Protocole pour vérifier la santé de votre compte et débloquer la diffusion de vos vidéos.',
    scriptOutline: [
      'Showing the panic of 0 views and explaining why deleting the video destroys account trust score',
      'Diagnostic step 1: Check if the video URL can be viewed in an incognito browser window',
      'Diagnostic step 2: Check TikTok analytics to verify if the video is marked "Not Eligible for For You Page"',
      'The 48-hour recovery procedure to restore account algorithm trust without creating a new profile'
    ],
    arabicScriptOutline: [
      'عرض شاشة الحساب المتوقف عند صفر مشاهدة، وشرح لماذا يؤدي حذف الفيديو إلى تدمير تقييم الحساب',
      'الخطوة الأولى: نسخ رابط الفيديو وفتحه في نافذة متصفح خفي للتأكد من أنه ليس مقيداً من الخوارزمية',
      'الخطوة الثانية: فحص قسم الإحصائيات للتأكد من عدم وجود تحذير "غير مؤهل لصفحة لك (FYP)"',
      'خطة التعافي في 48 ساعة لاستعادة ثقة الخوارزمية بحسابك وتوزيع مقاطعك القادمة بشكل طبيعي'
    ],
    cta: 'Save this emergency guide so you know exactly what to do if your video ever freezes!',
    arabicCta: 'احفظ هذا الدليل لحالات الطوارئ لتعرف كيف تتصرف فوراً لو توقفت مشاهداتك فجأة!',
    platform: 'TikTok',
    niche: 'Content Creation',
    difficulty: 'beginner',
    competition: 'high',
    viralPotential: 'explosive',
    format: 'short',
    duration: '52s',
    facelessPossibility: true,
    tags: ['تيك_توك', 'حل_مشكلة_المشاهدات', 'شادوبان', 'خوارزميات_تيك_توك']
  },

  // --- Angle: trends (اتجاهات وفرص رقمية صاعدة) ---
  {
    id: 'idea-trd-04',
    angle: 'trends',
    arabicAngle: 'اتجاهات وفرص رقمية صاعدة',
    title: 'TikTok Shop Affiliate for Faceless Creators: The 2026 Strategy',
    arabicTitle: 'التسويق بالعمولة على تيك توك شوب بدون إظهار الوجه: كيف تكسب من المنتجات الرائجة؟',
    frenchTitle: 'TikTok Shop Affiliation sans visage : la stratégie gagnante en 2026',
    hook: 'You do not need to show your face or buy inventory to earn $80 daily on TikTok Shop right now.',
    arabicHook: 'لست بحاجة للظهور أمام الكاميرا ولا لشراء مخزون بضائع لتبدأ بجني عمولات يومية من تيك توك شوب في 2026!',
    frenchHook: 'Pas besoin de montrer votre visage ni d’acheter du stock pour toucher des commissions TikTok Shop.',
    description: 'How faceless creators record hands-only product unboxings, ASMR utility demos, and lifestyle problem-solving clips to earn per-sale commissions.',
    arabicDescription: 'شرح أساليب التصوير بدون وجه: استعراض المنتجات باليدين، وتصوير لقطات ASMR للمنتجات الذكية، وإضافة زر الشراء الأصفر.',
    frenchDescription: 'Comment créer des vidéos de démonstration produit efficaces sans jamais apparaître à l’écran.',
    scriptOutline: [
      'Showing a top-performing 15-second kitchen gadget clip with 45,000 product sales attached',
      'Finding trending products with over 15% commission rates inside TikTok Affiliate Marketplace',
      'The hands-only filming setup using a $12 overhead phone desk mount and natural window light',
      'Writing an impulse-trigger hook addressing one everyday home annoyance'
    ],
    arabicScriptOutline: [
      'عرض مقطع مدته 15 ثانية لأداة منزلية ذكية حققت آلاف الطلبات عبر الزر الأصفر في البايو',
      'طريقة البحث عن المنتجات الأكثر مبيعاً والتي تعطي نسبة عمولة تتجاوز 15% للمبدعين',
      'إعداد زاوية تصوير علوية على الطاولة بالهاتف فقط بدون الحاجة لأي معدات باهظة',
      'صياغة خطاف افتتاحي سريع يركز على حل إزعاج يومي يعاني منه المشاهد في منزله'
    ],
    cta: 'Save this strategy and apply for your creator affiliate account today!',
    arabicCta: 'احفظ هذه الاستراتيجية وابدأ في تقديم طلب الانضمام لبرنامج العمولة اليوم!',
    platform: 'TikTok',
    niche: 'Affiliate Marketing',
    difficulty: 'beginner',
    competition: 'medium',
    viralPotential: 'explosive',
    format: 'short',
    duration: '48s',
    facelessPossibility: true,
    tags: ['تيك_توك_شوب', 'تسويق_بالعمولة', 'ارباح_تيك_توك', 'منتجات_رائجة']
  }
];

// Combine all curated sources
const ALL_LIBRARY_IDEAS: ExtendedContentIdea[] = [
  ...ALL_BASE_IDEAS,
  ...EXPANDED_UNIQUE_IDEAS
];

// Strictly filter through our deduplication engine to guarantee zero duplicate or near-duplicate cards
export const contentIdeas: ContentIdea[] = filterUniqueIdeas(ALL_LIBRARY_IDEAS);

