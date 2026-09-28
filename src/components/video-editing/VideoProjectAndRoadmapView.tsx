import React, { useState } from 'react';
import { 
  Award, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  Download, 
  FileCheck, 
  Sparkles, 
  Film,
  Send,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { videoEditingFinalQuiz } from '../../data/videoEditingToolsData';

interface VideoProjectAndRoadmapViewProps {
  onCopyText?: (text: string, label: string) => void;
}

const STORAGE_KEY_ROADMAP = 'video_editing_roadmap_days_v1';

export const VideoProjectAndRoadmapView: React.FC<VideoProjectAndRoadmapViewProps> = ({ onCopyText }) => {
  const [activeSubTab, setActiveSubTab] = useState<'project' | 'roadmap' | 'outreach' | 'quiz'>('project');

  // 14-Step Project State
  const [projectData, setProjectData] = useState({
    projectName: 'ريلز شورتس: 3 عادات صباحية لمضاعفة طاقتك',
    targetPlatform: 'Instagram Reels & TikTok (9:16)',
    rawFootageDesc: 'تسجيل دقيقة و 20 ثانية لمدرب لياقة في مكتبه، مع سكتات وتنحنح في المنتصف.',
    hookType: 'هوك صدمة بصري ولفظي: "توقف عن شرب القهوة أول ما تصحى!" مع زوم سريع.',
    cuttingNotes: 'حذف 35 ثانية من الفراغات؛ تحويل الفيديو إلى 28 ثانية رشيقة ومترابطة.',
    punchInPoints: 'تطبيق Punch-in Zoom (115%) عند الثانية 4، والثانية 12، والثانية 21.',
    captionsStyle: 'تفريغ بالذكاء الاصطناعي، خط كوفي عريض، مع تلوين كلمات (كارثة، طاقة، فوراً) بالأصفر.',
    brollClips: 'لقطة B-roll لكوب قهوة ينسكب، ولقطة شاشة لتطبيق تنظيم الماء.',
    audioDesign: 'تنقية الصوت بـ Adobe Podcast، موسيقى Hip-hop عند -22dB، ومؤثرات Pop و Whoosh.',
    colorSettings: 'Exposure +0.3, Temp -6 (إزالة الاصفرار)، و Saturation +8.',
    ctaEnding: 'احفظ الفيديو لتجربه غداً صباحاً واكتب (طاقة) في التعليقات لأرسل لك جدول الروتين.',
    exportSpecs: '1080x1920, 30fps, MP4 (H.264), 16 Mbps Bitrate.',
    caseStudySummary: 'مشروع محاكاة كامل حول مقطع بطيء إلى فيديو شورتس عالي الجاذبية بمعدل احتفاظ متوقع 85%.'
  });

  const [copiedProject, setCopiedProject] = useState<boolean>(false);

  // Roadmap State
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ROADMAP);
      return saved ? JSON.parse(saved) : [1, 2];
    } catch {
      return [1, 2];
    }
  });

  const toggleDay = (day: number) => {
    const updated = completedDays.includes(day)
      ? completedDays.filter(d => d !== day)
      : [...completedDays, day];
    setCompletedDays(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ROADMAP, JSON.stringify(updated));
    } catch {}
  };

  // Quiz State
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('مونتير محترف');

  const quizScore = videoEditingFinalQuiz.reduce((score, q) => {
    return userAnswers[q.id] === q.correctAnswer ? score + 1 : score;
  }, 0);

  const passedQuiz = submittedQuiz && quizScore >= 8;

  const handleCopyProject = () => {
    const summary = `دراسة حالة مشروع المونتاج النهائي (Video Editing Case Study):
-----------------------------------------------------------------
اسم المشروع: ${projectData.projectName}
المنصة والنسبة: ${projectData.targetPlatform}
وصف اللقطات الخام: ${projectData.rawFootageDesc}
نوع الهوك الافتتاحي: ${projectData.hookType}
التقطيع والإيقاع: ${projectData.cuttingNotes}
نقاط التقريب التبادلي: ${projectData.punchInPoints}
أسلوب الترجمة والكابشنز: ${projectData.captionsStyle}
لقطات الـ B-Roll: ${projectData.brollClips}
الهندسة والتصميم الصوتي: ${projectData.audioDesign}
تصحيح الألوان: ${projectData.colorSettings}
الدعوة للعمل (CTA): ${projectData.ctaEnding}
إعدادات التصدير: ${projectData.exportSpecs}
ملخص دراسة الحالة للبورتفوليو: ${projectData.caseStudySummary}
`;
    navigator.clipboard.writeText(summary);
    setCopiedProject(true);
    if (onCopyText) onCopyText('تم نسخ دراسة حالة المشروع النهائي بنجاح!', 'المشروع النهائي');
    setTimeout(() => setCopiedProject(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-950 p-6 sm:p-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
            <Award className="h-3.5 w-3.5" />
            <span>التطبيق الشامل والشهادة المعتمدة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            المشروع النهائي، خطة الـ 30 يوماً، والشهادة الرقمية
          </h2>
          <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
            وثق أول دراسة حالة احترافية لبورتفوليو أعمالك، تتبع جدولك اليومي لمدة 30 يوماً، واجتز الاختبار النهائي لتحصل على شهادة إتمام مسار مونتاج الفيديوهات القصيرة (Shorts & Reels).
          </p>
        </div>

        {/* Sub Nav */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('project')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'project'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            المشروع النهائي (14 خطوة عملية)
          </button>
          <button
            onClick={() => setActiveSubTab('roadmap')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'roadmap'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            خطة العمل الـ 30 يوماً ({completedDays.length}/30 يوم)
          </button>
          <button
            onClick={() => setActiveSubTab('outreach')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'outreach'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            قوالب المراسلة والعينة المجانية
          </button>
          <button
            onClick={() => setActiveSubTab('quiz')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'quiz'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            الاختبار النهائي والشهادة الرقمية
          </button>
        </div>
      </div>

      {/* 1. FINAL VIDEO PROJECT BUILDER */}
      {activeSubTab === 'project' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-white">
                هيكلة مشروع المونتاج المتكامل (14 خطوة عملية للبورتفوليو)
              </h3>
              <p className="text-xs text-zinc-400">
                وثق خطوات عملك بالأسفل لإنشاء ملف دراسة حالة (Case Study) يقنع أي صانع محتوى بالتعاقد معك فوراً.
              </p>
            </div>
            <button
              onClick={handleCopyProject}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all cursor-pointer shadow-md shadow-amber-500/20 shrink-0"
            >
              {copiedProject ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copiedProject ? 'تم النسخ!' : 'تصدير دراسة الحالة'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">1. اسم وعنوان المشروع:</label>
              <input
                type="text"
                value={projectData.projectName}
                onChange={(e) => setProjectData({ ...projectData, projectName: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 font-bold"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">2. المنصة المستهدفة والأبعاد:</label>
              <input
                type="text"
                value={projectData.targetPlatform}
                onChange={(e) => setProjectData({ ...projectData, targetPlatform: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-amber-400">3. وصف اللقطات الخام قبل المونتاج (Raw Footage):</label>
              <textarea
                rows={2}
                value={projectData.rawFootageDesc}
                onChange={(e) => setProjectData({ ...projectData, rawFootageDesc: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">4. هندسة الهوك في أول 3 ثوانٍ:</label>
              <input
                type="text"
                value={projectData.hookType}
                onChange={(e) => setProjectData({ ...projectData, hookType: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">5. تقطيع الهواء الميت وضبط الإيقاع:</label>
              <input
                type="text"
                value={projectData.cuttingNotes}
                onChange={(e) => setProjectData({ ...projectData, cuttingNotes: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">6. التقريب التبادلي (Punch-in Zoom Points):</label>
              <input
                type="text"
                value={projectData.punchInPoints}
                onChange={(e) => setProjectData({ ...projectData, punchInPoints: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">7. نمط الترجمة والكابشنز الحركية:</label>
              <input
                type="text"
                value={projectData.captionsStyle}
                onChange={(e) => setProjectData({ ...projectData, captionsStyle: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">8. لقطات الـ B-Roll والرسوم المضافة:</label>
              <input
                type="text"
                value={projectData.brollClips}
                onChange={(e) => setProjectData({ ...projectData, brollClips: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">9. هندسة الصوت وخفض الموسيقى (Ducking):</label>
              <input
                type="text"
                value={projectData.audioDesign}
                onChange={(e) => setProjectData({ ...projectData, audioDesign: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">10. تصحيح الألوان (Color Correction):</label>
              <input
                type="text"
                value={projectData.colorSettings}
                onChange={(e) => setProjectData({ ...projectData, colorSettings: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">11. الخاتمة والدعوة للعمل (CTA):</label>
              <input
                type="text"
                value={projectData.ctaEnding}
                onChange={(e) => setProjectData({ ...projectData, ctaEnding: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-amber-400">12. ملخص دراسة الحالة للبورتفوليو:</label>
              <textarea
                rows={2}
                value={projectData.caseStudySummary}
                onChange={(e) => setProjectData({ ...projectData, caseStudySummary: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. 30-DAY ROADMAP */}
      {activeSubTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-zinc-950 border border-zinc-800 p-5">
            <div>
              <h3 className="text-base font-black text-white">خطة العمل اليومية (30 يوماً للانطلاق في المونتاج)</h3>
              <p className="text-xs text-zinc-400">انقر على أي يوم لتحديده كمكتمل وتتبع إنجازك العملي.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-amber-400 font-mono">
                {Math.round((completedDays.length / 30) * 100)}% مكتمل
              </span>
              <div className="w-28 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${(completedDays.length / 30) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { week: 'الأسبوع 1: إتقان التايم لاين والسرعة', days: [
                { day: 1, task: 'تثبيت CapCut وتجربة استيراد الفيديوهات وفهم التايم لاين' },
                { day: 2, task: 'إتقان اختصارات Split و Delete وحفظ موضع اليدين' },
                { day: 3, task: 'تمرين تقطيع الهواء الميت والسكتات من تسجيل تجريبي' },
                { day: 4, task: 'تطبيق التكبير التبادلي (Punch-in Zoom 115%)' },
                { day: 5, task: 'تمرين تسريع وإبطاء المقاطع وضبط التوقيت السلس' },
                { day: 6, task: 'محاكاة تقطيع دقيقة واحدة ليوتيوبر مشهور' },
                { day: 7, task: 'مراجعة أسبوعية وتصدير أول فيديو نظيف 1080p' }
              ]},
              { week: 'الأسبوع 2: الكابشنز، الصوت والـ B-Roll', days: [
                { day: 8, task: 'توليد Auto Captions وتصحيح الكلمات وتلوين الكلمات الهامة' },
                { day: 9, task: 'ضبط حجم وموقع الترجمة داخل منطقة الأمان (Safe Area)' },
                { day: 10, task: 'تنقية الصوت عبر Adobe Podcast وموازنة الديسيبل' },
                { day: 11, task: 'تطبيق خفض الموسيقى التلقائي (Audio Ducking)' },
                { day: 12, task: 'إضافة مؤثرات Whoosh و Pop الصوتية المتزامنة' },
                { day: 13, task: 'تحميل ودمج لقطات B-roll مجانية من Pexels في مسار V2' },
                { day: 14, task: 'إنتاج شورتس متكامل مدته 35 ثانية بكافة العناصر' }
              ]},
              { week: 'الأسبوع 3: تجهيز البورتفوليو والعينات الخمس', days: [
                { day: 15, task: 'إنتاج عينة Talking Head احترافية للبورتفوليو' },
                { day: 16, task: 'إنتاج عينة إعلان منتج تجارة إلكترونية سريع' },
                { day: 17, task: 'إنتاج عينة UGC Style لشخص يجرب منتجاً' },
                { day: 18, task: 'إنتاج عينة بودكاست مؤثر بموسيقى درامية' },
                { day: 19, task: 'إنتاج فيديو شاشة منقسمة للمقارنة قبل وبعد' },
                { day: 20, task: 'رفع العينات على صفحة Notion أو Google Drive مرتب' },
                { day: 21, task: 'تحديد أسعار الباقات وشروط التعديل والتسليم' }
              ]},
              { week: 'الأسبوع 4: المراسلة وحصد أول عميل', days: [
                { day: 22, task: 'اختيار 3 صناع محتوى يوتيوب يحتاجون فيديوهات قصيرة' },
                { day: 23, task: 'مونتاج عينة مجانية مصممة خصيصاً لأول صانع محتوى' },
                { day: 24, task: 'إرسال أول رسالة هدية قيمة مجانية مخصصة' },
                { day: 25, task: 'مونتاج وإرسال العينة المجانية لصانع المحتوى الثاني' },
                { day: 26, task: 'إرسال رسائل المتابعة اللطيفة (Follow-up) بعد 3 أيام' },
                { day: 27, task: 'مناقشة أول عرض أو مكالمة استكشافية حول الباقات' },
                { day: 28, task: 'الاتفاق على باقة شهرية تجريبية واستلام 50% مقدماً' },
                { day: 29, task: 'مونتاج وتسليم أول فيديو مدفوع للعميل بملاحظاته' },
                { day: 30, task: 'توثيق أول قصة نجاح حقيقية وإضافتها لمعرض الأعمال' }
              ]}
            ].map((section, sIdx) => (
              <div key={sIdx} className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-3">
                <h4 className="text-xs font-black text-amber-400 border-b border-zinc-800/80 pb-2">
                  {section.week}
                </h4>
                <div className="space-y-1.5">
                  {section.days.map(d => {
                    const isDone = completedDays.includes(d.day);
                    return (
                      <div
                        key={d.day}
                        onClick={() => toggleDay(d.day)}
                        role="button"
                        tabIndex={0}
                        className={`flex items-start gap-2.5 p-2 rounded-xl border text-right transition-all cursor-pointer select-none text-xs ${
                          isDone
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-zinc-200'
                            : 'bg-zinc-900/40 border-zinc-800/70 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Circle className="h-3.5 w-3.5 text-zinc-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-bold font-mono text-[10px] text-amber-400 ml-1">اليوم {d.day}:</span>
                          <span>{d.task}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. OUTREACH & PROPOSALS */}
      {activeSubTab === 'outreach' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-bold text-amber-400">1. رسالة العينة المجانية المخصصة (The Free Sample Pitch)</span>
                <button
                  onClick={() => {
                    const text = `موضوع الإيميل: مقطع ريلز ممنتج جاهز للنشر من حلقتك الأخيرة (هدية لك) 🎁

مرحباً [اسم صانع المحتوى]،

أتابع برنامجك بشغف وأعجبني جداً طرحك في الدقيقة 14 حول [موضوع المقطع].

استقطعت هذه الدقيقة وأعدت صياغتها كفيديو قصير عمودي بإيقاع ديناميكي وكابشنز واضحة لتناسب خوارزميات ريلز وتيك توك:
👉 [رابط Google Drive لمشاهدة وتحميل الفيديو]

الفيديو ملكك بالكامل وتستطيع نشره في حسابك اليوم.

إذا أعجبتك النتيجة ورغبت في تفريغ وقتك والتركيز فقط على التسجيل، أستطيع تجهيز 12 مقطعاً شهرياً بنفس هذه الجودة لحسابك.

أتمنى لك كل التوفيق والنجاح!`;
                    navigator.clipboard.writeText(text);
                    if (onCopyText) onCopyText('تم نسخ قالب رسالة العينة المجانية!', 'قوالب المراسلة');
                  }}
                  className="text-xs text-amber-400 hover:underline font-bold cursor-pointer"
                >
                  نسخ القالب
                </button>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans whitespace-pre-line bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
{`موضوع الإيميل: مقطع ريلز ممنتج جاهز للنشر من حلقتك الأخيرة (هدية لك) 🎁

مرحباً [اسم صانع المحتوى]،

أتابع برنامجك بشغف وأعجبني جداً طرحك في الدقيقة 14 حول [موضوع المقطع].

استقطعت هذه الدقيقة وأعدت صياغتها كفيديو قصير عمودي بإيقاع ديناميكي وكابشنز واضحة لتناسب خوارزميات ريلز وتيك توك:
👉 [رابط Google Drive لمشاهدة وتحميل الفيديو]

الفيديو ملكك بالكامل وتستطيع نشره في حسابك اليوم.

إذا أعجبتك النتيجة ورغبت في تفريغ وقتك والتركيز فقط على التسجيل، أستطيع تجهيز 12 مقطعاً شهرياً بنفس هذه الجودة لحسابك.`}
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-bold text-amber-400">2. استبيان بدء العمل مع عميل جديد (Client Onboarding)</span>
                <button
                  onClick={() => {
                    const text = `استبيان بدء مشروع المونتاج:
1. ما هو الهدف الأساسي من الفيديو (مبيعات، متابعين جدد، أم تثقيف)؟
2. هل لديك حساب أو فيديو معين يعجبك أسلوب مونتاجه وتود محاكاته؟
3. ما هي خطوط وألوان علامتك التجارية المفضلة؟
4. هل تفضل ظهور الترجمة كلمة بكلمة سريعة أم جمل قصيرة؟
5. ما هو موعد النشر النهائي المستهدف؟`;
                    navigator.clipboard.writeText(text);
                    if (onCopyText) onCopyText('تم نسخ استبيان العميل الجديد!', 'قوالب المراسلة');
                  }}
                  className="text-xs text-amber-400 hover:underline font-bold cursor-pointer"
                >
                  نسخ الاستبيان
                </button>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans whitespace-pre-line bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
{`استبيان بدء مشروع المونتاج:
1. ما هو الهدف الأساسي من الفيديو (مبيعات، متابعين جدد، أم تثقيف)؟
2. هل لديك حساب أو فيديو معين يعجبك أسلوب مونتاجه وتود محاكاته؟
3. ما هي خطوط وألوان علامتك التجارية المفضلة؟
4. هل تفضل ظهور الترجمة كلمة بكلمة سريعة أم جمل قصيرة؟
5. ما هو موعد النشر النهائي المستهدف؟`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. FINAL QUIZ & CERTIFICATE */}
      {activeSubTab === 'quiz' && (
        <div className="space-y-8">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
              <div>
                <h3 className="text-xl font-black text-white">الاختبار النهائي لمسار مونتاج الفيديوهات القصيرة</h3>
                <p className="text-xs text-zinc-400">10 أسئلة تخصصية تقيس فهمك العميق للتايم لاين، الصوت، الألوان، والتصدير (درجة النجاح: 80% فأعلى).</p>
              </div>

              {submittedQuiz && (
                <div className={`px-4 py-2 rounded-xl border text-xs font-black font-mono ${
                  passedQuiz ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                }`}>
                  النتيجة: {quizScore} من 10 ({quizScore * 10}%) - {passedQuiz ? 'ناجح ومؤهل للشهادة 🎉' : 'حاول مرة أخرى'}
                </div>
              )}
            </div>

            {/* Questions list */}
            <div className="space-y-6">
              {videoEditingFinalQuiz.map((q, idx) => {
                const selected = userAnswers[q.id];
                const isCorrect = selected === q.correctAnswer;

                return (
                  <div key={q.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-relaxed">
                        {q.question}
                      </h4>
                    </div>

                    <div className="space-y-2 pt-1 pr-8">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selected === optIdx;
                        let optStyle = 'border-zinc-800 bg-zinc-950/60 text-zinc-300 hover:border-zinc-700';

                        if (submittedQuiz) {
                          if (optIdx === q.correctAnswer) {
                            optStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold';
                          } else if (isChosen && !isCorrect) {
                            optStyle = 'border-rose-500 bg-rose-500/10 text-rose-300';
                          }
                        } else if (isChosen) {
                          optStyle = 'border-amber-500 bg-amber-500/10 text-white font-bold';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => {
                              if (!submittedQuiz) {
                                setUserAnswers(prev => ({ ...prev, [q.id]: optIdx }));
                              }
                            }}
                            role="button"
                            tabIndex={0}
                            className={`p-3 rounded-xl border text-right text-xs transition-all cursor-pointer select-none flex items-center justify-between ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {submittedQuiz && optIdx === q.correctAnswer && (
                              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div className="pr-8 pt-2">
                        <p className="text-[11px] text-zinc-400 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 leading-relaxed">
                          💡 <strong>الشرح والتوضيح:</strong> {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Submit Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <button
                onClick={() => {
                  if (submittedQuiz) {
                    setSubmittedQuiz(false);
                    setUserAnswers({});
                  } else {
                    setSubmittedQuiz(true);
                  }
                }}
                disabled={!submittedQuiz && Object.keys(userAnswers).length < 10}
                className="rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-black text-black hover:bg-amber-400 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
              >
                {submittedQuiz ? 'إعادة الاختبار' : 'تسليم الإجابات واعتماد النتيجة'}
              </button>

              {!submittedQuiz && Object.keys(userAnswers).length < 10 && (
                <span className="text-xs text-zinc-500">
                  يرجى الإجابة عن كافة الأسئلة الـ 10 للتسليم ({Object.keys(userAnswers).length}/10)
                </span>
              )}
            </div>
          </div>

          {/* Certificate Output */}
          {passedQuiz && (
            <div className="rounded-3xl border-2 border-amber-500/60 bg-gradient-to-b from-amber-500/10 via-zinc-950 to-zinc-950 p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/40 mb-2">
                    <Award className="h-4 w-4" />
                    <span>شهادة إتمام معتمدة</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    شهادة إتقان مونتاج الفيديوهات القصيرة (Short-Form Video Editing)
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    مُنحت لاجتياز كافة المراحل التدريبية وتطبيق أساسيات التايم لاين وهندسة الصوت واختبار المنهج بدرجة تفوق.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="اكتب اسمك للشهادة"
                    className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 cursor-pointer shadow-md shadow-amber-500/20 shrink-0"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>طباعة / حفظ PDF</span>
                  </button>
                </div>
              </div>

              {/* Certificate Canvas */}
              <div className="rounded-2xl border-2 border-amber-500/40 bg-zinc-900/60 p-8 sm:p-12 text-center space-y-6 relative">
                <div className="text-xs font-black tracking-widest text-amber-400 uppercase">
                  CERTIFICATE OF COMPLETION • شهادة إتمام مسار مهني
                </div>

                <div className="text-sm text-zinc-300">
                  تشهد منصة ريكو للريادة والعمل الحر بأن المونتير:
                </div>

                <div className="text-3xl sm:text-4xl font-black text-amber-300 font-serif underline decoration-amber-500/40 underline-offset-8">
                  {studentName || 'مونتير محترف'}
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
                  قد أتم بنجاح المسار التطبيقي الكامل لـ <strong>مونتاج الفيديوهات القصيرة (Short-form Video Editing & UGC)</strong>، وأتقن تقطيع الهواء الميت، التقريب التبادلي (Punch-ins)، الكابشنز الحركية، هندسة الصوت والـ Ducking، تصحيح الألوان، وإعدادات التصدير المثالية لمنصات TikTok و Instagram Reels و YouTube Shorts.
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-zinc-800 text-[11px] text-zinc-400">
                  <div>
                    <span className="block font-bold text-zinc-200">الاعتماد:</span>
                    <span>مسار ريكو للريادة وصناعة المحتوى</span>
                  </div>
                  <div>
                    <span className="block font-bold text-zinc-200">النتيجة في الاختبار:</span>
                    <span className="font-mono text-emerald-400 font-bold">{quizScore * 10}% ممتاز</span>
                  </div>
                  <div>
                    <span className="block font-bold text-zinc-200">تاريخ الإصدار:</span>
                    <span className="font-mono">{new Date().toISOString().split('T')[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
