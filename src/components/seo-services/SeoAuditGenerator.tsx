import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  RotateCcw,
  ShieldCheck,
  Search,
  Globe,
  Sliders,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

interface AuditCheckItem {
  id: string;
  category: string;
  title: string;
  description: string;
  importance: 'حرج جداً' | 'متوسط' | 'تحسين إضافي';
  checked: boolean;
  notes?: string;
}

interface SeoAuditGeneratorProps {
  onCopyText: (text: string, label: string) => void;
}

export const SeoAuditGenerator: React.FC<SeoAuditGeneratorProps> = ({ onCopyText }) => {
  const [clientName, setClientName] = useState('شركة الأمل للخدمات');
  const [websiteUrl, setWebsiteUrl] = useState('alamal-services.com');
  const [auditorName, setAuditorName] = useState('أخصائي السيو المعتمد');
  const [copied, setCopied] = useState(false);

  const initialChecklist: AuditCheckItem[] = [
    {
      id: 'indexing',
      category: '1. الفهرسة والأرشفة (Indexing)',
      title: 'فهرسة الموقع وملف robots.txt',
      description: 'الموقع مفهرس في جوجل، وملف robots.txt لا يمنع عناكب البحث من أرشفة الصفحات الهامة.',
      importance: 'حرج جداً',
      checked: true
    },
    {
      id: 'sitemap',
      category: '1. الفهرسة والأرشفة (Indexing)',
      title: 'خريطة الموقع sitemap.xml محدثة',
      description: 'يوجد ملف sitemap.xml صحيح متاح ومقدم إلى لوحة Google Search Console بدون أخطاء.',
      importance: 'حرج جداً',
      checked: true
    },
    {
      id: 'https',
      category: '2. الأمان والعناوين (Security & URLs)',
      title: 'شهادة أمان HTTPS وتوحيد النطاق',
      description: 'الموقع يعمل بشهادة SSL آمنة ويقوم بتحويل http تلقائياً إلى https مع توحيد www.',
      importance: 'حرج جداً',
      checked: true
    },
    {
      id: 'clean_urls',
      category: '2. الأمان والعناوين (Security & URLs)',
      title: 'روابط نظيفة وقصيرة (Clean URLs)',
      description: 'الروابط واضحة وتصف محتوى الصفحة بدون رموز عشوائية أو معلمات برمجية معقدة.',
      importance: 'متوسط',
      checked: false
    },
    {
      id: 'h1_tag',
      category: '3. بنية العناوين والمحتوى (Headings & Content)',
      title: 'وسم H1 فريد وواضح لكل صفحة',
      description: 'تحتوي كل صفحة على وسم H1 واحد فقط يضم الكلمة المفتاحية الرئيسية بأسلوب طبيعي.',
      importance: 'حرج جداً',
      checked: false
    },
    {
      id: 'meta_titles',
      category: '3. بنية العناوين والمحتوى (Headings & Content)',
      title: 'عناوين سيو جذابة (SEO Titles)',
      description: 'عناوين الصفحات فريدة، بين 50-60 حرفاً، وتضم دافعاً وميزة تشجع على النقر.',
      importance: 'حرج جداً',
      checked: false
    },
    {
      id: 'meta_desc',
      category: '3. بنية العناوين والمحتوى (Headings & Content)',
      title: 'أوصاف ميتة مقنعة (Meta Descriptions)',
      description: 'كل صفحة رئيسية تملك وصفاً جذاباً بين 130-155 حرفاً مع دعوة واضحة لاتخاذ إجراء.',
      importance: 'متوسط',
      checked: false
    },
    {
      id: 'broken_links',
      category: '4. الروابط وتجربة المستخدم (Links & Navigation)',
      title: 'خلو الموقع من الروابط المعطلة (404s)',
      description: 'تم فحص الروابط الداخلية والخارجية والتأكد من عدم وجود روابط مكسورة أو سلاسل تحويل.',
      importance: 'حرج جداً',
      checked: true
    },
    {
      id: 'internal_links',
      category: '4. الروابط وتجربة المستخدم (Links & Navigation)',
      title: 'شبكة الروابط الداخلية (Internal Linking)',
      description: 'المقالات والصفحات الفرعية ترتبط بالصفحات البيعية بنصوص رابط طبيعية ومفهومة.',
      importance: 'متوسط',
      checked: false
    },
    {
      id: 'images_alt',
      category: '5. الوسائط والسرعة (Images & Performance)',
      title: 'ضغط الصور ونصوص Alt البديلة',
      description: 'الصور بصيغة WebP خفيفة (أقل من 150KB) وتحتوي جميعها على وصف Alt نصي دقيق.',
      importance: 'متوسط',
      checked: false
    },
    {
      id: 'mobile_speed',
      category: '5. الوسائط والسرعة (Images & Performance)',
      title: 'سرعة التحميل وتوافق الجوال (Mobile Core Web Vitals)',
      description: 'الموقع سريع التحميل على شبكات 4G (مؤشر LCP أقل من 2.8 ثانية) ومتجاوب مع شاشات الهواتف.',
      importance: 'حرج جداً',
      checked: false
    },
    {
      id: 'local_nap',
      category: '6. التواجد المحلي والبيانات (Local Signals)',
      title: 'اتساق بيانات النشاط (NAP Consistency)',
      description: 'اسم الشركة وعنوانها وهاتفها مذكور في تذييل الموقع ومطابق تماماً للملف التجاري على الخرائط.',
      importance: 'متوسط',
      checked: true
    }
  ];

  const [checklist, setChecklist] = useState<AuditCheckItem[]>(initialChecklist);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  // Calculate score
  const totalCount = checklist.length;
  const passedCount = checklist.filter((i) => i.checked).length;
  const healthScore = Math.round((passedCount / totalCount) * 100);

  const getHealthBadge = (score: number) => {
    if (score >= 80) {
      return {
        text: 'صحة ممتازة (جاهز للتصدر)',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        advice: 'الموقع في حالة جيدة جداً، يحتاج فقط لتعزيز الروابط والمحتوى الجديد.'
      };
    }
    if (score >= 55) {
      return {
        text: 'صحة متوسطة (يحتاج إصلاحات)',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        advice: 'يوجد أخطاء في العناوين والسرعة تحجب الموقع عن الصفحة الأولى. التدخل سيرفع النتائج سريعاً.'
      };
    }
    return {
      text: 'حالة حرجة (يفقد زبائن يومياً)',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      advice: 'الموقع يعاني من مشاكل فهرسة وسرعة وبنية عناوين خطيرة تتطلب تدخلاً عاجلاً.'
    };
  };

  const badge = getHealthBadge(healthScore);

  const generateReportText = () => {
    const passedItems = checklist.filter((i) => i.checked);
    const failedItems = checklist.filter((i) => !i.checked);

    return `================================================
📊 تقرير الفحص والتدقيق السريع لمحركات البحث (SEO Audit Report)
================================================
الموقع المستهدف: ${websiteUrl}
العميل: ${clientName}
أخصائي السيو: ${auditorName}
تاريخ الفحص: ${new Date().toLocaleDateString('ar-EG')}
مستوى الجاهزية العامة: ${healthScore}% (${badge.text})

------------------------------------------------
🔍 ملخص النتائج التنفيذية:
- عناصر تم اجتيازها بنجاح: ${passedCount} من أصل ${totalCount}
- نقاط ضعف وثغرات تتطلب إصلاحاً: ${failedItems.length}
------------------------------------------------

⚠️ أهم المشاكل المكتشفة التي تمنع الموقع من التصدر:
${failedItems.map((item, idx) => `${idx + 1}. [${item.importance}] ${item.title}:
   - التفاصيل: ${item.description}`).join('\n\n')}

------------------------------------------------
✅ النقاط الإيجابية المتوفرة حالياً في الموقع:
${passedItems.map((item, idx) => `+ ${item.title}`).join('\n')}

------------------------------------------------
🚀 خطة العمل الموصى بها في أول 30 يوماً:
1. إصلاح المشاكل الحرجة أولاً (العناوين والسرعة وبنية الـ H1).
2. إعادة صياغة الـ Meta Descriptions لتحسين نسبة النقر (CTR).
3. هيكلة الروابط الداخلية وربطها بالصفحات ذات النية الشرائية.
4. تتبع النتائج ومراقبة نمو النقرات عبر لوحة Google Search Console.

تم إعداد هذا التقرير بواسطة: ${auditorName}
للتواصل ومناقشة تفاصيل خطة الإصلاح: [رقم الهاتف / واتساب]
================================================`;
  };

  const handleCopyReport = () => {
    const text = generateReportText();
    onCopyText(text, 'تقرير تدقيق السيو الجاهز للعميل');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setChecklist(initialChecklist);
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Search className="h-4 w-4" />
            <span>أداة تدقيق السيو العملية ومولد التقارير</span>
          </div>
          <h3 className="mt-1 text-2xl font-black text-white">
            فاحص الموقع ومولد تقرير التدقيق الاحترافي (Client-Ready Audit)
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            حدد حالة كل عنصر في موقع العميل، وشاهد كيف يُحسب مؤشر الصحة تلقائياً، ثم انسخ التقرير النهائي بضغطة زر واحدة لتقديمه لعميلك.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3.5 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-700 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>إعادة تعيين</span>
          </button>
          <button
            onClick={handleCopyReport}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-black text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all"
          >
            {copied ? <Check className="h-4 w-4 stroke-[3]" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'تم نسخ التقرير الكامل!' : 'نسخ التقرير النهائي للعميل'}</span>
          </button>
        </div>
      </div>

      {/* Client Information Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-zinc-300 mb-1.5">اسم العميل / الشركة</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            placeholder="مثال: عيادة النخيل للأسنان"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-300 mb-1.5">رابط موقع العميل</label>
          <input
            type="text"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            placeholder="مثال: al-nakheel-dental.ma"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-300 mb-1.5">اسمك (أخصائي السيو)</label>
          <input
            type="text"
            value={auditorName}
            onChange={(e) => setAuditorName(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            placeholder="مثال: أيوب - مستشار سيو"
          />
        </div>
      </div>

      {/* Live Score Display Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800">
            <span className="text-3xl font-black text-amber-400 font-sans">{healthScore}%</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-bold border ${badge.color}`}>
                {badge.text}
              </span>
              <span className="text-xs text-zinc-400">
                ({passedCount} سليم / {totalCount - passedCount} يحتاج إصلاح)
              </span>
            </div>
            <p className="mt-1.5 text-xs text-zinc-300 leading-relaxed max-w-xl">
              {badge.advice}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 shrink-0">
          <ShieldCheck className="h-4 w-4 text-amber-400" />
          <span>جاهز للعرض في مكالمة الاستكشاف</span>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>نقاط الفحص والتدقيق (اضغط على أي عنصر لتحديد حالته):</span>
          </h4>
          <span className="text-xs text-zinc-400">
            الأخضر = سليم ومعتمد | الرمادي = مشكلة تتطلب إصلاحاً
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {checklist.map((item) => {
            const isChecked = item.checked;
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all select-none ${
                  isChecked
                    ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50'
                    : 'border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 fill-emerald-400/20" />
                    ) : (
                      <XCircle className="h-5 w-5 text-zinc-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-bold ${isChecked ? 'text-white' : 'text-zinc-300'}`}>
                        {item.title}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.importance === 'حرج جداً'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {item.importance}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-500">{item.category}</span>
                      <span className={isChecked ? 'text-emerald-400 font-bold' : 'text-rose-400 font-medium'}>
                        {isChecked ? '✓ تم اجتياز الفحص' : '✗ نقطة ضعف تتطلب تدخل'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Preview Box */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
            <FileText className="h-4 w-4 text-amber-400" />
            <span>معاينة نص التقرير الجاهز للنسخ والإرسال للعميل:</span>
          </div>
          <button
            onClick={handleCopyReport}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>نسخ النص</span>
          </button>
        </div>
        <pre className="max-h-60 overflow-y-auto whitespace-pre-wrap rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4 font-mono text-xs text-zinc-300 leading-relaxed dir-ltr text-right">
          {generateReportText()}
        </pre>
      </div>
    </div>
  );
};
