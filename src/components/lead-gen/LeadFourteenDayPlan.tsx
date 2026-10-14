import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Clock, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface DayPlan {
  day: number;
  phase: string;
  title: string;
  description: string;
  tasks: string[];
  deliverable: string;
  proTip: string;
}

const FOURTEEN_DAYS_PLAN: DayPlan[] = [
  {
    day: 1,
    phase: 'المرحلة 1: التأسيس واختيار القطاع',
    title: 'اختيار القطاع المحلي والمنطقة الجغرافية',
    description: 'تحليل الخدمات المحلية ذات قيمة الصفقات المرتفعة (عزل أسطح، تكييف، عيادات، مقاولات) في مدينتك.',
    tasks: [
      'البحث في خرائط جوجل عن 4 قطاعات نشطة تحتوي على إعلانات ممولة.',
      'حساب متوسط قيمة الخدمة للتأكد من أنها تزيد عن 300$.',
      'حصر نطاق أحياء محددة تتميز بكثافة الفلل والمساكن المستقلة.'
    ],
    deliverable: 'اختيار قطاع واحد فقط (مثال: عزل الأسطح وكشف التسربات في شمال الرياض).',
    proTip: 'التركيز على قطاع واحد في البداية هو أقصر طريق لإتقان مصطلحاته وكسب ثقة المقاولين.'
  },
  {
    day: 2,
    phase: 'المرحلة 1: التأسيس واختيار القطاع',
    title: 'تحديد مواصفات العميل المثالي (ICP) والشركة المستفيدة',
    description: 'رسم الملامح الدقيقة للشخص الذي يملك الرغبة والقدرة المالية على شراء الخدمة فوراً.',
    tasks: [
      'تحديد الصفة: مالك عقار، رب أسرة، يبحث عن حل جذري بضمان رسمي.',
      'تحديد المشاكل الأكثر إلحاحاً التي تستدعي طلباً فورياً للمعاينة.',
      'تحديد مواصفات الشركة الشريكة (تملك 3 إلى 10 فنيين ومسؤول رد سريع).'
    ],
    deliverable: 'بطاقة العميل المثالي محددة المعالم مع 3 أسئلة فلترة جوهرية.',
    proTip: 'العميل الذي يطلب "ضماناً معتمداً" هو العميل الأفضل لمقاولك والأسهل في إتمام الصفقات.'
  },
  {
    day: 3,
    phase: 'المرحلة 1: التأسيس واختيار القطاع',
    title: 'البحث عن الشركات المحتملة وحصر أول 10 أرقام اتصال',
    description: 'تجميع قائمة بأبرز الشركات المحلية المرشحة لتكون شركاء شراء الفرص البيعية.',
    tasks: [
      'حصر 10 إلى 15 شركة محلية بتقييم أعلى من 4 نجوم على خرائط جوجل.',
      'استخراج أرقام الهواتف وحسابات الواتساب الخاصة بمديري المبيعات أو الملاك.',
      'تسجيل بيانات الشركات في جدول لتسجيل ملاحظات الاتصال والمتابعة.'
    ],
    deliverable: 'جدول يحتوي على 10 شركات مستهدفة برواتب الفنيين وأرقام التواصل المباشرة.',
    proTip: 'الشركات ذات المراجعات الممتازة ستحول فرصك لصفقات رابحة ولن تشتكي من سوء المتابعة.'
  },
  {
    day: 4,
    phase: 'المرحلة 1: التأسيس واختيار القطاع',
    title: 'التحدث مع الشركات والتحقق من الطلب واقتراح التجربة',
    description: 'إجراء المكالمات الاستكشافية لعرض توريد عملاء جاهزين واقتراح الـ 3 فرص المجانية.',
    tasks: [
      'الاتصال بمدير كل شركة واستخدام سيناريو المكالمة الاستكشافية.',
      'السؤال عن الطاقة الاستيعابية والأحياء المفضلة لخدمتهم.',
      'اقتراح تجربة مجانية من 3 فرص مؤهلة دون أي مخاطرة مالية عليهم.'
    ],
    deliverable: 'موافقة شفهية أو كتابية من شركة واحدة على الأقل على استقبال التجربة المجانية.',
    proTip: 'العرض التجريبي المجاني المحدود يزيل التردد ويجعلك تبدو واثقاً تماماً من جودة عملك.'
  },
  {
    day: 5,
    phase: 'المرحلة 2: تجهيز المنظومة والعرض',
    title: 'تحديد معايير الفرصة المؤهلة وآلية القبول والرفض',
    description: 'الاتفاق على الورق مع الشريك على ما يعتبر فرصة مقبولة وما يعتبر سبباً مبرراً للاستبدال.',
    tasks: [
      'صياغة شروط الفرصة المؤهلة (رقم صحيح + مالك + داخل النطاق + طلب معاينة).',
      'تحديد مهلة الاعتراض بـ 72 ساعة كحد أقصى.',
      'الاتفاق على سرعة الاتصال بالعميل خلال أقل من ساعتين من الاستلام.'
    ],
    deliverable: 'وثيقة شروط الفرصة المؤهلة متفق عليها ومؤكدة عبر واتساب أو البريد.',
    proTip: 'الوضوح المسبق يمنع 99% من النزاعات الحسابية في نهاية الأسبوع.'
  },
  {
    day: 6,
    phase: 'المرحلة 2: تجهيز المنظومة والعرض',
    title: 'إعداد العرض التجاري والتسعير لكل فرصة',
    description: 'تحديد السعر النهائي لكل فرصة مقبولة وحساب نقطة التعادل وهوامش الربح الصافية.',
    tasks: [
      'حساب هامش ربح لا يقل عن 50% فوق تكلفة الإعلانات المتوقعة.',
      'تحديد نموذج الفوترة الأسبوعي (يوم الخميس).',
      'صياغة العرض في صفحة واحدة رسمية بصيغة PDF.'
    ],
    deliverable: 'ملف العرض التجاري النهائي متضمناً السعر وشروط الدفع.',
    proTip: 'إذا كان ربح المقاول من العقد 1,000$، فإن سعر 45$ للفرصة يمثل فقط 4.5% وسيقبل به فوراً.'
  },
  {
    day: 7,
    phase: 'المرحلة 2: تجهيز المنظومة والعرض',
    title: 'تجهيز صفحة الهبوط أو نموذج الاستفسار السريع',
    description: 'بناء صفحة هبوط بسيطة وسريعة جداً على الهاتف أو إعداد استمارة Meta Lead Form.',
    tasks: [
      'كتابة عنوان واضح يتضمن الخدمة والمدينة والضمان المعياري.',
      'إضافة نموذج استفسار بـ 4 حقول فقط تطلب البيانات الجوهرية.',
      'وضع زر اتصال مباشر وتجربة الصفحة على هاتف حقيقي.'
    ],
    deliverable: 'رابط صفحة هبوط فعالة أو استمارة إعلانات جاهزة للاستقبال.',
    proTip: 'كل حقل غير ضروري تحذفه من النموذج يرفع معدل تحويل الصفحة بنسبة 10% إلى 15%.'
  },
  {
    day: 8,
    phase: 'المرحلة 2: تجهيز المنظومة والعرض',
    title: 'إعداد سياسة الخصوصية ونصوص الموافقة الصريحة',
    description: 'التوافق التام مع قوانين حماية البيانات الشخصية ووضع نص الموافقة بجانب زر الإرسال.',
    tasks: [
      'وضع إشعار يفيد بموافقة العميل على مشاركة بياناته مع المقاول المعتمد.',
      'توفير رابط سياسة الخصوصية في تذييل الصفحة.',
      'حماية جدول تخزين البيانات السحابي بكلمة مرور ومصادقة ثنائية.'
    ],
    deliverable: 'صفحة متوافقة قانونياً ونظامياً بنسبة 100% وجاهزة لبدء الحملة.',
    proTip: 'الشفافية القانونية تحمي مشروعك وتبني سمعة احترافية تدوم لسنوات.'
  },
  {
    day: 9,
    phase: 'المرحلة 3: الإطلاق والاختبار التجريبي',
    title: 'إطلاق الاختبار الإعلاني التجريبي المحدود',
    description: 'تشغيل الحملة الإعلانية الأولى بميزانية صغيرة (10$ - 15$ يومياً) لرصد تدفق الطلبات.',
    tasks: [
      'تحديد الاستهداف الجغرافي الدقيق للأحياء المتفق عليها.',
      'استخدام إعلان بصري واضح قبل/بعد أو فيديو عمل فني حقيقي.',
      'مراقبة تكلفة النقرة وتكلفة الفرصة في لوحة الإعلانات.'
    ],
    deliverable: 'حملة إعلانية نشطة تنتج أولى النقرات والطلبات الواردة.',
    proTip: 'ابدأ دائماً بميزانية تجريبية صغيرة لمراقبة جودة المدخلات قبل ضخ مبالغ كبرى.'
  },
  {
    day: 10,
    phase: 'المرحلة 3: الإطلاق والاختبار التجريبي',
    title: 'مراقبة سرعة تدفق الطلبات وفحص المؤشرات',
    description: 'التأكد من أن النماذج تملأ بسلاسة وعدم وجود أي عوائق تقنية في استقبال البيانات.',
    tasks: [
      'فحص الإشعارات الفورية وتأكيد عمل روابط التنبيه.',
      'مقارنة عدد النقرات بعدد النماذج المرسلة لحساب معدل التحويل.',
      'إيقاف أي إعلان ضعيف لا يولد نتائج إيجابية.'
    ],
    deliverable: 'تدفق أول 3 إلى 5 طلبات حقيقية في لوحة المتابعة.',
    proTip: 'المعدل الطبيعي لتحويل صفحات الهبوط المحلية الجيدة يتراوح بين 10% إلى 20%.'
  },
  {
    day: 11,
    phase: 'المرحلة 3: الإطلاق والاختبار التجريبي',
    title: 'مراجعة جودة الطلبات وتصفية الأرقام',
    description: 'تطبيق مصفوفة التأهيل وفحص الأرقام واستبعاد أي رقم خاطئ أو خارج النطاق.',
    tasks: [
      'التأكد من صحة أرقام الهواتف ومطابقتها للمنطقة.',
      'تجهيز بيانات الفرص المؤهلة بصيغة تقرير فني مختصر للمقاول.',
      'تسجيل الطلبات في جدول CRM لتتبع نتائجها.'
    ],
    deliverable: 'أول دفعة من الفرص المؤهلة الجاهزة للتسليم الميداني.',
    proTip: 'إرسال تفاصيل المشكلة بدقة للمقاول يرفع ثقته بك إلى السماء من أول اتصال.'
  },
  {
    day: 12,
    phase: 'المرحلة 4: التسليم والتقييم والتوسع',
    title: 'تسليم الفرص للشركة ومتابعة سرعة الاتصال',
    description: 'إرسال الـ 3 فرص التجريبية فوراً لرقم مدير الشركة وحثه على الاتصال خلال 15 دقيقة.',
    tasks: [
      'إرسال رسالة التنبيه المنسقة عبر واتساب لمسؤول المبيعات.',
      'التواصل مع المقاول بعد ساعتين لمعرفة نتيجة المكالمة الأولية.',
      'تسجيل حالة وتاريخ المعاينة المحددة مع العميل.'
    ],
    deliverable: 'إتمام تسليم الفرص التجريبية وبدء تواصل فنيي المقاول مع العملاء.',
    proTip: 'السرعة هي كل شيء في الخدمات المحلية؛ الاتصال الفوري يحسم الصفقة لصالح مقاولك.'
  },
  {
    day: 13,
    phase: 'المرحلة 4: التسليم والتقييم والتوسع',
    title: 'جمع ملاحظات الشركات وتحليل التكاليف الفعلية CPL',
    description: 'الجلوس مع المقاول لمراجعة نتائج المكالمات وحساب تكلفة الإعلانات الفعلية الصافية.',
    tasks: [
      'السؤال عن مدى ملاءمة الأسعار وجدية العملاء في المعاينة.',
      'حساب تكلفة الفرصة المؤهلة الفعلية (Ad Spend ÷ Qualified Leads).',
      'حساب هامش الربح المتوقع عند بدء الفوترة الرسمية.'
    ],
    deliverable: 'تقرير تقييم مالي وفني واقعي لأداء المرحلة التجريبية الأولى.',
    proTip: 'كل ملاحظة يبديها المقاول هي كنز لتحسين نصوص الإعلانات وأسئلة النموذج في الأيام القادمة.'
  },
  {
    day: 14,
    phase: 'المرحلة 4: التسليم والتقييم والتوسع',
    title: 'تثبيت التعاقد المستمر واتخاذ قرار التوسع',
    description: 'توقيع الاتفاق الأسبوعي على نظام Pay-Per-Lead وتحديد سقف الفرص الأسبوعية المطلوبة.',
    tasks: [
      'الاتفاق على توريد 15 إلى 25 فرصة أسبوعياً بالسعر المتفق عليه.',
      'جدولة موعد الفاتورة الأسبوعية الأولى.',
      'وضع خطة لاستنساخ النموذج في أحياء جديدة أو قطاع مكمل.'
    ],
    deliverable: 'أول عقد شراكة مستمر ومولد للأرباح الأسبوعية المنتظمة.',
    proTip: 'الآن لديك مشروع حقيقي يدر دخلاً متكرراً؛ حافظ على ثقة المقاول واستمر في صيانة الجودة.'
  }
];

