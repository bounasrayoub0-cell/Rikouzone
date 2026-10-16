import React, { useState, useMemo } from 'react';
import { Target, Compass, Sparkles, AlertTriangle, ShieldCheck, TrendingUp, DollarSign, Clock, Globe, Award, CheckCircle2, ChevronDown, Check } from 'lucide-react';

interface TiktokNicheData {
  id: string;
  name: string;
  category: string;
  demandLevel: 'مرتفع جداً' | 'مرتفع' | 'متوسط';
  competitionLevel: 'شديدة' | 'متوسطة' | 'منخفضة';
  visualEase: 'سهل جداً (شاشات)' | 'سهل (B-Roll مجاني)' | 'متوسط (توليد ورسوم)';
  monetizationFit: 'تسويق بالعمولة (أدوات وسوفتوير)' | 'منتجات رقمية وقوالب' | 'إعلانات وعضويات' | 'منتجات فيزيائية (أمازون)';
  bestLanguages: string[];
  strengths: string[];
  challenges: string[];
  bRollSources: string[];
  sampleHooks: string[];
  sampleTopics: string[];
}

const TIKTOK_NICHES: TiktokNicheData[] = [
  {
    id: 'ai-tools-tech',
    name: 'شروحات الذكاء الاصطناعي والأدوات التقنية',
    category: 'التكنولوجيا والذكاء الاصطناعي',
    demandLevel: 'مرتفع جداً',
    competitionLevel: 'متوسطة',
    visualEase: 'سهل جداً (شاشات)',
    monetizationFit: 'تسويق بالعمولة (أدوات وسوفتوير)',
    bestLanguages: ['العربية الفصحى', 'الدارجة/المحلية', 'الإنجليزية'],
    strengths: [
      'سهولة إنتاج مرئيات أصلية عبر تسجيل شاشتك الخاصة دون تكلفة B-Roll.',
      'فضول هائل من الجمهور للتعرف على أدوات تختصر وقتهم وتزيد إنتاجيتهم.',
      'أعلى عمولات تسويق بالعمولة؛ برامج الـ SaaS تدفع عمولات شهرية متكررة (20%-40%).'
    ],
    challenges: [
      'سرعة تغير الأدوات وظهور بدائل جديدة أسبوعياً يتطلب مواكبة مستمرة.',
      'ضرورة تجربة الأداة والتأكد من أنها مجانية أو ذات فائدة حقيقية قبل التوصية بها.'
    ],
    bRollSources: ['تسجيلات الشاشة ببرنامج OBS أو QuickTime', 'مكتبات Pexels لقطات كتابة ومكاتب', 'واجهات المواقع الرسمية'],
    sampleHooks: [
      'هذا الموقع السري وفر علي ساعتين من العمل اليومي، ومجاني 100%...',
      'توقف عن كتابة الإيميلات بنفسك؛ هذا الامتداد يكتبها بدلاً منك بنقرة واحدة.',
      '3 أدوات ذكاء اصطناعي لا يريدك مصممو الجرافيك أن تعرفها...'
    ],
    sampleTopics: [
      'أفضل 3 بدائل مجانية لبرنامج Photoshop بالذكاء الاصطناعي',
      'كيف تلخص كتاباً من 300 صفحة في 60 ثانية باستخدام أداة مجانية',
      'طريقة تحويل النص إلى عرض تقديمي احترافي في 3 خطوات'
    ]
  },
  {
    id: 'self-improvement-psychology',
    name: 'تطوير الذات وعلم النفس السلوكي والعادات',
    category: 'التعليم وتطوير الذات',
    demandLevel: 'مرتفع جداً',
    competitionLevel: 'شديدة',
    visualEase: 'سهل (B-Roll مجاني)',
    monetizationFit: 'منتجات رقمية وقوالب',
    bestLanguages: ['العربية الفصحى', 'الإنجليزية'],
    strengths: [
      'ارتباط نفسي وعاطفي عميق مع المشاهد ورغبة مستمرة في تحسين جودة الحياة.',
      'إمكانية بيع منتجات رقمية خفيفة ممتازة (قوالب Notion، مفكرات عادات، ملخصات كتب).',
      'سهولة العثور على لقطات B-Roll سينمائية هادئة في مواقع مجانية كـ Pexels.'
    ],
    challenges: [
      'كثرة المحتوى المكرر يتطلب بناء زاوية معالجة علمية مبنية على دراسات وكتب موثوقة.',
      'تجنب التنمية البشرية السطحية والوعود غير المنطقية للحفاظ على المصداقية.'
    ],
    bRollSources: ['لقطات Pexels للمشي، القراءة، الشروق، وتدوين الملاحظات', 'رسوم خطية متحركة', 'لقطات سينمائية هادئة'],
    sampleHooks: [
      'قاعدة الـ 5 ثوانٍ التي ستنهي تسويفك اليوم إلى الأبد...',
      'لماذا تستيقظ متعباً حتى لو نمت 8 ساعات؟ السر في هذه العادة البسيطة.',
      'إذا كنت تشعر بالتشتت الذهني، جرب هذا التمرين لمدة 60 ثانية...'
    ],
    sampleTopics: [
      'تأثير تقليل الدوبامين: ماذا يحدث لدماغك عند الابتعاد عن الهاتف يوماً كاملاً؟',
      'نظام الكتل الزمنية (Time Blocking): كيف تنظم يومك باحترافية؟',
      'سيكولوجية كتابة الأهداف: لماذا تفشل خطط بداية السنة؟'
    ]
  },
  {
    id: 'history-mysteries-facts',
    name: 'القصص الغامضة والحقائق التاريخية المدهشة',
    category: 'القصص والمعلومات العامة',
    demandLevel: 'مرتفع جداً',
    competitionLevel: 'متوسطة',
    visualEase: 'متوسط (توليد ورسوم)',
    monetizationFit: 'إعلانات وعضويات',
    bestLanguages: ['العربية الفصحى', 'الدارجة/المحلية'],
    strengths: [
      'أعلى معدلات احتفاظ بالمشاهدين (Retention) بفضل عنصر التشويق والحبكة السردية.',
      'جمهور يعشق سلاسل الفيديوهات المترابطة مما يرفع زيارات البروفايل بنسبة كبيرة.',
      'محتوى دائم الخضرة (Evergreen) يستمر في جلب مشاهدات لأشهر بعد نشره.'
    ],
    challenges: [
      'يتطلب تدقيقاً تاريخياً للأسماء والتواريخ منعاً للجدل والتعليقات المصححة.',
      'يحتاج اختيار مؤثرات صوتية (SFX) وموسيقى درامية مرخصة بدقة لتعزيز الإثارة.'
    ],
    bRollSources: ['أرشيف الملكية العامة (Public Domain)', 'لقطات وثائقية تاريخية مرخصة', 'صور أرشيفية بالأبيض والأسود مع حركة خفيفة'],
    sampleHooks: [
      'في عام 1931، اختفت سفينة كاملة في مثلث برمودا، وما وجدوه بداخلها صدم الجميع...',
      'أغرب خدعة حرب في التاريخ نفذها قائد واحد ضد جيش كامل...',
      'هذه الوثيقة السرية ظلت مخفية لمدة 50 عاماً، وإليك ما جاء فيها...'
    ],
    sampleTopics: [
      'قصة اختراع منسي كان سيغير مسار الطاقة في العالم',
      'أغرب 3 أحداث لم يجد لها العلم تفسيراً حتى اليوم',
      'يوم استيقظت مدينة كاملة على ظاهرة جوية مدهشة'
    ]
  },
  {
    id: 'freelance-online-skills',
    name: 'المهارات الرقمية والعمل الحر عبر الإنترنت',
    category: 'المهارات والعمل عبر الإنترنت',
    demandLevel: 'مرتفع',
    competitionLevel: 'متوسطة',
    visualEase: 'سهل جداً (شاشات)',
    monetizationFit: 'تسويق بالعمولة (أدوات وسوفتوير)',
    bestLanguages: ['العربية الفصحى', 'الدارجة المغربية/المحلية'],
    strengths: [
      'جمهور جاد يبحث عن فرص لزيادة دخله وتحسين وضعه المالي.',
      'سهولة توجيه الجمهور لروابط أدوات الاستضافة، قوالب السير الذاتية، ومواقع العمل الحر.',
      'إمكانية تقديم خدمات مباشرة أو استشارات خاصة لصاحب الحساب مستقبلاً.'
    ],
    challenges: [
      'ضرورة التمسك بالواقعية الصارمة وعدم بيع الأحلام الوردية عن الثراء السريع.',
      'تقديم خطوات تطبيقية قابلة للتنفيذ للمبتدئين الذين لا يملكون رأس مال.'
    ],
    bRollSources: ['تسجيل شاشات مواقع العمل الحر (Upwork, Fiverr, Khamsat)', 'إحصائيات ورسوم بيانية', 'لقطات مكتبية عصرية'],
    sampleHooks: [
      '3 مهارات بسيطة يمكنك تعلمها في أسبوع واحد والبدء بتقديمها كخدمة...',
      'إذا كنت تبحث عن أول عميل لك على الإنترنت، توقف عن إرسال نفس الرسالة التقليدية...',
      'كيف تكتب عرض عمل (Proposal) يختاره العميل فوراً بين 20 متقدماً...'
    ],
    sampleTopics: [
      'أدوات مجانية تفيدك في تنظيم مشاريعك كفريلانسر مبتدئ',
      'كيف تسعر خدمتك الأولى دون أن تخسر العميل ودون أن تبخس حقك',
      'أخطاء شائعة تجعل أصحاب المشاريع يتجاهلون ملفك الشخصي'
    ]
  },
  {
    id: 'product-desk-gadgets',
    name: 'مراجعات الأدوات المكتبية والمنتجات المبتكرة',
    category: 'مراجعات المنتجات والأدوات',
    demandLevel: 'مرتفع',
    competitionLevel: 'متوسطة',
    visualEase: 'سهل (B-Roll مجاني)',
    monetizationFit: 'منتجات فيزيائية (أمازون)',
    bestLanguages: ['العربية', 'الإنجليزية'],
    strengths: [
      'النيتش الأقوى للتسويق بالعمولة لمنتجات أمازون ومواقع التجارة الإلكترونية.',
      'نية الشراء (Buyer Intent) لدى المشاهد تكون عالية جداً مقارنة بالمحتوى الترفيهي.',
      'سهولة تجميع قوائم «أفضل 5 مستلزمات للمكتب» أو «أدوات تنظم غرفتك».'
    ],
    challenges: [
      'ضرورة التأكد من شحن وتوفر المنتجات للجمهور المتابع في البلدان المستهدفة.',
      'احترام سياسات المحتوى الترويجي والإفصاح عن روابط الأفيلييت بوضوح.'
    ],
    bRollSources: ['لقطات المنتجات المصرح بها من الشركات', 'تسجيل لقطات يدك الخاصة مع المنتجات إن توفرت', 'لقطات Pexels للمكاتب الأنيقة'],
    sampleHooks: [
      'هذه الأداة الصغيرة بـ 15 دولاراً رتبت كل أسلاك مكتبي نهائياً...',
      '3 مستلزمات مكتبية غيرت طريقة عملي وجعلت التركيز أسهل بمرتين...',
      'إذا كنت تقضي أكثر من 6 ساعات أمام الحاسوب، هذه الأداة ضرورية لراحتك...'
    ],
    sampleTopics: [
      'أفضل 4 ملحقات مكتبية لزيادة الإنتاجية والراحة اليومية',
      'إضاءة الشاشة (ScreenBar): هل تستحق الشراء فعلاً أم مجرد تريند؟',
      'أفكار لتنظيم مساحة العمل بميزانية اقتصادية جداً'
    ]
  },
  {
    id: 'book-summaries-concepts',
    name: 'تلخيصات الكتب والأفكار الفلسفية الملهمة',
    category: 'التعليم وتطوير الذات',
    demandLevel: 'متوسط',
    competitionLevel: 'منخفضة',
    visualEase: 'سهل (B-Roll مجاني)',
    monetizationFit: 'منتجات رقمية وقوالب',
    bestLanguages: ['العربية الفصحى'],
    strengths: [
      'جمهور نخبوي راقٍ يقدّر المعلومة العميقة ويستمر في التفاعل والمتابعة.',
      'انخفاض شدة المنافسة مقارنة بمحتوى الترندات العشوائية.',
      'فرص ممتازة لترويج كتب ورقية عبر أمازون أو كتب صوتية باشتراكات تابعة.'
    ],
    challenges: [
      'يحتاج قراءة وتلخيصاً ذكياً لاستخلاص الفكرة في 40 ثانية دون تشويه الكتاب.',
      'يتطلب نبرة صوتية رصينة وهادئة تدعم الأجواء الفكرية.'
    ],
    bRollSources: ['لقطات تقليب صفحات الكتب والمكتبات العتيقة', 'أقوال مأثورة بنصوص متحركة جميلة', 'لقطات قهوة وهدوء'],
    sampleHooks: [
      'فكرة واحدة من هذا الكتاب ستغير نظرتك للمال إلى الأبد...',
      'أعظم درس تعلمته من كتاب العادات الذرية في 40 ثانية فقط...',
      'الفيلسوف سينيكا كتب هذه النصيحة قبل 2000 عام، وما زالت حلاً لقلقك اليوم...'
    ],
    sampleTopics: [
      'ملخص كتاب «التفكير السريع والبطيء» في دقيقة واحدة',
      'كيف تبني عادة القراءة اليومية حتى لو لم يكن لديك وقت؟',
      '3 مفاهيم ستوية (Stoic Concepts) لتجاوز ضغوط الحياة الحديثة'
    ]
  }
];

