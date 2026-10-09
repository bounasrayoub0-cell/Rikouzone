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

  const tabColorMap: Record<string, { text: string; dot: string; badge: string }> = {
    home: { text: 'text-amber-400', dot: 'bg-amber-400', badge: 'bg-amber-500' },
    income: { text: 'text-emerald-400', dot: 'bg-emerald-400', badge: 'bg-emerald-500' },
    ideas: { text: 'text-purple-400', dot: 'bg-purple-400', badge: 'bg-purple-500' },
    tools: { text: 'text-blue-400', dot: 'bg-blue-400', badge: 'bg-blue-500' },
    ai: { text: 'text-purple-400', dot: 'bg-purple-400', badge: 'bg-purple-500' },
    creators: { text: 'text-indigo-400', dot: 'bg-indigo-400', badge: 'bg-indigo-500' },
    profile: { text: 'text-sky-400', dot: 'bg-sky-400', badge: 'bg-sky-500' },
  };

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
                className="relative -top-3.5 flex flex-col items-center group"
              >
                <div className={`relative flex h-12 w-12 items-center justify-center rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 shadow-md shadow-amber-900/30 ${
                  isActive ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-zinc-950 scale-105 shadow-amber-500/25' : 'hover:scale-105'
                } transition-all duration-200`}>
                  <img
                    src="/file_00000000790481f48f32726a32633267.png"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/rikou-ai-avatar.png';
                    }}
                    alt="Rikou AI Avatar"
                    referrerPolicy="no-referrer"
                    className="h-full w-full rounded-full object-cover select-none bg-zinc-950"
                    width={48}
                    height={48}
                  />
                </div>
                <span className={`mt-0.5 text-[10px] font-black ${
                  isActive ? 'text-amber-400' : 'text-zinc-400'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          }

          const colors = tabColorMap[item.id] || { text: 'text-amber-400', dot: 'bg-amber-400', badge: 'bg-amber-500' };

          return (
            <button
              key={item.id}
              id={`bottom-nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-1 flex-col items-center py-1.5 transition-all duration-150 ${
                isActive
                  ? `${colors.text} scale-105`
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span className={`absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full ${colors.badge} px-1 text-[9px] font-black text-black`}>
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
                <span className={`mt-0.5 h-1 w-1 rounded-full ${colors.dot}`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
