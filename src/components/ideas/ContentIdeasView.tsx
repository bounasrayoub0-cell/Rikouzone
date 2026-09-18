import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ContentIdea, IdeaPlatform, IdeaNiche } from '../../types';
import { contentIdeas } from '../../data/contentIdeas';
import { IdeaDetailModal } from './IdeaDetailModal';
import { 
  Search, 
  Lightbulb, 
  Copy, 
  Bookmark, 
  Sparkles, 
  Flame, 
  UserX, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

interface ContentIdeasViewProps {
  onToggleSave: (id: string, type: 'income' | 'idea') => void;
  isSaved: (id: string) => boolean;
  onCopyText: (text: string, label: string) => void;
  selectedIdeaId?: string | null;
}

export const ContentIdeasView: React.FC<ContentIdeasViewProps> = ({
  onToggleSave,
  isSaved,
  onCopyText,
  selectedIdeaId
}) => {
  const { language, isRTL } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [facelessOnly, setFacelessOnly] = useState(false);
  const [activeIdeaModal, setActiveIdeaModal] = useState<ContentIdea | null>(() => {
    if (selectedIdeaId) {
      return contentIdeas.find((i) => i.id === selectedIdeaId) || null;
    }
    return null;
  });

  const platforms: { id: string; label: string }[] = [
    { id: 'all', label: isRTL ? 'كل المنصات' : 'All Platforms' },
    { id: 'TikTok', label: 'TikTok' },
    { id: 'Shorts', label: 'YouTube Shorts' },
    { id: 'YouTube', label: 'YouTube Long' },
    { id: 'Reels', label: 'Instagram Reels' },
    { id: 'Free Fire', label: 'Free Fire' },
    { id: 'Gaming', label: 'Gaming' },
    { id: 'Instagram', label: 'Instagram' },
    { id: 'Facebook', label: 'Facebook' }
  ];

  const niches: IdeaNiche[] = [
    'Making Money Online', 'Free Fire', 'Gaming', 'AI', 'Technology', 
    'Faceless Content', 'Content Creation', 'Affiliate Marketing', 'E-commerce',
    'Productivity', 'Finance', 'Motivation', 'Websites', 'Apps', 'Tech Reviews'
  ];

  const filteredIdeas = useMemo(() => {
    return contentIdeas.filter((idea) => {
      if (selectedPlatform !== 'all' && idea.platform !== selectedPlatform) {
        return false;
      }
      if (selectedNiche !== 'all' && idea.niche !== selectedNiche) {
        return false;
      }
      if (facelessOnly && !idea.facelessPossibility) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = idea.title.toLowerCase().includes(q) || idea.arabicTitle.toLowerCase().includes(q);
        const inHook = idea.hook.toLowerCase().includes(q) || idea.arabicHook.toLowerCase().includes(q);
        const inTags = idea.tags.some(t => t.toLowerCase().includes(q));
        if (!inTitle && !inHook && !inTags) return false;
      }
      return true;
    });
  }, [searchQuery, selectedPlatform, selectedNiche, facelessOnly]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-bold text-orange-400">
          <Flame className="h-4 w-4" />
          <span>{isRTL ? 'مكتبة تضم أكثر من 160 فكرة وسكربت' : '160+ Viral Content Ideas & Scripts'}</span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-black text-white">
          {isRTL ? 'مكتبة أفكار المحتوى الفيروسي والسكربتات' : 'Viral Content Ideas & Hook Engine'}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
          {isRTL
            ? 'خطافات افتتاحية صادمة، هياكل سيناريو جاهزة، ونداءات تفاعل ذكية مصممة خصيصاً لتفادي التمرير ورفع نسبة المشاهدة.'
            : 'Tested opening hooks, step-by-step video script formulas, and viral retention tactics across 8 creator platforms.'}
        </p>
      </div>

      {/* Filters Bar */}
      <div className="mt-8 space-y-4">
        
        {/* Search */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute top-3.5 right-4 rtl:right-4 rtl:left-auto ltr:left-4 ltr:right-auto h-5 w-5 text-zinc-400" />
          <input
            id="ideas-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isRTL ? 'ابحث في الأفكار والهوكات (مثال: فري فاير، ذكاء اصطناعي، بدون وجه)...' : 'Search ideas, hooks, or topics...'}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 py-3 px-12 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Platform Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {platforms.map((plat) => {
            const isActive = selectedPlatform === plat.id;
            return (
              <button
                key={plat.id}
                id={`plat-tab-${plat.id}`}
                onClick={() => setSelectedPlatform(plat.id)}
                className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md shadow-orange-500/20'
                    : 'border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {plat.label}
              </button>
            );
          })}
        </div>

        {/* Niche & Faceless Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 pt-4 text-xs">
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-zinc-400 font-semibold">{isRTL ? 'النيتش / التخصص:' : 'Niche:'}</span>
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="rounded-xl border border-zinc-800 bg-zinc-900 py-1.5 px-3 text-xs text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="all">{isRTL ? 'جميع التخصصات (23 نيتش)' : 'All Niches (23)'}</option>
              {niches.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>

            {/* Faceless Toggle */}
            <button
              onClick={() => setFacelessOnly(!facelessOnly)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-bold transition-all ${
                facelessOnly
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <UserX className="h-3.5 w-3.5" />
              <span>{isRTL ? 'بدون وجه فقط (Faceless)' : 'Faceless Only'}</span>
            </button>
          </div>

          <div className="text-zinc-500 font-medium">
            {isRTL
              ? `عرض ${filteredIdeas.length} من أصل ${contentIdeas.length} فكرة`
              : `Showing ${filteredIdeas.length} of ${contentIdeas.length} ideas`}
          </div>

        </div>

      </div>

      {/* Ideas Cards Grid */}
      {filteredIdeas.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900/30 p-12 text-center">
          <Lightbulb className="mx-auto h-10 w-10 text-zinc-600" />
          <h3 className="mt-4 text-lg font-bold text-white">
            {isRTL ? 'لم يتم العثور على أفكار مطابقة' : 'No ideas match your criteria'}
          </h3>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedPlatform('all');
              setSelectedNiche('all');
              setFacelessOnly(false);
            }}
            className="mt-4 rounded-xl bg-orange-500 px-4 py-2 text-xs font-bold text-black"
          >
            {isRTL ? 'إعادة ضبط كل الفلاتر' : 'Reset All Filters'}
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIdeas.map((idea) => {
            const title = language === 'ar' ? idea.arabicTitle : language === 'fr' ? idea.frenchTitle : idea.title;
            const hook = language === 'ar' ? idea.arabicHook : language === 'fr' ? idea.frenchHook : idea.hook;
            const saved = isSaved(idea.id);

            return (
              <div
                key={idea.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 backdrop-blur-sm transition-all hover:border-orange-500/40 hover:bg-zinc-900/90"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="rounded-lg bg-orange-500/10 px-2.5 py-0.5 font-bold text-orange-400 border border-orange-500/20">
                        {idea.platform}
                      </span>
                      <span className="rounded-lg bg-zinc-800 px-2 py-0.5 text-[11px] font-semibold text-zinc-300">
                        {idea.niche}
                      </span>
                      {idea.facelessPossibility && (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
                          <UserX className="h-3 w-3" />
                          Faceless
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleSave(idea.id, 'idea')}
                      className="rounded-lg p-1 text-zinc-500 hover:text-orange-400"
                      title={isRTL ? 'حفظ' : 'Bookmark'}
                    >
                      <Bookmark className={`h-4 w-4 ${saved ? 'fill-orange-400 text-orange-400' : ''}`} />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => setActiveIdeaModal(idea)}
                    className="mt-3 text-base font-bold text-white group-hover:text-orange-300 transition-colors cursor-pointer line-clamp-2"
                  >
                    {title}
                  </h3>

                  {/* Hook Box */}
                  <div className="mt-3 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        {isRTL ? '⚡ الهوك الافتتاحي (Hook):' : '⚡ Hook:'}
                      </span>
                      <button
                        onClick={() => onCopyText(hook, isRTL ? 'تم نسخ الهوك!' : 'Hook copied!')}
                        className="flex items-center gap-1 rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-200 hover:bg-amber-500 hover:text-black transition-all"
                        title={isRTL ? 'نسخ الهوك' : 'Copy'}
                      >
                        <Copy className="h-3 w-3" />
                        <span>{isRTL ? 'نسخ' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-zinc-200 line-clamp-2 italic">
                      "{hook}"
                    </p>
                  </div>
                </div>

                {/* Footer Meta & Button */}
                <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span>{idea.duration}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="capitalize text-orange-400 font-medium">
                      {idea.viralPotential === 'explosive' ? (isRTL ? 'انتشار ناري 🔥' : 'Explosive') : (isRTL ? 'عالي جداً' : 'Very High')}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveIdeaModal(idea)}
                    className="rounded-xl border border-zinc-700 bg-zinc-800/70 px-3 py-1.5 text-xs font-bold text-zinc-200 hover:bg-orange-500 hover:text-black hover:border-transparent transition-all"
                  >
                    {isRTL ? 'السكربت والـ CTA' : 'Script & CTA'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Idea Modal */}
      <IdeaDetailModal
        idea={activeIdeaModal}
        onClose={() => setActiveIdeaModal(null)}
        onToggleSave={(id) => onToggleSave(id, 'idea')}
        isSaved={activeIdeaModal ? isSaved(activeIdeaModal.id) : false}
        onCopyText={onCopyText}
      />

    </div>
  );
};
