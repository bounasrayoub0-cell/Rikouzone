import React, { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, Flame, Lightbulb, Film, Target, Smartphone, Bookmark } from 'lucide-react';

interface FreeFireIdeaPack {
  category: string;
  titles: string[];
  hookScript: string;
  thumbnailBlueprint: {
    visualSubject: string;
    backgroundStyle: string;
    textBanner: string;
    colorContrast: string;
  };
  hashtags: string[];
}

const IDEA_PACKS: Record<string, FreeFireIdeaPack[]> = {
  sensitivity: [
    {
      category: 'كشف إعدادات الهواتف وحساسية الهيد شوت',
      titles: [
        'كشفت سر إعدادات الهيد شوت بعد تحديث OB الجديد.. طلقات حمراء فقط! 🎯🔥',
        'أفضل إعدادات فري فاير لهواتف سامسونج وشاومي (DPI السري للمحترفين)',
        'جربت إعدادات أشهر لاعب ون تاب في العالم.. النتيجة غير متوقعة! 🤯'
      ],
      hookScript:
        'لو رصاصك بيطير فوق رأس الخصم أو بيلزق في صدره، فالمشكلة مش في إيدك.. المشكلة في الرقم ده اللي مخبينه عليك! شوف الفرق قبل وبعد في أول طلقة!',
      thumbnailBlueprint: {
        visualSubject: 'صورة سلاح M1887 أو Desert Eagle مع سهم أحمر يشير لزر إطلاق النار بنسبة 46%',
        backgroundStyle: 'خلفية ساحة التدريب مع دائرة تصويب مضيئة وشخصية ألوك',
        textBanner: 'إعدادات الهيد شوت السحرية 🎯',
        colorContrast: 'أصفر فاقع مع حدود سوداء عريضة وخلفية داكنة'
      },
      hashtags: ['#فري_فاير', '#حساسية_فري_فاير', '#freefire_settings', '#one_tap', '#garena_mena']
    },
    {
      category: 'إعدادات الهواتف الضعيفة بدون لاغ',
      titles: [
        'تسريع فري فاير وإلغاء اللاغ تماماً للهواتف الضعيفة (3GB RAM) 🚀',
        'سر تثبيت 60FPS وهيد شوت أسطوري على الهواتف الاقتصادية بعد التحديث',
        'وداعاً للدروب فريم: ضبط الجرافيك والـ DPI لحسابات فري فاير ⚡'
      ],
      hookScript:
        'بتعاني من تقطيع اللعبة والموت قبل ما تنزل من الطيارة؟ بحركة واحدة في خيارات المطور هتحول جهازك لصاروخ بدون ما يسخن!',
      thumbnailBlueprint: {
        visualSubject: 'مقارنة بين 30FPS باللون الأحمر الباهت و 60FPS باللون الأخضر المتوهج',
        backgroundStyle: 'شاشة الهاتف مع سكن سلاح متطور',
        textBanner: 'بدون لاغ نهائياً! ⚡',
        colorContrast: 'أخضر نيون وأبيض مع تباين داكن'
      },
      hashtags: ['#تسريع_فري_فاير', '#حل_اللاغ', '#freefire_lagfix', '#فريفاير_مصر', '#فريفاير_المغرب']
    }
  ],
  montage: [
    {
      category: 'مونتاج ون تاب وبيك سينك حماسي',
      titles: [
        'أسرع وأقوى لقطات وان تاب في تاريخ سيرفر الشرق الأوسط! 🔥 M1887 God',
        'عندما يغضب لاعب الشوتغن.. مونتاج Beat Sync دمرت فيه الرومات كلها! 🎯',
        '1 ضد 4 في روم تحدي مع محترفي التيك توك.. لقطات سينمائية خرافية 💀'
      ],
      hookScript:
        '(صوت رصاصة شوتغن عنيفة مع شاشة بيضاء) قالوا مستحيل تكسب الجولة وأنت محاصر بـ 4 لاعبين.. شوف اللي حصل في آخر 5 ثواني!',
      thumbnailBlueprint: {
        visualSubject: 'شخصية اللعبة تقفز في الهواء مع وابل من الأرقام الحمراء (550 Damage)',
        backgroundStyle: 'جدار ثلجي مكسور مع شرارات نارية وتأثير موشن بلور سينمائي',
        textBanner: 'لقطة مستحيلة! 💀',
        colorContrast: 'أحمر قرمزي ناري مع أصفر ذهبي'
      },
      hashtags: ['#مونتاج_فري_فاير', '#ون_تاب', '#freefire_montage', '#beatsync', '#highlights']
    }
  ],
  leaks: [
    {
      category: 'تسريبات السيرفر المطور وتحديث OB القادم',
      titles: [
        'رسمياً: تسريب سكنات وبنرات تحديث فري فاير القادم OB قبل الجميع! 😱🔥',
        'تجربة الشخصية الجديدة الخارقة في السيرفر المطور.. هل ستدمر اللعبة؟',
        'كل ما تحتاج معرفته عن الفاير باس الجديد وجواهر جارينا المجانية 💎'
      ],
      hookScript:
        'شركة جارينا غيرت كل حاجة في التحديث الجاي! شوفوا مهارة الشخصية الجديدة اللي بتكشف أماكن الخصوم من ورا الثلج قبل ما تنزل رسمياً!',
      thumbnailBlueprint: {
        visualSubject: 'صورة الشخصية الجديدة أو السلاح المتطور مع علامة استفهام ذهبية كبيرة',
        backgroundStyle: 'واجهة السيرفر المطور مع تاريخ التحديث بالخط العريض',
        textBanner: 'تسريبات حصرية 100%! 🚨',
        colorContrast: 'بنفسجي متوهج مع أصفر تحذيري'
      },
      hashtags: ['#تسريبات_فري_فاير', '#السيرفر_المطور', '#freefire_advance', '#ob_update', '#تسريبات']
    }
  ],
  rooms: [
    {
      category: 'تحديات الرومات والبطولات التنافسية',
      titles: [
        'نظمت أكبر روم تحدي للمتابعين على 5000 جوهرة.. نهاية غير متوقعة! 🏆',
        'تحديت أقوى كلان في السيرفر بدون سكنات أسلحة.. هل فازت المهارة؟ 🔥',
        'روم 1 ضد 1 مع أكثر لاعب مغرور في اللعبة.. لقنته درساً لن ينساه! 🤫'
      ],
      hookScript:
        'اللاعب ده دخل شات البث وقالي إنت نوب وما تقدرش تجيب فيا هيد شوت واحدة.. فدخلته روم بـ 1000 جوهرة وشوفوا الرد اللي خلاه يخرج من الروم!',
      thumbnailBlueprint: {
        visualSubject: 'شخصيتان متواجهتان وجهاً لوجه مع كلمة VS ضخمة ومشتعلة بالنار',
        backgroundStyle: 'خريطة برمودا أو كلاش سكواد مع حزام الزون المشع',
        textBanner: 'تحدي الانتقام! ⚔️',
        colorContrast: 'أزرق جليدي ضد أحمر ناري'
      },
      hashtags: ['#رومات_فري_فاير', '#تحديات_فري_فاير', '#freefire_customroom', '#بطولات_ألعاب', '#كلانات']
    }
  ]
};

