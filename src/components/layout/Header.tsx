import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Menu } from 'lucide-react';
import { LanguageSelector } from '../common/LanguageSelector';
import { ThemeSwitcher } from '../common/ThemeSwitcher';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  savedCount?: number;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate, onToggleSidebar }) => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 sm:h-15 max-w-7xl items-center justify-between px-3 sm:px-6">
        
        {/* Brand Logo & Name */}
        <div 
          id="brand-header-logo"
          onClick={() => onNavigate('home')}
          className="flex cursor-pointer items-center gap-2 sm:gap-2.5 transition-transform active:scale-95 min-w-0"
        >
          {/* Brand Avatar with Uploaded Image */}
          <div className="relative shrink-0">
            <div className="absolute -inset-0.5 rounded-xl bg-amber-500/30 blur-xs" />
            <img
              src="/file_00000000b1d881f496a6612e6eef85ce.png"
              onError={(e) => {
                e.currentTarget.src = '/assets/rz-hero-badge.png';
              }}
              alt="RikouZone Brand Logo"
              referrerPolicy="no-referrer"
              className="relative h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-xl object-contain border border-amber-500/40 bg-zinc-950 shadow-md shadow-amber-500/20 select-none"
              width={36}
              height={36}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-base sm:text-lg font-black tracking-tight text-white font-sans">
                Rikou<span className="text-amber-400">Zone</span>
              </span>
              <span className="inline-flex items-center rounded-full bg-amber-500/10 px-1.5 py-0.2 text-[9px] font-semibold text-amber-400 border border-amber-500/20">
                PRO
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-medium text-zinc-400 truncate block">
              {t.brand.subtitle}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links (For screens >= lg) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {[
            { id: 'home', label: t.nav.home, activeText: 'text-amber-400', activeBg: 'bg-amber-500/10', underline: 'bg-amber-400' },
            { id: 'income', label: t.nav.income, activeText: 'text-emerald-400', activeBg: 'bg-emerald-500/10', underline: 'bg-emerald-400' },
            { id: 'ideas', label: t.nav.ideas, activeText: 'text-purple-400', activeBg: 'bg-purple-500/10', underline: 'bg-purple-400' },
            { id: 'challenges', label: 'التحديات', activeText: 'text-amber-400', activeBg: 'bg-amber-500/10', underline: 'bg-amber-400' },
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
                className={`relative px-3 py-1.5 text-sm font-medium transition-all rounded-lg cursor-pointer ${
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

        {/* Action Controls: Theme Switcher, Language Selector & Hamburger Menu */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Light / Dark Mode Toggle */}
          <ThemeSwitcher />

          {/* Professional 9-Language Selector */}
          <LanguageSelector />

          {/* Hamburger Menu Toggle Button */}
          <button
            id="header-hamburger-menu-btn"
            onClick={onToggleSidebar}
            aria-label="القائمة الجانبية"
            className="flex h-9 w-9 sm:h-9.5 sm:w-9.5 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/90 text-zinc-300 hover:border-amber-500/50 hover:text-amber-400 hover:bg-zinc-850 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            <Menu className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </button>
        </div>

      </div>
    </header>
  );
};
