import React, { useState, useMemo } from 'react';
import { FileText, Copy, Check, Sparkles, RefreshCw, Layers, Clock, Bookmark, HelpCircle } from 'lucide-react';

interface ScriptTemplate {
  id: string;
  name: string;
  hook: string;
  problem: string;
  body: string;
  conclusion: string;
  cta: string;
}

const TEMPLATES: ScriptTemplate[] = [
  {
    id: 'documentary',
    name: 'قالب وثائقي / قصة وصعود وهبوط',
    hook: 'في صيف عام 2008، وقف رئيس مجلس إدارة الشركة أمام المساهمين ليعلن أن كل شيء على ما يرام.. لكن ما كان يخفيه خلف تلك الابتسامة كان ديوناً بمليارات الدولارات ستغير خريطة الاقتصاد العالمي خلال 6 أشهر فقط!',
    problem: 'كيف يمكن لشركة عمرها 150 عاماً أن تنهار بين ليلة وضحاها؟ هل كان السبب مجرد خطأ إداري عابر، أم أن هناك لعبة سرية تم التخطيط لها في الكواليس؟',
    body: 'الفصل الأول: البدايات وصعود الإمبراطورية\nتأسست الشركة بمبدأ بسيط وهو...\n\nالفصل الثاني: نقطة التحول والمقامرة الكبرى\nفي عام 2005، اتخذت الإدارة قراراً غير مسبوق بدخول سوق...\n\nالفصل الثالث: عندما دقت ساعة الحقيقة\nمع بداية الأزمة، حاولت البنوك التدخل، لكن الوثائق السرية أثبتت أن...',
    conclusion: 'الدرس الحقيقي من هذه القصة ليس فقط كيف تسقط الشركات الكبرى، بل كيف أن تجاهل الإشارات المبكرة للتحول كفيل بمحو أعتى الكيانات مهما بلغت قوتها.',
    cta: 'برأيك، هل تعتقد أن هناك شركات اليوم ترتكب نفس هذا الخطأ القاتل؟ شاركني رأيك في التعليقات، ولا تنسَ الاشتراك لمتابعة الجزء القادم من هذه السلسلة الوثائقية.'
  },
  {
    id: 'tech-explainer',
    name: 'قالب شروحات تقنية وأدوات ذكية',
    hook: 'إذا كنت لا تزال تقضي 4 ساعات يومياً في تلخيص المقالات والبحث اليدوي، فهذا الفيديو سيغير طريقتك في العمل تماماً.. إليك الأداة التي لا يتحدث عنها أحد، والتي تختصر 80% من جهدك في 3 نقرات فقط!',
    problem: 'معظم المستخدمين يكتفون بالنماذج المجانية السطحية ويشعرون بالإحباط من النتائج العامة، بينما يكمن السر الحقيقي في هندسة الأوامر الصحيحة والربط بين الأدوات.',
    body: 'الخطوة 1: ضبط بيئة العمل والإعداد الأولي\nافتح المنصة وتوجه إلى إعدادات...\n\nالخطوة 2: صياغة الأوامر المتسلسلة (Prompt Sequencing)\nبدلاً من إعطاء أمر عام، استخدم هذه الصياغة الدقيقة...\n\nالخطوة 3: تصدير النتائج ومراجعتها بشرياً\nتأكد دائماً من مراجعة هذه النقاط الثلاث قبل اعتماد العمل...',
    conclusion: 'الذكاء الاصطناعي لن يستبدلك، لكن الشخص الذي يتقن توظيف هذه الأدوات بذكاء هو من سيتفوق في سوق العمل القادم.',
    cta: 'جرب هذه الطريقة اليوم وأخبرني بالنتيجة في التعليقات. ستجد جميع الروابط والأوامر المذكورة في صندوق الوصف بالأسفل.'
  }
];

