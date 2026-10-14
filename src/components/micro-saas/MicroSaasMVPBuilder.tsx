import React, { useState } from 'react';
import { 
  Code, 
  Layers, 
  Check, 
  Copy, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  Database, 
  CreditCard,
  Rocket
} from 'lucide-react';

interface TemplateArchitecture {
  id: string;
  name: string;
  category: string;
  killerFeature: string;
  stackFrontend: string;
  stackBackend: string;
  stackDatabase: string;
  stackAuth: string;
  stackBilling: string;
  starterPrice: number;
  proPrice: number;
  valueMetric: string;
}

const PRESET_ARCHITECTURES: TemplateArchitecture[] = [
  {
    id: 'ai-wrapper',
    name: 'أداة ذكاء اصطناعي مخصصة (AI Micro-SaaS / Wrapper)',
    category: 'AI Tool',
    killerFeature: 'استخراج وتلخيص وتحويل الملفات الصوتية أو الـ PDFs إلى جداول مهيكلة',
    stackFrontend: 'Next.js 15 (App Router) + Tailwind CSS + Lucide Icons',
    stackBackend: 'Next.js Route Handlers + Gemini 2.5 Flash API / OpenAI SDK',
    stackDatabase: 'Supabase Postgres + pgvector للتضمينات الشعاعية',
    stackAuth: 'Supabase Auth (Google OAuth بنقرة واحدة)',
    stackBilling: 'Lemon Squeezy (Merchant of Record للضرائب الدولية)',
    starterPrice: 19,
    proPrice: 49,
    valueMetric: 'عدد الملفات المعالجة شهرياً (مثلاً: 50 ملف مقابل 500 ملف)',
  },
  {
    id: 'b2b-utility',
    name: 'أداة أتمتة وتكامل للأعمال (B2B Workflow Automation)',
    category: 'Productivity & API',
    killerFeature: 'مزامنة بيانات متجر سلة / زد / شوبيفاي مع برنامج الحسابات والمخزون تلقائياً',
    stackFrontend: 'React + Vite أو Next.js Dashboard + Tailwind',
    stackBackend: 'Node.js Express أو Next.js Server Actions + Inngest للمهام المجدولة',
    stackDatabase: 'Supabase / Neon Postgres',
    stackAuth: 'Clerk Auth أو Supabase Auth',
    stackBilling: 'Stripe أو Paddle',
    starterPrice: 29,
    proPrice: 79,
    valueMetric: 'عدد المزامنات والعمليات المنفذة في الشهر',
  },
  {
    id: 'chrome-extension',
    name: 'إضافة متصفح بالاشتراك (Monetized Chrome Extension)',
    category: 'Browser Extension',
    killerFeature: 'فحص حسابات المنافسين على لينكدإن أو إكس وتصدير بيانات الاتصال بنقرة واحدة',
    stackFrontend: 'Plasmo Framework (React + Tailwind)',
    stackBackend: 'Vercel Serverless API لتأمين مفاتيح الـ API وفحص الاشتراكات',
    stackDatabase: 'Firebase Firestore أو Supabase',
    stackAuth: 'Chrome Identity API + Firebase Auth',
    stackBilling: 'ExtensionPay أو Lemon Squeezy',
    starterPrice: 15,
    proPrice: 35,
    valueMetric: 'عدد الحسابات المفحوصة والمصدرة يومياً',
  }
];

