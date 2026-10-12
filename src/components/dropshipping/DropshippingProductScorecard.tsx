import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Info,
  Scale,
  Award,
  Video,
  DollarSign,
  Package,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export interface EvaluatedProduct {
  id: string;
  name: string;
  category: string;
  sourceUrl: string;
  scores: {
    problemSolving: number; // 1-5: حل مشكلة يومية أو إشباع شغف حقيقي
    visualWow: number;       // 1-5: جاذبية بصرية وعامل إبهار في أول 3 ثوانٍ
    profitMargin: number;    // 1-5: هامش ربح مريح (2.5x إلى 3x التكلفة)
    shippingWeight: number;  // 1-5: خفة الوزن وصغر الحجم وسهولة الشحن
    lowReturnRisk: number;   // 1-5: انخفاض احتمالية التلف أو خطأ المقاسات
    notInGrocery: number;    // 1-5: غير متوفر بسهولة في المتاجر المحلية المجاورة
  };
  notes: string;
}

const DEFAULT_PRODUCTS: EvaluatedProduct[] = [
  {
    id: 'prod-demo-1',
    name: 'أداة تنظيف زوايا النوافذ والمجاري الضيقة',
    category: 'أدوات منزلية وتنظيم',
    sourceUrl: 'CJ Dropshipping SKU: #10492',
    scores: {
      problemSolving: 5,
      visualWow: 5,
      profitMargin: 4,
      shippingWeight: 5,
      lowReturnRisk: 5,
      notInGrocery: 4
    },
    notes: 'منتج ممتاز، وزنه 80 غرام فقط، تكلفته 2.8$ ويباع بـ 16$. الفيديو من 4 ثوانٍ يظهر تنظيف زاوية متسخة بسهولة تامة.'
  },
  {
    id: 'prod-demo-2',
    name: 'فستان صيفي حريري بمقاسات متعددة',
    category: 'أزياء وملابس نسائية',
    sourceUrl: 'AliExpress SKU: #88219',
    scores: {
      problemSolving: 2,
      visualWow: 4,
      profitMargin: 3,
      shippingWeight: 4,
      lowReturnRisk: 1, // High returns due to sizing
      notInGrocery: 2
    },
    notes: 'خطورة عالية جداً للمبتدئ بسبب اختلاف المقاسات بين الصين وأمريكا، واحتمال إرجاع يتجاوز 25% مع منافسة شرسة من شي إن وزالاندو.'
  }
];

