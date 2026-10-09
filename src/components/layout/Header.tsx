import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Sparkles, Bookmark, Flame } from 'lucide-react';
import { LanguageSelector } from '../common/LanguageSelector';
import { ThemeSwitcher } from '../common/ThemeSwitcher';

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
              src="/file_00000000b1d881f496a6612e6eef85ce.png"
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
            { id: 'home', label: t.nav.home, activeText: 'text-amber-400', activeBg: 'bg-amber-500/10', underline: 'bg-amber-400' },
            { id: 'income', label: t.nav.income, activeText: 'text-emerald-400', activeBg: 'bg-emerald-500/10', underline: 'bg-emerald-400' },
            { id: 'ideas', label: t.nav.ideas, activeText: 'text-purple-400', activeBg: 'bg-purple-500/10', underline: 'bg-purple-400' },
            { id: 'tools', label: t.nav.tools, activeText: 'text-blue-400', activeBg: 'bg-blue-500/10', underline: 'bg-blue-400' },
            { id: 'ai', label: t.nav.ai, badge: 'AI', activeText: 'text-purple-400', activeBg: 'bg-purple-500/10', underline: 'bg-purple-400' },
            { id: 'creators', label: t.nav.creators, activeText: 'text-indigo-400', activeBg: 'bg-indigo-500/10', underline: 'bg-indigo-400' },
          ].map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 py-1.5 text-sm font-medium transition-all rounded-lg ${
                  isActive
                    ? `${item.activeText} ${item.activeBg} font-bold`
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.label}
                  {item.badge && (
                    <span className="rounded bg-gradient-to-r from-purple-500 to-indigo-500 px-1 py-0.2 text-[9px] font-black text-white">
                      {item.badge}
                    </span>
                  )}
                </span>
                {isActive && (
                  <span className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${item.underline}`} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Theme Switcher, Language Switcher & Saved Bookmarks */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Light / Dark Mode Toggle */}
          <ThemeSwitcher />

          {/* Professional 9-Language Selector */}
          <LanguageSelector />

          {/* Saved Items Button */}
          <button
            id="header-saved-btn"
            onClick={() => onNavigate('profile')}
            className={`relative flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition-all border ${
              currentTab === 'profile'
                ? 'border-sky-500/50 bg-sky-500/15 text-sky-400'
                : 'border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-700 hover:text-white'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${savedCount > 0 ? 'text-sky-400 fill-sky-400/20' : ''}`} />
            <span className="hidden sm:inline">{t.common.savedItems}</span>
            {savedCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[10px] font-black text-black">
                {savedCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
