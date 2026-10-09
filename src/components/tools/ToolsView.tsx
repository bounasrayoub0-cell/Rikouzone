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
  const { t, language, isRTL, localize } = useLanguage();
  const isArabicFamily = language === 'ar' || language === 'ary';

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
    const defaultTopic = language === 'ary' ? 'صناعة المحتوى وفري فاير'
      : language === 'ar' ? 'صناعة المحتوى والتجارة الرقمية'
      : language === 'fr' ? 'Création de contenu'
      : language === 'es' ? 'Creación de contenido'
      : language === 'de' ? 'Content-Erstellung'
      : language === 'it' ? 'Creazione di contenuti'
      : language === 'pt' ? 'Criação de conteúdo'
      : language === 'zh' ? '内容创作'
      : 'Content Creation';
    const topic = utilityTopic.trim() || defaultTopic;
    if (toolId === 'hook-generator') {
      if (language === 'ary') {
        setUtilityOutput(`⚡ 3 هوكات فيروسية لموضوع (${topic}):\n\n1. "حبس ماديرش هاد الغلط فـ ${topic} قبل ما يفوت الفوت!"\n2. "90% ديال الناس كيديرو هاد الخطأ فـ ${topic} ومكيعرفوش علاش مكينجحوش!"\n3. "السر اللي مخبينو المحترفين فـ ${topic} وما كيقولوهش فابور..."`);
      } else if (language === 'ar') {
        setUtilityOutput(`⚡ 3 خطافات فيروسية لموضوع (${topic}):\n\n1. "توقف عن فعل هذا الشيء في ${topic} قبل فوات الأوان!"\n2. "90% يرتكبون هذا الخطأ في ${topic} ويفقدون حساباتهم!"\n3. "السر الذي يخفيه عنك المحترفون في ${topic}..."`);
      } else if (language === 'fr') {
        setUtilityOutput(`⚡ 3 Accroches virales pour (${topic}) :\n\n1. "Arrête de faire cette erreur dans ${topic} avant qu'il ne soit trop tard !"\n2. "90% des créateurs font ${topic} totalement à l'envers."\n3. "Le secret d'algorithme pour ${topic} dont personne ne parle."`);
      } else if (language === 'es') {
        setUtilityOutput(`⚡ 3 Ganchos virales para (${topic}):\n\n1. "¡Deja de cometer este error en ${topic} antes de que sea tarde!"\n2. "El 90% de los creadores hacen ${topic} al revés."\n3. "El truco del algoritmo para ${topic} que nadie te dice."`);
      } else if (language === 'de') {
        setUtilityOutput(`⚡ 3 Virale Hooks für (${topic}):\n\n1. "Hör auf, diesen Fehler bei ${topic} zu machen, bevor es zu spät ist!"\n2. "90% der Ersteller machen ${topic} völlig falsch."\n3. "Das Algorithmus-Geheimnis für ${topic}, über das niemand spricht."`);
      } else if (language === 'it') {
        setUtilityOutput(`⚡ 3 Hook virali per (${topic}):\n\n1. "Smettila di fare questo errore con ${topic} prima che sia tardi!"\n2. "Il 90% dei creator fa ${topic} in modo sbagliato."\n3. "Il segreto dell'algoritmo per ${topic} che nessuno ti dice."`);
      } else if (language === 'pt') {
        setUtilityOutput(`⚡ 3 Ganchos virais para (${topic}):\n\n1. "Pare de cometer esse erro em ${topic} antes que seja tarde!"\n2. "90% dos criadores fazem ${topic} do jeito errado."\n3. "O segredo do algoritmo para ${topic} que ninguém te conta."`);
      } else if (language === 'zh') {
        setUtilityOutput(`⚡ 关于 (${topic}) 的 3 个爆款黄金开头：\n\n1. "在做 ${topic} 时，千万不要再犯这个致命错误了！"\n2. "90% 的创作者做 ${topic} 的方向全错了！"\n3. "关于 ${topic} 的算法核心秘密，从没有人免费分享过..."`);
      } else {
        setUtilityOutput(`⚡ 3 High-Retention Hooks for (${topic}):\n\n1. "Stop making this huge mistake with ${topic}!"\n2. "90% of creators do ${topic} completely backwards."\n3. "The secret algorithm hack for ${topic} nobody tells you."`);
      }
    } else if (toolId === 'hashtag-generator') {
      const cleanTag = topic.replace(/\s+/g, '_');
      setUtilityOutput(`#${cleanTag} #RikouZone #Explore #Trend #Shorts #TikTok #Reels #OnlineIncome`);
    } else if (toolId === 'title-generator') {
      if (language === 'ary') {
        setUtilityOutput(`🔥 عناوين يوتيوب مقترحة لـ (${topic}):\n1. كيفاش وصلت للقمة فـ ${topic}؟ (الدليل العملي)\n2. جربت ${topic} لمدة 7 أيام متواصلة والنتيجة صدماتني!\n3. الحقيقة اللي مخبينها عليك فـ ${topic}`);
      } else if (language === 'ar') {
        setUtilityOutput(`🔥 عناوين يوتيوب مقترحة لـ (${topic}):\n1. كيف وصلت إلى القمة في ${topic}؟ (الدليل الكامل)\n2. جربت ${topic} لمدة 7 أيام متواصلة والنتيجة صادمة!\n3. الحقيقة المرة التي لا يخبرك بها أحد عن ${topic}`);
      } else if (language === 'fr') {
        setUtilityOutput(`🔥 Titres YouTube pour (${topic}) :\n1. Comment j'ai dominé ${topic} en 14 jours (Guide Complet)\n2. J'ai testé ${topic} pendant 7 jours et le résultat est choquant !\n3. La vérité sur ${topic} que personne ne t'avoue`);
      } else if (language === 'es') {
        setUtilityOutput(`🔥 Títulos de YouTube para (${topic}):\n1. Cómo dominé ${topic} en 14 días (Paso a paso)\n2. ¡Probé ${topic} durante 7 días y el resultado fue impactante!\n3. La verdad sobre ${topic} que nadie se atreve a decir`);
      } else if (language === 'de') {
        setUtilityOutput(`🔥 YouTube-Titelvorschläge für (${topic}):\n1. Wie ich ${topic} in 14 Tagen gemeistert habe (Schritt-für-Schritt)\n2. Ich habe ${topic} 7 Tage lang getestet - das Ergebnis schockiert!\n3. Die Wahrheit über ${topic}, die niemand zugibt`);
      } else if (language === 'it') {
        setUtilityOutput(`🔥 Titoli YouTube per (${topic}):\n1. Come ho padroneggiato ${topic} in 14 giorni (Guida completa)\n2. Ho provato ${topic} per 7 giorni e il risultato è scioccante!\n3. La verità su ${topic} che nessuno ti dice`);
      } else if (language === 'pt') {
        setUtilityOutput(`🔥 Títulos do YouTube para (${topic}):\n1. Como dominei ${topic} em 14 dias (Passo a passo)\n2. Testei ${topic} por 7 dias seguidos e o resultado chocou!\n3. A verdade sobre ${topic} que ninguém revela`);
      } else if (language === 'zh') {
        setUtilityOutput(`🔥 (${topic}) 爆款视频标题推荐：\n1. 我如何在 14 天内精通 ${topic}（保姆级实操指南）\n2. 亲测 ${topic} 连续 7 天，结果太惊人了！\n3. 关于 ${topic}，没人愿意透露的赚钱真相`);
      } else {
        setUtilityOutput(`🔥 YouTube Titles for (${topic}):\n1. How I Mastered ${topic} in 14 Days (Step-by-Step)\n2. I Tested ${topic} for 7 Days Straight!\n3. The Truth About ${topic} Nobody Wants to Admit`);
      }
    } else {
      if (language === 'ary') {
        setUtilityOutput(`💡 فكرة محتوى مقترحة لـ (${topic}):\n\nفيديو مقارنة سريع بين الطريقة القديمة والطريقة الجديدة باستعمال الذكاء الاصطناعي مدتو 45 ثانية لتيك توك أو ريلز مع شاشة مفتوحة.`);
      } else if (language === 'ar') {
        setUtilityOutput(`💡 فكرة محتوى مقترحة لـ (${topic}):\n\nفيديو مقارنة سريع بين طريقتين للبدء، مع عرض تجربة شخصية وإظهار الشاشة لمدة 45 ثانية.`);
      } else if (language === 'fr') {
        setUtilityOutput(`💡 Idée de contenu pour (${topic}) :\n\nUne vidéo comparative de 45 secondes entre l'ancienne méthode et le nouveau workflow IA, écran partagé pour TikTok ou Reels.`);
      } else if (language === 'es') {
        setUtilityOutput(`💡 Idea de contenido para (${topic}):\n\nUn video corto de 45 segundos comparando el método tradicional vs el flujo moderno con IA, mostrando pantalla para TikTok o Reels.`);
      } else if (language === 'de') {
        setUtilityOutput(`💡 Content-Idee für (${topic}):\n\nEin 45-Sekunden-Vergleichsvideo zwischen der alten Methode und dem neuen KI-Workflow mit geteiltem Bildschirm für TikTok oder Reels.`);
      } else if (language === 'it') {
        setUtilityOutput(`💡 Idea di contenuto per (${topic}):\n\nUn breve video comparativo di 45 secondi tra il vecchio metodo e il flusso AI moderno su schermo diviso per TikTok o Reel.`);
      } else if (language === 'pt') {
        setUtilityOutput(`💡 Ideia de conteúdo para (${topic}):\n\nUm vídeo comparativo de 45 segundos entre o método tradicional e o fluxo moderno de IA, tela dividida para TikTok ou Reels.`);
      } else if (language === 'zh') {
        setUtilityOutput(`💡 (${topic}) 爆款脚本创意：\n\n45秒快速对比视频：传统方法 vs 现代 AI 工作流，分屏展示实操过程，适合发布到 TikTok 或短视频平台。`);
      } else {
        setUtilityOutput(`💡 Suggested Content Angle for (${topic}):\n\nA 45-second fast comparison between the old method vs. the modern AI leverage workflow.`);
      }
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-bold text-blue-400">
          <Calculator className="h-4 w-4" />
          <span>{t.tools.calculatorsCount}</span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-black text-white">
          {t.tools.pageTitle}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
          {t.tools.pageSubtitle}
        </p>
      </div>

      {/* Main Mode Toggle: Calculators vs Content Utilities */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-2xl border border-zinc-800 bg-zinc-900/90 p-1.5 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('calculators')}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'calculators'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Calculator className="h-4 w-4" />
            <span>{t.tools.calculatorsTab}</span>
          </button>
          <button
            onClick={() => setActiveTab('utilities')}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'utilities'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>{t.tools.contentToolsTab}</span>
          </button>
        </div>
      </div>

      {activeTab === 'calculators' ? (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Calculator Selector List */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-1 mb-3">
              {t.tools.selectCalc}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 max-h-[600px] overflow-y-auto pr-1">
              {calculators.map((calc) => {
                const isSelected = calc.id === selectedCalcId;
                const title = localize(calc, 'title') || calc.title;
                const desc = localize(calc, 'description') || calc.description;

                return (
                  <button
                    key={calc.id}
                    id={`calc-select-${calc.id}`}
                    onClick={() => handleSelectCalculator(calc)}
                    className={`flex items-start text-start gap-3 rounded-2xl p-3.5 transition-all border ${
                      isSelected
                        ? 'border-blue-500/60 bg-blue-500/10 text-white shadow-md shadow-blue-500/5'
                        : 'border-zinc-800/80 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      <Calculator className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs sm:text-sm font-bold line-clamp-1 ${isSelected ? 'text-blue-300' : 'text-zinc-200'}`}>
                        {title}
                      </div>
                      <div className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                        {desc}
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
                <span className="rounded-lg bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400 border border-blue-500/20 uppercase">
                  {currentCalc.category}
                </span>
                <h2 className="mt-2 text-xl sm:text-2xl font-black text-white">
                  {localize(currentCalc, 'title') || currentCalc.title}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                  {localize(currentCalc, 'description') || currentCalc.description}
                </p>
              </div>

              <button
                onClick={handleResetInputs}
                className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-bold text-zinc-400 hover:text-white hover:border-blue-500 transition-all"
                title={t.tools.reset}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{t.tools.reset}</span>
              </button>
            </div>

            {/* Inputs Form Section */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {currentCalc.inputs.map((input) => {
                const currentVal = inputValues[input.id] ?? input.defaultValue;
                const label = localize(input, 'label') || input.label;

                return (
                  <div key={input.id} className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-zinc-300">
                        {label}
                      </label>
                      {input.suffix && (
                        <span className="text-[10px] font-bold text-blue-400/80">
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
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 px-3 text-sm font-bold text-white focus:border-blue-500 focus:outline-none"
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
                        className="mt-3 w-full accent-blue-500 cursor-pointer"
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
            <div className="mt-8 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-zinc-950 to-zinc-950 p-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-400">
                <TrendingUp className="h-4 w-4" />
                <span>{t.tools.resultTitle}</span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((res, idx) => {
                  const resLabel = localize(res, 'label') || res.label;

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl p-4 border transition-all ${
                        res.highlight
                          ? 'border-blue-500/50 bg-blue-500/15 shadow-lg shadow-blue-500/10'
                          : 'border-zinc-800/80 bg-zinc-900/50'
                      }`}
                    >
                      <div className="text-xs font-semibold text-zinc-400">
                        {resLabel}
                      </div>
                      <div className={`mt-2 text-2xl sm:text-3xl font-black ${
                        res.highlight ? 'text-blue-300' : 'text-white'
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
                  {t.tools.resultsEstimated}
                </span>
                <button
                  onClick={() => onCopyText(results.map(r => `${r.label}: ${r.value}`).join(' | '), t.toasts.copySuccess)}
                  className="flex items-center gap-1 text-blue-400 hover:underline font-bold"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{t.common.copy}</span>
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
              {t.tools.contentToolsTab}
            </h3>
            <p className="mt-1 text-sm text-zinc-400">
              {t.tools.pageSubtitle}
            </p>

            <div className="mt-5">
              <label className="text-xs font-bold text-zinc-300">
                {t.tools.inputsTitle}
              </label>
              <input
                type="text"
                value={utilityTopic}
                onChange={(e) => setUtilityTopic(e.target.value)}
                placeholder={t.tools.topicPlaceholder}
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Tool buttons */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => handleRunQuickUtility('hook-generator')}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-3 px-3 text-xs font-bold text-white hover:scale-102 transition-all shadow-md shadow-blue-500/20"
              >
                <Zap className="h-4 w-4" />
                <span>{t.tools.generateHooks}</span>
              </button>

              <button
                onClick={() => handleRunQuickUtility('title-generator')}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 py-3 px-3 text-xs font-bold text-zinc-200 hover:border-blue-500 hover:text-white transition-all"
              >
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span>{t.tools.youtubeTitles}</span>
              </button>

              <button
                onClick={() => handleRunQuickUtility('hashtag-generator')}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 py-3 px-3 text-xs font-bold text-zinc-200 hover:border-blue-500 hover:text-white transition-all"
              >
                <Hash className="h-4 w-4 text-blue-400" />
                <span>{t.tools.smartHashtags}</span>
              </button>

              <button
                onClick={() => handleRunQuickUtility('content-ideas-generator')}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 py-3 px-3 text-xs font-bold text-zinc-200 hover:border-blue-500 hover:text-white transition-all"
              >
                <Lightbulb className="h-4 w-4 text-blue-400" />
                <span>{t.tools.quickIdea}</span>
              </button>
            </div>

            {/* Output Canvas */}
            {utilityOutput && (
              <div className="mt-6 rounded-2xl border border-blue-500/30 bg-zinc-950 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    {t.tools.generatedOutput}
                  </span>
                  <button
                    onClick={() => onCopyText(utilityOutput, t.toasts.copySuccess)}
                    className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:underline"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>{t.tools.copyText}</span>
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
