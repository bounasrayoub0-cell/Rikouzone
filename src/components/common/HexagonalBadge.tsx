import React, { useId } from 'react';
import { BadgeItem } from '../../data/challengesDataTypes';
import { Language } from '../../types';
import { getLocalizedBadge } from '../../utils/badgeTranslations';
import { BadgeProgressInfo } from '../../utils/badgeProgressTracker';
import { 
  Award, 
  Sparkles, 
  HelpCircle, 
  Target, 
  CheckCircle2, 
  Flame, 
  Trophy, 
  Zap, 
  BookOpen, 
  GraduationCap, 
  Library, 
  Medal, 
  Crown, 
  Calendar, 
  Compass, 
  Milestone, 
  Layers, 
  ShieldCheck, 
  Star, 
  BookmarkCheck, 
  Lock,
  Check,
  X
} from 'lucide-react';

export type BadgeTier = 'gold' | 'silver' | 'bronze' | 'neon-cyan' | 'neon-purple' | 'neon-emerald';

export function getBadgeTier(badgeId: string): BadgeTier {
  // Gold (Legendary / Rare - Top tier milestones)
  if ([
    'xp-legend-5000',
    'streak-100-days',
    'challenges-50-completed',
    'lessons-100-done',
    'paths-10-completed',
    'badges-collector-10'
  ].includes(badgeId)) {
    return 'gold';
  }

  // Silver (Advanced - High dedication)
  if ([
    'xp-expert-2500',
    'streak-30-days',
    'challenges-25-completed',
    'lessons-50-done',
    'paths-5-completed',
    'weekly-champion'
  ].includes(badgeId)) {
    return 'silver';
  }

  // Bronze (Starter - First achievements)
  if ([
    'first-challenge-done',
    'xp-century-100',
    'streak-2-days',
    'lessons-1-done',
    'paths-1-started',
    'paths-1-completed'
  ].includes(badgeId)) {
    return 'bronze';
  }

  // Neon Cyan (Knowledge & Quizzes)
  if ([
    'first-quiz-mastered',
    'lessons-5-done',
    'lessons-20-done',
    'quiz-perfect-score',
    'xp-pro-1000'
  ].includes(badgeId)) {
    return 'neon-cyan';
  }

  // Neon Purple (Multi-skills & Challenges)
  if ([
    'challenges-five-completed',
    'challenges-10-completed',
    'paths-3-completed',
    'streak-14-days'
  ].includes(badgeId)) {
    return 'neon-purple';
  }

  // Neon Emerald (Hands-on Builder & Consistency)
  return 'neon-emerald';
}

export const badgeIconMap: Record<string, React.ElementType> = {
  Award,
  Sparkles,
  HelpCircle,
  Target,
  CheckCircle2,
  Flame,
  Trophy,
  Zap,
  BookOpen,
  GraduationCap,
  Library,
  Medal,
  Crown,
  Calendar,
  Compass,
  Milestone,
  Layers,
  ShieldCheck,
  Star,
  BookmarkCheck,
  Lock
};

