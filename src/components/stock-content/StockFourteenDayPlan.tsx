import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Clock, Sparkles, AlertCircle, RefreshCw, Layers } from 'lucide-react';

interface DayPlan {
  day: number;
  phase: string;
  title: string;
  description: string;
  tasks: string[];
  deliverable: string;
}

const FOURTEEN_DAYS: DayPlan[] = [
  {
    day: 1,
    phase: 'المرحلة 1: التأسيس والنيتش',
    title: 'دراسة السوق واختيار النيتش التجاري',
    description: 'تحديد فجوة المحتوى ذات الطلب العالي والمنافسة المحدودة (التركيز على المحتوى العربي/المحلي أو بيئات الأعمال).',
    tasks: [
      'تصفح مكتبات Adobe Stock وShutterstock والبحث عن 3 فجوات محتوى محلية.',
      'اختيار نيتش واحد محدد (مثل: ريادة الأعمال الحديثة، الحرف التراثية، أو الأطعمة التقليدية).',
      'تحديد نوع الوسيط الأساسي (فيديو 4K B-roll أو صور أو مؤثرات صوتية).'
    ],
    deliverable: 'وثيقة ملخص النيتش وقائمة بـ 3 مفاهيم بصرية مطلوبة تجارياً.'
  },
  {
    day: 2,
    phase: 'المرحلة 1: التأسيس والنيتش',
    title: 'تجهيز المعدات ومعايرة إعدادات الـ 4K',
    description: 'معايرة الكاميرا أو الهاتف لإنتاج لقطات نظيفة خالية من الاهتزاز والتشويش.',
    tasks: [
      'تنظيف عدسات الكاميرا/الهاتف وتجهيز حامل ثلاثي (Tripod) أو مانع اهتزاز (Gimbal).',
      'ضبط إعدادات الفيديو على 4K UHD بمعدل 24 أو 30 إطاراً في الثانية (ثابت الإطارات).',
      'تثبيت تطبيق كاميرا احترافي على الهاتف يتيح قفل التعريض والفوكس اليدوي (Manual AE/AF).'
    ],
    deliverable: 'معدات جاهزة واختبار تصوير تجريبي 4K لمدة 10 ثوانٍ للتأكد من الثبات التام.'
  },
  {
    day: 3,
    phase: 'المرحلة 2: التخطيط الفني والقانوني',
    title: 'كتابة قائمة اللقطات (Shot List) والقصة البصرية',
    description: 'تخطيط تفصيلي لكل زاوية ومشهد قبل الوصول إلى موقع التصوير.',
    tasks: [
      'كتابة قائمة بـ 15 مشهداً مطلوباً مع تحديد الزوايا (واسعة، متوسطة، ومقربة).',
      'تحديد المساحة السلبية (Copy Space) لكل لقطة لخدمة مصممي الإعلانات.',
      'تحديد الإضاءة المناسبة (ضوء نافذة طبيعي، أو ساعات الصباح الذهبية).'
    ],
    deliverable: 'جدول Shot List مطبوع أو على الهاتف يحدد تفاصيل 15 لقطة مستهدفة.'
  },
  {
    day: 4,
    phase: 'المرحلة 2: التخطيط الفني والقانوني',
    title: 'تجهيز التراخيص والعارضين (Releases Setup)',
    description: 'ضمان التوافق القانوني الكامل لمنع رفض أي ملف تجاري لاحقاً.',
    tasks: [
      'الاتفاق مع عارض (صديق أو زميل) يشبه الفئة المستهدفة في النيتش.',
      'تثبيت تطبيق Easy Release على الهاتف وتجهيز نموذج الـ Model Release المعتمد.',
      'فحص الملابس والإكسسوارات للتأكد من خلوها من أي شعارات أو ماركات واضحة.'
    ],
    deliverable: 'نموذج موافقة جاهز للتوقيع الرقمي وملابس محايدة بدون علامات تجارية.'
  },
  {
    day: 5,
    phase: 'المرحلة 3: الإنتاج والتصوير',
    title: 'تنفيذ جلسة التصوير / التسجيل الأولى',
    description: 'جلسة إنتاج مركزة لمدة ساعتين لتصوير المشاهد المخطط لها وفق المعايير الصارمة.',
    tasks: [
      'التصوير بثبات تام واستخدام حركات الكاميرا الخمس (Static, Pan, Tilt, Dolly, Orbit).',
      'التقاط تغطية ثلاثية متكاملة لكل نشاط (Wide ثم Medium ثم Close-up).',
      'إنتاج ما بين 30 إلى 50 لقطة/مقطع قصير (مدة المقطع 8-20 ثانية).'
    ],
    deliverable: 'حزمة مواد خام (RAW) من 30-50 لقطة تتطابق مع قائمة الـ Shot List.'
  },
  {
    day: 6,
    phase: 'المرحلة 3: الإنتاج والتصوير',
    title: 'توقيع التراخيص وفحص النسخ الاحتياطي',
    description: 'تأمين الملفات قانونياً وتقنياً في نفس يوم التصوير.',
    tasks: [
      'توقيع نموذج الـ Model Release رقمياً من العارض والمصور وتصدير ملف الـ PDF.',
      'نقل الملفات من بطاقة الذاكرة إلى الحاسوب وإنشاء نسخة احتياطية على قرص خارجي.',
      'تنظيم الملفات في مجلدات معيارية (RAW / Releases / Selects).'
    ],
    deliverable: 'ملفات مؤمنة في نسختين مع تصريح موافقة موقع ومؤرخ قانونياً.'
  },
  {
    day: 7,
    phase: 'المرحلة 4: الفرز والمونتاج',
    title: 'الفرز الصارم واختيار أفضل 20 أصلاً',
    description: 'استبعاد أي لقطة غير حادة أو مهتزة للحفاظ على سمعة الحساب.',
    tasks: [
      'فحص كل لقطة بتكبير 100% واستبعاد أي لقطة بها خطأ فوكس أو نويز زائد.',
      'استبعاد اللقطات المتشابهة والمكررة والإبقاء على لقطة واحدة استثنائية من كل حركة.',
      'تحديد أفضل 20 ملفاً (بين فيديو وصور) للدخول في مرحلة المعالجة النهائية.'
    ],
    deliverable: 'مجموعة نقية من أفضل 20 أصلاً رقمياً تلبي شروط القبول.'
  },
  {
    day: 8,
    phase: 'المرحلة 4: الفرز والمونتاج',
    title: 'المعالجة اللونية والصوتية الطبيعية (Natural Grading)',
    description: 'تجهيز ملفات نظيفة بدون فلاتر مشوهة تمنح المشتري حرية التلوين.',
    tasks: [
      'ضبط توازن البياض والتعريض المعتدل في Lightroom أو DaVinci Resolve.',
      'تطبيق تقليل نويز معتدل في مناطق الظلال دون التأثير على حدة التفاصيل.',
      'قص مقاطع الفيديو إلى أفضل 8-15 ثانية وتصديرها بصيغة 4K UHD بمعدل بت عالي.'
    ],
    deliverable: 'تصدير 20 ملفاً بجودة Master نهائية جاهزة للرفع التجاري.'
  },
  {
    day: 9,
    phase: 'المرحلة 5: التدقيق القانوني والسيو',
    title: 'المسح الشامل للشعارات وتطبيق قائمة الجودة (QA)',
    description: 'إزالة أي لوجو خفي وتمرير الملفات عبر قائمة فحص الجودة المدمجة.',
    tasks: [
      'مسح أي شعار صغير على الحواسيب أو الأحذية بالأداة الذكية (Healing Tool / Generative Fill).',
      'تطبيق قائمة فحص الجودة الشاملة (StockQualityChecklist) على الملفات العشرين.',
      'التأكد من مطابقة اسم العارض في نموذج الـ Release مع المشاهد المصورة.'
    ],
    deliverable: '20 ملفاً خالياً بنسبة 100% من أي مخالفات للملكية الفكرية أو العلامات التجارية.'
  },
  {
    day: 10,
    phase: 'المرحلة 5: التدقيق القانوني والسيو',
    title: 'كتابة العناوين الإنجليزية وهندسة الكلمات المفتاحية',
    description: 'تطبيق نظام السيو المتقدم لضمان ظهور الملفات في صدارة محركات بحث الستوك.',
    tasks: [
      'استخدام أداة StockMetadataGenerator لتوليد عنوان وصفي دقيق لكل ملف.',
      'تجهيز 30 إلى 35 كلمة مفتاحية مستهدفة لكل ملف باللغة الإنجليزية.',
      'ترتيب الكلمات السبع الأولى (Top 7) لتمثيل جوهر المشهد التجاري بدقة.'
    ],
    deliverable: 'جدول بيانات وصفية متكامل (Titles & Keywords) جاهز للصق المباشر.'
  },
  {
    day: 11,
    phase: 'المرحلة 6: التجهيز التقني والنشر',
    title: 'تضمين البيانات في الـ IPTC وتجهيز بروتوكول FTP',
    description: 'أتمتة الرفع لتوفير وقت الإدخال اليدوي على المنصات.',
    tasks: [
      'تضمين العناوين والكلمات المفتاحية داخل ملفات JPEG والفيديو عبر Lightroom أو Bridge.',
      'تثبيت برنامج FileZilla وضبط بيانات خوادم الـ FTP لـ Adobe Stock وShutterstock وPond5.',
      'إجراء اختبار رفع تجريبي لملف واحد للتأكد من قراءة المنصة للبيانات الوصفية تلقائياً.'
    ],
    deliverable: 'ملفات مدمجة البيانات الوصفية وبرنامج FTP متصل بحسابات المنصات.'
  },
  {
    day: 12,
    phase: 'المرحلة 6: التجهيز التقني والنشر',
    title: 'فتح الحسابات وإكمال استمارة الضرائب W-8BEN',
    description: 'تأمين المسار المالي وحماية 30% من الأرباح من الاقتطاع الضريبي.',
    tasks: [
      'تأكيد تفعيل حسابات المساهمين في Adobe Stock وShutterstock وPond5.',
      'تعبئة استمارة W-8BEN الإلكترونية داخل لوحات تحكم المنصات.',
      'ربط وسيلة الدفع لاستلام الأرباح شهرياً (Payoneer أو PayPal).'
    ],
    deliverable: 'حسابات مساهم موثقة ومطابقة ضريبياً وجاهزة لاستقبال الأرباح.'
  },
  {
    day: 13,
    phase: 'المرحلة 7: الرفع الأول والمتابعة',
    title: 'رفع الدفعة الأولى ومتابعة حالة المراجعة',
    description: 'إطلاق أول 20 أصلاً رقمياً في الأسواق العالمية ومراقبة نتائج الفحص.',
    tasks: [
      'رفع الملفات العشرين مع إرفاق ملف الـ Model Release المعتمد.',
      'مراجعة العناوين والكلمات في شاشة الإرسال والضغط على Submit All.',
      'تسجيل الملفات في أداة StockSubmissionsTracker لمراقبة أداء المحفظة.'
    ],
    deliverable: '20 أصلاً رقمياً معتمداً قيد المراجعة الرسمية على المنصات العالمية.'
  },
  {
    day: 14,
    phase: 'المرحلة 7: الرفع الأول والمتابعة',
    title: 'تحليل نتائج المراجعة وتثبيت روتين الإنتاج الأسبوعي',
    description: 'الانتقال من التجربة الأولى إلى خط إنتاج مستدام يهدف لبناء 1000 أصل.',
    tasks: [
      'فحص أولى قرارات القبول والرفض ومعالجة أي ملاحظات فنية قدمها المراجعون.',
      'تحديد موعد أسبوعي ثابت للتصوير والإنتاج (جلسة تصوير أسبوعية لإنتاج 25 ملفاً).',
      'حساب هدف الـ 6 أشهر والـ 12 شهراً عبر حاسبة العوائد لمتابعة مسار النمو المالي.'
    ],
    deliverable: 'خطة تشغيل أسبوعية مستمرة لبناء محفظة أصول رقمية تدر دخلاً سلبياً متصاعداً.'
  }
];

