import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  Eye, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  ExternalLink,
  Info
} from 'lucide-react';

interface WritingPortfolioBuilderProps {
  onCopyText: (text: string, label: string) => void;
}

export const WritingPortfolioBuilder: React.FC<WritingPortfolioBuilderProps> = ({ onCopyText }) => {
  const [sampleTitle, setSampleTitle] = useState('كيف تختار نظام إدارة علاقات العملاء (CRM) المناسب لشركتك الناشئة؟');
  const [selectedNiche, setSelectedNiche] = useState('Tech & SaaS');
  const [targetAudience, setTargetAudience] = useState('مؤسسو الشركات الناشئة ومدراء المبيعات الجدد');
  const [problemSolved, setProblemSolved] = useState('تشتت بيانات العملاء وفقدان الصفقات بسبب الاعتماد على جداول إكسل المعقدة');
  const [sampleType, setSampleType] = useState('دليل شامل متوافق مع السيو (How-To SEO Guide)');
  const [sampleBody, setSampleBody] = useState(`عندما تبدأ شركتك الناشئة بـ 5 عملاء فقط، قد يبدو جدول Google Sheets كافياً لتنظيم بياناتك. ولكن بمجرد أن تتلقى 50 استفساراً أسبوعياً، يتحول ذلك الملف البسيط إلى كابوس يبتلع وقت فريقك ويتسبب في ضياع صفقات جاهزة للإغلاق!

وفقاً لتقرير HubSpot لعام 2025، فإن الشركات التي تستخدم نظام CRM متخصص ترفع معدل تحويل الصفقات بنسبة 29%.

في هذا الدليل، سنستعرض المعايير الأربعة لاختيار النظام الأنسب لميزانيتك دون دفع تكاليف ميزات معقدة لن تستخدمها.`);
  const [copied, setCopied] = useState(false);

  const generatePortfolioCardText = () => {
    return `================================================
📄 نموذج بطاقة عينة معرض الأعمال (Portfolio Spec Sample)
================================================
🏷️ صفة العمل: عينة عمل تجريبية احترافية (Demo / Spec Sample)
📌 عنوان العينة: ${sampleTitle}
📂 التخصص (Niche): ${selectedNiche}
🎯 نوع الخدمة: ${sampleType}
👥 الجمهور المستهدف: ${targetAudience}
💡 المشكلة التي تعالجها: ${problemSolved}

------------------------------------------------
📝 مقتطف من المقال (Sample Excerpt):
------------------------------------------------
${sampleBody}

------------------------------------------------
🔍 الكلمات المفتاحية المستهدفة: أفضل CRM للشركات الناشئة، تنظيم بيانات العملاء.
🔗 تم إعداد هذه العينة بواسطة: كاتب محتوى مستقل متخصص في ${selectedNiche}
================================================`;
  };

  const handleCopyCard = () => {
    onCopyText(generatePortfolioCardText(), 'بطاقة عينة معرض الأعمال');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Layers className="h-4 w-4" />
            <span>صانع نماذج معرض الأعمال (Spec Sample Generator)</span>
          </div>
          <h3 className="mt-1 text-2xl font-black text-white">
            بناء بورتفوليو احترافي وصادق بدون عملاء سابقين
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            صمم بطاقة عينة عملك التجريبية (Spec Sample) بشفافية تامة لإبراز جودة تفكيرك وتحليلك وصياغتك للعملاء.
          </p>
        </div>

        <button
          onClick={handleCopyCard}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-black text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all shrink-0"
        >
          {copied ? <Check className="h-4 w-4 stroke-[3]" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'تم نسخ بطاقة العينة!' : 'نسخ قالب العينة لـ Notion'}</span>
        </button>
      </div>

      {/* Inputs Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">عنوان العينة المبتكر:</label>
            <input
              type="text"
              value={sampleTitle}
              onChange={(e) => setSampleTitle(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">التخصص (Niche):</label>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-amber-400 font-bold focus:outline-none"
              >
                <option value="Tech & SaaS">Tech & SaaS</option>
                <option value="Business & Finance">Business & Finance</option>
                <option value="E-commerce & D2C">E-commerce & D2C</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Education & Careers">Education & Careers</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">نوع العينة الكتابية:</label>
              <select
                value={sampleType}
                onChange={(e) => setSampleType(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-amber-400 font-bold focus:outline-none"
              >
                <option value="دليل شامل متوافق مع السيو (How-To SEO Guide)">دليل سيو شامل (How-To)</option>
                <option value="مقال مقارنة ومراجعة (Product Comparison)">مقال مقارنة ومراجعة</option>
                <option value="صفحة هبوط بيعية (Landing Page Copy)">صفحة هبوط بيعية</option>
                <option value="رسالة بريدية ترويجية (Email Pitch)">رسالة بريدية ترويجية</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">الجمهور المستهدف (Target Audience):</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">المشكلة التي يحلها المقال:</label>
            <input
              type="text"
              value={problemSolved}
              onChange={(e) => setProblemSolved(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">مقتطف من نص العينة (Sample Body):</label>
            <textarea
              rows={4}
              value={sampleBody}
              onChange={(e) => setSampleBody(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Live Card Preview */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-zinc-400 flex items-center justify-between">
            <span>معاينة بطاقة العينة كما ستظهر في البورتفوليو:</span>
            <span className="text-[10px] text-amber-400 font-mono">Live Card Preview</span>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-zinc-950 p-6 space-y-4 shadow-xl">
            {/* Spec Work Badge */}
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-black text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>عينة عمل تجريبية (Spec Sample)</span>
              </span>
              <span className="text-[11px] text-zinc-400 font-mono font-bold">
                {selectedNiche}
              </span>
            </div>

            <h4 className="text-lg font-black text-white leading-snug">
              {sampleTitle}
            </h4>

            {/* Metadata Box */}
            <div className="grid grid-cols-2 gap-2 text-[11px] p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <div>
                <span className="text-zinc-500 block">نوع المحتوى:</span>
                <span className="font-bold text-zinc-200">{sampleType}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">الجمهور:</span>
                <span className="font-bold text-zinc-200 line-clamp-1">{targetAudience}</span>
              </div>
            </div>

            {/* Problem Solved */}
            <div className="text-xs text-zinc-300">
              <span className="font-bold text-amber-300">المشكلة والحل: </span>
              <span>{problemSolved}</span>
            </div>

            {/* Excerpt */}
            <div className="border-t border-zinc-900 pt-3">
              <span className="text-[11px] font-bold text-zinc-500 block mb-1">المحتوى:</span>
              <p className="text-xs text-zinc-300 leading-relaxed italic bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/60">
                "{sampleBody}"
              </p>
            </div>

            {/* Honest disclaimer notice */}
            <div className="text-[11px] text-zinc-400 border-t border-zinc-900 pt-3 flex items-start gap-2">
              <Info className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                ملاحظة مهنية للعميل: تم إعداد هذا النموذج لإظهار منهجيتي في البحث والتحليل والربط المنطقي في مجال {selectedNiche}.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
