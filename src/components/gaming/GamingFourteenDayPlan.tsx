import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Clock, Sparkles, AlertCircle, RefreshCw, Layers, Gamepad2, Trophy } from 'lucide-react';

interface DayPlan {
  day: number;
  phase: string;
  title: string;
  description: string;
  tasks: string[];
  deliverable: string;
  proTip: string;
}

const FOURTEEN_DAYS: DayPlan[] = [
  {
    day: 1,
    phase: 'المرحلة 1: التأسيس واختيار النيش',
    title: 'تحديد لعبة البداية والزاوية التنافسية',
    description: 'تحليل المنصات واختيار لعبة واحدة تركز عليها خلال أول شهر مع تحديد زاويتك (مهارة، كوميديا، شروحات).',
    tasks: [
      'اختيار لعبتك الأساسية (Single Anchor Game) ولعبة بديلة في نفس التصنيف.',
      'تحديد زاويتك التنافسية: هل تقدم لعباً احترافياً، أم مواقف مرحة، أم شروحات حساسية وتكتيكات؟',
      'فحص 3 قنوات منافسة على يوتيوب وتيك توك لتحديد النقاط التي يتجاهلونها.'
    ],
    deliverable: 'وثيقة تحديد اللعبة والزاوية التنافسية والجمهور المستهدف.',
    proTip: 'ركز على لعبة موبايل أو لعبة ذات مجتمع عربي نشط لتسهيل الحصول على أول 100 متابع.'
  },
  {
    day: 2,
    phase: 'المرحلة 1: التأسيس واختيار النيش',
    title: 'صياغة اسم القناة وبناء العلامة البصرية',
    description: 'اختيار اسم سهل النطق وتصميم لوجو، بانر، وقوالب موحدة للهوية البصرية على Canva.',
    tasks: [
      'اختيار اسم قناة فريد (Gaming Handle) وسهل الحفظ باللغتين العربية والإنجليزية.',
      'تصميم شعار (Logo) وقناع أو صورة رمزية مميزة على Canva.',
      'تصميم بانر القناة بحجم 2560x1440 بكسل يوضح جدول مواعيد البث أو النشر.'
    ],
    deliverable: 'شعار، بانر، وألوان هوية القناة جاهزة للاستخدام عبر جميع المنصات.',
    proTip: 'اختر لونين متضادين كألوان أساسية لعلامتك (مثلاً: البنفسجي مع الأصفر الفسفوري).'
  },
  {
    day: 3,
    phase: 'المرحلة 1: التأسيس واختيار النيش',
    title: 'تهيئة الحسابات الرقمية وتوحيد الروابط',
    description: 'إنشاء وضبط قنوات YouTube و TikTok و Kick/Twitch و Instagram بالهوية الموحدة.',
    tasks: [
      'تسجيل نفس المعرّف (@Handle) عبر جميع المنصات الأساسية.',
      'كتابة وصف قناة احترافي (Bio) يوضح ما تقدمه مع إيميل مخصص للتواصل التجاري.',
      'إنشاء رابط موحد يجمع حساباتك (Linktree أو Beacons).'
    ],
    deliverable: 'حسابات مكتملة ومؤمنة بالتحقق الثنائي (2FA) وجاهزة لاستقبال المتابعين.',
    proTip: 'فعّل التحقق بخطوتين عبر تطبيق مصادقة مثل Google Authenticator لحماية حساباتك من الاختراق.'
  },
  {
    day: 4,
    phase: 'المرحلة 2: العتاد وضبط استوديو OBS',
    title: 'تثبيت OBS Studio وضبط المشاهد والأوفرلاي',
    description: 'إعداد برنامج OBS وبناء المشاهد الأربعة الأساسية وربط الأوفرلاي.',
    tasks: [
      'تحميل أحدث إصدار من OBS Studio وتشغيله كمسؤول (Run as Administrator).',
      'بناء 4 مشاهد أساسية: Starting Soon، Gameplay، Just Chatting، و Ending.',
      'إضافة Game Capture والتقاط شاشة اللعب بدون أي حواف سوداء.'
    ],
    deliverable: 'مشاهد OBS كاملة ومجهزة وجاهزة للبث والتسجيل.',
    proTip: 'لا تستخدم Display Capture لحماية شاشة سطح المكتب والرسائل الخاصة من الظهور.'
  },
  {
    day: 5,
    phase: 'المرحلة 2: العتاد وضبط استوديو OBS',
    title: 'ضبط الصوت، الميكروفون، وفلاتر العزل',
    description: 'وزن مستويات صوت اللعبة وصوت الميكروفون وتطبيق فلاتر تنقية الصوت.',
    tasks: [
      'وضع الميكروفون على ذراع مكتبي على بعد 10 سم من الفم مع Pop Filter.',
      'تطبيق فلاتر OBS الصوتية: Noise Suppression (RNNoise)، Compressor (4:1)، و Limiter (-1.5dB).',
      'فصل مسارات الصوت في OBS لحفظ صوت الميكروفون مستقلاً عن اللعبة في التسجيلات.'
    ],
    deliverable: 'تسجيل تجريبي يثبت نقاء الصوت وعدم تشوهه عند اللقطات الحماسية.'
    ,
    proTip: 'الصوت يمثل 70% من نجاح مقطع الألعاب؛ نقاء الميكروفون يضاعف مدة بقاء المشاهدين.'
  },
  {
    day: 6,
    phase: 'المرحلة 2: العتاد وضبط استوديو OBS',
    title: 'اختبار التسجيل ومعدل البت والدروب فريم',
    description: 'إجراء تسجيل تجريبي للعبتك لمدة 15 دقيقة مع مراجعة مؤشرات الأداء.',
    tasks: [
      'حساب البت ريت والمشفر المناسب باستخدام حاسبة OBS داخل المسار.',
      'لعب مرحلة مكثفة وتسجيلها للتأكد من ثبات 60 FPS وعدم هبوط الإطارات.',
      'ضبط زر الاختصار (Hot-key) لميزة Replay Buffer لحفظ أقوى لقطات اللعب بنقرة واحدة.'
    ],
    deliverable: 'مقطع فيديو تجريبي عالي الجودة بدقة 1080p60fps خالي من التقطيع.'
    ,
    proTip: 'إذا كان استهلاك المعالج يتجاوز 70%، خفض دقة البث إلى 936p أو 720p بمعدل 60 إطاراً.'
  },
  {
    day: 7,
    phase: 'المرحلة 3: المحتوى القصير ومجتمع ديسكورد',
    title: 'تسجيل أول حزمة لقطات حماسية ومواقف مضحكة',
    description: 'لعب جلسة تسجيل ممتعة مدتها ساعتان بهدف التقاط 5 لحظات مميزة.',
    tasks: [
      'اللعب مع تطبيق أسلوب "التفكير بصوت مسموع" والتحدث دون توقف.',
      'حفظ أقوى لقطات القتل، الصدمات، أو المواقف الفاشلة والضحك العفوي.',
      'تحديد اللحظات الأكثر ملاءمة لتحويلها إلى مقاطع شورتس عمودية.'
    ],
    deliverable: '5 مقاطع خام (Raw Highlights) جاهزة لدخول مرحلة المونتاج السريع.'
    ,
    proTip: 'لا تنتظر لقطة أسطورية خارقة؛ رد فعلك المضحك على موقف فاشل يحصد مشاهدات أكثر من لقطة لعب جادة.'
  },
  {
    day: 8,
    phase: 'المرحلة 3: المحتوى القصير ومجتمع ديسكورد',
    title: 'مونتاج أول مقطع شورتس / تيك توك فيروزي',
    description: 'استخدام CapCut لقص المقطع بأبعاد 9:16 وتركيب الكاميرا والنصوص المتحركة.',
    tasks: [
      'وضع اللعبة في الأسفل وكاميرا الوجه المكبرة في الأعلى بأبعاد 9:16.',
      'صياغة هوك قوي في أول 3 ثوانٍ يخطف الانتباه قبل التمرير.',
      'إضافة ترجمة حركية ملونة (Auto Captions) ومؤثرات صوتية سريعة.'
    ],
    deliverable: 'مقطع شورتس احترافي مدته 30 ثانية منشور على TikTok و Shorts و Reels.'
    ,
    proTip: 'احذف كل ثانية صمت؛ الإيقاع السريع هو كلمة السر في خوارزميات الفيديوهات القصيرة.'
  },
  {
    day: 9,
    phase: 'المرحلة 3: المحتوى القصير ومجتمع ديسكورد',
    title: 'جدولة 4 مقاطع قصيرة إضافية لتغذية الخوارزمية',
    description: 'مونتاج المقاطع المتبقية وجدولتها بمعدل مقطع يومياً لخلق استمرارية.',
    tasks: [
      'إنهاء مونتاج 4 مقاطع شورتس من تسجيلات اليوم السابع.',
      'كتابة كابشن جذاب يطرح سؤالاً يدفع المشاهدين للتعليق.',
      'جدولة المقاطع للنشر في أوقات الذروة (بين 6 و 9 مساءً).'
    ],
    deliverable: 'جدول نشر متواصل لمدة 4 أيام يغذي الخوارزمية بشكل مستمر.'
    ,
    proTip: 'الاستمرارية اليومية في أول أسبوعين تعطي إشارة قوية لمنصة تيك توك بأن حسابك نشط وجاد.'
  },
  {
    day: 10,
    phase: 'المرحلة 3: المحتوى القصير ومجتمع ديسكورد',
    title: 'تأسيس سيرفر ديسكورد وإعداد البوتات',
    description: 'بناء مقر مجتمعك الدائم وتفعيل رومات الدردشة وبوتات التنبيه والحماية.',
    tasks: [
      'إنشاء السيرفر وتقسيمه: رومات القوانين، الإعلانات، الشات العام، واللقطات.',
      'تثبيت بوت الحماية ونظام التحقق (Verification) لمنع هجمات السبام.',
      'ربط بوت التنبيهات (Pingcord) لينشر إشعاراً آلياً فور بدء البث.'
    ],
    deliverable: 'سيرفر ديسكورد مرتب بالرتب وجاهز لاستقبال أول أعضاء من المتابعين.'
    ,
    proTip: 'ضع رابط الديسكورد في البايو وأوامر الشات واجعل الانضمام إليه هو الهدف الأسمى لكل مقطع.'
  },
  {
    day: 11,
    phase: 'المرحلة 4: الاستعداد للبث وإطلاق أول لايف',
    title: 'إعداد بوتات الشات وصفحة الدعم والتبرعات',
    description: 'ربط Nightbot أو StreamElements وتجهيز بوابات التبرع المباشر الآمنة.',
    tasks: [
      'تفعيل بوت الشات وإضافة الأوامر الأساسية: !discord, !specs, !social.',
      'إنشاء صفحة تبرع مباشرة عبر Streamlabs/PayPal تجاري لحماية بياناتك الشخصية.',
      'اختبار تنبيهات الدعم والمتابعة (Follow & Tip Alerts) داخل OBS.'
    ],
    deliverable: 'نظام شات وبوتات وتنبيهات تفاعلية جاهز تماماً على الشاشة.'
    ,
    proTip: 'اجعل صوت التنبيه مرحاً ومميزاً ليتحمس المتابعون للمتابعة والدعم لسماعه على الهواء.'
  },
  {
    day: 12,
    phase: 'المرحلة 4: الاستعداد للبث وإطلاق أول لايف',
    title: 'تسجيل ونشر أول فيديو طويل على يوتيوب بتحدٍّ قوي',
    description: 'صناعة فيديو 8 إلى 12 دقيقة مع صورة مصغرة لا تُقاوم لرفع الـ CTR.',
    tasks: [
      'تسجيل تحدٍّ مشوق ذي رهان عالي (مثلاً: الفوز بسلاح واحد فقط).',
      'مونتاج الفيديو مع حذف اللحظات الميتة وإضافة فواصل موسيقية تشويقية.',
      'تصميم صورة مصغرة متباينة الألوان على Canva تحتوي على وجهك ولغز وعنوان مختصر.'
    ],
    deliverable: 'أول فيديو طويل رسمي منشور على يوتيوب مع وصف وكلمات مفتاحية متكاملة.'
    ,
    proTip: 'لا تكرر العنوان في الصورة المصغرة؛ اجعل الصورة تطرح لغزاً والعنوان يوضح التحدي.'
  },
  {
    day: 13,
    phase: 'المرحلة 4: الاستعداد للبث وإطلاق أول لايف',
    title: 'بروفة كاملة قبل البث المباشر (Dry Run)',
    description: 'بث تجريبي خاص غير مدرج للتأكد من استقرار الإنترنت والصوت وتكامل المنظومة.',
    tasks: [
      'فتح بث تجريبي غير مدرج (Unlisted) لمدة 20 دقيقة.',
      'الدخول من هاتفك لمشاهدة البث والاستماع للصوت والتأكد من عدم وجود لاج أو تأخر.',
      'مراجعة قائمة الفحص قبل البث المباشر المرفقة في هذا المسار بنداً ببند.'
    ],
    deliverable: 'التأكد بنسبة 100% من جاهزية كل شيء وخلو البث من أي مفاجآت تقنية.'
    ,
    proTip: 'تحقق من عدم وجود تحديثات ويندوز أو تحديثات ألعاب ضخمة معلقة قد تبدأ فجأة أثناء البث.'
  },
  {
    day: 14,
    phase: 'المرحلة 4: الاستعداد للبث وإطلاق أول لايف',
    title: 'اليوم الكبير: إطلاق أول بث مباشر رسمي والاحتفال!',
    description: 'الإعلان عن البث في ديسكورد وسوشيال ميديا وفتح أول جلسة بث حي والتفاعل بحماس!',
    tasks: [
      'نشر إعلان البث في ديسكورد وستوري إنستغرام مع وقت البدء بدقة.',
      'تجهيز زجاجة الماء وإخفاء عداد المشاهدين للتحدث واللعب بحماس وتفاعل مستمر.',
      'البث لمدة ساعتين إلى 3 ساعات، والترحيب بكل من يدخل، وقص لقطات البث لصنع مقاطع اليوم التالي!'
    ],
    deliverable: 'إتمام أول جلسة بث مباشر رسمية في مسيرتك وكسر حاجز الخوف إلى الأبد!'
    ,
    proTip: 'حتى لو حضر 3 أشخاص فقط، عاملهم كأنهم ملوك؛ هؤلاء هم النواة الصلبة التي ستبني إمبراطوريتك الرقمية القادمة!'
  }
];

