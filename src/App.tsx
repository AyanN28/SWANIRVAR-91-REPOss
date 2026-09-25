import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { MainContent } from './components/MainContent';
import { AboutUsPage } from './components/AboutUsPage';
import { AuthPage } from './components/AuthPage';
import { CitizenDashboard } from './components/CitizenDashboard';
import { FloatingVoiceButton } from './components/FloatingVoiceButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { translateDOMSubtree } from './utils/domTranslator';

// Ensures every line on every page is immediately translated whenever the page changes
const PageTranslationSyncer: React.FC<{ currentPage: string }> = ({ currentPage }) => {
  const { currentLanguage } = useLanguage();
  useEffect(() => {
    if (typeof document !== 'undefined') {
      translateDOMSubtree(document.body, currentLanguage);
      const t1 = setTimeout(() => {
        translateDOMSubtree(document.body, currentLanguage);
      }, 100);
      const t2 = setTimeout(() => {
        translateDOMSubtree(document.body, currentLanguage);
      }, 350);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [currentPage, currentLanguage]);
  return null;
};

export default function App() {
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<{ name: string; role: string } | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('swanirvar_active_user');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return null;
  });

  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'auth' | 'dashboard'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.startsWith('#about')) return 'about';
      if (
        hash.startsWith('#login') ||
        hash.startsWith('#signup') ||
        hash.startsWith('#auth')
      ) {
        return 'auth';
      }
      if (hash.startsWith('#dashboard')) {
        // If user already authenticated in localStorage, allow dashboard; otherwise start at landing page
        try {
          const saved = localStorage.getItem('swanirvar_active_user');
          if (saved) return 'dashboard';
        } catch (e) {
          // ignore
        }
        return 'home';
      }
    }
    return 'home';
  });

  const [authMode, setAuthMode] = useState<'login' | 'signup'>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#login')) {
      return 'login';
    }
    return 'signup';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#dashboard')) {
        setCurrentPage('dashboard');
      } else if (hash.startsWith('#about')) {
        setCurrentPage('about');
      } else if (hash.startsWith('#login')) {
        setCurrentPage('auth');
        setAuthMode('login');
      } else if (
        hash.startsWith('#signup') ||
        hash.startsWith('#auth') ||
        hash.startsWith('#register')
      ) {
        setCurrentPage('auth');
        setAuthMode('signup');
      } else if (hash === '#top' || hash === '' || hash === '#statistics' || hash === '#faq') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (
    page: 'home' | 'about' | 'auth' | 'dashboard',
    sectionIdOrMode?: string
  ) => {
    setCurrentPage(page);
    if (page === 'dashboard') {
      window.location.hash = '#dashboard';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'auth') {
      const mode = sectionIdOrMode === 'login' ? 'login' : 'signup';
      setAuthMode(mode);
      window.location.hash = `#${mode}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'about') {
      window.location.hash = '#about';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (sectionIdOrMode && sectionIdOrMode !== 'top') {
        window.location.hash = `#${sectionIdOrMode}`;
        setTimeout(() => {
          const el = document.getElementById(sectionIdOrMode);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 60);
      } else {
        window.location.hash = '#top';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleLoginSuccess = (user: { name: string; role: string }) => {
    setUserProfile(user);
    try {
      localStorage.setItem('swanirvar_active_user', JSON.stringify(user));
    } catch (e) {
      // ignore
    }
    // After login the user is directed to this dashboard
    handleNavigate('dashboard');
  };

  const handleLogout = () => {
    setUserProfile(null);
    try {
      localStorage.removeItem('swanirvar_active_user');
    } catch (e) {
      // ignore
    }
    handleNavigate('home', 'top');
  };

  return (
    <LanguageProvider>
      {/* Universal Page Translation Syncer for all pages and lines */}
      <PageTranslationSyncer currentPage={currentPage} />

      {/* 1st: Brand Motion Identity Preloader */}
      {showPreloader && (
        <Preloader durationSeconds={5} onComplete={() => setShowPreloader(false)} />
      )}

      {/* 2nd: Sovereign Landing / About Us / Dashboard Page */}
      <div className="min-h-screen bg-[#f5efe1] relative selection:bg-[#FF671F]/20 selection:text-[#111]">
        {/* Dynamic Responsive Navbar on landing, about, auth */}
        {currentPage !== 'dashboard' && (
          <Navbar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onReplayPreloader={() => setShowPreloader(true)}
          />
        )}

        {/* Page Content Switcher */}
        <main>
          {currentPage === 'home' ? (
            <MainContent onNavigateToLogin={() => handleNavigate('auth', 'login')} />
          ) : currentPage === 'dashboard' ? (
            <CitizenDashboard
              userName={userProfile?.name || 'Venu (Tanjore Artisan)'}
              userRole={userProfile?.role || 'Verified Citizen / VLE Promoter'}
              onNavigateHome={() => handleNavigate('home', 'top')}
              onLogout={handleLogout}
            />
          ) : currentPage === 'about' ? (
            <AboutUsPage onNavigateHome={() => handleNavigate('home', 'top')} />
          ) : (
            <AuthPage
              initialMode={authMode}
              onNavigateHome={() => handleNavigate('home', 'top')}
              onLoginSuccess={handleLoginSuccess}
            />
          )}
        </main>

        {/* Floating Voice Auto-Language Recognition Button */}
        <FloatingVoiceButton />

        {/* Offline Status Connectivity Banner */}
        <OfflineIndicator />
      </div>
    </LanguageProvider>
  );
}
