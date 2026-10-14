import React, { useState } from 'react';
import { 
  Layers, 
  Copy, 
  Check, 
  Sparkles, 
  Smartphone, 
  Monitor, 
  FileText, 
  Video, 
  Share2, 
  ShieldCheck,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface CpaLandingPagePlannerProps {
  onCopyText?: (text: string, label: string) => void;
}

export const CpaLandingPagePlanner: React.FC<CpaLandingPagePlannerProps> = ({ onCopyText }) => {
  const [toolName, setToolName] = useState('TaskFlow AI');
  const [targetProblem, setTargetProblem] = useState('ضياع المهام اليومية وتشتت الملاحظات بين عدة تطبيقات');
  const [coreBenefit, setCoreBenefit] = useState('تنظيم وإدارة جميع مشاريعك في لوحة تحكم واحدة بذكاء وبدون تعقيد');
  const [actionStep, setActionStep] = useState('تسجيل مجاني بالبريد الإلكتروني دون الحاجة لبطاقة بنكية');
  const [ctaText, setCtaText] = useState('ابدأ استخدام الأداة مجاناً الآن');
  const [benefit1, setBenefit1] = useState('جدولة ذكية تلقائية للمواعيد والمهام العاجلة');
  const [benefit2, setBenefit2] = useState('تكامل كامل مع بريدك وتطبيقات التواصل بضغطة زر');
  const [benefit3, setBenefit3] = useState('خطة مجانية دائمة للأفراد والطلاب');

  const [activeTemplateTab, setActiveTemplateTab] = useState<'landing' | 'article' | 'video-script'>('landing');
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const handleCopy = (content: string, label: string) => {
    if (onCopyText) {
      onCopyText(content, label);
    } else {
      navigator.clipboard.writeText(content);
    }
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2500);
  };

  // Generated Text Contents
  const generatedLandingMarkdown = `# ${toolName}: هل تعاني من ${targetProblem}؟

## كيف تساعدك الأداة؟
${coreBenefit}

### أهم 3 مميزات ستحصل عليها:
1. ${benefit1}
2. ${benefit2}
3. ${benefit3}

### الخطوة التالية للبدء:
${actionStep}

👉 [${ctaText} (رابط رسمي)]

---
*تنويه الشفافية: قد نحصل على عمولة تسويقية بسيطة عند قيامك بتجربة الأداة عبر هذا الرابط، وذلك دون أي تكلفة إضافية عليك، مما يدعم استمرارنا في تقديم أدلة مجانية.*
`;

  const generatedArticleMarkdown = `عنوان المقال: مراجعة كاملة لأداة ${toolName} — هل تستحق التجربة؟

المقدمة:
إذا كنت تواجه يومياً مشكلة ${targetProblem}، فأنت لست وحدك. في هذا الدليل السريع سنفحص أداة ${toolName} ونوضح كيف تساعدك على ${coreBenefit}.

ما الذي يميز ${toolName}؟
- أولاً: ${benefit1}
- ثانياً: ${benefit2}
- ثالثاً: ${benefit3}

طريقة الحصول على الحساب المجاني:
الأمر في غاية البساطة، كل ما يتطلبه هو ${actionStep}.
[زر الإجراء: ${ctaText}]

تنويه: محتوى هذا المقال يتضمن روابط تسويقية بالعمولة تدعم موقعنا بدون أي كلفة على الزائر.
`;

  const generatedVideoScript = `[سيناريو فيديو قصير — 45 ثانية لتيك توك / شورتس]

00:00 - 00:05 (الهوك السريع):
"لو كنت تعاني من ${targetProblem}، هذا الفيديو لك..."

00:05 - 00:20 (عرض الحل في الشاشة):
"اكتشفت أداة اسمها ${toolName}. الميزة الأولى أنها ${benefit1}، وثانياً ${benefit2}."

00:20 - 00:35 (توضيح العرض المجاني):
"الأفضل من هذا أنها توفر ${benefit3}، والتسجيل فيها يتطلب فقط ${actionStep}."

00:35 - 00:45 (الدعوة إلى الإجراء):
"الرابط الرسمي للأداة موجود في البايو وأول تعليق. جربها واكتب لي رأيك!"
`;

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950/40 via-zinc-900 to-cyan-950/30 border border-zinc-800 rounded-2xl p-6 sm:p-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
            <Layers className="h-3.5 w-3.5" />
            <span>Bridge Page & Promo Content Generator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            مخطط صفحات الهبوط وقوالب المحتوى الترويجي
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
            أنشئ هيكل صفحة هبوط وسيطة (Bridge Page) ومقالات مراجعة وسيناريوهات فيديو قصيرة مقنعة بنقرة واحدة، مع التزام تام بالشفافية والإفصاح القانوني.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (Span 5) */}
        <div className="lg:col-span-5 space-y-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sm:p-6 text-right">
          <h3 className="text-xs font-bold text-white border-b border-zinc-800 pb-2.5">
            بيانات العرض والأداة المروّج لها:
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-zinc-300 font-bold block mb-1">اسم الأداة / التطبيق:</label>
              <input
                type="text"
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-zinc-300 font-bold block mb-1">المشكلة التي يعاني منها العميل:</label>
              <textarea
                rows={2}
                value={targetProblem}
                onChange={(e) => setTargetProblem(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white text-xs focus:border-cyan-500 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="text-zinc-300 font-bold block mb-1">الفائدة الجوهرية للحل:</label>
              <textarea
                rows={2}
                value={coreBenefit}
                onChange={(e) => setCoreBenefit(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white text-xs focus:border-cyan-500 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="text-zinc-300 font-bold block mb-1">الميزة الأولى:</label>
              <input
                type="text"
                value={benefit1}
                onChange={(e) => setBenefit1(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-zinc-300 font-bold block mb-1">الميزة الثانية:</label>
              <input
                type="text"
                value={benefit2}
                onChange={(e) => setBenefit2(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-zinc-300 font-bold block mb-1">الميزة الثالثة (مثلاً العرض المجاني):</label>
              <input
                type="text"
                value={benefit3}
                onChange={(e) => setBenefit3(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-zinc-300 font-bold block mb-1">خطوة الإجراء المطلوب من الزائر:</label>
              <input
                type="text"
                value={actionStep}
                onChange={(e) => setActionStep(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-zinc-300 font-bold block mb-1">نص زر الإجراء (CTA Button):</label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white text-xs focus:border-cyan-500 focus:outline-none font-bold"
              />
            </div>
          </div>
        </div>

        {/* Right Output & Live Preview (Span 7) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Format Selector Tabs */}
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <button
              onClick={() => setActiveTemplateTab('landing')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTemplateTab === 'landing'
                  ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              <Smartphone className="h-4 w-4" />
              <span>معاينة صفحة الهبوط الوسيطة</span>
            </button>

            <button
              onClick={() => setActiveTemplateTab('article')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTemplateTab === 'article'
                  ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>قالب مقال مراجعة (SEO)</span>
            </button>

            <button
              onClick={() => setActiveTemplateTab('video-script')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTemplateTab === 'video-script'
                  ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              <Video className="h-4 w-4" />
              <span>سيناريو فيديو قصير (45s)</span>
            </button>
          </div>

          {/* Tab 1: Live Interactive Mobile Pre-lander Preview */}
          {activeTemplateTab === 'landing' && (
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4 text-cyan-400" />
                  <span>معاينة صفحة الهبوط كما يراها مستخدم الجوال:</span>
                </span>
                <button
                  onClick={() => handleCopy(generatedLandingMarkdown, 'landing')}
                  className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-bold bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  {copiedLabel === 'landing' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedLabel === 'landing' ? 'تم النسخ!' : 'نسخ كود الصفحة'}</span>
                </button>
              </div>

              {/* Mobile Mockup Card */}
              <div className="max-w-md mx-auto bg-zinc-950 border-2 border-zinc-800 rounded-3xl p-6 space-y-5 shadow-2xl text-center">
                <div className="w-12 h-1 bg-zinc-800 rounded-full mx-auto" />
                
                <div className="space-y-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono">
                    {toolName} Official Guide
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                    هل تعاني من {targetProblem}؟
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {coreBenefit}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-right space-y-2 text-xs">
                  <div className="font-bold text-cyan-400 text-[11px]">أهم 3 مميزات:</div>
                  <div className="space-y-1.5 text-zinc-300 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono text-[10px]">1</span>
                      <span>{benefit1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono text-[10px]">2</span>
                      <span>{benefit2}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono text-[10px]">3</span>
                      <span>{benefit3}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="text-[11px] text-zinc-400 bg-zinc-900/50 p-2 rounded-xl">
                    <strong className="text-zinc-200">الخطوة القادمة:</strong> {actionStep}
                  </div>

                  <button
                    type="button"
                    className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-black text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{ctaText}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="text-[10px] text-zinc-500 leading-tight border-t border-zinc-800/80 pt-3">
                  تنويه الشفافية: قد نحصل على عمولة بسيطة عند تجربتك عبر هذا الرابط دون أي تكلفة عليك.
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Article Markdown */}
          {activeTemplateTab === 'article' && (
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400">نص المقال الترويجي التوعوي:</span>
                <button
                  onClick={() => handleCopy(generatedArticleMarkdown, 'article')}
                  className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-bold bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  {copiedLabel === 'article' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedLabel === 'article' ? 'تم النسخ!' : 'نسخ المقال'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-sans leading-relaxed whitespace-pre-wrap max-h-[420px] overflow-y-auto">
                {generatedArticleMarkdown}
              </pre>
            </div>
          )}

          {/* Tab 3: Short Video Script */}
          {activeTemplateTab === 'video-script' && (
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400">سيناريو تصوير الشاشة (45 ثانية):</span>
                <button
                  onClick={() => handleCopy(generatedVideoScript, 'video')}
                  className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-bold bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  {copiedLabel === 'video' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedLabel === 'video' ? 'تم النسخ!' : 'نسخ السيناريو'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-sans leading-relaxed whitespace-pre-wrap max-h-[420px] overflow-y-auto">
                {generatedVideoScript}
              </pre>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
