import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  Mail, 
  Share2,
  CheckCircle2,
  AlertCircle,
  Instagram,
  Eye,
  MessageCircle,
  Bookmark
} from 'lucide-react';
import { instagramColdPitchTemplate } from '../../data/instagramMonetizationData';

interface InstagramCalculatorsProps {
  onCopyText: (text: string, label: string) => void;
}

export const InstagramCalculators: React.FC<InstagramCalculatorsProps> = ({ onCopyText }) => {
  const [activeTab, setActiveTab] = useState<'engagement' | 'biomaker' | 'mediakit' | 'pitch'>('engagement');

  // --- 1. Engagement & Sponsorship Value Calculator State ---
  const [followersCount, setFollowersCount] = useState<number>(12000);
  const [avgLikes, setAvgLikes] = useState<number>(450);
  const [avgComments, setAvgComments] = useState<number>(45);
  const [avgShares, setAvgShares] = useState<number>(85);
  const [avgSaves, setAvgSaves] = useState<number>(110);
  const [selectedNiche, setSelectedNiche] = useState<string>('tech');

  // Engagement Rate calculation
  const totalInteractions = avgLikes + avgComments + avgShares + avgSaves;
  const engagementRate = useMemo(() => {
    if (followersCount <= 0) return 0;
    const rate = (totalInteractions / followersCount) * 100;
    return Number(rate.toFixed(2));
  }, [totalInteractions, followersCount]);

  // Engagement Grade assessment
  const engagementRating = useMemo(() => {
    if (engagementRate < 1.5) {
      return { label: 'ضعيف (يحتاج تحسين)', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30', note: 'المتابعون غير متفاعلين بشكل كافٍ؛ ركز على طرح أسئلة وتفعيل الستوري.' };
    } else if (engagementRate < 3.0) {
      return { label: 'متوسط ومقبول', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30', note: 'نسبة طبيعية للحسابات المتوسطة؛ يمكنك البدء في البحث عن رعايات صغيرة.' };
    } else if (engagementRate < 6.0) {
      return { label: 'جيد جداً ومثالي', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', note: 'نسبة ممتازة تجذب الشركات بسهولة وتدل على ثقة الجمهور فيك.' };
    } else {
      return { label: 'استثنائي ومذهل 🔥', color: 'text-amber-300 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/40', note: 'أداء نخبوي! جمهورك مخلص جداً ويمكنك طلب أسعار أعلى بكثير من المتوسط.' };
    }
  }, [engagementRate]);

  // Estimated Brand Deal Value for 1 Reel + 1 Story
  const estimatedDealRange = useMemo(() => {
    const nicheMultipliers: Record<string, number> = {
      finance: 1.4,
      tech: 1.25,
      business: 1.2,
      lifestyle: 0.9,
      beauty: 1.0,
      gaming: 0.85
    };
    const mult = nicheMultipliers[selectedNiche] || 1.0;
    
    // Base formula: followers * (engagementRate / 100) * market rate factor
    const baseValue = (followersCount * 0.015) + (totalInteractions * 0.25);
    const minVal = Math.max(30, Math.round(baseValue * 0.8 * mult));
    const maxVal = Math.max(60, Math.round(baseValue * 1.5 * mult));
    return { min: minVal, max: maxVal };
  }, [followersCount, totalInteractions, selectedNiche]);

  // --- 2. Interactive Bio Maker State ---
  const [bioTitle, setBioTitle] = useState<string>('مهندس وصانع محتوى تقني 💻');
  const [bioHelps, setBioHelps] = useState<string>('أساعدك تبدأ العمل الحر وتستثمر أدوات الذكاء الاصطناعي');
  const [bioProof, setBioProof] = useState<string>('🚀 +120 طالب حققوا أول مبيعاتهم الرقمية');
  const [bioCta, setBioCta] = useState<string>('👇 حمل دليلك المجاني لـ 50 أداة AI الآن');
  const [bioLink, setBioLink] = useState<string>('rikouzone.com/free-guide');
  const [isCopiedBio, setIsCopiedBio] = useState<boolean>(false);

  const formattedBioText = useMemo(() => {
    return `${bioTitle}
${bioHelps}
${bioProof}
${bioCta}
🔗 ${bioLink}`;
  }, [bioTitle, bioHelps, bioProof, bioCta, bioLink]);

  const handleCopyBio = () => {
    onCopyText(formattedBioText, 'تم نسخ نص البايو بنجاح!');
    setIsCopiedBio(true);
    setTimeout(() => setIsCopiedBio(false), 2500);
  };

  // --- 3. Interactive Media Kit State ---
  const [mediaHandle, setMediaHandle] = useState<string>('@your_handle');
  const [mediaNiche, setMediaNiche] = useState<string>('صناعة المحتوى، الذكاء الاصطناعي، العمل الحر');
  const [mediaFollowers, setMediaFollowers] = useState<string>('15,000+ متابع');
  const [mediaAvgViews, setMediaAvgViews] = useState<string>('18,000 - 45,000 مشاهدة للريلز');
  const [mediaEngRate, setMediaEngRate] = useState<string>('5.2% (أعلى من متوسط المجال)');
  const [mediaAudience, setMediaAudience] = useState<string>('75% شباب (18-34 عاماً)، المغرب، السعودية، الإمارات ومصر');
  const [mediaContact, setMediaContact] = useState<string>('collabs@yourchannel.com');
  const [isCopiedKit, setIsCopiedKit] = useState<boolean>(false);

  const formattedMediaKit = useMemo(() => {
    return `📊 MEDIA KIT — إنستغرام لـ ${mediaHandle}

📱 الحساب: ${mediaHandle}
🎯 التخصص (Niche): ${mediaNiche}
👥 عدد المتابعين: ${mediaFollowers}
👀 متوسط مشاهدات الريلز (Reels Plays): ${mediaAvgViews}
⚡ معدل التفاعل (Engagement Rate): ${mediaEngRate}
🌍 تركيبة الجمهور والمواقع: ${mediaAudience}
📩 البريد الرسمي للتعاون: ${mediaContact}

✨ باقات التعاون والرعاية المتاحة:
1. مقطع Reels حصري مخصص للمنتج (Dedicated Review) مع تثبيت تعليق الرابط.
2. تغطية متسلسلة في Stories (3 ستوريز مع ملصق رابط مباشر Link Sticker).
3. إدراج العلامة تحت وسم الشراكة الرسمية (Paid Partnership Label).
4. حقوق إعادة الاستخدام الإعلاني (Usage Rights / Whitelisting) لمدة 30 يوماً.

لطلب ملف الأسعار (Rate Card) وحجز تاريخ النشر، يرجى المراسلة على: ${mediaContact}`;
  }, [mediaHandle, mediaNiche, mediaFollowers, mediaAvgViews, mediaEngRate, mediaAudience, mediaContact]);

  const handleCopyKit = () => {
    onCopyText(formattedMediaKit, 'تم نسخ بيانات الـ Media Kit بنجاح!');
    setIsCopiedKit(true);
    setTimeout(() => setIsCopiedKit(false), 2500);
  };

  // --- 4. Interactive Cold Pitch State ---
  const [pitchBrand, setPitchBrand] = useState<string>('اسم الشركة / الماركة');
  const [pitchProduct, setPitchProduct] = useState<string>('تطبيقكم الجديد لتنظيم المهام');
  const [pitchProblem, setPitchProblem] = useState<string>('فوضى إدارة الوقت وتشتت العمل الحر');
  const [pitchCreatorName, setPitchCreatorName] = useState<string>('أيوب');
  const [isCopiedPitch, setIsCopiedPitch] = useState<boolean>(false);

  const formattedPitch = useMemo(() => {
    return instagramColdPitchTemplate
      .replace(/\[اسم الشركة أو الماركة\]/g, pitchBrand)
      .replace(/\[اسمك\]/g, pitchCreatorName)
      .replace(/\[اسم منتجهم\]/g, pitchProduct)
      .replace(/\[المشكلة التي يحلها المنتج\]/g, pitchProblem)
      .replace(/\[مجال حسابك: مثلاً ريادة الأعمال، التقنية، التصميم\]/g, mediaNiche)
      .replace(/\[اسم_حسابك\]/g, mediaHandle.replace('@', ''))
      .replace(/\[عدد المتابعين\]/g, mediaFollowers)
      .replace(/\[متوسط المشاهدات\]/g, mediaAvgViews)
      .replace(/\[نسبة التفاعل %\]/g, mediaEngRate)
      .replace(/\[أهم الدول: المغرب، السعودية، مصر...\]/g, mediaAudience)
      .replace(/\[بريدك الإلكتروني\]/g, mediaContact);
  }, [pitchBrand, pitchCreatorName, pitchProduct, pitchProblem, mediaNiche, mediaHandle, mediaFollowers, mediaAvgViews, mediaEngRate, mediaAudience, mediaContact]);

  const handleCopyPitch = () => {
    onCopyText(formattedPitch, 'تم نسخ رسالة التواصل مع الشركات بنجاح!');
    setIsCopiedPitch(true);
    setTimeout(() => setIsCopiedPitch(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Sub-tabs header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800 scrollbar-none">
        <button
          onClick={() => setActiveTab('engagement')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'engagement'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <Calculator className="h-4 w-4" />
          <span>حاسبة التفاعل وسعر الرعاية</span>
        </button>

        <button
          onClick={() => setActiveTab('biomaker')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'biomaker'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <Instagram className="h-4 w-4" />
          <span>منشئ البايو الاحترافي</span>
        </button>

        <button
          onClick={() => setActiveTab('mediakit')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'mediakit'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>مولد الـ Media Kit التفاعلي</span>
        </button>

        <button
          onClick={() => setActiveTab('pitch')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'pitch'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <Mail className="h-4 w-4" />
          <span>رسالة مراسلة الشركات (Pitch)</span>
        </button>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* TAB 1: ENGAGEMENT & REVENUE ESTIMATOR */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'engagement' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>معادلة خوارزمية إنستغرام الرسمية</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  حاسبة معدل التفاعل (Engagement Rate) وتقدير سعر الرعاية
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                  أدخل أرقام حسابك الحقيقية لمعرفة تقييم حسابك لدى الشركات وتقدير السعر العادل لإعلانات الريلز والستوري.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-xl text-xs font-black border ${engagementRating.color}`}>
                  {engagementRating.label}
                </span>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Followers */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
                <label className="text-xs font-bold text-zinc-400 block mb-2">
                  عدد المتابعين (Followers)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="100"
                    step="500"
                    value={followersCount}
                    onChange={(e) => setFollowersCount(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-mono font-bold text-white focus:border-amber-500 focus:outline-none"
                  />
                  <Users className="h-4 w-4 text-zinc-500 shrink-0" />
                </div>
              </div>

              {/* Likes */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
                <label className="text-xs font-bold text-zinc-400 block mb-2">
                  متوسط الإعجابات (Likes per Post)
                </label>
                <input
                  type="number"
                  min="0"
                  step="20"
                  value={avgLikes}
                  onChange={(e) => setAvgLikes(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-mono font-bold text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Comments */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
                <label className="text-xs font-bold text-zinc-400 block mb-2">
                  متوسط التعليقات (Comments)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={avgComments}
                    onChange={(e) => setAvgComments(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-mono font-bold text-white focus:border-amber-500 focus:outline-none"
                  />
                  <MessageCircle className="h-4 w-4 text-zinc-500 shrink-0" />
                </div>
              </div>

              {/* Shares */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
                <label className="text-xs font-bold text-zinc-400 block mb-2">
                  متوسط المشاركات (Shares)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={avgShares}
                    onChange={(e) => setAvgShares(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-mono font-bold text-white focus:border-amber-500 focus:outline-none"
                  />
                  <Share2 className="h-4 w-4 text-zinc-500 shrink-0" />
                </div>
              </div>

              {/* Saves */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
                <label className="text-xs font-bold text-zinc-400 block mb-2">
                  متوسط الحفظ (Saves - الأهم للشركات)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={avgSaves}
                    onChange={(e) => setAvgSaves(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-mono font-bold text-white focus:border-amber-500 focus:outline-none"
                  />
                  <Bookmark className="h-4 w-4 text-zinc-500 shrink-0" />
                </div>
              </div>

              {/* Niche */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
                <label className="text-xs font-bold text-zinc-400 block mb-2">
                  تخصص الحساب (Niche)
                </label>
                <select
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-bold text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="tech">تقنية وذكاء اصطناعي (Tech & AI)</option>
                  <option value="finance">مالية وتجارة إلكترونية (Finance)</option>
                  <option value="business">ريادة أعمال وتسويق (Business)</option>
                  <option value="lifestyle">لايف ستايل ويوميات (Lifestyle)</option>
                  <option value="beauty">جمال وموضة (Beauty & Fashion)</option>
                  <option value="gaming">ألعاب وفري فاير (Gaming)</option>
                </select>
              </div>

            </div>

            {/* Results Display Banner */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Engagement Result */}
              <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-950 p-5">
                <span className="text-xs font-bold text-zinc-400 block">معدل التفاعل الفعلي (ER)</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
                    {engagementRate}%
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  {engagementRating.note}
                </p>
              </div>

              {/* Estimated Single Reel Deal */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
                <span className="text-xs font-bold text-zinc-400 block">السعر المقترح لريلز + ستوري</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    ${estimatedDealRange.min} - ${estimatedDealRange.max}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  نطاق تسعير مقترح لصفقات الشركات الناشئة بناءً على تفاعلك وتخصصك.
                </p>
              </div>

              {/* Monthly Potential from 2 Deals */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
                <span className="text-xs font-bold text-zinc-400 block">العائد المتوقع من صفقتين شهرياً</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    ${estimatedDealRange.min * 2} - ${estimatedDealRange.max * 2}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  بدون احتساب مبيعات روابط الأفلييت الإضافية أو منتجاتك الخاصة.
                </p>
              </div>

            </div>

            <div className="mt-4 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                تنبيه واقعي: هذه الأرقام تقديرية مستندة إلى متوسط السوق لعام 2026. تختلف الأسعار الحقيقية وفقاً لبلد جمهورك (الجمهور الخليجي والأوروبي يدفع للرعاة أكثر من غيره)، وقوة تفاوضك، ومصداقية محتواك.
              </span>
            </div>

          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 2: BIO MAKER */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'biomaker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Inputs */}
          <div className="lg:col-span-7 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
            <div>
              <h4 className="text-base font-black text-white">محرر البايو وفق صيغة الـ 5 ثوانٍ</h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                املأ الحقول لتحصل على بايو جذاب يقنع الزائر بمتابعتك والنقر على رابطك فوراً.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                السطر 1: هويتك وتخصصك ومجالك
              </label>
              <input
                type="text"
                value={bioTitle}
                onChange={(e) => setBioTitle(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                السطر 2: الفائدة المباشرة التي تقدمها للمتابع (Who you help)
              </label>
              <input
                type="text"
                value={bioHelps}
                onChange={(e) => setBioHelps(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                السطر 3: إثبات اجتماعي أو إنجاز يولد الثقة (Social Proof)
              </label>
              <input
                type="text"
                value={bioProof}
                onChange={(e) => setBioProof(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                السطر 4: النداء الموجه للرابط (Call to Action)
              </label>
              <input
                type="text"
                value={bioCta}
                onChange={(e) => setBioCta(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                رابط العرض أو المتجر (External Link)
              </label>
              <input
                type="text"
                value={bioLink}
                onChange={(e) => setBioLink(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-mono font-semibold text-amber-400 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Instagram Profile Mockup Preview */}
          <div className="lg:col-span-5 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
              <span className="text-xs font-bold text-zinc-400">معاينة الحساب الحية</span>
              <button
                onClick={handleCopyBio}
                className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-all"
              >
                {isCopiedBio ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{isCopiedBio ? 'تم النسخ!' : 'نسخ البايو'}</span>
              </button>
            </div>

            <div className="rounded-2xl border border-zinc-800/90 bg-black/60 p-4 space-y-3 font-sans">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 shrink-0">
                  <div className="h-full w-full rounded-full bg-zinc-900 border border-black flex items-center justify-center">
                    <Instagram className="h-6 w-6 text-amber-400" />
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-black text-white">your_name_official</h5>
                  <span className="text-[11px] text-zinc-500 font-medium">منشئ محتوى رقمي</span>
                </div>
              </div>

              {/* Bio text formatted */}
              <div className="text-xs text-zinc-200 leading-relaxed whitespace-pre-line pt-2">
                {formattedBioText}
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 leading-relaxed">
              💡 نصيحة: انسخ النص والصقه مباشرة في خيار "تعديل الملف الشخصي (Edit Profile)" داخل تطبيق إنستغرام.
            </p>
          </div>

        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 3: MEDIA KIT GENERATOR */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'mediakit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-6 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3.5">
            <h4 className="text-base font-black text-white">بيانات الـ Media Kit الرسمي</h4>
            <p className="text-xs text-zinc-400">
              ادخل بيانات حسابك الحالية لإنشاء ملخص احترافي ترسله للشركات عند طلب الأسعار.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">اسم الحساب (Handle)</label>
                <input
                  type="text"
                  value={mediaHandle}
                  onChange={(e) => setMediaHandle(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-bold text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">عدد المتابعين</label>
                <input
                  type="text"
                  value={mediaFollowers}
                  onChange={(e) => setMediaFollowers(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-bold text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">متوسط مشاهدات الريلز</label>
                <input
                  type="text"
                  value={mediaAvgViews}
                  onChange={(e) => setMediaAvgViews(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-bold text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">معدل التفاعل</label>
                <input
                  type="text"
                  value={mediaEngRate}
                  onChange={(e) => setMediaEngRate(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-bold text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-400 block mb-1">التخصص الدقيق (Niche)</label>
              <input
                type="text"
                value={mediaNiche}
                onChange={(e) => setMediaNiche(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-bold text-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-400 block mb-1">تفاصيل الجمهور والمواقع</label>
              <input
                type="text"
                value={mediaAudience}
                onChange={(e) => setMediaAudience(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-bold text-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-400 block mb-1">بريد التواصل والشراكات</label>
              <input
                type="email"
                value={mediaContact}
                onChange={(e) => setMediaContact(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono font-bold text-amber-400"
              />
            </div>
          </div>

          {/* Formatted Output */}
          <div className="lg:col-span-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
              <span className="text-xs font-bold text-zinc-400">النص الجاهز للميديا كيت</span>
              <button
                onClick={handleCopyKit}
                className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-black text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
              >
                {isCopiedKit ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{isCopiedKit ? 'تم النسخ!' : 'نسخ الـ Media Kit'}</span>
              </button>
            </div>

            <pre className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 text-xs font-sans text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto">
              {formattedMediaKit}
            </pre>
          </div>

        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 4: COLD PITCH EMAIL / DM */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === 'pitch' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-5 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
            <div>
              <h4 className="text-base font-black text-white">تخصيص رسالة الـ Cold Pitch</h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                تخصيص سريع لرسالة التواصل مع أي علامة تجارية ترغب في التعاون معها.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-400 block mb-1.5">اسمك الأول</label>
              <input
                type="text"
                value={pitchCreatorName}
                onChange={(e) => setPitchCreatorName(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-bold text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-400 block mb-1.5">اسم الشركة أو الماركة</label>
              <input
                type="text"
                value={pitchBrand}
                onChange={(e) => setPitchBrand(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-bold text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-400 block mb-1.5">اسم منتجهم الذي تريد الترويج له</label>
              <input
                type="text"
                value={pitchProduct}
                onChange={(e) => setPitchProduct(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-bold text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-400 block mb-1.5">المشكلة التي يحلها المنتج لجمهورك</label>
              <input
                type="text"
                value={pitchProblem}
                onChange={(e) => setPitchProblem(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-bold text-white"
              />
            </div>
          </div>

          <div className="lg:col-span-7 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
              <span className="text-xs font-bold text-zinc-400">الرسالة الجاهزة للإرسال عبر الإيميل أو الـ DM</span>
              <button
                onClick={handleCopyPitch}
                className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-black text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
              >
                {isCopiedPitch ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{isCopiedPitch ? 'تم النسخ!' : 'نسخ الرسالة كاملة'}</span>
              </button>
            </div>

            <pre className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 text-xs font-sans text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-[420px] overflow-y-auto">
              {formattedPitch}
            </pre>
          </div>

        </div>
      )}

    </div>
  );
};
