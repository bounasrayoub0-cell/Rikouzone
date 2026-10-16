import React, { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, Flame, Lightbulb, Film, Bookmark, Share2 } from 'lucide-react';

interface GameIdeaPack {
  gameName: string;
  formatName: string;
  arabicTitles: string[];
  hookScript: {
    visual: string;
    audio: string;
    textOnScreen: string;
  };
  thumbnailConcept: {
    faceExpression: string;
    gameplayElement: string;
    thumbnailText: string;
    colorContrast: string;
  };
  pacingTip: string;
  recommendedTags: string[];
}

export const GamingIdeaGenerator: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string>('free-fire');
  const [selectedFormat, setSelectedFormat] = useState<string>('challenge');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [hookCopied, setHookCopied] = useState<boolean>(false);

  const gameOptions = [
    { id: 'free-fire', name: 'Free Fire', tag: 'الموبايل الأكثر شعبية في MENA' },
    { id: 'pubg-mobile', name: 'PUBG Mobile', tag: 'أقوى مجتمع رومات وتحديات' },
    { id: 'gta-v', name: 'GTA V (FiveM Roleplay)', tag: 'دراما وقصص لا نهائية' },
    { id: 'valorant', name: 'Valorant', tag: 'تصويب تكتيكي وحركات احترافية' },
    { id: 'minecraft', name: 'Minecraft', tag: 'أعلى مشاهدات بحثية وتحديات بقاء' },
    { id: 'roblox', name: 'Roblox', tag: 'جمهور يافع ومودات متجددة يومياً' },
    { id: 'warzone', name: 'Warzone / CoD', tag: 'حماس وسرعة رد فعل فائقة' },
    { id: 'horror', name: 'ألعاب رعب وقصص (Horror)', tag: 'صدمات وردود فعل ممتعة' },
    { id: 'eafc', name: 'EA FC / FIFA', tag: 'باكات، درافت، ومباريات دراماتيكية' }
  ];

  const formatOptions = [
    { id: 'challenge', name: 'تحدي مستحيل (Extreme Challenge)', icon: '🏆' },
    { id: 'short-clip', name: 'مقطع شورتس فيروزي (Viral Short)', icon: '⚡' },
    { id: 'pro-guide', name: 'شروحات وأسرار (Pro Guide & Settings)', icon: '🎯' },
    { id: 'funny-fails', name: 'لقطات مضحكة وفاشلة (Funny Moments)', icon: '😂' },
    { id: 'story-essay', name: 'قصة وسرد وثائقي (Video Essay)', icon: '📖' }
  ];

  // Dynamic Idea Generator Logic
  const generateIdea = (): GameIdeaPack => {
    if (selectedGame === 'free-fire') {
      if (selectedFormat === 'challenge') {
        return {
          gameName: 'Free Fire',
          formatName: 'تحدي مستحيل',
          arabicTitles: [
            'لعبت روم ضد بطل السيرفر بسلاح المسدس فقط... والنتيجة صدمت الكل!',
            'إذا خسرت هذا الجيم سأحذف أغلى سكن في حسابي!',
            'تحدي الفوز بالرانك بدون دروع وبدون ما أفتح شنطة العلاج!',
            'دخلت روم عشوائي وعملت نفسي نوب... شاهد ماذا فعلوا بي!'
          ],
          hookScript: {
            visual: 'لقطة سريعة مدتها ثانية واحدة لبداية التفجير أو الهيد شوت الأخير، ثم انتقال فوري إلى وجهك في الكاميرا وأنت تصرخ بدهشة.',
            audio: 'صوت صدمة أو رنين إنذار عالي، مع قولك فوراً: "هذا أغرب رهان وافقت عليه في حياتي... إذا مت الآن سأخسر حسابي بالكامل!"',
            textOnScreen: 'سأحذف الحساب لو خسرت! 😱'
          },
          thumbnailConcept: {
            faceExpression: 'وجه مصدوم مع فتح الفم ووضع اليد على الرأس بتقريب 50% على العينين.',
            gameplayElement: 'شخصية اللعبة بالسلاح الذهبي موجهة مباشرة إلى خصم محاط بدائرة حمراء مشعة.',
            thumbnailText: 'مستحيل أعيش!',
            colorContrast: 'أصفر فاقع فسفوري مع خلفية زرقاء داكنة مسودة الحواف.'
          },
          pacingTip: 'لا تظهر النتيجة في الدقيقة الأولى؛ ابنِ توتراً تدريجياً واجعل المشاهد يظن أنك ستخسر في منتصف المقطع.',
          recommendedTags: ['#FreeFire', '#فري_فاير', '#FreeFireArabic', '#تحديات_فري_فاير', '#Gaming']
        };
      }
      if (selectedFormat === 'pro-guide') {
        return {
          gameName: 'Free Fire',
          formatName: 'شروحات وأسرار',
          arabicTitles: [
            'أفضل إعدادات حساسية للهيد شوت بعد التحديث الأخير (بدون باند)',
            'السر المخفي لرفع الرانك إلى الهيرويك في 3 ساعات فقط!',
            'زر إطلاق النار هذا هو السبب في ضياع طلقاتك... كيف تضبطه كالمحترفين؟'
          ],
          hookScript: {
            visual: 'شاشة إعدادات الحساسية مع مؤشر أحمر يشير إلى رقم الحساسية، ثم لقطة 3 هيد شوت متتالية.',
            audio: '"جربت هذه الحساسية لمدة 10 دقائق فقط... والنتيجة؟ 100% هيد شوت من أول محاولة!"',
            textOnScreen: 'الحساسية السرية 🎯'
          },
          thumbnailConcept: {
            faceExpression: 'ابتسامة واثقة وذكية تشير بإصبعك إلى شريط الحساسية 100%.',
            gameplayElement: 'صورة زر النار مع أسهم خضراء وأرقام 99/100/100.',
            thumbnailText: '100% هيد شوت',
            colorContrast: 'أحمر ناري مع نص أبيض عريض بحواف سوداء سميكة.'
          },
          pacingTip: 'اشرح الإعدادات بسرعة في أول دقيقة دون حشو، ثم اعرض تطبيقاً عملياً في مواجهة حية لتثبت صحة كلامك.',
          recommendedTags: ['#حساسية_فري_فاير', '#شروحات_ألعاب', '#FreeFireMena', '#إعدادات_الهيدشوت']
        };
      }
    }

    if (selectedGame === 'gta-v') {
      return {
        gameName: 'GTA V FiveM',
        formatName: 'رول بلاي وقصص',
        arabicTitles: [
          'بدأت كشحات فقير في مدينة لوس سانتوس وأصبحت أغنى زعيم مافيا!',
          'شرطي جديد يوقفني لأول مرة... ولم يعلم أنني رئيس العصابة المتخفي!',
          'أكبر سرقة بنك في تاريخ السيرفر بدون أن نطلق رصاصة واحدة!',
          'طردوني من وظيفتي في الرول بلاي... فانتقمت بطريقة جنونية!'
        ],
        hookScript: {
          visual: 'لقطة لسيارات الشرطة تحاصرك في زاوية مظلمة، وأنت تقف ببرود تدخن سيجارة.',
          audio: '"قالوا لي: استسلم واخرج رافعاً يديك... لكنهم لم يكونوا يعلمون من يقف أمامهم الحقيقة!"',
          textOnScreen: 'الهروب المستحيل 🚔'
        },
        thumbnailConcept: {
          faceExpression: 'تعبير جاد أو ساخر بجانب شخصية الرول بلاي التي ترتدي بدلة أنيقة وقناع مافيا.',
          gameplayElement: 'طائرات هليكوبتر للشرطة مع أضواء زرقاء وحمراء تسلط أشعتها على سيارتك الرياضية.',
          thumbnailText: 'انتقام المافيا',
          colorContrast: 'أزرق نيون مع أحمر طوارئ ساطع.'
        },
        pacingTip: 'استخدم موسيقى تشويق سينمائية خالية من الحقوق في الخلفية مع تبديل زوايا كاميرا Rockstar Editor لإعطاء طابع فيلم أكشن.',
        recommendedTags: ['#GTAV', '#قراند_شفاير', '#فايف_ام', '#رول_بلاي', '#FiveM']
      };
    }

    if (selectedGame === 'valorant') {
      return {
        gameName: 'Valorant',
        formatName: selectedFormat === 'challenge' ? 'تحدي' : 'مهارات',
        arabicTitles: [
          'وصلت رانك إيمورتال بسلاح الشريف فقط وبدون شيلد!',
          'لاعبين أجانب استهزأوا بي لأنني عربي... فرددت عليهم في آخر جولة!',
          'أغرب كلااتش 1 ضد 5 كاد يوقف قلبي في بطولة الفالورانت!',
          'كيف تقرأ تحركات الخصوم كأنك تملك Wallhack قانوني!'
        ],
        hookScript: {
          visual: 'عداد الجولة 12-11، وأنت بمفردك ضد 5 لاعبين، مع صوت نبضات قلب سريعة.',
          audio: '"الشات بالكامل كتب GG... وقالوا مستحيل تفوز بهذه الجولة. انظروا ما الذي حدث في الـ 10 ثواني الأخيرة!"',
          textOnScreen: '1 ضد 5 كلااتش 💥'
        },
        thumbnailConcept: {
          faceExpression: 'وجه في قمة التركيز مع سماعة رأس احترافية وعيون مشدودة.',
          gameplayElement: 'شخصية Jett أو Reyna محاطة بـ 5 علامات جمجمة بيضاء متوهجة تدل على الإقصاء.',
          thumbnailText: '1 VS 5 !',
          colorContrast: 'أزرق سماوي مضيء مع بنفسجي داكن.'
        },
        pacingTip: 'سرع اللحظات الهادئة (1.5x) وأبطئ اللحظة التي تطلق فيها النار بنسبة 0.7x مع تضخيم صوت الـ Kill Banner.',
        recommendedTags: ['#Valorant', '#فالورانت', '#كلااتش', '#ValorantClips', '#FPSGaming']
      };
    }

    // Default Fallback Generator for other games
    const activeGameObj = gameOptions.find((g) => g.id === selectedGame) || gameOptions[0];
    return {
      gameName: activeGameObj.name,
      formatName: selectedFormat,
      arabicTitles: [
        `تحديت أفضل محترف في ${activeGameObj.name}... وحدث شيء غير متوقع!`,
        `أكبر خطأ يرتكبه 99% من لاعبي ${activeGameObj.name} ويجعلهم يخسرون دائماً`,
        `لعبت 24 ساعة متواصلة في ${activeGameObj.name} والنتيجة غيرت حسابي للأبد!`,
        `سري الجديد في ${activeGameObj.name} الذي يخفيه كبار الستريمرات عنك`
      ],
      hookScript: {
        visual: 'لقطة مقربة مدتها ثانية واحدة لأغرب لحظة في المقطع مع تكبير مفاجئ (Fast Zoom-in).',
        audio: '"لا أحد كان يصدق أن هذا الشيء ممكن في اللعبة... شاهد بنفسك ما الذي حدث في هذه اللحظة!"',
        textOnScreen: 'صدمة غير متوقعة! ⚡'
      },
      thumbnailConcept: {
        faceExpression: 'تعبير فرح عارم أو صدمة لا توصف مع عيون متسعة.',
        gameplayElement: 'لقطة لأندر عنصر أو أضخم مواجهة في اللعبة محاطة بسهم أصفر فسفوري.',
        thumbnailText: 'سر لا يُصدق!',
        colorContrast: 'أخضر ليموني ساطع مع بنفسجي داكن.'
      },
      pacingTip: 'احرص على ألا تتجاوز مقدمة الفيديو 5 ثوانٍ قبل الدخول المباشر في المغامرة والتحدي.',
      recommendedTags: [`#${activeGameObj.name.replace(/\s+/g, '')}`, '#ألعاب_عربية', '#GamingCreator', '#ستريم']
    };
  };

  const currentIdea = generateIdea();

  const handleCopyTitle = (title: string, index: number) => {
    navigator.clipboard.writeText(title);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyHook = () => {
    const text = `سيناريو الهوك (أول 3 ثواني):\n- بصرياً: ${currentIdea.hookScript.visual}\n- صوتياً: ${currentIdea.hookScript.audio}\n- النص على الشاشة: ${currentIdea.hookScript.textOnScreen}`;
    navigator.clipboard.writeText(text);
    setHookCopied(true);
    setTimeout(() => setHookCopied(false), 2000);
  };

  return (
    <div className="space-y-8 text-right" dir="rtl">
      {/* Header */}
      <div className="rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-500/10 via-zinc-900/80 to-zinc-900/50 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>مولد أفكار وعناوين الألعاب الفيروسية (Hooks & Titles)</span>
                <span className="rounded-md bg-pink-500/20 border border-pink-500/30 px-2 py-0.5 text-xs text-pink-300 font-bold">
                  Viral Engine
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                صمم عناوين تخطف النقرات (High CTR) وسيناريوهات أول 3 ثوانٍ وأفكار صور مصغرة مبتكرة للعبتك المفضلة.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Game Selector */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-2">
          <label className="block text-xs font-bold text-zinc-400">1. اختر اللعبة المستهدفة:</label>
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm font-bold text-white focus:border-pink-500 focus:outline-none"
          >
            {gameOptions.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name} — ({g.tag})
              </option>
            ))}
          </select>
        </div>

        {/* Format Selector */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-2">
          <label className="block text-xs font-bold text-zinc-400">2. اختر نوع وهيكل المحتوى:</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {formatOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFormat(f.id)}
                className={`rounded-xl border p-2 text-right transition-all cursor-pointer ${
                  selectedFormat === f.id
                    ? 'border-pink-500 bg-pink-500/15 text-white font-black'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="text-xs truncate">
                  <span className="ml-1">{f.icon}</span>
                  <span>{f.name.split('(')[0]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Ideas Result */}
      <div className="space-y-6">
        {/* Clickable Titles Card */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-400" />
              <span>عناوين مقترحة عالية النقر والفضول (High CTR Titles):</span>
            </h3>
            <span className="text-xs font-bold text-zinc-400">انقر لنسخ أي عنوان</span>
          </div>

          <div className="space-y-3">
            {currentIdea.arabicTitles.map((title, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-3.5 hover:border-pink-500/40 transition-all group"
              >
                <span className="text-sm font-bold text-zinc-200 leading-relaxed flex-1">
                  {title}
                </span>
                <button
                  onClick={() => handleCopyTitle(title, idx)}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-bold text-zinc-300 hover:bg-pink-500 hover:text-white transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  {copiedIndex === idx ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedIndex === idx ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hook Script & Thumbnail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First 3 Seconds Hook Script */}
          <div className="rounded-3xl border border-pink-500/30 bg-gradient-to-b from-pink-500/10 via-zinc-900/90 to-zinc-950 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-pink-300 flex items-center gap-2">
                <Film className="h-4 w-4" />
                <span>سيناريو أول 3 ثوانٍ (The 3-Second Hook):</span>
              </h4>
              <button
                onClick={handleCopyHook}
                className="rounded-xl border border-pink-500/30 bg-pink-500/20 px-2.5 py-1 text-xs font-bold text-pink-300 hover:bg-pink-500 hover:text-white transition-all cursor-pointer flex items-center gap-1"
              >
                {hookCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{hookCopied ? 'تم النسخ' : 'نسخ الهوك'}</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="rounded-xl bg-zinc-900/80 p-3 border border-zinc-800">
                <span className="font-bold text-pink-400 block mb-1">اللقطة البصرية (Visual):</span>
                <p className="text-zinc-300 leading-relaxed">{currentIdea.hookScript.visual}</p>
              </div>

              <div className="rounded-xl bg-zinc-900/80 p-3 border border-zinc-800">
                <span className="font-bold text-cyan-400 block mb-1">الكلام المنطوق (Audio Dialogue):</span>
                <p className="text-zinc-200 leading-relaxed font-semibold">"{currentIdea.hookScript.audio}"</p>
              </div>

              <div className="rounded-xl bg-zinc-900/80 p-3 border border-zinc-800">
                <span className="font-bold text-amber-400 block mb-1">النص العريض على الشاشة (On-Screen Text):</span>
                <p className="text-white font-black text-sm">{currentIdea.hookScript.textOnScreen}</p>
              </div>
            </div>
          </div>

          {/* Thumbnail Blueprint */}
          <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-500/10 via-zinc-900/90 to-zinc-950 p-6 space-y-4">
            <h4 className="text-sm font-black text-purple-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>مخطط الصورة المصغرة الفائزة (Thumbnail Blueprint):</span>
            </h4>

            <div className="space-y-3 text-xs">
              <div className="rounded-xl bg-zinc-900/80 p-3 border border-zinc-800">
                <span className="font-bold text-purple-400 block mb-1">تعبير وجه الستريمر (Facial Expression):</span>
                <p className="text-zinc-300">{currentIdea.thumbnailConcept.faceExpression}</p>
              </div>

              <div className="rounded-xl bg-zinc-900/80 p-3 border border-zinc-800">
                <span className="font-bold text-emerald-400 block mb-1">عنصر الإثارة في اللعبة:</span>
                <p className="text-zinc-300">{currentIdea.thumbnailConcept.gameplayElement}</p>
              </div>

              <div className="rounded-xl bg-zinc-900/80 p-3 border border-zinc-800">
                <span className="font-bold text-amber-400 block mb-1">النص المختصر للصورة (أقل من 3 كلمات):</span>
                <p className="text-white font-black text-base">{currentIdea.thumbnailConcept.thumbnailText}</p>
              </div>

              <div className="rounded-xl bg-zinc-900/80 p-3 border border-zinc-800">
                <span className="font-bold text-cyan-400 block mb-1">تباين الألوان الموصى به:</span>
                <p className="text-zinc-300">{currentIdea.thumbnailConcept.colorContrast}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pacing Advice Bar */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="text-zinc-300">
            <strong className="text-white">نصيحة المونتاج والإيقاع (Pacing):</strong> {currentIdea.pacingTip}
          </div>
          <div className="flex flex-wrap gap-1">
            {currentIdea.recommendedTags.map((t, i) => (
              <span key={i} className="rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
