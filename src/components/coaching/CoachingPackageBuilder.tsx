import React, { useState } from 'react';
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
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  RotateCcw,
  Calendar,
  MessageSquare,
  Award
} from 'lucide-react';

interface WeekMilestone {
  id: string;
  weekNumber: number;
  title: string;
  objective: string;
  sessionDuration: number;
  deliverableTask: string;
  supportLevel: string;
}

interface BlueprintTemplate {
  id: string;
  title: string;
  durationLabel: string;
  recommendedPrice: string;
  description: string;
  weeks: WeekMilestone[];
}

const BLUEPRINT_TEMPLATES: BlueprintTemplate[] = [
  {
    id: 'blueprint-4weeks',
    title: 'برنامج التحول السريع في 4 أسابيع (4-Week Sprint)',
    durationLabel: '4 أسابيع (4 جلسات زووم + متابعة يومية)',
    recommendedPrice: '500$ - 900$',
    description: 'النموذج الذهبي الأكثر ملاءمة للمبتدئين؛ تركيز فائق، وتطبيق سريع، ونتائج مرئية خلال 30 يوماً.',
    weeks: [
      {
        id: 'w-1',
        weekNumber: 1,
        title: 'التشخيص العميق وفك الثغرات ووضع خطة العمل المخصصة',
        objective: 'فحص الوضع الحالي للعميل بدقة، تحديد أكبر عقبة تعطل تقدمه، وبناء جدول أولويات الأسبوع الأول.',
        sessionDuration: 60,
        deliverableTask: 'تسليم استمارة التشخيص وتدقيق الحساب/المشروع واعتماد خطة الـ 30 يوماً.',
        supportLevel: 'متابعة يومية عبر واتساب لضبط الأساسات'
      },
      {
        id: 'w-2',
        weekNumber: 2,
        title: 'بناء وتنفيذ النظام الأساسي وحل المشكلة الجوهرية',
        objective: 'تطبيق التعديلات التكتيكية الأولى (إعادة كتابة العرض، تحسين الحملة، إتقان الخطوات الفنية).',
        sessionDuration: 60,
        deliverableTask: 'إطلاق النسخة المعدلة ومراجعتها مع المدرب قبل الإعلان للجمهور.',
        supportLevel: 'مراجعة مسودة العرض أو التصميم خلال 24 ساعة'
      },
      {
        id: 'w-3',
        weekNumber: 3,
        title: 'الاختبار الميداني وتصحيح المسار وتجاوز المقاومة',
        objective: 'تحليل الأرقام والنتائج الأولية، إصلاح أي ثغرات مفاجئة، وتطوير أسلوب التنفيذ والمبيعات.',
        sessionDuration: 60,
        deliverableTask: 'تسجيل أول 3 تفاعلات أو مبيعات وتوثيق الملاحظات في مساحة Notion.',
        supportLevel: 'فحص سريع لرسائل العملاء أو الاعتراضات'
      },
      {
        id: 'w-4',
        weekNumber: 4,
        title: 'التثبيت والاستقلالية ووضع خطة الاستمرار والنمو الذاتي',
        objective: 'الاحتفال بالنتائج المحققة، جمع شهادة النجاح المصورة، ورسم خطة الـ 90 يوماً القادمة للعمل المستقل.',
        sessionDuration: 60,
        deliverableTask: 'تسليم خطة العمل الذاتي المستقلة وتسجيل فيديو التقييم النهائي.',
        supportLevel: 'عرض باقة المتابعة الشهرية المستمرة (Retainer)'
      }
    ]
  },
  {
    id: 'blueprint-8weeks',
    title: 'برنامج التحول الشامل لـ 8 أسابيع (8-Week Full Transformation)',
    durationLabel: '8 أسابيع (8 جلسات + تدقيق مستمر)',
    recommendedPrice: '1,200$ - 2,500$',
    description: 'للمجالات التي تتطلب بناء مهارات معقدة أو إطلاق مشاريع جديدة بالكامل (مثل إطلاق متجر جديد أو التغيير المهني الشامل).',
    weeks: [
      {
        id: 'w-8-1',
        weekNumber: 1,
        title: 'المحاذاة الشاملة والتشخيص وتحديد الهدف المالي الدقيق',
        objective: 'تدقيق الوضع والمهارات المتاحة وتحديد مؤشرات الأداء (KPIs).',
        sessionDuration: 60,
        deliverableTask: 'مستند إطلاق المشروع وتحديد العقبات الخمس الكبرى.',
        supportLevel: 'دعم يومي في الإعداد'
      },
      {
        id: 'w-8-2',
        weekNumber: 2,
        title: 'هندسة المنتج/العرض ودراسة المنافسين في السوق',
        objective: 'صياغة عرض فريد وتحديد زاوية التميز التي لا يستطيع المنافسون مجاراتها.',
        sessionDuration: 60,
        deliverableTask: 'ملف دراسة 3 منافسين وصياغة العرض النهائي.',
        supportLevel: 'مراجعة مستند العرض'
      },
      {
        id: 'w-8-3',
        weekNumber: 3,
        title: 'تجهيز البنية التحتية وأدوات التقنية والصفحات',
        objective: 'بناء وتدقيق المتجر، صفحة الهبوط، أو الملف الشخصي المعتمد.',
        sessionDuration: 60,
        deliverableTask: 'رابط النسخة التجريبية الحية للاختبار.',
        supportLevel: 'فحص فني وتصحيح أخطاء'
      },
      {
        id: 'w-8-4',
        weekNumber: 4,
        title: 'استراتيجية جلب الزيارات والعملاء المستهدفين',
        objective: 'إطلاق حملات المحتوى العضوي أو قنوات الإعلانات المناسبة.',
        sessionDuration: 60,
        deliverableTask: 'أول 5 منشورات أو حملة إعلانية تجريبية نشطة.',
        supportLevel: 'تدقيق الأرقام في منتصف الأسبوع'
      },
      {
        id: 'w-8-5',
        weekNumber: 5,
        title: 'إتقان محادثات الإغلاق والمبيعات والتعامل مع الاعتراضات',
        objective: 'تدريب عملي ومحاكاة لمكالمات البيع وتفكيك اعتراضات المشترين.',
        sessionDuration: 60,
        deliverableTask: 'تطبيق سكريبت الردود على 10 عملاء محتملين.',
        supportLevel: 'مراجعة لقطات شاشة المحادثات'
      },
      {
        id: 'w-8-6',
        weekNumber: 6,
        title: 'تحليل البيانات ومضاعفة ما ينجح (Optimization)',
        objective: 'حذف ما لا ينجح، وتركيز الميزانية والجهد على القنوات الرابحة.',
        sessionDuration: 60,
        deliverableTask: 'تقرير أداء الأسبوع وتحديد القناة الأعلى تحويلاً.',
        supportLevel: 'توجيهات تكتيكية سريعة'
      },
      {
        id: 'w-8-7',
        weekNumber: 7,
        title: 'بناء أنظمة الأتمتة وإدارة الوقت وتفادي الإرهاق',
        objective: 'تنظيم سير العمل وتوثيق الإجراءات التشغيلية القياسية (SOPs).',
        sessionDuration: 60,
        deliverableTask: 'لوحة تحكم مهام Notion للأعمال اليومية المستدامة.',
        supportLevel: 'مراجعة نظام العمل'
      },
      {
        id: 'w-8-8',
        weekNumber: 8,
        title: 'التقييم الختامي وتوثيق دراسة الحالة وخارطة التوسع',
        objective: 'مراجعة الإنجازات الشاملة وتصوير فيديو قصة النجاح.',
        sessionDuration: 60,
        deliverableTask: 'تسليم شهادة النجاح المصورة واعتماد خطة الربع القادم.',
        supportLevel: 'تقديم عرض الاستمرار السنوي'
      }
    ]
  },
  {
    id: 'blueprint-vip-day',
    title: 'باقة اليوم المكثف للنخبة (VIP Intensive Day)',
    durationLabel: 'يوم تدريبي مكثف (4 ساعات جلسة مطولة + أسبوعين متابعة)',
    recommendedPrice: '800$ - 1,800$',
    description: 'لأصحاب المشاريع المشغولين الذين يريدون حل المشكلة كاملة في جلسة واحدة مطولة دون الانتظار لأسابيع.',
    weeks: [
      {
        id: 'vip-1',
        weekNumber: 1,
        title: 'الجزء 1: التدقيق التشخيصي وتفكيك النموذج الحالي (90 دقيقة)',
        objective: 'تشريح متعمق لكل الأرقام والإجراءات وحصر الاختناقات.',
        sessionDuration: 90,
        deliverableTask: 'خارطة الاختناقات والفرص الضائعة.',
        supportLevel: 'تحضير مسبق شامل'
      },
      {
        id: 'vip-2',
        weekNumber: 2,
        title: 'الجزء 2: البناء المباشر وإعادة هندسة الاستراتيجية (150 دقيقة)',
        objective: 'العمل جنباً إلى جنب مع العميل لإنجاز الخطة، وكتابة النصوص، واعتماد القرارات فوراً في نفس المكالمة.',
        sessionDuration: 150,
        deliverableTask: 'الأصل المكتمل (العرض، الاستراتيجية، أو النظام) جاهز للعمل.',
        supportLevel: 'أسبوعان متابعة غير متزامنة لضمان التنفيذ'
      }
    ]
  }
];

