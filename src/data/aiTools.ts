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

import { ChatMessage } from '../types';

// Client-side communicator to Server-side Rikou AI Gemini API with seamless intelligent offline fallback
export async function sendChatMessageToRikouAI(
  messages: ChatMessage[],
  quickActionId?: string,
  language: 'ar' | 'en' | 'fr' = 'ar',
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
  language: 'ar' | 'en' | 'fr' = 'ar',
  isRegenerate: boolean = false
): string {
  const isAr = language === 'ar';
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

  // 0.3 Conceptual Explanation Query for SEO ("شنو هو SEO؟" / "What is SEO?")
  if (
    (lowerMsg.includes('شنو هو') || lowerMsg.includes('ما هو') || lowerMsg.includes('شرح') || lowerMsg.includes('اشرح') || lowerMsg.includes('شنو كيعني') || lowerMsg.includes('what is') || lowerMsg.includes('c\'est quoi')) &&
    (lowerMsg.includes('seo') || lowerMsg.includes('سيو') || lowerMsg.includes('search engine'))
  ) {
    return isAr
      ? `### ما هو الـ SEO (تحسين محركات البحث)؟

الـ **SEO** (اختصار لـ *Search Engine Optimization*) هو فن واستراتيجية تهيئة موقعك الإلكتروني أو محتواك ليظهر في المراتب الأولى من نتائج البحث المجانية (Organic Search) على Google عندما يبحث الناس عن كلمات ومواضيع مرتبطة بمجالك.

**ركائز الـ SEO الأساسية الثلاث:**
1. **On-Page SEO (السيو الداخلي):** تحسين المحتوى نفسه، اختيار الكلمات المفتاحية المناسبة، ضبط العناوين (H1, H2)، وتنسيق الروابط الداخلية.
2. **Technical SEO (السيو التقني):** سرعة تحميل الموقع، التوافق التام مع شاشات الهواتف الذكية، وضمان سهولة قراءة الصفحات من قِبل عناكب البحث.
3. **Off-Page SEO (السيو الخارجي):** كسب الروابط الخلفية الموثوقة (Backlinks) والإشارات من مواقع أخرى لبناء ثقة ومصداقية الموقع لدى Google.

**الفائدة الأساسية:** جلب عملاء وزوار مهتمين ومستمرين على مدار الساعة بدون الحاجة لدفع سنتيم واحد في الإعلانات الممولة.

واش تحب نشرح ليك كيفاش تطبق الـ SEO على موقعك أو قناتك على اليوتيوب؟`
      : isFr
      ? `### Qu'est-ce que le SEO (Search Engine Optimization) ?

Le **SEO** (Référencement Naturel) regroupe l'ensemble des techniques permettant de positionner un site web ou un contenu dans les premiers résultats gratuits des moteurs de recherche comme Google.

**Les 3 piliers du SEO :**
1. **SEO On-Page :** Optimisation du contenu, choix des mots-clés stratégiques et balisage sémantique.
2. **SEO Technique :** Vitesse de chargement, adaptabilité mobile et indexabilité par les robots Google.
3. **SEO Off-Page :** Acquisition de liens retour de qualité (Backlinks) pour accroître l'autorité du domaine.

Souhaitez-vous savoir comment appliquer le SEO à un projet spécifique ?`
      : `### What is SEO (Search Engine Optimization)?

**SEO** is the process and methodology of optimizing your website or content to rank higher in unpaid, organic search engine results (like Google and YouTube) for relevant user queries.

**The 3 Core Pillars of SEO:**
1. **On-Page SEO:** High-quality content, targeted keyword placement, header hierarchy, and internal linking.
2. **Technical SEO:** Fast page load speeds, mobile responsiveness, clean site architecture, and indexability.
3. **Off-Page SEO:** Earning reputable backlinks and brand mentions to build domain authority.

**Key Benefit:** Long-term, sustainable, free traffic without continuous ad spend.

Would you like tips on how to apply SEO to your specific website or YouTube channel?`;
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

💬 اختر أي فكرة ترغب في كتابة سكريبت كامل لها، وسأجهزها لك فوراً!`;
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

💬 اختر رقم أي فكرة ترغب في كتابة سكريبت كامل لها، وسأبدأ فوراً!`;
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

💬 Tell me which idea you like best and I'll write the full script right away!`;
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

  // 7. General Conversational / Clarification Response
  return isAr
    ? `أهلاً بك! بخصوص استفسارك: "${lastUserMsg}"

يسعدني مساعدتك في هذا الأمر بشكل مباشر وواضح. هل تفضل:
• **شرحاً مبسطاً وتفصيلياً** للموضوع؟
• **أفكاراً عملية أو خطوات تنفيذية** يمكنك تطبيقها مباشرة؟
• **صياغة سكريبت أو نص إعلاني جاهز**؟

حدد لي ما تفضله أو وضح لي أكثر، وسأقدم لك الإجابة الدقيقة فوراً!`
    : isFr
    ? `Bonjour ! Concernant votre demande : "${lastUserMsg}"

Je suis ravi de vous aider directement. Préférez-vous :
• Une **explication claire et détaillée** du sujet ?
• Des **idées concrètes ou un plan d'action** immédiatement applicable ?
• La **rédaction d'un script ou texte prêt à publier** ?

Précisez ce qui vous convient le mieux et je vous répondrai précisément !`
    : `Hello! Regarding your inquiry: "${lastUserMsg}"

I would be happy to assist you directly. Would you prefer:
• A **clear, direct explanation** of the topic?
• **Actionable ideas or an execution roadmap**?
• A **ready-to-use script or tailored copy**?

Just let me know what works best for you and I will provide the exact response right away!`;
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

