import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  Eye, 
  Mail, 
  Layers, 
  Send,
  HelpCircle
} from 'lucide-react';

interface NewsletterBuilderTemplate {
  id: string;
  name: string;
  description: string;
  recommendedDuration: string;
}

const TEMPLATES: NewsletterBuilderTemplate[] = [
  {
    id: 'curated-links',
    name: 'قالب المنسق الذكي (Curated Weekly Dispatch)',
    description: 'الأفضل لنشرات الأدوات، الأخبار، والتقنية. مقال افتتاحي قصير + 4 أدوات منتقاة + رابط الأسبوع.',
    recommendedDuration: '4 دقائق قراءة'
  },
  {
    id: 'deep-dive',
    name: 'قالب التحليل العميق (Single Deep Dive Essay)',
    description: 'الأفضل للمقالات التحليلية، دراسات الحالة، واستراتيجيات الأعمال مع ملخص تنفيذي سريع.',
    recommendedDuration: '6 دقائق قراءة'
  },
  {
    id: '3-2-1-format',
    name: 'قالب جيمس كلير (3-2-1 Rapid Format)',
    description: '3 أفكار سريعة منك + فكرتان مقتبستان من خبراء + سؤال واحد عميق لتفكيك عقل القارئ.',
    recommendedDuration: '3 دقائق قراءة'
  }
];

interface NewsletterOutlineBuilderProps {
  onCopyText: (text: string, label: string) => void;
}

