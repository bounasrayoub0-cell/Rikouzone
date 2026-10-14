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
import { courseTemplatesData, CourseTemplateItem } from '../../data/onlineCoursesData';

export const CourseTemplatesView: React.FC<{ onCopyText: (text: string, label: string) => void }> = ({ onCopyText }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'جميع القوالب' },
    { id: 'sales-page', label: 'صفحات البيع' },
    { id: 'email-sequence', label: 'سلاسل الإيميلات' },
    { id: 'video-script', label: 'سكربتات الفيديو' },
    { id: 'student-support', label: 'تقييمات وشهادات الطلاب' }
  ];

  const filteredTemplates = courseTemplatesData.filter((tpl) => {
    const matchCat = selectedCategory === 'all' || tpl.category === selectedCategory;
    const matchSearch = tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.templateContent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCopy = (content: string, id: string, title: string) => {
    onCopyText(content, `تم نسخ قالب: ${title}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-zinc-900 to-zinc-900/90 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold mb-2">
            <FileText className="h-3.5 w-3.5" />
            <span>نصوص وسكربتات التدريب والتسويق</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            مكتبة النصوص والقوالب الجاهزة للنسخ (Course Swipe Files)
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
            قوالب كتابة إعلانية مجربة تشمل هيكل صفحة البيع، سلسلة إيميلات الإطلاق، سكربت تسجيل الدروس، واستمارة قصص النجاح.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-500 text-black font-black shadow-md shadow-blue-500/20'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="h-3.5 w-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="بحث في القوالب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 pr-8 pl-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Templates List */}
      <div className="space-y-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6 space-y-4 hover:border-zinc-700 transition-all shadow-lg"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {template.category}
                </span>
                <h4 className="text-base font-bold text-white mt-1">
                  {template.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {template.description}
                </p>
              </div>

              <button
                onClick={() => handleCopy(template.templateContent, template.id, template.title)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500 text-black text-xs font-bold hover:bg-blue-400 transition-all cursor-pointer shadow-md shadow-blue-500/20 shrink-0 self-start sm:self-auto"
              >
                {copiedId === template.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedId === template.id ? 'تم النسخ بنجاح!' : 'نسخ القالب كاملاً'}</span>
              </button>
            </div>

            {/* Use Case & Pro Tips */}
            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs space-y-2">
              <div className="text-zinc-300">
                <strong className="text-blue-400">حالة الاستخدام:</strong> {template.useCase}
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-zinc-400 block">نصائح احترافية:</span>
                <ul className="list-disc list-inside space-y-0.5 text-zinc-400 text-[11px]">
                  {template.proTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Template Code/Text Box */}
            <div className="relative">
              <pre className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 text-xs text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto scrollbar-thin">
                {template.templateContent}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
