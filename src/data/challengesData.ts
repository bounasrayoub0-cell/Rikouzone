import { ChallengeTask, BadgeItem } from './challengesDataTypes';

export const dailyChallengePool: ChallengeTask[] = [
  {
    id: 'daily-lesson-review',
    title: 'قراءة وفهم درس تعليمي تطبيقي',
    description: 'اختر درساً واحداً من أي مسار تعليمي في RikouZone (مثل بيع القوالب، كتابة الإعلانات، أو الذكاء الاصطناعي) واقرأ مفاهيمه الأساسية.',
    category: 'daily',
    type: 'lesson',
    xpReward: 30,
    steps: [
      'انتقل إلى قسم مسارات التعلم.',
      'افتح أي مسار مثل بيع القوالب الجاهزة أو صناعة المحتوى.',
      'اقرأ الدرس الأول وركّز على خطوات التنفيذ.',
      'عد إلى هنا وأكّد إتمام القراءة للحصول على الـ XP.'
    ],
    actionLink: {
      tab: 'income',
      label: 'تصفح مسارات التعلم'
    }
  },
  {
    id: 'daily-quiz-challenge',
    title: 'اختبار الفهم الرقمي السريع',
    description: 'أجب بشكل صحيح عن سؤال اختبار اليوم لقياس فهمك لمفاهيم العمل الحر والتجارة الرقمية الحديثة.',
    category: 'daily',
    type: 'quiz',
    xpReward: 40,
    quizData: {
      question: 'ما هي الطريقة الصحيحة لمشاركة قوالب Canva للبيع التجاري دون إتلاف الملف الأصلي وتجنب اشتراك المشتري في Canva Pro؟',
      options: [
        'إرسال كلمة سر الحساب للمشتري',
        'مشاركة رابط القالب الحصري (Template Link) واستخدام عناصر وخطوط مجانية 100%',
        'تنزيل التصميم بصيغة صورة منخفضة الجودة ومشاركتها بالواتساب',
        'مشاركة رابط التعاون المباشر بصلاحية التعديل'
      ],
      correctIndex: 1,
      explanation: 'رابط Template Link يضمن استنساخ نسخة مستقلة في حساب العميل، والاعتماد على عناصر مجانية يتيح له تعديلها دون دفع رسوم اشتراك إضافية.'
    }
  },
  {
    id: 'daily-exercise-hook',
    title: 'تطبيق عملي: صياغة هوك (Hook) فيروسي لمحتوى قصير',
    description: 'صغ خطافاً (Hook) مدته 3 ثوانٍ لفيديو تيك توك أو ريلز يحل مشكلة يومية لجمهور محدد وفق شروط التحقق.',
    category: 'daily',
    type: 'exercise',
    xpReward: 50,
    exerciseData: {
      instructions: 'اكتب هوك في جملة واحدة يخاطب ألماً حقيقياً (مثل: توفير الوقت، أو تنظيم المهام، أو تفادي خسارة المال) بدون مبالغات وهمية.',
      verificationCriteria: [
        'يحتوي على فئة مستهدفة واضحة أو مشكلة محددة.',
        'يقل طوله عن 20 كلمة ليناسب أول 3 ثوانٍ من الفيديو.',
        'لا يحتوي على وعود ثراء سريع كاذبة.'
      ],
      sampleAnswer: 'إذا كنت طالباً جامعياً وتتراكم عليك مواعيد تسليم الواجبات كل أسبوع، فهذا النظام يحل المشكلة في 5 دقائق 📚'
    }
  },
  {
    id: 'daily-explore-tools',
    title: 'تجربة أداة أو حاسبة رقمية مجانية',
    description: 'استكشف إحدى الحاسبات الرقمية أو أدوات الذكاء الاصطناعي في RikouZone وجرب إدخال بيانات حقيقية.',
    category: 'daily',
    type: 'skill',
    xpReward: 35,
    steps: [
      'انتقل لصفحة الأدوات الرقمية أو Rikou AI.',
      'اختر حاسبة أرباح يوتيوب، أو حاسبة التسعير، أو أداة توليد الأفكار.',
      'قم بتجربة حسابية عملية لتقدير تكاليف أو دخل مشروعك.',
      'عد لتأكيد إتمام التجربة.'
    ],
    actionLink: {
      tab: 'tools',
      label: 'فتح صفحة الأدوات الرقمية'
    }
  },
  {
    id: 'daily-quiz-notion',
    title: 'اختبار سريع: قواعد بيانات Notion',
    description: 'أجب عن سؤال اليوم في هندسة قوالب Notion لتثبيت معلوماتك البرمجية والعملية.',
    category: 'daily',
    type: 'quiz',
    xpReward: 40,
    quizData: {
      question: 'أي خاصية (Property) في Notion تسمح بربط جدول المواد بجدول الواجبات تلقائياً؟',
      options: [
        'خاصية Text العادية',
        'خاصية Relation (العلاقة المترابطة)',
        'خاصية Multi-select',
        'خاصية Number'
      ],
      correctIndex: 1,
      explanation: 'خاصية Relation تسمح بربط قواعد البيانات ببعضها البعض، مما يتيح تجميع الواجبات الخاصة بكل مادة داخل صفحتها تلقائياً.'
    }
  }
];

