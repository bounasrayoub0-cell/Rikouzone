import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Sparkles, RefreshCw, Layers, Gamepad2, Users, Clock, ShieldCheck, Heart } from 'lucide-react';

interface Preset {
  name: string;
  concurrentViewers: number;
  streamHoursPerWeek: number;
  subscribersCount: number;
  subPrice: number;
  platformCutPercent: number; // e.g. 50 for Twitch, 5 for Kick, 30 for YouTube
  monthlyDonations: number;
  monthlySponsorships: number;
  monthlyAdSense: number;
}

export const GamingEarningsCalculator: React.FC = () => {
  const [platform, setPlatform] = useState<'kick' | 'twitch' | 'youtube' | 'tiktok'>('kick');
  const [concurrentViewers, setConcurrentViewers] = useState<number>(35);
  const [streamHoursPerWeek, setStreamHoursPerWeek] = useState<number>(12);
  const [subscribersCount, setSubscribersCount] = useState<number>(40);
  const [subPrice, setSubPrice] = useState<number>(4.99);
  const [monthlyDonations, setMonthlyDonations] = useState<number>(85);
  const [monthlySponsorships, setMonthlySponsorships] = useState<number>(150);
  const [monthlyAdSense, setMonthlyAdSense] = useState<number>(60);

  // Platform cut
  const platformCut = platform === 'kick' ? 5 : platform === 'youtube' ? 30 : platform === 'twitch' ? 50 : 50;

  const presets: Record<string, Preset> = {
    beginner: {
      name: 'ستريمر مبتدئ (15-30 مشاهد متزامن)',
      concurrentViewers: 20,
      streamHoursPerWeek: 10,
      subscribersCount: 25,
      subPrice: 4.99,
      platformCutPercent: 5,
      monthlyDonations: 45,
      monthlySponsorships: 0,
      monthlyAdSense: 25
    },
    affiliate: {
      name: 'ستريمر صاعد / شريك (60-120 مشاهد)',
      concurrentViewers: 85,
      streamHoursPerWeek: 15,
      subscribersCount: 120,
      subPrice: 4.99,
      platformCutPercent: 5,
      monthlyDonations: 220,
      monthlySponsorships: 350,
      monthlyAdSense: 180
    },
    fulltime: {
      name: 'ستريمر محترف متفرغ (300-800+ مشاهد)',
      concurrentViewers: 450,
      streamHoursPerWeek: 25,
      subscribersCount: 650,
      subPrice: 4.99,
      platformCutPercent: 5,
      monthlyDonations: 1100,
      monthlySponsorships: 2200,
      monthlyAdSense: 850
    }
  };

  const applyPreset = (presetKey: string) => {
    const p = presets[presetKey];
    if (!p) return;
    setConcurrentViewers(p.concurrentViewers);
    setStreamHoursPerWeek(p.streamHoursPerWeek);
    setSubscribersCount(p.subscribersCount);
    setSubPrice(p.subPrice);
    setMonthlyDonations(p.monthlyDonations);
    setMonthlySponsorships(p.monthlySponsorships);
    setMonthlyAdSense(p.monthlyAdSense);
  };

  // Calculations
  const grossSubRevenue = subscribersCount * subPrice;
  const netSubRevenue = grossSubRevenue * ((100 - platformCut) / 100);
  const totalMonthlyEarnings = netSubRevenue + monthlyDonations + monthlySponsorships + monthlyAdSense;
  const totalAnnualEarnings = totalMonthlyEarnings * 12;
  const totalHoursPerMonth = streamHoursPerWeek * 4.33;
  const hourlyRate = totalHoursPerMonth > 0 ? totalMonthlyEarnings / totalHoursPerMonth : 0;

  return (
    <div className="space-y-8 text-right" dir="rtl">
      {/* Header */}
      <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-zinc-900/80 to-zinc-900/50 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>حاسبة أرباح الستريمر ومحتوى الألعاب</span>
                <span className="rounded-md bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 text-xs text-purple-300 font-bold">
                  2025 Model
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                احسب دخلك الشهري المتوقع بناءً على الاشتراكات، التبرعات، الرعايات، وإعلانات المنصة وفقاً لنسب الاقتطاع الحقيقية.
              </p>
            </div>
          </div>
          <button
            onClick={() => applyPreset('beginner')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3.5 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all self-start sm:self-center"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>إعادة ضبط الافتراضات</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mt-5 pt-5 border-t border-zinc-800/80 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 ml-2">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>نماذج جاهزة سريعة:</span>
          </span>
          {Object.entries(presets).map(([key, p]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className="rounded-lg border border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-1.5 text-xs font-semibold text-purple-300 transition-all cursor-pointer"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Input Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Platform Selector */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
              1. اختر منصة البث الرئيسية لحساب نسبة الاقتطاع من الاشتراكات:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'kick', name: 'Kick', cut: 'تأخذ 5% فقط', tag: '95% لصانع المحتوى', color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' },
                { id: 'youtube', name: 'YouTube', cut: 'تأخذ 30%', tag: '70% لصانع المحتوى', color: 'border-red-500/50 bg-red-500/10 text-red-300' },
                { id: 'twitch', name: 'Twitch', cut: 'تأخذ 50%', tag: '50% لصانع المحتوى', color: 'border-purple-500/50 bg-purple-500/10 text-purple-300' },
                { id: 'tiktok', name: 'TikTok Live', cut: 'تأخذ ~50%', tag: 'هدايا وماسات', color: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPlatform(item.id as any)}
                  className={`rounded-xl border p-3 text-right transition-all cursor-pointer ${
                    platform === item.id
                      ? `${item.color} font-black ring-1 ring-white/20 shadow-lg`
                      : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <div className="text-sm font-black">{item.name}</div>
                  <div className="text-[11px] opacity-90 mt-0.5">{item.cut}</div>
                  <div className="text-[10px] mt-1 font-semibold opacity-75">{item.tag}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sliders Box */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-5">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-400" />
              <span>2. المشاهدون والاشتراكات الشهرية</span>
            </h3>

            {/* Concurrent Viewers */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-zinc-300 font-bold">متوسط المشاهدين المتزامنين (CCV):</span>
                <span className="font-black text-purple-400 text-sm">{concurrentViewers.toLocaleString()} مشاهد</span>
              </div>
              <input
                type="range"
                min="5"
                max="1000"
                step="5"
                value={concurrentViewers}
                onChange={(e) => setConcurrentViewers(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>5 مبتدئ</span>
                <span>100 متقدم</span>
                <span>500+ نجم</span>
                <span>1,000+</span>
              </div>
            </div>

            {/* Subscribers Count */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-zinc-300 font-bold">عدد المشتركين الداعمين شهرياً (Paid Subs):</span>
                <span className="font-black text-emerald-400 text-sm">{subscribersCount} مشترك</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="5"
                value={subscribersCount}
                onChange={(e) => setSubscribersCount(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>0 مشترك</span>
                <span>100 مشترك</span>
                <span>500 مشترك</span>
                <span>1,000+</span>
              </div>
            </div>

            {/* Stream Hours per Week */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-zinc-300 font-bold">ساعات البث أسبوعياً:</span>
                <span className="font-black text-cyan-400 text-sm">{streamHoursPerWeek} ساعة / أسبوع</span>
              </div>
              <input
                type="range"
                min="4"
                max="40"
                step="2"
                value={streamHoursPerWeek}
                onChange={(e) => setStreamHoursPerWeek(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>4 ساعات (بث خفيف)</span>
                <span>15 ساعة (متوازن)</span>
                <span>30+ ساعة (تفرغ كامل)</span>
              </div>
            </div>
          </div>

          {/* Direct Income & Sponsorships */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-amber-400" />
              <span>3. التبرعات المباشرة والرعايات الشهرية ($)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 mb-1">
                  التبرعات المباشرة (Tips / PayPal):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={monthlyDonations}
                    onChange={(e) => setMonthlyDonations(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white font-bold text-left pl-7 focus:border-purple-500 focus:outline-none"
                  />
                  <span className="absolute left-2.5 top-2.5 text-zinc-500 text-xs">$</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 mb-1">
                  رعايات الشركات وعقود الألعاب:
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={monthlySponsorships}
                    onChange={(e) => setMonthlySponsorships(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white font-bold text-left pl-7 focus:border-purple-500 focus:outline-none"
                  />
                  <span className="absolute left-2.5 top-2.5 text-zinc-500 text-xs">$</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 mb-1">
                  أرباح الإعلانات (AdSense / Ads):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={monthlyAdSense}
                    onChange={(e) => setMonthlyAdSense(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white font-bold text-left pl-7 focus:border-purple-500 focus:outline-none"
                  />
                  <span className="absolute left-2.5 top-2.5 text-zinc-500 text-xs">$</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right / Output Summary Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Grand Revenue Card */}
          <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-500/15 via-zinc-900/90 to-zinc-950 p-6 shadow-xl shadow-emerald-500/10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-0.5 text-xs font-black text-emerald-300">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>إجمالي الدخل الشهري المتوقع</span>
            </span>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                ${Math.round(totalMonthlyEarnings).toLocaleString()}
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 font-bold">/ شهرياً</span>
            </div>

            <div className="mt-2 text-xs text-zinc-400">
              ما يعادل تقريباً <span className="font-bold text-emerald-300">${Math.round(totalAnnualEarnings).toLocaleString()}</span> سنوياً
            </div>

            {/* Income Breakdown Bar */}
            <div className="mt-6 space-y-3 pt-5 border-t border-zinc-800">
              <div className="text-xs font-bold text-zinc-300 mb-2">توزيع مصادر الدخل:</div>

              {/* Subs */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                  <span>صافي الاشتراكات ({subscribersCount} مشترك):</span>
                </span>
                <span className="font-black text-white">${Math.round(netSubRevenue).toLocaleString()}</span>
              </div>

              {/* Donations */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-pink-500" />
                  <span>التبرعات والدعم المباشر:</span>
                </span>
                <span className="font-black text-white">${monthlyDonations.toLocaleString()}</span>
              </div>

              {/* Sponsorships */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <span>الرعايات وعقود الألعاب:</span>
                </span>
                <span className="font-black text-white">${monthlySponsorships.toLocaleString()}</span>
              </div>

              {/* AdSense */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  <span>إعلانات المشاهدات:</span>
                </span>
                <span className="font-black text-white">${monthlyAdSense.toLocaleString()}</span>
              </div>
            </div>

            {/* Hourly Rate Stat */}
            <div className="mt-6 rounded-xl bg-zinc-900/90 border border-zinc-800 p-3.5 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-zinc-400 font-bold">العائد الفعلي لكل ساعة بث:</div>
                <div className="text-lg font-black text-cyan-300">
                  ${hourlyRate.toFixed(1)} / ساعة
                </div>
              </div>
              <Clock className="h-6 w-6 text-cyan-400/50" />
            </div>
          </div>

          {/* Strategic Pro Tip Card */}
          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 space-y-2.5">
            <h4 className="text-xs font-black text-purple-300 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-purple-400" />
              <span>نصيحة المنصة والخوارزمية:</span>
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              إذا كنت تبث على <strong className="text-white">Kick</strong> فإنك تحتفظ بـ <strong>$4.74</strong> من كل اشتراك بقيمة $4.99، بينما تأخذ <strong className="text-white">Twitch</strong> نصف المبلغ ($2.49). ومع ذلك، تفوق منصة <strong className="text-white">YouTube</strong> يكمن في تحول البث إلى فيديو دائم يدر أرباح الإعلانات لسنوات.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
