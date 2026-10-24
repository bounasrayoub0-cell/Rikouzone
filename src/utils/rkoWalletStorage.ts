/**
 * RKO Virtual Currency System - RikouZone Internal Token Prototype
 * 
 * IMPORTANT ARCHITECTURAL & TECHNICAL NOTICE:
 * - RKO is strictly an internal virtual currency for RikouZone educational gamification.
 * - It is NOT a cryptocurrency, token on blockchain, or monetary asset.
 * - It has no cash value and cannot be exchanged for fiat currency.
 * - At this phase (Phase 1), data is stored locally in the browser's localStorage.
 * - This local verification is a prototype demonstration. Before production launch,
 *   activity verification and reward anti-replay will require server-authoritative
 *   validation (API endpoints) to prevent client-side manipulation.
 */

import { useState, useEffect, useCallback } from 'react';

export const RKO_STORAGE_KEY = 'rikouzone_rko_wallet_state';
export const RKO_UPDATE_EVENT = 'rikouzone_rko_wallet_updated';

export type RkoTransactionType = 'earn' | 'spend' | 'bonus' | 'refund';
export type RkoCategory = 'lesson' | 'quiz' | 'challenge' | 'contribution' | 'perk' | 'template' | 'service' | 'system';

export interface RkoTransaction {
  id: string;
  type: RkoTransactionType;
  amount: number; // Positive for earned/received, negative for spent
  category: RkoCategory;
  title: string;
  description: string;
  timestamp: number;
  status: 'completed' | 'verified_local';
  referenceId?: string;
}

export interface RkoEarningOpportunity {
  id: string;
  title: string;
  titleAr: string;
  category: 'lesson' | 'quiz' | 'challenge' | 'contribution';
  rewardRko: number;
  descriptionAr: string;
  actionLabelAr: string;
  targetTab?: string;
  requiresServerVerification: boolean;
  frequency: 'once' | 'daily' | 'repeatable';
  icon: string;
}

export interface RkoRedeemablePerk {
  id: string;
  titleAr: string;
  category: 'perk' | 'template' | 'service';
  costRko: number;
  descriptionAr: string;
  featuresAr: string[];
  actionLabelAr: string;
  targetTab?: string;
  isUnlocked?: boolean;
  badge?: string;
}

export interface RkoWalletState {
  balance: number;
  lifetimeEarned: number;
  lifetimeSpent: number;
  transactions: RkoTransaction[];
  unlockedPerkIds: string[];
  claimedTaskIds: string[];
  lastDailyRewardDate?: string;
  version: number;
}

export const INITIAL_RKO_WALLET_STATE: RkoWalletState = {
  balance: 50, // Welcome initial bonus for testing the prototype
  lifetimeEarned: 50,
  lifetimeSpent: 0,
  transactions: [
    {
      id: 'tx-welcome-001',
      type: 'bonus',
      amount: 50,
      category: 'system',
      title: 'رصيد ترحيبي تجريبي (نموذج أولي)',
      description: 'رصيد ترحيبي أولي لاختبار محفظة RKO واستكشاف مزايا المنصة محلياً.',
      timestamp: Date.now(),
      status: 'verified_local'
    }
  ],
  unlockedPerkIds: [],
  claimedTaskIds: [],
  lastDailyRewardDate: undefined,
  version: 1
};

