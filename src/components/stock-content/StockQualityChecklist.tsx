import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckSquare, Sparkles, AlertCircle, RefreshCw, CheckCircle2, Camera, Scale, FileText } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'technical' | 'legal' | 'metadata';
  title: string;
  description: string;
  critical: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // 1. Technical Quality Checks
  {
    id: 'tech-1',
    category: 'technical',
    title: 'فحص التكبير 100% (1:1 Pixel Peep) للتأكد من حدة الفوكس',
    description: 'العين أو الموضوع التجاري الرئيسي حاد تماماً بدون أي ضبابية أو اهتزاز أثناء التصوير.',
    critical: true
  },
  {
    id: 'tech-2',
    category: 'technical',
    title: 'فحص النويز والتشويش الرقمي في مناطق الظلال',
    description: 'عدم وجود تحبب رقمي مزعج ناجم عن رفع الـ ISO بشكل مفرط في الإضاءة المنخفضة.',
    critical: true
  },
  {
    id: 'tech-3',
    category: 'technical',
    title: 'توازن التعريض اللوني (White Balance & Exposure)',
    description: 'ألوان المشهد طبيعية وواقعية، ولا يوجد حرق في الإضاءات العالية (Blown Highlights) أو سواد تام في الظلال.',
    critical: false
  },
  {
    id: 'tech-4',
    category: 'technical',
    title: 'مطابقة مواصفات الفيديو (4K / ثابت الإطارات / مدة 5-30 ثانية)',
    description: 'تصدير بمعدل بت عالي (Bitrate 100+ Mbps) وبترميز H.264/ProRes بدون تقطيع.',
    critical: true
  },
  {
    id: 'tech-5',
    category: 'technical',
    title: 'معايير الصوت: WAV 24-bit / 48kHz بدون قص (No Clipping)',
    description: 'قمم الصوت لا تتجاوز -3dB إلى -6dB وخلو الخلفية من همس المكيفات والرياح.',
    critical: false
  },

  // 2. Legal & Compliance Checks
  {
    id: 'legal-1',
    category: 'legal',
    title: 'المسح التام للعلامات التجارية والشعارات (Logo Sweep)',
    description: 'إزالة أو طمس أي شعار على الحواسيب، الهواتف، الملابس، الأحذية، وزجاجات المشروبات بالأدوات الرقمية.',
    critical: true
  },
  {
    id: 'legal-2',
    category: 'legal',
    title: 'إرفاق تصريح العارض (Model Release) لكل شخص مميز الملامح',
    description: 'النموذج موقع قانونياً من العارض والمصور مع تاريخ يطابق أو يسبق تاريخ جلسة التصوير.',
    critical: true
  },
  {
    id: 'legal-3',
    category: 'legal',
    title: 'تصريح ولي الأمر في حال ظهور أطفال (Minor Release)',
    description: 'توقيع الوصي القانوني الرسمي للأطفال القاصرين دون سن 18 عاماً لمنع الرفض الفوري.',
    critical: true
  },
  {
    id: 'legal-4',
    category: 'legal',
    title: 'التأكد من عدم تصوير ممتلكات خاصة أو لوحات فنية حديثة دون إذن',
    description: 'الديكورات المعمارية الخاصة أو الجداريات واللوحات الفنية التشكيلية محمية بقوانين الملكية الفكرية.',
    critical: false
  },

  // 3. Descriptive & Metadata Checks
  {
    id: 'meta-1',
    category: 'metadata',
    title: 'عنوان وصفي إنجليزي دقيق وشامل (بدون حشو شعري)',
    description: 'يحدد الفاعل والنشاط والمكان بالإنجليزية بوضوح (8 إلى 14 كلمة).',
    critical: true
  },
  {
    id: 'meta-2',
    category: 'metadata',
    title: 'بين 25 إلى 40 كلمة مفتاحية مرتبة من الأهم للأخص',
    description: 'الكلمات السبع الأولى تمثل جوهر المشهد مع تجنب حشو كلمات تريند لا علاقة لها بالصورة.',
    critical: true
  },
  {
    id: 'meta-3',
    category: 'metadata',
    title: 'التصنيف الصحيح في لوحة المنصة (Category & Asset Type)',
    description: 'تحديد الفئة التجارية الدقيقة (Business, Healthcare, Food...) وتحديد ما إذا كان الملف صورة أو توضيحياً أو فيديو.',
    critical: false
  }
];

const STORAGE_KEY = 'rikouzone_stock_quality_checklist';

export const StockQualityChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'technical' | 'legal' | 'metadata'>('all');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [checkedIds]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    if (window.confirm('هل تريد إعادة تعيين قائمة فحص الجودة لملف جديد؟')) {
      setCheckedIds([]);
    }
  };

  const filteredItems = CHECKLIST_ITEMS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const completedCount = checkedIds.length;
  const totalCount = CHECKLIST_ITEMS.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const criticalPending = CHECKLIST_ITEMS.filter(
    (item) => item.critical && !checkedIds.includes(item.id)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <CheckSquare className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">قائمة تدقيق الجودة الشاملة قبل الرفع (Pre-Upload QA)</h2>
              <p className="text-xs text-zinc-400">
                بروتوكول التدقيق الثلاثي (الفني، القانوني، والوصفي) لضمان نسبة قبول تفوق 95% وتفادي تراجع رتبة الحساب
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>إعادة تعيين لملف جديد</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-5 border-t border-zinc-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-zinc-300">
              مستوى جاهزية الملف للإرسال: {completedCount} من {totalCount} معايير
            </span>
            <span className={`font-black ${progressPercent === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {progressPercent}%
            </span>
          </div>
          <div className="h-2.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                progressPercent === 100
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {criticalPending.length > 0 ? (
            <div className="mt-3 flex items-center gap-2 text-xs text-amber-400/90 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>يوجد {criticalPending.length} معيار جوهري (Critical) غير مكتمل قد يسبب رفض الملف فوراً!</span>
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>جميع المعايير الجوهرية مكتملة بنجاح! الملف جاهز للرفع بثقة تامة.</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'كافة المعايير (12)', icon: Sparkles },
          { id: 'technical', label: 'الفحص التقني (5)', icon: Camera },
          { id: 'legal', label: 'الفحص القانوني والتراخيص (4)', icon: Scale },
          { id: 'metadata', label: 'الفحص الوصفي والـ SEO (3)', icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Checklist Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`rounded-2xl border p-4.5 transition-all cursor-pointer flex items-start gap-3.5 ${
                isChecked
                  ? 'border-emerald-500/40 bg-emerald-500/5'
                  : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}} // handled by parent onClick
                className="mt-1 h-5 w-5 rounded border-zinc-700 text-emerald-500 accent-emerald-500 shrink-0 cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className={`text-xs font-black ${isChecked ? 'text-white line-through opacity-70' : 'text-white'}`}>
                    {item.title}
                  </h4>
                  {item.critical && (
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 shrink-0">
                      معيار إلزامي
                    </span>
                  )}
                </div>
                <p className={`text-xs leading-relaxed ${isChecked ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
