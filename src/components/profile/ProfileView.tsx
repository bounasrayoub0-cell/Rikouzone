import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTheme } from '../../theme/ThemeContext';
import { IncomePath, ContentIdea } from '../../types';
import { incomePaths } from '../../data/incomePaths';
import { contentIdeas } from '../../data/contentIdeas';
import { 
  User, 
  Bookmark, 
  Globe, 
  Trash2, 
  TrendingUp, 
  Lightbulb, 
  Copy, 
  Share2, 
  CheckCircle2,
  Sparkles,
  Flame,
  ArrowRight,
  ArrowLeft,
  Sun,
  Moon,
  Camera,
  Edit3,
  Trophy,
  Award,
  Zap,
  Target,
  HelpCircle,
  Clock,
  Calendar,
  Layers,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
  Upload,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  UserCircle,
  BookOpen,
  GraduationCap,
  Library,
  Medal,
  Crown,
  Compass,
  Milestone,
  Star,
  BookmarkCheck,
  Lock
} from 'lucide-react';
import { 
  getInitialUserState, 
  calculateLevelAndProgress,
  checkBadgesEligibility,
  saveUserState
} from '../../utils/challengeStorage';
import { 
  allBadgesList, 
  dailyChallengePool, 
  weeklyChallengePool 
} from '../../data/challengesData';
import { BadgeItem, XpHistoryEntry, ChallengeUserState } from '../../data/challengesDataTypes';
import { getLocalizedBadge } from '../../utils/badgeTranslations';
import { calculateBadgeProgress, getGlobalLearningStats } from '../../utils/badgeProgressTracker';
import { HexagonalBadge, BadgeDetailModal } from '../common/HexagonalBadge';
import { 
  UserProfile, 
  AVATAR_PRESETS, 
  DEFAULT_USER_PROFILE, 
  getStoredUserProfile, 
  saveStoredUserProfile, 
  calculateProfileCompletion, 
  processUploadedImage 
} from '../../utils/profileStorage';
import { RkoCoinLogo } from '../common/RkoCoinLogo';
import { useRkoWallet } from '../../utils/rkoWalletStorage';

interface ProfileViewProps {
  savedIds: string[];
  onToggleSave: (id: string, type: 'income' | 'idea') => void;
  onClearAllSaved: () => void;
  onSelectPath: (path: IncomePath) => void;
  onSelectIdea: (idea: ContentIdea) => void;
  onCopyText: (text: string, label: string) => void;
  onNavigate: (tab: string) => void;
}

