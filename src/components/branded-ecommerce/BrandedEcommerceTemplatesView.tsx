import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  Search, 
  Filter, 
  Video, 
  ShoppingBag, 
  MessageSquare, 
  Send,
  Info
} from 'lucide-react';
import { readyBrandTemplates, BrandTemplateItem } from '../../data/brandedEcommerceData';

interface BrandedEcommerceTemplatesViewProps {
  onCopyText: (text: string, label: string) => void;
}

export const BrandedEcommerceTemplatesView: React.FC<BrandedEcommerceTemplatesViewProps> = ({
  onCopyText
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);

  // Customization variables
  const [brandName, setBrandName] = useState<string>('براندي');
  const [productName, setProductName] = useState<string>('المنتج الأساسي');

  const filteredTemplates = readyBrandTemplates.filter(tmpl => {
    const matchesCat = selectedCategory === 'all' || tmpl.category === selectedCategory;
    const matchesSearch = tmpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tmpl.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (tmpl: BrandTemplateItem) => {
    // Replace placeholder variables with user inputs
    let textToCopy = tmpl.templateContent
      .replaceAll('[اسم البراند]', brandName || 'براندي')
      .replaceAll('[اسم العلامة التجارية]', brandName || 'براندي')
      .replaceAll('[اسم المنتج]', productName || 'المنتج الأساسي')
      .replaceAll('[اسم المنتج الأساسي]', productName || 'المنتج الأساسي');

    onCopyText(textToCopy, `تم نسخ قالب: ${tmpl.title}`);
    setCopiedTemplateId(tmpl.id);
    setTimeout(() => setCopiedTemplateId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-[#0c0d14]/90 p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm shadow-amber-500/10">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>مكتبة القوالب التسويقية والتشغيلية الجاهزة</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-sans">
                  Copy & Paste Library
                </span>
              </h2>
              <p className="mt-1 text-xs text-zinc-400">
                صيغ جاهزة ومجربة: أوصاف منتجات مقنعة، سكريبتات إعلانات فيديو قصيرة، بيانات إطلاق البراند، ورسائل خدمة العملاء.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Customizer Fields */}
        <div className="mt-4 pt-1">
          <span className="text-[11px] font-bold text-amber-400 block mb-2">تخصيص القوالب فورياً قبل النسخ (أدخل بياناتك هنا):</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-zinc-400 font-bold mb-1">اسم علامتك التجارية:</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="مثلاً: NovaDesk أو GlowSkin..."
                className="w-full rounded-xl bg-[#141620] border border-zinc-800 px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/60"
              />
            </div>
            <div>
              <label className="block text-[11px] text-zinc-400 font-bold mb-1">اسم المنتج الرئيسي:</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="مثلاً: بساط مكتبي جلدي أو سيروم مرطب..."
                className="w-full rounded-xl bg-[#141620] border border-zinc-800 px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/60"
              />
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-amber-500 text-black font-black shadow-sm shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              جميع القوالب
            </button>
            <button
              onClick={() => setSelectedCategory('product-description')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === 'product-description'
                  ? 'bg-amber-500 text-black font-black shadow-sm shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <ShoppingBag className="h-3 w-3" />
              <span>وصف المنتج</span>
            </button>
            <button
              onClick={() => setSelectedCategory('short-ad')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === 'short-ad'
                  ? 'bg-amber-500 text-black font-black shadow-sm shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <Video className="h-3 w-3" />
              <span>سكريبت فيديو</span>
            </button>
            <button
              onClick={() => setSelectedCategory('brand-launch')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === 'brand-launch'
                  ? 'bg-amber-500 text-black font-black shadow-sm shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <Sparkles className="h-3 w-3" />
              <span>رسالة الإطلاق</span>
            </button>
            <button
              onClick={() => setSelectedCategory('customer-support')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === 'customer-support'
                  ? 'bg-amber-500 text-black font-black shadow-sm shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <MessageSquare className="h-3 w-3" />
              <span>تأكيد الواتساب</span>
            </button>
          </div>

          <div className="relative min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث في القوالب..."
              className="w-full rounded-xl bg-[#141620] border border-zinc-800 pr-9 pl-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/60"
            />
          </div>
        </div>
      </div>

      {/* Templates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTemplates.map((tmpl) => {
          const isCopied = copiedTemplateId === tmpl.id;

          // Replace preview text
          const previewContent = tmpl.templateContent
            .replaceAll('[اسم البراند]', brandName || 'براندي')
            .replaceAll('[اسم العلامة التجارية]', brandName || 'براندي')
            .replaceAll('[اسم المنتج]', productName || 'المنتج الأساسي')
            .replaceAll('[اسم المنتج الأساسي]', productName || 'المنتج الأساسي');

          return (
            <div
              key={tmpl.id}
              className="rounded-3xl border border-zinc-800 bg-[#0e1017]/90 p-5 sm:p-6 shadow-xl flex flex-col justify-between hover:border-zinc-700 transition-all space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#161824] text-amber-400 border border-zinc-800 font-mono">
                    {tmpl.category === 'product-description' ? 'وصف المنتج' :
                     tmpl.category === 'short-ad' ? 'سكريبت فيديو' :
                     tmpl.category === 'brand-launch' ? 'رسالة الإطلاق' : 'خدمة العملاء'}
                  </span>

                  <button
                    onClick={() => handleCopy(tmpl)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-black text-xs shadow-md shadow-orange-500/25 border border-orange-400/30 transition-all cursor-pointer active:scale-95"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>نسخ القالب المخصص</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-sm sm:text-base font-black text-white">{tmpl.title}</h3>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{tmpl.description}</p>

                {/* Template Code Box */}
                <div className="mt-3.5 p-3.5 rounded-2xl bg-[#090a0f] border border-zinc-800/90 text-xs text-zinc-200 font-sans leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap select-all">
                  {previewContent}
                </div>
              </div>

              {/* Tips & Use Case Footer */}
              <div className="pt-3 border-t border-zinc-800/80 space-y-1.5 text-[11px] text-zinc-400">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Info className="h-3 w-3" />
                  <span>أين يستخدم هذا القالب؟</span>
                </div>
                <p className="text-zinc-300">{tmpl.useCase}</p>

                {tmpl.proTips && tmpl.proTips.length > 0 && (
                  <div className="pt-1 text-[10px] text-zinc-500">
                    💡 نصيحة: {tmpl.proTips[0]}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
