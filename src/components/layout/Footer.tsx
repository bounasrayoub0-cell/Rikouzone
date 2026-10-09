import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 pb-24 lg:pb-12 pt-12 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-900">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="relative h-9 w-9 flex-shrink-0">
                <img
                  src="/file_00000000b1d881f496a6612e6eef85ce.png"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/rz-hero-badge.png';
                  }}
                  alt="RikouZone Logo"
                  referrerPolicy="no-referrer"
                  className="h-9 w-9 rounded-xl object-contain select-none shadow-md shadow-amber-500/15"
                  width={36}
                  height={36}
                />
              </div>
              <span className="text-xl font-black tracking-tight text-white font-sans">
                Rikou<span className="text-amber-400">Zone</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              {t.brand.subtitle} — {t.footer.brandDescription}
            </p>
          </div>

          {/* Quick Nav 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
              {t.footer.exploreTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('income')} className="hover:text-amber-400 transition-colors">
                  {t.nav.income} (35)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ideas')} className="hover:text-amber-400 transition-colors">
                  {t.nav.ideas} (160+)
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Nav 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
              {t.footer.toolsTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('tools')} className="hover:text-amber-400 transition-colors">
                  {t.nav.tools} (17)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai')} className="hover:text-amber-400 transition-colors">
                  {t.nav.ai} (15)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('creators')} className="hover:text-amber-400 transition-colors">
                  {t.nav.creators}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer, Brand Summary & Copyright */}
        <div className="mt-8 pt-6 border-t border-zinc-900/80 flex flex-col items-center text-center gap-3 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" />
            <span>
              {t.footer.disclaimer || t.footer.statsSummary}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 pt-2">
            <div className="text-sm font-bold tracking-tight text-white font-sans">
              Rikou<span className="text-amber-400">Zone</span>
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              {t.brand.subtitle}
            </div>
            <div className="text-xs text-zinc-400 font-medium mt-0.5">
              <span className="font-semibold text-amber-400/95 hover:text-amber-300 transition-colors">{t.footer.foundedBy || t.footer.founderCredit}</span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-1 font-normal">
              {t.footer.rightsReserved}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
