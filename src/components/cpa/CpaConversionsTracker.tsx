import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  TrendingUp, 
  Plus, 
  Trash2, 
  RotateCcw,
  DollarSign,
  MousePointerClick,
  Sparkles
} from 'lucide-react';

interface ConversionLogItem {
  id: string;
  date: string;
  offerName: string;
  channel: string;
  clicks: number;
  initialLeads: number;
  approvedLeads: number;
  payout: number;
  rejectionReason: 'لا يوجد - مقبول بالكامل' | 'عدم تطابق الدولة (Geo Mismatch)' | 'إيميل غير مفعل (Invalid Email)' | 'تسجيل مكرر (Duplicate Lead)' | 'ترافيك غير مطابق للشروط';
}

const DEFAULT_LOGS: ConversionLogItem[] = [
  {
    id: 'log-1',
    date: '2026-03-01',
    offerName: 'TaskFlow AI (CPL SOI)',
    channel: 'مقال مدونة SEO',
    clicks: 420,
    initialLeads: 38,
    approvedLeads: 34,
    payout: 4.00,
    rejectionReason: 'إيميل غير مفعل (Invalid Email)'
  },
  {
    id: 'log-2',
    date: '2026-03-05',
    offerName: 'تطبيق تنظيم الميزانية (CPI)',
    channel: 'شرح فيديو يوتيوب',
    clicks: 650,
    initialLeads: 72,
    approvedLeads: 65,
    payout: 2.20,
    rejectionReason: 'عدم تطابق الدولة (Geo Mismatch)'
  },
  {
    id: 'log-3',
    date: '2026-03-10',
    offerName: 'منصة استبيانات رأي (Survey DOI)',
    channel: 'مجموعات مجتمعية مهتمة',
    clicks: 310,
    initialLeads: 24,
    approvedLeads: 16,
    payout: 2.80,
    rejectionReason: 'تسجيل مكرر (Duplicate Lead)'
  }
];

