import { ChallengeTask, BadgeItem } from './challengesDataTypes';

// Extensive pool of daily challenges
export const dailyChallengePool: ChallengeTask[] = [
  // 1. Quizzes
  {
    id: 'daily-quiz-canva-links',
    title: 'اختبار الفهم: بيع قوالب Canva دون مشاكل تراخيص',
    description: 'أجب بشكل صحيح عن آلية مشاركة روابط قوالب Canva للعملاء لضمان استنساخ نظيف ومجاني.',
    category: 'daily',
    type: 'quiz',
    domain: 'templates',
    domainAr: 'بيع القوالب',
    xpReward: 40,
    quizData: {
      question: 'ما هي الطريقة الصحيحة والمثالية لمشاركة تصاميم Canva للبيع التجاري للمشتري ليتجنب رسوم الاشتراك؟',
      options: [
        'مشاركة رابط التعاون المباشر (Edit Link) بصلاحية التحرير للملف الأصلي',
        'مشاركة رابط القالب الحصري (Template Link) والاعتماد على خطوط وعناصر مجانية 100%',
        'إرسال كلمة سر حساب Canva الخاص بك للمشتري لتنزيل الملف',
        'تصدير التصميم كصورة ثابتة منخفضة الجودة وإرسالها بالبريد'
      ],
      correctIndex: 1,
      explanation: 'رابط Template Link يولد نسخة مستقلة خاصة بحساب العميل دون المساس بالأصل، واستخدام عناصر مجانية يتيح له استخدامها وتعديلها دون الحاجة لاشتراك Canva Pro المدفوع.'
    }
  },
  {
    id: 'daily-quiz-notion-rel',
    title: 'اختبار الفهم: هندسة قواعد بيانات Notion',
    description: 'اختبر استيعابك لكيفية ربط الجداول والعلاقات داخل قوالب تنظيم المهام الرقمية في Notion.',
    category: 'daily',
    type: 'quiz',
    domain: 'notion',
    domainAr: 'قوالب Notion',
    xpReward: 40,
    quizData: {
      question: 'أي خاصية (Property) في Notion تسمح بربط جدول المهام اليومية بجدول المشاريع الكبرى تلقائياً؟',
      options: [
        'خاصية Text العادية',
        'خاصية Multi-select',
        'خاصية Relation (العلاقة المترابطة)',
        'خاصية Status الفردية'
      ],
      correctIndex: 2,
      explanation: 'خاصية Relation هي حجر الأساس في Notion لربط الجداول، مما يتيح تجميع كل المهام التابعة لمشروع معين وعرضها ديناميكياً.'
    }
  },
  {
    id: 'daily-quiz-payhip-gateway',
    title: 'اختبار الفهم: بوابات دفع المنتجات الرقمية بالمغرب والشرق الأوسط',
    description: 'لماذا تعد منصة Payhip الخيار الأسرع لبدء بيع الملفات الرقمية في شمال إفريقيا؟',
    category: 'daily',
    type: 'quiz',
    domain: 'ecommerce',
    domainAr: 'المنتجات الرقمية',
    xpReward: 40,
    quizData: {
      question: 'ما الميزة الأساسية لـ Payhip مقارنة بمنصات التجارة العالمية الأخرى للمبتدئ العربي؟',
      options: [
        'Payhip لا تقبل إلا البطاقات الأمريكية',
        'توفر متجراً مجانياً 100% بدون اشتراك شهري وتدعم استقبال أموال PayPal و Stripe مباشرة للمقيمين بالمغرب',
        'تفرض رسوماً شهرية قدرها 50 دولاراً قبل أول مبيعة',
        'تقتصر على بيع المنتجات الفيزيائية الملموسة والشحن السريع'
      ],
      correctIndex: 1,
      explanation: 'Payhip مجانية تماماً بالبداية وتأخذ نسبة بسيطة (5%) فقط عند البيع، وتدعم حسابات PayPal العربية دون عراقيل فتح الشركات الأجنبية.'
    }
  },
  {
    id: 'daily-quiz-copywriting-hook',
    title: 'اختبار الفهم: كتابة الإعلانات والخطافات الفيروسية',
    description: 'أي العناصر يمثل الركيزة الأولى في صيغة AIDA الإعلانية لجذب انتباه المتصفح؟',
    category: 'daily',
    type: 'quiz',
    domain: 'copywriting',
    domainAr: 'كتابة الإعلانات',
    xpReward: 40,
    quizData: {
      question: 'ما هو الهدف الحقيقي من السطر الأول أو الثواني الثلاث الأولى (Hook / Attention) في الإعلان؟',
      options: [
        'إغلاق الصفقة وطلب تحويل المبلغ فوراً',
        'إيقاف إصبع المستخدم عن التمرير وجعله يقرأ أو يشاهد السطر التالي',
        'شرح السيرة الذاتية المفصلة للكاتب',
        'سرد جميع مواصفات المنتج الدقيقة دفعة واحدة'
      ],
      correctIndex: 1,
      explanation: 'وظيفة السطر الأول في أي نص إعلاني (Attention Hook) هي فقط إيقاف التمرير وإغراء القارئ لمتابعة الجملة الثانية، وليس بيع المنتج كاملاً في ثانية واحدة.'
    }
  },

  // 2. Practical Exercises
  {
    id: 'daily-exercise-hook-craft',
    title: 'تمرين تطبيقي: صياغة هوك (Hook) فيروسي لمحتوى قصير',
    description: 'صغ خطافاً مدته 3 ثوانٍ لفيديو تيك توك أو ريلز يحل مشكلة شائعة لفئة مستهدفة واضحة وفق المعايير.',
    category: 'daily',
    type: 'exercise',
    domain: 'social-media',
    domainAr: 'صناعة المحتوى',
    xpReward: 50,
    exerciseData: {
      instructions: 'اكتب خطافاً (Hook) قوياً وموجزاً في جملة واحدة يخاطب ألماً حقيقياً (مثل: توفير وقت الدراسة، تنظيم المصاريف، أو تسريع المونتاج) دون وعود ثراء كاذبة.',
      verificationCriteria: [
        'يحدد فئة مستهدفة واضحة أو يعالج ألماً محدداً وملموساً.',
        'يقل طوله عن 20 كلمة ليلائم القراءة في أول 3 ثوانٍ.',
        'يخلو من العناوين المضللة (Clickbait كاذب) ويبعث فضولاً حقيقياً.'
      ],
      sampleAnswer: 'إذا كنت طالباً وتتراكم عليك تسليمات المشاريع كل نهاية أسبوع، فهذا القالب يرتّب جدولك في 3 دقائق 📚',
      submissionHint: 'اكتب نص الهوك هنا وتأكد من استيفاء شروط الدقة.'
    }
  },
  {
    id: 'daily-exercise-pricing-formula',
    title: 'تمرين تطبيقي: حساب تسعير خدمة عمل حر عادلة',
    description: 'طبّق معادلة التسعير بالساعة وتكلفة المعيشة لحساب السعر الأدنى لمشروع تصميم أو كتابة أو مونتاج.',
    category: 'daily',
    type: 'exercise',
    domain: 'freelance',
    domainAr: 'العمل الحر',
    xpReward: 50,
    exerciseData: {
      instructions: 'احسب السعر المناسب لمشروع يستغرق 10 ساعات عمل: (تكاليف المعيشة المطلوبة شهرياً ÷ ساعات العمل المتاحة شهرياً) × ساعات المشروع + 20% هامش طوارئ وضرائب.',
      verificationCriteria: [
        'تحديد عدد الساعات المتوقعة لإنجاز العمل بدقة.',
        'إضافة هامش ربح لا يقل عن 15% لحالات المراجعة والتعديلات.',
        'كتابة المبلغ النهائي بوضوح مع العملة (مثال: درهم مغربي أو دولار).'
      ],
      sampleAnswer: 'المشروع يتطلب 8 ساعات عمل بسعر 20$ للساعة + 20% هامش تعديلات = 192$ للمشروع كاملاً مع تسليمين مراجعة.',
      submissionHint: 'اكتب حسبتك الرياضية والمبلغ المقترح للمشروع.'
    }
  },
  {
    id: 'daily-exercise-prompt-crafting',
    title: 'تمرين تطبيقي: صياغة برومبت ذكاء اصطناعي احترافي',
    description: 'اكتب أمراً احترافياً (Mega-Prompt) مخصصاً لصناعة محتوى إعلاني بنظام تحديد الدور والسياق والمخرجات.',
    category: 'daily',
    type: 'exercise',
    domain: 'ai',
    domainAr: 'الذكاء الاصطناعي',
    xpReward: 50,
    exerciseData: {
      instructions: 'طبّق صيغة (الدور + المهمة + الجمهور المستهدف + النبرة + القيود) لإنشاء برومبت موجه لأداة الذكاء الاصطناعي.',
      verificationCriteria: [
        'تحديد دور واضح للنموذج (مثال: أنت كاتب إعلانات محترف).',
        'تحديد الجمهور المستهدف بدقة ونبرة الصوت المطلوبة.',
        'تضمين قيد صريح (مثال: لا تزد عن 50 كلمة، بدون مصطلحات معقدة).'
      ],
      sampleAnswer: 'تصرف كخبير إعلانات لتطبيق Payhip. اكتب منشوراً على لينكدإن يستهدف صناع المحتوى المغاربة، بنبرة ملهمة وواقعية، في أقل من 70 كلمة مع دعوة واضحة لاتخاذ إجراء.',
      submissionHint: 'اكتب البرومبت المتكامل الذي قمت بصياغته.'
    }
  },
  {
    id: 'daily-exercise-meta-description',
    title: 'تمرين تطبيقي: كتابة وصف سيو (Meta Description) جاذب',
    description: 'اكتب وصفاً لمحرك بحث Google لصفحة متجر منتجات رقمية يتضمن كلمات مفتاحية ونسبة نقر (CTR) عالية.',
    category: 'daily',
    type: 'exercise',
    domain: 'seo',
    domainAr: 'تحسين السيو',
    xpReward: 50,
    exerciseData: {
      instructions: 'صغ وصف سيو جذاب لصفحة قوالب تنظيم Notion بين 120 إلى 155 حرفاً يحتوي على كلمة مفتاحية ونداء لاتخاذ إجراء (CTA).',
      verificationCriteria: [
        'يتراوح طول النص بين 120 إلى 160 حرفاً.',
        'يحتوي على الكلمة المستهدفة في أول جملة.',
        'يختم بدعوة واضحة للنقر والتجربة المجانية.'
      ],
      sampleAnswer: 'حمّل أفضل قوالب Notion العربية لتنظيم دراستك ومهامك اليومية مجاناً. قوالب جاهزة للنسخ بنقرة واحدة — ابدأ تنظيم يومك باحترافية الآن!',
      submissionHint: 'اكتب النص وتأكد من عدد الحروف ومطابقة المعايير.'
    }
  },

  // 3. Lesson and Learning Reviews
  {
    id: 'daily-lesson-templates-guide',
    title: 'قراءة درس: ركائز إطلاق حزمة قوالب رقمية ناجحة',
    description: 'اطّلع على استراتيجية اختيار الفئة المستهدفة وتصميم ملف التسليم (PDF Delivery Guide) في قسم القوالب.',
    category: 'daily',
    type: 'lesson',
    domain: 'templates',
    domainAr: 'بيع القوالب',
    xpReward: 35,
    steps: [
      'انتقل إلى قسم مسار بيع القوالب الجاهزة.',
      'راجع قسم تصميم ملف التسليم التفاعلي للعميل.',
      'افهم كيفية حماية حقوق تصاميمك باستخدام الروابط المجانية.',
      'عد إلى هنا وأكّد إتمام قراءة الدرس لاستلام الـ XP.'
    ],
    actionLink: {
      tab: 'selling-templates',
      label: 'فتح مسار بيع القوالب'
    }
  },
  {
    id: 'daily-lesson-affiliate-blueprint',
    title: 'قراءة درس: هندسة مسار الإحالة (Affiliate Funnel)',
    description: 'اقرأ آلية اختيار العروض ذات العمولة المرتفعة وبناء جسر الثقة (Bridge Page) في التسويق بالعمولة.',
    category: 'daily',
    type: 'lesson',
    domain: 'affiliate',
    domainAr: 'التسويق بالعمولة',
    xpReward: 35,
    steps: [
      'انتقل إلى قسم التسويق بالعمولة (Affiliate Marketing).',
      'اقرأ شروط اختيار العروض الموثوقة والابتعاد عن العروض الوهمية.',
      'دوّن أهم 3 معايير لفحص منصة التسويق قبل الترويج لها.',
      'أكّد القراءة للحصول على مكافأتك اليومية.'
    ],
    actionLink: {
      tab: 'affiliate',
      label: 'فتح دليل التسويق بالعمولة'
    }
  },
  {
    id: 'daily-lesson-video-storytelling',
    title: 'قراءة درس: البنية السردية لفيديوهات اليوتيوب الطويلة',
    description: 'تعرّف على قاعدة الحفاظ على نسبة المشاهدة (Retention Rate) وتقسيم الفيديو إلى فصول مشوقة.',
    category: 'daily',
    type: 'lesson',
    domain: 'video',
    domainAr: 'مونتاج الفيديو',
    xpReward: 35,
    steps: [
      'انتقل إلى مسار مونتاج الفيديو أو صناعة محتوى اليوتيوب.',
      'راجع استراتيجيات التقطيع الإيقاعي والمؤثرات الصوتية.',
      'تعرف على دور أول 30 ثانية في معادلة خوارزمية يوتيوب.',
      'عد وأكّد إتمام دراسة المفهوم.'
    ],
    actionLink: {
      tab: 'video-editing',
      label: 'فتح مسار مونتاج الفيديو'
    }
  },

  // 4. Practical Skill Exploration
  {
    id: 'daily-skill-calculator-testing',
    title: 'تطبيق مهارة: تجربة حاسبة أرباح رقمية وإدخال أرقام حقيقية',
    description: 'استخدم إحدى حاسبات RikouZone المجانية لحساب عوائد مشاهدات يوتيوب أو تكاليف إعلانات فيسبوك.',
    category: 'daily',
    type: 'skill',
    domain: 'tools',
    domainAr: 'الأدوات والحاسبات',
    xpReward: 30,
    steps: [
      'افتح صفحة الأدوات الرقمية أو حاسبة عوائد يوتيوب.',
      'أدخل عدد مشاهدات واقعي ومعدل RPM للمحتوى العربي (مثال: 1.2$).',
      'لاحظ التقديرات الشهرية والسنوية المحسوبة تلقائياً.',
      'عد إلى هنا لتأكيد التجربة واستلام نقاط الـ XP.'
    ],
    actionLink: {
      tab: 'tools',
      label: 'فتح صفحة الأدوات والحاسبات'
    }
  },
  {
    id: 'daily-skill-rikou-ai-chat',
    title: 'تطبيق مهارة: استشارة Rikou AI لتطوير فكرة محتوى',
    description: 'اطرح سؤالاً محدداً على مساعد Rikou AI الذكي لتوليد زاوية مبتكرة لمنتج رقمي أو منشور تسويقي.',
    category: 'daily',
    type: 'skill',
    domain: 'ai',
    domainAr: 'مساعد Rikou AI',
    xpReward: 30,
    steps: [
      'انتقل إلى قسم Rikou AI في الموقع.',
      'اطرح استفساراً حقيقياً (مثال: اقترح علي 3 مجالات مطلوبة لبيع قوالب Notion للطلاب).',
      'راجع الإجابة وانسخ النقاط التي تهمك لتطبيقها.',
      'أكّد إنجاز الاستشارة لاستلام نقاط الخبرة.'
    ],
    actionLink: {
      tab: 'ai',
      label: 'فتح Rikou AI'
    }
  }
];

