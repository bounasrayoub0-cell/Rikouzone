/**
 * RikouZone Lesson Progress & XP Anti-Duplication Storage
 * 
 * Safely manages lesson progress, interactive exercise submissions,
 * quiz scores, and practical assignment milestones in localStorage.
 * Ensures XP is awarded exactly once per activity.
 */

import { 
  getInitialUserState, 
  saveUserState, 
  checkBadgesEligibility,
  calculateUpdatedStreak,
  getTodayDateString
} from './challengeStorage';

export const COMPLETED_LESSONS_KEY = 'rz_completed_lessons_all';
export const PASSED_QUIZZES_KEY = 'rz_passed_quizzes_set';
export const COMPLETED_EXERCISES_KEY = 'rz_completed_exercises_set';
export const COMPLETED_ASSIGNMENTS_KEY = 'rz_completed_assignments_set';

function getStoredSet(key: string): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function saveStoredSet(key: string, set: Set<string>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(Array.from(set)));
  } catch (e) {
    console.warn(`Failed to save set for ${key}:`, e);
  }
}

/**
 * Check if a lesson is completed
 */
export function isLessonCompleted(trackId: string, lessonId: string): boolean {
  const set = getStoredSet(COMPLETED_LESSONS_KEY);
  return set.has(`${trackId}_${lessonId}`);
}

/**
 * Check if a quiz is already passed
 */
export function isLessonQuizPassed(trackId: string, lessonId: string): boolean {
  const set = getStoredSet(PASSED_QUIZZES_KEY);
  return set.has(`${trackId}_${lessonId}`);
}

/**
 * Check if an interactive exercise is already completed
 */
export function isLessonExerciseCompleted(trackId: string, lessonId: string): boolean {
  const set = getStoredSet(COMPLETED_EXERCISES_KEY);
  return set.has(`${trackId}_${lessonId}`);
}

/**
 * Check if a practical assignment is already marked done
 */
export function isLessonAssignmentDone(trackId: string, lessonId: string): boolean {
  const set = getStoredSet(COMPLETED_ASSIGNMENTS_KEY);
  return set.has(`${trackId}_${lessonId}`);
}

/**
 * Safe XP award helper that records the activity and grants XP only on the first attempt
 */
export function recordLessonCompletion(
  trackId: string, 
  lessonId: string, 
  lessonTitle: string,
  xpAmount: number = 30
): { success: boolean; xpAwarded: number; newTotalXp: number; alreadyCompleted: boolean } {
  const set = getStoredSet(COMPLETED_LESSONS_KEY);
  const compositeKey = `${trackId}_${lessonId}`;

  if (set.has(compositeKey)) {
    // Already recorded - do NOT award duplicate XP
    const state = getInitialUserState();
    return {
      success: true,
      xpAwarded: 0,
      newTotalXp: state.totalXp,
      alreadyCompleted: true
    };
  }

  // Mark completed
  set.add(compositeKey);
  saveStoredSet(COMPLETED_LESSONS_KEY, set);

  // Update Challenge & XP state
  const state = getInitialUserState();
  const todayStr = getTodayDateString();
  const streakUpdate = calculateUpdatedStreak(state.streakCount, state.lastActiveDate, todayStr);

  state.totalXp += xpAmount;
  state.streakCount = streakUpdate.newStreak;
  state.lastActiveDate = todayStr;

  state.history.unshift({
    id: `lesson_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: `إكمال درس: ${lessonTitle}`,
    type: 'lesson',
    xp: xpAmount,
    date: todayStr
  });

  // Check if badges were unlocked (e.g. 1st lesson, 5 lessons, etc.)
  const badgeCheck = checkBadgesEligibility(state);
  if (badgeCheck.newlyUnlockedBadges.length > 0) {
    state.unlockedBadgeIds.push(...badgeCheck.newlyUnlockedBadges.map(b => b.id));
    state.totalXp += badgeCheck.bonusXpTotal;
  }

  saveUserState(state);

  return {
    success: true,
    xpAwarded: xpAmount,
    newTotalXp: state.totalXp,
    alreadyCompleted: false
  };
}

/**
 * Record a passed quiz and award XP once
 */
export function recordLessonQuizPass(
  trackId: string,
  lessonId: string,
  lessonTitle: string,
  xpAmount: number = 25
): { success: boolean; xpAwarded: number; newTotalXp: number; alreadyPassed: boolean } {
  const set = getStoredSet(PASSED_QUIZZES_KEY);
  const compositeKey = `${trackId}_${lessonId}`;

  if (set.has(compositeKey)) {
    const state = getInitialUserState();
    return { success: true, xpAwarded: 0, newTotalXp: state.totalXp, alreadyPassed: true };
  }

  set.add(compositeKey);
  saveStoredSet(PASSED_QUIZZES_KEY, set);

  const state = getInitialUserState();
  state.totalXp += xpAmount;
  state.history.unshift({
    id: `quiz_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: `اجتياز اختبار درس: ${lessonTitle}`,
    type: 'quiz',
    xp: xpAmount,
    date: getTodayDateString()
  });

  const badgeCheck = checkBadgesEligibility(state);
  if (badgeCheck.newlyUnlockedBadges.length > 0) {
    state.unlockedBadgeIds.push(...badgeCheck.newlyUnlockedBadges.map(b => b.id));
    state.totalXp += badgeCheck.bonusXpTotal;
  }

  saveUserState(state);

  return { success: true, xpAwarded: xpAmount, newTotalXp: state.totalXp, alreadyPassed: false };
}