export const weeklyChallengePool: ChallengeTask[] = [
  {
    id: 'weekly-project-sprint',
    title: 'إنجاز مشروع تطبيقي متكامل (Mini Project)',
    description: 'اختر مشروعاً تطبيقياً واحداً من المسارات (مثل بناء صفحة منتج على Payhip، أو قالب Notion Student Planner، أو حزمة Canva) وأتمم خطواته.',
    category: 'weekly',
    type: 'exercise',
    xpReward: 150,
    steps: [
      'حدد المشروع المستهدف من مسار بيع القوالب أو المنتجات الرقمية.',
      'نفذ المراحل الأساسية الثلاث (التخطيط، التصميم، وتجهيز ملف التسليم).',
      'تأكد من مطابقة شروط التراخيص والاستخدام المجاني.',
      'قم بتأكيد إنجاز المشروع للحصول على المكافأة الأسبوعية الكبرى.'
    ],
    actionLink: {
      tab: 'income',
      label: 'فتح مسارات المشاريع'
    },
    exerciseData: {
      instructions: 'تأكد من إكمال جميع أجزاء المشروع، وتجهيز رابط فعال أو ملف تسليم PDF حقيقي.',
      verificationCriteria: [
        'تم بناء هيكل المنتج الرقمي أو القالب.',
        'يتضمن ملف التسليم رابطاً آمناً وشروط الاستخدام.',
        'جاهز للاستخدام الفعلي من قبل العميل.'
      ],
      sampleAnswer: 'تم تصميم قالب الطالب على Notion وتجهيز رابط النشر عبر Publish to web مع تفعيل Duplicate بنجاح.'
    }
  },
  {
    id: 'weekly-quiz-master',
    title: 'اختبار الكفاءة الرقمية الأسبوعي',
    description: 'اجتز اختبار التحدي الأسبوعي متعدد الأسئلة لإثبات تمكنك من أساسيات التجارة الرقمية وصناعة المحتوى.',
    category: 'weekly',
    type: 'quiz',
    xpReward: 120,
    quizData: {
      question: 'لماذا يُفضل الاعتماد على منصات مثل Payhip للمبتدئين في المغرب بدلاً من Etsy في المرحلة الأولى؟',
      options: [
        'لأن Etsy تمنع بيع الملفات الإلكترونية نهائياً',
        'لأن Payhip تقبل البائعين من المغرب دون قيود، وتتيح متجراً مجانياً 100% بعمولة 5% مع ربط PayPal المباشر',
        'لأن Payhip تطبع المنتجات وتوزعها في المنازل مجاناً',
        'لأن جميع المشترين حول العالم لا يستخدمون إلا Payhip'
      ],
      correctIndex: 1,
      explanation: 'Payhip متاح ومجاني للبائعين المقيمين في المغرب والدول العربية بدون اشتراكات شهرية مسبقة، بينما تواجه حسابات Etsy الجديدة قيوداً على بوابات الدفع المحلية في المغرب حالياً.'
    }
  },
  {
    id: 'weekly-streak-dedication',
    title: 'تحدي الالتزام الأسبوعي (3 أيام نشاط)',
    description: 'حافظ على استمرارية التعلم والتطبيق لأكثر من 3 أيام خلال هذا الأسبوع.',
    category: 'weekly',
    type: 'skill',
    xpReward: 100,
    steps: [
      'قم بزيارة الموقع يومياً وإنجاز تحدٍّ يومي واحد على الأقل.',
      'حافظ على استمرار السلسلة (Streak) دون انقطاع.',
      'سيتم تفعيل المكافأة تلقائياً عند وصول streak الأسبوع إلى 3 أيام فأكثر.'
    ]
  }
];