export const MicroSaasMVPBuilder: React.FC<{ onCopyText: (text: string, label: string) => void }> = ({ onCopyText }) => {
  const [productName, setProductName] = useState<string>('DocuFast AI');
  const [killerFeature, setKillerFeature] = useState<string>('استخراج وتدقيق بنود الفواتير الضريبية تلقائياً من ملفات PDF');
  const [frontendStack, setFrontendStack] = useState<string>('Next.js (App Router) + Tailwind CSS');
  const [backendStack, setBackendStack] = useState<string>('Next.js API Routes + Server Actions');
  const [databaseStack, setDatabaseStack] = useState<string>('Supabase (PostgreSQL + RLS)');
  const [authStack, setAuthStack] = useState<string>('Google OAuth بنقرة واحدة عبر Supabase Auth');
  const [billingStack, setBillingStack] = useState<string>('Lemon Squeezy (Merchant of Record)');
  const [starterPrice, setStarterPrice] = useState<number>(29);
  const [proPrice, setProPrice] = useState<number>(69);
  const [valueMetric, setValueMetric] = useState<string>('عدد الفواتير المعالجة شهرياً (100 فاتورة vs 1,000 فاتورة)');
  const [copied, setCopied] = useState<boolean>(false);

  const applyPreset = (preset: TemplateArchitecture) => {
    setProductName(preset.name.split(' (')[0]);
    setKillerFeature(preset.killerFeature);
    setFrontendStack(preset.stackFrontend);
    setBackendStack(preset.stackBackend);
    setDatabaseStack(preset.stackDatabase);
    setAuthStack(preset.stackAuth);
    setBillingStack(preset.stackBilling);
    setStarterPrice(preset.starterPrice);
    setProPrice(preset.proPrice);
    setValueMetric(preset.valueMetric);
  };

  const generatedSpec = `
# مواصفات بنية النسخة الأولية (MVP Product Spec & Architecture)
**اسم المنتج:** ${productName}
**الميزة الجوهرية الوحيدة (Core Killer Feature):** ${killerFeature}

---

## 1. الستاك التقني المعتمد (Technical Architecture)
- **الواجهة الأمامية (Frontend):** ${frontendStack}
- **الخلفية ومعالجة البيانات (Backend):** ${backendStack}
- **قاعدة البيانات والتخزين (Database & Storage):** ${databaseStack}
- **المصادقة وإدارة الجلسات (Authentication):** ${authStack}
- **بوابة الدفع والضرائب (Billing & MoR):** ${billingStack}

---

## 2. هيكل نموذج التسعير (Pricing & Value Metric)
- **مقياس القيمة (Value Metric):** ${valueMetric}
- **باقة البداية (Starter Tier):** $${starterPrice}/شهرياً ($${Math.round(starterPrice * 10)}/سنوياً - شهرين مجاناً)
- **باقة المحترفين (Pro Tier):** $${proPrice}/شهرياً ($${Math.round(proPrice * 10)}/سنوياً)
- **الفترة التجريبية (Free Trial):** 7 أيام تجربة لكامل الميزات بدون اشتراط بطاقة ائتمان لتقليل حاجز الدخول.

---

## 3. مخطط تدفق المستخدم (User Flow: 3 Steps to Aha! Moment)
1. **الخطوة 1 (التسجيل):** تسجيل الدخول بضغطة زر واحدة (Google One-Tap Auth).
2. **الخطوة 2 (التنفيذ):** إدخال المدخل الرئيسي (رابط / ملف / نص) والضغط على زر "تنفيذ".
3. **الخطوة 3 (القيمة):** عرض النتيجة المكتملة في أقل من 30 ثانية مع زر تصدير + إشعار بالحد المتبقي من الباقة المجانية.

---

## 4. قائمة التحقق للإطلاق في 21 يوماً (21-Day Launch Checklist)
- [ ] إعداد مشروع Next.js وربطه بمستودع GitHub
- [ ] إنشاء مشروع Supabase وتفعيل جداول: profiles, subscriptions, usage_logs
- [ ] ربط Lemon Squeezy Store وبرمجة معالج الـ Webhook (subscription_created, cancelled)
- [ ] بناء صفحة الهبوط بصيغة المشكلة والحل + فيديو توضيحي حي
- [ ] نشر المشروع على Vercel وربط النطاق المخصص (Custom Domain)
- [ ] اختبار مسار الدفع ببطاقة تجريبية والتأكد من فتح الميزات تلقائياً
- [ ] تجهيز أصول الإطلاق على Product Hunt ومجموعات X و Reddit
`.trim();

  const handleCopy = () => {
    onCopyText(generatedSpec, 'تم نسخ مواصفات الـ MVP بالكامل!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6">
      {/* Intro Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-purple-400 text-sm font-bold">
              <Code className="h-4 w-4" />
              <span>مخطط بنية الـ MVP والستاك التقني</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              مهندس مواصفات المنتج والنسخة الأولية السريعة
            </h2>
            <p className="text-sm text-zinc-400 max-w-2xl">
              حدد الميزة الجوهرية الواحدة، واختر الستاك التقني فائق السرعة، واستخرج وثيقة متكاملة (PRD) لمشروعك جاهزة للتنفيذ في أقل من 3 أسابيع.
            </p>
          </div>
        </div>

        {/* Preset Architectures */}
        <div className="mt-6 pt-4 border-t border-zinc-800">
          <span className="text-xs font-bold text-zinc-400 block mb-2">نماذج معمارية جاهزة للاختيار السريع:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRESET_ARCHITECTURES.map((arch) => (
              <button
                key={arch.id}
                onClick={() => applyPreset(arch)}
                className="text-right p-3 rounded-xl border border-zinc-800 bg-zinc-950/70 hover:border-purple-500/40 hover:bg-zinc-900/90 transition-all text-xs"
              >
                <div className="font-bold text-zinc-200">{arch.name}</div>
                <div className="text-[10px] text-purple-400 font-mono mt-0.5">{arch.category}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Inputs (Left / Span 6) */}
        <div className="lg:col-span-6 space-y-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Layers className="h-4 w-4 text-purple-400" />
            <span>تخصيص بنية المنتج</span>
          </h3>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-medium block">اسم الأداة البرمجية</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-medium block">الميزة الجوهرية الواحدة (Killer Feature)</label>
            <textarea
              rows={2}
              value={killerFeature}
              onChange={(e) => setKillerFeature(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium block">الواجهة الأمامية (Frontend)</label>
              <input
                type="text"
                value={frontendStack}
                onChange={(e) => setFrontendStack(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium block">الخلفية (Backend)</label>
              <input
                type="text"
                value={backendStack}
                onChange={(e) => setBackendStack(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium block">قاعدة البيانات (Database)</label>
              <input
                type="text"
                value={databaseStack}
                onChange={(e) => setDatabaseStack(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium block">بوابة الفوترة (Billing)</label>
              <input
                type="text"
                value={billingStack}
                onChange={(e) => setBillingStack(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium block">سعر باقة Starter ($/شهر)</label>
              <input
                type="number"
                value={starterPrice}
                onChange={(e) => setStarterPrice(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium block">سعر باقة Pro ($/شهر)</label>
              <input
                type="number"
                value={proPrice}
                onChange={(e) => setProPrice(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-medium block">معيار الترقية (Value Metric)</label>
            <input
              type="text"
              value={valueMetric}
              onChange={(e) => setValueMetric(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Generated Markdown Preview (Right / Span 6) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-purple-400" />
              <span>معاينة وثيقة المواصفات المولدة (PRD)</span>
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ الوثيقة كاملة'}</span>
            </button>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 font-mono text-xs text-zinc-300 leading-relaxed overflow-y-auto max-h-[500px] whitespace-pre-wrap selection:bg-purple-500/30 selection:text-white">
            {generatedSpec}
          </div>
        </div>
      </div>
    </div>
  );
};
