import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Language } from '../../types';
import { Globe, ChevronDown, Check, Search, X } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'header' | 'compact' | 'modal' | 'profile';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'header',
  className = ''
}) => {
  const { language, setLanguage, languages, currentMeta, isRTL, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const filteredLanguages = languages.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.nativeName.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q)
    );
  });

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        id="language-selector-button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-8.5 sm:h-9.5 items-center gap-1 sm:gap-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#101828] px-1.5 sm:px-3 text-xs font-semibold text-slate-700 dark:text-zinc-200 transition-all hover:border-[#2563EB]/40 hover:bg-[#EAF1FF]/40 dark:hover:bg-zinc-900 hover:text-[#2563EB] dark:hover:text-white active:scale-95 shadow-sm shrink-0 cursor-pointer"
        title={t.common.selectLanguage}
      >
        <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#2563EB] dark:text-blue-400 shrink-0 group-hover:rotate-12 transition-transform duration-300 hidden xs:block" />
        <span className="text-sm leading-none shrink-0" role="img" aria-label={currentMeta.name}>
          {currentMeta.flag}
        </span>
        <span className="font-bold text-slate-900 dark:text-zinc-100 hidden sm:inline">
          {currentMeta.nativeName}
        </span>
        <span className="font-bold text-slate-900 dark:text-zinc-100 sm:hidden uppercase text-[10px] sm:text-[11px] shrink-0">
          {currentMeta.code === 'ary' ? 'دارجة' : currentMeta.code.toUpperCase()}
        </span>
        <ChevronDown
          className={`h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400 dark:text-zinc-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-[#2563EB]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          id="language-dropdown-menu"
          aria-label={t.common.selectLanguage}
          className={`absolute top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-20px)] rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#101828] p-2 shadow-xl shadow-slate-900/5 dark:shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
            isRTL ? 'left-0 sm:left-auto sm:right-0' : 'right-0 sm:right-auto sm:left-0'
          }`}
          style={{ maxHeight: 'calc(100vh - 100px)' }}
        >
          {/* Header & Quick Filter */}
          <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-slate-100 dark:border-zinc-800/70">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-[#2563EB] dark:text-blue-400" />
              <span>{t.common.selectLanguage}</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 p-1 rounded-lg cursor-pointer"
              aria-label={t.common.close}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Search Input for smooth quick search */}
          <div className="p-1.5">
            <div className="relative flex items-center">
              <Search className={`absolute ${isRTL ? 'right-2.5' : 'left-2.5'} h-3.5 w-3.5 text-slate-400 dark:text-zinc-500 pointer-events-none`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.common.searchLanguage}
                className={`w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/90 py-1.5 text-xs text-slate-900 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]/20 transition-all ${
                  isRTL ? 'pr-8 pl-3' : 'pl-8 pr-3'
                }`}
                autoFocus
              />
            </div>
          </div>

          {/* Languages List */}
          <div className="mt-1 space-y-1 max-h-64 overflow-y-auto overflow-x-hidden pr-0.5 custom-scrollbar">
            {filteredLanguages.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400 dark:text-zinc-500">
                {t.income.emptyState}
              </div>
            ) : (
              filteredLanguages.map((item) => {
                const isSelected = language === item.code;
                return (
                  <button
                    key={item.code}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(item.code)}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-start transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#EAF1FF] dark:bg-blue-950/40 border border-[#2563EB]/30 text-[#2563EB] dark:text-blue-300 shadow-sm'
                        : 'border border-transparent hover:bg-slate-50 dark:hover:bg-zinc-900/80 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl shrink-0" role="img" aria-label={item.name}>
                        {item.flag}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-[#2563EB] dark:text-blue-400' : 'text-slate-900 dark:text-zinc-100'}`}>
                          {item.nativeName}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">
                          {item.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="rounded bg-slate-100 dark:bg-zinc-800/80 px-1.5 py-0.5 text-[9px] font-mono text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700/50">
                        {item.badge}
                      </span>
                      {isSelected && (
                        <Check className="h-4 w-4 text-[#2563EB] dark:text-blue-400" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