/**
 * Record interactive exercise completion
 */
export function recordLessonExerciseCompletion(
  trackId: string,
  lessonId: string,
  exerciseTitle: string,
  xpAmount: number = 20
): { success: boolean; xpAwarded: number; newTotalXp: number; alreadyCompleted: boolean } {
  const set = getStoredSet(COMPLETED_EXERCISES_KEY);
  const compositeKey = `${trackId}_${lessonId}`;

  if (set.has(compositeKey)) {
    const state = getInitialUserState();
    return { success: true, xpAwarded: 0, newTotalXp: state.totalXp, alreadyCompleted: true };
  }

  set.add(compositeKey);
  saveStoredSet(COMPLETED_EXERCISES_KEY, set);

  const state = getInitialUserState();
  state.totalXp += xpAmount;
  state.history.unshift({
    id: `exercise_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: `إنجاز تمرين تفاعلي: ${exerciseTitle}`,
    type: 'exercise',
    xp: xpAmount,
    date: getTodayDateString()
  });

  const badgeCheck = checkBadgesEligibility(state);
  if (badgeCheck.newlyUnlockedBadges.length > 0) {
    state.unlockedBadgeIds.push(...badgeCheck.newlyUnlockedBadges.map(b => b.id));
    state.totalXp += badgeCheck.bonusXpTotal;
  }

  saveUserState(state);

  return { success: true, xpAwarded: xpAmount, newTotalXp: state.totalXp, alreadyCompleted: false };
}

/**
 * Record practical assignment completion
 */
export function recordLessonAssignmentCompletion(
  trackId: string,
  lessonId: string,
  assignmentTitle: string,
  xpAmount: number = 20
): { success: boolean; xpAwarded: number; newTotalXp: number; alreadyCompleted: boolean } {
  const set = getStoredSet(COMPLETED_ASSIGNMENTS_KEY);
  const compositeKey = `${trackId}_${lessonId}`;

  if (set.has(compositeKey)) {
    const state = getInitialUserState();
    return { success: true, xpAwarded: 0, newTotalXp: state.totalXp, alreadyCompleted: true };
  }

  set.add(compositeKey);
  saveStoredSet(COMPLETED_ASSIGNMENTS_KEY, set);

  const state = getInitialUserState();
  state.totalXp += xpAmount;
  state.history.unshift({
    id: `assign_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: `تطبيق المهمة العملية: ${assignmentTitle}`,
    type: 'skill',
    xp: xpAmount,
    date: getTodayDateString()
  });

  const badgeCheck = checkBadgesEligibility(state);
  if (badgeCheck.newlyUnlockedBadges.length > 0) {
    state.unlockedBadgeIds.push(...badgeCheck.newlyUnlockedBadges.map(b => b.id));
    state.totalXp += badgeCheck.bonusXpTotal;
  }

  saveUserState(state);

  return { success: true, xpAwarded: xpAmount, newTotalXp: state.totalXp, alreadyCompleted: false };
}
