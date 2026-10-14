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

const CHECKLIST_STORAGE_KEY = 'rikouzone_microsaas_checklist';

interface MilestoneTask {
  id: string;
  phase: string;
  week: number;
  title: string;
  description: string;
  estimatedHours: number;
  xp: number;
}

const MILESTONE_TASKS: MilestoneTask[] = [
  // Week 1: Problem Discovery & Validation
  {
    id: 'ms-w1-1',
    phase: 'الأسبوع 1: اكتشاف المشكلة والتحقق المسبق',
    week: 1,
    title: 'تحديد مشكلة B2B مؤلمة يبحث الناس عن حلها حالياً',
    description: 'ابحث في مراجعات Capterra ومجموعات Reddit عن مهمة يدوية يهدر الموظفون ساعات في حلها يدوياً.',
    estimatedHours: 4,
    xp: 30
  },
  {
    id: 'ms-w1-2',
    phase: 'الأسبوع 1: اكتشاف المشكلة والتحقق المسبق',
    week: 1,
    title: 'إجراء 5 مقابلات مباشرة مع أصحاب المشكلة (The Mom Test)',
    description: 'تواصل مع 15 شخصاً على LinkedIn أو X واسألهم عن كيفية حلهم لهذه المشكلة الحالية والتكاليف.',
    estimatedHours: 5,
    xp: 40
  },
  {
    id: 'ms-w1-3',
    phase: 'الأسبوع 1: اكتشاف المشكلة والتحقق المسبق',
    week: 1,
    title: 'بناء صفحة انتظار بسيطة (Waitlist Landing Page)',
    description: 'صفحة تشرح النتيجة وتوفر نموذج تسجيل للبريد للحصول على وصول مبكر بخصم مؤسس 50%.',
    estimatedHours: 4,
    xp: 35
  },
  {
    id: 'ms-w1-4',
    phase: 'الأسبوع 1: اكتشاف المشكلة والتحقق المسبق',
    week: 1,
    title: 'جمع أول 25 بريداً إلكترونياً لمهتمين حقيقيين',
    description: 'نشر فكرة الحل في مجتمعات متخصصة وجمع 25 مشتركاً يؤكدون وجود اهتمام حقيقي بالشراء.',
    estimatedHours: 6,
    xp: 45
  },

  // Week 2: MVP Scoping & Core Feature Build
  {
    id: 'ms-w2-1',
    phase: 'الأسبوع 2: بناء الميزة الجوهرية (MVP Core Build)',
    week: 2,
    title: 'حصر نطاق الـ MVP في ميزة واحدة فقط (One Killer Feature)',
    description: 'حذف جميع الميزات الثانوية والتأكد من أن الأداة تركز حصرياً على إنجاز المهمة الرئيسية بإتقان.',
    estimatedHours: 3,
    xp: 30
  },
  {
    id: 'ms-w2-2',
    phase: 'الأسبوع 2: بناء الميزة الجوهرية (MVP Core Build)',
    week: 2,
    title: 'إعداد الستاك التقني (Next.js + Supabase + Tailwind)',
    description: 'تهيئة المستودع، وإنشاء جداول قاعدة البيانات (profiles, logs)، وربط المصادقة بـ Google.',
    estimatedHours: 6,
    xp: 50
  },
  {
    id: 'ms-w2-3',
    phase: 'الأسبوع 2: بناء الميزة الجوهرية (MVP Core Build)',
    week: 2,
    title: 'برمجة محرك الأداة الأساسي والـ API الداخلي',
    description: 'تنفيذ منطق المعالجة (معالجة الملفات، استدعاء الـ AI، أو الأتمتة) واختباره بنجاح.',
    estimatedHours: 12,
    xp: 60
  },
  {
    id: 'ms-w2-4',
    phase: 'الأسبوع 2: بناء الميزة الجوهرية (MVP Core Build)',
    week: 2,
    title: 'تصميم تجربة Onboarding سريعة (لحظة إبهار في أقل من 60 ثانية)',
    description: 'تمكين المستخدم الجديد من تجربة الأداة ورؤية النتيجة السحرية بدون خطوات إعداد معقدة.',
    estimatedHours: 5,
    xp: 40
  },

  // Week 3: Billing, Security & Landing Page
  {
    id: 'ms-w3-1',
    phase: 'الأسبوع 3: بوابات الدفع والأمان وصفحة الهبوط',
    week: 3,
    title: 'ربط بائع السجلات (Lemon Squeezy أو Paddle)',
    description: 'إعداد خطط التسعير (Starter و Pro) وبرمجة الـ Webhooks لتحديث صلاحيات المستخدمين تلقائياً.',
    estimatedHours: 6,
    xp: 50
  },
  {
    id: 'ms-w3-2',
    phase: 'الأسبوع 3: بوابات الدفع والأمان وصفحة الهبوط',
    week: 3,
    title: 'تأمين الـ API وتطبيق حماية معدل الاستخدام (Rate Limiting)',
    description: 'عزل بيانات المستخدمين عبر RLS، وحماية المفاتيح السرية في الخادم، وتفعيل Upstash Ratelimit.',
    estimatedHours: 4,
    xp: 45
  },
  {
    id: 'ms-w3-3',
    phase: 'الأسبوع 3: بوابات الدفع والأمان وصفحة الهبوط',
    week: 3,
    title: 'بناء صفحة هبوط ذات تحويل عالٍ مع فيديو استعراضي حي',
    description: 'كتابة العنوان الصريح، وتسجيل فيديو تجريبي مدته 30 ثانية للأداة وهي تعمل بسلاسة.',
    estimatedHours: 8,
    xp: 50
  },
  {
    id: 'ms-w3-4',
    phase: 'الأسبوع 3: بوابات الدفع والأمان وصفحة الهبوط',
    week: 3,
    title: 'اختبار دورة الدفع والتسجيل الكاملة (End-to-End Testing)',
    description: 'إجراء عملية شراء ببطاقة اختبار تجريبية، والتأكد من فتح الميزات ووصول إيميل الفاتورة بنجاح.',
    estimatedHours: 3,
    xp: 35
  },

  // Week 4: Launch & First 100 Customers
  {
    id: 'ms-w4-1',
    phase: 'الأسبوع 4: الإطلاق وجلب أول المشتركين المدفوعين',
    week: 4,
    title: 'تجهيز أصول Product Hunt والإطلاق في 12:01 AM PST',
    description: 'صورة الشعار المتحركة، تعليق الصانع الشفاف، وكوبون خصم الإطلاق الخاص للمجتمع.',
    estimatedHours: 5,
    xp: 55
  },
  {
    id: 'ms-w4-2',
    phase: 'الأسبوع 4: الإطلاق وجلب أول المشتركين المدفوعين',
    week: 4,
    title: 'نشر قصة البناء (Build in Public Launch Thread) على X ولينكدإن',
    description: 'مشاركة القصة وما تعلمته مع الفيديو التوضيحي المباشر في أول تغريدة.',
    estimatedHours: 3,
    xp: 40
  },
  {
    id: 'ms-w4-3',
    phase: 'الأسبوع 4: الإطلاق وجلب أول المشتركين المدفوعين',
    week: 4,
    title: 'إرسال 50 رسالة بريد باردة مخصصة (Cold Email) لشركات مستهدفة',
    description: 'استهداف مباشر لمديري الشركات الذين يعانون من المشكلة وتقديم تجربة مجانية ممتازة.',
    estimatedHours: 8,
    xp: 60
  },
  {
    id: 'ms-w4-4',
    phase: 'الأسبوع 4: الإطلاق وجلب أول المشتركين المدفوعين',
    week: 4,
    title: 'تثبيت ويدجت الدعم المباشر ومتابعة تحليلات MRR و Churn',
    description: 'الرد الفوري على كل ملاحظات واستفسارات المشتركين وإصلاح الأخطاء في نفس اليوم.',
    estimatedHours: 4,
    xp: 45
  }
];

