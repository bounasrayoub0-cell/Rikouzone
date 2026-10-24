import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Layers, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Info,
  Maximize2
} from 'lucide-react';
import { RikouVisualSpec } from '../../types/lessonTypes';
import { useLanguage } from '../../i18n/LanguageContext';

interface RikouVisualAidProps {
  spec: RikouVisualSpec;
  trackTitleAr: string;
  lessonNumber: number;
  className?: string;
}

export const RikouVisualAid: React.FC<RikouVisualAidProps> = ({
  spec,
  trackTitleAr,
  lessonNumber,
  className = ''
}) => {
  const { isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const getAccentBorder = (accent?: string) => {
    switch (accent) {
      case 'emerald': return 'border-emerald-500/40 bg-emerald-500/5 text-emerald-400';
      case 'blue': return 'border-blue-500/40 bg-blue-500/5 text-blue-400';
      case 'purple': return 'border-purple-500/40 bg-purple-500/5 text-purple-400';
      case 'orange': return 'border-orange-500/40 bg-orange-500/5 text-orange-400';
      case 'rose': return 'border-rose-500/40 bg-rose-500/5 text-rose-400';
      case 'cyan': return 'border-cyan-500/40 bg-cyan-500/5 text-cyan-400';
      case 'amber':
      default: return 'border-amber-500/40 bg-amber-500/5 text-amber-400';
    }
  };

  const getAccentBadge = (accent?: string) => {
    switch (accent) {
      case 'emerald': return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
      case 'blue': return 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30';
      case 'purple': return 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30';
      case 'orange': return 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30';
      case 'rose': return 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30';
      case 'cyan': return 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30';
      case 'amber':
      default: return 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30';
    }
  };

  return (
    <figure 
      aria-label={`مخطط تعليمي: ${spec.title}`}
      className={`relative overflow-hidden rounded-3xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#162032] text-slate-900 dark:text-white p-4 sm:p-6 shadow-sm dark:shadow-none ${className}`}
    >
      {/* Official RikouZone Visual Header with real brand avatar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-4 border-b border-slate-200 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-0.5 shrink-0 shadow-sm">
            <img
              src="/assets/rz-hero-badge.png"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedSvg) {
                  target.dataset.triedSvg = 'true';
                  target.src = '/assets/rz-hero-badge.svg';
                } else if (!target.dataset.triedFile) {
                  target.dataset.triedFile = 'true';
                  target.src = '/file_00000000b1d881f496a6612e6eef85ce.png';
                }
              }}
              alt="شعار منصة RikouZone"
              className="h-full w-full object-contain rounded-lg select-none"
              width={36}
              height={36}
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-slate-900 dark:text-white font-sans tracking-tight">
                Rikou<span className="text-[#2563EB]">Zone</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-[#EFF6FF] text-[#2563EB] border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/40">
                ACADEMY
              </span>
            </div>
            <span className="text-[10px] text-[#667085] dark:text-[#98A2B3] font-medium block">
              المخطط البصري التعليمي المعتمد 2026
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-zinc-800/90 text-slate-700 dark:text-zinc-300 border border-slate-300 dark:border-zinc-700/60 font-sans">
            الدرس #{lessonNumber}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/40">
            {spec.badgeLabel || trackTitleAr}
          </span>
        </div>
      </div>

      {/* Diagram Title & Subtitle */}
      <div className="relative z-10 mb-5 text-center sm:text-start">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] dark:text-blue-400 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{spec.title}</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
          {spec.subtitle}
        </p>
      </div>

      {/* Dynamic Diagram Visual Structure based on spec.type */}
      <div className="relative z-10 my-4">
        {/* Type 1: Flowchart / Step Pipeline */}
        {spec.type === 'flowchart' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {spec.nodes.map((node, idx) => (
              <div 
                key={node.id}
                className={`relative p-3.5 rounded-2xl border ${getAccentBorder(node.accent)} backdrop-blur-md flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/40 text-zinc-300 border border-zinc-800 font-sans">
                      المرحلة {idx + 1}
                    </span>
                    {node.badge && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${getAccentBadge(node.accent)}`}>
                        {node.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    {node.desc}
                  </p>
                </div>

                {idx < spec.nodes.length - 1 && (
                  <div className="hidden lg:flex justify-end pt-2 text-amber-400/80">
                    <ArrowIcon className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Type 2: Conversion / Retention Funnel */}
        {spec.type === 'funnel' && (
          <div className="space-y-2.5 max-w-xl mx-auto">
            {spec.nodes.map((node, idx) => {
              const widths = ['w-full', 'w-[90%]', 'w-[80%]', 'w-[70%]'];
              const widthClass = widths[idx] || 'w-[65%]';

              return (
                <div 
                  key={node.id}
                  className={`mx-auto ${widthClass} p-3.5 rounded-2xl border ${getAccentBorder(node.accent)} backdrop-blur-md transition-all`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-[10px] font-black font-sans text-amber-400 border border-amber-500/30">
                        {idx + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {node.title}
                      </h4>
                    </div>
                    {node.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getAccentBadge(node.accent)} font-sans`}>
                        {node.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-300 leading-relaxed px-1">
                    {node.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Type 3: Flywheel / Circular Loop */}
        {spec.type === 'flywheel' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {spec.nodes.map((node, idx) => (
              <div 
                key={node.id}
                className={`p-4 rounded-2xl border ${getAccentBorder(node.accent)} backdrop-blur-md relative`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-sans">
                    محرك النمو #{idx + 1}
                  </span>
                  {node.badge && (
                    <span className="text-[10px] font-bold text-zinc-300">
                      {node.badge}
                    </span>
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
                  {node.title}
                </h4>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  {node.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Type 4: Hierarchy Pyramid Layers */}
        {spec.type === 'hierarchy' && (
          <div className="space-y-2.5 max-w-lg mx-auto">
            {spec.nodes.map((node, idx) => (
              <div 
                key={node.id}
                className={`p-3.5 rounded-2xl border ${getAccentBorder(node.accent)} backdrop-blur-md`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-black/40 text-amber-400 border border-zinc-800">
                    الطبقة {spec.nodes.length - idx}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white flex-1 text-center">
                    {node.title}
                  </h4>
                  {node.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getAccentBadge(node.accent)}`}>
                      {node.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-300 text-center leading-relaxed">
                  {node.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Type 5: Architecture / System Stack */}
        {spec.type === 'architecture' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {spec.nodes.map((node, idx) => (
              <div 
                key={node.id}
                className={`p-3.5 rounded-2xl border ${getAccentBorder(node.accent)} backdrop-blur-md`}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-bold text-amber-400 font-sans">
                    بلوك {idx + 1}
                  </span>
                  {node.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${getAccentBadge(node.accent)}`}>
                      {node.badge}
                    </span>
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
                  {node.title}
                </h4>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  {node.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Type 6: Comparison (Hobbyist vs RikouZone Pro) */}
        {spec.type === 'comparison' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {spec.nodes.map((node) => (
              <div 
                key={node.id}
                className={`p-4 rounded-2xl border ${getAccentBorder(node.accent)} backdrop-blur-md`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getAccentBadge(node.accent)}`}>
                    {node.badge || node.title}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
                  {node.title}
                </h4>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  {node.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Type 7: Matrix (4 Quadrants) */}
        {spec.type === 'matrix' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {spec.nodes.map((node) => (
              <div 
                key={node.id}
                className={`p-3.5 rounded-2xl border ${getAccentBorder(node.accent)} backdrop-blur-md`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getAccentBadge(node.accent)}`}>
                    {node.badge || 'معيار'}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
                  {node.title}
                </h4>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  {node.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Metrics Row (if provided) */}
      {spec.metrics && spec.metrics.length > 0 && (
        <div className="relative z-10 mt-4 pt-3 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          {spec.metrics.map((m, mIdx) => (
            <div key={mIdx} className="bg-zinc-950/70 p-2 rounded-xl border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block truncate">{m.label}</span>
              <span className="text-xs sm:text-sm font-black text-amber-400 font-sans tracking-tight block">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Pro Tip & RikouZone Copyright Watermark Footer */}
      <div className="relative z-10 mt-4 pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-zinc-400">
        {spec.proTip ? (
          <div className="flex items-center gap-1.5 text-amber-300/90 text-right">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span><strong>نصيحة RikouZone:</strong> {spec.proTip}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>محتوى تعليمي أصلي خاضع لحقوق منصة RikouZone</span>
          </div>
        )}

        <span className="font-mono text-zinc-400 shrink-0 select-none">
          RikouZone Visual Engine © 2026
        </span>
      </div>

    </figure>
  );
};
