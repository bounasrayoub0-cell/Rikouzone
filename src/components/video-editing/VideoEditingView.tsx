import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  Video, 
  Settings, 
  Award, 
  CheckCircle2, 
  Circle, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Film, 
  Target,
  Sliders,
  Scissors
} from 'lucide-react';
import { videoEditingCurriculum } from '../../data/videoEditingCurriculum';
import { VideoTimelineSimulator } from './VideoTimelineSimulator';
import { VideoSoftwareSelector } from './VideoSoftwareSelector';
import { VideoBeforeAfterPlayer } from './VideoBeforeAfterPlayer';
import { VideoExportPresetsTool } from './VideoExportPresetsTool';
import { VideoProjectAndRoadmapView } from './VideoProjectAndRoadmapView';
import { useLanguage } from '../../i18n/LanguageContext';

interface VideoEditingViewProps {
  onNavigate: (tab: string) => void;
  onCopyText?: (text: string, label: string) => void;
}

const STORAGE_KEY_VIDEO_LESSONS = 'video_editing_completed_lessons_v1';

export const VideoEditingView: React.FC<VideoEditingViewProps> = ({ onNavigate, onCopyText }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'stages' | 'timeline' | 'software' | 'before-after' | 'presets' | 'project-quiz'>('stages');
  const [activeLessonId, setActiveLessonId] = useState<string>(videoEditingCurriculum[0].id);

  // Completed lessons tracking
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VIDEO_LESSONS);
      return saved ? JSON.parse(saved) : ['stage-1-intro'];
    } catch {
      return ['stage-1-intro'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_VIDEO_LESSONS, JSON.stringify(completedLessons));
    } catch {}
  }, [completedLessons]);

  const toggleLessonCompletion = (id: string) => {
    setCompletedLessons(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const currentLessonIndex = videoEditingCurriculum.findIndex(l => l.id === activeLessonId);
  const currentLesson = videoEditingCurriculum[currentLessonIndex] || videoEditingCurriculum[0];

  const completionPercentage = Math.round((completedLessons.length / videoEditingCurriculum.length) * 100);

  const handleNextLesson = () => {
    if (currentLessonIndex < videoEditingCurriculum.length - 1) {
      setActiveLessonId(videoEditingCurriculum[currentLessonIndex + 1].id);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setActiveLessonId(videoEditingCurriculum[currentLessonIndex - 1].id);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handleCopy = (text: string, label = 'مونتاج الفيديو') => {
    if (onCopyText) {
      onCopyText(text, label);
    }
  };

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 pb-24 selection:bg-amber-500 selection:text-black">
      {/* Top Breadcrumb */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => onNavigate('income')}
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" />
            <span>{t.nav.income}</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
            <span className="text-zinc-600">المسار:</span>
            <span className="text-amber-400">مونتاج الفيديوهات (Video Editing & Shorts)</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="relative border-b border-zinc-800/80 bg-gradient-to-b from-amber-500/10 via-zinc-950/60 to-transparent py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
              <Film className="h-3.5 w-3.5" />
              <span>دليل احتراف مونتاج الشورتس والريلز 2026</span>
            </span>
            <span className="rounded-full bg-zinc-800/80 px-3 py-1 text-xs font-semibold text-zinc-300">
              22 مرحلة تطبيقية متكاملة
            </span>
            <span className="rounded-full bg-zinc-800/80 px-3 py-1 text-xs font-semibold text-zinc-300">
              من الصفر للهاتف والكمبيوتر
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                دليل <span className="text-amber-400">مونتاج الفيديوهات (Video Editing & Shorts)</span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                تعلم كيف تبدأ مونتاج الفيديوهات القصيرة من الصفر على الهاتف والكمبيوتر، تتقن تقطيع الهواء الميت، التقريب التبادلي، الكابشنز الحركية، هندسة الصوت، وتبني معرض أعمالك وتكسب أول عميل لتقديم خدمات المونتاج.
              </p>
            </div>

            {/* Progress Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 sm:p-5 min-w-[280px] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-300">التقدم في المنهج:</span>
                <span className="text-amber-400 font-mono text-sm">{completionPercentage}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                <span>{completedLessons.length} من أصل 22 مرحلة مكتملة</span>
                {completionPercentage >= 70 && (
                  <button
                    onClick={() => {
                      setActiveTab('project-quiz');
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="text-amber-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Award className="h-3.5 w-3.5" />
                    <span>عرض الشهادة</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Tab Navigation */}
      <div className="sticky top-16 z-30 border-b border-zinc-800/90 bg-zinc-950/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
            {[
              { id: 'stages', label: 'المراحل الـ 22 التعليمية', icon: BookOpen },
              { id: 'timeline', label: 'محاكي التايم لاين التفاعلي', icon: Sliders },
              { id: 'software', label: 'محدد ومقارنة البرامج', icon: Settings },
              { id: 'before-after', label: 'المقارنة قبل وبعد المونتاج', icon: Layers },
              { id: 'presets', label: 'حاسبة التصدير ومناطق الأمان', icon: Video },
              { id: 'project-quiz', label: 'المشروع النهائي والشهادة', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    window.scrollTo({ top: 320, behavior: 'smooth' });
                  }}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        {/* TAB 1: 22 STAGES CURRICULUM */}
        {activeTab === 'stages' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar List of 22 Stages */}
            <div className="lg:col-span-4 space-y-2">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  مراحل المنهج الـ 22:
                </span>
                <span className="text-xs text-amber-400 font-bold font-mono">
                  {completedLessons.length}/22
                </span>
              </div>

              <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
                {videoEditingCurriculum.map((lesson) => {
                  const isActive = lesson.id === activeLessonId;
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveLessonId(lesson.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      className={`w-full text-right p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer select-none ${
                        isActive
                          ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                          : 'border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      <button
                        type="button"
                        aria-label="تبديل حالة الإكمال"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonCompletion(lesson.id);
                        }}
                        className="mt-0.5 shrink-0 text-zinc-500 hover:text-amber-400 transition-colors cursor-pointer"
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-400/20" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 text-[10px] text-zinc-500 font-bold">
                          <span>المرحلة {lesson.stageNumber}</span>
                          <span className="font-mono text-zinc-400">{lesson.duration}</span>
                        </div>
                        <div className="text-xs font-bold line-clamp-1 mt-0.5 text-zinc-200">
                          {lesson.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lesson Reader Area */}
            <div className="lg:col-span-8 space-y-6">
              <article className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-xl">
                {/* Header */}
                <div className="space-y-3 border-b border-zinc-800 pb-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-amber-400">
                      {currentLesson.stageTitle}
                    </span>
                    <span className="rounded-full bg-zinc-900 px-2.5 py-0.5 text-[11px] font-bold text-zinc-300 border border-zinc-800">
                      المستوى: {currentLesson.level} • {currentLesson.duration}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                    {currentLesson.title}
                  </h2>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {currentLesson.summary}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => toggleLessonCompletion(currentLesson.id)}
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                        completedLessons.includes(currentLesson.id)
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-amber-500/50'
                      }`}
                    >
                      {completedLessons.includes(currentLesson.id) ? (
                        <>
                          <Check className="h-4 w-4 stroke-[3]" />
                          <span>تم إكمال هذه المرحلة بنجاح</span>
                        </>
                      ) : (
                        <>
                          <Circle className="h-4 w-4" />
                          <span>تحديد المرحلة كمكتملة</span>
                        </>
                      )}
                    </button>

                    <div className="text-xs text-zinc-500 font-mono">
                      المرحلة {currentLesson.stageNumber} من 22
                    </div>
                  </div>
                </div>

                {/* What You Will Learn */}
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                    <Target className="h-4 w-4" />
                    <span>ما ستتعلمه في هذه المرحلة:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {currentLesson.whatYouWillLearn.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detailed Content */}
                <div className="space-y-4 text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans border-b border-zinc-800 pb-8 whitespace-pre-line">
                  {currentLesson.detailedContent}
                </div>

                {/* Practical Example */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Sparkles className="h-4 w-4" />
                    <span>مثال تطبيقي عملي: {currentLesson.practicalExample.title}</span>
                  </div>

                  {currentLesson.practicalExample.before && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 space-y-1.5">
                        <span className="text-[11px] font-bold text-rose-400 block">قبل التعديل (تصوير خام / ركيك):</span>
                        <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                          {currentLesson.practicalExample.before}
                        </p>
                      </div>

                      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1.5">
                        <span className="text-[11px] font-bold text-emerald-400 block">بعد المونتاج الاحترافي:</span>
                        <p className="text-xs text-white leading-relaxed font-bold">
                          {currentLesson.practicalExample.after}
                        </p>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/80 pt-3">
                    💡 <strong>تحليل الفارق:</strong> {currentLesson.practicalExample.explanation}
                  </p>
                </div>

                {/* Practical Exercise */}
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <Scissors className="h-4 w-4" />
                    <span>تمرين تطبيقي فوري: {currentLesson.exercise.task}</span>
                  </div>

                  <ul className="space-y-1 text-xs text-zinc-300">
                    {currentLesson.exercise.instructions.map((inst, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-amber-400">{idx + 1}.</span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-xl bg-zinc-950/80 p-3.5 border border-zinc-800/80 space-y-1 mt-2">
                    <span className="text-[11px] font-bold text-emerald-400 block">نموذج الحل المقترح:</span>
                    <p className="text-xs text-zinc-200 leading-relaxed">
                      {currentLesson.exercise.sampleSolution}
                    </p>
                  </div>
                </div>

                {/* Stage Checklist */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Checklist التأكد من إتقان هذه المرحلة:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-400">
                    {currentLesson.checklist.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <button
                    onClick={handlePrevLesson}
                    disabled={currentLessonIndex === 0}
                    className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span>المرحلة السابقة</span>
                  </button>

                  <button
                    onClick={handleNextLesson}
                    disabled={currentLessonIndex === videoEditingCurriculum.length - 1}
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2 text-xs font-black text-black hover:bg-amber-400 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-md shadow-amber-500/20"
                  >
                    <span>المرحلة التالية</span>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
              </article>
            </div>
          </div>
        )}

        {/* TAB 2: TIMELINE SIMULATOR */}
        {activeTab === 'timeline' && (
          <VideoTimelineSimulator onCopyText={handleCopy} />
        )}

        {/* TAB 3: SOFTWARE SELECTOR */}
        {activeTab === 'software' && (
          <VideoSoftwareSelector onCopyText={handleCopy} />
        )}

        {/* TAB 4: BEFORE / AFTER */}
        {activeTab === 'before-after' && (
          <VideoBeforeAfterPlayer onCopyText={handleCopy} />
        )}

        {/* TAB 5: EXPORT PRESETS */}
        {activeTab === 'presets' && (
          <VideoExportPresetsTool onCopyText={handleCopy} />
        )}

        {/* TAB 6: PROJECT & QUIZ */}
        {activeTab === 'project-quiz' && (
          <VideoProjectAndRoadmapView onCopyText={handleCopy} />
        )}
      </main>
    </div>
  );
};
