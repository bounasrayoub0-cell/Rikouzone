import React, { useState } from 'react';
import { 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Award,
  TrendingUp,
  Package,
  Layers,
  Info
} from 'lucide-react';
import { defaultIdeaComparisonList, IdeaComparisonItem } from '../../data/brandedEcommerceData';

export const BrandedEcommerceIdeaComparator: React.FC = () => {
  const [ideasList, setIdeasList] = useState<IdeaComparisonItem[]>(defaultIdeaComparisonList);
  const [activeIdeaId, setActiveIdeaId] = useState<string>(defaultIdeaComparisonList[0].id);

  const calculateTotalScore = (item: IdeaComparisonItem): number => {
    // Weighted scoring algorithm:
    // Demand: 25%
    // Differentiation: 25%
    // Sourcing Ease: 20%
    // Low Competition (10 - competition): 15%
    // Cost feasibility: 15% (lower cost is easier for beginner)
    const demandPoints = (item.expectedDemandScore / 10) * 25;
    const diffPoints = (item.differentiationScore / 10) * 25;
    const sourcingPoints = (item.sourcingEaseScore / 10) * 20;
    const competitionInverted = Math.max(1, 10 - item.competitionLevelScore);
    const compPoints = (competitionInverted / 10) * 15;
    const costScore = item.costPerUnitEstimate <= 8 ? 10 : item.costPerUnitEstimate <= 15 ? 7 : 4;
    const costPoints = (costScore / 10) * 15;

    return Math.round(demandPoints + diffPoints + sourcingPoints + compPoints + costPoints);
  };

  const handleUpdateScore = (
    id: string, 
    field: 'expectedDemandScore' | 'competitionLevelScore' | 'sourcingEaseScore' | 'differentiationScore' | 'costPerUnitEstimate', 
    val: number
  ) => {
    setIdeasList(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: val };
        updated.totalScore = calculateTotalScore(updated);
        return updated;
      }
      return item;
    }));
  };

  const handleReset = () => {
    setIdeasList(defaultIdeaComparisonList);
  };

  const handleAddNewIdea = () => {
    if (ideasList.length >= 5) return;
    const newId = `custom-idea-${Date.now()}`;
    const newItem: IdeaComparisonItem = {
      id: newId,
      name: 'فكرة منتج جديدة مخصصة',
      category: 'تخصص مخصص',
      targetAudience: 'حدد فئة جمهورك المستهدف هنا بدقة',
      expectedDemandScore: 7,
      costPerUnitEstimate: 8.0,
      competitionLevelScore: 6,
      sourcingEaseScore: 7,
      differentiationScore: 8,
      totalScore: 72,
      pros: ['ميزة تنافسية 1', 'ميزة تنافسية 2'],
      cons: ['تحدي محتمل 1'],
      recommendation: 'فكرة واعدة تتطلب فحص العينات والتأكد من الجودة قبل طلب المخزون.'
    };
    newItem.totalScore = calculateTotalScore(newItem);
    setIdeasList(prev => [...prev, newItem]);
    setActiveIdeaId(newId);
  };

  const handleDeleteIdea = (id: string) => {
    if (ideasList.length <= 1) return;
    setIdeasList(prev => prev.filter(i => i.id !== id));
    if (activeIdeaId === id) {
      const remaining = ideasList.filter(i => i.id !== id);
      if (remaining.length > 0) setActiveIdeaId(remaining[0].id);
    }
  };

  const activeIdea = ideasList.find(i => i.id === activeIdeaId) || ideasList[0];

  // Rank ideas
  const sortedIdeas = [...ideasList].sort((a, b) => b.totalScore - a.totalScore);
  const bestIdea = sortedIdeas[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-[#0c0d14]/90 p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm shadow-amber-500/10">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>نموذج مقارنة وتقييم 3 أفكار تجارية</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-sans">
                  5-Pillar Decision Matrix
                </span>
              </h2>
              <p className="mt-1 text-xs text-zinc-400">
                مقارنة موضوعية مبنية على: الطلب المتوقع، تكلفة التصنيع، حدة المنافسة، سهولة التوريد، وإمكانية التميز بالبراند.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddNewIdea}
              disabled={ideasList.length >= 5}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold text-xs shadow-md shadow-orange-500/25 border border-orange-400/30 cursor-pointer disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>إضافة فكرة جديدة</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700/60 text-xs font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>إعادة الضبط</span>
            </button>
          </div>
        </div>

        {/* Top Winner Card Banner */}
        {bestIdea && (
          <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-amber-950/20 via-[#10131d] to-[#0d1612] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  الفكرة الأعلى نقاطاً حالياً (الخيار الموصى به)
                </span>
                <span className="text-sm font-black text-white">{bestIdea.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="text-xs text-zinc-400">النتيجة الإجمالية:</span>
              <span className="text-xl font-black text-amber-400 font-sans">{bestIdea.totalScore} / 100</span>
            </div>
          </div>
        )}
      </div>

      {/* Idea Selector Cards Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {ideasList.map((idea, index) => {
          const isSelected = idea.id === activeIdeaId;
          const isWinner = idea.id === bestIdea?.id;

          return (
            <div
              key={idea.id}
              onClick={() => setActiveIdeaId(idea.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-500/70 bg-[#12141e] shadow-lg shadow-amber-950/20 ring-1 ring-amber-500/30'
                  : 'border-zinc-800 bg-[#0e1017]/80 hover:border-zinc-700 hover:bg-[#11131c]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#161824] text-zinc-300 border border-zinc-800">
                    فكرة #{index + 1}
                  </span>
                  {isWinner && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      <span>الأعلى تقييماً</span>
                    </span>
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-black text-white leading-snug line-clamp-2">
                  {idea.name}
                </h4>
                <span className="text-[11px] text-zinc-400 mt-1 block truncate">
                  {idea.category}
                </span>
              </div>

              <div className="mt-3 pt-2.5 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500">النقاط:</span>
                <span className="text-sm font-black text-amber-400 font-mono">
                  {idea.totalScore} <span className="text-[10px] font-normal text-zinc-500">/ 100</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Idea Detail & Interactive Sliders */}
      {activeIdea && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sliders and Score adjustments (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-zinc-800 bg-[#0e1017]/90 p-5 sm:p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  لوحة تعديل معايير الفكرة
                </span>
                <h3 className="text-base font-black text-white">{activeIdea.name}</h3>
              </div>

              {ideasList.length > 1 && (
                <button
                  onClick={() => handleDeleteIdea(activeIdea.id)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/20 transition-colors cursor-pointer"
                  title="حذف هذه الفكرة"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Slider 1: Expected Demand */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-300">1. حجم الطلب المتوقع في السوق (Demand)</span>
                <span className="font-black text-amber-400 font-mono">{activeIdea.expectedDemandScore} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={activeIdea.expectedDemandScore}
                onChange={(e) => handleUpdateScore(activeIdea.id, 'expectedDemandScore', parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-zinc-500 block">
                هل يبحث الناس عن هذا المنتج يومياً وهل يشهد تفاعلاً قوياً على تيك توك ومحركات البحث؟
              </span>
            </div>

            {/* Slider 2: Cost Per Unit */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-300">2. تكلفة شراء/تصنيع القطعة ($)</span>
                <span className="font-black text-amber-400 font-mono">{activeIdea.costPerUnitEstimate}$</span>
              </div>
              <input
                type="range"
                min="2"
                max="40"
                step="0.5"
                value={activeIdea.costPerUnitEstimate}
                onChange={(e) => handleUpdateScore(activeIdea.id, 'costPerUnitEstimate', parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-zinc-500 block">
                التكلفة المنخفضة (5$-12$) تناسب المبتدئ وتتيح شراء دفعة تجريبية دون تجميد سيولة كبيرة.
              </span>
            </div>

            {/* Slider 3: Competition Level */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-300">3. حدة المنافسة في السوق (1 = سهلة، 10 = مشبعة جداً)</span>
                <span className="font-black text-orange-400 font-mono">{activeIdea.competitionLevelScore} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={activeIdea.competitionLevelScore}
                onChange={(e) => handleUpdateScore(activeIdea.id, 'competitionLevelScore', parseInt(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <span className="text-[10px] text-zinc-500 block">
                كلما قلت المنافسة المباشرة كلما انخفضت تكلفة الإعلانات وسهل إقناع العملاء.
              </span>
            </div>

            {/* Slider 4: Sourcing Ease */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-300">4. سهولة التوريد والعثور على مصنعين موثوقين</span>
                <span className="font-black text-emerald-400 font-mono">{activeIdea.sourcingEaseScore} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={activeIdea.sourcingEaseScore}
                onChange={(e) => handleUpdateScore(activeIdea.id, 'sourcingEaseScore', parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[10px] text-zinc-500 block">
                توفر موردين محليين أو وكلاء شحن سريع بحد أدنى منخفض للطلب (MOQ).
              </span>
            </div>

            {/* Slider 5: Differentiation Potential */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-300">5. إمكانية التميز ببراند وتغليف خاص (Differentiation)</span>
                <span className="font-black text-amber-400 font-mono">{activeIdea.differentiationScore} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={activeIdea.differentiationScore}
                onChange={(e) => handleUpdateScore(activeIdea.id, 'differentiationScore', parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-zinc-500 block">
                سهولة وضع شعار، تصميم كرتون فريد، وابتكار قصة براند حقيقية تمنع تقليدك بسهولة.
              </span>
            </div>
          </div>

          {/* Evaluation Card and Recommendation (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Score & Verdict Box */}
            <div className="rounded-3xl border border-zinc-800 bg-[#0e1017]/90 p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-bold text-zinc-400">تقييم الجدوى الإجمالي:</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-amber-400 font-mono">{activeIdea.totalScore}</span>
                  <span className="text-xs text-zinc-500 font-bold">/ 100</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${
                  activeIdea.totalScore >= 75 ? 'bg-emerald-400' : activeIdea.totalScore >= 60 ? 'bg-amber-400' : 'bg-red-400'
                }`} />
                <span className="text-xs font-black text-white">
                  {activeIdea.totalScore >= 75 ? 'فكرة ممتازة - ضوء أخضر للبدء' : activeIdea.totalScore >= 60 ? 'فكرة مقبولة - تحتاج تحسين التوريد أو التميز' : 'فكرة محفوفة بالمخاطر - فكر في بديل'}
                </span>
              </div>

              {/* Recommendation text */}
              <div className="p-3.5 rounded-2xl bg-[#141622] border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                <span className="font-bold text-amber-400 block mb-1">التوصية الاستراتيجية:</span>
                <p>{activeIdea.recommendation}</p>
              </div>

              {/* Pros & Cons */}
              <div className="space-y-3 pt-2">
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 block mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>نقاط القوة الأساسية:</span>
                  </span>
                  <div className="space-y-1 text-xs text-zinc-300">
                    {activeIdea.pros.map((p, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">•</span>
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-amber-400 block mb-1.5 flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>التحديات والنقاط الحذرة:</span>
                  </span>
                  <div className="space-y-1 text-xs text-zinc-400">
                    {activeIdea.cons.map((c, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400">•</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Target Audience reminder */}
            <div className="rounded-2xl border border-zinc-800 bg-[#0c0d14]/90 p-4 text-xs">
              <span className="font-bold text-zinc-400 block mb-1">الجمهور المستهدف للفكرة:</span>
              <p className="text-zinc-200 leading-relaxed">{activeIdea.targetAudience}</p>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};
