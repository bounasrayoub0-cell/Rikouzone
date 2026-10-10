import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  Home, 
  TrendingUp, 
  Lightbulb, 
  Trophy, 
  Sparkles,
  UserCircle 
} from 'lucide-react';

interface BottomNavigationProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  savedCount?: number;
}

// Multi-language translations for Challenges and Profile tabs
const challengesLabels: Record<string, string> = {
  ar: 'التحديات',
  ary: 'التحديات',
  en: 'Challenges',
  fr: 'Défis',
  es: 'Desafíos',
  de: 'Challenges',
  it: 'Sfide',
  pt: 'Desafios',
  zh: '挑战'
};

const profileLabels: Record<string, string> = {
  ar: 'حسابي',
  ary: 'حسابي',
  en: 'Profile',
  fr: 'Profil',
  es: 'Perfil',
  de: 'Profil',
  it: 'Profilo',
  pt: 'Perfil',
  zh: '个人中心'
};

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onNavigate
}) => {
  const { t, language } = useLanguage();
  const challengesLabel = challengesLabels[language] || 'التحديات';
  const profileLabel = profileLabels[language] || t.nav.profile || 'Profile';

  // Navigation Items in bottom bar:
  // 1. الرئيسية (home)
  // 2. مسارات التعلم (income)
  // 3. Rikou AI (ai) - Centerpiece
  // 4. أفكار المحتوى (ideas)
  // 5. التحديات (challenges)
  // 6. حسابي / الملف الشخصي (profile) - Moved from sidebar as requested
  const navItems = [
    { 
      id: 'home', 
      label: t.nav.home, 
      icon: Home,
      activeColor: 'text-amber-400',
      activeDot: 'bg-amber-400'
    },
    { 
      id: 'income', 
      label: t.nav.income, 
      icon: TrendingUp,
      activeColor: 'text-amber-400',
      activeDot: 'bg-amber-400'
    },
    { 
      id: 'ai', 
      label: t.nav.ai, 
      icon: Sparkles,
      isSpecial: true,
      activeColor: 'text-amber-400',
      activeDot: 'bg-amber-400'
    },
    { 
      id: 'ideas', 
      label: t.nav.ideas, 
      icon: Lightbulb,
      activeColor: 'text-amber-400',
      activeDot: 'bg-amber-400'
    },
    { 
      id: 'challenges', 
      label: challengesLabel, 
      icon: Trophy,
      activeColor: 'text-amber-400',
      activeDot: 'bg-amber-400'
    },
    {
      id: 'profile',
      label: profileLabel,
      icon: UserCircle,
      activeColor: 'text-amber-400',
      activeDot: 'bg-amber-400'
    }
  ];

  return (
    <nav 
      aria-label="Bottom Navigation" 
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-zinc-800/90 bg-zinc-950/95 backdrop-blur-2xl px-1 py-1 safe-area-bottom shadow-2xl shadow-black"
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                id={`bottom-nav-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className="relative -top-2 flex flex-col items-center group cursor-pointer px-1 shrink-0"
              >
                <div className={`relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 shadow-md shadow-amber-900/40 ${
                  isActive ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-zinc-950 scale-105 shadow-amber-500/40' : 'hover:scale-105'
                } transition-all duration-200`}>
                  <img
                    src="/file_00000000790481f48f32726a32633267.png"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/rikou-ai-avatar.png';
                    }}
                    alt="Rikou AI Avatar"
                    className="h-full w-full rounded-full object-cover select-none bg-zinc-950"
                    width={44}
                    height={44}
                  />
                </div>
                <span className={`mt-0.5 text-[9px] sm:text-[10px] font-black tracking-tight leading-none ${
                  isActive ? 'text-amber-400' : 'text-zinc-400'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              id={`bottom-nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-1 flex-col items-center justify-center py-1 px-0.5 transition-all duration-150 cursor-pointer min-w-0 ${
                isActive
                  ? `${item.activeColor} scale-105`
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className="relative">
                <Icon className={`h-4.5 w-4.5 sm:h-5 sm:w-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className={`mt-0.5 text-[9px] sm:text-[10px] tracking-tight leading-tight text-center truncate max-w-[54px] sm:max-w-[64px] block ${
                isActive ? 'font-black' : 'font-medium'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <span className={`mt-0.5 h-1 w-1 rounded-full ${item.activeDot}`} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