export const AVAILABLE_EARNING_OPPORTUNITIES: RkoEarningOpportunity[] = [
  {
    id: 'earn-daily-login',
    title: 'Daily Check-in',
    titleAr: 'المطالبة بمكافأة الحضور اليومية',
    category: 'challenge',
    rewardRko: 15,
    descriptionAr: 'قم بزيارة المنصة يومياً وتأكيد نشاطك لربح رصيد RKO تحفيزي.',
    actionLabelAr: 'مطالبة بمكافأة اليوم',
    frequency: 'daily',
    requiresServerVerification: false,
    icon: 'calendar'
  },
  {
    id: 'earn-complete-quiz',
    title: 'Quiz Mastery',
    titleAr: 'اجتياز اختبارات المعرفة التفاعلية',
    category: 'quiz',
    rewardRko: 30,
    descriptionAr: 'اختبر فهمك لمسارات مثل الدروبشيبينغ، تحرير الفيديو، والتسويق بالعمولة.',
    actionLabelAr: 'الانتقال للاختبارات',
    targetTab: 'challenges',
    frequency: 'repeatable',
    requiresServerVerification: true,
    icon: 'check-circle'
  },
  {
    id: 'earn-complete-lesson',
    title: 'Learning Path Progression',
    titleAr: 'إكمال خطة مسار دخل رقمي',
    category: 'lesson',
    rewardRko: 45,
    descriptionAr: 'أكمل قراءة خطوات وخطط العمل التنفيذية في أحد مسارات RikouZone الـ 27.',
    actionLabelAr: 'استكشاف المسارات',
    targetTab: 'income',
    frequency: 'repeatable',
    requiresServerVerification: true,
    icon: 'book-open'
  },
  {
    id: 'earn-daily-challenge',
    title: 'Daily Challenge Completion',
    titleAr: 'تنفيذ التحديات اليومية والأسبوعية',
    category: 'challenge',
    rewardRko: 35,
    descriptionAr: 'أنجز مهام التحديات وسجل نقاط الـ XP لتفعيل مكافآت مضاعفة من عملة RKO.',
    actionLabelAr: 'عرض التحديات',
    targetTab: 'challenges',
    frequency: 'daily',
    requiresServerVerification: true,
    icon: 'flame'
  },
  {
    id: 'earn-community-contribution',
    title: 'Practical Project Contribution',
    titleAr: 'تطبيق مشروع عملي ومشاركته',
    category: 'contribution',
    rewardRko: 80,
    descriptionAr: 'أنشئ خطة محتوى، أو دراسة جدوى لمتجر إلكتروني، أو نموذج أولي.',
    actionLabelAr: 'استعراض أدوات التطبيق',
    targetTab: 'tools',
    frequency: 'repeatable',
    requiresServerVerification: true,
    icon: 'sparkles'
  }
];

export const AVAILABLE_PERKS: RkoRedeemablePerk[] = [
  {
    id: 'perk-pro-content-kit',
    titleAr: 'حقيبة قوالب إنتاج المحتوى الرقمي المتقدمة',
    category: 'template',
    costRko: 40,
    descriptionAr: 'مجموعة قوالب جدول المحتوى، وسكربتات التيك توك واليوتيوب الجاهزة للنسخ.',
    featuresAr: [
      '30 فكرة فيديو قابلة للتطبيق مباشرة',
      'نماذج Hook وCall to action جذابة',
      'قالب جدول أسبوعي قابل للتصدير'
    ],
    actionLabelAr: 'فتح الحقيبة',
    targetTab: 'ideas',
    badge: 'الأكثر طلباً'
  },
  {
    id: 'perk-advanced-pricing-calc',
    titleAr: 'حاسبة تسعير الخدمات المتقدمة للعمل الحر',
    category: 'service',
    costRko: 50,
    descriptionAr: 'أداة حصرية لحساب تكلفة الساعة وهامش الربح وضرائب الخدمات المستقلة بدقة.',
    featuresAr: [
      'معادلات تسعير العقود والمشاريع الكبيرة',
      'حساب تكلفة الفرصة البديلة ونفقات البرمجيات',
      'تصدير تقرير تسعير جاهز للعميل'
    ],
    actionLabelAr: 'تفعيل الأداة',
    targetTab: 'tools',
    badge: 'خدمة رقمية'
  },
  {
    id: 'perk-silver-supporter-badge',
    titleAr: 'شارة عضو RKO الفضي في الملف الشخصي',
    category: 'perk',
    costRko: 75,
    descriptionAr: 'شارة سداسية فضية مميزة تزين ملفك الشخصي وتبرز نشاطك في مجتمع RikouZone.',
    featuresAr: [
      'شارة بصرية حصرية في صفحة الحساب',
      'مضاعف نقاط XP بنسبة +10% في التحديات',
      'أولوية تجربة الأدوات والميزات التجريبية الجديدة'
    ],
    actionLabelAr: 'الحصول على الشارة',
    targetTab: 'profile',
    badge: 'شارة نادرة'
  },
  {
    id: 'perk-ecommerce-launch-blueprint',
    titleAr: 'مخطط إطلاق المتجر الإلكتروني السريع (Blueprint)',
    category: 'template',
    costRko: 90,
    descriptionAr: 'قائمة مرجعية متكاملة ومرحلية من اختيار الموردين وحتى إطلاق أول حملة إعلانية.',
    featuresAr: [
      'فحص معايير الموردين وبوابات الدفع',
      'سكربت الرد على اعتراضات واستفسارات الزبائن',
      'خطة حملة إعلانية تجريبية بميزانية منخفضة'
    ],
    actionLabelAr: 'فتح المخطط',
    targetTab: 'income',
    badge: 'حصري'
  }
];

