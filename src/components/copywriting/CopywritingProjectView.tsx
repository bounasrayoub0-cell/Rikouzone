import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  Sparkles, 
  HelpCircle,
  FileCheck,
  Download,
  RotateCcw,
  Target
} from 'lucide-react';
import { copywritingFinalQuiz } from '../../data/copywritingToolsData';

interface CopywritingProjectViewProps {
  onCopyText?: (text: string) => void;
}

export const CopywritingProjectView: React.FC<CopywritingProjectViewProps> = ({ onCopyText }) => {
  const [activeSubTab, setActiveSubTab] = useState<'project' | 'roadmap' | 'outreach' | 'quiz'>('project');

  // 13-step project state
  const [projectData, setProjectData] = useState({
    productName: 'حقيبة سفر ذكية NomadBag',
    targetAudience: 'المسافرون الدائمون لرحلات العمل والرحالة الرقميون',
    painPoints: 'الانتظار الطويل عند سير الأمتعة، تلف الحاسوب، وثقل الحقيبة على الكتف',
    valueProp: 'حقيبة تجمع أسبوع ملابس وتدخل كابينة الطائرة وتفتح بـ 180 درجة للتفتيش السريع',
    framework: 'PAS (Problem - Agitate - Solve)',
    headline: 'سافر خفيفاً: حقيبة تتسع لأسبوع عمل وتمرر تفتيش المطار في 30 ثانية',
    adCopy: 'هل سئمت تضييع 45 دقيقة عند سير الأمتعة بعد كل رحلة طيران؟ حقيبتنا صُممت بمقاس الكابينة الرسمي مع جيب لابتوب TSA مبطن...',
    landingPageHero: 'عنوان: ودع طوابير الأمتعة إلى الأبد. زر: اطلب حقيبتك الآن مع شحن مجاني',
    emailCopy: 'موضوع: سر تخطي طوابير المطار دون شحن حقائبك... محتوى: مرحباً [الاسم]، رحلتي الأسبوع الماضي أثبتت لي أن الأمتعة الكثيرة تسرق متعة السفر...',
    ctaButton: 'احصل على NomadBag اليوم مع ضمان مدى الحياة',
    revisionNotes: 'تمت إزالة الكلمات الزائدة، وضبط الضمان ليكون صريحاً ومدعوماً بخدمة العملاء',
    caseStudySummary: 'مشروع محاكاة تدريبي يبرز إعادة صياغة زاوية حقائب السفر من مجرد متانة القماش إلى ميزة توفير الوقت والراحة في المطارات'
  });

  const [copiedProject, setCopiedProject] = useState(false);

  // Roadmap tasks state
  const ROADMAP_STORAGE_KEY = 'copywriting_roadmap_tasks_v1';
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(ROADMAP_STORAGE_KEY);
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
      localStorage.setItem(ROADMAP_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  };

  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('متعلم محترف');

  const quizScore = copywritingFinalQuiz.reduce((score, q) => {
    return userAnswers[q.id] === q.correctAnswer ? score + 1 : score;
  }, 0);

  const passedQuiz = submittedQuiz && quizScore >= 8;

  const handleCopyProject = () => {
    const text = `ملف المشروع النهائي للكتابة الإعلانية (Final Copywriting Project Case Study):
----------------------------------------------------------------------
1. المنتج / الخدمة: ${projectData.productName}
2. الجمهور المستهدف: ${projectData.targetAudience}
3. نقاط الألم الحارقة: ${projectData.painPoints}
4. العرض والقيمة المقترحة: ${projectData.valueProp}
5. الإطار الإعلاني: ${projectData.framework}
6. العنوان الرئيسي (Headline): ${projectData.headline}
7. نص الإعلان (Ad Copy):
${projectData.adCopy}
8. نصوص صفحة الهبوط (Landing Page Hero):
${projectData.landingPageHero}
9. نص الإيميل التسويقي (Email Copy):
${projectData.emailCopy}
10. زر الدعوة للعمل (CTA): ${projectData.ctaButton}
11. مراجعة التحرير والمصداقية: ${projectData.revisionNotes}
12. ملخص دراسة الحالة للبورتفوليو: ${projectData.caseStudySummary}
`;
    navigator.clipboard.writeText(text);
    setCopiedProject(true);
    if (onCopyText) onCopyText('تم نسخ دراسة حالة المشروع النهائي بنجاح!');
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
            المشروع النهائي، خطة الـ 30 يوماً، والاختبار المعتمد
          </h2>
          <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
            طبق ما تعلمته في مشروع متكامل من 13 خطوة، تتبع جدولك اليومي لمدة 30 يوماً، واجتز الاختبار النهائي لتحصل على شهادة إتمام مسار الكتابة الإعلانية والإقناعية.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('project')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'project'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            المشروع النهائي (13 خطوة عملية)
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
            قوالب المراسلة والعروض (Outreach & Proposals)
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

      {/* 1. FINAL PROJECT BUILDER */}
      {activeSubTab === 'project' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-white">
                بناء دراسة حالة متكاملة للبورتفوليو (13 خطوة من الصفر)
              </h3>
              <p className="text-xs text-zinc-400">
                املأ الخطوات بالأسفل لإنشاء ملف متكامل لإثبات قدرتك الإعلانية أمام أول عميل حقيقي.
              </p>
            </div>
            <button
              onClick={handleCopyProject}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all cursor-pointer shadow-md shadow-amber-500/20 shrink-0"
            >
              {copiedProject ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copiedProject ? 'تم النسخ!' : 'تصدير ونسخ المشروع كاملاً'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">1. اسم المنتج أو الخدمة:</label>
              <input
                type="text"
                value={projectData.productName}
                onChange={(e) => setProjectData({ ...projectData, productName: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">2. الجمهور المستهدف بدقة (Target Audience):</label>
              <input
                type="text"
                value={projectData.targetAudience}
                onChange={(e) => setProjectData({ ...projectData, targetAudience: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-amber-400">3. نقاط الألم الحارقة المستخرجة من البحث (Pain Points):</label>
              <textarea
                rows={2}
                value={projectData.painPoints}
                onChange={(e) => setProjectData({ ...projectData, painPoints: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">4. القيمة المقترحة والعرض (Value Proposition & Offer):</label>
              <input
                type="text"
                value={projectData.valueProp}
                onChange={(e) => setProjectData({ ...projectData, valueProp: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">5. الإطار الإعلاني المعتمد (Framework):</label>
              <input
                type="text"
                value={projectData.framework}
                onChange={(e) => setProjectData({ ...projectData, framework: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-amber-400">6. العنوان الرئيسي والهوك الصادم (Winning Headline):</label>
              <input
                type="text"
                value={projectData.headline}
                onChange={(e) => setProjectData({ ...projectData, headline: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 font-bold"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-amber-400">7. نص الإعلان الممول المكتمل (Ad Copy):</label>
              <textarea
                rows={3}
                value={projectData.adCopy}
                onChange={(e) => setProjectData({ ...projectData, adCopy: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">8. نص واجهة صفحة الهبوط (Landing Page Hero):</label>
              <textarea
                rows={3}
                value={projectData.landingPageHero}
                onChange={(e) => setProjectData({ ...projectData, landingPageHero: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">9. نص البريد الإلكتروني التسويقي (Email Copy):</label>
              <textarea
                rows={3}
                value={projectData.emailCopy}
                onChange={(e) => setProjectData({ ...projectData, emailCopy: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">10. زر الدعوة للعمل والضمان (CTA & Guarantee):</label>
              <input
                type="text"
                value={projectData.ctaButton}
                onChange={(e) => setProjectData({ ...projectData, ctaButton: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
              <label className="text-xs font-bold text-amber-400">11. ملاحظات التحرير وحذف الحشو (Revision Notes):</label>
              <input
                type="text"
                value={projectData.revisionNotes}
                onChange={(e) => setProjectData({ ...projectData, revisionNotes: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-amber-400">12. ملخص دراسة الحالة للبورتفوليو (Portfolio Case Study):</label>
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
              <h3 className="text-base font-black text-white">خطة العمل اليومية (30 يوماً من الصفر إلى أول عميل)</h3>
              <p className="text-xs text-zinc-400">انقر على أي يوم لتحديده كمكتمل وتتبع نسبة إنجاز خطتك العملية.</p>
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
              { week: 'الأسبوع 1: فك شفرة السوق وبناء الـ Swipe File', days: [
                { day: 1, task: 'إنهاء الدروس 1 إلى 3 وتدوين المفاهيم الأساسية' },
                { day: 2, task: 'تطبيق تمرين Customer Avatar لشخصية عميل تعرفه' },
                { day: 3, task: 'دخول Facebook Ad Library وتحليل 10 إعلانات ناجحة' },
                { day: 4, task: 'استخراج تعليقات 2 و 3 نجوم من أمازون لمنتج شائع' },
                { day: 5, task: 'إنشاء مجلد Swipe File في Notion وتصنيف أول 15 عينة' },
                { day: 6, task: 'كتابة 15 هوك مختلف لمنتج واحد باستخدام أطر الهوكات' },
                { day: 7, task: 'مراجعة أسبوعية وتلخيص الفروق بين الـ Hook الرديء والقوي' }
              ]},
              { week: 'الأسبوع 2: الممارسة المكثفة وصياغة المسودات', days: [
                { day: 8, task: 'كتابة نص إعلان بإطار PAS لمنتج تجارة إلكترونية' },
                { day: 9, task: 'كتابة نص إعلان بإطار AIDA لكورس تعليمي أو كتاب' },
                { day: 10, task: 'كتابة نص إعلان بإطار BAB لتطبيق هاتف ذكي' },
                { day: 11, task: 'صياغة واجهة صفحة هبوط كاملة (Hero + Benefits)' },
                { day: 12, task: 'كتابة قسم FAQ يفكك 5 اعتراضات سعرية وشكوك' },
                { day: 13, task: 'صياغة سلسلة بريدية من 3 إيميلات (ترحيب، قصة، وعرض)' },
                { day: 14, task: 'تطبيق تشيك ليست التحرير على كافة مسودات الأسبوع' }
              ]},
              { week: 'الأسبوع 3: تجهيز البورتفوليو والمنظومة المهنية', days: [
                { day: 15, task: 'اختيار أفضل 3 عينات وتنسيقها كـ Spec Work' },
                { day: 16, task: 'كتابة الشرح التحليلي (Breakdown) لكل عينة في البورتفوليو' },
                { day: 17, task: 'تصميم صفحة Notion أو ملف PDF لعرض البورتفوليو' },
                { day: 18, task: 'تحديد باقات الخدمات الثلاث (إعلانات، إيميلات، صفحات هبوط)' },
                { day: 19, task: 'كتابة نموذج العرض السعري والشروط وعدد جولات التعديل' },
                { day: 20, task: 'تحديث حساب لينكد إن وبروفايل منصات العمل الحر' },
                { day: 21, task: 'إعداد جدول تتبع التواصل (Outreach CRM Tracker)' }
              ]},
              { week: 'الأسبوع 4: التنفيذ الميداني وحصد أول مشروع', days: [
                { day: 22, task: 'البحث عن أول 3 متاجر تطلق إعلانات ضعيفة في Ad Library' },
                { day: 23, task: 'كتابة هوكين بديلين وإرسال أول رسالة قيمة مجانية مخصصة' },
                { day: 24, task: 'تسجيل فيديو Loom قصير مدته دقيقتان لمتجر ثانٍ' },
                { day: 25, task: 'التواصل مع متجرين إضافيين وتوثيق المراسلات' },
                { day: 26, task: 'إرسال رسائل المتابعة اللطيفة (Follow-up) للمتواصل معهم سابقاً' },
                { day: 27, task: 'إجراء أول مكالمة استكشافية أو مناقشة أول مقترح مكتوب' },
                { day: 28, task: 'تقديم مقترح عمل مدفوع أو تجريبي بنظام مشاركة النتائج' },
                { day: 29, task: 'بدء تنفيذ المشروع الأول وتسليمه بملاحظات واضحة' },
                { day: 30, task: 'طلب مراجعة وتقييم وتوثيق أول دراسة حالة حقيقية' }
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
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleDay(d.day);
                          }
                        }}
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
            {/* Template 1: Loom / Value First */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-bold text-amber-400">1. رسالة فيديو القيمة المجانية (Loom Audit)</span>
                <button
                  onClick={() => {
                    const text = `مرحباً [اسم المؤسس]،

أحببت فكرة [اسم المنتج] وتصميم متجركم الأنيق جداً!

كنت أتصفح إعلاناتكم الأخيرة على إنستغرام، ولاحظت فرصة سريعة قد ترفع نسبة النقر على الإعلان (CTR) بنسبة ملحوظة:
السطر الأول حالياً يبدأ بمواصفات المنتج مباشرة، وهو ما يفقدكم جزءاً من المشاهدين الذين يتصفحون بسرعة.

سجلت لك فيديو سريع مدته 90 ثانية أقترح فيه زاوية هوك جديدة ومراجعة مجانية وسريعة لزر الـ CTA:
[رابط الفيديو القصير]

يمكنكم تجربة هذا الهوك في حملتكم اليوم مجاناً.
إذا أعجبتك النتيجة، يسعدني مناقشة زوايا أخرى لنفس المنتج لاحقاً.

أتمنى لكم دوام النجاح والتوفيق!`;
                    navigator.clipboard.writeText(text);
                    if (onCopyText) onCopyText('تم نسخ قالب رسالة التدقيق المجاني!');
                  }}
                  className="text-xs text-amber-400 hover:underline font-bold cursor-pointer"
                >
                  نسخ القالب
                </button>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans whitespace-pre-line bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
{`مرحباً [اسم المؤسس]،

أحببت فكرة [اسم المنتج] وتصميم متجركم الأنيق جداً!

كنت أتصفح إعلاناتكم الأخيرة على إنستغرام، ولاحظت فرصة سريعة قد ترفع نسبة النقر على الإعلان (CTR) بنسبة ملحوظة:
السطر الأول حالياً يبدأ بمواصفات المنتج مباشرة، وهو ما يفقدكم جزءاً من المشاهدين الذين يتصفحون بسرعة.

سجلت لك فيديو سريع مدته 90 ثانية أقترح فيه زاوية هوك جديدة ومراجعة مجانية وسريعة لزر الـ CTA:
[رابط الفيديو القصير]

يمكنكم تجربة هذا الهوك في حملتكم اليوم مجاناً.
إذا أعجبتك النتيجة، يسعدني مناقشة زوايا أخرى لنفس المنتج لاحقاً.`}
              </p>
            </div>

            {/* Template 2: Follow-up */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-bold text-amber-400">2. رسالة المتابعة اللطيفة (Gentle Follow-up)</span>
                <button
                  onClick={() => {
                    const text = `مرحباً [اسم المؤسس]،

أعلم أن جدولك مزدحم بالمهام في إدارة المتجر؛ أردت فقط التأكد من وصول رسالتي السابقة بخصوص مقترح الهوك الإعلاني الجديد لـ [اسم المنتج].

إذا كان التوقيت غير مناسب حالياً، لا بأس على الإطلاق، أتمنى لك أسبوعاً موفقاً ومبيعات ممتازة!`;
                    navigator.clipboard.writeText(text);
                    if (onCopyText) onCopyText('تم نسخ قالب رسالة المتابعة!');
                  }}
                  className="text-xs text-amber-400 hover:underline font-bold cursor-pointer"
                >
                  نسخ القالب
                </button>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans whitespace-pre-line bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
{`مرحباً [اسم المؤسس]،

أعلم أن جدولك مزدحم بالمهام في إدارة المتجر؛ أردت فقط التأكد من وصول رسالتي السابقة بخصوص مقترح الهوك الإعلاني الجديد لـ [اسم المنتج].

إذا كان التوقيت غير مناسب حالياً، لا بأس على الإطلاق، أتمنى لك أسبوعاً موفقاً ومبيعات ممتازة!`}
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
                <h3 className="text-xl font-black text-white">الاختبار النهائي لمسار الكتابة الإعلانية والإقناعية</h3>
                <p className="text-xs text-zinc-400">10 أسئلة تخصصية تقيس فهمك العميق للمفاهيم والأطر والأخلاقيات (درجة النجاح: 80% فما فوق).</p>
              </div>

              {submittedQuiz && (
                <div className={`px-4 py-2 rounded-xl border text-xs font-black font-mono ${
                  passedQuiz ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                }`}>
                  النتيجة: {quizScore} من 10 ({quizScore * 10}%) - {passedQuiz ? 'ناجح ومؤهل للشهادة 🎉' : 'حاول مرة أخرى'}
                </div>
              )}
            </div>

            {/* Quiz Questions */}
            <div className="space-y-6">
              {copywritingFinalQuiz.map((q, idx) => {
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

            {/* Quiz Submit Button */}
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

          {/* Certificate Modal / View */}
          {passedQuiz && (
            <div className="rounded-3xl border-2 border-amber-500/60 bg-gradient-to-b from-amber-500/10 via-zinc-950 to-zinc-950 p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/40 mb-2">
                    <Award className="h-4 w-4" />
                    <span>شهادة إتمام معتمدة</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    شهادة إتقان الكتابة الإعلانية والإقناعية (Copywriting Masterclass)
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    مُنحت لاجتياز كافة المراحل التدريبية وتطبيق أطر الإقناع واختبار المنهج بدرجة تفوق.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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

              {/* Certificate Inner Canvas */}
              <div className="rounded-2xl border-2 border-amber-500/40 bg-zinc-900/60 p-8 sm:p-12 text-center space-y-6 relative">
                <div className="text-xs font-black tracking-widest text-amber-400 uppercase">
                  CERTIFICATE OF COMPLETION • شهادة إتمام مسار مهني
                </div>

                <div className="text-sm text-zinc-300">
                  تشهد منصة ريكو للريادة والعمل الحر بأن المتدرب(ة):
                </div>

                <div className="text-3xl sm:text-4xl font-black text-amber-300 font-serif underline decoration-amber-500/40 underline-offset-8">
                  {userName || 'متعلم محترف'}
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
                  قد أتم بنجاح المسار التطبيقي الكامل لـ <strong>الكتابة الإعلانية الإقناعية (High-Converting Copywriting)</strong>، وأتقن دراسة الجمهور المستهدف، أطر AIDA و PAS و BAB، كتابة الإعلانات الممولة وصفحات الهبوط والبريد، والتحرير الأخلاقي المبني على البيانات.
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-zinc-800 text-[11px] text-zinc-400">
                  <div>
                    <span className="block font-bold text-zinc-200">الاعتماد:</span>
                    <span>مسار ريكو للريادة الرقمية</span>
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
