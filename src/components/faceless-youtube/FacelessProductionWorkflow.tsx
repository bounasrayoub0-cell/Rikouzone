import React, { useState, useEffect } from 'react';
import { Layers, CheckCircle2, Clock, Sparkles, RefreshCw, AlertCircle, FileText, Mic, Film, ArrowRight, ShieldCheck } from 'lucide-react';

interface StageTask {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

interface WorkflowStage {
  id: string;
  number: number;
  title: string;
  iconName: string;
  estimatedHours: string;
  tasks: StageTask[];
}

const DEFAULT_STAGES: WorkflowStage[] = [
  {
    id: 'stage-research',
    number: 1,
    title: 'المرحلة 1: البحث والتحقق من المصادر',
    iconName: 'FileText',
    estimatedHours: '2 - 3 ساعات',
    tasks: [
      { id: 'r1', name: 'جمع 3 مصادر موثوقة ومستقلة تؤكد وقائع الموضوع', description: 'أوراق بحثية أو مقالات صحفية موثقة.', completed: true },
      { id: 'r2', name: 'استخراج الأرقام والإحصائيات والتواريخ الحاكمة', description: 'التحقق من صحة الأرقام وعدم تضاربها.', completed: true },
      { id: 'r3', name: 'تحديد زاوية التميز وفجوة المحتوى عن المنافسين', description: 'ما الذي سنقوله ولم تقله الفيديوهات السابقة؟', completed: false }
    ]
  },
  {
    id: 'stage-script',
    number: 2,
    title: 'المرحلة 2: صياغة السكريبت والتحرير البشري',
    iconName: 'Layers',
    estimatedHours: '2 - 4 ساعات',
    tasks: [
      { id: 's1', name: 'كتابة الهوك الافتتاحي القاطع (أول 30 ثانية)', description: 'بدون شارات انترو مملة أو تحيات روتينية.', completed: false },
      { id: 's2', name: 'هيكلة الفصول السباعية وإزالة 15% من الحشو', description: 'استخدام جمل قصيرة ولغة محادثة طبيعية.', completed: false },
      { id: 's3', name: 'قراءة المسودة بصوت مسموع مع توقيت الساعة', description: 'التأكد من سلاسة الإيقاع وعدم انقطاع الأنفاس.', completed: false }
    ]
  },
  {
    id: 'stage-audio',
    number: 3,
    title: 'المرحلة 3: التعليق الصوتي والمعالجة الهندسية',
    iconName: 'Mic',
    estimatedHours: '1 - 2 ساعات',
    tasks: [
      { id: 'a1', name: 'تسجيل الصوت في بيئة معزولة بدون صدى أو ضجيج', description: 'أخذ بصمة صمت لمدة 5 ثوانٍ في البداية.', completed: false },
      { id: 'a2', name: 'تطبيق فلاتر Audacity (Noise Reduction, EQ, Compressor)', description: 'موازنة الصوت وتطبيعه إلى -14 LUFS.', completed: false },
      { id: 'a3', name: 'قص لحظات الصمت والتنفس المزعج من المسار', description: 'تدفق صوتي سلس ونقي وجاهز للمونتاج.', completed: false }
    ]
  },
  {
    id: 'stage-edit',
    number: 4,
    title: 'المرحلة 4: المونتاج البصري والمؤثرات (B-Roll & SFX)',
    iconName: 'Film',
    estimatedHours: '4 - 6 ساعات',
    tasks: [
      { id: 'e1', name: 'جمع لقطات ومواد مرخصة تجارياً (Pexels, Public Domain)', description: 'توثيق تراخيص كل مادة في مجلد المشروع.', completed: false },
      { id: 'e2', name: 'تغيير المشهد أو حركة الزووم كل 4-6 ثوانٍ', description: 'الحفاظ على إيقاع العين ومعدل الاحتفاظ بالجمهور.', completed: false },
      { id: 'e3', name: 'إضافة النصوص التوضيحية والموسيقى عند -22dB', description: 'موسيقى هادئة لا تطغى على صوت المعلق.', completed: false }
    ]
  },
  {
    id: 'stage-publish',
    number: 5,
    title: 'المرحلة 5: سيو النشر، الغلاف والإطلاق المجدول',
    iconName: 'Sparkles',
    estimatedHours: '1 - 2 ساعات',
    tasks: [
      { id: 'p1', name: 'تصميم نسختين من الصورة المصغرة بتباين عالٍ', description: 'فحص مقروئيتها على شاشات الهواتف الصغيرة.', completed: false },
      { id: 'p2', name: 'كتابة العنوان والوصف الغني والفصول الزمنية', description: 'تجنب حشو الكلمات المفتاحية العشوائي.', completed: false },
      { id: 'p3', name: 'رفع الفيديو كغير مدرج (Unlisted) قبل موعد الإطلاق بـ 4 ساعات', description: 'إتاحة الوقت لفحوصات الجودة ومعالجة 4K والـ Copyright.', completed: false }
    ]
  }
];

export const FacelessProductionWorkflow: React.FC = () => {
  const [stages, setStages] = useState<WorkflowStage[]>(() => {
    try {
      const saved = localStorage.getItem('faceless_production_workflow_v1');
      return saved ? JSON.parse(saved) : DEFAULT_STAGES;
    } catch {
      return DEFAULT_STAGES;
    }
  });

  const [activeStageId, setActiveStageId] = useState<string>('stage-research');

  useEffect(() => {
    try {
      localStorage.setItem('faceless_production_workflow_v1', JSON.stringify(stages));
    } catch (e) {
      console.error(e);
    }
  }, [stages]);

  const toggleTask = (stageId: string, taskId: string) => {
    setStages((prev) =>
      prev.map((stage) => {
        if (stage.id !== stageId) return stage;
        return {
          ...stage,
          tasks: stage.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      })
    );
  };

  const resetAll = () => {
    if (window.confirm('هل تريد إعادة تعيين مهام سير عمل الإنتاج؟')) {
      setStages(DEFAULT_STAGES);
    }
  };

  const totalTasks = stages.reduce((acc, s) => acc + s.tasks.length, 0);
  const completedTasks = stages.reduce(
    (acc, s) => acc + s.tasks.filter((t) => t.completed).length,
    0
  );
  const overallProgress = Math.round((completedTasks / totalTasks) * 100);

  const activeStage = stages.find((s) => s.id === activeStageId) || stages[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 via-zinc-900 to-zinc-950 p-5 sm:p-6 shadow-xl shadow-red-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-amber-500 text-black shadow-lg shadow-red-500/30">
              <Layers className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/30 px-2.5 py-0.5 text-xs font-bold text-red-400">
                <Sparkles className="h-3 w-3" />
                <span>نظام إدارة دورة حياة الفيديو (SOPs)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                مخطط سير عمل الإنتاج والأتمتة المنضبطة
              </h2>
            </div>
          </div>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs font-bold text-zinc-300 hover:text-white hover:bg-zinc-700 cursor-pointer transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>إعادة تعيين الخطة</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 pt-3 border-t border-zinc-800">
          <div className="flex justify-between items-center text-xs font-bold mb-1.5">
            <span className="text-zinc-300">
              جاهزية المشروع: {completedTasks} من {totalTasks} مهمة مكتملة
            </span>
            <span className="font-mono text-emerald-400 text-sm font-black">
              {overallProgress}%
            </span>
          </div>
          <div className="h-2.5 w-full bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stages Horizontal Nav */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {stages.map((stg) => {
          const isDone = stg.tasks.every((t) => t.completed);
          const isActive = activeStageId === stg.id;
          return (
            <button
              key={stg.id}
              onClick={() => setActiveStageId(stg.id)}
              className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                isActive
                  ? 'bg-red-500/20 border-red-500 text-white shadow-lg shadow-red-500/10'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-mono font-bold text-red-400">
                  المرحلة {stg.number}
                </span>
                {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
              </div>
              <div className="text-xs font-bold text-white line-clamp-1">{stg.title.split(':')[1]}</div>
              <div className="text-[10px] font-mono text-zinc-400 mt-1">{stg.estimatedHours}</div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail & Tasks */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-white">
              {activeStage.title}
            </h3>
            <span className="text-xs text-zinc-400">
              الوقت التقديري المتوقع: {activeStage.estimatedHours}
            </span>
          </div>
        </div>

        {/* Tasks list */}
        <div className="space-y-3">
          {activeStage.tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(activeStage.id, task.id)}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                task.completed
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-zinc-300'
                  : 'bg-zinc-950 border-zinc-800 text-white hover:border-zinc-700'
              }`}
            >
              <div
                className={`h-5 w-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  task.completed
                    ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                    : 'border border-zinc-700 bg-zinc-900 text-transparent'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5 stroke-[3]" />
              </div>
              <div className="flex-1">
                <div className={`text-xs sm:text-sm font-bold ${task.completed ? 'line-through text-zinc-400' : 'text-white'}`}>
                  {task.name}
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                  {task.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