export const FreeFireIdeaGenerator: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('sensitivity');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const packs = IDEA_PACKS[selectedTopic] || IDEA_PACKS['sensitivity'];
  const currentPack = packs[currentIndex % packs.length];

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleCopyBlueprint = () => {
    const text = `🎯 مخطط محتوى فري فاير الفيروسي:
الفئة: ${currentPack.category}

📌 مقترحات العناوين:
1. ${currentPack.titles[0]}
2. ${currentPack.titles[1]}
3. ${currentPack.titles[2]}

🎙️ سيناريو الهوك الافتتاحي (أول 3 ثوانٍ):
"${currentPack.hookScript}"

🖼️ هندسة الصورة المصغرة (Thumbnail Blueprint):
- العنصر الأساسي: ${currentPack.thumbnailBlueprint.visualSubject}
- نمط الخلفية: ${currentPack.thumbnailBlueprint.backgroundStyle}
- النص المكتوب: ${currentPack.thumbnailBlueprint.textBanner}
- تباين الألوان: ${currentPack.thumbnailBlueprint.colorContrast}

🏷️ الهاشتاجات المقترحة:
${currentPack.hashtags.join(' ')}
✨ تم التوليد عبر منصة RikouZone`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 via-zinc-900 to-zinc-950 p-5 sm:p-6 shadow-xl shadow-red-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-amber-500 text-black shadow-lg shadow-red-500/30">
              <Lightbulb className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/30 px-2.5 py-0.5 text-xs font-bold text-red-300">
                <Sparkles className="h-3 w-3" />
                <span>مولد الأفكار، الهوكات والصور المصغرة الفيروسية</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                مولد محتوى فري فاير الذكي لصناع محتوى الشورتس واليوتيوب
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs font-bold text-white hover:bg-zinc-700 cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              <span>توليد فكرة أخرى</span>
            </button>
            <button
              onClick={handleCopyBlueprint}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 px-4 py-2 text-xs font-black text-black hover:from-red-400 hover:to-amber-400 cursor-pointer shadow-md shadow-red-500/20"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ المخطط كاملاً'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'sensitivity', label: 'إعدادات الحساسية والـ DPI', icon: Smartphone },
          { id: 'montage', label: 'مونتاج ون تاب وبيك سينك', icon: Flame },
          { id: 'leaks', label: 'تسريبات وتحديثات OB', icon: Sparkles },
          { id: 'rooms', label: 'رومات التحدي والبطولات', icon: Target }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedTopic(tab.id);
                setCurrentIndex(0);
              }}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                selectedTopic === tab.id
                  ? 'bg-red-500 text-black font-black shadow-lg shadow-red-500/20'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Idea Result Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Titles & Hook Script */}
        <div className="lg:col-span-2 space-y-4">
          {/* Titles */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg">
            <h3 className="text-sm font-black text-white flex items-center gap-2 mb-3">
              <Bookmark className="h-4 w-4 text-red-400" />
              <span>3 عناوين جذابة عالية النقر (High CTR Titles)</span>
            </h3>
            <div className="space-y-2.5">
              {currentPack.titles.map((title, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm font-bold text-white flex items-start gap-2.5"
                >
                  <span className="h-5 w-5 rounded-full bg-red-500/20 text-red-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hook script */}
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-zinc-900/90 p-5 shadow-lg">
            <h3 className="text-sm font-black text-amber-300 flex items-center gap-2 mb-2">
              <Flame className="h-4 w-4 text-amber-400" />
              <span>سيناريو الهوك الصادم (أول 3 ثوانٍ لمنع التخطي)</span>
            </h3>
            <p className="text-xs sm:text-sm font-medium text-white leading-relaxed p-3.5 rounded-xl bg-zinc-950/90 border border-amber-500/20">
              "{currentPack.hookScript}"
            </p>
          </div>
        </div>

        {/* Thumbnail & Hashtags */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg space-y-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Film className="h-4 w-4 text-purple-400" />
              <span>مخطط الصورة المصغرة (Thumbnail)</span>
            </h3>

            <div className="text-[11px] space-y-2 text-zinc-300">
              <div>
                <span className="text-zinc-400 block font-bold">العنصر البصري:</span>
                <span className="text-white font-medium">{currentPack.thumbnailBlueprint.visualSubject}</span>
              </div>
              <div>
                <span className="text-zinc-400 block font-bold">الخلفية:</span>
                <span className="text-white font-medium">{currentPack.thumbnailBlueprint.backgroundStyle}</span>
              </div>
              <div>
                <span className="text-zinc-400 block font-bold">النص المكتوب:</span>
                <span className="text-amber-300 font-black">{currentPack.thumbnailBlueprint.textBanner}</span>
              </div>
              <div>
                <span className="text-zinc-400 block font-bold">تناغم الألوان:</span>
                <span className="text-zinc-200">{currentPack.thumbnailBlueprint.colorContrast}</span>
              </div>
            </div>
          </div>

          {/* Hashtags */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-lg">
            <span className="text-xs font-bold text-zinc-400 block mb-2">الهاشتاجات المقترحة:</span>
            <div className="flex flex-wrap gap-1.5">
              {currentPack.hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
