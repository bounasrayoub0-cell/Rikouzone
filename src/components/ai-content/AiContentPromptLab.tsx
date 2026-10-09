import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Copy, 
  Check, 
  HelpCircle, 
  TrendingUp, 
  AlertCircle,
  FileCheck2,
  CheckCircle2
} from 'lucide-react';
import { promptComparisonsList } from '../../data/aiContentData';

interface AiContentPromptLabProps {
  onCopyText: (text: string, label: string) => void;
}

export const AiContentPromptLab: React.FC<AiContentPromptLabProps> = ({ onCopyText }) => {
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeExample = promptComparisonsList[selectedExampleIndex] || promptComparisonsList[0];

  const handleCopy = (text: string, id: string, label: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              مختبر هندسة الأوامر: مقارنة حية (قبل وبعد)
            </h3>
            <p className="mt-0.5 text-xs sm:text-sm text-zinc-400">
              اكتشف الفرق العملي الحاسم بين برومبت ضعيف يعطيك نصوصاً سطحية ومبتذلة، وبرومبت احترافي يعطيك مخرجات جاهزة للبيع والنشر.
            </p>
          </div>
        </div>

        {/* Example Switcher Tabs */}
        <div className="mt-5 flex flex-wrap gap-2 pt-2 border-t border-zinc-800/80">
          {promptComparisonsList.map((example, idx) => (
            <button
              key={example.title}
              onClick={() => setSelectedExampleIndex(idx)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedExampleIndex === idx
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              <span>{example.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Goal Banner */}
      <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 flex items-start gap-3">
        <TrendingUp className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
            الهدف التسويقي للمهمة
          </span>
          <p className="mt-0.5 text-xs sm:text-sm text-zinc-300 font-medium">
            {activeExample.goal}
          </p>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Card: Weak Prompt */}
        <div className="rounded-2xl border border-red-500/30 bg-red-950/10 p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-red-500/20">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-400 border border-red-500/20">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>البرومبت الضعيف (العادي)</span>
              </span>
              <span className="text-[11px] text-zinc-500 font-medium">خطأ يقع فيه 90% من المبتدئين</span>
            </div>

            {/* Weak Prompt Box */}
            <div>
              <label className="text-xs font-bold text-zinc-400 block mb-1.5">نص الأمر المرسل للذكاء الاصطناعي:</label>
              <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-3 text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed">
                "{activeExample.weakPrompt}"
              </div>
            </div>

            {/* Weak Result Box */}
            <div>
              <label className="text-xs font-bold text-zinc-400 block mb-1.5">النتيجة الآلية الناتجة:</label>
              <div className="rounded-xl bg-zinc-950/90 border border-red-500/20 p-3 text-xs sm:text-sm text-zinc-400 leading-relaxed italic">
                "{activeExample.weakResult}"
              </div>
            </div>

            {/* Critique Box */}
            <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-3">
              <span className="text-xs font-bold text-red-400 block mb-1 flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>نقد المخرجات: لماذا تفشل تجارياً؟</span>
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeExample.weakCritique}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 text-center">
            <span className="text-xs text-red-400/80 font-bold">❌ لا يمكن تسليم هذا النص لأي عميل أو استخدامه في إعلان</span>
          </div>
        </div>

        {/* Right Card: Pro Prompt */}
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/15 p-5 flex flex-col justify-between shadow-xl shadow-emerald-500/5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                <FileCheck2 className="h-3.5 w-3.5" />
                <span>البرومبت الاحترافي (معادلة RikouZone)</span>
              </span>
              <button
                onClick={() => handleCopy(activeExample.proPrompt, `pro-${selectedExampleIndex}`, 'تم نسخ البرومبت الاحترافي')}
                className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer"
              >
                {copiedId === `pro-${selectedExampleIndex}` ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>نسخ البرومبت</span>
                  </>
                )}
              </button>
            </div>

            {/* Pro Prompt Box */}
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1.5">الأمر الهندسي الموجه للنموذج:</label>
              <div className="rounded-xl bg-zinc-900/90 border border-emerald-500/30 p-3 text-xs text-zinc-200 font-mono leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
                {activeExample.proPrompt}
              </div>
            </div>

            {/* Pro Result Box */}
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1.5">طبيعة المخرجات الناتجة:</label>
              <div className="rounded-xl bg-zinc-950/90 border border-emerald-500/20 p-3 text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
                {activeExample.proResult}
              </div>
            </div>

            {/* Pro Advantages List */}
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3">
              <span className="text-xs font-bold text-emerald-400 block mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>عوامل القوة والاحترافية المضمنة في البرومبت:</span>
              </span>
              <ul className="space-y-1 text-xs text-zinc-300">
                {activeExample.proAdvantages.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-500/20 text-center">
            <span className="text-xs text-emerald-400 font-bold">✅ أصل تجاري متكامل يحقق نتائج فورية ومبيعات للعميل</span>
          </div>
        </div>
      </div>
    </div>
  );
};
