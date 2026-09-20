import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Header } from './components/layout/Header';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { HomeFeatured } from './components/home/HomeFeatured';
import { IncomePathsView } from './components/income/IncomePathsView';
import { IncomeDetailModal } from './components/income/IncomeDetailModal';
import { ContentIdeasView } from './components/ideas/ContentIdeasView';
import { IdeaDetailModal } from './components/ideas/IdeaDetailModal';
import { ToolsView } from './components/tools/ToolsView';
import { RikouAIView } from './components/ai/RikouAIView';
import { CreatorsView } from './components/creators/CreatorsView';
import { ProfileView } from './components/profile/ProfileView';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { IncomePath, ContentIdea } from './types';
import AdBanner from "./components/common/AdBanner";const SAVED_ITEMS_KEY = 'rikouzone_saved_items';

function MainApp() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_ITEMS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Selected item modal states when opened from home or deep interactions
  const [selectedIncomeModal, setSelectedIncomeModal] = useState<IncomePath | null>(null);
  const [selectedIdeaModal, setSelectedIdeaModal] = useState<ContentIdea | null>(null);

  // Sync saved items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(savedIds));
    } catch (e) {
      console.warn('Failed to persist saved items:', e);
    }
  }, [savedIds]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleSave = (id: string, type: 'income' | 'idea') => {
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        showToast(type === 'income' ? 'تمت إزالة المسار من المفضلة' : 'تمت إزالة الفكرة من المفضلة', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast(type === 'income' ? 'تم حفظ المسار في المفضلة بنجاح!' : 'تم حفظ الفكرة في المفضلة بنجاح!', 'success');
        return [...prev, id];
      }
    });
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const handleClearAllSaved = () => {
    setSavedIds([]);
    showToast('تم مسح جميع العناصر المحفوظة بنجاح', 'info');
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(label, 'success');
    }).catch(() => {
      showToast('تعذر النسخ تلقائياً', 'error');
    });
  };

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        savedCount={savedIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div>
            <Hero onNavigate={handleNavigate} />
            <AdBanner />            <HomeFeatured
              onNavigate={handleNavigate}
              onSelectPath={(path) => setSelectedIncomeModal(path)}
              onSelectIdea={(idea) => setSelectedIdeaModal(idea)}
              onToggleSave={handleToggleSave}
              isSaved={isSaved}
              onCopyText={handleCopyText}
            />
          </div>
        )}

        {currentTab === 'income' && (
          <IncomePathsView
            onToggleSave={handleToggleSave}
            isSaved={isSaved}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'ideas' && (
          <ContentIdeasView
            onToggleSave={handleToggleSave}
            isSaved={isSaved}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'tools' && (
          <ToolsView
            onCopyText={handleCopyText}
            onNavigateToAI={() => handleNavigate('ai')}
          />
        )}

        {currentTab === 'ai' && (
          <RikouAIView onCopyText={handleCopyText} />
        )}

        {currentTab === 'creators' && (
          <CreatorsView
            onNavigateToIdeas={() => handleNavigate('ideas')}
            onNavigateToTools={() => handleNavigate('tools')}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onClearAllSaved={handleClearAllSaved}
            onSelectPath={(path) => setSelectedIncomeModal(path)}
            onSelectIdea={(idea) => setSelectedIdeaModal(idea)}
            onCopyText={handleCopyText}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Modals for Items Opened from Featured Sections */}
      <IncomeDetailModal
        path={selectedIncomeModal}
        onClose={() => setSelectedIncomeModal(null)}
        onToggleSave={(id) => handleToggleSave(id, 'income')}
        isSaved={selectedIncomeModal ? isSaved(selectedIncomeModal.id) : false}
        onCopyText={handleCopyText}
      />

      <IdeaDetailModal
        idea={selectedIdeaModal}
        onClose={() => setSelectedIdeaModal(null)}
        onToggleSave={(id) => handleToggleSave(id, 'idea')}
        isSaved={selectedIdeaModal ? isSaved(selectedIdeaModal.id) : false}
        onCopyText={handleCopyText}
      />

      {/* Branded Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Bottom Navigation */}
      <BottomNavigation
        currentTab={currentTab}
        onNavigate={handleNavigate}
        savedCount={savedIds.length}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
