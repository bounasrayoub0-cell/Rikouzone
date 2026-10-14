import React, { useState, useMemo } from 'react';
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Sliders, 
  ArrowRight, 
  BookOpen, 
  Search,
  Filter,
  Check,
  ChevronDown
} from 'lucide-react';
import { prebuiltCourseIdeas, CourseIdeaValidationItem } from '../../data/onlineCoursesData';

export const CourseIdeaValidator: React.FC = () => {
  // Custom Evaluator State
  const [ideaTitle, setIdeaTitle] = useState<string>('دورة بناء تطبيقات Flutter بالذكاء الاصطناعي');
  const [ideaCategory, setIdeaCategory] = useState<string>('برمجة وتكنولوجيا');
  const [ideaAudience, setIdeaAudience] = useState<string>('المبتدئون الذين يرغبون في بناء ونشر أول تطبيق جوال في متجر التطبيقات');
  const [painSeverity, setPainSeverity] = useState<number>(9);
  const [willingnessToPay, setWillingnessToPay] = useState<number>(8);
  const [instructorProof, setInstructorProof] = useState<number>(8);
  const [differentiation, setDifferentiation] = useState<number>(8);
  const [outcomeClarity, setOutcomeClarity] = useState<number>(9);

  // Search & Filter for prebuilt ideas
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVerdictFilter, setSelectedVerdictFilter] = useState<string>('all');
  const [selectedIdeaDetail, setSelectedIdeaDetail] = useState<CourseIdeaValidationItem | null>(null);

  // Dynamic Score Calculation
  const evaluation = useMemo(() => {
    // Weighted formula: Severity (25%), Pay (25%), Proof (20%), Differentiation (15%), Outcome (15%)
    const rawScore = (painSeverity * 2.5) + (willingnessToPay * 2.5) + (instructorProof * 2.0) + (differentiation * 1.5) + (outcomeClarity * 1.5);
    const score = Math.round(rawScore);

    let verdict: 'green' | 'amber' | 'red' = 'amber';
    let verdictText = '';
    let recommendation = '';
    let pricingModel = '';

    if (score >= 80) {
      verdict = 'green';
      verdictText = 'فكرة استثنائية وجاهزة للإطلاق والبيع المسبق 🚀';
      recommendation = 'الفكرة تمتلك ألماً حارقاً واستعداداً حقيقياً للدفع. لا تضيع الوقت: أطلق ورشة مصغرة أو بيعاً مسبقاً (Pre-order) لـ 10 طلاب هذا الأسبوع قبل تسجيل المنهج كاملاً.';
      pricingModel = 'دورة رئيسية متكاملة ($149 - $297) أو معسكر تطبيقي';
    } else if (score >= 65) {
      verdict = 'amber';
      verdictText = 'فكرة واعدة لكن تحتاج تضييق الاستهداف وتحديد النتيجة ⚡';
      recommendation = 'الموضوع جيد ولكن قد يعاني من عمومية الاستهداف أو ضعف إثبات النتيجة. ضيّق الفئة المستهدفة لنيتش أكثر تخصصاً، وأرفق قوالب عملية تزيد القيمة المدركة.';
      pricingModel = 'دورة مصغرة رخيصة ($27 - $49) لكسر التردد واختبار الطلب';
    } else {
      verdict = 'red';
      verdictText = 'فكرة عالية المخاطر أو مكررة تفتقر للدافع المالي ⚠️';
      recommendation = 'الموضوع إما متوفر بكثرة مجاناً دون تميز، أو أن الجمهور المستهدف لا يملك الرغبة في الاستثمار المالي. أعد صياغة الفكرة لترتبط بنتيجة مادية أو توفير وقت ملموس، أو قدمها كبودكاست/محتوى مجاني.';
      pricingModel = 'محتوى مجاني لجلب المتابعين (Lead Magnet) فقط';
    }

    return {
      score,
      verdict,
      verdictText,
      recommendation,
      pricingModel
    };
  }, [painSeverity, willingnessToPay, instructorProof, differentiation, outcomeClarity]);

  // Load a prebuilt idea into the custom evaluator
  const loadIdeaIntoEvaluator = (item: CourseIdeaValidationItem) => {
    setIdeaTitle(item.name);
    setIdeaCategory(item.category);
    setIdeaAudience(item.targetAudience);
    setPainSeverity(item.painSeverityScore);
    setWillingnessToPay(item.willingnessToPayScore);
    setInstructorProof(item.instructorProofScore);
    setDifferentiation(item.marketDifferentiationScore);
    setOutcomeClarity(item.outcomeClarityScore);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Filtered prebuilt ideas
  const filteredIdeas = useMemo(() => {
    return prebuiltCourseIdeas.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchFilter = selectedVerdictFilter === 'all' || item.verdict === selectedVerdictFilter;
      return matchSearch && matchFilter;
    });
  }, [searchQuery, selectedVerdictFilter]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-zinc-900 to-zinc-900/90 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
            <Target className="h-3.5 w-3.5" />
            <span>فاحص ومقيم أفكار الدورات</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            مقيّم فكرة الدورة والتحقق من صلاحيتها للسوق (Idea Scorer)
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
            افحص فكرتك عبر 5 معايير واقعية تضمن وجود شهية شراء وتفصل بين الدورات المربحة والأفكار التي تفشل بعد التسجيل.
          </p>
        </div>
      </div>

      {/* Interactive Custom Evaluator (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
            <h4 className="text-sm font-bold text-zinc-200 flex items-center gap-2 pb-3 border-b border-zinc-800">
              <Sliders className="h-4 w-4 text-emerald-400" />
              <span>بيانات الفكرة الأساسية</span>
            </h4>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">عنوان أو موضوع الدورة المقترحة</label>
              <input
                type="text"
                value={ideaTitle}
                onChange={(e) => setIdeaTitle(e.target.value)}
                placeholder="مثال: دورة أتمتة التسويق بالذكاء الاصطناعي للمتاجر"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">المجال / التصنيف</label>
                <input
                  type="text"
                  value={ideaCategory}
                  onChange={(e) => setIdeaCategory(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">الجمهور المستهدف بالتحديد</label>
                <input
                  type="text"
                  value={ideaAudience}
                  onChange={(e) => setIdeaAudience(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 5 Validation Criteria Sliders */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-5">
            <h4 className="text-sm font-bold text-zinc-200 flex items-center gap-2 pb-3 border-b border-zinc-800">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>معايير التقييم الخمسة (من 1 إلى 10)</span>
            </h4>

            {/* Criteria 1 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-200 font-bold">1. شدة الألم والمشكلة (Problem Severity)</span>
                  <p className="text-[11px] text-zinc-400">هل المشكلة تؤرق العميل وتكلفه مالاً أو وقتاً ضائعاً كل يوم؟</p>
                </div>
                <span className="text-amber-400 font-mono font-bold text-sm">{painSeverity} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={painSeverity}
                onChange={(e) => setPainSeverity(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Criteria 2 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-200 font-bold">2. استعداد الجمهور للدفع (Willingness to Pay)</span>
                  <p className="text-[11px] text-zinc-400">هل يملك العميل ميزانية وبطاقة دفع إلكترونية مستعدة للاستثمار؟</p>
                </div>
                <span className="text-emerald-400 font-mono font-bold text-sm">{willingnessToPay} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={willingnessToPay}
                onChange={(e) => setWillingnessToPay(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Criteria 3 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-200 font-bold">3. خبرتك وقدرتك على الإثبات (Proof & Credibility)</span>
                  <p className="text-[11px] text-zinc-400">هل حققت نتائج عملية قابلة للعرض ومشاركة نماذج حيّة لنجاحك؟</p>
                </div>
                <span className="text-blue-400 font-mono font-bold text-sm">{instructorProof} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={instructorProof}
                onChange={(e) => setInstructorProof(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Criteria 4 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-200 font-bold">4. زاوية التميز عن المنافسين (Differentiation Edge)</span>
                  <p className="text-[11px] text-zinc-400">هل تقدم زاوية فريدة (أحدث، أسرع، بقوالب حصرية) تبرز دورتك؟</p>
                </div>
                <span className="text-purple-400 font-mono font-bold text-sm">{differentiation} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={differentiation}
                onChange={(e) => setDifferentiation(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* Criteria 5 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-200 font-bold">5. وضوح نتيجة التحول الملموسة (Outcome Clarity)</span>
                  <p className="text-[11px] text-zinc-400">هل النتيجة محددة وقابلة للقياس بعد التخرج (مثل: إطلاق متجر، خسارة 5 كغ)؟</p>
                </div>
                <span className="text-rose-400 font-mono font-bold text-sm">{outcomeClarity} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={outcomeClarity}
                onChange={(e) => setOutcomeClarity(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>
          </div>
        </div>

        {/* Right Output Score Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className={`rounded-2xl border p-6 shadow-2xl relative overflow-hidden ${
            evaluation.verdict === 'green' 
              ? 'border-emerald-500/40 bg-gradient-to-b from-zinc-900 to-emerald-950/30' 
              : evaluation.verdict === 'amber'
              ? 'border-amber-500/40 bg-gradient-to-b from-zinc-900 to-amber-950/30'
              : 'border-rose-500/40 bg-gradient-to-b from-zinc-900 to-rose-950/30'
          }`}>
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>درجة الصلاحية والجاهزية للسوق</span>
              <span className="font-mono text-zinc-500">من 100</span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className={`text-5xl font-black font-mono ${
                evaluation.verdict === 'green' 
                  ? 'text-emerald-400' 
                  : evaluation.verdict === 'amber'
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}>
                {evaluation.score}
              </span>
              <span className="text-sm font-bold text-zinc-400">/ 100</span>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800/80">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                evaluation.verdict === 'green'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : evaluation.verdict === 'amber'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {evaluation.verdictText}
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div>
                  <span className="text-zinc-400 block text-[11px] font-bold">النموذج السعري الموصى به:</span>
                  <p className="text-zinc-200 font-semibold mt-0.5">{evaluation.pricingModel}</p>
                </div>

                <div>
                  <span className="text-zinc-400 block text-[11px] font-bold">الخطوة الإجرائية الفورية:</span>
                  <p className="text-zinc-300 leading-relaxed mt-0.5">{evaluation.recommendation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Golden Rules Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
            <h5 className="text-xs font-bold text-zinc-300 flex items-center gap-2">
              <Info className="h-4 w-4 text-amber-400" />
              <span>القواعد الذهبية قبل فتح كاميرا التسجيل</span>
            </h5>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-start gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>لا تسجل دورتك كاملة قبل أن يشتريها 5 إلى 10 أشخاص مسبقاً.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>الناس لا تدفع للمعلومات العامة؛ بل تدفع للنتيجة وتوفير وقتها.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>وجود منافسين في السوق مؤشر نجاح وطلب وليس عائقاً.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pre-seeded Market Ideas Explorer */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-400" />
              <span>أفكار دورات واقعية تم تقييمها ودراستها في السوق (8 نماذج)</span>
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              تصفح هذه الأمثلة لفهم لماذا تنجح بعض الأفكار وتسقط أخرى، واضغط على أي فكرة لاختبارها وتعديلها في المقيم أعلاه.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="h-3.5 w-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="بحث في الأفكار..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-xl border border-zinc-700 bg-zinc-800/80 pr-8 pl-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none w-44"
              />
            </div>

            <select
              value={selectedVerdictFilter}
              onChange={(e) => setSelectedVerdictFilter(e.target.value)}
              className="rounded-xl border border-zinc-700 bg-zinc-800/80 px-2.5 py-1.5 text-xs text-zinc-300 focus:border-emerald-500 focus:outline-none"
            >
              <option value="all">جميع الحالات</option>
              <option value="جاهزة للإطلاق والتسجيل">جاهزة للإطلاق</option>
              <option value="تحتاج تدقيق وتضييق النطاق">تحتاج تدقيق</option>
              <option value="عالية المخاطر أو مكررة">عالية المخاطر</option>
            </select>
          </div>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredIdeas.map((idea) => {
            const isGreen = idea.totalScore >= 80;
            const isAmber = idea.totalScore >= 65 && idea.totalScore < 80;

            return (
              <div
                key={idea.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 hover:border-zinc-700 transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400">
                        {idea.category}
                      </span>
                      <h5 className="text-sm font-bold text-white mt-1.5 leading-snug">
                        {idea.name}
                      </h5>
                    </div>

                    <div className="shrink-0 text-left">
                      <span className={`text-base font-black font-mono px-2.5 py-1 rounded-lg ${
                        isGreen ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isAmber ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {idea.totalScore}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    <strong className="text-zinc-300">الجمهور:</strong> {idea.targetAudience}
                  </p>

                  <div className="mt-3 pt-3 border-t border-zinc-800/80 text-xs space-y-1 text-zinc-400">
                    <div className="flex items-center justify-between text-[11px]">
                      <span>النموذج الموصى به:</span>
                      <span className="font-semibold text-zinc-200">{idea.recommendedModel}</span>
                    </div>
                    <p className="text-[11px] text-zinc-300 leading-normal pt-1">
                      💡 {idea.recommendedAction}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => loadIdeaIntoEvaluator(idea)}
                    className="w-full py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 text-zinc-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>تحميل واختبار هذه الفكرة في المقيم أعلاه</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
