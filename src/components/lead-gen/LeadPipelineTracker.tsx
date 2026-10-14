import React, { useState, useEffect } from 'react';
import { BarChart3, Plus, Trash2, CheckCircle2, Clock, XCircle, Search, Filter, Sparkles, Building2 } from 'lucide-react';

export interface PipelineLead {
  id: string;
  customerName: string;
  phone: string;
  neighborhood: string;
  serviceType: string;
  source: 'Meta Lead Ads' | 'Google Search Ads' | 'Local SEO' | 'Direct Referral';
  assignedCompany: string;
  status: 'accepted' | 'pending' | 'rejected';
  rejectionReason?: string;
  unitPrice: number;
  createdAt: string;
}

const DEFAULT_LEADS: PipelineLead[] = [
  {
    id: 'LEAD-101',
    customerName: 'أبو فهد القحطاني',
    phone: '050***4211',
    neighborhood: 'حي النرجس',
    serviceType: 'عزل أسطح خرسانية ومعالجة تسرب',
    source: 'Meta Lead Ads',
    assignedCompany: 'شركة الصفوة للمقاولات',
    status: 'accepted',
    unitPrice: 45,
    createdAt: '2026-10-14 10:24'
  },
  {
    id: 'LEAD-102',
    customerName: 'سارة الدوسري',
    phone: '055***8832',
    neighborhood: 'حي الياسمين',
    serviceType: 'كشف تسربات المياه بالموجات',
    source: 'Google Search Ads',
    assignedCompany: 'شركة الصفوة للمقاولات',
    status: 'accepted',
    unitPrice: 45,
    createdAt: '2026-10-14 11:15'
  },
  {
    id: 'LEAD-103',
    customerName: 'خالد المنصور',
    phone: '054***1290',
    neighborhood: 'حي الخرج (خارج النطاق)',
    serviceType: 'عزل خزانات مياه',
    source: 'Meta Lead Ads',
    assignedCompany: 'شركة الصفوة للمقاولات',
    status: 'rejected',
    rejectionReason: 'خارج النطاق الجغرافي للمقاول (يُستبدل مجاناً)',
    unitPrice: 45,
    createdAt: '2026-10-14 13:40'
  },
  {
    id: 'LEAD-104',
    customerName: 'د. عادل القرني',
    phone: '056***7714',
    neighborhood: 'حي الملقا',
    serviceType: 'صيانة وتوريد تكييف مركزي',
    source: 'Local SEO',
    assignedCompany: 'شركة أطلس للتكييف',
    status: 'accepted',
    unitPrice: 35,
    createdAt: '2026-10-14 14:02'
  },
  {
    id: 'LEAD-105',
    customerName: 'محمد العتيبي',
    phone: '053***6650',
    neighborhood: 'حي العقيق',
    serviceType: 'عزل فوم وحماية مائية',
    source: 'Google Search Ads',
    assignedCompany: 'شركة الصفوة للمقاولات',
    status: 'pending',
    unitPrice: 45,
    createdAt: '2026-10-14 15:10'
  }
];

const STORAGE_KEY = 'rikouzone_leadgen_pipeline';

