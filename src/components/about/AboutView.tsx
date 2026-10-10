import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  BookOpen, 
  Target, 
  Trophy, 
  Users, 
  CheckCircle2, 
  HeartHandshake,
  Layers,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (tab: string) => void;
}

interface OfferItem {
  title: string;
  description: string;
}

interface AboutDictionary {
  badge: string;
  title: string;
  subtitle: string;
  backToHome: string;
  breadcrumbHome: string;
  breadcrumbAbout: string;
  introTitle: string;
  introText: string;
  visionTitle: string;
  visionText: string;
  whatWeOfferTitle: string;
  offers: OfferItem[];
  whoIsItForTitle: string;
  whoIsItForText: string;
  missionTitle: string;
  missionText: string;
  conclusionTitle: string;
  conclusionText: string;
  explorePathsBtn: string;
  challengesBtn: string;
}

const aboutI18n: Record<string, AboutDictionary> = {
  ar: {
    badge: 'منصة التعليم الرقمي وصناعة المحتوى · 2026',
    title: 'من نحن؟',
    subtitle: 'تعرّف على RikouZone ورسالتنا في مساعدة المبتدئين على اكتساب المهارات الرقمية وبناء فرص العمل عبر الإنترنت بثقة ووضوح.',
    backToHome: 'العودة إلى الرئيسية',
    breadcrumbHome: 'الرئيسية',
    breadcrumbAbout: 'من نحن',
    introTitle: 'مرحباً بك في RikouZone',
    introText: 'مرحباً بك في RikouZone، منصتك للتعليم الرقمي وصناعة المحتوى. أنشأنا هذه المنصة لنسهّل على المبتدئين اكتشاف المجالات الرقمية، وفهم المهارات المطلوبة، والتعرّف على الخطوات الأولى للانطلاق بثقة وبناء مسار رقمي ناجح.',
    visionTitle: 'رؤيتنا',
    visionText: 'نسعى إلى جعل التعليم الرقمي أكثر وضوحاً وسهولة في الوصول، ومساعدة المستخدمين على تطوير مهاراتهم واكتشاف فرص جديدة في العالم الرقمي وفق معايير عملية وتطبيقية.',
    whatWeOfferTitle: 'ماذا تقدم RikouZone؟',
    offers: [
      {
        title: 'مسارات تعليمية منظمة للمبتدئين',
        description: 'خرائط طريق مفصلة من الصفر تقودك خطوة بخطوة وتمنع التشتت في بحر المعلومات.'
      },
      {
        title: 'مجالات متنوعة في صناعة المحتوى والعمل الرقمي',
        description: 'تغطية شاملة لمجالات الفيديو، كتابة الإعلانات، التجارة الإلكترونية، والذكاء الاصطناعي.'
      },
      {
        title: 'شروحات عملية وخطوات واضحة للبدء',
        description: 'أدلة إجرائية واقعية تركز على ما تحتاجه للبدء فوراً وبأقل التكاليف الممكنة.'
      },
      {
        title: 'تحديات وتمارين تساعد على التعلم والتطبيق',
        description: 'اختبارات فهم وتمارين تفاعلية تُثبت المعلومات بالتدريب العملي المستمر.'
      },
      {
        title: 'نظام XP والنقاط لتشجيع الاستمرارية والتقدم',
        description: 'نقاط خبرة وشارات وسلسلة أيام متتالية لبناء عادة التعلم اليومي المنتظم.'
      }
    ],
    whoIsItForTitle: 'لمن هذه المنصة؟',
    whoIsItForText: 'RikouZone موجهة للمبتدئين ولكل شخص يريد اكتساب مهارات رقمية حقيقية، أو تحسين مستواه في صناعة المحتوى، أو استكشاف فرص العمل والربح عبر الإنترنت بأسلوب مهني ومدروس.',
    missionTitle: 'رسالتنا ومبادئنا',
    missionText: 'نؤمن أن التعلم المنظم والممارسة المستمرة يمكن أن يساعدا على تطوير المهارات وبناء فرص أفضل. هدفنا هو توفير تجربة تعليمية مفيدة وواضحة، دون تقديم وعود بأرباح مضمونة أو وهمية.',
    conclusionTitle: 'ابدأ رحلتك التعليمية اليوم',
    conclusionText: 'ابدأ رحلتك مع RikouZone، اكتشف المجال المناسب لك، وتقدم خطوة بخطوة نحو تطوير مهاراتك الرقمية وصناعة مستقبلك.',
    explorePathsBtn: 'استكشاف مسارات التعلم',
    challengesBtn: 'خوض التحديات ونقاط XP'
  },
  ary: {
    badge: 'منصة التعليم الرقمي وصناعة المحتوى · 2026',
    title: 'شكون حنا؟',
    subtitle: 'تعرف على RikouZone والهدف ديالنا باش نعاونوك تفهم المجالات الرقمية وتبدا صناعة المحتوى بثقة وبلا تشتت.',
    backToHome: 'الرجوع للرئيسية',
    breadcrumbHome: 'الرئيسية',
    breadcrumbAbout: 'شكون حنا',
    introTitle: 'مرحباً بيك فـ RikouZone',
    introText: 'مرحباً بيك فـ RikouZone، المنصة ديالك للتعليم الرقمي وصناعة المحتوى. صاوبنا هاد المنصة باش نسهّلو على المبتدئين يكتشفو المجالات الرقمية، يفهمو المهارات اللي مطلوبة، ويتعرفو على الخطوات الأولى باش يبداو بثقة وينجحو.',
    visionTitle: 'الرؤية ديالنا',
    visionText: 'كانسdevاو نخليو التعليم الرقمي واضح وساهل يوصل ليه أي واحد، ونعاونو الشباب يطورو مهاراتهم ويكتشفو فرص حقيقية للخدمة والربح فالعالم الرقمي.',
    whatWeOfferTitle: 'شنو كتقدم ليك RikouZone؟',
    offers: [
      {
        title: 'مسارات تعليمية منظمة للمبتدئين',
        description: 'خريطة طريق واضحة كتمشي معاك درجة بدرجة من الصفر باش ما تدوخش.'
      },
      {
        title: 'مجالات متنوعة فصناعة المحتوى والخدمات الرقمية',
        description: 'فيديو، كتابة إعلانية، تجارة إلكترونية، قوالب رقمية، وذكاء اصطناعي.'
      },
      {
        title: 'شروحات عملية وخطوات واضحة للبداية',
        description: 'نصائح وأدوات حقيقية باش تبدا ديريكت وبأقل تكلفة ممكنة.'
      },
      {
        title: 'تحديات وتمارين كتعاون على التعلم والتطبيق',
        description: 'كويزات وتمارين تطبيقية باش تثبت اللي تعلمتيه فالتطبيق العملي.'
      },
      {
        title: 'نظام XP ونقاط لتشجيع الاستمرارية',
        description: 'نقاط وسلسلة أيام متابعة وشارات باش تحافظ على حماس التعلم كل نهار.'
      }
    ],
    whoIsItForTitle: 'شكون موجهة ليه هاد المنصة؟',
    whoIsItForText: 'RikouZone موجهة للمبتدئين ولكل واحد باغي يكتسب مهارات رقمية، ولا يطور مستواه فصناعة المحتوى، ولا يكتشف فرص الخدمة والربح عبر الإنترنت بطريقة واقعية ونقية.',
    missionTitle: 'الرسالة والمبادئ ديالنا',
    missionText: 'كانآمنو بلي التعلم المنظم والممارسة المستمرة هما اللي كيعاونو على تطوير المهارات وبناء فرص حقيقية. الهدف ديالنا هو نوفرولك تجربة تعليمية مفيدة وواضحة، بلا وعود خاوية ولا أرباح مضمونة بلا خدمة.',
    conclusionTitle: 'بدا الرحلة ديالك دابا',
    conclusionText: 'بدا الرحلة ديالك مع RikouZone، كتاشف المجال اللي كيعجبك، وزيد القدام خطوة بخطوة باش تطور مهاراتك الرقمية.',
    explorePathsBtn: 'شوف مسارات التعلم',
    challengesBtn: 'بدا التحديات وجمع XP'
  },
  en: {
    badge: 'Digital Education & Content Creation Suite · 2026',
    title: 'About Us',
    subtitle: 'Discover RikouZone and our mission to help beginners acquire in-demand digital skills and build sustainable online opportunities.',
    backToHome: 'Back to Home',
    breadcrumbHome: 'Home',
    breadcrumbAbout: 'About Us',
    introTitle: 'Welcome to RikouZone',
    introText: 'Welcome to RikouZone, your digital education and content creation platform. We built this platform to make it simple for beginners to explore digital fields, understand essential skills, and take their very first steps with confidence.',
    visionTitle: 'Our Vision',
    visionText: 'We strive to make digital education clearer, structured, and accessible to everyone, helping users develop tangible skills and discover authentic opportunities in the digital economy.',
    whatWeOfferTitle: 'What Does RikouZone Offer?',
    offers: [
      {
        title: 'Structured learning paths for beginners',
        description: 'Step-by-step blueprints from scratch designed to eliminate overwhelm and confusion.'
      },
      {
        title: 'Diverse fields in content creation & digital work',
        description: 'Comprehensive coverage of video production, copywriting, e-commerce, and AI automation.'
      },
      {
        title: 'Practical walkthroughs & clear launch steps',
        description: 'Actionable guides focusing on what you genuinely need to start today with minimal cost.'
      },
      {
        title: 'Hands-on challenges & interactive exercises',
        description: 'Knowledge quizzes and practical prompts that reinforce learning through active doing.'
      },
      {
        title: 'XP and streak progression system',
        description: 'Gamified experience points and daily streaks designed to nurture lifelong learning habits.'
      }
    ],
    whoIsItForTitle: 'Who Is RikouZone For?',
    whoIsItForText: 'RikouZone is dedicated to beginners and anyone eager to acquire valuable digital skills, elevate their content creation craft, or explore realistic online freelancing and business opportunities.',
    missionTitle: 'Our Mission & Ethics',
    missionText: 'We firmly believe that structured learning and consistent practice are what truly build skills and create sustainable opportunities. Our goal is to provide a transparent, high-value educational experience without deceptive promises of guaranteed wealth.',
    conclusionTitle: 'Start Your Journey Today',
    conclusionText: 'Start your journey with RikouZone, find the domain tailored to your passions, and advance step by step toward digital mastery.',
    explorePathsBtn: 'Explore Learning Paths',
    challengesBtn: 'Conquer Challenges & XP'
  },
  fr: {
    badge: 'Plateforme d’apprentissage digital et de création de contenu · 2026',
    title: 'À propos de nous',
    subtitle: 'Découvrez RikouZone et notre engagement à guider débutants et créateurs vers l’acquisition de compétences digitales pratiques.',
    backToHome: 'Retour à l’accueil',
    breadcrumbHome: 'Accueil',
    breadcrumbAbout: 'À propos',
    introTitle: 'Bienvenue sur RikouZone',
    introText: 'Bienvenue sur RikouZone, votre plateforme dédiée à l’éducation digitale et à la création de contenu. Nous avons conçu cette plateforme pour permettre aux débutants de découvrir les métiers du numérique, d’en comprendre les compétences clés et de franchir leurs premières étapes en toute confiance.',
    visionTitle: 'Notre Vision',
    visionText: 'Nous voulons rendre l’apprentissage digital limpide et accessible à tous, en aidant chaque utilisateur à développer ses compétences et à explorer de nouvelles perspectives dans l’économie numérique.',
    whatWeOfferTitle: 'Que propose RikouZone ?',
    offers: [
      {
        title: 'Parcours d’apprentissage structurés pour débutants',
        description: 'Des feuilles de route progressives pour avancer pas à pas sans dispersion.'
      },
      {
        title: 'Diversité des domaines créatifs et digitaux',
        description: 'Montage vidéo, rédaction persuasive, produits digitaux et automatisation IA.'
      },
      {
        title: 'Guides pratiques et étapes claires pour démarrer',
        description: 'Des recommandations concrètes pour lancer son activité avec un investissement maîtrisé.'
      },
      {
        title: 'Défis et exercices pratiques d’application',
        description: 'Des quiz interactifs et travaux pratiques pour valider ses connaissances par l’action.'
      },
      {
        title: 'Système d’XP et de séries quotidiennes',
        description: 'Des points de progression et des séries stimulantes pour ancrer l’habitude d’apprendre chaque jour.'
      }
    ],
    whoIsItForTitle: 'À qui s’adresse cette plateforme ?',
    whoIsItForText: 'RikouZone s’adresse aux débutants et à toute personne désireuse d’acquérir des compétences numériques solides, d’améliorer son contenu ou d’explorer les opportunités du travail en ligne.',
    missionTitle: 'Notre Mission et nos Valeurs',
    missionText: 'Nous croyons profondément qu’un apprentissage méthodique et une pratique régulière sont les seuls vecteurs de compétences durables. Notre engagement est d’offrir un enseignement rigoureux et réaliste, sans fausses promesses de gains rapides.',
    conclusionTitle: 'Commencez votre parcours',
    conclusionText: 'Lancez votre aventure avec RikouZone, choisissez le domaine qui vous inspire et progressez pas à pas vers l’excellence digitale.',
    explorePathsBtn: 'Explorer les parcours',
    challengesBtn: 'Relever les défis XP'
  },
  es: {
    badge: 'Plataforma de Educación Digital y Creación de Contenido · 2026',
    title: '¿Quiénes somos?',
    subtitle: 'Conoce RikouZone y nuestra misión de formar a nuevos creadores y aprendices en habilidades digitales prácticas y transparentes.',
    backToHome: 'Volver al Inicio',
    breadcrumbHome: 'Inicio',
    breadcrumbAbout: 'Quiénes somos',
    introTitle: 'Bienvenido a RikouZone',
    introText: 'Bienvenido a RikouZone, tu plataforma de educación digital y creación de contenido. Creamos este espacio para facilitar a los principiantes el descubrimiento de áreas digitales, comprender las habilidades demandadas y dar sus primeros pasos con seguridad.',
    visionTitle: 'Nuestra Visión',
    visionText: 'Buscamos que la formación digital sea clara y accesible para todos, ayudando a los usuarios a potenciar sus talentos y encontrar oportunidades genuinas en el entorno digital.',
    whatWeOfferTitle: '¿Qué ofrece RikouZone?',
    offers: [
      {
        title: 'Rutas de aprendizaje organizadas para principiantes',
        description: 'Guías paso a paso diseñadas para aprender sin frustración ni sobrecarga.'
      },
      {
        title: 'Áreas variadas en contenido y trabajo digital',
        description: 'Edición de video, redacción persuasiva, comercio electrónico e inteligencia artificial.'
      },
      {
        title: 'Explicaciones prácticas y pasos claros para empezar',
        description: 'Metodologías comprobadas para iniciar hoy mismo con recursos mínimos.'
      },
      {
        title: 'Desafíos y ejercicios para aprender practicando',
        description: 'Cuestionarios interactivos y ejercicios de aplicación directa.'
      },
      {
        title: 'Sistema de XP y rachas para mantener la constancia',
        description: 'Puntos de experiencia e insignias que motivan el aprendizaje continuo.'
      }
    ],
    whoIsItForTitle: '¿A quién va dirigida esta plataforma?',
    whoIsItForText: 'RikouZone está pensada para principiantes y cualquier persona que desee adquirir habilidades digitales, mejorar su nivel como creador o explorar oportunidades de trabajo en línea.',
    missionTitle: 'Nuestra Misión y Principios',
    missionText: 'Creemos que el estudio estructurado y la práctica constante son la base para construir habilidades sólidas. Nuestra meta es brindar una experiencia útil y honesta, sin falsas promesas de dinero fácil.',
    conclusionTitle: 'Comienza tu camino hoy',
    conclusionText: 'Inicia tu experiencia en RikouZone, descubre el área adecuada para ti y avanza paso a paso en tu desarrollo digital.',
    explorePathsBtn: 'Explorar rutas de aprendizaje',
    challengesBtn: 'Superar desafíos y ganar XP'
  },
  pt: {
    badge: 'Plataforma de Educação Digital e Criação de Conteúdo · 2026',
    title: 'Quem somos?',
    subtitle: 'Conheça o RikouZone e nossa missão de capacitar iniciantes com habilidades digitais reais e metodologias práticas.',
    backToHome: 'Voltar ao Início',
    breadcrumbHome: 'Início',
    breadcrumbAbout: 'Quem somos',
    introTitle: 'Bem-vindo ao RikouZone',
    introText: 'Bem-vindo ao RikouZone, sua plataforma de educação digital e criação de conteúdo. Criamos este projeto para simplificar a jornada de iniciantes na exploração de carreiras digitais e nos primeiros passos rumo à autonomia.',
    visionTitle: 'Nossa Visão',
    visionText: 'Nosso propósito é tornar o aprendizado digital mais claro e acessível, ajudando pessoas a transformarem habilidades em oportunidades no mercado online.',
    whatWeOfferTitle: 'O que o RikouZone oferece?',
    offers: [
      {
        title: 'Trilhas de aprendizagem organizadas para iniciantes',
        description: 'Roteiros estruturados do zero que evitam confusão.'
      },
      {
        title: 'Múltiplas áreas de criação e trabalho digital',
        description: 'Produção audiovisual, copywriting, produtos digitais e inteligência artificial.'
      },
      {
        title: 'Guias práticos e passos diretos para começar',
        description: 'Instruções diretas ao ponto com baixo custo inicial.'
      },
      {
        title: 'Desafios e exercícios para aprendizado ativo',
        description: 'Testes de validação e exercícios práticos que fixam o conhecimento.'
      },
      {
        title: 'Sistema de XP e sequência diária',
        description: 'Pontos e medalhas que estimulam o hábito diário de evolução.'
      }
    ],
    whoIsItForTitle: 'Para quem é esta plataforma?',
    whoIsItForText: 'O RikouZone é voltado para iniciantes e todos que buscam desenvolver competências digitais, aprimorar a criação de conteúdo ou explorar o trabalho online.',
    missionTitle: 'Nossa Missão',
    missionText: 'Acreditamos que estudo metódico e dedicação diária geram resultados sustentáveis. Nosso compromisso é com uma educação transparente, sem promessas ilusórias de dinheiro fácil.',
    conclusionTitle: 'Comece sua jornada',
    conclusionText: 'Dê o primeiro passo no RikouZone, escolha a área que combina com você e evolua continuamente.',
    explorePathsBtn: 'Explorar trilhas',
    challengesBtn: 'Conquistar desafios XP'
  },
  it: {
    badge: 'Piattaforma di Formazione Digitale e Content Creation · 2026',
    title: 'Chi siamo?',
    subtitle: 'Scopri RikouZone e la nostra missione per guidare aspiranti creatori e professionisti digitali verso competenze concrete.',
    backToHome: 'Torna alla Home',
    breadcrumbHome: 'Home',
    breadcrumbAbout: 'Chi siamo',
    introTitle: 'Benvenuto su RikouZone',
    introText: 'Benvenuto su RikouZone, la tua piattaforma per l’istruzione digitale e la creazione di contenuti. Abbiamo creato questo spazio per aiutare i principianti a orientarsi nel mondo digitale e muovere i primi passi con sicurezza.',
    visionTitle: 'La Nostra Visione',
    visionText: 'Puntiamo a rendere la formazione digitale chiara, strutturata e fruibile per chiunque desideri crescere e trovare nuove opportunità sul web.',
    whatWeOfferTitle: 'Cosa offre RikouZone?',
    offers: [
      {
        title: 'Percorsi formativi strutturati per principianti',
        description: 'Piani di studio chiari ideati per procedere con metodo.'
      },
      {
        title: 'Settori diversificati del digitale e dei contenuti',
        description: 'Editing video, copywriting persuasivo, e-commerce e strumenti IA.'
      },
      {
        title: 'Istruzioni operative e passaggi chiari per iniziare',
        description: 'Consigli realistici per partire subito con investimenti minimi.'
      },
      {
        title: 'Sfide ed esercizi per consolidare l’apprendimento',
        description: 'Quiz ed esercitazioni pratiche per apprendere facendo.'
      },
      {
        title: 'Punteggio XP e serie di attività quotidiane',
        description: 'Punti esperienza e traguardi per incentivare la costanza.'
      }
    ],
    whoIsItForTitle: 'A chi è rivolta la piattaforma?',
    whoIsItForText: 'RikouZone è pensata per principianti e per chiunque desideri sviluppare competenze digitali, migliorare nei contenuti o scoprire opportunità nel lavoro online.',
    missionTitle: 'La Nostra Missione',
    missionText: 'Siamo convinti che l’apprendimento costante e la pratica quotidiana siano la chiave del successo. Offriamo formazione onesta e trasparente, senza promesse illusorie di guadagni facili.',
    conclusionTitle: 'Inizia il tuo percorso',
    conclusionText: 'Comincia oggi con RikouZone, individua il tuo ambito preferito e cresci passo dopo passo.',
    explorePathsBtn: 'Esplora i percorsi',
    challengesBtn: 'Affronta le sfide XP'
  },
  de: {
    badge: 'Plattform für digitale Bildung & Content Creation · 2026',
    title: 'Über uns',
    subtitle: 'Erfahre mehr über RikouZone und unsere Mission, Einsteigern praxisnahe digitale Fähigkeiten und klare Wege zu vermitteln.',
    backToHome: 'Zur Startseite',
    breadcrumbHome: 'Startseite',
    breadcrumbAbout: 'Über uns',
    introTitle: 'Willkommen bei RikouZone',
    introText: 'Willkommen bei RikouZone, deiner Plattform für digitale Bildung und Content-Erstellung. Wir haben diese Plattform geschaffen, um Einsteigern den Start in digitale Berufsfelder zu erleichtern und praxisnahes Wissen verständlich zu machen.',
    visionTitle: 'Unsere Vision',
    visionText: 'Wir möchten digitale Bildung zugänglich, transparent und strukturiert gestalten, damit Lernende echte Fähigkeiten entwickeln und neue Chancen im Internet entdecken.',
    whatWeOfferTitle: 'Was bietet RikouZone?',
    offers: [
      {
        title: 'Strukturierte Lernpfade für Einsteiger',
        description: 'Schritt-für-Schritt-Leitfäden für einen zielgerichteten Aufbau von Grund auf.'
      },
      {
        title: 'Vielfältige Themen in Content & Digitalwirtschaft',
        description: 'Videobearbeitung, Copywriting, E-Commerce und KI-Automatisierung.'
      },
      {
        title: 'Praxisnahe Erklärungen und klare erste Schritte',
        description: 'Umsetzbare Ratschläge mit minimalen Einstiegshürden.'
      },
      {
        title: 'Interaktive Übungen und Challenges',
        description: 'Kurze Tests und Praxisaufgaben für aktives, nachhaltiges Lernen.'
      },
      {
        title: 'XP-Punkte und tägliche Serien für Ausdauer',
        description: 'Erfahrungspunkte und Serien zur Förderung kontinuierlicher Lerngewohnheiten.'
      }
    ],
    whoIsItForTitle: 'Für wen ist diese Plattform?',
    whoIsItForText: 'RikouZone richtet sich an Einsteiger und alle, die digitale Fähigkeiten erlernen, ihren Content verbessern oder realistische Möglichkeiten im Online-Bereich erschließen möchten.',
    missionTitle: 'Unsere Mission',
    missionText: 'Wir glauben an methodisches Lernen und kontinuierliche Übung als Fundament echter Kompetenz. Unser Fokus liegt auf verlässlicher Bildung ohne unrealistische Versprechungen.',
    conclusionTitle: 'Starte heute durch',
    conclusionText: 'Starte deine Reise mit RikouZone, entdecke den passenden Bereich und entwickle deine digitalen Fähigkeiten Schritt für Schritt weiter.',
    explorePathsBtn: 'Lernpfade entdecken',
    challengesBtn: 'Challenges & XP starten'
  },
  zh: {
    badge: '数字教育与内容创作平台 · 2026',
    title: '关于我们',
    subtitle: '了解 RikouZone 与我们的使命：帮助初学者踏实掌握数字技能，探索真正的内容创作与在线发展机遇。',
    backToHome: '返回首页',
    breadcrumbHome: '首页',
    breadcrumbAbout: '关于我们',
    introTitle: '欢迎来到 RikouZone',
    introText: '欢迎来到 RikouZone 数字教育与内容创作平台。我们搭建这一平台的初衷，是让初学者能够轻松探索数字技能领域，理解核心要求，满怀信心地迈出第一步。',
    visionTitle: '我们的愿景',
    visionText: '我们致力于让数字技能教育更加清晰、结构化且触手可及，助力学习者提升自身能力，在数字时代发现更多实质性机会。',
    whatWeOfferTitle: 'RikouZone 为您提供什么？',
    offers: [
      {
        title: '为新手量身定制的系统化学习路线',
        description: '从零起步的详细步骤，告别信息过载与迷茫。'
      },
      {
        title: '涵盖内容创作与数字变现的多元领域',
        description: '全面覆盖视频剪辑、文案营销、数字产品与人工智能工具。'
      },
      {
        title: '注重实操的详细入门教程',
        description: '立足实际操作，帮助您以最低门槛快速启动。'
      },
      {
        title: '强化动手能力的互动挑战与测验',
        description: '通过针对性测试与实战练习，在实践中巩固知识。'
      },
      {
        title: '激发持续学习动力的 XP 积分与打卡系统',
        description: '经验值进阶与每日连胜机制，培养终身学习好习惯。'
      }
    ],
    whoIsItForTitle: '本平台适合哪些人群？',
    whoIsItForText: 'RikouZone 专为初学者以及希望掌握高价值数字技能、提升内容创作水准、探索真实网络副业与自主创业机会的广大用户而设计。',
    missionTitle: '我们的理念与原则',
    missionText: '我们坚信系统的学习与持续的实践才能真正铸就技能与未来。我们的目标是提供务实、清晰的教育体验，坚决拒绝一夜暴富等虚假承诺。',
    conclusionTitle: '开启您的学习之旅',
    conclusionText: '即刻与 RikouZone 一同启航，找到契合您的方向，循序渐进地拓展您的数字技能边界。',
    explorePathsBtn: '浏览学习路线',
    challengesBtn: '参与挑战赚取 XP'
  }
};

