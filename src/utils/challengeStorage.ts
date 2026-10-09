import { 
  ChallengeUserState, 
  ChallengeTask, 
  BadgeItem, 
  XpHistoryEntry 
} from '../data/challengesDataTypes';
import { 
  dailyChallengePool, 
  weeklyChallengePool, 
  allBadgesList 
} from '../data/challengesData';

const CHALLENGES_STORAGE_KEY = 'rikouzone_challenges_user_state';

// Helpers for Date / Week formatting
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getCurrentWeekKey(): string {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const pastDaysOfYear = (now.getTime() - startOfYear.getTime()) / 86400000;
  const weekNum = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${weekNum}`;
}

export function getDaysRemainingInWeek(): number {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sunday
  // If we consider week ending Sunday night:
  return dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
}

// Initial default state
export function getInitialUserState(): ChallengeUserState {
  try {
    const raw = localStorage.getItem(CHALLENGES_STORAGE_KEY);
    if (raw) {
      const parsed: ChallengeUserState = JSON.parse(raw);
      // Validate structure
      return {
        totalXp: Number(parsed.totalXp) || 0,
        completedChallengeIds: Array.isArray(parsed.completedChallengeIds) ? parsed.completedChallengeIds : [],
        completedDailyDates: parsed.completedDailyDates && typeof parsed.completedDailyDates === 'object' ? parsed.completedDailyDates : {},
        completedWeeklyKeys: parsed.completedWeeklyKeys && typeof parsed.completedWeeklyKeys === 'object' ? parsed.completedWeeklyKeys : {},
        streakCount: Number(parsed.streakCount) || 0,
        lastActiveDate: parsed.lastActiveDate || '',
        unlockedBadgeIds: Array.isArray(parsed.unlockedBadgeIds) ? parsed.unlockedBadgeIds : [],
        history: Array.isArray(parsed.history) ? parsed.history : []
      };
    }
  } catch (e) {
    console.warn('Failed to parse challenge state from localStorage:', e);
  }

  return {
    totalXp: 0,
    completedChallengeIds: [],
    completedDailyDates: {},
    completedWeeklyKeys: {},
    streakCount: 0,
    lastActiveDate: '',
    unlockedBadgeIds: [],
    history: []
  };
}

export function saveUserState(state: ChallengeUserState): void {
  try {
    localStorage.setItem(CHALLENGES_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save challenge state to localStorage:', e);
  }
}

// Check and update streak when user completes a qualifying learning activity today
export function calculateUpdatedStreak(
  currentStreak: number, 
  lastActiveDate: string, 
  todayStr: string
): { newStreak: number; streakIncremented: boolean } {
  if (!lastActiveDate) {
    return { newStreak: 1, streakIncremented: true };
  }

  if (lastActiveDate === todayStr) {
    // Already counted today
    return { newStreak: currentStreak, streakIncremented: false };
  }

  const lastDate = new Date(lastActiveDate);
  const todayDate = new Date(todayStr);
  const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Consecutive day
    return { newStreak: currentStreak + 1, streakIncremented: true };
  } else {
    // Broken streak, reset to 1
    return { newStreak: 1, streakIncremented: true };
  }
}

// Check newly eligible badges
export function checkBadgesEligibility(state: ChallengeUserState): { newlyUnlockedBadges: BadgeItem[]; bonusXpTotal: number } {
  const newlyUnlocked: BadgeItem[] = [];
  let bonusXp = 0;

  for (const badge of allBadgesList) {
    if (state.unlockedBadgeIds.includes(badge.id)) continue;

    let eligible = false;
    if (badge.id === 'first-challenge-done') {
      eligible = state.completedChallengeIds.length >= 1;
    } else if (badge.id === 'xp-century-100') {
      eligible = state.totalXp >= 100;
    } else if (badge.id === 'challenges-five-completed') {
      eligible = state.completedChallengeIds.length >= 5;
    } else if (badge.id === 'streak-7-days') {
      eligible = state.streakCount >= 7;
    } else if (badge.id === 'first-quiz-mastered') {
      eligible = state.history.some(h => h.type === 'quiz');
    } else if (badge.id === 'first-practical-exercise') {
      eligible = state.history.some(h => h.type === 'exercise');
    }

    if (eligible) {
      newlyUnlocked.push(badge);
      bonusXp += badge.xpBonus;
    }
  }

  return { newlyUnlockedBadges: newlyUnlocked, bonusXpTotal: bonusXp };
}

// Next level thresholds: Level 1: 0, Level 2: 100, Level 3: 250, Level 4: 500, Level 5: 850, Level 6: 1300...
export function calculateLevelAndProgress(totalXp: number): {
  currentLevel: number;
  levelTitle: string;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
} {
  const thresholds = [
    { level: 1, title: 'مبتدئ رقمي (Beginner)', xp: 0 },
    { level: 2, title: 'مستكشف المهارات (Explorer)', xp: 100 },
    { level: 3, title: 'صانع المحتوى الواعد (Creator)', xp: 250 },
    { level: 4, title: 'ممارس محترف (Practitioner)', xp: 500 },
    { level: 5, title: 'خبير التجارة الرقمية (Pro Specialist)', xp: 850 },
    { level: 6, title: 'رائد أعمال RikouZone (Master)', xp: 1300 }
  ];

  let current = thresholds[0];
  let next = thresholds[1];

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (totalXp >= thresholds[i].xp) {
      current = thresholds[i];
      next = thresholds[i + 1] || { level: current.level + 1, title: 'أسطورة RikouZone (Legend)', xp: current.xp + 600 };
      break;
    }
  }

  const range = next.xp - current.xp;
  const earnedInRange = totalXp - current.xp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((earnedInRange / range) * 100)));

  return {
    currentLevel: current.level,
    levelTitle: current.title,
    currentLevelXp: current.xp,
    nextLevelXp: next.xp,
    progressPercent
  };
}
