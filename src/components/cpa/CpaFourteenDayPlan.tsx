import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  RotateCcw,
  Layers,
  Award,
  ArrowRight
} from 'lucide-react';

interface DayPlan {
  dayNumber: number;
  dayLabel: string;
  phase: string;
  title: string;
  description: string;
  tasks: string[];
  proTip: string;
}

const FOURTEEN_DAYS: DayPlan[] = [
  {
    dayNumber: 1,
    dayLabel: 'اليوم الأول',
    phase: 'المرحلة 1: التخصص والجمهور',
    title: 'تحديد النيش وحصر مشاكل الجمهور اليومية',
    description: 'اختر مجالاً واحداً يبحث فيه الناس عن حلول مجانية (مثل: أدوات تنظيم المواعيد، تطبيقات ميزانية، أو أدوات دراسية).',
    tasks: [
      'تحديد 3 مجالات محتملة تفهم احتياجات جمهورها جلياً.',
      'اختيار نيش واحد محدد والابتعاد عن العشوائية.',
      'كتابة قائمة بـ 5 مشاكل شائعة يعاني منها هذا الجمهور.'
    ],
    proTip: 'كلما كان النيش محدداً ومشاكله متكررة، سهل عليك إنتاج محتوى يقنع الزوار بالإجراء.'
  },
  {
    dayNumber: 2,
    dayLabel: 'اليوم الثاني',
    phase: 'المرحلة 1: التخصص والجمهور',
    title: 'رسم بروفايل العميل المستهدف (Target Persona)',
    description: 'حدد مواصفات الشخص الذي سيهتم بالعرض: دولته، جهازه، والدافع الذي يجعله يثبت التطبيق أو يسجل.',
    tasks: [
      'تحديد الدولة المستهدفة والجهاز المفضل (آيفون/أندرويد/حاسوب).',
      'تحديد زاوية الدخول (Angle): هل الحل يوفر له الوقت؟ أم ينظم له أعماله؟',
      'صياغة جملة القيمة في 20 كلمة.'
    ],
    proTip: 'الحديث إلى شخص واحد بمشكلة محددة يرفع نسبة التحويل لأضعاف الحديث العام المشتت.'
  },
  {
    dayNumber: 3,
    dayLabel: 'اليوم الثالث',
    phase: 'المرحلة 2: دراسة الشبكات',
    title: 'البحث عن شبكات CPA الموثوقة ومعرفة متطلباتها',
    description: 'استكشف الشبكات المتاحة مجاناً واقرأ متطلبات التسجيل وطرق الدفع والحد الأدنى للسحب.',
    tasks: [
      'حصر 2 إلى 3 شبكات CPA معروفة بنزاهة الدفع وموثوقيتها.',
      'تجهيز وصف واضح لخطة الزيارات لتقديمه في استمارة التسجيل.',
      'التحقق من توفر وسيلة سحب أرباح مدعومة في بلدك (مثل Payoneer).'
    ],
    proTip: 'كن صادقاً في طلب الانضمام واشرح أنك تعتمد على محتوى تعليمي وبناء جمهور عضوي.'
  },
  {
    dayNumber: 4,
    dayLabel: 'اليوم الرابع',
    phase: 'المرحلة 2: دراسة الشبكات',
    title: 'استكشاف العروض وفهم شروط وقواعد التحويل',
    description: 'تصفح العروض المتوفرة في نيشك وقارن بين عروض CPL وCPI وافهم شروط القبول والتأهيل.',
    tasks: [
      'فحص 5 عروض في تخصصك ومقارنة عمولاتها ومسار تحويلها.',
      'قراءة شروط الدول المسموحة والزيارات الممنوعة لكل عرض.',
      'استبعاد أي عرض يحتوي على شروط غامضة أو نسبة إلغاء مجهولة.'
    ],
    proTip: 'اختر في البداية عروضاً بسيطة مثل تثبيت تطبيق مجاني أو إدخال بريد SOI لسهولة التحويل.'
  },
  {
    dayNumber: 5,
    dayLabel: 'اليوم الخامس',
    phase: 'المرحلة 3: اختيار العرض المعتمد',
    title: 'اعتماد العرض الأساسي وفحص صفحة هبوط المعلن',
    description: 'اختر العرض الذي ستطلق عليه حملتك الأولى وافحص تجربة المستخدم من الهاتف.',
    tasks: [
      'اعتماد عرض واحد رئيسي يلبي جميع معايير الأمان.',
      'فتح رابط العرض من هاتفك كأنك زائر والتأكد من سرعته وسلاسته.',
      'حفظ لقطة شاشة لشروط العرض وعمولته في مجلد خاص.'
    ],
    proTip: 'إذا استغرقت صفحة المعلن أكثر من 4 ثوانٍ للتحميل على هاتفك، ابحث عن عرض بديل.'
  },
  {
    dayNumber: 6,
    dayLabel: 'اليوم السادس',
    phase: 'المرحلة 4: صناعة المحتوى',
    title: 'كتابة مراجعة صادقة وهادفة للأداة/العرض',
    description: 'اكتب مقالاً أو منشوراً يركز على الفائدة الحقيقية، والخطوات الصادقة دون مبالغات وهمية.',
    tasks: [
      'كتابة عنوان جذاب يركز على حل المشكلة المحددة.',
      'شرح 3 مميزات رئيسية للأداة مع ذكر عيب صغير للمصداقية.',
      'صياغة دعوة واضحة لاتخاذ الإجراء (CTA) تبين الخطوة القادمة بدقة.'
    ],
    proTip: 'الصدق في توضيح شروط العرض يضمن أن الزائر الذي يضغط على الرابط سيكمل الإجراء فعلاً.'
  },
  {
    dayNumber: 7,
    dayLabel: 'اليوم السابع',
    phase: 'المرحلة 4: صناعة المحتوى',
    title: 'تجهيز أصول مرئية ومقاطع شروحات للشاشة',
    description: 'التقط صوراً أو سجّل مقطع شاشة قصيراً يوضح كيف تحل الأداة المشكلة في أقل من دقيقة.',
    tasks: [
      'التقاط 3 صور شاشة واضحة تشرح واجهة الأداة أو التطبيق.',
      'كتابة نصوص توضيحية على الصور للتركيز على الفائدة.',
      'تجهيز سيناريو فيديو قصير لمنصات تيك توك / شورتس.'
    ],
    proTip: 'الصور ومقاطع الشاشة الحقيقية ترفع معدل النقر والتحويل بنسبة تزيد عن 50% مقارنة بالنصوص الجافة.'
  },
  {
    dayNumber: 8,
    dayLabel: 'اليوم الثامن',
    phase: 'المرحلة 5: صفحة الهبوط والتتبع',
    title: 'بناء صفحة هبوط وسيطة خفيفة للجوال (Pre-lander)',
    description: 'استخدم أداة مخطط صفحات الهبوط لإنشاء صفحة سريعة تسخن الزائر وتوضح له الخطوة التالية.',
    tasks: [
      'وضع العنوان الرئيسي والفائدة في الثلث العلوي من الصفحة.',
      'وضع زر الإجراء (CTA) بلون واضح ونص مشجع.',
      'إدراج تنويه الروابط التابعة وسياسة الخصوصية في أسفل الصفحة.'
    ],
    proTip: 'تجنب أي قوائم جانبية أو إعلانات مشتتة قد تبعد الزائر عن زر التحويل الأساسي.'
  },
  {
    dayNumber: 9,
    dayLabel: 'اليوم التاسع',
    phase: 'المرحلة 5: صفحة الهبوط والتتبع',
    title: 'فحص سرعة الصفحة وتجربة التصفح على الجوال',
    description: 'تأكد من أن صفحتك تفتح في أقل من ثانيتين على شبكات المحمول الضعيفة.',
    tasks: [
      'ضغط جميع الصور لتكون بأحجام أقل من 80 كيلوبايت.',
      'اختبار الصفحة على أكثر من متصفح وجهاز هاتف مختلف.',
      'التأكد من أن الأزرار سهلة النقر بالإبهام دون صعوبة.'
    ],
    proTip: 'كل ثانية تأخير في تحميل صفحة الهاتف تكلفك فقدان 10% إلى 20% من التحويلات.'
  },
  {
    dayNumber: 10,
    dayLabel: 'اليوم العاشر',
    phase: 'المرحلة 5: صفحة الهبوط والتتبع',
    title: 'توليد روابط التتبع بالـ SubIDs واختبار المسار كاملاً',
    description: 'أنشئ رابط العرض النهائي مع معرّف المصدر، واضغط عليه للتأكد من تسجيل النقرة في لوحة التحكم.',
    tasks: [
      'توليد رابط التتبع من شبكة CPA مع إضافة معرّف المصدر (مثل subid1=blog1).',
      'ربط الزر في صفحة الهبوط برابط التتبع الجديد.',
      'إجراء نقرة تجريبية من جهازك والتأكد من ظهورها في تقرير النقرات بالشبكة.'
    ],
    proTip: 'لا تقم بالتسجيل في العرض بنفسك؛ فقط تأكد من أن الرابط يفتح صفحة المعلن الصحيحة وتظهر النقرة.'
  },
  {
    dayNumber: 11,
    dayLabel: 'اليوم الحادي عشر',
    phase: 'المرحلة 6: الإطلاق والترويج العضوي',
    title: 'نشر المحتوى عبر القنوات العضوية الأولى (SEO / Social)',
    description: 'انشر المقال أو الفيديو التوضيحي وابدأ بتوجيه الزوار لصفحة الهبوط الوسيطة.',
    tasks: [
      'نشر المراجعة على موقعك أو مدونتك مع تهيئة الكلمات المفتاحية.',
      'نشر الفيديو القصير في تيك توك / شورتس مع توجيه الزوار للرابط في البايو.',
      'مشاركة الدليل في مجتمع أو مجموعة مهتمة بأسلوب توعوي غير مزعج.'
    ],
    proTip: 'ركز على مساعدة الناس والإجابة عن أسئلتهم؛ لا تضع الرابط بشكل جاف بدون تقديم قيمة حقيقية.'
  },
  {
    dayNumber: 12,
    dayLabel: 'اليوم الثاني عشر',
    phase: 'المرحلة 6: الإطلاق والترويج العضوي',
    title: 'توسيع التوزيع والمشاركة التفاعلية مع الاستفسارات',
    description: 'تفاعل مع تعليقات المشاهدين والقراء، وأجب عن استفساراتهم حول كيفية استخدام الأداة.',
    tasks: [
      'الرد على جميع التعليقات على مقاطع الفيديو أو المنشورات بمهنية.',
      'كتابة إجابات مفصلة في منصات مثل Quora للمشاكل التي تحلها الأداة.',
      'مراقبة أي مصدر زيارات يبدي اهتماماً أعلى.'
    ],
    proTip: 'الردود السريعة والمفيدة في التعليقات ترفع موثوقية الرابط وتضاعف نسبة النقر.'
  },
  {
    dayNumber: 13,
    dayLabel: 'اليوم الثالث عشر',
    phase: 'المرحلة 7: القياس والتحليل',
    title: 'تحليل أرقام الحملة في جدول التتبع ومراقبة القبول',
    description: 'افتح أداة تتبع التحويلات وسجل عدد النقرات والتحويلات المسجلة ونسبة القبول.',
    tasks: [
      'تسجيل إجمالي النقرات والمسجلين في جدول التتبع.',
      'فحص نسبة قبول التحويلات والتأكد من عدم وجود أسباب رفض شائعة.',
      'حساب متوسط الـ EPC الحقيقي الذي حققته الحملة حتى الآن.'
    ],
    proTip: 'إذا كان الـ EPC أعلى من 0.20$ في الزيارات العضوية، فأنت تملك حملة رابحة ذات أساس متين.'
  },
  {
    dayNumber: 14,
    dayLabel: 'اليوم الرابع عشر',
    phase: 'المرحلة 7: القياس والتحليل',
    title: 'تقييم التجربة وتحديد خطة التكرار والتوسع',
    description: 'راجع ما نجح وما لم ينجح، وحدد هل ستوسع نفس العرض بكلمات مفتاحية جديدة أم تختبر عرضاً ثانياً.',
    tasks: [
      'تحديد أفضل قناة جلبت التحويلات المقبولة.',
      'تطبيق تحسين بسيط (مثل تغيير صياغة العنوان أو زر الـ CTA).',
      'وضع خطة للأسبوعين القادمين لمضاعفة إنتاج المحتوى الناجح.'
    ],
    proTip: 'النجاح في CPA رحلة تراكمية؛ الخطة الأولى تمنحك الخبرة العملية التي تبني عليها كل حملاتك القادمة.'
  }
];

