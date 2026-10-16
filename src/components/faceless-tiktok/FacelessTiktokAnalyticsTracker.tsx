import React, { useState, useEffect, useMemo } from 'react';
import { BarChart3, Plus, Trash2, TrendingUp, Sparkles, AlertCircle, CheckCircle2, Save, HelpCircle, Layers } from 'lucide-react';

export interface TiktokVideoEntry {
  id: string;
  title: string;
  date: string;
  durationSec: number;
  views: number;
  avgWatchSec: number;
  hookRetentionPct: number; // % who watched first 3s
  fullCompletionPct: number; // % who completed full video
  likes: number;
  comments: number;
  shares: number;
  hookType: string;
}

const DEFAULT_ENTRIES: TiktokVideoEntry[] = [
  {
    id: 'entry-1',
    title: '3 مواقع سرية توفر عليك ساعتين يومياً',
    date: '2026-10-10',
    durationSec: 28,
    views: 14200,
    avgWatchSec: 18.5,
    hookRetentionPct: 68,
    fullCompletionPct: 32,
    likes: 1250,
    comments: 94,
    shares: 310,
    hookType: 'توفير الوقت والقيمة الفورية'
  },
  {
    id: 'entry-2',
    title: 'سيكولوجية التسويف: لماذا نؤجل ما نعلم أنه الأهم؟',
    date: '2026-10-12',
    durationSec: 35,
    views: 4800,
    avgWatchSec: 14.2,
    hookRetentionPct: 44,
    fullCompletionPct: 16,
    likes: 310,
    comments: 28,
    shares: 42,
    hookType: 'سؤال فلسفي هادئ'
  }
];

