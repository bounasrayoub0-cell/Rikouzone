import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Copy, 
  Check, 
  Layers, 
  FileText, 
  Wrench,
  AlertCircle,
  TrendingUp,
  Tag
} from 'lucide-react';
import { 
  templateIdeaEvaluationsList, 
  TemplateIdeaEvaluation 
} from '../../data/templateData';

interface TemplateIdeaWorkshopProps {
  onCopyText: (text: string, label: string) => void;
}

export const TemplateIdeaWorkshop: React.FC<TemplateIdeaWorkshopProps> = ({ onCopyText }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'Notion' | 'Canva'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Custom User Idea Evaluation state
  const [userIdea, setUserIdea] = useState({
    title: '',
    toolType: 'Notion' as 'Notion' | 'Canva',
    targetAudience: '',
    painPoint: '',
    timeSavingRating: 8, // 1 - 10
    executionSimplicity: 8, // 1 - 10
    marketDemandRating: 7 // 1 - 10
  });
  const [hasEvaluated, setHasEvaluated] = useState(false);

  const handleCopy = (text: string, id: string, label: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredIdeas = selectedFilter === 'all'
    ? templateIdeaEvaluationsList
    : templateIdeaEvaluationsList.filter(item => item.category === selectedFilter);

  const calculateScore = () => {
    return Math.round(
      ((userIdea.timeSavingRating * 0.4) + (userIdea.executionSimplicity * 0.3) + (userIdea.marketDemandRating * 0.3)) * 10
    );
  };

  const score = calculateScore();

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 mb-3">
              <Target className="h-3.5 w-3.5" />
              <span>مختبر الأفكار ومقارنة الطلب</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              أفكار قوالب مجربة في السوق العربي وحاسبة تقييم فكرتك
            </h3>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              استكشف 5 أفكار قوالب عالية الطلب في Notion وCanva مع تحليل الجمهور والمشكلة والسعر المقترح، أو أدخل فكرتك الخاصة لتقييم جدواها وسرعة نجاحها قبل البدء بالتصميم.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium">المنصة:</span>
            <div className="flex rounded-xl bg-zinc-800 p-1 border border-zinc-700">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === 'all' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                الكل
              </button>
              <button
                onClick={() => setSelectedFilter('Notion')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === 'Notion' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Notion
              </button>
              <button
                onClick={() => setSelectedFilter('Canva')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === 'Canva' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Canva
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ideas Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => {
          const isCopied = copiedId === idea.id;
          const copySummary = `فكرة قالب: ${idea.name} (${idea.category})\nالجمهور: ${idea.targetAudience}\nالمشكلة: ${idea.coreProblem}\nالحل والميزات: ${idea.solutionAndFeatures}\nالسعر المقترح: ${idea.suggestedPrice}`;

          return (
            <div
              key={idea.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-all hover:bg-zinc-900/70 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`rounded-lg px-2.5 py-1 text-[11px] font-black ${
                    idea.category === 'Notion'
                      ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                      : 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60'
                  }`}>
                    {idea.category}
                  </span>
                  <span className="text-[11px] text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-md font-medium">
                    مستوى المبتدئ: {idea.difficultyForBeginner}
                  </span>
                </div>

                <h4 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors">
                  {idea.name}
                </h4>

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
                    <span className="text-emerald-400 font-bold block mb-1">الحل والميزات بالقالب:</span>
                    <p className="leading-relaxed text-zinc-200">{idea.solutionAndFeatures}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 block">السعر المقترح</span>
                  <span className="text-sm font-black text-emerald-400">{idea.suggestedPrice}</span>
                </div>

                <button
                  onClick={() => handleCopy(copySummary, idea.id, 'تفاصيل فكرة القالب')}
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
              <span>حاسبة قياس قوة فكرة القالب الشخصية</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              هل فكرة قالبك جاهزة للبيع بنجاح؟
            </h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              أدخل بيانات فكرتك وقيم سهولة تنفيذها ومقدار الوقت الذي توفره على العميل لترى تقييم الجاهزية الفوري.
            </p>
          </div>

          <div className="space-y-5 bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  عنوان أو فكرة قالبك المقترح:
                </label>
                <input
                  type="text"
                  placeholder="مثال: لوحة تحكم Notion لإدارة مشاريع المهندسين المعماريين"
                  value={userIdea.title}
                  onChange={(e) => setUserIdea({ ...userIdea, title: e.target.value })}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  المنصة المستهدفة:
                </label>
                <select
                  value={userIdea.toolType}
                  onChange={(e) => setUserIdea({ ...userIdea, toolType: e.target.value as 'Notion' | 'Canva' })}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Notion">Notion Template</option>
                  <option value="Canva">Canva Template</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  الجمهور المستهدف بدقة:
                </label>
                <input
                  type="text"
                  placeholder="مثال: طلاب كليات الهندسة، مصممو الشعارات المستقلون"
                  value={userIdea.targetAudience}
                  onChange={(e) => setUserIdea({ ...userIdea, targetAudience: e.target.value })}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  المشكلة التي يحلها القالب:
                </label>
                <input
                  type="text"
                  placeholder="مثال: ضياع ملفات التصميم وملاحظات التعديلات مع العميل"
                  value={userIdea.painPoint}
                  onChange={(e) => setUserIdea({ ...userIdea, painPoint: e.target.value })}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Sliders */}
            <div className="pt-3 border-t border-zinc-800 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1">
                  <span>مقدار الوقت والمجهود الذي يوفره القالب على المشتري:</span>
                  <span className="text-emerald-400">{userIdea.timeSavingRating} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={userIdea.timeSavingRating}
                  onChange={(e) => setUserIdea({ ...userIdea, timeSavingRating: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1">
                  <span>سهولة وبساطة القالب (هل هو بديهي للمبتدئ بدون تعقيدات؟):</span>
                  <span className="text-emerald-400">{userIdea.executionSimplicity} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={userIdea.executionSimplicity}
                  onChange={(e) => setUserIdea({ ...userIdea, executionSimplicity: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1">
                  <span>وجود منافسين وطلب نشط على شبكات التواصل (TikTok / Pinterest):</span>
                  <span className="text-emerald-400">{userIdea.marketDemandRating} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={userIdea.marketDemandRating}
                  onChange={(e) => setUserIdea({ ...userIdea, marketDemandRating: parseInt(e.target.value) })}
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

            {hasEvaluated && (
              <div className="mt-4 p-5 rounded-xl bg-zinc-950 border border-emerald-500/40 text-center animate-fade-in">
                <span className="text-xs text-zinc-400 block mb-1">مؤشر نجاح فكرة القالب المقترحة:</span>
                <div className="text-4xl font-black text-emerald-400 mb-2">
                  {score}%
                </div>
                <div className="text-xs text-zinc-300 max-w-lg mx-auto leading-relaxed">
                  {score >= 75 ? (
                    <span className="text-emerald-300 font-bold">
                      ممتاز جداً! الفكرة واضحة ومطلوبة وتقدم قيمة حقيقية في توفير الوقت. ابدأ فوراً في تطبيق خطوات بناء القالب في القسم العملي.
                    </span>
                  ) : score >= 50 ? (
                    <span className="text-amber-300 font-bold">
                      فكرة جيدة ولكنها تحتاج لتبسيط أكبر أو تحديد نيتش أكثر دقة. تجنب كثرة الجداول المعقدة وركز على حل مشكلة واحدة ملحة.
                    </span>
                  ) : (
                    <span className="text-red-300 font-bold">
                      تحذير: الفكرة قد تكون عامة جداً أو معقدة ويصعب على العميل استخدامها بسرعة. أعد فحص القسم الثاني واختر مشكلة يومية ملموسة.
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
