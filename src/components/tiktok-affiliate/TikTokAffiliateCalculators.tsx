import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  RotateCcw, 
  Copy, 
  Check, 
  TrendingUp, 
  Flame, 
  DollarSign, 
  ShieldCheck, 
  AlertTriangle,
  Layers,
  ArrowRight
} from 'lucide-react';
import { tiktokProductCriteria, readyTikTokHooks } from '../../data/tiktokAffiliateData';

interface TikTokAffiliateCalculatorsProps {
  onCopyText: (text: string, label: string) => void;
}

export const TikTokAffiliateCalculators: React.FC<TikTokAffiliateCalculatorsProps> = ({ onCopyText }) => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'hookgen' | 'calculator' | 'ideas'>('checklist');

  // --- 1. Product Checklist State ---
  const [productName, setProductName] = useState('');
  const [checkedCriteria, setCheckedCriteria] = useState<Record<string, boolean>>({});

  const toggleCriterion = (id: string) => {
    setCheckedCriteria(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const checklistScore = Object.values(checkedCriteria).filter(Boolean).length;
  const totalCriteria = tiktokProductCriteria.length;
  const checklistPercent = Math.round((checklistScore / totalCriteria) * 100);

  // --- 2. Hook Generator State ---
  const [hookCategory, setHookCategory] = useState<'tech' | 'kitchen' | 'beauty' | 'desk' | 'fitness'>('tech');
  const [hookTone, setHookTone] = useState<'shock' | 'budget' | 'mistake' | 'secret'>('shock');
  const [copiedHookId, setCopiedHookId] = useState<string | null>(null);

  const generatedHooks = useMemo(() => {
    const hookDb: Record<string, Record<string, string[]>> = {
      tech: {
        shock: [
          'إياك تشري هاد المايك قبل ما تسمع كيفاش كيعزل الضوضاء فالزنقة!',
          'هاد الباور بانك الصغير صدم كل صناع المحتوى فهاد الأسبوع...',
          'توقعت هاد الأداة بـ 15$ تكون خردة... شوفو النتيجة بنفسكم!'
        ],
        budget: [
          'علاش تدفع 1500 درهم فماركة غالية إلا كاين هاد البديل بـ 200 درهم فقط؟',
          'أرخص قطعة إضاءة غيرات جودة تصويري من هاوية إلى احترافية بنصف الثمن!',
          'كيفاش تحصل على إعداد مكتب متكامل بأقل من 50 دولار من تيك توك شوب.'
        ],
        mistake: [
          'أكبر غلط كيديروه 90% ديال الناس ملي كيمونطيو بهواتفهم هو هادا...',
          'كاميرا هاتفك زوينة، ولكنك كترتكب هاد الخطأ اللي كيخلي الصوت مفركع!',
          'توقف عن شحن هاتفك بهاد الطريقة إلا ما بغيتيش البطارية تموت!'
        ],
        secret: [
          'الأداة السرية اللي كيوظفوها أكبر حسابات تيك توك وما كيبغيوش يكولوها لك...',
          'هاد الاختراع السحري وفر عليا ساعتين ديال المونتاج يومياً بضغطة زر!',
          'السر باش تخلي فيديوهاتك تجيب ملايين المشاهدات بهاد المايك البسيط.'
        ]
      },
      kitchen: {
        shock: [
          'جربت هاد القطاعة العجيبة اللي مفرقعة تيك توك... واش بصح كتقطع فـ ثانيتين؟',
          'هاد المنظم للمطبخ حل أكبر مشكل كانت كتعاني منه الوالدة لسنوات!',
          'شوفو شنو وقع ملي درت هاد الإسفنجة السحرية على المقلاة المحروقة...'
        ],
        budget: [
          'علاش تشري أجهزة مطبخ بآلاف الدراهم إلا هاد الأداة 5 في 1 كتعوضهم كاملين؟',
          'أرخص منظم توابل وثلاجة يخلي مطبخك كأنه فندق 5 نجوم بأقل من 10 دولارات.',
          'وفري مجهود ساعات في تجهيز العشاء بهاد الاختراع الاقتصادي!'
        ],
        mistake: [
          'أكبر خطأ كديروه فتنظيف الأواني يضيع جودتها... ها الحل الصحيح!',
          'توقفي عن تقطيع الخضر بهاد الطريقة البطيئة والخطيرة على صباعك!',
          'إياك تخزني الخضر بهاد الطريقة قبل ما تشوفي هاد العلب الذكية.'
        ],
        secret: [
          'السر اللي كيخلي المطاعم يقطعو البصل والبطاطس فـ 10 ثواني بدون دموع!',
          'هاد الأداة الصغيرة هي السر باش تحضري أحسن فطور صحي فـ دقيقة واحدة.',
          'الحيلة العبقرية لحفظ الأكل طازج لمدة شهر بدون ما يفسد.'
        ]
      },
      beauty: {
        shock: [
          'استعملت هاد السيروم لمدة 14 يوم متواصلة... النتيجة صدمات طبيبة الجلد ديالي!',
          'شوفو الفرق بين هاد الجهة وهاد الجهة بعد 30 ثانية من استعمال هاد الجهاز!',
          'كنت كنظن بلي هاد الفرشاة غير إشهار فارغ... حتى جربتها قدام المراية.'
        ],
        budget: [
          'البديل الأرخص بـ 80% لكريمات المشاهير الغالية وبنفس المكونات الفعالة!',
          'روتين عناية كامل للبشرة بميزانية طلبة لا تتجاوز 15 دولار من تيك توك.',
          'علاش تخلصي مئات الدراهم فالصالون إلا تقدري تديري هاد النتيجة فالدار؟'
        ],
        mistake: [
          '3 أخطاء شائعة كتدمر حاجز البشرة بدون ما تحسي والحل كاين فهاد المنتج!',
          'توقفي عن إزالة المكياج بهاد الطريقة العنيفة... هاد المنظف السحري يذوبه فوراً.',
          'أكبر غلط عند استخدام واقي الشمس يضيع كل مجهودك اليومي.'
        ],
        secret: [
          'السر وراء إشراقة البشرة الزجاجية (Glass Skin) فـ 3 خطوات فقط.',
          'المنتج السري الكوري اللي حقق أكثر من 100 ألف مبيعة فهاد الشهر.',
          'كيفاش تحصلي على رموش كثيفة وجذابة بدون ماسكارا غالية أو تركيب.'
        ]
      },
      desk: {
        shock: [
          'حولت مكتبي البسيط من مكان فوضوي وممل إلى استوديو أحلام بـ 30 دولار فقط!',
          'هاد الستاند المغناطيسي غير طريقتي في العمل عن بعد 180 درجة.',
          'شوفو كيفاش هاد منظم الكابلات السحري خفى 15 كابل فـ دقيقتين!'
        ],
        budget: [
          'أرخص كيبورد ميكانيكي مريح للكتابة وصوته يريح الأعصاب بسعر خيالي.',
          'بديل ذكي وجميل لإضاءة الشاشات الغالية بنصف السعر مع جهاز تحكم عن بعد.',
          'كيف تنشئ سيت أب أنيق ومريح لظهرك بميزانية جد محدودة.'
        ],
        mistake: [
          'إذا كنت تجلس أكثر من 6 ساعات أمام الحاسوب بهاد الطريقة... عمودك الفقري في خطر!',
          'أكبر خطأ يدمر إنتاجيتك هو فوضى الأسلاك على المكتب... ها الحل السريع.',
          'توقف عن وضع هاتفك على الطاولة بشكل مسطح أثناء العمل!'
        ],
        secret: [
          'السر وراء مكاتب المبرمجين والمصممين التي تبدو مثالية في الفيديوهات.',
          'هاد المصباح المخصص للشاشة يمنع إجهاد العين والصداع تماماً.',
          'الأداة البسيطة اللي ترفع شاشتك للمستوى الصحي وتوفر لك مساحة إضافية.'
        ]
      },
      fitness: {
        shock: [
          'تحديت نفسي أتمرن بهاد الحبل المقاومة لمدة 30 يوم فالدار... وها النتيجة!',
          'عضلات البطن بدون ما تدفع اشتراك الجيم؟ هاد العجلة الذكية غيرت كلشي.',
          'شوفو كيفاش هاد الميزان الذكي يكشف نسبة الدهون والعضلات فـ 5 ثواني!'
        ],
        budget: [
          'علاش تدفع 400 درهم شهرياً للجيم إلا عندك هاد المعدات بـ 100 درهم تكفيك لعامين؟',
          'أرخص بساط تمرين سميك يحمي الركبتين والمفاصل من الصدمات.',
          'مجموعة أوزان وحبال ذكية بديلة لـ 10 أجهزة حديد ضخمة في غرفتك.'
        ],
        mistake: [
          'أكبر غلط كيديروه المبتدئين فالتمارين المنزلية كيدمر مفاصل الركبة!',
          'توقف عن ممارسة تمارين الكارديو بحذاء عادي غير مخصص لامتصاص الصدمات.',
          'إياك تبدأ التمارين بدون ما تراقب دقات قلبك بهاد الساعة الذكية.'
        ],
        secret: [
          'السر باش تحرق 300 سعرة حرارية في 15 دقيقة فقط بدون الخروج من المنزل.',
          'الاختراع الصغير اللي يخليك تدير تمارين الظهر والأكتاف في أي باب بالمنزل.',
          'حيلة بسيطة تخليك تلتزم بالتمارين اليومية وتشوف نتائج واضحة في شهر.'
        ]
      }
    };

    return hookDb[hookCategory]?.[hookTone] || [];
  }, [hookCategory, hookTone]);

  // --- 3. TikTok Funnel & Commission Calculator State ---
  const [videoViews, setVideoViews] = useState<number>(20000);
  const [ctrToShowcase, setCtrToShowcase] = useState<number>(3.5); // 3.5% click on cart/link
  const [conversionRate, setConversionRate] = useState<number>(2.5); // 2.5% buyers
  const [productPrice, setProductPrice] = useState<number>(30);
  const [commissionRate, setCommissionRate] = useState<number>(20); // 20% commission

  const clicksCount = Math.round((videoViews * ctrToShowcase) / 100);
  const buyersCount = Math.round((clicksCount * conversionRate) / 100);
  const commissionPerSale = (productPrice * commissionRate) / 100;
  const netEarnings = buyersCount * commissionPerSale;
  const monthlyProjected = netEarnings * 15; // assuming 15 videos/month

  return (
    <div className="space-y-6">
      
      {/* Sub-tabs header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800 scrollbar-none">
        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'checklist'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>فاحص المنتج التفاعلي (Product Checklist)</span>
        </button>

        <button
          onClick={() => setActiveTab('hookgen')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'hookgen'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
          }`}
        >
          <Flame className="h-4 w-4" />
          <span>مولد هوكات تيك توك الفيروسية (Hook Generator)</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'calculator'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
          }`}
        >
          <Calculator className="h-4 w-4" />
          <span>حاسبة عمولات تيك توك والقمع (Funnel Calc)</span>
        </button>

        <button
          onClick={() => setActiveTab('ideas')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'ideas'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>بنك أفكار محتوى تيك توك (Content Ideas)</span>
        </button>
      </div>

      {/* 1. PRODUCT CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>فاحص المنتج التفاعلي</span>
              </div>
              <h3 className="mt-2 text-xl font-black text-white">
                قائمة تدقيق المنتج الرابح (Winning Product Checklist)
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                قبل أن تبدأ بتصوير أي منتج، افحصه عبر المعايير الـ 6 لضمان أن الفيديو سيحقق مبيعات حقيقية.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-left rtl:text-right">
                <div className="text-xs text-zinc-400 font-medium">نسبة الجاهزية</div>
                <div className={`text-xl font-black font-mono ${
                  checklistScore >= 5 ? 'text-emerald-400' : checklistScore >= 3 ? 'text-amber-400' : 'text-zinc-400'
                }`}>
                  {checklistScore} / {totalCriteria} ({checklistPercent}%)
                </div>
              </div>
              {checklistScore > 0 && (
                <button
                  onClick={() => {
                    setCheckedCriteria({});
                    setProductName('');
                  }}
                  className="p-2 rounded-xl border border-zinc-800 text-zinc-500 hover:text-white"
                  title="تصفير الفاحص"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Product Name input */}
          <div className="mt-6">
            <label className="text-xs font-bold text-zinc-300 block mb-1.5">
              اسم المنتج الذي تفحصه حالياً (اختياري):
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="مثال: ميكروفون لاسلكي، قطاعة خضار كهربائية، جهاز مساج الرقبة..."
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 py-2.5 px-4 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Checklist items */}
          <div className="mt-6 space-y-3">
            {tiktokProductCriteria.map((c) => {
              const isChecked = !!checkedCriteria[c.id];

              return (
                <div
                  key={c.id}
                  onClick={() => toggleCriterion(c.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 select-none ${
                    isChecked
                      ? 'border-emerald-500/50 bg-emerald-500/5 text-zinc-200 shadow-sm'
                      : 'border-zinc-800/80 bg-zinc-950/70 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 fill-emerald-400/20" />
                      ) : (
                        <Circle className="h-5 w-5 text-zinc-600" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`text-sm font-bold ${isChecked ? 'text-emerald-300' : 'text-zinc-200'}`}>
                          {c.title}
                        </h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          c.weight === 'ضروري جداً'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {c.weight}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-zinc-400">
                        {c.description}
                      </p>

                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-zinc-800/60">
                        <div className="text-emerald-400/90">
                          <span className="font-bold">المعيار المثالي: </span>
                          <span className="text-zinc-300">{c.idealStandard}</span>
                        </div>
                        <div className="text-rose-400/90">
                          <span className="font-bold">علامة الخطر: </span>
                          <span className="text-zinc-400">{c.dangerSign}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verdict Box */}
          <div className="mt-6 pt-5 border-t border-zinc-800">
            {checklistScore >= 5 ? (
              <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-emerald-300 text-xs">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
                <div>
                  <strong className="block text-sm font-black text-emerald-300">
                    منتج رابح من الدرجة الأولى (ضوء أخضر)! 🚀
                  </strong>
                  <span>
                    هذا المنتج يملك كل مقومات الانتشار الفيروسي وسرعة الشراء. ابدأ بكتابة السكربت وتصوير الفيديو فوراً.
                  </span>
                </div>
              </div>
            ) : checklistScore >= 3 ? (
              <div className="flex items-center gap-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 text-amber-300 text-xs">
                <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0" />
                <div>
                  <strong className="block text-sm font-black text-amber-300">
                    منتج متوسط يحتاج زاوية تصوير استثنائية (ضوء برتقالي)
                  </strong>
                  <span>
                    المنتج جيد لكن انتبه لنقاط الضعف (مثل السعر أو العمولة). ركز على الهوك القوي لتعويض النقص.
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 text-xs text-zinc-400">
                ضع علامة على الشروط المتوفرة لمعرفة تقييم المنتج النهائي قبل بدء التصوير.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. HOOK GENERATOR */}
      {activeTab === 'hookgen' && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl">
          <div className="pb-6 border-b border-zinc-800">
            <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
              <Flame className="h-3.5 w-3.5" />
              <span>مولد الهوكات الذكي</span>
            </div>
            <h3 className="mt-2 text-xl font-black text-white">
              مولد هوكات تيك توك الخاطفة لأول ثانيتين
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              اختر فئة المنتج ونبرة الهوك للحصول على 3 بدايات فيديو تمنع التمرير وتجذب المشاهد للشراء.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-2">1. فئة المنتج (Category):</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'tech', label: '💻 تقنية وإلكترونيات' },
                  { id: 'kitchen', label: '🍳 مطبخ ومنزل' },
                  { id: 'beauty', label: '✨ عناية وجمال' },
                  { id: 'desk', label: '🖥️ إعداد مكاتب' },
                  { id: 'fitness', label: '🏋️ رياضة ورشاقة' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setHookCategory(cat.id as any)}
                    className={`p-2.5 rounded-xl font-bold border transition-all text-right ${
                      hookCategory === cat.id
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-2">2. نبرة المعالجة (Tone):</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'shock', label: '⚡ فضول وصدمة' },
                  { id: 'budget', label: '💰 توفير وبديل رخيص' },
                  { id: 'mistake', label: '❌ خطأ شائع وتحذير' },
                  { id: 'secret', label: '🤫 سر واختراع عبقري' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setHookTone(t.id as any)}
                    className={`p-2.5 rounded-xl font-bold border transition-all text-right ${
                      hookTone === t.id
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Hooks Output */}
          <div className="mt-6 space-y-3">
            <span className="text-xs font-bold text-zinc-400 block">الهوكات المقترحة (اضغط لنسخ الهوك فوراً):</span>
            {generatedHooks.map((hook, idx) => {
              const isCopied = copiedHookId === `${idx}`;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    onCopyText(hook, 'تم نسخ الهوك بنجاح!');
                    setCopiedHookId(`${idx}`);
                    setTimeout(() => setCopiedHookId(null), 2000);
                  }}
                  className="p-4 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-amber-500/50 hover:bg-zinc-900/60 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-7 w-7 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm font-semibold text-zinc-200 group-hover:text-amber-300 transition-colors">
                      "{hook}"
                    </p>
                  </div>

                  <button
                    className={`p-2 rounded-xl border text-xs font-bold transition-all shrink-0 ${
                      isCopied
                        ? 'bg-emerald-500 text-black border-emerald-400'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-400 group-hover:text-white group-hover:border-zinc-700'
                    }`}
                  >
                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. TIKTOK FUNNEL & COMMISSION CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl">
          <div className="pb-6 border-b border-zinc-800">
            <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
              <Calculator className="h-3.5 w-3.5" />
              <span>محاكي قمع مبيعات تيك توك</span>
            </div>
            <h3 className="mt-2 text-xl font-black text-white">
              حاسبة أرباح تيك توك من المشاهدات إلى العمولات الصافية
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              أدخل أرقام مشاهداتك المتوقعة ونسبة العمولة لمعرفة كم ستحقق عملياً من كل فيديو.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            
            {/* Sliders */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-2">
                  <span>مشاهدات الفيديو المتوقعة:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{videoViews.toLocaleString()} مشاهدة</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="200000"
                  step="2000"
                  value={videoViews}
                  onChange={(e) => setVideoViews(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>2,000 (عادي)</span>
                  <span>50,000 (فيديو ناجح)</span>
                  <span>200,000+ (فيروسي)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-2">
                  <span>نسبة الضغط على السلة الصفراء / الرابط (CTR%):</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{ctrToShowcase}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={ctrToShowcase}
                  onChange={(e) => setCtrToShowcase(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>1.5% (رابط بايو)</span>
                  <span>3.5% (متوسط تيك توك شوب)</span>
                  <span>8%+ (نداء وإشارة قوية)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-2">
                  <span>نسبة تحويل المشتريات (Conversion Rate%):</span>
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
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-xs font-medium text-zinc-300 mb-2">
                    <span>سعر المنتج ($):</span>
                    <span className="font-mono font-bold text-amber-400">${productPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={productPrice}
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-zinc-300 mb-2">
                    <span>نسبة العمولة (%):</span>
                    <span className="font-mono font-bold text-amber-400">{commissionRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="1"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Funnel Outputs */}
            <div className="lg:col-span-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-zinc-400 block mb-3">تسلسل التحويل المالي للفيديو الواحد:</span>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-400">النقرات على السلة / الرابط:</span>
                    <span className="font-mono font-bold text-white text-sm">{clicksCount} نقرة مؤهلة</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-400">المبيعات المؤكدة (الطلبات):</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">{buyersCount} طلب شراء</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-400">عمولتك في البيعة الواحدة:</span>
                    <span className="font-mono font-bold text-amber-400 text-sm">${commissionPerSale.toFixed(2)}</span>
                  </div>
                </div>

                {/* Net Total Box */}
                <div className="mt-4 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-4">
                  <span className="text-xs text-amber-300 font-bold block">الأرباح الصافية المقدرة من هذا الفيديو:</span>
                  <div className="text-3xl font-black text-white font-mono mt-1">
                    ${netEarnings.toLocaleString()}
                    <span className="text-xs text-zinc-400 mr-2 font-sans font-normal">
                      (≈ {(netEarnings * 10).toLocaleString()} درهم)
                    </span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-amber-500/20 text-xs text-zinc-300 flex justify-between">
                    <span>التوقع الشهري (بمعدل 15 فيديو):</span>
                    <span className="font-mono font-bold text-amber-400">${monthlyProjected.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <span className="text-[11px] text-zinc-500 mt-4 leading-relaxed block">
                * الأرقام أعلاه نموذج تقريبي مبني على متوسطات تيك توك شوب العالمية، وتختلف حسب جودة الفيديو وإقبال الجمهور في بلدك.
              </span>
            </div>

          </div>
        </div>
      )}

      {/* 4. CONTENT IDEAS EXPLORER */}
      {activeTab === 'ideas' && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl space-y-4">
          <div className="pb-4 border-b border-zinc-800">
            <h3 className="text-xl font-black text-white">
              أفكار فيديوهات تيك توك أفيلييت الأكثر انتشاراً
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              أنماط محتوى مجربة تحقق ملايين المشاهدات وتحول المشاهدين لمشترين بدون مبالغة أو تصنع.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: '1. فيديو "قبل وبعد" الصادم (Before & After)',
                desc: 'إظهار الشيء في حالته المزرية أولاً ثم تشغيل المنتج ليتحول في 3 ثواني إلى شيء نظيف ومثالي.',
                example: 'تنظيف أريكة متسخة، ترتيب مكتب مبعثر، إضاءة غرفة مظلمة.',
                tip: 'لا تستخدم مؤثرات أو فلاتر مضللة؛ الناس تكشف التزييف فوراً.'
              },
              {
                title: '2. فيديو "الرد على المشكك" (Replying to Comment)',
                desc: 'الرد على تعليق مشكك مثل: "هادشي كذوب وما كيخدمش!"، وتصوير تجربة عملية قاسية تثبت كفاءة المنتج.',
                example: 'أحد المتابعين قال: "المايك فيه صدى" → تصوير تجربة في غرفة خالية تثبت عزل الصدى.',
                tip: 'ميزة الرد على تعليق ترفع نسبة المشاهدة لأن المشاهد يشعر أن هناك جدلاً حقيقياً.'
              },
              {
                title: '3. فيديو مقارنة الرخيص ضد الغالي (Cheap vs Expensive)',
                desc: 'شراء النسخة الغالية المشهورة وشراء البديل الاقتصادي وإجراء مقارنة منصفة أمام الكاميرا.',
                example: 'مقارنة سماعات بـ 200$ ضد سماعات بـ 25$ مع اختبار الصوت وعزل الضوضاء.',
                tip: 'المقارنة ممتازة جداً لأن المشاهد بطبعه يبحث عن توفير أمواله.'
              },
              {
                title: '4. فيديو "الـ 3 حوايج اللي ما عجبونيش" (The 3 Cons)',
                desc: 'فيديو يبدأ بهوك سلبي: "3 حوايج خايبين فهاد المنتج"، ثم ذكر عيوب شكلية بسيطة توضح أمانتك.',
                example: '"العيب الأول لونه رمادي فقط، العيب الثاني كيجيب الإدمان على استعماله".',
                tip: 'هذا النمط يحقق أعلى مبيعات في تيك توك شوب لأنه يكسر دفاعات المشتري.'
              },
              {
                title: '5. فيديو التحدي (The 7-Day Challenge)',
                desc: 'توثيق نتيجة استخدام المنتج يومياً لمدة 7 أيام وإظهار الفارق التراكمي في اليوم الأخير.',
                example: 'تحدي تبييض الأسنان بالمعجون الطبيعي، تحدي تمرين يومي بأداة واحدة.',
                tip: 'ينشئ سلسلة فيديوهات (Part 1, Part 2...) تجعل المشاهد يتابع حسابك.'
              },
              {
                title: '6. فيديو الـ ASMR الصوتي (Sensory Unboxing)',
                desc: 'فيديو هادئ يركز بنسبة 100% على الأصوات الطبيعية لفتح العلبة ونزع البلاستيك والضغط على الأزرار.',
                example: 'فتح علبة كيبورد ميكانيكي، تقشير شاشة الهاتف، ضغط أزرار جهاز ذكي.',
                tip: 'جمهور كبير في تيك توك يعشق مقاطع الـ ASMR ويشاهدها للنهاية.'
              }
            ].map((idea, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950 flex flex-col justify-between hover:border-amber-500/40 transition-all"
              >
                <div>
                  <h4 className="text-base font-bold text-white mb-2">{idea.title}</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-3">{idea.desc}</p>
                  
                  <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800/80 text-[11px] text-zinc-400 mb-2">
                    <strong className="text-amber-400 block mb-0.5">مثال تطبيقي:</strong>
                    <span>{idea.example}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/60 text-[11px] text-emerald-400 font-medium">
                  💡 {idea.tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