// Multi-language UI dictionary for the Profile section
const profileI18n: Record<string, {
  tabOverview: string;
  tabBadges: string;
  tabSaved: string;
  tabSettings: string;
  editProfile: string;
  saveChanges: string;
  cancel: string;
  uploadPhoto: string;
  removePhoto: string;
  choosePreset: string;
  displayNameLabel: string;
  usernameLabel: string;
  roleLabel: string;
  bioLabel: string;
  bioPlaceholder: string;
  profileCompletion: string;
  completedTasksTitle: string;
  streakTitle: string;
  daysStreak: string;
  xpTitle: string;
  levelTitle: string;
  nextLevel: string;
  remainingXpText: string;
  badgesTitle: string;
  unlockedOf: string;
  recentActivity: string;
  noActivityYet: string;
  noActivityDesc: string;
  startFirstChallenge: string;
  learningTracksProgress: string;
  completedChallengesCount: string;
  viewAllChallenges: string;
  encouragementNew: string;
  encouragementGrowing: string;
  encouragementPro: string;
  savedSectionTitle: string;
  filterAll: string;
  filterPaths: string;
  filterIdeas: string;
  profileUpdatedToast: string;
  photoUploadError: string;
}> = {
  ar: {
    tabOverview: 'نظرة عامة والتقدم',
    tabBadges: 'الشارات والإنجازات',
    tabSaved: 'المحفوظات',
    tabSettings: 'الإعدادات والمظهر',
    editProfile: 'تعديل الملف',
    saveChanges: 'حفظ التعديلات',
    cancel: 'إلغاء',
    uploadPhoto: 'رفع صورة من المعرض',
    removePhoto: 'استعادة الصورة الافتراضية',
    choosePreset: 'أو اختر صورة رمزية من المنصة:',
    displayNameLabel: 'الاسم الظاهر',
    usernameLabel: 'اسم المستخدم (@)',
    roleLabel: 'المسمى أو التخصص',
    bioLabel: 'النبذة والهدف التعليمي',
    bioPlaceholder: 'اكتب سطرين عن اهتماماتك الرقمية وأهدافك...',
    profileCompletion: 'اكتمال الملف الشخصي',
    completedTasksTitle: 'خطوات إكمال الملف:',
    streakTitle: 'السلسلة اليومية',
    daysStreak: 'أيام متتالية',
    xpTitle: 'نقاط الخبرة XP',
    levelTitle: 'المستوى الحالي',
    nextLevel: 'المستوى القادم',
    remainingXpText: 'متبقي للترقية',
    badgesTitle: 'الشارات التعليمية',
    unlockedOf: 'شارة مكتملة من',
    recentActivity: 'سجل الأنشطة التعليمية الأخيرة',
    noActivityYet: 'لا توجد أنشطة مسجلة بعد',
    noActivityDesc: 'أكمل اختبارات وتحديات اليوم لتوثيق تقدمك الحقيقي وكسب نقاط XP.',
    startFirstChallenge: 'ابدأ أول تحدٍّ الآن',
    learningTracksProgress: 'تقدم المجالات والمسارات التعليمية',
    completedChallengesCount: 'تحديات مكتملة',
    viewAllChallenges: 'استكشاف التحديات',
    encouragementNew: 'مرحباً بك في RikouZone! ابدأ اليوم أول خطوة في صقل مهاراتك الرقمية وصناعة المحتوى.',
    encouragementGrowing: 'تقدم رائع! استمرارك اليومي يبني قاعدة معرفية وعملية قوية نحو الاحتراف.',
    encouragementPro: 'أداء استثنائي ومستوى احترافي! التزامك يضعك ضمن نخبة المتعلمين في RikouZone.',
    savedSectionTitle: 'العناصر المحفوظة على جهازك',
    filterAll: 'الكل',
    filterPaths: 'مسارات التعلم',
    filterIdeas: 'أفكار المحتوى',
    profileUpdatedToast: 'تم حفظ بيانات الملف الشخصي بنجاح!',
    photoUploadError: 'يرجى اختيار ملف صورة صالح (JPG, PNG, WebP)'
  },
  ary: {
    tabOverview: 'نظرة عامة والتقدم',
    tabBadges: 'الشارات والإنجازات',
    tabSaved: 'المحفوظات',
    tabSettings: 'الإعدادات والمظهر',
    editProfile: 'تعديل البروفايل',
    saveChanges: 'حفظ التغييرات',
    cancel: 'إلغاء',
    uploadPhoto: 'رفع تصويرة من التيليفون',
    removePhoto: 'رجع التصويرة العادية',
    choosePreset: 'أو ختار أفاتار من المنصة:',
    displayNameLabel: 'السمية اللي كاتبان',
    usernameLabel: 'اسم المستخدم (@)',
    roleLabel: 'التخصص ديالك',
    bioLabel: 'نبذة والهدف ديالك',
    bioPlaceholder: 'كتب سطرين على شنو باغي تتعلم...',
    profileCompletion: 'اكتمال البروفايل',
    completedTasksTitle: 'خطوات إكمال البروفايل:',
    streakTitle: 'السلسلة اليومية',
    daysStreak: 'أيام متابعة',
    xpTitle: 'نقاط XP',
    levelTitle: 'المستوى دابا',
    nextLevel: 'المستوى الجاي',
    remainingXpText: 'باقي ليك باش ترقى',
    badgesTitle: 'الشارات',
    unlockedOf: 'شارات محلولة من',
    recentActivity: 'آخر الأنشطة اللي درتي',
    noActivityYet: 'ما كاين تا نشاط مسجل دابا',
    noActivityDesc: 'دير كويز ولا تمرين ديال اليوم باش تجمع XP وتطور المهارات ديالك.',
    startFirstChallenge: 'بدا أول تحدي دابا',
    learningTracksProgress: 'تقدم المسارات التعليمية',
    completedChallengesCount: 'تحديات مكمولة',
    viewAllChallenges: 'شوف التحديات',
    encouragementNew: 'مرحبا بيك في RikouZone! كولشي كيبدا بخطوة وحدة والتحدي ديال اليوم.',
    encouragementGrowing: 'تبارك الله عليك! الاستمرارية ديالك غادية توصلك لأهدافك.',
    encouragementPro: 'مستوى عالي بزاف! راك من النخبة ديال صناع المحتوى الملتزمين.',
    savedSectionTitle: 'المحفوظات ديالك',
    filterAll: 'الكل',
    filterPaths: 'المسارات',
    filterIdeas: 'الأفكار',
    profileUpdatedToast: 'تم تحديث معلومات البروفايل بنجاح!',
    photoUploadError: 'عافاك ختار فيشي ديال تصويرة صالح'
  },
  en: {
    tabOverview: 'Overview & Progress',
    tabBadges: 'Badges & Achievements',
    tabSaved: 'Saved Items',
    tabSettings: 'Settings & Appearance',
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    uploadPhoto: 'Upload from Gallery',
    removePhoto: 'Reset to Default',
    choosePreset: 'Or select a preset avatar:',
    displayNameLabel: 'Display Name',
    usernameLabel: 'Username (@)',
    roleLabel: 'Role / Specialization',
    bioLabel: 'Bio & Learning Goal',
    bioPlaceholder: 'Briefly describe your digital goals and passions...',
    profileCompletion: 'Profile Completion',
    completedTasksTitle: 'Completion checklist:',
    streakTitle: 'Daily Streak',
    daysStreak: 'consecutive days',
    xpTitle: 'Experience Points (XP)',
    levelTitle: 'Current Level',
    nextLevel: 'Next Level',
    remainingXpText: 'XP needed to rank up',
    badgesTitle: 'Skill Badges',
    unlockedOf: 'badges unlocked of',
    recentActivity: 'Recent Learning Activity',
    noActivityYet: 'No recorded activity yet',
    noActivityDesc: 'Solve daily quizzes and challenges to record genuine progress and earn XP.',
    startFirstChallenge: 'Start First Challenge',
    learningTracksProgress: 'Learning Domains Progress',
    completedChallengesCount: 'completed challenges',
    viewAllChallenges: 'Explore Challenges',
    encouragementNew: 'Welcome to RikouZone! Your digital creator and monetization journey starts today.',
    encouragementGrowing: 'Great momentum! Consistent daily learning compounds into mastery.',
    encouragementPro: 'Outstanding dedication! You are among the top tier learners in RikouZone.',
    savedSectionTitle: 'Items Saved on Device',
    filterAll: 'All',
    filterPaths: 'Learning Paths',
    filterIdeas: 'Content Ideas',
    profileUpdatedToast: 'Profile updated successfully!',
    photoUploadError: 'Please select a valid image file (JPG, PNG, WebP)'
  },
  fr: {
    tabOverview: 'Aperçu & Progression',
    tabBadges: 'Badges & Succès',
    tabSaved: 'Enregistrés',
    tabSettings: 'Paramètres & Thème',
    editProfile: 'Modifier le profil',
    saveChanges: 'Enregistrer',
    cancel: 'Annuler',
    uploadPhoto: 'Télécharger depuis la galerie',
    removePhoto: 'Réinitialiser la photo',
    choosePreset: 'Ou choisissez un avatar officiel :',
    displayNameLabel: 'Nom d’affichage',
    usernameLabel: 'Nom d’utilisateur (@)',
    roleLabel: 'Rôle / Spécialité',
    bioLabel: 'Bio & Objectifs',
    bioPlaceholder: 'Décrivez vos ambitions et compétences ciblées...',
    profileCompletion: 'Profil Complété',
    completedTasksTitle: 'Étapes recommandées :',
    streakTitle: 'Série Quotidienne',
    daysStreak: 'jours consécutifs',
    xpTitle: 'Points d’expérience (XP)',
    levelTitle: 'Niveau Actuel',
    nextLevel: 'Niveau Suivant',
    remainingXpText: 'XP restant pour monter',
    badgesTitle: 'Badges de Compétences',
    unlockedOf: 'badges débloqués sur',
    recentActivity: 'Activité Récente',
    noActivityYet: 'Aucune activité enregistrée',
    noActivityDesc: 'Résolvez des quiz et défis pour valider vos acquis et gagner de l’XP.',
    startFirstChallenge: 'Lancer un défi',
    learningTracksProgress: 'Progression par Domaine',
    completedChallengesCount: 'défis complétés',
    viewAllChallenges: 'Voir les défis',
    encouragementNew: 'Bienvenue sur RikouZone ! Démarrez dès aujourd’hui votre parcours de créateur.',
    encouragementGrowing: 'Très belle progression ! La constance quotidienne fait toute la différence.',
    encouragementPro: 'Engagement exemplaire ! Vous faites partie de l’élite de la communauté.',
    savedSectionTitle: 'Éléments sauvegardés localement',
    filterAll: 'Tous',
    filterPaths: 'Parcours',
    filterIdeas: 'Idées',
    profileUpdatedToast: 'Profil mis à jour avec succès !',
    photoUploadError: 'Veuillez sélectionner une image valide'
  },
  es: {
    tabOverview: 'Resumen y Progreso',
    tabBadges: 'Medallas y Logros',
    tabSaved: 'Guardados',
    tabSettings: 'Ajustes y Apariencia',
    editProfile: 'Editar Perfil',
    saveChanges: 'Guardar Cambios',
    cancel: 'Cancelar',
    uploadPhoto: 'Subir desde la Galería',
    removePhoto: 'Restablecer Foto',
    choosePreset: 'O elige un avatar de la plataforma:',
    displayNameLabel: 'Nombre para Mostrar',
    usernameLabel: 'Nombre de Usuario (@)',
    roleLabel: 'Rol / Especialidad',
    bioLabel: 'Biografía y Objetivo',
    bioPlaceholder: 'Describe brevemente tus intereses y metas...',
    profileCompletion: 'Perfil Completado',
    completedTasksTitle: 'Lista de verificación:',
    streakTitle: 'Racha Diaria',
    daysStreak: 'días consecutivos',
    xpTitle: 'Puntos de Experiencia (XP)',
    levelTitle: 'Nivel Actual',
    nextLevel: 'Siguiente Nivel',
    remainingXpText: 'XP restante para subir',
    badgesTitle: 'Insignias de Habilidad',
    unlockedOf: 'insignias de',
    recentActivity: 'Actividad Reciente',
    noActivityYet: 'Sin actividad registrada aún',
    noActivityDesc: 'Completa desafíos y cuestionarios para registrar tu progreso real.',
    startFirstChallenge: 'Empezar Desafío',
    learningTracksProgress: 'Progreso por Campos',
    completedChallengesCount: 'desafíos completados',
    viewAllChallenges: 'Ver Desafíos',
    encouragementNew: '¡Bienvenido a RikouZone! Da tu primer paso hoy como creador digital.',
    encouragementGrowing: '¡Gran impulso! La consistencia diaria construye maestría.',
    encouragementPro: '¡Dedicación extraordinaria! Eres de los alumnos más avanzados.',
    savedSectionTitle: 'Elementos guardados en el dispositivo',
    filterAll: 'Todos',
    filterPaths: 'Rutas',
    filterIdeas: 'Ideas',
    profileUpdatedToast: '¡Perfil actualizado con éxito!',
    photoUploadError: 'Selecciona una imagen válida'
  },
  de: {
    tabOverview: 'Übersicht & Fortschritt',
    tabBadges: 'Abzeichen & Erfolge',
    tabSaved: 'Gespeichert',
    tabSettings: 'Einstellungen',
    editProfile: 'Profil bearbeiten',
    saveChanges: 'Speichern',
    cancel: 'Abbrechen',
    uploadPhoto: 'Aus Galerie hochladen',
    removePhoto: 'Standard wiederherstellen',
    choosePreset: 'Oder Vorlage wählen:',
    displayNameLabel: 'Anzeigename',
    usernameLabel: 'Benutzername (@)',
    roleLabel: 'Rolle / Spezialisierung',
    bioLabel: 'Biografie & Lernziel',
    bioPlaceholder: 'Kurze Beschreibung deiner digitalen Ziele...',
    profileCompletion: 'Profil-Vollständigkeit',
    completedTasksTitle: 'Schritte:',
    streakTitle: 'Tägliche Serie',
    daysStreak: 'Tage in Folge',
    xpTitle: 'Erfahrungspunkte (XP)',
    levelTitle: 'Aktuelles Level',
    nextLevel: 'Nächstes Level',
    remainingXpText: 'XP bis zum nächsten Level',
    badgesTitle: 'Abzeichen',
    unlockedOf: 'Abzeichen freigeschaltet von',
    recentActivity: 'Letzte Aktivitäten',
    noActivityYet: 'Noch keine Aktivität erfasst',
    noActivityDesc: 'Löse tägliche Quizze und Herausforderungen für echten Fortschritt.',
    startFirstChallenge: 'Erste Challenge starten',
    learningTracksProgress: 'Fortschritt der Lernbereiche',
    completedChallengesCount: 'abgeschlossene Aufgaben',
    viewAllChallenges: 'Challenges ansehen',
    encouragementNew: 'Willkommen bei RikouZone! Dein Weg startet mit der ersten Übung.',
    encouragementGrowing: 'Toller Fortschritt! Tägliches Lernen führt zum Erfolg.',
    encouragementPro: 'Hervorragendes Engagement! Du gehörst zu den Besten.',
    savedSectionTitle: 'Gespeicherte Inhalte',
    filterAll: 'Alle',
    filterPaths: 'Lernpfade',
    filterIdeas: 'Ideen',
    profileUpdatedToast: 'Profil erfolgreich gespeichert!',
    photoUploadError: 'Bitte gültiges Bild auswählen'
  },
  it: {
    tabOverview: 'Panoramica & Progresso',
    tabBadges: 'Distintivi & Traguardi',
    tabSaved: 'Salvati',
    tabSettings: 'Impostazioni & Aspetto',
    editProfile: 'Modifica Profilo',
    saveChanges: 'Salva Modifiche',
    cancel: 'Annulla',
    uploadPhoto: 'Carica dalla Galleria',
    removePhoto: 'Ripristina Predefinito',
    choosePreset: 'Oppure scegli un avatar:',
    displayNameLabel: 'Nome Visualizzato',
    usernameLabel: 'Nome Utente (@)',
    roleLabel: 'Ruolo / Specializzazione',
    bioLabel: 'Bio & Obiettivi',
    bioPlaceholder: 'Descrivi le tue mete digitali...',
    profileCompletion: 'Completamento Profilo',
    completedTasksTitle: 'Passaggi:',
    streakTitle: 'Serie Giornaliera',
    daysStreak: 'giorni consecutivi',
    xpTitle: 'Punti Esperienza (XP)',
    levelTitle: 'Livello Attuale',
    nextLevel: 'Livello Successivo',
    remainingXpText: 'XP mancanti al livello',
    badgesTitle: 'Distintivi',
    unlockedOf: 'distintivi sbloccati su',
    recentActivity: 'Attività Recente',
    noActivityYet: 'Nessuna attività registrata',
    noActivityDesc: 'Completa quiz e compiti per accumulare XP reali.',
    startFirstChallenge: 'Inizia la Sfida',
    learningTracksProgress: 'Progresso delle Aree',
    completedChallengesCount: 'sfide completate',
    viewAllChallenges: 'Vedi le sfide',
    encouragementNew: 'Benvenuto su RikouZone! Il tuo viaggio inizia oggi.',
    encouragementGrowing: 'Ottimo ritmo! La costanza quotidiana crea eccellenza.',
    encouragementPro: 'Dedizione straordinaria! Sei tra i migliori studenti.',
    savedSectionTitle: 'Elementi Salvati',
    filterAll: 'Tutti',
    filterPaths: 'Percorsi',
    filterIdeas: 'Idee',
    profileUpdatedToast: 'Profilo salvato con successo!',
    photoUploadError: 'Seleziona un’immagine valida'
  },
  pt: {
    tabOverview: 'Visão Geral & Progresso',
    tabBadges: 'Emblemas & Conquistas',
    tabSaved: 'Salvos',
    tabSettings: 'Configurações',
    editProfile: 'Editar Perfil',
    saveChanges: 'Salvar Alterações',
    cancel: 'Cancelar',
    uploadPhoto: 'Carregar da Galeria',
    removePhoto: 'Restaurar Padrão',
    choosePreset: 'Ou selecione um avatar:',
    displayNameLabel: 'Nome de Exibição',
    usernameLabel: 'Nome de Usuário (@)',
    roleLabel: 'Função / Especialidade',
    bioLabel: 'Biografia & Objetivo',
    bioPlaceholder: 'Descreva seus objetivos digitais...',
    profileCompletion: 'Perfil Concluído',
    completedTasksTitle: 'Checklist:',
    streakTitle: 'Sequência Diária',
    daysStreak: 'dias seguidos',
    xpTitle: 'Pontos de Experiência (XP)',
    levelTitle: 'Nível Atual',
    nextLevel: 'Próximo Nível',
    remainingXpText: 'XP restante para subir',
    badgesTitle: 'Emblemas',
    unlockedOf: 'emblemas liberados de',
    recentActivity: 'Atividade Recente',
    noActivityYet: 'Nenhuma atividade registrada',
    noActivityDesc: 'Resolva desafios e testes para acumular XP real.',
    startFirstChallenge: 'Iniciar Desafio',
    learningTracksProgress: 'Progresso das Trilhas',
    completedChallengesCount: 'desafios concluídos',
    viewAllChallenges: 'Ver Desafios',
    encouragementNew: 'Bem-vindo ao RikouZone! O início da sua jornada digital.',
    encouragementGrowing: 'Excelente ritmo! O aprendizado diário constrói o sucesso.',
    encouragementPro: 'Dedicação de elite! Você está entre os melhores.',
    savedSectionTitle: 'Itens Salvos no Dispositivo',
    filterAll: 'Todos',
    filterPaths: 'Trilhas',
    filterIdeas: 'Ideias',
    profileUpdatedToast: 'Perfil atualizado com sucesso!',
    photoUploadError: 'Selecione uma imagem válida'
  },
  zh: {
    tabOverview: '概览与进度',
    tabBadges: '勋章与成就',
    tabSaved: '收藏内容',
    tabSettings: '设置与外观',
    editProfile: '编辑个人资料',
    saveChanges: '保存更改',
    cancel: '取消',
    uploadPhoto: '从本地相册上传',
    removePhoto: '恢复默认头像',
    choosePreset: '或选择官方预设头像：',
    displayNameLabel: '显示名称',
    usernameLabel: '用户名 (@)',
    roleLabel: '职业定位 / 方向',
    bioLabel: '个人简介与学习目标',
    bioPlaceholder: '简要描述您的数字创作与技能目标...',
    profileCompletion: '资料完整度',
    completedTasksTitle: '完成清单：',
    streakTitle: '每日连续打卡',
    daysStreak: '连续天数',
    xpTitle: '经验值 (XP)',
    levelTitle: '当前等级',
    nextLevel: '下一等级',
    remainingXpText: '升级还需 XP',
    badgesTitle: '成就勋章',
    unlockedOf: '个已解锁 / 共',
    recentActivity: '最近学习活动',
    noActivityYet: '暂无学习记录',
    noActivityDesc: '完成每日测验与实操挑战即可积累真实的经验值与记录。',
    startFirstChallenge: '立即开始第一项挑战',
    learningTracksProgress: '各学习领域完成进度',
    completedChallengesCount: '已完成挑战',
    viewAllChallenges: '查看挑战',
    encouragementNew: '欢迎来到 RikouZone！迈出数字技能与内容变现的第一步。',
    encouragementGrowing: '势头强劲！每日持续练习将积累巨大优势。',
    encouragementPro: '成就卓越！您已跻身 RikouZone 的顶尖学习者行列。',
    savedSectionTitle: '本地设备已保存内容',
    filterAll: '全部',
    filterPaths: '学习路径',
    filterIdeas: '内容创意',
    profileUpdatedToast: '个人资料保存成功！',
    photoUploadError: '请选择有效的图片文件 (JPG, PNG, WebP)'
  }
};

