import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CalculatorTool, CalculatorResult } from '../../types';
import { calculators, contentUtilityTools } from '../../data/tools';
import { 
  Calculator, 
  RotateCcw, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  Lightbulb, 
  Zap, 
  Hash, 
  Calendar,
  CheckCircle2,
  Copy,
  Info
} from 'lucide-react';

interface ToolsViewProps {
  onCopyText: (text: string, label: string) => void;
  onNavigateToAI?: (toolId: string) => void;
}

export const ToolsView: React.FC<ToolsViewProps> = ({ onCopyText, onNavigateToAI }) => {
  const { language, isRTL } = useLanguage();

  const [activeTab, setActiveTab] = useState<'calculators' | 'utilities'>('calculators');
  const [selectedCalcId, setSelectedCalcId] = useState<string>(calculators[0].id);

  // Dynamic state store for active calculator inputs
  const currentCalc = calculators.find((c) => c.id === selectedCalcId) || calculators[0];

  const [inputValues, setInputValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    currentCalc.inputs.forEach((inp) => {
      initial[inp.id] = inp.defaultValue;
    });
    return initial;
  });

  // When switching calculators, reload default values
  const handleSelectCalculator = (calc: CalculatorTool) => {
    setSelectedCalcId(calc.id);
    const resetVals: Record<string, number> = {};
    calc.inputs.forEach((inp) => {
      resetVals[inp.id] = inp.defaultValue;
    });
    setInputValues(resetVals);
  };

  const handleInputChange = (inputId: string, val: number) => {
    setInputValues((prev) => ({
      ...prev,
      [inputId]: isNaN(val) ? 0 : val
    }));
  };

  const handleResetInputs = () => {
    const resetVals: Record<string, number> = {};
    currentCalc.inputs.forEach((inp) => {
      resetVals[inp.id] = inp.defaultValue;
    });
    setInputValues(resetVals);
  };

  // Perform real-time calculation
  const results: CalculatorResult[] = currentCalc.calculate(inputValues);

  // Quick Utility interactive state
  const [utilityTopic, setUtilityTopic] = useState('');
  const [utilityOutput, setUtilityOutput] = useState('');

  const handleRunQuickUtility = (toolId: string) => {
    const topic = utilityTopic.trim() || (isRTL ? 'صناعة المحتوى وفري فاير' : 'Content Creation');
    if (toolId === 'hook-generator') {
      setUtilityOutput(isRTL
        ? `⚡ 3 خطافات فيروسية لموضوع (${topic}):\n\n1. "توقف عن فعل هذا الشيء في ${topic} قبل فوات الأوان!"\n2. "90% يرتكبون هذا الخطأ في ${topic} ويفقدون حساباتهم!"\n3. "السر الذي يخفيه عنك المحترفون في ${topic}..."`
        : `⚡ 3 High-Retention Hooks for (${topic}):\n\n1. "Stop making this huge mistake with ${topic}!"\n2. "90% of creators do ${topic} completely backwards."\n3. "The secret algorithm hack for ${topic} nobody tells you."`
      );
    } else if (toolId === 'hashtag-generator') {
      setUtilityOutput(`#${topic.replace(/\s+/g, '_')} #RikouZone #صناع_المحتوى #اكسبلور #ترند #شورتس #فري_فاير #تيك_توك #ريلز #الربح_من_الإنترنت`);
    } else if (toolId === 'title-generator') {
      setUtilityOutput(isRTL
        ? `🔥 عناوين يوتيوب مقترحة:\n1. كيف وصلت إلى القمة في ${topic}؟ (الدليل الكامل)\n2. جربت ${topic} لمدة 7 أيام متواصلة والنتيجة صادمة!\n3. الحقيقة المرة التي لا يخبرك بها أحد عن ${topic}`
        : `🔥 YouTube Titles:\n1. How I Mastered ${topic} in 14 Days (Step-by-Step)\n2. I Tested ${topic} for 7 Days Straight!\n3. The Truth About ${topic} Nobody Wants to Admit`
      );
    } else {
      setUtilityOutput(isRTL
        ? `💡 فكرة محتوى مقترحة لـ (${topic}):\n\nفيديو مقارنة سريع بين طريقتين للبدء، مع عرض تجربة شخصية وإظهار الشاشة لمدة 45 ثانية.`
        : `💡 Suggested Content Angle for (${topic}):\n\nA 45-second fast comparison between the old method vs. the modern AI leverage workflow.`
      );
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3.5 py-1 text-xs font-bold text-yellow-400">
          <Calculator className="h-4 w-4" />
          <span>{isRTL ? '17 حاسبة رقمية وأدوات محتوى فورية' : '17 Calculators & Creator Utilities'}</span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-black text-white">
          {isRTL ? 'حاسبات الأرباح ومقاييس النمو' : 'Creator Earnings & Analytics Engine'}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
          {isRTL
            ? 'احسب أرباح يوتيوب وتيك توك، وعمولات الأفيلييت، ونسبة النقر CTR، ومعدل التفاعل، والتكلفة الإعلانية بدقة رياضية فورية.'
            : 'Precision metrics for YouTube AdSense, TikTok rewards, conversion rates, ROAS, CPM, and follower growth projections.'}
        </p>
      </div>

      {/* Main Mode Toggle: Calculators vs Content Utilities */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-2xl border border-zinc-800 bg-zinc-900/90 p-1.5 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('calculators')}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'calculators'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Calculator className="h-4 w-4" />
            <span>{isRTL ? 'حاسبات الأرباح (17 حاسبة)' : 'Monetization Calculators (17)'}</span>
          </button>
          <button
            onClick={() => setActiveTab('utilities')}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'utilities'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>{isRTL ? 'أدوات المحتوى الفورية (5 أدوات)' : 'Instant Content Utilities'}</span>
          </button>
        </div>
      </div>

      {activeTab === 'calculators' ? (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Calculator Selector List */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-1 mb-3">
              {isRTL ? 'اختر الحاسبة المطلوبة:' : 'Select Calculator:'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 max-h-[600px] overflow-y-auto pr-1">
              {calculators.map((calc) => {
                const isSelected = calc.id === selectedCalcId;
                const title = language === 'ar' ? calc.arabicTitle : language === 'fr' ? calc.frenchTitle : calc.title;

                return (
                  <button
                    key={calc.id}
                    id={`calc-select-${calc.id}`}
                    onClick={() => handleSelectCalculator(calc)}
                    className={`flex items-start text-start gap-3 rounded-2xl p-3.5 transition-all border ${
                      isSelected
                        ? 'border-amber-500/60 bg-amber-500/10 text-white shadow-md shadow-amber-500/5'
                        : 'border-zinc-800/80 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${
                      isSelected ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      <Calculator className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs sm:text-sm font-bold line-clamp-1 ${isSelected ? 'text-amber-300' : 'text-zinc-200'}`}>
                        {title}
                      </div>
                      <div className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                        {isRTL ? calc.arabicDescription : calc.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Interactive Calculator Canvas */}
          <div className="lg:col-span-8 rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl">
            
            {/* Top Details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
              <div>
                <span className="rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-400 border border-amber-500/20 uppercase">
                  {currentCalc.category}
                </span>
                <h2 className="mt-2 text-xl sm:text-2xl font-black text-white">
                  {language === 'ar' ? currentCalc.arabicTitle : language === 'fr' ? currentCalc.frenchTitle : currentCalc.title}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                  {language === 'ar' ? currentCalc.arabicDescription : language === 'fr' ? currentCalc.frenchDescription : currentCalc.description}
                </p>
              </div>

              <button
                onClick={handleResetInputs}
                className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                title={isRTL ? 'إعادة تعيين القيم' : 'Reset Inputs'}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{isRTL ? 'إعادة ضبط' : 'Reset'}</span>
              </button>
            </div>

            {/* Inputs Form Section */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {currentCalc.inputs.map((input) => {
                const currentVal = inputValues[input.id] ?? input.defaultValue;
                const label = language === 'ar' ? input.arabicLabel : language === 'fr' ? input.frenchLabel : input.label;

                return (
                  <div key={input.id} className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-zinc-300">
                        {label}
                      </label>
                      {input.suffix && (
                        <span className="text-[10px] font-bold text-amber-400/80">
                          {input.suffix}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        min={input.min}
                        max={input.max}
                        step={input.step || 1}
                        value={currentVal}
                        onChange={(e) => handleInputChange(input.id, parseFloat(e.target.value))}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 px-3 text-sm font-bold text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    {/* Numeric Range Slider for Quick Touch Adjustment */}
                    {input.max && (
                      <input
                        type="range"
                        min={input.min || 0}
                        max={input.max}
                        step={input.step || 1}
                        value={currentVal}
                        onChange={(e) => handleInputChange(input.id, parseFloat(e.target.value))}
                        className="mt-3 w-full accent-amber-500 cursor-pointer"
                      />
                    )}

                    {input.arabicHelperText && isRTL && (
                      <div className="mt-2 text-[11px] text-zinc-500 leading-tight">
                        {input.arabicHelperText}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Results Display Area */}
            <div className="mt-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-zinc-950 to-zinc-950 p-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
                <TrendingUp className="h-4 w-4" />
                <span>{isRTL ? 'النتائج المحسوبة بدقة رياضية:' : 'Calculated Metrics:'}</span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((res, idx) => {
                  const resLabel = language === 'ar' ? res.arabicLabel : language === 'fr' ? res.frenchLabel : res.label;

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl p-4 border transition-all ${
                        res.highlight
                          ? 'border-amber-500/50 bg-amber-500/15 shadow-lg shadow-amber-500/10'
                          : 'border-zinc-800/80 bg-zinc-900/50'
                      }`}
                    >
                      <div className="text-xs font-semibold text-zinc-400">
                        {resLabel}
                      </div>
                      <div className={`mt-2 text-2xl sm:text-3xl font-black ${
                        res.highlight ? 'text-amber-300' : 'text-white'
                      }`}>
                        {res.value}
                      </div>
                      {res.arabicDescription && isRTL && (
                        <div className="mt-1.5 text-[11px] text-zinc-400">
                          {res.arabicDescription}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {isRTL ? 'حساب فوري وتلقائي عند تحريك الأرقام' : 'Calculated instantly in real-time'}
                </span>
                <button
                  onClick={() => onCopyText(results.map(r => `${r.label}: ${r.value}`).join(' | '), isRTL ? 'تم نسخ النتائج!' : 'Results copied!')}
                  className="flex items-center gap-1 text-amber-400 hover:underline font-bold"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{isRTL ? 'نسخ النتائج' : 'Copy Results'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* Content Utilities Interactive Sandbox */
        <div className="mt-10 max-w-4xl mx-auto space-y-6">
          
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white">
              {isRTL ? 'أدوات المحتوى الفورية التفاعلية' : 'Instant Content Generation Utilities'}
            </h3>
            <p className="mt-1 text-sm text-zinc-400">
              {isRTL
                ? 'أدخل موضوعك أو مجالك واضغط على الأداة لتوليد خطافات، عناوين، أو هاشتاقات فورياً.'
                : 'Type your topic to quickly generate hooks, YouTube titles, and hashtags.'}
            </p>

            <div className="mt-5">
              <label className="text-xs font-bold text-zinc-300">
                {isRTL ? 'الموضوع أو المجال المراد العمل عليه:' : 'Your Topic / Niche:'}
              </label>
              <input
                type="text"
                value={utilityTopic}
                onChange={(e) => setUtilityTopic(e.target.value)}
                placeholder={isRTL ? 'مثال: فري فاير، مونتاج الهاتف، الربح من الدروب شيبينغ...' : 'e.g. Free Fire tips, Mobile editing, E-commerce'}
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Tool buttons */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => handleRunQuickUtility('hook-generator')}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 px-3 text-xs font-bold text-black hover:scale-102 transition-all"
              >
                <Zap className="h-4 w-4" />
                <span>{isRTL ? 'توليد هوك (Hooks)' : 'Generate Hooks'}</span>
              </button>

              <button
                onClick={() => handleRunQuickUtility('title-generator')}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 py-3 px-3 text-xs font-bold text-zinc-200 hover:border-amber-500 hover:text-white transition-all"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>{isRTL ? 'عناوين يوتيوب' : 'YouTube Titles'}</span>
              </button>

              <button
                onClick={() => handleRunQuickUtility('hashtag-generator')}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 py-3 px-3 text-xs font-bold text-zinc-200 hover:border-amber-500 hover:text-white transition-all"
              >
                <Hash className="h-4 w-4 text-orange-400" />
                <span>{isRTL ? 'هاشتاقات ذكية' : 'Hashtags'}</span>
              </button>

              <button
                onClick={() => handleRunQuickUtility('content-ideas-generator')}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 py-3 px-3 text-xs font-bold text-zinc-200 hover:border-amber-500 hover:text-white transition-all"
              >
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                <span>{isRTL ? 'فكرة محتوى سريعة' : 'Quick Idea'}</span>
              </button>
            </div>

            {/* Output Canvas */}
            {utilityOutput && (
              <div className="mt-6 rounded-2xl border border-amber-500/30 bg-zinc-950 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {isRTL ? 'النتيجة المولدة:' : 'Generated Output:'}
                  </span>
                  <button
                    onClick={() => onCopyText(utilityOutput, isRTL ? 'تم نسخ المحتوى!' : 'Copied!')}
                    className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>{isRTL ? 'نسخ النص' : 'Copy Text'}</span>
                  </button>
                </div>
                <pre className="mt-3 text-xs sm:text-sm text-zinc-200 whitespace-pre-wrap font-sans leading-relaxed">
                  {utilityOutput}
                </pre>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
