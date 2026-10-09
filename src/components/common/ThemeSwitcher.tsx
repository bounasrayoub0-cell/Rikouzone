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
      className={`group relative flex h-10 items-center justify-center gap-2 rounded-xl px-2.5 sm:px-3 text-sm font-semibold transition-all duration-200 border cursor-pointer ${
        isDark
          ? 'border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-amber-500/50 hover:bg-zinc-800/80 hover:text-amber-400 active:scale-95 shadow-sm'
          : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:bg-slate-50 hover:text-indigo-600 active:scale-95 shadow-sm shadow-slate-200/50'
      } ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {isDark ? (
          <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="h-4 w-4 text-indigo-600 transition-transform duration-300 group-hover:-rotate-12" />
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