export function getStoredRkoWallet(): RkoWalletState {
  if (typeof window === 'undefined') return INITIAL_RKO_WALLET_STATE;
  try {
    const raw = localStorage.getItem(RKO_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(RKO_STORAGE_KEY, JSON.stringify(INITIAL_RKO_WALLET_STATE));
      return INITIAL_RKO_WALLET_STATE;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.balance !== 'number') {
      return INITIAL_RKO_WALLET_STATE;
    }
    return {
      balance: parsed.balance ?? 0,
      lifetimeEarned: parsed.lifetimeEarned ?? parsed.balance ?? 0,
      lifetimeSpent: parsed.lifetimeSpent ?? 0,
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
      unlockedPerkIds: Array.isArray(parsed.unlockedPerkIds) ? parsed.unlockedPerkIds : [],
      claimedTaskIds: Array.isArray(parsed.claimedTaskIds) ? parsed.claimedTaskIds : [],
      lastDailyRewardDate: parsed.lastDailyRewardDate,
      version: parsed.version || 1
    };
  } catch (err) {
    console.warn('Failed to load RKO wallet:', err);
    return INITIAL_RKO_WALLET_STATE;
  }
}

export function saveRkoWallet(state: RkoWalletState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(RKO_STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent(RKO_UPDATE_EVENT, { detail: state }));
  } catch (err) {
    console.warn('Failed to save RKO wallet:', err);
  }
}

export function recordRkoTransaction(
  type: RkoTransactionType,
  amount: number,
  category: RkoCategory,
  title: string,
  description: string,
  referenceId?: string
): { success: boolean; newBalance: number; error?: string } {
  const current = getStoredRkoWallet();
  const absAmount = Math.abs(amount);

  if (type === 'spend') {
    if (current.balance < absAmount) {
      return { success: false, newBalance: current.balance, error: 'رصيد RKO غير كافٍ لإتمام العملية.' };
    }
  }

  const transactionAmount = type === 'spend' ? -absAmount : absAmount;
  const newBalance = Math.max(0, current.balance + transactionAmount);
  
  const newTx: RkoTransaction = {
    id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type,
    amount: transactionAmount,
    category,
    title,
    description,
    timestamp: Date.now(),
    status: 'verified_local',
    referenceId
  };

  const updatedState: RkoWalletState = {
    ...current,
    balance: newBalance,
    lifetimeEarned: type === 'earn' || type === 'bonus' ? current.lifetimeEarned + absAmount : current.lifetimeEarned,
    lifetimeSpent: type === 'spend' ? current.lifetimeSpent + absAmount : current.lifetimeSpent,
    transactions: [newTx, ...current.transactions].slice(0, 100), // Keep latest 100 transactions
    claimedTaskIds: referenceId && (type === 'earn' || type === 'bonus') && !current.claimedTaskIds.includes(referenceId)
      ? [...current.claimedTaskIds, referenceId]
      : current.claimedTaskIds
  };

  saveRkoWallet(updatedState);
  return { success: true, newBalance };
}

