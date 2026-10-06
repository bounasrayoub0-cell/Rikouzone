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
    {/* Ambient Glow matching Gold/Amber Theme */}
    <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-500/25 via-amber-400/20 to-orange-500/20 blur-xl opacity-80 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
    
    {/* Premium Rounded Card Container */}
    <div className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-b from-zinc-900/95 via-zinc-950/95 to-black p-2.5 sm:p-3.5 backdrop-blur-xl shadow-2xl shadow-amber-500/10 transition-transform duration-300 group-hover:scale-[1.02]">
      {/* Decorative inner gold corner accents */}
      <div className="absolute top-2 left-2 h-2.5 w-2.5 border-t-2 border-l-2 border-amber-400/60 rounded-tl pointer-events-none" />
      <div className="absolute top-2 right-2 h-2.5 w-2.5 border-t-2 border-r-2 border-amber-400/60 rounded-tr pointer-events-none" />
      <div className="absolute bottom-2 left-2 h-2.5 w-2.5 border-b-2 border-l-2 border-amber-400/60 rounded-bl pointer-events-none" />
      <div className="absolute bottom-2 right-2 h-2.5 w-2.5 border-b-2 border-r-2 border-amber-400/60 rounded-br pointer-events-none" />

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
      {/* Background Decorative Glow Elements */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 -z-10 h-96 w-96 rounded-full bg-amber-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 right-10 -z-10 h-64 w-64 rounded-full bg-orange-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 -z-10 h-72 w-72 rounded-full bg-amber-600/10 blur-[110px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Hero Section Container (Balanced 2-Column on Desktop, Natural Flow on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Column 1: Primary Content & Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start">
            
            {/* Top Floating Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 backdrop-blur-md shadow-lg shadow-amber-500/5">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-bold text-amber-300">
                {t.hero.badge}
              </span>
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            </div>

            {/* Primary Headline */}
            <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.25]">
              {t.hero.title.replace(t.hero.titleHighlight, '').trim()}{' '}
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-zinc-400 font-medium leading-relaxed max-w-2xl">
              {t.hero.description}
            </p>

            {/* Mobile Image Placement (Naturally between Hero text and CTA buttons) */}
            <div className="my-6 flex justify-center w-full lg:hidden">
              <HeroBadgeImage />
            </div>

            {/* Action CTA Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 w-full sm:w-auto">
              <button
                id="hero-explore-income-btn"
                onClick={() => onNavigate('income')}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 px-7 py-3.5 text-base font-bold text-zinc-950 shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                <TrendingUp className="h-5 w-5 stroke-[2.5]" />
                <span>{t.hero.exploreIncome}</span>
                <ArrowIcon className="h-4 w-4 stroke-[2.5]" />
              </button>

              <button
                id="hero-try-ai-btn"
                onClick={() => onNavigate('ai')}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-2xl border border-amber-500/40 bg-zinc-900/90 px-6 py-3.5 text-base font-bold text-amber-300 backdrop-blur-md transition-all hover:bg-zinc-800/90 hover:border-amber-400 active:scale-95"
              >
                <Sparkles className="h-5 w-5 text-amber-400" />
                <span>{t.hero.tryAi}</span>
              </button>

              <button
                id="hero-browse-ideas-btn"
                onClick={() => onNavigate('ideas')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/70 px-5 py-3.5 text-sm font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 transition-all"
              >
                <Lightbulb className="h-4 w-4 text-amber-400" />
                <span>{t.hero.browseIdeas}</span>
              </button>
            </div>

            {/* Social Proof / Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-6 text-xs text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                {t.hero.featurePractical}
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-400" />
                {t.hero.featureTools}
              </span>
              <span className="flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-orange-400" />
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
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-zinc-900/90"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
              {t.hero.feature1Title}
            </h3>
            <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2">
              {t.hero.feature1Desc}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-amber-400">
              <span>{t.sections.browseAllPaths}</span>
              <ArrowIcon className="h-3.5 w-3.5 mx-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: 160+ Content Ideas */}
          <div
            id="hero-card-ideas"
            onClick={() => onNavigate('ideas')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-zinc-900/90"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-black transition-colors">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
              {t.hero.feature2Title}
            </h3>
            <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2">
              {t.hero.feature2Desc}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-orange-400">
              <span>{t.sections.browseAllIdeas}</span>
              <ArrowIcon className="h-3.5 w-3.5 mx-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: 17 Precision Calculators */}
          <div
            id="hero-card-tools"
            onClick={() => onNavigate('tools')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-zinc-900/90"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
              <Calculator className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white group-hover:text-yellow-300 transition-colors">
              {t.hero.feature3Title}
            </h3>
            <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2">
              {t.hero.feature3Desc}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-yellow-400">
              <span>{t.sections.browseAllTools}</span>
              <ArrowIcon className="h-3.5 w-3.5 mx-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Rikou AI Suite */}
          <div
            id="hero-card-ai"
            data-section="rikou-ai-section"
            onClick={() => onNavigate('ai')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-zinc-900/80 p-5 backdrop-blur-sm transition-all hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-black shadow-md shadow-amber-500/30">
              <Sparkles className="h-6 w-6 stroke-[2.5]" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
              {t.hero.feature4Title}
            </h3>
            <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2">
              {t.hero.feature4Desc}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-amber-400">
              <span>{t.sections.exploreNow}</span>
              <ArrowIcon className="h-3.5 w-3.5 mx-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
