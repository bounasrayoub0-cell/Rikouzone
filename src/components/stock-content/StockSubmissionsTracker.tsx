import React, { useState, useEffect } from 'react';
import { BarChart3, Plus, Trash2, CheckCircle2, Clock, XCircle, Search, Filter, Sparkles, Film, Camera, Music, DollarSign } from 'lucide-react';

export interface StockSubmission {
  id: string;
  title: string;
  mediaType: 'photo' | 'footage' | 'audio' | 'vector';
  platform: 'Adobe Stock' | 'Shutterstock' | 'Pond5' | 'Envato' | 'Freepik';
  uploadDate: string;
  status: 'under-review' | 'approved' | 'rejected';
  rejectionReason?: string;
  downloadsCount: number;
  lifetimeEarnings: number;
}

const DEFAULT_SUBMISSIONS: StockSubmission[] = [
  {
    id: 'sub-1',
    title: 'Young Arab entrepreneur coding on laptop in modern sunny coworking office',
    mediaType: 'footage',
    platform: 'Adobe Stock',
    uploadDate: '2026-09-12',
    status: 'approved',
    downloadsCount: 14,
    lifetimeEarnings: 210.5
  },
  {
    id: 'sub-2',
    title: 'Mature Moroccan woodcarver hands chiseling cedar wood in artisan workshop',
    mediaType: 'footage',
    platform: 'Pond5',
    uploadDate: '2026-09-15',
    status: 'approved',
    downloadsCount: 8,
    lifetimeEarnings: 240.0
  },
  {
    id: 'sub-3',
    title: 'Female doctor examining senior patient with stethoscope in hospital clinic',
    mediaType: 'photo',
    platform: 'Shutterstock',
    uploadDate: '2026-09-20',
    status: 'approved',
    downloadsCount: 32,
    lifetimeEarnings: 28.8
  },
  {
    id: 'sub-4',
    title: 'Clean digital UI tap button click sound effect collection for mobile apps',
    mediaType: 'audio',
    platform: 'Envato',
    uploadDate: '2026-09-25',
    status: 'approved',
    downloadsCount: 45,
    lifetimeEarnings: 180.0
  },
  {
    id: 'sub-5',
    title: 'Pedestrians walking in historic medina street sunny morning',
    mediaType: 'footage',
    platform: 'Adobe Stock',
    uploadDate: '2026-10-02',
    status: 'rejected',
    rejectionReason: 'Trademark / Logo',
    downloadsCount: 0,
    lifetimeEarnings: 0
  },
  {
    id: 'sub-6',
    title: 'Arabic traditional mint tea poured in glass slow motion 4k',
    mediaType: 'footage',
    platform: 'Adobe Stock',
    uploadDate: '2026-10-10',
    status: 'under-review',
    downloadsCount: 0,
    lifetimeEarnings: 0
  }
];

const STORAGE_KEY = 'rikouzone_stock_submissions_tracker';

