import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Menu } from 'lucide-react';
import { LanguageSelector } from '../common/LanguageSelector';
import { ThemeSwitcher } from '../common/ThemeSwitcher';
import { RkoCoinLogo } from '../common/RkoCoinLogo';
import { useRkoWallet } from '../../utils/rkoWalletStorage';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  savedCount?: number;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate, onToggleSidebar }) => {
  const { t } = useLanguage();
  const { balance: rkoBalance } = useRkoWallet();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 sm:h-15 max-w-7xl items-center justify-between px-2 sm:px-6 gap-1.5 sm:gap-2">
        
        {/* Brand Logo & Name - Responsive & Protected from overflowing */}
        <div 
          id="brand-header-logo"
          onClick={() => onNavigate('home')}
          className="flex cursor-pointer items-center gap-1.5 sm:gap-2.5 transition-transform active:scale-95 min-w-0 flex-1 sm:flex-initial"
        >
          {/* Brand Avatar with Uploaded Image */}
          <div className="relative shrink-0">
            <img
              src="/assets/rz-hero-badge.png"
              onError={(e) => {
                e.currentTarget.src = '/file_00000000b1d881f496a6612e6eef85ce.png';
              }}
              alt="RikouZone Brand Logo"
              referrerPolicy="no-referrer"
              className="relative h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-xl object-contain border border-slate-200 dark:border-zinc-800 bg-[#101828] shadow-sm select-none"
              width={36}
              height={36}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <span className="text-sm sm:text-lg font-black tracking-tight text-[#101828] dark:text-white font-sans whitespace-nowrap">
                Rikou<span className="text-[#2563EB]">Zone</span>
              </span>
              <span className="inline-flex items-center rounded-full bg-[#EAF1FF] dark:bg-blue-950/50 px-1.5 py-0.2 text-[8px] sm:text-[9px] font-bold text-[#2563EB] dark:text-blue-300 border border-[#2563EB]/25 shrink-0">
                PRO
              </span>
            </div>
            {/* Restored Subtitle - Visible on both Mobile and Desktop */}
            <span 
              className="text-[8.5px] sm:text-[10px] font-medium text-[#667085] dark:text-zinc-400 truncate block leading-tight max-w-[130px] xs:max-w-[180px] sm:max-w-none" 
              title={t.brand.subtitle}
            >
              {t.brand.subtitle}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links (For screens >= lg) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {[
            { id: 'home', label: t.nav.home },
            { id: 'income', label: t.nav.income },
            { id: 'ideas', label: t.nav.ideas },
            { id: 'challenges', label: 'التحديات' },
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
                className={`relative px-3 py-1.5 text-sm font-medium transition-all rounded-lg cursor-pointer ${
                  isActive
                    ? 'text-[#2563EB] dark:text-[#3B82F6] bg-[#EAF1FF] dark:bg-blue-950/40 font-bold'
                    : 'text-[#667085] dark:text-zinc-400 hover:text-[#101828] dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-900/60'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.label}
                  {item.badge && (
                    <span className="rounded bg-[#2563EB] px-1 py-0.2 text-[9px] font-black text-white">
                      {item.badge}
                    </span>
                  )}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#2563EB]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: RKO Wallet, Theme Switcher, Language Selector & Hamburger Menu */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* RKO Wallet Quick Balance Button - Small, elegant, non-intrusive */}
          <button
            id="header-rko-wallet-btn"
            onClick={() => onNavigate('wallet')}
            aria-label="عملة RKO"
            title="محفظة RKO (عملة داخلية تجريبية)"
            className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-xl border transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 ${
              currentTab === 'wallet' || currentTab === 'rko'
                ? 'border-[#D4A72C] bg-[#D4A72C]/15 text-[#D4A72C] ring-1 ring-[#D4A72C]/40'
                : 'border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/90 hover:border-[#D4A72C]/50 text-slate-800 dark:text-zinc-200'
            }`}
          >
            <RkoCoinLogo size="xs" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="text-[11px] sm:text-xs font-black font-sans tracking-tight text-[#D4A72C] whitespace-nowrap">
              {rkoBalance.toLocaleString()} RKO
            </span>
          </button>

          {/* Light / Dark Mode Toggle */}
          <ThemeSwitcher />

          {/* Professional 9-Language Selector */}
          <LanguageSelector />

          {/* Hamburger Menu Toggle Button */}
          <button
            id="header-hamburger-menu-btn"
            onClick={onToggleSidebar}
            aria-label="القائمة الجانبية"
            className="flex h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-slate-700 dark:text-zinc-300 hover:border-[#2563EB]/50 hover:text-[#2563EB] dark:hover:text-[#3B82F6] active:scale-95 transition-all cursor-pointer shadow-xs shrink-0"
          >
            <Menu className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </button>
        </div>

      </div>
    </header>
  );
};
