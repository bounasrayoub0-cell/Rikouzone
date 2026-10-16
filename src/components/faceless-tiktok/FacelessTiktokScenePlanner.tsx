import React, { useState, useEffect } from 'react';
import { Layers, Plus, Trash2, Copy, Check, Save, Download, Film, Eye, Sparkles, Clock } from 'lucide-react';

interface SceneItem {
  id: string;
  timeRange: string;
  voiceoverLine: string;
  visualType: 'B-Roll سينمائي' | 'تسجيل شاشة' | 'نص متحرك' | 'رسم بياني/أيقونة';
  sourceAndLicense: string;
  onScreenText: string;
}

const DEFAULT_SCENES: SceneItem[] = [
  {
    id: 's1',
    timeRange: '0 - 3 ثوانٍ',
    voiceoverLine: 'توقف عن دفع 50 دولاراً شهرياً لاشتراكات التصميم؛ هذا الموقع المجاني يفعل نفس الشيء بنقرة واحدة...',
    visualType: 'B-Roll سينمائي',
    sourceAndLicense: 'Pexels - لقطة يد تغلق بطاقة بنكية / شخص أمام شاشة مضيئة (رخصة مجانية)',
    onScreenText: 'بديل مجاني 100% ⚡'
  },
  {
    id: 's2',
    timeRange: '3 - 8 ثوانٍ',
    voiceoverLine: 'أغلبنا يضيع ساعات طويلة كل أسبوع في تفريغ المحاضرات أو تلخيص الكتب يدوياً.',
    visualType: 'تسجيل شاشة',
    sourceAndLicense: 'تسجيل شخصي لشاشة لابتوب يوضح كتاباً طويلاً وملفات متراكمة (أصلي 100%)',
    onScreenText: 'تعب الساعات انتهى ⏳'
  },
  {
    id: 's3',
    timeRange: '8 - 18 ثانية',
    voiceoverLine: 'هذا الامتداد يقرأ لك الملف كاملاً، ويستخرج أهم 5 نقاط رئيسية، ويكتب لك ملخصاً باللغة العربية في 30 ثانية.',
    visualType: 'تسجيل شاشة',
    sourceAndLicense: 'تسجيل مباشر لواجهة الأداة وهي تستخرج النقاط وتكتب بالعربية بنقرة زر',
    onScreenText: 'ملخص عربي فوري 🎯'
  },
  {
    id: 's4',
    timeRange: '18 - 25 ثانية',
    voiceoverLine: 'جربت الأداة بنفسي على كتاب من 200 صفحة، وكانت النتيجة دقيقة ومبهرة بدون أي خطأ لغوي.',
    visualType: 'B-Roll سينمائي',
    sourceAndLicense: 'Mixkit - شخص يبتسم أمام لابتوب مع إضاءة دافئة (رخصة مجانية)',
    onScreenText: 'تجربة على 200 صفحة ✨'
  },
  {
    id: 's5',
    timeRange: '25 - 30 ثانية',
    voiceoverLine: 'اكتب في التعليقات اسم كتاب ترغب في تلخيصه لأرسل لك الرابط فوراً.',
    visualType: 'نص متحرك',
    sourceAndLicense: 'خلفية داكنة مجردة مع نص حركي كبير (Kinetic Typography)',
    onScreenText: 'ما هو كتابك القادم؟ 👇'
  }
];

