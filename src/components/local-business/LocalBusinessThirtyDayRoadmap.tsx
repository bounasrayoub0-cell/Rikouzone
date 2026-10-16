import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  CheckCircle2,
  Sparkles,
  Target,
  Trophy,
  ArrowRight,
  Clock,
  Check,
  RefreshCw,
  Compass,
  AlertCircle
} from 'lucide-react';

interface DayMilestone {
  day: number;
  week: 1 | 2 | 3 | 4;
  title: string;
  action: string;
  deliverable: string;
}

const ROADMAP_DAYS: DayMilestone[] = [
  // Week 1: Market Research & Setup (Days 1 - 7)
  {
    day: 1,
    week: 1,
    title: 'تحديد النطاق الجغرافي وحصر الأنشطة',
    action: 'اختر شارعاً تجارياً أو حياً حيوياً في مدينتك، وافتح Google Maps وسجل أول 15 نشاطاً.',
    deliverable: 'قائمة جدول أولي بها 15 اسماً ونشاطاً ورابط ملفاتهم على الخريطة.'
  },
  {
    day: 2,
    week: 1,
    title: 'تدقيق الأنشطة باستخدام أداة الفحص',
    action: 'طبق أداة Local Audit Tool على الأنشطة الـ 15، وحدد الأنشطة التي حصلت على أقل من 60%.',
    deliverable: 'فرز أفضل 7 أنشطة تعاني من ثغرات واضحة يمكن علاجها سريعاً.'
  },
  {
    day: 3,
    week: 1,
    title: 'بناء معرض أعمال تجريبي (Mock Portfolio)',
    action: 'صمم في Canva 3 تصاميم افتراضية لقائمة طعام أو غلاف أو منشور لصالون حقيقي.',
    deliverable: 'ملف PDF من صفحتين يضم عينات قبل/بعد كدليل بصري على جودتك.'
  },
  {
    day: 4,
    week: 1,
    title: 'تجهيز هاتف التصوير والأدوات المجانية',
    action: 'نظف عدسة الهاتف، تفقد إعدادات 4K/60fps أو 1080p، وثبت تطبيقات CapCut وCanva وMeta Business.',
    deliverable: 'حقيبة أدوات جاهزة على هاتفك الشخصي.'
  },
  {
    day: 5,
    week: 1,
    title: 'صياغة بطاقة الخدمة الرائدة (Lead Offer)',
    action: 'حدد باقتك الأولى: مثلاً "إنعاش خرائط Google + 15 صورة نظيفة للمحل بسعر 200$".',
    deliverable: 'ورقة عرض واضحة لا تستغرق أكثر من دقيقة في الشرح.'
  },
  {
    day: 6,
    week: 1,
    title: 'التدرب على محاكي الاعتراضات والحديث',
    action: 'تدرب على نبرة الصوت وطريقة إلقاء التحية ومواجهة سؤال "شحال غاتطلب ليا؟".',
    deliverable: 'إتقان نبرة واثقة وهادئة تتحدث بلغة الأرباح والزبائن.'
  },
  {
    day: 7,
    week: 1,
    title: 'مراجعة خطة النزول الميداني للأسبوع الثاني',
    action: 'حدد المواعيد الهادئة لكل نشاط (المطاعم بين 3 و 5 مساءً، الصالونات صباحاً).',
    deliverable: 'جدول زمني للزيارات الميدانية اليومية.'
  },

  // Week 2: First Direct Outreach Campaign (Days 8 - 14)
  {
    day: 8,
    week: 2,
    title: 'أول 3 زيارات ميدانية استكشافية',
    action: 'ادخل المحلات المستهدفة كزبون يشتري قهوة أو يسأل بلطف، وتعرف على اسم المالك.',
    deliverable: 'التحدث مع أول شخص مسؤول والتعرف على المشاكل التي يعاني منها.'
  },
  {
    day: 9,
    week: 2,
    title: 'إرسال 5 رسائل تدقيق مجاني عبر WhatsApp',
    action: 'استخدم Local Outreach Generator لإرسال فحص مهني مبسط لـ 5 أنشطة محددة.',
    deliverable: '5 رسائل مرسلة مع متابعة القراءة والردود.'
  },
  {
    day: 10,
    week: 2,
    title: '3 زيارات ميدانية إضافية وعرض المشكلة',
    action: 'أظهر للتاجر على هاتفك كيف يظهر منافسه في الخريطة وكيف يغيب محله هو.',
    deliverable: 'توليد اهتمام حقيقي وتحديد موعد جلسة عمل قصيرة.'
  },
  {
    day: 11,
    week: 2,
    title: 'تقديم أول خدمة عينة مجانية (Free Sample)',
    action: 'اعرض التقاط صورتين نظيفتين للمحل وتحديث ساعات العمل فوراً دون مقابل لكسب الثقة.',
    deliverable: 'إثبات النية الطيبة والمهنية على أرض الواقع.'
  },
  {
    day: 12,
    week: 2,
    title: 'متابعة الرسائل وتوثيق الملاحظات',
    action: 'تواصل مع من شاهدوا رسائل الواتساب وقدم إجابات مبسطة على استفساراتهم.',
    deliverable: 'تسجيل الردود وتحديد العملاء الأكثر حماساً (Warm Leads).'
  },
  {
    day: 13,
    week: 2,
    title: 'زيارات المتابعة للأنشطة المتجاوبة',
    action: 'مر على الأنشطة التي أبدت اهتماماً وقدم لهم ورقة الفحص مطبوعة أو على الهاتف.',
    deliverable: 'تأكيد نية التعاقد والتحضير لمناقشة الباقة الشهرية.'
  },
  {
    day: 14,
    week: 2,
    title: 'تقييم الأسبوع الثاني وتحليل النتائج',
    action: 'احسب كم زيارة تمت وكم شخصاً تجاوب، وعدل نص التواصل إذا دعت الحاجة.',
    deliverable: 'قائمة قصيرة بـ 3 عملاء محتملين جاهزين للإغلاق.'
  },

  // Week 3: Negotiation & Closing Deals (Days 15 - 21)
  {
    day: 15,
    week: 3,
    title: 'جلسة العرض الأول مع العميل المرشح',
    action: 'اجلس مع التاجر واشرح باقة Growth أو Starter وأثرها المباشر على مبيعاته.',
    deliverable: 'تقديم عرض سعر رسمي ومحدد النطاق.'
  },
  {
    day: 16,
    week: 3,
    title: 'معالجة اعتراضات السعر والتردد',
    action: 'استخدم استراتيجية تخفيف المخاطر: "شهر تجريبي واحد لتلمس النتائج بنفسك".',
    deliverable: 'إزالة المخاوف والاتفاق المبدئي على البدء.'
  },
  {
    day: 17,
    week: 3,
    title: 'توليد وثيقة نطاق العمل (SOW) وتوقيعها',
    action: 'استخدم أداة SOW Generator لتجهيز الاتفاقية وتسليم نسخة للتاجر.',
    deliverable: 'وثيقة موقعة تحدد التسليمات وموعد البدء.'
  },
  {
    day: 18,
    week: 3,
    title: 'استلام الدفعة الشهرية الأولى أو المقدم (50%)',
    action: 'احرص على تأكيد الدفع قبل بدء العمل الفعلي لترسيخ الجدية والالتزام.',
    deliverable: '🎉 تحقيق أول دخل مالي حقيقي من تقديم الخدمات المحلية!'
  },
  {
    day: 19,
    week: 3,
    title: 'استلام الصلاحيات وبيانات الدخول الرسمية',
    action: 'اطلب إضافة بريدك كـ Manager في صفحة فيسبوك وملف خرائط Google.',
    deliverable: 'اكتمال الوصول الفني لكافة المنصات المطلوبة.'
  },
  {
    day: 20,
    week: 3,
    title: 'جلسة التصوير الميدانية الأولى للمشروع',
    action: 'قم بزيارة المحل في وقت الضوء الطبيعي، والتقط 20 صورة وفيديو قصير للأطباق/المنتجات.',
    deliverable: 'بنك وسائط خام جاهز للمونتاج والنشر.'
  },
  {
    day: 21,
    week: 3,
    title: 'إطلاق دفعة التحديثات السريعة (Quick Wins)',
    action: 'حدث ساعات العمل، ارفع أول 5 صور بجودة عالية، ورد على التعليقات المعلقة.',
    deliverable: 'تحسن فوري في شكل الملف على خرائط جوجل يراه التاجر بنفسه.'
  },

  // Week 4: Delivery, Results & Retainer Retention (Days 22 - 30)
  {
    day: 22,
    week: 4,
    title: 'تصميم وجدولة أول 3 منشورات ورابط واتساب',
    action: 'انشر محتوى ترحيبياً يوضح ساعات العمل ورقم الطلب، وثبت رابط الواتساب بالبايو.',
    deliverable: 'ظهور المحتوى في خلاصات المتابعين وبدء التفاعل.'
  },
  {
    day: 24,
    week: 4,
    title: 'إطلاق حملة جغرافية بميزانية تجريبية (3$ / يوم)',
    action: 'حدد دائرة استهداف بقطر 3 كم حول المحل تعرض أفضل طبق أو عرض تخفيضي.',
    deliverable: 'إعلان نشط يجلب اتصالات وزيارات يومية للمحل.'
  },
  {
    day: 26,
    week: 4,
    title: 'المتابعة اليومية للرسائل والتعليقات الواردة',
    action: 'تأكد من أن صاحب المحل يجيب على المكالمات ورسائل الواتساب الواردة من الإعلان.',
    deliverable: 'سماع تعليقات إيجابية من التاجر عن زبائن جدد زاروه.'
  },
  {
    day: 28,
    week: 4,
    title: 'إعداد تقرير الإنجاز الأول (First Monthly Report)',
    action: 'استخدم Monthly Report Builder لتوثيق عدد المشاهدات والمكالمات ونمو التقييمات.',
    deliverable: 'تقرير بالألوان يثبت عائداً حقيقياً على استثمار التاجر.'
  },
  {
    day: 30,
    week: 4,
    title: 'جلسة تجديد العقد الشهري (Retainer Renewal)',
    action: 'استعرض التقرير مع التاجر واطلب تجديد الاشتراك للشهر القادم بناءً على النجاح المثبت.',
    deliverable: 'عقد شهري مستقر متجدد تلقائياً والانتقال للبحث عن العميل الثاني!'
  }
];