export const NewsletterOutlineBuilder: React.FC<NewsletterOutlineBuilderProps> = ({ onCopyText }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('curated-links');
  const [newsletterName, setNewsletterName] = useState<string>('نبض التقنية');
  const [issueNumber, setIssueNumber] = useState<number>(12);
  const [subjectLine, setSubjectLine] = useState<string>('3 أدوات ذكاء اصطناعي ستغير أسبوعك العملي [بالداخل: الروابط]');
  const [previewText, setPreviewText] = useState<string>('كيف وفرنا 14 ساعة عمل في 3 أيام فقط باستخدام أتمتة بسيطة.');
  
  // Content inputs
  const [introHook, setIntroHook] = useState<string>('صباح الخير! هذا الأسبوع اختبرنا أكثر من 20 تطبيقاً ذكياً واخترنا لك الزبدة الصافية.');
  const [mainStoryTitle, setMainStoryTitle] = useState<string>('لماذا لم تعد بحاجة لفريق برمجة كامل لإطلاق متجرك؟');
  const [mainStoryBody, setMainStoryBody] = useState<string>('في السابق كان بناء نظام دفع وربط يحتاج مطورين بدوام كامل. اليوم بفضل أدوات No-Code الحديثة، يمكنك إطلاق النموذج الأولي خلال عطلة نهاية الأسبوع بتكلفة لا تتجاوز 50 دولاراً. السر يكمن في دمج 3 أدوات مترابطة...');
  
  const [sponsorName, setSponsorName] = useState<string>('Beehiiv Platform');
  const [sponsorCopy, setSponsorCopy] = useState<string>('المنصة الأسرع نمواً لإطلاق النشرات البريدية الربحية مع شبكة إعلانات مدمجة. جربها مجاناً الآن.');
  
  const [curatedItem1, setCuratedItem1] = useState<string>('Claude 3.5 Sonnet: الأداة الأقوى في كتابة الأكواد والتحليل المنطقي المعقد.');
  const [curatedItem2, setCuratedItem2] = useState<string>('v0.dev: توليد واجهات مواقع كاملة بكود نظيف عبر الوصف النصي فقط.');
  const [curatedItem3, setCuratedItem3] = useState<string>('Perplexity Pro: محرك البحث التوليدي الذي يغنيك عن عشرات ساعات التصفح.');
  
  const [weeklyQuestion, setWeeklyQuestion] = useState<string>('ما هي أكثر مهمة متكررة تستهلك وقتك هذا الأسبوع وتتمنى أتمتتها؟ (اضغط Reply وشاركني رأيك).');
  
  const [copied, setCopied] = useState<boolean>(false);

  // Generate Email HTML / Markdown Preview
  const fullIssueText = `
عنوان الإيميل: ${subjectLine}
سطر المعاينة (Preview Text): ${previewText}
--------------------------------------------------
[شعار نشرة ${newsletterName} | العدد رقم #${issueNumber}]

${introHook}

━━━━━━━━━━━━━━━━━━━━━━━━━━
📣 رعاية هذا العدد: ${sponsorName}
${sponsorCopy}
[زر: اكتشف المزيد هنا →]
━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 الفكرة الكبرى لهذا الأسبوع:
## ${mainStoryTitle}

${mainStoryBody}

━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ مختارات وروابط الأسبوع المجهزة لك:
• ${curatedItem1}
• ${curatedItem2}
• ${curatedItem3}

━━━━━━━━━━━━━━━━━━━━━━━━━━
🤔 سؤال الأسبوع وتحدي التفكير:
${weeklyQuestion}

━━━━━━━━━━━━━━━━━━━━━━━━━━
تذييل العدد:
هل أعجبك هذا العدد؟ شاركه مع زميلك المفضل!
تستلم هذه الرسالة لأنك مشترك في ${newsletterName}.
إلغاء الاشتراك بنقرة واحدة (Unsubscribe).
`.trim();

  const handleCopy = () => {
    onCopyText(fullIssueText, 'تم نسخ مسودة العدد الكامل بنجاح!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
            <FileText className="w-3.5 h-3.5" />
            <span>محرر وهندسة هيكل العدد الأسبوعي التفاعلي</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            باني ومولد أعداد النشرة الأسبوعية
          </h2>
          <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
            نسق عددك الأسبوعي وفق أفضل المعايير العالمية؛ املأ أقسام المحتوى والرعاية واستخرج مسودة جاهزة للإرسال في منصة beehiiv أو Substack بنقرة واحدة.
          </p>
        </div>
      </div>

      {/* Template Chooser */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => setSelectedTemplate(tmpl.id)}
            className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
              selectedTemplate === tmpl.id
                ? 'border-emerald-500 bg-zinc-900 shadow-lg shadow-emerald-500/10'
                : 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-850'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white">{tmpl.name}</span>
              <span className="text-[10px] text-emerald-400 font-mono">{tmpl.recommendedDuration}</span>
            </div>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              {tmpl.description}
            </p>
          </button>
        ))}
      </div>

      {/* Editor & Preview Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 space-y-5">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>1. العناوين وسطر المعاينة (Headers & Subject)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">اسم النشرة:</label>
                <input
                  type="text"
                  value={newsletterName}
                  onChange={(e) => setNewsletterName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">رقم العدد:</label>
                <input
                  type="number"
                  value={issueNumber}
                  onChange={(e) => setIssueNumber(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">
                عنوان الرسالة (Subject Line - سر نسبة الفتح):
              </label>
              <input
                type="text"
                value={subjectLine}
                onChange={(e) => setSubjectLine(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none font-bold"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">
                الطول المثالي: 35-50 حرفاً لتظهر كاملة على شاشات الهواتف.
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">
                سطر المعاينة (Preview Text):
              </label>
              <input
                type="text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-300 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Section 2: Content Bodies */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 space-y-5">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>2. صلب المحتوى والقصة الرئيسية</span>
            </h3>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">الافتتاحية والتحية:</label>
              <input
                type="text"
                value={introHook}
                onChange={(e) => setIntroHook(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">عنوان الفكرة الكبرى:</label>
              <input
                type="text"
                value={mainStoryTitle}
                onChange={(e) => setMainStoryTitle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">شرح الفكرة الرئيسية (The Essay):</label>
              <textarea
                rows={4}
                value={mainStoryBody}
                onChange={(e) => setMainStoryBody(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 focus:border-emerald-500 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Sponsor Box */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="text-xs font-bold text-amber-300">موضع رعاية العدد (Sponsor Block):</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="اسم الراعي"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="نص الإعلان ورابط الراعي"
                  value={sponsorCopy}
                  onChange={(e) => setSponsorCopy(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            {/* Curated Links */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 block">روابط وأدوات الأسبوع المختارة:</label>
              <input
                type="text"
                value={curatedItem1}
                onChange={(e) => setCuratedItem1(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 mb-2"
              />
              <input
                type="text"
                value={curatedItem2}
                onChange={(e) => setCuratedItem2(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 mb-2"
              />
              <input
                type="text"
                value={curatedItem3}
                onChange={(e) => setCuratedItem3(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300"
              />
            </div>

            {/* Weekly Prompt */}
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">
                سؤال الأسبوع التفاعلي (Call to Action / Reply):
              </label>
              <input
                type="text"
                value={weeklyQuestion}
                onChange={(e) => setWeeklyQuestion(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Live Preview Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>معاينة حية لشاشة البريد (Email Preview)</span>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-black text-xs font-black hover:bg-emerald-400 transition-all cursor-pointer shadow-md active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ المسودة'}</span>
            </button>
          </div>

          {/* Email Container Mockup */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 space-y-5 font-sans text-xs shadow-2xl relative">
            {/* Subject preview */}
            <div className="border-b border-zinc-800/80 pb-3 space-y-1">
              <div className="text-[11px] font-bold text-zinc-400">إشعار الوارد:</div>
              <div className="font-bold text-white text-sm">{subjectLine}</div>
              <div className="text-zinc-500 text-[11px] truncate">{previewText}</div>
            </div>

            {/* Publication branding header */}
            <div className="text-center py-2 border-b border-zinc-800/80">
              <span className="text-sm font-black text-emerald-400 uppercase tracking-widest">
                {newsletterName}
              </span>
              <span className="text-[10px] text-zinc-500 block">العدد #{issueNumber}</span>
            </div>

            {/* Intro */}
            <div className="text-zinc-300 leading-relaxed">
              {introHook}
            </div>

            {/* Sponsor Callout */}
            {sponsorName && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-1">
                <div className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                  📣 راعي العدد: {sponsorName}
                </div>
                <div className="text-[11px] leading-relaxed text-zinc-300">
                  {sponsorCopy}
                </div>
              </div>
            )}

            {/* Story */}
            <div className="space-y-2 pt-2">
              <h4 className="text-sm font-black text-white">
                💡 {mainStoryTitle}
              </h4>
              <p className="text-zinc-300 leading-relaxed text-[11px]">
                {mainStoryBody}
              </p>
            </div>

            {/* Curated list */}
            <div className="space-y-2 pt-3 border-t border-zinc-800/80">
              <div className="font-bold text-zinc-200">⚡ مختارات وروابط هذا الأسبوع:</div>
              <ul className="space-y-1.5 text-zinc-400 pl-4 list-disc text-[11px]">
                <li>{curatedItem1}</li>
                <li>{curatedItem2}</li>
                <li>{curatedItem3}</li>
              </ul>
            </div>

            {/* Prompt */}
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 leading-relaxed">
              <span className="text-emerald-400 font-bold block mb-1">🤔 سؤال الأسبوع:</span>
              {weeklyQuestion}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-zinc-800/80 text-[10px] text-zinc-500 text-center space-y-1">
              <div>أرسلت هذه الرسالة بحب من {newsletterName}.</div>
              <div className="text-zinc-600 underline">إلغاء الاشتراك (Unsubscribe) • تحديث التفضيلات</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
