import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  Users, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  Video,
  Share2,
  ThumbsUp,
  MessageCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface FacebookCalculatorsProps {
  onCopyText: (text: string, label: string) => void;
}

export const FacebookCalculators: React.FC<FacebookCalculatorsProps> = ({ onCopyText }) => {
  const [activeTab, setActiveTab] = useState<'eligibility' | 'biomaker' | 'scriptbuilder' | 'engagement'>('eligibility');

  // --- 1. Eligibility & Readiness Checker State ---
  const [followers, setFollowers] = useState<number>(3200);
  const [minutesWatched, setMinutesWatched] = useState<number>(24000);
  const [activeVideos, setActiveVideos] = useState<number>(7);
  const [hasOriginalContent, setHasOriginalContent] = useState<boolean>(true);
  const [has2FA, setHas2FA] = useState<boolean>(true);
  const [countrySupported, setCountrySupported] = useState<boolean>(true);

  // Benchmarks for standard In-Stream Ads & Content Monetization
  const followersTarget = 5000;
  const minutesTarget = 60000;
  const videosTarget = 5;

  const followersProgress = Math.min(100, Math.round((followers / followersTarget) * 100));
  const minutesProgress = Math.min(100, Math.round((minutesWatched / minutesTarget) * 100));
  const videosProgress = Math.min(100, Math.round((activeVideos / videosTarget) * 100));

  const starsEligible = followers >= 500 && hasOriginalContent && has2FA;
  const inStreamEligible = followers >= followersTarget && minutesWatched >= minutesTarget && activeVideos >= videosTarget && hasOriginalContent && has2FA && countrySupported;

  const overallScore = useMemo(() => {
    let score = 0;
    score += (followersProgress * 0.3);
    score += (minutesProgress * 0.35);
    score += (videosProgress * 0.15);
    if (hasOriginalContent) score += 10;
    if (has2FA) score += 5;
    if (countrySupported) score += 5;
    return Math.min(100, Math.round(score));
  }, [followersProgress, minutesProgress, videosProgress, hasOriginalContent, has2FA, countrySupported]);

  // --- 2. Bio & Intro Generator State ---
  const [pageName, setPageName] = useState<string>('أيوب | أسرار صناعة المحتوى');
  const [pageCategory, setPageCategory] = useState<string>('منشئ محتوى رقمي • Digital Creator');
  const [pageMission, setPageMission] = useState<string>('أشاركك خلاصة استراتيجيات صناعة الفيديوهات والذكاء الاصطناعي وبناء الأصول الرقمية من الصفر.');
  const [pageProof, setPageProof] = useState<string>('🚀 فيديوهات ريلز يومية ومجتمع يضم آلاف المهتمين بالنمو الحقيقي.');
  const [pageCta, setPageCta] = useState<string>('👇 حمل دليلك المجاني وتصفح الموارد في الرابط أسفله:');
  const [pageLink, setPageLink] = useState<string>('https://rikouzone.com/start');
  const [isCopiedBio, setIsCopiedBio] = useState<boolean>(false);

  const formattedBioText = useMemo(() => {
    return `📌 اسم الصفحة: ${pageName}
🏷️ الفئة: ${pageCategory}

📝 نبذة الصفحة (About / Bio):
${pageMission}
${pageProof}
${pageCta}
🔗 ${pageLink}`;
  }, [pageName, pageCategory, pageMission, pageProof, pageCta, pageLink]);

  const handleCopyBio = () => {
    onCopyText(formattedBioText, 'تم نسخ بيانات بايو وهوية الصفحة بنجاح!');
    setIsCopiedBio(true);
    setTimeout(() => setIsCopiedBio(false), 2500);
  };

  // --- 3. Script & Hook Builder State ---
  const [scriptTopic, setScriptTopic] = useState<string>('تنظيم وقت صناعة المحتوى بمساعدة الذكاء الاصطناعي');
  const [scriptHookType, setScriptHookType] = useState<'error' | 'hack' | 'comparison' | 'story'>('error');
  const [scriptMistake, setScriptMistake] = useState<string>('قضاء 6 ساعات في كتابة وتعديل الفيديو يدوياً');
  const [scriptSolution1, setScriptSolution1] = useState<string>('استخراج الأفكار الشائعة من تعليقات المجموعات في 10 دقائق');
  const [scriptSolution2, setScriptSolution2] = useState<string>('استخدام أداة الذكاء الاصطناعي لتوليد مسودة السكربت الأولية');
  const [scriptSolution3, setScriptSolution3] = useState<string>('تصوير 4 مقاطع دفعة واحدة في جلسة واحدة (Batching)');
  const [scriptCtaQuestion, setScriptCtaQuestion] = useState<string>('واش جربتي نظام الـ Batching من قبل أو ما زال كتصور كل نهار بوحدو؟');
  const [isCopiedScript, setIsCopiedScript] = useState<boolean>(false);

  const generatedScript = useMemo(() => {
    let hookLine = '';
    if (scriptHookType === 'error') {
      hookLine = `توقف عن ${scriptMistake} فـ 2026! هاد الخطأ هو السبب اللي مخلي 90% من الناس يستسلمو قبل ما يربحو أي سنت...`;
    } else if (scriptHookType === 'hack') {
      hookLine = `حيلة ذكية وبسيطة فـ ${scriptTopic} كنتمنى لو عرفتها قبل عام! غادي توفر عليك ساعات وتضاعف نتيجتك...`;
    } else if (scriptHookType === 'comparison') {
      hookLine = `الفرق بين اللي كينجح فـ ${scriptTopic} واللي كيتعذب فـ 2026 كيتلخص فهاد السر البسيط...`;
    } else {
      hookLine = `كنت كنعاني من ${scriptMistake} حتى جربت هاد الطريقة البسيطة اللي بدلات ليا كلشي...`;
    }

    return `🎬 سكربت ريلز فيسبوك متكامل (30-40 ثانية)
الموضوع: ${scriptTopic}

⏱️ [0:00 - 0:04 الهوك البصري واللفظي]:
${hookLine}

⏱️ [0:05 - 0:12 توضيح المشكلة]:
المشكل ماشي فنقص الوقت أو الإمكانيات، المشكل أن الطريقة التقليدية كتخليك تستنزف طاقتك بدون وصول.

⏱️ [0:13 - 0:32 الحل العملي في 3 خطوات]:
1. الخطوة الأولى: ${scriptSolution1}
2. الخطوة الثانية: ${scriptSolution2}
3. الخطوة الثالثة: ${scriptSolution3}

⏱️ [0:33 - 0:40 النداء التفاعلي الذكي (CTA)]:
${scriptCtaQuestion}
شاركني رأيك فالتعليقات، وحفظ الفيديو عندك باش ترجع لهاد الخطوات وقت التصوير القادم! 📌`;
  }, [scriptTopic, scriptHookType, scriptMistake, scriptSolution1, scriptSolution2, scriptSolution3, scriptCtaQuestion]);

  const handleCopyScript = () => {
    onCopyText(generatedScript, 'تم نسخ سكربت الريلز المخصص بنجاح!');
    setIsCopiedScript(true);
    setTimeout(() => setIsCopiedScript(false), 2500);
  };

  // --- 4. Engagement & Reach Estimator State ---
  const [sampleViews, setSampleViews] = useState<number>(15000);
  const [sampleReactions, setSampleReactions] = useState<number>(620);
  const [sampleComments, setSampleComments] = useState<number>(95);
  const [sampleShares, setSampleShares] = useState<number>(140);

  // Facebook weights Shares heavily (e.g. 5x of a like), and comments (3x of a like)
  const weightedScore = (sampleReactions * 1) + (sampleComments * 3) + (sampleShares * 5);
  const engagementPercentage = sampleViews > 0 ? ((sampleReactions + sampleComments + sampleShares) / sampleViews) * 100 : 0;

  const viralPotential = useMemo(() => {
    if (engagementPercentage > 6 && sampleShares >= (sampleViews * 0.008)) {
      return {
        level: 'فيروسي ممتاز (Viral Potential 🔥)',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        desc: 'نسبة المشاركات العالية تدفع خوارزمية فيسبوك لترشيح الفيديو لعشرات الآلاف خارج دائرة متابعيك فوراً.'
      };
    } else if (engagementPercentage >= 3) {
      return {
        level: 'تفاعل صحي ومستقر (Healthy Reach)',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        desc: 'أداء متوازن يثبت ثقة المتابعين وتجاوبهم مع موضوع الفيديو.'
      };
    } else {
      return {
        level: 'يحتاج تحسين الهوك والـ CTA',
        color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
        desc: 'المشاهدات موجودة لكن تفاعل المشاهدين ضعيف؛ جرب طرح سؤال أكثر إثارة للجدل أو تقديم فائدة قابلة للمشاركة.'
      };
    }
  }, [engagementPercentage, sampleShares, sampleViews]);

  return (
    <div className="space-y-6">
      
      {/* Sub-tabs Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800 scrollbar-none">
        <button
          onClick={() => setActiveTab('eligibility')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'eligibility'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>فاحص جاهزية وأهلية الصفحة</span>
        </button>

        <button
          onClick={() => setActiveTab('biomaker')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'biomaker'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>منشئ بايو وهوية الصفحة</span>
        </button>

        <button
          onClick={() => setActiveTab('scriptbuilder')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'scriptbuilder'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <Video className="h-4 w-4" />
          <span>مولد سكربت الريلز المخصص</span>
        </button>

        <button
          onClick={() => setActiveTab('engagement')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'engagement'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>محلل قوة التفاعل والمشاركات</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: ELIGIBILITY CHECKER */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'eligibility' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>معايير برامج Meta الرسمية المحدثة</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  فاحص جاهزية صفحة فيسبوك لبرامج تحقيق الدخل
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                  أدخل أرقام صفحتك الحالية وتأكد من استيفاء المتطلبات الأساسية للنجوم (Stars)، إعلانات In-Stream، والبرامج الموحدة.
                </p>
              </div>

              {/* Overall Readiness Pill */}
              <div className="shrink-0 flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-zinc-500 block">نسبة الجاهزية الكلية</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">{overallScore}%</span>
                </div>
              </div>
            </div>

            {/* Inputs & Parameters */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Followers */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-zinc-300">عدد المتابعين الحقيقيين</label>
                  <span className="text-[11px] font-mono text-amber-400">{followers.toLocaleString()} / {followersTarget.toLocaleString()}</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={followers}
                  onChange={(e) => setFollowers(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-mono font-bold text-white focus:border-amber-500 focus:outline-none"
                />
                <div className="mt-2 w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${followersProgress}%` }}
                  />
                </div>
              </div>

              {/* Minutes Watched */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-zinc-300">دقائق المشاهدة (آخر 60 يوماً)</label>
                  <span className="text-[11px] font-mono text-amber-400">{minutesWatched.toLocaleString()} / {minutesTarget.toLocaleString()}</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={minutesWatched}
                  onChange={(e) => setMinutesWatched(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-mono font-bold text-white focus:border-amber-500 focus:outline-none"
                />
                <div className="mt-2 w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${minutesProgress}%` }}
                  />
                </div>
              </div>

              {/* Active Videos */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-zinc-300">الفيديوهات النشطة في الصفحة</label>
                  <span className="text-[11px] font-mono text-amber-400">{activeVideos} / {videosTarget}</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={activeVideos}
                  onChange={(e) => setActiveVideos(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-mono font-bold text-white focus:border-amber-500 focus:outline-none"
                />
                <div className="mt-2 w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${videosProgress}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Checkboxes Checklist */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              
              <label className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-3.5 flex items-center gap-3 cursor-pointer hover:border-zinc-700 transition-colors">
                <input
                  type="checkbox"
                  checked={hasOriginalContent}
                  onChange={(e) => setHasOriginalContent(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-700 text-amber-500 focus:ring-amber-500/20"
                />
                <div className="text-xs">
                  <span className="font-bold text-white block">محتوى أصلي 100%</span>
                  <span className="text-zinc-500 text-[11px]">بدون مقاطع مسروقة أو علامات مائية</span>
                </div>
              </label>

              <label className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-3.5 flex items-center gap-3 cursor-pointer hover:border-zinc-700 transition-colors">
                <input
                  type="checkbox"
                  checked={has2FA}
                  onChange={(e) => setHas2FA(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-700 text-amber-500 focus:ring-amber-500/20"
                />
                <div className="text-xs">
                  <span className="font-bold text-white block">المصادقة الثنائية (2FA)</span>
                  <span className="text-zinc-500 text-[11px]">مفعلة لحساب المدير المسؤول</span>
                </div>
              </label>

              <label className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-3.5 flex items-center gap-3 cursor-pointer hover:border-zinc-700 transition-colors">
                <input
                  type="checkbox"
                  checked={countrySupported}
                  onChange={(e) => setCountrySupported(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-700 text-amber-500 focus:ring-amber-500/20"
                />
                <div className="text-xs">
                  <span className="font-bold text-white block">الدولة مدعومة في Meta Payout</span>
                  <span className="text-zinc-500 text-[11px]">حساب بنكي مؤهل لاستقبال الأرباح</span>
                </div>
              </label>

            </div>

            {/* Assessment Cards */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Stars Assessment */}
              <div className={`rounded-2xl border p-4.5 ${
                starsEligible 
                  ? 'border-emerald-500/40 bg-emerald-500/5' 
                  : 'border-zinc-800 bg-zinc-950/60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <span>نجوم فيسبوك (Meta Stars)</span>
                  </h4>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${
                    starsEligible 
                      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' 
                      : 'text-zinc-500 bg-zinc-900 border-zinc-800'
                  }`}>
                    {starsEligible ? 'مؤهل للتفعيل الآن ✅' : 'قيد الاكتمال'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  تتطلب 500 متابع على الأقل والتزاماً بالسياسات. يمكنك من خلالها استلام دعم مالي مباشر من المشاهدين في مقاطع الريلز والبثوث.
                </p>
              </div>

              {/* In-Stream / Content Monetization Assessment */}
              <div className={`rounded-2xl border p-4.5 ${
                inStreamEligible 
                  ? 'border-amber-500/40 bg-amber-500/5' 
                  : 'border-zinc-800 bg-zinc-950/60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <span>الإعلانات وبرنامج Content Monetization</span>
                  </h4>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${
                    inStreamEligible 
                      ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' 
                      : 'text-zinc-500 bg-zinc-900 border-zinc-800'
                  }`}>
                    {inStreamEligible ? 'مؤهل للمراجعة الرسمية 🎉' : `${overallScore}% من المتطلبات`}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  تتطلب 5,000 متابع، 60,000 دقيقة مشاهدة، و5 فيديوهات نشطة. بمجرد استيفائها، تقدم بطلب تفعيل الإعلانات من لوحة Professional Dashboard.
                </p>
              </div>

            </div>

            <div className="mt-4 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                تذكير هام: هذه المعايير مستندة إلى إرشادات Meta الرسمية لعام 2026. تختلف البرامج الإضافية (مثل Ads on Reels و Performance Bonus) وتخضع لنظام الدعوة التدريجي وفق أداء صفحتك ونشاطها.
              </span>
            </div>

          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: BIO & INTRO MAKER */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'biomaker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-7 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
            <div>
              <h4 className="text-base font-black text-white">محرر هوية وبايو صفحة فيسبوك</h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                جهز معلومات صفحتك الأساسية لتظهر باحترافية وتكسب ثقة الزائر من النظرة الأولى.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1.5">اسم الصفحة الكامل</label>
              <input
                type="text"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-bold text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1.5">الفئة الرسمية (Category)</label>
              <input
                type="text"
                value={pageCategory}
                onChange={(e) => setPageCategory(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1.5">الرسالة والقيمة المقدمة (المهمة)</label>
              <input
                type="text"
                value={pageMission}
                onChange={(e) => setPageMission(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1.5">إثبات اجتماعي أو وتيرة النشر</label>
              <input
                type="text"
                value={pageProof}
                onChange={(e) => setPageProof(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1.5">النداء نحو الرابط (CTA)</label>
              <input
                type="text"
                value={pageCta}
                onChange={(e) => setPageCta(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1.5">رابط الموقع أو الهدية المجانية</label>
              <input
                type="text"
                value={pageLink}
                onChange={(e) => setPageLink(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-mono font-bold text-amber-400 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Facebook Page Live Card Preview */}
          <div className="lg:col-span-5 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
              <span className="text-xs font-bold text-zinc-400">معاينة واجهة الصفحة</span>
              <button
                onClick={handleCopyBio}
                className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-black text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
              >
                {isCopiedBio ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{isCopiedBio ? 'تم النسخ!' : 'نسخ المعلومات'}</span>
              </button>
            </div>

            {/* Mockup Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 space-y-3.5">
              <div className="h-20 w-full rounded-xl bg-gradient-to-r from-blue-600/30 via-amber-500/20 to-zinc-800 border border-zinc-800 relative flex items-end p-3">
                <div className="h-14 w-14 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center font-bold text-white text-base shadow-lg absolute -bottom-4 right-3">
                  {pageName.slice(0, 1) || 'F'}
                </div>
              </div>

              <div className="pt-2">
                <h5 className="text-sm font-black text-white">{pageName}</h5>
                <span className="text-[11px] text-zinc-400 font-medium block">{pageCategory}</span>
              </div>

              <div className="text-xs text-zinc-300 leading-relaxed space-y-1 pt-1 border-t border-zinc-800/80">
                <p>{pageMission}</p>
                <p className="text-zinc-400 text-[11px]">{pageProof}</p>
                <p className="text-amber-400 font-bold">{pageCta}</p>
                <p className="text-blue-400 font-mono text-[11px] truncate flex items-center gap-1">
                  <ExternalLink className="h-3 w-3 shrink-0" />
                  <span>{pageLink}</span>
                </p>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 leading-relaxed">
              💡 انسخ هذا الملخص وضعه في خانة "نبذة مختصرة (Bio)" وخانة "الوصف التفصيلي (About)" في إعدادات صفحتك على فيسبوك.
            </p>
          </div>

        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: SCRIPT BUILDER */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'scriptbuilder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-6 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3.5">
            <div>
              <h4 className="text-base font-black text-white">تخصيص سكربت الريلز</h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                حدد زاوية الهوك وموضوعك لتحصل على سكربت 35 ثانية جاهز للتصوير الفوري.
              </p>
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-300 block mb-1">موضوع الريلز الرئيسي</label>
              <input
                type="text"
                value={scriptTopic}
                onChange={(e) => setScriptTopic(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-bold text-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-300 block mb-1">زاوية الهوك الأولى (First 3 Seconds)</label>
              <select
                value={scriptHookType}
                onChange={(e) => setScriptHookType(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-bold text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="error">كشف خطأ شائع (Contrarian Mistake)</option>
                <option value="hack">حيلة ذكية ومجانية (Quick Hack)</option>
                <option value="comparison">مقارنة قبل وبعد (Smart Comparison)</option>
                <option value="story">قصة تحول سريعة (Transformation Story)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-300 block mb-1">الخطأ أو المشكلة التي تواجه المتابع</label>
              <input
                type="text"
                value={scriptMistake}
                onChange={(e) => setScriptMistake(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-semibold text-white"
              />
            </div>

            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold text-zinc-400 block">خطوات الحل الثلاث (3 Actionable Steps):</span>
              <input
                type="text"
                placeholder="الخطوة 1"
                value={scriptSolution1}
                onChange={(e) => setScriptSolution1(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white"
              />
              <input
                type="text"
                placeholder="الخطوة 2"
                value={scriptSolution2}
                onChange={(e) => setScriptSolution2(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white"
              />
              <input
                type="text"
                placeholder="الخطوة 3"
                value={scriptSolution3}
                onChange={(e) => setScriptSolution3(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-300 block mb-1">سؤال الـ CTA التفاعلي في النهاية</label>
              <input
                type="text"
                value={scriptCtaQuestion}
                onChange={(e) => setScriptCtaQuestion(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-semibold text-amber-400"
              />
            </div>
          </div>

          {/* Formatted Script Output */}
          <div className="lg:col-span-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
              <span className="text-xs font-bold text-zinc-400">السكربت الجاهز للتصوير الفوري</span>
              <button
                onClick={handleCopyScript}
                className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-black text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
              >
                {isCopiedScript ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{isCopiedScript ? 'تم النسخ!' : 'نسخ السكربت'}</span>
              </button>
            </div>

            <pre className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 text-xs font-sans text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-[420px] overflow-y-auto">
              {generatedScript}
            </pre>
          </div>

        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: ENGAGEMENT & REACH ESTIMATOR */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'engagement' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>معادلة خوارزمية المشاركات في فيسبوك</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  محلل قوة التفاعل وإشارات الانتشار الفيروسي (Viral Triggers)
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                  اكتشف كيف تقيّم خوارزمية فيسبوك مقطع الريلز الخاص بك بناءً على وزن الإعجابات والتعليقات والمشاركات (Shares).
                </p>
              </div>

              <span className={`px-3 py-1.5 rounded-xl text-xs font-black border ${viralPotential.color}`}>
                {viralPotential.level}
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
                <label className="text-xs font-bold text-zinc-400 block mb-1">المشاهدات (Plays)</label>
                <input
                  type="number"
                  min="100"
                  step="500"
                  value={sampleViews}
                  onChange={(e) => setSampleViews(Math.max(1, Number(e.target.value)))}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-mono font-bold text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
                <label className="text-xs font-bold text-zinc-400 block mb-1">الإعجابات والتفاعلات</label>
                <input
                  type="number"
                  min="0"
                  step="20"
                  value={sampleReactions}
                  onChange={(e) => setSampleReactions(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-mono font-bold text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
                <label className="text-xs font-bold text-zinc-400 block mb-1">التعليقات (Comments)</label>
                <input
                  type="number"
                  min="0"
                  step="5"
                  value={sampleComments}
                  onChange={(e) => setSampleComments(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-mono font-bold text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
                <label className="text-xs font-bold text-zinc-400 block mb-1">المشاركات (Shares - الأقوى)</label>
                <input
                  type="number"
                  min="0"
                  step="5"
                  value={sampleShares}
                  onChange={(e) => setSampleShares(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-mono font-bold text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Results Cards */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-950 p-5">
                <span className="text-xs font-bold text-zinc-400 block">نسبة التفاعل الكلي (ER)</span>
                <span className="text-3xl font-black text-amber-400 font-mono mt-1 block">
                  {engagementPercentage.toFixed(2)}%
                </span>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  نسبة تزيد عن 3% تعتبر إشارة ممتازة للخوارزمية لمواصلة اقتراح الفيديو.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
                <span className="text-xs font-bold text-zinc-400 block">نقاط وزن المشاركات (Share Weight)</span>
                <span className="text-3xl font-black text-emerald-400 font-mono mt-1 block">
                  {sampleShares * 5} نقطة
                </span>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  في فيسبوك، كل مشاركة تعادل 5 إعجابات في ترجيح ظهور الفيديو في خلاصة الأصدقاء.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
                <span className="text-xs font-bold text-zinc-400 block">تقييم الانتشار المباشر</span>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed font-semibold">
                  {viralPotential.desc}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