const offerIcons = [
  TrendingUp,
  Sparkles,
  BookOpen,
  Target,
  Trophy
];

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const { t, language, isRTL } = useLanguage();
  const tAbout = aboutI18n[language] || aboutI18n.ar;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const BreadcrumbArrow = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 pb-24 lg:pb-16 text-zinc-100">
      
      {/* Top Breadcrumb & Return to Home Navigation Bar */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            {tAbout.breadcrumbHome}
          </button>
          <BreadcrumbArrow className="h-3 w-3 text-zinc-600" />
          <span className="text-amber-400 font-bold">{tAbout.breadcrumbAbout}</span>
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-bold text-zinc-300 hover:border-amber-500/40 hover:text-white hover:bg-zinc-850 transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <ArrowIcon className="h-3.5 w-3.5 text-amber-400" />
          <span>{tAbout.backToHome}</span>
        </button>
      </div>

      {/* Main Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-b from-zinc-900/90 via-[#0a0a0d] to-zinc-950 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -top-24 right-1/4 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          
          {/* Official Brand Badge */}
          <div className="flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400 mb-4 font-sans">
            <div className="relative h-4 w-4 shrink-0">
              <img
                src="/file_00000000b1d881f496a6612e6eef85ce.png"
                onError={(e) => {
                  e.currentTarget.src = '/assets/rz-hero-badge.png';
                }}
                alt="RikouZone"
                className="h-full w-full object-contain"
              />
            </div>
            <span>{tAbout.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Rikou<span className="text-amber-400">Zone</span>
            <span className="block text-2xl sm:text-3xl font-extrabold text-zinc-200 mt-2">
              {tAbout.title}
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
            {tAbout.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('income')}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black px-5 py-2.5 text-xs font-black transition-all shadow-md shadow-amber-500/25 active:scale-95 cursor-pointer"
            >
              {tAbout.explorePathsBtn}
            </button>
            <button
              onClick={() => onNavigate('challenges')}
              className="rounded-xl border border-zinc-700 bg-zinc-800/80 hover:border-amber-400 hover:text-amber-300 px-5 py-2.5 text-xs font-bold text-white transition-all cursor-pointer"
            >
              {tAbout.challengesBtn}
            </button>
          </div>

        </div>
      </div>

      {/* Introduction Card */}
      <div className="mt-8 rounded-3xl border border-zinc-800/90 bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              {tAbout.introTitle}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {tAbout.introText}
            </p>
          </div>
        </div>
      </div>

      {/* Vision & Mission Cards Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Vision Card */}
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-zinc-950 p-6 sm:p-7 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              {tAbout.visionTitle}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {tAbout.visionText}
          </p>
        </div>

        {/* Mission & Values Card */}
        <div className="rounded-3xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-zinc-950 p-6 sm:p-7 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              {tAbout.missionTitle}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {tAbout.missionText}
          </p>
        </div>

      </div>

      {/* What RikouZone Offers Section */}
      <div className="mt-8 rounded-3xl border border-zinc-800/90 bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              {tAbout.whatWeOfferTitle}
            </h2>
            <span className="text-xs text-zinc-400">ركائز التعلم العملي والتطبيق المباشر في المنصة</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tAbout.offers.map((offer, index) => {
            const Icon = offerIcons[index] || CheckCircle2;
            return (
              <div
                key={index}
                className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4 sm:p-5 hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-zinc-500">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    {offer.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                    {offer.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Who is RikouZone For? Section */}
      <div className="mt-8 rounded-3xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900/80 via-zinc-950 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {tAbout.whoIsItForTitle}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
                {tAbout.whoIsItForText}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('income')}
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black px-4 py-2.5 text-xs font-black transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer text-center"
            >
              {tAbout.explorePathsBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Conclusion & Action Banner */}
      <div className="mt-8 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-zinc-900/90 to-zinc-950 p-6 sm:p-8 text-center backdrop-blur-xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 mx-auto mb-3">
          <HeartHandshake className="h-6 w-6" />
        </div>
        
        <h2 className="text-xl sm:text-2xl font-black text-white">
          {tAbout.conclusionTitle}
        </h2>
        
        <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
          {tAbout.conclusionText}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black px-5 py-2.5 text-xs font-black transition-all shadow-md shadow-amber-500/25 active:scale-95 cursor-pointer"
          >
            <ArrowIcon className="h-4 w-4" />
            <span>{tAbout.backToHome}</span>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="rounded-xl border border-zinc-700 bg-zinc-850 hover:border-amber-400 hover:text-amber-300 px-5 py-2.5 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>{t.nav.contact || 'تواصل معنا'}</span>
          </button>

          <button
            onClick={() => onNavigate('income')}
            className="rounded-xl border border-zinc-700 bg-zinc-800/80 hover:border-amber-400 hover:text-amber-300 px-5 py-2.5 text-xs font-bold text-white transition-all cursor-pointer"
          >
            {tAbout.explorePathsBtn}
          </button>
        </div>
      </div>

    </div>
  );
};