export const StockSubmissionsTracker: React.FC = () => {
  const [submissions, setSubmissions] = useState<StockSubmission[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_SUBMISSIONS;
    } catch {
      return DEFAULT_SUBMISSIONS;
    }
  });

  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newMediaType, setNewMediaType] = useState<'photo' | 'footage' | 'audio' | 'vector'>('footage');
  const [newPlatform, setNewPlatform] = useState<'Adobe Stock' | 'Shutterstock' | 'Pond5' | 'Envato' | 'Freepik'>('Adobe Stock');
  const [newStatus, setNewStatus] = useState<'under-review' | 'approved' | 'rejected'>('under-review');
  const [newRejectionReason, setNewRejectionReason] = useState<string>('Trademark / Logo');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch (e) {
      console.error(e);
    }
  }, [submissions]);

  const handleAddSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newSub: StockSubmission = {
      id: `sub-${Date.now()}`,
      title: newTitle.trim(),
      mediaType: newMediaType,
      platform: newPlatform,
      uploadDate: new Date().toISOString().split('T')[0],
      status: newStatus,
      rejectionReason: newStatus === 'rejected' ? newRejectionReason : undefined,
      downloadsCount: 0,
      lifetimeEarnings: 0
    };

    setSubmissions([newSub, ...submissions]);
    setNewTitle('');
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا السجل من المحفظة؟')) {
      setSubmissions(submissions.filter((s) => s.id !== id));
    }
  };

  const handleUpdateStatus = (id: string, status: 'approved' | 'rejected' | 'under-review', reason?: string) => {
    setSubmissions(
      submissions.map((s) =>
        s.id === id ? { ...s, status, rejectionReason: status === 'rejected' ? (reason || 'Focus / Soft') : undefined } : s
      )
    );
  };

  // Metrics
  const totalSubmissions = submissions.length;
  const approvedCount = submissions.filter((s) => s.status === 'approved').length;
  const rejectedCount = submissions.filter((s) => s.status === 'rejected').length;
  const underReviewCount = submissions.filter((s) => s.status === 'under-review').length;
  const totalEarnings = submissions.reduce((acc, s) => acc + s.lifetimeEarnings, 0);
  const totalDownloads = submissions.reduce((acc, s) => acc + s.downloadsCount, 0);

  const decidedSubmissions = approvedCount + rejectedCount;
  const acceptanceRate = decidedSubmissions > 0 ? Math.round((approvedCount / decidedSubmissions) * 100) : 100;

  // Filtered
  const filteredList = submissions.filter((sub) => {
    const matchPlatform = filterPlatform === 'all' || sub.platform === filterPlatform;
    const matchStatus = filterStatus === 'all' || sub.status === filterStatus;
    const matchSearch = sub.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPlatform && matchStatus && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">سجل متابعة الحافظة والملفات والقبول (Stock Tracker)</h2>
              <p className="text-xs text-zinc-400">
                لوحة تحكم مصغرة لتسجيل الأصول المرفوعة، وتتبع نسب القبول والرفض، ومراقبة المبيعات التراكمية
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-black text-black hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-500/10"
          >
            <Plus className="h-4 w-4" />
            <span>{showAddForm ? 'إلغاء الإضافة' : 'إضافة ملف مرفوع جديد'}</span>
          </button>
        </div>

        {/* Dashboard Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-zinc-800">
          <div className="rounded-xl bg-zinc-950/60 border border-zinc-800 p-3.5">
            <span className="text-[11px] font-bold text-zinc-400 block">إجمالي أصول المحفظة</span>
            <div className="text-2xl font-black text-white mt-1">{totalSubmissions} ملف</div>
            <span className="text-[10px] text-zinc-500">{underReviewCount} قيد المراجعة</span>
          </div>

          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3.5">
            <span className="text-[11px] font-bold text-emerald-400 block">معدل القبول (Acceptance)</span>
            <div className="text-2xl font-black text-emerald-300 mt-1">{acceptanceRate}%</div>
            <span className="text-[10px] text-emerald-500">{approvedCount} مقبول · {rejectedCount} مرفوض</span>
          </div>

          <div className="rounded-xl bg-zinc-950/60 border border-zinc-800 p-3.5">
            <span className="text-[11px] font-bold text-zinc-400 block">إجمالي التحميلات</span>
            <div className="text-2xl font-black text-white mt-1">{totalDownloads}</div>
            <span className="text-[10px] text-zinc-500">تحميل من كافة المنصات</span>
          </div>

          <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3.5">
            <span className="text-[11px] font-bold text-amber-400 block">الأرباح التراكمية المسجلة</span>
            <div className="text-2xl font-black text-amber-300 mt-1">${totalEarnings.toFixed(1)}</div>
            <span className="text-[10px] text-amber-500">حقوق ملكية سلبية فعلية</span>
          </div>
        </div>
      </div>

      {/* Add New Submission Modal / Drawer */}
      {showAddForm && (
        <form onSubmit={handleAddSubmission} className="rounded-2xl border border-amber-500/40 bg-zinc-900/90 p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Plus className="h-4 w-4 text-amber-400" />
            <span>تسجيل أصل رقمي جديد في الحافظة</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-zinc-300 mb-1">عنوان الملف باللغة الإنجليزية:</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Young Arab female doctor holding digital tablet"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-300 mb-1">نوع المحتوى (Media Type):</label>
              <select
                value={newMediaType}
                onChange={(e) => setNewMediaType(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="footage">فيديو سينمائي 4K B-roll</option>
                <option value="photo">صورة فوتوغرافية</option>
                <option value="audio">ملف صوتي / مؤثّر SFX</option>
                <option value="vector">رسم توضيحي / فيكتور</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-zinc-300 mb-1">المنصة المرفوع إليها:</label>
              <select
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="Adobe Stock">Adobe Stock</option>
                <option value="Shutterstock">Shutterstock</option>
                <option value="Pond5">Pond5</option>
                <option value="Envato">Envato Elements</option>
                <option value="Freepik">Freepik</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-zinc-300 mb-1">حالة المراجعة الحالية:</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="under-review">قيد المراجعة (Under Review)</option>
                <option value="approved">تم القبول والموافقة (Approved)</option>
                <option value="rejected">تم الرفض (Rejected)</option>
              </select>
            </div>

            {newStatus === 'rejected' && (
              <div className="md:col-span-2">
                <label className="block font-bold text-rose-400 mb-1">سبب الرفض المذكور في رسالة المراجع:</label>
                <select
                  value={newRejectionReason}
                  onChange={(e) => setNewRejectionReason(e.target.value)}
                  className="w-full rounded-xl border border-rose-500/50 bg-zinc-950 px-3 py-2 text-white focus:border-rose-400 focus:outline-none"
                >
                  <option value="Focus / Soft">Focus Issues (عدم حدة التركيز البؤري)</option>
                  <option value="Noise / Grain">Noise / Artifacts (تشويش أو تحبب زائد)</option>
                  <option value="Trademark / Logo">Intellectual Property (ظهور شعار أو علامة تجارية)</option>
                  <option value="Missing Model Release">Missing Model Release (غياب تصريح العارض)</option>
                  <option value="Similar Submissions">Similar Submissions (تكرار لقطات شديدة الشبه)</option>
                  <option value="Lack of Commercial Value">Lack of Commercial Value (غياب التطبيق التجاري)</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-xl border border-zinc-700 px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-black text-black hover:bg-amber-400"
            >
              حفظ الأصل في السجل
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute right-3.5 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="بحث في أسماء الملفات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 pr-10 pl-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-300 focus:border-amber-500 focus:outline-none"
          >
            <option value="all">كل المنصات</option>
            <option value="Adobe Stock">Adobe Stock</option>
            <option value="Shutterstock">Shutterstock</option>
            <option value="Pond5">Pond5</option>
            <option value="Envato">Envato Elements</option>
            <option value="Freepik">Freepik</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-300 focus:border-amber-500 focus:outline-none"
          >
            <option value="all">كل الحالات</option>
            <option value="approved">مقبول فقط</option>
            <option value="under-review">قيد المراجعة</option>
            <option value="rejected">مرفوض فقط</option>
          </select>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-3">
        {filteredList.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-zinc-800 bg-zinc-900/20 text-zinc-500 text-xs">
            لا توجد أصول مطابقة لمعايير البحث الحالية.
          </div>
        ) : (
          filteredList.map((sub) => {
            return (
              <div
                key={sub.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 transition-all hover:border-zinc-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800/80 border border-zinc-700 text-amber-400 mt-0.5">
                    {sub.mediaType === 'footage' ? (
                      <Film className="h-5 w-5" />
                    ) : sub.mediaType === 'audio' ? (
                      <Music className="h-5 w-5" />
                    ) : (
                      <Camera className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1 dir-ltr text-right">
                      {sub.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-zinc-400">
                      <span className="font-semibold text-zinc-300">{sub.platform}</span>
                      <span>·</span>
                      <span>{sub.uploadDate}</span>
                      <span>·</span>
                      <span className="capitalize">{sub.mediaType}</span>
                      {sub.rejectionReason && (
                        <>
                          <span>·</span>
                          <span className="text-rose-400 font-bold">سبب الرفض: {sub.rejectionReason}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                  <div className="text-right">
                    <div className="text-xs font-black text-white">
                      ${sub.lifetimeEarnings.toFixed(1)}
                    </div>
                    <div className="text-[10px] text-zinc-500">
                      {sub.downloadsCount} تحميل
                    </div>
                  </div>

                  {/* Status Badge & Actions */}
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                      sub.status === 'approved'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                        : sub.status === 'rejected'
                        ? 'border-rose-500/30 bg-rose-500/10 text-rose-400'
                        : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                    }`}>
                      {sub.status === 'approved' ? (
                        <>
                          <CheckCircle2 className="h-3 w-3" />
                          <span>مقبول</span>
                        </>
                      ) : sub.status === 'rejected' ? (
                        <>
                          <XCircle className="h-3 w-3" />
                          <span>مرفوض</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3" />
                          <span>قيد الفحص</span>
                        </>
                      )}
                    </span>

                    <button
                      onClick={() => handleDelete(sub.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="حذف الملف"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
