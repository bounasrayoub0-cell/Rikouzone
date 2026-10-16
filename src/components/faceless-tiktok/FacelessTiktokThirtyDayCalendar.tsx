import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, CheckCircle2, Clock, Sparkles, AlertCircle, RefreshCw, Trophy, Target, Film, Edit3, Save, Check } from 'lucide-react';

export type ProductionStatus = 'مخطط' | 'قيد الكتابة' | 'قيد المونتاج' | 'جاهز' | 'تم النشر';

interface DaySchedule {
  day: number;
  week: number;
  weekTitle: string;
  title: string;
  formatType: string;
  status: ProductionStatus;
  proTip: string;
}

const DEFAULT_30_DAYS: DaySchedule[] = [
  // Week 1: Setup & First Content Pillar
  {
    day: 1,
    week: 1,
    weekTitle: 'الأسبوع الأول: التأسيس وضبط هوية الحساب',
    title: 'تحديد النيتش بدقة وضبط البايو والصورة الرمزية',
    formatType: 'إعداد الحساب',
    status: 'تم النشر',
    proTip: 'استخدم معادلة البايو الثلاثية (الوعد + الإيقاع + الـ CTA).'
  },
  {
    day: 2,
    week: 1,
    weekTitle: 'الأسبوع الأول: التأسيس وضبط هوية الحساب',
    title: 'توليد أول 15 فكرة في بنك الأفكار وتصنيفها',
    formatType: 'عصف ذهني',
    status: 'تم النشر',
    proTip: 'استخدم شريط بحث تيك توك لاستخراج الأسئلة الأكثر شيوعاً.'
  },
  {
    day: 3,
    week: 1,
    weekTitle: 'الأسبوع الأول: التأسيس وضبط هوية الحساب',
    title: 'فيديو 1: حل مشكلة شائعة جداً في تخصصك في 25 ثانية',
    formatType: 'نصيحة سريعة',
    status: 'تم النشر',
    proTip: 'ركز على خطاف صادم يبدأ بكسر معتقد سائد.'
  },
  {
    day: 4,
    week: 1,
    weekTitle: 'الأسبوع الأول: التأسيس وضبط هوية الحساب',
    title: 'فيديو 2: مقارنة بصرية سريعة بين طريقتين أو أداتين',
    formatType: 'مقارنة بصرية',
    status: 'جاهز',
    proTip: 'ضع علامة خطأ حمراء على الطريقة القديمة وعلامة خضراء على البديل الأفضل.'
  },
  {
    day: 5,
    week: 1,
    weekTitle: 'الأسبوع الأول: التأسيس وضبط هوية الحساب',
    title: 'فيديو 3: كشف موقع أو أداة غير معروفة تقدم قيمة مجانية',
    formatType: 'شرح أداة',
    status: 'جاهز',
    proTip: 'تسجيل شاشة مباشر لواجهة الموقع مع إبراز النتائج.'
  },
  {
    day: 6,
    week: 1,
    weekTitle: 'الأسبوع الأول: التأسيس وضبط هوية الحساب',
    title: 'فيديو 4: حقيقة مدهشة أو قصة قصيرة في 30 ثانية',
    formatType: 'قصة/حقيقة',
    status: 'قيد المونتاج',
    proTip: 'اختر لقطات B-Roll سينمائية مع إيقاع سردي مشوق.'
  },
  {
    day: 7,
    week: 1,
    weekTitle: 'الأسبوع الأول: التأسيس وضبط هوية الحساب',
    title: 'جلسة مراجعة أرقام الأسبوع الأول والرد على أول تعليقات',
    formatType: 'مراجعة وتفاعل',
    status: 'مخطط',
    proTip: 'لاحظ أي فيديو حقق أعلى نسبة إكمال (Completion Rate) لتكرار أسلوبه.'
  },

  // Week 2: First Content Series
  {
    day: 8,
    week: 2,
    weekTitle: 'الأسبوع الثاني: إطلاق أول سلسلة محتوى منتظمة',
    title: 'فيديو 5: إطلاق السلسلة - الجزء 1 من «أدوات يومية توفر وقتك»',
    formatType: 'سلسلة محتوى',
    status: 'مخطط',
    proTip: 'ضع رقم الجزء في أول ثانية وفي زاوية الغلاف (Part 1).'
  },
  {
    day: 9,
    week: 2,
    weekTitle: 'الأسبوع الثاني: إطلاق أول سلسلة محتوى منتظمة',
    title: 'فيديو 6: السلسلة - الجزء 2 بأسلوب أسرع وتقليم صامت',
    formatType: 'سلسلة محتوى',
    status: 'مخطط',
    proTip: 'حذف أي فراغ صامت في الصوت لرفع إيقاع الفيديو.'
  },
  {
    day: 10,
    week: 2,
    weekTitle: 'الأسبوع الثاني: إطلاق أول سلسلة محتوى منتظمة',
    title: 'فيديو 7: السلسلة - الجزء 3 مع طرح سؤال تفاعلي في الـ CTA',
    formatType: 'سلسلة محتوى',
    status: 'مخطط',
    proTip: 'اطلب من المتابعين اقتراح أدوات للجزء القادم في التعليقات.'
  },
  {
    day: 11,
    week: 2,
    weekTitle: 'الأسبوع الثاني: إطلاق أول سلسلة محتوى منتظمة',
    title: 'فيديو 8: شرح مفهوم نفسي أو عادة سلوكية في 3 خطوات',
    formatType: 'تطوير ذات',
    status: 'مخطط',
    proTip: 'نصوص واضحة تظهر خطوة بخطوة على الشاشة مع مؤثر Pop خفيف.'
  },
  {
    day: 12,
    week: 2,
    weekTitle: 'الأسبوع الثاني: إطلاق أول سلسلة محتوى منتظمة',
    title: 'فيديو 9: تحذير من خطأ شائع يكلف الناس وقتاً أو مالاً',
    formatType: 'تحذير توعوي',
    status: 'مخطط',
    proTip: 'الخطاف: «توقف فوراً إذا كنت تفعل كذا...».'
  },
  {
    day: 13,
    week: 2,
    weekTitle: 'الأسبوع الثاني: إطلاق أول سلسلة محتوى منتظمة',
    title: 'فيديو 10: تلخيص كتاب في 40 ثانية مع 3 دروس تطبيقية',
    formatType: 'تلخيص كتاب',
    status: 'مخطط',
    proTip: 'استخدم موسيقى لوفي هادئة ولقطات تقليب صفحات دافئة.'
  },
  {
    day: 14,
    week: 2,
    weekTitle: 'الأسبوع الثاني: إطلاق أول سلسلة محتوى منتظمة',
    title: 'جلسة إنتاج بالدفعات (Batching) لكتابة سكريبتات الأسبوع 3',
    formatType: 'إنتاج بالدفعات',
    status: 'مخطط',
    proTip: 'اكتب 7 سكريبتات دفعة واحدة لتوفير 5 ساعات خلال الأسبوع.'
  },

  // Week 3: Iteration & Community Responses
  {
    day: 15,
    week: 3,
    weekTitle: 'الأسبوع الثالث: التفاعل مع المتابعين وتحليل البيانات',
    title: 'فيديو 11: الرد على سؤال أحد المتابعين بفيديو (Reply with Video)',
    formatType: 'رد على تعليق',
    status: 'مخطط',
    proTip: 'ضع ملصق التعليق في أعلى الفيديو لبناء مصداقية عالية.'
  },
  {
    day: 16,
    week: 3,
    weekTitle: 'الأسبوع الثالث: التفاعل مع المتابعين وتحليل البيانات',
    title: 'فيديو 12: إعادة صياغة أفضل فكرة حققت تفاعلاً بخطاف جديد',
    formatType: 'تطوير فكرة فائزة',
    status: 'مخطط',
    proTip: 'احتفظ بنفس الفكرة ولكن اختبر افتتاحية بصرية مختلفة تماماً.'
  },
  {
    day: 17,
    week: 3,
    weekTitle: 'الأسبوع الثالث: التفاعل مع المتابعين وتحليل البيانات',
    title: 'فيديو 13: السلسلة - الجزء 4 للإجابة عن تساؤلات سابقة',
    formatType: 'سلسلة محتوى',
    status: 'مخطط',
    proTip: 'ذكّر المشاهدين بمتابعة السلسلة في أول ثانيتين.'
  },
  {
    day: 18,
    week: 3,
    weekTitle: 'الأسبوع الثالث: التفاعل مع المتابعين وتحليل البيانات',
    title: 'فيديو 14: دليل سريع من 30 ثانية لكيفية تنظيم مساحة العمل',
    formatType: 'دليل تطبيقي',
    status: 'مخطط',
    proTip: 'لقطات مكاتب أنيقة مع نصوص كابشن صفراء واضحة.'
  },
  {
    day: 19,
    week: 3,
    weekTitle: 'الأسبوع الثالث: التفاعل مع المتابعين وتحليل البيانات',
    title: 'فيديو 15: قصة نجاح أو تجربة ملهمة لشخص حقق هدفه بالانضباط',
    formatType: 'قصة ملهمة',
    status: 'مخطط',
    proTip: 'ابنِ تصاعداً درامياً خفيفاً: البداية الصعبة -> نقطة التحول -> النتيجة.'
  },
  {
    day: 20,
    week: 3,
    weekTitle: 'الأسبوع الثالث: التفاعل مع المتابعين وتحليل البيانات',
    title: 'فيديو 16: حيلة لا يعرفها إلا 1% من مستخدمي هذا الموقع/التطبيق',
    formatType: 'حيلة تقنية',
    status: 'مخطط',
    proTip: 'ركز على عنصر الدهشة والوفرة في الجهد.'
  },
  {
    day: 21,
    week: 3,
    weekTitle: 'الأسبوع الثالث: التفاعل مع المتابعين وتحليل البيانات',
    title: 'تحليل Analytics وتحديد متوسط وقت المشاهدة ومعدل الإكمال',
    formatType: 'تحليل بيانات',
    status: 'مخطط',
    proTip: 'قارن الفيديوهات التي تجاوزت 25% إكمال بالفيديوهات التي هبطت.'
  },

  // Week 4: Monetization & Sustainable Pipeline
  {
    day: 22,
    week: 4,
    weekTitle: 'الأسبوع الرابع: التسييل بالعمولة والتوسع المستدام',
    title: 'فيديو 17: مراجعة صادقة لأداة مجربة مع توضيح الإيجابيات والسلبيات',
    formatType: 'مراجعة أفيلييت',
    status: 'مخطط',
    proTip: 'اذكر العيوب بصراحة؛ الصدق هو ما يبني ثقة الشراء الحقيقية.'
  },
  {
    day: 23,
    week: 4,
    weekTitle: 'الأسبوع الرابع: التسييل بالعمولة والتوسع المستدام',
    title: 'إعداد رابط البايو (Link in Bio) لترتيب الروابط المهمة ودليل مجاني',
    formatType: 'تجهيز البايو',
    status: 'مخطط',
    proTip: 'اجعل الرابط واضحاً ومباشراً مع تسميات تشرح القيمة.'
  },
  {
    day: 24,
    week: 4,
    weekTitle: 'الأسبوع الرابع: التسييل بالعمولة والتوسع المستدام',
    title: 'فيديو 18: استعراض كيف توفر الأداة الوقت وتوجيه المشاهد للرابط',
    formatType: 'فيديو ترويجي أخلاقي',
    status: 'مخطط',
    proTip: 'فعل خيار المحتوى التجاري (#ad) احتراماً للسياسات وحماية للحساب.'
  },
  {
    day: 25,
    week: 4,
    weekTitle: 'الأسبوع الرابع: التسييل بالعمولة والتوسع المستدام',
    title: 'فيديو 19: السلسلة - الجزء 5 بأسلوب متطور وبناء مجتمعي',
    formatType: 'سلسلة محتوى',
    status: 'مخطط',
    proTip: 'ثبت تعليقاً يطرح نقاشاً حول أفضل أداة في السلسلة حتى الآن.'
  },
  {
    day: 26,
    week: 4,
    weekTitle: 'الأسبوع الرابع: التسييل بالعمولة والتوسع المستدام',
    title: 'فيديو 20: إجابة تفصيلية عن 3 أسئلة تكررت من المتابعين',
    formatType: 'فقرة أسئلة وأجوبة',
    status: 'مخطط',
    proTip: 'تقسيم الفيديو إلى 3 أقسام سريعة (10 ثوانٍ لكل سؤال).'
  },
  {
    day: 27,
    week: 4,
    weekTitle: 'الأسبوع الرابع: التسييل بالعمولة والتوسع المستدام',
    title: 'فيديو 21: خلاصة شهر كامل من التجارب وأهم 3 دروس مستفادة',
    formatType: 'ملخص شهري',
    status: 'مخطط',
    proTip: 'مشاركة تجربة حقيقية تزيد قرب الجمهور منك وتبرز شغفك.'
  },
  {
    day: 28,
    week: 4,
    weekTitle: 'الأسبوع الرابع: التسييل بالعمولة والتوسع المستدام',
    title: 'فحص مؤشرات النقرات على رابط البايو ومراجعة معدل التحويل',
    formatType: 'تحليل أفيلييت',
    status: 'مخطط',
    proTip: 'قس عدد النقرات مقارنة بمشاهدات الفيديو الترويجي.'
  },
  {
    day: 29,
    week: 4,
    weekTitle: 'الأسبوع الرابع: التسييل بالعمولة والتوسع المستدام',
    title: 'تجهيز تقويم الشهر الثاني وتطوير سلاسل المحتوى الناجحة',
    formatType: 'تخطيط مستقبلي',
    status: 'مخطط',
    proTip: 'ركز على النمطين اللذين جلبا 70% من المتابعين الجدد.'
  },
  {
    day: 30,
    week: 4,
    weekTitle: 'الأسبوع الرابع: التسييل بالعمولة والتوسع المستدام',
    title: 'الاحتفال باكتمال خطة الـ 30 يوماً والانتقال للمرحلة الاحترافية',
    formatType: 'محطة إنجاز',
    status: 'مخطط',
    proTip: 'لقد بنيت أساساً متيناً لحساب مستدام؛ الاستمرار هو سر التفوق.'
  }
];