// High-impact weekly challenge pool
export const weeklyChallengePool: ChallengeTask[] = [
  {
    id: 'weekly-project-sprint',
    title: 'إنجاز مشروع تطبيقي متكامل (Mini Project)',
    description: 'اختر مشروعاً تطبيقياً واحداً من المسارات (مثل صفحة منتج Payhip، قالب Notion منظم، أو حقيبة Canva) وأتمم خطواته العملية.',
    category: 'weekly',
    type: 'exercise',
    domain: 'templates',
    domainAr: 'المشاريع التطبيقية',
    xpReward: 150,
    steps: [
      'حدد المشروع المستهدف من مسار بيع القوالب أو المنتجات الرقمية.',
      'نفذ المراحل الأساسية الثلاث (التخطيط، التصميم، وتجهيز ملف التسليم).',
      'تأكد من مطابقة شروط التراخيص والاستخدام المجاني للموارد.',
      'اكتب ملخص مشروعك وروابط تسليمه في نافذة التمرين لتأكيد الإنجاز.'
    ],
    exerciseData: {
      instructions: 'قم بكتابة ملخص متكامل لمشروعك الرقمي الذي بنيته هذا الأسبوع: نوع المنتج، المنصة التي رفعت عليها العمل، وطريقة تسليم الملف للمشتري.',
      verificationCriteria: [
        'تم تحديد فكرة المنتج الرقمي والجمهور المستهدف بدقة.',
        'تم تجهيز ملف تسليم تفاعلي (PDF أو رابط استنساخ مباشر).',
        'تم التأكد من خلو المشروع من عناصر مدفوعة تمنع العميل من الاستخدام.',
        'المنتج جاهز للنشر والاستخدام التجاري الحقيقي.'
      ],
      sampleAnswer: 'تم إنشاء وتنسيق قالب Student Productivity Planner على Notion، وتجهيز ملف تسليم PDF يحتوي على زر Duplication مع فيديو توضيحي مدته دقيقة.',
      submissionHint: 'اكتب وصفاً مفصلاً لما قمت ببنائه هذا الأسبوع لتأكيد التحدي الأسبوعي الكبير.'
    }
  },
  {
    id: 'weekly-quiz-master-sprint',
    title: 'اختبار الكفاءة الرقمية الأسبوعي المتقدم',
    description: 'اجتز اختبار التحدي الأسبوعي متعدد الزوايا لإثبات تمكنك من أساسيات التجارة الرقمية وبناء مصادر الدخل.',
    category: 'weekly',
    type: 'quiz',
    domain: 'ecommerce',
    domainAr: 'الاختبار الأسبوعي',
    xpReward: 130,
    quizData: {
      question: 'أي استراتيجية تسويقية تعتبر الأكثر استدامة ومجانية لصانع منتجات رقمية مبتدئ في أول 90 يوماً؟',
      options: [
        'إنفاق ميزانية إعلانات ممولة ضخمة على فيسبوك دون بناء جمهور سابق',
        'صناعة محتوى فيديو قصير (Shorts / TikTok) يحل مشكلة محددة ويوفر عينة مجانية كهدية مع رابط في البايو',
        'شراء متابعين وحسابات وهمية لإيهام الزوار بالثقة',
        'إرسال رسائل خاصة عشوائية (Spam) للغرباء على إنستغرام'
      ],
      correctIndex: 1,
      explanation: 'صناعة المحتوى القصير الذي يحل ألماً حقيقياً ويقدم نموذجاً مجانياً (Lead Magnet) يبني جمهوراً وفياً يستمر في الشراء دون الحاجة لمصاريف إعلانية مسبقة.'
    }
  },
  {
    id: 'weekly-streak-dedication',
    title: 'تحدي الالتزام الأسبوعي المستمر (3 أيام تطبيق)',
    description: 'حافظ على استمرارية التعلم والتطبيق لأكثر من 3 أيام خلال هذا الأسبوع لتثبيت العادات الإنتاجية.',
    category: 'weekly',
    type: 'skill',
    domain: 'habits',
    domainAr: 'بناء العادات',
    xpReward: 120,
    steps: [
      'قم بزيارة RikouZone وإنجاز تحدٍّ يومي واحد على الأقل.',
      'حافظ على شعلة الأيام المتتالية (Streak) من الانطفاء.',
      'يُتاح هذا التحدي للإنجاز تلقائياً بمجرد وصول السلسلة لـ 3 أيام فأكثر.'
    ]
  },
  {
    id: 'weekly-content-calendar-sprint',
    title: 'تحدي إعداد خطة محتوى أسبوعية متكاملة',
    description: 'صمم جدولاً يتضمن 5 أفكار لمنشورات وفيديوهات قصيرة وفق مسار القمع التسويقي (وعي، فائدة، تحويل).',
    category: 'weekly',
    type: 'exercise',
    domain: 'social-media',
    domainAr: 'التخطيط وصناعة المحتوى',
    xpReward: 140,
    exerciseData: {
      instructions: 'اكتب عناوين وأهداف 5 منشورات أسبوعية: منشور توعوي، منشور تعليمي لحل مشكلة، قصة نجاح أو تجربة، منشور إجابة على سؤال شائع، ومنشور دعوة لشراء أو تجربة منتجك.',
      verificationCriteria: [
        'يتضمن الخطة 5 أفكار واضحة ومتباينة الأهداف.',
        'تحديد نوع المحتوى (فيديو قصير، منشور نصي، أو إنفوجرافيك).',
        'وجود منشور واحد على الأقل يوجه لصفحة المنتج أو الخدمة (Call to Action).'
      ],
      sampleAnswer: '1. ريلز: 3 أخطاء تدمر إنتاجيتك | 2. كاروسيل: دليلي لتنظيم اليوم | 3. تجربة شخصية: كيف نظمت مهامي | 4. سؤال وجواب: أفضل تطبيق مجاني | 5. عرض خاص: احصل على قالب Notion بخصم 50%.',
      submissionHint: 'اكتب تفاصيل خطتك الأسبوعية بوضوح.'
    }
  }
];

