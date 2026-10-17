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
import { getGlobalLearningStats } from './badgeProgressTracker';

export const CHALLENGES_STORAGE_KEY = 'rikouzone_challenges_user_state';

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
  // If we consider week ending Sunday midnight:
  return dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
}

export function getHoursRemainingToday(): number {
  const now = new Date();
  const hoursLeft = 23 - now.getHours();
  return Math.max(0, hoursLeft);
}

// Compute calendar day difference safely across time zones
export function getDayDifference(dateStr1: string, dateStr2: string): number {
  if (!dateStr1 || !dateStr2) return 999;
  const [y1, m1, d1] = dateStr1.split('-').map(Number);
  const [y2, m2, d2] = dateStr2.split('-').map(Number);
  const d1Utc = Date.UTC(y1, m1 - 1, d1);
  const d2Utc = Date.UTC(y2, m2 - 1, d2);
  return Math.round((d2Utc - d1Utc) / (1000 * 60 * 60 * 24));
}

// Deterministic integer hash for date strings (e.g. "2026-10-10" -> hash)
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Deterministic rotation of Daily Challenges based on date
export function getDailyChallengesForDate(dateStr: string): ChallengeTask[] {
  const seed = hashString(dateStr);

  const quizzes = dailyChallengePool.filter(c => c.type === 'quiz');
  const exercises = dailyChallengePool.filter(c => c.type === 'exercise');
  const lessons = dailyChallengePool.filter(c => c.type === 'lesson');
  const skills = dailyChallengePool.filter(c => c.type === 'skill');

  const selected: ChallengeTask[] = [];

  if (quizzes.length > 0) {
    selected.push(quizzes[seed % quizzes.length]);
  }
  if (exercises.length > 0) {
    selected.push(exercises[(seed + 1) % exercises.length]);
  }
  if (lessons.length > 0) {
    selected.push(lessons[(seed + 2) % lessons.length]);
  }
  if (skills.length > 0) {
    selected.push(skills[(seed + 3) % skills.length]);
  }

  return selected;
}

// Deterministic selection of Weekly Challenges based on week key
export function getWeeklyChallengesForWeek(weekKey: string): ChallengeTask[] {
  const seed = hashString(weekKey);
  const pool = [...weeklyChallengePool];
  if (pool.length <= 3) return pool;

  // Pick 3 non-repeating items from weekly pool
  const results: ChallengeTask[] = [];
  const count = 3;
  for (let i = 0; i < count; i++) {
    const idx = (seed + i) % pool.length;
    results.push(pool[idx]);
  }
  return results;
}

// Initial default state
export function getInitialUserState(): ChallengeUserState {
  try {
    const raw = localStorage.getItem(CHALLENGES_STORAGE_KEY);
    if (raw) {
      const parsed: ChallengeUserState = JSON.parse(raw);
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
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('rz_xp_updated', { detail: { totalXp: state.totalXp } }));
    }
  } catch (e) {
    console.warn('Failed to save challenge state to localStorage:', e);
  }
}

// Check and update streak when user completes an eligible learning challenge today
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

  const diffDays = getDayDifference(lastActiveDate, todayStr);

  if (diffDays === 1) {
    // Exactly consecutive day
    return { newStreak: currentStreak + 1, streakIncremented: true };
  } else if (diffDays === 0) {
    return { newStreak: currentStreak, streakIncremented: false };
  } else {
    // Missed one or more days, streak resets to 1
    return { newStreak: 1, streakIncremented: true };
  }
}

