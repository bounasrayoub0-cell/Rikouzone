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
  const { language, isRTL, t, localizeIdea } = useLanguage();

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
    { id: 'all', label: t.ideas.allPlatforms },
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
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-bold text-purple-400">
          <Flame className="h-4 w-4" />
          <span>{t.ideas.libraryBadge}</span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-black text-white">
          {t.ideas.pageTitle}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
          {t.ideas.pageSubtitle}
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
            placeholder={t.ideas.searchPlaceholder}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 py-3 px-12 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
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
            <span className="text-zinc-400 font-semibold">{t.income.categoryHeader}:</span>
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="rounded-xl border border-zinc-800 bg-zinc-900 py-1.5 px-3 text-xs text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="all">{t.ideas.allNiches} (23)</option>
              {niches.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>

            {/* Faceless Toggle */}
            <button
              onClick={() => setFacelessOnly(!facelessOnly)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-bold transition-all ${
                facelessOnly
                  ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <UserX className="h-3.5 w-3.5" />
              <span>{t.income.facelessOnly}</span>
            </button>
          </div>

          <div className="text-zinc-500 font-medium">
            {`${t.income.showing} ${filteredIdeas.length} ${t.income.of} ${contentIdeas.length} ${t.nav.ideas}`}
          </div>

        </div>

      </div>

      {/* Ideas Cards Grid */}
      {filteredIdeas.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900/30 p-12 text-center">
          <Lightbulb className="mx-auto h-10 w-10 text-zinc-600" />
          <h3 className="mt-4 text-lg font-bold text-white">
            {t.common.notFound}
          </h3>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedPlatform('all');
              setSelectedNiche('all');
              setFacelessOnly(false);
            }}
            className="mt-4 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-500 transition-all"
          >
            {t.common.resetFilters}
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIdeas.map((idea) => {
            const { title, hook } = localizeIdea(idea);
            const saved = isSaved(idea.id);

            return (
              <div
                key={idea.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 backdrop-blur-sm transition-all hover:border-purple-500/40 hover:bg-zinc-900/90 hover:shadow-xl hover:shadow-purple-900/10"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="rounded-lg bg-purple-500/10 px-2.5 py-0.5 font-bold text-purple-400 border border-purple-500/20">
                        {idea.platform}
                      </span>
                      <span className="rounded-lg bg-zinc-800 px-2 py-0.5 text-[11px] font-semibold text-zinc-300">
                        {idea.niche}
                      </span>
                      {idea.facelessPossibility && (
                        <span className="inline-flex items-center gap-1 rounded bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-bold text-purple-300 border border-purple-500/20">
                          <UserX className="h-3 w-3" />
                          Faceless
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleSave(idea.id, 'idea')}
                      className="rounded-lg p-1 text-zinc-500 hover:text-purple-400 transition-colors"
                      title={t.common.save}
                    >
                      <Bookmark className={`h-4 w-4 ${saved ? 'fill-purple-400 text-purple-400' : ''}`} />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => setActiveIdeaModal(idea)}
                    className="mt-3 text-base font-bold text-white group-hover:text-purple-300 transition-colors cursor-pointer line-clamp-2"
                  >
                    {title}
                  </h3>

                  {/* Hook Box */}
                  <div className="mt-3 rounded-2xl border border-purple-500/25 bg-purple-500/5 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                        {t.ideas.openingHookTitle}
                      </span>
                      <button
                        onClick={() => onCopyText(hook, t.ideas.hookCopied)}
                        className="flex items-center gap-1 rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-200 hover:bg-purple-600 hover:text-white transition-all"
                        title={t.ideas.copyHook}
                      >
                        <Copy className="h-3 w-3" />
                        <span>{t.common.copy}</span>
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
                    <span className="capitalize text-purple-400 font-medium">
                      {idea.viralPotential === 'explosive' ? t.common.explosive : t.common.high}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveIdeaModal(idea)}
                    className="rounded-xl border border-zinc-700 bg-zinc-800/70 px-3 py-1.5 text-xs font-bold text-zinc-200 hover:bg-purple-600 hover:text-white hover:border-transparent transition-all"
                  >
                    {t.sections.viewScriptOutline}
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
