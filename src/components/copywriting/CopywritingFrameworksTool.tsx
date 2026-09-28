import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  HelpCircle, 
  Layers, 
  Zap, 
  Send,
  FileText
} from 'lucide-react';
import { copywritingFrameworksList } from '../../data/copywritingToolsData';

interface CopywritingFrameworksToolProps {
  onCopyText?: (text: string) => void;
}

export const CopywritingFrameworksTool: React.FC<CopywritingFrameworksToolProps> = ({ onCopyText }) => {
  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string>('pas');
  const [copied, setCopied] = useState<boolean>(false);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});

  const activeFramework = copywritingFrameworksList.find(f => f.id === selectedFrameworkId) || copywritingFrameworksList[0];

  const handleInputChange = (stepLetter: string, val: string) => {
    setUserInputs(prev => ({
      ...prev,
      [`${selectedFrameworkId}_${stepLetter}`]: val
    }));
  };

  const handleLoadSample = () => {
    const newInputs: Record<string, string> = { ...userInputs };
    activeFramework.steps.forEach(step => {
      newInputs[`${selectedFrameworkId}_${step.letter}`] = step.sampleText;
    });
    setUserInputs(newInputs);
  };

  const handleClear = () => {
    const newInputs: Record<string, string> = { ...userInputs };
    activeFramework.steps.forEach(step => {
      delete newInputs[`${selectedFrameworkId}_${step.letter}`];
    });
    setUserInputs(newInputs);
  };

  // Compile final copy
  const compiledCopy = activeFramework.steps
    .map(step => {
      const val = userInputs[`${selectedFrameworkId}_${step.letter}`] || step.sampleText;
      return `[${step.arabicTerm} - ${step.term}]:\n${val}`;
    })
    .join('\n\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledCopy);
    setCopied(true);
    if (onCopyText) onCopyText('تم نسخ النص الإعلاني المجمع بنجاح!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-950 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
              <Zap className="h-3.5 w-3.5" />
              <span>مختبر الأطر الإعلانية التفاعلي</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              مولد ومختبر نصوص الإقناع (Copywriting Frameworks)
            </h2>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              اختر الإطار الأنسب لحملتك (PAS, AIDA, BAB, FAB, 4Ps)، املأ المراحل خطوة بخطوة أو استعن بالنماذج الجاهزة، وولد نصاً إعلانياً جاهزاً للاختبار والإطلاق.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleLoadSample}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/40 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>ملء بمثال تطبيقي واقعي</span>
            </button>
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>تفريغ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Framework Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {copywritingFrameworksList.map(fw => {
          const isSelected = fw.id === selectedFrameworkId;
          return (
            <div
              key={fw.id}
              onClick={() => setSelectedFrameworkId(fw.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedFrameworkId(fw.id);
                }
              }}
              role="button"
              tabIndex={0}
              className={`p-4 rounded-2xl border text-right transition-all cursor-pointer select-none ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                  : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700 text-zinc-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-black font-mono ${isSelected ? 'text-amber-400' : 'text-zinc-500'}`}>
                  {fw.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">{fw.steps.length} مراحل</span>
              </div>
              <div className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                {fw.arabicName.split('(')[0]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Workspace: Inputs on Left, Compiled Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Step-by-Step Inputs */}
        <div className="lg:col-span-7 space-y-5">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Layers className="h-4 w-4" />
              <span>الاستخدام الأمثل لهذا الإطار:</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {activeFramework.bestFor}
            </p>
            <p className="text-xs text-zinc-400 border-t border-zinc-900 pt-2">
              {activeFramework.description}
            </p>
          </div>

          <div className="space-y-4">
            {activeFramework.steps.map((step, idx) => {
              const currentVal = userInputs[`${selectedFrameworkId}_${step.letter}`] ?? '';
              return (
                <div 
                  key={step.letter}
                  className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 sm:p-5 space-y-3 focus-within:border-amber-500/60 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 font-mono font-black flex items-center justify-center text-xs border border-amber-500/40">
                        {step.letter}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {step.arabicTerm} <span className="text-xs font-mono text-zinc-500">({step.term})</span>
                        </h4>
                        <p className="text-[11px] text-zinc-400">{step.guideline}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleInputChange(step.letter, step.sampleText)}
                      className="text-[11px] text-amber-400 hover:text-amber-300 font-bold shrink-0 cursor-pointer"
                    >
                      استخدام المثال
                    </button>
                  </div>

                  <textarea
                    rows={3}
                    value={currentVal}
                    onChange={(e) => handleInputChange(step.letter, e.target.value)}
                    placeholder={step.placeholder}
                    className="w-full rounded-xl bg-zinc-950/80 border border-zinc-800 p-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all leading-relaxed"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Compiled Live Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-28 rounded-3xl border border-zinc-800 bg-zinc-950/90 p-5 sm:p-6 backdrop-blur-xl space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-bold text-white">النص الإعلاني المتكامل</span>
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-black hover:bg-amber-400 transition-all cursor-pointer shadow-md shadow-amber-500/20 active:scale-95"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
              </button>
            </div>

            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 max-h-[500px] overflow-y-auto space-y-3 font-sans text-xs text-zinc-200 leading-relaxed whitespace-pre-line selection:bg-amber-500 selection:text-black">
              {compiledCopy}
            </div>

            <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-3 space-y-1.5 text-[11px] text-zinc-400">
              <div className="font-bold text-zinc-300 flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
                <span>نصيحة إطلاق الحملة:</span>
              </div>
              <p>
                جرب إنشاء نسختين (Variant A و Variant B) بتغيير السطر الأول (الهوك) فقط لمعرفة أي زاوية تثير نقرات أكثر بأقل تكلفة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