export const GamingFourteenDayPlan: React.FC = () => {
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('rikou_gaming_14day_plan');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [expandedDay, setExpandedDay] = useState<number>(1);

  useEffect(() => {
    try {
      localStorage.setItem('rikou_gaming_14day_plan', JSON.stringify(completedDays));
    } catch (e) {
      console.error(e);
    }
  }, [completedDays]);

  const toggleDay = (day: number) => {
    setCompletedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const resetPlan = () => {
    setCompletedDays([]);
  };

  const progressPercent = Math.round((completedDays.length / 14) * 100);

  return (
    <div className="space-y-8 text-right" dir="rtl">
      {/* Header Banner */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-zinc-900/80 to-zinc-900/50 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>خطة الـ 14 يوماً للانطلاق من الصفر إلى أول بث ومحتوى</span>
                <span className="rounded-md bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 text-xs text-amber-300 font-bold">
                  Roadmap to Live
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                خارطة طريق تنفيذية يومية خطوة بخطوة للتحول من مجرد مشاهد إلى صانع محتوى وبث مباشر متكامل بدون تسويف.
              </p>
            </div>
          </div>

          <button
            onClick={resetPlan}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-bold text-zinc-300 hover:text-rose-400 transition-all cursor-pointer self-start sm:self-center"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>إعادة ضبط الخطة</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-zinc-300">
              إنجاز الخطة: {completedDays.length} من 14 يوماً مكتمل ({progressPercent}%)
            </span>
            <span className={`font-black text-sm ${progressPercent === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {progressPercent === 100 ? 'مبروك! جاهز للبث بنجاح 🎉' : 'استمر خطوة بخطوة!'}
            </span>
          </div>
          <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                progressPercent === 100 ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-gradient-to-r from-amber-500 to-amber-400'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Days List */}
      <div className="space-y-3.5">
        {FOURTEEN_DAYS.map((item) => {
          const isDone = completedDays.includes(item.day);
          const isExpanded = expandedDay === item.day;

          return (
            <div
              key={item.day}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isDone
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : isExpanded
                  ? 'border-amber-500/40 bg-zinc-900/90 shadow-xl'
                  : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
              }`}
            >
              {/* Day Header Bar */}
              <div
                onClick={() => setExpandedDay(isExpanded ? 0 : item.day)}
                className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDay(item.day);
                    }}
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border transition-all cursor-pointer ${
                      isDone
                        ? 'border-emerald-500 bg-emerald-500 text-black shadow-md'
                        : 'border-zinc-700 bg-zinc-800 hover:border-amber-500'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-black text-zinc-400">{item.day}</span>}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-amber-400">{item.phase}</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-xs font-bold text-zinc-400">اليوم {item.day}</span>
                    </div>
                    <h3 className={`text-sm sm:text-base font-black mt-0.5 ${isDone ? 'text-zinc-300 line-through' : 'text-white'}`}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isDone ? (
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-black text-emerald-300 border border-emerald-500/30">
                      مكتمل ✓
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-zinc-500 hidden sm:inline">
                      {isExpanded ? 'إغلاق التفاصيل' : 'عرض المهام'}
                    </span>
                  )}
                </div>
              </div>

              {/* Day Details Accordion */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 space-y-4 border-t border-zinc-800/80 text-xs">
                  <p className="text-zinc-300 leading-relaxed font-medium">{item.description}</p>

                  <div className="space-y-2">
                    <span className="font-bold text-amber-300 block">مهام اليوم المحددة:</span>
                    <ul className="space-y-1.5 pr-2">
                      {item.tasks.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-zinc-300 leading-relaxed">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverable Box */}
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 space-y-1">
                    <span className="font-bold text-cyan-400 flex items-center gap-1.5 text-[11px]">
                      <Trophy className="h-3.5 w-3.5" />
                      <span>المخرج العملي المطلوب لهذا اليوم:</span>
                    </span>
                    <p className="text-zinc-200 font-semibold">{item.deliverable}</p>
                  </div>

                  {/* Pro Tip */}
                  <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3 flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                    <p className="text-zinc-300 text-[11px] leading-relaxed">
                      <strong className="text-purple-300">نصيحة ذهبية:</strong> {item.proTip}
                    </p>
                  </div>

                  {/* Toggle Done Button inside card */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => toggleDay(item.day)}
                      className={`rounded-xl px-4 py-2 text-xs font-black transition-all cursor-pointer ${
                        isDone
                          ? 'border border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white'
                          : 'bg-amber-500 text-black hover:bg-amber-400 shadow-md shadow-amber-500/20'
                      }`}
                    >
                      {isDone ? 'إلغاء وضع الاكتمال' : 'تحديد هذا اليوم كمكتمل ✓'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