export const CpaConversionsTracker: React.FC = () => {
  const [logs, setLogs] = useState<ConversionLogItem[]>(DEFAULT_LOGS);

  // Form State for Adding New Row
  const [newOffer, setNewOffer] = useState('');
  const [newChannel, setNewChannel] = useState('');
  const [newClicks, setNewClicks] = useState<number>(100);
  const [newInitial, setNewInitial] = useState<number>(10);
  const [newApproved, setNewApproved] = useState<number>(8);
  const [newPayout, setNewPayout] = useState<number>(3.50);
  const [newReason, setNewReason] = useState<ConversionLogItem['rejectionReason']>('لا يوجد - مقبول بالكامل');

  const handleAddRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOffer.trim()) return;

    const newItem: ConversionLogItem = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      offerName: newOffer.trim(),
      channel: newChannel.trim() || 'قناة مخصصة',
      clicks: Math.max(0, newClicks),
      initialLeads: Math.max(0, newInitial),
      approvedLeads: Math.min(newInitial, Math.max(0, newApproved)),
      payout: Math.max(0, newPayout),
      rejectionReason: newReason
    };

    setLogs(prev => [newItem, ...prev]);
    setNewOffer('');
    setNewChannel('');
  };

  const handleDeleteRow = (id: string) => {
    setLogs(prev => prev.filter(item => item.id !== id));
  };

  const handleReset = () => {
    setLogs(DEFAULT_LOGS);
  };

  // Aggregated Stats
  const totals = logs.reduce(
    (acc, item) => {
      acc.totalClicks += item.clicks;
      acc.totalInitial += item.initialLeads;
      acc.totalApproved += item.approvedLeads;
      acc.totalRejected += Math.max(0, item.initialLeads - item.approvedLeads);
      acc.totalRevenue += item.approvedLeads * item.payout;
      return acc;
    },
    { totalClicks: 0, totalInitial: 0, totalApproved: 0, totalRejected: 0, totalRevenue: 0 }
  );

  const approvalRate = totals.totalInitial > 0 
    ? Math.round((totals.totalApproved / totals.totalInitial) * 100) 
    : 0;

  const averageEpc = totals.totalClicks > 0 
    ? (totals.totalRevenue / totals.totalClicks) 
    : 0;

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950/40 via-zinc-900 to-cyan-950/30 border border-zinc-800 rounded-2xl p-6 sm:p-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold font-mono">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>CPA Performance & Quality Auditor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            جدول تتبع النقرات والتحويلات المقبولة والمرفوضة
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
            سجل حملاتك وعروضك بانتظام لتراقب معدل قبول التحويلات (Approval Rate) وتكشف مواطن تسرب الأرباح وأسباب الرفض الشائعة قبل تفاقمها.
          </p>
        </div>
      </div>

      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <span className="text-[11px] text-zinc-400 block flex items-center gap-1">
            <MousePointerClick className="h-3.5 w-3.5 text-cyan-400" />
            <span>إجمالي النقرات المتتبعة:</span>
          </span>
          <span className="text-xl sm:text-2xl font-black text-white font-mono">
            {totals.totalClicks.toLocaleString()}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <span className="text-[11px] text-zinc-400 block flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>التحويلات المعتمدة المقبولة:</span>
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
            {totals.totalApproved}
            <span className="text-xs text-zinc-500 font-normal mr-1">/ {totals.totalInitial}</span>
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <span className="text-[11px] text-zinc-400 block flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
            <span>معدل القبول (Approval Rate):</span>
          </span>
          <span className={`text-xl sm:text-2xl font-black font-mono ${
            approvalRate >= 80 ? 'text-emerald-400' : 'text-amber-400'
          }`}>
            {approvalRate}%
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <span className="text-[11px] text-zinc-400 block flex items-center gap-1">
            <DollarSign className="h-3.5 w-3.5 text-purple-400" />
            <span>الأرباح المعتمدة (EPC):</span>
          </span>
          <span className="text-xl sm:text-2xl font-black text-purple-400 font-mono">
            ${totals.totalRevenue.toFixed(2)}
            <span className="text-[10px] text-zinc-500 font-normal block">(${averageEpc.toFixed(3)}/نقرة)</span>
          </span>
        </div>
      </div>

      {/* Add Entry Form */}
      <form onSubmit={handleAddRow} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-4 text-right">
        <h4 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-zinc-800 pb-2.5">
          <Plus className="h-4 w-4 text-cyan-400" />
          <span>إضافة سجل حملة أو عرض جديد للمتابعة:</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div>
            <label className="text-zinc-400 block mb-1">اسم العرض:</label>
            <input
              type="text"
              placeholder="مثال: App X CPI"
              value={newOffer}
              onChange={(e) => setNewOffer(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">قناة الزيارات:</label>
            <input
              type="text"
              placeholder="يوتيوب / SEO"
              value={newChannel}
              onChange={(e) => setNewChannel(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">عدد النقرات:</label>
            <input
              type="number"
              min="0"
              value={newClicks}
              onChange={(e) => setNewClicks(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">المسجلون (Leads):</label>
            <input
              type="number"
              min="0"
              value={newInitial}
              onChange={(e) => setNewInitial(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">المقبولون (Approved):</label>
            <input
              type="number"
              min="0"
              value={newApproved}
              onChange={(e) => setNewApproved(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">العمولة ($):</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={newPayout}
              onChange={(e) => setNewPayout(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
          <div className="w-full sm:w-auto flex items-center gap-2 text-xs">
            <span className="text-zinc-400 shrink-0">سبب الرفض الغالب:</span>
            <select
              value={newReason}
              onChange={(e) => setNewReason(e.target.value as any)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-white text-xs focus:outline-none"
            >
              <option value="لا يوجد - مقبول بالكامل">لا يوجد - مقبول بالكامل</option>
              <option value="عدم تطابق الدولة (Geo Mismatch)">عدم تطابق الدولة (Geo Mismatch)</option>
              <option value="إيميل غير مفعل (Invalid Email)">إيميل غير مفعل (Invalid Email)</option>
              <option value="تسجيل مكرر (Duplicate Lead)">تسجيل مكرر (Duplicate Lead)</option>
              <option value="ترافيك غير مطابق للشروط">ترافيك غير مطابق للشروط</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            إضافة السجل
          </button>
        </div>
      </form>

      {/* Log Table */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 font-bold">
              <tr>
                <th className="p-3.5">التاريخ</th>
                <th className="p-3.5">العرض</th>
                <th className="p-3.5">القناة</th>
                <th className="p-3.5">النقرات</th>
                <th className="p-3.5">المسجلون</th>
                <th className="p-3.5">المقبولون</th>
                <th className="p-3.5">المرفوضون</th>
                <th className="p-3.5">الإيراد</th>
                <th className="p-3.5">سبب الرفض</th>
                <th className="p-3.5 text-center">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
              {logs.map((log) => {
                const rejected = Math.max(0, log.initialLeads - log.approvedLeads);
                const revenue = log.approvedLeads * log.payout;

                return (
                  <tr key={log.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-3.5 font-mono text-[11px] text-zinc-400">{log.date}</td>
                    <td className="p-3.5 font-bold text-white">{log.offerName}</td>
                    <td className="p-3.5 text-zinc-400">{log.channel}</td>
                    <td className="p-3.5 font-mono">{log.clicks}</td>
                    <td className="p-3.5 font-mono text-zinc-300">{log.initialLeads}</td>
                    <td className="p-3.5 font-mono font-bold text-emerald-400">
                      {log.approvedLeads}
                    </td>
                    <td className="p-3.5 font-mono text-rose-400">
                      {rejected > 0 ? `${rejected}` : '0'}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-white">
                      ${revenue.toFixed(2)}
                    </td>
                    <td className="p-3.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        rejected === 0 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {log.rejectionReason}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => handleDeleteRow(log.id)}
                        className="text-zinc-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                        title="حذف"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3.5 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <span>إجمالي السجلات: {logs.length}</span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>استعادة البيانات الافتراضية</span>
          </button>
        </div>
      </div>
    </div>
  );
};
