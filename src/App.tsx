import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { ThemeProvider } from './theme/ThemeContext';
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
import { AffiliateMarketingView } from './components/affiliate/AffiliateMarketingView';
import { TikTokAffiliateView } from './components/tiktok-affiliate/TikTokAffiliateView';
import { YouTubeMonetizationView } from './components/youtube/YouTubeMonetizationView';
import { InstagramMonetizationView } from './components/instagram/InstagramMonetizationView';
import { FacebookMonetizationView } from './components/facebook/FacebookMonetizationView';
import { BloggingMonetizationView } from './components/blogging/BloggingMonetizationView';
import { SeoServicesView } from './components/seo-services/SeoServicesView';
import { FreelanceWritingView } from './components/writing/FreelanceWritingView';
import { CopywritingView } from './components/copywriting/CopywritingView';
import { VideoEditingView } from './components/video-editing/VideoEditingView';
import { GraphicDesignView } from './components/graphic-design/GraphicDesignView';
import { ThumbnailDesignView } from './components/thumbnail-design/ThumbnailDesignView';
import { WebDevelopmentView } from './components/web-development/WebDevelopmentView';
import { MobileAppDevelopmentView } from './components/mobile-app/MobileAppDevelopmentView';
import { SocialMediaManagementView } from './components/social-media/SocialMediaManagementView';
import { UgcContentCreationView } from './components/ugc/UgcContentCreationView';
import { AiContentServicesView } from './components/ai-content/AiContentServicesView';
import { AiAutomationAgencyView } from './components/ai-automation/AiAutomationAgencyView';
import { DigitalProductsView } from './components/digital-products/DigitalProductsView';
import { SellingTemplatesView } from './components/templates/SellingTemplatesView';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { IncomePath, ContentIdea } from './types';
import AdBanner from "./components/common/AdBanner";
const SAVED_ITEMS_KEY = 'rikouzone_saved_items';

function MainApp() {
  const { t } = useLanguage();
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
        showToast(type === 'income' ? t.toasts.removedIncome : t.toasts.removedIdea, 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast(type === 'income' ? t.toasts.savedIncome : t.toasts.savedIdea, 'success');
        return [...prev, id];
      }
    });
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const handleClearAllSaved = () => {
    setSavedIds([]);
    showToast(t.toasts.clearedAll, 'info');
  };

  const handleCopyText = (text: string, label: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(label, 'success');
        }).catch(() => {
          fallbackCopy(text, label);
        });
      } else {
        fallbackCopy(text, label);
      }
    } catch {
      fallbackCopy(text, label);
    }
  };

  const fallbackCopy = (text: string, label: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '-9999px';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        showToast(label, 'success');
      } else {
        showToast(t.toasts.copyError, 'error');
      }
    } catch {
      showToast(t.toasts.copyError, 'error');
    }
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
            <AdBanner />
            <HomeFeatured
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
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'affiliate' && (
          <AffiliateMarketingView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'tiktok-affiliate' && (
          <TikTokAffiliateView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'youtube-monetization' && (
          <YouTubeMonetizationView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'instagram-monetization' && (
          <InstagramMonetizationView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'facebook-monetization' && (
          <FacebookMonetizationView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'blogging' && (
          <BloggingMonetizationView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'seo-services' && (
          <SeoServicesView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'freelance-writing' && (
          <FreelanceWritingView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'copywriting' && (
          <CopywritingView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'video-editing' && (
          <VideoEditingView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'graphic-design' && (
          <GraphicDesignView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'thumbnail-design' && (
          <ThumbnailDesignView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'web-development' && (
          <WebDevelopmentView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'app-development' && (
          <MobileAppDevelopmentView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'social-media-management' && (
          <SocialMediaManagementView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {(currentTab === 'ugc-content' || currentTab === 'ugc') && (
          <UgcContentCreationView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {(currentTab === 'ai-content-services' || currentTab === 'ai-content') && (
          <AiContentServicesView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {(currentTab === 'ai-automation-services' || currentTab === 'ai-automation' || currentTab === 'aaa') && (
          <AiAutomationAgencyView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {(currentTab === 'selling-digital-products' || currentTab === 'digital-products' || currentTab === 'ebooks') && (
          <DigitalProductsView
            onNavigate={handleNavigate}
            onCopyText={handleCopyText}
          />
        )}

        {(currentTab === 'selling-templates' || currentTab === 'templates' || currentTab === 'notion-canva-templates') && (
          <SellingTemplatesView
            onNavigate={handleNavigate}
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
        onNavigateToAffiliate={() => handleNavigate('affiliate')}
        onNavigateToTikTokAffiliate={() => handleNavigate('tiktok-affiliate')}
        onNavigateToYouTube={() => handleNavigate('youtube-monetization')}
        onNavigateToInstagram={() => handleNavigate('instagram-monetization')}
        onNavigateToFacebook={() => handleNavigate('facebook-monetization')}
        onNavigateToBlogging={() => handleNavigate('blogging')}
        onNavigateToSeoServices={() => handleNavigate('seo-services')}
        onNavigateToWriting={() => handleNavigate('freelance-writing')}
        onNavigateToCopywriting={() => handleNavigate('copywriting')}
        onNavigateToVideoEditing={() => handleNavigate('video-editing')}
        onNavigateToGraphicDesign={() => handleNavigate('graphic-design')}
        onNavigateToThumbnailDesign={() => handleNavigate('thumbnail-design')}
        onNavigateToWebDev={() => handleNavigate('web-development')}
        onNavigateToAppDev={() => handleNavigate('app-development')}
        onNavigateToSocialMedia={() => handleNavigate('social-media-management')}
        onNavigateToUgc={() => handleNavigate('ugc-content')}
        onNavigateToAiContent={() => handleNavigate('ai-content-services')}
        onNavigateToAiAutomation={() => handleNavigate('ai-automation-services')}
        onNavigateToDigitalProducts={() => handleNavigate('selling-digital-products')}
        onNavigateToTemplates={() => handleNavigate('selling-templates')}
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
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider>
          <MainApp />
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
