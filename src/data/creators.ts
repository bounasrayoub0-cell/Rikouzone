export interface CreatorPlatformGuide {
  id: string;
  name: string;
  arabicName: string;
  frenchName: string;
  icon: string;
  taglineAr: string;
  taglineEn: string;
  monetization: {
    requirements: string[];
    arabicRequirements: string[];
    payoutMethods: string[];
    arabicPayoutMethods: string[];
    potentialRpm: string;
  };
  growthHacks: {
    titleAr: string;
    titleEn: string;
    detailAr: string;
    detailEn: string;
  }[];
  bestFormats: {
    nameAr: string;
    nameEn: string;
    descriptionAr: string;
    descriptionEn: string;
  }[];
  gearAndTools: string[];
}

export const creatorGuides: CreatorPlatformGuide[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    arabicName: 'يوتيوب (YouTube)',
    frenchName: 'YouTube',
    icon: 'Youtube',
    taglineAr: 'أقوى منصة لبناء دخل سلبي تراكمي طويل الأمد وعلامة تجارية راسخة.',
    taglineEn: 'The undisputed gold standard for evergreen passive income and authority.',
    monetization: {
      requirements: [
        '1,000 Subscribers',
        '4,000 Valid Public Watch Hours (past 12 months) OR 10M Shorts views (past 90 days)',
        'Active Google AdSense account linked',
        'Compliance with YouTube Community Guidelines'
      ],
      arabicRequirements: [
        '1,000 مشترك في القناة',
        '4,000 ساعة مشاهدة علنية صالحة خلال آخر 12 شهراً، أو 10 ملايين مشاهدة شورتس خلال 90 يوماً',
        'ربط حساب Google AdSense معتمد ونشط',
        'الالتزام الصارم بسياسات إرشادات المنتدى وحقوق الطبع والنشر'
      ],
      payoutMethods: ['Google AdSense Direct Bank Wire', 'Sponsorships', 'Channel Memberships', 'Affiliate Links in Descriptions'],
      arabicPayoutMethods: ['التحويل البنكي المباشر من Google AdSense', 'عقود الرعايات مع الشركات', 'عضويات القناة المدفوعة (Memberships)', 'روابط التسويق بالعمولة في الوصف'],
      potentialRpm: '$1.50 - $12.00 / 1K views'
    },
    growthHacks: [
      {
        titleAr: 'قاعدة الـ 30 ثانية الأولى (Retention Anchor)',
        titleEn: 'First 30 Seconds Retention Anchor',
        detailAr: 'احذف المقدمات الطويلة والتترات تماماً. ادخل مباشرة في الوعد الذي قطعته في العنوان والصورة المصغرة.',
        detailEn: 'Eliminate fancy animated channel intros. Fulfill the premise of the thumbnail in the first 5 seconds.'
      },
      {
        titleAr: 'اختبار العناوين والصور المصغرة (A/B Testing)',
        titleEn: 'Thumbnail & Title A/B Optimization',
        detailAr: 'استخدم ميزة يوتيوب التجريبية لاختبار صورتين مصغرتين لكل فيديو لمعرفة أي تصميم يحقق نسبة CTR أعلى.',
        detailEn: 'Leverage YouTube multi-thumbnail testing to maximize CTR during the critical first 48 hours.'
      },
      {
        titleAr: 'ربط الفيديوهات بحلقات مغلقة (End Screen Funnel)',
        titleEn: 'End Screen Binge Loops',
        detailAr: 'لا تقل "شكراً على المشاهدة" حتى لا يغلق المشاهد الفيديو، بل قل "إذا أحببت هذا التكتيك، شاهد هذا الفيديو المكمل فوراً".',
        detailEn: 'Never signal you are closing the video. Transition directly to an adjacent related video card.'
      }
    ],
    bestFormats: [
      {
        nameAr: 'الفيديوهات الوثائقية والاستقصائية',
        nameEn: 'Deep-Dive Documentaries',
        descriptionAr: 'فيديوهات مدتها 15-30 دقيقة تركز على قصة غامضة أو تفكيك لشركة أو حدث تاريخي مع مونتاج سينمائي.',
        descriptionEn: '15-30 minute well-researched narrative essays with high production value.'
      },
      {
        nameAr: 'الشروحات العملية خطوة بخطوة',
        nameEn: 'Step-by-Step Practical Masterclasses',
        descriptionAr: 'دروس تمنح فائدة فورية قابلة للتطبيق وحل مشكلة برمجية أو تقنية أو تصميمية.',
        descriptionEn: 'Screen recordings and step-by-step solutions to high-volume search queries.'
      }
    ],
    gearAndTools: ['Premiere Pro / DaVinci Resolve', 'Rode Wireless ME / Shure MV7', 'VidIQ / TubeBuddy', 'Canva / Photoshop']
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    arabicName: 'تيك توك (TikTok)',
    frenchName: 'TikTok',
    icon: 'Music2',
    taglineAr: 'أسرع محرك انتشار فيروسي عضوي في العالم للمقاطع القصيرة والمبيعات المباشرة.',
    taglineEn: 'The fastest organic discovery and viral distribution engine on earth.',
    monetization: {
      requirements: [
        '10,000 Followers',
        '100,000 video views in the last 30 days',
        'Videos must be original and over 1 minute long for Creator Rewards Program',
        'Account based in eligible regions'
      ],
      arabicRequirements: [
        '10,000 متابع على الحساب',
        '100,000 مشاهدة على الأقل في آخر 30 يوماً',
        'أن تكون الفيديوهات أصلية وغير مكررة وتتجاوز مدتها دقيقة كاملة لبرنامج مكافآت المبدعين',
        'أن يكون الحساب مؤهلاً بحسب الدولة أو عبر حسابات منشئي المحتوى العالمية'
      ],
      payoutMethods: ['TikTok Creator Rewards Program', 'TikTok Shop Affiliate', 'LIVE Gifts & Diamonds', 'Brand Collaborations'],
      arabicPayoutMethods: ['برنامج مكافآت المبدعين (Creator Rewards)', 'أفيلييت تيك توك شوب (TikTok Shop)', 'هدايا البث المباشر (LIVE Diamonds)', 'حملات الرعاية والشراكات'],
      potentialRpm: '$0.40 - $1.80 / 1K qualified views'
    },
    growthHacks: [
      {
        titleAr: 'الهوك البصري والصوتي المتزامن',
        titleEn: 'Visual & Auditory Dual Hook',
        detailAr: 'أظهر حركة سريعة أو شيئاً غير مألوف على الشاشة في أول ثانية تزامناً مع نص مثير للجدل أو السؤال.',
        detailEn: 'Pair visual motion in frame 1 with a contrasting verbal question to trigger freeze-scrolling.'
      },
      {
        titleAr: 'حلقة الفيديو اللانهائية (Perfect Seamless Loop)',
        titleEn: 'Seamless Loop Mechanics',
        detailAr: 'اجعل الجملة الأخيرة في الفيديو تكمل بداية الجملة الأولى بحيث يعيد المشاهد المقطع دون أن يشعر.',
        detailEn: 'Script your outro so it grammatically completes your intro sentence for 120%+ average watch time.'
      }
    ],
    bestFormats: [
      {
        nameAr: 'مقارنات وتجارب المنتجات العفوية',
        nameEn: 'Unfiltered Product Showdowns',
        descriptionAr: 'اختبار أجهزة أو أدوات ذكية بأسلوب عفوي بدون مبالغة تسويقية تثير الشكوك.',
        descriptionEn: 'Authentic hands-on trials exposing strengths and weaknesses of trending items.'
      },
      {
        nameAr: 'القصص والتحولات الحياتية السريعة (Storytime)',
        nameEn: 'Fast-Paced Storytelling',
        descriptionAr: 'سرد حكاية مشوقة خلال تحضير شيء أو أثناء اللعب بأسلوب إيقاعي سريع.',
        descriptionEn: 'Engaging real stories narrated over dynamic gameplay or preparation background loops.'
      }
    ],
    gearAndTools: ['CapCut Mobile / Desktop', 'Smartphone 4K 60FPS', 'Clip-on Wireless Mic', 'TikTok Creative Center']
  },
  {
    id: 'freefire',
    name: 'Free Fire Specialized',
    arabicName: 'فري فاير (Free Fire Hub)',
    frenchName: 'Free Fire Hub',
    icon: 'Flame',
    taglineAr: 'دليل صناعة المحتوى المتفجر لعشاق فري فاير في الشرق الأوسط وشمال أفريقيا.',
    taglineEn: 'The dominant mobile battle royale creator blueprint across MENA and global communities.',
    monetization: {
      requirements: [
        'High engagement and viral reach on TikTok, Shorts, and Facebook',
        'Application to Garena Official Partner Program (Free Fire Influencer/Partner)',
        'Custom room sponsorships and diamond giveaways partnerships',
        'Streaming donations and ad revenue'
      ],
      arabicRequirements: [
        'تفاعل قوي ومستمر على تيك توك وشورتس وفيسبوك',
        'التقديم على برنامج شراكة جارينا الرسمي (V-Badge Influencer) بعد الوصول لـ 100k متابع',
        'رعايات تنظيم الرومات والبطولات وتوزيع الجواهر برعاية متاجر الشحن',
        'أرباح التبرعات في البثوث وإعلانات يوتيوب ادسنس'
      ],
      payoutMethods: ['Garena Monthly Diamonds & Salary (V-Badge partners)', 'Superchats & Stream Donations', 'Merchandise & Clan Merch', 'Gaming Tournaments'],
      arabicPayoutMethods: ['راتب شهري وجواهر رسمية من شركة جارينا لشركاء الشارة V', 'دعم التبرعات والنجوم في البثوث المباشرة', 'شراكات مع منصات ومتاجر شحن الألعاب المعتمدة', 'جوائز تنظيم بطولات الكلان والسكواد'],
      potentialRpm: '$0.80 - $3.20 / 1K views'
    },
    growthHacks: [
      {
        titleAr: 'سحر مقاطع الوان تاب والـ Beat Sync',
        titleEn: '1-Tap Beat Sync Synchronization',
        detailAr: 'اربط صوت طلقة الشوتجان أو الـ Desert Eagle بالضبط مع ضربة الإيقاع العالي في الأغنية الرائجة مع تأثير هز الشاشة.',
        detailEn: 'Time the headshot hit sound and damage numbers precisely with the drop of a trending sound.'
      },
      {
        titleAr: 'محتوى إعدادات الهواتف الشعبية (DPI & Sensitivity)',
        titleEn: 'Phone-Specific Sensitivity Guides',
        detailAr: 'العناوين التي تحتوي على موديل هاتف محدد (مثل: أفضل حساسية لهاتف Redmi Note أو Samsung A) تحصد بحثاً دائماً لا يتوقف.',
        detailEn: 'Targeting specific popular budget phones in video titles generates continuous evergreen search traffic.'
      }
    ],
    bestFormats: [
      {
        nameAr: 'تحديات الرومات والـ 1v1 ضد لاعبين مشهورين',
        nameEn: '1v1 Custom Room Showdowns',
        descriptionAr: 'مواجهات فردية مشتعلة بالتعليق الحماسي وكشف أسرار حركة الخصم.',
        descriptionEn: 'Intense 1-on-1 matches featuring tactical gloo wall movement and energetic commentary.'
      },
      {
        nameAr: 'تسريبات السكنات والتحديثات الحصرية',
        nameEn: 'Exclusive Event & Skin Leaks',
        descriptionAr: 'استعراض أحدث الأسلحة التطورية والرقصات قبل نزولها في السيرفر الرسمي.',
        descriptionEn: 'Early gameplay showcasing evolutionary weapon skins and developer server features.'
      }
    ],
    gearAndTools: ['High Touch-Sampling Smartphone (120Hz)', 'Screen Recorder Pro (60/120 FPS)', 'CapCut', 'Discord Community']
  },
  {
    id: 'instagram',
    name: 'Instagram',
    arabicName: 'انستغرام (Instagram & Reels)',
    frenchName: 'Instagram & Reels',
    icon: 'Instagram',
    taglineAr: 'بيئة بناء البراند الشخصي الأنيق والبيع المباشر عبر الرسائل وأتمتة الـ DMs.',
    taglineEn: 'The epicenter of personal branding, high-ticket consulting, and DM conversational funnels.',
    monetization: {
      requirements: [
        'Consistent aesthetic reel uploads and active stories',
        'ManyChat DM automation integration',
        'Direct digital product funnels (Guides, Checklists)',
        'Brand collaborations and affiliate partnerships'
      ],
      arabicRequirements: [
        'نشر ريلز دوري مستمر مع تفاعل يومي في الستوري',
        'ربط أدوات أتمتة الرسائل (ManyChat) لتحويل المعلقين إلى مشترين',
        'امتلاك رابط مباشر لمنتجك الرقمي في البايو أو النشرة البريدية',
        'بناء جمهور مستهدف يجذب رعايات البراندات'
      ],
      payoutMethods: ['Digital Product Sales via Gumroad / Salla', 'DM Automation High-Ticket Closes', 'Brand Sponsorships', 'Affiliate Links in Bio'],
      arabicPayoutMethods: ['مبيعات المنتجات الرقمية والكتب عبر Gumroad أو سلة', 'إغلاق صفقات استشارات عالية السعر عبر الرسائل', 'رعايات العلامات التجارية والإعلانات', 'روابط التسويق بالعمولة في البايو'],
      potentialRpm: '$15 - $100+ per conversion'
    },
    growthHacks: [
      {
        titleAr: 'تكتيك تحفيز التعليق بالكلمة السرية (ManyChat Trigger)',
        titleEn: 'Keyword Comment Trigger Loop',
        detailAr: 'قل في الفيديو: "اكتب كلمة (دليل) في التعليقات لأرسل لك الرابط فوراً في الخاص". هذا يضاعف التعليقات ويدفع الخوارزمية لترشيح الفيديو.',
        detailEn: 'Say "Comment \'GUIDE\' to get the direct blueprint sent to your DM instantly." This spikes algorithm comments.'
      },
      {
        titleAr: 'الريلز التعليمي من 7 ثوانٍ مع نص عميق في الكابشن',
        titleEn: '7-Second Micro-Reels with Dense Caption',
        detailAr: 'ضع مقطعاً بصرياً جذاباً مدته 6-8 ثوانٍ واكتب "اقرأ الكابشن للتفاصيل". بينما يقرأ المتابع، يتكرر الفيديو 3 مرات مما يرفع نسبة البقاء لـ 300%.',
        detailEn: 'Use an aesthetic short clip and instruct viewers to read the caption, forcing multiple background video loops.'
      }
    ],
    bestFormats: [
      {
        nameAr: 'منشورات الكاروسيل التثقيفية المنظمة',
        nameEn: 'Educational Value Carousels',
        descriptionAr: 'شرائح معلوماتية مرتبة بأناقة تجبر المشاهد على حفظ المنشور والرجوع إليه لاحقاً.',
        descriptionEn: 'Multi-slide step-by-step frameworks that drive exceptionally high bookmark and save rates.'
      }
    ],
    gearAndTools: ['Canva Pro', 'CapCut', 'ManyChat', 'Lightroom Presets']
  },
  {
    id: 'facebook',
    name: 'Facebook Pages',
    arabicName: 'فيسبوك والصفحات (Facebook)',
    frenchName: 'Facebook & Pages',
    icon: 'Share2',
    taglineAr: 'منصة المشاركات الفيروسية الجماعية وأرباح الإعلانات المضمنة في الفيديو.',
    taglineEn: 'The heavyweight of social shares, community groups, and long-form video ad revenue.',
    monetization: {
      requirements: [
        '10,000 Followers on Facebook Page (or 5,000 in professional mode)',
        '60,000 total eligible minutes viewed in the last 60 days',
        'At least 5 active videos on the page',
        'Compliance with Partner Monetization Policies'
      ],
      arabicRequirements: [
        '10,000 متابع على الصفحة العامة (أو 5,000 في الوضع الاحترافي)',
        '60,000 دقيقة مشاهدة مؤهلة خلال آخر 60 يوماً',
        '5 فيديوهات نشطة على الأقل منشورة على الصفحة',
        'الالتزام الصارم بسياسات تحقيق الأرباح للشركاء وسياسة أصالة المحتوى'
      ],
      payoutMethods: ['In-Stream Ads for On-Demand', 'Facebook Reels Performance Bonus', 'Stars and Direct Fan Support'],
      arabicPayoutMethods: ['إعلانات الفيديو المضمنة (In-Stream Ads)', 'مكافآت فيسبوك ريلز التفاعلية', 'نجوم الدعم المباشر في البثوث'],
      potentialRpm: '$1.00 - $4.50 / 1K views'
    },
    growthHacks: [
      {
        titleAr: 'سرد القصص العاطفية والتجارب الواقعية',
        titleEn: 'Emotional Story Arcs',
        detailAr: 'جمهور فيسبوك يحب القصص الإنسانية، التحديات العائلية، والتجارب الاجتماعية التي تحفز كتابة تعليقات طويلة ومشاركة المقاطع.',
        detailEn: 'Facebook audiences favor empathy and suspense that spark conversations in the comments.'
      }
    ],
    bestFormats: [
      {
        nameAr: 'الفيديوهات الحوارية والتجارب الاجتماعية',
        nameEn: 'Conversational Social Experiments',
        descriptionAr: 'مقاطع بطول 3 إلى 7 دقائق تطرح معضلة أخلاقية أو تجربة مثيرة للجدل الإيجابي.',
        descriptionEn: '3 to 7 minute social scenarios that generate fierce debate and high share velocity.'
      }
    ],
    gearAndTools: ['Meta Business Suite', 'Premiere Pro', 'Lavalier Microphone']
  },
  {
    id: 'gaming',
    name: 'General Gaming & Esports',
    arabicName: 'عالم الألعاب الشامل (Gaming & Esports)',
    frenchName: 'Gaming & Esports Global',
    icon: 'Gamepad2',
    taglineAr: 'تحويل ساعات اللعب إلى محتوى ترفيهي جذاب مع بطولات ومجتمعات ديسكورد حماسية.',
    taglineEn: 'Transform gameplay sessions into magnetic entertainment with esports communities.',
    monetization: {
      requirements: [
        'Consistent streaming schedule and interactive chat engagement',
        'Twitch Affiliate (50 followers, 3 avg viewers) or YouTube Partner',
        'Esports tournament prize pools and sponsor branding'
      ],
      arabicRequirements: [
        'جدول بث مباشر منتظم وتفاعل نشط ومستمر مع الشات',
        'تفعيل برنامج شركاء تويتش أو يوتيوب جيمنج',
        'جوائز البطولات التنافسية ورعايات أجهزة الألعاب'
      ],
      payoutMethods: ['Twitch Subscriptions & Bits', 'YouTube Memberships & SuperChats', 'Hardware Brand Sponsorships'],
      arabicPayoutMethods: ['اشتراكات القناة والدعم المباشر (SuperChats)', 'رعايات شركات كراسي الجيمنج والسماعات والمشروبات', 'جوائز بطولات الرياضات الإلكترونية'],
      potentialRpm: '$2.00 - $6.00 / 1K views'
    },
    growthHacks: [
      {
        titleAr: 'تحويل اللقطات الطريفة (Fails & Clutches) إلى شورتس يومية',
        titleEn: 'Repurposing Funny Fails into Shorts',
        detailAr: 'لا تعتمد على المشاهدات من البث المباشر وحده. قص أطرف 3 لقطات من كل بث وانشرها على تيك توك لجلب مشاهدين جدد.',
        detailEn: 'Cut your top 3 funniest reaction moments from every stream and distribute them across Shorts and TikTok.'
      }
    ],
    bestFormats: [
      {
        nameAr: 'تحديات الألعاب المجنونة وشروط اللعب الصعبة',
        nameEn: 'Ridiculous Gameplay Challenge Runs',
        descriptionAr: 'إنهاء مهام مستحيلة بأسلحة ضعيفة أو بدون أدوات مساعدة مع مونتاج كوميدي.',
        descriptionEn: 'Completing absurd in-game challenges with humorous pacing and editing.'
      }
    ],
    gearAndTools: ['OBS Studio', 'Elgato Stream Deck', 'Dual Monitors', 'High Refresh-Rate Screen']
  }
];
