import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
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
  ArrowLeft
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
  const { language, setLanguage, t, isRTL } = useLanguage();
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
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-amber-500/30 via-orange-500/25 to-purple-600/20 blur-md opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-zinc-950 p-1 shadow-xl shadow-amber-500/15">
                <img
                  src="/file_00000000833881f4b8703f44bcd07500.png"
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
                  {isRTL ? 'صانع محتوى RikouZone' : 'RikouZone Creator'}
                </h1>
                <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
                  FREE TIER
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                {isRTL ? 'إدارة التفضيلات والمحتوى المحفوظ في المتصفح محلياً' : 'Local preferences & bookmarked blueprints'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 text-center min-w-24">
              <div className="text-lg font-black text-amber-400 font-sans">{savedPaths.length}</div>
              <div className="text-[10px] font-semibold text-zinc-400">{isRTL ? 'مسارات محفوظة' : 'Saved Paths'}</div>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 text-center min-w-24">
              <div className="text-lg font-black text-orange-400 font-sans">{savedIdeas.length}</div>
              <div className="text-[10px] font-semibold text-zinc-400">{isRTL ? 'أفكار محفوظة' : 'Saved Ideas'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Section: Language Choice */}
      <div className="mt-8 rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 backdrop-blur-xl">
        <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
          <Globe className="h-4 w-4 text-amber-400" />
          <span>{isRTL ? 'لغة الواجهة (Language Settings)' : 'Interface Language'}</span>
        </h2>
        <p className="mt-1 text-xs text-zinc-400">
          {isRTL ? 'اختر لغة العرض المفضلة. يتم حفظ الاختيار تلقائياً في جهازك.' : 'Select preferred display language. Persisted locally.'}
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'ar', label: 'العربية (Arabic RTL)', desc: 'اللغة الأساسية والافتراضية للمنصة' },
            { id: 'en', label: 'English (LTR)', desc: 'Global creator standard interface' },
            { id: 'fr', label: 'Français (LTR)', desc: 'Interface francophone pour créateurs' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setLanguage(item.id as 'ar' | 'en' | 'fr')}
              className={`rounded-2xl p-4 text-start border transition-all ${
                language === item.id
                  ? 'border-amber-500 bg-amber-500/10 text-white shadow-md shadow-amber-500/10'
                  : 'border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{item.label}</span>
                {language === item.id && <CheckCircle2 className="h-4 w-4 text-amber-400" />}
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Saved Blueprints & Bookmarks List */}
      <div className="mt-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-amber-400 fill-amber-400/20" />
            <span>{isRTL ? 'العناصر المحفوظة في المفضلة' : 'Saved Bookmarks'}</span>
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
              <span>{isRTL ? 'مسح الكل' : 'Clear all'}</span>
            </button>
          )}
        </div>

        {savedIds.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-10 text-center">
            <Bookmark className="mx-auto h-10 w-10 text-zinc-700" />
            <h3 className="mt-3 text-base font-bold text-white">
              {isRTL ? 'لا توجد عناصر محفوظة حتى الآن' : 'No saved items yet'}
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              {isRTL
                ? 'اضغط على أيقونة الإشارة المرجعية بجانب أي مسار دخل أو فكرة لحفظها هنا.'
                : 'Click the bookmark icon on any income path or content idea to save it here.'}
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => onNavigate('income')}
                className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400"
              >
                {isRTL ? 'استكشف طرق الربح' : 'Browse Paths'}
              </button>
              <button
                onClick={() => onNavigate('ideas')}
                className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-bold text-white hover:border-amber-500"
              >
                {isRTL ? 'أفكار المحتوى' : 'Browse Ideas'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Saved Income Paths */}
            {savedPaths.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" />
                  <span>{isRTL ? 'مسارات الدخل المحفوظة' : 'Saved Income Paths'} ({savedPaths.length})</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {savedPaths.map((p) => {
                    const title = language === 'ar' ? p.arabicTitle : language === 'fr' ? p.frenchTitle : p.title;

                    return (
                      <div
                        key={p.id}
                        className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 hover:border-amber-500/40 transition-all"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-amber-400 uppercase">{p.category}</span>
                          <h4 
                            onClick={() => onSelectPath(p)}
                            className="text-sm font-bold text-white hover:text-amber-300 cursor-pointer line-clamp-1"
                          >
                            {title}
                          </h4>
                          <span className="text-xs font-semibold text-zinc-400">{p.potentialMonthlyIncome || p.estimatedIncomeRange}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectPath(p)}
                            className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-200 hover:bg-amber-500 hover:text-black transition-all"
                          >
                            {isRTL ? 'عرض' : 'View'}
                          </button>
                          <button
                            onClick={() => onToggleSave(p.id, 'income')}
                            className="rounded-lg p-1.5 text-zinc-500 hover:text-rose-400"
                            title={isRTL ? 'إزالة من المفضلة' : 'Remove'}
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
                <h3 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4" />
                  <span>{isRTL ? 'أفكار المحتوى المحفوظة' : 'Saved Content Ideas'} ({savedIdeas.length})</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {savedIdeas.map((i) => {
                    const title = language === 'ar' ? i.arabicTitle : language === 'fr' ? i.frenchTitle : i.title;
                    const hook = language === 'ar' ? i.arabicHook : language === 'fr' ? i.frenchHook : i.hook;

                    return (
                      <div
                        key={i.id}
                        className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 hover:border-orange-500/40 transition-all"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-orange-400">{i.platform}</span>
                            <button
                              onClick={() => onToggleSave(i.id, 'idea')}
                              className="text-zinc-500 hover:text-rose-400 p-1"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <h4 
                            onClick={() => onSelectIdea(i)}
                            className="mt-1 text-sm font-bold text-white hover:text-orange-300 cursor-pointer line-clamp-1"
                          >
                            {title}
                          </h4>
                          <p className="mt-1 text-xs text-zinc-400 italic line-clamp-1">
                            "{hook}"
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                          <button
                            onClick={() => onCopyText(hook, isRTL ? 'تم نسخ الهوك!' : 'Hook copied!')}
                            className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:underline"
                          >
                            <Copy className="h-3 w-3" />
                            <span>{isRTL ? 'نسخ الهوك' : 'Copy Hook'}</span>
                          </button>
                          <button
                            onClick={() => onSelectIdea(i)}
                            className="rounded-lg bg-zinc-800 px-2.5 py-1 text-xs font-bold text-zinc-200 hover:bg-orange-500 hover:text-black transition-all"
                          >
                            {isRTL ? 'السكربت' : 'Script'}
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
