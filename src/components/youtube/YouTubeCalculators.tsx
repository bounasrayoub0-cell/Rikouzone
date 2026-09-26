import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Eye, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  Mail, 
  Globe, 
  Layers,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { nicheRPMData, coldEmailTemplate } from '../../data/youtubeMonetizationData';

interface YouTubeCalculatorsProps {
  onCopyText: (text: string, label: string) => void;
}

export const YouTubeCalculators: React.FC<YouTubeCalculatorsProps> = ({ onCopyText }) => {
  const [activeTab, setActiveTab] = useState<'revenue' | 'mediakit' | 'email'>('revenue');

  // --- 1. AdSense Revenue Calculator State ---
  const [monthlyViews, setMonthlyViews] = useState<number>(50000);
  const [selectedNiche, setSelectedNiche] = useState<string>('tech');
  const [audienceLocation, setAudienceLocation] = useState<'arab' | 'global'>('arab');
  const [monetizedPlaybackRate, setMonetizedPlaybackRate] = useState<number>(75); // 75% of views have ads

  // Target RPM estimation based on niche and location
  const currentRPM = useMemo(() => {
    const baseRates: Record<string, { arab: number; global: number }> = {
      finance: { arab: 6.5, global: 20.0 },
      tech: { arab: 3.5, global: 11.0 },
      education: { arab: 2.8, global: 7.5 },
      lifestyle: { arab: 1.5, global: 4.5 },
      gaming: { arab: 0.9, global: 2.5 }
    };
    return baseRates[selectedNiche]?.[audienceLocation] || 2.5;
  }, [selectedNiche, audienceLocation]);

  // Calculations
  const monetizedViewsCount = Math.round((monthlyViews * monetizedPlaybackRate) / 100);
  const estimatedAdSenseMonthly = (monthlyViews / 1000) * currentRPM;
  const estimatedAdSenseYearly = estimatedAdSenseMonthly * 12;

  // Potential sponsorship add-on estimate (1 sponsorship every 50k views at $250)
  const estimatedSponsorshipMonthly = Math.round((monthlyViews / 25000) * 300);

  // --- 2. Interactive Media Kit State ---
  const [channelName, setChannelName] = useState<string>('اسم قناتك هنا');
  const [channelNiche, setChannelNiche] = useState<string>('التقنية والذكاء الاصطناعي وصناعة المحتوى');
  const [subscribersCount, setSubscribersCount] = useState<string>('25,000+ مشترك');
  const [avgViewsPerVideo, setAvgViewsPerVideo] = useState<string>('12,000 - 30,000 مشاهدة');
  const [audienceDemographics, setAudienceDemographics] = useState<string>('80% ذكور (18-34 سنة)، المغرب، الخليج، ومصر');
  const [contactEmail, setContactEmail] = useState<string>('partnerships@yourchannel.com');
  const [isCopiedKit, setIsCopiedKit] = useState<boolean>(false);
  const [isCopiedEmail, setIsCopiedEmail] = useState<boolean>(false);

  const formattedMediaKitText = useMemo(() => {
    return `📊 MEDIA KIT — يوتيوب الرسمية لـ ${channelName}

🎥 تخصص القناة: ${channelNiche}
👥 المشتركون: ${subscribersCount}
👀 متوسط المشاهدات للفيديو: ${avgViewsPerVideo}
🌍 تركيبة الجمهور: ${audienceDemographics}
📩 البريد الرسمي للتواصل والشراكات: ${contactEmail}

✨ خيارات التعاون والرعاية المتاحة:
1. دمج إعلاني مخصص داخل الفيديو (60 إلى 90 ثانية) مع رابط الخصم في أول سطرين من الوصف.
2. فيديو كامل مخصص لمراجعة الخدمة أو السوفتوير (Dedicated Video).
3. سلسلة حلقات برعاية رسمية للعلامة التجارية.
4. مقطع شورتس ترويجي سريع وتثبيت تعليق برابط العرض.

لطلب دراسة الأسعار وحجز موعد النشر القادم، يرجى التواصل عبر: ${contactEmail}`;
  }, [channelName, channelNiche, subscribersCount, avgViewsPerVideo, audienceDemographics, contactEmail]);

  const handleCopyKit = () => {
    onCopyText(formattedMediaKitText, 'تم نسخ بيانات الـ Media Kit بنجاح!');
    setIsCopiedKit(true);
    setTimeout(() => setIsCopiedKit(false), 2500);
  };

  const handleCopyEmail = () => {
    onCopyText(coldEmailTemplate, 'تم نسخ قالب إيميل التواصل مع الشركات بنجاح!');
    setIsCopiedEmail(true);
    setTimeout(() => setIsCopiedEmail(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Sub-tabs header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800 scrollbar-none">
        <button
          onClick={() => setActiveTab('revenue')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'revenue'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
          }`}
        >
          <Calculator className="h-4 w-4" />
          <span>حاسبة أرباح يوتيوب (AdSense & RPM Calculator)</span>
        </button>

        <button
          onClick={() => setActiveTab('mediakit')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'mediakit'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>منشئ الـ Media Kit التفاعلي للقناة</span>
        </button>

        <button
          onClick={() => setActiveTab('email')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'email'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
          }`}
        >
          <Mail className="h-4 w-4" />
          <span>قالب إيميل التواصل مع الشركات الراعية</span>
        </button>
      </div>

      {/* 1. ADSENSE REVENUE CALCULATOR */}
      {activeTab === 'revenue' && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
                <Calculator className="h-3.5 w-3.5" />
                <span>حاسبة أرباح المشاهدات الرسمية</span>
              </div>
              <h3 className="mt-2 text-xl font-black text-white">
                حاسبة أرباح يوتيوب ادسنس: من المشاهدات إلى العائد الصافي (RPM)
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                معادلة دقيقة تحاكي نظام يوتيوب الحقيقي: المشاهدات × الـ RPM الصافي لكل نيتش ودولة.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-5">
              
              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-2">
                  <span>إجمالي المشاهدات الشهرية المتوقعة:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{monthlyViews.toLocaleString()} مشاهدة</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={monthlyViews}
                  onChange={(e) => setMonthlyViews(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>5,000 (قناة مفعلة حديثاً)</span>
                  <span>100,000 (قناة نشطة)</span>
                  <span>500,000+ (قناة متقدمة)</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-2">اختر تخصص القناة (Niche):</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'finance', label: '💰 مال وأعمال واستثمار' },
                    { id: 'tech', label: '💻 تقنية وذكاء اصطناعي' },
                    { id: 'education', label: '📚 تعليم وتطوير ذات' },
                    { id: 'lifestyle', label: '✈️ فلوجات وسفر' },
                    { id: 'gaming', label: '🎮 ألعاب وجيمنج' },
                  ].map((n) => (
                    <button
                      key={n.id}
                      onClick={() => setSelectedNiche(n.id)}
                      className={`p-2.5 rounded-xl font-bold border transition-all text-right ${
                        selectedNiche === n.id
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                          : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-2">الجمهور المستهدف الأساسي:</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setAudienceLocation('arab')}
                    className={`p-2.5 rounded-xl font-bold border transition-all ${
                      audienceLocation === 'arab'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>🇲🇦 🇸🇦 العالم العربي وشمال إفريقيا</span>
                  </button>
                  <button
                    onClick={() => setAudienceLocation('global')}
                    className={`p-2.5 rounded-xl font-bold border transition-all ${
                      audienceLocation === 'global'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>🇺🇸 🇪🇺 أمريكا، أوروبا، والخليج بنسبة عالية</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-2">
                  <span>نسبة المشاهدات التي يظهر فيها إعلان (Monetized Playbacks):</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{monetizedPlaybackRate}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="5"
                  value={monetizedPlaybackRate}
                  onChange={(e) => setMonetizedPlaybackRate(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                />
                <span className="text-[10px] text-zinc-500 block mt-1">
                  * ليست كل مشاهدة تظهر إعلاناً بسبب برامج حجب الإعلانات وتوفر المعلنين (المتوسط الطبيعي 70% - 80%).
                </span>
              </div>

            </div>

            {/* Output Calculation Box */}
            <div className="lg:col-span-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-400">ملخص التقديرات المالية الشهرية</span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                    RPM المقدر: ${currentRPM.toFixed(2)}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                    <span className="text-zinc-500 font-medium block">مشاهدات مع إعلانات</span>
                    <span className="text-lg font-black text-white font-mono mt-1 block">
                      {monetizedViewsCount.toLocaleString()}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                    <span className="text-zinc-500 font-medium block">الربح لكل 1,000 مشاهدة</span>
                    <span className="text-lg font-black text-amber-400 font-mono mt-1 block">
                      ${currentRPM.toFixed(2)} الصافي
                    </span>
                  </div>
                </div>

                {/* AdSense Main Box */}
                <div className="mt-4 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-5">
                  <span className="text-xs font-bold text-amber-300 block">أرباح Google AdSense الشهرية المقدرة:</span>
                  <div className="mt-1 text-3xl sm:text-4xl font-black text-white font-mono">
                    ${Math.round(estimatedAdSenseMonthly).toLocaleString()}
                    <span className="text-xs font-normal text-zinc-400 mr-2 font-sans">
                      (≈ {(Math.round(estimatedAdSenseMonthly) * 10).toLocaleString()} درهم)
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs text-zinc-300">
                    <span>التقدير السنوي التراكمي:</span>
                    <span className="font-mono font-bold text-amber-400">
                      ${Math.round(estimatedAdSenseYearly).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Sponsorship Potential */}
                <div className="mt-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-medium flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span>دخل إضافي محتمل من الرعايات (Sponsorships):</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      +${estimatedSponsorshipMonthly.toLocaleString()} / شهر
                    </span>
                  </div>
                </div>
              </div>

              <span className="text-[11px] text-zinc-500 mt-4 leading-relaxed block border-t border-zinc-900 pt-3">
                * ملاحظة رسمية: هذه تقديرات مبنية على متوسطات RPM العالمية ليوتيوب لعام 2026. الأرباح الحقيقية تختلف حسب مدة الفيديو، موسم الإعلانات (مثل الربع الرابع Q4)، وموقع المشاهدين الفعلي. يوتيوب لا تضمن أي عائد ثابت لأي قناة.
              </span>
            </div>

          </div>
        </div>
      )}

      {/* 2. INTERACTIVE MEDIA KIT BUILDER */}
      {activeTab === 'mediakit' && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
                <FileText className="h-3.5 w-3.5" />
                <span>أداة بناء بطاقة القناة الرسمية</span>
              </div>
              <h3 className="mt-2 text-xl font-black text-white">
                منشئ الـ Media Kit الاحترافي لمراسلة العلامات التجارية والشركات
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                املأ بيانات قناتك الحقيقية للحصول على بطاقة تسويقية منسقة وجاهزة للإرسال مع عروض الرعاية.
              </p>
            </div>

            <button
              onClick={handleCopyKit}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
                isCopiedKit
                  ? 'bg-emerald-500 text-black'
                  : 'bg-amber-500 text-black hover:bg-amber-400 shadow-md shadow-amber-500/20'
              }`}
            >
              {isCopiedKit ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{isCopiedKit ? 'تم نسخ الـ Media Kit!' : 'نسخ الـ Media Kit كاملاً'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            
            {/* Input Form */}
            <div className="lg:col-span-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-zinc-300 block mb-1">اسم القناة (Channel Name):</label>
                <input
                  type="text"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  placeholder="مثال: يونس تك / Younes Tech"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">تخصص القناة (Niche):</label>
                <input
                  type="text"
                  value={channelNiche}
                  onChange={(e) => setChannelNiche(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  placeholder="مثال: مراجعات الهواتف، الذكاء الاصطناعي، التجارة الإلكترونية"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">عدد المشتركين (Subscribers):</label>
                  <input
                    type="text"
                    value={subscribersCount}
                    onChange={(e) => setSubscribersCount(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                    placeholder="مثال: 15,000 مشترِك"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-300 block mb-1">متوسط المشاهدات للفيديو (Avg Views):</label>
                  <input
                    type="text"
                    value={avgViewsPerVideo}
                    onChange={(e) => setAvgViewsPerVideo(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                    placeholder="مثال: 8,000 - 20,000 مشاهدة"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">طبيعة الجمهور والدول (Audience):</label>
                <input
                  type="text"
                  value={audienceDemographics}
                  onChange={(e) => setAudienceDemographics(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  placeholder="مثال: شباب (18-35 سنة)، 60% المغرب، 40% الخليج"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">بريد التواصل التجاري الرسمي (Contact Email):</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  placeholder="مثال: partnerships@mychannel.com"
                />
              </div>
            </div>

            {/* Live Media Kit Card Preview */}
            <div className="lg:col-span-6 rounded-3xl border border-amber-500/40 bg-zinc-950 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl" />

              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black text-sm">
                      YT
                    </div>
                    <div>
                      <h4 className="text-base font-black text-white">{channelName}</h4>
                      <span className="text-[11px] text-amber-400 font-medium">{channelNiche}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-lg">
                    OFFICIAL MEDIA KIT
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                  <div className="bg-zinc-900/60 p-3 rounded-2xl border border-zinc-800">
                    <span className="text-zinc-500 font-medium block">المشتركون النشطون</span>
                    <span className="text-base font-black text-white font-mono mt-0.5 block">{subscribersCount}</span>
                  </div>

                  <div className="bg-zinc-900/60 p-3 rounded-2xl border border-zinc-800">
                    <span className="text-zinc-500 font-medium block">متوسط المشاهدات</span>
                    <span className="text-base font-black text-amber-400 font-mono mt-0.5 block">{avgViewsPerVideo}</span>
                  </div>
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/80">
                    <span className="text-zinc-400 font-bold block mb-0.5">تركيبة الجمهور واهتماماتهم:</span>
                    <span className="text-zinc-200">{audienceDemographics}</span>
                  </div>

                  <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                    <span className="text-zinc-400 font-bold">بريد الشراكات المعتمد:</span>
                    <span className="text-amber-400 font-mono font-medium">{contactEmail}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                <span>جاهز للطباعة أو الإرفاق مع إيميل الرعاية</span>
                <button
                  onClick={handleCopyKit}
                  className="text-amber-400 font-bold hover:underline flex items-center gap-1"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>نسخ بصيغة نصية</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. COLD EMAIL TEMPLATE FOR BRANDS */}
      {activeTab === 'email' && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
                <Mail className="h-3.5 w-3.5" />
                <span>قالب مراسلة الشركات الاحترافي (Cold Pitch)</span>
              </div>
              <h3 className="mt-2 text-xl font-black text-white">
                إيميل مقنع ومختبر لجلب رعايات الشركات دون أن تبدو مبتدئاً
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                صيغة تبرز القيمة التي ستنالها الشركة من جمهورك بدلاً من التسول، مع خانات جاهزة لملء بياناتك.
              </p>
            </div>

            <button
              onClick={handleCopyEmail}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
                isCopiedEmail
                  ? 'bg-emerald-500 text-black'
                  : 'bg-amber-500 text-black hover:bg-amber-400 shadow-md shadow-amber-500/20'
              }`}
            >
              {isCopiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{isCopiedEmail ? 'تم نسخ الإيميل!' : 'نسخ قالب الإيميل'}</span>
            </button>
          </div>

          <div className="relative">
            <pre className="max-h-96 overflow-y-auto whitespace-pre-wrap rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-xs font-mono text-zinc-200 leading-relaxed selection:bg-amber-500 selection:text-black scrollbar-thin">
              {coldEmailTemplate}
            </pre>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-zinc-300 flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>نصيحة المراسلة:</strong> أرسل الإيميل يوم الثلاثاء أو الأربعاء في الصباح (بين 9 و 11 صباحاً بتوقيت مقر الشركة) لتحصل على أعلى معدل فتح للرسالة.
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
