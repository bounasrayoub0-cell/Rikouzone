import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  RotateCcw,
  Layers,
  Award
} from 'lucide-react';

const CHECKLIST_STORAGE_KEY = 'rikouzone_newsletter_readiness_checklist';

interface ChecklistItem {
  id: string;
  category: 'foundation' | 'tech' | 'growth' | 'monetization';
  title: string;
  detail: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // 1. Foundation
  {
    id: 'c-1',
    category: 'foundation',
    title: 'تحديد النيتش التخصصي بدقة (Niche Selection)',
    detail: 'اختيار زاوية تخصص واضحة (مثل أدوات الذكاء الاصطناعي للمتاجر) مع التأكد من وجود شركات B2B تعلن في هذا المجال.'
  },
  {
    id: 'c-2',
    category: 'foundation',
    title: 'صياغة بيان القيمة والـ Tagline',
    detail: 'كتابة جملة واحدة توضح: لمن النشرة، ماذا يستفيد، والوقت المطلوب للقراءة (مثلاً: في 4 دقائق كل ثلاثاء).'
  },
  {
    id: 'c-3',
    category: 'foundation',
    title: 'تحديد موعد النشر الأسبوعي الثابت',
    detail: 'اختيار يوم محدد وساعة إرسال ثابتة (مثل الثلاثاء 8:00 صباحاً) والالتزام بها دون تأخير.'
  },
  {
    id: 'c-4',
    category: 'foundation',
    title: 'تصميم الشعار وصورة الهيدر البسيطة',
    detail: 'شعار مربع بدقة ممتازة كأيقونة للمرسل وهيدر لا يتجاوز 180 بكسل حتى لا يستهلك شاشة الهاتف.'
  },

  // 2. Tech & Setup
  {
    id: 'c-5',
    category: 'tech',
    title: 'إنشاء مساحة العمل على منصة beehiiv أو Substack',
    detail: 'تهيئة الحساب، إضافة بيانات الناشر القانونية في التذييل، واختيار الخطوط والألوان المناسبة للوضع الليلي.'
  },
  {
    id: 'c-6',
    category: 'tech',
    title: 'ربط الدومين المخصص (Custom Domain)',
    detail: 'حجز نطاق ينتهي بـ .com أو .co وربطه بالمنصة لضمان الملكية والمصداقية.'
  },
  {
    id: 'c-7',
    category: 'tech',
    title: 'إعداد سجلات الأمان والتحقق (SPF, DKIM, DMARC)',
    detail: 'إضافة سجلات DNS الثلاثة الإلزامية لضمان وصول الرسائل لصندوق الوارد الرئيسي وليس السبام.'
  },
  {
    id: 'c-8',
    category: 'tech',
    title: 'تصميم صفحة الهبوط المحولة (Landing Page)',
    detail: 'صفحة بسيطة بدون روابط مشتتة، تحتوي على حقل البريد، زر اشتراك فوري، وعينة من الأعداد السابقة.'
  },
  {
    id: 'c-9',
    category: 'tech',
    title: 'تفعيل إيميل الترحيب الآلي (Welcome Email)',
    detail: 'كتابة إيميل ترحيبي دافئ يسلم الهدية ويطلب من المشترك سحب الإيميل لصندوق الوارد الرئيسي والرد بكلمة واحدة.'
  },