export const CoachingPackageBuilder: React.FC = () => {
  const [packageTitle, setPackageTitle] = useState<string>('برنامج إطلاق خدمة الاستشارات والتدريب الفردي');
  const [packagePromise, setPackagePromise] = useState<string>('مساعدتك في تصميم باقتك وجلب أول 3 عملاء مدفوعين في 30 يوماً');
  const [packagePrice, setPackagePrice] = useState<number>(750);
  const [milestones, setMilestones] = useState<WeekMilestone[]>(BLUEPRINT_TEMPLATES[0].weeks);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSelectBlueprint = (template: BlueprintTemplate) => {
    setPackageTitle(template.title);
    setMilestones(JSON.parse(JSON.stringify(template.weeks)));
  };

  const handleAddWeek = () => {
    const nextNumber = milestones.length + 1;
    const newWeek: WeekMilestone = {
      id: `custom-w-${Date.now()}`,
      weekNumber: nextNumber,
      title: `المحطة ${nextNumber}: [أدخل عنوان المحطة الأسبوعية]`,
      objective: 'الهدف من هذه الجلسة والنتيجة المرجوة للعميل.',
      sessionDuration: 60,
      deliverableTask: 'الواجب العملي المطلوب تسليمه قبل الجلسة القادمة.',
      supportLevel: 'متابعة عبر واتساب'
    };
    setMilestones([...milestones, newWeek]);
  };

  const handleUpdateWeek = (id: string, field: keyof WeekMilestone, value: any) => {
    setMilestones(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleDeleteWeek = (id: string) => {
    if (milestones.length <= 1) return;
    const filtered = milestones.filter(item => item.id !== id);
    // re-number
    const renumbered = filtered.map((item, idx) => ({ ...item, weekNumber: idx + 1 }));
    setMilestones(renumbered);
  };

  const generateMarkdown = () => {
    let md = `# ${packageTitle}\n\n`;
    md += `**وعد البرنامج:** ${packagePromise}\n`;
    md += `**الاستثمار المطلوب:** $${packagePrice} للمشترك\n`;
    md += `**المدة الإجمالية:** ${milestones.length} محطات تدريبية مركزة\n\n`;
    md += `## خريطة الطريق الأسبوعية (Roadmap):\n\n`;

    milestones.forEach((w) => {
      md += `### الأسبوع ${w.weekNumber}: ${w.title}\n`;
      md += `- **مدة الجلسة المرئية:** ${w.sessionDuration} دقيقة (Zoom)\n`;
      md += `- **هدف الجلسة:** ${w.objective}\n`;
      md += `- **الواجب التطبيقي:** ${w.deliverableTask}\n`;
      md += `- **الدعم بين الجلسات:** ${w.supportLevel}\n\n`;
    });

    md += `---\n*تم إعداد هذا المخطط عبر منصة RikouZone لرواد الأعمال والمستشارين.*\n`;
    return md;
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdown();
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              <Layers className="h-3.5 w-3.5" />
              <span>مُصمم ومُهندس باقات وبرامج التدريب</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              تصميم خريطة طريق باقة التدريب (Coaching Roadmap)
            </h2>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              ابنِ برنامج تدريب منظم وواضح المعالم بالأهداف والواجبات لكل أسبوع، لتشاركه مع عملائك في مقترحات العمل أو تنسخه مباشرة إلى مساحة عمل Notion.
            </p>
          </div>

          <button
            onClick={handleCopyMarkdown}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              copied 
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                : 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20'
            }`}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'تم نسخ المخطط كاملاً!' : 'نسخ المخطط (Markdown)'}</span>
          </button>
        </div>

        {/* Blueprint Templates Selectors */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80">
          <span className="text-xs font-black text-zinc-300 uppercase tracking-wider block mb-3">
            نماذج برامج جاهزة للاستيراد السريع:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {BLUEPRINT_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => handleSelectBlueprint(tmpl)}
                className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-800/50 hover:border-amber-500/40 text-right transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white group-hover:text-amber-400 transition-colors">
                    {tmpl.title}
                  </span>
                  <span className="text-[10px] font-bold text-amber-400">
                    {tmpl.recommendedPrice}
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                  {tmpl.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Package Meta Info */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
        <h3 className="text-sm font-black text-white flex items-center gap-2">
          <Award className="h-4 w-4 text-amber-400" />
          <span>المعلومات الأساسية للبرنامج</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">اسم البرنامج التدريبي</label>
            <input
              type="text"
              value={packageTitle}
              onChange={(e) => setPackageTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white focus:border-amber-500 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">وعد النتيجة النهائي</label>
            <input
              type="text"
              value={packagePromise}
              onChange={(e) => setPackagePromise(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:border-amber-500 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">سعر الاستثمار الموصى به ($)</label>
            <input
              type="number"
              step="50"
              value={packagePrice}
              onChange={(e) => setPackagePrice(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-emerald-400 focus:border-amber-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Weeks Milestone List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Calendar className="h-4 w-4 text-amber-400" />
            <span>محطات وخريطة الجلسات ({milestones.length} محطات)</span>
          </h3>

          <button
            onClick={handleAddWeek}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all border border-zinc-700"
          >
            <Plus className="h-3.5 w-3.5 text-amber-400" />
            <span>إضافة أسبوع جديد</span>
          </button>
        </div>

        <div className="space-y-4">
          {milestones.map((w, idx) => (
            <div
              key={w.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4 transition-all hover:border-zinc-700"
            >
              <div className="flex items-center justify-between gap-4 border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-black flex items-center justify-center border border-amber-500/30">
                    {w.weekNumber}
                  </span>
                  <input
                    type="text"
                    value={w.title}
                    onChange={(e) => handleUpdateWeek(w.id, 'title', e.target.value)}
                    className="font-black text-white text-sm bg-transparent border-b border-transparent focus:border-amber-500 outline-none sm:w-96"
                    placeholder="عنوان المحطة"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <input
                      type="number"
                      value={w.sessionDuration}
                      onChange={(e) => handleUpdateWeek(w.id, 'sessionDuration', Number(e.target.value))}
                      className="w-12 px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-center text-white"
                    />
                    <span>دقيقة</span>
                  </span>

                  {milestones.length > 1 && (
                    <button
                      onClick={() => handleDeleteWeek(w.id)}
                      className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="حذف هذا الأسبوع"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-zinc-400 font-bold block">هدف الجلسة وما سنحققه:</label>
                  <textarea
                    rows={2}
                    value={w.objective}
                    onChange={(e) => handleUpdateWeek(w.id, 'objective', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:border-amber-500 outline-none resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 font-bold block">الواجب التطبيقي المطلوب:</label>
                  <textarea
                    rows={2}
                    value={w.deliverableTask}
                    onChange={(e) => handleUpdateWeek(w.id, 'deliverableTask', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:border-amber-500 outline-none resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 font-bold block">الدعم بين الجلسات:</label>
                  <textarea
                    rows={2}
                    value={w.supportLevel}
                    onChange={(e) => handleUpdateWeek(w.id, 'supportLevel', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:border-amber-500 outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
