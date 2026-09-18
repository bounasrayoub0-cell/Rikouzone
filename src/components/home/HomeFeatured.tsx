import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { IncomePath, ContentIdea } from '../../types';
import { incomePaths } from '../../data/incomePaths';
import { contentIdeas } from '../../data/contentIdeas';
import { 
  TrendingUp, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Copy, 
  Bookmark, 
  Calculator, 
  Layers, 
  Zap,
  Gamepad2,
  Check
} from 'lucide-react';

interface HomeFeaturedProps {
  onNavigate: (tab: string) => void;
  onSelectPath: (path: IncomePath) => void;
  onSelectIdea: (idea: ContentIdea) => void;
  onToggleSave: (id: string, type: 'income' | 'idea') => void;
  isSaved: (id: string) => boolean;
  onCopyText: (text: string, label: string) => void;
}

export const HomeFeatured: React.FC<HomeFeaturedProps> = ({
  onNavigate,
  onSelectPath,
  onSelectIdea,
  onToggleSave,
  isSaved,
  onCopyText
}) => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const featuredPaths = incomePaths.slice(0, 4);
  const featuredIdeas = contentIdeas.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Global Metrics Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5 text-center">
            
            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-4">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-sans">35+</div>
              <div className="mt-1 text-xs font-semibold text-zinc-400">
                {isRTL ? 'طرق ربح معتمدة' : 'Income Pathways'}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-4">
              <div className="text-2xl sm:text-3xl font-black text-orange-400 font-sans">160+</div>
              <div className="mt-1 text-xs font-semibold text-zinc-400">
                {isRTL ? 'فكرة محتوى وسكربت' : 'Viral Scripts & Hooks'}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-4">
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-sans">17</div>
              <div className="mt-1 text-xs font-semibold text-zinc-400">
                {isRTL ? 'حاسبة أرباح ونمو' : 'Precision Calculators'}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-4">
              <div className="text-2xl sm:text-3xl font-black text-amber-500 font-sans">15</div>
              <div className="mt-1 text-xs font-semibold text-zinc-400">
                {isRTL ? 'أداة Rikou AI' : 'AI Creator Tools'}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-4 lg:col-span-1 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex flex-col justify-center">
              <div className="text-xl sm:text-2xl font-black text-amber-400 font-sans">100%</div>
              <div className="mt-1 text-xs font-semibold text-zinc-300">
                {isRTL ? 'مجاني بدون اشتراك' : 'Free Community Suite'}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Featured Income Paths Spotlight */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <TrendingUp className="h-4 w-4" />
              <span>{isRTL ? 'مسارات الدخل المميزة' : 'Featured Income Paths'}</span>
            </div>
            <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
              {isRTL ? 'أكثر المجالات طلباً وربحية لعام 2026' : 'Top In-Demand Monetization Blueprints'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('income')}
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>{isRTL ? 'عرض جميع الطرق (35)' : 'Browse all 35 paths'}</span>
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredPaths.map((path) => {
            const title = language === 'ar' ? path.arabicTitle : language === 'fr' ? path.frenchTitle : path.title;
            const desc = language === 'ar' ? path.arabicDescription : language === 'fr' ? path.frenchDescription : path.description;
            const saved = isSaved(path.id);

            return (
              <div
                key={path.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all hover:border-amber-500/40 hover:bg-zinc-900/90"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold text-amber-400 border border-amber-500/20">
                      {path.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(path.id, 'income');
                      }}
                      className="rounded-lg p-1.5 text-zinc-500 hover:text-amber-400 hover:bg-zinc-800/80 transition-colors"
                      title={isRTL ? 'حفظ في المفضلة' : 'Save'}
                    >
                      <Bookmark className={`h-4 w-4 ${saved ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>

                  <h3 
                    onClick={() => onSelectPath(path)}
                    className="mt-3 text-base font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1"
                  >
                    {title}
                  </h3>
                  
                  <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-800/70">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">{isRTL ? 'الدخل الشهري:' : 'Potential:'}</span>
                    <span className="font-black text-amber-400">{path.potentialMonthlyIncome}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">{isRTL ? 'وقت التعلم:' : 'Learning Curve:'}</span>
                    <span className="font-semibold text-zinc-300">{path.timeToLearn}</span>
                  </div>

                  <button
                    onClick={() => onSelectPath(path)}
                    className="mt-3 w-full rounded-xl bg-zinc-800/80 py-2 text-xs font-bold text-zinc-200 hover:bg-amber-500 hover:text-black transition-all"
                  >
                    {isRTL ? 'عرض الدليل الكامل والخطوات' : 'View Full Blueprint'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. High-Impact Content Ideas Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/30 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
                <Flame className="h-4 w-4 text-orange-500" />
                <span>{isRTL ? 'أفكار وهندسة الخطافات الفيروسية' : 'Viral Hooks & Content Library'}</span>
              </div>
              <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                {isRTL ? 'جاهزة للنشر والتصوير فوراً' : 'Ready to Shoot & Publish'}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('ideas')}
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors"
            >
              <span>{isRTL ? 'تصفح كل الأفكار (160+)' : 'Browse 160+ ideas'}</span>
              <ArrowIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredIdeas.map((idea) => {
              const title = language === 'ar' ? idea.arabicTitle : language === 'fr' ? idea.frenchTitle : idea.title;
              const hook = language === 'ar' ? idea.arabicHook : language === 'fr' ? idea.frenchHook : idea.hook;

              return (
                <div
                  key={idea.id}
                  className="flex flex-col justify-between rounded-2xl border border-zinc-800/90 bg-zinc-950/70 p-5 hover:border-orange-500/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="rounded-md bg-zinc-800/80 px-2 py-0.5 font-bold text-zinc-300">
                        {idea.platform}
                      </span>
                      <span className="font-semibold text-orange-400">
                        {idea.niche}
                      </span>
                    </div>

                    <h3 className="mt-3 text-sm font-bold text-white line-clamp-2">
                      {title}
                    </h3>

                    {/* Hook Callout Box */}
                    <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          {isRTL ? '⚡ الهوك الافتتاحي (Hook):' : '⚡ Opening Hook:'}
                        </span>
                        <button
                          onClick={() => onCopyText(hook, isRTL ? 'تم نسخ الهوك!' : 'Hook copied!')}
                          className="flex items-center gap-1 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-300 hover:text-white"
                          title={isRTL ? 'نسخ الهوك' : 'Copy hook'}
                        >
                          <Copy className="h-3 w-3" />
                          <span>{isRTL ? 'نسخ' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="mt-1.5 text-xs font-semibold text-zinc-200 line-clamp-2 italic">
                        "{hook}"
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectIdea(idea)}
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-zinc-800 py-2 text-xs font-bold text-zinc-300 hover:border-amber-500 hover:text-amber-400 transition-all"
                  >
                    <span>{isRTL ? 'عرض تفاصيل السكربت والـ CTA' : 'View Script & Outline'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Special Free Fire & Gaming Creator Hub Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-r from-orange-950/40 via-zinc-900/80 to-zinc-950 p-6 sm:p-10 backdrop-blur-xl">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-3 py-1 text-xs font-bold text-orange-400 border border-orange-500/30">
                <Gamepad2 className="h-4 w-4" />
                <span>{isRTL ? 'قسم متخصص لصناع محتوى فري فاير والألعاب' : 'Free Fire & Gaming Creators'}</span>
              </div>
              <h3 className="mt-3 text-2xl sm:text-3xl font-black text-white">
                {isRTL ? 'احترف صناعة محتوى فري فاير وضاعف مشاهداتك' : 'Master Free Fire Content & Explode Your Views'}
              </h3>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                {isRTL
                  ? 'أسرار الوان تاب بالـ Beat Sync، إعدادات الحساسية DPI للهواتف الشعبية، رومات التحدي، وطريقة التقديم لبرنامج شراكة جارينا الرسمي (V-Badge).'
                  : 'Beat-sync montage secrets, DPI setups for budget phones, custom room showdowns, and official Garena partnership requirements.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate('creators')}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 text-sm font-bold text-black shadow-lg shadow-orange-500/20 hover:scale-105 transition-all"
              >
                <Flame className="h-4 w-4" />
                <span>{isRTL ? 'دخول دليل فري فاير' : 'Open Free Fire Guide'}</span>
              </button>
              <button
                onClick={() => onNavigate('ideas')}
                className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/80 px-5 py-3.5 text-sm font-bold text-zinc-200 hover:text-white transition-all"
              >
                <span>{isRTL ? 'أفكار فري فاير (20+)' : 'Free Fire Ideas'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