export const TIER_LOCALIZATIONS: Record<BadgeTier, Record<Language, { label: string; sub: string }>> = {
  gold: {
    ar: { label: 'شارة أسطورية', sub: 'إنجاز نادر' },
    ary: { label: 'شارة أسطورية', sub: 'إنجاز نادر' },
    en: { label: 'Legendary Badge', sub: 'Rare Achievement' },
    fr: { label: 'Badge Légendaire', sub: 'Succès Rare' },
    es: { label: 'Insignia Legendaria', sub: 'Logro Raro' },
    de: { label: 'Legendäres Abzeichen', sub: 'Seltene Leistung' },
    it: { label: 'Distintivo Leggendario', sub: 'Traguardo Raro' },
    pt: { label: 'Emblema Lendário', sub: 'Conquista Rara' },
    zh: { label: '传奇勋章', sub: '稀世成就' },
    ja: { label: '伝説のバッジ', sub: '希少な実績' },
    ko: { label: '전설의 배지', sub: '희귀 업적' },
    tr: { label: 'Efsanevi Rozet', sub: 'Nadir Başarı' },
    hi: { label: 'पौराणिक बैज', sub: 'दुर्लभ उपलब्धि' },
    ru: { label: 'Легендарный значок', sub: 'Редкое достижение' },
    nl: { label: 'Legendarische Badge', sub: 'Zeldzame Prestatie' },
    id: { label: 'Lencana Legendaris', sub: 'Pencapaian Langka' },
    pl: { label: 'Legendarna Odznaka', sub: 'Rzadkie Osiągnięcie' }
  },
  silver: {
    ar: { label: 'شارة متقدمة', sub: 'مستوى احترافي' },
    ary: { label: 'شارة متقدمة', sub: 'مستوى احترافي' },
    en: { label: 'Advanced Badge', sub: 'Pro Milestone' },
    fr: { label: 'Badge Avancé', sub: 'Niveau Pro' },
    es: { label: 'Insignia Avanzada', sub: 'Nivel Pro' },
    de: { label: 'Fortgeschrittenes Abzeichen', sub: 'Profi-Meilenstein' },
    it: { label: 'Distintivo Avanzato', sub: 'Livello Pro' },
    pt: { label: 'Emblema Avançado', sub: 'Nível Pro' },
    zh: { label: '进阶勋章', sub: '精锐段位' },
    ja: { label: '上級バッジ', sub: 'プロレベル' },
    ko: { label: '고급 배지', sub: '프로 마일스톤' },
    tr: { label: 'İleri Seviye Rozet', sub: 'Profesyonel Aşama' },
    hi: { label: 'उन्नत बैज', sub: 'प्रो मुकाम' },
    ru: { label: 'Продвинутый значок', sub: 'Профессиональный уровень' },
    nl: { label: 'Gevorderde Badge', sub: 'Pro Mijlpaal' },
    id: { label: 'Lencana Lanjutan', sub: 'Pencapaian Pro' },
    pl: { label: 'Zaawansowana Odznaka', sub: 'Poziom Pro' }
  },
  bronze: {
    ar: { label: 'شارة البداية', sub: 'خطوة الانطلاق' },
    ary: { label: 'شارة البداية', sub: 'خطوة الانطلاق' },
    en: { label: 'Starter Badge', sub: 'Foundation' },
    fr: { label: 'Badge Débutant', sub: 'Premiers Pas' },
    es: { label: 'Insignia Inicial', sub: 'Primeros Pasos' },
    de: { label: 'Starter-Abzeichen', sub: 'Grundlagen' },
    it: { label: 'Distintivo Iniziale', sub: 'Primi Passi' },
    pt: { label: 'Emblema Inicial', sub: 'Primeiros Passos' },
    zh: { label: '起步勋章', sub: '奠基起航' },
    ja: { label: 'スターターバッジ', sub: '第一歩' },
    ko: { label: '시작 배지', sub: '첫걸음' },
    tr: { label: 'Başlangıç Rozeti', sub: 'İlk Adım' },
    hi: { label: 'शुरुआती बैज', sub: 'पहला कदम' },
    ru: { label: 'Стартовый значок', sub: 'Первый шаг' },
    nl: { label: 'Starter Badge', sub: 'Eerste Stap' },
    id: { label: 'Lencana Pemula', sub: 'Langkah Pertama' },
    pl: { label: 'Odznaka Startowa', sub: 'Pierwszy Krok' }
  },
  'neon-cyan': {
    ar: { label: 'إنجاز معرفي', sub: 'ذكاء واستيعاب' },
    ary: { label: 'إنجاز معرفي', sub: 'ذكاء واستيعاب' },
    en: { label: 'Knowledge Feat', sub: 'Intellect' },
    fr: { label: 'Exploit Savoir', sub: 'Intelligence' },
    es: { label: 'Hito de Conocimiento', sub: 'Intelecto' },
    de: { label: 'Wissenserfolg', sub: 'Intellekt' },
    it: { label: 'Impresa di Conoscenza', sub: 'Intelletto' },
    pt: { label: 'Conquista de Saber', sub: 'Intelecto' },
    zh: { label: '智慧博识', sub: '知行合一' },
    ja: { label: '知識の探求者', sub: '知性と理解' },
    ko: { label: '지식의 탐구자', sub: '지성과 이해' },
    tr: { label: 'Bilgi Başarısı', sub: 'Zeka ve Kavrayış' },
    hi: { label: 'ज्ञान उपलब्धि', sub: 'बुद्धि और समझ' },
    ru: { label: 'Знаток', sub: 'Интеллект и знания' },
    nl: { label: 'Kennisprestatie', sub: 'Inzicht & Begrip' },
    id: { label: 'Pencapaian Ilmu', sub: 'Wawasan & Pemahaman' },
    pl: { label: 'Mistrz Wiedzy', sub: 'Intelekt i Zrozumienie' }
  },
  'neon-purple': {
    ar: { label: 'إنجاز نخبوي', sub: 'إتقان متعدد' },
    ary: { label: 'إنجاز نخبوي', sub: 'إتقان متعدد' },
    en: { label: 'Elite Feat', sub: 'Mastery' },
    fr: { label: 'Exploit Élite', sub: 'Maîtrise' },
    es: { label: 'Hito Élite', sub: 'Maestría' },
    de: { label: 'Elite-Leistung', sub: 'Meisterschaft' },
    it: { label: 'Impresa d’Élite', sub: 'Padronanza' },
    pt: { label: 'Conquista de Elite', sub: 'Domínio' },
    zh: { label: '卓越先锋', sub: '精深造诣' },
    ja: { label: 'エリート実績', sub: '多才な習熟' },
    ko: { label: '엘리트 업적', sub: '다재다능 숙달' },
    tr: { label: 'Seçkin Başarı', sub: 'Kapsamlı Ustalık' },
    hi: { label: 'कुलीन उपलब्धि', sub: 'बहु-कौशल महारत' },
    ru: { label: 'Элитное достижение', sub: 'Мастерство' },
    nl: { label: 'Elite Prestatie', sub: 'Veelzijdig Meesterschap' },
    id: { label: 'Pencapaian Elit', sub: 'Penguasaan Menyeluruh' },
    pl: { label: 'Elitarne Osiągnięcie', sub: 'Wszechstronne Mistrzostwo' }
  },
  'neon-emerald': {
    ar: { label: 'إنجاز تطبيقي', sub: 'تطبيق عملي' },
    ary: { label: 'إنجاز تطبيقي', sub: 'تطبيق عملي' },
    en: { label: 'Hands-on Feat', sub: 'Execution' },
    fr: { label: 'Exploit Pratique', sub: 'Exécution' },
    es: { label: 'Hito Práctico', sub: 'Ejecución' },
    de: { label: 'Praxiserfolg', sub: 'Ausführung' },
    it: { label: 'Impresa Pratica', sub: 'Esecuzione' },
    pt: { label: 'Conquista Prática', sub: 'Execução' },
    zh: { label: '实战行家', sub: '知行并进' },
    ja: { label: '実践の達人', sub: '行動と実行' },
    ko: { label: '실전 마스터', sub: '실행과 적용' },
    tr: { label: 'Uygulamalı Başarı', sub: 'Pratik ve İcra' },
    hi: { label: 'व्यावहारिक उपलब्धि', sub: 'क्रियान्वयन' },
    ru: { label: 'Практик', sub: 'Реальное исполнение' },
    nl: { label: 'Praktijkprestatie', sub: 'Toepassing & Actie' },
    id: { label: 'Pencapaian Praktis', sub: 'Eksekusi Nyata' },
    pl: { label: 'Praktyk Sukcesu', sub: 'Działanie i Realizacja' }
  }
};

