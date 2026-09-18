import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  Home, 
  TrendingUp, 
  Lightbulb, 
  Calculator, 
  Sparkles, 
  Gamepad2, 
  User 
} from 'lucide-react';

interface BottomNavigationProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  savedCount: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onNavigate,
  savedCount
}) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'income', label: t.nav.income, icon: TrendingUp },
    { id: 'ideas', label: t.nav.ideas, icon: Lightbulb },
    { id: 'tools', label: t.nav.tools, icon: Calculator },
    { id: 'ai', label: t.nav.ai, icon: Sparkles, isSpecial: true },
    { id: 'creators', label: t.nav.creators, icon: Gamepad2 },
    { id: 'profile', label: t.nav.profile, icon: User, badgeCount: savedCount }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-zinc-800/90 bg-zinc-950/95 backdrop-blur-2xl px-1.5 py-1 safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                id={`bottom-nav-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className="relative -top-3.5 flex flex-col items-center"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-orange-500 shadow-lg ${
                  isActive ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-zinc-950 scale-105' : 'hover:scale-105'
                } transition-all duration-200`}>
                  <Sparkles className="h-6 w-6 text-black stroke-[2.5]" />
                </div>
                <span className={`mt-0.5 text-[10px] font-black ${
                  isActive ? 'text-amber-400' : 'text-zinc-400'
                }`}>
                  AI
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              id={`bottom-nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-1 flex-col items-center py-1.5 transition-all duration-150 ${
                isActive
                  ? 'text-amber-400 scale-105'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-black text-black">
                    {item.badgeCount}
                  </span>
                )}
              </div>
              <span className={`mt-1 text-[10px] tracking-tight leading-tight line-clamp-1 max-w-[50px] text-center ${
                isActive ? 'font-bold' : 'font-medium'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <span className="mt-0.5 h-1 w-1 rounded-full bg-amber-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