export const FacelessTiktokThirtyDayCalendar: React.FC = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>(DEFAULT_30_DAYS);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('faceless_tiktok_calendar_v1');
      if (stored) {
        setSchedule(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load calendar from localStorage', e);
    }
  }, []);

  const saveSchedule = (next: DaySchedule[]) => {
    setSchedule(next);
    localStorage.setItem('faceless_tiktok_calendar_v1', JSON.stringify(next));
  };

  const handleStatusChange = (dayNum: number, newStatus: ProductionStatus) => {
    const next = schedule.map((d) => (d.day === dayNum ? { ...d, status: newStatus } : d));
    saveSchedule(next);
  };

  const handleStartEdit = (day: DaySchedule) => {
    setEditingDay(day.day);
    setEditTitle(day.title);
  };

  const handleSaveEdit = (dayNum: number) => {
    const next = schedule.map((d) => (d.day === dayNum ? { ...d, title: editTitle } : d));
    saveSchedule(next);
    setEditingDay(null);
  };

  const handleResetToDefault = () => {
    saveSchedule(DEFAULT_30_DAYS);
  };

  const completedCount = useMemo(() => {
    return schedule.filter((d) => d.status === 'تم النشر').length;
  }, [schedule]);

  const readyCount = useMemo(() => {
    return schedule.filter((d) => d.status === 'جاهز').length;
  }, [schedule]);

  const progressPercent = useMemo(() => {
    return Math.round((completedCount / schedule.length) * 100);
  }, [completedCount, schedule.length]);

  const weekDays = useMemo(() => {
    return schedule.filter((d) => d.week === selectedWeek);
  }, [schedule, selectedWeek]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-400 mb-3">
              <Calendar className="h-3.5 w-3.5" />
              <span>تقويم محتوى 30 يوماً تفاعلي (30-Day Content Planner)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              خارطة طريق تطبيقية لإطلاق وتنمية حسابك يوماً بيوم
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              تتبع خطة نشرك الشهرية المقسمة على 4 أسابيع، وحدث حالة إنتاج كل فيديو (مخطط، قيد الكتابة، قيد المونتاج، جاهز، تم النشر) مع حفظ دائم في متصفحك.
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-zinc-800/80 border border-zinc-700/60 rounded-3xl p-4 text-center min-w-[170px] space-y-2">
            <div className="text-xs text-zinc-400 font-bold">إنجاز خطة الـ 30 يوماً</div>
            <div className="text-3xl font-black text-cyan-400">{progressPercent}%</div>
            <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden border border-zinc-700">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-zinc-400">
              {completedCount} منشور · {readyCount} جاهز للنشر
            </div>
          </div>
        </div>
      </div>

      {/* Week Selector Bar */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWeek(w)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedWeek === w
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              الأسبوع {w}
            </button>
          ))}
        </div>

        <button
          onClick={handleResetToDefault}
          className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>استعادة الخطة الافتراضية</span>
        </button>
      </div>

      {/* Days Cards for Selected Week */}
      <div className="space-y-4">
        {weekDays.map((day) => {
          const isEditing = editingDay === day.day;

          return (
            <div
              key={day.day}
              className={`p-5 rounded-3xl border transition-all space-y-3 ${
                day.status === 'تم النشر'
                  ? 'border-emerald-500/40 bg-emerald-950/15'
                  : day.status === 'جاهز'
                  ? 'border-cyan-500/40 bg-cyan-950/15'
                  : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 text-white font-black text-xs flex items-center justify-center shrink-0">
                    يوم {day.day}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700/60 ml-2">
                      {day.formatType}
                    </span>
                    <span className="text-[11px] text-zinc-400">{day.weekTitle}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-400 font-bold">الحالة:</span>
                  <select
                    value={day.status}
                    onChange={(e) => handleStatusChange(day.day, e.target.value as ProductionStatus)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors focus:outline-none ${
                      day.status === 'تم النشر'
                        ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                        : day.status === 'جاهز'
                        ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'
                        : day.status === 'قيد المونتاج' || day.status === 'قيد الكتابة'
                        ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                    }`}
                  >
                    <option value="مخطط">مخطط</option>
                    <option value="قيد الكتابة">قيد الكتابة</option>
                    <option value="قيد المونتاج">قيد المونتاج</option>
                    <option value="جاهز">جاهز للنشر</option>
                    <option value="تم النشر">تم النشر ✓</option>
                  </select>
                </div>
              </div>

              {/* Title & Edit */}
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => handleSaveEdit(day.day)}
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-colors"
                  >
                    حفظ
                  </button>
                  <button
                    onClick={() => setEditingDay(null)}
                    className="px-3 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold hover:bg-zinc-700 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                    {day.title}
                  </h3>
                  <button
                    onClick={() => handleStartEdit(day)}
                    className="p-1.5 rounded-lg bg-zinc-800/60 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                    title="تعديل عنوان الفيديو"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {/* Pro Tip Box */}
              <div className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 text-[11px] text-zinc-300 flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0">💡 توجيه تنفيذي:</span>
                <span className="leading-relaxed">{day.proTip}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