const MODAL_STRINGS: Record<Language, {
  requirement: string;
  progressTitle: string;
  unlockedTitle: string;
  lockedTitle: string;
  xpBonusTitle: string;
  close: string;
  statusUnlocked: string;
  statusLocked: string;
}> = {
  ar: {
    requirement: 'شرط الاستحقاق والفتح:',
    progressTitle: 'مستوى التقدم الفعلي:',
    unlockedTitle: 'تم فتح هذه الشارة بنجاح!',
    lockedTitle: 'هذه الشارة ما زالت مقفلة',
    xpBonusTitle: 'مكافأة الخبرة الممنوحة:',
    close: 'إغلاق',
    statusUnlocked: 'مكتسبة',
    statusLocked: 'مقفلة'
  },
  ary: {
    requirement: 'شرط الاستحقاق والفتح:',
    progressTitle: 'مستوى التقدم الفعلي:',
    unlockedTitle: 'تم فتح هذه الشارة بنجاح!',
    lockedTitle: 'هاد الشارة ما زال مقفولة',
    xpBonusTitle: 'مكافأة الخبرة الممنوحة:',
    close: 'سد',
    statusUnlocked: 'مكتسبة',
    statusLocked: 'مقفولة'
  },
  en: {
    requirement: 'Unlock Requirement:',
    progressTitle: 'Current Real Progress:',
    unlockedTitle: 'Badge Unlocked!',
    lockedTitle: 'Badge Currently Locked',
    xpBonusTitle: 'Bonus XP Reward:',
    close: 'Close',
    statusUnlocked: 'Unlocked',
    statusLocked: 'Locked'
  },
  fr: {
    requirement: 'Condition de déblocage :',
    progressTitle: 'Progression réelle actuelle :',
    unlockedTitle: 'Badge débloqué avec succès !',
    lockedTitle: 'Badge actuellement verrouillé',
    xpBonusTitle: 'Récompense bonus XP :',
    close: 'Fermer',
    statusUnlocked: 'Débloqué',
    statusLocked: 'Verrouillé'
  },
  es: {
    requirement: 'Requisito de desbloqueo:',
    progressTitle: 'Progreso real actual:',
    unlockedTitle: '¡Insignia desbloqueada con éxito!',
    lockedTitle: 'Insignia actualmente bloqueada',
    xpBonusTitle: 'Recompensa de XP extra:',
    close: 'Cerrar',
    statusUnlocked: 'Desbloqueado',
    statusLocked: 'Bloqueado'
  },
  de: {
    requirement: 'Freischaltbedingung:',
    progressTitle: 'Aktueller Fortschritt:',
    unlockedTitle: 'Abzeichen erfolgreich freigeschaltet!',
    lockedTitle: 'Abzeichen derzeit gesperrt',
    xpBonusTitle: 'Bonus-XP Belohnung:',
    close: 'Schließen',
    statusUnlocked: 'Freigeschaltet',
    statusLocked: 'Gesperrt'
  },
  it: {
    requirement: 'Requisito di sblocco:',
    progressTitle: 'Progresso reale attuale:',
    unlockedTitle: 'Distintivo sbloccato con successo!',
    lockedTitle: 'Distintivo attualmente bloccato',
    xpBonusTitle: 'Ricompensa bonus XP:',
    close: 'Chiudi',
    statusUnlocked: 'Sbloccato',
    statusLocked: 'Bloccato'
  },
  pt: {
    requirement: 'Requisito de desbloqueio:',
    progressTitle: 'Progresso real atual:',
    unlockedTitle: 'Emblema desbloqueado com sucesso!',
    lockedTitle: 'Emblema atualmente bloqueado',
    xpBonusTitle: 'Recompensa de XP bônus:',
    close: 'Fechar',
    statusUnlocked: 'Desbloqueado',
    statusLocked: 'Bloqueado'
  },
  zh: {
    requirement: '解锁与获取条件：',
    progressTitle: '当前实战进度：',
    unlockedTitle: '已成功点亮该勋章！',
    lockedTitle: '该勋章当前仍处于锁定状态',
    xpBonusTitle: '奖励经验值：',
    close: '关闭',
    statusUnlocked: '已解锁',
    statusLocked: '未解锁'
  },
  ja: {
    requirement: '獲得・アンロック条件：',
    progressTitle: '現在の達成状況：',
    unlockedTitle: 'バッジを獲得しました！',
    lockedTitle: 'このバッジはロックされています',
    xpBonusTitle: '獲得経験値ボーナス：',
    close: '閉じる',
    statusUnlocked: '獲得済み',
    statusLocked: '未達成'
  },
  ko: {
    requirement: '획득 및 잠금 해제 조건:',
    progressTitle: '현재 진행 상태:',
    unlockedTitle: '배지가 성공적으로 잠금 해제되었습니다!',
    lockedTitle: '현재 잠겨 있는 배지입니다',
    xpBonusTitle: '지급 경험치(XP) 보너스:',
    close: '닫기',
    statusUnlocked: '획득 완료',
    statusLocked: '잠김'
  },
  tr: {
    requirement: 'Kazanma ve Kilit Açma Şartı:',
    progressTitle: 'Mevcut Gerçek İlerleme:',
    unlockedTitle: 'Rozet Başarıyla Kazanıldı!',
    lockedTitle: 'Bu Rozet Henüz Kilitli',
    xpBonusTitle: 'Kazanılan XP Bonusu:',
    close: 'Kapat',
    statusUnlocked: 'Kazanıldı',
    statusLocked: 'Kilitli'
  },
  hi: {
    requirement: 'अनलॉक करने की आवश्यकता:',
    progressTitle: 'वर्तमान वास्तविक प्रगति:',
    unlockedTitle: 'बैज सफलतापूर्वक अनलॉक हो गया!',
    lockedTitle: 'यह बैज अभी लॉक है',
    xpBonusTitle: 'प्रदान किया गया XP बोनस:',
    close: 'बंद करें',
    statusUnlocked: 'अनलॉक',
    statusLocked: 'लॉक'
  },
  ru: {
    requirement: 'Условие разблокировки:',
    progressTitle: 'Текущий прогресс:',
    unlockedTitle: 'Значок успешно разблокирован!',
    lockedTitle: 'Значок пока заблокирован',
    xpBonusTitle: 'Бонусные очки XP:',
    close: 'Закрыть',
    statusUnlocked: 'Получен',
    statusLocked: 'Закрыт'
  },
  nl: {
    requirement: 'Ontgrendelingsvoorwaarde:',
    progressTitle: 'Huidige werkelijke voortgang:',
    unlockedTitle: 'Badge succesvol ontgrendeld!',
    lockedTitle: 'Deze badge is nog vergrendeld',
    xpBonusTitle: 'Toegekende XP-bonus:',
    close: 'Sluiten',
    statusUnlocked: 'Ontgrendeld',
    statusLocked: 'Vergrendeld'
  },
  id: {
    requirement: 'Syarat Membuka Lencana:',
    progressTitle: 'Kemajuan Nyata Saat Ini:',
    unlockedTitle: 'Lencana Berhasil Terbuka!',
    lockedTitle: 'Lencana Ini Masih Terkunci',
    xpBonusTitle: 'Bonus Hadiah XP:',
    close: 'Tutup',
    statusUnlocked: 'Terbuka',
    statusLocked: 'Terkunci'
  },
  pl: {
    requirement: 'Warunek odblokowania:',
    progressTitle: 'Aktualny postęp:',
    unlockedTitle: 'Odznaka pomyślnie odblokowana!',
    lockedTitle: 'Ta odznaka jest jeszcze zablokowana',
    xpBonusTitle: 'Przyznany bonus XP:',
    close: 'Zamknij',
    statusUnlocked: 'Odblokowana',
    statusLocked: 'Zablokowana'
  }
};

