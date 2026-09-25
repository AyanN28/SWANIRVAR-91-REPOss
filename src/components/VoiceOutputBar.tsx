import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  Sparkles,
  BookOpen,
  ChevronDown,
} from 'lucide-react';
import {
  speakText,
  stopSpeaking,
  VoiceOutputLanguage,
  VOICE_LANGUAGES,
} from '../utils/textToSpeech';
import { useLanguage } from '../context/LanguageContext';
import { VoiceSaathiLogo } from './VoiceSaathiLogo';

export const VoiceOutputBar: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [selectedVoiceLang, setSelectedVoiceLang] = useState<VoiceOutputLanguage>(
    (currentLanguage as VoiceOutputLanguage) || 'bn'
  );
  const [audioMode, setAudioMode] = useState<'welcome' | 'guide'>('welcome');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPlayingText, setCurrentPlayingText] = useState<string>('');
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.95);
  const [showAllLangs, setShowAllLangs] = useState<boolean>(false);

  // Dynamically adapt voice output language whenever the globally selected language changes
  useEffect(() => {
    if (currentLanguage && VOICE_LANGUAGES[currentLanguage as VoiceOutputLanguage]) {
      setSelectedVoiceLang(currentLanguage as VoiceOutputLanguage);
    }
  }, [currentLanguage]);

  // Handle play narration or welcome
  const handlePlayVoice = (
    langCode: VoiceOutputLanguage = selectedVoiceLang,
    mode: 'welcome' | 'guide' = audioMode
  ) => {
    if (isPlaying && selectedVoiceLang === langCode && audioMode === mode) {
      stopSpeaking();
      setIsPlaying(false);
      setCurrentPlayingText('');
      return;
    }

    setSelectedVoiceLang(langCode);
    setAudioMode(mode);
    setIsPlaying(true);

    // Keep website language in sync with voice
    if (langCode !== currentLanguage) {
      setLanguage(langCode as any);
    }

    const meta = VOICE_LANGUAGES[langCode] || VOICE_LANGUAGES.bn;
    const textToSpeak = mode === 'welcome' ? meta.websiteWelcomeMessage : meta.sampleNarration;
    setCurrentPlayingText(textToSpeak);

    speakText(textToSpeak, langCode, {
      rate: speechSpeed,
      onStart: () => setIsPlaying(true),
      onEnd: () => {
        setIsPlaying(false);
        setCurrentPlayingText('');
      },
      onError: () => {
        setIsPlaying(false);
        setCurrentPlayingText('');
      },
    });
  };

  const handleStop = () => {
    stopSpeaking();
    setIsPlaying(false);
    setCurrentPlayingText('');
  };

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const activeMeta = VOICE_LANGUAGES[selectedVoiceLang] || VOICE_LANGUAGES.bn;
  const currentLangMeta =
    VOICE_LANGUAGES[currentLanguage as VoiceOutputLanguage] || VOICE_LANGUAGES.bn;

  const allLangKeys = Object.keys(VOICE_LANGUAGES) as VoiceOutputLanguage[];

  return (
    <div
      className="w-full bg-[#191970] text-white border-b-2 border-[#FF9933] shadow-md select-none transition-all relative z-30"
      id="voice-output-toolbar"
      aria-label="Voice Saathi Audio Box"
    >
      <div className="max-w-7xl mx-auto py-2 px-3 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-2.5">
        {/* Left: Brand Identity & Mode Selectors */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 shrink-0">
              <VoiceSaathiLogo size={20} color="#ffffff" accentColor="#FF9933" />
              {isPlaying && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-xs font-bold leading-tight">
                <span className="text-[#FF9933]">Voice Saathi Box:</span>
                <span className="text-white font-medium">
                  {isPlaying ? (
                    <span className="text-[#10b981] font-bold">
                      {audioMode === 'welcome' ? 'ওয়েবসাইটে স্বাগতম' : 'নির্দেশিকা'} (
                      {activeMeta.nativeName})
                    </span>
                  ) : (
                    <span>Active: {currentLangMeta.nativeName} ({currentLangMeta.name})</span>
                  )}
                </span>
              </div>
              <span className="text-[10px] text-[#cbd5e1] hidden sm:inline">
                Live vernacular audio narration for rural entrepreneurs & SHGs
              </span>
            </div>
          </div>

          {/* Audio Mode selector: Welcome greeting vs Full portal guide */}
          <div className="inline-flex rounded-lg bg-black/30 p-0.5 border border-white/20 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => {
                setAudioMode('welcome');
                if (isPlaying) handlePlayVoice(selectedVoiceLang, 'welcome');
              }}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                audioMode === 'welcome'
                  ? 'bg-[#FF671F] text-white shadow-xs font-extrabold'
                  : 'text-[#cbd5e1] hover:text-white'
              }`}
              title="Welcome Audio Greeting (ওয়েবসাইটে স্বাগতম বার্তা)"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>স্বাগতম (Welcome)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAudioMode('guide');
                if (isPlaying) handlePlayVoice(selectedVoiceLang, 'guide');
              }}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                audioMode === 'guide'
                  ? 'bg-[#FF671F] text-white shadow-xs font-extrabold'
                  : 'text-[#cbd5e1] hover:text-white'
              }`}
              title="Full Portal Audio Guide (সম্পূর্ণ নির্দেশিকা)"
            >
              <BookOpen className="w-3 h-3" />
              <span>নির্দেশিকা (Guide)</span>
            </button>
          </div>
        </div>

        {/* Right: Dynamic Vernacular Voice Triggers & Controls */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 justify-center lg:justify-end w-full lg:w-auto">
          {/* Active Language Primary Button */}
          <button
            type="button"
            onClick={() => handlePlayVoice(selectedVoiceLang)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
              isPlaying
                ? 'bg-[#FF671F] text-white border-white shadow-md animate-pulse ring-2 ring-[#FF9933]/50'
                : 'bg-gradient-to-r from-[#FF9933] to-[#FF671F] text-white hover:brightness-110 border-white/40 shadow-xs'
            }`}
            title={`Play ${activeMeta.name} Voice (${activeMeta.nativeName})`}
          >
            {isPlaying ? (
              <Square className="w-3 h-3 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>
              {activeMeta.nativeName}{' '}
              <span className="font-normal opacity-90">
                ({audioMode === 'welcome' ? 'Welcome' : 'Guide'})
              </span>
            </span>
          </button>

          {/* Quick Bengali button if not active */}
          {selectedVoiceLang !== 'bn' && (
            <button
              type="button"
              onClick={() => handlePlayVoice('bn')}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
              title="বাংলা অডিও শুনুন"
            >
              বাংলা
            </button>
          )}

          {/* Quick Hindi button if not active */}
          {selectedVoiceLang !== 'hi' && (
            <button
              type="button"
              onClick={() => handlePlayVoice('hi')}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
              title="हिन्दी ऑडियो सुनें"
            >
              हिन्दी
            </button>
          )}

          {/* Quick English button if not active */}
          {selectedVoiceLang !== 'en' && (
            <button
              type="button"
              onClick={() => handlePlayVoice('en')}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
              title="Play English Audio"
            >
              English
            </button>
          )}

          {/* Dropdown for All 12 Languages */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAllLangs(!showAllLangs)}
              className="px-2 py-1 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-[#f8fafc] border border-white/30 flex items-center gap-1 cursor-pointer"
              title="Select any of 12 Indian Languages"
            >
              <span>12 Languages</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showAllLangs && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-[#101046] rounded-xl shadow-2xl border border-[#FF9933]/40 p-1.5 z-50 max-h-60 overflow-y-auto">
                <div className="px-2 py-1 text-[10px] font-bold text-[#FF9933] uppercase tracking-wider border-b border-white/10 mb-1">
                  All Indian Languages
                </div>
                {allLangKeys.map((code) => {
                  const meta = VOICE_LANGUAGES[code];
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        setShowAllLangs(false);
                        handlePlayVoice(code);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        selectedVoiceLang === code
                          ? 'bg-[#FF671F] text-white font-bold'
                          : 'text-[#e2e8f0] hover:bg-white/10'
                      }`}
                    >
                      <span>{meta.nativeName}</span>
                      <span className="text-[10px] opacity-70">{meta.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Stop Audio Button */}
          {isPlaying && (
            <button
              type="button"
              onClick={handleStop}
              className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#ef4444] text-white hover:bg-[#dc2626] flex items-center gap-1 transition-all cursor-pointer border border-white shadow-xs"
              title="Stop audio playback"
            >
              <VolumeX className="w-3 h-3" />
              <span>Stop</span>
            </button>
          )}

          {/* Speed Toggle */}
          <button
            type="button"
            onClick={() =>
              setSpeechSpeed((prev) => (prev === 0.95 ? 0.8 : prev === 0.8 ? 1.1 : 0.95))
            }
            className="px-2 py-1 rounded-full text-[10px] font-mono bg-white/10 hover:bg-white/20 text-[#cbd5e1] border border-white/20 cursor-pointer"
            title="Adjust Voice Speed (0.8x / 1.0x / 1.1x)"
          >
            {speechSpeed === 0.8 ? '0.8x' : speechSpeed === 0.95 ? '1.0x' : '1.1x'}
          </button>
        </div>
      </div>

      {/* Real-time Subtitle Bar when Playing */}
      {isPlaying && currentPlayingText && (
        <div className="w-full bg-[#101046] text-[#f8fafc] px-3 sm:px-6 py-1.5 border-t border-[#FF9933]/30 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping shrink-0" />
            <span className="font-bold text-[#FF9933] shrink-0">
              🗣️ {activeMeta.nativeName} {audioMode === 'welcome' ? 'স্বাগতম:' : 'বিবরণ:'}
            </span>
            <span className="truncate text-[#e2e8f0] font-medium">
              “{currentPlayingText}”
            </span>
          </div>
          <button
            type="button"
            onClick={handleStop}
            className="ml-2 text-[11px] text-[#f87171] hover:text-white underline cursor-pointer shrink-0 font-bold"
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
};
