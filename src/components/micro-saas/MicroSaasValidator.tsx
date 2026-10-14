import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  DollarSign, 
  ShieldCheck,
  Building2,
  Award,
  Zap
} from 'lucide-react';

interface MicroSaasPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  defaultRatings: {
    customerType: number; // 1-5 (5 = High paying B2B)
    painFrequency: number; // 1-5 (5 = Daily urgent)
    soloFeasibility: number; // 1-5 (5 = 2-3 weeks build)
    competitiveWedge: number; // 1-5 (5 = clear niche angle)
    distributionEase: number; // 1-5 (5 = clear search / marketplace channel)
    stickiness: number; // 1-5 (5 = high lock-in data)
  };
}

const PRESET_IDEAS: MicroSaasPreset[] = [
  {
    id: 'shopify-stock-alerts',
    name: 'تنبيهات استعادة المخزون لمتاجر شوبيفاي',
    category: 'E-commerce Addon',
    description: 'أداة خفيفة ترسل رسائل واتساب / SMS للمشترين فور عودة مقاس أو منتج نفد في المتجر.',
    defaultRatings: {
      customerType: 5,
      painFrequency: 5,
      soloFeasibility: 5,
      competitiveWedge: 4,
      distributionEase: 5,
      stickiness: 5,
    }
  },
  {
    id: 'receipt-vat-ocr',
    name: 'مستخرج فواتير وضريبة القيمة المضافة لشركات المقاولات',
    category: 'Fintech / AI OCR',
    description: 'بوت وتطبيق ويب يرفع من خلاله المحاسب صور الإيصالات ويستخرج بنود الضريبة في ملف Excel متوافق مع هيئة الزكاة والضرائب.',
    defaultRatings: {
      customerType: 5,
      painFrequency: 5,
      soloFeasibility: 4,
      competitiveWedge: 5,
      distributionEase: 4,
      stickiness: 5,
    }
  },
  {
    id: 'notion-form-sync',
    name: 'محول نماذج جوجل إلى قواعد بيانات Notion',
    category: 'Productivity Wrapper',
    description: 'أداة ربط تسجل ردود النماذج مباشرة داخل صفحات وقواعد نوشن المنسقة بدون الحاجة لاشتراك Zapier الباهظ.',
    defaultRatings: {
      customerType: 4,
      painFrequency: 4,
      soloFeasibility: 5,
      competitiveWedge: 4,
      distributionEase: 5,
      stickiness: 4,
    }
  },
  {
    id: 'social-video-captioner',
    name: 'أداة تفريغ وصناعة كابشن تلقائي لصناع الريلز',
    category: 'Content Creator Tool',
    description: 'تطبيق ويب يرفع الفيديو ويولد نصوصاً متحركة بخطوط عربية جذابة لإنستغرام وتيك توك.',
    defaultRatings: {
      customerType: 3,
      painFrequency: 4,
      soloFeasibility: 4,
      competitiveWedge: 3,
      distributionEase: 4,
      stickiness: 3,
    }
  }
];

