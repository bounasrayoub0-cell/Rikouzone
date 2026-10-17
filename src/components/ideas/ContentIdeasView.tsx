import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ContentIdea, ContentAngle, IdeaPlatform, IdeaNiche } from '../../types';
import { contentIdeas } from '../../data/contentIdeas';
import { IdeaDetailModal } from './IdeaDetailModal';
import { generateDiverseIdea, getArabicAngleLabel } from '../../services/diverseIdeaGenerator';
import { 
  Search, 
  Lightbulb, 
  Copy, 
  Bookmark, 
  Sparkles, 
  Flame, 
  UserX, 
  SlidersHorizontal,
  ChevronDown,
  ShieldCheck,
  RefreshCw,
  Zap,
  BookOpen,
  AlertTriangle,
  BarChart3,
  Scale,
  ListOrdered,
  History,
  HelpCircle,
  TrendingUp,
  X,
  Check,
  Dice5
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

  const [allIdeasList, setAllIdeasList] = useState<ContentIdea[]>(contentIdeas);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [selectedAngle, setSelectedAngle] = useState<ContentAngle | 'all'>('all');
  const [facelessOnly, setFacelessOnly] = useState(false);
  
  // AI Generator Modal state
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false);
  const [genNiche, setGenNiche] = useState<string>('Making Money Online');
  const [genPlatform, setGenPlatform] = useState<string>('TikTok');
  const [genAngle, setGenAngle] = useState<ContentAngle | 'all'>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genSuccessMsg, setGenSuccessMsg] = useState<string | null>(null);

  const [activeIdeaModal, setActiveIdeaModal] = useState<ContentIdea | null>(() => {
    if (selectedIdeaId) {
      return allIdeasList.find((i) => i.id === selectedIdeaId) || null;
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
    'Productivity', 'Finance', 'Motivation', 'Websites', 'Apps', 'Tech Reviews',
    'Freelancing', 'Business', 'Personal Branding'
  ];

  const anglesList: { id: ContentAngle | 'all'; label: string; icon: any; color: string }[] = [
    { id: 'all', label: t.ideas.allAngles || 'جميع الزوايا والأساليب (8 أساليب)', icon: SlidersHorizontal, color: 'text-purple-400' },
    { id: 'tutorial', label: 'شروحات تعليمية (How-To)', icon: BookOpen, color: 'text-emerald-400' },
    { id: 'mistakes', label: 'أخطاء شائعة وتحذيرات', icon: AlertTriangle, color: 'text-rose-400' },
    { id: 'experiment', label: 'تجارب وتحديات عملية بالأرقام', icon: BarChart3, color: 'text-amber-400' },
    { id: 'comparison', label: 'مقارنات تقنية وتجارية', icon: Scale, color: 'text-cyan-400' },
    { id: 'listicle', label: 'قوائم وحيل ذكية سريعة', icon: ListOrdered, color: 'text-purple-400' },
    { id: 'story', label: 'قصص نجاح ودراسات حالة', icon: History, color: 'text-pink-400' },
    { id: 'problem_solving', label: 'حلول مباشرة لمشكلات الجمهور', icon: HelpCircle, color: 'text-teal-400' },
    { id: 'trends', label: 'اتجاهات وفرص رقمية صاعدة', icon: TrendingUp, color: 'text-orange-400' }
  ];

  const filteredIdeas = useMemo(() => {
    return allIdeasList.filter((idea) => {
      if (selectedPlatform !== 'all' && idea.platform !== selectedPlatform) {
        return false;
      }
      if (selectedNiche !== 'all' && idea.niche !== selectedNiche) {
        return false;
      }
      if (selectedAngle !== 'all' && idea.angle && idea.angle !== selectedAngle) {
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
  }, [allIdeasList, searchQuery, selectedPlatform, selectedNiche, selectedAngle, facelessOnly]);

  // Handler for generating a dynamic unique idea
  const handleGenerateFreshIdea = async () => {
    setIsGenerating(true);
    setGenSuccessMsg(null);
    try {
      const result = await generateDiverseIdea({
        niche: genNiche,
        platform: genPlatform,
        angle: genAngle,
        existingIdeas: allIdeasList,
        language
      });

      // Prepend the new distinct idea to the list
      setAllIdeasList((prev) => [result.idea, ...prev]);
      setGenSuccessMsg(t.ideas.freshIdeaGenerated || 'تم توليد فكرة فريدة وغير مكررة بنجاح!');
      
      // Auto-open or focus after brief delay
      setTimeout(() => {
        setIsGeneratorModalOpen(false);
        setActiveIdeaModal(result.idea);
        setGenSuccessMsg(null);
      }, 900);
    } catch (err) {
      console.error('Failed to generate fresh idea:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Pick a random unique idea
  const handlePickRandomIdea = () => {
    if (filteredIdeas.length === 0) return;
    const randomIdx = Math.floor(Math.random() * filteredIdeas.length);
    setActiveIdeaModal(filteredIdeas[randomIdx]);
  };

  const getAngleBadgeStyle = (angle?: ContentAngle) => {
    switch (angle) {
      case 'tutorial':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'mistakes':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'experiment':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'comparison':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'listicle':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'story':
        return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'problem_solving':
        return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      case 'trends':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-bold text-purple-400">
          <Flame className="h-4 w-4 text-purple-400" />
          <span>{t.ideas.libraryBadge}</span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-black text-white">
          {t.ideas.pageTitle}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
          {t.ideas.pageSubtitle}
        </p>

        {/* Anti-duplication Guarantee & Generator Action */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 text-xs font-bold text-emerald-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>{t.ideas.antiDuplicateBadge || 'نظام فحص البصمة ومنع التكرار مفعل 100%'}</span>
          </div>

          <button
            onClick={() => setIsGeneratorModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-4 py-2 text-xs font-black text-white shadow-lg shadow-purple-600/25 transition-all hover:scale-102 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>{t.ideas.generateAiIdeas || 'توليد فكرة ذكية فريدة (AI Generator)'}</span>
          </button>

          <button
            onClick={handlePickRandomIdea}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700/80 px-3.5 py-2 text-xs font-bold text-zinc-300 transition-all cursor-pointer"
            title={t.ideas.randomIdea}
          >
            <Dice5 className="h-4 w-4 text-purple-400" />
            <span>{t.ideas.randomIdea}</span>
          </button>
        </div>
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

        {/* Angle Filter Buttons (The 8 Diverse Formats) */}
        <div className="overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max justify-start sm:justify-center">
            {anglesList.map((ang) => {
              const isActive = selectedAngle === ang.id;
              const Icon = ang.icon;
              return (
                <button
                  key={ang.id}
                  onClick={() => setSelectedAngle(ang.id)}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40 ring-1 ring-purple-400'
                      : 'border border-zinc-800/90 bg-zinc-900/70 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : ang.color}`} />
                  <span>{ang.label}</span>
                </button>
              );
            })}
          </div>
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
                className={`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-200 text-zinc-950 font-black shadow-md'
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
              <option value="all">{t.ideas.allNiches}</option>
              {niches.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>

            {/* Faceless Toggle */}
            <button
              onClick={() => setFacelessOnly(!facelessOnly)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-bold transition-all cursor-pointer ${
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
            {`${t.income.showing} ${filteredIdeas.length} ${t.income.of} ${allIdeasList.length} ${t.nav.ideas}`}
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
          <p className="mt-1 text-sm text-zinc-400">
            لم نجد أفكاراً تطابق الفلاتر المحددة حالياً. يمكنك إعادة ضبط الفلاتر أو توليد فكرة جديدة.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedPlatform('all');
                setSelectedNiche('all');
                setSelectedAngle('all');
                setFacelessOnly(false);
              }}
              className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-500 transition-all cursor-pointer"
            >
              {t.common.resetFilters}
            </button>
            <button
              onClick={() => setIsGeneratorModalOpen(true)}
              className="rounded-xl border border-purple-500/50 bg-purple-500/10 px-4 py-2 text-xs font-bold text-purple-300 hover:bg-purple-500/20 transition-all cursor-pointer"
            >
              {t.ideas.generateAiIdeas || 'توليد فكرة جديدة'}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIdeas.map((idea) => {
            const { title, hook } = localizeIdea(idea);
            const saved = isSaved(idea.id);
            const isFresh = idea.id.startsWith('ai-gen-') || idea.id.startsWith('curated-gen-');
            const angleLabel = idea.arabicAngle || (idea.angle ? getArabicAngleLabel(idea.angle) : null);

            return (
              <div
                key={idea.id}
                className={`group relative flex flex-col justify-between rounded-3xl border bg-zinc-900/60 p-6 backdrop-blur-sm transition-all hover:bg-zinc-900/95 hover:shadow-xl ${
                  isFresh
                    ? 'border-purple-500/60 shadow-lg shadow-purple-900/20 ring-1 ring-purple-500/30'
                    : 'border-zinc-800/90 hover:border-purple-500/40 hover:shadow-purple-900/10'
                }`}
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
                      {isFresh && (
                        <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 px-2 py-0.5 text-[10px] font-black text-amber-300 border border-amber-500/30">
                          <Sparkles className="h-3 w-3 text-amber-400" />
                          جديد
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleSave(idea.id, 'idea')}
                      className="rounded-lg p-1 text-zinc-500 hover:text-purple-400 transition-colors cursor-pointer"
                      title={t.common.save}
                    >
                      <Bookmark className={`h-4 w-4 ${saved ? 'fill-purple-400 text-purple-400' : ''}`} />
                    </button>
                  </div>

                  {/* Angle Badge */}
                  {angleLabel && (
                    <div className="mt-3">
                      <span className={`inline-block rounded-md border px-2 py-0.5 text-[11px] font-bold ${getAngleBadgeStyle(idea.angle)}`}>
                        {angleLabel}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 
                    onClick={() => setActiveIdeaModal(idea)}
                    className="mt-2.5 text-base font-bold text-white group-hover:text-purple-300 transition-colors cursor-pointer line-clamp-2"
                  >
                    {title}
                  </h3>

                  {/* Unique Hook Box */}
                  <div className="mt-3 rounded-2xl border border-purple-500/25 bg-purple-500/5 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                        {t.ideas.openingHookTitle}
                      </span>
                      <button
                        onClick={() => onCopyText(hook, t.ideas.hookCopied)}
                        className="flex items-center gap-1 rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-200 hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
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
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span>{idea.duration}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="capitalize text-purple-400 font-medium">
                      {idea.viralPotential === 'explosive' ? t.common.explosive : t.common.high}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveIdeaModal(idea)}
                    className="rounded-xl border border-zinc-700 bg-zinc-800/70 px-3 py-1.5 text-xs font-bold text-zinc-200 hover:bg-purple-600 hover:text-white hover:border-transparent transition-all cursor-pointer"
                  >
                    {t.sections.viewScriptOutline}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive AI & Diverse Generator Modal */}
      {isGeneratorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div 
            className="relative w-full max-w-lg rounded-3xl border border-purple-500/40 bg-zinc-950 p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-purple-500/10 px-2.5 py-1 text-xs font-bold text-purple-400 border border-purple-500/20">
                  <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                  <span>مولد أفكار محتوى متنوع وغير مكرر</span>
                </div>
                <h2 className="mt-2 text-xl font-black text-white">
                  توليد فكرة محتوى جديدة فوراً
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  فحص البصمة المفعل يضمن عدم تكرار الخطافات أو العناوين مع أي فكرة سابقة.
                </p>
              </div>

              <button
                onClick={() => setIsGeneratorModalOpen(false)}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {/* Niche selector */}
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                  التخصص المستهدف (Niche):
                </label>
                <select
                  value={genNiche}
                  onChange={(e) => setGenNiche(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 px-3 text-xs text-white focus:border-purple-500 focus:outline-none"
                >
                  {niches.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              {/* Platform selector */}
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                  المنصة المستهدفة (Platform):
                </label>
                <select
                  value={genPlatform}
                  onChange={(e) => setGenPlatform(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 px-3 text-xs text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="TikTok">TikTok (تيك توك)</option>
                  <option value="Shorts">YouTube Shorts (شورتس)</option>
                  <option value="YouTube">YouTube Long (فيديو طويل)</option>
                  <option value="Reels">Instagram Reels (ريلز)</option>
                  <option value="Free Fire">Free Fire (فري فاير)</option>
                  <option value="Gaming">Gaming (ألعاب)</option>
                  <option value="Instagram">Instagram (انستغرام)</option>
                  <option value="Facebook">Facebook (فيسبوك)</option>
                </select>
              </div>

              {/* Angle selector */}
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                  الزاوية والأسلوب الإبداعي (Angle):
                </label>
                <select
                  value={genAngle}
                  onChange={(e) => setGenAngle(e.target.value as any)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 px-3 text-xs text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="all">متنوع ومبتكر تلقائياً (الذكاء يختار الأنسب)</option>
                  <option value="tutorial">شرح تعليمي خطوة بخطوة (Tutorial)</option>
                  <option value="mistakes">أخطاء شائعة وتحذيرات (Mistakes)</option>
                  <option value="experiment">تجارب وتحديات عملية بالأرقام (Experiment)</option>
                  <option value="comparison">مقارنات تجارية وتقنية (Comparison)</option>
                  <option value="listicle">قوائم سريعة وحيل ذكية (Listicle)</option>
                  <option value="story">قصص نجاح ودراسات حالة واقعية (Case Study)</option>
                  <option value="problem_solving">حل مباشر لمشكلة حقيقية (Problem Solving)</option>
                  <option value="trends">اتجاهات وفرص رقمية صاعدة (Trends)</option>
                </select>
              </div>

              {/* Success Notification */}
              {genSuccessMsg && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-center text-xs font-bold text-emerald-300 flex items-center justify-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>{genSuccessMsg}</span>
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={handleGenerateFreshIdea}
                disabled={isGenerating}
                className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 py-3 text-sm font-black text-white shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>جاري فحص البصمة وتوليد الفكرة الفريدة...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    <span>توليد فكرة فريدة وغير مكررة الآن</span>
                  </>
                )}
              </button>
            </div>
          </div>
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
