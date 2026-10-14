import { useState, useEffect } from 'react';
import { getInitialUserState } from './challengeStorage';

export interface LockedTrackRule {
  id: string;
  requiredXp: number;
  arabicName: string;
  englishName: string;
}

export const LOCKED_TRACKS_RULES: Record<string, LockedTrackRule> = {
  'online-courses': {
    id: 'online-courses',
    requiredXp: 500,
    arabicName: 'صناعة وبيع الكورسات والتكوينات (Online Courses)',
    englishName: 'Online Courses & Training Creation'
  },
  'web-development': {
    id: 'web-development',
    requiredXp: 1000,
    arabicName: 'تطوير المواقع وصفحات الهبوط (Web Development)',
    englishName: 'Web & Landing Page Development'
  },
  'app-development': {
    id: 'app-development',
    requiredXp: 1500,
    arabicName: 'برمجة وتطوير تطبيقات الموبايل (Mobile App Development)',
    englishName: 'Mobile App Development'
  },
  'micro-saas': {
    id: 'micro-saas',
    requiredXp: 2000,
    arabicName: 'تطوير البرمجيات الصغيرة كخدمة (Micro-SaaS)',
    englishName: 'Micro-SaaS Development'
  }
};

export function isTrackLocked(trackId: string, currentXp: number): boolean {
  const rule = LOCKED_TRACKS_RULES[trackId];
  if (!rule) return false;
  return currentXp < rule.requiredXp;
}

export interface TrackLockDetails {
  isLocked: boolean;
  requiredXp: number;
  currentXp: number;
  remainingXp: number;
  progressPercent: number;
}

export function getTrackLockDetails(trackId: string, currentXp: number): TrackLockDetails | null {
  const rule = LOCKED_TRACKS_RULES[trackId];
  if (!rule) return null;

  const isLocked = currentXp < rule.requiredXp;
  const remainingXp = Math.max(0, rule.requiredXp - currentXp);
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentXp / rule.requiredXp) * 100)));

  return {
    isLocked,
    requiredXp: rule.requiredXp,
    currentXp,
    remainingXp,
    progressPercent
  };
}

/**
 * Custom React Hook to track the user's real-time XP across all views.
 * Listens to custom 'rz_xp_updated' events and window 'storage' events
 * to ensure instant reactive unlocking without requiring page reload.
 */
