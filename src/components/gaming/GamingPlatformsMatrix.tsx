import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertTriangle, Sparkles, HelpCircle, ExternalLink, Filter, DollarSign, Layers, Radio, Globe, ShieldCheck } from 'lucide-react';

interface GamingPlatform {
  id: string;
  name: string;
  arabicName: string;
  badge: string;
  badgeColor: string;
  subSplit: string; // e.g. "95% للصانع / 5% للمنصة"
  subSplitScore: number; // 1-10
  discoverability: 'ممتازة جداً' | 'جيدة جداً' | 'متوسطة' | 'شبه معدومة للمبتدئ';
  discoverabilityColor: string;
  menaPopularity: 'شعبية جارفة' | 'شعبية قوية' | 'متوسطة' | 'صاعدة بقوة';
  mobileSupport: string;
  minMonetization: string[];
  bestNiches: string[];
  pros: string[];
  cons: string[];
  verdict: string;
}

export const GamingPlatformsMatrix: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('kick');
  const [filterType, setFilterType] = useState<'all' | 'highest-pay' | 'best-discovery' | 'mobile'>('all');

  const platforms: GamingPlatform[] = [
    {
      id: 'kick',
      name: 'Kick',
      arabicName: 'كيك (Kick Streaming)',
      badge: 'الأعلى ربحاً عالمياً',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      subSplit: '95% للصانع / 5% للمنصة',
      subSplitScore: 10,
      discoverability: 'جيدة جداً',
      discoverabilityColor: 'text-emerald-400',
      menaPopularity: 'صاعدة بقوة',
      mobileSupport: 'تطبيق للمشاهدة والبث المباشر مع دعم الكاميرا',
      minMonetization: [
        '75 متابعاً فقط للحصول على زر الاشتراك',
        'بث 5 ساعات إجمالية',
        'برنامج ساعات البث المدفوع (KCIP) بشروط ساعات ومشاهدين محددين'
      ],
      bestNiches: ['GTA V Roleplay', 'Call of Duty / Warzone', 'Just Chatting', 'تحديات الألعاب الحماسية'],
      pros: [
        'أعلى نسبة أرباح اشتراكات في العالم (تأخذ 4.75$ من كل اشتراك بقيمة 5$).',
        'حرية أكبر في سياسات المحتوى مقارنة بتويتش.',
        'إمكانية سحب الأرباح فورياً بالعملات الرقمية أو التحويل البنكي.',
        'دعم متزايد للغة العربية ومجتمعات الشرق الأوسط.'
      ],
      cons: [
        'منصة أحدث عمراً من تويتش ويوتيوب، وقاعدة المستخدمين ما زالت في طور التوسع.',
        'تتطلب جهداً في جلب جمهورك من تيك توك وسوشيال ميديا للبث.'
      ],
      verdict: 'الخيار الأفضل للستريمر الذي يريد تعظيم أرباحه من الاشتراكات ولديه القدرة على الترويج لنفسه في تيك توك.'
    },
    {
      id: 'youtube',
      name: 'YouTube Gaming',
      arabicName: 'يوتيوب جيمنج (YouTube Gaming)',
      badge: 'المنظومة الأكثر استدامة',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
      subSplit: '70% للصانع / 30% للمنصة',
      subSplitScore: 8,
      discoverability: 'ممتازة جداً',
      discoverabilityColor: 'text-emerald-400',
      menaPopularity: 'شعبية جارفة',
      mobileSupport: 'بث مباشر عالي الجودة من تطبيق يوتيوب مباشرة',
      minMonetization: [
        '500 مشترك + 3000 ساعة مشاهدة (للميزات التفاعلية Super Chat والانتساب)',
        '1000 مشترك + 4000 ساعة مشاهدة (لأرباح إعلانات المشاهدات الكاملة)'
      ],
      bestNiches: ['شروحات وتكتيكات الألعاب', 'تحديات 24 ساعة', 'Free Fire & PUBG', 'Minecraft & Roblox', 'مراجعات الألعاب'],
      pros: [
        'البث يتحول فور انتهائه إلى فيديو دائم يدر مشاهدات وأرباحاً لسنوات قادمة.',
        'تنوع أشكال المحتوى في مكان واحد: شورتس + فيديوهات طويلة + بث مباشر + منتدى.',
        'أعلى سعر إعلانات (AdSense CPM) مقارنة بجميع المنصات الأخرى.',
        'محرك البحث الثاني في العالم بعد جوجل، مما يسهل العثور على شروحاتك.'
      ],
      cons: [
        'تجربة الشات المباشر أقل حيوية وإيموتات مقارنة بتويتش.',
        'شروط تفعيل الربح المالي تتطلب وقتاً أطول للمبتدئ من الصفر.'
      ],
      verdict: 'المنصة الملكية للاستثمار بعيد المدى وبناء جمهور وفي ومكتبة أصول رقمية لا تموت أبداً.'
    },
    {
      id: 'twitch',
      name: 'Twitch',
      arabicName: 'تويتش (Twitch Interactive)',
      badge: 'أم ثقافة الستريمينغ',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      subSplit: '50% للصانع / 50% للمنصة (ترتفع لـ 70% في Partner Plus)',
      subSplitScore: 6,
      discoverability: 'شبه معدومة للمبتدئ',
      discoverabilityColor: 'text-red-400',
      menaPopularity: 'شعبية قوية',
      mobileSupport: 'تطبيق مميز وتوافق كامل مع أجهزة الكونسول (PS5/Xbox)',
      minMonetization: [
        '50 متابعاً',
        'بث 8 ساعات خلال 7 أيام مختلفة',
        'متوسط 3 مشاهدين متزامنين لتحقيق شروط الشريك التابع (Twitch Affiliate)'
      ],
      bestNiches: ['Valorant & CS2', 'League of Legends', 'Apex Legends', 'Speedrunning & Hardcore Games'],
      pros: [
        'أقوى ثقافة شات وإيموتات واشتراكات مجتمعية في العالم.',
        'تكامل خرافي مع OBS وإضافات تويتش المبتكرة (Twitch Extensions).',
        'شراكة مع Amazon Prime تمنح المشاهدين اشتراكاً شهرياً مجانياً يدعمك.'
      ],
      cons: [
        'الخوارزمية لا تدعم اكتشاف القنوات الصغيرة إطلاقاً؛ القنوات ترتب تنازلياً حسب عدد المشاهدين.',
        'اقتطاع 50% من أرباح الاشتراكات للمبتدئين مجحف جداً مقارنة بالمنافسين.',
        'تسجيلات البث (VODs) تحذف تلقائياً بعد فترة ولا تدر أرباحاً دائمة.'
      ],
      verdict: 'منصة أسطورية للمجتمعات القائمة، ولكن لا تبدأ بها بدون جلب متابعين من تيك توك ويوتيوب شورتس.'
    },
    {
      id: 'tiktok',
      name: 'TikTok Live',
      arabicName: 'تيك توك لايف (TikTok Live)',
      badge: 'الأسرع في الانتشار الفيروسي',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      subSplit: 'حوالي 50% من قيمة الماسات والهدايا',
      subSplitScore: 5,
      discoverability: 'ممتازة جداً',
      discoverabilityColor: 'text-emerald-400',
      menaPopularity: 'شعبية جارفة',
      mobileSupport: 'الأفضل بلا منازع لبث الهواتف الرأسية (Portrait Streaming)',
      minMonetization: [
        '1000 متابع على الحساب لفتح ميزة البث المباشر (أو استخدام أدوات الوكالات)',
        'العمر فوق 18 عاماً لاستقبال هدايا البث'
      ],
      bestNiches: ['ألعاب الموبايل (Free Fire, PUBG Mobile)', 'تحديات الجولات الحماسية (PK Battles)', 'لقطات مضحكة وتفاعل صوتي'],
      pros: [
        'الخوارزمية ترمي آلاف المشاهدين العشوائيين داخل بثك من صفحة For You.',
        'هدايا متواصلة وماسات قابلة للتحويل النقدي الفوري.',
        'مناسب جداً للبدء بهاتف ذكي فقط بدون أي أجهزة كمبيوتر أو كروت شاشة.'
      ],
      cons: [
        'جمهور عابر وسريع الملل يمرر الشاشة خلال ثوانٍ إن لم تكن هناك إثارة مستمرة.',
        'نسبة اقتطاع تيك توك من الهدايا تصل إلى 50%.',
        'احتمالية التعرض لحظر البث بسبب الإبلاغات العشوائية أو تعليقات المشاهدين.'
      ],
      verdict: 'الأداة الأقوى لتوليد المتابعين ونقلهم إلى يوتيوب أو كيك، وبنك أرباح سريع لألعاب الهواتف.'
    },
    {
      id: 'facebook',
      name: 'Facebook Gaming',
      arabicName: 'فيسبوك جيمنج (Facebook Gaming)',
      badge: 'جمهور محلي واسع',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      subSplit: '70% من النجوم (Stars) والاشتراكات',
      subSplitScore: 7,
      discoverability: 'متوسطة',
      discoverabilityColor: 'text-amber-400',
      menaPopularity: 'شعبية قوية',
      mobileSupport: 'بث مباشر من تطبيق فيسبوك ومنصة Meta Business Suite',
      minMonetization: [
        'برنامج Level Up: 100 متابع لصفحة الألعاب',
        'بث 4 ساعات خلال 14 يوماً مع الحفاظ على معايير الأمان'
      ],
      bestNiches: ['PUBG Mobile', 'GTA V', 'ألعاب كرة القدم (EA FC / eFootball)', 'ألعاب كلاسيكية'],
      pros: [
        'قاعدة مستخدمين عريضة جداً في مصر وشمال أفريقيا والعراق.',
        'ميزة مشاركة البث في مجموعات الألعاب (Gaming Groups) تجلب آلاف المشاهدات المجانية.',
        'دعم الدفع المحلي ونظام النجوم (Stars).'
      ],
      cons: [
        'منصة البث فقدت بريقها مقارنة بكيك وتيك توك بعد إغلاق تطبيق Facebook Gaming المستقل.',
        'نظام التعليقات قد يكون مشتتاً ومختلطاً مع الحسابات الشخصية الحقيقية.'
      ],
      verdict: 'خيار ممتاز جداً إذا كان جمهورك المستهدف يتركز في مصر أو دول شمال أفريقيا وتلعب ألعاباً شعبية.'
    }
  ];

  const filteredPlatforms = platforms.filter((p) => {
    if (filterType === 'highest-pay') return p.subSplitScore >= 8;
    if (filterType === 'best-discovery') return p.discoverability === 'ممتازة جداً' || p.discoverability === 'جيدة جداً';
    if (filterType === 'mobile') return p.id === 'tiktok' || p.id === 'youtube' || p.id === 'facebook';
    return true;
  });

  const active = platforms.find((p) => p.id === selectedPlatform) || platforms[0];

  return (
    <div className="space-y-8 text-right" dir="rtl">
      {/* Header */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-zinc-900/80 to-zinc-900/50 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>مصفوفة مقارنة منصات البث والألعاب</span>
                <span className="rounded-md bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 text-xs text-indigo-300 font-bold">
                  2025 Edition
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                مقارنة شاملة ومحايدة لنسب الأرباح، خوارزميات الانتشار، والشعبية في العالم العربي للاختيار الصحيح من اليوم الأول.
              </p>
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'highest-pay', label: 'الأعلى ربحاً' },
              { id: 'best-discovery', label: 'الأسهل انتشاراً' },
              { id: 'mobile', label: 'ألعاب الموبايل' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id as any)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  filterType === f.id
                    ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                    : 'border border-zinc-800 bg-zinc-800/60 text-zinc-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Platform Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {filteredPlatforms.map((p) => {
          const isSelected = p.id === selectedPlatform;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPlatform(p.id)}
              className={`rounded-2xl border p-4 text-right transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                  : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-base text-white">{p.name}</span>
                <span className={`text-[10px] font-black rounded-md px-1.5 py-0.5 border ${p.badgeColor}`}>
                  {p.subSplitScore}/10 ربح
                </span>
              </div>
              <div className="text-xs text-zinc-400 font-semibold truncate">{p.badge}</div>
              <div className="mt-2 text-[11px] font-bold text-zinc-300">
                الانتشار: <span className={p.discoverabilityColor}>{p.discoverability}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Card for Selected Platform */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 space-y-8 backdrop-blur-xl">
        {/* Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full border px-3 py-0.5 text-xs font-black ${active.badgeColor}`}>
                {active.badge}
              </span>
              <span className="text-xs font-bold text-zinc-400">
                الشعبية في الشرق الأوسط: <strong className="text-white">{active.menaPopularity}</strong>
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
              {active.arabicName}
            </h3>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 text-right sm:min-w-[240px]">
            <div className="text-xs text-zinc-400 font-bold">نسبة اقتطاع المنصة من الاشتراكات:</div>
            <div className="text-lg font-black text-emerald-400 mt-1">{active.subSplit}</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">تقييم العائد المالي: {active.subSplitScore}/10</div>
          </div>
        </div>

        {/* 3 Metric Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-1.5">
            <div className="text-xs font-bold text-zinc-400">خوارزمية الاكتشاف (Discoverability):</div>
            <div className={`text-base font-black ${active.discoverabilityColor}`}>{active.discoverability}</div>
            <p className="text-[11px] text-zinc-500">مدى مساعدة المنصة للقنوات الجديدة في الظهور للمشاهدين.</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-1.5">
            <div className="text-xs font-bold text-zinc-400">دعم بث الهواتف الذكية:</div>
            <div className="text-sm font-bold text-zinc-200">{active.mobileSupport}</div>
            <p className="text-[11px] text-zinc-500">سهولة البث المباشر لألعاب الهواتف بدون كمبيوتر.</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-1.5">
            <div className="text-xs font-bold text-zinc-400">أفضل الألعاب المناسبة للمنصة:</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {active.bestNiches.map((n, i) => (
                <span key={i} className="rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-300 font-medium">
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Monetization Requirements Box */}
        <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 space-y-3">
          <h4 className="text-sm font-black text-purple-300 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-purple-400" />
            <span>شروط تفعيل الربح المالي والاشتراكات:</span>
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
            {active.minMonetization.map((req, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pros & Cons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Pros */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-3">
            <h4 className="text-sm font-black text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>أبرز المزايا ونقاط القوة:</span>
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300">
              {active.pros.map((p, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-emerald-400 font-black">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-3">
            <h4 className="text-sm font-black text-rose-400 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>العيوب والتحديات التي يجب الحذر منها:</span>
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300">
              {active.cons.map((c, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-rose-400 font-black">✕</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final Verdict Banner */}
        <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-zinc-900 to-indigo-500/10 p-5">
          <div className="flex items-center gap-2 text-xs font-black text-indigo-300 mb-1">
            <Sparkles className="h-4 w-4" />
            <span>الحكم النهائي والتوصية الاستراتيجية:</span>
          </div>
          <p className="text-sm text-zinc-200 leading-relaxed font-semibold">
            {active.verdict}
          </p>
        </div>
      </div>
    </div>
  );
};