const PLAN_STORAGE_KEY = 'rikouzone_cpa_14day_plan';

export const CpaFourteenDayPlan: React.FC = () => {
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(PLAN_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(completedDays));
    } catch (e) {
      console.error(e);
    }
  }, [completedDays]);

  const toggleDay = (dayNum: number) => {
    setCompletedDays(prev => 
      prev.includes(dayNum) ? prev.filter(d => d !== dayNum) : [...prev, dayNum]
    );
  };

  const handleReset = () => {
    setCompletedDays([]);
  };

  const progress = Math.round((completedDays.length / FOURTEEN_DAYS.length) * 100);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-zinc-900 to-emerald-950/30 border border-zinc-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              <Calendar className="h-3.5 w-3.5" />
              <span>14-Day Practical Action Roadmap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              خطة تطبيق عملية لمدة 14 يوماً (من الصفر إلى الإطلاق)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              خارطة طريق تنفيذية يومية واضحة ومناسبة للمبتدئين لبناء أول قمع CPA عضوي ونظيف دون أي وعود وهمية أو تكاليف إعلانية محفوفة بالمخاطر.
            </p>
          </div>

          <div className="w-full sm:w-64 bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4.5 space-y-3 shrink-0">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-zinc-400">إنجاز الخطة:</span>
              <span className="text-cyan-400 font-mono font-bold">
                {completedDays.length} / 14 يوماً ({progress}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-[10px] text-zinc-500 flex items-center justify-between">
              <span>خطوة بخطوة</span>
              <span className="text-emerald-400 font-mono font-bold">خطة مرنة مستدامة</span>
            </div>
          </div>
        </div>
      </div>

      {/* 14 Days List */}
      <div className="space-y-4">
        {FOURTEEN_DAYS.map((day) => {
          const isDone = completedDays.includes(day.dayNumber);

          return (
            <div
              key={day.dayNumber}
              className={`p-5 rounded-2xl border transition-all text-right space-y-3 ${
                isDone
                  ? 'bg-zinc-900/40 border-emerald-500/40'
                  : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono">
                    {day.dayLabel}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-medium">
                    {day.phase}
                  </span>
                </div>

                <button
                  onClick={() => toggleDay(day.dayNumber)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isDone
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{isDone ? 'تم إنجاز اليوم!' : 'تحديد كمنجز'}</span>
                </button>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">
                  {day.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {day.description}
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-zinc-300 block">مهام اليوم:</span>
                <div className="space-y-1 text-xs text-zinc-400">
                  {day.tasks.map((task, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-[11px] text-cyan-300/90 flex items-start gap-2">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-cyan-400 mt-0.5" />
                <span><strong>نصيحة اليوم:</strong> {day.proTip}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Reset */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>إعادة ضبط تقدم الخطة</span>
        </button>

        <span className="text-xs text-zinc-500 font-mono">
          تقدمك محفوظ تلقائياً في المتصفح
        </span>
      </div>
    </div>
  );
};
