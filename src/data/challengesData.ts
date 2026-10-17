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

// Rich list of all 30 unlockable badges with exact conditions and bonus rewards
export const allBadgesList: BadgeItem[] = [
  // --- 1. Existing 8 Badges (Preserved intact) ---
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
    xpBonus: 25,
    category: 'challenges'
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
    xpBonus: 50,
    category: 'xp'
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
    xpBonus: 30,
    category: 'learning'
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
    xpBonus: 40,
    category: 'challenges'
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
    xpBonus: 75,
    category: 'challenges'
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
    xpBonus: 100,
    category: 'streak'
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
    xpBonus: 80,
    category: 'challenges'
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
    xpBonus: 150,
    category: 'xp'
  },

  // --- 2. شارات التعلّم (5 شارات جديدة) ---
  {
    id: 'lessons-1-done',
    name: 'First Step',
    nameAr: 'أول خطوة',
    description: 'Completed your very first educational lesson in RikouZone',
    descriptionAr: 'أكملت أول درس تعليمي عملي في المنصة بنجاح',
    iconName: 'BookOpen',
    requiredCondition: 'إكمال أول درس',
    targetValue: 1,
    isUnlocked: false,
    xpBonus: 25,
    category: 'learning'
  },
  {
    id: 'lessons-5-done',
    name: 'Active Learner',
    nameAr: 'متعلم نشيط',
    description: 'Completed 5 educational lessons across practical tracks',
    descriptionAr: 'أتممت 5 دروس تعليمية وتقدمت في مسارات المهارات',
    iconName: 'GraduationCap',
    requiredCondition: 'إكمال 5 دروس',
    targetValue: 5,
    isUnlocked: false,
    xpBonus: 50,
    category: 'learning'
  },
  {
    id: 'lessons-20-done',
    name: 'Knowledge Enthusiast',
    nameAr: 'عاشق المعرفة',
    description: 'Completed 20 comprehensive learning lessons',
    descriptionAr: 'أنجزت 20 درساً تعليمياً بتعمق وشغف حقيقي',
    iconName: 'Library',
    requiredCondition: 'إكمال 20 درساً',
    targetValue: 20,
    isUnlocked: false,
    xpBonus: 100,
    category: 'learning'
  },
  {
    id: 'lessons-50-done',
    name: 'Learning Expert',
    nameAr: 'خبير التعلّم',
    description: 'Completed 50 in-depth practical lessons in digital skills',
    descriptionAr: 'أتممت 50 درساً واكتسبت رصيداً كبيراً في مختلف المجالات',
    iconName: 'Medal',
    requiredCondition: 'إكمال 50 درساً',
    targetValue: 50,
    isUnlocked: false,
    xpBonus: 200,
    category: 'learning'
  },
  {
    id: 'lessons-100-done',
    name: 'Walking Encyclopedia',
    nameAr: 'موسوعة متنقلة',
    description: 'Completed 100 lessons across all tracks in RikouZone',
    descriptionAr: 'تجاوزت حاجز 100 درس لتصبح مرجعاً حقيقياً في المهارات الرقمية',
    iconName: 'Crown',
    requiredCondition: 'إكمال 100 درس',
    targetValue: 100,
    isUnlocked: false,
    xpBonus: 350,
    category: 'learning'
  },

  // --- 3. شارات الاستمرارية (4 شارات جديدة) ---
  {
    id: 'streak-2-days',
    name: 'Streak Starter',
    nameAr: 'بداية الاستمرارية',
    description: 'Maintained 2 consecutive active days of learning',
    descriptionAr: 'حافظت على يومين متتاليين من النشاط والتعلم وبداية بناء العادة',
    iconName: 'Flame',
    requiredCondition: 'يومان متتاليان من النشاط',
    targetValue: 2,
    isUnlocked: false,
    xpBonus: 30,
    category: 'streak'
  },
  {
    id: 'streak-14-days',
    name: 'Two Weeks Champion',
    nameAr: 'بطل الأسبوعين',
    description: 'Maintained 14 consecutive active days of learning',
    descriptionAr: '14 يوماً متتالياً من الانضباط وترسيخ عادات النجاح دون انقطاع',
    iconName: 'Flame',
    requiredCondition: '14 يوماً متتالياً',
    targetValue: 14,
    isUnlocked: false,
    xpBonus: 150,
    category: 'streak'
  },
  {
    id: 'streak-30-days',
    name: 'Month of Discipline',
    nameAr: 'شهر من الانضباط',
    description: 'Maintained an unbroken 30-day learning streak',
    descriptionAr: 'حافظت على 30 يوماً متتالياً من التعلم اليومي الراسخ',
    iconName: 'Calendar',
    requiredCondition: '30 يوماً متتالياً',
    targetValue: 30,
    isUnlocked: false,
    xpBonus: 300,
    category: 'streak'
  },
  {
    id: 'streak-100-days',
    name: 'Consistency Legend',
    nameAr: 'أسطورة الاستمرارية',
    description: 'Achieved an extraordinary 100-day active learning streak',
    descriptionAr: '100 يوم متتالٍ من الالتزام الإعجازي وبناء المهارات الرقمية',
    iconName: 'Crown',
    requiredCondition: '100 يوم متتالٍ',
    targetValue: 100,
    isUnlocked: false,
    xpBonus: 600,
    category: 'streak'
  },

  // --- 4. شارات التحديات (3 شارات جديدة) ---
  {
    id: 'challenges-10-completed',
    name: 'Determined Challenger',
    nameAr: 'متحدي',
    description: 'Completed 10 daily or weekly learning challenges',
    descriptionAr: 'أنجزت 10 تحديات تعليمية يومية وأسبوعية بنجاح واقتدار',
    iconName: 'CheckCircle2',
    requiredCondition: 'إكمال 10 تحديات',
    targetValue: 10,
    isUnlocked: false,
    xpBonus: 120,
    category: 'challenges'
  },
  {
    id: 'challenges-25-completed',
    name: 'Challenges Champion',
    nameAr: 'بطل التحديات',
    description: 'Conquered 25 practical challenges across platform paths',
    descriptionAr: 'اجتزت 25 تحدياً عملياً في مختلف مسارات المنصة بنجاح',
    iconName: 'Trophy',
    requiredCondition: 'إكمال 25 تحدياً',
    targetValue: 25,
    isUnlocked: false,
    xpBonus: 250,
    category: 'challenges'
  },
  {
    id: 'challenges-50-completed',
    name: 'King of Challenges',
    nameAr: 'ملك التحديات',
    description: 'Achieved mastery by completing 50 learning challenges',
    descriptionAr: 'حققت إنجازاً ضخماً بإكمال 50 تحدياً تطبيقياً كاملاً',
    iconName: 'Crown',
    requiredCondition: 'إكمال 50 تحدياً',
    targetValue: 50,
    isUnlocked: false,
    xpBonus: 450,
    category: 'challenges'
  },

  // --- 5. شارات XP (3 شارات جديدة) ---
  {
    id: 'xp-pro-1000',
    name: 'Pro Achiever',
    nameAr: 'محترف',
    description: 'Surpassed 1,000 total experience points in RikouZone',
    descriptionAr: 'تجاوزت حاجز 1,000 نقطة خبرة XP وأثبتّ جدارتك المهنية',
    iconName: 'Zap',
    requiredCondition: 'الوصول إلى 1,000 XP',
    targetValue: 1000,
    isUnlocked: false,
    xpBonus: 250,
    category: 'xp'
  },
  {
    id: 'xp-expert-2500',
    name: 'Elite Expert',
    nameAr: 'خبير',
    description: 'Accumulated 2,500 total XP through persistent learning',
    descriptionAr: 'جمعت 2,500 نقطة خبرة XP لتصبح في مصاف نخبة المتعلمين',
    iconName: 'Sparkles',
    requiredCondition: 'الوصول إلى 2,500 XP',
    targetValue: 2500,
    isUnlocked: false,
    xpBonus: 450,
    category: 'xp'
  },
  {
    id: 'xp-legend-5000',
    name: 'RikouZone Legend',
    nameAr: 'أسطورة RikouZone',
    description: 'Reached the summit of achievement with 5,000 XP',
    descriptionAr: 'حطمت حاجز 5,000 XP وبلغت قمة هرم المنجزين الرقميين',
    iconName: 'Crown',
    requiredCondition: 'الوصول إلى 5,000 XP',
    targetValue: 5000,
    isUnlocked: false,
    xpBonus: 750,
    category: 'xp'
  },

  // --- 6. شارات المسارات (5 شارات جديدة) ---
  {
    id: 'paths-1-started',
    name: 'Track Explorer',
    nameAr: 'مستكشف',
    description: 'Started your first comprehensive practical learning path',
    descriptionAr: 'بدأت رحلتك في أول مسار تعلّم عملي لاكتساب مهارات حقيقية',
    iconName: 'Compass',
    requiredCondition: 'بدء أول مسار تعلّم',
    targetValue: 1,
    isUnlocked: false,
    xpBonus: 30,
    category: 'paths'
  },
  {
    id: 'paths-1-completed',
    name: 'On the Road',
    nameAr: 'على الطريق',
    description: 'Successfully completed your first full learning path',
    descriptionAr: 'أكملت أول مسار تعلّم بالكامل وأتقنت مهاراته الأساسية',
    iconName: 'Milestone',
    requiredCondition: 'إكمال أول مسار',
    targetValue: 1,
    isUnlocked: false,
    xpBonus: 100,
    category: 'paths'
  },
  {
    id: 'paths-3-completed',
    name: 'Multi-Skilled',
    nameAr: 'متعدد المهارات',
    description: 'Completed 3 full learning paths across disciplines',
    descriptionAr: 'أتممت 3 مسارات كاملة لتجمع بين مهارات رقمية متكاملة',
    iconName: 'Layers',
    requiredCondition: 'إكمال 3 مسارات',
    targetValue: 3,
    isUnlocked: false,
    xpBonus: 200,
    category: 'paths'
  },
  {
    id: 'paths-5-completed',
    name: 'Specialist',
    nameAr: 'متخصص',
    description: 'Mastered 5 complete learning tracks in RikouZone',
    descriptionAr: 'أنهيت 5 مسارات تعلّم شاملة وأصبحت محترفاً متمكناً في مجالك',
    iconName: 'ShieldCheck',
    requiredCondition: 'إكمال 5 مسارات',
    targetValue: 5,
    isUnlocked: false,
    xpBonus: 350,
    category: 'paths'
  },
  {
    id: 'paths-10-completed',
    name: 'Master of Tracks',
    nameAr: 'سيد المسارات',
    description: 'Completed 10 full learning tracks across the platform',
    descriptionAr: 'حققت إنجازاً مبهراً بإكمال 10 مسارات تعلّم مختلفة في المنصة',
    iconName: 'Crown',
    requiredCondition: 'إكمال 10 مسارات',
    targetValue: 10,
    isUnlocked: false,
    xpBonus: 600,
    category: 'paths'
  },

  // --- 7. شارات الإنجازات الخاصة (2 شارتان جديدتان) ---
  {
    id: 'quiz-perfect-score',
    name: 'High Precision',
    nameAr: 'دقة عالية',
    description: 'Achieved a 100% perfect score on an educational quiz',
    descriptionAr: 'أحرزت العلامة الكاملة في اختبار قصير دون أي خطأ',
    iconName: 'Star',
    requiredCondition: 'الحصول على نتيجة كاملة في اختبار',
    targetValue: 1,
    isUnlocked: false,
    xpBonus: 50,
    category: 'special'
  },
  {
    id: 'badges-collector-10',
    name: 'Badge Collector',
    nameAr: 'جامع الشارات',
    description: 'Unlocked 10 distinct achievement badges across RikouZone',
    descriptionAr: 'جمعت 10 شارات تميز مختلفة لتثبت تنوع إنجازاتك واجتهادك',
    iconName: 'BookmarkCheck',
    requiredCondition: 'الحصول على 10 شارات مختلفة',
    targetValue: 10,
    isUnlocked: false,
    xpBonus: 150,
    category: 'special'
  }
];
