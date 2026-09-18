import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Sparkles, Globe, Bookmark, Flame } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate, savedCount }) => {
  const { language, setLanguage, t, isRTL } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo & Name */}
        <div 
          id="brand-header-logo"
          onClick={() => onNavigate('home')}
          className="flex cursor-pointer items-center gap-2.5 sm:gap-3 transition-transform active:scale-95"
        >
          {/* Brand Avatar with Uploaded Image */}
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-0.5 rounded-xl bg-amber-500/30 blur-xs" />
            <img
              src="/file_00000000833881f4b8703f44bcd07500.png"
              onError={(e) => {
                e.currentTarget.src = '/assets/rz-hero-badge.png';
              }}
              alt="RikouZone Brand Logo"
              referrerPolicy="no-referrer"
              className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-xl object-contain border border-amber-500/40 bg-zinc-950 shadow-md shadow-amber-500/20 select-none"
              width={40}
              height={40}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white font-sans">
                Rikou<span className="text-amber-400">Zone</span>
              </span>
              <span className="inline-flex items-center rounded-full bg-amber-500/10 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold text-amber-400 border border-amber-500/20">
                PRO
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-zinc-400 line-clamp-1">
              {t.brand.subtitle}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {[
            { id: 'home', label: t.nav.home },
            { id: 'income', label: t.nav.income },
            { id: 'ideas', label: t.nav.ideas },
            { id: 'tools', label: t.nav.tools },
            { id: 'ai', label: t.nav.ai, badge: 'AI' },
            { id: 'creators', label: t.nav.creators },
          ].map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 py-1.5 text-sm font-medium transition-all rounded-lg ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10 font-bold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.label}
                  {item.badge && (
                    <span className="rounded bg-gradient-to-r from-amber-500 to-orange-500 px-1 py-0.2 text-[9px] font-black text-black">
                      {item.badge}
                    </span>
                  )}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Language Switcher & Saved Bookmarks */}
        <div className="flex items-center gap-2">
          {/* Quick Language Selector */}
          <div className="relative flex items-center rounded-xl bg-zinc-900/90 p-1 border border-zinc-800 text-xs">
            <Globe className="h-3.5 w-3.5 text-zinc-400 mx-1.5 hidden sm:block" />
            <button
              id="lang-btn-ar"
              onClick={() => setLanguage('ar')}
              className={`px-2 py-1 rounded-lg font-bold transition-all ${
                language === 'ar'
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              عربي
            </button>
            <button
              id="lang-btn-en"
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg font-bold transition-all ${
                language === 'en'
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              EN
            </button>
            <button
              id="lang-btn-fr"
              onClick={() => setLanguage('fr')}
              className={`px-2 py-1 rounded-lg font-bold transition-all ${
                language === 'fr'
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              FR
            </button>
          </div>

          {/* Saved Items Button */}
          <button
            id="header-saved-btn"
            onClick={() => onNavigate('profile')}
            className={`relative flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition-all border ${
              currentTab === 'profile'
                ? 'border-amber-500/50 bg-amber-500/15 text-amber-400'
                : 'border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-700 hover:text-white'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${savedCount > 0 ? 'text-amber-400 fill-amber-400/20' : ''}`} />
            <span className="hidden sm:inline">{isRTL ? 'المحفوظات' : 'Saved'}</span>
            {savedCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-black">
                {savedCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
