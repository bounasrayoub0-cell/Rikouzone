import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Clock, 
  Video, 
  FileText, 
  Sparkles, 
  Monitor, 
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  RotateCcw
} from 'lucide-react';

interface LessonItem {
  id: string;
  title: string;
  durationMinutes: number;
  format: 'screen' | 'camera' | 'slides' | 'exercise' | 'template';
  task: string;
}

interface ModuleItem {
  id: string;
  moduleNumber: number;
  title: string;
  milestoneObjective: string;
  lessons: LessonItem[];
}

export const CourseOutlineBuilder: React.FC<{ onCopyText: (text: string, label: string) => void }> = ({ onCopyText }) => {
  // Pre-configured Blueprint Templates
  const defaultBlueprint: ModuleItem[] = [
    {
      id: 'mod-1',
      moduleNumber: 1,
      title: 'الوحدة 1: الأساسيات والانتصار السريع (Quick Win)',
      milestoneObjective: 'فهم خريطة الطريق وتحقيق أول نتيجة ملموسة في 30 دقيقة',
      lessons: [
        { id: 'les-1-1', title: 'خارطة طريق البرنامج وقواعد النجاح في التطبيق', durationMinutes: 6, format: 'camera', task: 'تحديد هدفك المالي والزمني المكتوب' },
        { id: 'les-1-2', title: 'تجهيز بيئة العمل وحسابات الأدوات الأساسية', durationMinutes: 8, format: 'screen', task: 'فتح الحسابات وربط المتصفح' },
        { id: 'les-1-3', title: 'التمرين السريع: إطلاق أول نموذج تجريبي حي', durationMinutes: 10, format: 'exercise', task: 'مشاركة رابط نموذجك في المجتمع' }
      ]
    },
    {
      id: 'mod-2',
      moduleNumber: 2,
      title: 'الوحدة 2: البحث الميداني واكتشاف الفرص الرابحة',
      milestoneObjective: 'استخراج 3 فرص مربحة والتحقق من طلب السوق',
      lessons: [
        { id: 'les-2-1', title: 'معادلة الفلترة الصارمة للفرص ذات العائد المرتفع', durationMinutes: 9, format: 'slides', task: 'تعبئة شيت الفرز والمفاضلة' },
        { id: 'les-2-2', title: 'التجسس الأخلاقي على المنافسين واستخراج نقاط ضعفهم', durationMinutes: 12, format: 'screen', task: 'توثيق 3 ثغرات في السوق' },
        { id: 'les-2-3', title: 'اعتماد الفكرة النهائية وصياغة العرض الفريد', durationMinutes: 7, format: 'screen', task: 'كتابة جملة القيمة المركزية' }
      ]
    },
    {
      id: 'mod-3',
      moduleNumber: 3,
      title: 'الوحدة 3: البناء الفني والتنفيذ خطوة بخطوة',
      milestoneObjective: 'بناء المنظومة كاملة من الصفر وتجهيزها للاستخدام',
      lessons: [
        { id: 'les-3-1', title: 'ضبط الإعدادات الاحترافية وتفادي أخطاء المبتدئين', durationMinutes: 11, format: 'screen', task: 'تنفيذ الإعدادات ومطابقتها' },
        { id: 'les-3-2', title: 'استخدام القوالب الجاهزة لتسريع الإنجاز بـ 5 أضعاف', durationMinutes: 8, format: 'template', task: 'تعديل القالب ببيانات مشروعك' },
        { id: 'les-3-3', title: 'فحص الجودة وتجربة المسار من منظور المستخدم', durationMinutes: 7, format: 'screen', task: 'إجراء فحص تدقيقي شامل' }
      ]
    },
    {
      id: 'mod-4',
      moduleNumber: 4,
      title: 'الوحدة 4: جذب العملاء وتحقيق أول عوائد مالية',
      milestoneObjective: 'إطلاق حملة الجذب واستقبال أول مبيعات وتكرار العملية',
      lessons: [
        { id: 'les-4-1', title: 'استراتيجية النشر العضوي لجذب أول المشترين بصفر دولار', durationMinutes: 10, format: 'camera', task: 'نشر أول منشورين تسويقيين' },
        { id: 'les-4-2', title: 'سكربتات الإقناع والرد على الاعتراضات وإغلاق البيع', durationMinutes: 8, format: 'slides', task: 'حفظ واستخدام سكربت الردود' },
        { id: 'les-4-3', title: 'مشروع التخرج: تسليم الخطة التنفيذية واستلام الشهادة', durationMinutes: 6, format: 'exercise', task: 'تسليم رابط المشروع النهائي في المنصة' }
      ]
    }
  ];

  const [modules, setModules] = useState<ModuleItem[]>(defaultBlueprint);
  const [copied, setCopied] = useState<boolean>(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-1': true,
    'mod-2': true,
    'mod-3': true,
    'mod-4': true
  });

  // New Module Input
  const [newModuleTitle, setNewModuleTitle] = useState<string>('');
  const [newModuleObjective, setNewModuleObjective] = useState<string>('');
  const [showAddModule, setShowAddModule] = useState<boolean>(false);

  // New Lesson Input Dialog
  const [activeModuleForLesson, setActiveModuleForLesson] = useState<string | null>(null);
  const [newLessonTitle, setNewLessonTitle] = useState<string>('');
  const [newLessonDuration, setNewLessonDuration] = useState<number>(8);
  const [newLessonFormat, setNewLessonFormat] = useState<LessonItem['format']>('screen');
  const [newLessonTask, setNewLessonTask] = useState<string>('');

  // Toggle Module Accordion
  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Add Module
  const handleAddModule = () => {
    if (!newModuleTitle.trim()) return;
    const newMod: ModuleItem = {
      id: `mod-${Date.now()}`,
      moduleNumber: modules.length + 1,
      title: newModuleTitle.trim(),
      milestoneObjective: newModuleObjective.trim() || 'إتقان هذه المرحلة العملية',
      lessons: []
    };
    setModules([...modules, newMod]);
    setExpandedModules((prev) => ({ ...prev, [newMod.id]: true }));
    setNewModuleTitle('');
    setNewModuleObjective('');
    setShowAddModule(false);
  };

  // Delete Module
  const handleDeleteModule = (id: string) => {
    setModules(modules.filter((m) => m.id !== id).map((m, idx) => ({ ...m, moduleNumber: idx + 1 })));
  };

  // Add Lesson
  const handleAddLesson = (moduleId: string) => {
    if (!newLessonTitle.trim()) return;
    const newLes: LessonItem = {
      id: `les-${Date.now()}`,
      title: newLessonTitle.trim(),
      durationMinutes: Math.max(1, newLessonDuration),
      format: newLessonFormat,
      task: newLessonTask.trim() || 'تطبيق ما تم شرحه فوراً'
    };

    setModules(
      modules.map((m) => (m.id === moduleId ? { ...m, lessons: [...m.lessons, newLes] } : m))
    );

    setNewLessonTitle('');
    setNewLessonDuration(8);
    setNewLessonTask('');
    setActiveModuleForLesson(null);
  };

  // Delete Lesson
  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    setModules(
      modules.map((m) =>
        m.id === moduleId ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) } : m
      )
    );
  };

  // Outline Calculations
  const stats = useMemo(() => {
    const totalModules = modules.length;
    let totalLessons = 0;
    let totalMinutes = 0;
    let exerciseCount = 0;

    modules.forEach((m) => {
      totalLessons += m.lessons.length;
      m.lessons.forEach((l) => {
        totalMinutes += l.durationMinutes;
        if (l.format === 'exercise' || l.format === 'template') exerciseCount++;
      });
    });

    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const practicalRatio = totalLessons > 0 ? Math.round((exerciseCount / totalLessons) * 100) : 0;

    return {
      totalModules,
      totalLessons,
      totalMinutes,
      durationLabel: hours > 0 ? `${hours} ساعة و ${mins} دقيقة` : `${mins} دقيقة`,
      practicalRatio
    };
  }, [modules]);

  // Generate Markdown Outline
  const generateMarkdown = () => {
    let md = `# مخطط المنهج التدريبي للدورة (Course Syllabus Outline)\n\n`;
    md += `**إجمالي الوحدات:** ${stats.totalModules} وحدات | **إجمالي الدروس:** ${stats.totalLessons} درساً | **المدة الإجمالية:** ${stats.durationLabel}\n\n`;
    md += `---\n\n`;

    modules.forEach((m) => {
      md += `## ${m.title}\n`;
      md += `> **الهدف التحولي للوحدة:** ${m.milestoneObjective}\n\n`;
      m.lessons.forEach((l, idx) => {
        const formatName = 
          l.format === 'screen' ? 'تسجيل شاشة' :
          l.format === 'camera' ? 'حديث مباشر' :
          l.format === 'slides' ? 'شرائح عرض' :
          l.format === 'template' ? 'قالب عمل' : 'تمرين تطبيقي';
        md += `- **الدرس ${idx + 1}:** ${l.title} (${l.durationMinutes} دقيقة) [${formatName}]\n`;
        md += `  - *المهمة التطبيقية:* ${l.task}\n`;
      });
      md += `\n`;
    });

    return md;
  };

  const handleCopyMarkdown = () => {
    const text = generateMarkdown();
    onCopyText(text, 'تم نسخ مخطط المنهج التدريبي كاملاً بتنسيق Markdown');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetToDefault = () => {
    setModules(defaultBlueprint);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-zinc-900 to-zinc-900/90 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold mb-2">
              <Layers className="h-3.5 w-3.5" />
              <span>منشئ وهيكل المنهج التعليمي التفاعلي</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              باني مخطط الدورة والدروس المصغرة (Course Outline Builder)
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
              صمم المنهج خطوة بخطوة؛ حدد الوحدات، الدروس المصغرة، صيغة الشرح، والمهمة التطبيقية لكل درس وصدره بضغطة زر.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetToDefault}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-800 text-zinc-300 text-xs hover:text-white hover:bg-zinc-700 transition-all cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>النموذج الافتراضي</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-purple-500 text-black text-xs font-black hover:bg-purple-400 transition-all cursor-pointer shadow-md shadow-purple-500/20"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'تم النسخ!' : 'تصدير المخطط (Markdown)'}</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Counter */}
        <div className="mt-5 pt-4 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-zinc-400 text-[11px] block">إجمالي الوحدات</span>
            <span className="text-white font-mono font-black text-base">{stats.totalModules} وحدات</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-zinc-400 text-[11px] block">عدد الدروس الإجمالي</span>
            <span className="text-purple-400 font-mono font-black text-base">{stats.totalLessons} درساً</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-zinc-400 text-[11px] block">مدة المحتوى التقديرية</span>
            <span className="text-emerald-400 font-mono font-black text-base">{stats.durationLabel}</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-zinc-400 text-[11px] block">نسبة المهام التطبيقية والقوالب</span>
            <span className="text-amber-400 font-mono font-black text-base">{stats.practicalRatio}% عملي</span>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((mod) => {
          const isExpanded = expandedModules[mod.id] ?? true;

          return (
            <div
              key={mod.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/70 overflow-hidden shadow-lg transition-all"
            >
              {/* Module Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-3 bg-zinc-900/90 border-b border-zinc-800/80">
                <div
                  onClick={() => toggleModule(mod.id)}
                  className="flex items-center gap-3 cursor-pointer select-none flex-1"
                >
                  <button className="h-7 w-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">
                    {mod.moduleNumber}
                  </button>

                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <span>{mod.title}</span>
                      <span className="text-xs text-zinc-500 font-normal">({mod.lessons.length} دروس)</span>
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      🎯 <strong className="text-zinc-300">الهدف التحولي:</strong> {mod.milestoneObjective}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModuleForLesson(mod.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 text-xs font-semibold hover:border-purple-500 hover:text-white transition-all cursor-pointer"
                  >
                    <Plus className="h-3 w-3 text-purple-400" />
                    <span>إضافة درس</span>
                  </button>

                  <button
                    onClick={() => handleDeleteModule(mod.id)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                    title="حذف الوحدة"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="p-1.5 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Module Content / Lessons */}
              {isExpanded && (
                <div className="p-4 sm:p-5 space-y-3 bg-zinc-950/40">
                  {mod.lessons.length === 0 ? (
                    <div className="text-center py-6 text-xs text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                      لا توجد دروس مضافة في هذه الوحدة حتى الآن. اضغط على "إضافة درس" في الأعلى.
                    </div>
                  ) : (
                    mod.lessons.map((lesson, idx) => (
                      <div
                        key={lesson.id}
                        className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-zinc-700 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xs font-mono font-bold text-zinc-500 mt-0.5">
                            {idx + 1}.
                          </span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="text-xs sm:text-sm font-bold text-zinc-200">
                                {lesson.title}
                              </h5>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400">
                                <Clock className="h-3 w-3" />
                                <span>{lesson.durationMinutes} دقيقة</span>
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                lesson.format === 'screen' ? 'bg-blue-500/10 text-blue-400' :
                                lesson.format === 'camera' ? 'bg-purple-500/10 text-purple-400' :
                                lesson.format === 'template' ? 'bg-emerald-500/10 text-emerald-400' :
                                lesson.format === 'exercise' ? 'bg-amber-500/10 text-amber-400' :
                                'bg-zinc-800 text-zinc-300'
                              }`}>
                                {lesson.format === 'screen' ? 'تسجيل شاشة' :
                                 lesson.format === 'camera' ? 'ظهور بالكاميرا' :
                                 lesson.format === 'template' ? 'قالب عمل' :
                                 lesson.format === 'exercise' ? 'تمرين تطبيقي' : 'شرائح عرض'}
                              </span>
                            </div>

                            <p className="text-[11px] text-zinc-400 mt-1">
                              ⚡ <strong className="text-zinc-300">مهمة الطالب:</strong> {lesson.task}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteLesson(mod.id, lesson.id)}
                          className="p-1 rounded text-zinc-500 hover:text-rose-400 transition-all cursor-pointer self-end sm:self-center"
                          title="حذف الدرس"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  )}

                  {/* Add Lesson Dialog inline */}
                  {activeModuleForLesson === mod.id && (
                    <div className="p-4 rounded-xl border border-purple-500/30 bg-zinc-900/90 space-y-3 mt-3 animate-fadeIn">
                      <div className="text-xs font-bold text-purple-300 flex items-center justify-between">
                        <span>إضافة درس جديد للوحدة:</span>
                        <button
                          onClick={() => setActiveModuleForLesson(null)}
                          className="text-zinc-400 hover:text-white"
                        >
                          إلغاء
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-6">
                          <label className="block text-[11px] text-zinc-400 mb-1">عنوان الدرس</label>
                          <input
                            type="text"
                            placeholder="مثال: كيفية إعداد بوابات الدفع الإلكترونية"
                            value={newLessonTitle}
                            onChange={(e) => setNewLessonTitle(e.target.value)}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[11px] text-zinc-400 mb-1">المدة (بالدقائق)</label>
                          <input
                            type="number"
                            min="1"
                            max="60"
                            value={newLessonDuration}
                            onChange={(e) => setNewLessonDuration(Number(e.target.value))}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-white font-mono focus:border-purple-500 focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[11px] text-zinc-400 mb-1">صيغة الدرس</label>
                          <select
                            value={newLessonFormat}
                            onChange={(e) => setNewLessonFormat(e.target.value as LessonItem['format'])}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-2 py-1.5 text-xs text-zinc-300 focus:border-purple-500 focus:outline-none"
                          >
                            <option value="screen">تسجيل شاشة</option>
                            <option value="camera">كاميرا وشرح</option>
                            <option value="slides">شرائح تقديمية</option>
                            <option value="exercise">تمرين تطبيقي</option>
                            <option value="template">قالب عمل جاهز</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-zinc-400 mb-1">المهمة التطبيقية للطالب بعد الفيديو</label>
                        <input
                          type="text"
                          placeholder="مثال: ربط حساب Stripe وإجراء عملية شراء تجريبية"
                          value={newLessonTask}
                          onChange={(e) => setNewLessonTask(e.target.value)}
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => handleAddLesson(mod.id)}
                          className="px-4 py-1.5 rounded-lg bg-purple-500 text-black text-xs font-bold hover:bg-purple-400 cursor-pointer"
                        >
                          تأكيد وحفظ الدرس
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add New Module Section */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        {!showAddModule ? (
          <button
            onClick={() => setShowAddModule(true)}
            className="w-full py-3 rounded-xl border border-dashed border-zinc-700 hover:border-purple-500 hover:bg-zinc-800/60 text-zinc-300 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4 text-purple-400" />
            <span>إضافة وحدة دراسية جديدة (Module)</span>
          </button>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="h-4 w-4 text-purple-400" />
              <span>إضافة وحدة دراسية جديدة</span>
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">عنوان الوحدة</label>
                <input
                  type="text"
                  placeholder="مثال: الوحدة 5: أتمتة المبيعات وتوسيع النطاق"
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">الهدف التحولي (Milestone Outcome)</label>
                <input
                  type="text"
                  placeholder="مثال: تشغيل حملات إعلانية مربحة بنظام أوتوماتيكي"
                  value={newModuleObjective}
                  onChange={(e) => setNewModuleObjective(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModule(false)}
                className="px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 text-xs hover:text-white cursor-pointer"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddModule}
                className="px-4 py-1.5 rounded-lg bg-purple-500 text-black text-xs font-bold hover:bg-purple-400 cursor-pointer"
              >
                إضافة الوحدة
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
