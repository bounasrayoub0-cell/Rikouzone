import React, { useState } from 'react';
import { FileText, Copy, Check, Sparkles, RefreshCw, AlertTriangle, Layers, Tag, Eye } from 'lucide-react';

interface MetaPreset {
  name: string;
  mediaType: 'photo' | 'footage' | 'audio' | 'vector';
  niche: string;
  subject: string;
  setting: string;
  action: string;
  angle: string;
}

const META_PRESETS: MetaPreset[] = [
  {
    name: 'مطور برمجيات عربي في مكتب تقني حديث',
    mediaType: 'footage',
    niche: 'Business & Tech',
    subject: 'Young Arab male software developer wearing casual clothes',
    setting: 'Sunny contemporary coworking office in Dubai',
    action: 'typing code on mechanical keyboard while analyzing algorithms on dual monitors',
    angle: 'Slow pan medium shot with soft bokeh background'
  },
  {
    name: 'حرفي تقليدي ينحت الخشب في ورشة تراثية',
    mediaType: 'footage',
    niche: 'Culture & Heritage',
    subject: 'Mature Moroccan craftsman with weathered hands',
    setting: 'Authentic artisan woodshop in old medina',
    action: 'carefully carving intricate geometric patterns onto cedar wood with traditional gouge',
    angle: 'Close-up 4K slow motion with wood shavings flying'
  },
  {
    name: 'طبيبة تفحص مريضاً مع مساحة نصوص إعلانية',
    mediaType: 'photo',
    niche: 'Healthcare & Medicine',
    subject: 'Professional Arab female doctor in white lab coat with stethoscope',
    setting: 'Clean modern hospital clinic',
    action: 'reassuring senior patient with compassionate smile',
    angle: 'Horizontal wide composition with clean copy space on the right'
  },
  {
    name: 'حزمة مؤثرات نقرات أزرار واجهات UI حديثة',
    mediaType: 'audio',
    niche: 'Sound Design & UI',
    subject: 'Minimal digital user interface interaction sound set',
    setting: 'Studio recorded clean acoustic environment',
    action: 'subtle button tap pop switch toggle notification confirmed sound',
    angle: 'Master 24-bit 48kHz WAV uncompressed clean low noise floor'
  }
];

