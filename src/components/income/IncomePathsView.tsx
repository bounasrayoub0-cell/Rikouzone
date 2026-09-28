import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { IncomePath, DifficultyLevel } from '../../types';
import { incomePaths } from '../../data/incomePaths';
import { IncomeDetailModal } from './IncomeDetailModal';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Bookmark, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Zap,
  SlidersHorizontal
} from 'lucide-react';

interface IncomePathsViewProps {
  onToggleSave: (id: string, type: 'income' | 'idea') => void;
  isSaved: (id: string) => boolean;
  onCopyText: (text: string, label: string) => void;
  selectedPathId?: string | null;
  onNavigate?: (tab: string) => void;
}

export const IncomePathsView: React.FC<IncomePathsViewProps> = ({
  onToggleSave,
  isSaved,
  onCopyText,
  selectedPathId,
  onNavigate
}) => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [activeModalPath, setActiveModalPath] = useState<IncomePath | null>(() => {
    if (selectedPathId) {
      return incomePaths.find((p) => p.id === selectedPathId) || null;
    }
    return null;
  });

  const categories = [
    { id: 'all', labelAr: 'الكل (35)', labelEn: 'All (35)' },
    { id: 'Content Creation', labelAr: 'صناعة المحتوى', labelEn: 'Content Creation' },
    { id: 'Freelancing', labelAr: 'العمل الحر والخدمات', labelEn: 'Freelancing' },
    { id: 'E-commerce', labelAr: 'التجارة الإلكترونية', labelEn: 'E-commerce' },
    { id: 'Marketing', labelAr: 'التسويق الرقمي', labelEn: 'Marketing' },
    { id: 'Tech & AI', labelAr: 'التقنية والذكاء الاصطناعي', labelEn: 'Tech & AI' },
    { id: 'Gaming', labelAr: 'الألعاب والجيمنج', labelEn: 'Gaming' },
    { id: 'Micro Services', labelAr: 'الخدمات المصغرة', labelEn: 'Micro Services' }
  ];

  const filteredPaths = useMemo(() => {
    return incomePaths.filter((path) => {
      // Category match
      if (selectedCategory !== 'all' && path.category !== selectedCategory) {
        return false;
      }
      // Difficulty match
      if (selectedDifficulty !== 'all' && path.difficulty !== selectedDifficulty) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = (path.title || '').toLowerCase().includes(query) || (path.arabicTitle || '').toLowerCase().includes(query);
        const inDesc = (path.shortDescription || path.description || '').toLowerCase().includes(query) || (path.arabicShortDescription || path.arabicDescription || '').toLowerCase().includes(query);
        const inSkills = (path.requiredSkills || []).some(s => s.toLowerCase().includes(query));
        if (!inTitle && !inDesc && !inSkills) return false;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400">
          <TrendingUp className="h-4 w-4" />
          <span>{isRTL ? 'دليل المسارات المالية الرقمية 2026' : '35 Digital Income Blueprints'}</span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-black text-white">
          {isRTL ? 'استكشف طرق الربح الحقيقية من الإنترنت' : 'Explore High-Yield Online Income Paths'}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
          {isRTL
            ? '35 مجالاً رقمياً واقعياً ومفصلاً بالكامل مع متطلبات البدء، الأرباح المتوقعة، وخطط العمل العملية بدون وعود وهمية.'
            : 'Detailed execution roadmaps, learning curves, startup budgets, and pitfalls to avoid for 35 distinct digital careers.'}
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="mt-8 space-y-4">
        
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute top-3.5 right-4 rtl:right-4 rtl:left-auto ltr:left-4 ltr:right-auto h-5 w-5 text-zinc-400" />
          <input
            id="income-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isRTL ? 'ابحث في المجالات (مثال: مونتاج، فري فاير، دروب شيبينغ، ذكاء اصطناعي)...' : 'Search paths (e.g. Editing, Free Fire, Dropshipping, AI)...'}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 py-3 px-12 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute top-3.5 left-4 rtl:left-4 rtl:right-auto ltr:right-4 ltr:left-auto text-xs text-zinc-400 hover:text-white"
            >
              {isRTL ? 'مسح' : 'Clear'}
            </button>
          )}
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`income-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {isRTL ? cat.labelAr : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Secondary Difficulty Filter */}
        <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <SlidersHorizontal className="h-4 w-4" />
            <span>{isRTL ? 'مستوى الصعوبة:' : 'Difficulty:'}</span>
            <div className="flex gap-1">
              {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedDifficulty(lvl)}
                  className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                    selectedDifficulty === lvl
                      ? 'bg-zinc-800 text-amber-400 border border-amber-500/30'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {lvl === 'all'
                    ? (isRTL ? 'الكل' : 'All')
                    : lvl === 'beginner'
                    ? (isRTL ? 'مبتدئ' : 'Beginner')
                    : lvl === 'intermediate'
                    ? (isRTL ? 'متوسط' : 'Intermediate')
                    : (isRTL ? 'متقدم' : 'Advanced')}
                </button>
              ))}
            </div>
          </div>

          <div className="text-zinc-500 font-medium">
            {isRTL
              ? `عرض ${filteredPaths.length} من أصل ${incomePaths.length} مسار`
              : `Showing ${filteredPaths.length} of ${incomePaths.length} paths`}
          </div>
        </div>

      </div>

      {/* Grid of Income Paths */}
      {filteredPaths.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900/30 p-12 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-zinc-600" />
          <h3 className="mt-4 text-lg font-bold text-white">
            {isRTL ? 'لم يتم العثور على نتائج مطابقة' : 'No matching paths found'}
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            {isRTL ? 'جرب البحث بكلمة أخرى أو إعادة تعيين الفلاتر.' : 'Try adjusting your search terms or clearing filters.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="mt-4 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black"
          >
            {isRTL ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPaths.map((path) => {
            const title = language === 'ar' ? path.arabicTitle : language === 'fr' ? path.frenchTitle : path.title;
            const desc = language === 'ar' ? (path.arabicShortDescription || path.arabicDescription) : language === 'fr' ? (path.frenchShortDescription || path.frenchDescription) : (path.shortDescription || path.description);
            const saved = isSaved(path.id);

            return (
              <div
                key={path.id}
                id={`income-card-${path.id}`}
                className="group relative flex flex-col justify-between rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 backdrop-blur-sm transition-all hover:border-amber-500/40 hover:bg-zinc-900/90 hover:shadow-xl hover:shadow-amber-500/5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
                        {path.category}
                      </span>
                      {path.id === 'affiliate-marketing' && (
                        <span className="rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-2.5 py-1 text-[11px] font-black text-amber-300 border border-amber-500/40 animate-pulse">
                          🔥 مسار تفاعلي (10 وحدات)
                        </span>
                      )}
                      {path.id === 'tiktok-affiliate' && (
                        <span className="rounded-lg bg-gradient-to-r from-rose-500/20 to-amber-500/20 px-2.5 py-1 text-[11px] font-black text-amber-300 border border-amber-500/40 animate-pulse">
                          🔥 مسار تفاعلي (10 أقسام)
                        </span>
                      )}
                      {path.id === 'youtube-monetization' && (
                        <span className="rounded-lg bg-gradient-to-r from-red-500/20 to-amber-500/20 px-2.5 py-1 text-[11px] font-black text-amber-300 border border-amber-500/40 animate-pulse">
                          🔥 مسار تفاعلي (10 أقسام)
                        </span>
                      )}
                      {path.id === 'instagram-monetization' && (
                        <span className="rounded-lg bg-gradient-to-r from-pink-500/20 to-amber-500/20 px-2.5 py-1 text-[11px] font-black text-amber-300 border border-amber-500/40 animate-pulse">
                          🔥 مسار تفاعلي (10 أقسام)
                        </span>
                      )}
                      {path.id === 'facebook-monetization' && (
                        <span className="rounded-lg bg-gradient-to-r from-blue-500/20 to-amber-500/20 px-2.5 py-1 text-[11px] font-black text-amber-300 border border-blue-500/40 animate-pulse">
                          🔥 مسار تفاعلي (7 مراحل)
                        </span>
                      )}
                      {path.id === 'blogging' && (
                        <span className="rounded-lg bg-gradient-to-r from-emerald-500/20 to-amber-500/20 px-2.5 py-1 text-[11px] font-black text-emerald-300 border border-emerald-500/40 animate-pulse">
                          🔥 مسار تفاعلي (10 مراحل)
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(path.id, 'income');
                      }}
                      className="rounded-lg p-1.5 text-zinc-500 hover:text-amber-400 hover:bg-zinc-800/80 transition-colors"
                      title={isRTL ? 'حفظ' : 'Bookmark'}
                    >
                      <Bookmark className={`h-4 w-4 ${saved ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>

                  <h3 
                    onClick={() => {
                      if (path.id === 'affiliate-marketing' && onNavigate) {
                        onNavigate('affiliate');
                      } else if (path.id === 'tiktok-affiliate' && onNavigate) {
                        onNavigate('tiktok-affiliate');
                      } else if (path.id === 'youtube-monetization' && onNavigate) {
                        onNavigate('youtube-monetization');
                      } else if (path.id === 'instagram-monetization' && onNavigate) {
                        onNavigate('instagram-monetization');
                      } else if (path.id === 'facebook-monetization' && onNavigate) {
                        onNavigate('facebook-monetization');
                      } else if (path.id === 'blogging' && onNavigate) {
                        onNavigate('blogging');
                      } else {
                        setActiveModalPath(path);
                      }
                    }}
                    className="mt-4 text-lg font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {title}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80">
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="rounded-xl bg-zinc-950/60 p-2.5">
                      <div className="text-zinc-500 font-medium">{isRTL ? 'الدخل الشهري' : 'Potential'}</div>
                      <div className="text-sm font-black text-amber-400 mt-0.5">{path.potentialMonthlyIncome || path.estimatedIncomeRange}</div>
                    </div>
                    <div className="rounded-xl bg-zinc-950/60 p-2.5">
                      <div className="text-zinc-500 font-medium">{isRTL ? 'وقت التعلم' : 'Learning'}</div>
                      <div className="text-sm font-bold text-zinc-200 mt-0.5">{path.timeToLearn || (isRTL ? path.arabicTimeToFirstIncome : path.timeToFirstIncome)}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (path.id === 'affiliate-marketing' && onNavigate) {
                        onNavigate('affiliate');
                      } else if (path.id === 'tiktok-affiliate' && onNavigate) {
                        onNavigate('tiktok-affiliate');
                      } else if (path.id === 'youtube-monetization' && onNavigate) {
                        onNavigate('youtube-monetization');
                      } else if (path.id === 'instagram-monetization' && onNavigate) {
                        onNavigate('instagram-monetization');
                      } else if (path.id === 'facebook-monetization' && onNavigate) {
                        onNavigate('facebook-monetization');
                      } else if (path.id === 'blogging' && onNavigate) {
                        onNavigate('blogging');
                      } else if (path.id === 'seo-services' && onNavigate) {
                        onNavigate('seo-services');
                      } else if (path.id === 'freelance-writing' && onNavigate) {
                        onNavigate('freelance-writing');
                      } else if (path.id === 'copywriting' && onNavigate) {
                        onNavigate('copywriting');
                      } else if (path.id === 'video-editing' && onNavigate) {
                        onNavigate('video-editing');
                      } else {
                        setActiveModalPath(path);
                      }
                    }}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      path.id === 'affiliate-marketing' || path.id === 'tiktok-affiliate' || path.id === 'youtube-monetization' || path.id === 'instagram-monetization' || path.id === 'facebook-monetization' || path.id === 'blogging' || path.id === 'seo-services' || path.id === 'freelance-writing' || path.id === 'copywriting' || path.id === 'video-editing'
                        ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-md shadow-amber-500/20 font-black'
                        : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 group-hover:bg-amber-500 group-hover:text-black group-hover:border-transparent'
                    }`}
                  >
                    <span>
                      {path.id === 'affiliate-marketing'
                        ? (isRTL ? 'افتح مسار التسويق بالعمولة الكامل 🚀' : 'Open Complete Affiliate Path 🚀')
                        : path.id === 'tiktok-affiliate'
                        ? (isRTL ? 'افتح مسار أفلييت تيك توك الكامل 🚀' : 'Open TikTok Affiliate Path 🚀')
                        : path.id === 'youtube-monetization'
                        ? (isRTL ? 'افتح مسار يوتيوب الكامل 🚀' : 'Open Complete YouTube Path 🚀')
                        : path.id === 'instagram-monetization'
                        ? (isRTL ? 'افتح مسار إنستغرام الكامل 🚀' : 'Open Complete Instagram Path 🚀')
                        : path.id === 'facebook-monetization'
                        ? (isRTL ? 'افتح مسار فيسبوك الكامل 🚀' : 'Open Complete Facebook Path 🚀')
                        : path.id === 'blogging'
                        ? (isRTL ? 'افتح مسار المدونات والسيو الكامل 🚀' : 'Open Complete Blogging & SEO Path 🚀')
                        : path.id === 'seo-services'
                        ? (isRTL ? 'افتح مسار خدمات السيو الكامل 🚀' : 'Open Complete SEO Services Path 🚀')
                        : path.id === 'freelance-writing'
                        ? (isRTL ? 'افتح مسار كتابة المحتوى الكامل 🚀' : 'Open Complete Freelance Writing Path 🚀')
                        : path.id === 'copywriting'
                        ? (isRTL ? 'افتح مسار الكوبي رايتنج الكامل 🚀' : 'Open Complete Copywriting Path 🚀')
                        : path.id === 'video-editing'
                        ? (isRTL ? 'افتح مسار مونتاج الفيديو الكامل 🚀' : 'Open Complete Video Editing Path 🚀')
                        : (isRTL ? 'عرض الدليل الشامل والخطوات' : 'Open Complete Blueprint')}
                    </span>
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Detail */}
      <IncomeDetailModal
        path={activeModalPath}
        onClose={() => setActiveModalPath(null)}
        onToggleSave={(id) => onToggleSave(id, 'income')}
        isSaved={activeModalPath ? isSaved(activeModalPath.id) : false}
        onCopyText={onCopyText}
        onNavigateToAffiliate={() => onNavigate && onNavigate('affiliate')}
        onNavigateToTikTokAffiliate={() => onNavigate && onNavigate('tiktok-affiliate')}
        onNavigateToYouTube={() => onNavigate && onNavigate('youtube-monetization')}
        onNavigateToInstagram={() => onNavigate && onNavigate('instagram-monetization')}
        onNavigateToFacebook={() => onNavigate && onNavigate('facebook-monetization')}
        onNavigateToBlogging={() => onNavigate && onNavigate('blogging')}
        onNavigateToSeoServices={() => onNavigate && onNavigate('seo-services')}
        onNavigateToWriting={() => onNavigate && onNavigate('freelance-writing')}
        onNavigateToCopywriting={() => onNavigate && onNavigate('copywriting')}
        onNavigateToVideoEditing={() => onNavigate && onNavigate('video-editing')}
      />

    </div>
  );
};