export const FacelessTiktokAnalyticsTracker: React.FC = () => {
  const [entries, setEntries] = useState<TiktokVideoEntry[]>(DEFAULT_ENTRIES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<TiktokVideoEntry>>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    durationSec: 30,
    views: 1000,
    avgWatchSec: 15,
    hookRetentionPct: 60,
    fullCompletionPct: 25,
    likes: 80,
    comments: 12,
    shares: 20,
    hookType: 'نفي معتقد شائع'
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('faceless_tiktok_analytics_entries_v1');
      if (stored) {
        setEntries(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load analytics entries from localStorage', e);
    }
  }, []);

  const saveEntries = (updated: TiktokVideoEntry[]) => {
    setEntries(updated);
    localStorage.setItem('faceless_tiktok_analytics_entries_v1', JSON.stringify(updated));
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.title) return;

    const created: TiktokVideoEntry = {
      id: `v_${Date.now()}`,
      title: newEntry.title,
      date: newEntry.date || new Date().toISOString().split('T')[0],
      durationSec: Number(newEntry.durationSec) || 30,
      views: Number(newEntry.views) || 0,
      avgWatchSec: Number(newEntry.avgWatchSec) || 0,
      hookRetentionPct: Number(newEntry.hookRetentionPct) || 0,
      fullCompletionPct: Number(newEntry.fullCompletionPct) || 0,
      likes: Number(newEntry.likes) || 0,
      comments: Number(newEntry.comments) || 0,
      shares: Number(newEntry.shares) || 0,
      hookType: newEntry.hookType || 'عام'
    };

    saveEntries([created, ...entries]);
    setShowAddForm(false);
    setNewEntry({
      title: '',
      date: new Date().toISOString().split('T')[0],
      durationSec: 30,
      views: 1000,
      avgWatchSec: 15,
      hookRetentionPct: 60,
      fullCompletionPct: 25,
      likes: 80,
      comments: 12,
      shares: 20,
      hookType: 'نفي معتقد شائع'
    });
  };

  const handleDeleteEntry = (id: string) => {
    saveEntries(entries.filter((item) => item.id !== id));
  };

  const getDiagnostics = (item: TiktokVideoEntry) => {
    const tips: string[] = [];
    const retentionRate = Math.round((item.avgWatchSec / item.durationSec) * 100);

    if (item.hookRetentionPct < 50) {
      tips.push('⚠️ تسرب في أول 3 ثوانٍ؛ الخطاف يحتاج إلى صدمة بصرية أو كسر نمط أقوى لتوقيف التمرير.');
    } else {
      tips.push('✓ خطاف ممتاز؛ أكثر من نصف المشاهدين تجاوزوا أول 3 ثوانٍ بنجاح.');
    }

    if (item.fullCompletionPct >= 25) {
      tips.push('🔥 معدل إكمال استثنائي (25%+); الخوارزمية سترشح هذا الفيديو بقوة لجمهور أوسع.');
    } else if (item.fullCompletionPct < 15) {
      tips.push('⏳ هبوط في منتصف المقطع؛ تأكد من حذف أي فراغ صامت وتغيير اللقطة كل ثانيتين.');
    }

    const engagementRate = item.views > 0 ? (((item.likes + item.comments + item.shares) / item.views) * 100).toFixed(1) : '0';
    if (Number(engagementRate) >= 8) {
      tips.push(`💎 معدل تفاعل قوي جداً (${engagementRate}%); الجمهور يرى قيمة عملية حقيقية في هذا الموضوع.`);
    }

    return { tips, retentionRate, engagementRate };
  };

  const totalViews = useMemo(() => entries.reduce((acc, curr) => acc + curr.views, 0), [entries]);
  const avgCompletion = useMemo(() => {
    if (entries.length === 0) return 0;
    return Math.round(entries.reduce((acc, curr) => acc + curr.fullCompletionPct, 0) / entries.length);
  }, [entries]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-400 mb-3">
              <BarChart3 className="h-3.5 w-3.5" />
              <span>محلل الأداء اليدوي (Manual TikTok Analytics & Diagnostics)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              قراءة لغة الأرقام وتحويل البيانات إلى قرارات تطوير
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              أدخل نتائج مقاطعك المنشورة بعد 48 ساعة من TikTok Analytics لتحصل فوراً على تشخيص علمي دقيق لأسباب الصعود أو الهبوط وخطة التحسين للفيديو القادم.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <Plus className="h-4 w-4" />
              <span>إدخال بيانات فيديو جديد</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl text-center">
          <div className="text-xs text-zinc-400 mb-1">إجمالي الفيديوهات المسجلة</div>
          <div className="text-xl font-black text-white">{entries.length} مقاطع</div>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl text-center">
          <div className="text-xs text-zinc-400 mb-1">إجمالي المشاهدات</div>
          <div className="text-xl font-black text-cyan-400">{totalViews.toLocaleString()}</div>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl text-center">
          <div className="text-xs text-zinc-400 mb-1">متوسط الإكمال الكامل</div>
          <div className="text-xl font-black text-emerald-400">{avgCompletion}%</div>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl text-center">
          <div className="text-xs text-zinc-400 mb-1">هدف معدل الإكمال</div>
          <div className="text-xl font-black text-amber-400">+25%</div>
        </div>
      </div>

      {/* Add New Entry Form Modal / Box */}
      {showAddForm && (
        <form onSubmit={handleAddEntry} className="p-6 rounded-3xl border border-cyan-500/40 bg-zinc-950 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>إدخال نتائج مقطع منشور من TikTok Analytics</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              إلغاء
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-zinc-400 font-bold block mb-1">عنوان الفيديو أو الفكرة:</label>
              <input
                type="text"
                required
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                placeholder="مثال: 3 أدوات مجانية في دقيقة"
              />
            </div>

            <div>
              <label className="text-zinc-400 font-bold block mb-1">نوع الخطاف المستخدم:</label>
              <input
                type="text"
                value={newEntry.hookType}
                onChange={(e) => setNewEntry({ ...newEntry, hookType: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                placeholder="مثال: نفي معتقد، سؤال صادم..."
              />
            </div>

            <div>
              <label className="text-zinc-400 font-bold block mb-1">مدة الفيديو بالثواني:</label>
              <input
                type="number"
                value={newEntry.durationSec}
                onChange={(e) => setNewEntry({ ...newEntry, durationSec: Number(e.target.value) })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-zinc-400 font-bold block mb-1">المشاهدات (Views):</label>
              <input
                type="number"
                value={newEntry.views}
                onChange={(e) => setNewEntry({ ...newEntry, views: Number(e.target.value) })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-zinc-400 font-bold block mb-1">متوسط مدة المشاهدة (ثوانٍ):</label>
              <input
                type="number"
                step="0.1"
                value={newEntry.avgWatchSec}
                onChange={(e) => setNewEntry({ ...newEntry, avgWatchSec: Number(e.target.value) })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-zinc-400 font-bold block mb-1">نسبة إكمال أول 3 ثوانٍ (%):</label>
              <input
                type="number"
                value={newEntry.hookRetentionPct}
                onChange={(e) => setNewEntry({ ...newEntry, hookRetentionPct: Number(e.target.value) })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-zinc-400 font-bold block mb-1">نسبة إكمال الفيديو كاملاً (%):</label>
              <input
                type="number"
                value={newEntry.fullCompletionPct}
                onChange={(e) => setNewEntry({ ...newEntry, fullCompletionPct: Number(e.target.value) })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-zinc-400 font-bold block mb-1">الإعجابات (Likes):</label>
              <input
                type="number"
                value={newEntry.likes}
                onChange={(e) => setNewEntry({ ...newEntry, likes: Number(e.target.value) })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-zinc-400 font-bold block mb-1">التعليقات والمشاركات:</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="تعليقات"
                  value={newEntry.comments}
                  onChange={(e) => setNewEntry({ ...newEntry, comments: Number(e.target.value) })}
                  className="bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="number"
                  placeholder="مشاركات"
                  value={newEntry.shares}
                  onChange={(e) => setNewEntry({ ...newEntry, shares: Number(e.target.value) })}
                  className="bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              حفظ وتحليل الأداء
            </button>
          </div>
        </form>
      )}

      {/* Entries List with Real-time Diagnostics */}
      <div className="space-y-4">
        {entries.map((item) => {
          const { tips, retentionRate, engagementRate } = getDiagnostics(item);

          return (
            <div
              key={item.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6 space-y-4 transition-all hover:border-zinc-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700">
                      {item.date}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      نمط الخطاف: {item.hookType}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white">{item.title}</h3>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right sm:text-left">
                    <div className="text-xs text-zinc-500">المشاهدات</div>
                    <div className="text-lg font-black text-white">{item.views.toLocaleString()}</div>
                  </div>
                  <button
                    onClick={() => handleDeleteEntry(item.id)}
                    className="p-2 rounded-xl bg-zinc-800/80 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                    title="حذف السجل"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
                <div className="bg-zinc-950 p-2.5 rounded-2xl border border-zinc-800">
                  <div className="text-[11px] text-zinc-400 mb-0.5">مدة الفيديو</div>
                  <div className="font-bold text-zinc-200">{item.durationSec} ثانية</div>
                </div>
                <div className="bg-zinc-950 p-2.5 rounded-2xl border border-zinc-800">
                  <div className="text-[11px] text-zinc-400 mb-0.5">متوسط المشاهدة</div>
                  <div className="font-bold text-zinc-200">{item.avgWatchSec} ث ({retentionRate}%)</div>
                </div>
                <div className="bg-zinc-950 p-2.5 rounded-2xl border border-zinc-800">
                  <div className="text-[11px] text-zinc-400 mb-0.5">صمود أول 3 ثوانٍ</div>
                  <div className={`font-bold ${item.hookRetentionPct >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {item.hookRetentionPct}%
                  </div>
                </div>
                <div className="bg-zinc-950 p-2.5 rounded-2xl border border-zinc-800">
                  <div className="text-[11px] text-zinc-400 mb-0.5">إكمال المقطع كاملاً</div>
                  <div className={`font-bold ${item.fullCompletionPct >= 25 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {item.fullCompletionPct}%
                  </div>
                </div>
                <div className="bg-zinc-950 p-2.5 rounded-2xl border border-zinc-800">
                  <div className="text-[11px] text-zinc-400 mb-0.5">معدل التفاعل</div>
                  <div className="font-bold text-cyan-400">{engagementRate}%</div>
                </div>
              </div>

              {/* Diagnostic Feedback Box */}
              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1.5 text-xs">
                <div className="font-bold text-zinc-400 flex items-center gap-1.5 mb-1">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span>التحليل التشخيصي وتوصيات الفيديو القادم:</span>
                </div>
                <ul className="space-y-1 text-zinc-300 leading-relaxed">
                  {tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
