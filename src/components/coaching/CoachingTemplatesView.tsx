import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  Search, 
  Filter, 
  Download,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { coachingTemplatesData, CoachingTemplateItem } from '../../data/coachingData';

export const CoachingTemplatesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'جميع القوالب' },
    { id: 'contracts', label: 'العقود والاتفاقيات' },
    { id: 'intake', label: 'استمارات التشخيص' },
    { id: 'scripts', label: 'سكريبتات المكالمات' },
    { id: 'followup', label: 'ملخصات الجلسات' },
    { id: 'testimonials', label: 'نماذج التقييمات' },
  ];

  const filteredTemplates = coachingTemplatesData.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <FileText className="h-3.5 w-3.5" />
            <span>مكتبة القوالب والعقود والاستمارات الجاهزة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            نماذج وقوالب التدريب الجاهزة للنسخ والاستخدام
          </h2>
          <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
            وفّر عشرات الساعات من الصياغة القانونية والتنظيمية. انسخ عقود العمل، واستبيانات التشخيص، وسكريبتات مكالمات الاستكشاف، ورسائل المتابعة بضغطة زر واحدة.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في نصوص القوالب..."
            className="w-full pl-3 pr-9 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:border-amber-500 outline-none"
          />
        </div>
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredTemplates.map((item) => {
          const isCopied = copiedId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4 transition-all hover:border-zinc-700 backdrop-blur-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
                <div>
                  <h3 className="text-base font-black text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(item.id, item.content)}
                  className={`self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-black'
                      : 'bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20'
                  }`}
                >
                  {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{isCopied ? 'تم نسخ القالب!' : 'نسخ القالب'}</span>
                </button>
              </div>

              {/* Content Box */}
              <div className="relative">
                <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {item.content}
                </pre>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