export const allBadgesList: BadgeItem[] = [
  {
    id: 'first-challenge-done',
    name: 'First Step',
    nameAr: 'الخطوة الأولى',
    description: 'Completed your very first challenge in RikouZone',
    descriptionAr: 'أكملت أول تحدٍّ تعليمي بنجاح في RikouZone',
    iconName: 'Award',
    requiredCondition: 'إكمال تحدٍّ واحد (يومي أو أسبوعي)',
    isUnlocked: false,
    xpBonus: 25
  },
  {
    id: 'xp-century-100',
    name: '100 XP Club',
    nameAr: 'نادي الـ 100 XP',
    description: 'Earned 100 total experience points',
    descriptionAr: 'جمعت أول 100 نقطة خبرة (XP) من الأنشطة',
    iconName: 'Sparkles',
    requiredCondition: 'الوصول إلى 100 نقطة XP إجمالية',
    isUnlocked: false,
    xpBonus: 50
  },
  {
    id: 'challenges-five-completed',
    name: 'Challenger',
    nameAr: 'المتحدي المثابر',
    description: 'Completed 5 challenges',
    descriptionAr: 'أنجزت 5 تحديات تعليمية مختلفة',
    iconName: 'CheckCircle2',
    requiredCondition: 'إكمال 5 تحديات بنجاح',
    isUnlocked: false,
    xpBonus: 75
  },
  {
    id: 'streak-7-days',
    name: 'Unstoppable Streak',
    nameAr: 'شعلة الاستمرارية (7 أيام)',
    description: 'Maintained a 7-day learning streak',
    descriptionAr: 'حافظت على سلسلة نشاط يومي لمدة 7 أيام متتالية',
    iconName: 'Flame',
    requiredCondition: 'سلسلة 7 أيام متتالية دون انقطاع',
    isUnlocked: false,
    xpBonus: 100
  },
  {
    id: 'first-quiz-mastered',
    name: 'Knowledge Seeker',
    nameAr: 'طالب المعرفة',
    description: 'Successfully passed your first educational quiz',
    descriptionAr: 'اجتزت أول اختبار قصير بإجابة صحيحة',
    iconName: 'HelpCircle',
    requiredCondition: 'إجابة اختبار قصير بنجاح',
    isUnlocked: false,
    xpBonus: 30
  },
  {
    id: 'first-practical-exercise',
    name: 'Practical Builder',
    nameAr: 'الصانع العملي',
    description: 'Completed your first hands-on application exercise',
    descriptionAr: 'أتممت أول تمرين تطبيقي عملي بنجاح',
    iconName: 'Target',
    requiredCondition: 'إتمام تمرين تطبيقي عملي',
    isUnlocked: false,
    xpBonus: 40
  }
];
