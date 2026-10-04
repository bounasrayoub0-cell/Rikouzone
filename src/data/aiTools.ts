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
    promptPrefixAr: 'اقترح لي 10 أفكار محتوى مبتكرة وفيروسية لمجال: ',
    promptPrefixEn: 'Give me 10 viral and high-retention content ideas about: ',
    promptPrefixFr: 'Donne-moi 10 idées de contenu virales et engageantes sur : ',
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
    promptPrefixAr: 'اكتب لي سكريبت فيديو كامل كلمة بكلمة مع التوجيهات البصرية والمؤثرات عن: ',
    promptPrefixEn: 'Write a full word-for-word video script with visual cues and SFX about: ',
    promptPrefixFr: 'Rédige un script vidéo complet mot à mot avec indications visuelles et effets sonores sur : ',
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
    promptPrefixAr: 'أريد 5 خطافات افتتاحية (Hooks) خاطفة ومحفزة للفضول لموضوع: ',
    promptPrefixEn: 'Generate 5 high-retention opening hooks for: ',
    promptPrefixFr: 'Génère 5 accroches percutantes (hooks) pour : ',
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
    promptPrefixAr: 'اقترح لي 10 عناوين يوتيوب ذات نسبة نقر عالية (High CTR) لفيديو عن: ',
    promptPrefixEn: 'Suggest 10 high-CTR YouTube titles for a video about: ',
    promptPrefixFr: 'Propose 10 titres YouTube à fort taux de clic (CTR) pour : ',
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
    promptPrefixAr: 'اكتب لي وصف فيديو احترافي متوافق مع السيو مع الفواصل الزمنية لموضوع: ',
    promptPrefixEn: 'Write an SEO-optimized video description with timestamps for: ',
    promptPrefixFr: 'Rédige une description vidéo optimisée pour le SEO avec chapitres pour : ',
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
    promptPrefixAr: 'استخرج لي حزمة هاشتاقات ذكية ومتوازنة لـ TikTok و Reels لموضوع: ',
    promptPrefixEn: 'Extract targeted and balanced hashtags for TikTok and Reels about: ',
    promptPrefixFr: 'Extrais une sélection de hashtags ciblés pour TikTok et Reels sur : ',
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
    promptPrefixAr: 'اكتب لي كابشن تفاعلي وجذاب لانستغرام وتيك توك مع نداء إجراء واضح عن: ',
    promptPrefixEn: 'Write an engaging social media caption with a clear CTA about: ',
    promptPrefixFr: 'Rédige une légende captivante pour Instagram et TikTok avec un CTA clair sur : ',
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
    promptPrefixAr: 'أعد صياغة هذا النص بأسلوب مشوق ومباشر وسهل القراءة: ',
    promptPrefixEn: 'Rewrite this text in a punchy, engaging, and easy-to-read style: ',
    promptPrefixFr: 'Reformule ce texte dans un style percutant et facile à lire : ',
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
    promptPrefixAr: 'أريد خطة سيو شاملة مع كلمات مفتاحية دقيقة وهيكلة H1 و H2 لموضوع: ',
    promptPrefixEn: 'Provide an SEO plan with target keywords and heading structure for: ',
    promptPrefixFr: 'Fournis un plan SEO avec mots-clés cibles et structure H1/H2 pour : ',
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
    promptPrefixAr: 'حلل لي هذا المحتوى وقيم نقاط القوة والضعف وفرص زيادة التفاعل: ',
    promptPrefixEn: 'Analyze this content, evaluate retention strength and improvement points: ',
    promptPrefixFr: "Analyse ce contenu, évalue la rétention et les axes d'amélioration : ",
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
    promptPrefixAr: 'اكتب لي برومبت احترافي لـ Midjourney لتوليد صورة مصغرة 8K سينمائية لموضوع: ',
    promptPrefixEn: 'Write a Midjourney prompt to generate an 8K cinematic thumbnail background for: ',
    promptPrefixFr: 'Rédige un prompt Midjourney pour générer une miniature 8K percutante sur : ',
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
    promptPrefixAr: 'صغ لي 3 نماذج بايو احترافية لحسابي مع نداء اتخاذ إجراء واضح لمجال: ',
    promptPrefixEn: 'Draft 3 high-converting profile bios with a clear CTA for: ',
    promptPrefixFr: "Rédige 3 modèles de bio professionnelle avec un appel à l'action clair pour : ",
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
    promptPrefixAr: 'اكتب لي مراجعة بيعية مقنعة وأصيلة لمنتج أفيلييت: ',
    promptPrefixEn: 'Write a persuasive and authentic affiliate product review for: ',
    promptPrefixFr: "Rédige une recommandation d'affiliation persuasive et authentique pour : ",
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
    promptPrefixAr: 'أنشئ لي جدول وخطة نشر أسبوعية متوازنة لـ 7 أيام في مجال: ',
    promptPrefixEn: 'Create a balanced 7-day content schedule and editorial calendar for: ',
    promptPrefixFr: 'Crée un calendrier éditorial équilibré sur 7 jours pour : ',
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
    promptPrefixAr: 'حول هذا الموضوع العادي إلى 5 أفكار فيديوهات غير متوقعة ومشوقة: ',
    promptPrefixEn: 'Transform this topic into 5 creative and unexpected video concepts: ',
    promptPrefixFr: 'Transforme ce sujet en 5 concepts vidéo captivants et inattendus : ',
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

import { ChatMessage, Language } from '../types';

// Client-side communicator to Server-side Rikou AI Gemini API with seamless intelligent offline fallback
export async function sendChatMessageToRikouAI(
  messages: ChatMessage[],
  quickActionId?: string,
  language: Language = 'ar',
  isRegenerate: boolean = false
): Promise<string> {
  try {
    const res = await fetch('/api/rikou-ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
          attachment: m.attachment ? {
            name: m.attachment.name,
            type: m.attachment.type,
            dataUrl: m.attachment.dataUrl,
          } : undefined,
        })),
        quickActionId,
        language,
        isRegenerate,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply && typeof data.reply === 'string' && data.reply.trim().length > 0) {
        return data.reply.trim();
      }
    }
  } catch (err) {
    console.warn('Backend /api/rikou-ai/chat call failed, engaging dynamic contextual generator:', err);
  }

  // Fallback to client-side dynamic contextual generator
  return generateContextualAIResponse(messages, quickActionId, language, isRegenerate);
}

// Helper to extract idea titles from previous assistant messages
function extractIdeaByNumber(history: ChatMessage[], ideaNum: number): { title: string; concept: string } | null {
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    if (msg.role !== 'assistant') continue;
    const text = msg.content;

    // Check for patterns like 3️⃣, 3., 3-, 3)
    const regex = new RegExp(`(?:${ideaNum}️⃣|\\b${ideaNum}\\.|\\b${ideaNum}\\-|\\b${ideaNum}\\)|الفكرة\\s*${ideaNum})\\s*([^\n]+)`, 'i');
    const match = text.match(regex);
    if (match) {
      const fullLine = match[0];
      const title = match[1]?.replace(/[•\-\*\[\]]/g, '').trim() || `الفكرة رقم ${ideaNum}`;
      // Grab next 2 lines as concept
      const afterMatch = text.slice(match.index! + match[0].length);
      const nextLines = afterMatch.split('\n').filter(l => l.trim().length > 0).slice(0, 3).join(' ');
      return { title, concept: nextLines };
    }
  }
  return null;
}

// Helper to find the latest script in conversation history
function findLatestScriptInHistory(history: ChatMessage[]): string | null {
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    if (msg.role === 'assistant' && (msg.content.includes('[00:') || msg.content.includes('سيناريو') || msg.content.includes('Script') || msg.content.includes('الهوك'))) {
      return msg.content;
    }
  }
  return null;
}