// Rich list of all unlockable badges with exact conditions and bonus rewards
export const allBadgesList: BadgeItem[] = [
  {
    id: 'first-challenge-done',
    name: 'First Step',
    nameAr: 'الخطوة الأولى',
    description: 'Completed your very first challenge in RikouZone',
    descriptionAr: 'أكملت أول تحدٍّ تعليمي بنجاح في RikouZone',
    iconName: 'Award',
    requiredCondition: 'إكمال أي تحدٍّ واحد بنجاح (يومي أو أسبوعي)',
    targetValue: 1,
    isUnlocked: false,
    xpBonus: 25
  },
  {
    id: 'xp-century-100',
    name: '100 XP Club',
    nameAr: 'نادي الـ 100 XP',
    description: 'Earned your first 100 total experience points',
    descriptionAr: 'جمعت أول 100 نقطة خبرة (XP) من أنشطتك التعليمية',
    iconName: 'Sparkles',
    requiredCondition: 'الوصول إلى 100 نقطة XP إجمالية',
    targetValue: 100,
    isUnlocked: false,
    xpBonus: 50
  },
  {
    id: 'first-quiz-mastered',
    name: 'Knowledge Seeker',
    nameAr: 'باحث المعرفة',
    description: 'Successfully passed an educational quiz',
    descriptionAr: 'اجتزت أول اختبار قصير بإجابة صحيحة من المحاولة الأولى',
    iconName: 'HelpCircle',
    requiredCondition: 'إجابة اختبار تعليمي قصير بنجاح',
    targetValue: 1,
    isUnlocked: false,
    xpBonus: 30
  },
  {
    id: 'first-practical-exercise',
    name: 'Hands-on Builder',
    nameAr: 'الصانع العملي',
    description: 'Completed your first practical application exercise',
    descriptionAr: 'أتممت أول تمرين تطبيقي عملي وأثبتّ فهمك بالمعايير',
    iconName: 'Target',
    requiredCondition: 'إنجاز تمرين تطبيقي عملي بنجاح',
    targetValue: 1,
    isUnlocked: false,
    xpBonus: 40
  },
  {
    id: 'challenges-five-completed',
    name: 'Persistent Challenger',
    nameAr: 'المتحدي المثابر',
    description: 'Completed 5 different learning challenges',
    descriptionAr: 'أنجزت 5 تحديات تعليمية مختلفة بنجاح واقتدار',
    iconName: 'CheckCircle2',
    requiredCondition: 'إكمال 5 تحديات تعليمية',
    targetValue: 5,
    isUnlocked: false,
    xpBonus: 75
  },
  {
    id: 'streak-7-days',
    name: 'Unstoppable Flame',
    nameAr: 'شعلة الاستمرارية (7 أيام)',
    description: 'Maintained a 7-day learning streak',
    descriptionAr: 'حافظت على سلسلة نشاط يومي لمدة 7 أيام متتالية دون انقطاع',
    iconName: 'Flame',
    requiredCondition: 'الوصول إلى سلسلة 7 أيام متتالية (7-Day Streak)',
    targetValue: 7,
    isUnlocked: false,
    xpBonus: 100
  },
  {
    id: 'weekly-champion',
    name: 'Weekly Champion',
    nameAr: 'بطل التحديات الأسبوعية',
    description: 'Conquered a full weekly deep challenge',
    descriptionAr: 'أنجزت أول تحدٍّ أسبوعي كبير وأثبتّ التزامك العملي',
    iconName: 'Trophy',
    requiredCondition: 'إكمال تحدٍّ أسبوعي كبير واحد على الأقل',
    targetValue: 1,
    isUnlocked: false,
    xpBonus: 80
  },
  {
    id: 'xp-master-500',
    name: 'Digital Prodigy',
    nameAr: 'خبير RikouZone (500 XP)',
    description: 'Accumulated 500 total XP through persistent learning',
    descriptionAr: 'تجاوزت حاجز 500 نقطة خبرة وأصبحت من رواد المجتمع الرقمي',
    iconName: 'Zap',
    requiredCondition: 'جمع 500 نقطة خبرة (XP) إجمالية',
    targetValue: 500,
    isUnlocked: false,
    xpBonus: 150
  }
];
