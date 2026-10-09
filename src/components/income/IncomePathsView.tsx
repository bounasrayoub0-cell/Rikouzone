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
  const { language, isRTL, t, localizePath } = useLanguage();
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

  const categories = useMemo(() => [
    { id: 'all', label: t.income.categoriesList.all },
    { id: 'Content Creation', label: t.income.categoriesList.contentCreation },
    { id: 'Freelancing', label: t.income.categoriesList.freelancing },
    { id: 'E-commerce', label: t.income.categoriesList.ecommerce },
    { id: 'Marketing', label: t.income.categoriesList.marketing },
    { id: 'Tech & AI', label: t.income.categoriesList.techAi },
    { id: 'Gaming', label: t.income.categoriesList.gaming },
    { id: 'Micro Services', label: t.income.categoriesList.microServices }
  ], [t]);

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
        const loc = localizePath(path);
        const inTitle = (loc.title || '').toLowerCase().includes(query) || (path.title || '').toLowerCase().includes(query) || (path.arabicTitle || '').toLowerCase().includes(query);
        const inDesc = (loc.shortDesc || '').toLowerCase().includes(query) || (path.shortDescription || path.description || '').toLowerCase().includes(query) || (path.arabicShortDescription || '').toLowerCase().includes(query);
        const inSkills = (path.requiredSkills || []).some(s => s.toLowerCase().includes(query));
        if (!inTitle && !inDesc && !inSkills) return false;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, localizePath]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400">
          <TrendingUp className="h-4 w-4" />
          <span>{t.income.categoryHeader}</span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-black text-white">
          {t.income.pageTitle}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
          {t.income.pageSubtitle}
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
            placeholder={t.income.searchPlaceholder}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 py-3 px-12 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute top-3.5 left-4 rtl:left-4 rtl:right-auto ltr:right-4 ltr:left-auto text-xs text-zinc-400 hover:text-white"
            >
              {t.common.clear}
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
                    ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                    : 'border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Secondary Difficulty Filter */}
        <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <SlidersHorizontal className="h-4 w-4" />
            <span>{t.income.difficultyLevel}</span>
            <div className="flex gap-1">
              {[
                { id: 'all', label: t.common.all },
                { id: 'beginner', label: t.common.beginner },
                { id: 'intermediate', label: t.common.intermediate },
                { id: 'advanced', label: t.common.advanced }
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedDifficulty(lvl.id)}
                  className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                    selectedDifficulty === lvl.id
                      ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/30'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-zinc-500 font-medium">
            {`${t.income.showing} ${filteredPaths.length} ${t.income.of} ${incomePaths.length} ${t.income.paths}`}
          </div>
        </div>

      </div>

      {/* Grid of Income Paths */}
      {filteredPaths.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900/30 p-12 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-zinc-600" />
          <h3 className="mt-4 text-lg font-bold text-white">
            {t.common.notFound}
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            {t.common.notFoundDesc}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="mt-4 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-black"
          >
            {t.common.resetFilters}
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPaths.map((path) => {
            const { title, shortDesc: desc, category } = localizePath(path);
            const saved = isSaved(path.id);

            return (
              <div
                key={path.id}
                id={`income-card-${path.id}`}
                className="group relative flex flex-col justify-between rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:bg-zinc-900/90 hover:shadow-xl hover:shadow-emerald-500/5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                        {category}
                      </span>
                      {[
                        'affiliate-marketing', 'tiktok-affiliate', 'youtube-monetization', 
                        'instagram-monetization', 'facebook-monetization', 'blogging', 
                        'social-media-management', 'ugc-content', 'video-editing', 
                        'copywriting', 'freelance-writing', 'seo-services', 
                        'graphic-design', 'thumbnail-design', 'web-development', 'app-development'
                      ].includes(path.id) && (
                        <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1 text-[11px] font-black text-emerald-300 border border-emerald-500/30">
                          🔥 {t.income.trackUpgradedBadge}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(path.id, 'income');
                      }}
                      className="rounded-lg p-1.5 text-zinc-500 hover:text-emerald-400 hover:bg-zinc-800/80 transition-colors"
                      title={saved ? t.income.saved : t.income.savePath}
                    >
                      <Bookmark className={`h-4 w-4 ${saved ? 'fill-emerald-400 text-emerald-400' : ''}`} />
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
                      } else if (path.id === 'seo-services' && onNavigate) {
                        onNavigate('seo-services');
                      } else if (path.id === 'freelance-writing' && onNavigate) {
                        onNavigate('freelance-writing');
                      } else if (path.id === 'copywriting' && onNavigate) {
                        onNavigate('copywriting');
                      } else if (path.id === 'video-editing' && onNavigate) {
                        onNavigate('video-editing');
                      } else if (path.id === 'graphic-design' && onNavigate) {
                        onNavigate('graphic-design');
                      } else if (path.id === 'thumbnail-design' && onNavigate) {
                        onNavigate('thumbnail-design');
                      } else if (path.id === 'web-development' && onNavigate) {
                        onNavigate('web-development');
                      } else if (path.id === 'app-development' && onNavigate) {
                        onNavigate('app-development');
                      } else if (path.id === 'social-media-management' && onNavigate) {
                        onNavigate('social-media-management');
                      } else if (path.id === 'ugc-content' && onNavigate) {
                        onNavigate('ugc-content');
                      } else {
                        setActiveModalPath(path);
                      }
                    }}
                    className="mt-4 text-lg font-bold text-white group-hover:text-emerald-300 transition-colors cursor-pointer"
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
                      <div className="text-zinc-500 font-medium">{t.income.monthlyPotential}</div>
                      <div className="text-sm font-black text-emerald-400 mt-0.5">{path.potentialMonthlyIncome || path.estimatedIncomeRange}</div>
                    </div>
                    <div className="rounded-xl bg-zinc-950/60 p-2.5">
                      <div className="text-zinc-500 font-medium">{t.income.learningTime}</div>
                      <div className="text-sm font-bold text-zinc-200 mt-0.5">{path.timeToLearn || (language === 'ar' || language === 'ary' ? path.arabicTimeToFirstIncome : path.timeToFirstIncome)}</div>
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
                      } else if (path.id === 'graphic-design' && onNavigate) {
                        onNavigate('graphic-design');
                      } else if (path.id === 'thumbnail-design' && onNavigate) {
                        onNavigate('thumbnail-design');
                      } else if (path.id === 'web-development' && onNavigate) {
                        onNavigate('web-development');
                      } else if (path.id === 'app-development' && onNavigate) {
                        onNavigate('app-development');
                      } else if (path.id === 'social-media-management' && onNavigate) {
                        onNavigate('social-media-management');
                      } else if (path.id === 'ugc-content' && onNavigate) {
                        onNavigate('ugc-content');
                      } else if (path.id === 'ai-content-services' && onNavigate) {
                        onNavigate('ai-content-services');
                      } else if (path.id === 'ai-automation-services' && onNavigate) {
                        onNavigate('ai-automation-services');
                      } else if (path.id === 'selling-digital-products' && onNavigate) {
                        onNavigate('selling-digital-products');
                      } else if (path.id === 'selling-templates' && onNavigate) {
                        onNavigate('selling-templates');
                      } else {
                        setActiveModalPath(path);
                      }
                    }}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      [
                        'affiliate-marketing', 'tiktok-affiliate', 'youtube-monetization', 
                        'instagram-monetization', 'facebook-monetization', 'blogging', 
                        'seo-services', 'freelance-writing', 'copywriting', 'video-editing', 
                        'graphic-design', 'thumbnail-design', 'web-development', 
                        'app-development', 'social-media-management', 'ugc-content',
                        'ai-content-services', 'ai-automation-services', 'selling-digital-products',
                        'selling-templates'
                      ].includes(path.id)
                        ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-md shadow-emerald-500/20 font-black'
                        : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-black group-hover:border-transparent'
                    }`}
                  >
                    <span>
                      {[
                        'affiliate-marketing', 'tiktok-affiliate', 'youtube-monetization', 
                        'instagram-monetization', 'facebook-monetization', 'blogging', 
                        'seo-services', 'freelance-writing', 'copywriting', 'video-editing', 
                        'graphic-design', 'thumbnail-design', 'web-development', 
                        'app-development', 'social-media-management', 'ugc-content',
                        'ai-content-services', 'ai-automation-services', 'selling-digital-products',
                        'selling-templates'
                      ].includes(path.id)
                        ? t.income.openFullCourse
                        : t.income.viewDetails}
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
        onNavigateToGraphicDesign={() => onNavigate && onNavigate('graphic-design')}
        onNavigateToThumbnailDesign={() => onNavigate && onNavigate('thumbnail-design')}
        onNavigateToWebDev={() => onNavigate && onNavigate('web-development')}
        onNavigateToAppDev={() => onNavigate && onNavigate('app-development')}
        onNavigateToSocialMedia={() => onNavigate && onNavigate('social-media-management')}
        onNavigateToUgc={() => onNavigate && onNavigate('ugc-content')}
        onNavigateToAiContent={() => onNavigate && onNavigate('ai-content-services')}
        onNavigateToAiAutomation={() => onNavigate && onNavigate('ai-automation-services')}
        onNavigateToDigitalProducts={() => onNavigate && onNavigate('selling-digital-products')}
        onNavigateToTemplates={() => onNavigate && onNavigate('selling-templates')}
      />

    </div>
  );
};
