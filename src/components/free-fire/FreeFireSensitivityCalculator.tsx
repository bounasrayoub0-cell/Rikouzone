import React, { useState, useMemo } from 'react';
import { Sliders, Smartphone, Target, Copy, Check, Sparkles, AlertTriangle, ShieldCheck, Cpu, RefreshCw, Zap, Crosshair } from 'lucide-react';

interface DevicePreset {
  brandId: 'samsung' | 'xiaomi' | 'iphone' | 'realme' | 'infinix' | 'emulator';
  brandName: string;
  defaultDpi: number;
  recommendedDpi: number;
  maxSafeDpi: number;
  generalBase: number;
  redDotBase: number;
  scope2xBase: number;
  scope4xBase: number;
  sniperBase: number;
  freeLookBase: number;
  buttonSize: number;
  buttonPosition: string;
  notes: string;
}

const DEVICE_PRESETS: Record<string, DevicePreset> = {
  samsung: {
    brandId: 'samsung',
    brandName: 'Samsung Galaxy (A / M / S / Z)',
    defaultDpi: 384,
    recommendedDpi: 600,
    maxSafeDpi: 720,
    generalBase: 96,
    redDotBase: 88,
    scope2xBase: 82,
    scope4xBase: 78,
    sniperBase: 58,
    freeLookBase: 65,
    buttonSize: 46,
    buttonPosition: 'في الثلث السفلي الأيمن، على ارتفاع 15% من الحافة السفلية',
    notes: 'شاشات سامسونج Super AMOLED تستجيب بروعة مع DPI بين 580 و620، مع تنشيط Game Booster وإيقاف تحسين البطارية للعبة.'
  },
  xiaomi: {
    brandId: 'xiaomi',
    brandName: 'Xiaomi / Redmi / POCO (HyperOS / MIUI)',
    defaultDpi: 392,
    recommendedDpi: 560,
    maxSafeDpi: 620,
    generalBase: 94,
    redDotBase: 86,
    scope2xBase: 80,
    scope4xBase: 76,
    sniperBase: 55,
    freeLookBase: 60,
    buttonSize: 45,
    buttonPosition: 'منخفض جداً في الركن السفلي الأيمن لإفساح مجال سحب أطول',
    notes: 'تجنب تجاوز 620 DPI في واجهة شاومي لتفادي اختفاء الكيبورد. شغل Game Turbo وارفع استجابة اللمس إلى أقصى درجة.'
  },
  iphone: {
    brandId: 'iphone',
    brandName: 'Apple iPhone (iOS 15 / 16 / 17 / 18)',
    defaultDpi: 0, // Not applicable on iOS
    recommendedDpi: 0,
    maxSafeDpi: 0,
    generalBase: 98,
    redDotBase: 92,
    scope2xBase: 85,
    scope4xBase: 82,
    sniperBase: 62,
    freeLookBase: 70,
    buttonSize: 44,
    buttonPosition: 'في الربع السفلي الأيمن بارتفاع إصبعين عن الحافة السفلية',
    notes: 'لا يوجد DPI في iOS؛ اضبط سرعة تتبع المؤشر في AssistiveTouch على أقصى سرعة (الأرنب) وGliding Cursor على 120 في التحكم بالتبديل.'
  },
  realme: {
    brandId: 'realme',
    brandName: 'Realme / Oppo / OnePlus (ColorOS / RealmeUI)',
    defaultDpi: 360,
    recommendedDpi: 540,
    maxSafeDpi: 600,
    generalBase: 95,
    redDotBase: 89,
    scope2xBase: 82,
    scope4xBase: 78,
    sniperBase: 56,
    freeLookBase: 65,
    buttonSize: 46,
    buttonPosition: 'في الثلث السفلي الأيمن بمحاذاة خط العين عند الراحة',
    notes: 'واجهة ريلمي سريعة الاستجابة. فعل وضع Pro Gamer في تطبيق الألعاب لتحقيق أعلى استجابة لمسية مع زر بحجم 46%.'
  },
  infinix: {
    brandId: 'infinix',
    brandName: 'Infinix / Tecno / Itel (XOS / HiOS)',
    defaultDpi: 360,
    recommendedDpi: 500,
    maxSafeDpi: 580,
    generalBase: 98,
    redDotBase: 94,
    scope2xBase: 86,
    scope4xBase: 82,
    sniperBase: 60,
    freeLookBase: 70,
    buttonSize: 48,
    buttonPosition: 'منخفض قليلاً لتعويض مقاومة الشاشات الاقتصادية في السحب',
    notes: 'الشاشات الاقتصادية تحتاج حساسية عامة مرتفعة (98-100) لتعويض قلة استجابة اللمس. لا ترفع DPI فوق 580.'
  },
  emulator: {
    brandId: 'emulator',
    brandName: 'محاكي الكمبيوتر (BlueStacks / MSI App Player / SmartGaGa)',
    defaultDpi: 240,
    recommendedDpi: 320,
    maxSafeDpi: 440,
    generalBase: 78,
    redDotBase: 72,
    scope2xBase: 68,
    scope4xBase: 64,
    sniperBase: 45,
    freeLookBase: 50,
    buttonSize: 35,
    buttonPosition: 'في منتصف اليمين مع إعداد حساسية الماوس X=1.45 و Y=2.35',
    notes: 'في المحاكي، تعتمد الهيد شوت على حساسية محور Y في محاذاة زر الماوس. اضبط Mouse DPI على 800 أو 1200 وحساسية Y بين 2.1 و2.6.'
  }
};

