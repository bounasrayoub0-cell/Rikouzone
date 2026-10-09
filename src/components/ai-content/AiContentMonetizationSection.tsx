import React, { useState } from 'react';
import { 
  DollarSign, 
  Users, 
  Target, 
  Rocket, 
  TrendingUp, 
  CheckCircle2, 
  Copy, 
  Check, 
  HelpCircle,
  Briefcase,
  Layers,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { aiMonetizationServicesList, AiMonetizationService } from '../../data/aiContentData';

interface AiContentMonetizationSectionProps {
  onCopyText: (text: string, label: string) => void;
}

export const AiContentMonetizationSection: React.FC<AiContentMonetizationSectionProps> = ({ onCopyText }) => {
  const { isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [selectedServiceId, setSelectedServiceId] = useState<string>(aiMonetizationServicesList[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeService = aiMonetizationServicesList.find((s) => s.id === selectedServiceId) || aiMonetizationServicesList[0];

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
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              كيف تربح من AI Content: دليل الخدمات الخمس المربحة
            </h3>
            <p className="mt-0.5 text-xs sm:text-sm text-zinc-400">
              لكل خدمة: ما الذي تقدمه؟ من هو العميل؟ ما الذي يحتاجه العميل؟ كيف تبدأ من الصفر؟ وكيف تطور الخدمة إلى وكالة محتوى؟
            </p>
          </div>
        </div>

        {/* Service Switcher Tabs */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-3 border-t border-zinc-800/80">
          {aiMonetizationServicesList.map((svc) => (
            <button
              key={svc.id}
              onClick={() => setSelectedServiceId(svc.id)}
              className={`rounded-xl p-3 text-right transition-all cursor-pointer border ${
                selectedServiceId === svc.id
                  ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-lg shadow-amber-500/10'
                  : 'bg-zinc-800/40 border-zinc-800 text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-200'
              }`}
            >
              <div className="text-xs font-bold truncate">{svc.serviceTitle}</div>
              <div className="mt-1 text-[11px] text-amber-400/90 font-mono font-medium">
                {svc.starterPriceRange}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Deep Dive into Active Service */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 sm:p-8 space-y-6">
        {/* Title and Pricing Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div>
            <span className="rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
              دراسة الجدوى وخطوات التطبيق
            </span>
            <h4 className="mt-2 text-xl sm:text-2xl font-black text-white">
              {activeService.serviceTitle}
            </h4>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 sm:text-left text-right shrink-0">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              متوسط السعر المقترح للخدمة
            </span>
            <span className="text-base sm:text-lg font-black text-amber-400">
              {activeService.starterPriceRange}
            </span>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pillar 1: What You Offer */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Briefcase className="h-4 w-4" />
              <span>1. ما الذي تقدمه بالتحديد للعميل؟</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {activeService.whatYouOffer}
            </p>
          </div>

          {/* Pillar 2: Target Client */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
              <Users className="h-4 w-4" />
              <span>2. من هو العميل المستهدف؟</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {activeService.targetClient}
            </p>
          </div>

          {/* Pillar 3: Client Needs */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
              <Target className="h-4 w-4" />
              <span>3. ما الذي يحتاجه العميل حقاً؟ (الألم والنتيجة)</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {activeService.clientNeeds}
            </p>
          </div>

          {/* Pillar 4: Deliverables Example */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Layers className="h-4 w-4" />
              <span>4. نموذج ملف التسليم النهائي (Deliverables)</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {activeService.deliverablesExample}
            </p>
          </div>
        </div>

        {/* Step-by-Step: How to Start from Zero */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 space-y-3">
          <h5 className="text-sm font-bold text-white flex items-center gap-2">
            <Rocket className="h-4 w-4 text-amber-400" />
            <span>خطة البدء السريع خطوة بخطوة (من الصفر بدون رأس مال):</span>
          </h5>
          <div className="space-y-2.5">
            {activeService.howToStart.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/60">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-xs font-black text-amber-400">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scaling to Agency: How to Scale Over Time */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-5 space-y-3">
          <h5 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span>كيف تطور هذه الخدمة مع الوقت لبناء وكالة محتوى (Content Agency)؟</span>
          </h5>
          <div className="space-y-2.5">
            {activeService.howToScaleOverTime.map((scale, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-xl bg-zinc-950/80 p-3 border border-emerald-500/20">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {scale}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
