import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Clock, Sparkles, AlertCircle, RefreshCw, Trophy, Target, ShieldCheck } from 'lucide-react';

interface DayPlan {
  day: number;
  week: string;
  title: string;
  detail: string;
  task: string;
  xpValue: number;
}

const THIRTY_DAYS: DayPlan[] = [
  // WEEK 1
  {
    day: 1,
    week: 'الأسبوع الأول: هندسة العتاد وتثبيت الإعدادات',
    title: 'معايرة الحساسية العامة والنقطة الحمراء',
    detail: 'ادخل ساحة التدريب وجرب 50 طلقة بسلاح Desert Eagle حتى تثبت طلقاتك الحمراء بنسبة 70%.',
    task: 'تدوين أرقام الحساسية المستقرة في هاتفك وعدم تغييرها.',
    xpValue: 40
  },
  {
    day: 2,
    week: 'الأسبوع الأول: هندسة العتاد وتثبيت الإعدادات',
    title: 'تخصيص أزرار التحكم (HUD) وحجم زر الإطلاق',
    detail: 'اضبط حجم زر إطلاق النار على 46% وضعه في الثلث السفلي لتوفير أطول مسار سحب لأعلى.',
    task: 'حفظ لقطة شاشة للـ HUD الجديد واللعب به 5 ألعاب للتأقلم.',
    xpValue: 40
  },
  {
    day: 3,
    week: 'الأسبوع الأول: هندسة العتاد وتثبيت الإعدادات',
    title: 'ضبط DPI الآمن وإعدادات High FPS',
    detail: 'ارفع الـ DPI في خيارات المطور بالقدر الآمن لجهازك وفعل خيار High FPS وفلتر Vivid.',
    task: 'التأكد من تشغيل اللعبة بـ 60FPS بدون أي تقطيع أو سخونة.',
    xpValue: 40
  },
  {
    day: 4,
    week: 'الأسبوع الأول: هندسة العتاد وتثبيت الإعدادات',
    title: 'إتقان سحب J-Shape في المدى القريب',
    detail: 'تدرب على سحب الزر المنحني بسلاح M1887 ضد الأهداف المتحركة القريبة.',
    task: 'تسجيل أول 5 لقطات ون تاب شوتغن نظيفة.',
    xpValue: 45
  },
  {
    day: 5,
    week: 'الأسبوع الأول: هندسة العتاد وتثبيت الإعدادات',
    title: 'تجهيز مسجل الشاشة والصوت الداخلي فقط',
    detail: 'اضبط مسجل الشاشة على 60FPS و1080p وكتم الميكروفون الخارجي لعزل صوت اللعبة.',
    task: 'تسجيل مقطع تجريبي والتأكد من خلوه من أي أصوات خارجية.',
    xpValue: 45
  },
  {
    day: 6,
    week: 'الأسبوع الأول: هندسة العتاد وتثبيت الإعدادات',
    title: 'بناء بنك اللقطات الاحترافية (Kills Bank)',
    detail: 'العب في طور Lone Wolf واجمع أفضل 10 لقطات هيد شوت سريعة ومثيرة.',
    task: 'قص اللقطات في مجلد خاص وتسميتها بأسماء واضحة.',
    xpValue: 50
  },
  {
    day: 7,
    week: 'الأسبوع الأول: هندسة العتاد وتثبيت الإعدادات',
    title: 'مراجعة أسبوع التأسيس والذاكرة العضلية',
    detail: 'العب 3 مباريات كلاش سكواد للتأكد من ثبات حركات أصابعك على الزر الجديد.',
    task: 'الحصول على MVP في مباراتين متتاليتين مع هيد شوت بنسبة > 60%.',
    xpValue: 50
  },

  // WEEK 2
  {
    day: 8,
    week: 'الأسبوع الثاني: إتقان مونتاج Beat Sync والنشر اليومي',
    title: 'تثبيت CapCut وتحديد نقاط الـ Beats',
    detail: 'استورد نغمة Phonk حماسية واستخدم أداة Beats لتوليد النقاط الصفراء على الإيقاع.',
    task: 'محاذاة أول طلقة هيد شوت مع أول ضربة باس.',
    xpValue: 50
  },
  {
    day: 9,
    week: 'الأسبوع الثاني: إتقان مونتاج Beat Sync والنشر اليومي',
    title: 'تطبيق منحنى السرعة (Custom Speed Curve)',
    detail: 'طبق منحنى السرعة 0.3x قبل الطلقة و 2.8x لحظة الإصابة مع خيار Optical Flow.',
    task: 'إنتاج أول مقطع تبطيء سلس بدون أي تقطيع فريمات.',
    xpValue: 55
  },
  {
    day: 10,
    week: 'الأسبوع الثاني: إتقان مونتاج Beat Sync والنشر اليومي',
    title: 'إضافة الاهتزاز (Shake) والوميض (Flash)',
    detail: 'أضف اهتزاز خاطف 0.2 ثانية مع وميض أبيض عند رأس الخصم لتعزيز صدمة الرصاصة.',
    task: 'تصدير أول فيديو مونتاج متكامل بطول 15 ثانية.',
    xpValue: 55
  },
  {
    day: 11,
    week: 'الأسبوع الثاني: إتقان مونتاج Beat Sync والنشر اليومي',
    title: 'صياغة هوك صادم وعنوان فيروزي',
    detail: 'اختر عنواناً يثير الفضول وابدأ الفيديو بلقطة حماسية فورية في أول ثانيتين.',
    task: 'نشر الفيديو الأول على تيك توك ويوتيوب شورتس الساعة 6 مساءً.',
    xpValue: 60
  },
  {
    day: 12,
    week: 'الأسبوع الثاني: إتقان مونتاج Beat Sync والنشر اليومي',
    title: 'فيديو شرح إعدادات هاتفك الحقيقية',
    detail: 'سجل شورتس مدته 30 ثانية تكشف فيه الحساسية والـ DPI التي تستخدمها فعلياً.',
    task: 'وضع لقطات الهيد شوت كدليل في خلفية الفيديو.',
    xpValue: 60
  },
  {
    day: 13,
    week: 'الأسبوع الثاني: إتقان مونتاج Beat Sync والنشر اليومي',
    title: 'الرد السريع على التعليقات وبناء الروابط',
    detail: 'تفاعل مع كل تعليق يسألك عن كود الحساسية أو نوع هاتفك بلباقة وأدب.',
    task: 'تثبيت تعليق يسأل المشاهدين: "ما هو نوع هاتفك لأعطيك حساسيتك؟".',
    xpValue: 65
  },
  {
    day: 14,
    week: 'الأسبوع الثاني: إتقان مونتاج Beat Sync والنشر اليومي',
    title: 'تحليل إحصائيات أول أسبوع نشر (Analytics)',
    detail: 'افحص نسبة Retention ونسبة المشاهدة مقابل التخطي (Viewed vs Swiped).',
    task: 'تحديد أكثر فيديو حقق مشاهدات واستنساخ طريقته في الأسبوع القادم.',
    xpValue: 65
  },

  // WEEK 3
  {
    day: 15,
    week: 'الأسبوع الثالث: الرومات التفاعلية وإطلاق مجتمع ديسكورد',
    title: 'إنشاء سيرفر ديسكورد مخصص للكلانات والبطولات',
    detail: 'رتب قنوات السيرفر: #شروط-البطولة، #تسجيل-الفرق، #لقطات-المتابعين.',
    task: 'دعوة أول 30 لاعباً من متابعيك النشطين للسيرفر.',
    xpValue: 70
  },
  {
    day: 16,
    week: 'الأسبوع الثالث: الرومات التفاعلية وإطلاق مجتمع ديسكورد',
    title: 'تجهيز بطاقات الروم وإعلان أول بطولة',
    detail: 'استخدم منظم الرومات لضبط القوانين: ذخيرة غير محدودة وبدون خصائص أسلحة.',
    task: 'نشر إعلان البطولة مع الجائزة (1000 جوهرة) في التيك توك وديسكورد.',
    xpValue: 70
  },
  {
    day: 17,
    week: 'الأسبوع الثالث: الرومات التفاعلية وإطلاق مجتمع ديسكورد',
    title: 'أول بث مباشر للبطولة مع تعليق حماسي',
    detail: 'ابدأ البث المباشر على يوتيوب أو تيك توك، وعلق على مجريات الروم بحماس.',
    task: 'الوصول إلى 30 مشاهداً متزامناً في أول بث رسمي للروم.',
    xpValue: 75
  },
  {
    day: 18,
    week: 'الأسبوع الثالث: الرومات التفاعلية وإطلاق مجتمع ديسكورد',
    title: 'تسليم الجوائز بشفافية وتوثيق اللحظة',
    detail: 'اشحن الجواهر للفائز عبر معرف حسابه UID واعرض لقطة الشحن في ستوري القناة.',
    task: 'بناء سمعة كصانع محتوى صادق ووفي بوعوده.',
    xpValue: 75
  },
  {
    day: 19,
    week: 'الأسبوع الثالث: الرومات التفاعلية وإطلاق مجتمع ديسكورد',
    title: 'قص أبرز لقطات البطولة وتحويلها لشورتس',
    detail: 'استخرج أفضل 3 هيد شوتات حدثت بالروم وصمم منها فيديو هايلايت حماسي.',
    task: 'نشر الهايلايت مع ذكر أسماء اللاعبين الفائزين لتحفيز المجتمع.',
    xpValue: 80
  },
  {
    day: 20,
    week: 'الأسبوع الثالث: الرومات التفاعلية وإطلاق مجتمع ديسكورد',
    title: 'شرح كومبو الشخصيات الميتا لـ CS Rank',
    detail: 'انشر فيديو يشرح تشكيلة تاتسويا وجوتا وهاياتو وكيلّي لتسلق الرتب.',
    task: 'إضافة شاشة تلخيص تدعو المشاهدين لحفظ الفيديو في المفضلة.',
    xpValue: 80
  },
  {
    day: 21,
    week: 'الأسبوع الثالث: الرومات التفاعلية وإطلاق مجتمع ديسكورد',
    title: 'تحدي صانع محتوى آخر في روم فردي (Collab)',
    detail: 'تواصل مع صانع محتوى بنفس حجم قناتك ونظم روم تحدي ودي 1v1.',
    task: 'تبادل المتابعين والظهور المشترك في فيديو مشترك.',
    xpValue: 85
  },

  // WEEK 4
  {
    day: 22,
    week: 'الأسبوع الرابع: اقتناص التحديث، الشراكة وتحقيق الأرباح',
    title: 'التسجيل في السيرفر المطور لتحديث OB القادم',
    detail: 'ادخل موقع جارينا الرسمي وسجل حسابك فور فتح باب التسجيل للحصول على كود التفعيل.',
    task: 'تأمين كود السيرفر المطور وتثبيت حزمة اللعبة التجريبية.',
    xpValue: 85
  },
  {
    day: 23,
    week: 'الأسبوع الرابع: اقتناص التحديث، الشراكة وتحقيق الأرباح',
    title: 'تسجيل ونشر أول فيديو لتسريبات الشخصية الجديدة',
    detail: 'كن أول من يشرح مهارة الشخصية الجديدة في فيديوهات قصيرة وطويلة.',
    task: 'استغلال موجة البحث العالمية وحصد آلاف المشاهدات في أول ساعات.',
    xpValue: 90
  },
  {
    day: 24,
    week: 'الأسبوع الرابع: اقتناص التحديث، الشراكة وتحقيق الأرباح',
    title: 'تفعيل إعلانات AdSense وتجهيز روابط الأفلييت',
    detail: 'ضع في وصف فيديوهاتك روابط شراء أغطية الأصابع ومراوح التبريد التي تستخدمها.',
    task: 'كسب أول عمولة مبيعات من ملحقات الجيمنج.',
    xpValue: 90
  },
  {
    day: 25,
    week: 'الأسبوع الرابع: اقتناص التحديث، الشراكة وتحقيق الأرباح',
    title: 'فحص القناة الشامل بأداة V-Badge Checker',
    detail: 'افحص نسبتك المئوية في شروط جارينا: الجمهور، المشاهدات، والسجل النظيف.',
    task: 'حذف أي فيديو قديم قد يحتوي على كلمة مشبوهة أو مخالفة.',
    xpValue: 95
  },
  {
    day: 26,
    week: 'الأسبوع الرابع: اقتناص التحديث، الشراكة وتحقيق الأرباح',
    title: 'تجهيز ملف القناة والبريد التجاري الرسمي',
    detail: 'اكتب سيرة ذاتية أنيقة في قسم "حول القناة" وضع إيميل رسمي لاستقبال عروض الرعاية.',
    task: 'إعداد نموذج التقديم لبرنامج الشركاء متضمناً الـ UID وإحصائيات الاستوديو.',
    xpValue: 95
  },
  {
    day: 27,
    week: 'الأسبوع الرابع: اقتناص التحديث، الشراكة وتحقيق الأرباح',
    title: 'تقديم الطلب الرسمي لبرنامج شراكة Garena MENA',
    detail: 'أرسل بياناتك عبر استمارة الشركاء الرسمية عند فتح باب التقديم الموسمي.',
    task: 'متابعة البريد الإلكتروني وسيرفر ديسكورد الشركاء لتلقي الرد.',
    xpValue: 100
  },
  {
    day: 28,
    week: 'الأسبوع الرابع: اقتناص التحديث، الشراكة وتحقيق الأرباح',
    title: 'التخطيط لاستثمار أرباح الشهر الأول في معدات أفضل',
    detail: 'خصص 30% من أرباحك لشراء ميكروفون خارجي أو هاتف بمعدل 120Hz لتطوير المحتوى.',
    task: 'وضع جدول إنتاج شهري يتضمن 15 فيديو شورتس وبثين أسبوعياً.',
    xpValue: 100
  },
  {
    day: 29,
    week: 'الأسبوع الرابع: اقتناص التحديث، الشراكة وتحقيق الأرباح',
    title: 'بناء روتين تدريب يومي لمدة 20 دقيقة',
    detail: 'خصص 20 دقيقة يومياً في ساحة التدريب قبل أي مباراة للحفاظ على حساسية يدك.',
    task: 'تحقيق 100 طلقة هيد شوت متتالية في التدريب.',
    xpValue: 100
  },
  {
    day: 30,
    week: 'الأسبوع الرابع: اقتناص التحديث، الشراكة وتحقيق الأرباح',
    title: 'التتويج: الاحتفال بنجاح إطلاق القناة',
    detail: 'قمت ببناء قناة متخصصة، مجتمع وفي، نظام إنتاج منضبط، ومسار موثوق نحو الشراكة الرسمية.',
    task: 'تنظيم روم احتفالية للمتابعين وتكريم أفضل الداعمين في قناتك.',
    xpValue: 150
  }
];

