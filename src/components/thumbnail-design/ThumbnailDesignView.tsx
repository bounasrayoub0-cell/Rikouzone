import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Target, 
  Layers, 
  Smartphone, 
  Palette, 
  Type, 
  Smile, 
  Sliders, 
  AlertTriangle, 
  Send, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Wand2, 
  Eye, 
  Flame, 
  TrendingUp, 
  Monitor, 
  HelpCircle, 
  ShieldCheck, 
  RefreshCw,
  Zap,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  thumbnailFundamentals, 
  professionalDesignRules, 
  beforeAfterExamples, 
  thumbnailTypesList, 
  designWorkflowSteps, 
  thumbnailToolsList, 
  thumbnailTemplatesList, 
  thumbnailChecklistItems, 
  portfolioFreelanceGuide, 
  coldOutreachTemplate, 
  sevenDayThumbnailChallenge, 
  ideaGeneratorPresets,
  ThumbnailTypeItem
} from '../../data/thumbnailDesignData';

interface ThumbnailDesignViewProps {
  onNavigate?: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

export const ThumbnailDesignView: React.FC<ThumbnailDesignViewProps> = ({ onNavigate, onCopyText }) => {
  const { isRTL } = useLanguage();
  const ArrowBackIcon = isRTL ? ArrowRight : ArrowLeft;

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<string>('fundamentals');

  // Interactive Checklist State (persisted to localStorage)
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('rz_thumb_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Interactive 7-Day Challenge State (persisted to localStorage)
  const [challengeState, setChallengeState] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('rz_thumb_challenge');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Interactive Thumbnail Idea Generator State
  const [generatorTitle, setGeneratorTitle] = useState<string>('');
  const [generatorCategory, setGeneratorCategory] = useState<string>('tech');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<Array<{
    angle: string;
    textOnThumbnail: string;
    focalElement: string;
    background: string;
    expression: string;
  }>>(() => {
    const techPreset = ideaGeneratorPresets.find(p => p.category === 'tech');
    return techPreset ? techPreset.ideas : ideaGeneratorPresets[0].ideas;
  });

  // Accordion open states
  const [openTypeItem, setOpenTypeItem] = useState<string>('educational');
  const [openWorkflowStep, setOpenWorkflowStep] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Copy helper with animated feedback
  const handleLocalCopy = (text: string, id: string, label: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  // Toggle Checklist
  const toggleChecklistItem = (id: string) => {
    setChecklistState(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('rz_thumb_checklist', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save checklist:', e);
      }
      return updated;
    });
  };

  const resetChecklist = () => {
    setChecklistState({});
    try {
      localStorage.removeItem('rz_thumb_checklist');
    } catch (e) {
      console.warn('Failed to reset checklist:', e);
    }
  };

  // Toggle Challenge Day
  const toggleChallengeDay = (day: number) => {
    setChallengeState(prev => {
      const updated = { ...prev, [day]: !prev[day] };
      try {
        localStorage.setItem('rz_thumb_challenge', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save challenge:', e);
      }
      return updated;
    });
  };

  const resetChallenge = () => {
    setChallengeState({});
    try {
      localStorage.removeItem('rz_thumb_challenge');
    } catch (e) {
      console.warn('Failed to reset challenge:', e);
    }
  };

  // Run Generator
  const handleGenerateIdeas = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const lower = generatorTitle.toLowerCase();
      let matchedCategory = generatorCategory;

      if (generatorTitle.trim()) {
        for (const preset of ideaGeneratorPresets) {
          if (preset.keywords.some(kw => lower.includes(kw))) {
            matchedCategory = preset.category;
            break;
          }
        }
      }

      const preset = ideaGeneratorPresets.find(p => p.category === matchedCategory) || ideaGeneratorPresets[0];
      
      // Adapt ideas if custom title is given
      const customizedIdeas = preset.ideas.map((idea, idx) => {
        let customText = idea.textOnThumbnail;
        if (generatorTitle.trim()) {
          const words = generatorTitle.trim().split(' ');
          if (idx === 0) customText = `${words.slice(0, 2).join(' ')}؟! ⚠️`;
          if (idx === 1) customText = `السر في ${words[0] || 'الفيديو'} 🔑`;
          if (idx === 2) customText = `في 10 دقائق ⏱️`;
        }
        return {
          ...idea,
          textOnThumbnail: customText
        };
      });

      setGeneratedIdeas(customizedIdeas);
      setIsGenerating(false);
    }, 400);
  };