const STORAGE_KEY = 'rikouzone_stock_fourteenday_plan';

export const StockFourteenDayPlan: React.FC = () => {
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [1];
    } catch {
      return [1];
    }
  });

  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedDays));
    } catch (e) {
      console.error(e);
    }
  }, [completedDays]);

  const toggleDayCompletion = (dayNum: number) => {
    setCompletedDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const handleReset = () => {
    if (window.confirm('هل تريد إعادة تعيين خطة الـ 14 يوماً من البداية؟')) {
      setCompletedDays([]);
    }
  };

  const activeDay = FOURTEEN_DAYS.find((d) => d.day === activeDayNumber) || FOURTEEN_DAYS[0];
  const progressPercent = Math.round((completedDays.length / FOURTEEN_DAYS.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">خطة العمل التطبيقية لمدة 14 يوماً (14-Day Action Plan)</h2>
              <p className="text-xs text-zinc-400">
                جدول تنفيذي يومي للانتقال من الصفر إلى رفع أول حزمة معتمدة من 20 أصلاً رقمياً وبدء جني العوائد
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>إعادة تعيين الخطة</span>
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="mt-6 pt-5 border-t border-zinc-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-zinc-300">
              إنجاز خطة الانطلاق: {completedDays.length} من أصل 14 يوماً
            </span>
            <span className="font-black text-amber-400">{progressPercent}%</span>
          </div>
          <div className="h-2.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Days Horizontal Timeline / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-7 lg:grid-cols-14 gap-2">
        {FOURTEEN_DAYS.map((d) => {
          const isCompleted = completedDays.includes(d.day);
          const isSelected = activeDayNumber === d.day;
          return (
            <button
              key={d.day}
              onClick={() => setActiveDayNumber(d.day)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/15 text-white ring-1 ring-amber-500'
                  : isCompleted
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <span className="text-[10px] font-bold">اليوم</span>
              <span className="text-base font-black my-0.5">{d.day}</span>
              {isCompleted ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Clock className="h-3.5 w-3.5 text-zinc-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Day Detail Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
              <span>{activeDay.phase}</span>
              <span>·</span>
              <span>اليوم {activeDay.day} من 14</span>
            </div>
            <h3 className="text-2xl font-black text-white">{activeDay.title}</h3>
            <p className="text-xs text-zinc-400 mt-1">{activeDay.description}</p>
          </div>

          <button
            onClick={() => toggleDayCompletion(activeDay.day)}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black transition-all cursor-pointer ${
              completedDays.includes(activeDay.day)
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/10'
                : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{completedDays.includes(activeDay.day) ? 'اليوم مكتمل بنجاح!' : 'تحديد هذا اليوم كمكتمل'}</span>
          </button>
        </div>

        {/* Tasks List */}
        <div>
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
            المهام التنفيذية لليوم {activeDay.day}:
          </h4>
          <div className="space-y-2.5">
            {activeDay.tasks.map((task, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs text-zinc-200 leading-relaxed">{task}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverable Box */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-emerald-400 block mb-0.5">المخرج العملي المطلوب (Deliverable):</span>
            <p className="text-xs text-zinc-300 leading-relaxed font-semibold">
              {activeDay.deliverable}
            </p>
          </div>
        </div>

        {/* Day Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <button
            disabled={activeDayNumber === 1}
            onClick={() => setActiveDayNumber((prev) => Math.max(1, prev - 1))}
            className="text-xs font-bold text-zinc-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            ← اليوم السابق
          </button>
          <span className="text-xs text-zinc-500">
            اليوم {activeDayNumber} من 14
          </span>
          <button
            disabled={activeDayNumber === 14}
            onClick={() => setActiveDayNumber((prev) => Math.min(14, prev + 1))}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            اليوم التالي →
          </button>
        </div>
      </div>
    </div>
  );
};
