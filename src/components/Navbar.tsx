import React, { useEffect, useState } from 'react';
import { SwanirvarLogo } from './SwanirvarLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { VoiceAssistantModal } from './VoiceAssistantModal';
import { VoiceSaathiLogo } from './VoiceSaathiLogo';
import { PWAInstallButton } from './PWAInstallButton';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, ArrowUpRight, ShieldCheck, Mic, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeSection?: string;
  currentPage?: 'home' | 'about' | 'auth' | 'dashboard';
  onNavigate?: (page: 'home' | 'about' | 'auth' | 'dashboard', sectionIdOrMode?: string) => void;
  onReplayPreloader?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection = 'top',
  currentPage = 'home',
  onNavigate,
  onReplayPreloader,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 45) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('Overview') || 'Overview', href: '#top', id: 'top' },
    { label: t('Statistics') || 'Statistics', href: '#statistics', id: 'statistics' },
    { label: t('About Us') || 'About Us', href: '#about', id: 'about' },
    { label: t('FAQ') || 'FAQ', href: '#faq', id: 'faq' },
  ];

  const handleLinkClick = (id: string, href: string) => {
    setMobileMenuOpen(false);
    if (id === 'about') {
      if (onNavigate) {
        onNavigate('about');
      } else {
        window.location.hash = '#about';
      }
      return;
    }

    if (id === 'dashboard') {
      if (onNavigate) {
        onNavigate('dashboard');
      } else {
        window.location.hash = '#dashboard';
      }
      return;
    }

    if (currentPage === 'about' || currentPage === 'auth' || currentPage === 'dashboard') {
      if (onNavigate) {
        onNavigate('home', id);
      } else {
        window.location.hash = href;
      }
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`site-header ${isScrolled ? 'scrolled' : ''}`}
        id="header"
      >
        {/* Brand with authentic Tiranga + Ashoka Chakra vector logo */}
        <a
          className="brand-logo-link focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF671F] rounded-lg px-1 py-0.5"
          href="#top"
          id="navbar-brand-logo"
          title="SWANIRVAR — A New Way Towards Aatmanirbhar Bharat"
          aria-label="SWANIRVAR Home"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) {
              onNavigate('home', 'top');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* The SVG logo identical to the preloader reveal */}
            <div
              className={`transition-all duration-300 ease-out flex items-center ${
                isScrolled ? 'h-[30px] sm:h-[34px]' : 'h-[36px] sm:h-[42px]'
              }`}
            >
              <SwanirvarLogo
                idPrefix="navbar"
                className={`w-auto transition-all duration-300 ${
                  isScrolled ? 'h-[30px] sm:h-[34px]' : 'h-[36px] sm:h-[42px]'
                }`}
              />
            </div>

            {/* Verification badge echoing sovereign integrity */}
            <span
              className="hidden 2xl:inline-flex items-center gap-1 text-[11px] font-semibold text-[#046A38] bg-[#046A38]/10 px-2 py-0.5 rounded-full border border-[#191970]"
              title="Aatmanirbhar Bharat Sovereign Platform"
            >
              <ShieldCheck className="w-3 h-3" />
              {t('nav_official')}
            </span>
          </div>
        </a>

        {/* Center Navigation Pill */}
        <nav
          className="nav-pill"
          aria-label="Primary"
          id="navbar-navigation-pill"
        >
          {navLinks.map((link) => {
            const isActive =
              currentPage === 'about'
                ? link.id === 'about'
                : activeSection === link.id && link.id !== 'about';
            return (
              <a
                key={link.id}
                href={link.href}
                className={isActive ? 'active-link' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id, link.href);
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Authentication Controls, Language Switcher & Action */}
        <div className="auth flex items-center gap-1.5 sm:gap-2" id="navbar-auth-actions">
          {/* In-app PWA Install Button */}
          <PWAInstallButton variant="header" />

          {/* Persistent Language Changing Option in Navbar */}
          <LanguageSwitcher variant="navbar" idPrefix="desktop" />

          {/* Voice Saathi: AI Voice Companion (Acts like a friend & assists with forms/outputs) */}
          <button
            type="button"
            onClick={() => setVoiceModalOpen(true)}
            className="h-9 inline-flex items-center gap-1.5 text-xs font-bold text-[#191970] bg-gradient-to-r from-[#faf6ee] to-[#fff8e7] hover:from-white hover:to-white px-2.5 sm:px-3 rounded-full border-2 border-[#FF9933] transition-all shadow-xs cursor-pointer group"
            title="Voice Saathi — AI Voice Companion & Assistant (Gemini Powered)"
            aria-label="Open Voice Saathi AI Voice Companion"
          >
            <VoiceSaathiLogo size={18} color="#191970" accentColor="#FF671F" className="group-hover:scale-110 transition-transform" />
            <span className="font-bold text-[#191970]">
              {currentLanguage === 'bn' ? 'ভয়েস সাথী' : currentLanguage === 'hi' ? 'वॉइस साथी' : 'Voice Saathi'}
            </span>
            <span className="hidden lg:inline-block text-[9px] bg-[#046A38] text-white px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider">
              AI
            </span>
          </button>

          <a
            className={`login login-btn h-9 inline-flex items-center justify-center px-3.5 sm:px-4 rounded-full text-xs sm:text-sm font-semibold border border-[#191970] transition-all ${
              currentPage === 'auth' ? 'bg-[#191970] text-white' : ''
            }`}
            href="#login"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) {
                onNavigate('auth', 'login');
              } else {
                window.location.hash = '#login';
              }
            }}
          >
            {t('nav_login')}
          </a>

          <a
            className="signup signup-btn h-9 inline-flex items-center justify-center px-3.5 sm:px-4.5 rounded-full text-xs sm:text-sm font-semibold border border-[#191970] transition-all shadow-xs"
            href="#signup"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) {
                onNavigate('auth', 'signup');
              } else {
                window.location.hash = '#signup';
              }
            }}
          >
            {t('nav_signup')}
          </a>

          {/* Mobile hamburger toggle button */}
          <button
            type="button"
            className="h-9 w-9 inline-flex md:hidden items-center justify-center rounded-full text-[#0c0c0c] hover:bg-[#e8e1cf] transition-colors ml-0.5 focus:outline-none"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown / Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-3 top-[76px] z-40 bg-[#fbf7ee] rounded-2xl p-5 border-2 border-[#191970] shadow-2xl backdrop-blur-md md:hidden animate-in fade-in slide-in-from-top-3 duration-200 max-h-[85vh] overflow-y-auto"
          id="mobile-navigation-drawer"
        >
          {/* Mobile Language Switcher Section */}
          <div className="mb-4 pb-3 border-b border-[#191970]/30 flex flex-col gap-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#7a7467] flex items-center justify-between">
              <span>{t('nav_change_lang')}</span>
              <LanguageSwitcher variant="navbar" idPrefix="mobile" />
            </div>

            {/* Mobile Voice Recognition Trigger */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setVoiceModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-[#faf6ee] to-[#fff8e7] text-[#191970] hover:bg-white border-2 border-[#FF9933] transition-colors shadow-xs"
            >
              <VoiceSaathiLogo size={20} color="#191970" accentColor="#FF671F" />
              <span>Voice Saathi — AI Voice Companion & Assistant</span>
            </button>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#7a7467] px-3 pb-1 border-b border-[#191970]/30">
              Navigation
            </div>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="px-3 py-2.5 rounded-xl font-medium text-[#111] hover:bg-[#eee6d5] flex items-center justify-between text-base transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id, link.href);
                }}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#8c8270]" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#191970]/30 flex flex-col gap-2.5">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigate) {
                    onNavigate('auth', 'login');
                  } else {
                    window.location.hash = '#login';
                  }
                }}
                className="login-btn py-2.5 px-4 rounded-xl text-center text-sm font-semibold"
              >
                {t('nav_login')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigate) {
                    onNavigate('auth', 'signup');
                  } else {
                    window.location.hash = '#signup';
                  }
                }}
                className="signup-btn py-2.5 px-4 rounded-xl text-center text-sm font-semibold"
              >
                {t('nav_signup')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {authModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={() => setAuthModal(null)}
        >
          <div
            className="bg-[#fcf9f2] border-2 border-[#191970] rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setAuthModal(null)}
              className="absolute top-4 right-4 text-[#665e52] hover:text-[#111] p-1 rounded-full hover:bg-[#ece4d2] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5 flex items-center gap-2">
              <SwanirvarLogo idPrefix="modal" className="h-7 w-auto" />
            </div>

            <h3 className="text-xl font-bold text-[#1a1713] mb-1">
              {authModal === 'login' ? `${t('nav_login')} - SWANIRVAR` : `${t('nav_signup')} - SWANIRVAR`}
            </h3>
            <p className="text-sm text-[#665e52] mb-5">
              {t('hero_subtitle')}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAuthModal(null);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#554d41] mb-1">
                  Email or Mobile Number / ईमेल या मोबाइल नंबर
                </label>
                <input
                  type="text"
                  placeholder="e.g. name@domain.gov.in or 9876543210"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#191970] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#191970]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#554d41] mb-1">
                  Password / Passkey / पासवर्ड
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#191970] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#191970]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-white bg-[#191970] hover:bg-[#0f114a] border border-[#191970] transition-colors shadow-md text-sm"
              >
                {authModal === 'login' ? t('nav_login') : t('nav_signup')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
      />
    </>
  );
};