  // Calculations for stats
  const completedChecklistCount = thumbnailChecklistItems.filter(item => checklistState[item.id]).length;
  const checklistPercentage = Math.round((completedChecklistCount / thumbnailChecklistItems.length) * 100);

  const completedDaysCount = sevenDayThumbnailChallenge.filter(d => challengeState[d.day]).length;
  const challengePercentage = Math.round((completedDaysCount / 7) * 100);

  // Tabs Configuration
  const tabs = [
    { id: 'fundamentals', label: '1. أساسيات Thumbnail', icon: Target },
    { id: 'rules', label: '2. قواعد التصميم', icon: Palette },
    { id: 'types', label: '3. أنواع Thumbnails', icon: Layers },
    { id: 'workflow', label: '4. التصميم من الصفر', icon: Sliders },
    { id: 'tools', label: '5. أدوات التصميم', icon: Monitor },
    { id: 'templates', label: '6. قوالب جاهزة', icon: Copy },
    { id: 'generator', label: '7. مولّد الأفكار', icon: Wand2 },
    { id: 'checklist', label: '8. الـ Checklist', icon: CheckCircle2 },
    { id: 'freelancing', label: '9. البورتفوليو والعملاء', icon: Send },
    { id: 'challenge', label: '10. تحدي 7 أيام', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20 selection:bg-amber-500 selection:text-black">
      {/* 1. Header / Breadcrumb */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-400">
            <button 
              onClick={() => onNavigate && onNavigate('income')}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowBackIcon className="h-4 w-4" />
              <span>مسارات الدخل</span>
            </button>
            <span className="text-zinc-600">/</span>
            <span className="text-amber-400 font-bold">تصميم الصور المصغرة لليوتيوب (Thumbnail Design)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-black text-amber-400">
              <Flame className="h-3.5 w-3.5" />
              <span>معدل نفاذ المشاهدات 80%</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="relative overflow-hidden border-b border-zinc-800/80 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 pt-10 pb-12">
        <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-black text-amber-300 mb-4 shadow-sm shadow-amber-500/10">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>الدليل الشامل والمطبق للمبتدئين | 10 مراحل تفاعلية</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight sm:leading-tight">
              تصميم الصور المصغرة لليوتيوب{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                (YouTube Thumbnail Design)
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              الصورة المصغرة هي نصف نجاح الفيديو على يوتيوب. تعلم هندسة النقر (Click-Through Rate - CTR)، قواعد التباين، اختيار الألوان، استخدام القوالب الجاهزة، بناء بورتفوليو احترافي بدون عملاء سابقين، وإغلاق صفقات عمل مستمرة مع صناع المحتوى.
            </p>

            {/* Quick KPI stats */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3.5 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-amber-400">4% - 12%</div>
                <div className="text-[11px] font-semibold text-zinc-400 mt-0.5">معدل CTR المستهدف</div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3.5 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-orange-400">16:9</div>
                <div className="text-[11px] font-semibold text-zinc-400 mt-0.5">الأبعاد القياسية 1280x720</div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3.5 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-amber-300">&lt; 2 MB</div>
                <div className="text-[11px] font-semibold text-zinc-400 mt-0.5">الحد الأقصى لحجم الملف</div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3.5 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">$15 - $100</div>
                <div className="text-[11px] font-semibold text-zinc-400 mt-0.5">عائد الصورة الواحدة</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Sticky Navigation Tabs (Responsive) */}
      <div className="sticky top-[118px] z-20 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none no-scrollbar">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/25 scale-[1.02]'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Tab Content Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">

        {/* ============================================================== */}
        {/* TAB 1: أساسيات Thumbnail Design */}
        {/* ============================================================== */}
        {activeTab === 'fundamentals' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* 1.1 What is a Thumbnail */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-amber-400 mb-2">
                <Target className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">المدخل الأساسي</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {thumbnailFundamentals.whatIsThumbnail.title}
              </h2>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                {thumbnailFundamentals.whatIsThumbnail.summary}
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {thumbnailFundamentals.whatIsThumbnail.points.map((pt, idx) => (
                  <div key={idx} className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-5 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-black text-amber-400 border border-amber-500/20 mb-3">
                        0{idx + 1}
                      </div>
                      <h3 className="text-sm font-black text-white">{pt.title}</h3>
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 1.2 CTR & The YouTube Algorithm */}
            <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-500/5 via-zinc-900/40 to-zinc-900/60 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">سيكولوجية الخوارزمية</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {thumbnailFundamentals.ctrRelationship.title}
              </h2>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                {thumbnailFundamentals.ctrRelationship.summary}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {thumbnailFundamentals.ctrRelationship.metrics.map((m, idx) => (
                  <div key={idx} className="rounded-2xl border border-amber-500/20 bg-zinc-950/80 p-5">
                    <div className="text-xs font-bold text-zinc-400">{m.label}</div>
                    <div className="mt-2 text-lg sm:text-xl font-black text-amber-400 font-sans">{m.value}</div>
                    <p className="mt-2 text-xs text-zinc-300 leading-relaxed">{m.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-start gap-3">
                <Zap className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm font-semibold text-emerald-200 leading-relaxed">
                  {thumbnailFundamentals.ctrRelationship.whyItMatters}
                </p>
              </div>
            </div>

            {/* 1.3 Regular vs Shorts */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-black text-white mb-4">
                {thumbnailFundamentals.regularVsShorts.title}
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-400">
                      <th className="pb-3 font-black text-zinc-300">وجه المقارنة</th>
                      <th className="pb-3 font-black text-amber-400">الفيديوهات الطويلة (Regular)</th>
                      <th className="pb-3 font-black text-orange-400">فيديوهات Shorts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {thumbnailFundamentals.regularVsShorts.table.map((row, idx) => (
                      <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="py-3.5 font-bold text-zinc-300">{row.aspect}</td>
                        <td className="py-3.5 text-zinc-300">{row.regular}</td>
                        <td className="py-3.5 text-zinc-400">{row.shorts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 1.4 Common Mistakes */}
            <div className="rounded-3xl border border-red-500/20 bg-zinc-900/40 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-red-400 mb-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">تحذيرات قاتلة للـ CTR</span>
              </div>
              <h3 className="text-xl font-black text-white mb-6">
                أهم الأخطاء الشائعة التي تدمر نسبة النقر في اليوتيوب
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {thumbnailFundamentals.commonMistakes.map((mistake, idx) => (
                  <div key={idx} className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-5">
                    <div className="flex items-center gap-2 text-red-400 text-sm font-black mb-2">
                      <span>❌ {mistake.title}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                      {mistake.description}
                    </p>
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-300 font-semibold flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{mistake.solution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: قواعد التصميم الاحترافي */}
        {/* ============================================================== */}
        {activeTab === 'rules' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Palette className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">المعايير الستة الكبرى</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                قواعد التصميم الاحترافي لصور مصغرة تخطف الأنظار
              </h2>
              <p className="mt-2 text-sm text-zinc-300 max-w-3xl">
                الفرق بين صورة عادية تحقق 2% CTR وصورة تحقق 12% ليس نوع البرنامج، بل الالتزام الدقيق بهذه القواعد الست المثبتة علمياً وسلوكياً.
              </p>
            </div>

            {/* Rules Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {professionalDesignRules.map((rule) => (
                <div key={rule.id} className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                      <span>{rule.title}</span>
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-amber-300/90 font-medium">
                      {rule.summary}
                    </p>

                    <div className="mt-4 space-y-2.5">
                      {rule.guidelines.map((guide, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                          <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{guide}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-800/80 rounded-2xl bg-amber-500/5 border border-amber-500/10 p-3.5 text-xs text-amber-200/90 font-semibold flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>نصيحة ذهبية:</strong> {rule.proTip}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Before / After Case Studies */}
            <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 mb-1">
                    <Eye className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">دراسة حالة مرئية وصفية</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-white">
                    أمثلة قبل / بعد (Before & After) وتحليل النتائج
                  </h3>
                </div>
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-bold text-zinc-300">
                  3 مقارنات تفصيلية
                </span>
              </div>

              <div className="space-y-6">
                {beforeAfterExamples.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 sm:p-6">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                      <h4 className="text-base font-black text-white">{item.title}</h4>
                      <span className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-xs font-black text-amber-400">
                        {item.niche}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Before Box */}
                      <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black text-red-400">❌ قبل التعديل</span>
                          <span className="text-xs font-bold text-red-300 bg-red-500/20 px-2 py-0.5 rounded-full">
                            CTR: {item.before.estimatedCtr}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-zinc-200 mb-1">{item.before.title}</div>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-3">{item.before.description}</p>
                        <div className="space-y-1">
                          {item.before.mistakes.map((m, i) => (
                            <div key={i} className="text-[11px] text-red-300/80 flex items-center gap-1.5">
                              <span>•</span>
                              <span>{m}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* After Box */}
                      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black text-emerald-400">✅ بعد التعديل الاحترافي</span>
                          <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                            CTR: {item.after.estimatedCtr}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-zinc-200 mb-1">{item.after.title}</div>
                        <p className="text-xs text-zinc-300 leading-relaxed mb-3">{item.after.description}</p>
                        <div className="space-y-1">
                          {item.after.fixes.map((f, i) => (
                            <div key={i} className="text-[11px] text-emerald-300/90 flex items-center gap-1.5">
                              <span>✓</span>
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-zinc-300 font-semibold flex items-center gap-2">
                      <span className="text-amber-400">💡 الخلاصة:</span>
                      <span>{item.keyTakeaway}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: أنواع Thumbnails */}
        {/* ============================================================== */}
        {activeTab === 'types' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Layers className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">أنماط ونيتشات التصميم</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                أنواع الصور المصغرة حسب النيتش وطبيعة المحتوى
              </h2>
              <p className="mt-2 text-sm text-zinc-300 max-w-3xl">
                لكل تصنيف في يوتيوب أسلوب بصري يجذب جمهوره تحديداً. تعرف على سمات كل نوع، الألوان المفضلة، وسيكولوجية النقر المناسبة له.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {thumbnailTypesList.map((type) => {
                const isOpen = openTypeItem === type.id;
                return (
                  <div 
                    key={type.id}
                    className={`rounded-3xl border transition-all ${
                      isOpen ? 'border-amber-500/50 bg-zinc-900/80 shadow-lg shadow-amber-500/5' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                    }`}
                  >
                    <div 
                      onClick={() => setOpenTypeItem(isOpen ? '' : type.id)}
                      className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[11px] font-black text-amber-400">
                            {type.badge}
                          </span>
                          <span className="text-xs text-zinc-500">{type.category}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-white">
                          {type.title}
                        </h3>
                        <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                          {type.description}
                        </p>
                      </div>

                      <button className="shrink-0 p-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white">
                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-zinc-800/80 space-y-4 text-xs animate-in fade-in duration-150">
                        <div>
                          <span className="font-bold text-amber-400">السمات البصرية الأساسية:</span>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {type.characteristics.map((c, i) => (
                              <span key={i} className="rounded-lg bg-zinc-800/80 border border-zinc-700 px-2.5 py-1 text-zinc-300">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                            <span className="font-bold text-zinc-300">تناسق الألوان المقترح:</span>
                            <div className="mt-1 text-zinc-400">{type.recommendedColors.join(' • ')}</div>
                          </div>
                          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                            <span className="font-bold text-zinc-300">أفضل استخدام:</span>
                            <div className="mt-1 text-zinc-400">{type.bestFor}</div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 space-y-2">
                          <div>
                            <span className="font-bold text-amber-300">نصيحة النص: </span>
                            <span className="text-zinc-300">{type.textAdvice}</span>
                          </div>
                          <div>
                            <span className="font-bold text-amber-300">نقطة الارتكاز (Focal Point): </span>
                            <span className="text-zinc-300">{type.focalPointAdvice}</span>
                          </div>
                          <div className="pt-1 text-zinc-400 text-[11px] border-t border-amber-500/10">
                            <strong>مثال عملي:</strong> {type.exampleScenario}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: طريقة التصميم من الصفر */}
        {/* ============================================================== */}
        {activeTab === 'workflow' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Sliders className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">سير العمل الاحترافي</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                طريقة تصميم الصورة المصغرة خطوة بخطوة من الصفر
              </h2>
              <p className="mt-2 text-sm text-zinc-300 max-w-3xl">
                مسار العمل المتكامل الذي يتبعه كبار مصممي يوتيوب العالميين لإنتاج صور مصغرة ذات معدل نقر خارق في أقل من 45 دقيقة.
              </p>
            </div>

            <div className="space-y-3">
              {designWorkflowSteps.map((step) => {
                const isOpen = openWorkflowStep === step.stepNumber;
                return (
                  <div
                    key={step.stepNumber}
                    className={`rounded-2xl border transition-all ${
                      isOpen ? 'border-amber-500/50 bg-zinc-900/80 shadow-md shadow-amber-500/5' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                    }`}
                  >
                    <div
                      onClick={() => setOpenWorkflowStep(isOpen ? 0 : step.stepNumber)}
                      className="p-5 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-xl flex items-center justify-center font-black text-xs ${
                          isOpen ? 'bg-amber-500 text-black font-black' : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          0{step.stepNumber}
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-black text-white">{step.title}</h3>
                          <span className="text-xs text-amber-400/90 font-medium">الوقت المقترح: {step.duration}</span>
                        </div>
                      </div>

                      <button className="p-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white">
                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-zinc-800/60 text-xs sm:text-sm text-zinc-300 space-y-3 animate-in fade-in duration-150">
                        <p className="leading-relaxed">{step.description}</p>
                        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                          <span className="font-black text-amber-400 text-xs">قائمة المهام السريعة لهذه الخطوة:</span>
                          {step.checklist.map((c, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{c}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: أدوات التصميم */}
        {/* ============================================================== */}
        {activeTab === 'tools' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Monitor className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">حقيبة المصمم</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                أدوات التصميم: مقارنة مبسطة للاختيار الأنسب لك
              </h2>
              <p className="mt-2 text-sm text-zinc-300 max-w-3xl">
                لا يشترط امتلاك برنامج مدفوع أو جهاز خارق لتبدأ. يمكنك البدء بأدوات مجانية تماماً في المتصفح وصنع تصاميم تنافس أفضل القنوات.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {thumbnailToolsList.map((tool) => (
                <div key={tool.id} className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                      <span className={`rounded-full border px-3 py-1 text-xs font-black ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                      <span className="text-xs font-bold text-zinc-400">{tool.pricing}</span>
                    </div>

                    <h3 className="text-xl font-black text-white">{tool.name}</h3>
                    <p className="text-xs text-amber-400 font-semibold mt-0.5">{tool.arabicRole}</p>
                    <p className="mt-3 text-xs text-zinc-300 leading-relaxed">
                      <strong>لمن يناسب:</strong> {tool.targetAudience}
                    </p>

                    <div className="mt-4 space-y-2">
                      <span className="text-xs font-black text-zinc-200">أهم المزايا العملية:</span>
                      {tool.strengths.map((s, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                          <Check className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-800 space-y-3">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-300">
                      <strong className="text-amber-400">أفضل استخدام:</strong> {tool.bestUse}
                    </div>

                    {tool.aiFeatures && (
                      <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3 text-xs text-purple-300 flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                        <span><strong>الذكاء الاصطناعي:</strong> {tool.aiFeatures}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: قوالب جاهزة قابلة للنسخ */}
        {/* ============================================================== */}
        {activeTab === 'templates' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Copy className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">قوالب تخطيطية فورية</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                قوالب جاهزة ومثبتة لأفكار الصور المصغرة الشائعة
              </h2>
              <p className="mt-2 text-sm text-zinc-300 max-w-3xl">
                انسخ توزيع العناصر والنصوص الموصى بها وطبقها مباشرة على برنامج التصميم لإنشاء تصاميم متوازنة وعالية النقر بنقرة واحدة.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {thumbnailTemplatesList.map((tpl) => (
                <div key={tpl.id} className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-xs font-black text-amber-400">
                        {tpl.type}
                      </span>
                      <button
                        onClick={() => handleLocalCopy(tpl.copyableLayout, tpl.id, `قالب ${tpl.title}`)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 hover:bg-amber-500 hover:text-black px-3 py-1.5 text-xs font-bold text-zinc-300 transition-all cursor-pointer"
                      >
                        {copiedId === tpl.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedId === tpl.id ? 'تم النسخ!' : 'نسخ القالب'}</span>
                      </button>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white">{tpl.title}</h3>
                    <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{tpl.hookScenario}</p>

                    <div className="mt-4 space-y-2 text-xs">
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                        <span className="font-bold text-amber-400">النص المقترح على الصورة: </span>
                        <span className="text-white font-bold">{tpl.recommendedText}</span>
                      </div>
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                        <span className="font-bold text-zinc-300">العنصر البصري الرئيسي: </span>
                        <span className="text-zinc-400">{tpl.focalElement}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 space-y-1">
                    <div><strong>الخلفية:</strong> {tpl.backgroundIdea}</div>
                    <div><strong>الألوان:</strong> {tpl.colorPalette}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: Thumbnail Idea Generator (أداة تفاعلية) */}
        {/* ============================================================== */}
        {activeTab === 'generator' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Wand2 className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">أداة تفاعلية ذكية</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                Thumbnail Idea Generator (مولّد أفكار الصور المصغرة)
              </h2>
              <p className="mt-2 text-sm text-zinc-300 max-w-3xl">
                أدخل عنوان الفيديو أو فكرته، وسيقوم المولد باقتراح 3 زوايا سيكولوجية متمايزة مع النصوص الدقيقة، العنصر البصري، وتعبيرات الوجه الموصى بها.
              </p>
            </div>

            {/* Generator Input Card */}
            <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-zinc-900/60 to-zinc-900/80 p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-zinc-200 mb-1.5">
                    عنوان الفيديو أو الفكرة (مثال: مراجعة هاتف جديد، تعلم البرمجة من الصفر...)
                  </label>
                  <input
                    type="text"
                    value={generatorTitle}
                    onChange={(e) => setGeneratorTitle(e.target.value)}
                    placeholder="اكتب عنوان أو فكرة الفيديو هنا..."
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-zinc-200 mb-1.5">
                    تصنيف المحتوى (النيتش)
                  </label>
                  <select
                    value={generatorCategory}
                    onChange={(e) => setGeneratorCategory(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3.5 text-sm text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="tech">التقنية والمراجعات (Tech)</option>
                    <option value="tutorials">الشروحات والتعليم (Tutorials)</option>
                    <option value="business-money">الربح والبيزنس (Money)</option>
                    <option value="gaming">الألعاب والجيمنج (Gaming)</option>
                    <option value="general">منوعات وقصص (General)</option>
                  </select>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="mt-4 flex items-center gap-2 flex-wrap text-xs">
                <span className="text-zinc-400 font-bold">أفكار سريعة للتجربة:</span>
                {[
                  { text: 'مراجعة آيفون 16 برو', cat: 'tech' },
                  { text: 'كيف تبدأ في البرمجة من الصفر', cat: 'tutorials' },
                  { text: 'كيف ربحت 3,000$ من العمل الحر', cat: 'business-money' },
                  { text: 'تحدي البقاء في ماين كرافت', cat: 'gaming' }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setGeneratorTitle(preset.text);
                      setGeneratorCategory(preset.cat);
                    }}
                    className="rounded-lg bg-zinc-800/80 border border-zinc-700 hover:border-amber-500/50 px-2.5 py-1 text-zinc-300 hover:text-white transition-all cursor-pointer"
                  >
                    {preset.text}
                  </button>
                ))}
              </div>

              {/* Generate Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleGenerateIdeas}
                  disabled={isGenerating}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 py-3.5 text-sm font-black text-black hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Wand2 className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'جاري التحليل والتوليد...' : 'توليد أفكار الـ Thumbnail 🚀'}</span>
                </button>
              </div>
            </div>

            {/* Generated Ideas Output Cards */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-black text-white">
                  الأفكار المقترحة للصورة المصغرة (3 زوايا سيكولوجية):
                </h3>
                <span className="text-xs text-amber-400 font-bold">جاهزة للتطبيق الفوري</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {generatedIdeas.map((idea, idx) => (
                  <div key={idx} className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-xs font-black text-amber-400">
                          {idea.angle}
                        </span>
                        <button
                          onClick={() => handleLocalCopy(
                            `📌 فكرة Thumbnail [${idea.angle}]:\n• النص المقترح: ${idea.textOnThumbnail}\n• العنصر البصري: ${idea.focalElement}\n• الخلفية: ${idea.background}\n• تعبير الوجه: ${idea.expression}`,
                            `gen-${idx}`,
                            `فكرة ${idx + 1}`
                          )}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 transition-all cursor-pointer"
                          title="نسخ تفاصيل الفكرة"
                        >
                          {copiedId === `gen-${idx}` ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>

                      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-center mb-4">
                        <span className="block text-[11px] font-bold text-amber-300 mb-1">النص على الصورة:</span>
                        <span className="text-lg font-black text-white">{idea.textOnThumbnail}</span>
                      </div>

                      <div className="space-y-2.5 text-xs text-zinc-300">
                        <div>
                          <strong className="text-zinc-200">العنصر البصري:</strong>
                          <p className="mt-0.5 text-zinc-400 leading-relaxed">{idea.focalElement}</p>
                        </div>
                        <div>
                          <strong className="text-zinc-200">الخلفية والألوان:</strong>
                          <p className="mt-0.5 text-zinc-400 leading-relaxed">{idea.background}</p>
                        </div>
                        <div>
                          <strong className="text-zinc-200">تعبير الوجه الموصى به:</strong>
                          <p className="mt-0.5 text-zinc-400 leading-relaxed">{idea.expression}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 8: Thumbnail Checklist (تفاعلية) */}
        {/* ============================================================== */}
        {activeTab === 'checklist' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">الفاحص النهائي قبل النشر</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                Thumbnail Checklist: فاحص جودة ونقاء الصورة المصغرة
              </h2>
              <p className="mt-2 text-sm text-zinc-300 max-w-3xl">
                لا تنشر صورتك أبداً قبل مطابقتها مع هذه المعايير الثمانية الدقيقة. تحقق من كل نقطة بنقرة لتتأكد من أعلى جاهزية وتحقيق أعلى نسبة نقر ممكنة.
              </p>
            </div>

            {/* Score Card / Progress Bar */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">درجة الجاهزية والنقاء</span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-3xl font-black text-white font-sans">{checklistPercentage}%</span>
                    <span className={`text-xs font-black px-3 py-1 rounded-full ${
                      checklistPercentage === 100 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : checklistPercentage >= 60 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {checklistPercentage === 100 ? 'جاهزة للنشر بامتياز! 🚀' : `${completedChecklistCount} من ${thumbnailChecklistItems.length} معايير مكتملة`}
                    </span>
                  </div>
                </div>

                <button
                  onClick={resetChecklist}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>إعادة ضبط الفاحص</span>
                </button>
              </div>

              {/* Progress bar */}
              <div className="h-3 w-full rounded-full bg-zinc-950 border border-zinc-800 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    checklistPercentage === 100 
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' 
                      : 'bg-gradient-to-r from-amber-500 to-orange-500'
                  }`}
                  style={{ width: `${checklistPercentage}%` }}
                />
              </div>
            </div>

            {/* Checklist Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {thumbnailChecklistItems.map((item) => {
                const isChecked = !!checklistState[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`rounded-2xl border p-5 transition-all cursor-pointer flex items-start gap-4 ${
                      isChecked
                        ? 'border-emerald-500/40 bg-emerald-950/15 shadow-sm shadow-emerald-500/10'
                        : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                    }`}
                  >
                    <div className="pt-0.5">
                      <div className={`h-5 w-5 rounded-md flex items-center justify-center border transition-all ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-400 text-black'
                          : 'border-zinc-600 bg-zinc-950'
                      }`}>
                        {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className={`text-sm font-black transition-colors ${isChecked ? 'text-emerald-300' : 'text-white'}`}>
                          {item.label}
                        </h4>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          item.importance === 'critical'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : item.importance === 'high'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          {item.importance === 'critical' ? 'حرج جداً' : item.importance === 'high' ? 'مهم' : 'معياري'}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/80 px-2.5 py-1.5 text-[11px] text-zinc-400">
                        <strong className="text-amber-400">💡 اختبار سريع:</strong> {item.tip}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 9: البورتفوليو والعمل الحر (Freelancing) */}
        {/* ============================================================== */}
        {activeTab === 'freelancing' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Send className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">رحلة الفريلانس والعملاء</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                كيف تصنع البورتفوليو وتتواصل مع اليوتيوبرز للحصول على مشاريع مدفوعة
              </h2>
              <p className="mt-2 text-sm text-zinc-300 max-w-3xl">
                الخطوات الحقيقية والمجربة لبناء سابقة أعمال تجبر أي صانع محتوى على الرد والتعاقد معك، دون الحاجة لأي عميل سابق.
              </p>
            </div>

            {/* How to build without clients */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-black text-white mb-6">
                {portfolioFreelanceGuide.howToBuildWithoutClients.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolioFreelanceGuide.howToBuildWithoutClients.steps.map((st) => (
                  <div key={st.number} className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-5">
                    <div className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-black text-amber-400 border border-amber-500/20 mb-3">
                      0{st.number}
                    </div>
                    <h4 className="text-sm font-black text-white">{st.title}</h4>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Channels & Outreach Strategy */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-black text-white mb-4">
                {portfolioFreelanceGuide.howToReachYouTubers.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {portfolioFreelanceGuide.howToReachYouTubers.channels.map((ch, idx) => (
                  <div key={idx} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <span className="text-xs font-black text-amber-400">{ch.platform}</span>
                    <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">{ch.why}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm font-semibold text-amber-200 leading-relaxed">
                  {portfolioFreelanceGuide.howToReachYouTubers.goldenRule}
                </p>
              </div>
            </div>

            {/* Cold Outreach Ready Template */}
            <div className="rounded-3xl border border-amber-500/40 bg-zinc-900/70 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-xs font-black text-amber-400">
                    نموذج المراسلة الباردة الجاهز للنسخ
                  </span>
                  <h3 className="text-lg font-black text-white mt-1">
                    رسالة التواصل مع صناع المحتوى (معدل ردود 35%+)
                  </h3>
                </div>

                <button
                  onClick={() => handleLocalCopy(
                    `الموضوع: ${coldOutreachTemplate.subject}\n\n${coldOutreachTemplate.arabicBody}`,
                    'cold-outreach',
                    'رسالة التواصل الباردة'
                  )}
                  className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-black text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  {copiedId === 'cold-outreach' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedId === 'cold-outreach' ? 'تم نسخ الرسالة بالكامل!' : 'نسخ الرسالة الجاهزة'}</span>
                </button>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-xs font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap">
                <div className="text-amber-400 font-bold mb-2 pb-2 border-b border-zinc-800">
                  الموضوع: {coldOutreachTemplate.subject}
                </div>
                {coldOutreachTemplate.arabicBody}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 10: تحدي الـ 7 أيام (7-Day Thumbnail Challenge) */}
        {/* ============================================================== */}
        {activeTab === 'challenge' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Calendar className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">خطة الـ 7 أيام التطبيقية</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                تحدي الـ 7 أيام لتصميم الصور المصغرة والبدء في الفريلانس
              </h2>
              <p className="mt-2 text-sm text-zinc-300 max-w-3xl">
                مهمة واحدة مركزة لكل يوم. اتبع هذا المسار خطوة بخطوة وستنتهي في اليوم السابع ببورتفوليو حقيقي وأول رسائل مرسلة لصناع المحتوى.
              </p>
            </div>

            {/* Challenge Progress Card */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">معدل إنجاز التحدي</span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-3xl font-black text-white font-sans">{challengePercentage}%</span>
                    <span className={`text-xs font-black px-3 py-1 rounded-full ${
                      challengePercentage === 100 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {challengePercentage === 100 ? 'مبروك! أتممت التحدي وأنت الآن مصمم جاهز للعمل الحر 🎉' : `${completedDaysCount} من 7 أيام مكتملة`}
                    </span>
                  </div>
                </div>

                <button
                  onClick={resetChallenge}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>إعادة ضبط التحدي</span>
                </button>
              </div>

              {/* Progress bar */}
              <div className="h-3 w-full rounded-full bg-zinc-950 border border-zinc-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-400 to-amber-400 transition-all duration-300"
                  style={{ width: `${challengePercentage}%` }}
                />
              </div>
            </div>

            {/* Days List */}
            <div className="space-y-4">
              {sevenDayThumbnailChallenge.map((dayItem) => {
                const isCompleted = !!challengeState[dayItem.day];
                return (
                  <div
                    key={dayItem.day}
                    className={`rounded-3xl border p-6 transition-all ${
                      isCompleted
                        ? 'border-emerald-500/40 bg-emerald-950/15 shadow-sm shadow-emerald-500/10'
                        : 'border-zinc-800 bg-zinc-900/60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-xl flex items-center justify-center font-black text-sm ${
                          isCompleted
                            ? 'bg-emerald-500 text-black'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}>
                          {dayItem.day}
                        </div>
                        <div>
                          <h3 className="text-base font-black text-white">{dayItem.title}</h3>
                          <span className="text-xs text-zinc-400 font-medium">الهدف: {dayItem.objective}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleChallengeDay(dayItem.day)}
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all cursor-pointer ${
                          isCompleted
                            ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                            : 'bg-zinc-800 text-zinc-300 hover:bg-amber-500 hover:text-black'
                        }`}
                      >
                        <Check className="h-4 w-4" />
                        <span>{isCompleted ? 'مكتمل بنجاح ✅' : 'تحديد كمكتمل'}</span>
                      </button>
                    </div>

                    <div className="space-y-2 text-xs text-zinc-300 mb-4">
                      <strong className="text-zinc-200">المهام المطلوبة اليوم:</strong>
                      {dayItem.tasks.map((task, i) => (
                        <div key={i} className="flex items-start gap-2 leading-relaxed text-zinc-400">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                        <strong className="text-emerald-400">المخرج النهائي (Deliverable):</strong>
                        <p className="mt-1 text-zinc-300">{dayItem.deliverable}</p>
                      </div>
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                        <strong className="text-amber-400">نصيحة اليوم الاحترافية:</strong>
                        <p className="mt-1 text-zinc-300">{dayItem.proTip}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
