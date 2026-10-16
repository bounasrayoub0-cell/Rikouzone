import React, { useState, useEffect } from 'react';
import { Lightbulb, Sparkles, Copy, Check, RefreshCw, Bookmark, BookmarkCheck, Trash2, Edit3, ArrowRight, Filter } from 'lucide-react';

interface IdeaTemplate {
  id: string;
  niche: 'tech' | 'self' | 'history' | 'skills' | 'products' | 'facts';
  nicheLabel: string;
  goal: 'viral' | 'educational' | 'story' | 'affiliate';
  goalLabel: string;
  title: string;
  hook: string;
  coreAngle: string;
  visualPlan: string;
  ctaText: string;
}

const IDEA_DATABASE: IdeaTemplate[] = [
  {
    id: 'idea-1',
    niche: 'tech',
    nicheLabel: 'ذكاء اصطناعي وتقنية',
    goal: 'viral',
    goalLabel: 'انتشار فيروسي',
    title: '3 أدوات ذكاء اصطناعي مجانية بديلة لأشهر البرامج المدفوعة',
    hook: 'توقف عن دفع 50 دولاراً شهرياً لاشتراكات التصميم؛ هذه الـ 3 مواقع مجانية وتفعل نفس الشيء تماماً...',
    coreAngle: 'مقارنة سريعة بين موقع مدفوع مشهور وبديله المجاني المفتوح، مع عرض لقطة شاشة للنتيجة في 10 ثوانٍ.',
    visualPlan: 'تسجيل شاشة مباشر لواجهة الأداة البديلة مع سحب لقطة قبل وبعد، وإبراز زر المجانية بالأصفر.',
    ctaText: 'أي أداة منهم تحتاجها أكثر في عملك؟ اكتب لي في التعليقات لأرسل لك الرابط المباشر.'
  },
  {
    id: 'idea-2',
    niche: 'tech',
    nicheLabel: 'ذكاء اصطناعي وتقنية',
    goal: 'affiliate',
    goalLabel: 'تسويق بالعمولة',
    title: 'كيف ينظم هذا التطبيق حياتك الرقمية بالكامل في 5 دقائق',
    hook: 'إذا كنت تشعر أن مهامك اليومية ضائعة بين 10 تطبيقات، جرب هذه المساحة الموحدة...',
    coreAngle: 'استعراض واجهة أداة إنتاجية أو قالب Notion يجمع المهام والملاحظات والميزانية بسلاسة، مع رابط تجربة في البايو.',
    visualPlan: 'تسجيل شاشة مرتب جداً يظهر تنظيم المهام بسحب وإفلات سريع (Drag & Drop) مع موسيقى لوفي هادئة.',
    ctaText: 'رابط الأداة مع دليلي الإرشادي المجاني موجود في البايو بالأسفل.'
  },
  {
    id: 'idea-3',
    niche: 'self',
    nicheLabel: 'تطوير الذات وعلم النفس',
    goal: 'educational',
    goalLabel: 'تعليمي وتوعوي',
    title: 'سيكولوجية التسويف: لماذا نؤجل ما نعلم أنه الأهم؟',
    hook: 'أنت لست كسولاً، دماغك فقط يحاول حمايتك من المشاعر السلبية بهذه الحيلة العصبية...',
    coreAngle: 'تفسير علمي لدور اللوزة الدماغية (Amygdala) في الهروب من المهام المعقدة، مع قاعدة الـ 5 دقائق لبدء العمل فوراً.',
    visualPlan: 'لقطات B-Roll سينمائية لشخص يفكر، مع نصوص عريضة توضح الهرمونات والآلية العصبية بلونين أصفر وأبيض.',
    ctaText: 'ما هي أكثر مهمة تؤجلها منذ أسبوع؟ جرب تطبيق قاعدة الـ 5 دقائق عليها اليوم.'
  },
  {
    id: 'idea-4',
    niche: 'history',
    nicheLabel: 'قصص ومعلومات عامة',
    goal: 'story',
    goalLabel: 'قصة وتشويق',
    title: 'يوم اختفت مكتبة الإسكندرية وسر ما ضاع منها',
    hook: 'في ليلة واحدة، خسر العالم القديم 70% من معارفه وعلومه الفلكية... والسر لم يكن حريقاً عادياً.',
    coreAngle: 'سرد درامي لتاريخ المكتبة، والعلماء الذين عملوا بها، وما هي أعظم النظريات التي فُقدت بحسب المؤرخين.',
    visualPlan: 'صور أرشيفية ومخطوطات تاريخية بحركة تقريب بطيئة (Slow Zoom-In) مع مؤثرات صوتية لرياح وورق قديم.',
    ctaText: 'هل تعتقد أن العلوم كانت ستتقدم أسرع بـ 500 عام لو نجت المكتبة؟ شاركنا رأيك.'
  },
  {
    id: 'idea-5',
    niche: 'skills',
    nicheLabel: 'مهارات وعمل حر',
    goal: 'educational',
    goalLabel: 'تعليمي وتوعوي',
    title: 'كيف تكتب أول بروفايل فريلانس احترافي يقبل في نفس اليوم',
    hook: '90% من طلبات التسجيل في منصات العمل الحر تُرفض بسبب هذا السطر الواحد في الوصف...',
    coreAngle: 'إرشاد المشاهد للابتعاد عن العبارات العامة («أنا مصمم شغوف») واستبدالها بوعد محدد يحل مشكلة العميل («أصمم لك صفحة هبوط تضاعف مبيعاتك»).',
    visualPlan: 'مقارنة بصرية بين بروفايلين (بروفايل خاطئ باللون الأحمر، وبروفايل فائز باللون الأخضر) بخطوط عريضة.',
    ctaText: 'اكتب في تعليق مجالك الحالي، وسأقترح عليك صيغة وصف قوية لبروفايلك.'
  },
  {
    id: 'idea-6',
    niche: 'products',
    nicheLabel: 'مراجعات أدوات ومكتب',
    goal: 'affiliate',
    goalLabel: 'تسويق بالعمولة',
    title: 'أداة بـ 10 دولارات حلت أكبر مشكلة في مكتبي',
    hook: 'إذا كانت رقبتك تؤلمك بعد ساعتين من العمل على اللابتوب، فهذا الحامل المحمول هو المنقذ...',
    coreAngle: 'استعراض حامل لابتوب ألمنيوم قابل للطي، وتوضيح كيف يرفع الشاشة لمستوى العين، مع مقارنة الوضع الخاطئ والصحيح.',
    visualPlan: 'لقطات B-Roll أنيقة تركز على خامة المنتج، سهولة طيه، ووضعه في الحقيبة، مع ظهور السعر المنافس.',
    ctaText: 'الرابط المباشر للمنتج من أمازون مع كود الخصم متاح في رابط البايو.'
  },
  {
    id: 'idea-7',
    niche: 'facts',
    nicheLabel: 'حقائق وألغاز علمية',
    goal: 'viral',
    goalLabel: 'انتشار فيروسي',
    title: 'مفارقة فيرمي: أين الكائنات الذكية ولماذا الصمت في الفضاء؟',
    hook: 'إذا كان هناك مليارات الكواكب الشبيهة بالأرض، فلماذا لم نتلقَ إشارة واحدة حتى الآن؟',
    coreAngle: 'شرح مبسط لمفهوم الفلتر العظيم (The Great Filter) وما إذا كانت البشرية قد تجاوزته أم أنها تنتظر مصيراً مجهولاً.',
    visualPlan: 'مشاهد مذهلة لمجرات ونجوم بدقة 4K من مكتبة ناسا العامة مع تعليق صوتي هادئ ومؤثرات ترددات فضائية.',
    ctaText: 'هل تؤيد نظرية أننا وحيدون في الكون، أم أننا لم نكتشف طريقة الاتصال بعد؟'
  }
];