export const DropshippingProductScorecard: React.FC = () => {
  const { isRTL } = useLanguage();
  const [products, setProducts] = useState<EvaluatedProduct[]>(DEFAULT_PRODUCTS);
  const [activeProductId, setActiveProductId] = useState<string>(DEFAULT_PRODUCTS[0].id);

  // Form for active product
  const activeProduct = products.find(p => p.id === activeProductId) || products[0];

  const handleUpdateActiveProduct = (field: keyof EvaluatedProduct, value: any) => {
    setProducts(prev => prev.map(p => {
      if (p.id === activeProductId) {
        return { ...p, [field]: value };
      }
      return p;
    }));
  };

  const handleUpdateScore = (scoreKey: keyof EvaluatedProduct['scores'], value: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === activeProductId) {
        return {
          ...p,
          scores: {
            ...p.scores,
            [scoreKey]: value
          }
        };
      }
      return p;
    }));
  };

  const handleAddNewProduct = () => {
    const newId = 'prod-' + Date.now();
    const newProduct: EvaluatedProduct = {
      id: newId,
      name: `منتج جديد #${products.length + 1}`,
      category: 'عام',
      sourceUrl: '',
      scores: {
        problemSolving: 3,
        visualWow: 3,
        profitMargin: 3,
        shippingWeight: 3,
        lowReturnRisk: 3,
        notInGrocery: 3
      },
      notes: ''
    };
    setProducts(prev => [...prev, newProduct]);
    setActiveProductId(newId);
  };

  const handleDeleteProduct = (id: string) => {
    if (products.length <= 1) return;
    const remaining = products.filter(p => p.id !== id);
    setProducts(remaining);
    setActiveProductId(remaining[0].id);
  };

  // Score Calculation
  const calculateTotal = (scores: EvaluatedProduct['scores']) => {
    const sum = scores.problemSolving + 
                scores.visualWow + 
                scores.profitMargin + 
                scores.shippingWeight + 
                scores.lowReturnRisk + 
                scores.notInGrocery;
    return sum; // Max 30
  };

  const getScoreVerdict = (total: number) => {
    if (total >= 25) {
      return {
        badge: '🟢 منتج واعد جداً ومثالي للاختبار',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        recommendation: 'يتمتع بكافة مقومات النجاح: حل مشكلة واضحة، عامل إبهار بصري فوري، خفة وزن وأمان شحن. ننصح بطلب عينة فوراً وتجهيز 3 سيناريوهات فيديو لبدء الاختبار.'
      };
    } else if (total >= 19) {
      return {
        badge: '🟡 منتج متوسط (يتطلب زاوية مبتكرة)',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        recommendation: 'يمكن اختباره بحذر؛ يحتاج إلى إيجاد هوك إعلاني استثنائي أو التفاوض مع المورد لخفض سعر التكلفة وتحسين الهامش، أو التأكد من تقليل مخاطر التلف.'
      };
    } else {
      return {
        badge: '🔴 غير موصى به (مخاطر عالية وهامش ضعيف)',
        color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
        recommendation: 'المنتج يفتقر للمقومات الأساسية: قد يكون عرضة للمرتجعات والكسر، أو متوفراً في كل سوبرماركت، أو هامشه ضئيل جداً. ابحث عن بديل آخر لتوفير أموالك ومجهودك.'
      };
    }
  };

  const currentTotal = calculateTotal(activeProduct.scores);
  const currentVerdict = getScoreVerdict(currentTotal);
  const percentage = Math.round((currentTotal / 30) * 100);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-400">
              <Scale className="h-3.5 w-3.5" />
              <span>مصفوفة التقييم الموضوعي للخيارات</span>
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-black text-white">
              مصفوفة تقييم المنتجات ومقارنة البدائل (Product Scorecard)
            </h3>
            <p className="mt-1 text-sm text-zinc-400 max-w-2xl">
              لا تعتمد على العاطفة أو على مصطلح "المنتج الرابح حتماً". قيّم كل منتج تفكر في بيعه وفق المعايير الستة المعتمدة لتتخذ قراراً عقلانياً يستند إلى البيانات.
            </p>
          </div>

          <button
            onClick={handleAddNewProduct}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 transition"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة منتج جديد للتقييم</span>
          </button>
        </div>

        {/* Product Selector Tabs */}
        <div className="mt-6 pt-5 border-t border-zinc-800 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-medium text-zinc-400 ml-2">المنتجات قيد التقييم:</span>
          {products.map(p => {
            const isSelected = p.id === activeProductId;
            const score = calculateTotal(p.scores);
            return (
              <button
                key={p.id}
                onClick={() => setActiveProductId(p.id)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-bold transition ${
                  isSelected 
                    ? 'border-emerald-500 bg-emerald-500/15 text-white' 
                    : 'border-zinc-800 bg-zinc-850 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <span>{p.name.length > 20 ? p.name.slice(0, 20) + '...' : p.name}</span>
                <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-black ${
                  score >= 25 ? 'bg-emerald-500/20 text-emerald-400' : score >= 19 ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {score}/30
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form & Live Rating */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Product Meta */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h4 className="font-bold text-white text-sm">بيانات المنتج الأساسية</h4>
              {products.length > 1 && (
                <button
                  onClick={() => handleDeleteProduct(activeProduct.id)}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>حذف هذا المنتج</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">اسم المنتج أو الفكرة</label>
                <input
                  type="text"
                  value={activeProduct.name}
                  onChange={(e) => handleUpdateActiveProduct('name', e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-3.5 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
                  placeholder="مثال: قطاعة خضار دوارة 4 في 1"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">النيتش أو التصنيف</label>
                <input
                  type="text"
                  value={activeProduct.category}
                  onChange={(e) => handleUpdateActiveProduct('category', e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-3.5 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
                  placeholder="أدوات المطبخ / حيوانات أليفة"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-zinc-300 mb-1">رابط المورد أو كود المنتج (اختياري)</label>
                <input
                  type="text"
                  value={activeProduct.sourceUrl}
                  onChange={(e) => handleUpdateActiveProduct('sourceUrl', e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-3.5 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
                  placeholder="رابط AliExpress / CJ Dropshipping"
                />
              </div>
            </div>
          </div>

          {/* The 6 Criteria */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-6">
            <div className="border-b border-zinc-800 pb-3">
              <h4 className="font-bold text-white text-base">المعايير الستة المعتمدة (قيّم من 1 إلى 5)</h4>
              <p className="text-xs text-zinc-400 mt-1">1 = ضعيف جداً أو خطر | 5 = ممتاز ومثالي للغاية</p>
            </div>

            {/* 1. Problem Solving */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">1. حل مشكلة يومية أو إشباع شغف عميق</span>
                </div>
                <span className="font-black text-emerald-400">{activeProduct.scores.problemSolving}/5</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                هل يوفر على العميل الوقت، الجهد، الألم، أو الفوضى؟ هل يدفع العميل للشراء فوراً دون تردد؟
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(val => (
                  <button
                    key={val}
                    onClick={() => handleUpdateScore('problemSolving', val)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition border ${
                      activeProduct.scores.problemSolving === val
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                        : 'border-zinc-800 bg-zinc-800/40 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Visual Wow Factor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">2. عامل الإبهار البصري في أول 3 ثوانٍ (Visual Wow)</span>
                </div>
                <span className="font-black text-emerald-400">{activeProduct.scores.visualWow}/5</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                هل يلفت الانتباه أثناء التمرير في تيك توك وريلز؟ هل يمكن شرح فكرته في لقطة واحدة صامتة؟
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(val => (
                  <button
                    key={val}
                    onClick={() => handleUpdateScore('visualWow', val)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition border ${
                      activeProduct.scores.visualWow === val
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                        : 'border-zinc-800 bg-zinc-800/40 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Profit Margin */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">3. هامش الربح المحتمل (سعر البيع لا يقل عن 2.5x-3x التكلفة)</span>
                </div>
                <span className="font-black text-emerald-400">{activeProduct.scores.profitMargin}/5</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                هل يترك المنتج بعد خصم الشحن ومصاريف الإعلانات ربحاً صافياً لا يقل عن 12$ إلى 20$ للقطعة؟
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(val => (
                  <button
                    key={val}
                    onClick={() => handleUpdateScore('profitMargin', val)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition border ${
                      activeProduct.scores.profitMargin === val
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                        : 'border-zinc-800 bg-zinc-800/40 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Shipping Weight & Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">4. خفة الوزن وصغر الحجم (سهولة ورخص الشحن)</span>
                </div>
                <span className="font-black text-emerald-400">{activeProduct.scores.shippingWeight}/5</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                الوزن المثالي أقل من 400 غرام وحجمه مدمج لكي لا ترتفع تكاليف الشحن الحجمي الدولي بالطيران.
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(val => (
                  <button
                    key={val}
                    onClick={() => handleUpdateScore('shippingWeight', val)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition border ${
                      activeProduct.scores.shippingWeight === val
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                        : 'border-zinc-800 bg-zinc-800/40 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Low Return & Damage Risk */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">5. انخفاض مخاطر التلف وخطأ المقاسات والأعطال</span>
                </div>
                <span className="font-black text-emerald-400">{activeProduct.scores.lowReturnRisk}/5</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                غير قابل للكسر، مقاس موحد (One Size)، وليس جهازاً إلكترونياً معقداً رخيصاً يتعطل بسرعة.
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(val => (
                  <button
                    key={val}
                    onClick={() => handleUpdateScore('lowReturnRisk', val)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition border ${
                      activeProduct.scores.lowReturnRisk === val
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                        : 'border-zinc-800 bg-zinc-800/40 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Not Readily Found Locally */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">6. غير متاح بسهولة في المتاجر المحلية المجاورة</span>
                </div>
                <span className="font-black text-emerald-400">{activeProduct.scores.notInGrocery}/5</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                إذا كان الزبون يستطيع شراءه بدقيقتين من البقالة أو السوبرماركت المحلي بسعر أرخص، فلن ينتظر شحن متجرك.
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(val => (
                  <button
                    key={val}
                    onClick={() => handleUpdateScore('notInGrocery', val)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition border ${
                      activeProduct.scores.notInGrocery === val
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                        : 'border-zinc-800 bg-zinc-800/40 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-2">
            <label className="block text-xs font-bold text-white">ملاحظات التحليل والزاوية التسويقية المقترحة</label>
            <textarea
              rows={3}
              value={activeProduct.notes}
              onChange={(e) => handleUpdateActiveProduct('notes', e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 p-3 text-xs text-white focus:border-purple-500 focus:outline-none"
              placeholder="اكتب أفكارك حول زاوية الفيديو، المشكلة المحددة، أو نتائج فحص المنافسين..."
            />
          </div>
        </div>

        {/* Right Summary Verdict (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 space-y-5 shadow-2xl sticky top-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                نتيجة التقييم الإجمالية
              </span>
              <span className={`rounded-full border px-3 py-1 text-xs font-black ${currentVerdict.color}`}>
                {currentVerdict.badge}
              </span>
            </div>

            {/* Score Ring / Bar */}
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-5xl font-black text-white">{currentTotal}</span>
              <span className="text-lg font-bold text-zinc-500">/ 30 نقطة</span>
              <span className="text-xs text-zinc-400 mr-auto font-bold">({percentage}%)</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  currentTotal >= 25 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                  currentTotal >= 19 ? 'bg-gradient-to-r from-amber-500 to-orange-400' :
                  'bg-gradient-to-r from-rose-500 to-red-600'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Recommendation Box */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-850 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Info className="h-4 w-4 text-purple-400" />
                <span>التوصية المنهجية:</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {currentVerdict.recommendation}
              </p>
            </div>

            {/* Breakdown radar list */}
            <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs">
              <div className="flex justify-between items-center text-zinc-400">
                <span>حل المشكلة:</span>
                <span className="font-bold text-white">{activeProduct.scores.problemSolving}/5</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>عامل الإبهار (Wow):</span>
                <span className="font-bold text-white">{activeProduct.scores.visualWow}/5</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>هامش الربح:</span>
                <span className="font-bold text-white">{activeProduct.scores.profitMargin}/5</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>سهولة الشحن والوزن:</span>
                <span className="font-bold text-white">{activeProduct.scores.shippingWeight}/5</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>أمان المنتج وقلة المرتجعات:</span>
                <span className="font-bold text-white">{activeProduct.scores.lowReturnRisk}/5</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>عدم التوفر محلياً:</span>
                <span className="font-bold text-white">{activeProduct.scores.notInGrocery}/5</span>
              </div>
            </div>

            {/* Comparison Table Snapshot */}
            <div className="pt-4 border-t border-zinc-800">
              <div className="text-xs font-bold text-zinc-300 mb-2">مقارنة سريعة لجميع المنتجات:</div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {products.map((p, idx) => {
                  const s = calculateTotal(p.scores);
                  return (
                    <div
                      key={p.id}
                      onClick={() => setActiveProductId(p.id)}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer text-xs transition ${
                        p.id === activeProductId 
                          ? 'bg-zinc-800 border border-purple-500/40 text-white' 
                          : 'hover:bg-zinc-800/60 text-zinc-400'
                      }`}
                    >
                      <span className="truncate max-w-[170px]">{idx + 1}. {p.name}</span>
                      <span className={`font-black ${
                        s >= 25 ? 'text-emerald-400' : s >= 19 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {s}/30
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
