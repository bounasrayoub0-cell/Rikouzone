import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  Compass, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  FileText, 
  Type, 
  Sliders, 
  LayoutGrid, 
  Scale, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  AlertCircle, 
  Shuffle, 
  Send, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  TrendingUp,
  Award
} from 'lucide-react';
import { 
  designFundamentals, 
  designToolsList, 
  brandIdentitySteps, 
  logoTypesList, 
  logoMistakes, 
  logoChecklistItems, 
  socialMediaGuides, 
  portfolioGuide, 
  designServices, 
  workChannels, 
  clientOutreachTemplate, 
  clientBriefTemplate, 
  thirtyDayDesignPlan, 
  curatedColorPalettes, 
  curatedFontPairings 
} from '../../data/graphicDesignData';

interface GraphicDesignViewProps {
  onNavigate?: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

export const GraphicDesignView: React.FC<GraphicDesignViewProps> = ({ onNavigate, onCopyText }) => {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<string>('fundamentals');

  // Interactive Checklist states persisted to localStorage
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('rz_design_tasks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [logoChecks, setLogoChecks] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('rz_logo_checks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [portfolioChecks, setPortfolioChecks] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('rz_portfolio_checks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Interactive Pricing Calculator State
  const [calcHourlyRate, setCalcHourlyRate] = useState<number>(20);
  const [calcEstimatedHours, setCalcEstimatedHours] = useState<number>(12);
  const [calcRevisionsCount, setCalcRevisionsCount] = useState<number>(2);
  const [calcComplexityMultiplier, setCalcComplexityMultiplier] = useState<number>(1.2);
  const [calcRushOrder, setCalcRushOrder] = useState<boolean>(false);

  // Dynamic Palette Generator State
  const [paletteIndex, setPaletteIndex] = useState<number>(0);
  const [copiedColorHex, setCopiedColorHex] = useState<string | null>(null);

  // Accordion open states
  const [openPrinciples, setOpenPrinciples] = useState<Record<string, boolean>>({ colors: true });
  const [openSocialGuide, setOpenSocialGuide] = useState<string>('instagram-post');

  // Persist checklists
  useEffect(() => {
    try {
      localStorage.setItem('rz_design_tasks', JSON.stringify(completedTasks));
    } catch {}
  }, [completedTasks]);

  useEffect(() => {
    try {
      localStorage.setItem('rz_logo_checks', JSON.stringify(logoChecks));
    } catch {}
  }, [logoChecks]);

  useEffect(() => {
    try {
      localStorage.setItem('rz_portfolio_checks', JSON.stringify(portfolioChecks));
    } catch {}
  }, [portfolioChecks]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const toggleLogoCheck = (idx: number) => {
    setLogoChecks((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const togglePortfolioCheck = (idx: number) => {
    setPortfolioChecks((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const togglePrinciple = (id: string) => {
    setOpenPrinciples((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyColor = (hex: string) => {
    onCopyText(hex, `تم نسخ كود اللون ${hex} ✓`);
    setCopiedColorHex(hex);
    setTimeout(() => setCopiedColorHex(null), 2000);
  };

  // Calculate pricing
  const baseCost = calcHourlyRate * calcEstimatedHours;
  const revisionsCost = calcRevisionsCount * (calcHourlyRate * 1.5);
  const subtotal = (baseCost + revisionsCost) * calcComplexityMultiplier;
  const totalQuote = Math.round(calcRushOrder ? subtotal * 1.3 : subtotal);

  // Task completion progress
  const totalTasksCount = thirtyDayDesignPlan.reduce((acc, w) => acc + w.tasks.length, 0);
  const finishedTasksCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((finishedTasksCount / totalTasksCount) * 100);

  const tabs = [
    { id: 'fundamentals', label: '1. أساسيات التصميم', icon: Compass },
    { id: 'tools', label: '2. أدوات التصميم', icon: Layers },
    { id: 'branding', label: '3. الهوية البصرية', icon: Sparkles },
    { id: 'logo', label: '4. تصميم Logo', icon: Award },
    { id: 'social', label: '5. تصاميم السوشيال', icon: Smartphone },
    { id: 'portfolio', label: '6. البورتفوليو', icon: Monitor },
    { id: 'monetization', label: '7. طرق الربح', icon: TrendingUp },
    { id: 'clients', label: '8. جلب العملاء', icon: Send },
    { id: 'pricing', label: '9. التسعير والحاسبة', icon: DollarSign },
    { id: 'plan', label: '10. خطة 30 يوم', icon: Calendar },
    { id: 'resources', label: '11. قوالب وأدوات', icon: FileText }
  ];

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6 sm:py-8 font-sans text-zinc-100" dir="rtl">
      
      {/* Top Breadcrumb & Return to Income Paths */}
      <div className="flex items-center justify-between gap-3 pb-4 mb-6 border-b border-zinc-800/80">
        <button
          onClick={() => onNavigate && onNavigate('income')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-amber-400 transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
          <span>الرجوع إلى جميع المسارات المالية</span>
        </button>

        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-400">
          <Palette className="h-3.5 w-3.5" />
          <span>الدليل الشامل 2026</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black p-5 sm:p-8 shadow-2xl mb-8">
        <div className="absolute top-0 right-0 h-64 w-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-xl bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-black text-amber-400 mb-3">
            <Sparkles className="h-4 w-4" />
            <span>مسار تعليمي تفاعلي من الصفر حتى أول عميل</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            التصميم الجرافيكي وبناء الهويات البصرية
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 mt-1">
              (Graphic & Brand Identity Design)
            </span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
            دليلك العملي المتكامل: تعلم قواعد التصميم الأساسية، أتقن الأدوات العصرية، صمم شعارات وهويات بصرية متناسقة، ابنِ معرض أعمال مبهر بدون عملاء، وتعلم كيفية تسعير خدماتك وجلب العملاء المباشرين.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-zinc-800/80 text-xs">
            <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/80 p-2.5">
              <span className="text-zinc-500 block text-[10px]">مستوى الصعوبة</span>
              <span className="font-bold text-emerald-400 mt-0.5 block">مناسب للمبتدئين</span>
            </div>
            <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/80 p-2.5">
              <span className="text-zinc-500 block text-[10px]">الأدوات المطلوبة</span>
              <span className="font-bold text-amber-300 mt-0.5 block">Figma / Canva / AI</span>
            </div>
            <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/80 p-2.5">
              <span className="text-zinc-500 block text-[10px]">متوسط الأرباح</span>
              <span className="font-bold text-zinc-100 mt-0.5 block">350$ - 3,500$ شهرياً</span>
            </div>
            <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/80 p-2.5">
              <span className="text-zinc-500 block text-[10px]">مدة الخطة</span>
              <span className="font-bold text-orange-400 mt-0.5 block">30 يوماً خطوة بخطوة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-zinc-800/80">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black scale-[1.02]'
                  : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 1. FUNDAMENTALS OF DESIGN */}
      {/* ========================================================================= */}
      {activeTab === 'fundamentals' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Definition Card */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-xl">
            <div className="flex items-center gap-2.5 mb-3 text-amber-400">
              <Compass className="h-5 w-5" />
              <h2 className="text-base sm:text-lg font-black text-white">شنو هو التصميم الجرافيكي (Graphic Design)؟</h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {designFundamentals.whatIsGraphicDesign.definition}
            </p>
            <div className="mt-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-3.5 text-xs text-amber-200 leading-relaxed flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
              <span>
                <strong>الهدف الذهبي:</strong> {designFundamentals.whatIsGraphicDesign.coreGoal}
              </span>
            </div>
          </div>

          {/* Difference: Graphic Design vs Branding vs UI */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-xl">
            <h3 className="text-sm sm:text-base font-black text-white mb-2">
              الفرق بين التصميم الجرافيكي، بناء الهوية (Branding)، وتصميم الواجهات (UI)
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              من أكبر أخطاء المبتدئين الخلط بين هذه المجالات الثلاثة؛ إليك الفرق الدقيق لتحدد أين تتخصص:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {designFundamentals.differences.map((diff, idx) => (
                <div key={idx} className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 space-y-2.5 flex flex-col justify-between">
                  <div>
                    <span className="inline-block rounded-lg bg-amber-500/15 px-2 py-0.5 text-[11px] font-bold text-amber-400 mb-2">
                      المجال #{idx + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-black text-white">{diff.role}</h4>
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{diff.focus}</p>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80 space-y-1.5 text-[11px]">
                    <div className="text-zinc-300">
                      <strong className="text-zinc-400">المخرجات: </strong> {diff.deliverable}
                    </div>
                    <div className="text-amber-300/90 font-medium">
                      <strong className="text-zinc-400">الهدف: </strong> {diff.target}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5 Core Design Principles */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-xl">
            <h3 className="text-sm sm:text-base font-black text-white mb-1">
              مبادئ التصميم الأساسية الخمسة (The 5 Core Principles)
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              أي تصميم ناجح في العالم مبني على هذه القواعد الخمس. افهمها جيداً قبل فتح أي برنامج:
            </p>

            <div className="space-y-3">
              {designFundamentals.principles.map((p) => {
                const isOpen = openPrinciples[p.id] ?? false;
                return (
                  <div key={p.id} className="rounded-2xl border border-zinc-800 bg-zinc-950/70 overflow-hidden transition-all">
                    <button
                      onClick={() => togglePrinciple(p.id)}
                      className="w-full flex items-center justify-between p-4 text-start hover:bg-zinc-900/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 font-bold text-xs">
                          {p.id === 'colors' ? '🎨' : p.id === 'typography' ? '✍️' : p.id === 'contrast' ? '🌓' : p.id === 'composition' ? '📐' : '⚖️'}
                        </span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-white">{p.name}</h4>
                          <span className="text-[11px] text-zinc-400 line-clamp-1">{p.summary}</span>
                        </div>
                      </div>
                      {isOpen ? <ChevronUp className="h-4 w-4 text-zinc-400" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-zinc-800/80 bg-zinc-900/30 space-y-2">
                        <div className="space-y-1.5 pt-3">
                          {p.rules.map((rule, rIdx) => (
                            <div key={rIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                              <span className="leading-relaxed">{rule}</span>
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

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DESIGN TOOLS */}
      {/* ========================================================================= */}
      {activeTab === 'tools' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-xl">
            <h2 className="text-base sm:text-lg font-black text-white mb-1">
              أدوات وبرامج التصميم الأساسية (Design Software)
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              لا تحتاج لتعلم كل البرامج دفعة واحدة. ابدأ ببرنامج واحد رئيسي (Figma أو Canva) وطور مهاراتك تدريجياً:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {designToolsList.map((tool) => (
                <div key={tool.id} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-all">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="rounded-lg bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-black text-amber-300">
                        {tool.badge}
                      </span>
                      <span className="text-[11px] font-bold text-zinc-400">
                        {tool.pricing}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-black text-white">{tool.name}</h3>
                    <div className="text-xs text-amber-400/90 font-medium mb-2">{tool.category}</div>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-3">{tool.whatItDoes}</p>

                    <div className="rounded-xl bg-zinc-900/80 p-3 text-xs border border-zinc-800/80 mb-3">
                      <span className="text-zinc-400 font-bold block mb-1">لمن هذه الأداة؟</span>
                      <span className="text-zinc-300 leading-relaxed block">{tool.bestFor}</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-zinc-300">
                      <span className="font-bold text-white text-[11px] block">شنو تقدر تصمم به:</span>
                      {tool.whatYouCanDesign.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-zinc-300 text-xs">
                          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                    <span>💡 نصيحة البدء:</span>
                    <span className="text-zinc-300 font-semibold">{tool.pros[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. BRAND IDENTITY BLUEPRINT */}
      {/* ========================================================================= */}
      {activeTab === 'branding' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-2 text-amber-400">
              <Sparkles className="h-5 w-5" />
              <h2 className="text-base sm:text-lg font-black text-white">
                كيفاش كيتبنى Brand Identity من الصفر؟
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
              الهوية البصرية ليست مجرد لوجو! الشعار يمثل 15% فقط من الهوية. الهوية الكاملة تتبع هذا التسلسل المنطقي:
            </p>

            {/* Sequence Flowchart */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-black text-amber-300 mb-6 text-center">
              <span>Brand Strategy</span>
              <span className="text-zinc-600">←</span>
              <span>Logo Design</span>
              <span className="text-zinc-600">←</span>
              <span>Color Palette</span>
              <span className="text-zinc-600">←</span>
              <span>Typography</span>
              <span className="text-zinc-600">←</span>
              <span>Visual Style</span>
              <span className="text-zinc-600">←</span>
              <span className="text-emerald-400">Brand Guidelines</span>
            </div>

            {/* Step-by-Step Blueprint */}
            <div className="space-y-3.5">
              {brandIdentitySteps.map((step) => (
                <div key={step.step} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black text-sm">
                    {step.step}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <h3 className="text-xs sm:text-sm font-black text-white">{step.title}</h3>
                    <p className="text-xs text-zinc-300 leading-relaxed">{step.desc}</p>
                    <div className="mt-2 rounded-xl bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 text-[11px] text-amber-300/90 font-medium">
                      <strong>المخرج النهائي: </strong> {step.output}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Client Brief Questionnaire Shortcut */}
            <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs sm:text-sm font-black text-white">هل تحتاج استبيان العميل الجاهز (Client Brief)؟</h4>
                <p className="text-xs text-zinc-300 mt-0.5">أسئلة احترافية ترسلها للعميل قبل البدء لضمان معرفة كل متطلبات الهوية بدقة.</p>
              </div>
              <button
                onClick={() => onCopyText(clientBriefTemplate, 'تم نسخ استبيان العميل الكامل ✓')}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-black text-black hover:bg-amber-400 transition-all cursor-pointer shadow-md"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>نسخ استبيان العميل</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. LOGO DESIGN GUIDE */}
      {/* ========================================================================= */}
      {activeTab === 'logo' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Logo Fundamentals & Types */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-xl">
            <h2 className="text-base sm:text-lg font-black text-white mb-2">
              دليل تصميم الشعارات (Logo Design Essentials)
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              الشعار الناجح ليس لوحة فنية معقدة، بل رمز بسيط يعلق في الذاكرة ويمكن رسمه من الذاكرة في 5 ثوانٍ:
            </p>

            {/* 6 Types of Logos */}
            <h3 className="text-xs sm:text-sm font-black text-amber-400 mb-3">أنواع الشعارات الستة (Types of Logos):</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {logoTypesList.map((type, idx) => (
                <div key={idx} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                      نوع #{idx + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white mt-1.5">{type.name}</h4>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{type.description}</p>
                  </div>
                  <div className="pt-2 border-t border-zinc-800/80 text-[11px]">
                    <div className="text-zinc-300"><strong>أمثلة: </strong>{type.example}</div>
                    <div className="text-amber-300/80 mt-1"><strong>الأفضل لـ: </strong>{type.bestFor}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mistakes to avoid */}
            <h3 className="text-xs sm:text-sm font-black text-rose-400 mb-3">أكبر 5 أخطاء تدمر تصميم اللوجو:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {logoMistakes.map((m, idx) => (
                <div key={idx} className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-3.5 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-rose-300">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                    <span>الخطأ: {m.mistake}</span>
                  </div>
                  <p className="text-zinc-300 text-[11px] pr-5 leading-relaxed">
                    <strong className="text-emerald-400">الحل الصحيح: </strong> {m.fix}
                  </p>
                </div>
              ))}
            </div>

            {/* Interactive Logo Quality Checklist */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>قائمة فحص اللوجو قبل التسليم (Logo Checklist)</span>
                </h3>
                <span className="text-[11px] font-bold text-zinc-400">
                  {Object.values(logoChecks).filter(Boolean).length} / {logoChecklistItems.length} مكتمل
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mb-3">
                قم بالتعليم على كل معيار للتأكد من أن الشعار جاهز للتسليم للعميل:
              </p>

              <div className="space-y-2">
                {logoChecklistItems.map((item, idx) => {
                  const isChecked = logoChecks[idx] ?? false;
                  return (
                    <label
                      key={idx}
                      onClick={() => toggleLogoCheck(idx)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        isChecked 
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' 
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded border-zinc-700 text-amber-500 focus:ring-amber-500 cursor-pointer"
                      />
                      <span className="leading-relaxed">{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SOCIAL MEDIA DESIGN SPECS & IDEAS */}
      {/* ========================================================================= */}
      {activeTab === 'social' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-xl">
            <h2 className="text-base sm:text-lg font-black text-white mb-1">
              تصاميم السوشيال ميديا (Social Media Design Specs & Rules)
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              لكل منصة مقاسات وقواعد بصرية تضمن تفاعل المتابع وتمنع اقتطاع النصوص في الهواتف:
            </p>

            {/* Social Media Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {socialMediaGuides.map((guide) => (
                <button
                  key={guide.id}
                  onClick={() => setOpenSocialGuide(guide.id)}
                  className={`p-3 rounded-2xl border text-start transition-all cursor-pointer ${
                    openSocialGuide === guide.id
                      ? 'border-amber-500 bg-amber-500/15 text-white shadow-md'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <span className="text-[10px] text-amber-400/90 font-bold block mb-1">مقاس المنصة</span>
                  <h4 className="text-xs font-bold truncate">{guide.title.split('(')[0]}</h4>
                  <span className="text-[10px] text-zinc-500 font-mono mt-1 block">{guide.dimensions.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Guide Card */}
            {(() => {
              const current = socialMediaGuides.find((g) => g.id === openSocialGuide) || socialMediaGuides[0];
              return (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                    <h3 className="text-sm sm:text-base font-black text-white">{current.title}</h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded-lg bg-zinc-800 px-2.5 py-1 text-amber-400 font-mono font-bold">
                        {current.dimensions}
                      </span>
                      <span className="rounded-lg bg-zinc-800/80 px-2 py-1 text-zinc-400 text-[11px]">
                        {current.format}
                      </span>
                    </div>
                  </div>

                  {/* Rules */}
                  <div>
                    <h4 className="text-xs font-bold text-amber-300 mb-2">القواعد الأساسية:</h4>
                    <div className="space-y-1.5">
                      {current.rules.map((r, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Practical Ideas */}
                  <div className="pt-2 border-t border-zinc-800/80">
                    <h4 className="text-xs font-bold text-emerald-400 mb-2">أفكار تصاميم عملية:</h4>
                    <div className="space-y-1.5">
                      {current.practicalIdeas.map((idea, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                          <span className="leading-relaxed">{idea}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Mistakes */}
                  {current.commonMistakes && current.commonMistakes.length > 0 && (
                    <div className="pt-2 border-t border-zinc-800/80">
                      <h4 className="text-xs font-bold text-rose-400 mb-1.5">أخطاء شائعة:</h4>
                      <div className="space-y-1">
                        {current.commonMistakes.map((cm, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] text-zinc-400">
                            <span className="text-rose-400">✕</span>
                            <span>{cm}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. PORTFOLIO BUILDING & CASE STUDIES */}
      {/* ========================================================================= */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-xl">
            <h2 className="text-base sm:text-lg font-black text-white mb-2">
              كيفاش تبني Portfolio احترافي يجلب لك عملاء؟
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              العميل لا يوظف المصمم بسبب سيرته الذاتية أو شهادته، بل يوظفه بناءً على معرض أعماله وما يراه بعينيه:
            </p>

            {/* How to build without clients */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5 mb-6">
              <h3 className="text-xs sm:text-sm font-black text-white mb-2 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-amber-400" />
                <span>كيف تصنع Portfolio وأنت ما زلت في البداية وبدون عملاء حقيقيين؟</span>
              </h3>
              <div className="space-y-2 text-xs text-zinc-300">
                {portfolioGuide.howToBuildWithoutClients.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-500/20 text-amber-400 font-bold text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Study Structure */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 mb-6">
              <h3 className="text-xs sm:text-sm font-black text-white mb-1">
                هيكل دراسة الحالة المثالية (The 5-Step Case Study)
              </h3>
              <p className="text-xs text-zinc-400 mb-4">
                لا تنشر الصورة فقط! أضف نصاً قصيراً يوضح للمشتري أنك تفهم التسويق وليس فقط التلوين:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {portfolioGuide.caseStudyStructure.map((cs, idx) => (
                  <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 space-y-1">
                    <h4 className="text-xs font-bold text-amber-300">{cs.title}</h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">{cs.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Portfolio Checklist */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>قائمة فحص البورتفوليو (Portfolio Checklist)</span>
                </h3>
                <span className="text-[11px] font-bold text-zinc-400">
                  {Object.values(portfolioChecks).filter(Boolean).length} / {portfolioGuide.checklist.length} معايير
                </span>
              </div>

              <div className="space-y-2">
                {portfolioGuide.checklist.map((item, idx) => {
                  const isChecked = portfolioChecks[idx] ?? false;
                  return (
                    <label
                      key={idx}
                      onClick={() => togglePortfolioCheck(idx)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        isChecked 
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' 
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded border-zinc-700 text-amber-500 focus:ring-amber-500 cursor-pointer"
                      />
                      <span className="leading-relaxed">{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MONETIZATION & WAYS TO WORK */}
      {/* ========================================================================= */}
      {activeTab === 'monetization' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-xl">
            <h2 className="text-base sm:text-lg font-black text-white mb-2">
              كيفاش تربح من التصميم الجرافيكي؟ (Monetization & Services)
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              هذه هي الخدمات الخمس الأكثر طلباً في السوق وأسعارها التقريبية:
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8">
              {designServices.map((svc, idx) => (
                <div key={idx} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="rounded-md bg-amber-500/15 text-amber-400 text-[10px] font-bold px-2 py-0.5">
                        {svc.demand}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-black text-white">{svc.title}</h3>
                    <div className="text-xs font-black text-emerald-400 mt-1 mb-2 font-mono">{svc.priceRange}</div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      <strong>المخرجات: </strong> {svc.deliverable}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ways to Work Channels */}
            <h3 className="text-sm sm:text-base font-black text-white mb-3">
              طرق وقنوات العمل المتاحة للمصمم المستقل:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {workChannels.map((ch, idx) => (
                <div key={idx} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-black text-amber-400">{ch.channel}</h4>
                    <span className="text-[10px] font-mono text-zinc-500">{ch.platforms}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{ch.desc}</p>
                  <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-2.5 text-[11px] text-zinc-400">
                    <strong className="text-amber-300">سر النجاح: </strong> {ch.tip}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. CLIENT ACQUISITION & OUTREACH */}
      {/* ========================================================================= */}
      {activeTab === 'clients' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-xl">
            <h2 className="text-base sm:text-lg font-black text-white mb-2">
              كيفاش تلقى عملاء وتتواصل معهم باحترافية؟ (Client Outreach)
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              أفضل طريقة لجلب العملاء ليست انتظارهم على المنصات، بل المبادرة الذكية بإعطاء قيمة مسبقة (Value First):
            </p>

            {/* Outreach Strategy Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-1.5">
                <span className="text-amber-400 font-bold text-xs">الخطوة 1: البحث والاستكشاف</span>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  ابحث على إنستغرام أو فيسبوك عن متاجر أو قنوات محتواها رائع لكن تصاميم إعلاناتها أو صورها المصغرة ضعيفة.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-1.5">
                <span className="text-amber-400 font-bold text-xs">الخطوة 2: عينة مجانية سريعة</span>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  أعد تصميم بوست واحد أو صورة مصغرة واحدة من محتواهم السابق واجعلها تفوق الأصل بـ 10 أضعاف.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-1.5">
                <span className="text-amber-400 font-bold text-xs">الخطوة 3: التواصل الودي المقنع</span>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  أرسل لهم التصميم الجديد بدون فرض نفسك، ووضح كيف يسهم ذلك في زيادة مبيعاتهم وتفاعل متابعيهم.
                </p>
              </div>
            </div>

            {/* Ready Outreach Template Card */}
            <div className="rounded-2xl border border-amber-500/30 bg-zinc-950 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-zinc-800">
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                    <Send className="h-4 w-4 text-amber-400" />
                    <span>رسالة التواصل الجاهزة مع العميل (Client Outreach Script)</span>
                  </h3>
                  <span className="text-[11px] text-zinc-400">رسالة مجربة ومبنية على تقديم قيمة مسبقة تضمن أعلى معدل ردود</span>
                </div>

                <button
                  onClick={() => onCopyText(clientOutreachTemplate, 'تم نسخ رسالة التواصل مع العميل ✓')}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-black text-black hover:bg-amber-400 transition-all cursor-pointer shadow-md shadow-amber-500/20 active:scale-95"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>نسخ الرسالة</span>
                </button>
              </div>

              <pre className="whitespace-pre-wrap rounded-xl bg-zinc-900/90 p-4 text-xs font-sans text-zinc-200 leading-relaxed border border-zinc-800 max-h-96 overflow-y-auto">
                {clientOutreachTemplate}
              </pre>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. PRICING & ADJUSTABLE PRICING CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'pricing' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-xl">
            <h2 className="text-base sm:text-lg font-black text-white mb-2">
              استراتيجيات التسعير وحاسبة تسعير المشاريع (Pricing Calculator)
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              لا تسعّر بناءً على مزاجك أو ما يفرضه الآخرون؛ اضبط متغيرات مشروعك في الحاسبة أدناه للحصول على عرض سعر عادل ومربح:
            </p>

            {/* Pricing Models Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-1.5">
                <h3 className="text-xs sm:text-sm font-bold text-amber-400">1. التسعير بالمشروع (Project-based)</h3>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  سعر مقطوع لكل مخرج (مثلاً: تصميم لوجو = 250$). الأفضل للمشاريع واضحة المعالم.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-1.5">
                <h3 className="text-xs sm:text-sm font-bold text-amber-400">2. التسعير بالباقة (Package Pricing)</h3>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  باقة شهرية (مثلاً: 16 بوست + 20 ستوري = 450$/شهر). الأفضل لبناء دخل مستقر ومستمر.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-1.5">
                <h3 className="text-xs sm:text-sm font-bold text-amber-400">3. حماية التعديلات (Revisions Scope)</h3>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  حدد جولتين تعديل مجانية فقط في العرض؛ أي تعديل إضافي بعد ذلك يحسب بسعر إضافي متفق عليه.
                </p>
              </div>
            </div>

            {/* Interactive Pricing Calculator */}
            <div className="rounded-2xl border border-amber-500/40 bg-zinc-950 p-5 sm:p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800 text-amber-400">
                <DollarSign className="h-5 w-5" />
                <h3 className="text-sm sm:text-base font-black text-white">حاسبة تسعير الخدمات التفاعلية (قابلة للتعديل بالكامل)</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                
                {/* Controls */}
                <div className="space-y-4">
                  {/* Hourly Rate */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-zinc-300">سعر ساعتك التقديري ($)</span>
                      <span className="text-amber-400 font-mono text-sm">{calcHourlyRate}$ / ساعة</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={calcHourlyRate}
                      onChange={(e) => setCalcHourlyRate(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                      <span>10$ (مبتدئ)</span>
                      <span>50$ (متوسط)</span>
                      <span>100$ (محترف)</span>
                    </div>
                  </div>

                  {/* Estimated Hours */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-zinc-300">الساعات المقدرة لإنجاز المشروع</span>
                      <span className="text-amber-400 font-mono text-sm">{calcEstimatedHours} ساعة عمل</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="60"
                      step="2"
                      value={calcEstimatedHours}
                      onChange={(e) => setCalcEstimatedHours(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Revisions Included */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-zinc-300">جولات التعديل المشمولة في العرض</span>
                      <span className="text-amber-400 font-mono text-sm">{calcRevisionsCount} جولات</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={calcRevisionsCount}
                      onChange={(e) => setCalcRevisionsCount(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Project Complexity */}
                  <div>
                    <span className="text-xs font-bold text-zinc-300 block mb-1.5">مستوى تعقيد المشروع:</span>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { label: 'بسيط (سوشيال/فلاير)', val: 1.0 },
                        { label: 'متوسط (شعار/كتيب)', val: 1.25 },
                        { label: 'معقد (هوية كاملة)', val: 1.6 }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCalcComplexityMultiplier(item.val)}
                          className={`p-2 rounded-xl border text-center transition-all text-[11px] font-bold ${
                            calcComplexityMultiplier === item.val
                              ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                              : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rush Delivery Toggle */}
                  <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={calcRushOrder}
                      onChange={(e) => setCalcRushOrder(e.target.checked)}
                      className="rounded border-zinc-700 text-amber-500 focus:ring-amber-500 h-4 w-4"
                    />
                    <span className="font-bold">تسليم مستعجل (Rush Order +30% إضافي)</span>
                  </label>
                </div>

                {/* Calculation Output Card */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 space-y-4">
                  <span className="text-xs font-bold text-zinc-400 block">عرض السعر المقترح للعميل:</span>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
                    ${totalQuote}
                    <span className="text-xs text-zinc-400 font-sans font-normal mr-2">/ للمشروع</span>
                  </div>

                  <div className="space-y-2 border-t border-zinc-800 pt-3 text-xs text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">قيمة ساعات العمل الأساسية:</span>
                      <span className="font-mono font-bold">${baseCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">هامش جولات التعديل ({calcRevisionsCount}):</span>
                      <span className="font-mono font-bold">${revisionsCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">معامل التعقيد:</span>
                      <span className="font-mono font-bold">x{calcComplexityMultiplier}</span>
                    </div>
                    {calcRushOrder && (
                      <div className="flex justify-between text-amber-300 font-bold">
                        <span>رسوم التسليم السريع:</span>
                        <span>+30%</span>
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 text-[11px] text-amber-200/90 leading-relaxed">
                    💡 <strong>قاعدة الدفع الاحترافية:</strong> لا تبدأ أي عمل قبل استلام دفعة مقدمة لا تقل عن <strong>50%</strong> لضمان جدية العميل وحماية وقتك.
                  </div>

                  <button
                    onClick={() => {
                      const quoteText = `عرض سعر تصميم مقترح:\n- قيمة المشروع: $${totalQuote}\n- وقت الإنجاز المقدر: ${calcEstimatedHours} ساعة عمل\n- جولات التعديل المشمولة: ${calcRevisionsCount} جولات\n- الدفعة المقدمة: 50% للبدء`;
                      onCopyText(quoteText, 'تم نسخ تفاصيل عرض السعر ✓');
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-xs font-black text-black hover:bg-amber-400 transition-all cursor-pointer shadow-md"
                  >
                    <Copy className="h-4 w-4" />
                    <span>نسخ ملخص عرض السعر للعميل</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. 30-DAY ACTION PLAN WITH CHECKBOXES */}
      {/* ========================================================================= */}
      {activeTab === 'plan' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-black text-white">
                  خطة الـ 30 يوماً للتحول إلى مصمم مستقل (30-Day Action Plan)
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  مهام يومية محددة ومدروسة تأخذك من الصفر وحتى إغلاق أول عقد تصميم مدفوع:
                </p>
              </div>

              {/* Overall Progress Badge */}
              <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-2xl px-3.5 py-2 shrink-0">
                <div className="text-start">
                  <span className="text-[10px] text-zinc-400 block">إنجازك الإجمالي</span>
                  <span className="text-xs font-black text-amber-400 font-mono">{progressPercent}% مكتمل</span>
                </div>
                <div className="w-12 bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>

            {/* Weeks */}
            <div className="space-y-5">
              {thirtyDayDesignPlan.map((week) => (
                <div key={week.week} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-zinc-800">
                    <h3 className="text-xs sm:text-sm font-black text-amber-400">{week.title}</h3>
                    <span className="text-[11px] text-zinc-400 font-medium">{week.goal}</span>
                  </div>

                  <div className="space-y-2 mt-3">
                    {week.tasks.map((task) => {
                      const isDone = completedTasks[task.id] ?? false;
                      return (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            isDone
                              ? 'border-emerald-500/30 bg-emerald-500/5 text-zinc-400'
                              : 'border-zinc-800/80 bg-zinc-900/60 text-zinc-200 hover:border-zinc-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => {}}
                            className="mt-0.5 rounded border-zinc-700 text-amber-500 focus:ring-amber-500 cursor-pointer"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-amber-400">
                                اليوم {task.day}
                              </span>
                              <h4 className={`text-xs font-bold ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                                {task.title}
                              </h4>
                            </div>
                            <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{task.description}</p>
                            <div className="mt-1.5 text-[10px] text-amber-300/80 font-medium">
                              <strong>المخرج المطلوب: </strong> {task.deliverable}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 11. INTERACTIVE TOOLS & TEMPLATES */}
      {/* ========================================================================= */}
      {activeTab === 'resources' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Color Palette Generator Tool */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Palette className="h-4 w-4 text-amber-400" />
                  <span>مولد وتنسيق لوحات الألوان الجاهزة (Color Palette Generator)</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  انقر على أي كود HEX لنسخه فوراً واستخدامه في مشروعك:
                </p>
              </div>

              <button
                onClick={() => setPaletteIndex((prev) => (prev + 1) % curatedColorPalettes.length)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-amber-500/50 px-3 py-1.5 text-xs font-bold text-zinc-200 hover:text-amber-400 transition-all cursor-pointer"
              >
                <Shuffle className="h-3.5 w-3.5" />
                <span>تبديل اللوحة</span>
              </button>
            </div>

            {(() => {
              const pal = curatedColorPalettes[paletteIndex];
              return (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white text-sm">{pal.name}</span>
                    <span className="text-zinc-400">{pal.vibe}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {pal.colors.map((c, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleCopyColor(c.hex)}
                        className="group relative rounded-xl p-3 flex flex-col justify-between h-24 sm:h-28 cursor-pointer transition-all hover:scale-[1.03] shadow-md border border-white/10"
                        style={{ backgroundColor: c.hex }}
                      >
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white truncate max-w-full">
                          {c.role}
                        </span>

                        <div className="flex items-center justify-between bg-black/70 rounded-lg px-2 py-1 text-white text-[11px] font-mono font-bold">
                          <span>{c.hex}</span>
                          {copiedColorHex === c.hex ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 opacity-60 group-hover:opacity-100" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Curated Font Pairings */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-xl">
            <h3 className="text-base font-black text-white mb-2 flex items-center gap-2">
              <Type className="h-4 w-4 text-amber-400" />
              <span>أفضل أزواج الخطوط العربية المتناسقة (Font Pairings)</span>
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              خطوط مجانية 100% متوفرة على Google Fonts تعطي مظهر فخم وفوري لتصاميمك:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {curatedFontPairings.map((pair) => (
                <div key={pair.id} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <h4 className="text-xs sm:text-sm font-black text-amber-400">{pair.title}</h4>
                    <span className="text-[10px] font-bold text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">
                      {pair.latinPair}
                    </span>
                  </div>

                  <div className="rounded-xl bg-zinc-900/80 p-3 text-zinc-200 text-sm leading-relaxed border border-zinc-800">
                    "{pair.previewSample}"
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                    <div>
                      <strong className="text-zinc-300">العناوين: </strong>{pair.arabicHeader}
                    </div>
                    <div>
                      <strong className="text-zinc-300">النصوص: </strong>{pair.arabicBody}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Copyable Project Checklists & Brief Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Client Brief Template */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 space-y-3 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-amber-400" />
                    <span>نموذج استبيان العميل (Client Brief)</span>
                  </h4>
                  <button
                    onClick={() => onCopyText(clientBriefTemplate, 'تم نسخ استبيان العميل الكامل ✓')}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-300 transition-colors"
                    title="نسخ النموذج"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-zinc-400 mb-3">
                  انسخ هذه الأسئلة وأرسلها للعميل في بداية أي مشروع للحصول على تفاصيل دقيقة وتجنب التعديلات العشوائية.
                </p>
                <div className="rounded-xl bg-zinc-950 p-3 text-[11px] font-mono text-zinc-300 max-h-48 overflow-y-auto leading-relaxed border border-zinc-800">
                  {clientBriefTemplate.slice(0, 240)}...
                </div>
              </div>

              <button
                onClick={() => onCopyText(clientBriefTemplate, 'تم نسخ استبيان العميل الكامل ✓')}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-amber-500 hover:text-black py-2.5 text-xs font-bold text-zinc-200 transition-all cursor-pointer"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>نسخ استبيان العميل كاملاً</span>
              </button>
            </div>

            {/* Client Outreach Template */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 space-y-3 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <Send className="h-4 w-4 text-amber-400" />
                    <span>نموذج رسالة التواصل الأولية (Outreach)</span>
                  </h4>
                  <button
                    onClick={() => onCopyText(clientOutreachTemplate, 'تم نسخ رسالة التواصل مع العميل ✓')}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-300 transition-colors"
                    title="نسخ الرسالة"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-zinc-400 mb-3">
                  رسالة ودية جاهزة لإرسالها لأصحاب المتاجر وصناع المحتوى لتقديم قيمة مسبقة وإغلاق أول مشروع.
                </p>
                <div className="rounded-xl bg-zinc-950 p-3 text-[11px] font-mono text-zinc-300 max-h-48 overflow-y-auto leading-relaxed border border-zinc-800">
                  {clientOutreachTemplate.slice(0, 240)}...
                </div>
              </div>

              <button
                onClick={() => onCopyText(clientOutreachTemplate, 'تم نسخ رسالة التواصل مع العميل ✓')}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 py-2.5 text-xs font-black text-black transition-all cursor-pointer shadow-md shadow-amber-500/20"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>نسخ رسالة التواصل</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
