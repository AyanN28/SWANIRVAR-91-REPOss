import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { VoiceSaathiLogo } from './VoiceSaathiLogo';
import { VoiceAssistantModal } from './VoiceAssistantModal';
import { useLanguage } from '../context/LanguageContext';

export const FloatingVoiceButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage } = useLanguage();

  const pageContext = typeof window !== 'undefined' ? window.location.hash.replace('#', '') || 'home' : 'home';

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 select-none" id="floating-voice-saathi">
        {/* Tooltip badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191970] text-white text-[11px] font-bold shadow-lg border-2 border-[#FF9933] animate-bounce">
          <Sparkles className="w-3 h-3 text-[#FF9933]" />
          <span>
            {currentLanguage === 'bn'
              ? 'ভয়েস সাথী • কথা বলুন'
              : currentLanguage === 'hi'
              ? 'वॉइस साथी • बात करें'
              : 'Voice Saathi • Talk with AI'}
          </span>
        </div>

        {/* Floating Voice Saathi Button with New Brand Logo */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#191970] to-[#2a2a8e] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white focus:outline-none cursor-pointer"
          style={{
            boxShadow: '0 8px 24px rgba(25, 25, 112, 0.45), 0 0 0 3px #FF9933',
          }}
          aria-label="Voice Saathi: AI Voice Companion & Assistant"
          title="Voice Saathi — Your AI Friend & Voice Assistant"
        >
          {/* Subtle radar wave effect */}
          <span className="absolute inset-0 rounded-full border-2 border-[#FF671F] animate-ping opacity-60 pointer-events-none" />
          
          <VoiceSaathiLogo size={30} color="#ffffff" accentColor="#FF9933" className="group-hover:scale-110 transition-transform" />

          {/* Sovereign Voice Saathi badge */}
          <span className="absolute -top-1.5 -left-1.5 px-1.5 py-0.5 rounded-full bg-[#046A38] text-[9px] font-bold text-white border border-white shadow-xs">
            সাথী
          </span>
        </button>
      </div>

      <VoiceAssistantModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        pageContext={pageContext}
      />
    </>
  );
};