export const FacelessTiktokIdeaGenerator: React.FC = () => {
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [selectedGoal, setSelectedGoal] = useState<string>('all');
  const [savedIdeaIds, setSavedIdeaIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingIdeaId, setEditingIdeaId] = useState<string | null>(null);
  const [customIdeas, setCustomIdeas] = useState<Record<string, Partial<IdeaTemplate>>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem('faceless_tiktok_saved_ideas_v1');
      if (stored) {
        setSavedIdeaIds(JSON.parse(stored));
      }
      const storedCustom = localStorage.getItem('faceless_tiktok_custom_ideas_v1');
      if (storedCustom) {
        setCustomIdeas(JSON.parse(storedCustom));
      }
    } catch (e) {
      console.warn('Failed to load saved ideas', e);
    }
  }, []);

  const handleToggleSave = (id: string) => {
    let next: string[];
    if (savedIdeaIds.includes(id)) {
      next = savedIdeaIds.filter((item) => item !== id);
    } else {
      next = [...savedIdeaIds, id];
    }
    setSavedIdeaIds(next);
    localStorage.setItem('faceless_tiktok_saved_ideas_v1', JSON.stringify(next));
  };

  const handleCopyIdea = (idea: IdeaTemplate) => {
    const custom = customIdeas[idea.id] || {};
    const title = custom.title || idea.title;
    const hook = custom.hook || idea.hook;
    const angle = custom.coreAngle || idea.coreAngle;
    const plan = custom.visualPlan || idea.visualPlan;
    const cta = custom.ctaText || idea.ctaText;

    const formatted = `🎬 فكرة فيديو TikTok: ${title}\n\n🪝 الخطاف (Hook):\n"${hook}"\n\n💡 زاوية الفكرة والقيمة:\n${angle}\n\n🎥 الخطة البصرية (B-Roll):\n${plan}\n\n📣 دعوة الإجراء (CTA):\n"${cta}"`;

    navigator.clipboard.writeText(formatted);
    setCopiedId(idea.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveEdit = (id: string, updated: Partial<IdeaTemplate>) => {
    const next = { ...customIdeas, [id]: { ...(customIdeas[id] || {}), ...updated } };
    setCustomIdeas(next);
    localStorage.setItem('faceless_tiktok_custom_ideas_v1', JSON.stringify(next));
    setEditingIdeaId(null);
  };

  const filteredIdeas = IDEA_DATABASE.filter((idea) => {
    if (selectedNiche !== 'all' && idea.niche !== selectedNiche) return false;
    if (selectedGoal !== 'all' && idea.goal !== selectedGoal) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 mb-3">
              <Lightbulb className="h-3.5 w-3.5" />
              <span>مولّد أفكار TikTok القصيرة (Idea & Hook Engine)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              اكتشف أفكاراً جاهزة للإنتاج مع خطافاتها وخططها البصرية
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              اختر التخصص والهدف لتوليد أفكار فيديوهات عمودية متكاملة مصممة لرفع معدلات الاحتفاظ والمشاهدة، مع إمكانية التعديل والنسخ الفوري وحفظ أفكارك المفضلة.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-zinc-800/80 border border-zinc-700/60 rounded-2xl p-3 text-center min-w-[120px]">
              <div className="text-xs text-zinc-400">الأفكار المحفوظة</div>
              <div className="text-xl font-black text-amber-400">{savedIdeaIds.length} فكرة</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-zinc-400">النيتش:</span>
          <select
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
          >
            <option value="all">كل التخصصات</option>
            <option value="tech">ذكاء اصطناعي وتقنية</option>
            <option value="self">تطوير الذات وعلم النفس</option>
            <option value="history">قصص ومعلومات عامة</option>
            <option value="skills">مهارات وعمل حر</option>
            <option value="products">مراجعات أدوات ومكتب</option>
            <option value="facts">حقائق وألغاز علمية</option>
          </select>

          <span className="text-xs font-bold text-zinc-400 mr-2">الهدف:</span>
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
          >
            <option value="all">كل الأهداف</option>
            <option value="viral">انتشار فيروسي</option>
            <option value="educational">تعليمي وتوعوي</option>
            <option value="story">قصة وتشويق</option>
            <option value="affiliate">تسويق بالعمولة</option>
          </select>
        </div>

        <div className="text-xs text-zinc-400">
          عرض <span className="text-amber-400 font-bold">{filteredIdeas.length}</span> أفكار مقترحة
        </div>
      </div>

      {/* Idea Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIdeas.map((idea) => {
          const isSaved = savedIdeaIds.includes(idea.id);
          const custom = customIdeas[idea.id] || {};
          const currentTitle = custom.title || idea.title;
          const currentHook = custom.hook || idea.hook;
          const currentAngle = custom.coreAngle || idea.coreAngle;
          const currentPlan = custom.visualPlan || idea.visualPlan;
          const currentCta = custom.ctaText || idea.ctaText;
          const isEditing = editingIdeaId === idea.id;

          return (
            <div
              key={idea.id}
              className={`rounded-3xl border transition-all p-5 sm:p-6 space-y-4 flex flex-col justify-between ${
                isSaved
                  ? 'border-amber-500/40 bg-zinc-900/90 shadow-xl shadow-amber-500/5'
                  : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
              }`}
            >
              <div className="space-y-4">
                {/* Badges & Actions */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                      {idea.nicheLabel}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {idea.goalLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleSave(idea.id)}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-amber-500 text-black border-amber-500'
                          : 'bg-zinc-800/80 text-zinc-400 border-zinc-700 hover:text-white'
                      }`}
                      title={isSaved ? 'إزالة من المحفوظات' : 'حفظ الفكرة'}
                    >
                      {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </button>

                    <button
                      onClick={() => setEditingIdeaId(isEditing ? null : idea.id)}
                      className="p-2 rounded-xl bg-zinc-800/80 text-zinc-400 border border-zinc-700 hover:text-cyan-400 transition-colors cursor-pointer"
                      title="تعديل الفكرة"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                {isEditing ? (
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-zinc-400">عنوان الفكرة:</label>
                    <input
                      type="text"
                      defaultValue={currentTitle}
                      id={`edit-title-${idea.id}`}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                ) : (
                  <h3 className="text-lg font-black text-white leading-snug">{currentTitle}</h3>
                )}

                {/* Hook Box */}
                <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-amber-400">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>الخطاف الافتتاحي (0-3 ثوانٍ):</span>
                    </span>
                  </div>
                  {isEditing ? (
                    <textarea
                      defaultValue={currentHook}
                      id={`edit-hook-${idea.id}`}
                      rows={2}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  ) : (
                    <p className="text-xs text-zinc-200 font-medium leading-relaxed">"{currentHook}"</p>
                  )}
                </div>

                {/* Core Angle & Visual Plan */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-zinc-400 block mb-0.5">💡 زاوية الفكرة والقيمة:</span>
                    {isEditing ? (
                      <textarea
                        defaultValue={currentAngle}
                        id={`edit-angle-${idea.id}`}
                        rows={2}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    ) : (
                      <p className="text-zinc-300 leading-relaxed">{currentAngle}</p>
                    )}
                  </div>

                  <div>
                    <span className="font-bold text-zinc-400 block mb-0.5">🎥 الخطة البصرية (B-Roll):</span>
                    {isEditing ? (
                      <textarea
                        defaultValue={currentPlan}
                        id={`edit-plan-${idea.id}`}
                        rows={2}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    ) : (
                      <p className="text-cyan-300/90 leading-relaxed">{currentPlan}</p>
                    )}
                  </div>

                  <div>
                    <span className="font-bold text-zinc-400 block mb-0.5">📣 دعوة الإجراء (CTA):</span>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={currentCta}
                        id={`edit-cta-${idea.id}`}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    ) : (
                      <p className="text-emerald-300/90 leading-relaxed font-medium">"{currentCta}"</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                {isEditing ? (
                  <div className="flex items-center gap-2 w-full">
                    <button
                      onClick={() => {
                        const titleEl = document.getElementById(`edit-title-${idea.id}`) as HTMLInputElement;
                        const hookEl = document.getElementById(`edit-hook-${idea.id}`) as HTMLTextAreaElement;
                        const angleEl = document.getElementById(`edit-angle-${idea.id}`) as HTMLTextAreaElement;
                        const planEl = document.getElementById(`edit-plan-${idea.id}`) as HTMLTextAreaElement;
                        const ctaEl = document.getElementById(`edit-cta-${idea.id}`) as HTMLInputElement;
                        handleSaveEdit(idea.id, {
                          title: titleEl?.value,
                          hook: hookEl?.value,
                          coreAngle: angleEl?.value,
                          visualPlan: planEl?.value,
                          ctaText: ctaEl?.value
                        });
                      }}
                      className="flex-1 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition-colors"
                    >
                      حفظ التعديلات
                    </button>
                    <button
                      onClick={() => setEditingIdeaId(null)}
                      className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold hover:bg-zinc-700 transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-[11px] text-zinc-500">جاهزة للتطبيق في CapCut</span>
                    <button
                      onClick={() => handleCopyIdea(idea)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-200 text-xs font-bold transition-all cursor-pointer"
                    >
                      {copiedId === idea.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span>تم النسخ!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>نسخ الفكرة بالكامل</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