export const FreeFireThirtyDayRoadmap: React.FC = () => {
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('freefire_roadmap_completed_days');
      return saved ? JSON.parse(saved) : [1, 2];
    } catch {
      return [1, 2];
    }
  });

  const [activeWeekFilter, setActiveWeekFilter] = useState<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem('freefire_roadmap_completed_days', JSON.stringify(completedDays));
    } catch (e) {
      console.error(e);
    }
  }, [completedDays]);

  const toggleDay = (day: number) => {
    setCompletedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const resetProgress = () => {
    if (window.confirm('هل تريد حقاً إعادة تعيين تقدم خطة الـ 30 يوماً؟')) {
      setCompletedDays([]);
    }
  };

  const progressPercent = Math.round((completedDays.length / 30) * 100);

  // Group by weeks
  const weeks = [
    { id: 1, name: 'الأسبوع 1: التأسيس والإعدادات', days: THIRTY_DAYS.slice(0, 7) },
    { id: 2, name: 'الأسبوع 2: المونتاج والنشر', days: THIRTY_DAYS.slice(7, 14) },
    { id: 3, name: 'الأسبوع 3: الرومات والديسكورد', days: THIRTY_DAYS.slice(14, 21) },
    { id: 4, name: 'الأسبوع 4: التحديث والشراكة', days: THIRTY_DAYS.slice(21, 30) }
  ];

  const displayedDays = activeWeekFilter === 0 ? THIRTY_DAYS : weeks[activeWeekFilter - 1].days;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-950 p-5 sm:p-6 shadow-xl shadow-emerald-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-black shadow-lg shadow-emerald-500/30">
              <Calendar className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                <Sparkles className="h-3 w-3" />
                <span>خارطة الطريق العملية من الصفر إلى الشراكة</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                خطة الـ 30 يوماً للانطلاق الاحترافي في صناعة محتوى فري فاير
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetProgress}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs font-bold text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>إعادة تعيين</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 pt-4 border-t border-zinc-800">
          <div className="flex justify-between items-center text-xs font-bold mb-2">
            <span className="text-zinc-300">
              إنجاز الخطة: {completedDays.length} من 30 يوماً
            </span>
            <span className="font-mono text-emerald-400 text-sm font-black">
              {progressPercent}%
            </span>
          </div>
          <div className="h-3 w-full bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-teal-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Week Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveWeekFilter(0)}
          className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeWeekFilter === 0
              ? 'bg-emerald-500 text-black font-black shadow-md shadow-emerald-500/20'
              : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          عرض جميع الأيام (30)
        </button>
        {weeks.map((w) => (
          <button
            key={w.id}
            onClick={() => setActiveWeekFilter(w.id)}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeWeekFilter === w.id
                ? 'bg-emerald-500 text-black font-black shadow-md shadow-emerald-500/20'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            {w.name}
          </button>
        ))}
      </div>

      {/* Days List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedDays.map((item) => {
          const isDone = completedDays.includes(item.day);
          return (
            <div
              key={item.day}
              onClick={() => toggleDay(item.day)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm'
                  : 'bg-zinc-900/80 border-zinc-800 hover:bg-zinc-800/80'
              }`}
            >
              <div
                className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  isDone
                    ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                    : 'border border-zinc-700 bg-zinc-950 text-transparent'
                }`}
              >
                <CheckCircle2 className="h-4 w-4 stroke-[3]" />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] font-mono font-bold text-emerald-400">
                    اليوم {item.day} · {item.week.split(':')[0]}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-amber-300 font-bold">
                    +{item.xpValue} XP
                  </span>
                </div>
                <h4
                  className={`text-xs sm:text-sm font-bold ${
                    isDone ? 'text-zinc-400 line-through' : 'text-white'
                  }`}
                >
                  {item.title}
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{item.detail}</p>
                <div className="mt-2 text-[11px] font-bold text-zinc-300 bg-zinc-950/80 p-2 rounded-lg border border-zinc-800/80 flex items-center gap-1.5">
                  <Target className="h-3 w-3 text-emerald-400 shrink-0" />
                  <span>المهمة: {item.task}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