export const LocalBusinessThirtyDayRoadmap: React.FC = () => {
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('local_biz_roadmap_completed_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeWeek, setActiveWeek] = useState<number>(1);

  useEffect(() => {
    try {
      localStorage.setItem('local_biz_roadmap_completed_v1', JSON.stringify(completedDays));
    } catch (e) {
      console.warn(e);
    }
  }, [completedDays]);

  const toggleDay = (day: number) => {
    if (completedDays.includes(day)) {
      setCompletedDays(completedDays.filter((d) => d !== day));
    } else {
      setCompletedDays([...completedDays, day]);
    }
  };

  const progressPercent = Math.round((completedDays.length / ROADMAP_DAYS.length) * 100);

  const resetProgress = () => {
    if (window.confirm('هل تريد إعادة تعيين تقدم خطة الـ 30 يوماً؟')) {
      setCompletedDays([]);
    }
  };

  const filteredDays = useMemo(() => {
    return ROADMAP_DAYS.filter((d) => d.week === activeWeek);
  }, [activeWeek]);

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400">
              <Sparkles className="h-4 w-4" />
              <span>الأداة التفاعلية الخامسة · خارطة الطريق التنفيذية</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
              خطة الـ 30 يوماً للحصول على أول عميل محلي (Roadmap Tracker)
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              لا تبدأ عشوائياً. اتبع هذا الدليل اليومي خطوة بخطوة من مرحلة البحث والتدقيق وحتى توقيع العقد الأول وتجديده شهرياً. احتفظ بتقدمك في المتصفح تلقائياً.
            </p>
          </div>

          <button
            onClick={resetProgress}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3.5 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-700 transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>إعادة ضبط التقدم</span>
          </button>
        </div>

        {/* Progress Bar Header */}
        <div className="mt-6 pt-6 border-t border-zinc-800/80">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-zinc-300">نسبة إنجاز خطة الـ 30 يوماً:</span>
            <span className="text-emerald-400">{completedDays.length} من أصل {ROADMAP_DAYS.length} مهام ({progressPercent}%)</span>
          </div>
          <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Week Tabs */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2">
        {[
          { num: 1, title: 'الأسبوع 1: دراسة السوق وتجهيز العينات' },
          { num: 2, title: 'الأسبوع 2: حملة التواصل والزيارات' },
          { num: 3, title: 'الأسبوع 3: التفاوض وتوقيع أول عقد' },
          { num: 4, title: 'الأسبوع 4: التنفيذ والتجديد الشهري' }
        ].map((w) => (
          <button
            key={w.num}
            onClick={() => setActiveWeek(w.num)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition border whitespace-nowrap cursor-pointer ${
              activeWeek === w.num
                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-md shadow-emerald-500/10'
                : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            {w.title}
          </button>
        ))}
      </div>

      {/* Days List */}
      <div className="space-y-3.5">
        {filteredDays.map((item) => {
          const isDone = completedDays.includes(item.day);
          return (
            <div
              key={item.day}
              onClick={() => toggleDay(item.day)}
              className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all flex items-start gap-4 ${
                isDone
                  ? 'border-emerald-500/50 bg-emerald-500/5 shadow-md shadow-emerald-500/5'
                  : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/80'
              }`}
            >
              <div
                className={`mt-1 h-6 w-6 rounded-xl flex items-center justify-center border shrink-0 transition ${
                  isDone
                    ? 'border-emerald-500 bg-emerald-500 text-black'
                    : 'border-zinc-700 bg-zinc-800'
                }`}
              >
                {isDone && <Check className="h-4 w-4 stroke-[3]" />}
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-md bg-zinc-800 text-emerald-400 border border-zinc-700">
                      اليوم {item.day}
                    </span>
                    <h3 className={`text-sm sm:text-base font-black ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                      {item.title}
                    </h3>
                  </div>

                  {item.day === 18 && (
                    <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      محطة الإغلاق الأولى
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {item.action}
                </p>

                <div className="mt-3 inline-flex items-center gap-2 text-xs text-zinc-400 bg-zinc-950/60 px-3 py-1.5 rounded-xl border border-zinc-800/80">
                  <strong className="text-zinc-300 font-bold">المخرج المطلوب:</strong>
                  <span>{item.deliverable}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
