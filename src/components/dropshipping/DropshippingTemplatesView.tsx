import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Video, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  Target, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Eye, 
  Layers, 
  FileText 
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  dropshippingVideoScripts, 
  dropshippingSupplierTemplates, 
  VideoScriptTemplate, 
  SupplierMessageTemplate 
} from '../../data/dropshippingData';

interface DropshippingTemplatesViewProps {
  onCopyText: (text: string, label: string) => void;
}

export const DropshippingTemplatesView: React.FC<DropshippingTemplatesViewProps> = ({
  onCopyText
}) => {
  const { isRTL } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'video' | 'supplier'>('video');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, label: string, id: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>أصول وقوالب جاهزة للتطبيق الفوري</span>
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-black text-white">
              قوالب سيناريوهات الفيديو ورسائل الموردين المعتمدة
            </h3>
            <p className="mt-1 text-sm text-zinc-400 max-w-2xl">
              قوالب فيديو مهيكلة وفق الخوارزميات لجذب الانتباه في أول 3 ثوانٍ، بالإضافة إلى صيغ مراسلة الموردين باللغة الإنجليزية للشحن الأعمى وطلب العينات.
            </p>
          </div>

          {/* Sub-tabs switch */}
          <div className="inline-flex p-1 rounded-xl bg-zinc-850 border border-zinc-800">
            <button
              onClick={() => setActiveSubTab('video')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                activeSubTab === 'video'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Video className="h-4 w-4" />
              <span>سيناريوهات الفيديو (Scripts)</span>
            </button>
            <button
              onClick={() => setActiveSubTab('supplier')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                activeSubTab === 'supplier'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>رسائل الموردين (Suppliers)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Section: Video Scripts */}
      {activeSubTab === 'video' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {dropshippingVideoScripts.map((script) => (
              <div 
                key={script.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-6 hover:border-zinc-700 transition"
              >
                {/* Header of script */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 text-[11px] font-black">
                        {script.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                        <Clock className="h-3 w-3 text-zinc-500" />
                        {script.durationSeconds}
                      </span>
                    </div>
                    <h4 className="mt-2 text-lg font-black text-white">{script.name}</h4>
                    <p className="mt-1 text-xs text-zinc-400">{script.objective}</p>
                  </div>

                  <button
                    onClick={() => {
                      const fullScriptText = `${script.name}\nالهدف: ${script.objective}\n\n` + 
                        script.structure.map(s => `[${s.part} - ${s.duration}]\nحركة الكاميرا البصرية: ${s.visualAction}\nالصوت والكلام (Voiceover): "${s.audioVoiceover}"\n`).join('\n') +
                        `\nلماذا ينجح: ${script.whyItWorks}`;
                      handleCopy(fullScriptText, script.name, script.id);
                    }}
                    className="inline-flex items-center gap-1.5 self-start sm:self-center rounded-xl border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition"
                  >
                    {copiedId === script.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">تم نسخ السيناريو!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-zinc-400" />
                        <span>نسخ السيناريو كاملاً</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Script Parts Breakdown */}
                <div className="space-y-4">
                  <h5 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    الهيكل الزمني والمشاهد (Timeline & Actions):
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {script.structure.map((item, idx) => (
                      <div 
                        key={idx}
                        className="rounded-xl border border-zinc-800 bg-zinc-850/60 p-4 space-y-3 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-black text-blue-400 border-b border-zinc-800 pb-2 mb-2">
                            <span>{item.part}</span>
                            <span className="text-[10px] text-zinc-500 font-mono">{item.duration}</span>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <div className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                                <Eye className="h-3 w-3 text-purple-400" />
                                <span>حركة الكاميرا البصرية:</span>
                              </div>
                              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                                {item.visualAction}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-zinc-800/60">
                              <div className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                                <FileText className="h-3 w-3 text-emerald-400" />
                                <span>الصوت / ما يقال (Voiceover):</span>
                              </div>
                              <p className="text-xs font-medium text-emerald-300 mt-1 bg-emerald-950/20 p-2 rounded-lg border border-emerald-500/20 leading-relaxed">
                                "{item.audioVoiceover}"
                              </p>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCopy(item.audioVoiceover, `${item.part} Voiceover`, `${script.id}-${idx}`)}
                          className="mt-2 text-[10px] text-zinc-400 hover:text-white flex items-center justify-end gap-1 self-end transition"
                        >
                          {copiedId === `${script.id}-${idx}` ? (
                            <span className="text-emerald-400">تم النسخ ✓</span>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>نسخ الصوت</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why it works & Dos and Donts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800 text-xs">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-3 space-y-1">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Target className="h-3.5 w-3.5 text-blue-400" />
                      <span>سر الفاعلية (Psychological Trigger):</span>
                    </span>
                    <p className="text-zinc-400 leading-relaxed">{script.whyItWorks}</p>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-3 space-y-2">
                    <div className="flex items-start gap-1.5 text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{script.dosAndDonts.doText}</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-rose-300">
                      <XCircle className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{script.dosAndDonts.dontText}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Section: Supplier Templates */}
      {activeSubTab === 'supplier' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {dropshippingSupplierTemplates.map((template) => (
              <div 
                key={template.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-6 hover:border-zinc-700 transition"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                  <div>
                    <h4 className="text-lg font-black text-white">{template.title}</h4>
                    <p className="mt-1 text-xs text-zinc-400">{template.purpose}</p>
                  </div>

                  <button
                    onClick={() => handleCopy(template.englishText, template.title, template.id)}
                    className="inline-flex items-center gap-1.5 self-start sm:self-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition"
                  >
                    {copiedId === template.id ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>تم نسخ النص الإنجليزي!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>نسخ النص الإنجليزي للإرسال</span>
                      </>
                    )}
                  </button>
                </div>

                {/* English Text Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-300">نص الرسالة بالإنجليزية (للإرسال للمورد في علي إكسبرس أو CJ):</span>
                    <span className="text-[11px] text-zinc-500 font-mono">English Version</span>
                  </div>
                  <pre className="rounded-xl border border-zinc-700/80 bg-zinc-950 p-4 text-xs font-mono text-zinc-200 whitespace-pre-wrap leading-relaxed select-all">
                    {template.englishText}
                  </pre>
                </div>

                {/* Arabic Translation Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-400">الترجمة العربية لفهم المعنى الدقيق لكل بند:</span>
                    <span className="text-[11px] text-zinc-500">الترجمة العربية</span>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-850/50 p-4 text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
                    {template.arabicTranslation}
                  </div>
                </div>

                {/* Key Checkpoints */}
                <div className="pt-4 border-t border-zinc-800">
                  <span className="text-xs font-bold text-zinc-300 block mb-2">
                    نقاط التحقق الحاسمة قبل الاعتماد (Checkpoints):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {template.keyCheckpoints.map((cp, idx) => (
                      <div key={idx} className="flex items-center gap-2 rounded-lg bg-zinc-800/40 border border-zinc-800 p-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{cp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
