import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { AdsterraNativeBanner } from '../common/AdsterraNativeBanner';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  TrendingUp, 
  Lightbulb, 
  Calculator, 
  ShieldCheck, 
  Flame, 
  Zap, 
  Award,
  ChevronRight
} from 'lucide-react';

interface HeroProps {
  onNavigate: (tab: string) => void;
}

const HeroBadgeImage: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative group ${className}`}>
    {/* Subtle Clean SaaS Ambient Shadow */}
    <div className="absolute -inset-2 rounded-3xl bg-blue-500/5 blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
    
    {/* Premium Rounded Card Container */}
    <div className="relative rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#101828] p-2.5 sm:p-3.5 shadow-lg shadow-slate-900/5 dark:shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]">
      {/* Subtle modern corner accents */}
      <div className="absolute top-2 left-2 h-2.5 w-2.5 border-t-2 border-l-2 border-[#2563EB]/40 dark:border-blue-500/30 rounded-tl pointer-events-none" />
      <div className="absolute top-2 right-2 h-2.5 w-2.5 border-t-2 border-r-2 border-[#2563EB]/40 dark:border-blue-500/30 rounded-tr pointer-events-none" />
      <div className="absolute bottom-2 left-2 h-2.5 w-2.5 border-b-2 border-l-2 border-[#2563EB]/40 dark:border-blue-500/30 rounded-bl pointer-events-none" />
      <div className="absolute bottom-2 right-2 h-2.5 w-2.5 border-b-2 border-r-2 border-[#2563EB]/40 dark:border-blue-500/30 rounded-br pointer-events-none" />

      {/* The Uploaded Image */}
      <img
        src="/file_00000000b1d881f496a6612e6eef85ce.png"
        onError={(e) => {
          e.currentTarget.src = '/assets/rz-hero-badge.png';
        }}
        alt="RikouZone Official Badge"
        referrerPolicy="no-referrer"
        className="w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96 aspect-square object-contain rounded-2xl select-none"
        loading="eager"
        width={384}
        height={384}
      />
    </div>
  </div>
);

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pb-20">
      {/* Background Decorative Ambient Elements */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 -z-10 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 right-10 -z-10 h-64 w-64 rounded-full bg-blue-500/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 -z-10 h-72 w-72 rounded-full bg-slate-400/5 blur-[110px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Hero Section Container (Balanced 2-Column on Desktop, Natural Flow on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Column 1: Primary Content & Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start">
            
            {/* Top Floating Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900/50 bg-[#EAF1FF] dark:bg-blue-950/40 px-4 py-1.5 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#2563EB] animate-pulse" />
              <span className="text-xs font-bold text-[#2563EB] dark:text-blue-400">
                {t.hero.badge}
              </span>
              <Sparkles className="h-3.5 w-3.5 text-[#2563EB] dark:text-blue-400" />
            </div>

            {/* Primary Headline */}
            <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl leading-[1.25]">
              {t.hero.title.includes(t.hero.titleHighlight) ? (
                <>
                  {t.hero.title.slice(0, t.hero.title.indexOf(t.hero.titleHighlight))}
                  <span className="text-[#2563EB] dark:text-blue-500">
                    {t.hero.titleHighlight}
                  </span>
                  {t.hero.title.slice(t.hero.title.indexOf(t.hero.titleHighlight) + t.hero.titleHighlight.length)}
                </>
              ) : (
                <>
                  {t.hero.title}{' '}
                  <span className="text-[#2563EB] dark:text-blue-500">
                    {t.hero.titleHighlight}
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-[#667085] dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">
              {t.hero.description}
            </p>

            {/* Mobile Image Placement */}
            <div className="my-6 flex justify-center w-full lg:hidden">
              <HeroBadgeImage />
            </div>

            {/* Action CTA Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 w-full sm:w-auto">
              <button
                id="hero-explore-income-btn"
                onClick={() => onNavigate('income')}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <TrendingUp className="h-5 w-5 stroke-[2.5]" />
                <span>{t.hero.exploreIncome}</span>
                <ArrowIcon className="h-4 w-4 stroke-[2.5]" />
              </button>

              <button
                id="hero-try-ai-btn"
                onClick={() => onNavigate('ai')}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-2xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-[#101828] px-6 py-3.5 text-base font-bold text-slate-800 dark:text-white transition-all hover:bg-slate-50 dark:hover:bg-zinc-800/80 hover:border-[#2563EB] active:scale-95 shadow-sm cursor-pointer"
              >
                <Sparkles className="h-5 w-5 text-[#2563EB] dark:text-blue-400" />
                <span>{t.hero.tryAi}</span>
              </button>

              <button
                id="hero-browse-ideas-btn"
                onClick={() => onNavigate('ideas')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#101828] px-5 py-3.5 text-sm font-semibold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-zinc-700 transition-all shadow-sm cursor-pointer"
              >
                <Lightbulb className="h-4 w-4 text-[#2563EB] dark:text-blue-400" />
                <span>{t.hero.browseIdeas}</span>
              </button>
            </div>

            {/* Social Proof / Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-6 text-xs text-slate-600 dark:text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                {t.hero.featurePractical}
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                {t.hero.featureTools}
              </span>
              <span className="flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                {t.hero.featureGaming}
              </span>
            </div>

          </div>

          {/* Column 2: Desktop Image Showcase */}
          <div className="hidden lg:flex lg:col-span-5 justify-center items-center">
            <HeroBadgeImage />
          </div>

        </div>

        {/* Adsterra Native Banner (Directly below 'Explore Income Paths' action & above the Rikou AI section) */}
        <AdsterraNativeBanner />

        {/* 4 Feature Banners / Category Bento Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Income Paths */}
          <div
            id="hero-card-income"
            onClick={() => onNavigate('income')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/60 p-5 backdrop-blur-sm transition-all hover:border-[#2563EB]/40 hover:bg-slate-50 dark:hover:bg-zinc-900/90 shadow-sm dark:shadow-none hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FF] text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
              {t.hero.feature1Title}
            </h3>
            <p className="mt-1.5 text-xs text-[#667085] dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {t.hero.feature1Desc}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-[#2563EB] dark:text-blue-400">
              <span>{t.sections.browseAllPaths}</span>
              <ArrowIcon className="h-3.5 w-3.5 mx-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: 160+ Content Ideas */}
          <div
            id="hero-card-ideas"
            onClick={() => onNavigate('ideas')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/60 p-5 backdrop-blur-sm transition-all hover:border-[#2563EB]/40 hover:bg-slate-50 dark:hover:bg-zinc-900/90 shadow-sm dark:shadow-none hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FF] text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
              {t.hero.feature2Title}
            </h3>
            <p className="mt-1.5 text-xs text-[#667085] dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {t.hero.feature2Desc}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-[#2563EB] dark:text-blue-400">
              <span>{t.sections.browseAllIdeas}</span>
              <ArrowIcon className="h-3.5 w-3.5 mx-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: 17 Precision Calculators */}
          <div
            id="hero-card-tools"
            onClick={() => onNavigate('tools')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/60 p-5 backdrop-blur-sm transition-all hover:border-[#2563EB]/40 hover:bg-slate-50 dark:hover:bg-zinc-900/90 shadow-sm dark:shadow-none hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FF] text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
              <Calculator className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
              {t.hero.feature3Title}
            </h3>
            <p className="mt-1.5 text-xs text-[#667085] dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {t.hero.feature3Desc}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-[#2563EB] dark:text-blue-400">
              <span>{t.sections.browseAllTools}</span>
              <ArrowIcon className="h-3.5 w-3.5 mx-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Rikou AI Suite */}
          <div
            id="hero-card-ai"
            data-section="rikou-ai-section"
            onClick={() => onNavigate('ai')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-gradient-to-b from-[#EAF1FF]/60 via-white to-[#EAF1FF]/30 dark:from-blue-950/30 dark:to-zinc-900/80 p-5 backdrop-blur-sm transition-all hover:border-[#2563EB] hover:shadow-lg hover:shadow-blue-600/10 shadow-sm dark:shadow-none"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-md shadow-blue-600/20">
              <Sparkles className="h-6 w-6 stroke-[2.5]" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
              {t.hero.feature4Title}
            </h3>
            <p className="mt-1.5 text-xs text-[#667085] dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {t.hero.feature4Desc}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-[#2563EB] dark:text-blue-400">
              <span>{t.sections.exploreNow}</span>
              <ArrowIcon className="h-3.5 w-3.5 mx-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
