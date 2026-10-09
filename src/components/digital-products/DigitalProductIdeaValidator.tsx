import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Copy, 
  Check, 
  Search, 
  Tag, 
  DollarSign, 
  AlertCircle,
  TrendingUp,
  FileText
} from 'lucide-react';
import { 
  digitalProductIdeaValidationsList, 
  DigitalProductIdeaValidation 
} from '../../data/digitalProductsData';

interface DigitalProductIdeaValidatorProps {
  onCopyText: (text: string, label: string) => void;
}

export const DigitalProductIdeaValidator: React.FC<DigitalProductIdeaValidatorProps> = ({ onCopyText }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Custom Idea Evaluation Calculator State
  const [userIdea, setUserIdea] = useState({
    title: '',
    targetAudience: '',
    coreProblem: '',
    coreSolution: '',
    urgencyRating: 7, // 1 to 10
    easeOfCreation: 8, // 1 to 10
    marketDemand: 7 // 1 to 10
  });
  const [hasEvaluated, setHasEvaluated] = useState(false);

  const handleCopy = (text: string, id: string, label: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredIdeas = selectedCategory === 'all'
    ? digitalProductIdeaValidationsList
    : digitalProductIdeaValidationsList.filter(item => item.productType === selectedCategory);

  const calculateScore = () => {
    return Math.round(((userIdea.urgencyRating * 0.4) + (userIdea.easeOfCreation * 0.3) + (userIdea.marketDemand * 0.3)) * 10);
  };

  const score = calculateScore();

  return (
    <div className="space-y-10">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 mb-3">
              <Target className="h-3.5 w-3.5" />
              <span>مختبر التحقق من الأفكار ودراسة الطلب</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              أفكار منتجات رقمية مجربة ونظام تقييم الفكرة
            </h3>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              استكشف 5 أفكار لمنتجات رقمية حقيقية تم التحقق من وجود طلب مؤكد عليها في السوق العربي، أو استخدم حاسبة فحص الفكرة لتقييم فكرتك الشخصية قبل كتابة حرف واحد.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium">تصفية حسب النوع:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">جميع الأنواع</option>
              <option value="E-book">كتاب إلكتروني (E-book)</option>
              <option value="Practical Guide">دليل تطبيقي (Practical Guide)</option>
              <option value="Checklist / Template">قالب أو ملف (Template)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Verified Ideas Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => {
          const isCopied = copiedId === idea.id;
          const copySummary = `فكرة منتج رقمي: ${idea.solutionAndPromise}\nالجمهور: ${idea.targetAudience}\nالمشكلة: ${idea.coreProblem}\nالسعر المقترح: ${idea.suggestedPrice}`;

          return (
            <div
              key={idea.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-all hover:bg-zinc-900/70 group"
            >
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-black text-emerald-400">
                    {idea.productType}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-medium bg-zinc-800/80 px-2 py-0.5 rounded-md">
                    {idea.category}
                  </span>
                </div>

                {/* Promise / Solution */}
                <h4 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors">
                  {idea.solutionAndPromise}
                </h4>

                {/* Audience & Pain */}
                <div className="mt-4 space-y-2.5 text-xs text-zinc-300">
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <span className="text-zinc-500 font-bold block mb-1">الجمهور المستهدف:</span>
                    <p className="leading-relaxed">{idea.targetAudience}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <span className="text-red-400/90 font-bold block mb-1">المشكلة والألم الملّح:</span>
                    <p className="leading-relaxed">{idea.coreProblem}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                    <span className="text-emerald-400 font-bold block mb-1">دليل التحقق من الطلب:</span>
                    <p className="leading-relaxed text-zinc-300">{idea.validationMethod}</p>
                  </div>
                </div>

                {/* Free Tools */}
                <div className="mt-4">
                  <span className="text-[11px] text-zinc-500 font-bold block mb-1.5">الأدوات المجانية المستخدمة:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {idea.freeToolsUsed.map((tool, idx) => (
                      <span key={idx} className="rounded-md bg-zinc-800/90 text-zinc-300 px-2 py-0.5 text-[10px]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer with Price and Copy */}
              <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 block">السعر المقترح</span>
                  <span className="text-sm font-black text-emerald-400">{idea.suggestedPrice}</span>
                </div>

                <button
                  onClick={() => handleCopy(copySummary, idea.id, 'تفاصيل فكرة المنتج')}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-500 text-black'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                  }`}
                >
                  {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{isCopied ? 'تم النسخ' : 'نسخ الفكرة'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Idea Assessment Calculator */}
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 via-zinc-900/90 to-zinc-950 p-6 sm:p-10 shadow-xl shadow-emerald-950/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-400 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>حاسبة قياس جاهزية فكرتك الخاصة</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              هل فكرتك جاهزة للإنتاج والبيع؟
            </h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              أدخل معطيات فكرتك وقيم درجة إلحاح المشكلة وسهولة التنفيذ لنعطيك تقييماً فوريّاً ونصائح دقيقة قبل البدء.
            </p>
          </div>

          <div className="space-y-5 bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                عنوان أو موضوع فكرتك المقترحة:
              </label>
              <input
                type="text"
                placeholder="مثال: دليل تحضير المقابلات الوظيفية باللغة الإنجليزية في البرمجة"
                value={userIdea.title}
                onChange={(e) => setUserIdea({ ...userIdea, title: e.target.value })}
                className="w-full rounded-xl bg-zinc-950 border border-zinc-700 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  الجمهور المستهدف بدقة:
                </label>
                <input
                  type="text"
                  placeholder="مثال: خريجو كليات الحاسب المتقدمون لشركات عالمية"
                  value={userIdea.targetAudience}
                  onChange={(e) => setUserIdea({ ...userIdea, targetAudience: e.target.value })}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  المشكلة الأساسية التي يعانون منها:
                </label>
                <input
                  type="text"
                  placeholder="مثال: التردد والتأتأة باللغة الإنجليزية رغم الكفاءة البرمجية"
                  value={userIdea.coreProblem}
                  onChange={(e) => setUserIdea({ ...userIdea, coreProblem: e.target.value })}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Range sliders */}
            <div className="pt-3 border-t border-zinc-800 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1">
                  <span>درجة إلحاح المشكلة لدى العميل (هل هي ملحة أم مجرد رفاهية؟):</span>
                  <span className="text-emerald-400">{userIdea.urgencyRating} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={userIdea.urgencyRating}
                  onChange={(e) => setUserIdea({ ...userIdea, urgencyRating: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1">
                  <span>سهولة كتابتك وتصميمك للمحتوى بإمكانياتك الحالية:</span>
                  <span className="text-emerald-400">{userIdea.easeOfCreation} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={userIdea.easeOfCreation}
                  onChange={(e) => setUserIdea({ ...userIdea, easeOfCreation: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1">
                  <span>وجود منافسين وأسئلة متكررة في السوشيال ميديا:</span>
                  <span className="text-emerald-400">{userIdea.marketDemand} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={userIdea.marketDemand}
                  onChange={(e) => setUserIdea({ ...userIdea, marketDemand: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={() => setHasEvaluated(true)}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              حساب نتيجة الجاهزية والتوصية التنفيذية
            </button>

            {/* Score Result */}
            {hasEvaluated && (
              <div className="mt-4 p-5 rounded-xl bg-zinc-950 border border-emerald-500/40 text-center animate-fade-in">
                <span className="text-xs text-zinc-400 block mb-1">درجة قوة الفكرة المقترحة:</span>
                <div className="text-4xl font-black text-emerald-400 mb-2">
                  {score}%
                </div>
                <div className="text-xs text-zinc-300 max-w-lg mx-auto leading-relaxed">
                  {score >= 75 ? (
                    <span className="text-emerald-300 font-bold">
                      ممتاز جداً! الفكرة تتمتع بطلب حقيقي وسهولة تنفيذ عالية. ابدأ فوراً بإعداد فهرس الفصول وتجهيز غلاف الـ Canva.
                    </span>
                  ) : score >= 50 ? (
                    <span className="text-amber-300 font-bold">
                      فكرة واعدة، لكن تأكد من تضييق الجمهور المستهدف أكثر أو ابحث عن دليل مؤكد على استعدادهم لدفع المال قبل الاستثمار في كتابتها.
                    </span>
                  ) : (
                    <span className="text-red-300 font-bold">
                      تحذير: الفكرة قد تكون عامة جداً أو تفتقر إلى إلحاح المشكلة. ننصح بمراجعة قسم "اكتشاف المشكلات الحقيقية" واختيار موضوع أكثر تخصصاً.
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
