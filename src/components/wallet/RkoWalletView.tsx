import React, { useState } from 'react';
import { 
  useRkoWallet, 
  AVAILABLE_EARNING_OPPORTUNITIES, 
  AVAILABLE_PERKS,
  RkoRedeemablePerk
} from '../../utils/rkoWalletStorage';
import { RkoCoinLogo } from '../common/RkoCoinLogo';
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  CheckCircle, 
  Coins, 
  Gift, 
  History, 
  Info, 
  Lock, 
  Unlock, 
  Calendar, 
  ChevronRight,
  ShieldAlert,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  FileText
} from 'lucide-react';

interface RkoWalletViewProps {
  onNavigate: (tab: string) => void;
  onCopyText?: (text: string, label: string) => void;
}

export const RkoWalletView: React.FC<RkoWalletViewProps> = ({ onNavigate }) => {
  const { 
    wallet, 
    balance, 
    transactions, 
    unlock, 
    claimDaily, 
    isPerkUnlocked, 
    canAfford 
  } = useRkoWallet();

  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [claiming, setClaiming] = useState(false);

  const showNotification = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleClaimDaily = () => {
    setClaiming(true);
    setTimeout(() => {
      const res = claimDaily();
      if (res.success) {
        showNotification(res.message, 'success');
      } else {
        showNotification(res.message, 'info');
      }
      setClaiming(false);
    }, 250);
  };

  const handleUnlockPerk = (perk: RkoRedeemablePerk) => {
    const res = unlock(perk);
    if (res.success) {
      showNotification(`تم بنجاح فتح "${perk.titleAr}" وخصم ${perk.costRko} RKO!`, 'success');
    } else {
      showNotification(res.error || 'تعذر إتمام العملية', 'error');
    }
  };

  const todayStr = new Date().toISOString().slice(0, 10);
  const isDailyClaimed = wallet.lastDailyRewardDate === todayStr;

  return (
    <div className="min-h-screen pb-24 pt-4 sm:pt-6 px-3 sm:px-6 max-w-4xl w-full mx-auto space-y-6 min-w-0">
      
      {/* Toast Feedback Notification */}
      {notification && (
        <div 
          className={`p-3.5 sm:p-4 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold transition-all shadow-md animate-fade-in ${
            notification.type === 'success' 
              ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30' 
              : notification.type === 'error'
              ? 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/30'
              : 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
            {notification.type === 'error' && <Info className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />}
            {notification.type === 'info' && <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />}
            <span>{notification.text}</span>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="text-xs px-2 py-0.5 rounded-md opacity-70 hover:opacity-100 hover:bg-black/10 transition-all cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      )}

      {/* 1. Main RKO Wallet Card - Focused, clean and elegant */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white p-4.5 sm:p-8 shadow-xl shadow-amber-950/20 text-center sm:text-start w-full min-w-0">
        {/* Subtle warm glow background */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Official Coin & Title */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <RkoCoinLogo size="xl" className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  عملة داخلية
                </span>
                <span className="text-[10px] text-zinc-400">
                  RikouZone Internal Currency
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                محفظة <span className="text-amber-400">RKO</span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-md leading-relaxed">
                العملة الافتراضية للتحفيز والتعلم داخل المنصة. اجمع RKO عبر الأنشطة واستعملها لفتح القوالب والمزايا.
              </p>
            </div>
          </div>

          {/* Current User Balance */}
          <div className="bg-zinc-900/90 border border-amber-500/30 px-6 py-4 rounded-2xl text-center w-full sm:w-auto min-w-[140px] sm:min-w-[170px] shrink-0">
            <span className="text-[11px] text-zinc-400 font-medium block mb-0.5">الرصيد الحالي</span>
            <div className="flex items-baseline justify-center gap-1.5 font-sans">
              <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                {balance.toLocaleString()}
              </span>
              <span className="text-sm font-black text-amber-300">RKO</span>
            </div>
          </div>

        </div>

        {/* Small Disclaimer Badge */}
        <div className="relative z-10 mt-6 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2 text-[11px]">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>عملة افتراضية وتجريبية وداخلية، ولا تمثل رصيداً مالياً أو قيمة نقدية.</span>
          </div>

          {/* Daily check-in button */}
          <button
            onClick={handleClaimDaily}
            disabled={isDailyClaimed || claiming}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              isDailyClaimed
                ? 'bg-zinc-800 text-zinc-500 border border-zinc-700/60 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black active:scale-95 shadow-sm'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{isDailyClaimed ? 'تم استلام مكافأة اليوم' : 'مكافأة الحضور اليومية (+15 RKO)'}</span>
          </button>
        </div>

      </div>

      {/* 2. Section: How to Earn RKO (كيف تربح RKO) */}
      <div className="rounded-3xl border border-slate-200 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/50 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                كيف تربح RKO؟
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                طرق جمع العملة عبر الأنشطة التعليمية المفيدة في المنصة:
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          {/* Card 1: Lessons */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-950/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">إكمال الدروس</span>
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 font-sans shrink-0">+45 RKO</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-2">
                دراسة خطوات وخطط العمل التنفيذية في مسارات الدخل الرقمي.
              </p>
              <button
                onClick={() => onNavigate('income')}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>الانتقال للمسارات</span>
                <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Card 2: Quizzes */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-950/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">اجتياز الاختبارات</span>
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 font-sans shrink-0">+30 RKO</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-2">
                اختبار معلوماتك في التجارة الإلكترونية، صناعة المحتوى، وتطوير المهارات.
              </p>
              <button
                onClick={() => onNavigate('challenges')}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>عرض الاختبارات</span>
                <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Card 3: Daily Challenges */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-950/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">إكمال التحديات اليومية</span>
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 font-sans shrink-0">+15 RKO</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-2">
                إنجاز مهام اليوم المتجددة والحفاظ على سلسلة التعلم المستمر.
              </p>
              <button
                onClick={() => onNavigate('challenges')}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>فتح التحديات</span>
                <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Card 4: Contributions & Projects */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-950/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <Layers className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">المساهمات والمشاريع</span>
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 font-sans shrink-0">+80 RKO</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-2">
                تطبيق دراسة جدوى عملية، خطة محتوى، أو نموذج أولي باستخدام حاسبات المنصة.
              </p>
              <button
                onClick={() => onNavigate('tools')}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>أدوات التطبيق</span>
                <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>

        </div>

        {/* Server Validation Notice */}
        <div className="mt-4 p-3 rounded-xl bg-slate-100 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800/80 flex items-start gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
          <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>ملاحظة هامة:</strong> لا تُمنح المكافآت بمجرد الضغط المتكرر. التحقق من إكمال الأنشطة ومنع تكرار المكافآت سيعتمد لاحقاً على خادم آمن قبل الإطلاق الفعلي لضمان العدالة والموثوقية.
          </p>
        </div>
      </div>

      {/* 3. Section: Where to Use RKO (أين تستعمل RKO) */}
      <div className="rounded-3xl border border-slate-200 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/50 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              أين يمكن استعمال RKO؟
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              استبدل رصيدك لفتح القوالب والمزايا والأدوات الرقمية داخل المنصة:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {AVAILABLE_PERKS.map((perk) => {
            const unlocked = isPerkUnlocked(perk.id);
            const affordable = canAfford(perk.costRko);

            return (
              <div 
                key={perk.id}
                className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                  unlocked
                    ? 'border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-950/20'
                    : 'border-slate-200 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-950/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {perk.titleAr}
                    </span>
                    <span className="text-xs font-black text-amber-600 dark:text-amber-400 font-sans shrink-0">
                      {perk.costRko} RKO
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-3">
                    {perk.descriptionAr}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-200 dark:border-zinc-800/70 flex items-center justify-between text-xs">
                  {unlocked ? (
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      مفتوح ومفعل
                    </span>
                  ) : (
                    <span className="text-slate-500 dark:text-zinc-400 text-[11px]">
                      {affordable ? 'رصيدك كافٍ للفتح' : 'تحتاج رصيد إضافي'}
                    </span>
                  )}

                  {unlocked ? (
                    perk.targetTab ? (
                      <button
                        onClick={() => onNavigate(perk.targetTab!)}
                        className="px-3 py-1 rounded-lg font-bold bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-900 dark:text-white text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <span>استعراض</span>
                        <ChevronRight className="w-3 h-3 rtl:rotate-180" />
                      </button>
                    ) : null
                  ) : (
                    <button
                      onClick={() => handleUnlockPerk(perk)}
                      disabled={!affordable}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
                        affordable
                          ? 'bg-amber-500 hover:bg-amber-400 text-black active:scale-95 shadow-xs'
                          : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 cursor-not-allowed'
                      }`}
                    >
                      <Lock className="w-3 h-3" />
                      <span>{affordable ? 'فتح الآن' : 'غير كافٍ'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Section: Brief Transaction History (سجل المعاملات) */}
      <div className="rounded-3xl border border-slate-200 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/50 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              سجل المعاملات المختصر
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              المكافآت والخصومات المسجلة محلياً في هذا المتصفح:
            </p>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-8 text-slate-400 dark:text-zinc-500 text-xs">
            لا توجد معاملات مسجلة بعد.
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.slice(0, 5).map((tx) => (
              <div
                key={tx.id}
                className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800/70 bg-slate-50/60 dark:bg-zinc-950/40 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    tx.type === 'spend' 
                      ? 'bg-rose-500/10 text-rose-500' 
                      : 'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {tx.type === 'spend' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownLeft className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-slate-900 dark:text-white truncate block">
                      {tx.title}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-zinc-400 truncate block">
                      {tx.description}
                    </span>
                  </div>
                </div>

                <div className="text-left shrink-0 font-sans">
                  <span className={`font-black text-xs block ${
                    tx.type === 'spend' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount} RKO
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500 block">
                    {new Date(tx.timestamp).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Small Technical Disclaimer Notice at Bottom */}
      <div className="p-3.5 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 text-xs text-slate-600 dark:text-zinc-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          الرصيد محفوظ محلياً في متصفحك (Local Storage) كنموذج أولي، وقد يُفقد عند مسح بيانات التصفح أو تغيير الجهاز. عملة <strong>RKO</strong> هي عملة تحفيز داخلية حصرية لمنصة RikouZone، وليست أصلاً مالياً ولا تملك قيمة نقدية أو تحويل خارجي.
        </p>
      </div>

    </div>
  );
};
