import React, { useState } from 'react';
import { 
  Wrench, 
  Check, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  DollarSign, 
  Filter,
  CheckCircle2,
  Layers,
  Search
} from 'lucide-react';
import { aiContentToolsList, AiContentToolItem } from '../../data/aiContentData';

interface AiContentToolsSectionProps {
  onCopyText: (text: string, label: string) => void;
}

export const AiContentToolsSection: React.FC<AiContentToolsSectionProps> = ({ onCopyText }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTools = aiContentToolsList.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.bestFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header and Filter */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                ترسانة أدوات AI Content العملية (المجانية والأساسية)
              </h3>
              <p className="mt-0.5 text-xs sm:text-sm text-zinc-400">
                جميع الأدوات التي تحتاجها للبدء والربح من خدمات المحتوى، دون افتراض حاجتك لأي اشتراكات مدفوعة.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400 self-start sm:self-auto">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>0$ تكلفة تشغيل للبدء فوراً</span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'جميع الأدوات' },
              { id: 'generation', label: 'التوليد والمسودات' },
              { id: 'editing', label: 'التحرير والتدقيق' },
              { id: 'research', label: 'البحث والبيانات' },
              { id: 'seo', label: 'السيو والترندات' },
              { id: 'workflow', label: 'إدارة العمل' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-800/70 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث عن أداة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-48 rounded-lg bg-zinc-950/80 border border-zinc-800 py-1.5 pr-8 pl-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Recommended 4-Step Free Stack Banner */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/20 via-zinc-900/90 to-blue-950/20 p-5">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span>منظومة الإنتاج الرباعية المجانية الموصى بها في RikouZone:</span>
        </h4>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-3">
            <span className="font-bold text-cyan-400 block mb-1">1. البحث والتوثيق</span>
            <span className="font-bold text-white block">Google Gemini</span>
            <p className="mt-1 text-zinc-400 text-[11px]">لجمع أحدث الإحصائيات وفحص مصادر المعلومات المتصلة بالإنترنت.</p>
          </div>
          <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-3">
            <span className="font-bold text-cyan-400 block mb-1">2. توليد المسودات</span>
            <span className="font-bold text-white block">ChatGPT المجاني</span>
            <p className="mt-1 text-zinc-400 text-[11px]">لتوليد خطافات السكربتات ومخططات المقالات والزوايا الإعلانية.</p>
          </div>
          <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-3">
            <span className="font-bold text-cyan-400 block mb-1">3. التحرير الإنساني</span>
            <span className="font-bold text-white block">Claude (Anthropic)</span>
            <p className="mt-1 text-zinc-400 text-[11px]">لإعادة الصياغة بأسلوب بشري طبيعي خالٍ من الكليشيهات.</p>
          </div>
          <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-3">
            <span className="font-bold text-cyan-400 block mb-1">4. التدقيق العربي</span>
            <span className="font-bold text-white block">قلم (Qalam.ai)</span>
            <p className="mt-1 text-zinc-400 text-[11px]">لضبط قواعد النحو والإملاء والهمزات قبل تسليم العميل مباشرة.</p>
          </div>
        </div>
      </div>

      {/* Tools Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:bg-zinc-900/60"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-base font-bold text-white">{tool.name}</h4>
                <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/20 shrink-0">
                  {tool.isFreeOrFreemium ? 'مجاني / فريميوم' : 'مدفوع'}
                </span>
              </div>

              <div className="mt-2 text-xs font-semibold text-cyan-400">
                الأفضل في: {tool.bestFor}
              </div>

              <p className="mt-2 text-xs text-zinc-300 leading-relaxed font-normal">
                {tool.description}
              </p>

              <div className="mt-3.5 pt-3 border-t border-zinc-800/80 space-y-1.5 text-xs text-zinc-400">
                <div className="font-bold text-zinc-300 mb-1">نقاط القوة:</div>
                {tool.pros.map((pro, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="text-cyan-400 text-xs">✓</span>
                    <span>{pro}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800 space-y-2">
              <div className="rounded-lg bg-zinc-950/80 border border-zinc-800/80 p-2 text-[11px] text-zinc-400">
                <span className="font-bold text-zinc-300 block mb-0.5">تفاصيل الخطة المجانية:</span>
                {tool.freeTierDetails}
              </div>

              <div className="rounded-lg bg-cyan-950/20 border border-cyan-500/20 p-2 text-[11px] text-cyan-300">
                <span className="font-bold block mb-0.5">طريقة الاستخدام المثلى:</span>
                {tool.recommendedWorkflow}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