export function useUserXp(): number {
  const [xp, setXp] = useState<number>(() => {
    return getInitialUserState().totalXp;
  });

  useEffect(() => {
    const handleXpUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ totalXp?: number }>;
      if (customEvent.detail && typeof customEvent.detail.totalXp === 'number') {
        setXp(customEvent.detail.totalXp);
      } else {
        setXp(getInitialUserState().totalXp);
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'rikouzone_challenges_user_state' || !e.key) {
        setXp(getInitialUserState().totalXp);
      }
    };

    window.addEventListener('rz_xp_updated', handleXpUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('rz_xp_updated', handleXpUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return xp;
}

export interface LockedTracksDictionary {
  lockedBadge: string;
  unlockedBadge: string;
  requiredXpLabel: string;
  currentXpLabel: string;
  remainingXpLabel: string;
  progressLabel: string;
  modalBadge: string;
  modalTitle: string;
  modalDesc: string;
  goToChallengesBtn: string;
  closeBtn: string;
  noDeductionNote: string;
  directBlockedTitle: string;
  directBlockedDesc: string;
  browseOtherPathsBtn: string;
  cardActionLocked: string;
}

export const lockedTracksI18n: Record<string, LockedTracksDictionary> = {
  ar: {
    lockedBadge: 'مقفول بنقاط XP',
    unlockedBadge: 'مفتوح بنجاح',
    requiredXpLabel: 'المطلوب:',
    currentXpLabel: 'نقاطك:',
    remainingXpLabel: 'المتبقي لفتحه:',
    progressLabel: 'نسبة التقدم لفتح المجال:',
    modalBadge: 'نظام الاستحقاق التعليمي · RikouZone',
    modalTitle: 'هذا المجال مقفول حالياً',
    modalDesc: 'يتطلب هذا المجال جمع {req} XP للوصول إلى محتواه الكامل. أنجز التمارين والاختبارات اليومية والأسبوعية لجمع النقاط وفتحه تلقائياً!',
    goToChallengesBtn: 'دخول التحديات لكسب المزيد من XP',
    closeBtn: 'إغلاق',
    noDeductionNote: 'ملاحظة: لا يتم خصم أي نقاط XP عند فتح هذا المجال؛ النقاط المطلوبة هي شرط للاستحقاق فقط.',
    directBlockedTitle: 'عذراً، هذا المجال مقفول حالياً بنقاط XP',
    directBlockedDesc: 'لا يمكنك تصفح هذا المسار مباشرة لأنك تحتاج إلى {req} XP لفتحه. نقاطك الحالية هي {curr} XP (متبقي {rem} XP).',
    browseOtherPathsBtn: 'استكشاف مسارات أخرى متاحة',
    cardActionLocked: 'مقفول · يتطلب {req} XP'
  },
  ary: {
    lockedBadge: 'مقفول بنقاط XP',
    unlockedBadge: 'مفتوح بنجاح',
    requiredXpLabel: 'المطلوب:',
    currentXpLabel: 'النقاط ديالك:',
    remainingXpLabel: 'الباقي باش يتحل:',
    progressLabel: 'التقدم باش تحل هاد المجال:',
    modalBadge: 'نظام التحديات والجدارة · RikouZone',
    modalTitle: 'هاد المجال مقفول دابا',
    modalDesc: 'هاد المجال كيطلب تجمع {req} XP باش تدخل للمحتوى الكامل ديالو. كمّل التحديات والاختبارات باش تجمع النقاط ويتحل ليك تلقائياً!',
    goToChallengesBtn: 'دخول التحديات باش تجمع XP',
    closeBtn: 'سد النافذة',
    noDeductionNote: 'ملاحظة: ما كيتنقص والو من نقاط XP ملي كيتحل المجال؛ النقاط هي شرط للفتح فقط.',
    directBlockedTitle: 'هاد المجال مقفول بنقاط XP',
    directBlockedDesc: 'ما تقدرش تدخل لهاد المسار ديريكت حيت خاصك {req} XP باش يتحل. عندك دابا {curr} XP (باقي ليك {rem} XP).',
    browseOtherPathsBtn: 'شوف مسارات أخرى مفتوحة',
    cardActionLocked: 'مقفول · خاصك {req} XP'
  },
  en: {
    lockedBadge: 'Locked with XP',
    unlockedBadge: 'Unlocked',
    requiredXpLabel: 'Required:',
    currentXpLabel: 'Your XP:',
    remainingXpLabel: 'Remaining to unlock:',
    progressLabel: 'Unlock progress:',
    modalBadge: 'Merit Progression · RikouZone',
    modalTitle: 'This Track is Currently Locked',
    modalDesc: 'This advanced track requires {req} XP to access its full curriculum. Complete daily quizzes and practical exercises to gather points and unlock it automatically!',
    goToChallengesBtn: 'Go to Challenges & Earn XP',
    closeBtn: 'Close',
    noDeductionNote: 'Note: No XP is deducted when unlocking this track; the points only serve as an eligibility threshold.',
    directBlockedTitle: 'Direct Access Restricted — Track Locked',
    directBlockedDesc: 'You cannot view this track directly because it requires {req} XP to unlock. You currently have {curr} XP ({rem} XP remaining).',
    browseOtherPathsBtn: 'Browse Other Open Tracks',
    cardActionLocked: 'Locked · Requires {req} XP'
  },
  fr: {
    lockedBadge: 'Verrouillé par XP',
    unlockedBadge: 'Déverrouillé',
    requiredXpLabel: 'Requis :',
    currentXpLabel: 'Vos XP :',
    remainingXpLabel: 'Restant pour débloquer :',
    progressLabel: 'Progression de déblocage :',
    modalBadge: 'Système de Mérite · RikouZone',
    modalTitle: 'Ce parcours est actuellement verrouillé',
    modalDesc: 'Ce parcours exige {req} XP pour accéder à son contenu complet. Réussissez les défis et quiz pour cumuler les points et le déverrouiller automatiquement !',
    goToChallengesBtn: 'Aller aux Défis & Gagner des XP',
    closeBtn: 'Fermer',
    noDeductionNote: 'Note : Aucun point XP n’est débité lors du déblocage ; les points constituent seulement un seuil d’accès.',
    directBlockedTitle: 'Accès restreint — Parcours verrouillé',
    directBlockedDesc: 'Vous ne pouvez pas accéder directement à ce parcours car il nécessite {req} XP. Vous possédez {curr} XP ({rem} XP manquants).',
    browseOtherPathsBtn: 'Explorer d’autres parcours ouverts',
    cardActionLocked: 'Verrouillé · Requis {req} XP'
  },
  es: {
    lockedBadge: 'Bloqueado con XP',
    unlockedBadge: 'Desbloqueado',
    requiredXpLabel: 'Requerido:',
    currentXpLabel: 'Tus XP:',
    remainingXpLabel: 'Restante para desbloquear:',
    progressLabel: 'Progreso de desbloqueo:',
    modalBadge: 'Sistema de Mérito · RikouZone',
    modalTitle: 'Esta ruta está actualmente bloqueada',
    modalDesc: 'Esta ruta requiere {req} XP para acceder a su contenido completo. ¡Supera desafíos y cuestionarios para sumar puntos y desbloquearla automáticamente!',
    goToChallengesBtn: 'Ir a Desafíos y Ganar XP',
    closeBtn: 'Cerrar',
    noDeductionNote: 'Nota: No se descuentan puntos XP al desbloquear la ruta; solo actúan como requisito de elegibilidad.',
    directBlockedTitle: 'Acceso directo restringido — Ruta bloqueada',
    directBlockedDesc: 'No puedes acceder directamente a esta ruta porque requiere {req} XP. Actualmente tienes {curr} XP (faltan {rem} XP).',
    browseOtherPathsBtn: 'Explorar otras rutas abiertas',
    cardActionLocked: 'Bloqueado · Requiere {req} XP'
  },
  de: {
    lockedBadge: 'Mit XP gesperrt',
    unlockedBadge: 'Freigeschaltet',
    requiredXpLabel: 'Erforderlich:',
    currentXpLabel: 'Deine XP:',
    remainingXpLabel: 'Noch erforderlich:',
    progressLabel: 'Fortschritt zur Freischaltung:',
    modalBadge: 'Leistungsfortschritt · RikouZone',
    modalTitle: 'Dieser Pfad ist derzeit gesperrt',
    modalDesc: 'Dieser fortgeschrittene Pfad erfordert {req} XP für den vollen Zugriff. Schließen Sie Quizzes und Übungen ab, um ihn automatisch freizuschalten!',
    goToChallengesBtn: 'Zu den Challenges & XP sammeln',
    closeBtn: 'Schließen',
    noDeductionNote: 'Hinweis: Beim Freischalten werden keine XP abgezogen; die Punkte dienen nur als Zugangsvoraussetzung.',
    directBlockedTitle: 'Direkter Zugriff verwehrt — Pfad gesperrt',
    directBlockedDesc: 'Sie können diesen Pfad nicht direkt öffnen, da {req} XP erforderlich sind. Aktueller Stand: {curr} XP ({rem} XP fehlen).',
    browseOtherPathsBtn: 'Andere offene Pfade entdecken',
    cardActionLocked: 'Gesperrt · Benötigt {req} XP'
  },
  it: {
    lockedBadge: 'Bloccato con XP',
    unlockedBadge: 'Sbloccato',
    requiredXpLabel: 'Richiesto:',
    currentXpLabel: 'I tuoi XP:',
    remainingXpLabel: 'Rimanenti per sbloccare:',
    progressLabel: 'Avanzamento sblocco:',
    modalBadge: 'Sistema di Merito · RikouZone',
    modalTitle: 'Questo percorso è attualmente bloccato',
    modalDesc: 'Questo percorso avanzato richiede {req} XP per accedere a tutte le lezioni. Completa quiz ed esercizi per accumulare punti e sbloccarlo automaticamente!',
    goToChallengesBtn: 'Vai alle Sfide e guadagna XP',
    closeBtn: 'Chiudi',
    noDeductionNote: 'Nota: Nessun punto XP viene dedotto allo sblocco; i punti fungono unicamente da soglia di accesso.',
    directBlockedTitle: 'Accesso diretto non consentito — Percorso bloccato',
    directBlockedDesc: 'Non puoi accedere direttamente a questo percorso poiché richiede {req} XP. Punteggio attuale: {curr} XP (mancano {rem} XP).',
    browseOtherPathsBtn: 'Esplora altri percorsi aperti',
    cardActionLocked: 'Bloccato · Richiede {req} XP'
  },
  pt: {
    lockedBadge: 'Bloqueado por XP',
    unlockedBadge: 'Desbloqueado',
    requiredXpLabel: 'Necessário:',
    currentXpLabel: 'Seus XP:',
    remainingXpLabel: 'Restante para desbloquear:',
    progressLabel: 'Progresso de desbloqueio:',
    modalBadge: 'Sistema de Mérito · RikouZone',
    modalTitle: 'Esta trilha está bloqueada no momento',
    modalDesc: 'Esta trilha avançada requer {req} XP para liberar o conteúdo completo. Conclua questionários e desafios diários para acumular pontos e desbloquear!',
    goToChallengesBtn: 'Ir para os Desafios e Ganhar XP',
    closeBtn: 'Fechar',
    noDeductionNote: 'Nota: Nenhum ponto XP é deduzido ao desbloquear; os pontos necessários são apenas um pré-requisito.',
    directBlockedTitle: 'Acesso direto restrito — Trilha bloqueada',
    directBlockedDesc: 'Você não pode acessar esta trilha diretamente porque ela requer {req} XP. Você tem {curr} XP (faltam {rem} XP).',
    browseOtherPathsBtn: 'Explorar outras trilhas abertas',
    cardActionLocked: 'Bloqueado · Requer {req} XP'
  },
  zh: {
    lockedBadge: 'XP 积分锁定',
    unlockedBadge: '已解锁',
    requiredXpLabel: '需要：',
    currentXpLabel: '您的 XP：',
    remainingXpLabel: '距离解锁还需：',
    progressLabel: '解锁进度：',
    modalBadge: '成就进阶系统 · RikouZone',
    modalTitle: '该专业领域当前已锁定',
    modalDesc: '该进阶技能领域需要达到 {req} XP 才能开放完整内容。请参与每日挑战与实战测验积累积分，达标后自动解锁！',
    goToChallengesBtn: '前往每日挑战赚取 XP',
    closeBtn: '关闭',
    noDeductionNote: '提示：解锁本领域不会扣除任何 XP 积分，所需积分仅为达到门槛的资格认证。',
    directBlockedTitle: '直接访问受限 — 领域已锁定',
    directBlockedDesc: '您无法直接访问该领域，需累积达到 {req} XP 方可解锁。当前拥有 {curr} XP（尚缺 {rem} XP）。',
    browseOtherPathsBtn: '浏览其他开放领域',
    cardActionLocked: '已锁定 · 需 {req} XP'
  }
};
