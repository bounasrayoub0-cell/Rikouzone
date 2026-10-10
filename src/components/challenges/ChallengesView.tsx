import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Flame, 
  Award, 
  Target, 
  CheckCircle2, 
  Circle, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  History, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Trophy,
  ExternalLink,
  BookOpen,
  Check,
  ChevronDown,
  Layers
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  ChallengeTask, 
  BadgeItem, 
  ChallengeUserState, 
  XpHistoryEntry 
} from '../../data/challengesDataTypes';
import { 
  dailyChallengePool,
  weeklyChallengePool,
  allBadgesList 
} from '../../data/challengesData';
import { 
  getInitialUserState, 
  saveUserState, 
  getTodayDateString, 
  getCurrentWeekKey, 
  getDaysRemainingInWeek, 
  getHoursRemainingToday,
  getDailyChallengesForDate,
  getWeeklyChallengesForWeek,
  calculateUpdatedStreak, 
  checkBadgesEligibility, 
  calculateLevelAndProgress 
} from '../../utils/challengeStorage';
import { ChallengeQuizModal } from './ChallengeQuizModal';
import { ChallengeExerciseModal } from './ChallengeExerciseModal';

interface ChallengesViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  const { isRTL } = useLanguage();
  const ArrowBackIcon = isRTL ? ArrowRight : ArrowLeft;

  const todayStr = getTodayDateString();
  const currentWeekKey = getCurrentWeekKey();
  const daysLeftInWeek = getDaysRemainingInWeek();
  const hoursLeftToday = getHoursRemainingToday();

  // Deterministic challenge generation for today and this week
  const todayChallenges = getDailyChallengesForDate(todayStr);
  const weekChallenges = getWeeklyChallengesForWeek(currentWeekKey);

  // All quizzes & all exercises pools
  const allQuizzes = [...dailyChallengePool, ...weeklyChallengePool].filter(c => c.type === 'quiz');
  const allExercises = [...dailyChallengePool, ...weeklyChallengePool].filter(c => c.type === 'exercise');

  // User State
  const [userState, setUserState] = useState<ChallengeUserState>(() => getInitialUserState());

  // Active modals
  const [activeQuizChallenge, setActiveQuizChallenge] = useState<ChallengeTask | null>(null);
  const [activeExerciseChallenge, setActiveExerciseChallenge] = useState<ChallengeTask | null>(null);
  const [activeLessonChallenge, setActiveLessonChallenge] = useState<ChallengeTask | null>(null);
  const [lessonConfirmedCheck, setLessonConfirmedCheck] = useState<boolean>(false);

  // 5 Dedicated Tabs requested by user:
  // 'daily' | 'weekly' | 'quizzes' | 'exercises' | 'badges'
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'quizzes' | 'exercises' | 'badges'>('daily');

  // Show recent history accordion
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // XP Award notification toast
  const [xpToast, setXpToast] = useState<{ message: string; xp: number } | null>(null);

  // Persist state updates
  useEffect(() => {
    saveUserState(userState);
  }, [userState]);

  // Handle Challenge Completion with anti-duplicate guard
  const handleCompleteChallenge = (challengeId: string, earnedXp: number, challengeType: ChallengeTask['type'] | 'weekly') => {
    const isDaily = dailyChallengePool.some(d => d.id === challengeId);
    const isWeekly = weeklyChallengePool.some(w => w.id === challengeId);

    const todayDoneList = userState.completedDailyDates[todayStr] || [];
    const thisWeekDoneList = userState.completedWeeklyKeys[currentWeekKey] || [];

    // Strict duplicate check: prevent re-awarding same challenge in the same timeframe
    if (isDaily && todayDoneList.includes(challengeId)) {
      return;
    }
    if (isWeekly && thisWeekDoneList.includes(challengeId)) {
      return;
    }

    // Update streak (only once per calendar day upon completing eligible activity)
    const { newStreak } = calculateUpdatedStreak(userState.streakCount, userState.lastActiveDate, todayStr);

    // Build new daily/weekly records
    const updatedDailyDates = {
      ...userState.completedDailyDates,
      [todayStr]: isDaily ? [...todayDoneList, challengeId] : todayDoneList
    };

    const updatedWeeklyKeys = {
      ...userState.completedWeeklyKeys,
      [currentWeekKey]: isWeekly ? [...thisWeekDoneList, challengeId] : thisWeekDoneList
    };

    const targetChallenge = [...dailyChallengePool, ...weeklyChallengePool].find(c => c.id === challengeId);
    const challengeTitle = targetChallenge ? targetChallenge.title : 'تحدي تعليمي';

    const now = new Date();
    const timeFormatted = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newHistoryEntry: XpHistoryEntry = {
      id: `${Date.now()}`,
      title: challengeTitle,
      xp: earnedXp,
      date: todayStr,
      time: timeFormatted,
      type: isWeekly ? 'weekly' : challengeType
    };

    const newCompletedIds = userState.completedChallengeIds.includes(challengeId)
      ? userState.completedChallengeIds
      : [...userState.completedChallengeIds, challengeId];

    // Intermediate state to evaluate newly unlocked badges
    const tempState: ChallengeUserState = {
      ...userState,
      totalXp: userState.totalXp + earnedXp,
      completedChallengeIds: newCompletedIds,
      completedDailyDates: updatedDailyDates,
      completedWeeklyKeys: updatedWeeklyKeys,
      streakCount: newStreak,
      lastActiveDate: todayStr,
      history: [newHistoryEntry, ...userState.history.slice(0, 30)]
    };

    // Check newly eligible badges
    const { newlyUnlockedBadges, bonusXpTotal } = checkBadgesEligibility(tempState);

    let finalUnlockedBadgeIds = [...tempState.unlockedBadgeIds];
    let extraHistoryEntries: XpHistoryEntry[] = [];

    if (newlyUnlockedBadges.length > 0) {
      newlyUnlockedBadges.forEach(b => {
        finalUnlockedBadgeIds.push(b.id);
        extraHistoryEntries.push({
          id: `badge-${b.id}-${Date.now()}`,
          title: `شارة جديدة: ${b.nameAr}`,
          xp: b.xpBonus,
          date: todayStr,
          time: timeFormatted,
          type: 'badge'
        });
      });
    }

    const finalState: ChallengeUserState = {
      ...tempState,
      totalXp: tempState.totalXp + bonusXpTotal,
      unlockedBadgeIds: finalUnlockedBadgeIds,
      history: [...extraHistoryEntries, ...tempState.history]
    };

    setUserState(finalState);

    // Show celebratory XP toast
    const totalGained = earnedXp + bonusXpTotal;
    setXpToast({
      message: newlyUnlockedBadges.length > 0 
        ? `أحسنت! فتحت شارة "${newlyUnlockedBadges[0].nameAr}" وحصلت على ${totalGained} XP!`
        : `رائع! حصلت على +${earnedXp} XP بنجاح!`,
      xp: totalGained
    });

    setTimeout(() => {
      setXpToast(null);
    }, 3500);
  };

  // Trigger challenge action modal
  const handleStartChallenge = (challenge: ChallengeTask) => {
    if (challenge.quizData) {
      setActiveQuizChallenge(challenge);
    } else if (challenge.exerciseData) {
      setActiveExerciseChallenge(challenge);
    } else {
      setLessonConfirmedCheck(false);
      setActiveLessonChallenge(challenge);
    }
  };

  // Real progress and level calculation: e.g. 275 XP / 500 XP = 55%
  const { currentLevel, levelTitle, nextLevelXp, progressPercent, remainingXp } = calculateLevelAndProgress(userState.totalXp);

  const completedTodayList = userState.completedDailyDates[todayStr] || [];
  const completedWeeklyList = userState.completedWeeklyKeys[currentWeekKey] || [];

  const completedDailyCount = todayChallenges.filter(t => completedTodayList.includes(t.id)).length;
  const completedWeeklyCount = weekChallenges.filter(w => completedWeeklyList.includes(w.id)).length;

  // Helper to determine completion status of a card
  const isChallengeDone = (task: ChallengeTask) => {
    if (task.category === 'daily') {
      return completedTodayList.includes(task.id);
    }
    if (task.category === 'weekly') {
      return completedWeeklyList.includes(task.id);
    }
    return userState.completedChallengeIds.includes(task.id);
  };

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 pb-24">
      {/* Floating XP Toast */}
      {xpToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-black text-xs sm:text-sm shadow-xl shadow-amber-500/30 border border-amber-300">
            <Sparkles className="h-4 w-4 fill-black shrink-0" />
            <span>{xpToast.message}</span>
          </div>
        </div>
      )}

      {/* 1. Header Section - Clean, Compact & Highly Organized */}
      <div className="border-b border-zinc-800/80 bg-gradient-to-b from-amber-950/20 via-zinc-950 to-[#060608] px-4 pt-5 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-3">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowBackIcon className="h-3 w-3" />
              <span>الرئيسية</span>
            </button>
            <span className="text-zinc-600">/</span>
            <span className="text-amber-400 font-bold">التحديات</span>
          </div>

          {/* Title & Short Description */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <span>التحديات</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                  XP System
                </span>
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                أنجز المهام اليومية، طوّر مهاراتك، واجمع نقاط XP لفتح الشارات والترقيات.
              </p>
            </div>
          </div>

          {/* Mini Stats Cards (XP, Level, Streak, Completed) - Uniform & Compact */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {/* 1. Total XP */}
            <div className="rounded-2xl border border-zinc-800/90 bg-zinc-900/70 p-3 sm:p-3.5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-zinc-400 font-bold block truncate">مجموع XP</span>
                <span className="text-base sm:text-lg font-black text-amber-400 font-sans tracking-tight">
                  {userState.totalXp} <span className="text-[10px] font-bold text-zinc-500">XP</span>
                </span>
              </div>
            </div>

            {/* 2. Level & Rank */}
            <div className="rounded-2xl border border-zinc-800/90 bg-zinc-900/70 p-3 sm:p-3.5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                <Award className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-zinc-400 font-bold block truncate">المستوى الحالي</span>
                <span className="text-xs sm:text-sm font-black text-white truncate block">
                  المستوى {currentLevel}
                </span>
              </div>
            </div>

            {/* 3. Daily Streak */}
            <div className="rounded-2xl border border-zinc-800/90 bg-zinc-900/70 p-3 sm:p-3.5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0">
                <Flame className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-zinc-400 font-bold block truncate">السلسلة اليومية</span>
                <span className="text-base sm:text-lg font-black text-orange-400 font-sans tracking-tight flex items-center gap-1">
                  {userState.streakCount} <span className="text-xs">🔥</span>
                </span>
              </div>
            </div>

            {/* 4. Completed Challenges */}
            <div className="rounded-2xl border border-zinc-800/90 bg-zinc-900/70 p-3 sm:p-3.5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-zinc-400 font-bold block truncate">المكتملة</span>
                <span className="text-base sm:text-lg font-black text-emerald-400 font-sans tracking-tight">
                  {userState.completedChallengeIds.length} <span className="text-[10px] font-bold text-zinc-500">تحدي</span>
                </span>
              </div>
            </div>
          </div>

          {/* Real Level Progress Bar (Accurate real math: e.g. 275 / 500 = 55%) */}
          <div className="mt-3.5 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-3 sm:p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                <span>التقدم نحو الهدف القادم:</span>
                <span className="text-zinc-400 font-normal">({userState.totalXp} من {nextLevelXp} XP)</span>
              </span>
              <span className="text-amber-400 font-black font-sans text-xs sm:text-sm">
                {progressPercent}%
              </span>
            </div>

            <div className="h-2 w-full bg-zinc-800/90 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 rounded-full transition-all duration-500 shadow-sm shadow-amber-500/40"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-0.5">
              <span>{levelTitle}</span>
              <span>متبقي <strong className="text-zinc-200 font-sans">{remainingXp} XP</strong> للترقية</span>
            </div>
          </div>

          {/* 2. Clear Tabs Navigation (اليومية، الأسبوعية، الاختبارات، التمارين العملية، الشارات) */}
          <div className="mt-5 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-zinc-800/70">
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'daily'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>اليومية</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-sans ${
                activeTab === 'daily' ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {completedDailyCount}/{todayChallenges.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'weekly'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>الأسبوعية</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-sans ${
                activeTab === 'weekly' ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {completedWeeklyCount}/{weekChallenges.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('quizzes')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'quizzes'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>الاختبارات</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-sans ${
                activeTab === 'quizzes' ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {allQuizzes.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'exercises'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <Target className="h-3.5 w-3.5" />
              <span>التمارين العملية</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-sans ${
                activeTab === 'exercises' ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {allExercises.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('badges')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'badges'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <Award className="h-3.5 w-3.5" />
              <span>الشارات</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-sans ${
                activeTab === 'badges' ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {userState.unlockedBadgeIds.length}/{allBadgesList.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 space-y-6">

        {/* TAB 1: DAILY CHALLENGES */}
        {activeTab === 'daily' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-zinc-950/60 border border-zinc-800/80 p-3 rounded-2xl text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <Calendar className="h-4 w-4 text-amber-400 shrink-0" />
                <span>تتجدد المهام يومياً حسب التاريخ. أنجز التحدي اليوم لاستلام الـ XP (ممنوع تكرار نفس التحدي اليومي).</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-400 shrink-0">
                <span className="bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">{todayStr}</span>
                <span className="bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-lg border border-amber-500/20">تتجدد بعد: {hoursLeftToday} س</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {todayChallenges.map((task) => {
                const isCompleted = isChallengeDone(task);

                return (
                  <div
                    key={task.id}
                    className={`rounded-2xl border p-4 sm:p-4.5 flex flex-col justify-between transition-all ${
                      isCompleted
                        ? 'border-emerald-500/30 bg-emerald-950/10'
                        : 'border-zinc-800/90 bg-zinc-900/50 hover:border-amber-500/30'
                    }`}
                  >
                    <div>
                      {/* Domain, Type & XP Pill */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                            {task.domainAr}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            task.type === 'quiz' 
                              ? 'bg-purple-950/60 text-purple-300 border border-purple-800/40'
                              : task.type === 'exercise'
                              ? 'bg-blue-950/60 text-blue-300 border border-blue-800/40'
                              : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                          }`}>
                            {task.type === 'quiz' ? 'اختبار' : task.type === 'exercise' ? 'تمرين' : 'درس'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 font-sans font-black text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                          <Sparkles className="h-3 w-3" />
                          <span>+{task.xpReward} XP</span>
                        </div>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {task.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                        {task.description}
                      </p>
                    </div>

                    {/* Bottom Status & CTA */}
                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                      <div>
                        {isCompleted ? (
                          <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>مكتمل اليوم ✓</span>
                          </span>
                        ) : (
                          <span className="text-zinc-500 text-xs flex items-center gap-1">
                            <Circle className="h-3 w-3" />
                            <span>لم يبدأ</span>
                          </span>
                        )}
                      </div>

                      {!isCompleted ? (
                        <button
                          onClick={() => handleStartChallenge(task)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition-all shadow-sm shadow-amber-500/20 active:scale-95 cursor-pointer"
                        >
                          {task.type === 'quiz' ? 'بدء الاختبار' : task.type === 'exercise' ? 'بدء التمرين' : 'بدء المهمة'}
                        </button>
                      ) : (
                        <span className="text-[11px] text-zinc-500 font-bold">
                          تم استلام الـ XP
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: WEEKLY CHALLENGES */}
        {activeTab === 'weekly' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-zinc-950/60 border border-zinc-800/80 p-3 rounded-2xl text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <Clock className="h-4 w-4 text-purple-400 shrink-0" />
                <span>مشاريع تطبيقية واختبارات كفاءة تتجدد أسبوعياً بمكافآت XP كبرى.</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-400 shrink-0">
                <span className="bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">{currentWeekKey}</span>
                <span className="bg-purple-950/40 text-purple-300 px-2.5 py-1 rounded-lg border border-purple-800/40">متبقي: {daysLeftInWeek} أيام</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {weekChallenges.map((task) => {
                const isCompleted = isChallengeDone(task);

                return (
                  <div
                    key={task.id}
                    className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between transition-all ${
                      isCompleted
                        ? 'border-emerald-500/30 bg-emerald-950/10'
                        : 'border-zinc-800/90 bg-zinc-900/50 hover:border-purple-500/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-800/40">
                          {task.domainAr}
                        </span>

                        <div className="flex items-center gap-1 font-sans font-black text-xs text-purple-400 bg-purple-950/30 px-2 py-0.5 rounded-md border border-purple-800/30">
                          <Sparkles className="h-3 w-3" />
                          <span>+{task.xpReward} XP</span>
                        </div>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {task.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                        {task.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                      <div>
                        {isCompleted ? (
                          <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>مكتمل لهذا الأسبوع ✓</span>
                          </span>
                        ) : (
                          <span className="text-zinc-500 text-xs flex items-center gap-1">
                            <Circle className="h-3 w-3" />
                            <span>قيد الإنجاز</span>
                          </span>
                        )}
                      </div>

                      {!isCompleted ? (
                        <button
                          onClick={() => handleStartChallenge(task)}
                          className="px-3.5 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-black font-black text-xs transition-all shadow-sm shadow-purple-500/20 active:scale-95 cursor-pointer"
                        >
                          بدء التحدي الأسبوعي
                        </button>
                      ) : (
                        <span className="text-[11px] text-zinc-500 font-bold">
                          تم استلام الـ XP
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: QUIZZES */}
        {activeTab === 'quizzes' && (
          <div className="space-y-4">
            <div className="bg-zinc-950/60 border border-zinc-800/80 p-3 rounded-2xl text-xs text-zinc-300 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-purple-400 shrink-0" />
              <span>اختبارات سريعة متعددة الاختيارات لقياس الفهم الرقمي مع تصحيح وشرح فوري.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {allQuizzes.map((quiz) => {
                const isCompleted = isChallengeDone(quiz);

                return (
                  <div
                    key={quiz.id}
                    className={`rounded-2xl border p-4 sm:p-4.5 flex flex-col justify-between transition-all ${
                      isCompleted
                        ? 'border-emerald-500/30 bg-emerald-950/10'
                        : 'border-zinc-800/90 bg-zinc-900/50 hover:border-purple-500/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-950/60 text-purple-300 border border-purple-800/40">
                            {quiz.domainAr}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400">
                            سؤال تفاعلي
                          </span>
                        </div>

                        <div className="flex items-center gap-1 font-sans font-black text-xs text-purple-400 bg-purple-950/30 px-2 py-0.5 rounded-md border border-purple-800/30">
                          <Sparkles className="h-3 w-3" />
                          <span>+{quiz.xpReward} XP</span>
                        </div>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {quiz.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                        {quiz.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                      <div>
                        {isCompleted ? (
                          <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>مكتمل بنجاح ✓</span>
                          </span>
                        ) : (
                          <span className="text-zinc-500 text-xs flex items-center gap-1">
                            <Circle className="h-3 w-3" />
                            <span>غير مجتاز</span>
                          </span>
                        )}
                      </div>

                      {!isCompleted ? (
                        <button
                          onClick={() => handleStartChallenge(quiz)}
                          className="px-3.5 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-black font-black text-xs transition-all shadow-sm shadow-purple-500/20 active:scale-95 cursor-pointer"
                        >
                          بدء الاختبار
                        </button>
                      ) : (
                        <span className="text-[11px] text-zinc-500 font-bold">
                          تم استلام الـ XP
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: PRACTICAL EXERCISES */}
        {activeTab === 'exercises' && (
          <div className="space-y-4">
            <div className="bg-zinc-950/60 border border-zinc-800/80 p-3 rounded-2xl text-xs text-zinc-300 flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>تمارين تطبيقية تتطلب صياغة عملية وتأكيد معايير الجودة لمنع التحايل وضمان الفائدة الحقيقية.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {allExercises.map((ex) => {
                const isCompleted = isChallengeDone(ex);

                return (
                  <div
                    key={ex.id}
                    className={`rounded-2xl border p-4 sm:p-4.5 flex flex-col justify-between transition-all ${
                      isCompleted
                        ? 'border-emerald-500/30 bg-emerald-950/10'
                        : 'border-zinc-800/90 bg-zinc-900/50 hover:border-emerald-500/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                            {ex.domainAr}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400">
                            تطبيق عملي
                          </span>
                        </div>

                        <div className="flex items-center gap-1 font-sans font-black text-xs text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded-md border border-emerald-800/30">
                          <Sparkles className="h-3 w-3" />
                          <span>+{ex.xpReward} XP</span>
                        </div>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {ex.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                        {ex.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                      <div>
                        {isCompleted ? (
                          <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>مكتمل وموثّق ✓</span>
                          </span>
                        ) : (
                          <span className="text-zinc-500 text-xs flex items-center gap-1">
                            <Circle className="h-3 w-3" />
                            <span>بانتظار التطبيق</span>
                          </span>
                        )}
                      </div>

                      {!isCompleted ? (
                        <button
                          onClick={() => handleStartChallenge(ex)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs transition-all shadow-sm shadow-emerald-500/20 active:scale-95 cursor-pointer"
                        >
                          بدء التمرين
                        </button>
                      ) : (
                        <span className="text-[11px] text-zinc-500 font-bold">
                          تم استلام الـ XP
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: BADGES */}
        {activeTab === 'badges' && (
          <div className="space-y-4">
            <div className="bg-zinc-950/60 border border-zinc-800/80 p-3 rounded-2xl text-xs text-zinc-300 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-400 shrink-0" />
                <span>شارات إنجاز تُمنح تلقائياً عند استيفاء الشروط وتضيف مكافآت XP فورية لرصيدك.</span>
              </div>
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 shrink-0">
                {userState.unlockedBadgeIds.length} من {allBadgesList.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {allBadgesList.map((badge) => {
                const isUnlocked = userState.unlockedBadgeIds.includes(badge.id);

                return (
                  <div
                    key={badge.id}
                    className={`rounded-2xl border p-3.5 sm:p-4 flex flex-col justify-between transition-all ${
                      isUnlocked
                        ? 'border-amber-500/40 bg-zinc-900/80 shadow-md shadow-amber-950/20'
                        : 'border-zinc-800/70 bg-zinc-950/60 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border ${
                          isUnlocked
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                            : 'bg-zinc-900 text-zinc-600 border-zinc-800'
                        }`}>
                          {isUnlocked ? (
                            badge.id.includes('streak') ? <Flame className="h-4 w-4 text-orange-400" /> :
                            badge.id.includes('weekly') ? <Trophy className="h-4 w-4 text-amber-400" /> :
                            badge.id.includes('quiz') ? <HelpCircle className="h-4 w-4 text-purple-400" /> :
                            badge.id.includes('exercise') ? <Target className="h-4 w-4 text-emerald-400" /> :
                            <Award className="h-4 w-4" />
                          ) : (
                            <Lock className="h-3.5 w-3.5" />
                          )}
                        </div>

                        <span className="text-[11px] font-black text-amber-400 font-sans">
                          +{badge.xpBonus} XP
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {badge.nameAr}
                      </h4>
                      <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
                        {badge.descriptionAr}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-zinc-800/60 text-[10px] text-zinc-400 flex items-center justify-between">
                      <span className="line-clamp-1">{badge.requiredCondition}</span>
                      {isUnlocked ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-0.5 shrink-0">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>محققة</span>
                        </span>
                      ) : (
                        <span className="text-zinc-600 font-bold shrink-0">مغلقة</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* XP Activity History Accordion (Compact & Organized) */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full flex items-center justify-between text-xs font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-amber-400" />
              <span>سجل آخر مكافآت ونقاط الـ XP ({userState.history.length})</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-500">
              <span className="text-[10px]">{showHistory ? 'إخفاء' : 'عرض السجل'}</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {showHistory && (
            <div className="mt-3 pt-3 border-t border-zinc-800/80 space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {userState.history.length > 0 ? (
                userState.history.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                        entry.type === 'badge' ? 'bg-amber-400' :
                        entry.type === 'weekly' ? 'bg-purple-400' :
                        entry.type === 'exercise' ? 'bg-emerald-400' :
                        'bg-blue-400'
                      }`} />
                      <span className="font-bold text-zinc-200 truncate">{entry.title}</span>
                      <span className="text-[10px] text-zinc-500 shrink-0">
                        ({entry.date} {entry.time ? `• ${entry.time}` : ''})
                      </span>
                    </div>
                    <span className="font-sans font-black text-emerald-400 shrink-0">
                      +{entry.xp} XP
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-xs text-zinc-500">
                  لم يتم تسجيل أي مكافآت بعد. ابدأ بأول تحدٍّ أعلاه للحصول على نقاطك!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Local Storage Privacy Notice */}
        <div className="text-center text-[11px] text-zinc-500 pb-4">
          يتم حفظ نقاطك وسلسلتك وإنجازاتك تلقائياً في ذاكرة المتصفح المحلية (Local Storage).
        </div>
      </div>

      {/* Quiz Modal */}
      {activeQuizChallenge && (
        <ChallengeQuizModal
          challenge={activeQuizChallenge}
          isOpen={!!activeQuizChallenge}
          onClose={() => setActiveQuizChallenge(null)}
          onSuccess={(id, xp) => handleCompleteChallenge(id, xp, 'quiz')}
        />
      )}

      {/* Exercise Modal */}
      {activeExerciseChallenge && (
        <ChallengeExerciseModal
          challenge={activeExerciseChallenge}
          isOpen={!!activeExerciseChallenge}
          onClose={() => setActiveExerciseChallenge(null)}
          onSuccess={(id, xp) => handleCompleteChallenge(id, xp, 'exercise')}
          onCopyText={onCopyText}
        />
      )}

      {/* Lesson / Skill Confirmation Modal */}
      {activeLessonChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div 
            className="relative w-full max-w-lg rounded-2xl border border-zinc-700/80 bg-zinc-950 p-5 sm:p-6 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 block tracking-wider">
                    {activeLessonChallenge.type === 'lesson' ? 'قراءة واستيعاب درس' : 'تطبيق مهارة عملية'}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                    {activeLessonChallenge.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black font-sans">
                <Sparkles className="h-3 w-3" />
                <span>+{activeLessonChallenge.xpReward} XP</span>
              </div>
            </div>

            {/* Description & Steps */}
            <div className="my-4 space-y-3.5">
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeLessonChallenge.description}
              </p>

              {activeLessonChallenge.steps && (
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-400 block">خطوات التنفيذ:</span>
                  {activeLessonChallenge.steps.map((step, idx) => (
                    <div key={idx} className="text-xs text-zinc-300 flex items-start gap-1.5">
                      <span className="h-4 w-4 rounded-full bg-zinc-800 text-[10px] font-black text-zinc-300 flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Link button */}
              {activeLessonChallenge.actionLink && (
                <button
                  onClick={() => {
                    if (activeLessonChallenge.actionLink) {
                      onNavigate(activeLessonChallenge.actionLink.tab);
                      setActiveLessonChallenge(null);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-amber-500/40 text-amber-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>{activeLessonChallenge.actionLink.label}</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              )}

              {/* Anti-spam confirmation checkbox */}
              <button
                type="button"
                onClick={() => setLessonConfirmedCheck(!lessonConfirmedCheck)}
                className={`w-full text-right p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center gap-2.5 ${
                  lessonConfirmedCheck
                    ? 'border-emerald-500/60 bg-emerald-950/20 text-emerald-200'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 ${
                  lessonConfirmedCheck ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-zinc-700 bg-zinc-950'
                }`}>
                  {lessonConfirmedCheck && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <span>أؤكد أنني راجعت وطبقت محتوى النشاط التعليمي اليوم.</span>
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3.5 border-t border-zinc-800">
              <button
                onClick={() => setActiveLessonChallenge(null)}
                className="px-3 py-1.5 text-xs font-bold text-zinc-400 hover:text-white cursor-pointer"
              >
                إغلاق
              </button>

              <button
                onClick={() => {
                  if (lessonConfirmedCheck) {
                    handleCompleteChallenge(activeLessonChallenge.id, activeLessonChallenge.xpReward, activeLessonChallenge.type);
                    setActiveLessonChallenge(null);
                  }
                }}
                disabled={!lessonConfirmedCheck}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  lessonConfirmedCheck
                    ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>تأكيد واستلام {activeLessonChallenge.xpReward} XP</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
