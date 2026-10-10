import React, { useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTheme } from '../../theme/ThemeContext';
import { 
  X, 
  User, 
  Bookmark, 
  Calculator, 
  Gamepad2, 
  Settings, 
  Flame, 
  Sparkles, 
  Moon, 
  Sun, 
  Globe,
  Info,
  Mail,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { getInitialUserState, calculateLevelAndProgress } from '../../utils/challengeStorage';
import { getStoredUserProfile } from '../../utils/profileStorage';
import { LanguageSelector } from '../common/LanguageSelector';
import { ThemeSwitcher } from '../common/ThemeSwitcher';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: string;
  onNavigate: (tab: string) => void;
  savedCount: number;
}

// Multi-language dictionary for the drawer items and groups
const drawerI18n: Record<string, {
  groupAccount: string;
  myAccount: string;
  myAccountSub: string;
  savedItems: string;
  savedItemsSub: string;
  groupTools: string;
  tools: string;
  toolsSub: string;
  creators: string;
  creatorsSub: string;
  groupSettings: string;
  appearance: string;
  language: string;
  streakDays: string;
  level: string;
  fullSettingsBtn: string;
  groupAbout: string;
  about: string;
  aboutSub: string;
  contact: string;
  contactSub: string;
}> = {
  ar: {
    groupAccount: 'حسابي',
    myAccount: 'حسابي الشخصي',
    myAccountSub: 'الملف الشخصي وإحصائيات التقدم',
    savedItems: 'المحفوظات',
    savedItemsSub: 'المسارات والأفكار المحفوظة',
    groupTools: 'أدوات المنصة',
    tools: 'الأدوات والحاسبات',
    toolsSub: '17 حاسبة رقمية وأدوات متقدمة',
    creators: 'صنّاع المحتوى',
    creatorsSub: 'أفكار وقنوات صناعة المحتوى',
    groupSettings: 'الإعدادات',
    appearance: 'المظهر',
    language: 'اللغة',
    streakDays: 'أيام',
    level: 'المستوى',
    fullSettingsBtn: 'إدارة تفضيلات الحساب',
    groupAbout: 'عن المنصة والتواصل',
    about: 'من نحن',
    aboutSub: 'رؤيتنا ورسالتنا التعليمية',
    contact: 'اتصل بنا',
    contactSub: 'تواصل معنا واستفسر'
  },
  ary: {
    groupAccount: 'حسابي',
    myAccount: 'حسابي الشخصي',
    myAccountSub: 'البروفايل ديالي ونقاط التقدم',
    savedItems: 'المحفوظات',
    savedItemsSub: 'المسارات والأفكار اللي سجلتي',
    groupTools: 'أدوات المنصة',
    tools: 'الأدوات والحاسبات',
    toolsSub: '17 حاسبة وأدوات رقمية سريعة',
    creators: 'صنّاع المحتوى',
    creatorsSub: 'أفكار وتجارب صناع المحتوى',
    groupSettings: 'الإعدادات',
    appearance: 'المظهر',
    language: 'اللغة',
    streakDays: 'أيام',
    level: 'المستوى',
    fullSettingsBtn: 'إعدادات الحساب والمظهر',
    groupAbout: 'على المنصة والتواصل',
    about: 'شكون حنا',
    aboutSub: 'الرؤية والهدف ديالنا',
    contact: 'تواصل معانا',
    contactSub: 'صيفط لينا ميساج دابا'
  },
  en: {
    groupAccount: 'My Account',
    myAccount: 'My Account',
    myAccountSub: 'Profile details & learning stats',
    savedItems: 'Saved Items',
    savedItemsSub: 'Your saved paths & ideas',
    groupTools: 'Platform Tools',
    tools: 'Tools & Calculators',
    toolsSub: '17 financial & digital tools',
    creators: 'Content Creators',
    creatorsSub: 'Content frameworks & guides',
    groupSettings: 'Settings',
    appearance: 'Appearance',
    language: 'Language',
    streakDays: 'days',
    level: 'Level',
    fullSettingsBtn: 'Manage Account Settings',
    groupAbout: 'About & Support',
    about: 'About Us',
    aboutSub: 'Our vision & educational mission',
    contact: 'Contact Us',
    contactSub: 'Get in touch & direct support'
  },
  fr: {
    groupAccount: 'Mon Compte',
    myAccount: 'Mon Compte',
    myAccountSub: 'Profil et progression',
    savedItems: 'Éléments Enregistrés',
    savedItemsSub: 'Parcours et idées sauvegardés',
    groupTools: 'Outils de la Plateforme',
    tools: 'Outils & Calculateurs',
    toolsSub: '17 calculateurs et outils pros',
    creators: 'Créateurs de Contenu',
    creatorsSub: 'Stratégies et créateurs',
    groupSettings: 'Paramètres',
    appearance: 'Apparence',
    language: 'Langue',
    streakDays: 'jours',
    level: 'Niveau',
    fullSettingsBtn: 'Gérer les préférences',
    groupAbout: 'À Propos & Support',
    about: 'À propos de nous',
    aboutSub: 'Notre vision et mission',
    contact: 'Contactez-nous',
    contactSub: 'Écrivez-nous directement'
  },
  es: {
    groupAccount: 'Mi Cuenta',
    myAccount: 'Mi Cuenta',
    myAccountSub: 'Perfil y estadísticas',
    savedItems: 'Elementos Guardados',
    savedItemsSub: 'Tus rutas e ideas favoritas',
    groupTools: 'Herramientas de Plataforma',
    tools: 'Herramientas y Calculadoras',
    toolsSub: '17 calculadoras digitales',
    creators: 'Creadores de Contenido',
    creatorsSub: 'Estrategias de contenido',
    groupSettings: 'Ajustes',
    appearance: 'Apariencia',
    language: 'Idioma',
    streakDays: 'días',
    level: 'Nivel',
    fullSettingsBtn: 'Ajustes de cuenta',
    groupAbout: 'Acerca de & Soporte',
    about: 'Quiénes somos',
    aboutSub: 'Nuestra visión y propósito',
    contact: 'Contáctanos',
    contactSub: 'Escríbenos directamente'
  },
  de: {
    groupAccount: 'Mein Konto',
    myAccount: 'Mein Profil',
    myAccountSub: 'Fortschritt & Statistiken',
    savedItems: 'Gespeicherte Elemente',
    savedItemsSub: 'Deine gespeicherten Pfade',
    groupTools: 'Plattform-Tools',
    tools: 'Tools & Rechner',
    toolsSub: '17 digitale Finanz-Tools',
    creators: 'Content Creator',
    creatorsSub: 'Strategien für Creator',
    groupSettings: 'Einstellungen',
    appearance: 'Design',
    language: 'Sprache',
    streakDays: 'Tage',
    level: 'Level',
    fullSettingsBtn: 'Einstellungen verwalten',
    groupAbout: 'Über uns & Support',
    about: 'Über uns',
    aboutSub: 'Unsere Vision und Mission',
    contact: 'Kontakt',
    contactSub: 'Schreiben Sie uns direkt'
  },
  it: {
    groupAccount: 'Il Mio Account',
    myAccount: 'Il Mio Account',
    myAccountSub: 'Profilo e statistiche',
    savedItems: 'Elementi Salvati',
    savedItemsSub: 'I tuoi percorsi salvati',
    groupTools: 'Strumenti della Piattaforma',
    tools: 'Strumenti & Calcolatori',
    toolsSub: '17 calcolatori digitali',
    creators: 'Creator di Contenuti',
    creatorsSub: 'Guide per creator',
    groupSettings: 'Impostazioni',
    appearance: 'Aspetto',
    language: 'Lingua',
    streakDays: 'giorni',
    level: 'Livello',
    fullSettingsBtn: 'Gestisci impostazioni',
    groupAbout: 'Chi siamo & Supporto',
    about: 'Chi siamo',
    aboutSub: 'La nostra visione e missione',
    contact: 'Contattaci',
    contactSub: 'Scrivici direttamente'
  },
  pt: {
    groupAccount: 'Minha Conta',
    myAccount: 'Minha Conta',
    myAccountSub: 'Perfil e progresso',
    savedItems: 'Itens Salvos',
    savedItemsSub: 'Seus caminhos e ideias',
    groupTools: 'Ferramentas da Plataforma',
    tools: 'Ferramentas e Calculadoras',
    toolsSub: '17 calculadoras digitais',
    creators: 'Criadores de Conteúdo',
    creatorsSub: 'Estratégias de conteúdo',
    groupSettings: 'Configurações',
    appearance: 'Aparência',
    language: 'Idioma',
    streakDays: 'dias',
    level: 'Nível',
    fullSettingsBtn: 'Configurações da conta',
    groupAbout: 'Sobre & Suporte',
    about: 'Sobre nós',
    aboutSub: 'Nossa visão e missão',
    contact: 'Fale Conosco',
    contactSub: 'Fale com a equipe'
  },
  zh: {
    groupAccount: '我的账户',
    myAccount: '个人中心',
    myAccountSub: '个人资料与进度统计',
    savedItems: '已保存内容',
    savedItemsSub: '您收藏的技能与灵感',
    groupTools: '平台工具',
    tools: '实用工具与测算器',
    toolsSub: '17款数字化实用工具',
    creators: '内容创作者',
    creatorsSub: '内容创作指南',
    groupSettings: '系统设置',
    appearance: '主题外观',
    language: '界面语言',
    streakDays: '天',
    level: '等级',
    fullSettingsBtn: '管理账号设置',
    groupAbout: '关于平台与支持',
    about: '关于我们',
    aboutSub: '愿景与教育使命',
    contact: '联系我们',
    contactSub: '随时与我们取得联系'
  }
};

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  onNavigate,
  savedCount
}) => {
  const { language, isRTL } = useLanguage();
  const { theme } = useTheme();

  const labels = drawerI18n[language] || drawerI18n.ar;
  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;

  // Retrieve current user challenge & progression state and profile
  const userState = getInitialUserState();
  const { currentLevel, levelTitle } = calculateLevelAndProgress(userState.totalXp);
  const userProfile = getStoredUserProfile();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleItemClick = (tab: string) => {
    onNavigate(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        aria-hidden="true"
      />

      {/* Drawer Container (RTL from right, LTR from left) */}
      <div className={`fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} flex max-w-full`}>
        <div 
          className={`w-screen max-w-sm sm:max-w-md border-${isRTL ? 'l' : 'r'} border-zinc-800/90 bg-[#09090b] text-zinc-100 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out`}
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Drawer Header with Brand Logo & Close Button */}
          <div className="flex h-14 sm:h-15 items-center justify-between border-b border-zinc-800/80 px-4 sm:px-5 bg-zinc-950/90">
            <div className="flex items-center gap-2.5">
              <div className="relative h-7 w-7 rounded-xl border border-amber-500/30 bg-zinc-950 p-0.5 shadow-sm">
                <img
                  src="/file_00000000b1d881f496a6612e6eef85ce.png"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/rz-hero-badge.png';
                  }}
                  alt="RikouZone Logo"
                  className="h-full w-full object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black text-white font-sans tracking-tight">
                  Rikou<span className="text-amber-400">Zone</span>
                </span>
                <span className="text-[9px] text-zinc-400 font-medium">القائمة الجانبية</span>
              </div>
            </div>

            <button
              id="sidebar-close-btn"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="إغلاق القائمة"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 space-y-5">
            
            {/* Top User Progress Card */}
            <div 
              onClick={() => handleItemClick('profile')}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/25 via-zinc-900/90 to-zinc-950 p-3.5 transition-all hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10 active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 rounded-xl border-2 border-amber-500/40 bg-zinc-950 p-0.5 shrink-0 shadow-md overflow-hidden">
                  <img
                    src={userProfile.avatarUrl || '/file_00000000b1d881f496a6612e6eef85ce.png'}
                    onError={(e) => {
                      e.currentTarget.src = '/assets/rz-hero-badge.png';
                    }}
                    alt="User Avatar"
                    className="h-full w-full object-cover rounded-lg select-none"
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 text-[8px] font-black text-black">
                    ✓
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-sm font-black text-white truncate group-hover:text-amber-300 transition-colors">
                      {userProfile.displayName || labels.myAccount}
                    </span>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 font-sans">
                      {labels.level} {currentLevel}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 truncate block mt-0.5">
                    {userProfile.username || levelTitle}
                  </span>
                </div>
              </div>

              {/* XP & Streak Stats Pill Row */}
              <div className="mt-2.5 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-amber-400 font-sans font-black">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{userState.totalXp} XP</span>
                </div>

                <div className="flex items-center gap-1.5 text-orange-400 font-sans font-bold">
                  <Flame className="h-3.5 w-3.5" />
                  <span>{userState.streakCount} {labels.streakDays} 🔥</span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-zinc-400 group-hover:text-amber-300 transition-colors font-medium">
                  <span>فتح الملف</span>
                  <ArrowIcon className="h-3 w-3" />
                </div>
              </div>
            </div>

            {/* المجموعة الأولى: حسابي والمحفوظات */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block px-1 mb-1.5">
                {labels.groupAccount}
              </span>

              {/* المحفوظات مع عرض عدّاد العناصر المحفوظة */}
              <button
                id="drawer-item-saved"
                onClick={() => handleItemClick('profile')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/50 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white text-start transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800/80 text-sky-400 shrink-0">
                    <Bookmark className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-bold block truncate">{labels.savedItems}</span>
                    <span className="text-[10px] text-zinc-400 truncate block">{labels.savedItemsSub}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-black font-sans ${
                    savedCount > 0 ? 'bg-sky-500 text-black' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {savedCount}
                  </span>
                  <ArrowIcon className="h-4 w-4 text-zinc-500" />
                </div>
              </button>
            </div>

            {/* المجموعة الثانية: أدوات المنصة */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block px-1 mb-1.5">
                {labels.groupTools}
              </span>

              {/* 1. الأدوات والحاسبات */}
              <button
                id="drawer-item-tools"
                onClick={() => handleItemClick('tools')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-start transition-all cursor-pointer ${
                  currentTab === 'tools'
                    ? 'border-blue-500/60 bg-blue-500/15 text-white font-bold shadow-sm'
                    : 'border-zinc-800/80 bg-zinc-900/50 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl shrink-0 ${
                    currentTab === 'tools'
                      ? 'bg-blue-500 text-black'
                      : 'bg-zinc-800/80 text-blue-400'
                  }`}>
                    <Calculator className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-bold block truncate">{labels.tools}</span>
                    <span className="text-[10px] text-zinc-400 truncate block">{labels.toolsSub}</span>
                  </div>
                </div>
                <ArrowIcon className="h-4 w-4 text-zinc-500 shrink-0" />
              </button>

              {/* 2. صنّاع المحتوى */}
              <button
                id="drawer-item-creators"
                onClick={() => handleItemClick('creators')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-start transition-all cursor-pointer ${
                  currentTab === 'creators'
                    ? 'border-indigo-500/60 bg-indigo-500/15 text-white font-bold shadow-sm'
                    : 'border-zinc-800/80 bg-zinc-900/50 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl shrink-0 ${
                    currentTab === 'creators'
                      ? 'bg-indigo-500 text-black'
                      : 'bg-zinc-800/80 text-indigo-400'
                  }`}>
                    <Gamepad2 className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-bold block truncate">{labels.creators}</span>
                    <span className="text-[10px] text-zinc-400 truncate block">{labels.creatorsSub}</span>
                  </div>
                </div>
                <ArrowIcon className="h-4 w-4 text-zinc-500 shrink-0" />
              </button>
            </div>

            {/* المجموعة الثالثة: عن المنصة والتواصل */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block px-1 mb-1.5">
                {labels.groupAbout}
              </span>

              {/* 1. من نحن */}
              <button
                id="drawer-item-about"
                onClick={() => handleItemClick('about')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-start transition-all cursor-pointer ${
                  currentTab === 'about'
                    ? 'border-amber-500/60 bg-amber-500/15 text-white font-bold shadow-sm'
                    : 'border-zinc-800/80 bg-zinc-900/50 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl shrink-0 ${
                    currentTab === 'about'
                      ? 'bg-amber-500 text-black'
                      : 'bg-zinc-800/80 text-amber-400'
                  }`}>
                    <Info className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-bold block truncate">{labels.about}</span>
                    <span className="text-[10px] text-zinc-400 truncate block">{labels.aboutSub}</span>
                  </div>
                </div>
                <ArrowIcon className="h-4 w-4 text-zinc-500 shrink-0" />
              </button>

              {/* 2. اتصل بنا */}
              <button
                id="drawer-item-contact"
                onClick={() => handleItemClick('contact')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-start transition-all cursor-pointer ${
                  currentTab === 'contact'
                    ? 'border-amber-500/60 bg-amber-500/15 text-white font-bold shadow-sm'
                    : 'border-zinc-800/80 bg-zinc-900/50 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl shrink-0 ${
                    currentTab === 'contact'
                      ? 'bg-amber-500 text-black'
                      : 'bg-zinc-800/80 text-amber-400'
                  }`}>
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-bold block truncate">{labels.contact}</span>
                    <span className="text-[10px] text-zinc-400 truncate block">{labels.contactSub}</span>
                  </div>
                </div>
                <ArrowIcon className="h-4 w-4 text-zinc-500 shrink-0" />
              </button>
            </div>

            {/* المجموعة الرابعة: الإعدادات */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block px-1">
                {labels.groupSettings}
              </span>

              <div className="rounded-2xl border border-zinc-800/90 bg-zinc-950/80 p-3.5 space-y-3">
                {/* Theme Mode */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-medium flex items-center gap-1.5">
                    {theme === 'dark' ? <Moon className="h-3.5 w-3.5 text-sky-400" /> : <Sun className="h-3.5 w-3.5 text-amber-400" />}
                    <span>{labels.appearance}</span>
                  </span>
                  <ThemeSwitcher />
                </div>

                {/* Language Choice */}
                <div className="flex items-center justify-between text-xs pt-1.5 border-t border-zinc-800/60">
                  <span className="text-zinc-400 font-medium flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-sky-400" />
                    <span>{labels.language}</span>
                  </span>
                  <LanguageSelector />
                </div>

                {/* Direct Link to Profile Preferences */}
                <button
                  onClick={() => handleItemClick('profile')}
                  className="w-full mt-1 py-2 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{labels.fullSettingsBtn}</span>
                  <ArrowIcon className="h-3.5 w-3.5 text-zinc-500" />
                </button>
              </div>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-3.5 border-t border-zinc-800/80 bg-zinc-950/90 text-center text-[10px] text-zinc-500">
            <span>RikouZone PRO • منصة التعلم والتطبيق الرقمي</span>
          </div>

        </div>
      </div>
    </div>
  );
};
