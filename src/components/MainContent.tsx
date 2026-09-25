import React, { useState } from 'react';
import { SwanirvarLogo } from './SwanirvarLogo';
import { IndiaMap } from './IndiaMap';
import { LanguageThinBelt } from './LanguageThinBelt';
import { StatisticsSection } from './StatisticsSection';
import { FAQSection } from './FAQSection';
import { LanguageSwitcher } from './LanguageSwitcher';
import { VoiceAssistantModal } from './VoiceAssistantModal';
import { useLanguage } from '../context/LanguageContext';
import {
  Youtube,
  Github,
  MapPin,
  Mic,
  Volume2,
  ArrowRight,
} from 'lucide-react';
import { speakText, VOICE_LANGUAGES, VoiceOutputLanguage } from '../utils/textToSpeech';

interface MainContentProps {
  onNavigateToLogin?: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({ onNavigateToLogin }) => {
  const { t, setLanguage, currentLanguage } = useLanguage();
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [playingLang, setPlayingLang] = useState<VoiceOutputLanguage | null>(null);

  const handleHeroWelcomeSpeech = (lang: VoiceOutputLanguage) => {
    setPlayingLang(lang);
    setLanguage(lang);
    speakText(VOICE_LANGUAGES[lang].websiteWelcomeMessage, lang, {
      onStart: () => setPlayingLang(lang),
      onEnd: () => setPlayingLang(null),
      onError: () => setPlayingLang(null),
    });
  };

  return (
    <div className="pt-[80px] w-full min-h-screen bg-[#f5efe1] text-[#1c1917] overflow-hidden">
      {/* =========================================================================
          HERO SECTION WITH VISIBLE TRICOLOUR BACKGROUND, NO INVERTED COMMA, AND REVISED ONE-LINER
          ========================================================================= */}
      <section
        id="top"
        className="relative px-4 sm:px-8 py-10 md:py-16 max-w-7xl mx-auto overflow-hidden rounded-3xl my-2 sm:my-4 border-2 border-[#191970]/30 shadow-sm bg-gradient-to-b from-[#FF671F]/18 via-[#FFFFFF]/85 to-[#046A38]/18 backdrop-blur-xs"
      >
        {/* Sovereign Indian Tricolour Ambient Layers in Background */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          {/* Saffron Aura (Top) */}
          <div
            className="absolute -top-16 left-0 right-0 h-[220px] bg-gradient-to-b from-[#FF671F]/40 to-transparent blur-2xl"
          />
          {/* Pure White / Radiant Center Aura */}
          <div
            className="absolute top-1/3 left-1/4 w-[500px] h-[300px] rounded-full bg-white/70 blur-3xl"
          />
          {/* Ashok Chakra Navy Glow (Center Depth) */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full blur-3xl opacity-15 bg-[#191970]"
          />
          {/* India Green Aura (Bottom) */}
          <div
            className="absolute -bottom-16 left-0 right-0 h-[220px] bg-gradient-to-t from-[#046A38]/40 to-transparent blur-2xl"
          />
        </div>

        {/* 2-Column Hero Grid: Quote/Headline on Left, Map of India on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          {/* Left Column: Headline, One-Liner & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Sovereign Tag: PROTOTYPE DEPLOYED */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border-2 border-[#191970] text-xs font-extrabold uppercase tracking-widest text-[#191970] mb-5 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF671F] animate-pulse" />
              <span>{t('PROTOTYPE DEPLOYED')}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#046A38]" />
            </div>

            {/* The Prominent Headline (WITHOUT INVERTED COMMA) */}
            <div className="relative mb-4">
              <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-serif font-black tracking-tight text-[#14120e] leading-[1.14] drop-shadow-xs">
                {t('Indians are the new way of India')}
              </h1>
            </div>

            {/* Revised Exact One-Liner */}
            <p className="text-sm sm:text-base text-[#38332a] leading-relaxed mb-6 max-w-xl font-medium">
              <strong className="font-bold text-[#14120e]">{t('Swanirvar') || 'Swanirvar'}:</strong> {t('Swanirvar: Transforming rural enterprise intent into bank-verified capital through vernacular voice intelligence and deterministic compliance.')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-6 w-full sm:w-auto">
              {/* Primary Gateway: Step 2 in flow (Login -> Dashboard) */}
              <button
                type="button"
                onClick={() => {
                  if (onNavigateToLogin) {
                    onNavigateToLogin();
                  } else {
                    window.location.hash = '#login';
                  }
                }}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF671F] to-[#d95213] text-white font-extrabold text-xs sm:text-sm hover:from-[#e05615] hover:to-[#be4008] transition-all shadow-md flex items-center gap-2 border-2 border-white cursor-pointer"
                title="Enter Citizen Portal, Login, and open Enterprise Dashboard"
              >
                <span>
                  {currentLanguage === 'bn'
                    ? 'লগইন করুন ও ড্যাশবোর্ড দেখুন'
                    : currentLanguage === 'hi'
                    ? 'लॉगिन करें एवं डैशबोर्ड देखें'
                    : 'Citizen Login & Dashboard'}
                </span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                type="button"
                onClick={() => setVoiceModalOpen(true)}
                className="px-6 py-3.5 rounded-full bg-[#191970] text-white font-bold text-xs sm:text-sm hover:bg-[#0f114a] transition-all shadow-md flex items-center gap-2.5 border-2 border-[#FF9933] cursor-pointer"
              >
                <Mic className="w-4 h-4 text-[#FF9933] animate-pulse" />
                <span>{t('Speak in Local Language')}</span>
              </button>

              {/* Instant Welcome to Website Voice Output Bar */}
              <div className="flex flex-wrap items-center rounded-2xl sm:rounded-full bg-white/95 border-2 border-[#191970] p-1 shadow-xs gap-1 max-w-full">
                <button
                  type="button"
                  onClick={() => handleHeroWelcomeSpeech('bn')}
                  className={`px-3 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                    playingLang === 'bn'
                      ? 'bg-[#FF671F] text-white animate-pulse'
                      : 'bg-[#FF671F] hover:bg-[#e05615] text-white'
                  }`}
                  title="Play Bengali Welcome to Website Audio (বাংলায় স্বাগতম শুনুন)"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>ওয়েবসাইটে স্বাগতম (বাংলা)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleHeroWelcomeSpeech('en')}
                  className={`px-2.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    playingLang === 'en'
                      ? 'bg-[#191970] text-white'
                      : 'hover:bg-[#f1f5f9] text-[#191970]'
                  }`}
                  title="Play English Welcome to Website Audio"
                >
                  <span>English</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleHeroWelcomeSpeech('hi')}
                  className={`px-2.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    playingLang === 'hi'
                      ? 'bg-[#191970] text-white'
                      : 'hover:bg-[#f1f5f9] text-[#191970]'
                  }`}
                  title="Play Hindi Welcome to Website Audio"
                >
                  <span>हिन्दी</span>
                </button>
              </div>
            </div>

            {/* Prototype States Quick Indicator */}
            <div className="w-full bg-white/90 rounded-2xl p-3 border-2 border-[#191970] flex items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF671F] shrink-0" />
                <span className="text-xs font-bold text-[#14120e]">
                  {t('Active Prototype Corridor:')}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-bold text-[#191970]">
                <span className="px-2 py-0.5 rounded-md bg-[#FF671F]/10 border border-[#191970]/30">{t('Punjab')}</span>
                <span className="px-2 py-0.5 rounded-md bg-[#FF671F]/10 border border-[#191970]/30">{t('Maharashtra')}</span>
                <span className="px-2 py-0.5 rounded-md bg-[#FF671F]/10 border border-[#191970]/30">{t('West Bengal')}</span>
                <span className="px-2 py-0.5 rounded-md bg-[#FF671F]/10 border border-[#191970]/30">{t('Tamil Nadu')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map of India with Prototype Markers */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <IndiaMap />
          </div>
        </div>
      </section>

      {/* =========================================================================
          THIN BELT WITH LANGUAGE FLOW (NO EXTRA TEXT)
          ========================================================================= */}
      <LanguageThinBelt />

      {/* =========================================================================
          STATISTICS SECTION (AS SPECIFIED WITH EXACT HTML/CSS/JS TELEMETRY COUNTER)
          ========================================================================= */}
      <StatisticsSection />

      {/* =========================================================================
          FAQ SECTION
          ========================================================================= */}
      <FAQSection />

      {/* =========================================================================
          FOOTER SECTION (AS REQUESTED)
          Left: Logo, under this "Made in India"
          Middle: Special thanks to as a list: SIH, MOSJE
          Right: Link with YouTube and GitHub
          Theme dynamics: Midnight Blue (#191970) with midnight blue border edges
          ========================================================================= */}
      <footer id="contact" className="w-full bg-[#191970] text-[#f8fafc] border-t-4 border-[#191970] mt-16 shadow-2xl">
        <div className="max-w-7xl mx-auto pt-12 pb-14 px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-10">
            {/* Left Column: Logo and Made in India */}
            <div className="flex flex-col items-start gap-3">
              <a
                href="#top"
                className="focus:outline-none rounded-lg"
                aria-label="SWANIRVAR Home"
              >
                <SwanirvarLogo idPrefix="footer" className="h-10 w-auto" />
              </a>

              {/* Under this: Made in India */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white uppercase tracking-wider mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933]" />
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80]" />
                <span>{t('Made in India')}</span>
              </div>

              <p className="text-xs text-[#cbd5e1] mt-1 leading-relaxed max-w-sm">
                {t('Sovereign national platform empowering verified MSMEs, state treasuries, and citizen entrepreneurs under Aatmanirbhar Bharat.')}
              </p>
            </div>

            {/* Middle Column: Special thanks to as a list: SIH, MOSJE */}
            <div className="flex flex-col items-start md:items-center">
              <div className="w-fit">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF9933] mb-3">
                  {t('Special thanks to')}
                </div>
                <ul className="space-y-2.5 text-sm text-[#f1f5f9]">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
                    <span className="font-bold text-white">SIH</span>
                    <span className="text-xs text-[#cbd5e1]">({t('Smart India Hackathon')})</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF9933]" />
                    <span className="font-bold text-white">MOSJE</span>
                    <span className="text-xs text-[#cbd5e1]">({t('Ministry of Social Justice and Empowerment')})</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Links with YouTube and GitHub */}
            <div className="flex flex-col items-start md:items-end">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF9933] mb-3">
                {t('Connect & Repository')}
              </div>
              <div className="flex flex-col gap-2.5 w-full sm:w-auto">
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all hover:translate-x-1"
                  aria-label="Visit SWANIRVAR on YouTube"
                >
                  <Youtube className="w-4 h-4 text-[#ef4444]" />
                  <span>{t('YouTube')}</span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all hover:translate-x-1"
                  aria-label="View SWANIRVAR on GitHub"
                >
                  <Github className="w-4 h-4 text-white" />
                  <span>{t('GitHub Repository')}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Tiranga Color Ribbon */}
          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#cbd5e1] gap-4">
            <div>
              © {new Date().getFullYear()} SWANIRVAR • A Sovereign Initiative for Aatmanirbhar Bharat
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="text-[#FF9933] font-bold">SAFFRON</span> •
              <span className="text-white font-bold">WHITE</span> •
              <span className="text-[#4ade80] font-bold">GREEN</span> •
              <span className="text-[#93c5fd] font-bold">ASHOKA NAVY</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
      />
    </div>
  );
};
