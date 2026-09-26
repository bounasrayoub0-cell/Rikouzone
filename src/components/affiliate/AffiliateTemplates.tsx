import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Sparkles, 
  Video, 
  Instagram, 
  Facebook, 
  Youtube, 
  FileText, 
  Scale, 
  Flame, 
  Megaphone,
  Layers
} from 'lucide-react';
import { contentTemplatesData, ContentTemplate } from '../../data/affiliateGuideData';

interface AffiliateTemplatesProps {
  onCopyText: (text: string, label: string) => void;
}

export const AffiliateTemplates: React.FC<AffiliateTemplatesProps> = ({ onCopyText }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filterTabs = [
    { id: 'all', label: 'جميع القوالب (8)' },
    { id: 'TikTok', label: 'تيك توك' },
    { id: 'Instagram', label: 'إنستغرام' },
    { id: 'YouTube', label: 'يوتيوب' },
    { id: 'Facebook', label: 'فيسبوك' },
    { id: 'Review', label: 'مراجعة منتج' },
    { id: 'Comparison', label: 'مقارنة (A vs B)' },
    { id: 'Hook', label: 'الهوكات (Hooks)' },
    { id: 'CTA', label: 'نداءات الإجراء (CTAs)' },
  ];

  const filteredTemplates = selectedFilter === 'all'
    ? contentTemplatesData
    : contentTemplatesData.filter(t => t.platform === selectedFilter);

  const handleCopy = (tpl: ContentTemplate) => {
    onCopyText(tpl.templateText, `تم نسخ "${tpl.title}" إلى الحافظة بنجاح!`);
    setCopiedId(tpl.id);
    setTimeout(() => {
      setCopiedId((curr) => (curr === tpl.id ? null : curr));
    }, 2500);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'TikTok': return <Video className="h-4 w-4 text-rose-400" />;
      case 'Instagram': return <Instagram className="h-4 w-4 text-pink-400" />;
      case 'YouTube': return <Youtube className="h-4 w-4 text-red-500" />;
      case 'Facebook': return <Facebook className="h-4 w-4 text-blue-400" />;
      case 'Review': return <FileText className="h-4 w-4 text-amber-400" />;
      case 'Comparison': return <Scale className="h-4 w-4 text-cyan-400" />;
      case 'Hook': return <Flame className="h-4 w-4 text-orange-400" />;
      case 'CTA': return <Megaphone className="h-4 w-4 text-emerald-400" />;
      default: return <Sparkles className="h-4 w-4 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Category filter pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {filterTabs.map((tab) => {
          const isActive = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTemplates.map((tpl) => {
          const isCopied = copiedId === tpl.id;
          return (
            <div
              key={tpl.id}
              className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-xl hover:border-amber-500/30 transition-all group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-zinc-950 border border-zinc-800">
                      {getPlatformIcon(tpl.platform)}
                    </span>
                    <span className="rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
                      {tpl.categoryAr}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(tpl)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      isCopied
                        ? 'bg-emerald-500 text-black'
                        : 'border border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-amber-500/40 hover:text-amber-400'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>نسخ القالب</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Title & Desc */}
                <h3 className="mt-4 text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                  {tpl.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  {tpl.description}
                </p>

                {/* Structure Breakdown */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80">
                  <span className="text-[11px] font-bold text-zinc-500 block mb-2">هيكل القالب العملي:</span>
                  <div className="space-y-1.5">
                    {tpl.structure.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Template Code/Text Box */}
                <div className="mt-4 relative">
                  <div className="flex items-center justify-between bg-zinc-950 px-3.5 py-2 rounded-t-xl border-t border-x border-zinc-800 text-[11px] text-zinc-400">
                    <span className="font-mono">نص السكربت الجاهز للاستخدام:</span>
                    <button
                      onClick={() => handleCopy(tpl)}
                      className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      <Copy className="h-3 w-3" />
                      <span>نسخ</span>
                    </button>
                  </div>
                  <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap rounded-b-xl border border-zinc-800 bg-zinc-950/90 p-3.5 text-xs font-mono text-zinc-200 leading-relaxed selection:bg-amber-500 selection:text-black scrollbar-thin">
                    {tpl.templateText}
                  </pre>
                </div>
              </div>

              {/* Tips Footer */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-amber-300/90 flex items-start gap-2 bg-amber-500/5 p-3 rounded-2xl border border-amber-500/10">
                <Sparkles className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                <span className="leading-relaxed"><strong className="text-amber-400">نصيحة احترافية:</strong> {tpl.tips}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
