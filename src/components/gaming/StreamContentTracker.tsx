import React, { useState, useEffect } from 'react';
import { BarChart3, Plus, Trash2, Clock, Users, DollarSign, Filter, Sparkles, Gamepad2, Radio, Trophy, Search } from 'lucide-react';

export interface StreamSession {
  id: string;
  date: string;
  title: string;
  platform: 'kick' | 'youtube' | 'twitch' | 'tiktok';
  game: string;
  durationHours: number;
  peakViewers: number;
  averageViewers: number;
  newSubs: number;
  earnings: number;
  notes?: string;
}

const INITIAL_SESSIONS: StreamSession[] = [
  {
    id: 'stream-1',
    date: '2025-02-10',
    title: 'أول بث رسمي: بداية رحلة الرانك في فري فاير مع المتابعين',
    platform: 'kick',
    game: 'Free Fire',
    durationHours: 3.5,
    peakViewers: 42,
    averageViewers: 28,
    newSubs: 6,
    earnings: 38.5,
    notes: 'تفاعل ممتاز في الشات، تم إنشاء أول روم مخصص مع أعضاء الديسكورد.'
  },
  {
    id: 'stream-2',
    date: '2025-02-12',
    title: 'تحدي الفوز بسلاح المسدس فقط في فالورانت!',
    platform: 'kick',
    game: 'Valorant',
    durationHours: 2.5,
    peakViewers: 58,
    averageViewers: 35,
    newSubs: 8,
    earnings: 52.0,
    notes: 'لقطة كلااتش خرافية في الجولة 12 تم قصها ونشرها في تيك توك.'
  },
  {
    id: 'stream-3',
    date: '2025-02-14',
    title: 'بث الرول بلاي GTA V: الهروب الكبير من مركز شرطة لوس سانتوس',
    platform: 'youtube',
    game: 'GTA V FiveM',
    durationHours: 4.0,
    peakViewers: 85,
    averageViewers: 60,
    newSubs: 15,
    earnings: 95.0,
    notes: 'أفضل بث من حيث المشاهدات حتى الآن، زاد عدد أعضاء الديسكورد 40 عضواً.'
  }
];