export const StockMetadataGenerator: React.FC = () => {
  const [mediaType, setMediaType] = useState<'photo' | 'footage' | 'audio' | 'vector'>('footage');
  const [niche, setNiche] = useState<string>('Business & Tech');
  const [subject, setSubject] = useState<string>('Young Arab male software engineer');
  const [setting, setSetting] = useState<string>('Modern open plan tech startup office');
  const [action, setAction] = useState<string>('programming and looking at data graphs on multiple screens');
  const [angle, setAngle] = useState<string>('Slow tracking shot 4K with clean negative space');

  const [copiedType, setCopiedType] = useState<string | null>(null);

  const applyPreset = (preset: MetaPreset) => {
    setMediaType(preset.mediaType);
    setNiche(preset.niche);
    setSubject(preset.subject);
    setSetting(preset.setting);
    setAction(preset.action);
    setAngle(preset.angle);
  };

  // Generate Professional Title
  const generateTitle = (): string => {
    const cleanSubject = subject.trim();
    const cleanAction = action.trim();
    const cleanSetting = setting.trim();

    if (mediaType === 'audio') {
      return `${cleanSubject} - ${cleanAction} in ${cleanSetting} (Clean SFX Pack)`.replace(/\s+/g, ' ');
    }

    return `${cleanSubject} ${cleanAction} in ${cleanSetting}`.replace(/\s+/g, ' ');
  };

  // Generate 35+ Curated Non-Spam Keywords
  const generateKeywords = (): { primary: string[]; secondary: string[]; conceptual: string[] } => {
    // Generate specialized keywords based on niche and mediaType
    let primary: string[] = [];
    let secondary: string[] = [];
    let conceptual: string[] = [];

    if (niche === 'Business & Tech') {
      primary = ['arab businessman', 'software engineer', 'coding', 'office worker', 'developer', 'technology', 'laptop'];
      secondary = ['coworking space', 'modern office', 'computer screen', 'programming', 'cybersecurity', 'startup', 'middle east', 'dubai', 'workplace', 'keyboard', 'data analytics', 'fintech', 'remote work', 'indoors'];
      conceptual = ['productivity', 'innovation', 'corporate success', 'career', 'intelligence', 'focus', 'business strategy', 'future of work', 'professional', 'digital transformation', 'connectivity', 'leadership', 'accuracy', 'growth'];
    } else if (niche === 'Culture & Heritage') {
      primary = ['moroccan artisan', 'craftsman', 'wood carving', 'traditional craft', 'handmade', 'artisan workshop', 'heritage'];
      secondary = ['carpenter', 'cedar wood', 'traditional culture', 'old medina', 'morocco', 'north africa', 'authentic', 'arab heritage', 'manual labor', 'hands close up', 'woodwork', 'chiseling', 'oriental', 'folklore'];
      conceptual = ['authenticity', 'skill', 'patience', 'heritage preservation', 'mastery', 'tradition', 'dedication', 'timeless', 'craftsmanship', 'cultural identity', 'indigenous art', 'legacy', 'handmade luxury', 'human touch'];
    } else if (niche === 'Healthcare & Medicine') {
      primary = ['female doctor', 'healthcare professional', 'patient consultation', 'hospital clinic', 'stethoscope', 'medical exam', 'nurse'];
      secondary = ['physician', 'senior patient', 'doctor office', 'medical care', 'laboratory', 'treatment', 'arab doctor', 'healthcare worker', 'scrubs', 'indoor medical', 'checkup', 'diagnosis', 'white coat', 'medicine'];
      conceptual = ['compassion', 'empathy', 'wellness', 'healing', 'trust', 'patient care', 'medical consultation', 'health insurance', 'safety', 'support', 'prevention', 'professionalism', 'recovery', 'expertise'];
    } else {
      // Sound Design & General
      primary = ['ui sound effects', 'digital button click', 'notification chime', 'interface audio', 'game sound', 'modern sfx', 'tap pop'];
      secondary = ['mobile app sound', 'web interaction', 'clean audio', 'switch toggle', 'alert tone', 'success chime', 'minimal sound', 'foley', 'multimedia asset', 'wav 24 bit', 'hq sound', 'sound designer', 'gui', 'click'];
      conceptual = ['confirmation', 'interaction', 'seamless experience', 'user feedback', 'satisfaction', 'simplicity', 'elegance', 'modern tech', 'usability', 'clarity', 'responsiveness', 'premium audio', 'digital environment', 'dynamic'];
    }

    // Add media-type specific tags
    if (mediaType === 'footage') {
      secondary.push('4k b-roll', 'stock footage', 'slow motion', 'cinematic');
    } else if (mediaType === 'photo') {
      secondary.push('copy space', 'negative space', 'portrait', 'commercial photography');
    }

    return { primary, secondary, conceptual };
  };

  const title = generateTitle();
  const { primary, secondary, conceptual } = generateKeywords();
  const allKeywords = [...primary, ...secondary, ...conceptual];
  const commaSeparated = allKeywords.join(', ');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Tag className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">مولد العناوين والكلمات المفتاحية (Stock Metadata Generator)</h2>
              <p className="text-xs text-zinc-400">
                توليد عناوين إنجليزية احترافية و35+ كلمة مفتاحية مفهرسة وفق خوارزميات أدوبي وشترستوك
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {META_PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(p)}
                className="rounded-lg border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 text-[11px] font-bold text-zinc-300 hover:border-amber-500/40 hover:text-white transition-all cursor-pointer"
              >
                {p.name.split(' ')[0]} {p.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Layers className="h-4 w-4 text-amber-400" />
              <span>مواصفات المشهد وعناصره</span>
            </h3>

            {/* Media Type */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">نوع الوسيط (Media Type):</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'footage', label: 'فيديو 4K' },
                  { id: 'photo', label: 'صورة' },
                  { id: 'audio', label: 'صوت / SFX' },
                  { id: 'vector', label: 'فيكتور' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMediaType(m.id as any)}
                    className={`py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      mediaType === m.id
                        ? 'border-amber-500 bg-amber-500/15 text-amber-300'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Niche Category */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">النيتش التجاري (Niche):</label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="Business & Tech">Business & Tech (الأعمال والتكنولوجيا)</option>
                <option value="Culture & Heritage">Culture & Heritage (الثقافة والتراث المحلي)</option>
                <option value="Healthcare & Medicine">Healthcare & Medicine (الطب والرعاية الصحية)</option>
                <option value="Sound Design & UI">Sound Design & UI (تصميم الصوت وواجهات التطبيقات)</option>
              </select>
            </div>

            {/* Subject / Actor */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">الفاعل أو العنصر الرئيسي (Subject):</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                placeholder="e.g. Young Arab female doctor wearing hijab"
              />
            </div>

            {/* Action */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">النشاط أو الفعل في المشهد (Action):</label>
              <input
                type="text"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                placeholder="e.g. explaining financial report on tablet"
              />
            </div>

            {/* Setting / Location */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">المكان والبيئة المحيطة (Setting):</label>
              <input
                type="text"
                value={setting}
                onChange={(e) => setSetting(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                placeholder="e.g. Modern bright conference room"
              />
            </div>

            {/* Angle / Composition */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">زاوية الكاميرا والمساحة السلبية (Angle):</label>
              <input
                type="text"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                placeholder="e.g. 4K slow motion with copy space on left"
              />
            </div>
          </div>
        </div>

        {/* Generated Output Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Generated Title Card */}
          <div className="rounded-2xl border border-amber-500/30 bg-zinc-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                <span>العنوان الوصفي الاحترافي المولد (Stock Title)</span>
              </span>
              <button
                onClick={() => copyToClipboard(title, 'title')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-black text-black hover:bg-amber-400 transition-all cursor-pointer"
              >
                {copiedType === 'title' ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>نسخ العنوان</span>
                  </>
                )}
              </button>
            </div>

            <div className="rounded-xl bg-zinc-950 p-4 border border-zinc-800 text-sm font-medium text-white leading-relaxed dir-ltr select-all">
              {title}
            </div>
            <p className="text-[11px] text-zinc-400">
              * تم ضبط العنوان ليكون وصفياً ومطابقاً للفاعل والنشاط والمكان دون حشو كلمات شاعريّة.
            </p>
          </div>

          {/* Keywords Output Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
              <div>
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Tag className="h-4 w-4 text-emerald-400" />
                  <span>الكلمات المفتاحية الـ 35 الموجهة (Keywords)</span>
                </h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  مرتبة من الأعلى وزناً في الخوارزمية (Top 7) إلى الكلمات السياقية والمفاهيمية
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {allKeywords.length} كلمة مفتاحية
                </span>
                <button
                  onClick={() => copyToClipboard(commaSeparated, 'keywords')}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 text-xs font-bold text-white border border-zinc-700 transition-all cursor-pointer"
                >
                  {copiedType === 'keywords' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>نسخ (مفصولة بفواصل)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Keyword Pills Display */}
            <div className="space-y-3">
              {/* Top 7 */}
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1.5">
                  1. الكلمات السبع الأهم (Top 7 Priority - Higher Algorithm Weight):
                </span>
                <div className="flex flex-wrap gap-1.5 dir-ltr">
                  {primary.map((kw, i) => (
                    <span key={i} className="text-xs font-bold bg-amber-500/15 border border-amber-500/40 text-amber-300 px-2.5 py-1 rounded-lg">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Secondary Contextual */}
              <div>
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                  2. الكلمات السياقية والمكانية (Contextual & Environment):
                </span>
                <div className="flex flex-wrap gap-1.5 dir-ltr">
                  {secondary.map((kw, i) => (
                    <span key={i} className="text-xs bg-zinc-800/80 border border-zinc-700 text-zinc-300 px-2 py-0.5 rounded-lg">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Conceptual & Marketing */}
              <div>
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                  3. الكلمات المفاهيمية والتسويقية (Commercial & Metaphorical):
                </span>
                <div className="flex flex-wrap gap-1.5 dir-ltr">
                  {conceptual.map((kw, i) => (
                    <span key={i} className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-lg">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Comma-separated Raw Output */}
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <span className="text-xs font-bold text-zinc-400 block mb-2">النص الجاهز للصق المباشر في لوحة الرفع:</span>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 leading-relaxed dir-ltr max-h-24 overflow-y-auto select-all">
                {commaSeparated}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
