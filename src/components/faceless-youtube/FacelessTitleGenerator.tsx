import React, { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, Flame, Lightbulb, Image, Target, Bookmark } from 'lucide-react';

interface TitleAnglePack {
  angleName: string;
  angleDescription: string;
  titles: string[];
  thumbnailConcept: {
    visualSubject: string;
    backgroundStyle: string;
    textBanner: string;
    colors: string;
  };
}

const TOPIC_PRESETS: Record<string, TitleAnglePack[]> = {
  business: [
    {
      angleName: 'زاوية التناقض والأزمة الصادمة',
      angleDescription: 'تعتمد على إبراز المفارقة بين المكانة الضخمة للشركة وسقوطها المفاجئ',
      titles: [
        'الشركة التي رفضت شراء جوجل بمليون دولار.. أين هي الآن؟',
        'كيف دمر هذا القرار الصغير إمبراطورية عمرها 100 عام؟',
        'الخدعة التسويقية التي جعلت العالم يدمن هذا المشروب'
      ],
      thumbnailConcept: {
        visualSubject: 'شعار الشركة مشطور إلى نصفين أو سهم هابط باللون الأحمر المشع',
        backgroundStyle: 'مقر الشركة مع سحب رمادية داكنة وتدرج سينمائي مريب',
        textBanner: 'الخطأ القاتل! 📉',
        colors: 'أحمر قرمزي ناصع مع نصوص بيضاء عريضة وظلال سوداء'
      }
    },
    {
      angleName: 'زاوية الفضول واللغز الخفي',
      angleDescription: 'تثير التساؤل حول سر غير معلن يجهله المشاهد العادي',
      titles: [
        'السر الحقيقي الذي تخفيه متاجر ايكيا في تصميم ممراتها',
        'لماذا لا تفلس نوادي كرة القدم الكبرى رغم ديونها الفلكية؟',
        'كيف تربح شركات الطيران ملياراتها الحقيقية؟ (ليس من التذاكر!)'
      ],
      thumbnailConcept: {
        visualSubject: 'علامة استفهام ذهبية ثلاثية الأبعاد بجانب رمز المال أو الطائرة',
        backgroundStyle: 'تصميم مينيمالي داكن مع بقعة ضوء تسلط على العنصر المركزي',
        textBanner: 'اللعبة الخفية 🤫',
        colors: 'أصفر فاقع مع أزرق كحلي داكن'
      }
    }
  ],
  history: [
    {
      angleName: 'زاوية اللحظة المصيرية وتغيير التاريخ',
      angleDescription: 'تركز على نقطة تحول دقيقة أثرت على مسار العالم',
      titles: [
        'الـ 24 ساعة التي أنقذت البشرية من حرب نووية محققة',
        'الوثيقة المفقودة التي غيرت خريطة الشرق الأوسط إلى الأبد',
        'المعركة التي خسرها القائد قبل أن تبدأ برصاصة واحدة'
      ],
      thumbnailConcept: {
        visualSubject: 'خريطة تاريخية محترقة الحواف مع تمثال أو خوذة عسكرية قديمة',
        backgroundStyle: 'خلفية رملية داكنة مع دخان خفيف وشرارات برتقالية',
        textBanner: 'يوم غيّر العالم! ⏳',
        colors: 'برتقالي ناري مع درجات البيج والرمادي التاريخي'
      }
    },
    {
      angleName: 'زاوية الكشف عن الحقيقة غير المروية',
      angleDescription: 'تفكيك خرافة شائعة وإظهار ما حدث في الواقع بالأدلة',
      titles: [
        'الحقيقة التي لم يخبروك بها عن سقوط حضارة المايا',
        'هل كانت كليوباترا حقاً كما تصورتها هوليوود؟ (ما كشفته الآثار)',
        'أسرار مكتبة بغداد: كيف ضاعت أعظم معارف العالم القديم؟'
      ],
      thumbnailConcept: {
        visualSubject: 'مخطوطة قديمة مفتوحة بجانب جمجمة أو حجر أثري',
        backgroundStyle: 'أجواء مكتبة قديمة دافئة مع إضاءة شموع خافتة',
        textBanner: 'الحقيقة الصادمة 📜',
        colors: 'أبيض لؤلؤي مع ذهبي معتق'
      }
    }
  ],
  tech: [
    {
      angleName: 'زاوية الاستبدال والتحول الرقمي',
      angleDescription: 'تخاطب قلق المشاهد حول مستقبله المهني والتقني',
      titles: [
        'المهن التي سيلغيها الذكاء الاصطناعي بحلول 2027.. هل وظيفتك بينها؟',
        'جربت العيش بدون هاتف ذكي لمدة 30 يوماً.. هذا ما حدث لعقلي!',
        'التقنية القادمة التي ستجعل الحواسيب الحالية تبدو كلعب أطفال'
      ],
      thumbnailConcept: {
        visualSubject: 'شريحة إلكترونية مشعة أو ذراع روبوت يقابل يداً بشرية',
        backgroundStyle: 'شبكة عصبية مضيئة بالنيون الأزرق في فضاء أسود',
        textBanner: 'النهاية؟ 🤖',
        colors: 'سماوي نيون (Cyan) مع بنفسجي فاقع'
      }
    }
  ]
};