// Check newly eligible badges
// Check newly eligible badges across all 30 badges
export function checkBadgesEligibility(state: ChallengeUserState): { newlyUnlockedBadges: BadgeItem[]; bonusXpTotal: number } {
  const newlyUnlocked: BadgeItem[] = [];
  let bonusXp = 0;
  const stats = getGlobalLearningStats(state);

  for (const badge of allBadgesList) {
    if (state.unlockedBadgeIds.includes(badge.id)) continue;

    let eligible = false;

    switch (badge.id) {
      // 1. Existing Badges
      case 'first-challenge-done':
        eligible = state.completedChallengeIds.length >= 1;
        break;
      case 'xp-century-100':
        eligible = state.totalXp >= 100;
        break;
      case 'first-quiz-mastered':
        eligible = state.history.some(h => h.type === 'quiz') || stats.perfectQuizzes > 0;
        break;
      case 'first-practical-exercise':
        eligible = state.history.some(h => h.type === 'exercise');
        break;
      case 'challenges-five-completed':
        eligible = state.completedChallengeIds.length >= 5;
        break;
      case 'streak-7-days':
        eligible = state.streakCount >= 7;
        break;
      case 'weekly-champion':
        eligible = state.history.some(h => h.type === 'weekly') || 
          Object.values(state.completedWeeklyKeys).some(arr => arr.length > 0);
        break;
      case 'xp-master-500':
        eligible = state.totalXp >= 500;
        break;

      // 2. Learning Badges (Lessons)
      case 'lessons-1-done':
        eligible = stats.lessonsCompleted >= 1;
        break;
      case 'lessons-5-done':
        eligible = stats.lessonsCompleted >= 5;
        break;
      case 'lessons-20-done':
        eligible = stats.lessonsCompleted >= 20;
        break;
      case 'lessons-50-done':
        eligible = stats.lessonsCompleted >= 50;
        break;
      case 'lessons-100-done':
        eligible = stats.lessonsCompleted >= 100;
        break;

      // 3. Streak Badges
      case 'streak-2-days':
        eligible = state.streakCount >= 2;
        break;
      case 'streak-14-days':
        eligible = state.streakCount >= 14;
        break;
      case 'streak-30-days':
        eligible = state.streakCount >= 30;
        break;
      case 'streak-100-days':
        eligible = state.streakCount >= 100;
        break;

      // 4. Challenges Badges
      case 'challenges-10-completed':
        eligible = state.completedChallengeIds.length >= 10;
        break;
      case 'challenges-25-completed':
        eligible = state.completedChallengeIds.length >= 25;
        break;
      case 'challenges-50-completed':
        eligible = state.completedChallengeIds.length >= 50;
        break;

      // 5. XP Badges
      case 'xp-pro-1000':
        eligible = state.totalXp >= 1000;
        break;
      case 'xp-expert-2500':
        eligible = state.totalXp >= 2500;
        break;
      case 'xp-legend-5000':
        eligible = state.totalXp >= 5000;
        break;

      // 6. Paths Badges
      case 'paths-1-started':
        eligible = stats.pathsStarted >= 1;
        break;
      case 'paths-1-completed':
        eligible = stats.pathsCompleted >= 1;
        break;
      case 'paths-3-completed':
        eligible = stats.pathsCompleted >= 3;
        break;
      case 'paths-5-completed':
        eligible = stats.pathsCompleted >= 5;
        break;
      case 'paths-10-completed':
        eligible = stats.pathsCompleted >= 10;
        break;

      // 7. Special Badges
      case 'quiz-perfect-score':
        eligible = stats.perfectQuizzes >= 1;
        break;
      case 'badges-collector-10':
        eligible = state.unlockedBadgeIds.length >= 10;
        break;
    }

    if (eligible) {
      newlyUnlocked.push(badge);
      bonusXp += badge.xpBonus;
    }
  }

  return { newlyUnlockedBadges: newlyUnlocked, bonusXpTotal: bonusXp };
}

// Progression levels
export function calculateLevelAndProgress(totalXp: number): {
  currentLevel: number;
  levelTitle: string;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
  remainingXp: number;
} {
  const thresholds = [
    { level: 1, title: 'مبتدئ رقمي (Beginner)', xp: 0 },
    { level: 2, title: 'مستكشف المهارات (Explorer)', xp: 100 },
    { level: 3, title: 'صانع المحتوى الواعد (Creator)', xp: 250 },
    { level: 4, title: 'ممارس محترف (Practitioner)', xp: 500 },
    { level: 5, title: 'خبير التجارة الرقمية (Pro Specialist)', xp: 850 },
    { level: 6, title: 'رائد أعمال RikouZone (Master)', xp: 1300 },
    { level: 7, title: 'أسطورة RikouZone (Legend)', xp: 2000 }
  ];

  let current = thresholds[0];
  let next = thresholds[1];

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (totalXp >= thresholds[i].xp) {
      current = thresholds[i];
      next = thresholds[i + 1] || { level: current.level + 1, title: 'أسطورة RikouZone (Legend)', xp: current.xp + 800 };
      break;
    }
  }

  // Calculate real progress towards next level: e.g. 275 XP / 500 XP = 55%
  const progressPercent = next.xp > 0 
    ? Math.min(100, Math.max(0, Math.round((totalXp / next.xp) * 100))) 
    : 100;
  const remainingXp = Math.max(0, next.xp - totalXp);

  return {
    currentLevel: current.level,
    levelTitle: current.title,
    currentLevelXp: current.xp,
    nextLevelXp: next.xp,
    progressPercent,
    remainingXp
  };
}
