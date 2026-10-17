import { BadgeItem, ChallengeUserState } from '../data/challengesDataTypes';

export interface GlobalLearningStats {
  lessonsCompleted: number;
  pathsStarted: number;
  pathsCompleted: number;
  perfectQuizzes: number;
  streakCount: number;
  challengesCompleted: number;
  totalXp: number;
  unlockedBadgesCount: number;
}

export interface BadgeProgressInfo {
  current: number;
  target: number;
  progressPercent: number;
  isUnlocked: boolean;
  formattedCurrent: string;
  formattedTarget: string;
}

/**
 * Scan localStorage for all unique completed lessons across all track curriculums
 */
export function getGlobalCompletedLessonsCount(): number {
  if (typeof window === 'undefined') return 0;
  const uniqueLessons = new Set<string>();

  const listKeys = [
    'copywriting_completed_lessons',
    'freelance_writing_completed_lessons',
    'video_editing_completed_lessons',
    'ds_completed_lessons',
    'rz_ugc_completed_lessons',
    'yt_read_lessons',
    'ig_read_lessons',
    'blogging_read_lessons',
    'seo_completed_lessons',
    'faceless_completed_lessons_v1',
    'rz_completed_lessons_all'
  ];

  for (const key of listKeys) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
          arr.forEach((id) => uniqueLessons.add(`${key}_${id}`));
        }
      }
    } catch {
      // ignore parsing error
    }
  }

  const mapKeys = [
    'rz_webdev_completed',
    'rz_mobiledev_completed',
    'smm_completed_lessons'
  ];

  for (const key of mapKeys) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const map = JSON.parse(raw);
        if (map && typeof map === 'object') {
          Object.keys(map).forEach((id) => {
            if (map[id]) uniqueLessons.add(`${key}_${id}`);
          });
        }
      }
    } catch {
      // ignore
    }
  }

  // Also include any lessons recorded in challenge history
  try {
    const rawState = localStorage.getItem('rikouzone_challenges_user_state');
    if (rawState) {
      const parsed = JSON.parse(rawState);
      if (Array.isArray(parsed.history)) {
        parsed.history.forEach((h: any) => {
          if (h.type === 'lesson') {
            uniqueLessons.add(`history_${h.id || h.title}`);
          }
        });
      }
    }
  } catch {
    // ignore
  }

  return uniqueLessons.size;
}

/**
 * Scan tracks started and completed across RikouZone
 */
export function getGlobalPathsProgress(): { started: number; completed: number } {
  if (typeof window === 'undefined') return { started: 0, completed: 0 };
  const started = new Set<string>();
  const completed = new Set<string>();

  // Check started tracks
  try {
    const raw = localStorage.getItem('rz_started_tracks');
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) arr.forEach((id) => started.add(id));
    }
  } catch {}

  // Check saved tracks
  try {
    const rawSaved = localStorage.getItem('rikouzone_saved_items');
    if (rawSaved) {
      const arr = JSON.parse(rawSaved);
      if (Array.isArray(arr)) arr.forEach((id) => started.add(id));
    }
  } catch {}

  // Check completed tracks
  try {
    const raw = localStorage.getItem('rz_completed_tracks');
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) arr.forEach((id) => completed.add(id));
    }
  } catch {}

  // Tracks with active progress
  const tracksWithLessons = [
    'rz_webdev_completed',
    'rz_mobiledev_completed',
    'copywriting_completed_lessons',
    'freelance_writing_completed_lessons',
    'video_editing_completed_lessons',
    'ds_completed_lessons',
    'rz_ugc_completed_lessons',
    'yt_read_lessons',
    'ig_read_lessons',
    'blogging_read_lessons',
    'seo_completed_lessons',
    'smm_completed_lessons',
    'faceless_completed_lessons_v1'
  ];

  for (const key of tracksWithLessons) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const val = JSON.parse(raw);
        const count = Array.isArray(val) ? val.length : Object.values(val || {}).filter(Boolean).length;
        if (count > 0) {
          started.add(key);
        }
        // If user completed significant lessons in a track (e.g. 10+), count as completed
        if (count >= 10) {
          completed.add(key);
        }
      }
    } catch {}
  }

  return {
    started: started.size,
    completed: completed.size
  };
}

/**
 * Scan perfect quizzes achieved
 */
export function getGlobalPerfectQuizCount(): number {
  if (typeof window === 'undefined') return 0;
  let count = 0;

  try {
    const raw = localStorage.getItem('rz_perfect_quizzes');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) count = parsed.length;
      else if (typeof parsed === 'number') count = parsed;
    }
  } catch {}

  try {
    const raw = localStorage.getItem('rikouzone_challenges_user_state');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.history)) {
        const quizCount = parsed.history.filter((h: any) => h.type === 'quiz').length;
        if (quizCount > count) count = quizCount;
      }
    }
  } catch {}

  return count;
}

/**
 * Assemble comprehensive global learning statistics
 */