export const MicroSaasValidator: React.FC = () => {
  const [ideaTitle, setIdeaTitle] = useState<string>('');
  const [customerType, setCustomerType] = useState<number>(4);
  const [painFrequency, setPainFrequency] = useState<number>(4);
  const [soloFeasibility, setSoloFeasibility] = useState<number>(4);
  const [competitiveWedge, setCompetitiveWedge] = useState<number>(4);
  const [distributionEase, setDistributionEase] = useState<number>(4);
  const [stickiness, setStickiness] = useState<number>(4);

  const applyPreset = (preset: MicroSaasPreset) => {
    setIdeaTitle(preset.name);
    setCustomerType(preset.defaultRatings.customerType);
    setPainFrequency(preset.defaultRatings.painFrequency);
    setSoloFeasibility(preset.defaultRatings.soloFeasibility);
    setCompetitiveWedge(preset.defaultRatings.competitiveWedge);
    setDistributionEase(preset.defaultRatings.distributionEase);
    setStickiness(preset.defaultRatings.stickiness);
  };

  // Score Calculation (Max 30 points -> scaled to 100)
  const rawScore = customerType + painFrequency + soloFeasibility + competitiveWedge + distributionEase + stickiness;
  const scorePercent = Math.round((rawScore / 30) * 100);

  let verdict = {
    title: 'فكرة ذهبية قابلة للبناء الفوري!',
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    description: 'هذه الفكرة تتمتع بجميع مواصفات الـ Micro-SaaS المثالي: جمهور مستعد للدفع، ألم متكرر، إمكانية بناء سريعة لمطور فردي، وحاجز استبقاء ممتاز.',
    recommendation: 'ابدأ مباشرة برسم واجهة الـ MVP ونشر صفحة انتظار (Waitlist) في 48 ساعة.'
  };

  if (scorePercent < 60) {
    verdict = {
      title: 'فكرة عالية المخاطر (تحتاج إعادة ضبط جذرية)',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      description: 'هناك مؤشرات خطورة واضحة: إما أن الجمهور مستهلكون أفراد (B2C) يكرهون الاشتراكات، أو أن الألم عرضي غير ملح، أو أن التطوير ضخم جداً على شخص واحد.',
      recommendation: 'لا تبدأ بكتابة الكود؛ قم بتحويل التركيز لقطاع أعمال B2B أو تقليص نطاق الميزة لتصبح حلاً سريعاً ومركّزاً.'
    };
  } else if (scorePercent < 80) {
    verdict = {
      title: 'فكرة واعدة (تحتاج توضيح زاوية التمايز)',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      description: 'المشروع يحمل مقومات جيدة، ولكن عليك الحذر من سهولة المنافسة أو قنوات الاستحواذ وتوزيع الرابط.',
      recommendation: 'تحدث مع 10 عملاء محتملين أولاً للتأكد من رغبتهم بدفع اشتراك شهري مستمر بدلاً من استخدام بدائل مجانية.'
    };
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6">
      {/* Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold">
              <Target className="h-4 w-4" />
              <span>أداة التحقق من جدوى فكرة Micro-SaaS</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              مصفوفة تقييم الأفكار والتحقق من الرغبة في الدفع
            </h2>
            <p className="text-sm text-zinc-400 max-w-2xl">
              قبل كتابة سطر كود واحد، اختبر فكرتك البرمجية عبر 6 محاور جوهرية لتتجنب قضاء أشهر في برمجة أداة لا يدفع أحد لأجلها.
            </p>
          </div>
        </div>

        {/* Preset Idea Buttons */}
        <div className="mt-6 pt-4 border-t border-zinc-800">
          <span className="text-xs font-bold text-zinc-400 block mb-2">أو اختر فكرة جاهزة لتحليلها فوراً:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PRESET_IDEAS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className="text-right p-3 rounded-xl border border-zinc-800 bg-zinc-950/70 hover:border-cyan-500/40 hover:bg-zinc-900/90 transition-all text-xs"
              >
                <div className="font-bold text-zinc-200 truncate">{preset.name}</div>
                <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{preset.category}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Rating Controls (Left / Span 7) */}
        <div className="lg:col-span-7 space-y-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 font-bold block">اسم فكرتك أو وصفها المختصر</label>
            <input
              type="text"
              placeholder="مثال: أداة لتحويل تقارير المبيعات إلى رسائل واتساب تلقائية"
              value={ideaTitle}
              onChange={(e) => setIdeaTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-5">
            {/* Dimension 1: Customer Type */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-300 font-medium">1. طبيعة العميل والقدرة على الدفع</span>
                <span className="text-cyan-400 font-bold text-xs">
                  {customerType === 5 ? 'شركات B2B بميزانيات تشغيلية واضحة (5/5)' : customerType >= 3 ? 'أفراد مهنيون ومستقلون (3-4/5)' : 'مستهلكون أفراد B2C (1-2/5)'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={customerType}
                onChange={(e) => setCustomerType(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
              />
              <span className="text-[11px] text-zinc-500 block">الشركات B2B تعتبر الاشتراكات مصاريف مسترجعة، بعكس الأفراد B2C الذين يلغون سريعاً.</span>
            </div>

            {/* Dimension 2: Pain Frequency */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-300 font-medium">2. تكرار وحدة المشكلة (Pain Frequency)</span>
                <span className="text-emerald-400 font-bold text-xs">
                  {painFrequency === 5 ? 'ألم يومي/أسبوعي يهدر ساعات من الوقت (5/5)' : painFrequency >= 3 ? 'مهمة شهرية متكررة (3-4/5)' : 'أمر عرضي نادر الحدوث (1-2/5)'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={painFrequency}
                onChange={(e) => setPainFrequency(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
              />
              <span className="text-[11px] text-zinc-500 block">كلما تكررت المشكلة يومياً في عمل المستخدم، زادت استمرارية اشتراكه دون تفكير في الإلغاء.</span>
            </div>

            {/* Dimension 3: Solo Feasibility */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-300 font-medium">3. قابلية البناء الفردي السريع (Solo Feasibility)</span>
                <span className="text-purple-400 font-bold text-xs">
                  {soloFeasibility === 5 ? 'يمكن إطلاق MVP مصقول في 2-3 أسابيع (5/5)' : soloFeasibility >= 3 ? 'يحتاج 4-6 أسابيع تطوير (3-4/5)' : 'مشروع ضخم ومعقد يتطلب أشهراً (1-2/5)'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={soloFeasibility}
                onChange={(e) => setSoloFeasibility(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
              />
              <span className="text-[11px] text-zinc-500 block">المشروع الذي يتطلب أكثر من شهر لبناء أول نسخة يهدد بفقدان الحماس والفشل المبكر.</span>
            </div>

            {/* Dimension 4: Competitive Wedge */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-300 font-medium">4. زاوية التمايز والنيتش (Competitive Wedge)</span>
                <span className="text-amber-400 font-bold text-xs">
                  {competitiveWedge === 5 ? 'مخصصة جداً لنيتش مهمل من الشركات الكبرى (5/5)' : competitiveWedge >= 3 ? 'أبسط وأسرع من البدائل المتاحة (3-4/5)' : 'منافسة مباشرة مع عمالقة بدون ميزة واضحة (1-2/5)'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={competitiveWedge}
                onChange={(e) => setCompetitiveWedge(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
              />
              <span className="text-[11px] text-zinc-500 block">التخصص الشديد في قطاع محدد (مثل: أطباء الأسنان، وكالات السيو) يمنحك احتكاراً سهلاً.</span>
            </div>

            {/* Dimension 5: Distribution Channel */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-300 font-medium">5. سهولة الوصول للعملاء وتوزيع الرابط (Distribution)</span>
                <span className="text-blue-400 font-bold text-xs">
                  {distributionEase === 5 ? 'متجر تطبيقات جاهز (Shopify/Chrome) أو بريد بارد سهل (5/5)' : distributionEase >= 3 ? 'مجتمعات ومجموعات محددة (3-4/5)' : 'لا توجد طريقة واضحة لمعرفة أين يتواجد الجمهور (1-2/5)'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={distributionEase}
                onChange={(e) => setDistributionEase(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
              />
              <span className="text-[11px] text-zinc-500 block">التوزيع أهم من الكود؛ إذا لم تكن تعرف أين ستجد أول 50 عميلاً، فلا تبدأ البرمجة.</span>
            </div>

            {/* Dimension 6: Stickiness */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-300 font-medium">6. قوة الاستبقاء والبيانات التراكمية (Stickiness)</span>
                <span className="text-rose-400 font-bold text-xs">
                  {stickiness === 5 ? 'تخزن بيانات وتقارير تراكمية تجعل الإلغاء مؤلماً (5/5)' : stickiness >= 3 ? 'ارتباط بسير العمل اليومي (3-4/5)' : 'استخدام لمرة واحدة بدون تراكم بيانات (1-2/5)'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={stickiness}
                onChange={(e) => setStickiness(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
              />
              <span className="text-[11px] text-zinc-500 block">الأدوات التي تحفظ تاريخ العمليات وسجلات العملاء تملك أقل معدل تسرب واشتراكات تدوم لسنوات.</span>
            </div>
          </div>
        </div>

        {/* Score & Verdict Card (Right / Span 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
              مؤشر جدوى الفكرة وقابلية النجاح
            </span>

            <div className="relative inline-flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-zinc-800 flex items-center justify-center">
                <div className="text-4xl font-black font-mono text-white">
                  {scorePercent}
                  <span className="text-lg text-zinc-500 font-normal">%</span>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl border text-right space-y-2 ${verdict.color}`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>{verdict.title}</span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {verdict.description}
              </p>
            </div>

            <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800 text-right space-y-1.5">
              <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <span>الخطوة القادمة الموصى بها:</span>
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {verdict.recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