export const MicroSaasChecklistAndPlan: React.FC = () => {
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(completedTaskIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedTaskIds]);

  const toggleTask = (id: string) => {
    setCompletedTaskIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleReset = () => {
    if (window.confirm('هل تريد بالتأكيد إعادة تعيين تقدم قائمة مهام الإطلاق؟')) {
      setCompletedTaskIds([]);
    }
  };

  const totalTasks = MILESTONE_TASKS.length;
  const completedCount = completedTaskIds.length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);
  const earnedXp = MILESTONE_TASKS.filter((t) => completedTaskIds.includes(t.id)).reduce((acc, t) => acc + t.xp, 0);
  const totalXp = MILESTONE_TASKS.reduce((acc, t) => acc + t.xp, 0);

  // Group by week
  const weeks = [1, 2, 3, 4];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6">
      {/* Intro Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
              <CalendarCheck className="h-4 w-4" />
              <span>خطة العمل وخريطة الطريق في 30 يوماً</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              خارطة طريق إطلاق Micro-SaaS من الصفر حتى أول 100 عميل
            </h2>
            <p className="text-sm text-zinc-400 max-w-2xl">
              16 محطة تنفيذية محددة بالساعات ونقاط الـ XP مقسمة على 4 أسابيع مركزة، لنقلك من مجرد فكرة إلى منتج برمجي حي يدر اشتراكات شهرية متكررة.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>إعادة التعيين</span>
          </button>
        </div>

        {/* Live Progress Bar */}
        <div className="mt-6 pt-5 border-t border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-zinc-300 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-emerald-400" />
              <span>نسبة إنجاز خطة الإطلاق: {completedCount} من {totalTasks} مهمة</span>
            </span>
            <span className="text-emerald-400 font-mono font-bold">
              {progressPercent}% مكتمل | +{earnedXp} / {totalXp} XP
            </span>
          </div>
          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4 Weeks Cards */}
      <div className="space-y-6">
        {weeks.map((weekNum) => {
          const weekTasks = MILESTONE_TASKS.filter((t) => t.week === weekNum);
          const weekPhaseTitle = weekTasks[0]?.phase || `الأسبوع ${weekNum}`;
          const weekCompleted = weekTasks.filter((t) => completedTaskIds.includes(t.id)).length;

          return (
            <div
              key={weekNum}
              className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm">
                    0{weekNum}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{weekPhaseTitle}</h3>
                    <span className="text-xs text-zinc-500">
                      تم إنجاز {weekCompleted} من {weekTasks.length} مهام
                    </span>
                  </div>
                </div>
                <div className="text-xs font-mono font-bold text-zinc-400">
                  {Math.round((weekCompleted / weekTasks.length) * 100)}%
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {weekTasks.map((task) => {
                  const isDone = completedTaskIds.includes(task.id);
                  return (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isDone
                          ? 'border-emerald-500/40 bg-emerald-500/5 text-zinc-300'
                          : 'border-zinc-800/80 bg-zinc-950/70 hover:bg-zinc-900/90 hover:border-zinc-700 text-zinc-200'
                      }`}
                    >
                      <button className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <Circle className="h-5 w-5 text-zinc-600 hover:text-zinc-400" />
                        )}
                      </button>
                      <div className="space-y-1 min-w-0">
                        <div className={`text-xs font-bold ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                          {task.title}
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{task.estimatedHours} ساعات عمل</span>
                          </span>
                          <span className="text-emerald-400 font-bold">+{task.xp} XP</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
