import React, { useState, useMemo } from 'react';
import { Target, Compass, Sparkles, AlertTriangle, ShieldCheck, TrendingUp, DollarSign, Clock, Globe, Award, CheckCircle2 } from 'lucide-react';

interface NicheData {
  id: string;
  name: string;
  category: string;
  demandLevel: 'مرتفع جداً' | 'مرتفع' | 'متوسط';
  competitionLevel: 'شديدة' | 'متوسطة' | 'منخفضة';
  rpmTier: 'عالي ($4-$12)' | 'متوسط ($2-$5)' | 'متغير ($1-$4)';
  bestLanguages: string[];
  visualStyle: string;
  strengths: string[];
  risks: string[];
  recommendedMonetization: string[];
  sampleTopics: string[];
}

const NICHES_DATABASE: NicheData[] = [
  {
    id: 'history-doc',
    name: 'الوثائقيات التاريخية والجيوسياسية',
    category: 'التاريخ والمعرفة',
    demandLevel: 'مرتفع جداً',
    competitionLevel: 'متوسطة',
    rpmTier: 'متوسط ($2-$5)',
    bestLanguages: ['العربية الفصحى', 'الإنجليزية'],
    visualStyle: 'خرائط متحركة، صور أرشيفية بالأبيض والأسود، ولقطات تاريخية مع تدرج ألوان سينمائي',
    strengths: [
      'محتوى دائم الخضرة (Evergreen) يستمر في جلب المشاهدات لسنوات طويلة.',
      'جمهور وفي جداً يشاهد الفيديوهات الطويلة (15-30 دقيقة) مما يرفع متوسط المشاهدة.',
      'سهولة الوصول لمواد أرشيفية مفتوحة في الملكية العامة (Public Domain).'
    ],
    risks: [
      'يتطلب تدقيقاً تاريخياً صارماً لتفادي الأخطاء في التواريخ والأسماء.',
      'احتمالية الجدل السياسي أو الحساسيات الإقليمية في التعليقات.',
      'المونتاج يتطلب وقتاً أطول في تحريك الخرائط والوثائق.'
    ],
    recommendedMonetization: ['إعلانات يوتيوب AdSense', 'رعايات خدمات VPN وكتب صوتية', 'عضويات القناة (Patreon)'],
    sampleTopics: [
      'كيف بنيت أعظم قلعة دفاعية في العصور الوسطى؟',
      'الـ 48 ساعة التي سبقت اندلاع أزمة الصواريخ الكوبية',
      'أسرار سقوط إمبراطورية التجارة البحرية'
    ]
  },
  {
    id: 'tech-ai',
    name: 'التكنولوجيا وأدوات الذكاء الاصطناعي',
    category: 'التقنية والابتكار',
    demandLevel: 'مرتفع جداً',
    competitionLevel: 'شديدة',
    rpmTier: 'عالي ($4-$12)',
    bestLanguages: ['العربية', 'الإنجليزية'],
    visualStyle: 'تسجيلات شاشة واضحة، رسوم متحركة لواجهات البرامج، ومقارنات بصرية سريعة',
    strengths: [
      'معدل RPM ممتاز لجذب معلنين من قطاعات التكنولوجيا والبرمجيات ذات الإنفاق العالي.',
      'فرص خيالية للتسويق بالعمولة (Affiliate Marketing) للأدوات الرقمية والاشتراكات الشهرية.',
      'موضوع متجدد أسبوعياً مع صدور تحديثات ونماذج جديدة باستمرار.'
    ],
    risks: [
      'المحتوى يفقد قيمته بسرعة إذا صدر تحديث يلغي الأداة القديمة.',
      'المنافسة شرسة وتتطلب سرعة فائقة في تغطية الأخبار فور صدورها.',
      'الحاجة لمواكبة تقنية مستمرة واختبار الأدوات عملياً.'
    ],
    recommendedMonetization: ['تسويق بالعمولة لأدوات SaaS وAI', 'رعايات برمجية مباشرة', 'إعلانات AdSense'],
    sampleTopics: [
      'مقارنة عملية بين أفضل 5 أدوات ذكاء اصطناعي للمونتاج',
      'كيف تستخدم النماذج التوليدية في تنظيم عملك اليومي؟',
      'أخطر التطورات في معالجات الحواسيب القادمة'
    ]
  },
  {
    id: 'business-case-studies',
    name: 'قصص وتحليلات الشركات والأعمال',
    category: 'المال والأعمال',
    demandLevel: 'مرتفع',
    competitionLevel: 'متوسطة',
    rpmTier: 'عالي ($4-$12)',
    bestLanguages: ['العربية الفصحى', 'الإنجليزية'],
    visualStyle: 'رسوم بيانية ديناميكية، لقطات للمقرات والمنتجات، وخطوط عريضة أنيقة',
    strengths: [
      'يجذب فئة عمرية راشدة ذات قوة شرائية مرتفعة (25-45 سنة).',
      'سرد درامي مشوق يجمع بين صعود وهبوط الشركات والصراعات التجارية.',
      'رعايات ممتازة من البنوك الاستثمارية، منصات التداول المعتمدة، وأدوات الأعمال.'
    ],
    risks: [
      'ضرورة التمييز بين التحليل المحايد والتشهير أو التطبيل التسويقي.',
      'حاجة لبحث عميق في القوائم المالية والتقارير الصحفية الموثوقة.',
      'الابتعاد التام عن تقديم نصائح استثمارية ملزمة (Disclaimers إلزامية).'
    ],
    recommendedMonetization: ['إعلانات AdSense عالية القيمة', 'رعايات أدوات إنتاجية ومنصات مالية', 'بيع ملخصات واستشارات'],
    sampleTopics: [
      'لماذا فشلت نوكيا رغم أنها كانت تملك كل شيء؟',
      'الاستراتيجية السرية التي أنقذت ليغو من الإفلاس المحقق',
      'كيف تحولت شركة أحذية صغيرة إلى إمبراطورية نايكي العالمية؟'
    ]
  },
  {
    id: 'science-mysteries',
    name: 'العلوم الطبيعية وألغاز الكون والفيزياء',
    category: 'العلوم والمعرفة',
    demandLevel: 'مرتفع جداً',
    competitionLevel: 'متوسطة',
    rpmTier: 'متوسط ($2-$5)',
    bestLanguages: ['العربية الفصحى', 'الإنجليزية'],
    visualStyle: 'محاكاة ثلاثية الأبعاد، صور وكالة ناسا، ورسوم متحركة تبسط النظريات',
    strengths: [
      'فضول إنساني عام لا يقتصر على عمر أو بلد محدد.',
      'فيديوهات طويلة تحقق نسب مشاركة (Shares) عالية جداً بين المهتمين.',
      'توفر مكتبات فلكية وعلمية مجانية هائلة (NASA, ESA, Public Domain).'
    ],
    risks: [
      'تبسيط النظريات المعقدة دون الإخلال بالدقة العلمية يتطلب مجهوداً ذهنياً كبيراً.',
      'الحاجة لمراجعة المصادر العلمية وتجنب نظريات المؤامرة الزائفة.',
      'صعوبة إيجاد لقطات لبعض المفاهيم المجردة (يتطلب رسوماً توضيحية).'
    ],
    recommendedMonetization: ['إعلانات يوتيوب', 'رعايات منصات تعليمية وكورسات', 'منتجات وهدايا علمية مخصصة'],
    sampleTopics: [
      'ماذا يحدث إذا اقتربت سفينة فضائية من أفق الحدث لثقب أسود؟',
      'مفارقة فيرمي: أين الجميع ولماذا لم نتلقَ إشارة من كائنات أخرى؟',
      'أغرب 4 ظواهر فيزيائية في أعماق المحيطات'
    ]
  },
  {
    id: 'productivity-psychology',
    name: 'علم النفس السلوكي وتطوير الذات والإنتاجية',
    category: 'تطوير الذات',
    demandLevel: 'مرتفع',
    competitionLevel: 'شديدة',
    rpmTier: 'عالي ($4-$12)',
    bestLanguages: ['العربية الفصحى', 'الإنجليزية'],
    visualStyle: 'مونتاج مينيمالي هادئ، رسوم خطية توضيحية، وألوان مريحة للعين',
    strengths: [
      'ارتباط عاطفي عميق مع المشاهد ورغبة مستمرة في تحسين الحياة اليومية.',
      'إمكانية بيع منتجات رقمية (قوالب Notion، مفكرات رقمية، وتلخيصات كتب).',
      'سهولة إنتاج فيديوهات بصرية تعتمد على الخطوط والمؤثرات الصوتية الناعمة.'
    ],
    risks: [
      'كثرة المحتوى السطحي والكليشيهات يتطلب بناء أسلوب تحليلي عميق مبني على دراسات.',
      'ضرورة تجنب لغة التنمية البشرية الوهمية والوعود غير المنطقية.',
      'المنافسة قوية في المنصات القصيرة (Shorts/Reels).'
    ],
    recommendedMonetization: ['بيع قوالب Notion ومفكرات رقمية', 'رعايات تطبيقات العادات والتركيز', 'إعلانات AdSense'],
    sampleTopics: [
      'سيكولوجية التسويف: لماذا نؤجل ما نعلم أنه الأهم لمستقبلنا؟',
      'نظام الكتل الزمنية (Time Blocking): كيف تنظم يومك باحترافية؟',
      'أثر تقليل الدوبامين على استعادة التركيز الذهني العميق'
    ]
  },
  {
    id: 'software-tutorials',
    name: 'شروحات البرامج والمهارات الرقمية',
    category: 'التعليم والتدريب',
    demandLevel: 'مرتفع',
    competitionLevel: 'متوسطة',
    rpmTier: 'متوسط ($2-$5)',
    bestLanguages: ['العربية', 'الإنجليزية'],
    visualStyle: 'تسجيل شاشة مباشر بدقة 60FPS، تكبير على الأدوات (Zoom In)، وترقيم الخطوات',
    strengths: [
      'أسهل نيتش في الإنتاج؛ لا يتطلب مكتبات B-Roll مكلفة بل شاشتك الخاصة.',
      'نسبة بحث مستمرة (Search Evergreen)؛ الناس تبحث عن حلول لمشاكل برمجية يومياً.',
      'نسبة احتفاظ عالية لأن المشاهد يتابع الخطوات للتطبيق العملي.'
    ],
    risks: [
      'تحديثات واجهات البرامج قد تجعل الشرح قديماً بعد عام أو عامين.',
      'معدل نمو المشتركين أبطأ من القنوات الترفيهية والوثائقية.',
      'المشاهد قد يغادر فور حل مشكلته المحددة (يتطلب بناء قوائم تشغيل).'
    ],
    recommendedMonetization: ['تسويق بالعمولة لأدوات التصميم والبرمجة', 'بيع دورات تدريبية متقدمة', 'خدمات دعم وتدريب'],
    sampleTopics: [
      'دليل المبتدئين الشامل لبرنامج CapCut للكمبيوتر في 20 دقيقة',
      'كيف تصمم هوية بصرية كاملة لمشروعك باستخدام أدوات مجانية؟',
      'أسرار تنسيق الجداول المتقدمة في Excel التي توفر ساعات عمل'
    ]
  }
];