type PlayStyle = 'onetap-shotgun' | 'deagle-long' | 'smg-spray' | 'sniper-quick';

export const FreeFireSensitivityCalculator: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('samsung');
  const [refreshRate, setRefreshRate] = useState<number>(120);
  const [screenSize, setScreenSize] = useState<'compact' | 'medium' | 'large'>('medium');
  const [playStyle, setPlayStyle] = useState<PlayStyle>('onetap-shotgun');
  const [copied, setCopied] = useState<boolean>(false);

  const preset = DEVICE_PRESETS[selectedBrand];

  // Calculated adjustments based on playstyle, refresh rate, and screen size
  const calculatedSettings = useMemo(() => {
    let generalMod = 0;
    let redDotMod = 0;
    let buttonMod = 0;
    let dragType = 'سحب سريع على شكل حرف J (J-Shape Drag)';

    // PlayStyle tuning
    if (playStyle === 'onetap-shotgun') {
      generalMod += 2;
      redDotMod -= 2;
      buttonMod -= 2;
      dragType = 'سحب خاطف حاد على شكل حرف J (Hook Drag) للمسافات القريبة والصفرية';
    } else if (playStyle === 'deagle-long') {
      generalMod -= 2;
      redDotMod += 3;
      dragType = 'سحب ناعم ومستقيم لأعلى (Straight Drag) مع تثبيت القدمين لنصف ثانية';
    } else if (playStyle === 'smg-spray') {
      generalMod -= 4;
      redDotMod -= 5;
      buttonMod += 3;
      dragType = 'سحب مستقيم وتدريجي نحو الرأس دون سرعة مفرطة لمنع ارتداد الرصاص العشوائي';
    } else if (playStyle === 'sniper-quick') {
      generalMod += 0;
      redDotMod += 0;
      dragType = 'تبديل سريع بين طلقة القناص وزر السلاح المزدوج مع ثبات الكاميرا';
    }

    // Refresh rate tuning
    if (refreshRate === 60) {
      generalMod += 3; // 60Hz screens need higher in-game sensitivity
      redDotMod += 2;
    } else if (refreshRate === 120) {
      generalMod -= 2; // 120Hz screens are ultra responsive
    }

    // Screen size tuning
    if (screenSize === 'compact') {
      buttonMod -= 3;
    } else if (screenSize === 'large') {
      buttonMod += 4;
    }

    const clamp = (val: number, min = 10, max = 100) => Math.min(max, Math.max(min, val));

    return {
      general: clamp(preset.generalBase + generalMod),
      redDot: clamp(preset.redDotBase + redDotMod),
      scope2x: clamp(preset.scope2xBase + Math.floor(generalMod / 2)),
      scope4x: clamp(preset.scope4xBase + Math.floor(generalMod / 2)),
      sniper: clamp(preset.sniperBase),
      freeLook: clamp(preset.freeLookBase),
      buttonSize: Math.max(38, Math.min(60, preset.buttonSize + buttonMod)),
      dragType,
      dpiText:
        preset.brandId === 'iphone'
          ? 'غير متاح (استخدم خيار سرعة المؤشر 120 في AssistiveTouch)'
          : `${preset.recommendedDpi} DPI (الافتراضي: ${preset.defaultDpi} · أقصى حد آمن: ${preset.maxSafeDpi})`
    };
  }, [preset, refreshRate, screenSize, playStyle]);

  const handleCopy = () => {
    const textToCopy = `🎯 إعدادات فري فاير المحسوبة لجهاز [${preset.brandName}]:
- الحساسية العامة (General): ${calculatedSettings.general}
- النقطة الحمراء (Red Dot): ${calculatedSettings.redDot}
- عدسة 2x: ${calculatedSettings.scope2x}
- عدسة 4x: ${calculatedSettings.scope4x}
- عدسة القناص (Sniper): ${calculatedSettings.sniper}
- النظرة الحرة (Free Look): ${calculatedSettings.freeLook}
- حجم زر إطلاق النار: ${calculatedSettings.buttonSize}%
- DPI الموصى به: ${calculatedSettings.dpiText}
- أسلوب السحب المقترح: ${calculatedSettings.dragType}
✨ تم التوليد عبر منصة RikouZone التعليمية`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 via-zinc-900 to-zinc-950 p-5 sm:p-6 shadow-xl shadow-red-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-amber-500 text-black shadow-lg shadow-red-500/30">
              <Crosshair className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/30 px-2.5 py-0.5 text-xs font-bold text-red-400">
                <Sparkles className="h-3 w-3" />
                <span>أداة المعايرة الميكانيكية للقطات الون تاب</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                حاسبة إعدادات الحساسية وDPI حسب نوع الهاتف
              </h2>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 px-4 py-2.5 text-xs font-black text-black hover:from-red-400 hover:to-amber-400 shadow-md shadow-red-500/20 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>تم نسخ الإعدادات بنجاح!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>نسخ كامل الإعدادات</span>
              </>
            )}
          </button>
        </div>
        <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
          أدخل مواصفات جهازك وأسلوب قتالك المفضل للحصول على المعادلة الدقيقة التي تمنحك طلقات حمراء كاملة (Headshots) دون ارتداد الرصاص في الهواء أو الالتصاق بجسم الخصم.
        </p>
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Brand Selector */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
          <label className="text-xs font-bold text-zinc-400 flex items-center gap-2 mb-2">
            <Smartphone className="h-4 w-4 text-red-400" />
            <span>نوع وموديل الجهاز</span>
          </label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-bold text-white focus:border-red-500 focus:outline-none"
          >
            {Object.entries(DEVICE_PRESETS).map(([key, item]) => (
              <option key={key} value={key}>
                {item.brandName}
              </option>
            ))}
          </select>
          <p className="mt-2 text-[11px] text-zinc-400 leading-tight">
            {preset.notes}
          </p>
        </div>

        {/* Screen Refresh Rate */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
          <label className="text-xs font-bold text-zinc-400 flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-amber-400" />
            <span>معدل تحديث الشاشة (Hz)</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[60, 90, 120].map((hz) => (
              <button
                key={hz}
                onClick={() => setRefreshRate(hz)}
                className={`py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  refreshRate === hz
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {hz}Hz
              </button>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-zinc-400">
            {refreshRate === 60
              ? 'شاشة 60Hz تحتاج حساسية أعلى لتعويض بطء الاستجابة'
              : refreshRate === 120
              ? 'شاشة 120Hz فائقة الاستجابة؛ تتطلب حساسية ناعمة لتفادي طيران الطلقات'
              : 'شاشة 90Hz متوازنة وممتازة لسحب الهيد شوت'}
          </p>
        </div>

        {/* Screen Size */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
          <label className="text-xs font-bold text-zinc-400 flex items-center gap-2 mb-2">
            <Sliders className="h-4 w-4 text-emerald-400" />
            <span>حجم شاشة الهاتف</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => setScreenSize('compact')}
              className={`py-2 px-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                screenSize === 'compact'
                  ? 'bg-emerald-500 text-black font-black'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              صغيرة (&lt;6.3)
            </button>
            <button
              onClick={() => setScreenSize('medium')}
              className={`py-2 px-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                screenSize === 'medium'
                  ? 'bg-emerald-500 text-black font-black'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              متوسطة (6.4-6.6)
            </button>
            <button
              onClick={() => setScreenSize('large')}
              className={`py-2 px-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                screenSize === 'large'
                  ? 'bg-emerald-500 text-black font-black'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              كبيرة (&gt;6.7)
            </button>
          </div>
          <p className="mt-2 text-[11px] text-zinc-400">
            حجم الشاشة يحدد النسبة المئوية المثالية لزر إطلاق النار لتوفير مساحة سحب كافية.
          </p>
        </div>

        {/* Playstyle focus */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
          <label className="text-xs font-bold text-zinc-400 flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-purple-400" />
            <span>السلاح وأسلوب اللعب المفضل</span>
          </label>
          <select
            value={playStyle}
            onChange={(e) => setPlayStyle(e.target.value as PlayStyle)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-bold text-white focus:border-red-500 focus:outline-none"
          >
            <option value="onetap-shotgun">دبل شوتغن ون تاب (M1887 / M1014)</option>
            <option value="deagle-long">نسر الصحراء ووود بيكر (Desert Eagle / Woodpecker)</option>
            <option value="smg-spray">رشاشات خفيفة سريعة (MP40 / UMP / Thompson)</option>
            <option value="sniper-quick">قناصة سريعة ودبل قناص (AWM / M82B)</option>
          </select>
          <p className="mt-2 text-[11px] text-purple-300 font-medium">
            نوع السلاح يحدد سرعة السحب وزاوية انطلاق إصبعك.
          </p>
        </div>
      </div>

      {/* Main Results Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Preview */}
        <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6 shadow-lg">
          <h3 className="text-base font-black text-white flex items-center gap-2 mb-5">
            <Sliders className="h-5 w-5 text-red-400" />
            <span>قيم الحساسية الموصى بها داخل اللعبة</span>
          </h3>

          <div className="space-y-4">
            {/* General */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-white flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  الحساسية العامة (General)
                </span>
                <span className="font-mono text-red-400 text-sm font-black">{calculatedSettings.general}</span>
              </div>
              <div className="h-3 w-full bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${calculatedSettings.general}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">
                المسؤولة الأولى عن سرعة دوران الكاميرا وسحب الون تاب بدون تصويب.
              </p>
            </div>

            {/* Red Dot */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-white flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                  النقطة الحمراء (Red Dot)
                </span>
                <span className="font-mono text-amber-400 text-sm font-black">{calculatedSettings.redDot}</span>
              </div>
              <div className="h-3 w-full bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all duration-300"
                  style={{ width: `${calculatedSettings.redDot}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">
                تمنع تشتت الرصاص في الهواء عند الإطلاق بدون سكوب وتثبت النقطة على الرأس.
              </p>
            </div>

            {/* 2x and 4x Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                  <span className="text-zinc-200">عدسة 2x (2x Scope)</span>
                  <span className="font-mono text-emerald-400 text-sm font-black">{calculatedSettings.scope2x}</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${calculatedSettings.scope2x}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                  <span className="text-zinc-200">عدسة 4x (4x Scope)</span>
                  <span className="font-mono text-emerald-400 text-sm font-black">{calculatedSettings.scope4x}</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${calculatedSettings.scope4x}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Sniper and Free Look Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                  <span className="text-zinc-200">عدسة القناص (Sniper Scope)</span>
                  <span className="font-mono text-cyan-400 text-sm font-black">{calculatedSettings.sniper}</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full"
                    style={{ width: `${calculatedSettings.sniper}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                  <span className="text-zinc-200">نظرة حرة (Free Look)</span>
                  <span className="font-mono text-purple-400 text-sm font-black">{calculatedSettings.freeLook}</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${calculatedSettings.freeLook}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HUD and DPI Card */}
        <div className="space-y-4">
          {/* Fire Button Size */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-zinc-400">حجم زر إطلاق النار (HUD)</span>
              <span className="text-2xl font-black text-amber-400 font-mono">
                {calculatedSettings.buttonSize}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 mb-3">
              <div className="text-[11px] font-bold text-zinc-300">موضع الزر المقترح:</div>
              <div className="text-xs text-white font-medium mt-1 leading-relaxed">
                {preset.buttonPosition}
              </div>
            </div>
            <div className="text-[11px] text-zinc-400 leading-relaxed">
              💡 <span className="text-zinc-200 font-bold">قاعدة المحترفين:</span> صغر حجم الزر يمنحك مساحة أكبر لسحب إصبعك لأعلى شاشة الهاتف.
            </div>
          </div>

          {/* DPI Card */}
          <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/30 to-zinc-900 p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-red-400">
              <Cpu className="h-4 w-4" />
              <span>إعداد DPI / عرض أصغر</span>
            </div>
            <div className="text-sm font-black text-white font-mono mb-2">
              {calculatedSettings.dpiText}
            </div>
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-[11px] text-red-200 leading-relaxed flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <span>
                لا ترفع DPI أبداً لأكثر من {preset.maxSafeDpi || 'الحد الموصى به'} حتى لا تتسبب في إعادة تشغيل متكررة للهاتف.
              </span>
            </div>
          </div>

          {/* Drag Technique */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg">
            <div className="text-xs font-bold text-zinc-400 mb-1">طريقة السحب الموصى بها:</div>
            <div className="text-xs font-black text-emerald-400 leading-relaxed">
              {calculatedSettings.dragType}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
