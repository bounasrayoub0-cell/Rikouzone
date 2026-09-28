import React, { useState } from 'react';
import { 
  FolderArchive, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  FileText, 
  CheckCircle2,
  ExternalLink,
  Search
} from 'lucide-react';
import { swipeFileCollection, SwipeItem } from '../../data/copywritingToolsData';

interface CopywritingSwipeFileViewProps {
  onCopyText?: (text: string) => void;
}

export const CopywritingSwipeFileView: React.FC<CopywritingSwipeFileViewProps> = ({ onCopyText }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'كافة النماذج' },
    { id: 'Facebook Ad', label: 'إعلانات ممولة (Ads)' },
    { id: 'Landing Page', label: 'صفحات هبوط (Landing Pages)' },
    { id: 'Email', label: 'رسائل بريد (Emails)' },
    { id: 'Product Description', label: 'أوصاف المنتجات' }
  ];

  const filteredItems = swipeFileCollection.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.niche.includes(searchQuery) || item.hook.includes(searchQuery) || item.fullCopy.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const handleCopy = (item: SwipeItem) => {
    navigator.clipboard.writeText(item.fullCopy);
    setCopiedId(item.id);
    if (onCopyText) onCopyText('تم نسخ النص الإعلاني من الـ Swipe File!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-950 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
              <FolderArchive className="h-3.5 w-3.5" />
              <span>مكتبة الإلهام الإعلاني الأخلاقية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              ملف النماذج الإعلانية الناجحة (Swipe File)
            </h2>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              تفكيك تحليلي لنصوص إعلانية وصفحات هبوط حقيقية حققت ملايين المشاهدات والمبيعات. ادرس الهيكل، افهم الدوافع النفسية، واستلهم منها لحملاتك الخاصة دون نسخ أو سرقة.
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute right-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث في النماذج والنيتش..."
              className="w-full rounded-xl bg-zinc-900 border border-zinc-800 pr-9 pl-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Grid of Swipe Cards */}
      <div className="grid grid-cols-1 gap-8">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-xl"
          >
            {/* Card Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-400">
                  {item.category}
                </span>
                <span className="text-xs text-zinc-400 font-semibold">
                  المجال: <strong className="text-zinc-200">{item.niche}</strong>
                </span>
              </div>

              <button
                onClick={() => handleCopy(item)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 hover:bg-amber-500 hover:text-black border border-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-300 transition-all cursor-pointer"
              >
                {copiedId === item.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedId === item.id ? 'تم النسخ!' : 'نسخ النص كاملاً'}</span>
              </button>
            </div>

            {/* Hook Highlight */}
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-1">
              <div className="text-[11px] font-black text-amber-400 uppercase tracking-wider">
                الهوك الافتتاحي (The Hook):
              </div>
              <p className="text-sm font-bold text-white leading-relaxed">
                {item.hook}
              </p>
            </div>

            {/* Split View: Copy on Left, Breakdown on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Full Copy Container */}
              <div className="lg:col-span-7 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                  <FileText className="h-4 w-4 text-amber-400" />
                  <span>النص الإعلاني الكامل (The Full Copy):</span>
                </div>
                <div className="text-xs text-zinc-200 leading-relaxed whitespace-pre-line font-sans selection:bg-amber-500 selection:text-black">
                  {item.fullCopy}
                </div>
              </div>

              {/* Analysis & Breakdown */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Sparkles className="h-4 w-4" />
                    <span>لماذا نجح هذا النص؟ (Breakdown):</span>
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {item.whyItWorks.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-1.5">
                  <div className="text-[11px] font-bold text-amber-300">
                    💡 الخلاصة والقاعدة المستفادة:
                  </div>
                  <p className="text-xs font-semibold text-zinc-200 leading-relaxed">
                    {item.keyTakeaway}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
