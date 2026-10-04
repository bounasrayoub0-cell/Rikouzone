import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  CheckCircle2, 
  Filter, 
  Sparkles,
  Share2,
  Clock,
  Send,
  Edit3
} from 'lucide-react';
import { ContentCalendarItem } from '../../data/socialMediaDataTypes';
import { initialCalendarItems } from '../../data/socialMediaModulesPart2';

interface ContentCalendarToolProps {
  onCopyText: (text: string, label: string) => void;
}

const CALENDAR_STORAGE_KEY = 'rz_smm_calendar_items';

export const ContentCalendarTool: React.FC<ContentCalendarToolProps> = ({ onCopyText }) => {
  const [items, setItems] = useState<ContentCalendarItem[]>(() => {
    try {
      const stored = localStorage.getItem(CALENDAR_STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialCalendarItems;
    } catch {
      return initialCalendarItems;
    }
  });

  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State
  const [newDay, setNewDay] = useState('الإثنين');
  const [newPlatform, setNewPlatform] = useState<ContentCalendarItem['platform']>('Instagram');
  const [newContentType, setNewContentType] = useState<ContentCalendarItem['contentType']>('Reel / Short');
  const [newIdea, setNewIdea] = useState('');
  const [newHook, setNewHook] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newCta, setNewCta] = useState('');
  const [newStatus, setNewStatus] = useState<ContentCalendarItem['status']>('Ready');

  useEffect(() => {
    try {
      localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save calendar items:', e);
    }
  }, [items]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdea.trim()) return;

    const newItem: ContentCalendarItem = {
      id: 'cal-' + Date.now(),
      day: newDay,
      platform: newPlatform,
      contentType: newContentType,
      idea: newIdea.trim(),
      hook: newHook.trim() || 'لا يوجد خطاف محدد',
      caption: newCaption.trim() || 'اكتب نص الكابشن هنا...',
      cta: newCta.trim() || 'احفظ المنشور وشاركه مع أصدقائك 📌',
      status: newStatus
    };

    setItems(prev => [newItem, ...prev]);
    setNewIdea('');
    setNewHook('');
    setNewCaption('');
    setNewCta('');
    setIsAdding(false);
    onCopyText('', 'تمت إضافة المنشور إلى تقويم المحتوى بنجاح!');
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleUpdateStatus = (id: string, nextStatus: ContentCalendarItem['status']) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: nextStatus } : i));
  };

  const handleCopyItem = (item: ContentCalendarItem) => {
    const text = `📌 خطة منشور [${item.day}] - ${item.platform} (${item.contentType})
🎯 الفكرة: ${item.idea}
⚡ الخطاف (Hook): ${item.hook}
📝 الكابشن:
${item.caption}
👉 الـ CTA: ${item.cta}
الحالة: ${item.status}`;

    onCopyText(text, 'تم نسخ تفاصيل المنشور بنجاح!');
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAll = () => {
    const fullCalendar = items.map((it, idx) => 
      `${idx + 1}. [${it.day}] ${it.platform} (${it.contentType}) - حالة: ${it.status}
الفكرة: ${it.idea}
الخطاف: ${it.hook}
الكابشن: ${it.caption}
الـ CTA: ${it.cta}
---------------------------------------------`
    ).join('\n\n');

    onCopyText(fullCalendar, 'تم نسخ جدول المحتوى بالكامل!');
  };

  const filteredItems = items.filter(i => {
    if (platformFilter !== 'all' && i.platform !== platformFilter) return false;
    if (statusFilter !== 'all' && i.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-950 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-300">
              <Calendar className="h-3.5 w-3.5" />
              <span>أداة تخطيط وجدولة المحتوى التفاعلية</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
              تقويم المحتوى التفاعلي (Content Calendar Planner)
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              أنشئ خطة المحتوى للعميل، حدد اليوم، المنصة، نوع المحتوى، الفكرة، الخطاف، الكابشن، والـ CTA مع تتبع حالة النشر ونسخ الخطة بضغطة زر واحدة.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-black text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
            >
              <Plus className="h-4 w-4" />
              <span>{isAdding ? 'إغلاق النموذج' : 'إضافة منشور جديد'}</span>
            </button>
            <button
              onClick={handleExportAll}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/90 px-4 py-2.5 text-xs font-bold text-zinc-200 hover:bg-zinc-700 hover:text-white transition-all"
            >
              <Copy className="h-4 w-4 text-amber-400" />
              <span>نسخ الخطة بالكامل</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Item Form Modal/Collapsible */}
      {isAdding && (
        <form onSubmit={handleAddItem} className="rounded-3xl border border-amber-500/40 bg-zinc-900/90 p-6 sm:p-8 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200 shadow-2xl">
          <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Plus className="h-5 w-5 text-amber-400" />
            <span>إضافة منشور جديد إلى تقويم المحتوى</span>
          </h3>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">اليوم</label>
              <select 
                value={newDay} 
                onChange={(e) => setNewDay(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                {['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">المنصة</label>
              <select 
                value={newPlatform} 
                onChange={(e) => setNewPlatform(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                {['Instagram', 'TikTok', 'Facebook', 'LinkedIn', 'YouTube', 'Pinterest'].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">نوع المحتوى</label>
              <select 
                value={newContentType} 
                onChange={(e) => setNewContentType(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                {['Reel / Short', 'Carousel', 'Static Post', 'Story', 'Thread / Article'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">حالة النشر</label>
              <select 
                value={newStatus} 
                onChange={(e) => setNewStatus(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                {['Draft', 'Ready', 'Scheduled', 'Published'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">الفكرة المركزية للمنشور *</label>
              <input
                type="text"
                required
                value={newIdea}
                onChange={(e) => setNewIdea(e.target.value)}
                placeholder="مثال: 5 أسرار توفر عليك 30% من تكاليف العناية بالبشرة..."
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">الخطاف (Hook - أول 3 ثوانٍ)</label>
                <input
                  type="text"
                  value={newHook}
                  onChange={(e) => setNewHook(e.target.value)}
                  placeholder="مثال: توقف عن شراء هذا المنتج قبل أن تعرف هذا الفرق..."
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">الدعوة للعمل (CTA)</label>
                <input
                  type="text"
                  value={newCta}
                  onChange={(e) => setNewCta(e.target.value)}
                  placeholder="مثال: احفظ المنشور 📌 | اكتب (طلب) في التعليقات..."
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">نص الكابشن (Caption)</label>
              <textarea
                rows={3}
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                placeholder="اكتب نص الكابشن الكامل هنا مع النقاط والهاشتاجات..."
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-black text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
            >
              حفظ المنشور في التقويم
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        {/* Platform Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {['all', 'Instagram', 'TikTok', 'Facebook', 'LinkedIn', 'YouTube', 'Pinterest'].map(p => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                platformFilter === p
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {p === 'all' ? 'جميع المنصات' : p}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-zinc-500 font-semibold">الحالة:</span>
          {['all', 'Draft', 'Ready', 'Scheduled', 'Published'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                statusFilter === s
                  ? 'bg-zinc-800 text-amber-400 border border-amber-500/30'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {s === 'all' ? 'الكل' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => {
          const isCopied = copiedId === item.id;
          return (
            <div 
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 hover:border-amber-500/40 transition-all shadow-lg"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-zinc-800 px-2.5 py-1 text-xs font-black text-amber-400">
                      {item.day}
                    </span>
                    <span className="rounded-lg bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[11px] font-bold text-blue-400">
                      {item.platform}
                    </span>
                  </div>

                  {/* Status Tag dropdown */}
                  <select
                    value={item.status}
                    onChange={(e) => handleUpdateStatus(item.id, e.target.value as any)}
                    className={`rounded-lg px-2 py-0.5 text-[10px] font-black border transition-all cursor-pointer ${
                      item.status === 'Published'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : item.status === 'Scheduled'
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                        : item.status === 'Ready'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}
                  >
                    <option value="Draft">مسودة (Draft)</option>
                    <option value="Ready">جاهز (Ready)</option>
                    <option value="Scheduled">مجدول (Scheduled)</option>
                    <option value="Published">تم النشر (Published)</option>
                  </select>
                </div>

                <div className="inline-block text-[11px] font-bold text-zinc-400 mb-1.5">
                  الشكل: <span className="text-zinc-200">{item.contentType}</span>
                </div>

                <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                  {item.idea}
                </h4>

                <div className="mt-3 rounded-xl bg-zinc-950/70 p-3 border border-zinc-800/80 space-y-2">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">الخطاف (Hook):</span>
                    <p className="text-xs text-zinc-300 font-medium italic line-clamp-2 mt-0.5">
                      "{item.hook}"
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">الدعوة للعمل (CTA):</span>
                    <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                      {item.cta}
                    </p>
                  </div>
                </div>

                {item.caption && (
                  <p className="mt-3 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                )}
              </div>

              {/* Bottom Card Actions */}
              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                <button
                  onClick={() => handleCopyItem(item)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    isCopied
                      ? 'bg-emerald-500 text-black'
                      : 'bg-zinc-800 text-zinc-200 hover:bg-amber-500 hover:text-black'
                  }`}
                >
                  {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{isCopied ? 'تم النسخ' : 'نسخ المنشور'}</span>
                </button>

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="rounded-lg p-1.5 text-zinc-500 hover:text-rose-400 transition-colors"
                  title="حذف المنشور"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
