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
  TrendingUp, 
  Zap, 
  Lock, 
  Unlock,
  AlertCircle
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
  const ArrowNextIcon = isRTL ? ArrowLeft : ArrowRight;

  const todayStr = getTodayDateString();
  const currentWeekKey = getCurrentWeekKey();
  const daysLeftInWeek = getDaysRemainingInWeek();

  // User State
  const [userState, setUserState] = useState<ChallengeUserState>(() => getInitialUserState());

  // Active modals
  const [activeQuizChallenge, setActiveQuizChallenge] = useState<ChallengeTask | null>(null);
  const [activeExerciseChallenge, setActiveExerciseChallenge] = useState<ChallengeTask | null>(null);

  // Filter tabs: 'all' | 'daily' | 'weekly' | 'badges'
  const [filterTab, setFilterTab] = useState<'all' | 'daily' | 'weekly' | 'badges'>('all');

  // XP Award notification popup
  const [xpToast, setXpToast] = useState<{ message: string; xp: number } | null>(null);

  // Persist state updates
  useEffect(() => {
    saveUserState(userState);
  }, [userState]);

  // Handle Challenge Success (Quiz, Exercise, Lesson confirmation)
  const handleCompleteChallenge = (challengeId: string, earnedXp: number, challengeType: ChallengeTask['type']) => {
    // Determine if already completed today/this week
    const isDaily = dailyChallengePool.some(d => d.id === challengeId);
    const isWeekly = weeklyChallengePool.some(w => w.id === challengeId);

    const todayDoneList = userState.completedDailyDates[todayStr] || [];
    const thisWeekDoneList = userState.completedWeeklyKeys[currentWeekKey] || [];

    if (isDaily && todayDoneList.includes(challengeId)) {
      return; // Already completed today
    }
    if (isWeekly && thisWeekDoneList.includes(challengeId)) {
      return; // Already completed this week
    }

    // Update streak
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

    const newHistoryEntry: XpHistoryEntry = {
      id: `${Date.now()}`,
      title: challengeTitle,
      xp: earnedXp,
      date: todayStr,
      type: challengeType
    };

    const newCompletedIds = userState.completedChallengeIds.includes(challengeId)
      ? userState.completedChallengeIds
      : [...userState.completedChallengeIds, challengeId];

    // Construct intermediate state to evaluate badges
    const tempState: ChallengeUserState = {
      ...userState,
      totalXp: userState.totalXp + earnedXp,
      completedChallengeIds: newCompletedIds,
      completedDailyDates: updatedDailyDates,
      completedWeeklyKeys: updatedWeeklyKeys,
      streakCount: newStreak,
      lastActiveDate: todayStr,
      history: [newHistoryEntry, ...userState.history.slice(0, 25)]
    };

    // Check badges
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

    // Show popup
    const totalGained = earnedXp + bonusXpTotal;
    setXpToast({
      message: newlyUnlockedBadges.length > 0 
        ? `أحسنت! فتحت شارة جديدة وحصلت على ${totalGained} XP!`
        : `رائع! حصلت على +${earnedXp} XP بنجاح!`,
      xp: totalGained
    });

    setTimeout(() => {
      setXpToast(null);
    }, 3500);
  };

  // Trigger challenge action
  const handleStartChallenge = (challenge: ChallengeTask) => {
    if (challenge.quizData) {
      setActiveQuizChallenge(challenge);
    } else if (challenge.exerciseData) {
      setActiveExerciseChallenge(challenge);
    } else if (challenge.actionLink) {
      onNavigate(challenge.actionLink.tab);
    } else {
      // Direct completion confirmation
      handleCompleteChallenge(challenge.id, challenge.xpReward, challenge.type);
    }
  };

  const { currentLevel, levelTitle, nextLevelXp, progressPercent } = calculateLevelAndProgress(userState.totalXp);

  const completedTodayList = userState.completedDailyDates[todayStr] || [];
  const completedWeeklyList = userState.completedWeeklyKeys[currentWeekKey] || [];

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 pb-24">
      {/* Floating XP Toast */}
      {xpToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-sm shadow-2xl shadow-amber-500/30">
            <Sparkles className="h-5 w-5" />
            <span>{xpToast.message}</span>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative border-b border-zinc-800/80 bg-gradient-to-b from-amber-950/20 via-zinc-950 to-[#060608] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowBackIcon className="h-3.5 w-3.5" />
              <span>الرئيسية</span>
            </button>
            <span className="text-zinc-600">/</span>
            <span className="text-amber-400 font-bold">التحديات والمكافآت (Challenges & XP)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-bold text-amber-400 mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>نظام التحديات اليومية والأسبوعية 2026</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                التحديات ونقاط الخبرة XP
              </h1>
              <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                حوّل تعلّمك الرقمي في RikouZone إلى عادة يومية ممتعة. أنجز الاختبارات والتمارين التطبيقية، حافظ على شعلة الأيام المتتالية، واجمع نقاط الـ XP لفتح شارات التميز.
              </p>

              {/* Badges Overview Preview */}
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <Flame className="h-4 w-4 text-orange-400" />
                  <span>السلسلة الحالية: <strong className="text-white">{userState.streakCount} يوم</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <Award className="h-4 w-4 text-amber-400" />
                  <span>الشارات المفتوحة: <strong className="text-white">{userState.unlockedBadgeIds.length} / {allBadgesList.length}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>حفظ محلي آمن في المتصفح</span>
                </div>
              </div>
            </div>

            {/* Level & XP Card */}
            <div className="lg:col-span-5 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-zinc-900 to-zinc-950 p-6 sm:p-7 backdrop-blur-xl shadow-xl shadow-amber-950/20">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <span className="text-[11px] font-bold text-zinc-400 block mb-0.5">المستوى الحالي:</span>
                  <h3 className="text-lg sm:text-xl font-black text-white">{levelTitle}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-zinc-400 block mb-0.5">مجموع نقاط الخبرة:</span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-sans">
                    {userState.totalXp} <span className="text-xs font-bold text-zinc-400">XP</span>
                  </div>
                </div>
              </div>

              {/* Progress to next level */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-zinc-300">التقدم نحو المستوى التالي:</span>
                  <span className="text-amber-400">{progressPercent}%</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-zinc-400 pt-1">
                  <span>المستوى {currentLevel}</span>
                  <span>الهدف: {nextLevelXp} XP</span>
                </div>
              </div>

              {/* Streak highlight box */}
              <div className="mt-5 p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block">سلسلة الأيام المتتالية (Streak)</span>
                    <span className="text-[10px] text-zinc-400">
                      {userState.lastActiveDate === todayStr 
                        ? 'أكملت نشاط اليوم بنجاح ✓' 
                        : 'أنجز تحدياً اليوم للحفاظ على شعلتك!'}
                    </span>
                  </div>
                </div>
                <div className="text-xl font-black text-orange-400 font-sans">
                  {userState.streakCount} 🔥
                </div>
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="mt-10 flex items-center gap-2 border-b border-zinc-800/80 pb-px overflow-x-auto no-scrollbar">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                filterTab === 'all'
                  ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              جميع التحديات والشارات
            </button>
            <button
              onClick={() => setFilterTab('daily')}
              className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                filterTab === 'daily'
                  ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              التحديات اليومية ({dailyChallengePool.length})
            </button>
            <button
              onClick={() => setFilterTab('weekly')}
              className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                filterTab === 'weekly'
                  ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              التحديات الأسبوعية ({weeklyChallengePool.length})
            </button>
            <button
              onClick={() => setFilterTab('badges')}
              className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                filterTab === 'badges'
                  ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              الشارات والإنجازات ({userState.unlockedBadgeIds.length} / {allBadgesList.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* SECTION 1: DAILY CHALLENGES */}
        {(filterTab === 'all' || filterTab === 'daily') && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-amber-400" />
                  <span>التحديات اليومية (Daily Challenges)</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  تتجدد المهام يومياً. أنجز التحدي اليوم للحصول على الـ XP؛ لا تتكرر نقاط نفس التحدي في اليوم ذاته.
                </p>
              </div>
              <span className="text-[11px] font-bold text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800 self-start sm:self-auto">
                تاريخ اليوم: {todayStr}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {dailyChallengePool.map((task) => {
                const isCompletedToday = completedTodayList.includes(task.id);

                return (
                  <div
                    key={task.id}
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                      isCompletedToday
                        ? 'border-emerald-500/40 bg-emerald-950/15'
                        : 'border-zinc-800 bg-zinc-900/50 hover:border-amber-500/40'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-lg ${
                          task.type === 'quiz' 
                            ? 'bg-purple-950/60 text-purple-300 border border-purple-800/40'
                            : task.type === 'exercise'
                            ? 'bg-blue-950/60 text-blue-300 border border-blue-800/40'
                            : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                        }`}>
                          {task.type === 'quiz' ? 'اختبار سريع' : task.type === 'exercise' ? 'تمرين تطبيقي' : 'نشاط تعلّم'}
                        </span>

                        <div className="flex items-center gap-1.5 font-sans font-black text-xs text-amber-400">
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>+{task.xpReward} XP</span>
                        </div>
                      </div>

                      <h3 className="text-base font-black text-white leading-snug">
                        {task.title}
                      </h3>
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                        {task.description}
                      </p>

                      {task.steps && task.steps.length > 0 && (
                        <div className="mt-3.5 pt-3 border-t border-zinc-800/60 space-y-1">
                          {task.steps.map((s, idx) => (
                            <div key={idx} className="text-[11px] text-zinc-400 flex items-start gap-1.5">
                              <span className="text-amber-400">•</span>
                              <span>{s}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                      <span className="text-xs font-bold">
                        {isCompletedToday ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>مكتمل اليوم ✓</span>
                          </span>
                        ) : (
                          <span className="text-zinc-500 flex items-center gap-1">
                            <Circle className="h-4 w-4" />
                            <span>غير منجز</span>
                          </span>
                        )}
                      </span>

                      {!isCompletedToday ? (
                        <button
                          onClick={() => handleStartChallenge(task)}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer"
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
          </section>
        )}

        {/* SECTION 2: WEEKLY CHALLENGES */}
        {(filterTab === 'all' || filterTab === 'weekly') && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-400" />
                  <span>التحديات الأسبوعية (Weekly Challenges)</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  مهام تتطلب مجهوداً ومشاريع تطبيقية أكبر بمكافآت XP ضخمة. تتجدد بنهاية الأسبوع.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-purple-300 bg-purple-950/30 px-3 py-1.5 rounded-xl border border-purple-900/40">
                <Clock className="h-3.5 w-3.5" />
                <span>متبقي على نهاية الأسبوع: {daysLeftInWeek} أيام</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {weeklyChallengePool.map((task) => {
                const isCompletedWeekly = completedWeeklyList.includes(task.id);

                return (
                  <div
                    key={task.id}
                    className={`rounded-3xl border p-6 flex flex-col justify-between transition-all ${
                      isCompletedWeekly
                        ? 'border-emerald-500/40 bg-emerald-950/15'
                        : 'border-zinc-800 bg-zinc-900/60 hover:border-purple-500/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-black px-2.5 py-0.5 rounded-lg bg-purple-950 text-purple-300 border border-purple-800/40">
                          تحدٍّ أسبوعي كبير
                        </span>

                        <div className="flex items-center gap-1.5 font-sans font-black text-sm text-purple-400">
                          <Sparkles className="h-4 w-4" />
                          <span>+{task.xpReward} XP</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-black text-white leading-snug">
                        {task.title}
                      </h3>
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                        {task.description}
                      </p>

                      {task.steps && (
                        <div className="mt-4 pt-3 border-t border-zinc-800 space-y-1.5">
                          {task.steps.map((st, idx) => (
                            <div key={idx} className="text-xs text-zinc-300 flex items-start gap-1.5">
                              <span className="text-purple-400 font-bold">•</span>
                              <span>{st}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                      <span className="text-xs font-bold">
                        {isCompletedWeekly ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>مكتمل لهذا الأسبوع ✓</span>
                          </span>
                        ) : (
                          <span className="text-zinc-500 flex items-center gap-1">
                            <Circle className="h-4 w-4" />
                            <span>قيد الإنجاز</span>
                          </span>
                        )}
                      </span>

                      {!isCompletedWeekly ? (
                        <button
                          onClick={() => handleStartChallenge(task)}
                          className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-black font-black text-xs transition-all shadow-md shadow-purple-500/20 cursor-pointer"
                        >
                          بدء التحدي الأسبوعي
                        </button>
                      ) : (
                        <span className="text-xs text-zinc-500 font-bold">
                          تم استلام الـ XP
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 3: BADGES & ACHIEVEMENTS */}
        {(filterTab === 'all' || filterTab === 'badges') && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-400" />
                  <span>شارات الإنجاز والتميز (Badges)</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  شارات تفتح تلقائياً عند تحقيق أهداف التعلم والاستمرارية، وتمنحك نقاط XP إضافية فورية.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                {userState.unlockedBadgeIds.length} من {allBadgesList.length} شارة مفتوحة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allBadgesList.map((badge) => {
                const isUnlocked = userState.unlockedBadgeIds.includes(badge.id);

                return (
                  <div
                    key={badge.id}
                    className={`rounded-2xl border p-5 flex items-start gap-4 transition-all ${
                      isUnlocked
                        ? 'border-amber-500/40 bg-zinc-900/70 shadow-lg shadow-amber-950/20'
                        : 'border-zinc-800/80 bg-zinc-950/60 opacity-60'
                    }`}
                  >
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                      isUnlocked
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-zinc-900 text-zinc-600 border-zinc-800'
                    }`}>
                      {isUnlocked ? <Award className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-sm font-black text-white truncate">
                          {badge.nameAr}
                        </h4>
                        <span className="text-[11px] font-bold text-amber-400 font-sans shrink-0">
                          +{badge.xpBonus} XP
                        </span>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {badge.descriptionAr}
                      </p>

                      <div className="mt-3 pt-2 border-t border-zinc-800/60 text-[10px] text-zinc-400 flex items-center justify-between">
                        <span>الشرط: {badge.requiredCondition}</span>
                        {isUnlocked ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>محققة</span>
                          </span>
                        ) : (
                          <span className="text-zinc-600 font-bold">مغلقة</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 4: XP HISTORY LOG */}
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <History className="h-4 w-4 text-amber-400" />
              <span>سجل آخر مكافآت ونقاط الـ XP المكتسبة</span>
            </h3>
            <span className="text-[11px] text-zinc-500">
              يتم الحفظ محلياً في متصفحك
            </span>
          </div>

          {userState.history.length > 0 ? (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {userState.history.map((entry) => (
                <div
                  key={entry.id}
                  className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                    <span className="font-bold text-zinc-200">{entry.title}</span>
                    <span className="text-[10px] text-zinc-500">({entry.date})</span>
                  </div>
                  <span className="font-sans font-black text-emerald-400">
                    +{entry.xp} XP
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-zinc-500">
              لم تكسب أي نقاط XP بعد. ابدأ بأول تحدٍّ يومي أعلاه للحصول على أول مكافأة!
            </div>
          )}
        </section>
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
    </div>
  );
};
