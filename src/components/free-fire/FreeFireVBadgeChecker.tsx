import React, { useState } from 'react';
import { Award, ShieldCheck, CheckCircle2, AlertCircle, Sparkles, TrendingUp, DollarSign, Users, Film, Check, ExternalLink } from 'lucide-react';

export const FreeFireVBadgeChecker: React.FC = () => {
  const [platform, setPlatform] = useState<'youtube' | 'tiktok' | 'facebook'>('youtube');
  const [followers, setFollowers] = useState<number>(120000);
  const [contentRatio, setContentRatio] = useState<number>(85);
  const [monthlyViews, setMonthlyViews] = useState<number>(450000);
  const [cleanRecord, setCleanRecord] = useState<boolean>(true);
  const [uploadCadence, setUploadCadence] = useState<number>(4);

  // Targets
  const targetFollowers = platform === 'youtube' ? 100000 : platform === 'tiktok' ? 200000 : 100000;
  const targetContentRatio = 80;
  const targetMonthlyViews = 300000;
  const targetUploadCadence = 3;

  // Checks
  const isFollowersPass = followers >= targetFollowers;
  const isRatioPass = contentRatio >= targetContentRatio;
  const isViewsPass = monthlyViews >= targetMonthlyViews;
  const isRecordPass = cleanRecord;
  const isCadencePass = uploadCadence >= targetUploadCadence;

  // Readiness Calculation
  const readinessScore = Math.round(
    ((isFollowersPass ? 25 : (followers / targetFollowers) * 20) +
      (isRatioPass ? 20 : (contentRatio / targetContentRatio) * 15) +
      (isViewsPass ? 25 : (monthlyViews / targetMonthlyViews) * 20) +
      (isRecordPass ? 20 : 0) +
      (isCadencePass ? 10 : (uploadCadence / targetUploadCadence) * 8))
  );

  const cappedScore = Math.min(100, Math.max(0, readinessScore));
  const isFullyEligible =
    isFollowersPass && isRatioPass && isViewsPass && isRecordPass && isCadencePass;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-zinc-900 to-zinc-950 p-5 sm:p-6 shadow-xl shadow-amber-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 text-black shadow-lg shadow-amber-500/30">
              <Award className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-xs font-bold text-amber-300">
                <Sparkles className="h-3 w-3" />
                <span>برنامج شراكة Garena الرسمي · سيرفر الشرق الأوسط وشمال أفريقيا (MENA)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                فاحص جاهزية القناة لشراكة جارينا وشارة V-Badge الذهبية
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2">
            <span className="text-xs font-bold text-amber-200">نسبة الجاهزية الحالية:</span>
            <span className="text-xl font-black text-amber-400 font-mono">{cappedScore}%</span>
          </div>
        </div>
        <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
          أدخل إحصائيات قناتك الحقيقية للتحقق من مدى مطابقتها للشروط والمعايير الرسمية المعتمدة لدى إدارة جارينا الإقليمية، ومعرفة الخطوات الناقصة للحصول على شارة التوثيق الذهبية.
        </p>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Platform Selection */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
          <label className="text-xs font-bold text-zinc-400 mb-2 block">
            المنصة الأساسية لقناتك
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPlatform('youtube')}
              className={`py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                platform === 'youtube'
                  ? 'bg-red-500 text-white font-black shadow-md shadow-red-500/20'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              YouTube
            </button>
            <button
              onClick={() => setPlatform('tiktok')}
              className={`py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                platform === 'tiktok'
                  ? 'bg-zinc-100 text-black font-black shadow-md shadow-white/20'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              TikTok
            </button>
            <button
              onClick={() => setPlatform('facebook')}
              className={`py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                platform === 'facebook'
                  ? 'bg-blue-600 text-white font-black shadow-md shadow-blue-500/20'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              Facebook
            </button>
          </div>
          <p className="mt-2 text-[11px] text-zinc-400">
            الحد الأدنى للمشتركين على {platform === 'youtube' ? 'يوتيوب 100 ألف' : platform === 'tiktok' ? 'تيك توك 200 ألف' : 'فيسبوك 100 ألف'}.
          </p>
        </div>

        {/* Followers / Subscribers */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-zinc-400">
              عدد المشتركين / المتابعين
            </label>
            <span className="text-xs font-mono font-black text-amber-400">
              {followers.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={10000}
            max={500000}
            step={5000}
            value={followers}
            onChange={(e) => setFollowers(Number(e.target.value))}
            className="w-full accent-amber-500 h-2 bg-zinc-950 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
            <span>10,000</span>
            <span>المطلوب: {targetFollowers.toLocaleString()}</span>
            <span>500,000+</span>
          </div>
        </div>

        {/* Content Ratio */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-zinc-400">
              نسبة محتوى فري فاير بالقناة
            </label>
            <span className="text-xs font-mono font-black text-amber-400">
              {contentRatio}%
            </span>
          </div>
          <input
            type="range"
            min={30}
            max={100}
            step={5}
            value={contentRatio}
            onChange={(e) => setContentRatio(Number(e.target.value))}
            className="w-full accent-amber-500 h-2 bg-zinc-950 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
            <span>30%</span>
            <span>الحد الأدنى: 80%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Monthly Views */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-zinc-400">
              مشاهدات آخر 30 يوماً
            </label>
            <span className="text-xs font-mono font-black text-amber-400">
              {monthlyViews.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={50000}
            max={2000000}
            step={25000}
            value={monthlyViews}
            onChange={(e) => setMonthlyViews(Number(e.target.value))}
            className="w-full accent-amber-500 h-2 bg-zinc-950 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
            <span>50K</span>
            <span>المطلوب: 300K</span>
            <span>2M+</span>
          </div>
        </div>

        {/* Clean record toggle */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 flex flex-col justify-between">
          <div className="text-xs font-bold text-zinc-400 mb-1">
            سجل القناة والحساب (خالٍ من الهاكات)
          </div>
          <button
            onClick={() => setCleanRecord(!cleanRecord)}
            className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              cleanRecord
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                : 'bg-red-500/20 border border-red-500/40 text-red-300'
            }`}
          >
            <span>{cleanRecord ? 'نظيف تماماً (خالٍ من المخالفات)' : 'يحتوي على مخالفات أو روابط مشبوهة'}</span>
            {cleanRecord ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <AlertCircle className="h-4 w-4 text-red-400" />}
          </button>
          <p className="mt-1.5 text-[10px] text-zinc-400">
            وجود أي ترويج لملفات التهكير يؤدي للرفض الفوري والحظر.
          </p>
        </div>

        {/* Upload Cadence */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-zinc-400">
              عدد الفيديوهات الأسبوعية
            </label>
            <span className="text-xs font-mono font-black text-amber-400">
              {uploadCadence} فيديوهات / أسبوع
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={7}
            step={1}
            value={uploadCadence}
            onChange={(e) => setUploadCadence(Number(e.target.value))}
            className="w-full accent-amber-500 h-2 bg-zinc-950 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
            <span>1 فيديو</span>
            <span>المطلوب: 3-5</span>
            <span>يومياً (7)</span>
          </div>
        </div>
      </div>

      {/* Audit Checklist & Diagnosis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Matrix */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg">
          <h3 className="text-sm font-black text-white flex items-center gap-2 mb-4">
            <ShieldCheck className="h-4 w-4 text-amber-400" />
            <span>فحص الشروط الرسمية الخمسة لمعايير Garena MENA</span>
          </h3>

          <div className="space-y-3">
            {/* Condition 1 */}
            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isFollowersPass ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-center gap-2.5">
                {isFollowersPass ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-bold text-white">الحد الأدنى للجمهور على {platform}</div>
                  <div className="text-[11px] text-zinc-400">
                    الحالي: {followers.toLocaleString()} / المطلوب: {targetFollowers.toLocaleString()}
                  </div>
                </div>
              </div>
              <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                isFollowersPass ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {isFollowersPass ? 'مستوفى' : 'ناقص'}
              </span>
            </div>

            {/* Condition 2 */}
            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isRatioPass ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-center gap-2.5">
                {isRatioPass ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-bold text-white">نسبة تخصيص محتوى فري فاير (≥ 80%)</div>
                  <div className="text-[11px] text-zinc-400">الحالي: {contentRatio}% من القناة</div>
                </div>
              </div>
              <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                isRatioPass ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {isRatioPass ? 'مستوفى' : 'ناقص'}
              </span>
            </div>

            {/* Condition 3 */}
            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isViewsPass ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-center gap-2.5">
                {isViewsPass ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-bold text-white">المشاهدات الشهرية (≥ 300,000 مشاهدة)</div>
                  <div className="text-[11px] text-zinc-400">الحالي: {monthlyViews.toLocaleString()}</div>
                </div>
              </div>
              <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                isViewsPass ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {isViewsPass ? 'مستوفى' : 'ناقص'}
              </span>
            </div>

            {/* Condition 4 */}
            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isRecordPass ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-center gap-2.5">
                {isRecordPass ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-bold text-white">نزاهة القناة والخلو من برامج الغش</div>
                  <div className="text-[11px] text-zinc-400">شرط حاسم وغير قابل للتفاوض</div>
                </div>
              </div>
              <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                isRecordPass ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {isRecordPass ? 'مستوفى' : 'مرفوض'}
              </span>
            </div>

            {/* Condition 5 */}
            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isCadencePass ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-center gap-2.5">
                {isCadencePass ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-bold text-white">الانتظام بالنشر (≥ 3 فيديوهات أسبوعياً)</div>
                  <div className="text-[11px] text-zinc-400">الحالي: {uploadCadence} فيديوهات أسبوعياً</div>
                </div>
              </div>
              <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                isCadencePass ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {isCadencePass ? 'مستوفى' : 'ناقص'}
              </span>
            </div>
          </div>
        </div>

        {/* Perks & Unlocks preview */}
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-zinc-900 to-amber-950/30 p-5 shadow-lg">
          <h3 className="text-sm font-black text-white flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>المميزات الرسمية التي تفتحها عند الحصول على V-Badge</span>
          </h3>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>💎 راتب الجواهر الشهري</span>
              </div>
              <div className="text-[11px] text-zinc-300 mt-1 leading-relaxed">
                ما بين 5,000 إلى 25,000 جوهرة تُشحن مباشرة في حسابك كل أول شهر لتجربة السكنات وتنظيم المسابقات.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>🎁 أكواد الاسترداد الحصرية (Redeem Codes)</span>
              </div>
              <div className="text-[11px] text-zinc-300 mt-1 leading-relaxed">
                أكواد سكنات ورقصات نادرة مرسلة من جارينا لتوزيعها على متابعيك لرفع التفاعل في البثوث والفيديوهات.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>📞 خط اتصال وتواصل مباشر مع مديري المجتمع</span>
              </div>
              <div className="text-[11px] text-zinc-300 mt-1 leading-relaxed">
                انضمام لسيرفر ديسكورد النخبة للشركاء لحل مشاكل الحساب في ساعات واستلام التحديثات قبل نزولها.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>🏆 دعوات لبطولات FFWS والفعاليات الرسمية</span>
              </div>
              <div className="text-[11px] text-zinc-300 mt-1 leading-relaxed">
                تغطية إعلامية في صفحة اللعبة الرسمية وإمكانية السفر لتغطية بطولات العالم للرياضات الإلكترونية.
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400">
            {isFullyEligible ? (
              <div className="text-emerald-300 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>تهانينا! قناتك مؤهلة رسمياً للتقديم على استمارة شراكة جارينا القادمة.</span>
              </div>
            ) : (
              <div className="text-amber-300 font-medium">
                ⚠️ ركز على استكمال الشروط المتبقية بالأعلى للوصول إلى نسبة جاهزية 100%.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