export const FacelessNicheFinder: React.FC = () => {
  const [selectedNicheId, setSelectedNicheId] = useState<string>('history-doc');
  const [userInterest, setUserInterest] = useState<number>(8);
  const [availableHours, setAvailableHours] = useState<number>(12);
  const [targetLang, setTargetLang] = useState<'ar' | 'en'>('ar');
  const [hasEditingExperience, setHasEditingExperience] = useState<boolean>(true);

  const selectedNiche = useMemo(() => {
    return NICHES_DATABASE.find((n) => n.id === selectedNicheId) || NICHES_DATABASE[0];
  }, [selectedNicheId]);

  // Suitability calculation algorithm
  const suitabilityScore = useMemo(() => {
    let score = 50;
    // Interest is key (up to +25)
    score += (userInterest - 5) * 5;

    // Time availability
    if (selectedNiche.id === 'history-doc' && availableHours < 10) score -= 15;
    if (selectedNiche.id === 'history-doc' && availableHours >= 14) score += 10;
    if (selectedNiche.id === 'software-tutorials' && availableHours >= 8) score += 10;

    // Editing experience
    if (hasEditingExperience) {
      score += 10;
    } else {
      if (selectedNiche.id === 'software-tutorials') score += 5; // Easy editing
      if (selectedNiche.id === 'history-doc') score -= 10; // Hard editing
    }

    return Math.min(98, Math.max(35, score));
  }, [selectedNiche, userInterest, availableHours, hasEditingExperience]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 via-zinc-900 to-zinc-950 p-5 sm:p-6 shadow-xl shadow-red-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-amber-500 text-black shadow-lg shadow-red-500/30">
              <Compass className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/30 px-2.5 py-0.5 text-xs font-bold text-red-400">
                <Sparkles className="h-3 w-3" />
                <span>أداة التقييم الاستراتيجي للمجالات</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                نيتش Finder: مساعد تقييم واختيار مجال القناة
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2">
            <span className="text-xs font-bold text-zinc-400">نسبة التوافق التقديرية:</span>
            <span className="text-xl font-black text-emerald-400 font-mono">{suitabilityScore}%</span>
          </div>
        </div>
        <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
          قيّم مجالات المحتوى الستة الأكثر ملاءمة لقنوات Faceless بناءً على شغفك الحقيقي، ساعات تفرغك الأسبوعية، خبرتك في المونتاج، مع استعراض نقاط القوة والمخاطر ومصادر الدخل الواقعية.
        </p>
      </div>

      {/* User Input & Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Niche Selector */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
          <label className="text-xs font-bold text-zinc-400 mb-2 block flex items-center gap-1.5">
            <Target className="h-4 w-4 text-red-400" />
            <span>اختر النيتش للدراسة</span>
          </label>
          <select
            value={selectedNicheId}
            onChange={(e) => setSelectedNicheId(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-bold text-white focus:border-red-500 focus:outline-none"
          >
            {NICHES_DATABASE.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </select>
          <div className="mt-2 text-[11px] text-zinc-400">
            تصنيف: <span className="text-zinc-200 font-bold">{selectedNiche.category}</span>
          </div>
        </div>

        {/* User Interest Slider */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-zinc-400">
              مدى اهتمامك وشغفك بالموضوع
            </label>
            <span className="text-xs font-mono font-black text-amber-400">
              {userInterest} / 10
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={userInterest}
            onChange={(e) => setUserInterest(Number(e.target.value))}
            className="w-full accent-amber-500 h-2 bg-zinc-950 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
            <span>فضول خفيف (1)</span>
            <span>شغف واطلاع دائم (10)</span>
          </div>
        </div>

        {/* Available Weekly Hours */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-zinc-400">
              الوقت الأسبوعي المتاح للإنتاج
            </label>
            <span className="text-xs font-mono font-black text-amber-400">
              {availableHours} ساعات / أسبوع
            </span>
          </div>
          <input
            type="range"
            min={4}
            max={30}
            step={2}
            value={availableHours}
            onChange={(e) => setAvailableHours(Number(e.target.value))}
            className="w-full accent-amber-500 h-2 bg-zinc-950 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
            <span>4 ساعات (ضيق)</span>
            <span>15 ساعة (متوازن)</span>
            <span>30 ساعة</span>
          </div>
        </div>

        {/* Editing experience toggle */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 flex flex-col justify-between">
          <div className="text-xs font-bold text-zinc-400 mb-1">
            مستواك الحالي في برامج المونتاج
          </div>
          <button
            onClick={() => setHasEditingExperience(!hasEditingExperience)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
              hasEditingExperience
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            <span>{hasEditingExperience ? 'متوسط / متقدم (قص، نصوص، صوت)' : 'مبتدئ تماماً (أتعلم الآن)'}</span>
            <CheckCircle2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Niche Analysis Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Metrics Column */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg space-y-3">
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-wider">
              المؤشرات الاقتصادية للنيتش
            </h3>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex justify-between items-center">
              <span className="text-xs text-zinc-400 font-bold">حجم الطلب والبحث:</span>
              <span className="text-xs font-black text-emerald-400">{selectedNiche.demandLevel}</span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex justify-between items-center">
              <span className="text-xs text-zinc-400 font-bold">حدة المنافسة:</span>
              <span className="text-xs font-black text-amber-400">{selectedNiche.competitionLevel}</span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex justify-between items-center">
              <span className="text-xs text-zinc-400 font-bold">مستوى الـ RPM التقديري:</span>
              <span className="text-xs font-black text-cyan-400">{selectedNiche.rpmTier}</span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-[11px] text-zinc-400 font-bold block mb-1">النمط البصري النموذجي:</span>
              <span className="text-xs text-zinc-300 leading-relaxed block">{selectedNiche.visualStyle}</span>
            </div>
          </div>

          {/* Sample Topics */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg">
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-wider mb-2">
              نماذج لعناوين فيديوهات ناجحة في هذا المجال
            </h3>
            <div className="space-y-2">
              {selectedNiche.sampleTopics.map((topic, i) => (
                <div key={i} className="text-xs text-zinc-200 p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-start gap-2">
                  <span className="h-4 w-4 rounded-full bg-red-500/20 text-red-400 text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strengths & Risks Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-5 shadow-lg">
              <h3 className="text-sm font-black text-emerald-400 flex items-center gap-2 mb-3">
                <ShieldCheck className="h-4 w-4" />
                <span>أهم نقاط القوة والفرص</span>
              </h3>
              <div className="space-y-2.5">
                {selectedNiche.strengths.map((str, idx) => (
                  <div key={idx} className="text-xs text-zinc-300 flex items-start gap-2 leading-relaxed">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5"></span>
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risks */}
            <div className="rounded-2xl border border-red-500/30 bg-red-950/10 p-5 shadow-lg">
              <h3 className="text-sm font-black text-red-400 flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4" />
                <span>المخاطر والتحديات التشغيلية</span>
              </h3>
              <div className="space-y-2.5">
                {selectedNiche.risks.map((risk, idx) => (
                  <div key={idx} className="text-xs text-zinc-300 flex items-start gap-2 leading-relaxed">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 shrink-0 mt-1.5"></span>
                    <span>{risk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Monetization Mix */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg">
            <h3 className="text-sm font-black text-white flex items-center gap-2 mb-3">
              <DollarSign className="h-4 w-4 text-amber-400" />
              <span>مزيج مصادر الدخل الموصى به لهذا النيتش</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {selectedNiche.recommendedMonetization.map((mix, i) => (
                <div key={i} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-amber-300 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                  <span>{mix}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-zinc-400 leading-relaxed">
              💡 <span className="font-bold text-zinc-300">نصيحة المنصة:</span> لا تعتمد على أرباح الإعلانات وحدها في أي نيتش؛ بناء مسار دخل بديل (كالرعايات أو التسويق بالعمولة) يمنحك استقراراً مالياً يسمح لقناتك بالنمو الهادئ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
