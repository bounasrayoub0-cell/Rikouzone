import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTheme } from '../../theme/ThemeContext';
import { IncomePath, ContentIdea } from '../../types';
import { incomePaths } from '../../data/incomePaths';
import { contentIdeas } from '../../data/contentIdeas';
import { 
  User, 
  Bookmark, 
  Globe, 
  Trash2, 
  TrendingUp, 
  Lightbulb, 
  Copy, 
  Share2, 
  CheckCircle2,
  Sparkles,
  Flame,
  ArrowRight,
  ArrowLeft,
  Sun,
  Moon
} from 'lucide-react';

interface ProfileViewProps {
  savedIds: string[];
  onToggleSave: (id: string, type: 'income' | 'idea') => void;
  onClearAllSaved: () => void;
  onSelectPath: (path: IncomePath) => void;
  onSelectIdea: (idea: ContentIdea) => void;
  onCopyText: (text: string, label: string) => void;
  onNavigate: (tab: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  savedIds,
  onToggleSave,
  onClearAllSaved,
  onSelectPath,
  onSelectIdea,
  onCopyText,
  onNavigate
}) => {
  const { language, setLanguage, languages, t, isRTL, localizePath, localizeIdea } = useLanguage();
  const { theme, setTheme, isDark } = useTheme();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const savedPaths = incomePaths.filter((p) => savedIds.includes(p.id));
  const savedIdeas = contentIdeas.filter((i) => savedIds.includes(i.id));

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      
      {/* Profile Header */}
      <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Main Profile Avatar with Uploaded Image */}
            <div className="relative group flex-shrink-0">
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-sky-500/30 via-cyan-500/20 to-blue-600/20 blur-md opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-2xl border-2 border-sky-500/40 bg-zinc-950 p-1 shadow-xl shadow-sky-500/15">
                <img
                  src="/file_00000000b1d881f496a6612e6eef85ce.png"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/rz-hero-badge.png';
                  }}
                  alt="RikouZone Creator Avatar"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain rounded-xl select-none"
                  width={80}
                  height={80}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {t.profile.accountTitle || t.profile.pageTitle}
                </h1>
                <span className="rounded-full bg-sky-500/10 px-2.5 py-0.5 text-[10px] font-bold text-sky-400 border border-sky-500/20">
                  FREE TIER
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                {t.profile.accountDesc || t.profile.pageSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 text-center min-w-24">
              <div className="text-lg font-black text-sky-400 font-sans">{savedPaths.length}</div>
              <div className="text-[10px] font-semibold text-zinc-400">{t.profile.savedPathsCount || t.profile.savedPathsTab}</div>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 text-center min-w-24">
              <div className="text-lg font-black text-sky-400 font-sans">{savedIdeas.length}</div>
              <div className="text-[10px] font-semibold text-zinc-400">{t.profile.savedIdeasCount || t.profile.savedIdeasTab}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Section: Appearance Mode (Dark / Light) */}
      <div className="mt-8 rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 backdrop-blur-xl">
        <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
          {isDark ? <Moon className="h-4 w-4 text-sky-400" /> : <Sun className="h-4 w-4 text-sky-400" />}
          <span>{t.profile.appearanceMode}</span>
        </h2>
        <p className="mt-1 text-xs text-zinc-400">
          {t.profile.appearanceDesc}
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
          <button
            onClick={() => setTheme('dark')}
            className={`rounded-2xl p-4 text-start border transition-all cursor-pointer ${
              theme === 'dark'
                ? 'border-sky-500 bg-sky-500/10 text-white shadow-md shadow-sky-500/10 ring-1 ring-sky-500/40'
                : 'border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 text-sky-400">
                  <Moon className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-bold text-sm text-white block">
                    {t.profile.darkMode}
                  </span>
                  <span className="text-[11px] text-zinc-400 block">
                    {t.profile.darkModeDesc}
                  </span>
                </div>
              </div>
              {theme === 'dark' && <CheckCircle2 className="h-5 w-5 text-sky-400" />}
            </div>
          </button>

          <button
            onClick={() => setTheme('light')}
            className={`rounded-2xl p-4 text-start border transition-all cursor-pointer ${
              theme === 'light'
                ? 'border-sky-500 bg-sky-500/10 text-white shadow-md shadow-sky-500/10 ring-1 ring-sky-500/40'
                : 'border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 text-amber-400">
                  <Sun className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-bold text-sm text-white block">
                    {t.profile.lightMode}
                  </span>
                  <span className="text-[11px] text-zinc-400 block">
                    {t.profile.lightModeDesc}
                  </span>
                </div>
              </div>
              {theme === 'light' && <CheckCircle2 className="h-5 w-5 text-sky-400" />}
            </div>
          </button>
        </div>
      </div>

      {/* Preferences Section: Language Choice */}
      <div className="mt-8 rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 backdrop-blur-xl">
        <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
          <Globe className="h-4 w-4 text-sky-400" />
          <span>{t.profile.languageSection}</span>
        </h2>
        <p className="mt-1 text-xs text-zinc-400">
          {t.common.selectLanguage}
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {languages.map((item) => (
            <button
              key={item.code}
              id={`profile-lang-${item.code}`}
              onClick={() => setLanguage(item.code)}
              className={`rounded-2xl p-4 text-start border transition-all ${
                language === item.code
                  ? 'border-sky-500 bg-sky-500/10 text-white shadow-md shadow-sky-500/10 ring-1 ring-sky-500/40'
                  : 'border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl shrink-0" role="img" aria-label={item.name}>
                    {item.flag}
                  </span>
                  <div className="min-w-0">
                    <span className="font-bold text-sm text-white block truncate">{item.nativeName}</span>
                    <span className="text-[11px] text-zinc-400 truncate block">{item.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[9px] font-mono text-zinc-400 border border-zinc-700/50">
                    {item.badge}
                  </span>
                  {language === item.code && <CheckCircle2 className="h-4 w-4 text-sky-400" />}
                </div>
              </div>
              <p className="mt-2 text-[11px] text-zinc-400 line-clamp-1">{item.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Saved Blueprints & Bookmarks List */}
      <div className="mt-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-sky-400 fill-sky-400/20" />
            <span>{t.profile.pageTitle}</span>
            <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-300">
              {savedIds.length}
            </span>
          </h2>

          {savedIds.length > 0 && (
            <button
              onClick={onClearAllSaved}
              className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-semibold"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>{t.profile.clearAll}</span>
            </button>
          )}
        </div>

        {savedIds.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-10 text-center">
            <Bookmark className="mx-auto h-10 w-10 text-zinc-700" />
            <h3 className="mt-3 text-base font-bold text-white">
              {t.profile.noSavedTitle}
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              {t.profile.noSavedDesc}
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => onNavigate('income')}
                className="rounded-xl bg-sky-500 px-4 py-2 text-xs font-bold text-black hover:bg-sky-400 transition-all"
              >
                {t.income.browseAllPathsBtn || t.income.pageTitle}
              </button>
              <button
                onClick={() => onNavigate('ideas')}
                className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-bold text-white hover:border-sky-500 hover:text-sky-300 transition-all"
              >
                {t.ideas.pageTitle}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Saved Income Paths */}
            {savedPaths.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" />
                  <span>{t.profile.savedLearningPaths} ({savedPaths.length})</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {savedPaths.map((p) => {
                    const loc = localizePath(p);

                    return (
                      <div
                        key={p.id}
                        className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 hover:border-sky-500/40 transition-all"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-sky-400 uppercase">{p.category}</span>
                          <h4 
                            onClick={() => onSelectPath(p)}
                            className="text-sm font-bold text-white hover:text-sky-300 cursor-pointer line-clamp-1"
                          >
                            {loc.title}
                          </h4>
                          <span className="text-xs font-semibold text-zinc-400">{p.potentialMonthlyIncome || p.estimatedIncomeRange}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectPath(p)}
                            className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-200 hover:bg-sky-500 hover:text-black transition-all"
                          >
                            {t.income.viewDetails}
                          </button>
                          <button
                            onClick={() => onToggleSave(p.id, 'income')}
                            className="rounded-lg p-1.5 text-zinc-500 hover:text-rose-400 transition-colors"
                            title={t.common.remove}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Saved Content Ideas */}
            {savedIdeas.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4" />
                  <span>{t.profile.savedContentIdeas} ({savedIdeas.length})</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {savedIdeas.map((i) => {
                    const loc = localizeIdea(i);

                    return (
                      <div
                        key={i.id}
                        className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 hover:border-sky-500/40 transition-all"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-sky-400">{i.platform}</span>
                            <button
                              onClick={() => onToggleSave(i.id, 'idea')}
                              className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <h4 
                            onClick={() => onSelectIdea(i)}
                            className="mt-1 text-sm font-bold text-white hover:text-sky-300 cursor-pointer line-clamp-1"
                          >
                            {loc.title}
                          </h4>
                          <p className="mt-1 text-xs text-zinc-400 italic line-clamp-1">
                            "{loc.hook}"
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                          <button
                            onClick={() => onCopyText(loc.hook, t.ideas.hookCopied)}
                            className="flex items-center gap-1 text-[11px] font-bold text-sky-400 hover:underline"
                          >
                            <Copy className="h-3 w-3" />
                            <span>{t.ideas.copyHook}</span>
                          </button>
                          <button
                            onClick={() => onSelectIdea(i)}
                            className="rounded-lg bg-zinc-800 px-2.5 py-1 text-xs font-bold text-zinc-200 hover:bg-sky-500 hover:text-black transition-all"
                          >
                            {t.ideas.scriptOutline}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}
      </div>

    </div>
  );
};
