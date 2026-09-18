import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { AIToolConfig } from '../../types';
import { aiToolsList, executeAITool } from '../../data/aiTools';
import { 
  Sparkles, 
  Send, 
  RotateCcw, 
  Copy, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  FileText, 
  Zap, 
  AlignLeft, 
  Hash, 
  MessageSquare, 
  RefreshCw, 
  Search, 
  BarChart3, 
  Image, 
  User, 
  DollarSign, 
  Calendar, 
  Film,
  Bot
} from 'lucide-react';

interface RikouAIViewProps {
  onCopyText: (text: string, label: string) => void;
  initialToolId?: string;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Lightbulb,
  FileText,
  Zap,
  Sparkles,
  AlignLeft,
  Hash,
  MessageSquare,
  RefreshCw,
  Search,
  BarChart3,
  Image,
  User,
  DollarSign,
  Calendar,
  Film
};

export const RikouAIView: React.FC<RikouAIViewProps> = ({ onCopyText, initialToolId }) => {
  const { language, isRTL } = useLanguage();

  const [selectedToolId, setSelectedToolId] = useState<string>(initialToolId || aiToolsList[0].id);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationOutput, setGenerationOutput] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const currentTool: AIToolConfig = aiToolsList.find((t) => t.id === selectedToolId) || aiToolsList[0];
  const ToolIcon = iconMap[currentTool.iconName] || Sparkles;

  const categories = [
    { id: 'all', labelAr: 'الكل (15 أداة)', labelEn: 'All Tools (15)' },
    { id: 'Ideation', labelAr: 'الأفكار والمفاهيم', labelEn: 'Ideation' },
    { id: 'Scripting', labelAr: 'السيناريو والكتابة', labelEn: 'Scripting' },
    { id: 'Optimization', labelAr: 'الخطافات والعناوين', labelEn: 'Optimization' },
    { id: 'Social Media', labelAr: 'منصات التواصل', labelEn: 'Social Media' },
    { id: 'SEO', labelAr: 'السيو والأرشفة', labelEn: 'SEO' },
    { id: 'Design', labelAr: 'التصميم والصور', labelEn: 'Design' }
  ];

  const filteredTools = aiToolsList.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  const handleFieldChange = (fieldId: string, val: string) => {
    setFieldValues((prev) => ({ ...prev, [fieldId]: val }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSwitchTool = (tool: AIToolConfig) => {
    setSelectedToolId(tool.id);
    setFieldValues({});
    setGenerationOutput(null);
    setErrorMessage(null);
  };

  const handleReset = () => {
    setFieldValues({});
    setGenerationOutput(null);
    setErrorMessage(null);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMessage(null);

    // Simulate realistic generation delay (or fetch from server API route /api/gemini when connected)
    setTimeout(() => {
      try {
        const result = executeAITool(currentTool.id, fieldValues, language);
        setGenerationOutput(result);
      } catch (err) {
        setErrorMessage(isRTL ? 'حدث خطأ أثناء المعالجة، يرجى المحاولة ثانية.' : 'Failed to generate content. Please retry.');
      } finally {
        setIsGenerating(false);
      }
    }, 700);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400">
          <Bot className="h-4 w-4" />
          <span>{isRTL ? 'مساعد الذكاء الاصطناعي الخاص بصناع المحتوى' : 'Creator-Focused AI Engine'}</span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-black text-white">
          Rikou <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">AI Suite</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
          {isRTL
            ? '15 أداة متخصصة لتوليد الخطافات، كتابة السكربتات الكاملة، صياغة عناوين يوتيوب ذات النقر العالي، وتصميم برومبت الصور المصغرة.'
            : '15 tailored tools to draft high-retention hooks, full scripts, click-worthy titles, and Midjourney thumbnail prompts.'}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                isActive
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {isRTL ? cat.labelAr : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Main Workspace Layout */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Tool Selector Grid */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-1 mb-3">
            {isRTL ? 'اختر أداة الذكاء الاصطناعي:' : 'Select AI Tool:'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 max-h-[620px] overflow-y-auto pr-1">
            {filteredTools.map((tool) => {
              const isSelected = tool.id === selectedToolId;
              const title = language === 'ar' ? tool.arabicTitle : language === 'fr' ? tool.frenchTitle : tool.title;
              const IconComp = iconMap[tool.iconName] || Sparkles;

              return (
                <button
                  key={tool.id}
                  id={`ai-tool-select-${tool.id}`}
                  onClick={() => handleSwitchTool(tool)}
                  className={`flex items-start text-start gap-3 rounded-2xl p-3.5 transition-all border ${
                    isSelected
                      ? 'border-amber-500/60 bg-amber-500/10 text-white shadow-md shadow-amber-500/5'
                      : 'border-zinc-800/80 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${
                    isSelected ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    <IconComp className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs sm:text-sm font-bold line-clamp-1 ${isSelected ? 'text-amber-300' : 'text-zinc-200'}`}>
                      {title}
                    </div>
                    <div className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                      {isRTL ? tool.arabicDescription : tool.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Reusable AI Tool Execution Canvas */}
        <div className="lg:col-span-8 rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl">
          
          {/* Active Tool Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/20">
                <ToolIcon className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {language === 'ar' ? currentTool.arabicTitle : language === 'fr' ? currentTool.frenchTitle : currentTool.title}
                </h2>
                <p className="mt-0.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {language === 'ar' ? currentTool.arabicDescription : language === 'fr' ? currentTool.frenchDescription : currentTool.description}
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{isRTL ? 'تفريغ الحقول' : 'Reset'}</span>
            </button>
          </div>

          {/* Dynamic Input Form Fields */}
          <div className="mt-6 space-y-4">
            {currentTool.fields.map((field) => {
              const label = language === 'ar' ? (field.arabicLabel || field.label) : field.label;
              const val = fieldValues[field.id] || '';

              if (field.type === 'select' && field.options) {
                return (
                  <div key={field.id}>
                    <label className="text-xs font-bold text-zinc-300">
                      {label}
                    </label>
                    <select
                      value={val}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="">{isRTL ? '-- اختر الخيار المناسب --' : '-- Select Option --'}</option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                );
              }

              if (field.type === 'textarea') {
                return (
                  <div key={field.id}>
                    <label className="text-xs font-bold text-zinc-300">
                      {label}
                    </label>
                    <textarea
                      rows={3}
                      value={val}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder || (isRTL ? currentTool.arabicPlaceholder : currentTool.placeholder)}
                      className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                );
              }

              return (
                <div key={field.id}>
                  <label className="text-xs font-bold text-zinc-300">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    placeholder={field.placeholder || (isRTL ? currentTool.arabicPlaceholder : currentTool.placeholder)}
                    className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              );
            })}
          </div>

          {/* Action Trigger Button */}
          <div className="mt-6 flex items-center justify-between">
            <button
              id="ai-generate-submit-btn"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 px-7 py-3.5 text-sm font-black text-black shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin text-black" />
                  <span>{isRTL ? 'جاري المعالجة بالذكاء الاصطناعي...' : 'Synthesizing with AI...'}</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 rtl:rotate-180" />
                  <span>{isRTL ? 'توليد المحتوى الآن' : 'Generate with Rikou AI'}</span>
                </>
              )}
            </button>

            <span className="text-[11px] text-zinc-500 hidden sm:inline">
              {isRTL ? 'جاهز للتوصيل مع Gemini API' : 'Ready for Gemini API'}
            </span>
          </div>

          {/* Error State */}
          {errorMessage && (
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Generation Result Canvas */}
          {generationOutput && (
            <div className="mt-8 rounded-3xl border border-amber-500/40 bg-zinc-950 p-6 shadow-2xl relative animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
                  <Sparkles className="h-4 w-4" />
                  <span>{isRTL ? 'النتيجة المولدة من Rikou AI:' : 'Generated AI Output:'}</span>
                </div>

                <button
                  onClick={() => onCopyText(generationOutput, isRTL ? 'تم نسخ مخرجات الذكاء الاصطناعي!' : 'AI output copied!')}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-all"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{isRTL ? 'نسخ كامل النتيجة' : 'Copy All'}</span>
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto pr-2">
                <pre className="text-xs sm:text-sm text-zinc-100 whitespace-pre-wrap font-sans leading-relaxed">
                  {generationOutput}
                </pre>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
                <span>{isRTL ? '✓ تم التحقق من سلامة البنية والخطافات' : '✓ Structurally optimized for retention'}</span>
                <span className="text-amber-500 font-semibold">RikouZone Engine</span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