export function getGlobalLearningStats(userState?: ChallengeUserState | null): GlobalLearningStats {
  const paths = getGlobalPathsProgress();
  const lessonsCompleted = getGlobalCompletedLessonsCount();
  const perfectQuizzes = getGlobalPerfectQuizCount();

  const totalXp = userState?.totalXp || 0;
  const streakCount = userState?.streakCount || 0;
  const challengesCompleted = userState?.completedChallengeIds?.length || 0;
  const unlockedBadgesCount = userState?.unlockedBadgeIds?.length || 0;

  return {
    lessonsCompleted,
    pathsStarted: paths.started,
    pathsCompleted: paths.completed,
    perfectQuizzes,
    streakCount,
    challengesCompleted,
    totalXp,
    unlockedBadgesCount
  };
}

/**
 * Calculate the exact progress toward any badge (current, target, percentage)
 */
export function calculateBadgeProgress(
  badge: BadgeItem,
  userState?: ChallengeUserState | null,
  providedStats?: GlobalLearningStats
): BadgeProgressInfo {
  const stats = providedStats || getGlobalLearningStats(userState);
  const isUnlocked = userState?.unlockedBadgeIds?.includes(badge.id) || false;

  let current = 0;
  const target = badge.targetValue || 1;

  switch (badge.id) {
    // 1. Lessons
    case 'lessons-1-done':
    case 'lessons-5-done':
    case 'lessons-20-done':
    case 'lessons-50-done':
    case 'lessons-100-done':
      current = stats.lessonsCompleted;
      break;

    // 2. Streaks
    case 'streak-2-days':
    case 'streak-7-days':
    case 'streak-14-days':
    case 'streak-30-days':
    case 'streak-100-days':
      current = stats.streakCount;
      break;

    // 3. Challenges
    case 'first-challenge-done':
    case 'challenges-five-completed':
    case 'challenges-10-completed':
    case 'challenges-25-completed':
    case 'challenges-50-completed':
      current = stats.challengesCompleted;
      break;

    // 4. XP
    case 'xp-century-100':
    case 'xp-master-500':
    case 'xp-pro-1000':
    case 'xp-expert-2500':
    case 'xp-legend-5000':
      current = stats.totalXp;
      break;

    // 5. Paths
    case 'paths-1-started':
      current = stats.pathsStarted;
      break;
    case 'paths-1-completed':
    case 'paths-3-completed':
    case 'paths-5-completed':
    case 'paths-10-completed':
      current = stats.pathsCompleted;
      break;

    // 6. Quizzes & Exercises
    case 'first-quiz-mastered':
    case 'quiz-perfect-score':
      current = stats.perfectQuizzes > 0 ? stats.perfectQuizzes : (userState?.history?.some(h => h.type === 'quiz') ? 1 : 0);
      break;
    case 'first-practical-exercise':
      current = userState?.history?.some(h => h.type === 'exercise') ? 1 : 0;
      break;
    case 'weekly-champion':
      current = userState?.history?.some(h => h.type === 'weekly') ? 1 : 0;
      break;

    // 7. Badge Collector
    case 'badges-collector-10':
      current = stats.unlockedBadgesCount;
      break;

    default:
      current = isUnlocked ? target : 0;
      break;
  }

  const cappedCurrent = Math.min(current, target);
  const progressPercent = isUnlocked ? 100 : Math.min(100, Math.round((cappedCurrent / target) * 100));

  return {
    current,
    target,
    progressPercent,
    isUnlocked,
    formattedCurrent: current.toLocaleString(),
    formattedTarget: target.toLocaleString()
  };
}

/**
 * Record a lesson completion globally
 */
export function markGlobalLessonCompleted(lessonId: string, trackId?: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem('rz_completed_lessons_all');
    const list: string[] = raw ? JSON.parse(raw) : [];
    const uniqueKey = trackId ? `${trackId}_${lessonId}` : lessonId;
    if (!list.includes(uniqueKey)) {
      list.push(uniqueKey);
      localStorage.setItem('rz_completed_lessons_all', JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('rz_lesson_completed', { detail: { lessonId, trackId } }));
    }
  } catch (e) {
    console.warn('Failed to mark lesson completed globally:', e);
  }
}

/**
 * Record a path started globally
 */
export function markGlobalPathStarted(pathId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem('rz_started_tracks');
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(pathId)) {
      list.push(pathId);
      localStorage.setItem('rz_started_tracks', JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('rz_track_started', { detail: { pathId } }));
    }
  } catch (e) {
    console.warn('Failed to record track start:', e);
  }
}

/**
 * Record a path completed globally
 */
export function markGlobalPathCompleted(pathId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem('rz_completed_tracks');
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(pathId)) {
      list.push(pathId);
      localStorage.setItem('rz_completed_tracks', JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('rz_track_completed', { detail: { pathId } }));
    }
  } catch (e) {
    console.warn('Failed to record track completion:', e);
  }
}

/**
 * Record a perfect quiz score globally
 */
export function markGlobalPerfectQuiz(quizId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem('rz_perfect_quizzes');
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(quizId)) {
      list.push(quizId);
      localStorage.setItem('rz_perfect_quizzes', JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('rz_perfect_quiz', { detail: { quizId } }));
    }
  } catch (e) {
    console.warn('Failed to record perfect quiz:', e);
  }
}