export const FacelessTitleGenerator: React.FC = () => {
  const [topicKey, setTopicKey] = useState<string>('business');
  const [angleIdx, setAngleIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const packs = TOPIC_PRESETS[topicKey] || TOPIC_PRESETS['business'];
  const currentPack = packs[angleIdx % packs.length];

  const handleNext = () => {
    setAngleIdx((prev) => prev + 1);
  };

  const handleCopyPack = () => {
    const text = `🎯 حزمة العناوين والصور المصغرة المقترحة:
الزاوية: ${currentPack.angleName}
الوصف: ${currentPack.angleDescription}

📌 العناوين:
1. ${currentPack.titles[0]}
2. ${currentPack.titles[1]}
3. ${currentPack.titles[2]}

🖼️ فكرة الصورة المصغرة (Thumbnail Blueprint):
- العنصر الرئيسي: ${currentPack.thumbnailConcept.visualSubject}
- الخلفية: ${currentPack.thumbnailConcept.backgroundStyle}
- النص المقترح: ${currentPack.thumbnailConcept.textBanner}
- الألوان: ${currentPack.thumbnailConcept.colors}
✨ منصة RikouZone`;

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
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/30 px-2.5 py-0.5 text-xs font-bold text-red-400">
                <Sparkles className="h-3 w-3" />
                <span>أداة هندسة النقر الصادق (High CTR Generator)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                مولّد العناوين والصور المصغرة وفق الزوايا النفسية
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs font-bold text-white hover:bg-zinc-700 cursor-pointer transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              <span>زاوية أخرى</span>
            </button>
            <button
              onClick={handleCopyPack}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 px-4 py-2 text-xs font-black text-black hover:from-red-400 hover:to-amber-400 cursor-pointer shadow-md shadow-red-500/20"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ الحزمة'}</span>
            </button>
          </div>
        </div>
        <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
          اقترح عناوين وصوراً مصغرة مبنية على زوايا نفسية تثير الفضول بصدق وتفي بوعد المحتوى الداخلي، دون تقديم وعود مضللة أو ضمانات بنسب نقر وهمية.
        </p>
      </div>

      {/* Topic Switcher */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'business', label: 'قصص الشركات والأعمال' },
          { id: 'history', label: 'الوثائقيات والتاريخ' },
          { id: 'tech', label: 'التقنية والذكاء الاصطناعي' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setTopicKey(tab.id);
              setAngleIdx(0);
            }}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              topicKey === tab.id
                ? 'bg-red-500 text-black font-black shadow-md shadow-red-500/20'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Angle Card & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Titles Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-bold text-red-400 block">{currentPack.angleName}</span>
                <p className="text-[11px] text-zinc-400 mt-0.5">{currentPack.angleDescription}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {currentPack.titles.map((title, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm font-bold text-white flex items-start gap-3"
                >
                  <span className="h-5 w-5 rounded-full bg-red-500/20 text-red-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail Blueprint Column */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg space-y-3">
          <h3 className="text-sm font-black text-white flex items-center gap-2 mb-2">
            <Image className="h-4 w-4 text-amber-400" />
            <span>مخطط الصورة المصغرة المرافقة</span>
          </h3>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
            <div>
              <span className="text-[11px] font-bold text-zinc-400 block">العنصر البصري الرئيسي:</span>
              <span className="text-zinc-200">{currentPack.thumbnailConcept.visualSubject}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-zinc-400 block">نمط الخلفية:</span>
              <span className="text-zinc-200">{currentPack.thumbnailConcept.backgroundStyle}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-zinc-400 block">النص المكتوب على الصورة:</span>
              <span className="text-amber-400 font-black">{currentPack.thumbnailConcept.textBanner}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-zinc-400 block">تباين الألوان الموصى به:</span>
              <span className="text-zinc-300">{currentPack.thumbnailConcept.colors}</span>
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 leading-relaxed pt-2">
            💡 <span className="text-zinc-200 font-bold">قاعدة يوتيوب:</span> الصورة لا تكرر العنوان بل تكمله؛ الصورة تطرح التساؤل البصري، والعنوان يقدم السياق.
          </div>
        </div>
      </div>
    </div>
  );
};