export const FacelessTiktokScenePlanner: React.FC = () => {
  const [scenes, setScenes] = useState<SceneItem[]>(DEFAULT_SCENES);
  const [copied, setCopied] = useState(false);
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('faceless_tiktok_scenes_v1');
      if (stored) {
        setScenes(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load scenes from localStorage', e);
    }
  }, []);

  const handleAddScene = () => {
    const nextNumber = scenes.length + 1;
    const newScene: SceneItem = {
      id: `s_${Date.now()}`,
      timeRange: `المشهد ${nextNumber}`,
      voiceoverLine: 'اكتب هنا الجملة المنطوقة لهذا المشهد...',
      visualType: 'B-Roll سينمائي',
      sourceAndLicense: 'Pexels / تسجيل شخصي (رخصة مجانية)',
      onScreenText: 'نص الشاشة هنا'
    };
    const next = [...scenes, newScene];
    setScenes(next);
  };

  const handleUpdateScene = (id: string, field: keyof SceneItem, value: string) => {
    setScenes((prev) =>
      prev.map((sc) => (sc.id === id ? { ...sc, [field]: value } : sc))
    );
  };

  const handleDeleteScene = (id: string) => {
    if (scenes.length <= 1) return;
    setScenes((prev) => prev.filter((sc) => sc.id !== id));
  };

  const handleSaveToStorage = () => {
    localStorage.setItem('faceless_tiktok_scenes_v1', JSON.stringify(scenes));
    setSavedStatus('تم حفظ مخطط المشاهد في جهازك!');
    setTimeout(() => setSavedStatus(null), 2500);
  };

  const handleCopyTable = () => {
    const formatted = scenes
      .map(
        (s, idx) =>
          `🎬 مشهد #${idx + 1} (${s.timeRange})\n🎙️ الصوت: "${s.voiceoverLine}"\n🎥 المرئيات (${s.visualType}): ${s.sourceAndLicense}\n📺 نص الشاشة: "${s.onScreenText}"`
      )
      .join('\n\n------------------------\n\n');

    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-400 mb-3">
              <Film className="h-3.5 w-3.5" />
              <span>مخطط المشاهد والمواد البصرية (Storyboard Planner)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              ربط كل جملة صوتية بلقطة مرخصة ونصوص شاشة واضحة
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              حوّل السكريبت إلى خطة عمل تنفيذية للمونتاج في CapCut أو Premiere، مع توثيق مصادر المواد البصرية لضمان خلو مقاطعك من أي انتهاك لحقوق الملكية.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleAddScene}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <Plus className="h-4 w-4" />
              <span>إضافة مشهد جديد</span>
            </button>
            <button
              onClick={handleSaveToStorage}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all cursor-pointer"
            >
              <Save className="h-4 w-4 text-emerald-400" />
              <span>حفظ المخطط</span>
            </button>
          </div>
        </div>
      </div>

      {/* Status Alert */}
      {savedStatus && (
        <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-center text-xs font-bold animate-in fade-in">
          {savedStatus}
        </div>
      )}

      {/* Scenes List */}
      <div className="space-y-4">
        {scenes.map((scene, index) => (
          <div
            key={scene.id}
            className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6 space-y-4 transition-all hover:border-zinc-700"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-black">
                  {index + 1}
                </span>
                <input
                  type="text"
                  value={scene.timeRange}
                  onChange={(e) => handleUpdateScene(scene.id, 'timeRange', e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1 text-xs text-amber-400 font-bold focus:outline-none focus:border-cyan-500 w-32"
                  placeholder="مثال: 0 - 3 ثوانٍ"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={scene.visualType}
                  onChange={(e) => handleUpdateScene(scene.id, 'visualType', e.target.value as any)}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1 text-xs text-zinc-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="B-Roll سينمائي">B-Roll سينمائي</option>
                  <option value="تسجيل شاشة">تسجيل شاشة</option>
                  <option value="نص متحرك">نص متحرك</option>
                  <option value="رسم بياني/أيقونة">رسم بياني / أيقونة</option>
                </select>

                {scenes.length > 1 && (
                  <button
                    onClick={() => handleDeleteScene(scene.id)}
                    className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                    title="حذف المشهد"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
              {/* Left Column: Voiceover & Screen Text */}
              <div className="space-y-3">
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">🎙️ الجملة المنطوقة (Voiceover):</label>
                  <textarea
                    rows={2}
                    value={scene.voiceoverLine}
                    onChange={(e) => handleUpdateScene(scene.id, 'voiceoverLine', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-cyan-400 font-bold block mb-1">📺 النص البارز على الشاشة (Caption):</label>
                  <input
                    type="text"
                    value={scene.onScreenText}
                    onChange={(e) => handleUpdateScene(scene.id, 'onScreenText', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Right Column: Visual Source & License */}
              <div className="space-y-3">
                <div>
                  <label className="text-amber-400 font-bold block mb-1">🎥 وصف اللقطة ومصدر الترخيص:</label>
                  <textarea
                    rows={4}
                    value={scene.sourceAndLicense}
                    onChange={(e) => handleUpdateScene(scene.id, 'sourceAndLicense', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-300 focus:outline-none focus:border-cyan-500 leading-relaxed"
                    placeholder="اكتب وصف اللقطة المطلوبة، واسم المكتبة (Pexels, Pixabay, تسجيل شخصي)، والتأكيد على خلوها من الحقوق..."
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Export Bar */}
      <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-zinc-400">
          إجمالي المشاهد المخططة: <span className="text-cyan-400 font-bold">{scenes.length} مشاهد</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyTable}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'تم نسخ الجدول كاملاً!' : 'نسخ جدول المشاهد بالكامل'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