// Map of badge icon names to Lucide icons
const badgeIconMap: Record<string, React.ElementType> = {
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

const badgeTabI18n: Record<string, {
  subtitle: string;
  unlockedLabel: string;
  lockedLabel: string;
  filterAll: string;
  filterUnlocked: string;
  filterLocked: string;
  catAll: string;
  catLearning: string;
  catStreak: string;
  catChallenges: string;
  catXp: string;
  catPaths: string;
  catSpecial: string;
  progressLabel: string;
  bonusXpLabel: string;
  all30Title: string;
}> = {
  ar: {
    subtitle: 'أوسمة وشارات استحقاق تفتح تلقائياً عند إنجاز شروط التعلّم الحقيقية.',
    unlockedLabel: 'مكتسبة',
    lockedLabel: 'مقفلة',
    filterAll: 'الكل',
    filterUnlocked: 'المكتسبة',
    filterLocked: 'المقفلة',
    catAll: 'الكل (30)',
    catLearning: 'التعلّم والدروس',
    catStreak: 'الاستمرارية',
    catChallenges: 'التحديات',
    catXp: 'نقاط XP',
    catPaths: 'المسارات',
    catSpecial: 'إنجازات خاصة',
    progressLabel: 'التقدم',
    bonusXpLabel: 'إجمالي مكافآت XP المكتسبة:',
    all30Title: 'لوحة الشارات الثلاثين الكاملة'
  },
  ary: {
    subtitle: 'أوسمة وشارات استحقاق كتحل تلقائياً فاش كتحقق شروط التعلم الحقيقية.',
    unlockedLabel: 'مكتسبة',
    lockedLabel: 'مقفولة',
    filterAll: 'الكل',
    filterUnlocked: 'المكتسبة',
    filterLocked: 'المقفولة',
    catAll: 'الكل (30)',
    catLearning: 'التعلم والدروس',
    catStreak: 'الاستمرارية',
    catChallenges: 'التحديات',
    catXp: 'نقاط XP',
    catPaths: 'المسارات',
    catSpecial: 'إنجازات خاصة',
    progressLabel: 'التقدم',
    bonusXpLabel: 'مجموع مكافآت XP المكتسبة:',
    all30Title: 'لوحة الشارات 30 كاملة'
  },
  en: {
    subtitle: 'Merit badges automatically unlocked upon completing real learning milestones.',
    unlockedLabel: 'Unlocked',
    lockedLabel: 'Locked',
    filterAll: 'All',
    filterUnlocked: 'Unlocked',
    filterLocked: 'Locked',
    catAll: 'All (30)',
    catLearning: 'Learning & Lessons',
    catStreak: 'Streak & Habits',
    catChallenges: 'Challenges',
    catXp: 'XP Milestones',
    catPaths: 'Learning Paths',
    catSpecial: 'Special Feats',
    progressLabel: 'Progress',
    bonusXpLabel: 'Total Bonus XP Earned:',
    all30Title: 'All 30 RikouZone Badges'
  },
  fr: {
    subtitle: 'Badges de mérite débloqués automatiquement selon vos réussites réelles.',
    unlockedLabel: 'Débloqué',
    lockedLabel: 'Verrouillé',
    filterAll: 'Tous',
    filterUnlocked: 'Débloqués',
    filterLocked: 'Verrouillés',
    catAll: 'Tous (30)',
    catLearning: 'Apprentissage',
    catStreak: 'Série & Richesse',
    catChallenges: 'Défis',
    catXp: 'Jalons XP',
    catPaths: 'Parcours',
    catSpecial: 'Succès Spéciaux',
    progressLabel: 'Progression',
    bonusXpLabel: 'Total XP bonus gagné :',
    all30Title: 'Les 30 Badges RikouZone'
  },
  es: {
    subtitle: 'Insignias de mérito desbloqueadas automáticamente al completar hitos reales.',
    unlockedLabel: 'Desbloqueado',
    lockedLabel: 'Bloqueado',
    filterAll: 'Todos',
    filterUnlocked: 'Desbloqueadas',
    filterLocked: 'Bloqueadas',
    catAll: 'Todos (30)',
    catLearning: 'Aprendizaje',
    catStreak: 'Racha Continua',
    catChallenges: 'Desafíos',
    catXp: 'Hitos XP',
    catPaths: 'Rutas',
    catSpecial: 'Logros Especiales',
    progressLabel: 'Progreso',
    bonusXpLabel: 'Total XP extra ganado:',
    all30Title: 'Las 30 Insignias de RikouZone'
  },
  de: {
    subtitle: 'Leistungsabzeichen werden bei echten Lernmeilensteinen automatisch freigeschaltet.',
    unlockedLabel: 'Freigeschaltet',
    lockedLabel: 'Gesperrt',
    filterAll: 'Alle',
    filterUnlocked: 'Freigeschaltet',
    filterLocked: 'Gesperrt',
    catAll: 'Alle (30)',
    catLearning: 'Lernen & Lektionen',
    catStreak: 'Serie & Disziplin',
    catChallenges: 'Herausforderungen',
    catXp: 'XP-Meilensteine',
    catPaths: 'Lernpfade',
    catSpecial: 'Besondere Erfolge',
    progressLabel: 'Fortschritt',
    bonusXpLabel: 'Gesamte Bonus-XP:',
    all30Title: 'Alle 30 RikouZone-Abzeichen'
  },
  it: {
    subtitle: 'Distintivi di merito sbloccati automaticamente al completamento dei traguardi reali.',
    unlockedLabel: 'Sbloccato',
    lockedLabel: 'Bloccato',
    filterAll: 'Tutti',
    filterUnlocked: 'Sbloccati',
    filterLocked: 'Bloccati',
    catAll: 'Tutti (30)',
    catLearning: 'Apprendimento',
    catStreak: 'Serie Continua',
    catChallenges: 'Sfide',
    catXp: 'Traguardi XP',
    catPaths: 'Percorsi',
    catSpecial: 'Traguardi Speciali',
    progressLabel: 'Progresso',
    bonusXpLabel: 'XP bonus totali guadagnati:',
    all30Title: 'Tutti i 30 Distintivi RikouZone'
  },
  pt: {
    subtitle: 'Emblemas de mérito desbloqueados automaticamente ao completar marcos reais.',
    unlockedLabel: 'Desbloqueado',
    lockedLabel: 'Bloqueado',
    filterAll: 'Todos',
    filterUnlocked: 'Desbloqueados',
    filterLocked: 'Bloqueados',
    catAll: 'Todos (30)',
    catLearning: 'Aprendizado',
    catStreak: 'Sequência',
    catChallenges: 'Desafios',
    catXp: 'Marcos XP',
    catPaths: 'Trilhas',
    catSpecial: 'Conquistas Especiais',
    progressLabel: 'Progresso',
    bonusXpLabel: 'Total de XP bônus conquistado:',
    all30Title: 'Todos os 30 Emblemas RikouZone'
  },
  zh: {
    subtitle: '达成真实的学习里程碑后自动点亮荣誉徽章。',
    unlockedLabel: '已解锁',
    lockedLabel: '未解锁',
    filterAll: '全部',
    filterUnlocked: '已解锁',
    filterLocked: '未解锁',
    catAll: '全部 (30)',
    catLearning: '学习与课程',
    catStreak: '连续打卡',
    catChallenges: '实战挑战',
    catXp: '经验值里程碑',
    catPaths: '学习路径',
    catSpecial: '特别成就',
    progressLabel: '进度',
    bonusXpLabel: '累计获得奖励经验：',
    all30Title: 'RikouZone 全部 30 枚勋章'
  }
};

export const ProfileView: React.FC<ProfileViewProps> = ({
  savedIds,
  onToggleSave,
  onClearAllSaved,
  onSelectPath,
  onSelectIdea,
  onCopyText,
  onNavigate
}) => {
  const { language, setLanguage, languages, t, isRTL, localizePath, localizeIdea } = useLanguage();
  const { theme, setTheme, isDark } = useTheme();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const labels = profileI18n[language] || profileI18n.ar;

  // Active Tab within Profile view
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'saved' | 'settings'>('overview');
  const [savedFilter, setSavedFilter] = useState<'all' | 'paths' | 'ideas'>('all');
  const [badgeCategoryFilter, setBadgeCategoryFilter] = useState<'all' | 'learning' | 'streak' | 'challenges' | 'xp' | 'paths' | 'special'>('all');
  const [badgeStatusFilter, setBadgeStatusFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedDetailBadge, setSelectedDetailBadge] = useState<BadgeItem | null>(null);

  // User Profile Data state (persisted locally in localStorage)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => getStoredUserProfile());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>(userProfile);
  const [uploadError, setUploadError] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [statusNotification, setStatusNotification] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // User Progression & Challenges state from localStorage
  const [userChallengeState, setUserChallengeState] = useState<ChallengeUserState>(() => getInitialUserState());
  const { balance: rkoBalance } = useRkoWallet();
  const levelInfo = useMemo(() => calculateLevelAndProgress(userChallengeState.totalXp), [userChallengeState.totalXp]);

  // Global learning statistics (lessons, paths, quizzes, streaks)
  const globalStats = useMemo(() => getGlobalLearningStats(userChallengeState), [userChallengeState]);

  // Check and award any newly eligible badges automatically (idempotent, single-time award)
  useEffect(() => {
    const { newlyUnlockedBadges, bonusXpTotal } = checkBadgesEligibility(userChallengeState);
    if (newlyUnlockedBadges.length > 0) {
      const todayStr = new Date().toISOString().split('T')[0];
      const timeStr = new Date().toLocaleTimeString();
      const updatedBadgeIds = [...userChallengeState.unlockedBadgeIds, ...newlyUnlockedBadges.map(b => b.id)];
      const updatedHistory: XpHistoryEntry[] = [
        ...newlyUnlockedBadges.map(b => ({
          id: `badge-${b.id}-${Date.now()}`,
          title: `شارة جديدة: ${isRTL ? b.nameAr : b.name}`,
          xp: b.xpBonus,
          date: todayStr,
          time: timeStr,
          type: 'badge' as const
        })),
        ...userChallengeState.history
      ];
      const updatedState: ChallengeUserState = {
        ...userChallengeState,
        totalXp: userChallengeState.totalXp + bonusXpTotal,
        unlockedBadgeIds: updatedBadgeIds,
        history: updatedHistory
      };
      setUserChallengeState(updatedState);
      saveUserState(updatedState);
    }
  }, []);

  // Listen to learning events across platform to sync badge progress in real-time
  useEffect(() => {
    const handleUpdate = () => {
      const fresh = getInitialUserState();
      const { newlyUnlockedBadges, bonusXpTotal } = checkBadgesEligibility(fresh);
      if (newlyUnlockedBadges.length > 0) {
        const todayStr = new Date().toISOString().split('T')[0];
        const timeStr = new Date().toLocaleTimeString();
        const updatedBadgeIds = [...fresh.unlockedBadgeIds, ...newlyUnlockedBadges.map(b => b.id)];
        const updatedHistory: XpHistoryEntry[] = [
          ...newlyUnlockedBadges.map(b => ({
            id: `badge-${b.id}-${Date.now()}`,
            title: `شارة جديدة: ${isRTL ? b.nameAr : b.name}`,
            xp: b.xpBonus,
            date: todayStr,
            time: timeStr,
            type: 'badge' as const
          })),
          ...fresh.history
        ];
        const updatedState: ChallengeUserState = {
          ...fresh,
          totalXp: fresh.totalXp + bonusXpTotal,
          unlockedBadgeIds: updatedBadgeIds,
          history: updatedHistory
        };
        setUserChallengeState(updatedState);
        saveUserState(updatedState);
      } else {
        setUserChallengeState(fresh);
      }
    };

    window.addEventListener('rz_xp_updated', handleUpdate);
    window.addEventListener('rz_lesson_completed', handleUpdate);
    window.addEventListener('rz_track_started', handleUpdate);
    window.addEventListener('rz_track_completed', handleUpdate);
    window.addEventListener('rz_perfect_quiz', handleUpdate);
    return () => {
      window.removeEventListener('rz_xp_updated', handleUpdate);
      window.removeEventListener('rz_lesson_completed', handleUpdate);
      window.removeEventListener('rz_track_started', handleUpdate);
      window.removeEventListener('rz_track_completed', handleUpdate);
      window.removeEventListener('rz_perfect_quiz', handleUpdate);
    };
  }, [isRTL]);

  // Real Badges calculation
  const badgesList = useMemo(() => {
    return allBadgesList.map(badge => ({
      ...badge,
      isUnlocked: userChallengeState.unlockedBadgeIds.includes(badge.id)
    }));
  }, [userChallengeState.unlockedBadgeIds]);

  const unlockedBadgesCount = useMemo(() => {
    return badgesList.filter(b => b.isUnlocked).length;
  }, [badgesList]);

  // Total XP earned strictly from unlocked badges
  const totalBadgeXpEarned = useMemo(() => {
    return badgesList
      .filter(b => b.isUnlocked)
      .reduce((sum, b) => sum + (b.xpBonus || 0), 0);
  }, [badgesList]);

  // Filtered badges list for Badges Tab
  const filteredBadgesList = useMemo(() => {
    return badgesList.filter(badge => {
      if (badgeCategoryFilter !== 'all' && badge.category !== badgeCategoryFilter) {
        return false;
      }
      if (badgeStatusFilter === 'unlocked' && !badge.isUnlocked) {
        return false;
      }
      if (badgeStatusFilter === 'locked' && badge.isUnlocked) {
        return false;
      }
      return true;
    });
  }, [badgesList, badgeCategoryFilter, badgeStatusFilter]);

  // Saved Items calculation
  const savedPaths = useMemo(() => incomePaths.filter((p) => savedIds.includes(p.id)), [savedIds]);
  const savedIdeas = useMemo(() => contentIdeas.filter((i) => savedIds.includes(i.id)), [savedIds]);

  // Profile Completion indicator
  const completionInfo = useMemo(() => {
    return calculateProfileCompletion(userProfile, {
      savedCount: savedIds.length,
      completedCount: userChallengeState.completedChallengeIds.length
    });
  }, [userProfile, savedIds.length, userChallengeState.completedChallengeIds.length]);

  // Domain / Learning Fields real progress mapping
  const learningFieldsProgress = useMemo(() => {
    const fields = [
      {
        id: 'content-video',
        titleAr: 'صناعة المحتوى والفيديو',
        titleEn: 'Video & Content Creation',
        domains: ['video', 'youtube', 'contentCreation'],
        actionTab: 'video-editing',
        totalTarget: 6
      },
      {
        id: 'copywriting-writing',
        titleAr: 'كتابة الإعلانات والمحتوى',
        titleEn: 'Copywriting & Freelance Writing',
        domains: ['copywriting', 'writing'],
        actionTab: 'copywriting',
        totalTarget: 5
      },
      {
        id: 'digital-templates',
        titleAr: 'المنتجات الرقمية والقوالب',
        titleEn: 'Digital Products & Templates',
        domains: ['templates', 'notion', 'ecommerce'],
        actionTab: 'selling-digital-products',
        totalTarget: 6
      },
      {
        id: 'ai-automation',
        titleAr: 'الذكاء الاصطناعي والأتمتة',
        titleEn: 'AI & Automation Agency',
        domains: ['ai'],
        actionTab: 'ai-content-services',
        totalTarget: 5
      },
      {
        id: 'affiliate-marketing',
        titleAr: 'التسويق بالعمولة والنمو',
        titleEn: 'Affiliate Marketing & Growth',
        domains: ['affiliate', 'marketing'],
        actionTab: 'affiliate',
        totalTarget: 5
      },
      {
        id: 'seo-tech',
        titleAr: 'تحسين محركات البحث وتطوير الويب',
        titleEn: 'SEO & Web Development',
        domains: ['seo', 'techAi'],
        actionTab: 'seo-services',
        totalTarget: 5
      }
    ];

    // Compute completed tasks count for each domain based on user's real history or completed IDs
    return fields.map(field => {
      // Look in challenge history
      const historyHits = userChallengeState.history.filter(h => {
        // check if challenge ID matches known tasks in daily or weekly pools
        const task = [...dailyChallengePool, ...weeklyChallengePool].find(t => t.id === h.id || t.title === h.title);
        return task && field.domains.includes(task.domain);
      }).length;

      // Also count saved items in matching categories
      const savedMatching = savedPaths.filter(p => field.domains.includes(p.category)).length;

      const completedUnits = historyHits + savedMatching;
      const progressPercent = Math.min(100, Math.round((completedUnits / field.totalTarget) * 100));

      return {
        ...field,
        title: isRTL ? field.titleAr : field.titleEn,
        completedUnits,
        progressPercent
      };
    });
  }, [userChallengeState, savedPaths, isRTL]);

  // Encouraging Message based on real progress
  const encouragingMessage = useMemo(() => {
    if (userChallengeState.totalXp === 0 && userChallengeState.streakCount === 0) {
      return labels.encouragementNew;
    } else if (userChallengeState.totalXp < 300) {
      return `${labels.encouragementGrowing} (${userChallengeState.totalXp} XP · ${userChallengeState.streakCount} ${labels.daysStreak})`;
    } else {
      return `${labels.encouragementPro} (${userChallengeState.totalXp} XP · ${levelInfo.levelTitle})`;
    }
  }, [userChallengeState.totalXp, userChallengeState.streakCount, labels, levelInfo.levelTitle]);

  // Handle open edit modal
  const handleOpenEditModal = () => {
    setEditForm({ ...userProfile });
    setUploadError('');
    setIsEditModalOpen(true);
  };

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadError('');
      const base64Data = await processUploadedImage(file);
      setEditForm(prev => ({
        ...prev,
        avatarUrl: base64Data,
        avatarType: 'custom',
        selectedPresetId: ''
      }));
    } catch (err: any) {
      setUploadError(err.message || labels.photoUploadError);
    }
  };

  // Handle preset avatar selection
  const handleSelectPreset = (preset: typeof AVATAR_PRESETS[0]) => {
    setEditForm(prev => ({
      ...prev,
      avatarUrl: preset.url,
      avatarType: 'preset',
      selectedPresetId: preset.id
    }));
  };

  // Handle remove custom photo
  const handleRemovePhoto = () => {
    setEditForm(prev => ({
      ...prev,
      avatarUrl: DEFAULT_USER_PROFILE.avatarUrl,
      avatarType: 'preset',
      selectedPresetId: DEFAULT_USER_PROFILE.selectedPresetId
    }));
  };

  // Handle save profile changes
  const handleSaveProfile = () => {
    setIsSaving(true);
    const updated: UserProfile = {
      ...editForm,
      displayName: editForm.displayName.trim() || DEFAULT_USER_PROFILE.displayName,
      username: editForm.username.trim().startsWith('@') 
        ? editForm.username.trim() 
        : `@${editForm.username.trim() || 'rikou_creator'}`
    };

    saveStoredUserProfile(updated);
    setUserProfile(updated);
    setIsSaving(false);
    setIsEditModalOpen(false);

    setStatusNotification(labels.profileUpdatedToast);
    setTimeout(() => {
      setStatusNotification('');
    }, 3500);
  };

  return (
    <div className="mx-auto max-w-5xl px-3 sm:px-6 py-6 pb-24 lg:pb-12 text-slate-900 dark:text-zinc-100">

      {/* Floating Status Notification */}
      {statusNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl border border-amber-500/40 bg-white/95 dark:bg-zinc-950/95 px-4 py-2.5 text-xs font-bold text-amber-600 dark:text-amber-300 shadow-xl shadow-slate-200/50 dark:shadow-black backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-4 w-4 text-amber-500 dark:text-amber-400" />
          <span>{statusNotification}</span>
        </div>
      )}

      {/* =========================================================================
          1. PREMIUM PROFILE HEADER (Branded, Modern, Responsive, Obsidian & Amber)
         ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-b from-amber-50/70 via-white to-orange-50/40 dark:from-zinc-900/90 dark:via-[#0a0a0d] dark:to-zinc-950 p-5 sm:p-7 shadow-xl shadow-slate-200/60 dark:shadow-2xl backdrop-blur-2xl">
        {/* Subtle background ambient glow */}
        <div className="pointer-events-none absolute -top-24 right-1/4 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Avatar and Info Block */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start gap-4 sm:gap-5 min-w-0">
            
            {/* Avatar with Camera Trigger */}
            <div className="relative group shrink-0">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl border-2 border-amber-500/50 bg-white dark:bg-zinc-950 p-1 shadow-lg shadow-amber-500/15 group-hover:border-amber-400 transition-all">
                <img
                  src={userProfile.avatarUrl || '/file_00000000b1d881f496a6612e6eef85ce.png'}
                  onError={(e) => {
                    e.currentTarget.src = '/assets/rz-hero-badge.png';
                  }}
                  alt={userProfile.displayName}
                  className="h-full w-full object-cover rounded-xl select-none"
                  width={96}
                  height={96}
                />
              </div>

              {/* Online Verified Status Check */}
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-[10px] font-black text-black shadow-md border-2 border-white dark:border-zinc-950">
                ✓
              </span>

              {/* Quick Camera Edit Overlay Button */}
              <button
                type="button"
                onClick={handleOpenEditModal}
                className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-amber-400"
                title={labels.editProfile}
                aria-label={labels.editProfile}
              >
                <Camera className="h-6 w-6" />
              </button>
            </div>

            {/* User Credentials & Bio */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {userProfile.displayName}
                </h1>
                <span className="rounded-full bg-amber-500/15 dark:bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/30 font-sans">
                  PRO CREATOR
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-600 dark:text-zinc-400 font-mono">
                <span className="text-amber-600 dark:text-amber-400 font-bold">{userProfile.username}</span>
                <span className="text-slate-400 dark:text-zinc-600">·</span>
                <span className="text-slate-700 dark:text-zinc-300 font-sans">{userProfile.roleTitle}</span>
                <span className="text-slate-400 dark:text-zinc-600">·</span>
                <span className="text-slate-500 dark:text-zinc-400 font-sans">RikouZone 2026</span>
              </div>

              {userProfile.bio && (
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 max-w-xl line-clamp-2 italic">
                  "{userProfile.bio}"
                </p>
              )}
            </div>
          </div>

          {/* Edit Profile Button & Quick Overview Pills */}
          <div className="flex flex-col sm:flex-row md:flex-col items-center sm:justify-center md:items-end gap-3 shrink-0">
            <button
              onClick={handleOpenEditModal}
              id="edit-profile-btn"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-50/80 dark:bg-zinc-900/90 hover:bg-amber-100 dark:hover:bg-zinc-800 hover:border-amber-400 px-4 py-2 text-xs font-bold text-amber-700 dark:text-amber-300 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>{labels.editProfile}</span>
            </button>

            {/* Quick Metrics Bar in Header */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <div 
                onClick={() => onNavigate('wallet')}
                title="عرض محفظة RKO وتفاصيل الرصيد"
                className="rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 text-center shadow-sm dark:shadow-none cursor-pointer transition-all active:scale-95 group"
              >
                <div className="text-xs font-black text-amber-600 dark:text-amber-400 font-sans flex items-center justify-center gap-1">
                  <RkoCoinLogo size="xs" />
                  <span>{rkoBalance}</span>
                  <span className="text-[10px]">RKO</span>
                </div>
                <div className="text-[9px] text-amber-700 dark:text-amber-400/90 font-bold group-hover:underline">محفظة RKO</div>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/70 px-3 py-1.5 text-center shadow-sm dark:shadow-none">
                <div className="text-xs font-black text-amber-600 dark:text-amber-400 font-sans">{userChallengeState.totalXp} XP</div>
                <div className="text-[9px] text-slate-500 dark:text-zinc-400">{labels.levelTitle} {levelInfo.currentLevel}</div>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/70 px-3 py-1.5 text-center shadow-sm dark:shadow-none">
                <div className="text-xs font-black text-orange-600 dark:text-orange-400 font-sans">{userChallengeState.streakCount} 🔥</div>
                <div className="text-[9px] text-slate-500 dark:text-zinc-400">{labels.streakTitle}</div>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/70 px-3 py-1.5 text-center shadow-sm dark:shadow-none">
                <div className="text-xs font-black text-sky-600 dark:text-sky-400 font-sans">{savedIds.length}</div>
                <div className="text-[9px] text-slate-500 dark:text-zinc-400">{labels.tabSaved}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Completion Indicator */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-zinc-800/70">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-500 dark:text-amber-400" />
              <span className="font-bold text-slate-800 dark:text-zinc-200">{labels.profileCompletion}:</span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{completionInfo.percentage}%</span>
            </div>
            
            <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-zinc-400">
              {completionInfo.completedTasks.map(task => (
                <span 
                  key={task.id} 
                  className={`inline-flex items-center gap-1 ${task.done ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-slate-400 dark:text-zinc-500 line-through'}`}
                >
                  <span>{task.done ? '✓' : '○'}</span>
                  <span>{task.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 dark:bg-zinc-800/80 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
              style={{ width: `${completionInfo.percentage}%` }}
            />
          </div>
        </div>

      </div>


      {/* =========================================================================
          2. ENCOURAGEMENT BANNER (Dynamic & Real, based on genuine stats)
         ========================================================================= */}
      <div className="mt-4 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/40 px-4 py-3 text-xs flex items-center justify-between gap-3 text-slate-700 dark:text-zinc-300 shadow-sm dark:shadow-none">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-4 w-4 text-amber-500 dark:text-amber-400 shrink-0" />
          <span>{encouragingMessage}</span>
        </div>
        <button
          onClick={() => onNavigate('challenges')}
          className="shrink-0 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-bold text-[11px] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>{labels.viewAllChallenges}</span>
          <ArrowIcon className="h-3 w-3" />
        </button>
      </div>


      {/* =========================================================================
          3. TAB NAVIGATION (Overview, Badges, Saved, Settings)
         ========================================================================= */}
      <div className="mt-6 flex items-center gap-1.5 p-1 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/70 overflow-x-auto shadow-sm dark:shadow-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-md shadow-amber-500/20'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/60'
          }`}
        >
          <TrendingUp className="h-3.5 w-3.5" />
          <span>{labels.tabOverview}</span>
        </button>

        <button
          onClick={() => setActiveTab('badges')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'badges'
              ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-md shadow-amber-500/20'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/60'
          }`}
        >
          <Trophy className="h-3.5 w-3.5" />
          <span>{labels.tabBadges} ({unlockedBadgesCount}/{badgesList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'saved'
              ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-md shadow-amber-500/20'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/60'
          }`}
        >
          <Bookmark className="h-3.5 w-3.5" />
          <span>{labels.tabSaved} ({savedIds.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'settings'
              ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-md shadow-amber-500/20'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/60'
          }`}
        >
          <Globe className="h-3.5 w-3.5" />
          <span>{labels.tabSettings}</span>
        </button>
      </div>


      {/* =========================================================================
          4. TAB CONTENT: OVERVIEW & LEARNING PROGRESS
         ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="mt-6 space-y-6 animate-in fade-in duration-200">
          
          {/* Top Progression Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Level & XP Progress Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-amber-500/30 bg-white dark:bg-gradient-to-br dark:from-zinc-900/90 dark:via-zinc-950 dark:to-zinc-950 p-4 sm:p-5 flex flex-col justify-between shadow-sm dark:shadow-none">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{labels.levelTitle} {levelInfo.currentLevel}</span>
                  <span className="font-mono text-slate-500 dark:text-zinc-400 font-bold">{userChallengeState.totalXp} XP</span>
                </div>
                <h3 className="mt-1 text-base font-black text-slate-900 dark:text-white">{levelInfo.levelTitle}</h3>
                
                {/* Progress bar to next level */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 mb-1.5 font-sans">
                    <span>{levelInfo.progressPercent}% نحو المستوى القادم</span>
                    <span>{levelInfo.remainingXp} XP {labels.remainingXpText}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400"
                      style={{ width: `${levelInfo.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-zinc-400">الهدف: المستوى {levelInfo.currentLevel + 1}</span>
                <button
                  onClick={() => onNavigate('challenges')}
                  className="text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>كسب XP</span>
                  <ArrowIcon className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Daily Streak & Momentum Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-orange-500/30 bg-white dark:bg-gradient-to-br dark:from-zinc-900/90 dark:via-zinc-950 dark:to-zinc-950 p-4 sm:p-5 flex flex-col justify-between shadow-sm dark:shadow-none">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">{labels.streakTitle}</span>
                  <Flame className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                </div>
                
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white font-sans">{userChallengeState.streakCount}</span>
                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{labels.daysStreak} 🔥</span>
                </div>

                <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  حافظ على حل تحدٍّ أو اختبار واحد يومياً لتغذية الشعلة وعدم قطع السلسلة.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-zinc-400">آخر نشاط: {userChallengeState.lastActiveDate || 'اليوم'}</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold font-sans">
                  {userChallengeState.completedChallengeIds.length} {labels.completedChallengesCount}
                </span>
              </div>
            </div>

            {/* Badges Snapshot Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-amber-500/30 bg-white dark:bg-gradient-to-br dark:from-zinc-900/90 dark:via-zinc-950 dark:to-zinc-950 p-4 sm:p-5 flex flex-col justify-between shadow-sm dark:shadow-none">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{labels.badgesTitle}</span>
                  <Award className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white font-sans">{unlockedBadgesCount}</span>
                  <span className="text-xs text-slate-500 dark:text-zinc-400">من {badgesList.length} شارات مفتوحة</span>
                </div>

                <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {badgesList.slice(0, 6).map(badge => {
                    const progress = calculateBadgeProgress(badge, userChallengeState, globalStats);
                    return (
                      <HexagonalBadge
                        key={badge.id}
                        badge={badge}
                        isUnlocked={badge.isUnlocked}
                        progressInfo={progress}
                        language={language}
                        size="sm"
                        showLabel={false}
                        onClick={() => setSelectedDetailBadge(badge)}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-zinc-400">انقر لعرض كل الإنجازات</span>
                <button
                  onClick={() => setActiveTab('badges')}
                  className="text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>عرض الشارات</span>
                  <ArrowIcon className="h-3 w-3" />
                </button>
              </div>
            </div>

          </div>

          {/* Learning Tracks Real Progress Breakdown */}
          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/50 p-5 sm:p-6 backdrop-blur-xl shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="h-4.5 w-4.5 text-amber-500 dark:text-amber-400" />
                <span>{labels.learningTracksProgress}</span>
              </h2>
              <button
                onClick={() => onNavigate('income')}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <span>تصفح كل المسارات</span>
                <ArrowIcon className="h-3 w-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {learningFieldsProgress.map((field) => (
                <div
                  key={field.id}
                  onClick={() => onNavigate(field.actionTab)}
                  className="group rounded-2xl border border-slate-200 dark:border-zinc-800/90 bg-slate-50/80 dark:bg-zinc-950/60 p-4 hover:border-amber-500/40 transition-all cursor-pointer flex flex-col justify-between shadow-sm dark:shadow-none"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors line-clamp-1">
                        {field.title}
                      </span>
                      <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold shrink-0">
                        {field.progressPercent}%
                      </span>
                    </div>

                    <div className="mt-3 h-1.5 w-full rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
                        style={{ width: `${field.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200 dark:border-zinc-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400">
                    <span>
                      {field.completedUnits > 0
                        ? `${field.completedUnits} نشاط مكتمل`
                        : 'لم يبدأ بعد'}
                    </span>
                    <span className="text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-semibold">
                      <span>فتح</span>
                      <ArrowIcon className="h-2.5 w-2.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Learning Activity Log */}
          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/50 p-5 sm:p-6 backdrop-blur-xl shadow-sm dark:shadow-none">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Clock className="h-4.5 w-4.5 text-amber-500 dark:text-amber-400" />
              <span>{labels.recentActivity}</span>
            </h2>

            {userChallengeState.history.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 dark:border-zinc-800 bg-slate-50/60 dark:bg-zinc-950/40 p-8 text-center">
                <HelpCircle className="mx-auto h-8 w-8 text-slate-400 dark:text-zinc-400" />
                <h4 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">{labels.noActivityYet}</h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400 max-w-sm mx-auto">
                  {labels.noActivityDesc}
                </p>
                <button
                  onClick={() => onNavigate('challenges')}
                  className="mt-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-2 text-xs font-black text-black hover:from-amber-400 hover:to-amber-300 transition-all cursor-pointer shadow-md shadow-amber-500/20 active:scale-95"
                >
                  {labels.startFirstChallenge}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {userChallengeState.history.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/60 text-xs shadow-sm dark:shadow-none"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 dark:text-white block truncate">{item.title}</span>
                        <span className="text-[10px] text-slate-500 dark:text-zinc-400 block font-mono">{item.date} {item.time || ''}</span>
                      </div>
                    </div>
                    <span className="font-mono font-black text-amber-600 dark:text-amber-400 shrink-0 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      +{item.xp} XP
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}


      {/* =========================================================================
          5. TAB CONTENT: BADGES & ACHIEVEMENTS
         ========================================================================= */}
      {/* =========================================================================
          5. TAB CONTENT: BADGES & ACHIEVEMENTS (30 COMPLETE MERIT BADGES)
         ========================================================================= */}
      {activeTab === 'badges' && (() => {
        const bt = badgeTabI18n[language] || badgeTabI18n.ar;
        const overallPercent = Math.round((unlockedBadgesCount / Math.max(1, badgesList.length)) * 100);

        return (
          <div className="mt-6 space-y-6 animate-in fade-in duration-200">
            <div className="rounded-3xl border border-slate-200 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/50 p-5 sm:p-6 backdrop-blur-xl shadow-sm dark:shadow-none">
              
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-zinc-800/80">
                <div>
                  <h2 className="text-base sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-amber-500 dark:text-amber-400" />
                    <span>{bt.all30Title}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1">
                    {bt.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="rounded-2xl bg-amber-500/10 px-3.5 py-1.5 border border-amber-500/25 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                    <span className="text-xs font-black text-amber-600 dark:text-amber-400 font-sans">
                      {unlockedBadgesCount} / {badgesList.length} {bt.unlockedLabel}
                    </span>
                  </div>

                  {totalBadgeXpEarned > 0 && (
                    <div className="rounded-2xl bg-emerald-500/10 px-3 py-1.5 border border-emerald-500/25 flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-sans">
                        +{totalBadgeXpEarned.toLocaleString()} XP
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Overall Unlock Progress Bar */}
              <div className="mt-4 p-4 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/80 dark:bg-zinc-950/60 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between text-xs text-slate-700 dark:text-zinc-300 font-medium mb-1.5">
                  <span>{bt.progressLabel}: {unlockedBadgesCount} من 30 شارة</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{overallPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 transition-all duration-500"
                    style={{ width: `${overallPercent}%` }}
                  />
                </div>
              </div>

              {/* Filters Toolbar: Categories & Status */}
              <div className="mt-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { id: 'all', label: bt.catAll },
                    { id: 'learning', label: bt.catLearning },
                    { id: 'streak', label: bt.catStreak },
                    { id: 'challenges', label: bt.catChallenges },
                    { id: 'xp', label: bt.catXp },
                    { id: 'paths', label: bt.catPaths },
                    { id: 'special', label: bt.catSpecial }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setBadgeCategoryFilter(cat.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        badgeCategoryFilter === cat.id
                          ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                          : 'bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800/70'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Status Segmented Control */}
                <div className="flex items-center p-0.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-950 text-xs shrink-0 self-start md:self-auto">
                  <button
                    onClick={() => setBadgeStatusFilter('all')}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                      badgeStatusFilter === 'all' ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white font-bold shadow-sm dark:shadow-none' : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    {bt.filterAll} ({badgesList.length})
                  </button>
                  <button
                    onClick={() => setBadgeStatusFilter('unlocked')}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                      badgeStatusFilter === 'unlocked' ? 'bg-white dark:bg-zinc-800 text-amber-600 dark:text-amber-400 font-bold shadow-sm dark:shadow-none' : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    {bt.filterUnlocked} ({unlockedBadgesCount})
                  </button>
                  <button
                    onClick={() => setBadgeStatusFilter('locked')}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                      badgeStatusFilter === 'locked' ? 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-300 font-bold shadow-sm dark:shadow-none' : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    {bt.filterLocked} ({badgesList.length - unlockedBadgesCount})
                  </button>
                </div>
              </div>

              {/* Badges Hexagonal Gaming Grid (30 Distinct Hexagons) */}
              {filteredBadgesList.length === 0 ? (
                <div className="mt-8 py-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/30">
                  <Trophy className="h-10 w-10 text-slate-400 dark:text-zinc-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 dark:text-zinc-400 font-medium">لا توجد شارات مطابقة لهذا التصنيف.</p>
                </div>
              ) : (
                <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-y-8 gap-x-2 sm:gap-x-4 place-items-center">
                  {filteredBadgesList.map((badge) => {
                    const progress = calculateBadgeProgress(badge, userChallengeState, globalStats);

                    return (
                      <HexagonalBadge
                        key={badge.id}
                        badge={badge}
                        isUnlocked={badge.isUnlocked}
                        progressInfo={progress}
                        language={language}
                        size="md"
                        onClick={() => setSelectedDetailBadge(badge)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })()}


      {/* =========================================================================
          6. TAB CONTENT: SAVED BLUEPRINTS & BOOKMARKS
         ========================================================================= */}
      {activeTab === 'saved' && (
        <div className="mt-6 space-y-6 animate-in fade-in duration-200">
          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/50 p-5 sm:p-6 backdrop-blur-xl shadow-sm dark:shadow-none">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-zinc-800/80">
              <div className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-amber-500 dark:text-amber-400 fill-amber-400/20" />
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {labels.savedSectionTitle}
                </h2>
                <span className="rounded-full bg-slate-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs text-slate-700 dark:text-zinc-300 font-mono border border-slate-200 dark:border-transparent">
                  {savedIds.length}
                </span>
              </div>

              {savedIds.length > 0 && (
                <div className="flex items-center gap-3">
                  {/* Segmented Filter */}
                  <div className="flex items-center p-0.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-950 text-xs">
                    <button
                      onClick={() => setSavedFilter('all')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                        savedFilter === 'all' ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white font-bold shadow-sm dark:shadow-none' : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      {labels.filterAll}
                    </button>
                    <button
                      onClick={() => setSavedFilter('paths')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                        savedFilter === 'paths' ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white font-bold shadow-sm dark:shadow-none' : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      {labels.filterPaths} ({savedPaths.length})
                    </button>
                    <button
                      onClick={() => setSavedFilter('ideas')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                        savedFilter === 'ideas' ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white font-bold shadow-sm dark:shadow-none' : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      {labels.filterIdeas} ({savedIdeas.length})
                    </button>
                  </div>

                  <button
                    onClick={onClearAllSaved}
                    className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 font-bold cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>{t.profile.clearAll}</span>
                  </button>
                </div>
              )}
            </div>

            {savedIds.length === 0 ? (
              <div className="py-12 text-center">
                <Bookmark className="mx-auto h-12 w-12 text-slate-400 dark:text-zinc-400" />
                <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                  {t.profile.noSavedTitle}
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400 max-w-sm mx-auto">
                  {t.profile.noSavedDesc}
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <button
                    onClick={() => onNavigate('income')}
                    className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-2 text-xs font-black text-black hover:from-amber-400 hover:to-amber-300 transition-all cursor-pointer shadow-md"
                  >
                    {t.income.browseAllPathsBtn || t.income.pageTitle}
                  </button>
                  <button
                    onClick={() => onNavigate('ideas')}
                    className="rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 px-4 py-2 text-xs font-bold text-slate-800 dark:text-white hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-all cursor-pointer"
                  >
                    {t.ideas.pageTitle}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-5 space-y-6">
                
                {/* Saved Paths */}
                {(savedFilter === 'all' || savedFilter === 'paths') && savedPaths.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4" />
                      <span>{t.profile.savedLearningPaths} ({savedPaths.length})</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {savedPaths.map((p) => {
                        const loc = localizePath(p);

                        return (
                          <div
                            key={p.id}
                            className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/60 p-4 hover:border-amber-500/40 transition-all shadow-sm dark:shadow-none"
                          >
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">{p.category}</span>
                              <h4 
                                onClick={() => onSelectPath(p)}
                                className="text-sm font-bold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-300 cursor-pointer line-clamp-1"
                              >
                                {loc.title}
                              </h4>
                              <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400">{p.potentialMonthlyIncome || p.estimatedIncomeRange}</span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => onSelectPath(p)}
                                className="rounded-lg bg-slate-200 dark:bg-zinc-800 px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-zinc-200 hover:bg-amber-500 hover:text-black transition-all cursor-pointer"
                              >
                                {t.income.viewDetails}
                              </button>
                              <button
                                onClick={() => onToggleSave(p.id, 'income')}
                                className="rounded-lg p-1.5 text-slate-400 hover:text-rose-500 dark:text-zinc-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
                                title={t.common.remove}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Saved Ideas */}
                {(savedFilter === 'all' || savedFilter === 'ideas') && savedIdeas.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Lightbulb className="h-4 w-4" />
                      <span>{t.profile.savedContentIdeas} ({savedIdeas.length})</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {savedIdeas.map((i) => {
                        const loc = localizeIdea(i);

                        return (
                          <div
                            key={i.id}
                            className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/60 p-4 hover:border-amber-500/40 transition-all shadow-sm dark:shadow-none"
                          >
                            <div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold text-amber-600 dark:text-amber-400">{i.platform}</span>
                                <button
                                  onClick={() => onToggleSave(i.id, 'idea')}
                                  className="text-slate-400 hover:text-rose-500 dark:text-zinc-500 dark:hover:text-rose-400 p-1 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <h4 
                                onClick={() => onSelectIdea(i)}
                                className="mt-1 text-sm font-bold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-300 cursor-pointer line-clamp-1"
                              >
                                {loc.title}
                              </h4>
                              <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400 italic line-clamp-1">
                                "{loc.hook}"
                              </p>
                            </div>

                            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-zinc-800/80 flex items-center justify-between">
                              <button
                                onClick={() => onCopyText(loc.hook, t.ideas.hookCopied)}
                                className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                              >
                                <Copy className="h-3 w-3" />
                                <span>{t.ideas.copyHook}</span>
                              </button>
                              <button
                                onClick={() => onSelectIdea(i)}
                                className="rounded-lg bg-slate-200 dark:bg-zinc-800 px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-zinc-200 hover:bg-amber-500 hover:text-black transition-all cursor-pointer"
                              >
                                {t.ideas.scriptOutline}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}


      {/* =========================================================================
          7. TAB CONTENT: SETTINGS & APPEARANCE
         ========================================================================= */}
      {activeTab === 'settings' && (
        <div className="mt-6 space-y-6 animate-in fade-in duration-200">
          
          {/* Appearance Mode (Dark / Light) */}
          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/50 p-5 sm:p-6 backdrop-blur-xl shadow-sm dark:shadow-none">
            <h2 className="text-sm font-bold text-slate-800 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              {isDark ? <Moon className="h-4 w-4 text-amber-500 dark:text-amber-400" /> : <Sun className="h-4 w-4 text-amber-500 dark:text-amber-400" />}
              <span>{t.profile.appearanceMode}</span>
            </h2>
            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
              {t.profile.appearanceDesc}
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
              <button
                onClick={() => setTheme('dark')}
                className={`rounded-2xl p-4 text-start border transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white shadow-md shadow-amber-500/10 ring-1 ring-amber-500/40'
                    : 'border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/60 text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700 hover:text-slate-900 dark:hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-200 dark:bg-zinc-800 text-amber-500 dark:text-amber-400">
                      <Moon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white block">
                        {t.profile.darkMode}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-zinc-400 block">
                        {t.profile.darkModeDesc}
                      </span>
                    </div>
                  </div>
                  {theme === 'dark' && <CheckCircle2 className="h-5 w-5 text-amber-500 dark:text-amber-400" />}
                </div>
              </button>

              <button
                onClick={() => setTheme('light')}
                className={`rounded-2xl p-4 text-start border transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white shadow-md shadow-amber-500/10 ring-1 ring-amber-500/40'
                    : 'border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/60 text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700 hover:text-slate-900 dark:hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-200 dark:bg-zinc-800 text-amber-500 dark:text-amber-400">
                      <Sun className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white block">
                        {t.profile.lightMode}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-zinc-400 block">
                        {t.profile.lightModeDesc}
                      </span>
                    </div>
                  </div>
                  {theme === 'light' && <CheckCircle2 className="h-5 w-5 text-amber-500 dark:text-amber-400" />}
                </div>
              </button>
            </div>
          </div>

          {/* Language Selection */}
          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/50 p-5 sm:p-6 backdrop-blur-xl shadow-sm dark:shadow-none">
            <h2 className="text-sm font-bold text-slate-800 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <Globe className="h-4 w-4 text-amber-500 dark:text-amber-400" />
              <span>{t.profile.languageSection}</span>
            </h2>
            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
              {t.common.selectLanguage}
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {languages.map((item) => (
                <button
                  key={item.code}
                  id={`profile-lang-${item.code}`}
                  onClick={() => setLanguage(item.code)}
                  className={`rounded-2xl p-4 text-start border transition-all cursor-pointer ${
                    language === item.code
                      ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white shadow-md shadow-amber-500/10 ring-1 ring-amber-500/40'
                      : 'border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/60 text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700 hover:text-slate-900 dark:hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-2xl shrink-0" role="img" aria-label={item.name}>
                        {item.flag}
                      </span>
                      <div className="min-w-0">
                        <span className="font-bold text-sm text-slate-900 dark:text-white block truncate">{item.nativeName}</span>
                        <span className="text-[11px] text-slate-500 dark:text-zinc-400 truncate block">{item.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="rounded bg-slate-200 dark:bg-zinc-800/80 px-1.5 py-0.5 text-[9px] font-mono text-slate-700 dark:text-zinc-400 border border-slate-300 dark:border-zinc-700/50">
                        {item.badge}
                      </span>
                      {language === item.code && <CheckCircle2 className="h-4 w-4 text-amber-500 dark:text-amber-400" />}
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-600 dark:text-zinc-400 line-clamp-1">{item.description}</p>
                </button>
              ))}
            </div>
          </div>

        </div>
      )}


      {/* =========================================================================
          8. EDIT PROFILE MODAL / DRAWER (Local, No registration, No authentication)
         ========================================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="relative w-full max-w-lg rounded-3xl border border-slate-200 dark:border-amber-500/30 bg-white dark:bg-[#0c0c10] text-slate-900 dark:text-zinc-100 p-6 shadow-2xl animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800/80">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 dark:border-amber-500/20">
                  <UserCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">{labels.editProfile}</h3>
                  <span className="text-[11px] text-slate-500 dark:text-zinc-400">تخصيص البيانات والصورة وحفظها محلياً على جهازك</span>
                </div>
              </div>

              <button
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-5 space-y-4 max-h-[70vh] overflow-y-auto px-1">
              
              {/* Avatar Management Area */}
              <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-950/60 p-4">
                <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 block mb-2.5">
                  صورة الملف الشخصي (Avatar)
                </span>

                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-2xl border-2 border-amber-500/50 bg-white dark:bg-zinc-900 p-0.5 overflow-hidden shrink-0 shadow-md">
                    <img
                      src={editForm.avatarUrl || '/file_00000000b1d881f496a6612e6eef85ce.png'}
                      onError={(e) => {
                        e.currentTarget.src = '/assets/rz-hero-badge.png';
                      }}
                      alt="Avatar Preview"
                      className="h-full w-full object-cover rounded-xl"
                    />
                  </div>

                  <div className="flex flex-col gap-2 min-w-0">
                    <div className="flex flex-wrap gap-2">
                      {/* Hidden File Input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black px-3 py-1.5 text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        <span>{labels.uploadPhoto}</span>
                      </button>

                      {editForm.avatarType === 'custom' && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 px-3 py-1.5 text-xs font-bold transition-all cursor-pointer"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          <span>{labels.removePhoto}</span>
                        </button>
                      )}
                    </div>

                    <span className="text-[10px] text-slate-500 dark:text-zinc-400">
                      يمكنك رفع أي صورة من هاتفك أو حاسوبك (يتم ضغطها وتخزينها محلياً).
                    </span>
                  </div>
                </div>

                {uploadError && (
                  <p className="mt-2 text-xs text-rose-400 font-semibold">{uploadError}</p>
                )}

                {/* Presets Grid */}
                <div className="mt-3.5 pt-3 border-t border-slate-200 dark:border-zinc-800/70">
                  <span className="text-[11px] text-slate-500 dark:text-zinc-400 block mb-2">{labels.choosePreset}</span>
                  <div className="grid grid-cols-4 gap-2">
                    {AVATAR_PRESETS.map((preset) => {
                      const isSelected = editForm.avatarUrl === preset.url;
                      return (
                        <button
                          type="button"
                          key={preset.id}
                          onClick={() => handleSelectPreset(preset)}
                          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500/20 ring-1 ring-amber-500/50'
                              : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-amber-400'
                          }`}
                        >
                          <img
                            src={preset.url}
                            onError={(e) => { e.currentTarget.src = preset.fallback; }}
                            alt={preset.title}
                            className="h-10 w-10 rounded-lg object-contain"
                          />
                          <span className="text-[9px] text-slate-700 dark:text-zinc-300 truncate max-w-full font-medium">
                            {preset.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Display Name Input */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 block mb-1">
                  {labels.displayNameLabel}
                </label>
                <input
                  type="text"
                  value={editForm.displayName}
                  onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                  placeholder="مثال: أيوب بوناصر / صانع محتوى"
                  className="w-full rounded-xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-sm dark:shadow-none"
                  maxLength={50}
                />
              </div>

              {/* Username Input */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 block mb-1">
                  {labels.usernameLabel}
                </label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="@ayoub_creator"
                  className="w-full rounded-xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 py-2.5 text-xs text-amber-600 dark:text-amber-400 font-mono placeholder-slate-400 dark:placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-sm dark:shadow-none"
                  maxLength={30}
                />
              </div>

              {/* Role Title Input */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 block mb-1">
                  {labels.roleLabel}
                </label>
                <input
                  type="text"
                  value={editForm.roleTitle}
                  onChange={(e) => setEditForm(prev => ({ ...prev, roleTitle: e.target.value }))}
                  placeholder="مثال: صانع محتوى ومختص تسويق رقمي"
                  className="w-full rounded-xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-sm dark:shadow-none"
                  maxLength={60}
                />
              </div>

              {/* Bio & Learning Goal */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 block mb-1">
                  {labels.bioLabel}
                </label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder={labels.bioPlaceholder}
                  rows={3}
                  className="w-full rounded-xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none shadow-sm dark:shadow-none"
                  maxLength={200}
                />
                <span className="text-[10px] text-slate-400 dark:text-zinc-500 block text-end font-mono">
                  {editForm.bio.length} / 200
                </span>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-zinc-800/80 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {labels.cancel}
              </button>

              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 px-5 py-2 text-xs font-black text-black transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {labels.saveChanges}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Hexagonal Badge Gaming Detail Modal */}
      <BadgeDetailModal
        badge={selectedDetailBadge}
        isUnlocked={selectedDetailBadge ? userChallengeState.unlockedBadgeIds.includes(selectedDetailBadge.id) : false}
        progressInfo={selectedDetailBadge ? calculateBadgeProgress(selectedDetailBadge, userChallengeState, globalStats) : undefined}
        language={language}
        onClose={() => setSelectedDetailBadge(null)}
      />

    </div>
  );
};