const PLAN_STORAGE_KEY = 'rikouzone_leadgen_14day_plan';

export const LeadFourteenDayPlan: React.FC = () => {
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(PLAN_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);

  useEffect(() => {
    try {
      localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(completedDays));
    } catch (e) {
      console.error(e);
    }
  }, [completedDays]);

  const toggleDayCompleted = (day: number) => {
    setCompletedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const activeDay = FOURTEEN_DAYS_PLAN.find((d) => d.day === activeDayNumber) || FOURTEEN_DAYS_PLAN[0];
  const progressPercent = Math.round((completedDays.length / FOURTEEN_DAYS_PLAN.length) * 100);

  const resetProgress = () => {
    setCompletedDays([]);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-right" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900/90 via-zinc-900/50 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
          <Calendar className="h-3.5 w-3.5" />
          <span>الدرس 14: خطة التطبيق العملية والمرنة</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          خريطة طريق الـ 14 يوماً للانتقال من الصفر إلى أول شراكة محلية
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
          خطة تنفيذية مرنة وواقعية توضح مهام كل يوم ومخرجاته الإلزامية، قابلة للتعديل والتمديد حسب ميزانيتك ووقتك، دون تقديم أي وعود سحرية أو افتراضات غير مدروسة.
        </p>

        {/* Progress Bar */}
        <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>إنجازك في الخطة:</span>
              <span className="text-cyan-400 font-mono font-bold">
                {completedDays.length} / 14 يوماً ({progressPercent}%)
              </span>
            </div>
            <div className="text-[11px] text-zinc-400">
              {progressPercent === 100
                ? 'تهانينا! لقد أكملت تطبيق كافة مراحل الخطة الـ 14 بنجاح.'
                : 'حدد الأيام المكتملة تدريجياً لتوثيق تقدمك الفعلي.'}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-36 h-2.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <button
              onClick={resetProgress}
              className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer shrink-0"
            >
              <RefreshCw className="h-3 w-3" />
              <span>إعادة ضبط</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Days List Grid (Span 4) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-bold text-zinc-400 px-1">اختر يوماً لمتابعة مهامه:</div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {FOURTEEN_DAYS_PLAN.map((d) => {
              const isSelected = d.day === activeDay.day;
              const isDone = completedDays.includes(d.day);

              return (
                <div
                  key={d.day}
                  onClick={() => setActiveDayNumber(d.day)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md shadow-cyan-500/5'
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDayCompleted(d.day);
                      }}
                      className="shrink-0 cursor-pointer"
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-zinc-700 hover:border-cyan-400" />
                      )}
                    </button>

                    <div className="min-w-0 space-y-0.5">
                      <div className="text-xs font-bold text-white truncate">
                        اليوم {d.day}: {d.title}
                      </div>
                      <div className="text-[10px] text-zinc-500 truncate">
                        {d.phase}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-cyan-400/80 shrink-0 font-bold">
                    D-{d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Day Detail Card (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-cyan-400 font-mono">
                  {activeDay.phase}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  اليوم {activeDay.day}: {activeDay.title}
                </h3>
              </div>

              <button
                onClick={() => toggleDayCompleted(activeDay.day)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  completedDays.includes(activeDay.day)
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  {completedDays.includes(activeDay.day) ? 'تم إنجاز هذا اليوم!' : 'تحديد كمكتمل'}
                </span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
              {activeDay.description}
            </p>

            {/* Daily Tasks List */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>المهام التنفيذية المطلوبة في هذا اليوم:</span>
              </div>
              <div className="space-y-2">
                {activeDay.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs text-zinc-300 leading-relaxed"
                  >
                    <div className="w-5 h-5 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 font-bold font-mono text-[11px] mt-0.5">
                      {idx + 1}
                    </div>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverable & Pro Tip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-950 border border-purple-500/20 space-y-1.5">
                <div className="text-xs font-bold text-purple-400">المخرج المطلوب إنجازه اليوم:</div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {activeDay.deliverable}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                <div className="text-xs font-bold text-emerald-400">نصيحة ذهبية للتنفيذ:</div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {activeDay.proTip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