  // 3. Growth & Audience
  {
    id: 'c-10',
    category: 'growth',
    title: 'صناعة مغناطيس الجذب فائق الفائدة (Lead Magnet)',
    detail: 'إعداد ملف PDF من صفحة واحدة أو قالب Notion عملي يحل مشكلة سريعة ويوزع مجاناً عند الاشتراك.'
  },
  {
    id: 'c-11',
    category: 'growth',
    title: 'وضع رابط صفحة الهبوط في بايو السوشيال ميديا',
    detail: 'تثبيت رابط النشرة في حسابات X و LinkedIn وإنستغرام مع دعوة صريحة ومحفزة للقراءة.'
  },
  {
    id: 'c-12',
    category: 'growth',
    title: 'إطلاق ثريد تسويقي أسبوعي (Social to Email Funnel)',
    detail: 'كتابة ثريد يقدم 80% من الفائدة على المنصة، مع دعوة القراء للاشتراك في التغريدة الأخيرة للحصول على الدليل الكامل.'
  },
  {
    id: 'c-13',
    category: 'growth',
    title: 'تفعيل شبكة التوصيات التبادلية (Recommendations)',
    detail: 'الاتفاق مع 3 إلى 5 نشرات زميلة في نفس الحجم لتبادل التوصيات بنقرة واحدة.'
  },
  {
    id: 'c-14',
    category: 'growth',
    title: 'جمع أول 100 مشترك من شبكة العلاقات المباشرة',
    detail: 'مراسلة الأصدقاء والزملاء المهتمين شخصياً ودعوتهم لتجربة الأعداد الأولى وإبداء الرأي.'
  },

  // 4. Monetization & Sponsors
  {
    id: 'c-15',
    category: 'monetization',
    title: 'إنشاء الحقيبة الإعلامية (Media Kit One-Pager)',
    detail: 'صفحة ملخصة توضح: عدد المشتركين، معدل الفتح، شريحة الجمهور الوظيفية، وباقات الرعاية وأسعارها.'
  },
  {
    id: 'c-16',
    category: 'monetization',
    title: 'بناء قائمة مستهدفة من 20 شركة معلنة محتملة',
    detail: 'جمع أسماء منصات البرمجيات والخدمات التي تعلن بالفعل في النشرات الزميلة واستخراج إيميلات مسؤولي التسويق.'
  },
  {
    id: 'c-17',
    category: 'monetization',
    title: 'تفعيل شبكة الإعلانات التلقائية (beehiiv Ad Network)',
    detail: 'تشغيل ميزة الرعايات الآلية بعد الوصول لأول 1,000 مشترك للبدء في جني أرباح فورية عن كل نقرة.'
  },
  {
    id: 'c-18',
    category: 'monetization',
    title: 'جدولة حملة تنظيف القائمة الربع سنوية (List Hygiene)',
    detail: 'إرسال إيميل وداع للمشتركين الخاملين وحذف غير المتفاعلين للحفاظ على معدل فتح يتجاوز 40%.'
  }
];

interface ActionPlanDay {
  phase: string;
  days: string;
  title: string;
  tasks: string[];
}

const ACTION_PLAN: ActionPlanDay[] = [
  {
    phase: 'المرحلة 1: التأسيس والبنية التقنية',
    days: 'اليوم 1 إلى 3',
    title: 'اختيار النيتش وحجز الدومين وإعداد beehiiv',
    tasks: [
      'اختيار زاوية تخصص B2B وصياغة سطر الـ Tagline المستهدف.',
      'حجز النطاق المخصص وضبط سجلات SPF, DKIM, DMARC في Cloudflare.',
      'تصميم صفحة الهبوط وكتابة إيميل الترحيب التلقائي ذي معدل الفتح المرتفع.'
    ]
  },
  {
    phase: 'المرحلة 2: صياغة المحتوى وإطلاق الأعداد الأولى',
    days: 'اليوم 4 إلى 7',
    title: 'كتابة وإرسال أول عددين وتجهيز مغناطيس الجذب',
    tasks: [
      'تجهيز قالب Notion أو شيت شيت PDF كهدية ترحيبية للمشتركين الجدد.',
      'كتابة العدد الأول وفق هيكل 3-2-1 والتدقيق اللغوي واختبار العرض على الهاتف.',
      'جدولة الإرسال ودعوة أول 50 صديقاً وزميلاً مهنياً للاشتراك وتقييم العدد.'
    ]
  },
  {
    phase: 'المرحلة 3: التوزيع وحصد أول 500 مشترك',
    days: 'اليوم 8 إلى 11',
    title: 'نشر الثريدات وتفعيل شبكة التوصيات التبادلية',
    tasks: [
      'نشر ثريد تسويقي دسم على X ومقال كاروسيل على LinkedIn وتوجيه الزوار للنشرة.',
      'التواصل مع 3 نشرات بريدية زميلة وتفعيل التوصيات التبادلية (Recommendations).',
      'إطلاق حملة "علق وسأرسل لك الدليل في الخاص" لرفع التفاعل وجلب المشتركين.'
    ]
  },
  {
    phase: 'المرحلة 4: تحقيق الدخل وأول راعٍ رسمي',
    days: 'اليوم 12 إلى 14',
    title: 'تجهيز الـ Media Kit ومراسلة أول 10 شركات راعية',
    tasks: [
      'تصميم صفحة الحقيبة الإعلامية وحساب سعر الـ CPM المناسب لنيتشك.',
      'إرسال سكريبت العرض البارد لـ 10 مسؤولي تسويق في شركات SaaS معلنة.',
      'إغلاق أول صفقة رعاية أو تفعيل شبكة الإعلانات التلقائية والاحتفال بأول دولار!'
    ]
  }
];