export const FacelessTiktokNicheFinder: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [activeNicheId, setActiveNicheId] = useState<string>(TIKTOK_NICHES[0].id);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(TIKTOK_NICHES.map((n) => n.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredNiches = useMemo(() => {
    return TIKTOK_NICHES.filter((niche) => {
      if (selectedCategory !== 'all' && niche.category !== selectedCategory) return false;
      if (selectedLanguage !== 'all' && !niche.bestLanguages.some((l) => l.includes(selectedLanguage))) return false;
      return true;
    });
  }, [selectedCategory, selectedLanguage]);

  const activeNiche = useMemo(() => {
    return TIKTOK_NICHES.find((n) => n.id === activeNicheId) || TIKTOK_NICHES[0];
  }, [activeNicheId]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-400 mb-3">
              <Compass className="h-3.5 w-3.5" />
              <span>مستكشف نيتشات TikTok بدون وجه (Faceless Niche Finder)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              اختر وقيم التخصص المثالي لحسابك القادم
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              قارن بين التخصصات الأكثر طلباً من حيث حجم الجمهور، شدة المنافسة، سهولة إنتاج المواد البصرية المرخصة، ونماذج التسييل والربح الأخلاقي المتاحة.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="bg-zinc-800/80 border border-zinc-700/60 rounded-2xl p-3 text-center min-w-[110px]">
              <div className="text-xs text-zinc-400">التخصصات المتاحة</div>
              <div className="text-lg font-black text-cyan-400">{TIKTOK_NICHES.length} تخصصات</div>
            </div>
            <div className="bg-zinc-800/80 border border-zinc-700/60 rounded-2xl p-3 text-center min-w-[110px]">
              <div className="text-xs text-zinc-400">نسبة التكلفة للبدء</div>
              <div className="text-lg font-black text-emerald-400">$0 مجاناً</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-zinc-400">تصنيف المجال:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {cat === 'all' ? 'جميع التصنيفات' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-400">اللغة:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">كل اللغات</option>
            <option value="العربية الفصحى">العربية الفصحى</option>
            <option value="الدارجة">الدارجة / المحليات</option>
            <option value="الإنجليزية">الإنجليزية</option>
          </select>
        </div>
      </div>

      {/* Niches Grid + Selected Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Niche Selection Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-zinc-400 px-1">اختر التخصص للاطلاع على تحليله المتكامل:</div>
          {filteredNiches.map((niche) => {
            const isSelected = niche.id === activeNiche.id;
            return (
              <div
                key={niche.id}
                onClick={() => setActiveNicheId(niche.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-right ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-950/20 shadow-lg shadow-cyan-500/10'
                    : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/80'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                      {niche.category}
                    </span>
                  </div>
                  <div className="text-left">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        niche.demandLevel === 'مرتفع جداً'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      طلب {niche.demandLevel}
                    </span>
                  </div>
                </div>

                <h3 className="mt-2 text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {niche.name}
                </h3>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80">
                  <div>
                    <span className="text-zinc-500">المنافسة: </span>
                    <span className={niche.competitionLevel === 'شديدة' ? 'text-amber-400' : 'text-zinc-300'}>
                      {niche.competitionLevel}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500">إنتاج المرئيات: </span>
                    <span className="text-cyan-300">{niche.visualEase}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Niche Deep Dive Panel */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-bold text-cyan-400">{activeNiche.category}</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">{activeNiche.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-xl border border-zinc-700">
                  النموذج الربحي: {activeNiche.monetizationFit}
                </span>
              </div>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-zinc-800/50 p-3 rounded-2xl border border-zinc-700/50 text-center">
                <div className="text-[11px] text-zinc-400 mb-1">حجم الطلب</div>
                <div className="text-xs font-black text-emerald-400">{activeNiche.demandLevel}</div>
              </div>
              <div className="bg-zinc-800/50 p-3 rounded-2xl border border-zinc-700/50 text-center">
                <div className="text-[11px] text-zinc-400 mb-1">شدة المنافسة</div>
                <div className="text-xs font-black text-amber-400">{activeNiche.competitionLevel}</div>
              </div>
              <div className="bg-zinc-800/50 p-3 rounded-2xl border border-zinc-700/50 text-center">
                <div className="text-[11px] text-zinc-400 mb-1">سهولة B-Roll</div>
                <div className="text-xs font-black text-cyan-400">{activeNiche.visualEase}</div>
              </div>
              <div className="bg-zinc-800/50 p-3 rounded-2xl border border-zinc-700/50 text-center">
                <div className="text-[11px] text-zinc-400 mb-1">اللغات الأنسب</div>
                <div className="text-[11px] font-bold text-zinc-200 truncate">{activeNiche.bestLanguages.join('، ')}</div>
              </div>
            </div>

            {/* Strengths & Challenges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span>نقاط القوة والميزات</span>
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-300 leading-relaxed">
                  {activeNiche.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span>التحديات والاحتياطات</span>
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-300 leading-relaxed">
                  {activeNiche.challenges.map((ch, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400">•</span>
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* B-Roll Sources */}
            <div className="p-4 rounded-2xl bg-zinc-800/40 border border-zinc-700/60">
              <div className="text-xs font-bold text-cyan-400 mb-2">المصادر البصرية الموصى بها لهذا التخصص:</div>
              <div className="flex flex-wrap gap-2">
                {activeNiche.bRollSources.map((source, i) => (
                  <span key={i} className="text-xs bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-xl text-zinc-200">
                    🎬 {source}
                  </span>
                ))}
              </div>
            </div>

            {/* Sample Hooks Ready to Copy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-300">افتتاحيات مقترحة (Hooks جاهزة للنسخ):</span>
                <span className="text-[11px] text-zinc-500">انقر لنسخ أي خطاف فوراً</span>
              </div>
              <div className="space-y-2">
                {activeNiche.sampleHooks.map((hook, i) => (
                  <div
                    key={i}
                    onClick={() => handleCopy(hook, `hook-${i}`)}
                    className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3 text-xs text-zinc-300 hover:border-cyan-500/40 hover:bg-zinc-900 transition-all cursor-pointer group"
                  >
                    <span className="leading-relaxed">"{hook}"</span>
                    <button className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors shrink-0">
                      {copiedText === `hook-${i}` ? <Check className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Topics */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <div className="text-xs font-bold text-zinc-300">3 أفكار فيديوهات جاهزة للإنتاج:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeNiche.sampleTopics.map((topic, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-zinc-800/30 border border-zinc-700/40 text-[11px] text-zinc-300 leading-relaxed">
                    <span className="text-cyan-400 font-bold block mb-1">فيديو #{i + 1}</span>
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
