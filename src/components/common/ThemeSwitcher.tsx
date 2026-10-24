import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeSwitcherProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  className = '',
  showLabel = false 
}) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { t } = useLanguage();

  const titleText = isDark ? t.profile.lightMode : t.profile.darkMode;

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      type="button"
      aria-label={titleText}
      title={titleText}
      className={`group relative flex h-8.5 w-8.5 sm:h-9.5 sm:w-auto items-center justify-center gap-2 rounded-xl px-0 sm:px-3 text-sm font-semibold transition-all duration-200 border cursor-pointer shrink-0 ${
        isDark
          ? 'border-zinc-800 bg-[#101828] text-zinc-300 hover:border-[#2563EB]/50 hover:bg-zinc-800/80 hover:text-blue-400 active:scale-95 shadow-sm'
          : 'border-slate-200 bg-white text-slate-700 hover:border-[#2563EB] hover:bg-[#EAF1FF] hover:text-[#2563EB] active:scale-95 shadow-sm'
      } ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {isDark ? (
          <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="h-4 w-4 text-[#2563EB] transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-bold">
          {isDark ? t.profile.lightMode : t.profile.darkMode}
        </span>
      )}
    </button>
  );
};
