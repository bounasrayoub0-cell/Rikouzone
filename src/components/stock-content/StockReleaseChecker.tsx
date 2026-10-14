import React, { useState } from 'react';
import { ShieldCheck, FileCheck, Copy, Check, AlertTriangle, HelpCircle, UserCheck, Building2, Sparkles, RefreshCw } from 'lucide-react';

export const StockReleaseChecker: React.FC = () => {
  // Wizard Questions
  const [hasFace, setHasFace] = useState<boolean>(true);
  const [hasTattooOrUnique, setHasTattooOrUnique] = useState<boolean>(false);
  const [isMinor, setIsMinor] = useState<boolean>(false);
  const [isPrivateProperty, setIsPrivateProperty] = useState<boolean>(false);
  const [hasLogosOrArtwork, setHasLogosOrArtwork] = useState<boolean>(false);
  const [isPublicStreetOrNews, setIsPublicStreetOrNews] = useState<boolean>(false);

  const [activeTemplateTab, setActiveTemplateTab] = useState<'model' | 'property'>('model');
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  // Diagnostic Calculation
  const determineStatus = () => {
    const hasRecognizablePerson = hasFace || hasTattooOrUnique;

    if (hasRecognizablePerson && isPublicStreetOrNews && !isMinor) {
      return {
        type: 'editorial',
        badge: 'تحويل إلزامي إلى Editorial (تحريري إخباري)',
        color: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
        title: 'العمل مؤهل كـ Editorial Use فقط (غير مسموح به في الإعلانات)',
        explanation: 'بما أن المشهد التُقط في شارع عام أو حدث إخباري دون توقيع الأشخاص، تمنع المنصات بيعه للإعلانات التجارية، ولكن يمكنك رفعه كترخيص تحريري (Editorial) لوسائل الإعلام والناشرين مع توثيق المدينة والتاريخ في العنوان.'
      };
    }

    if (hasRecognizablePerson && isMinor) {
      return {
        type: 'minor-model',
        badge: 'يتطلب تصريح قاصر (Minor Model Release)',
        color: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
        title: 'توقيع ولي الأمر القانوني إلزامي 100%',
        explanation: 'الصور التجارية للأطفال دون 18 عاماً تشترط توقيع الأب أو الأم أو الوصي القانوني الرسمي على نموذج Minor Model Release مع صورة العارض؛ أي رفع بدون هذا النموذج يؤدي لرفض فوري وربما حظر الحساب.'
      };
    }

    if (hasRecognizablePerson) {
      return {
        type: 'model',
        badge: 'يتطلب تصريح عارض تجاري (Model Release)',
        color: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
        title: 'نموذج Model Release موقع إلزامي للترخيص التجاري',
        explanation: 'طالما يمكن التعرف على ملامح الشخص أو ميزاته، لا بد من إرفاق وثيقة موافقة موقعة إلكترونياً (عبر تطبيق Easy Release أو PDF موقع) لتمكين الوكالات الإعلانية من استخدام الصورة بأمان قانوني.'
      };
    }

    if (isPrivateProperty || hasLogosOrArtwork) {
      return {
        type: 'property',
        badge: 'يتطلب تصريح ملكية (Property Release) أو طمس الشعارات',
        color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
        title: 'تصريح ملكية أو إزالة العناصر المحمية بحقوق نشر',
        explanation: 'التصوير داخل أماكن خاصة متميزة أو ظهور أعمال فنية أو تصاميم سيارات وشعارات يحتاج إما تصريحاً موقعاً من مالك المكان/الفنان، أو طمس وتعديل أي لوجو تجاري ظاهر قبل التصدير.'
      };
    }

    return {
      type: 'clean',
      badge: 'محتوى تجاري نظيف (Commercial - No Release Required)',
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
      title: 'جاهز للرفع التجاري المباشر بأعلى قيمة بيعية',
      explanation: 'المشهد خالٍ من أي وجوه بشرية محددة للهوية، ولا يحتوي على ملكيات خاصة محمية أو علامات تجارية. يمكنك رفعه فوراً كـ Commercial Stock مع كامل الأمان القانوني.'
    };
  };

  const status = determineStatus();

  // Legal Templates
  const modelReleaseEnglish = `STANDARD ADULT MODEL RELEASE (ENGLISH & ARABIC SUMMARY)
For valuable consideration received, I hereby grant to the Photographer/Filmmaker and their legal representatives and assigns, the irrevocable and unrestricted right to use and publish photographs or video footage of me.

1. MODEL INFORMATION:
Full Legal Name: _____________________________________________
Date of Birth (DD/MM/YYYY): _____ / _____ / _________
Email: ____________________________ Phone: ___________________
Residential Address: _________________________________________
City: ____________________ Country: __________________________

2. PHOTOGRAPHER INFORMATION:
Full Legal Name: _____________________________________________
Shoot Date (DD/MM/YYYY): _____ / _____ / _________
Shoot Description / Scene: ____________________________________
Location / City: _____________________________________________

3. DECLARATION & SIGNATURES:
I affirm that I am of legal adult age (18+) and have the full right to contract in my own name. I have read this release prior to signing and fully understand its commercial stock licensing contents.

Model Signature: _______________________ Date: ______________
Photographer Signature: ________________ Date: ______________
Witness Name & Signature: ______________ Date: ______________`;

  const propertyReleaseEnglish = `STANDARD PROPERTY RELEASE (ENGLISH & ARABIC SUMMARY)
For valuable consideration, the undersigned owner or authorized representative of the property described below hereby grants to the Photographer/Filmmaker the full right to create and license commercial stock photos and video footage of the Property.

1. PROPERTY INFORMATION:
Property Name / Description: _________________________________
Physical Address: ____________________________________________
City: ____________________ Country: __________________________

2. OWNER / AUTHORIZED AGENT:
Owner / Company Name: ________________________________________
Authorized Signatory Name: ___________________________________
Title / Relation to Property: ________________________________
Email / Contact: _____________________________________________

3. DECLARATION:
The undersigned warrants that they are the sole owner or authorized agent of the property and have authority to grant this commercial release without infringing third-party rights.

Owner Signature: _______________________ Date: ______________
Photographer Signature: ________________ Date: ______________`;

  const copyTemplate = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(id);
    setTimeout(() => setCopiedTemplate(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">فاحص الشروط القانونية ونماذج الـ Release</h2>
            <p className="text-xs text-zinc-400">
              أداة تشخيصية سريعة لتحديد متطلبات التصريح القانوني (Model / Property) وقوالب جاهزة للنسخ والاعتماد
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Diagnostic Wizard Column */}
        <div className="lg:col-span-6 space-y-5">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <UserCheck className="h-4 w-4 text-amber-400" />
              <span>فحص تفاصيل المشهد المصور</span>
            </h3>

            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={hasFace}
                  onChange={(e) => setHasFace(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-zinc-700 text-amber-500 accent-amber-500"
                />
                <div>
                  <span className="text-xs font-bold text-white block">يظهر وجه شخص بوضوح في المشهد</span>
                  <span className="text-[11px] text-zinc-400">ملامح الوجه واضحة أو زاوية جانبية تكشف هوية الشخص.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={hasTattooOrUnique}
                  onChange={(e) => setHasTattooOrUnique(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-zinc-700 text-amber-500 accent-amber-500"
                />
                <div>
                  <span className="text-xs font-bold text-white block">يظهر وشم مميز أو ميزة جسدية فريدة (حتى بدون وجه)</span>
                  <span className="text-[11px] text-zinc-400">وشم واضح على الذراع أو الرقبة يتيح للآخرين تمييز هوية الشخص.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={isMinor}
                  onChange={(e) => setIsMinor(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-zinc-700 text-rose-500 accent-rose-500"
                />
                <div>
                  <span className="text-xs font-bold text-white block">الشخص الظاهر طفل أو قاصر (أقل من 18 سنة)</span>
                  <span className="text-[11px] text-zinc-400">يتطلب حتماً توقيع ولي الأمر القانوني (Minor Release).</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={isPrivateProperty}
                  onChange={(e) => setIsPrivateProperty(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-zinc-700 text-purple-500 accent-purple-500"
                />
                <div>
                  <span className="text-xs font-bold text-white block">التصوير داخل عقار خاص مميز أو فندق أو فيلا خاصة</span>
                  <span className="text-[11px] text-zinc-400">ديكورات وتصاميم داخلية غير عامة تتطلب توقيع المالك.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={hasLogosOrArtwork}
                  onChange={(e) => setHasLogosOrArtwork(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-zinc-700 text-amber-500 accent-amber-500"
                />
                <div>
                  <span className="text-xs font-bold text-white block">ظهور علامات تجارية أو شعارات أو جداريات فنية</span>
                  <span className="text-[11px] text-zinc-400">شعارات شركات أجهزة، أحذية، ملابس، أو رسومات فنانين.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={isPublicStreetOrNews}
                  onChange={(e) => setIsPublicStreetOrNews(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-zinc-700 text-blue-500 accent-blue-500"
                />
                <div>
                  <span className="text-xs font-bold text-white block">المشهد تم تصويره في شارع عام أو حدث إخباري/مظاهرة</span>
                  <span className="text-[11px] text-zinc-400">أشخاص عابرون في فضاء عام مفتوح لا يمكن استيقافهم.</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Diagnosis Result Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className={`rounded-2xl border p-6 space-y-4 ${status.color}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider">{status.badge}</span>
              <ShieldCheck className="h-5 w-5" />
            </div>

            <h4 className="text-lg font-black text-white">{status.title}</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {status.explanation}
            </p>

            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-[11px] text-zinc-400 leading-relaxed">
              <span className="font-bold text-amber-400">تطبيق التوقيع الموصى به:</span> استخدم تطبيق <strong>Easy Release</strong> المتاح على هواتف Android وiPhone؛ معتمد رسمياً لدى Adobe وShutterstock ويولد ملف PDF متوافقاً في أقل من دقيقة واحدة في موقع التصوير.
            </div>
          </div>

          {/* Legal Templates Box */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTemplateTab('model')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTemplateTab === 'model'
                      ? 'bg-amber-500 text-black'
                      : 'text-zinc-400 hover:text-white bg-zinc-800'
                  }`}
                >
                  نموذج موافقة العارض (Model Release)
                </button>
                <button
                  onClick={() => setActiveTemplateTab('property')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTemplateTab === 'property'
                      ? 'bg-amber-500 text-black'
                      : 'text-zinc-400 hover:text-white bg-zinc-800'
                  }`}
                >
                  نموذج موافقة الممتلكات (Property Release)
                </button>
              </div>

              <button
                onClick={() => copyTemplate(
                  activeTemplateTab === 'model' ? modelReleaseEnglish : propertyReleaseEnglish,
                  activeTemplateTab
                )}
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 text-xs font-bold text-white border border-zinc-700 transition-all cursor-pointer"
              >
                {copiedTemplate === activeTemplateTab ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>نسخ النموذج</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300 leading-relaxed dir-ltr max-h-48 overflow-y-auto select-all">
              {activeTemplateTab === 'model' ? modelReleaseEnglish : propertyReleaseEnglish}
            </div>
            <p className="text-[10px] text-zinc-500">
              * هذا القالب متوافق مع متطلبات Adobe Stock وShutterstock وPond5 القانونية القياسية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