export const LeadPipelineTracker: React.FC = () => {
  const [leads, setLeads] = useState<PipelineLead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_LEADS;
    } catch {
      return DEFAULT_LEADS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'accepted' | 'pending' | 'rejected'>('all');

  // New Lead Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newNeighborhood, setNewNeighborhood] = useState('حي النرجس');
  const [newService, setNewService] = useState('عزل الأسطح وكشف التسربات');
  const [newSource, setNewSource] = useState<'Meta Lead Ads' | 'Google Search Ads' | 'Local SEO' | 'Direct Referral'>('Meta Lead Ads');
  const [newCompany, setNewCompany] = useState('شركة الصفوة للمقاولات');
  const [newPrice, setNewPrice] = useState(45);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error(e);
    }
  }, [leads]);

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName.trim() || !newPhone.trim()) return;

    const newLead: PipelineLead = {
      id: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
      customerName: newCustomerName.trim(),
      phone: newPhone.trim(),
      neighborhood: newNeighborhood.trim(),
      serviceType: newService.trim(),
      source: newSource,
      assignedCompany: newCompany.trim(),
      status: 'pending',
      unitPrice: newPrice,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setLeads((prev) => [newLead, ...prev]);
    setNewCustomerName('');
    setNewPhone('');
    setShowAddForm(false);
  };

  const updateLeadStatus = (id: string, newStatus: 'accepted' | 'pending' | 'rejected', reason?: string) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === id) {
          return {
            ...lead,
            status: newStatus,
            rejectionReason: newStatus === 'rejected' ? (reason || 'مرفوض لعدم مطابقة المعايير') : undefined
          };
        }
        return lead;
      })
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const resetToDefault = () => {
    setLeads(DEFAULT_LEADS);
  };

  // Filtered leads
  const filteredLeads = leads.filter((l) => {
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    const matchSearch =
      l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.assignedCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Stats
  const totalCount = leads.length;
  const acceptedCount = leads.filter((l) => l.status === 'accepted').length;
  const pendingCount = leads.filter((l) => l.status === 'pending').length;
  const rejectedCount = leads.filter((l) => l.status === 'rejected').length;
  const acceptanceRate = totalCount > 0 ? Math.round((acceptedCount / totalCount) * 100) : 0;
  const totalBilledRevenue = leads
    .filter((l) => l.status === 'accepted')
    .reduce((sum, l) => sum + l.unitPrice, 0);

  return (
    <div className="space-y-8 animate-fadeIn text-right" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900/90 via-zinc-900/50 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
          <BarChart3 className="h-3.5 w-3.5" />
          <span>الدرس 12: نظام متابعة دورة حياة الفرص (CRM Pipeline Tracker)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          لوحة إدارة وتتبع الفرص المسلمة للشركات وإصدار الفواتير
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
          تابع دورة حياة كل طلب من وروده، وتأهيله، وتسليمه للمقاول، وحالة القبول أو الرفض المبرر، مع احتساب فوري لإجمالي الفاتورة الأسبوعية المستحقة.
        </p>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4.5 space-y-1">
          <div className="text-[11px] text-zinc-400 font-bold">إجمالي الفرص المسجلة</div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-white">{totalCount}</div>
          <div className="text-[10px] text-zinc-500">{pendingCount} قيد المتابعة حالياً</div>
        </div>

        <div className="bg-zinc-900/80 border border-emerald-500/20 rounded-2xl p-4.5 space-y-1">
          <div className="text-[11px] text-emerald-400 font-bold">الفرص المقبولة (المفوترة)</div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">{acceptedCount}</div>
          <div className="text-[10px] text-zinc-400">معدل القبول: {acceptanceRate}%</div>
        </div>

        <div className="bg-zinc-900/80 border border-rose-500/20 rounded-2xl p-4.5 space-y-1">
          <div className="text-[11px] text-rose-400 font-bold">الفرص المرفوضة والمستبدلة</div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-rose-400">{rejectedCount}</div>
          <div className="text-[10px] text-zinc-500">مستبعدة وفق شروط الاتفاق</div>
        </div>

        <div className="bg-gradient-to-br from-cyan-950/40 to-zinc-900 border border-cyan-500/30 rounded-2xl p-4.5 space-y-1">
          <div className="text-[11px] text-cyan-400 font-bold">إجمالي الفاتورة المستحقة ($)</div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300">
            ${totalBilledRevenue.toLocaleString()}
          </div>
          <div className="text-[10px] text-zinc-400">جاهزة للتحويل البنكي الأسبوعي</div>
        </div>
      </div>

      {/* Action Bar (Search + Filter + Add Button) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="ابحث بالاسم، الحي، أو الشركة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pr-10 pl-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                statusFilter === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              الكل ({leads.length})
            </button>
            <button
              onClick={() => setStatusFilter('accepted')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                statusFilter === 'accepted' ? 'bg-emerald-500/20 text-emerald-400' : 'text-zinc-400 hover:text-white'
              }`}
            >
              مقبولة ({acceptedCount})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                statusFilter === 'pending' ? 'bg-amber-500/20 text-amber-400' : 'text-zinc-400 hover:text-white'
              }`}
            >
              معلقة ({pendingCount})
            </button>
            <button
              onClick={() => setStatusFilter('rejected')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                statusFilter === 'rejected' ? 'bg-rose-500/20 text-rose-400' : 'text-zinc-400 hover:text-white'
              }`}
            >
              مرفوضة ({rejectedCount})
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>تسجيل فرصة جديدة</span>
          </button>

          <button
            onClick={resetToDefault}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="استعادة البيانات الافتراضية"
          >
            <Sparkles className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Add New Lead Drawer/Form */}
      {showAddForm && (
        <form onSubmit={handleAddLead} className="p-5 rounded-2xl bg-zinc-900 border border-cyan-500/40 space-y-4">
          <div className="text-xs font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-2">
            <Plus className="h-4 w-4 text-cyan-400" />
            <span>إدخال فرصة بيعية واردة جديدة للنظام:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="text-[10px] text-zinc-400 block mb-1">اسم العميل:</label>
              <input
                type="text"
                placeholder="مثال: عبد الله السبيعي"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-400 block mb-1">رقم الهاتف المشفر:</label>
              <input
                type="text"
                placeholder="مثال: 050***9981"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-400 block mb-1">الحي / المنطقة:</label>
              <input
                type="text"
                value={newNeighborhood}
                onChange={(e) => setNewNeighborhood(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-400 block mb-1">الشركة المستلمة:</label>
              <input
                type="text"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-400 block mb-1">نوع الخدمة المحددة:</label>
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-400 block mb-1">مصدر الجلب:</label>
              <select
                value={newSource}
                onChange={(e: any) => setNewSource(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
              >
                <option value="Meta Lead Ads">Meta Lead Ads</option>
                <option value="Google Search Ads">Google Search Ads</option>
                <option value="Local SEO">Local SEO</option>
                <option value="Direct Referral">Direct Referral</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-zinc-400 block mb-1">سعر الفرصة المفوتر ($):</label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold transition-colors cursor-pointer"
              >
                حفظ وإضافة الفرصة
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-2 rounded-xl bg-zinc-800 text-zinc-400 text-xs hover:text-white"
              >
                إلغاء
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Leads Table */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-zinc-950/80 text-zinc-400 font-bold border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4">رقم الفرصة</th>
                <th className="py-3.5 px-4">اسم العميل ورقم الهاتف</th>
                <th className="py-3.5 px-4">الحي والخدمة</th>
                <th className="py-3.5 px-4">المصدر والشركة</th>
                <th className="py-3.5 px-4">السعر</th>
                <th className="py-3.5 px-4">الحالة والقرار</th>
                <th className="py-3.5 px-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {filteredLeads.map((lead) => {
                return (
                  <tr key={lead.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-400">
                      {lead.id}
                      <div className="text-[10px] text-zinc-500 font-mono">{lead.createdAt}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{lead.customerName}</div>
                      <div className="text-[11px] text-zinc-400 font-mono">{lead.phone}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-zinc-200 font-medium">{lead.neighborhood}</div>
                      <div className="text-[11px] text-zinc-400 line-clamp-1">{lead.serviceType}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-zinc-300">{lead.assignedCompany}</div>
                      <div className="text-[10px] text-cyan-400/80 font-mono">{lead.source}</div>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                      ${lead.unitPrice}
                    </td>

                    <td className="py-3 px-4">
                      {lead.status === 'accepted' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[11px]">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>مقبولة ومفوترة</span>
                        </div>
                      )}
                      {lead.status === 'pending' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-[11px]">
                          <Clock className="h-3 w-3" />
                          <span>قيد الاتصال</span>
                        </div>
                      )}
                      {lead.status === 'rejected' && (
                        <div className="space-y-0.5">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold text-[11px]">
                            <XCircle className="h-3 w-3" />
                            <span>مرفوضة ومستبدلة</span>
                          </div>
                          {lead.rejectionReason && (
                            <div className="text-[10px] text-zinc-500 max-w-xs">{lead.rejectionReason}</div>
                          )}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => updateLeadStatus(lead.id, 'accepted')}
                          title="قبول وتأكيد الفاتورة"
                          className="p-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const reason = prompt('سبب رفض الفرصة واستبدالها (مثال: خارج التغطية، رقم غير صحيح):', lead.rejectionReason || 'رقم هاتف خاطئ');
                            if (reason !== null) {
                              updateLeadStatus(lead.id, 'rejected', reason);
                            }
                          }}
                          title="تسجيل رفض مبرر واستبدال"
                          className="p-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          title="حذف من السجل"
                          className="p-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-zinc-500 text-xs">
                    لا توجد فرص مطابقة للبحث أو الفلتر المحدد حالياً.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