export const StreamContentTracker: React.FC = () => {
  const [sessions, setSessions] = useState<StreamSession[]>(() => {
    try {
      const saved = localStorage.getItem('rikou_gaming_sessions_tracker');
      return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
    } catch {
      return INITIAL_SESSIONS;
    }
  });

  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // New session state
  const [newTitle, setNewTitle] = useState('');
  const [newPlatform, setNewPlatform] = useState<'kick' | 'youtube' | 'twitch' | 'tiktok'>('kick');
  const [newGame, setNewGame] = useState('Free Fire');
  const [newDuration, setNewDuration] = useState('3.0');
  const [newPeak, setNewPeak] = useState('45');
  const [newAvg, setNewAvg] = useState('30');
  const [newSubs, setNewSubs] = useState('5');
  const [newEarnings, setNewEarnings] = useState('40');
  const [newNotes, setNewNotes] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('rikou_gaming_sessions_tracker', JSON.stringify(sessions));
    } catch (e) {
      console.error(e);
    }
  }, [sessions]);

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newSession: StreamSession = {
      id: `stream-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      title: newTitle.trim(),
      platform: newPlatform,
      game: newGame.trim(),
      durationHours: Number(newDuration) || 2,
      peakViewers: Number(newPeak) || 10,
      averageViewers: Number(newAvg) || 5,
      newSubs: Number(newSubs) || 0,
      earnings: Number(newEarnings) || 0,
      notes: newNotes.trim()
    };

    setSessions([newSession, ...sessions]);
    setShowAddForm(false);
    setNewTitle('');
    setNewNotes('');
  };

  const handleDeleteSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  // Stats
  const totalHours = sessions.reduce((acc, s) => acc + s.durationHours, 0);
  const peakAllTime = sessions.reduce((acc, s) => Math.max(acc, s.peakViewers), 0);
  const totalSubs = sessions.reduce((acc, s) => acc + s.newSubs, 0);
  const totalRevenue = sessions.reduce((acc, s) => acc + s.earnings, 0);
  const avgViewersOverall = sessions.length > 0
    ? Math.round(sessions.reduce((acc, s) => acc + s.averageViewers, 0) / sessions.length)
    : 0;

  const filteredSessions = sessions.filter((s) => {
    const matchesPlatform = platformFilter === 'all' || s.platform === platformFilter;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.game.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  return (
    <div className="space-y-8 text-right" dir="rtl">
      {/* Header */}
      <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-zinc-900/80 to-zinc-900/50 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>سجل وداشبورد تتبع البثوث والمحتوى</span>
                <span className="rounded-md bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 text-xs text-purple-300 font-bold">
                  Stream Analytics
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                سجل جلسات البث، مدة اللعب، ذروة المشاهدين المتزامنين، المشتركين الجدد، والأرباح لتتبع نمو قناتك بدقة.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-4 py-2 text-xs font-black text-black hover:bg-purple-400 transition-all shadow-lg shadow-purple-500/20 cursor-pointer self-start sm:self-center"
          >
            <Plus className="h-4 w-4" />
            <span>{showAddForm ? 'إلغاء الإضافة' : 'تسجيل جلسة بث جديدة'}</span>
          </button>
        </div>

        {/* 4 Dashboard Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-zinc-800">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3.5">
            <div className="text-[11px] text-zinc-400 font-bold flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-purple-400" />
              <span>إجمالي ساعات البث:</span>
            </div>
            <div className="text-xl font-black text-white mt-1">{totalHours.toFixed(1)} ساعة</div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3.5">
            <div className="text-[11px] text-zinc-400 font-bold flex items-center gap-1.5">
              <Trophy className="h-3.5 w-3.5 text-amber-400" />
              <span>أعلى ذروة مشاهدين (Peak):</span>
            </div>
            <div className="text-xl font-black text-amber-300 mt-1">{peakAllTime} مشاهد</div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3.5">
            <div className="text-[11px] text-zinc-400 font-bold flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-cyan-400" />
              <span>مشتركون جدد مكتسبون:</span>
            </div>
            <div className="text-xl font-black text-cyan-300 mt-1">+{totalSubs} مشترك</div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3.5">
            <div className="text-[11px] text-zinc-400 font-bold flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
              <span>إجمالي الأرباح المسجلة:</span>
            </div>
            <div className="text-xl font-black text-emerald-400 mt-1">${Math.round(totalRevenue)}</div>
          </div>
        </div>
      </div>

      {/* Add Session Form */}
      {showAddForm && (
        <form onSubmit={handleAddSession} className="rounded-3xl border border-purple-500/40 bg-zinc-900/90 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Plus className="h-4 w-4 text-purple-400" />
            <span>إضافة بيانات جلسة بث جديدة:</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-bold text-zinc-400 mb-1">عنوان البث أو المقطع:</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="مثلاً: أول تجربة لتحديث السيزون الجديد في فري فاير"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white font-bold focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-400 mb-1">المنصة:</label>
              <select
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white font-bold focus:border-purple-500 focus:outline-none"
              >
                <option value="kick">Kick</option>
                <option value="youtube">YouTube</option>
                <option value="twitch">Twitch</option>
                <option value="tiktok">TikTok Live</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-zinc-400 mb-1">اسم اللعبة:</label>
              <input
                type="text"
                required
                value={newGame}
                onChange={(e) => setNewGame(e.target.value)}
                placeholder="Free Fire, Valorant, GTA V..."
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white font-bold focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-400 mb-1">مدة البث (بالساعات):</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white font-bold focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-400 mb-1">ذروة المشاهدين (Peak Viewers):</label>
              <input
                type="number"
                min="1"
                value={newPeak}
                onChange={(e) => setNewPeak(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white font-bold focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-400 mb-1">متوسط المشاهدين (Average):</label>
              <input
                type="number"
                min="1"
                value={newAvg}
                onChange={(e) => setNewAvg(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white font-bold focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-400 mb-1">مشتركون جدد مكتسبون:</label>
              <input
                type="number"
                min="0"
                value={newSubs}
                onChange={(e) => setNewSubs(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white font-bold focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-400 mb-1">الأرباح المحققة ($):</label>
              <input
                type="number"
                min="0"
                step="1"
                value={newEarnings}
                onChange={(e) => setNewEarnings(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white font-bold focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2 md:col-span-3">
              <label className="block font-bold text-zinc-400 mb-1">ملاحظات ولقطات مميزة:</label>
              <input
                type="text"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="لقطة هيد شوت في الدقيقة 40، رابط الفيديو القصير، نقاط للتحسين..."
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white font-medium focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="rounded-xl bg-purple-500 px-5 py-2 text-xs font-black text-black hover:bg-purple-400 cursor-pointer"
            >
              حفظ الجلسة
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {[
            { id: 'all', label: 'جميع المنصات' },
            { id: 'kick', label: 'Kick' },
            { id: 'youtube', label: 'YouTube' },
            { id: 'twitch', label: 'Twitch' },
            { id: 'tiktok', label: 'TikTok Live' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setPlatformFilter(item.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                platformFilter === item.id
                  ? 'bg-purple-500 text-black font-black'
                  : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="بحث في البثوث أو الألعاب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 pr-8 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
          />
          <Search className="h-3.5 w-3.5 text-zinc-500 absolute right-2.5 top-2.5" />
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-3">
        {filteredSessions.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center text-zinc-500 text-xs">
            لا توجد جلسات بث مسجلة تطابق بحثك حالياً.
          </div>
        ) : (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 sm:p-5 space-y-3 hover:border-zinc-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="rounded-md bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 text-[11px] font-black text-purple-300 uppercase">
                    {session.platform}
                  </span>
                  <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] font-bold text-zinc-300">
                    🎮 {session.game}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">{session.date}</span>
                </div>

                <button
                  onClick={() => handleDeleteSession(session.id)}
                  className="text-zinc-600 hover:text-rose-400 transition-colors p-1 self-end sm:self-center cursor-pointer"
                  title="حذف الجلسة"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <h4 className="text-sm sm:text-base font-black text-white leading-snug">
                {session.title}
              </h4>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-2 border-t border-zinc-800/80">
                <div className="text-zinc-400">
                  المدة: <strong className="text-zinc-200">{session.durationHours} س</strong>
                </div>
                <div className="text-zinc-400">
                  ذروة المشاهدين: <strong className="text-amber-300">{session.peakViewers}</strong>
                </div>
                <div className="text-zinc-400">
                  مشتركون جدد: <strong className="text-cyan-300">+{session.newSubs}</strong>
                </div>
                <div className="text-zinc-400">
                  الأرباح: <strong className="text-emerald-400">${session.earnings}</strong>
                </div>
              </div>

              {session.notes && (
                <p className="text-xs text-zinc-400 bg-zinc-950/50 rounded-xl p-2.5 border border-zinc-800/50">
                  💡 {session.notes}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