export const NewsletterChecklistAndPlan: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(checkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [checkedIds]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetChecklist = () => {
    setCheckedIds([]);
  };

  const progress = Math.round((checkedIds.length / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>خطة الإطلاق والجاهزية التنفيذية خطوة بخطوة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            خطة العمل لـ 14 يوماً وقائمة التحقق المهنية
          </h2>
          <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
            خارطة طريق تنفيذية مجدولة لـ 14 يوماً لإطلاق نشرتك من الصفر، مع قائمة فحص تفاعلية تحفظ تقدمك تلقائياً لضمان عدم نسيان أي خطوة حاسمة.
          </p>
        </div>
      </div>

      {/* 14-Day Action Plan Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-base font-black text-white">
          <Clock className="w-5 h-5 text-emerald-400" />
          <span>خطة الـ 14 يوماً للانطلاق من الصفر إلى أول راعٍ مدفوع:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACTION_PLAN.map((plan, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/70 space-y-3 relative overflow-hidden"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {plan.days}
                </span>
                <span className="text-[11px] font-bold text-zinc-500 font-mono">المرحلة {idx + 1}</span>
              </div>

              <div className="font-bold text-white text-sm">
                {plan.title}
              </div>

              <div className="text-[11px] text-zinc-400 font-semibold border-b border-zinc-800 pb-2">
                {plan.phase}
              </div>

              <ul className="space-y-2 text-xs text-zinc-300">
                {plan.tasks.map((task, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-emerald-400 font-bold shrink-0">•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Readiness Checklist */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-black text-white">
                قائمة فحص الجاهزية (18 بنداً للإطلاق الاحترافي)
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              أنجزت حتى الآن <strong className="text-emerald-400">{checkedIds.length}</strong> من أصل {CHECKLIST_ITEMS.length} مهام أساسية ({progress}%).
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress bar */}
            <div className="w-36 h-2.5 rounded-full bg-zinc-800 overflow-hidden hidden sm:block">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <button
              onClick={handleResetChecklist}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-all border border-zinc-700 active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة الضبط</span>
            </button>
          </div>
        </div>

        {/* Checklist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CHECKLIST_ITEMS.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                  isChecked
                    ? 'border-emerald-500/40 bg-emerald-950/20 text-zinc-300'
                    : 'border-zinc-800 bg-zinc-950 hover:bg-zinc-900/90 hover:border-zinc-700'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-emerald-400">
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-600" />
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className={`text-xs font-bold ${isChecked ? 'line-through text-zinc-400' : 'text-white'}`}>
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completed Badge */}
        {progress === 100 && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-zinc-900 to-emerald-500/10 border border-emerald-500/40 text-center space-y-2">
            <Award className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-base font-black text-white">
              🎉 رائع جداً! نشرتك البريدية جاهزة بنسبة 100% للإطلاق وجذب الرعاة!
            </h4>
            <p className="text-xs text-zinc-300 max-w-lg mx-auto">
              لقد أكملت جميع المتطلبات التقنية والتسويقية والتحريرية؛ أرسل عددك الأول الآن وابدأ في بناء إمبراطوريتك الإعلامية المستقلة.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