// Dynamic, multi-turn conversational AI reasoning engine
export function generateContextualAIResponse(
  messages: ChatMessage[],
  quickActionId?: string,
  language: Language = 'ar',
  isRegenerate: boolean = false
): string {
  const isAr = language === 'ar' || language === 'ary';
  const isFr = language === 'fr';

  if (!messages || messages.length === 0) {
    return isAr
      ? 'مرحباً بك! أنا Rikou AI، كيف أساعدك اليوم في صناعة المحتوى أو الربح أو كتابة السكربتات؟'
      : 'Hello! I am Rikou AI. How can I help you today with content creation, scripting, or digital growth?';
  }

  const lastUserMsg = messages[messages.length - 1]?.content.trim() || '';
  const lowerMsg = lastUserMsg.toLowerCase();
  const history = messages.slice(0, -1);

  // 0. Official Identity & Developer / Founder Queries (Strict & Explicit)
  if (
    lowerMsg.includes('شكون المطور') ||
    lowerMsg.includes('شكون مطور') ||
    lowerMsg.includes('من طورك') ||
    lowerMsg.includes('من هو مطورك') ||
    lowerMsg.includes('شكون دارك') ||
    lowerMsg.includes('شكون صنعك') ||
    lowerMsg.includes('من صنعك') ||
    lowerMsg.includes('شكون المؤسس') ||
    lowerMsg.includes('من المؤسس') ||
    lowerMsg.includes('مؤسس rikouzone') ||
    lowerMsg.includes('مؤسس ريكوزون') ||
    lowerMsg.includes('who developed you') ||
    lowerMsg.includes('who is your developer') ||
    lowerMsg.includes('who created you') ||
    lowerMsg.includes('who is the founder') ||
    lowerMsg.includes('qui t\'a créé') ||
    lowerMsg.includes('qui est ton développeur') ||
    lowerMsg.includes('qui est le fondateur')
  ) {
    if (lowerMsg.includes('مؤسس') || lowerMsg.includes('founder') || lowerMsg.includes('fondateur')) {
      return isAr
        ? 'مؤسس RikouZone هو **Ayoub Bounasr**.'
        : isFr
        ? 'Le fondateur de RikouZone est **Ayoub Bounasr**.'
        : 'The founder of RikouZone is **Ayoub Bounasr**.';
    }
    if (lowerMsg.includes('دارك') || lowerMsg.includes('صنعك') || lowerMsg.includes('created you')) {
      return isAr
        ? 'أنا Rikou AI، وتم تطويري بواسطة **Ayoub Bounasr** داخل منصة RikouZone.'
        : isFr
        ? 'Je suis Rikou AI, et j\'ai été développé par **Ayoub Bounasr** au sein de la plateforme RikouZone.'
        : 'I am Rikou AI, and I was developed by **Ayoub Bounasr** within the RikouZone platform.';
    }
    return isAr
      ? 'المطور ديالي هو **Ayoub Bounasr**.'
      : isFr
      ? 'Mon développeur est **Ayoub Bounasr**.'
      : 'My developer is **Ayoub Bounasr**.';
  }

  // 0.1 Capabilities Query ("شنو كتقدر تدير؟" / "What can you do?")
  if (
    lowerMsg.includes('شنو كتقدر تدير') ||
    lowerMsg.includes('شنو تقدر تدير') ||
    lowerMsg.includes('شنو كتدير') ||
    lowerMsg.includes('شنو كتعرف تدير') ||
    lowerMsg.includes('ماذا تستطيع') ||
    lowerMsg.includes('ما هي قدراتك') ||
    lowerMsg.includes('ما هي مهامك') ||
    lowerMsg.includes('ماذا تفعل') ||
    lowerMsg.includes('what can you do') ||
    lowerMsg.includes('que peux-tu faire')
  ) {
    return isAr
      ? `أنا **Rikou AI**، مساعدك الذكي المتخصص داخل منصة RikouZone. أستطيع مساعدتك في:

• **توليد أفكار المحتوى:** ابتكار زوايا وأفكار لفيديوهات YouTube، ريلز، تيك توك، ومنشورات السوشيال ميديا.
• **كتابة السكربتات:** صياغة نصوص وسيناريوهات احترافية عند طلبك مباشرة.
• **تحسين المحتوى (SEO & Hooks):** اقتراح خطافات (Hooks) خاطفة، عناوين بنسبة نقر عالية، وهاشتاقات دقيقة.
• **استراتيجيات العمل والربح الرقمي:** إرشادات عملية للعمل الحر، بناء الهوية، وإطلاق المشاريع المصغرة.
• **صياغة وتدقيق النصوص:** كتابة نصوص إعلانية ورسائل تواصل مهنية مع العملاء.

شنو هو الموضوع أو المشروع اللي باغي نخدموا عليه دابا؟`
      : isFr
      ? `Je suis **Rikou AI**, votre assistant intelligent au sein de RikouZone. Je peux vous aider à :

• **Générer des idées de contenu** pour YouTube, Reels, TikTok et réseaux sociaux.
• **Rédiger des scripts vidéo** captivants et percutants sur demande.
• **Optimiser vos contenus (SEO & Hooks)** avec des accroches et des titres à fort taux de clic.
• **Stratégies de revenus numériques** pour freelances et créateurs.
• **Rédaction et révision de textes marketing** et propositions clients.

Sur quel projet souhaitez-vous travailler ?`
      : `I am **Rikou AI**, your dedicated assistant within the RikouZone platform. I can assist you with:

• **Content Ideation:** Brainstorming viral concepts for YouTube, Reels, TikTok, and social media.
• **Scriptwriting:** Crafting high-retention video scripts and marketing copy on demand.
• **Content Optimization (SEO & Hooks):** Crafting thumb-stopping hooks, high-CTR titles, and hashtags.
• **Digital Income Blueprints:** Practical freelancing, branding, and micro-business strategies.
• **Copywriting & Polish:** Drafting compelling ad copies, proposals, and client pitches.

What project or topic would you like to work on right now?`;
  }

  // 0.2 Explicit Script Request for SEO (e.g. "كتب لي Script لفيديو عن SEO")
  if (
    (lowerMsg.includes('script') || lowerMsg.includes('سكربت') || lowerMsg.includes('سيناريو')) &&
    (lowerMsg.includes('seo') || lowerMsg.includes('سيو'))
  ) {
    return isAr
      ? `إليك سكريبت فيديو تعليمي سريع وعالي التفاعل عن أساسيات الـ SEO (مدة 60 ثانية):

### المقدمة
"لو كنت كتعول غير على الإعلانات الممولة باش تجيب مبيعات، فغير توقف الفلوس كيتوقفو الزوار فوراً! اليوم غنوريك كيفاش تجيب زوار مجاناً 24/7 من Google."

### الشرح المباشر
"السر كيتسمى SEO (تحسين محركات البحث). فاش شي حد كيبحث على مشكل، Google كيبغي يعطيه أحسن إجابة. باش تكون نتا هاديك الإجابة، ركز على 3 خطوات:
1. استهدف كلمة بحث واضحة كيبحث عليها جمهورك فعلياً.
2. جاوب على السؤال مباشرة فـ أول 15 ثانية بلا مقدمات باردة.
3. خلي موقعك خفيف وسريع فـ التصفح من التيليفون."

### الخاتمة
"احفظ هاد الفيديو عندك، وكتب ليا فـ التعليقات شنو هو مجالك باش نقترح عليك كلمات مفتاحية سهلة تبدا بها!"`
      : `Here is a punchy, 60-second educational script on SEO basics:

### Hook
"If you rely solely on paid ads for traffic, the moment your budget runs out, your sales stop. Here is how to get Google to send you free traffic 24/7."

### Core Value
"It is called SEO (Search Engine Optimization). When people search for a problem, Google wants to recommend the most relevant answer. To be that answer:
1. Target high-intent, low-competition keywords.
2. Deliver the answer immediately without filler.
3. Optimize for fast mobile page speed."

### Call to Action
"Save this post right now, and drop your niche in the comments so I can give you 3 keywords to target!"`;
  }

  // 0.4 RikouZone Platform Queries ("شرح ليا RikouZone" / "شنو هي RikouZone" / "شرح لي هاد المنصة")
  if (
    lowerMsg.includes('rikouzone') ||
    lowerMsg.includes('ريكوزون') ||
    lowerMsg.includes('هاد المنصة') ||
    lowerMsg.includes('هذه المنصة') ||
    lowerMsg.includes('عن المنصة') ||
    lowerMsg.includes('شنو هي المنصة') ||
    lowerMsg.includes('ما هي المنصة')
  ) {
    return isAr
      ? `### مرحباً بك في RikouZone 🚀

منصة **RikouZone** هي منصة رقمية متكاملة أسسها وطورها **Ayoub Bounasr**، تهدف إلى تمكين صناع المحتوى والمستقلين ورواد الأعمال من اكتساب المهارات الرقمية وبناء مصادر دخل مستدامة عبر الإنترنت.

**الأقسام الرئيسية للمنصة:**
1. **مسارات الدخل (Income Paths):** مسارات تعليمية وتطبيقية متدرجة من الصفر (تطوير المواقع، تطبيقات الجوال، المونتاج، إدارة حسابات التواصل الاجتماعي، السيو، التسويق بالعمولة، والكتابة الإعلانية).
2. **أفكار المحتوى (Content Ideas):** مكتبة متجددة تضم مئات الأفكار والاستراتيجيات الجاهزة لصناع المحتوى على YouTube وTikTok وInstagram.
3. **الأدوات والمحاكيات (Calculators & Tools):** حاسبات تقدير الدخل، تسعير خدمات العمل الحر، ومولدات الأفكار والنصوص.
4. **المساعد الذكي (Rikou AI):** مساعدك التفاعلي لصياغة السكربتات، الأفكار الإبداعية، واستراتيجيات النمو الرقمي فورياً.
5. **الملف الشخصي والحفظ (Profile):** حفظ ومتابعة مساراتك وأفكارك المفضلة لإدارتها ومراجعتها في أي وقت.

كيف يمكنني مساعدتك في تطوير مهاراتك أو مشروعك اليوم؟`
      : isFr
      ? `### Bienvenue sur RikouZone 🚀

**RikouZone** est une plateforme numérique fondée et développée par **Ayoub Bounasr**, dédiée aux créateurs de contenu, freelances et entrepreneurs souhaitant acquérir des compétences digitales et monétiser leurs projets en ligne.

**Sections principales de la plateforme :**
1. **Parcours de Revenus (Income Paths) :** Guides pratiques complets (Développement Web, Applications Mobiles, Montage Vidéo, Gestion des Réseaux Sociaux, SEO, Affiliation).
2. **Idées de Contenu (Content Ideas) :** Bibliothèque d'idées virales pour YouTube, TikTok et Instagram.
3. **Outils & Simulateurs :** Calculatrices de tarifs freelance, simulateurs de rentabilité et générateurs.
4. **Assistant Intelligent (Rikou AI) :** Votre assistant interactif pour la rédaction de scripts, l'idéation et la croissance digitale.
5. **Espace Personnel (Profile) :** Sauvegarde et suivi de vos parcours et outils favoris.

Comment puis-je vous accompagner dans votre projet aujourd'hui ?`
      : `### Welcome to RikouZone 🚀

**RikouZone** is an all-in-one digital platform founded and created by **Ayoub Bounasr**, designed to empower content creators, freelancers, and online entrepreneurs to build scalable skills and generate online income.

**Core Sections of RikouZone:**
1. **Income Paths:** Practical, step-by-step tracks covering Web Development, Mobile Apps, Video Editing, Social Media Management, SEO, Copywriting, and Affiliate Marketing.
2. **Content Ideas:** Curated library of actionable concepts and viral hooks for YouTube, TikTok, and Instagram.
3. **Calculators & Tools:** Freelance rate calculators, income estimation tools, and growth simulators.
4. **Rikou AI:** Your dedicated AI partner for instant scripting, brainstorming, and digital monetization strategies.
5. **Personal Workspace (Profile):** Bookmark and organize your favorite paths and templates.

What would you like to build or learn today?`;
  }

  // 0.5 Explanation of AI ("شنو هو الذكاء الاصطناعي؟" / "What is AI?")
  if (
    lowerMsg.includes('ذكاء اصطناعي') ||
    lowerMsg.includes('الذكاء الاصطناعي') ||
    lowerMsg.includes('intelligence artificielle') ||
    lowerMsg.includes('what is ai') ||
    lowerMsg.includes('c\'est quoi l\'ia')
  ) {
    return isAr
      ? `### ما هو الذكاء الاصطناعي (Artificial Intelligence)؟

الذكاء الاصطناعي (**AI**) هو فرع من علوم الحاسوب يهدف إلى بناء برامج وأنظمة قادرة على محاكاة القدرات العقلية البشرية، مثل: التعلم من التجارب السابقة، فهم اللغات الطبيعية، التعرف على الأنماط والصور، وحل المشكلات المعقدة.

**كيف يعمل ببساطة؟**
بدلاً من كتابة كود لكل قاعدة بالتفصيل، يتم تدريب خوارزميات (Machine Learning & Deep Learning) على كميات هائلة من البيانات، لتتعلم بنفسها كيف تتنبأ بالنتائج أو تولد نصوصاً وتصاميم وأكواداً برمجية.

**أبرز استخداماته العملية اليوم:**
• **صناعة المحتوى:** كتابة السكربتات، تلخيص المقالات، وتوليد الصور وتعديل الفيديوهات.
• **البرمجة وتطوير البرمجيات:** تصحيح الأخطاء واقتراح الأكواد وتسريع بناء التطبيقات.
• **التسويق والتجارة:** روبوتات الرد الآلي الذكية، التوصيات المخصصة، وتوقع سلوك العملاء.
• **الإنتاجية اليومية:** جدولة المهام، الترجمة الفورية الدقيقة، وتحليل البيانات الضخمة في ثوانٍ.

💡 **نصيحة عملية للبدء السريع:** ابدأ بدمج أدوات الذكاء الاصطناعي في المهام المتكررة (كتابة المسودات، تلخيص المستندات، وتنظيم الأفكار) لمضاعفة إنتاجيتك من اليوم الأول.`
      : isFr
      ? `### Qu'est-ce que l'Intelligence Artificielle (IA) ?

L'**Intelligence Artificielle** est un domaine de l'informatique visant à concevoir des systèmes capables d'accomplir des tâches nécessitant normalement l'intelligence humaine : raisonnement, apprentissage automatique, traitement du langage naturel et reconnaissance visuelle.

**Applications concrètes aujourd'hui :**
• **Création de contenu :** Rédaction de scripts, génération d'images et montage automatisé.
• **Développement web & mobile :** Assistance au codage et débogage rapide.
• **Business en ligne :** Chatbots conversationnels, recommandation de produits et analyse prédictive.`
      : `### What is Artificial Intelligence (AI)?

**Artificial Intelligence (AI)** is a field of computer science dedicated to creating software systems capable of performing tasks that traditionally require human intelligence, such as learning from data, understanding natural language, recognizing patterns, and solving problems.

**Key Everyday Applications:**
• **Content Creation:** Instant scriptwriting, image generation, and video editing workflows.
• **Software Engineering:** Intelligent code completion, refactoring, and automated testing.
• **E-commerce & Freelancing:** 24/7 intelligent customer support and automated analytics.`;
  }

  // 0.6 Explanation of Micro-SaaS ("شنو هو Micro-SaaS؟" / "What is Micro-SaaS?")
  if (
    (lowerMsg.includes('شنو هو') || lowerMsg.includes('ما هو') || lowerMsg.includes('شرح') || lowerMsg.includes('what is') || lowerMsg.includes('c\'est quoi')) &&
    (lowerMsg.includes('micro-saas') || lowerMsg.includes('microsaas') || lowerMsg.includes('مايكرو ساس'))
  ) {
    return isAr
      ? `### ما هو الـ Micro-SaaS؟

الـ **Micro-SaaS** هو برنامج سحابي كخدمة (Software as a Service) مصغر جداً، يركز على حل **مشكلة واحدة محددة** لجمهور متخصص (Niche)، ويبنيه عادة شخص واحد (Solopreneur) أو فريق صغير جداً من 2-3 أفراد بتكاليف تشغيلية شبه منعدمة.

**المعادلة الذهبية للـ Micro-SaaS:**
• **تركيز فائق:** لا يحاول منافسة عمالقة البرمجيات، بل يسد ثغرة ضيقة ومهمة (مثال: أداة لتحويل تغريدات X إلى صور جاهزة للإنستغرام، أو بوت واتساب لتأكيد حجوزات العيادات).
• **اشتراك شهري مستدام (MRR):** يدفع العميل 9$ إلى 29$ شهرياً للحصول على الميزة، ما يعني أن 100 عميل فقط يمنحونك 1,000$ إلى 3,000$ كدخل سلبي شهري مستمر.
• **تكاليف استضافة منخفضة:** يُبنى باستخدام أطر خفيفة وبنية سحابية ذات قابلية توسع حسب الطلب.

💡 **مثال عملي للبدء:** أداة بسيطة تحول جداول Excel إلى فواتير PDF أنيقة وترسلها تلقائياً عبر البريد أو واتساب لأصحاب الأنشطة التجارية.`
      : `### What is a Micro-SaaS?

A **Micro-SaaS** is a small-scale Software-as-a-Service business targeting a specific niche market. It is typically built and operated by a solo founder or a micro-team with minimal overhead, solving one dedicated problem exceptionally well.

**Core Characteristics:**
• **Laser-focused scope:** Solves a single specific workflow bottleneck.
• **Recurring Revenue (MRR):** Affordable monthly subscriptions (e.g. $9 - $29/mo).
• **High Profit Margins:** Low server costs and minimal support requirements.`;
  }

  // 0.7 Explanation of HTML ("شنو هو HTML؟" / "What is HTML?")
  if (
    (lowerMsg.includes('شنو هو') || lowerMsg.includes('ما هو') || lowerMsg.includes('شرح') || lowerMsg.includes('what is') || lowerMsg.includes('c\'est quoi')) &&
    (lowerMsg.includes('html') || lowerMsg.includes('اتش تي ام ال'))
  ) {
    return isAr
      ? `### ما هو الـ HTML؟

الـ **HTML** (اختصار لـ *HyperText Markup Language*) هي لغة التوصيف القياسية المستخدمة في بناء الهيكل الأساسي لأي صفحة أو موقع على الإنترنت.

**فكرة عملها ببساطة:**
إذا شبهنا الموقع الإلكتروني بمنزل:
• **HTML** هو الأعمدة والجدران والأبواب (الهيكل العظمي للموقع).
• **CSS** هو الدهان والألوان والديكورات والتنسيق الجمالي.
• **JavaScript** هو الكهرباء وشبكة المياه والمفاتيح الذكية (التفاعل والحركة).

**العناصر الأساسية في HTML:**
تعتمد على وسوم (Tags) توضع بين أقواس زاوية مثل:
• \`<h1>\`: للعناوين الرئيسية.
• \`<p>\`: للفقرات والنصوص.
• \`<a>\`: للروابط التشعبية.
• \`<img>\`: لإدراج الصور.
• \`<button>\`: للأزرار التفاعلية.

**مثال تطبيقي لكود صفحة HTML بسيطة:**
\`\`\`html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>صفحتي الأولى</title>
</head>
<body>
  <h1>مرحباً بك في عالم تطوير الويب!</h1>
  <p>هذا أول هيكل صفحة أنشأته باستخدام كود HTML القياسي.</p>
  <button>ابدأ التصفح</button>
</body>
</html>
\`\`\``
      : `### What is HTML?

**HTML** (*HyperText Markup Language*) is the standard foundational markup language used to structure content on the World Wide Web.

**The Building Block Analogy:**
• **HTML:** The skeleton, walls, and structure of a house.
• **CSS:** The paint, interior design, and styling.
• **JavaScript:** The electricity, switches, and interactive mechanics.

**Starter HTML Structure:**
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Webpage</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is the fundamental skeleton of a webpage built with HTML.</p>
</body>
</html>
\`\`\``;
  }

  // 0.8 Learning Programming Plan ("عطيني خطة باش نتعلم البرمجة" / "خطة تعلم البرمجة")
  if (
    (lowerMsg.includes('خطة') || lowerMsg.includes('طريق') || lowerMsg.includes('roadmap') || lowerMsg.includes('كيفاش نتعلم') || lowerMsg.includes('كيف أتعلم')) &&
    (lowerMsg.includes('برمج') || lowerMsg.includes('كود') || lowerMsg.includes('programming') || lowerMsg.includes('coder'))
  ) {
    return isAr
      ? `### خطة عملية لتعلم البرمجة من الصفر حتى أول مشروع ودخل (خارطة طريق 90 يوماً):

#### المرحلة 1: إتقان المفاهيم البرمجية الأساسية (الأسابيع 1 - 3)
• تعلم لغة واحدة حديثة وشائعة: **JavaScript/TypeScript** لتطوير المواقع، أو **Python** للذكاء الاصطناعي، أو **Dart** لتطبيقات الجوال.
• ركز على: المتغيرات، الشروط (If/Else)، الحلقات (Loops)، الدوال (Functions)، والمصفوفات والكائنات (Arrays & Objects).

#### المرحلة 2: بناء واجهات المستخدم (الأسابيع 4 - 6)
• إذا اخترت الويب: تعلم HTML5 و CSS3 (Flexbox & Grid) ثم مكتبة React.
• إذا اخترت الجوال: تعلم Flutter وبناء الشاشات والتنقل.
• طبق على الفور: ابنِ 3 صفحات صغيرة (آلة حاسبة، قائمة مهام، وصفحة هبوط لمنتج).

#### المرحلة 3: التعامل مع البيانات والسيرفر (الأسابيع 7 - 9)
• تعلم كيفية الاتصال بـ REST APIs وجلب وإرسال بيانات JSON.
• استخدم قواعد بيانات سحابية سهلة وسريعة مثل Firebase أو Supabase.
• تعلم استخدام Git و GitHub لرفع ومشاركة كود مشاريعك.

#### المرحلة 4: المشاريع الحقيقية والعمل الحر (الأسابيع 10 - 12)
• ابنِ مشروعين كاملين بمستوى تجاري حقيقي وضعهما في معرض أعمالك (Portfolio).
• ابدأ بعرض خدماتك على أصحاب الأنشطة التجارية القريبة أو منصات العمل الحر (Upwork / مستقل).

💡 **نصيحة الانطلاق:** ركز على مسار تطوير الويب أولاً (HTML, CSS, JavaScript, React) لأنه الأسرع في توفير فرص العمل الحر وبناء مشاريع قابلة للعرض فوراً.`
      : `### 90-Day Practical Programming Roadmap:

1. **Phase 1 (Weeks 1-3): Syntax & Logic Fundamentals**
Master core programming concepts with JavaScript or Python: variables, control flow, functions, and arrays.

2. **Phase 2 (Weeks 4-6): Frontend & UI Construction**
Learn HTML5, CSS3, modern Flexbox/Grid, and responsive layout design.

3. **Phase 3 (Weeks 7-9): APIs & Data Persistence**
Connect interfaces with REST APIs, parse JSON responses, and integrate cloud databases like Firebase.

4. **Phase 4 (Weeks 10-12): Real Projects & Portfolio**
Build 2 full-featured applications and launch your portfolio on GitHub Pages or Vercel.`;
  }

  // 0.9 Explicit YouTube Script on Online Income ("كتب ليا سكريبت YouTube على الربح من الإنترنت")
  if (
    (lowerMsg.includes('script') || lowerMsg.includes('سكريبت') || lowerMsg.includes('سيناريو')) &&
    (lowerMsg.includes('ربح') || lowerMsg.includes('دخل') || lowerMsg.includes('فلوس') || lowerMsg.includes('income') || lowerMsg.includes('argent') || lowerMsg.includes('إنترنت') || lowerMsg.includes('اونلاين'))
  ) {
    return isAr
      ? `إليك سكريبت يوتيوب كامل واحترافي عن "الربح الحقيقي من الإنترنت في 2026" (جاهز للإلقاء والتصوير):

### 1. الخطاف الافتتاحي (00:00 - 00:15)
"لو كنت كتعتقد أن الربح من الإنترنت هو مجرد ضغط على الإعلانات أو تطبيقات الألعاب اللي كتعطيك سنتات، فأنت كتضيع وقتك الثمين في الوهم. اليوم غنشارك معك 3 مجالات حقيقية كيدخل منها شباب مبتدئون ما بين 500$ إلى 3,000$ شهرياً بمهارات تقدر تبداها من اليوم."

### 2. الفكرة الأولى: تقديم الخدمات الرقمية المصغرة (00:15 - 00:50)
"المجال الأول هو **Micro-Services**: أصحاب الشركات والمحلات في مدينتك ما عندهمش الوقت يصمموا صور مصغرة، يمنتجوا فيديوهات ريلز، أو يكتبوا منشورات ترويجية. بتعلم أداة واحدة مثل Canva أو CapCut وإتقانها لمدة أسبوعين، تقدر تتواصل مع 10 محلات وتقدم ليهم باقة شهرية بـ 150$ إلى 300$."

### 3. الفكرة الثانية: بناء صفحات الهبوط وتطوير المواقع (00:50 - 01:25)
"المجال الثاني هو صفحات الهبوط السريعة. أي تاجر أو مدرب أو صانع محتوى باغي يبيع منتجه كيحتاج صفحة هبوط مقنعة. ما كتحتاجش تكون مهندس برمجيات خارق؛ كود بسيط بـ HTML و Tailwind CSS أو منصات مخصصة كافية لتسليم مشروع بـ 300$ إلى 800$ في يومين فقط."

### 4. الفكرة الثالثة: صناعة المحتوى التخصصي والوساطة (01:25 - 01:55)
"المجال الثالث هو قنوات المحتوى الموجه (Niche Channels). اختر موضوعاً تحبه (تطبيقات، ذكاء اصطناعي، كتب، تجارة)، انشر فيديوهات قصيرة بانتظام، وضع روابط تسويق بالعمولة (Affiliate Links) للمنتجات التي تستخدمها. كلما اشترى أحد عن طريقك، كتربح عمولة بدون ما تشحن أي منتج."

### 5. الخاتمة ودعوة التفاعل (01:55 - 02:15)
"السر ماشي في المعرفة، السر في التطبيق والالتزام بمسار واحد لمدة 90 يوماً متواصلة. احفظ هذا الفيديو عندك، واكتب ليا فـ التعليقات شنو هو المجال اللي باغي تبدا به باش نرسل ليك الدليل العملي مجاناً!"`
      : `Here is a complete, high-retention YouTube video script on Online Income:

### Hook (00:00 - 00:15)
"Stop wasting your time on survey apps and click farms that pay pennies. Here are 3 proven digital skill paths generating real $1,000 to $3,000 monthly income in 2026."

### Section 1: Micro-Services for Local Businesses (00:15 - 00:45)
Business owners are busy running operations. Offering dedicated video editing, thumbnail design, or social media scheduling is an immediate $300-$500/month recurring retainer.

### Section 2: High-Converting Landing Pages (00:45 - 01:15)
Every digital seller needs a clean, mobile-first sales page. Building lightweight landing pages yields high project margins with fast delivery turnaround.

### Section 3: Targeted Affiliate Channels (01:15 - 01:45)
Recommend specialized digital tools, platforms, or equipment you use, earning passive commissions on every qualified referral.

### Outro & Call to Action (01:45 - 02:00)
"Pick one path today and commit to 60 days of consistent execution. Drop a comment below with your chosen field and subscribe for more actionable breakdowns!"`;
  }

  // 0.10 Explanation of SEO ("شنو هو SEO؟" / "What is SEO?")
  if (
    (lowerMsg.includes('شنو هو') || lowerMsg.includes('ما هو') || lowerMsg.includes('شرح') || lowerMsg.includes('what is') || lowerMsg.includes('c\'est quoi')) &&
    (lowerMsg.includes('seo') || lowerMsg.includes('سيو') || lowerMsg.includes('تحسين محركات البحث'))
  ) {
    return isAr
      ? `### ما هو الـ SEO (تحسين محركات البحث)؟

الـ **SEO** (اختصار لـ *Search Engine Optimization*) هو مجموعة من الممارسات والاستراتيجيات التي تهدف إلى جعل موقعك أو مقالاتك أو متجرك يظهر في المراتب الأولى في نتائج البحث المجانية على Google و Bing بدون دفع سنت واحد في الإعلانات.

**الأركان الثلاثة الأساسية للـ SEO:**
1. **On-Page SEO (السيو الداخلي):** تحسين جودة المحتوى، استهداف الكلمات المفتاحية ذات نية البحث العالية، وتنسيق العناوين (H1, H2) والروابط الداخلية.
2. **Technical SEO (السيو التقني):** سرعة تحميل الصفحة، تجاوب الموقع الكامل مع الهواتف الذكية، وضمان قدرة عناكب Google على فهرسة الصفحات بسهولة.
3. **Off-Page SEO (السيو الخارجي):** بناء الروابط الخلفية القوية (Backlinks) والإشارات الرقمية التي ترفع من ثقة ومصداقية الموقع لدى محركات البحث.

**الفائدة الأكبر:** تدفق مستمر ومجاني للزوار والعملاء المهتمين بخدماتك 24/7 دون توقف بمجرد توقف ميزانية الإعلانات.`
      : isFr
      ? `### Qu'est-ce que le SEO (Search Engine Optimization) ?

Le **SEO** (Référencement Naturel) regroupe l'ensemble des techniques visant à positionner un site web ou un contenu dans les premiers résultats naturels des moteurs de recherche (Google, Bing).

**Les 3 Piliers du SEO :**
1. **SEO On-Page :** Optimisation du contenu, choix des mots-clés stratégiques et balisage sémantique.
2. **Technical SEO :** Vitesse de chargement, adaptabilité mobile et indexabilité par les robots Google.
3. **SEO Off-Page :** Acquisition de liens retour de qualité (Backlinks) pour accroître l'autorité du domaine.`
      : `### What is SEO (Search Engine Optimization)?

**SEO** is the process and methodology of optimizing your website or content to rank higher in unpaid, organic search engine results (like Google and YouTube) for relevant user queries.

**The 3 Core Pillars of SEO:**
1. **On-Page SEO:** High-quality content, targeted keyword placement, header hierarchy, and internal linking.
2. **Technical SEO:** Fast page load speeds, mobile responsiveness, clean site architecture, and indexability.
3. **Off-Page SEO:** Earning reputable backlinks and brand mentions to build domain authority.

**Key Benefit:** Long-term, sustainable, free traffic without continuous ad spend.`;
  }

  // 0.11 Genuinely Ambiguous Query (Only ask ONE short, specific clarifying question - NEVER a multi-choice menu!)
  const trimmedMsg = lastUserMsg.trim().toLowerCase();
  const ambiguousPhrases = [
    'صاوب ليا واحد',
    'صاوب لي واحد',
    'صاوب ليا شي واحد',
    'صاوب لي شي واحد',
    'دير ليا واحد',
    'دير لي واحد',
    'عدل لي واحد',
    'صنع لي واحد',
    'بغيت واحد',
    'أريد واحدا',
    'make me one',
    'create one',
    'fait moi un',
  ];
  if (
    ambiguousPhrases.includes(trimmedMsg) ||
    (trimmedMsg.length <= 15 &&
      (trimmedMsg.startsWith('صاوب ليا') || trimmedMsg.startsWith('صاوب لي') || trimmedMsg.startsWith('دير ليا') || trimmedMsg.startsWith('دير لي') || trimmedMsg.startsWith('بغيت')) &&
      !trimmedMsg.includes('موقع') &&
      !trimmedMsg.includes('تطبيق') &&
      !trimmedMsg.includes('سكريبت') &&
      !trimmedMsg.includes('متجر') &&
      !trimmedMsg.includes('فيديو') &&
      !trimmedMsg.includes('صفحة'))
  ) {
    return isAr
      ? 'مرحباً بك! تقصد تطبيق جوال، موقع ويب، أم سكريبت فيديو محدد؟ وضح لي فكرتك باختصار لأبدأ معك مباشرة.'
      : isFr
      ? 'Bonjour ! Souhaitez-vous une application mobile, un site web ou un script vidéo ? Précisez votre idée brièvement pour que je commence directement.'
      : 'Hello! Are you looking for a mobile app, website, or video script? Please clarify briefly so I can assist you right away.';
  }

  // 0.12 Clothing E-Commerce Store ("صاوب ليا موقع لبيع الملابس" / "متجر ملابس")
  if (
    (lowerMsg.includes('موقع') || lowerMsg.includes('متجر') || lowerMsg.includes('store') || lowerMsg.includes('site') || lowerMsg.includes('boutique') || lowerMsg.includes('بيع')) &&
    (lowerMsg.includes('ملابس') || lowerMsg.includes('لباس') || lowerMsg.includes('clothing') || lowerMsg.includes('fashion') || lowerMsg.includes('vetement') || lowerMsg.includes('vêtements') || lowerMsg.includes('قمصان') || lowerMsg.includes('أزياء'))
  ) {
    return isAr
      ? `### الدليل المتكامل لبناء وإطلاق متجر إلكتروني لبيع الملابس (Clothing E-commerce Store):

لبناء متجر ملابس حديث، سريع، ومحسّن لتحقيق أعلى نسبة مبيعات (High Conversion Rate)، إليك الهيكل البرمجي والتشغيلي المباشر:

#### 1. البنية التقنية الموصى بها:
• **الحل الأسرع للإطلاق التجاري:** منصة **YouCan** أو **Shopify** مربوطة بنظام الدفع عند الاستلام (Cash on Delivery) والطلب السريع عبر واتساب (WhatsApp Fast Order) — مناسب للإطلاق في 24-48 ساعة.
• **الحل البرمجي المخصص (Custom Full-Stack):** واجهة مستخدم بـ **React / Next.js** وتنسيق بـ **Tailwind CSS** مع سلة خفيفة متصلة بنظام إدارة طلبات فوري.

#### 2. الأقسام والصفحات الأساسية للمتجر:
1. **الواجهة الرئيسية (Hero Section):** بنر احترافي للتشكيلة الجديدة (New Arrivals) مع زر "تسوق الآن" وعروض الخصم الحصرية.
2. **شريط التصنيفات (Categories Carousel):** فلاتر سريعة تشمل (رجالي، نسائي، أطفال، هوديز، تيشيرتات، إكسسوارات).
3. **شبكة المنتجات (Product Grid):** كروت منتجات تفاعلية تظهر الصور بجودة عالية، الأسعار بوضوح، والألوان والمقاسات المتوفرة (S, M, L, XL, XXL).
4. **صفحة المنتج المتقدمة (Product Page):**
   • معرض صور متحرك بدقة عالية لجميع زوايا اللباس.
   • جدول مقاسات تفاعلي (Size Guide) يوضح القياسات بالسنتيمتر لتفادي المرتجعات.
   • زر بارز للشراء السريع والدفع عند الاستلام (COD One-Click Order).
   • زر الطلب المباشر عبر واتساب (يرسل تلقائياً اسم القطعة والمقاس والسعر).

#### 3. كود واجهة بطاقة منتج ملابس احترافية (React & Tailwind CSS):
\`\`\`tsx
import React, { useState } from 'react';

export function ClothingCard({ name, price, originalPrice, image, sizes }) {
  const [selectedSize, setSelectedSize] = useState(sizes[0] || 'M');

  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-zinc-800">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <span className="absolute top-2.5 right-2.5 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-bold text-black">
          الأكثر مبيعاً 🔥
        </span>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-zinc-100 text-sm sm:text-base line-clamp-1">{name}</h3>
        
        {/* اختيار المقاس */}
        <div className="mt-2.5 flex items-center gap-1.5">
          <span className="text-xs text-zinc-400">المقاس:</span>
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={\`h-6 min-w-6 rounded px-1.5 text-xs font-medium transition-colors \${
                selectedSize === size
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }\`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* السعر وزر الطلب */}
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-zinc-800/80">
          <div>
            <span className="text-base sm:text-lg font-bold text-amber-400">{price} د.م</span>
            {originalPrice && (
              <span className="text-xs text-zinc-500 line-through ms-1.5">{originalPrice} د.م</span>
            )}
          </div>
          <button className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-black transition-transform active:scale-95 hover:bg-amber-400">
            طلب عبر واتساب 💬
          </button>
        </div>
      </div>
    </div>
  );
}
\`\`\`

#### 4. عوامل النجاح والمبيعات المباشرة:
• **سرعة التحميل على الهاتف:** 92% من مشتري الملابس يتصفحون عبر الهاتف المحمول، لذا تأكد من ضغط الصور باستخدام صيغة WebP.
• **آراء وتجارب المشترين:** تضمين صور واقعية لزبائن يرتدون الملابس يعزز الثقة ويرفع معدل إتمام الطلب بنسبة تزيد عن 40%.`
      : `### Complete Roadmap & Code for a Modern Clothing E-commerce Store:

#### 1. Store Architecture & Tech Stack:
• **Rapid Launch:** Shopify, YouCan, or WooCommerce with integrated Cash-On-Delivery (COD) and WhatsApp one-click ordering.
• **Custom High-Performance:** Next.js / React with Tailwind CSS for instant page loads.

#### 2. Core Functional Requirements:
• **Hero Lookbook:** Featured seasonal drop with prominent Call-To-Action.
• **Smart Size Selector:** Real-time size buttons with modal sizing measurements.
• **One-Page Checkout:** Frictionless order form minimizing cart abandonment.`;
  }

  // 0.13 Direct YouTube Script Generator ("كتب ليا سكريبت على YouTube" / "كتب لي سكريبت")
  if (
    lowerMsg.includes('كتب ليا سكريبت') ||
    lowerMsg.includes('اكتب لي سكريبت') ||
    lowerMsg.includes('اكتب ليا سكريبت') ||
    lowerMsg.includes('كتب لي سكريبت') ||
    lowerMsg.includes('سكريبت على youtube') ||
    lowerMsg.includes('سكريبت يوتيوب') ||
    (lowerMsg.includes('سكريبت') && (lowerMsg.includes('youtube') || lowerMsg.includes('يوتيوب') || lowerMsg.includes('فيديو') || lowerMsg.includes('video'))) ||
    quickActionId === 'ai-script-generator'
  ) {
    let scriptTopic = 'بناء مصدر دخل رقمي وتطوير المهارات المطلوبة في 2026';
    const matchTopic = lastUserMsg.match(/(?:عن|في|حول|على|about|on)\s+([^\n\.\?!,]+)/i);
    if (matchTopic && matchTopic[1]?.trim().length > 2 && !matchTopic[1].toLowerCase().includes('youtube')) {
      scriptTopic = matchTopic[1].trim();
    }

    return isAr
      ? `إليك سكريبت فيديو يوتيوب كامل واحترافي كلمة بكلمة لـ (${scriptTopic}) مع التوجيهات البصرية والصوتية:

### 1. الخطاف الافتتاحي (Hook الخاطف) [00:00 - 00:15]
🎥 *(لقطة قريبة Zoom-in سريعة إلى وجه المتحدث مع نص كبير متحرك باللون الأصفر)*
**المتحدث:** "لو قلت لك إن هناك خطوة واحدة بسيطة، لو طبقتها اليوم، ستوفر عليك 6 أشهر كاملة من التجارب الفاشلة في هذا المجال؟ أغلب الناس يضيعون وقتهم في الاتجاه الخاطئ، واليوم سأعطيك الخلاصة المباشرة بدون أي لف أو دوران!"
🎵 *(مؤثر صوتي: Whoosh سريع + إيقاع حماسي خفيف في الخلفية)*

### 2. المقدمة وكسر الجليد [00:15 - 00:45]
🎥 *(لقطات B-Roll سريعة تظهر شاشة لابتوب وأرقاماً ورسوماً بيانية توضيحية)*
**المتحدث:** "أهلاً بك يا صديقي! إذا كنت تتابع وتتساءل كيف ينجح الآخرون بسرعة بينما أنت تشعر بأنك عالق في مكانك، فالسبب ليس نقص الموهبة، بل كثرة المعلومات العشوائية. اليوم لخصت لك خارطة طريق عملية من 3 مراحل واضحة يمكنك البدء بها فور نهاية هذا الفيديو."

### 3. المرحلة الأولى: اختيار التخصص الدقيق [00:45 - 01:30]
🎥 *(ظهور نقطة رئيسية على الشاشة: [1. التخصص وتحديد المشكلة])*
**المتحدث:** "القاعدة الأولى: لا تحاول بيع كل شيء لكل الناس. اختر خدمة واحدة أو مجالاً واحداً محدداً وركز على حل مشكلة ملموسة يعاني منها عميلك المستهدف يومياً. عندما تكون متخصصاً، يثق بك العميل فوراً ويكون مستعداً لدفع السعر الذي تطلبه."

### 4. المرحلة الثانية: النموذج الأولي واختبار السوق [01:30 - 02:15]
🎥 *(لقطة لشاشة توضح مثالاً عملياً مع توجيه بالماوس)*
**المتحدث:** "القاعدة الثانية: لا تنتظر حتى يصبح عملك خالياً من العيوب 100%. أطلق نسخة مبسطة من خدمتك أو مشروعك خلال 7 أيام، واعرضها على أول 5 أشخاص. ملاحظاتهم الحقيقية أهم بـ 100 مرة من التفكير النظري لشهور داخل غرفتك."

### 5. المرحلة الثالثة: مضاعفة النتائج والتحسين المستمر [02:15 - 03:00]
🎥 *(لقطة مقربة للمتحدث بنبرة هادئة وواثقة)*
**المتحدث:** "القاعدة الثالثة: التكرار الذكي. بعد أن تحصل على أول نتيجة إيجابية، حلل سبب نجاحها وكرر نفس المعادلة بانتظام. الالتزام لمدة 60 يوماً متواصلة يصنع فارقاً جذرياً يغير مسارك بالكامل."

### 6. الخاتمة ودعوة التفاعل (Call To Action) [03:00 - 03:20]
🎥 *(ظهور زر الإعجاب وزر الاشتراك التفاعلي على الشاشة)*
**المتحدث:** "إذا وجدت في هذا السكريبت قيمة تفيدك، اضغط زر الإعجاب وشارك الفيديو مع صديق يحتاجه، واكتب لي في التعليقات: ما هو أكبر تحدٍ يواجهك حالياً لأجيبك عليه بنفسي. ولا تنسَ الاشتراك في القناة لنواصل معاً!"`
      : `Here is a complete, word-for-word YouTube video script on [${scriptTopic}]:

### 1. The Opening Hook [00:00 - 00:15]
*(Fast zoom-in on the creator, high-energy delivery)*
"What if the one thing stopping you from seeing real results isn't capital or luck, but a simple mistake that 90% of beginners make every single day? Here is the exact blueprint to fix it right now."

### 2. Introduction & Stakes [00:15 - 00:45]
"Welcome back! Today we are cutting straight through the fluff. No 40-minute theory lessons—just three concrete execution steps you can put into practice immediately."

### 3. Step 1: Laser Specialization [00:45 - 01:30]
Stop trying to do everything at once. Pick one specific outcome and master it thoroughly.

### 4. Step 2: Build Fast, Test Early [01:30 - 02:15]
Get your minimal viable service or prototype into the hands of real users within 7 days.

### 5. Step 3: Compound What Works [02:15 - 03:00]
Double down on the 20% of inputs that produce 80% of your tangible results.

### 6. Call to Action [03:00 - 03:20]
"Drop a comment with your single biggest question, hit subscribe for more direct blueprints, and let's get to work!"`;
  }

  // 0.14 Five Project Ideas ("عطيني 5 أفكار لمشاريع" / "أفكار مشاريع" / "5 project ideas")
  if (
    (lowerMsg.includes('أفكار') || lowerMsg.includes('افكار') || lowerMsg.includes('ideas') || lowerMsg.includes('عطيني') || lowerMsg.includes('اقترح')) &&
    (lowerMsg.includes('مشاريع') || lowerMsg.includes('مشروع') || lowerMsg.includes('project') || lowerMsg.includes('projects') || lowerMsg.includes('بزنس') || lowerMsg.includes('business'))
  ) {
    return isAr
      ? `إليك 5 أفكار مشاريع رقمية مربحة ومطلوبة بقوة لعام 2026، بتكاليف تشغيلية منخفضة وهوامش ربح مرتفعة:

### 1. بوت أتمتة حجوزات ومبيعات الواتساب للمتاجر والعيادات المحلية (WhatsApp Automation Bot)
• **المشكلة:** الشركات المحلية والمتاجر تفقد عشرات الزبائن يومياً بسبب بطء الرد على استفسارات الأسعار والمواعيد عبر واتساب.
• **الحل والخدمة:** إعداد نظام رد آلي ذكي (باستخدام Make أو ManyChat أو كود مخصص) يؤكد الحجوزات ويرسل كتالوج المنتجات فوراً.
• **نموذج الربح:** رسوم إعداد أولية (150$ إلى 300$) + اشتراك صيانة شهري مستمر (50$ شهرياً لكل عميل).

### 2. منصة مصغرة (Micro-SaaS) لإصدار الفواتير وعروض الأسعار للفريلانسرز العرب
• **المشكلة:** برامج الفوترة العالمية باهظة ومعقدة، ولا تدعم العملات المحلية أو لغة واجهة عربية بسيطة مع روابط دفع فورية.
• **الحل والخدمة:** تطبيق ويب خفيف بـ React/Tailwind يمكن المستقل من إصدار فاتورة أنيقة PDF برابط دفع في أقل من 60 ثانية.
• **نموذج الربح:** خطة مجانية لـ 3 فواتير، وخطة غير محدودة بـ 9$ إلى 14$ شهرياً (100 عميل فقط يمنحونك 1,000$ شهرياً كدخل متكرر).

### 3. باقة إنتاج ومونتاج الريلز والشورتس للعلامات التجارية الشخصية (Short-Form Content Agency)
• **المشكلة:** الأطباء، المحامون، المدربون، وأصحاب الشركات يريدون الحضور على TikTok وInstagram لكنهم لا يملكون الوقت لتعديل ومونتاج الفيديوهات.
• **الحل والخدمة:** باقة شهرية تسلم العميل 15 إلى 20 فيديو قصير شهرياً مع هوك خاطف وترجمة حركية احترافية ومؤثرات صوتية.
• **نموذج الربح:** باقة شهرية تبدأ من 300$ إلى 600$ لكل عميل (3 إلى 4 عملاء فقط يضمنون دخلاً شهرياً مستقراً).

### 4. متجر رقمي لبيع القوالب والأنظمة الجاهزة (Digital Templates on Gumroad / Notion)
• **المشكلة:** رواد الأعمال والمستقلون يقضون ساعات في تنظيم مشاريعهم وجداول حساباتهم من الصفر.
• **الحل والخدمة:** بناء أنظمة Notion متقدمة (نظام إدارة المشاريع للفريلانسرز، حاسبة تسعير الخدمات، وقوالب خطط محتوى Canva).
• **نموذج الربح:** منتجات رقمية تُباع بـ 15$ إلى 49$ بهامش ربح 100% دون أي تكاليف شحن أو تصنيع.

### 5. خدمة تحسين الظهور المحلي في خرائط Google للأنشطة التجارية (Google Maps SEO Booster)
• **المشكلة:** المطاعم، المقاهي، ومراكز الصيانة تعاني من قلة الزوار لعدم ظهور ملفها في أول 3 نتائج بحث محلية في منطقتها.
• **الحل والخدمة:** تدقيق الحساب، تحسين الكلمات المفتاحية المحلية، إضافة الصور عالية الجودة، وإعداد نظام لجلب تقييمات إيجابية حقيقية.
• **نموذج الربح:** 200$ إلى 400$ لكل نشاط تجاري.

💡 **خطوتك القادمة:** اختر الفكرة الأقرب لمهارتك الحالية واختبر طلب السوق عليها بالتواصل مع 5 عملاء محتملين هذا الأسبوع.`
      : `Here are 5 profitable, high-demand digital project ideas for 2026:

### 1. Local WhatsApp Booking & Automation System
Automate inquiries, appointments, and catalogs for local service businesses via automated messaging bots.
• **Monetization:** $250 setup fee + $50/mo recurring retainer.

### 2. Solo-Freelancer Invoicing Micro-SaaS
A fast, lightweight billing tool creating professional branded invoices with payment links in under 60 seconds.
• **Monetization:** $9-$14/month recurring subscription.

### 3. Short-Form Video Editing Retainer Agency
Monthly package delivering 15-20 dynamic TikTok/Reels for coaches, founders, and local business owners.
• **Monetization:** $400-$700 monthly retainer per client.

### 4. Notion Operating Systems & Canva Digital Kits
Pre-built digital productivity templates and business planning dashboards sold with 100% profit margins.
• **Monetization:** $19-$49 one-time digital download sales.

### 5. Google Maps & Local SEO Optimization Service
Audit and optimize local businesses to rank in the top 3 Google Maps results in their city.
• **Monetization:** $250-$450 per client.`;
  }

  // 1. Multi-turn Follow-up: User references a specific Idea (e.g. "الفكرة رقم 3 عجباتني، كتب ليا Script كامل")
  const ideaRefMatch = lastUserMsg.match(/(?:الفكرة\s*(?:رقم\s*)?(\d+)|فكرة\s*(\d+)|idea\s*#?(\d+)|(\d+)\s*عجباتني|عجباتني\s*(\d+))/i);
  if (ideaRefMatch && (lowerMsg.includes('script') || lowerMsg.includes('سكربت') || lowerMsg.includes('كتب') || lowerMsg.includes('سيناريو') || lowerMsg.includes('كامل') || lowerMsg.includes('write'))) {
    const ideaNum = parseInt(ideaRefMatch[1] || ideaRefMatch[2] || ideaRefMatch[3] || ideaRefMatch[4] || ideaRefMatch[5], 10);
    const extractedIdea = extractIdeaByNumber(history, ideaNum);
    const chosenTitle = extractedIdea ? extractedIdea.title : (isAr ? `الفكرة رقم ${ideaNum}` : `Idea #${ideaNum}`);

    if (isRegenerate) {
      if (isAr) {
        return `إليك نسخة بديلة للسكريبت بزاوية مختلفة وجريئة لـ (${chosenTitle}):

### المقدمة الافتتاحية
"لو كان النجاح في هذا الأمر يحتاج إلى ما يدّعيه الجميع، لما رأيت المبتدئين يسبقون أصحاب الخبرة في أسابيع قليلة!"

### تفكيك المشكلة
الناس يقضون ساعات في البحث عن أسرار وهمية ودورات مكلفة، بينما السر الحقيقي يكمن في طريقة تطبيق واحدة يرفض معظمهم تجربتها خوفاً من التغيير.

### الخطوات العملية الثلاث
1. اختر مساراً واحداً محدداً ولا تشتت انتباهك بأكثر من فكرة في نفس الوقت.
2. ركز على المهارات الأساسية التي تولد نتائج ملموسة بدل الانشغال بالشكليات المعقدة.
3. اختبر أسلوبك واستمر بانتظام لقياس التفاعل الحقيقي.

### الخاتمة ودعوة التفاعل
احفظ هذا الفيديو لتبدأ بتطبيقه فوراً، وشاركني في التعليقات: هل أنت مستعد للبدء بهذه الخطوة؟`;
      }
    }

    if (isAr) {
      return `إليك السكريبت الكامل والجاهز للإلقاء لـ (${chosenTitle}):

### المقدمة
"لو كنت تسعى لنتائج حقيقية في هذا المجال، فأغلب ما تسمعه في الفيديوهات الشائعة هو مضيعة كاملة للوقت!"

### جوهر المشكلة
السبب هو أن أغلب المبتدئين يركزون على الأدوات المعقدة، بينما المعادلة الحقيقية أبسط بكثير وتعتمد على خطوات ذكية ومباشرة.

### خطوات التنفيذ
1. الخطوة الأولى: تخلص من الحشو وركز على حل مشكلة واحدة ومحددة جداً للمتابع.
2. الخطوة الثانية: استخدم أدوات ذكية ومجانية لأتمتة الجزء الأكبر من المجهود المكرر.
3. الخطوة الثالثة: انشر بانتظام كل 48 ساعة وقس التفاعل الفعلي بدلاً من الاكتفاء بالمشاهدات السطحية.

### الخاتمة
اكتب لي في التعليقات لأرسل لك الدليل العملي مجاناً، ولا تنسَ حفظ الفيديو لتتمكن من الرجوع إليه عند البدء!`;
    } else {
      return `Here is the complete script for [${chosenTitle}]:

### Hook & Introduction
"If you are still trying to master this the traditional way, stop right now before you burn out."

### The Core Problem
90% of people get stuck because they focus on flashy tools instead of one single leverage point that actually moves the needle.

### Actionable Steps
1. Strip away the noise and target one specific outcome.
2. Automate the repetitive manual work using modern workflows.
3. Measure actual retention and double down on what works.

### Outro & Call to Action
Drop a comment below if you want the full breakdown, and save this post to review when implementing!`;
    }
  }

  // 2. Multi-turn Follow-up: User asks to make previous script more suspenseful ("خليه أكثر تشويقاً" / "خلي المقدمة أكثر تشويقاً" / "خليه حماسي" / "make it more suspenseful")
  if (lowerMsg.includes('تشويق') || lowerMsg.includes('حماسي') || lowerMsg.includes('إثارة') || lowerMsg.includes('مقدمة') || lowerMsg.includes('suspense') || lowerMsg.includes('exciting') || lowerMsg.includes('dramatic')) {
    if (isRegenerate && isAr) {
      return `إليك تعديل المقدمة بأسلوب تشويقي متصاعد وجاذب للانتباه:

### المقدمة المشوقة
"إذا كنت تظن أن النجاح في هذا المجال ضربة حظ، فلديك 30 ثانية لتغير رأيك أو تكرر نفس الأخطاء!"

### رفع مستوى الترقب
معظم الذين بدأوا قبلك استسلموا في أول أسبوعين لأنهم اعتمدوا على النصائح المستهلكة. بينما الأقلية الذكية اعتمدت هذا السر الخفي الذي لن يخبرك به أحد مجاناً.

### الحل المباشر
لا تعقد الأمور. طبق هذه الخطوة الواحدة اليوم، وإذا لم ترَ تغييراً ملموساً في التفاعل والنتائج، يمكنك إلغاء متابعتي فوراً.

### الخاتمة
احفظ الفيديو الآن لتتأكد بنفسك، وأخبرني في التعليقات: هل تجرؤ على تطبيق هذه الطريقة؟`;
    }
    return isAr
      ? `تم تعديل السكريبت ليكون أكثر تشويقاً وحماساً وإثارة للفضول:

### المقدمة
"هناك سر يتردد الكثيرون في كشفه لك.. لأنك لو عرفته، ستفهم لماذا كنت تضيع وقتك طوال هذه الشهور!"

### رفع وتيرة الإثارة
الفرق بين من يحقق نتائج استثنائية وأرباحاً حقيقية وبين من يبقى في مكانه.. ليس الحظ وليس المعدات الباهظة، بل هذه القاعدة المحددة.

### النقطة الجوهرية
المحترفون لا يضيعون وقتهم في الأساليب التقليدية؛ بل يركزون على تقديم قيمة صادمة وغير متوقعة في البداية، تتبعها خطوات عملية قابلة للتطبيق الفوري.

### الخاتمة
لا تفوت هذه الفرصة.. احفظ هذا الفيديو قبل أن تنساه، وشاركني في التعليقات: هل أنت مستعد للبدء؟`
      : `Here is the revised, high-suspense edition:

### Hook
"Nobody in this industry wants you to know what I am about to show you in the next 40 seconds."

### Tension & Core Value
The gap between high-performing creators and those stuck at zero isn't luck or money—it is this exact hidden leverage. Implement this 2-step loop today.

### Call to Action
Save this right now before you scroll, and drop a comment below to unlock the rest!`;
  }

  // 3. User asks for Micro-SaaS ideas ("عطيني 5 أفكار لمشاريع Micro-SaaS")
  if (lowerMsg.includes('micro-saas') || lowerMsg.includes('microsaas') || lowerMsg.includes('saas') || (lowerMsg.includes('مشاريع') && lowerMsg.includes('برمج'))) {
    if (isAr) {
      if (isRegenerate) {
        return `إليك 5 أفكار مشاريع Micro-SaaS بديلة بفرص سوقية واعدة لعام 2026:

### 1. نظام إشعارات الأسعار والمخزون للمتاجر المحلية
منصة خفيفة تتيح لأصحاب المتاجر إرسال رسائل فورية لعملائهم عند توفر منتج جديد أو انخفاض سعره، دون الحاجة لتطبيقات معقدة.
• **المشكلة:** صعوبة إعادة جذب العملاء الذين زاروا المتجر دون شراء.
• **طريقة الربح:** اشتراك يبدأ من 19$ شهرياً حسب عدد الرسائل الشهرية.

### 2. مولد ومجدول النشرات الإخبارية التلقائي للمستقلين
أداة تلخص الروابط والمقالات التي يحفظها صانع المحتوى أسبوعياً في نشرة بريدية أنيقة وجاهزة للإرسال لمشتركيه.
• **المشكلة:** النشرات البريدية مربحة لكن تجميعها وصياغتها أسبوعياً يستنزف ساعات طويلة.
• **طريقة الربح:** 15$ شهرياً مع قوالب احترافية غير محدودة.

### 3. أداة متابعة تجديد التراخيص والوثائق للشركات الصغيرة
خدمة تذكير آلية ترسل تنبيهات مبكرة للشركات قبل انتهاء السجلات التجارية، الرخص، أو الاشتراكات السنوية.
• **المشكلة:** الغرامات المالية المفاجئة بسبب نسيان مواعيد التجديد الرسمية.
• **طريقة الربح:** باقة سنوية ثابتة أو 9$ شهرياً.

### 4. أداة جمع تقييمات العملاء وتوثيقها بالفيديو
صفحة بسيطة ترسل رابطاً سريعاً للعميل ليسجل مراجعة فيديو قصيرة في 30 ثانية مع ترخيص النشر.
• **المشكلة:** التقييمات المكتوبة تفقد مصداقيتها، ومراجعات الفيديو صعبة الجمع.
• **طريقة الربح:** 25$ شهرياً مع إمكانية تضمين التقييمات في أي موقع بسهولة.

### 5. حاسبة التسعير السريع لعروض الأسعار للمقاولين والمصممين
تطبيق سريع لحساب تكاليف المشاريع وإصدار عرض سعر احترافي (Quote) للعميل في أقل من دقيقتين.
• **المشكلة:** تضييع أيام في صياغة عروض الأسعار مما يفقد العميل حماسه.
• **طريقة الربح:** تجربة مجانية ثم 12$ شهرياً.

---
💡 خطوتك التالية المقترحة: اختر الفكرة الأقرب لخبرتك وابدأ بإنشاء صفحة هبوط أولية (Landing Page) لمعرفة رغبة العملاء قبل كتابة سطر برمجي واحد.`;
      }

      return `مرحباً بك! إليك 5 أفكار لمشاريع Micro-SaaS عملية ومربحة، مصممة ليتمكن مطور أو صانع محتوى مستقل من بنائها وإطلاقها بنموذج اشتراك شهري مستدام:

### 1. منصة أتمتة الردود والمبيعات في الرسائل الخاصة
أداة سحابية خفيفة ترسل تفاصيل المنتج ورابط الشراء الفوري بمجرد كتابة المتابع كلمة معينة في التعليقات أو الخاص.
• **المشكلة:** أصحاب المتاجر وصناع المحتوى يضيعون مبيعات يومية بسبب التأخر في الرد على استفسارات الأسعار.
• **الجمهور المستهدف:** المتاجر الإلكترونية الصغيرة، المدربون، وصناع المحتوى.
• **نموذج الربح:** اشتراك شهري متدرج (من 15$ إلى 49$ شهرياً).

### 2. محول المحتوى الطويل إلى منشورات مهنية
أداة تستخرج أهم الأفكار من المقالات أو مقاطع البودكاست وتصيغها في منشورات تفاعلية جاهزة لشبكات LinkedIn و X.
• **المشكلة:** الشركات والخبراء يملكون محتوى قيماً لكنهم يعانون من ضيق الوقت لتكييفه لكل منصة.
• **الجمهور المستهدف:** رواد الأعمال، مسؤولو التسويق، وصناع المحتوى المهني.
• **نموذج الربح:** خطة أساسية بـ 19$ وخطة متقدمة بـ 49$ شهرياً.

### 3. أداة الفواتير السريعة مع الدفع الفوري
تطبيق ويب خفيف ينشئ فواتير متعددة العملات في أقل من دقيقة، مع روابط دفع مباشرة وتتبع تلقائي للفواتير المتأخرة.
• **المشكلة:** برامج المحاسبة التقليدية معقدة وباهظة للمستقل الذي يريد فقط إرسال فاتورة أنيقة وتحصيل أمواله.
• **الجمهور المستهدف:** المستقلون والمصممون والمطورون في العالم العربي.
• **نموذج الربح:** خطة مجانية لـ 3 فواتير، وخطة غير محدودة بـ 9$ شهرياً.

### 4. مدقق الظهور في خرائط جوجل للمتاجر المحلية
فحص دوري لنشاط Google Business Profile وإرسال تقرير أسبوعي مبسّط ينبه المالك بنواقص التقييمات والكلمات المفتاحية.
• **المشكلة:** أصحاب المحلات والعيادات يجهلون سبب تراجع ظهورهم في نتائج البحث المحلية القريبة.
• **الجمهور المستهدف:** المتاجر المحلية، المطاعم، ومقدمو الخدمات.
• **نموذج الربح:** 29$ شهرياً لكل فرع مع تنبيهات ذكية.

### 5. نظام إدارة الاشتراكات والنفقات للفرق الصغيرة
لوحة تحكم واحدة تجمع بطاقات الاشتراكات وترسل تنبيهاً ذكياً قبل كل تجديد بـ 3 أيام لاقتراح الإلغاء أو الاستمرار.
• **المشكلة:** الفرق الصغيرة تنسى مواعيد تجديد الأدوات السحابية وتفاجأ بخصومات دورية لأدوات غير مستخدمة.
• **الجمهور المستهدف:** الوكالات الرقمية والشركات الناشئة وفرق العمل عن بعد.
• **نموذج الربح:** 14$ شهرياً للفريق.

---
💡 خطوتك التالية المقترحة:
اختر الفكرة التي تحل مشكلة واجهتها بنفسك أو تعرف من يعاني منها، وابدأ ببناء نموذج أولي مبسط (MVP) خلال أسبوعين لاختبار جاهزية الدفع لدى أول 5 عملاء.`;
    } else {
      return `Here are 5 practical and profitable Micro-SaaS project ideas designed for solo founders:

### 1. Social DM Sales Closer
A lightweight automation tool that sends instant product details and checkout links whenever a user comments a keyword on a post.
• **Problem:** Creators and boutique sellers lose sales due to delayed direct message responses.
• **Monetization:** $19 to $49/month tiered subscription.

### 2. Long-Form Content Repurposer
Transforms blog posts and podcast transcripts into ready-to-publish threads and carousels for LinkedIn and X.
• **Problem:** Founders have valuable long-form ideas but lack the time to reformat them daily.
• **Monetization:** $19/month basic plan, $49/month pro plan.

### 3. Instant Invoicer with Direct Checkout
Enables freelancers to create multi-currency branded invoices with one-click payment links in under 60 seconds.
• **Problem:** Legacy accounting platforms are bloated and expensive for simple billing needs.
• **Monetization:** Free tier up to 3 invoices, $9/month unlimited.

### 4. Local Search Rank Tracker
Weekly automated checkups that audit Google Business profiles and advise shop owners on missing reviews and search visibility.
• **Problem:** Local retailers lose walk-in customers when their local ranking drops.
• **Monetization:** $29/month per location.

### 5. Small Team SaaS Spend Auditor
Monitors team subscription renewals and alerts the owner 3 days before renewal to prevent unwanted charges.
• **Problem:** Small teams waste hundreds each month on dormant software seats.
• **Monetization:** $14/month flat team fee.

---
💡 Next Step: Choose the idea closest to your domain expertise and test customer demand before building.`;
    }
  }

  // 4. User asks for ideas (e.g. "عطيني 10 أفكار لفيديوهات YouTube عن الربح من الإنترنت" or similar)
  if (lowerMsg.includes('أفكار') || lowerMsg.includes('افكار') || lowerMsg.includes('ideas') || lowerMsg.includes('عطيني') || lowerMsg.includes('مقترحات') || quickActionId === 'ai-content-ideas') {
    // Extract topic
    let topic = 'الربح من الإنترنت وصناعة المحتوى';
    const topicMatch = lastUserMsg.match(/(?:عن|في|حول|على|about|on|pour)\s+([^\n\.\?!,]+)/i);
    if (topicMatch && topicMatch[1]?.trim().length > 2) {
      topic = topicMatch[1].trim();
    }

    if (isRegenerate && isAr) {
      return `إليك 5 أفكار بديلة بزوايا محتوى جديدة لـ (${topic}):

### 1. تجربة واقعية عكس التوقعات
"جربت عكس ما ينصح به الجميع في ${topic} لمدة 30 يوماً.. وهذه كانت النتيجة الصادمة"
مقارنة صريحة بين النظريات السائدة والواقع العملي مع مشاركة النتائج الحقيقية.

### 2. كشف التكاليف الحقيقية دون مبالغات
"كم كلفني البدء في ${topic} بالضبط؟ كشف حساب تفصيلي بدون تجميل"
شفافية عالية تجذب المتابعين الجادين وتكسب ثقتهم من أول دقيقة.

### 3. دليل الاختصار لعام 2026
"كيف تسبق 90% من المبتدئين في ${topic} باستخدام هذه الأدوات المجانية الثلاث"
طرح حلول ذكية وعملية توفر على المشاهد أشهراً من التجربة العشوائية.

### 4. دراسة حالة لقصة نجاح من الصفر
"تحليل كيف وصل مبتدئ إلى أول نتائج ملموسة في ${topic} خلال 90 يوماً"
شرح الخطوات اليومية التي يمكن لأي شخص تكرارها بنفسه.

### 5. تجنب الخطأ الأكثر شيوعاً
"الفخ الوحيد الذي يعطل نجاح أغلب صانعي المحتوى في ${topic} وكيف تتفاداه اليوم"
نصيحة وقائية دقيقة توفر وقت وجهد المشاهدين.

💡 **خطوتك القادمة:** اختر الفكرة الأقرب لأسلوبك وابدأ بتصويرها أو إعداد محتواها وفق هيكل (هوك قوي + قيمة سريعة + دعوة للتفاعل).`;
    }

    if (isAr) {
      return `إليك 10 أفكار محتوى قوية ومتنوعة لمجال (${topic}):

### 1. زاوية التجربة والتحدي الواقعي
"جربت أحدث طريقة لـ ${topic} لمدة 7 أيام متواصلة (النتيجة الحقيقية)"
توثيق عملي للتجربة اليومية ومشاركة الأرقام والعقبات الصادقة بدون تجميل.

### 2. كشف الأخطاء الشائعة
"الخطأ الذي يفعله 95% من المبتدئين في ${topic} ويضيع عليهم شهوراً"
تنبيه صريح يلفت انتباه المتابعين ويصحح المفاهيم الخاطئة التي تعطل تقدمهم.

### 3. تفكيك التكاليف والبدائل المجانية
"قبل أن تدفع دولاراً واحداً في كورس لـ ${topic}، شاهد هذا الفيديو"
تقديم أدوات ومصادر مجانية بديلة تختصر الوقت والمال وتمنح قيمة حقيقية وفورية.

### 4. أدوات تسريع الإنجاز والذكاء الاصطناعي
"3 أدوات ذكية ومجانية تجعل العمل في ${topic} أسهل بـ 10 أضعاف"
استعراض سريع لأدوات تزيد الإنتاجية وتوفر الساعات اليومية المهدرة.

### 5. خطة البداية من الصفر (0 إلى 1)
"لو بدأت من الصفر اليوم في ${topic} بدون رأس مال، هكذا سأبدأ"
خارطة طريق لـ 30 يوماً مقسمة لمهام أسبوعية واضحة ومحددة.

### 6. المقارنة المباشرة
"الطريقة التقليدية مقابل الطريقة الذكية في ${topic}"
مقارنة عملية سريعة توضح كيف تطور المجال وما الذي ينجح فعلياً حالياً.

### 7. الاستراتيجيات التفاعلية لجذب الجمهور
"كيف تجعل جمهورك يتفاعل مع كل منشور في ${topic}"
نصائح تفاعلية لصياغة رسائل تلامس احتياجات واهتمامات المتابع وتدفعه للتعليق والمشاركة.

### 8. دراسة الحالة والأرقام
"تحليل مفصل لأول نتائج تم تحقيقها في ${topic}"
استعراض أرقام وخطوات ملموسة تثبت فعالية التطبيق وتلهم المبتدئين.

### 9. إجابات صريحة عن التردد والمخاوف
"هل فعلاً فات الأوان للبدء في ${topic}؟ الجواب بدون مجاملة"
إزالة المخاوف وتوضيح الفرص الحقيقية المتاحة الآن وكيفية اقتناصها.

### 10. التوقعات والترندات القادمة
"كيف سيتغير مجال ${topic} خلال هذا العام وكيف تستعد له"
نظرة استشرافية تساعد المتابع على أن يكون سبّاقاً في مجاله ومواكباً لأحدث الخوارزميات.

💡 **خطوتك القادمة:** اختر الفكرة الأقرب لأسلوبك وابدأ بتصويرها أو إعداد محتواها وفق هيكل (هوك قوي + قيمة سريعة + دعوة للتفاعل).`;
    } else {
      return `Here are 10 high-value content ideas for (${topic}):

### 1. The 7-Day Challenge
"I Tested the Most Popular Strategy for ${topic} for 7 Days (Real Results)"
Documenting daily experience and sharing honest metrics without sugarcoating.

### 2. Common Pitfalls Exposed
"The #1 Mistake 95% of Beginners Make in ${topic}"
Straightforward advice to save viewers months of wasted effort.

### 3. Free Alternatives Blueprint
"Before You Pay for a Course on ${topic}, Watch This"
Highlighting zero-cost tools and resources that deliver immediate value.

### 4. High-Leverage AI Workflows
"3 Free Workflows That Make ${topic} 10x Easier in 2026"
Quick walkthrough of automation tools that boost productivity.

### 5. Zero-to-One Roadmap
"If I Had to Start ${topic} from Scratch with $0, I'd Do This"
A step-by-step 30-day action plan broken into weekly milestones.

### 6. The Modern Comparison
"The Traditional Method vs. The Modern High-Leverage Approach for ${topic}"
A practical breakdown of what actually works right now.

### 7. Audience Retention Blueprint
"How to Keep Viewers Hooked on Your ${topic} Content"
Practical advice on structuring narratives that drive engagement.

### 8. Case Study Breakdown
"How a Complete Beginner Reached Their First Win in ${topic} in 30 Days"
Actionable takeaways that viewers can replicate immediately.

### 9. Debunking Industry Myths
"Is It Truly Too Late to Start in ${topic}? Honest Answer"
Dissecting market realities and showing where real opportunities remain.

### 10. Future Trends & Preparation
"Where ${topic} is Heading This Year and How to Stay Ahead"
A forward-looking perspective to keep your content relevant.

💡 **Next Step:** Pick the angle that resonates most with your audience and begin recording with a strong 3-second hook.`;
    }
  }

  // 4. User asks for Hooks specifically
  if (lowerMsg.includes('hook') || lowerMsg.includes('هوك') || lowerMsg.includes('خطاف') || quickActionId === 'ai-hook-generator') {
    return isAr
      ? `⚡ 5 خطافات افتتاحية (Hooks) خاطفة ومثبتة الفعالية لتثبيت المشاهد في أول ثانيتين:

1️⃣ [هوك الصدمة والتحذير المباشر]:
"توقف عن نشر أي فيديو قبل أن تعرف هذا الشيء الصغير الذي يخفي عنك خوارزميات المنصة!"

2️⃣ [هوك كشف السر والبديل المجاني]:
"أكبر صدمة في هذا المجال هي أن الأداة التي تدفع لها مئات الدولارات، كاين موقع مجاني كيدير نفس الخدمة فـ 3 ثواني!"

3️⃣ [هوك المقارنة بالأرقام والفضول]:
"90% من الناس كيخدموا 8 سوايع باش يوصلوا لهاد النتيجة، بينما المحترفون كيفعلوها بـ 3 نقرات فقط!"

4️⃣ [هوك القصة والتحول الحقيقي]:
"كنت عالقاً فـ نقطة الصفر وكنت باغي نستسلم، حتى جربت هاد القاعدة البسيطة اللي بدلات كلشي..."

5️⃣ [هوك التحدي المثير]:
"أراهنك أنك لو طبقتي هاد الاستراتيجية لـ 48 ساعة فقط، غاتشوف فارق ما شفتيهش فـ 6 أشهر كاملة!"

💡 نصيحة Rikou AI: ادمج الهوك الصوتي مع حركة بصرية مفاجئة (Cut سريع أو نص بارز) لمنع المستخدم من التمرير.`
      : `⚡ 5 High-Converting Opening Hooks:
1️⃣ "Stop making this single mistake before you permanently hurt your reach."
2️⃣ "Nobody is talking about this free tool, and it replaces a $200/mo subscription."
3️⃣ "90% of creators do this backwards. Here is the modern approach."
4️⃣ "I was stuck at zero until I changed this exact single habit..."
5️⃣ "I guarantee you did not know this feature existed for your content."`;
  }

  // 5. User asks for Titles specifically
  if (lowerMsg.includes('عناوين') || lowerMsg.includes('عنوان') || lowerMsg.includes('title') || quickActionId === 'youtube-title-generator') {
    return isAr
      ? `🚀 10 عناوين يوتيوب ذات نسبة نقر للظهور (High CTR) استثنائية:

1. توقف فوراً! الحقيقة الصادمة التي يخفونها عنك في 2026
2. جربت هذه الطريقة لمدة 7 أيام متواصلة... وهذه كانت النتيجة الصادمة!
3. من الصفر إلى أول 1,000$ (الدليل الواقعي بدون كورسات مدفوعة)
4. 5 أسرار خفية ستجعلك تتفوق على 99% من منافسيك في هذا المجال
5. كيف حققت هذا الشيء المستحيل في 48 ساعة فقط؟ (بالأدلة والأرقام)
6. الشرح الذي تمنيت لو شاهدته قبل أن أبدأ قبل سنة كاملة
7. أكبر كذبة يروجها المؤثرون اليوم (ولماذا يجب أن تحذر منها)
8. الدليل الشامل للمبتدئين: خطوة بخطوة من الصفر حتى أول نجاح
9. 3 أدوات مجانية 100% ستغير طريقة عملك إلى الأبد
10. لماذا يفشل 95% من المبتدئين في أول شهر؟ (وكيف تتجنب مصيرهم)

🎯 نصيحة RikouZone: اختر العنوان الذي يثير الفضول دون مبالغة مضللة لتحافظ على رضا المشاهد.`
      : `🚀 10 High-CTR Video Titles:
1. Stop Doing This The Old Way (2026 Guide)
2. I Tested This Strategy for 7 Days (Shocking Results)
3. From Zero to Your First Win (No Paid Courses Required)
4. 5 Hidden Secrets That 99% of Beginners Overlook
5. How I Did This in 48 Hours (Full Transparent Breakdown)
6. The Video I Wish I Watched When I First Started
7. The Biggest Myth in the Creator Economy Right Now
8. Step-by-Step Blueprint for Absolute Beginners
9. 3 Free Tools That Completely Change the Game
10. Why 95% Fail in Month One (And How You Won't)`;
  }

  // 6. User asks for Hashtags
  if (lowerMsg.includes('هاشتاق') || lowerMsg.includes('هاشتاغ') || lowerMsg.includes('hashtag') || quickActionId === 'ai-hashtag-generator') {
    return isAr
      ? `🏷️ حزمة الهاشتاقات الذكية والمتوازنة لـ TikTok و Instagram Reels و YouTube Shorts:

📌 هاشتاقات ذات وصول واسع (Viral Reach):
#صناع_المحتوى #الربح_من_الإنترنت #تطوير_الذات #تقنية #نصائح_ريلز #اكسبلور #ترند #شورتس

🎯 هاشتاقات تخصصية دقيقة (Targeted Niche):
#ريادة_الأعمال #دخل_سلبي #بزنس_أونلاين #فريلانس #مونتاج #صناعة_المحتوى #أفكار_فيديوهات

💡 استراتيجية النشر: ضع 3-5 وسوم فقط في عنوان Shorts، و 5-7 وسوم في كابشن TikTok، و 8-12 وسم في Reels لضمان استهداف الخوارزميات بدقة.`
      : `🏷️ Targeted Hashtag Cloud:
#ContentCreator #OnlineIncome #ViralReels #CreatorEconomy #SideHustle #GrowthHacks #DigitalMarketing #VideoEditing`;
  }

  // 7. Direct Conversational Intelligence (Direct Answer for any query - NEVER ask multi-choice menus!)
  if (isAr) {
    return `### إجابة مباشرة ودليل تطبيقي بخصوص: "${lastUserMsg}"

#### 1. الفكرة والجوهر الأساسي:
في إطار ما سألت عنه، النقطة الجوهرية التي تضمن لك تحقيق أفضل نتيجة هي التركيز على الأساسيات العملية التي تصنع تأثيراً مباشراً. سواء كان هدفك بناء مشروع رقمي، إتقان مهارة تقنية، أو إنتاج محتوى جذاب، فإن تجنب التعقيد والبدء بنموذج مبسط هو المفتاح الحاسم.

#### 2. خطوات التنفيذ المباشرة والعملية:
1. **الخطوة الأولى (التحديد والتخطيط):** حدد النتيجة النهائية المطلوبة بدقة، وركز على حل مشكلة واحدة ملموسة تلبي حاجة حقيقية.
2. **الخطوة الثانية (التطبيق الفوري - Fast Prototyping):** لا تنتظر اكتمال كل الشروط النظرية؛ قم ببناء أول مسودة أو نموذج عملي (MVP) خلال 48 ساعة فقط لاختبار الفكرة عملياً.
3. **الخطوة الثالثة (القياس والتطوير):** اعرض عملك على جمهورك أو عملائك المستهدفين، وقس النتائج بناءً على التفاعل الفعلي والأرقام الواقعية، ثم حسن أسلوبك أسبوعياً.

#### 3. نصيحة عملية للتفوق:
استعن بأدوات الأتمتة والذكاء الاصطناعي لتوفير ساعات العمل الروتيني، وركز طاقتك بالكامل على تقديم جودة استثنائية وبناء علاقة قوية ومستدامة مع جمهورك أو عملائك.`;
  } else if (isFr) {
    return `### Réponse directe et plan d'action concernant : "${lastUserMsg}"

#### 1. L'Essentiel à Retenir :
Pour réussir concrètement sur ce sujet, la clé est de se concentrer sur les actions à fort impact et d'éviter la dispersion.

#### 2. Plan d'Action Immédiat :
1. **Ciblage Précis :** Définissez un objectif clair et résolvez un problème spécifique.
2. **Exécution Rapide :** Créez une première version concrète sous 48 heures sans chercher la perfection prématurée.
3. **Optimisation :** Mesurez les retours réels et ajustez votre méthode de façon itérative.`;
  } else {
    return `### Direct response and actionable blueprint regarding: "${lastUserMsg}"

#### 1. The Core Principle:
To make rapid, tangible progress on this topic, focus on high-leverage execution steps rather than getting lost in passive theory.

#### 2. Actionable Execution Plan:
1. **Laser Focus:** Define one specific outcome and eliminate unnecessary complexity.
2. **Rapid Prototype:** Build and launch a quick test version within 48 hours to validate demand.
3. **Iterate from Feedback:** Measure tangible metrics and double down on what produces results.`;
  }
}

// Backward compatible export for any existing legacy usages
export function executeAITool(toolId: string, values: Record<string, string>, language: 'ar' | 'en' | 'fr' = 'ar'): string {
  const isAr = language === 'ar';
  const topic = values.topic || values.scriptTitle || values.hookSubject || values.concept || (isAr ? 'صناعة المحتوى والربح' : 'Content & Growth');
  const dummyMessages: ChatMessage[] = [
    {
      id: 'legacy-init',
      role: 'user',
      content: `طلب محتوى حول: ${topic}`,
      timestamp: Date.now(),
      quickActionId: toolId,
    },
  ];
  return generateContextualAIResponse(dummyMessages, toolId, language);
}