interface HexagonalBadgeProps {
  badge: BadgeItem;
  isUnlocked: boolean;
  progressInfo?: BadgeProgressInfo;
  language: Language;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  showLabel?: boolean;
}

export const HexagonalBadge: React.FC<HexagonalBadgeProps> = ({
  badge,
  isUnlocked,
  progressInfo,
  language,
  size = 'md',
  onClick,
  showLabel = true
}) => {
  const uid = useId().replace(/:/g, '');
  const tier = getBadgeTier(badge.id);
  const loc = getLocalizedBadge(badge, language);
  const IconComponent = badgeIconMap[badge.iconName] || Trophy;

  // Visual Palette Config by Tier
  const tierStyles = {
    gold: {
      borderGrad: ['#FDE68A', '#F59E0B', '#B45309', '#78350F'],
      plateGrad: ['#1c160c', '#0f0c08'],
      glowColor: 'rgba(245, 158, 11, 0.45)',
      iconColor: '#FDE047',
      accentColor: '#F59E0B',
      sparkColor: '#FEF08A'
    },
    silver: {
      borderGrad: ['#FFFFFF', '#CBD5E1', '#94A3B8', '#475569'],
      plateGrad: ['#161922', '#0c0e14'],
      glowColor: 'rgba(226, 232, 240, 0.4)',
      iconColor: '#F8FAFC',
      accentColor: '#CBD5E1',
      sparkColor: '#FFFFFF'
    },
    bronze: {
      borderGrad: ['#FDBA74', '#EA580C', '#9A3412', '#431407'],
      plateGrad: ['#1a0f0a', '#0d0705'],
      glowColor: 'rgba(234, 88, 12, 0.4)',
      iconColor: '#FB923C',
      accentColor: '#EA580C',
      sparkColor: '#FFEDD5'
    },
    'neon-cyan': {
      borderGrad: ['#A5F3FC', '#06B6D4', '#0284C7', '#083344'],
      plateGrad: ['#071822', '#030d12'],
      glowColor: 'rgba(6, 182, 212, 0.5)',
      iconColor: '#22D3EE',
      accentColor: '#06B6D4',
      sparkColor: '#CFFAFE'
    },
    'neon-purple': {
      borderGrad: ['#F5D0FE', '#C084FC', '#9333EA', '#3B0764'],
      plateGrad: ['#180b24', '#0c0512'],
      glowColor: 'rgba(168, 85, 247, 0.5)',
      iconColor: '#D8B4FE',
      accentColor: '#A855F7',
      sparkColor: '#FAE8FF'
    },
    'neon-emerald': {
      borderGrad: ['#A7F3D0', '#34D399', '#059669', '#064E3B'],
      plateGrad: ['#081c13', '#030d09'],
      glowColor: 'rgba(16, 185, 129, 0.5)',
      iconColor: '#34D399',
      accentColor: '#10B981',
      sparkColor: '#D1FAE5'
    }
  };

  const lockedStyles = {
    borderGrad: ['#52525B', '#3F3F46', '#27272A', '#18181B'],
    plateGrad: ['#111218', '#08090d'],
    glowColor: 'rgba(0, 0, 0, 0.4)',
    iconColor: '#52525B',
    accentColor: '#3F3F46',
    sparkColor: '#71717A'
  };

  const style = isUnlocked ? tierStyles[tier] : lockedStyles;

  // Size dimensions
  const dims = {
    sm: { width: 52, height: 60, iconSize: 18, containerClass: 'w-[52px]' },
    md: { width: 76, height: 88, iconSize: 26, containerClass: 'w-[76px] sm:w-[82px]' },
    lg: { width: 120, height: 138, iconSize: 42, containerClass: 'w-[120px]' }
  }[size];

  return (
    <div 
      className={`group flex flex-col items-center select-none ${dims.containerClass} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Hexagon Wrapper with Interactive Scaling and Gaming Aura */}
      <div 
        className="relative flex items-center justify-center transition-all duration-300 ease-out transform group-hover:scale-105 group-active:scale-95"
        style={{ width: dims.width, height: dims.height }}
      >
        {/* Ambient Neon Glow behind Hexagon */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none ${
            isUnlocked 
              ? 'opacity-60 group-hover:opacity-100 blur-md' 
              : 'opacity-0 group-hover:opacity-20 blur-sm'
          }`}
          style={{ background: style.glowColor }}
        />

        {/* Vector SVG Hexagon */}
        <svg
          viewBox="0 0 100 115"
          className="w-full h-full drop-shadow-md overflow-visible"
        >
          <defs>
            {/* Metallic Border Gradient */}
            <linearGradient id={`border-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={style.borderGrad[0]} />
              <stop offset="35%" stopColor={style.borderGrad[1]} />
              <stop offset="70%" stopColor={style.borderGrad[2]} />
              <stop offset="100%" stopColor={style.borderGrad[3]} />
            </linearGradient>

            {/* Inner Plate Gradient */}
            <linearGradient id={`plate-${uid}`} x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor={style.plateGrad[0]} />
              <stop offset="100%" stopColor={style.plateGrad[1]} />
            </linearGradient>

            {/* Cyber Corner Glint */}
            <linearGradient id={`glint-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={style.sparkColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor={style.sparkColor} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 1. Outer Metallic Hexagon Border */}
          <polygon
            points="50,6 93.5,31.5 93.5,83.5 50,109 6.5,83.5 6.5,31.5"
            fill={`url(#border-${uid})`}
            stroke={style.borderGrad[0]}
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* 2. Inner Tactical Plate */}
          <polygon
            points="50,13 87.5,35 87.5,80 50,102 12.5,80 12.5,35"
            fill={`url(#plate-${uid})`}
            stroke={isUnlocked ? style.borderGrad[1] : '#27272A'}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* 3. Subtle Cyber Tech Inset Wire */}
          <polygon
            points="50,17 84,37 84,78 50,98 16,78 16,37"
            fill="none"
            stroke={isUnlocked ? style.borderGrad[0] : '#3F3F46'}
            strokeWidth="0.6"
            strokeOpacity={isUnlocked ? 0.35 : 0.2}
            strokeDasharray={isUnlocked ? '4 2' : 'none'}
          />

          {/* 4. Top & Bottom Precision Vertex Accents */}
          <polygon
            points="50,13 54,16 50,19 46,16"
            fill={isUnlocked ? style.sparkColor : '#52525B'}
            opacity={isUnlocked ? 0.9 : 0.4}
          />
          <polygon
            points="50,102 54,99 50,96 46,99"
            fill={isUnlocked ? style.borderGrad[2] : '#3F3F46'}
            opacity={isUnlocked ? 0.7 : 0.3}
          />
        </svg>

        {/* Center Centered Icon Content */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ paddingBottom: size === 'lg' ? 4 : 2 }}
        >
          {isUnlocked ? (
            <div className="relative flex items-center justify-center">
              <IconComponent 
                style={{ width: dims.iconSize, height: dims.iconSize, color: style.iconColor }}
                className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ) : (
            <div className="relative flex flex-col items-center justify-center">
              <IconComponent 
                style={{ width: dims.iconSize * 0.85, height: dims.iconSize * 0.85, color: '#3F3F46' }}
                className="opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-zinc-900/90 border border-zinc-700/80 shadow-inner">
                  <Lock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-zinc-400" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Unlocked Subtle Corner Star Badge */}
        {isUnlocked && size !== 'sm' && (
          <div 
            className="absolute top-1 end-1 flex h-4 w-4 items-center justify-center rounded-full bg-black/60 border border-amber-500/40 shadow-sm"
            title="مكتسبة"
          >
            <Check className="h-2.5 w-2.5 text-amber-400 font-bold" />
          </div>
        )}
      </div>

      {/* Badge Name & XP / Progress Status Below */}
      {showLabel && size !== 'lg' && (
        <div className="mt-2 text-center w-full px-0.5">
          <h4 
            className={`text-[11px] sm:text-xs font-bold leading-snug line-clamp-2 transition-colors ${
              isUnlocked 
                ? 'text-slate-800 dark:text-zinc-200 group-hover:text-amber-600 dark:group-hover:text-white' 
                : 'text-slate-500 dark:text-zinc-400 group-hover:text-slate-700 dark:group-hover:text-zinc-300'
            }`}
            title={loc.name}
          >
            {loc.name}
          </h4>

          <div className="mt-0.5 flex items-center justify-center gap-1 font-mono text-[10px]">
            {isUnlocked ? (
              <span className="text-amber-600 dark:text-amber-400/90 font-bold tracking-tight">
                +{badge.xpBonus} XP
              </span>
            ) : (
              <span className="text-slate-400 dark:text-zinc-500 font-medium">
                {progressInfo ? `${progressInfo.progressPercent}%` : 'مقفلة'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface BadgeDetailModalProps {
  badge: BadgeItem | null;
  isUnlocked: boolean;
  progressInfo?: BadgeProgressInfo;
  language: Language;
  onClose: () => void;
}

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
  badge,
  isUnlocked,
  progressInfo,
  language,
  onClose
}) => {
  if (!badge) return null;

  const loc = getLocalizedBadge(badge, language);
  const tier = getBadgeTier(badge.id);
  const tierInfo = TIER_LOCALIZATIONS[tier][language] || TIER_LOCALIZATIONS[tier].ar;
  const strings = MODAL_STRINGS[language] || MODAL_STRINGS.ar;

  const tierColors = {
    gold: { text: 'text-amber-500 dark:text-amber-400', border: 'border-amber-500/40', bg: 'bg-amber-500/10' },
    silver: { text: 'text-slate-700 dark:text-slate-200', border: 'border-slate-400/40', bg: 'bg-slate-400/10' },
    bronze: { text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-500/40', bg: 'bg-orange-500/10' },
    'neon-cyan': { text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-500/40', bg: 'bg-cyan-500/10' },
    'neon-purple': { text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500/40', bg: 'bg-purple-500/10' },
    'neon-emerald': { text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-500/10' }
  }[tier];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#0c0e14] p-6 shadow-2xl shadow-slate-900/10 dark:shadow-black/80 flex flex-col items-center text-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-xl text-slate-400 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
          aria-label={strings.close}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Tier Pill */}
        <div className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${tierColors.border} ${tierColors.bg} ${tierColors.text}`}>
          {tierInfo.label} · {tierInfo.sub}
        </div>

        {/* Large Glowing Hexagonal Badge in Center */}
        <div className="mt-5 mb-3 flex items-center justify-center">
          <HexagonalBadge
            badge={badge}
            isUnlocked={isUnlocked}
            language={language}
            size="lg"
            showLabel={false}
          />
        </div>

        {/* Badge Name & Status */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
          {loc.name}
        </h3>

        {/* XP Bonus pill */}
        <div className="mt-2 flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/15 dark:bg-amber-500/10 px-3 py-0.5 rounded-full border border-amber-500/30">
            +{badge.xpBonus} XP
          </span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
            isUnlocked 
              ? 'border-emerald-500/40 bg-emerald-500/15 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
              : 'border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
          }`}>
            {isUnlocked ? strings.statusUnlocked : strings.statusLocked}
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed max-w-sm">
          {loc.description}
        </p>

        {/* Condition Box */}
        <div className="mt-5 w-full rounded-2xl border border-slate-200 dark:border-zinc-800/90 bg-slate-50 dark:bg-zinc-900/60 p-3.5 text-start shadow-sm dark:shadow-none">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-zinc-400 mb-1">
            <Target className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
            <span>{strings.requirement}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-900 dark:text-white font-medium">
            {loc.condition}
          </p>
        </div>

        {/* Real-time Progress Bar */}
        {progressInfo && (
          <div className="mt-3.5 w-full rounded-2xl border border-slate-200 dark:border-zinc-800/90 bg-slate-50 dark:bg-zinc-900/60 p-3.5 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400 mb-1.5 font-mono">
              <span className="font-medium text-slate-700 dark:text-zinc-300">{strings.progressTitle}</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {progressInfo.formattedCurrent} / {progressInfo.formattedTarget} ({progressInfo.progressPercent}%)
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400'
                }`}
                style={{ width: `${progressInfo.progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer border border-slate-200 dark:border-zinc-700 shadow-sm dark:shadow-none"
        >
          {strings.close}
        </button>
      </div>
    </div>
  );
};
