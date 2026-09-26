import React, { useState } from 'react';
import { 
  Calculator, 
  Search, 
  Globe, 
  Copy, 
  Check, 
  Sparkles, 
  Award, 
  Layers, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Sliders, 
  Star, 
  RotateCcw,
  Smartphone,
  Monitor,
  HelpCircle,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface BloggingCalculatorsProps {
  onCopyText: (text: string, label: string) => void;
}

export const BloggingCalculators: React.FC<BloggingCalculatorsProps> = ({ onCopyText }) => {
  const [activeTool, setActiveTool] = useState<'niche-evaluator' | 'serp-simulator' | 'outline-builder' | 'onpage-checklist'>('niche-evaluator');

  // --- TOOL 1: Niche Evaluator State (3 Niches Comparison) ---
  const [niches, setNiches] = useState([
    { name: 'القهوة المختصة وأدوات التحضير', demand: 8, competition: 7, intent: 9, evergreen: 9, monetization: 8 },
    { name: 'أدوات الذكاء الاصطناعي للمحامين', demand: 6, competition: 9, intent: 10, evergreen: 8, monetization: 9 },
    { name: 'الأخبار التقنية والهواتف الذكية', demand: 10, competition: 2, intent: 5, evergreen: 3, monetization: 6 }
  ]);

  const calculateNicheScore = (n: typeof niches[0]) => {
    // Score out of 50
    return n.demand + n.competition + n.intent + n.evergreen + n.monetization;
  };

  const getScoreVerdict = (score: number) => {
    if (score >= 42) return { text: 'نيتش ذهبي فائق الجدوى 🌟', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    if (score >= 34) return { text: 'نيتش واعد ومناسب جداً للمبتدئ ✅', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    if (score >= 26) return { text: 'نيتش متوسط يحتاج لجهد إضافي ⚠️', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' };
    return { text: 'نيتش غير مناسب (منافسة شرسة أو ربح ضعيف) ❌', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
  };

  const updateNiche = (index: number, field: string, value: any) => {
    const updated = [...niches];
    updated[index] = { ...updated[index], [field]: value };
    setNiches(updated);
  };

  // Best niche index
  const bestNicheIndex = niches.reduce((bestIdx, curr, idx, arr) => {
    return calculateNicheScore(curr) > calculateNicheScore(arr[bestIdx]) ? idx : bestIdx;
  }, 0);

  // --- TOOL 2: SERP Simulator State ---
  const [serpTitle, setSerpTitle] = useState('أفضل 7 استضافات ووردبريس سريعة في 2026 (مقارنة عملية بالأسعار)');
  const [serpSlug, setSerpSlug] = useState('best-wordpress-hosting');
  const [serpDomain, setSerpDomain] = useState('mycoolsite.com');
  const [serpDesc, setSerpDesc] = useState('اكتشف أفضل استضافة لموقعك مع تجارب سرعة حقيقية وأسعار حصرية للمبتدئين. قارن بين الخطط وتجنب الاستضافات البطيئة بضغطة واحدة.');
  const [serpView, setSerpView] = useState<'mobile' | 'desktop'>('mobile');
  const [includeRating, setIncludeRating] = useState(true);

  const titleLength = serpTitle.length;
  const descLength = serpDesc.length;

  const isTitleGood = titleLength >= 45 && titleLength <= 65;
  const isDescGood = descLength >= 130 && descLength <= 160;

  // --- TOOL 3: Outline Builder State ---
  const [keywordInput, setKeywordInput] = useState('زراعة النعناع في المنزل');
  const [contentType, setContentType] = useState<'guide' | 'comparison' | 'review' | 'how-to'>('how-to');
  const [generatedOutline, setGeneratedOutline] = useState<string>('');

  const generateArticleOutline = () => {
    let outline = '';
    if (contentType === 'how-to') {
      outline = `# العنوان المقترح (H1): كيف تنجح في ${keywordInput} خطوة بخطوة في 2026 (دليل عملي للمبتدئين)

## المقدمة والـ Hook (120 كلمة):
- ملخص الإجابة المباشرة: أهم 3 خطوات سريعة للبدء فوراً في ${keywordInput}.
- لماذا يفشل معظم المبتدئين في البداية وكيف تتفادى ذلك؟
- النتيجة المتوقعة بعد قراءة هذا الدليل.

## H2: الأدوات والمستلزمات الأساسية قبل البدء
- H3: الأدوات الإلزامية الاقتصادية
- H3: أخطاء تجنبها عند شراء المعدات

## H2: خطوات تطبيق ${keywordInput} بالتفصيل
- H3: المرحلة 1: التجهيز والإعداد الصحيح
- H3: المرحلة 2: التنفيذ خطوة بخطوة مع الصور التوضيحية
- H3: المرحلة 3: الرعاية اليومية وجدول المتابعة

## H2: أهم 5 مشكلات وحلولها الفورية (Troubleshooting)
- H3: المشكلة الأكثر شيوعاً وكيف تحلها بنفسك
- H3: متى تحتاج لتغيير الطريقة أو الاستعانة ببديل؟

## H2: الأسئلة الشائعة حول ${keywordInput} (FAQ Schema)
- س: كم من الوقت يستغرق ظهور النتائج؟
  ج: [إجابة مختصرة وواضحة في 40 كلمة].
- س: هل يمكن القيام بذلك بأقل تكلفة ممكنة؟
  ج: [إجابة واضحة مع إشارة للبدائل الرخيصة].

## الخاتمة والدعوة لاتخاذ إجراء (CTA):
- ملخص أهم خطوة يجب أن تبدأ بها اليوم.
- شاركنا تجربتك أو استفسارك في التعليقات أسفل المقال!`;
    } else if (contentType === 'comparison') {
      outline = `# العنوان المقترح (H1): مقارنة شاملة بين [الخيار الأول] و [الخيار الثاني] حول ${keywordInput}: أيهما يستحق اختيارك في 2026؟

## المقدمة والـ Hook:
- الحكم السريع (Quick Verdict): لمن يصلح الخيار الأول ولمن يصلح الخيار الثاني؟
- جدول مقارنة سريع في أول الشاشة (الملامح، السعر، التقييم).

## H2: نظرة تفصيلية على الخيار الأول
- H3: أهم المميزات التي تجعله متفوقاً
- H3: أبرز العيوب ونقاط الضعف الصريحة

## H2: نظرة تفصيلية على الخيار الثاني
- H3: لمن يعتبر هذا الخيار هو الحل المثالي؟
- H3: المقارنة السعرية وقيمة مقابل السعر

## H2: المقارنة وجهاً لوجه في 4 معايير حاسمة
- H3: معيار السهولة وتجربة المستخدم
- H3: معيار الأداء والنتائج العملية
- H3: معيار الدعم الفني وخدمة ما بعد الشراء
- H3: معيار التكلفة والعائد على الاستثمار

## H2: الأسئلة المتكررة (FAQ)
- س: أيهما أفضل لميزانية محدودة؟
- س: هل يمكن التبديل بينهما لاحقاً بسهولة؟

## الخلاصة والتوصية النهائية مع زر الشراء (CTA):
- التوصية الصريحة بناءً على نوع المستخدم وميزانيته.`;
    } else if (contentType === 'guide') {
      outline = `# العنوان المقترح (H1): الدليل الشامل لـ ${keywordInput} من الصفر حتى الاحتراف في 2026

## المقدمة:
- ما هو ${keywordInput} ولماذا هو مهم في وقتنا الحالي؟
- خريطة الدليل وأهم المحاور التي ستتعلمها.

## H2: المفاهيم الأساسية التي يجب أن تفهمها أولاً
- H3: تعريف مبسط بعيداً عن المصطلحات المعقدة
- H3: أهمية هذا المجال ومستقبله

## H2: خريطة الطريق العملية للتطبيق خطوة بخطوة
- H3: الخطوة 1: مرحلة التأسيس
- H3: الخطوة 2: مرحلة الممارسة وبناء المهارة
- H3: الخطوة 3: مرحلة التوسع والاحتراف

## H2: أفضل الأدوات والمصادر الموصى بها في 2026
- جدول مقارنة للأدوات المجانية والمدفوعة

## H2: أخطاء كارثية تجنب الوقوع فيها
- سرد 4 أخطاء يقع فيها 90% من المبتدئين

## H2: قسم الأسئلة الشائعة (FAQ Schema)
- 4 أسئلة يبحث عنها الناس في جوجل مع إجابات نموذجية

## الخاتمة وقائمة التدقيق المجانية القابلة للتحميل`;
    } else {
      outline = `# العنوان المقترح (H1): مراجعة وتجربة صريحة لـ ${keywordInput} بعد 6 أشهر: هل يستحق الشراء أم مجرد دعاية؟

## بطاقة التقييم السريع (Quick Score Box):
- التقييم العام: 4.6 / 5
- الإيجابيات الرئيسية والسلبية الكبرى
- السعر ورابط أفضل عرض خصم

## المقدمة:
- لماذا قررت تجربة هذا المنتج/الخدمة شخصياً؟
- لمن صُمم هذا المنتج ولمن لا يصلح؟

## H2: المواصفات والميزات الفعلية بالتفصيل
- H3: ميزة 1 وكيف تعمل في الواقع
- H3: ميزة 2 ومقارنتها مع البدائل في السوق

## H2: التجربة العملية والأرقام الحقيقية
- نتائج الاختبار على مدار الأسابيع الماضية مع لقطات شاشة

## H2: الإيجابيات والسلبيات (Pros & Cons)
- قائمة نقطية صريحة بلا مجاملة

## H2: هل هناك بدائل أفضل بسعر أقل؟
- استعراض بديلين في حال كانت الميزانية لا تسمح

## الحكم النهائي (Final Verdict):
- هل نوصي به؟ نعم/لا ولماذا، مع زر الانتقال للعرض المباشر.`;
    }
    setGeneratedOutline(outline);
  };

  // --- TOOL 4: On-Page SEO Checklist State ---
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({
    'title-keyword': true,
    'title-length': true,
    'meta-desc': false,
    'slug-clean': true,
    'single-h1': true,
    'headings-hierarchy': true,
    'intro-keyword': false,
    'images-alt': false,
    'internal-links': false,
    'external-source': true,
    'mobile-check': true,
    'faq-schema': false
  });

  const checklistItems = [
    { id: 'title-keyword', label: 'الكلمة المفتاحية في بداية عنوان السيو (H1 & Title Tag)' },
    { id: 'title-length', label: 'طول العنوان بين 50 و 65 حرفاً لضمان عدم اقتصاصه في Google' },
    { id: 'meta-desc', label: 'وصف تعريفي مقنع بطول 140-155 حرفاً يحتوي على كلمة فرعية ودعوة للنقر' },
    { id: 'slug-clean', label: 'رابط دائم (Slug) قصير وإنجليزي نظيف خالٍ من الأرقام والتواريخ' },
    { id: 'single-h1', label: 'وجود وسم H1 واحد فقط مخصص لعنوان المقال الرئيسي' },
    { id: 'headings-hierarchy', label: 'تدرج منطقي للعناوين الفرعية (H2 ثم H3) دون قفزات عشوائية' },
    { id: 'intro-keyword', label: 'ذكر الكلمة المفتاحية أو مرادفها في أول 100 كلمة من المقدمة' },
    { id: 'images-alt', label: 'جميع الصور مضغوطة WebP وتحتوي على نصوص بديلة (Alt Text) وصفية' },
    { id: 'internal-links', label: 'إضافة رابطين داخليين على الأقل لمقالات أخرى في نفس العنقود' },
    { id: 'external-source', label: 'وضع رابط خارجي لمصدر موثوق أو دراسة رسمية لدعم معايير E-E-A-T' },
    { id: 'mobile-check', label: 'فحص تنسيق الجداول والخطوط على شاشة الهاتف للتأكد من راحة القراءة' },
    { id: 'faq-schema', label: 'إضافة قسم أسئلة شائعة (FAQ) مهيأ ببيانات منظمة Schema Markup' },
  ];

  const checkedCount = Object.values(checklistState).filter(Boolean).length;
  const checklistPercentage = Math.round((checkedCount / checklistItems.length) * 100);

  const toggleChecklistItem = (id: string) => {
    setChecklistState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetChecklist = () => {
    const fresh: Record<string, boolean> = {};
    checklistItems.forEach(item => fresh[item.id] = false);
    setChecklistState(fresh);
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
      
      {/* Tool Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Calculator className="h-4 w-4" />
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white">
              أدوات ومحاكيات التدوين والسيو التفاعلية
            </h3>
          </div>
          <p className="mt-1 text-xs text-zinc-400">
            أدوات عملية تختصر ساعات من الحيرة وتساعدك في التقييم والمعاينة وهندسة المقالات بدقة
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-zinc-950 border border-zinc-800/80">
          <button
            onClick={() => setActiveTool('niche-evaluator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTool === 'niche-evaluator'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>مقارنة 3 نيتشات</span>
          </button>

          <button
            onClick={() => setActiveTool('serp-simulator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTool === 'serp-simulator'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <Search className="h-3.5 w-3.5" />
            <span>محاكي نتائج Google</span>
          </button>

          <button
            onClick={() => setActiveTool('outline-builder')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTool === 'outline-builder'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>مولد هيكل المقال</span>
          </button>

          <button
            onClick={() => setActiveTool('onpage-checklist')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTool === 'onpage-checklist'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>مدقق On-Page SEO</span>
          </button>
        </div>
      </div>

      {/* --- TOOL 1: NICHE EVALUATOR --- */}
      {activeTool === 'niche-evaluator' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-black text-amber-300 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                تمرين عملي: قارن بين 3 نيتشات لاختيار الفائز الرقمي المؤكد
              </h4>
              <p className="mt-0.5 text-xs text-zinc-300">
                قيّم كل نيتش من 1 إلى 10 في كل معيار لمشاهدة المجموع والنتيجة الاستشارية الفورية.
              </p>
            </div>
            <div className="shrink-0 px-3 py-1 rounded-xl bg-zinc-950 border border-amber-500/30 text-xs font-bold text-amber-400">
              النيتش المتصدر حالياً: <span className="text-white">نيتش #{bestNicheIndex + 1}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {niches.map((niche, idx) => {
              const score = calculateNicheScore(niche);
              const verdict = getScoreVerdict(score);
              const isBest = idx === bestNicheIndex;

              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border p-5 transition-all relative flex flex-col justify-between ${
                    isBest 
                      ? 'border-amber-500/60 bg-gradient-to-b from-amber-500/10 via-zinc-950 to-zinc-950 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/40' 
                      : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700'
                  }`}
                >
                  {isBest && (
                    <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase tracking-wider shadow-md">
                      أفضل خيار موصى به ⭐
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-zinc-400">نيتش مرشح رقم {idx + 1}</span>
                      <div className="text-right">
                        <span className="text-2xl font-black text-white">{score}</span>
                        <span className="text-xs text-zinc-500"> / 50</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="text-[11px] font-bold text-zinc-300 block mb-1">اسم التخصص أو النيتش:</label>
                      <input 
                        type="text"
                        value={niche.name}
                        onChange={(e) => updateNiche(idx, 'name', e.target.value)}
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-700/80 px-3 py-2 text-xs font-bold text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    {/* Sliders */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-zinc-400">حجم الطلب (Demand):</span>
                          <span className="font-bold text-amber-400">{niche.demand}/10</span>
                        </div>
                        <input 
                          type="range" min="1" max="10" 
                          value={niche.demand} 
                          onChange={(e) => updateNiche(idx, 'demand', parseInt(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-zinc-400">سهولة المنافسة (Low Competition):</span>
                          <span className="font-bold text-emerald-400">{niche.competition}/10</span>
                        </div>
                        <input 
                          type="range" min="1" max="10" 
                          value={niche.competition} 
                          onChange={(e) => updateNiche(idx, 'competition', parseInt(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-zinc-400">نية البحث الشرائية (Search Intent):</span>
                          <span className="font-bold text-blue-400">{niche.intent}/10</span>
                        </div>
                        <input 
                          type="range" min="1" max="10" 
                          value={niche.intent} 
                          onChange={(e) => updateNiche(idx, 'intent', parseInt(e.target.value))}
                          className="w-full accent-blue-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-zinc-400">استمرارية المحتوى (Evergreen):</span>
                          <span className="font-bold text-purple-400">{niche.evergreen}/10</span>
                        </div>
                        <input 
                          type="range" min="1" max="10" 
                          value={niche.evergreen} 
                          onChange={(e) => updateNiche(idx, 'evergreen', parseInt(e.target.value))}
                          className="w-full accent-purple-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-zinc-400">قنوات الربح (Monetization):</span>
                          <span className="font-bold text-amber-300">{niche.monetization}/10</span>
                        </div>
                        <input 
                          type="range" min="1" max="10" 
                          value={niche.monetization} 
                          onChange={(e) => updateNiche(idx, 'monetization', parseInt(e.target.value))}
                          className="w-full accent-amber-400 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`mt-5 pt-3 border-t border-zinc-800 text-center rounded-xl p-2.5 text-xs font-bold border ${verdict.color}`}>
                    {verdict.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- TOOL 2: SERP SIMULATOR --- */}
      {activeTool === 'serp-simulator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Input Controls */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-zinc-300">عنوان المقال (SEO Title Tag):</label>
                  <span className={`text-[11px] font-mono font-bold ${isTitleGood ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {titleLength} / 60 حرفاً {isTitleGood ? '✓ ممتاز' : '(الموصى به 50-60)'}
                  </span>
                </div>
                <input 
                  type="text"
                  value={serpTitle}
                  onChange={(e) => setSerpTitle(e.target.value)}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">رابط الموقع (Domain):</label>
                  <input 
                    type="text"
                    value={serpDomain}
                    onChange={(e) => setSerpDomain(e.target.value)}
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">رابط المقال (Slug):</label>
                  <input 
                    type="text"
                    value={serpSlug}
                    onChange={(e) => setSerpSlug(e.target.value)}
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-zinc-300">الوصف التعريفي (Meta Description):</label>
                  <span className={`text-[11px] font-mono font-bold ${isDescGood ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {descLength} / 155 حرفاً {isDescGood ? '✓ ممتاز' : '(الموصى به 140-155)'}
                  </span>
                </div>
                <textarea 
                  rows={3}
                  value={serpDesc}
                  onChange={(e) => setSerpDesc(e.target.value)}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                  <input 
                    type="checkbox" 
                    checked={includeRating} 
                    onChange={(e) => setIncludeRating(e.target.checked)}
                    className="rounded border-zinc-700 text-amber-500 focus:ring-0"
                  />
                  <span>تضمين نجوم المراجعة (Review Schema Snippet)</span>
                </label>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => setSerpView('mobile')}
                    className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 ${
                      serpView === 'mobile' ? 'bg-amber-500 text-black border-amber-500' : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    <span>موبايل</span>
                  </button>
                  <button
                    onClick={() => setSerpView('desktop')}
                    className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 ${
                      serpView === 'desktop' ? 'bg-amber-500 text-black border-amber-500' : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                    <span>حاسوب</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Google SERP Live Simulation Display */}
            <div className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-[#202124] p-5 shadow-inner">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800 text-zinc-400 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">Google</span>
                    <span className="text-[11px] text-zinc-400">معاينة النتائج في الشرق الأوسط (عربي)</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300">
                    {serpView === 'mobile' ? 'شاشة الهاتف' : 'شاشة الحاسوب'}
                  </span>
                </div>

                {/* Google Snippet Card */}
                <div className={`p-4 rounded-xl bg-[#303134]/40 border border-zinc-700/40 text-right ${serpView === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
                  
                  {/* Favicon & Breadcrumb */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="h-6 w-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400 font-bold text-[11px]">
                      {serpDomain.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-medium text-[#bdc1c6] leading-none">{serpDomain}</span>
                      <span className="text-[11px] text-[#9aa0a6] leading-none mt-0.5 font-mono">https://{serpDomain}/{serpSlug}</span>
                    </div>
                  </div>

                  {/* Title Link */}
                  <h4 className="text-[#8ab4f8] hover:underline cursor-pointer text-base sm:text-lg font-medium leading-snug line-clamp-2 mt-1">
                    {serpTitle || 'عنوان المقال التجريبي هنا...'}
                  </h4>

                  {/* Schema Rating if enabled */}
                  {includeRating && (
                    <div className="flex items-center gap-1.5 my-1 text-[11px] text-[#bdc1c6]">
                      <div className="flex text-amber-400">
                        <Star className="h-3 w-3 fill-amber-400" />
                        <Star className="h-3 w-3 fill-amber-400" />
                        <Star className="h-3 w-3 fill-amber-400" />
                        <Star className="h-3 w-3 fill-amber-400" />
                        <Star className="h-3 w-3 fill-amber-400" />
                      </div>
                      <span className="font-bold text-white">4.9</span>
                      <span className="text-zinc-400">(48 تقييماً)</span>
                    </div>
                  )}

                  {/* Meta Description */}
                  <p className="text-[#bdc1c6] text-xs leading-relaxed line-clamp-3 mt-1 font-sans">
                    {serpDesc || 'اكتب وصفاً تعريفياً جذاباً لترى كيف يظهر في نتائج البحث.'}
                  </p>
                </div>
              </div>

              {/* Copy Ready Meta Tags */}
              <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-400">انسخ الكود الجاهز لوضعه في إضافة السيو:</span>
                <button
                  onClick={() => {
                    const text = `SEO Title: ${serpTitle}\nSlug: ${serpSlug}\nMeta Description: ${serpDesc}`;
                    onCopyText(text, 'بيانات السيو (Title & Meta)');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>نسخ Title & Meta</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* --- TOOL 3: OUTLINE BUILDER --- */}
      {activeTool === 'outline-builder' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            
            {/* Input Config */}
            <div className="lg:col-span-1 space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">الكلمة المفتاحية المستهدفة:</label>
                <input 
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="مثال: تربية أسماك الزينة للمبتدئين"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1.5">نوع المقال وغرضه:</label>
                <div className="space-y-1.5">
                  {[
                    { id: 'how-to', label: 'دليل خطوات عملية (How-To / خطوات بالتفصيل)' },
                    { id: 'guide', label: 'دليل شامل لنيتش عريض (Pillar Ultimate Guide)' },
                    { id: 'comparison', label: 'مقارنة بين منتجين (Product A vs Product B)' },
                    { id: 'review', label: 'مراجعة وتجربة أداة أو منتج (Review & Rating)' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setContentType(type.id as any)}
                      className={`w-full text-right px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                        contentType === type.id
                          ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                          : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateArticleOutline}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
              >
                <Sparkles className="h-4 w-4" />
                <span>توليد هيكل المقال المتصدر فوراً</span>
              </button>
            </div>

            {/* Generated Output */}
            <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <FileText className="h-4 w-4 text-amber-400" />
                    <span>مخطط العناوين ومحتوى المقال (Ready Outline)</span>
                  </div>
                  {generatedOutline && (
                    <button
                      onClick={() => onCopyText(generatedOutline, 'هيكل المقال الكامل')}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all"
                    >
                      <Copy className="h-3.5 w-3.5 text-amber-400" />
                      <span>نسخ الهيكل</span>
                    </button>
                  )}
                </div>

                {generatedOutline ? (
                  <pre className="text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                    {generatedOutline}
                  </pre>
                ) : (
                  <div className="py-16 text-center text-zinc-500 text-xs">
                    <Sparkles className="h-8 w-8 mx-auto mb-2 text-zinc-600 opacity-60" />
                    اضغط على زر التوليد في اليمين لإنشاء هيكل H1 و H2 و H3 متكامل مع الأسئلة الشائعة
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                <span>💡 نصيحة: انسخ هذا الهيكل إلى محررك، ثم أجب عن كل عنوان بفقرات قصيرة وصور توضيحية.</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- TOOL 4: ON-PAGE CHECKLIST AUDITOR --- */}
      {activeTool === 'onpage-checklist' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-400">معدل جاهزية المقال للنشر والتصدر:</span>
                <span className={`text-base font-black ${checklistPercentage >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {checklistPercentage}% ({checkedCount} من {checklistItems.length})
                </span>
              </div>
              <div className="w-56 sm:w-80 h-2 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    checklistPercentage >= 80 ? 'bg-emerald-500' : checklistPercentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${checklistPercentage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetChecklist}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-300 text-xs font-bold hover:bg-zinc-800 transition-all"
              >
                <RotateCcw className="h-3 w-3" />
                <span>إعادة تعيين</span>
              </button>
              <div className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                checklistPercentage === 100 
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                  : checklistPercentage >= 70 
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}>
                {checklistPercentage === 100 ? 'جاهز للنشر فوراً 🚀' : checklistPercentage >= 70 ? 'شبه مكتمل - تفقد البواقي' : 'غير مؤهل للنشر بعد'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {checklistItems.map((item) => {
              const isChecked = checklistState[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all select-none ${
                    isChecked
                      ? 'bg-emerald-500/5 border-emerald-500/30 text-zinc-200'
                      : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-all ${
                    isChecked
                      ? 'border-emerald-500 bg-emerald-500 text-black'
                      : 'border-zinc-700 bg-zinc-900'
                  }`}>
                    {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-xs leading-relaxed ${isChecked ? 'text-zinc-100 font-bold' : ''}`}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