export const FacelessScriptPlanner: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('documentary');
  const [hook, setHook] = useState<string>(TEMPLATES[0].hook);
  const [problem, setProblem] = useState<string>(TEMPLATES[0].problem);
  const [body, setBody] = useState<string>(TEMPLATES[0].body);
  const [conclusion, setConclusion] = useState<string>(TEMPLATES[0].conclusion);
  const [cta, setCta] = useState<string>(TEMPLATES[0].cta);
  const [copied, setCopied] = useState<boolean>(false);

  const handleApplyTemplate = (id: string) => {
    const t = TEMPLATES.find((item) => item.id === id);
    if (t) {
      setSelectedTemplate(id);
      setHook(t.hook);
      setProblem(t.problem);
      setBody(t.body);
      setConclusion(t.conclusion);
      setCta(t.cta);
    }
  };

  const compiledText = useMemo(() => {
    return `[المقدمة والهوك الافتتاحي - أول 30 ثانية]
${hook}

[السياق والمشكلة - 0:30 إلى 2:00]
${problem}

[صلب الموضوع والتحليل المتسلسل - 2:00 إلى 7:00]
${body}

[الخلاصة والدرس المستفاد - 7:00 إلى 8:30]
${conclusion}

[دعوة التفاعل والختام - 8:30 إلى 9:00]
${cta}`;
  }, [hook, problem, body, conclusion, cta]);

  const totalWords = useMemo(() => {
    const words = compiledText.trim().split(/\s+/).filter(Boolean);
    return words.length;
  }, [compiledText]);

  const estimatedMinutes = (totalWords / 140).toFixed(1);

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 via-zinc-900 to-zinc-950 p-5 sm:p-6 shadow-xl shadow-red-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-amber-500 text-black shadow-lg shadow-red-500/30">
              <FileText className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/30 px-2.5 py-0.5 text-xs font-bold text-red-400">
                <Sparkles className="h-3 w-3" />
                <span>مخطط وقالب السكريبت السباعي التفاعلي</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                مخطط السكريبت: هيكلة النصوص الاحترافية وقراءة التوقيت
              </h2>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 px-4 py-2.5 text-xs font-black text-black hover:from-red-400 hover:to-amber-400 shadow-md shadow-red-500/20 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>تم نسخ السكريبت كاملاً!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>نسخ السكريبت المجمع</span>
              </>
            )}
          </button>
        </div>

        {/* Word count & Reading time bar */}
        <div className="mt-4 pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-4 text-zinc-300">
            <span>
              إجمالي الكلمات: <strong className="text-amber-400">{totalWords} كلمة</strong>
            </span>
            <span>·</span>
            <span>
              المدة التقديرية للإلقاء: <strong className="text-emerald-400">~{estimatedMinutes} دقيقة</strong> (بمعدل 140 ك/د)
            </span>
          </div>

          {/* Template Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-400 font-sans">اختر قالباً:</span>
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleApplyTemplate(t.id)}
                className={`py-1 px-2.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                  selectedTemplate === t.id
                    ? 'bg-red-500 text-black font-black'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Blocks */}
      <div className="space-y-4">
        {/* Block 1: Hook */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 sm:p-5 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-black text-white flex items-center gap-2">
              <span className="h-5 w-5 rounded-md bg-red-500/20 text-red-400 flex items-center justify-center font-mono text-[11px]">
                1
              </span>
              <span>المقدمة والهوك الصادم (Hook - أول 15 إلى 30 ثانية)</span>
            </label>
            <span className="text-[11px] font-mono text-zinc-400">
              {hook.trim().split(/\s+/).filter(Boolean).length} كلمة
            </span>
          </div>
          <textarea
            value={hook}
            onChange={(e) => setHook(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs sm:text-sm text-zinc-200 focus:border-red-500 focus:outline-none leading-relaxed"
            placeholder="اكتب الهوك الافتتاحي الذي يخطف عين وأذن المشاهد دون مقدمات تقليدية..."
          />
        </div>

        {/* Block 2: Problem & Context */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 sm:p-5 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-black text-white flex items-center gap-2">
              <span className="h-5 w-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono text-[11px]">
                2
              </span>
              <span>طرح المشكلة والسياق الضروري (Context & Core Mystery)</span>
            </label>
            <span className="text-[11px] font-mono text-zinc-400">
              {problem.trim().split(/\s+/).filter(Boolean).length} كلمة
            </span>
          </div>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs sm:text-sm text-zinc-200 focus:border-red-500 focus:outline-none leading-relaxed"
            placeholder="حدد التساؤل الجوهري أو السياق الذي سيجيب عنه هذا الفيديو..."
          />
        </div>

        {/* Block 3: Body & Chapters */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 sm:p-5 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-black text-white flex items-center gap-2">
              <span className="h-5 w-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-[11px]">
                3
              </span>
              <span>صلب الموضوع، الفصول والتحليل المتسلسل (Body & Chapters)</span>
            </label>
            <span className="text-[11px] font-mono text-zinc-400">
              {body.trim().split(/\s+/).filter(Boolean).length} كلمة
            </span>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={7}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs sm:text-sm text-zinc-200 focus:border-red-500 focus:outline-none leading-relaxed font-sans"
            placeholder="قسّم تحليلك إلى فصول متسلسلة مدعومة بأمثلة وأرقام واقعية..."
          />
        </div>

        {/* Block 4: Conclusion */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 sm:p-5 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-black text-white flex items-center gap-2">
              <span className="h-5 w-5 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono text-[11px]">
                4
              </span>
              <span>الخلاصة والدرس المستفاد (Takeaway & Conclusion)</span>
            </label>
            <span className="text-[11px] font-mono text-zinc-400">
              {conclusion.trim().split(/\s+/).filter(Boolean).length} كلمة
            </span>
          </div>
          <textarea
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs sm:text-sm text-zinc-200 focus:border-red-500 focus:outline-none leading-relaxed"
            placeholder="قدم استنتاجاً عميقاً أو درساً قيماً يخرج به المشاهد..."
          />
        </div>

        {/* Block 5: CTA */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 sm:p-5 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-black text-white flex items-center gap-2">
              <span className="h-5 w-5 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center font-mono text-[11px]">
                5
              </span>
              <span>دعوة التفاعل الطبيعية وتوجيه المشاهد (Call to Action)</span>
            </label>
            <span className="text-[11px] font-mono text-zinc-400">
              {cta.trim().split(/\s+/).filter(Boolean).length} كلمة
            </span>
          </div>
          <textarea
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs sm:text-sm text-zinc-200 focus:border-red-500 focus:outline-none leading-relaxed"
            placeholder="اطرح سؤالاً ذكياً للنقاش في التعليقات واقترح فيديو تالياً..."
          />
        </div>
      </div>
    </div>
  );
};
