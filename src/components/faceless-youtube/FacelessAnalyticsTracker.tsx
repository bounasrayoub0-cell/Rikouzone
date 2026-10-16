import React, { useState, useEffect } from 'react';
import { BarChart3, Plus, Trash2, TrendingUp, Sparkles, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';

interface AnalyticsEntry {
  id: string;
  title: string;
  views: number;
  ctr: number; // e.g. 6.5%
  retention30s: number; // e.g. 70%
  overallRetention: number; // e.g. 45%
  date: string;
}

const DEFAULT_ENTRIES: AnalyticsEntry[] = [
  {
    id: 'entry-1',
    title: 'قصة سقوط أكبر شركة تأمين في العالم',
    views: 14500,
    ctr: 8.4,
    retention30s: 72,
    overallRetention: 51,
    date: '2026-10-01'
  },
  {
    id: 'entry-2',
    title: '5 أدوات ذكاء اصطناعي تفيدك في دراستك',
    views: 3200,
    ctr: 3.8,
    retention30s: 68,
    overallRetention: 48,
    date: '2026-10-08'
  },
  {
    id: 'entry-3',
    title: 'الحقيقة الصادمة عن أزمة البنوك (عنوان مضلل سابق)',
    views: 5100,
    ctr: 11.2,
    retention30s: 42,
    overallRetention: 28,
    date: '2026-10-15'
  }
];

export const FacelessAnalyticsTracker: React.FC = () => {
  const [entries, setEntries] = useState<AnalyticsEntry[]>(() => {
    try {
      const saved = localStorage.getItem('faceless_analytics_entries_v1');
      return saved ? JSON.parse(saved) : DEFAULT_ENTRIES;
    } catch {
      return DEFAULT_ENTRIES;
    }
  });

  const [formTitle, setFormTitle] = useState<string>('');
  const [formViews, setFormViews] = useState<number>(5000);
  const [formCtr, setFormCtr] = useState<number>(6.5);
  const [formRet30, setFormRet30] = useState<number>(65);
  const [formRetOverall, setFormRetOverall] = useState<number>(45);

  useEffect(() => {
    try {
      localStorage.setItem('faceless_analytics_entries_v1', JSON.stringify(entries));
    } catch (e) {
      console.error(e);
    }
  }, [entries]);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newEntry: AnalyticsEntry = {
      id: `entry-${Date.now()}`,
      title: formTitle.trim(),
      views: Number(formViews),
      ctr: Number(formCtr),
      retention30s: Number(formRet30),
      overallRetention: Number(formRetOverall),
      date: new Date().toISOString().split('T')[0]
    };

    setEntries((prev) => [newEntry, ...prev]);
    setFormTitle('');
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((item) => item.id !== id));
  };

  // Helper diagnosis function
  const diagnoseEntry = (item: AnalyticsEntry) => {
    const isGoodCtr = item.ctr >= 6.0;
    const isGoodRet = item.retention30s >= 65 && item.overallRetention >= 40;

    if (isGoodCtr && isGoodRet) {
      return {
        badge: 'فيديو متميز (Outlier Potential)',
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        action: 'العنوان والغلاف والهوك ممتازون معاً؛ كرر نفس أسلوب المونتاج والسرد في الفيديو القادم فوراً.'
      };
    } else if (!isGoodCtr && isGoodRet) {
      return {
        badge: 'مشكلة غلاف/عنوان (Hidden Gem)',
        badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        action: 'المحتوى الداخلي ممتاز لكن الغلاف أو العنوان ضعيف؛ صمم صورة مصغرة جديدة بتباين أعلى وجرب عنواناً مختلفاً.'
      };
    } else if (isGoodCtr && !isGoodRet) {
      return {
        badge: 'مشكلة هوك/Clickbait مضلل',
        badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
        action: 'الغلاف جذب نقرات كثيرة لكن المشاهد هرب سريعاً؛ تأكد من حذف المقدمات البطيئة والدخول في صلب الموضوع فوراً.'
      };
    } else {
      return {
        badge: 'فكرة ضعيفة أو نيتش غير متطابق',
        badgeColor: 'bg-zinc-800 text-zinc-400 border-zinc-700',
        action: 'الموضوع إما لا يهم جمهور القناة أو أن أسلوب الطرح يحتاج لمراجعة شاملة للزاوية التحريرية.'
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 via-zinc-900 to-zinc-950 p-5 sm:p-6 shadow-xl shadow-red-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-amber-500 text-black shadow-lg shadow-red-500/30">
              <BarChart3 className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/30 px-2.5 py-0.5 text-xs font-bold text-red-400">
                <Sparkles className="h-3 w-3" />
                <span>أداة التشخيص اليدوي لمؤشرات YouTube Studio</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                محلل الأداء اليدوي واستخراج فرص التحسين
              </h2>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
          أدخل بيانات فيديوهاتك من YouTube Studio (نسبة النقر CTR ونسب الاحتفاظ بالجمهور) للحصول على تشخيص فوري لنقاط الضعف وخطة عملية لتحسين الفيديو التالي.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleAddEntry} className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-lg space-y-4">
        <h3 className="text-xs font-black text-zinc-400 uppercase tracking-wider">
          إدخال بيانات فيديو جديد من YouTube Analytics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="lg:col-span-2">
            <label className="text-[11px] font-bold text-zinc-400 block mb-1">عنوان الفيديو</label>
            <input
              type="text"
              placeholder="مثلاً: كيف سقطت إمبراطورية التجارة القديمة؟"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-zinc-400 block mb-1">المشاهدات (Views)</label>
            <input
              type="number"
              value={formViews}
              onChange={(e) => setFormViews(Number(e.target.value))}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-mono text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-zinc-400 block mb-1">نسبة النقر (CTR %)</label>
            <input
              type="number"
              step="0.1"
              value={formCtr}
              onChange={(e) => setFormCtr(Number(e.target.value))}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-mono text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-zinc-400 block mb-1">احتفاظ أول 30 ثانية (%)</label>
            <input
              type="number"
              value={formRet30}
              onChange={(e) => setFormRet30(Number(e.target.value))}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-mono text-white focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="text-[11px] text-zinc-400">
            متوسط مدة المشاهدة الإجمالية المعتاد للفيديوهات الناجحة يتجاوز 45% - 50%.
          </div>
          <button
            type="submit"
            className="rounded-xl bg-red-500 px-5 py-2 text-xs font-black text-black hover:bg-red-400 cursor-pointer transition-all"
          >
            إضافة وتحليل الفيديو
          </button>
        </div>
      </form>

      {/* Entries List & Diagnosis Cards */}
      <div className="space-y-3">
        {entries.map((entry) => {
          const diag = diagnoseEntry(entry);
          return (
            <div
              key={entry.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 sm:p-5 shadow-lg space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <div>
                  <h4 className="text-sm sm:text-base font-black text-white">{entry.title}</h4>
                  <span className="text-[10px] font-mono text-zinc-400">تاريخ الإدخال: {entry.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${diag.badgeColor}`}>
                    {diag.badge}
                  </span>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-zinc-400 hover:text-red-400 p-1 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 block font-sans">المشاهدات:</span>
                  <span className="text-sm font-black text-white">{entry.views.toLocaleString()}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 block font-sans">نسبة النقر CTR:</span>
                  <span className={`text-sm font-black ${entry.ctr >= 6.0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {entry.ctr}%
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 block font-sans">احتفاظ 30 ثانية:</span>
                  <span className={`text-sm font-black ${entry.retention30s >= 65 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {entry.retention30s}%
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 block font-sans">الاحتفاظ الكلي:</span>
                  <span className={`text-sm font-black ${entry.overallRetention >= 40 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {entry.overallRetention}%
                  </span>
                </div>
              </div>

              {/* Recommendation Action Box */}
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 font-bold">التوصية التحريرية: </strong>
                  {diag.action}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