export function unlockRkoPerk(perk: RkoRedeemablePerk): { success: boolean; newBalance: number; error?: string } {
  const current = getStoredRkoWallet();
  if (current.unlockedPerkIds.includes(perk.id)) {
    return { success: false, newBalance: current.balance, error: 'هذه الميزة مفتوحة ومفعلة بالفعل في حسابك.' };
  }
  if (current.balance < perk.costRko) {
    return { 
      success: false, 
      newBalance: current.balance, 
      error: `تحتاج إلى ${perk.costRko} RKO بينما رصيدك الحالي هو ${current.balance} RKO.` 
    };
  }

  const res = recordRkoTransaction(
    'spend',
    perk.costRko,
    perk.category,
    `فتح: ${perk.titleAr}`,
    `استبدال رصيد RKO لفتح ميزة "${perk.titleAr}".`,
    perk.id
  );

  if (res.success) {
    const afterSpend = getStoredRkoWallet();
    const updatedWithPerk: RkoWalletState = {
      ...afterSpend,
      unlockedPerkIds: [...afterSpend.unlockedPerkIds, perk.id]
    };
    saveRkoWallet(updatedWithPerk);
    return { success: true, newBalance: res.newBalance };
  }

  return res;
}

export function claimDailyRkoBonus(): { success: boolean; reward: number; message: string } {
  const current = getStoredRkoWallet();
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  if (current.lastDailyRewardDate === today) {
    return { 
      success: false, 
      reward: 0, 
      message: 'لقد قمت بالمطالبة بمكافأة الحضور اليومية بالفعل اليوم. عد غداً للمطالبة بمكافأة جديدة!' 
    };
  }

  const rewardAmount = 15;
  const res = recordRkoTransaction(
    'earn',
    rewardAmount,
    'challenge',
    'مكافأة الحضور اليومي',
    'مكافأة الحضور والتفاعل اليومي في RikouZone.',
    `daily-${today}`
  );

  if (res.success) {
    const after = getStoredRkoWallet();
    saveRkoWallet({
      ...after,
      lastDailyRewardDate: today
    });
    return {
      success: true,
      reward: rewardAmount,
      message: `مبروك! تم إضافة ${rewardAmount} RKO إلى محفظتك بنجاح.`
    };
  }

  return { success: false, reward: 0, message: 'حدث خطأ أثناء تسجيل المكافأة اليومية.' };
}

/**
 * Custom React Hook for live wallet data
 */
export function useRkoWallet() {
  const [wallet, setWallet] = useState<RkoWalletState>(getStoredRkoWallet);

  useEffect(() => {
    // Initial fetch
    setWallet(getStoredRkoWallet());

    // Listen for custom wallet updates across components
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<RkoWalletState>;
      if (customEvent.detail) {
        setWallet(customEvent.detail);
      } else {
        setWallet(getStoredRkoWallet());
      }
    };

    window.addEventListener(RKO_UPDATE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(RKO_UPDATE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const earn = useCallback((amount: number, category: RkoCategory, title: string, description: string, refId?: string) => {
    return recordRkoTransaction('earn', amount, category, title, description, refId);
  }, []);

  const spend = useCallback((amount: number, category: RkoCategory, title: string, description: string, refId?: string) => {
    return recordRkoTransaction('spend', amount, category, title, description, refId);
  }, []);

  const unlock = useCallback((perk: RkoRedeemablePerk) => {
    return unlockRkoPerk(perk);
  }, []);

  const claimDaily = useCallback(() => {
    return claimDailyRkoBonus();
  }, []);

  return {
    wallet,
    balance: wallet.balance,
    transactions: wallet.transactions,
    unlockedPerkIds: wallet.unlockedPerkIds,
    earn,
    spend,
    unlock,
    claimDaily,
    isPerkUnlocked: (id: string) => wallet.unlockedPerkIds.includes(id),
    canAfford: (cost: number) => wallet.balance >= cost
  };
}
