import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  Users, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Lightbulb,
  Layers,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';
import { nicheIdeasBank } from '../../data/affiliateGuideData';

interface AffiliateCalculatorsProps {
  onCopyText: (text: string, label: string) => void;
}

export const AffiliateCalculators: React.FC<AffiliateCalculatorsProps> = ({ onCopyText }) => {
  const [activeTab, setActiveTab] = useState<'commission' | 'revenue' | 'niche' | 'ideas'>('commission');

  // --- 1. Commission Calculator State ---
  const [calcMode, setCalcMode] = useState<'percentage' | 'fixed'>('percentage');
  const [productPrice, setProductPrice] = useState<number>(100);
  const [commissionRate, setCommissionRate] = useState<number>(15);
  const [fixedCommission, setFixedCommission] = useState<number>(30);
  const [monthlySales, setMonthlySales] = useState<number>(20);

  const singleCommission = useMemo(() => {
    if (calcMode === 'percentage') {
      return (productPrice * commissionRate) / 100;
    }
    return fixedCommission;
  }, [calcMode, productPrice, commissionRate, fixedCommission]);

  const totalMonthlyIncome = singleCommission * monthlySales;
  const totalYearlyIncome = totalMonthlyIncome * 12;

  // Rating badge for offer quality
  const offerRating = useMemo(() => {
    if (singleCommission >= 40) return { label: 'عمولة ممتازة جداً (High Ticket)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    if (singleCommission >= 15) return { label: 'عمولة جيدة ومتوازنة', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    if (singleCommission >= 5) return { label: 'عمولة متوسطة (تحتاج حجم مبيعات كبير)', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' };
    return { label: 'عمولة منخفضة جداً (غير مجدية للمبتدئين إلا مع ملايين المشاهدات)', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
  }, [singleCommission]);

  // --- 2. Revenue Calculator State ---
  const [trafficVolume, setTrafficVolume] = useState<number>(10000);
  const [ctrPercent, setCtrPercent] = useState<number>(5); // 5% click to bio/link
  const [conversionRate, setConversionRate] = useState<number>(2.5); // 2.5% buyers
  const [avgCommissionPerSale, setAvgCommissionPerSale] = useState<number>(25);

  const clicks = Math.round((trafficVolume * ctrPercent) / 100);
  const expectedSales = Math.round((clicks * conversionRate) / 100);
  const expectedRevenue = expectedSales * avgCommissionPerSale;

  // Realistic Scenarios
  const conservativeRevenue = Math.round(expectedRevenue * 0.5);
  const optimisticRevenue = Math.round(expectedRevenue * 1.8);

  // --- 3. Niche Ideas Filter ---
  const [nicheCategory, setNicheCategory] = useState<string>('all');
  const filteredNiches = useMemo(() => {
    if (nicheCategory === 'all') return nicheIdeasBank;
    return nicheIdeasBank.filter(n => n.category.includes(nicheCategory));
  }, [nicheCategory]);

  // --- 4. Content Ideas Generator ---
  const [selectedTopic, setSelectedTopic] = useState<'tech' | 'fitness' | 'hosting' | 'lifestyle'>('tech');
  const [selectedFormat, setSelectedFormat] = useState<'review' | 'comparison' | 'problem' | 'mistake'>('problem');

  const generatedIdeas = useMemo(() => {
    const database: Record<string, Record<string, { title: string; hook: string; outline: string[] }[]>> = {
      tech: {
        problem: [
          {
            title: 'كيف تنهي مونتاج فيديوهاتك في 5 دقائق بدون خبرة',
            hook: 'إذا كنت مازال كضيع ساعات في قص الفيديوهات... هذا التطبيق السري غادي يعوضك عن كلشي!',
            outline: ['عرض المعاناة السابقة وضياع الوقت', 'فتح التطبيق وتشغيل ميزة التوليد التلقائي بضغطة زر', 'مقارنة النتيجة النهائية مع برنامج قديم', 'دعوة لرابط التجربة المجانية في البايو']
          },
          {
            title: 'أرخص مايك احترافي يغير صوت فيديوهاتك 180 درجة',
            hook: 'توقف عن شراء مايكات غالية بـ 2000 درهم! هذا المايك الصغير صدم كل صناع المحتوى.',
            outline: ['تشغيل صوت التلفون العادي المليء بالصدى', 'توصيل المايك وتشغيل عزل الضوضاء الحقيقي', 'سعر المايك الصادم مقارنة بجودته', 'الرابط المباشر في البايو مع كوبون تخفيض']
          }
        ],
        comparison: [
          {
            title: 'مقارنة بين كانفا المجانية وكانفا برو: واش كتستاهل تشترك؟',
            hook: 'واش بصح كانفا برو كتستاهل تدفع فيها شهرياً؟ ها الجواب الصريح بعد سنة من الاستعمال اليومي.',
            outline: ['الميزات المجانية الكافية للمبتدئ', 'أهم 3 ميزات خارقة في النسخة المدفوعة (تفريغ الصور بضغطة واحدة، خطوط ممتازة)', 'لمن تصلح ولمن لا تصلح إطلاقاً', 'رابط تجربة 30 يوماً مجاناً في البايو']
          }
        ],
        review: [
          {
            title: 'مراجعة أداة الذكاء الاصطناعي لكتابة السكربتات',
            hook: 'جربت هاد الأداة باش تكتب ليا سكربتات تيك توك لمدة أسبوع... وهادي هي الأرقام!',
            outline: ['كتابة الفكرة في الأداة والحصول على 3 سكربتات في 10 ثواني', 'تعديل السكربت باللهجة المغربية أو العربية البسيطة', 'نتيجة التفاعل على الفيديوهات', 'رابط التجربة في البايو']
          }
        ],
        mistake: [
          {
            title: '3 أخطاء تضيع عليك جودة التصوير بهاتفك',
            hook: 'كاميرا هاتفك ممتازة، ولكنك كترتكب هاد 3 أغلاط اللي كتخلي الفيديوهات تبان باهتة!',
            outline: ['الغلط الأول: إهمال تنظيف العدسة', 'الغلط الثاني: الاعتماد على إضاءة الغرفة الصفراء بدلاً من سوفت بوكس رخيص', 'الغلط الثالث: تثبيت الهاتف باليد، والحل هو هذا الستاند الذكي', 'رابط الستاند الموصى به في البايو']
          }
        ]
      },
      fitness: {
        problem: [
          {
            title: 'تمرين كامل لحرق الدهون في المنزل بدون معدات معقدة',
            hook: 'معندكش وقت تمشي للجيم؟ هاد الأداة البسيطة كتعطيك تمرين لكامل الجسم في 20 دقيقة.',
            outline: ['استعراض تمارين مختلفة بنفس الأداة', 'سهولة التخزين والحمل', 'السعر الاقتصادي مقارنة باشتراك الجيم', 'رابط المنتج الأصلي في البايو']
          }
        ],
        comparison: [
          {
            title: 'حبال المقاومة ضد الأوزان الحديدية: أيهما أفضل للتمارين المنزلية؟',
            hook: 'واش حبال المقاومة بصح كتبني العضلات بحال الحديد؟ ها التجربة العلمية.',
            outline: ['مقارنة الأمان والضغط على المفاصل', 'مقارنة السعر وسهولة السفر بها', 'الترشيح النهائي مع رابط العرض']
          }
        ],
        review: [
          {
            title: 'مراجعة أرخص ساعة ذكية لتتبع دقات القلب والنوم',
            hook: 'ساعة ذكية ثمنها أقل من 30 دولار وتنافس ساعات أبل في دقة قياس الخطوات؟ ها التجربة!',
            outline: ['استعراض ميزات التطبيق والبطارية التي تدوم أسبوعين', 'مقارنة دقتها مع أجهزة طبية', 'الرابط المباشر في البايو']
          }
        ],
        mistake: [
          {
            title: 'أكبر خطأ يقع فيه من يبدأ التمارين في المنزل',
            hook: 'إذا كنت تتدرب على الأرضية الصلبة بدون بساط تمرين مناسب... مفاصلك ستدفع الثمن!',
            outline: ['تأثير الصدمات على الركبة والظهر', 'مواصفات بساط التمرين الصحي السميك', 'ترشيح لأفضل خيار مريح وغير قابل للانزلاق مع الرابط']
          }
        ]
      },
      hosting: {
        problem: [
          {
            title: 'كيف تطلق متجرك الإلكتروني في أقل من نصف ساعة',
            hook: 'إذا كنت باغي تبدأ التجارة الإلكترونية وما عندكش فلوس لإنشاء متجر عند وكالة... صاوبو بنفسك بـ 3 دولار!',
            outline: ['شرح لوحة التحكم البسيطة خطوة بخطوة', 'ربط الدومين وتثبيت القالب المجاني', 'كوبون الخصم الخاص الذي يوفر 70%', 'الرابط والكوبون في أول تعليق والبايو']
          }
        ],
        comparison: [
          {
            title: 'مقارنة بين شوبيفاي و ووكومرس: أيهما أسهل وأرخص في 2026؟',
            hook: 'محتار بين شوبيفاي وووردبريس لمتجرك الجديد؟ ها المقارنة الصريحة في التكلفة والسهولة.',
            outline: ['حساب التكلفة الحقيقية شهرياً وسنوياً', 'سهولة إدارة الطلبيات وبوابات الدفع', 'الخلاصة ورابط العرض التجريبي بـ 1 دولار']
          }
        ],
        review: [
          {
            title: 'مراجعة استضافة هوستنجر بعد عام كامل من التشغيل',
            hook: 'واش استضافة هوستنجر الرخيصة كتصبر للزوار الكثار؟ ها نتيجة اختبار السرعة والأمان.',
            outline: ['اختبار سرعة تحميل الموقع بالأرقام', 'تجربة الدعم الفني باللغة العربية', 'كوبون الخصم الحصري ورابط التفعيل']
          }
        ],
        mistake: [
          {
            title: 'الغلط الكارثي الذي يجعل موقعك ينهار في أول حملة إعلانية',
            hook: 'أكبر صدمة هي تطلق إعلان ممول والموقع يطيح في أول 100 زائر! ها كيفاش تحمي راسك.',
            outline: ['شرح أهمية سيرفر ذو موارد مخصصة وشهادة أمان مجانية', 'كيفية اختيار الخطة المناسبة من البداية', 'رابط الاستضافة الموثوقة مع ضمان استرجاع 30 يوماً']
          }
        ]
      },
      lifestyle: {
        problem: [
          {
            title: 'كيف تنظم مكتبك وتتخلص من فوضى الأسلاك للأبد',
            hook: 'المكتب المرون كينقص الإنتاجية ديالك بـ 50%! هاد المنظم السحري بـ 5 دولار رتب كلشي.',
            outline: ['شكل المكتب قبل وبعد المنظم', 'طريقة التركيب في دقيقة بدون أدوات', 'رابط المنتج في البايو']
          }
        ],
        comparison: [
          {
            title: 'شريحة eSIM للسفر ضد الشريحة التقليدية: وفّر 80% من مصاريف الإنترنت',
            hook: 'إياك تخلص رومينغ غالي وقت السفر للخارج! هاد الطريقة كتعطيك إنترنت فور وصولك بنصف الثمن.',
            outline: ['كيفية تفعيل eSIM قبل الصعود للطائرة', 'مقارنة الأسعار مع شركات الاتصال التقليدية', 'كود الخصم ورابط التحميل في البايو']
          }
        ],
        review: [
          {
            title: 'مراجعة سماعات عزل الضوضاء الاقتصادية للعمل والمطالعة',
            hook: 'واش تقدر تحصل على عزل صوتي احترافي بسعر أقل من 50 دولار؟ ها التجربة في مكان عام مزدحم.',
            outline: ['تجربة المايك والعزل في الشارع', 'راحة الأذن بعد 4 ساعات متواصلة', 'الرابط في البايو']
          }
        ],
        mistake: [
          {
            title: 'خطأ شائع يرتكبه المسافرون يضيع عليهم مئات الدولارات في تذاكر الطيران',
            hook: 'توقف عن حجز تذاكر الطيران في عطلة نهاية الأسبوع! هذا التطبيق يقارن لك أرخص يوم في الشهر.',
            outline: ['شرح ميزة التنبيه عند انخفاض السعر', 'أفضل وقت للحجز بدقة', 'رابط التطبيق المجاني في البايو']
          }
        ]
      }
    };

    return database[selectedTopic]?.[selectedFormat] || [];
  }, [selectedTopic, selectedFormat]);

  return (
    <div className="space-y-6">
      
      {/* Sub-tabs header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800 scrollbar-none">
        <button
          onClick={() => setActiveTab('commission')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'commission'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
          }`}
        >
          <Calculator className="h-4 w-4" />
          <span>حاسبة عمولة المنتج (Commission Calc)</span>
        </button>

        <button
          onClick={() => setActiveTab('revenue')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'revenue'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>حاسبة الأرباح الشهرية (Traffic to Sales)</span>
        </button>

        <button
          onClick={() => setActiveTab('niche')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'niche'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>بنك النيتشات المربحة (Niche Ideas)</span>
        </button>

        <button
          onClick={() => setActiveTab('ideas')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'ideas'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>مولد أفكار الفيديوهات والسكربتات</span>
        </button>
      </div>

      {/* TAB 1: Commission Calculator */}
      {activeTab === 'commission' && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
                <Calculator className="h-3.5 w-3.5" />
                <span>حاسبة العمولات الفورية للمنتج الواحد</span>
              </div>
              <h3 className="mt-2 text-xl font-black text-white">
                احسب ربحك الصافي من كل بيعة وتقدير دخلك الشهري
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                قارن بين العروض واعرف كم ستحقق عند بيع عدد معين من المنتجات شهرياً بدقة.
              </p>
            </div>

            {/* Mode switch */}
            <div className="flex items-center rounded-xl bg-zinc-950 p-1 border border-zinc-800 text-xs">
              <button
                onClick={() => setCalcMode('percentage')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  calcMode === 'percentage'
                    ? 'bg-amber-500 text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                نسبة مئوية (%)
              </button>
              <button
                onClick={() => setCalcMode('fixed')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  calcMode === 'fixed'
                    ? 'bg-amber-500 text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                مبلغ ثابت ($)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            {/* Input Controls (Left/Top) */}
            <div className="lg:col-span-6 space-y-5">
              {calcMode === 'percentage' ? (
                <>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-zinc-300 mb-2">
                      <span>سعر بيع المنتج للمشتري ($):</span>
                      <span className="font-mono font-bold text-amber-400 text-sm">${productPrice}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="1000"
                      step="5"
                      value={productPrice}
                      onChange={(e) => setProductPrice(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                    />
                    <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                      <span>$5 (رخيص)</span>
                      <span>$250 (متوسط)</span>
                      <span>$1000+ (High-ticket)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-zinc-300 mb-2">
                      <span>نسبة العمولة المئوية (%):</span>
                      <span className="font-mono font-bold text-amber-400 text-sm">{commissionRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="75"
                      step="1"
                      value={commissionRate}
                      onChange={(e) => setCommissionRate(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                    />
                    <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                      <span>1% (أمازون أجهزة)</span>
                      <span>10% (ملابس)</span>
                      <span>50%+ (برامج رقمية)</span>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <div className="flex justify-between text-xs font-medium text-zinc-300 mb-2">
                    <span>قيمة العمولة الثابتة لكل بيعة / تسجيل ($):</span>
                    <span className="font-mono font-bold text-amber-400 text-sm">${fixedCommission}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="300"
                    step="5"
                    value={fixedCommission}
                    onChange={(e) => setFixedCommission(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                    <span>$5 (تسجيل بسيط)</span>
                    <span>$60 (استضافة)</span>
                    <span>$200+ (B2B SaaS)</span>
                  </div>
                </div>
              )}

              {/* Monthly Sales Count */}
              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-2">
                  <span>عدد المبيعات المتوقعة شهرياً:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{monthlySales} مبيعة</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="200"
                  step="1"
                  value={monthlySales}
                  onChange={(e) => setMonthlySales(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>1 (بداية)</span>
                  <span>20 (بيعة كل يوم ونصف)</span>
                  <span>100+ (حساب متقدم)</span>
                </div>
              </div>

              {/* Quality rating badge */}
              <div className="pt-2">
                <div className="text-xs text-zinc-400 mb-1.5 font-medium">تقييم جدوى هذا العرض:</div>
                <div className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 ${offerRating.color}`}>
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{offerRating.label}</span>
                </div>
              </div>
            </div>

            {/* Results Card (Right/Bottom) */}
            <div className="lg:col-span-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-zinc-400">ملخص الأرباح التقديرية الحقيقية</span>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4">
                    <span className="text-xs text-zinc-400 font-medium">عمولتك في البيعة الواحدة</span>
                    <div className="mt-1 text-2xl font-black text-amber-400 font-mono">
                      ${singleCommission.toFixed(2)}
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-1 block">
                      ≈ {(singleCommission * 10).toFixed(0)} درهم مغربي
                    </span>
                  </div>

                  <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4">
                    <span className="text-xs text-zinc-400 font-medium">المبيعات الشهرية</span>
                    <div className="mt-1 text-2xl font-black text-white font-mono">
                      {monthlySales}
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-1 block">
                      مبيعة ناجحة ومؤكدة
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">الدخل الشهري الصافي المقدر:</span>
                    <span className="text-[11px] text-zinc-400 font-mono">30 يوماً</span>
                  </div>
                  <div className="mt-2 text-3xl sm:text-4xl font-black text-white font-mono">
                    ${totalMonthlyIncome.toLocaleString()}
                    <span className="text-xs font-normal text-zinc-400 mr-2 font-sans">
                      (≈ {(totalMonthlyIncome * 10).toLocaleString()} درهم)
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs text-zinc-300">
                    <span>الدخل السنوي المتراكم:</span>
                    <span className="font-mono font-bold text-amber-400">${totalYearlyIncome.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-[11px] text-zinc-500 leading-relaxed border-t border-zinc-900 pt-3">
                * ملاحظة واقعية: الأرباح لا تأتي تلقائياً بضغطة زر. تحتاج إلى نشر محتوى يراه المهتمون بالمنتج فعلياً. الأرقام أعلاه نموذج رياضي دقيق لحساب أثر العمولات على دخلك.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Traffic to Revenue Calculator */}
      {activeTab === 'revenue' && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl">
          <div className="pb-6 border-b border-zinc-800/80">
            <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>محاكي قمع المبيعات (Affiliate Funnel Simulator)</span>
            </div>
            <h3 className="mt-2 text-xl font-black text-white">
              من المشاهدات إلى النقرات ثم إلى الدولارات في حسابك
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              كيف يتحول 10,000 مشاهد في تيك توك أو يوتيوب إلى عمولات ملموسة بنسب التحويل العالمية.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-2">
                  <span>إجمالي المشاهدات / الزوار شهرياً:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{trafficVolume.toLocaleString()} مشاهدة</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="200000"
                  step="1000"
                  value={trafficVolume}
                  onChange={(e) => setTrafficVolume(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>1,000 (مبتدئ جداً)</span>
                  <span>50,000 (حساب نشط)</span>
                  <span>200,000+ (فيديو فيروسي)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-2">
                  <span>نسبة الضغط على الرابط من المشاهدين (CTR%):</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{ctrPercent}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={ctrPercent}
                  onChange={(e) => setCtrPercent(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>2% (نداء عادي)</span>
                  <span>5% (المعدل المتوسط)</span>
                  <span>10%+ (نداء قوي ومقنع)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-2">
                  <span>معدل تحويل الزوار إلى مشترين (Conversion Rate%):</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{conversionRate}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8"
                  step="0.5"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>1% (منتجات غالية)</span>
                  <span>2.5% (المتوسط العالمي للتجارة)</span>
                  <span>5%+ (عروض مجانية أو عروض ترند)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-2">
                  <span>متوسط عمولتك الصافية لكل بيعة ($):</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">${avgCommissionPerSale}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={avgCommissionPerSale}
                  onChange={(e) => setAvgCommissionPerSale(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                />
              </div>
            </div>

            {/* Funnel visual breakdown */}
            <div className="lg:col-span-6 space-y-3">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5 font-bold text-white">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span>المرحلة 1: المشاهدات</span>
                  </span>
                  <span className="font-mono font-bold text-zinc-200">{trafficVolume.toLocaleString()} زائر</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-blue-500 h-full w-full" />
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5 font-bold text-white">
                    <ArrowRight className="h-4 w-4 text-amber-400" />
                    <span>المرحلة 2: النقرات على رابطك (Clicks)</span>
                  </span>
                  <span className="font-mono font-bold text-amber-400">{clicks.toLocaleString()} كليك ({ctrPercent}%)</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-500 h-full" style={{ width: `${Math.min(100, Math.max(10, ctrPercent * 6))}%` }} />
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5 font-bold text-white">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>المرحلة 3: المبيعات الفعلية (Conversions)</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400">{expectedSales} مشترين حقيقيين</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${Math.min(100, Math.max(15, conversionRate * 12))}%` }} />
                </div>
              </div>

              {/* Scenarios Comparison */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
                <span className="text-xs font-bold text-amber-400">السيناريوهات الواقعية المتوقعة شهرياً:</span>
                
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="rounded-xl bg-zinc-900/80 p-2.5 border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block">حذر (50%)</span>
                    <span className="text-base font-black text-zinc-300 font-mono mt-1 block">
                      ${conservativeRevenue}
                    </span>
                  </div>

                  <div className="rounded-xl bg-amber-500/20 p-2.5 border border-amber-500/40">
                    <span className="text-[10px] text-amber-300 font-bold block">واقعي (Target)</span>
                    <span className="text-base font-black text-amber-400 font-mono mt-1 block">
                      ${expectedRevenue}
                    </span>
                  </div>

                  <div className="rounded-xl bg-zinc-900/80 p-2.5 border border-zinc-800">
                    <span className="text-[10px] text-emerald-400 block">متفائل (فيديو ترند)</span>
                    <span className="text-base font-black text-emerald-400 font-mono mt-1 block">
                      ${optimisticRevenue}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Niche Ideas Bank */}
      {activeTab === 'niche' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <div>
              <h3 className="text-base font-bold text-white">مستكشف النيتشات الأكثر طلباً وربحية</h3>
              <p className="text-xs text-zinc-400">اختر تصنيفاً لاستعراض التخصصات الموصى بها للمبتدئين مع نوع العمولات والبرامج الشريكة.</p>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'Tech', label: 'التقنية والذكاء الاصطناعي' },
                { id: 'Business', label: 'الأعمال والاستضافة' },
                { id: 'Health', label: 'الصحة والرياضة' },
                { id: 'Travel', label: 'السفر' },
                { id: 'Education', label: 'التعليم' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setNicheCategory(c.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    nicheCategory === c.id
                      ? 'bg-amber-500 text-black font-bold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNiches.map((niche) => (
              <div 
                key={niche.id}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-5 flex flex-col justify-between hover:border-amber-500/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {niche.category}
                    </span>
                    <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      {niche.commissionLevel}
                    </span>
                  </div>

                  <h4 className="mt-3 text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {niche.name}
                  </h4>

                  <div className="mt-3 space-y-1.5 text-xs text-zinc-400">
                    <div>
                      <span className="text-zinc-500">الجمهور المستهدف: </span>
                      <span className="text-zinc-300">{niche.targetAudience}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">متوسط العمولة: </span>
                      <span className="text-amber-400 font-mono font-bold">{niche.avgTicket}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-zinc-800/80">
                    <span className="text-[11px] text-zinc-500 block mb-1">فكرة محتوى مقترحة للبدء:</span>
                    <p className="text-xs text-zinc-300 italic bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/60 leading-relaxed">
                      "{niche.sampleContentIdea}"
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-zinc-400">
                    <span className="text-[10px] text-zinc-500">أبرز البرامج:</span>
                    <span className="text-[11px] font-medium text-zinc-300 truncate max-w-[150px]">
                      {niche.recommendedPrograms.join(', ')}
                    </span>
                  </div>
                  <button
                    onClick={() => onCopyText(niche.sampleContentIdea, 'تم نسخ فكرة المحتوى بنجاح!')}
                    className="p-1.5 rounded-lg border border-zinc-800 hover:border-amber-500/40 text-zinc-400 hover:text-amber-400 transition-colors"
                    title="نسخ الفكرة"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Content Ideas & Scripts Generator */}
      {activeTab === 'ideas' && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl">
          <div className="pb-6 border-b border-zinc-800/80">
            <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>مولد أفكار الفيديوهات العملية والسكربتات</span>
            </div>
            <h3 className="mt-2 text-xl font-black text-white">
              اختر النيتش ونوع القالب واحصل على فكرة فيديو جاهزة للتصوير دابا
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              أفكار مصممة خصيصاً للتسويق بالعمولة بدون إعلانات مع هوك خطاف وسرد مقنع ونداء عمل دقيق.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {/* Topic selector */}
            <div className="flex-1">
              <label className="text-xs font-bold text-zinc-300 block mb-2">1. اختر مجال الفيديو (Niche):</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'tech', label: '💻 التقنية والذكاء الاصطناعي' },
                  { id: 'fitness', label: '🏋️ الرياضة والصحة' },
                  { id: 'hosting', label: '🌐 المتاجر والاستضافات' },
                  { id: 'lifestyle', label: '✈️ السفر والمكاتب' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTopic(t.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all text-right border ${
                      selectedTopic === t.id
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-sm'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Format selector */}
            <div className="flex-1">
              <label className="text-xs font-bold text-zinc-300 block mb-2">2. زاوية المعالجة (Angle):</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'problem', label: '🚨 حل مشكلة مستعصية' },
                  { id: 'comparison', label: '🥊 مقارنة حاسمة (A vs B)' },
                  { id: 'review', label: '⭐ تجربة صريحة بعد 30 يوم' },
                  { id: 'mistake', label: '❌ خطأ شائع يضيع الوقت/المال' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFormat(f.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all text-right border ${
                      selectedFormat === f.id
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-sm'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generated results */}
          <div className="mt-6 space-y-4">
            {generatedIdeas.map((idea, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded">
                      الفكرة المقترحة #{idx + 1}
                    </span>
                    <h4 className="mt-1 text-base font-bold text-white">
                      {idea.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => {
                      const fullText = `عنوان الفيديو: ${idea.title}\nالهوك المقترح: ${idea.hook}\nخطوات السكربت:\n${idea.outline.map((s, i) => `${i+1}. ${s}`).join('\n')}`;
                      onCopyText(fullText, 'تم نسخ السكربت بالكامل!');
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition-all shrink-0"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>نسخ السكربت</span>
                  </button>
                </div>

                <div className="rounded-xl bg-zinc-900/80 p-3 border border-zinc-800/80 text-xs">
                  <span className="text-amber-400 font-bold block mb-1">الهوك (أول 3 ثواني في الفيديو):</span>
                  <p className="text-zinc-200 italic font-medium leading-relaxed">
                    "{idea.hook}"
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold text-zinc-400 block mb-1.5">خطة الفيديو خطوة بخطوة:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {idea.outline.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 bg-zinc-900/40 p-2.5 rounded-xl border border-zinc-800/50">
                        <span className="h-5 w-5 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold font-mono text-[10px] shrink-0">
                          {sIdx + 1}
                        </span>
                        <span className="text-zinc-300 text-[11px] leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
