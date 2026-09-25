import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { Globe, Check, ChevronDown, Search, X, LayoutGrid, List, Mic, MicOff, Sparkles } from 'lucide-react';
import { AudioRecorder } from '../utils/audioRecorder';
import { transcribeVoiceWithGemini } from '../services/voiceAssistantService';
import { speakWithGeminiOrLocal } from '../utils/textToSpeech';

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'inline' | 'landing-grid' | 'dashboard' | 'compact';
  className?: string;
  idPrefix?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'navbar',
  className = '',
  idPrefix = 'global',
}) => {
  const { currentLanguage, setLanguage, languages, currentLanguageInfo } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [justChanged, setJustChanged] = useState<string | null>(null);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [voiceSearchStatus, setVoiceSearchStatus] = useState<string>('');
  const audioRecorderRef = useRef<AudioRecorder>(new AudioRecorder());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Voice Language Switcher with Gemini Speech Recognition
  const handleVoiceSearch = async () => {
    if (isVoiceListening) {
      setIsVoiceListening(false);
      try {
        setVoiceSearchStatus('Transcribing with Gemini...');
        const { blob, mimeType } = await audioRecorderRef.current.stop();
        const transcription = await transcribeVoiceWithGemini(blob, mimeType, currentLanguage);
        const spoken = (transcription.text || '').toLowerCase().trim();
        const detectedCode = (transcription.detectedLanguage || '').toLowerCase().trim();

        // Match against languages
        const matched = languages.find(
          (l) =>
            l.code.toLowerCase() === detectedCode ||
            spoken.includes(l.name.toLowerCase()) ||
            spoken.includes(l.nativeName.toLowerCase()) ||
            spoken.includes(l.code.toLowerCase())
        );

        if (matched) {
          handleSelectLanguage(matched.code);
          speakWithGeminiOrLocal(
            matched.code === 'bn'
              ? 'বাংলা ভাষা নির্বাচন করা হয়েছে'
              : matched.code === 'hi'
              ? 'हिन्दी भाषा सक्रिय की गई है'
              : `${matched.name} language activated`,
            matched.code as any
          );
        } else if (spoken) {
          setSearchQuery(transcription.text);
        }
      } catch (err) {
        console.warn('Voice language selection error:', err);
      } finally {
        setVoiceSearchStatus('');
      }
      return;
    }

    try {
      await audioRecorderRef.current.start();
      setIsVoiceListening(true);
      setVoiceSearchStatus('Listening... Speak language name');
    } catch (err) {
      console.warn('Could not start microphone for language selection:', err);
      setIsVoiceListening(false);
      setVoiceSearchStatus('');
    }
  };

  // Close when clicking outside with safe delay to prevent premature closing
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    // 10ms timeout prevents the opening click from immediately registering as an outside click
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle active language selection
  const handleSelectLanguage = (code: string) => {
    setLanguage(code);
    setIsOpen(false);
    const selected = languages.find((l) => l.code === code);
    setJustChanged(selected?.nativeName || code.toUpperCase());
    setTimeout(() => {
      setJustChanged(null);
    }, 2200);
  };

  // Filter languages based on search query
  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return languages;
    const query = searchQuery.toLowerCase().trim();
    return languages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(query) ||
        lang.nativeName.toLowerCase().includes(query) ||
        lang.code.toLowerCase().includes(query) ||
        lang.region.toLowerCase().includes(query)
    );
  }, [languages, searchQuery]);

  // Landing Grid variant for the landing page section
  if (variant === 'landing-grid') {
    return (
      <div className={`w-full notranslate ${className}`} data-no-translate="true">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {languages.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelectLanguage(lang.code)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 relative group cursor-pointer ${
                  isSelected
                    ? 'bg-[#f3ead7] border-2 border-[#191970] shadow-sm ring-1 ring-[#191970]/30'
                    : 'bg-[#faf6ee] border border-[#191970] hover:bg-[#f5ede0]'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`font-semibold text-sm ${
                      isSelected ? 'text-[#14120e] font-bold' : 'text-[#2b2720]'
                    }`}
                  >
                    {lang.nativeName}
                  </span>
                  {isSelected ? (
                    <span className="w-4 h-4 rounded-full bg-[#046A38] text-white flex items-center justify-center text-[10px]">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-[#8a806d] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      {lang.code}
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-[#554e42] font-medium leading-tight">
                  {lang.name}
                </div>
                <div className="text-[10px] text-[#7a7262] mt-0.5 truncate w-full">
                  {lang.region}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Inline pill strip variant
  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap items-center gap-1.5 notranslate ${className}`} data-no-translate="true">
        <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#635b4c] mr-1">
          <Globe className="w-3.5 h-3.5 text-[#FF671F]" />
          <span>Select Language:</span>
        </div>
        {languages.slice(0, 7).map((lang) => {
          const isSelected = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelectLanguage(lang.code)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all border border-[#191970] cursor-pointer ${
                isSelected
                  ? 'bg-[#191970] text-white shadow-xs'
                  : 'bg-[#e8e0ce] text-[#3e382d] hover:bg-[#ddd4be]'
              }`}
            >
              {lang.nativeName}
            </button>
          );
        })}
      </div>
    );
  }

  // Dashboard variant: Designed specifically for the citizen dashboard header
  if (variant === 'dashboard') {
    return (
      <div className={`relative notranslate inline-block ${className}`} ref={dropdownRef} data-no-translate="true">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0d4f7d] bg-white hover:bg-[#eef6fb] text-xs font-bold text-[#083b5e] transition-all shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0d4f7d]"
          title="Select Dashboard Language / ভাষা নির্বাচন করুন"
          aria-expanded={isOpen}
        >
          <Globe className="w-3.5 h-3.5 text-[#FF671F] shrink-0" />
          <span className="font-bold">Select Language</span>
          <span className="text-[10px] bg-[#0d4f7d] text-white px-1.5 py-0.2 rounded font-mono font-bold">
            {currentLanguage.toUpperCase()}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#526477] transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div
            className="absolute right-0 top-full mt-1.5 w-[320px] max-w-[calc(100vw-32px)] bg-white rounded-xl p-3 border-2 border-[#0d4f7d] shadow-2xl z-[9999] animate-in fade-in zoom-in-95 duration-150"
            role="menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-1 pb-2 border-b border-[#0d4f7d]/20 flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#083b5e] uppercase tracking-wider">
                Select Language • ভাষা নির্বাচন
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-gray-500 hover:text-black cursor-pointer"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 max-h-[260px] overflow-y-auto">
              {languages.map((lang) => {
                const isSelected = currentLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#eef6fb] border-[#0d4f7d] shadow-2xs font-bold text-[#083b5e]'
                        : 'bg-gray-50/70 border-gray-200 hover:bg-white text-gray-800'
                    }`}
                  >
                    <span className="font-bold text-xs truncate flex-1">{lang.nativeName}</span>
                    <span className="text-[10px] text-gray-500 font-mono uppercase">{lang.code}</span>
                    {isSelected && <Check className="w-3 h-3 text-[#046A38] stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default: Navbar Dropdown with precision-aligned tabular / grid layout
  return (
    <div
      className={`relative inline-block notranslate ${className}`}
      ref={dropdownRef}
      id={`language-switcher-${idPrefix}`}
      data-no-translate="true"
    >
      {/* Primary High-Visibility Language Selection Button */}
      <button
        type="button"
        id={`navbar-language-btn-${idPrefix}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="h-9 inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 rounded-full text-xs font-bold bg-[#e8e1cf] hover:bg-[#ddd5c2] text-[#14120e] border-2 border-[#191970] transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191970] cursor-pointer relative select-none"
        title="Select Language / ভাষা নির্বাচন করুন"
        aria-label={`Select Language. Current active language: ${currentLanguageInfo.nativeName} (${currentLanguage.toUpperCase()})`}
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#FF671F] shrink-0" />
        <span className="font-bold text-[#14120e] whitespace-nowrap">
          Select Language
        </span>
        <span className="text-[10px] bg-[#191970] text-white px-1.5 py-0.5 rounded font-mono font-bold tracking-wide">
          {currentLanguage.toUpperCase()}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#5e5647] shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Floating Confirmation Toast when Language is selected */}
      {justChanged && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-3 py-1 bg-[#046A38] text-white text-[11px] font-bold rounded-md shadow-lg whitespace-nowrap z-[10000] animate-in fade-in slide-in-from-top-1 duration-150 flex items-center gap-1">
          <Check className="w-3 h-3 stroke-[3]" />
          <span>Active: {justChanged}</span>
        </div>
      )}

      {/* Popover Menu with mathematical alignment and full viewport protection */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-[calc(100vw-32px)] sm:w-[390px] max-w-[390px] bg-[#faf6ee] rounded-2xl p-3 border-2 border-[#191970] shadow-2xl z-[9999] animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
          role="menu"
          aria-orientation="vertical"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Title and Mode Switcher */}
          <div className="px-1 pb-2.5 border-b border-[#191970]/20 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#FF671F] shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-[#191970] leading-none">
                  Select Language
                </span>
                <span className="text-[10px] text-[#7a7262] leading-tight">
                  ভাষা নির্বাচন করুন • 12 Official Languages
                </span>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#e8dfcb] p-0.5 rounded-lg border border-[#191970]/20">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#191970] text-white shadow-2xs'
                    : 'text-[#635b4c] hover:text-[#191970]'
                }`}
                title="2-Column Grid Layout"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#191970] text-white shadow-2xs'
                    : 'text-[#635b4c] hover:text-[#191970]'
                }`}
                title="Aligned List Layout"
                aria-label="List view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Search Input with Gemini Voice Mic */}
          <div className="relative my-2">
            <Search className="w-3.5 h-3.5 text-[#7a7262] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search or speak language / ভাষা খুঁজুন..."
              className="w-full pl-8 pr-16 py-1.5 text-xs bg-white border border-[#191970]/30 rounded-lg focus:outline-none focus:border-[#191970] text-[#14120e] placeholder-[#8a8170]"
            />
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-[#7a7262] hover:text-[#14120e] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`p-1 rounded-md transition-all cursor-pointer ${
                  isVoiceListening
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'text-[#191970] hover:bg-[#191970]/10'
                }`}
                title={
                  isVoiceListening
                    ? 'Listening... Click to confirm'
                    : 'Speak language name with Gemini AI'
                }
                aria-label="Speak language name"
              >
                {isVoiceListening ? (
                  <MicOff className="w-3.5 h-3.5" />
                ) : (
                  <Mic className="w-3.5 h-3.5 text-[#FF671F]" />
                )}
              </button>
            </div>
          </div>

          {/* Voice Search Status Notification */}
          {voiceSearchStatus && (
            <div className="mb-2 px-2 py-1 rounded bg-[#FF9933]/15 text-[#191970] text-[11px] font-bold flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-3 h-3 text-[#FF671F]" />
              <span>{voiceSearchStatus}</span>
            </div>
          )}

          {/* Languages Container */}
          {filteredLanguages.length === 0 ? (
            <div className="py-6 text-center text-xs text-[#7a7262]">
              No matching languages found
            </div>
          ) : viewMode === 'grid' ? (
            /* GRID VIEW: Balanced 2-column matrix */
            <div className="grid grid-cols-2 gap-1.5 max-h-[320px] overflow-y-auto pr-0.5">
              {filteredLanguages.map((lang) => {
                const isSelected = currentLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSelectLanguage(lang.code);
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer h-[50px] ${
                      isSelected
                        ? 'bg-[#ede3d0] border-[#191970] shadow-2xs ring-1 ring-[#191970]/40 font-bold'
                        : 'bg-white/80 border-[#191970]/15 hover:bg-white hover:border-[#191970]/50 text-[#2c2820]'
                    }`}
                    role="menuitem"
                    title={`${lang.name} (${lang.nativeName}) — ${lang.region}`}
                  >
                    {/* Language Code Badge */}
                    <span
                      className={`w-7 h-7 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center shrink-0 uppercase transition-colors ${
                        isSelected
                          ? 'bg-[#191970] text-white'
                          : 'bg-[#e8dfcb] text-[#554d41]'
                      }`}
                    >
                      {lang.code}
                    </span>

                    {/* Typography Stack */}
                    <div className="flex flex-col min-w-0 flex-1 justify-center">
                      <span className="text-xs sm:text-[13px] font-bold text-[#14120e] leading-tight truncate">
                        {lang.nativeName}
                      </span>
                      <span className="text-[10px] text-[#635b4c] leading-tight truncate">
                        {lang.name}
                      </span>
                    </div>

                    {/* Checkmark Slot */}
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-[#046A38] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* LIST VIEW: Aligned 4-column structured table */
            <div className="space-y-1 max-h-[320px] overflow-y-auto pr-0.5">
              <div className="grid grid-cols-[32px_105px_1fr_20px] items-center gap-2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7a7262] border-b border-[#191970]/15 mb-1">
                <span>Code</span>
                <span>Native</span>
                <span>English / Region</span>
                <span className="text-right">State</span>
              </div>

              {filteredLanguages.map((lang) => {
                const isSelected = currentLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSelectLanguage(lang.code);
                    }}
                    className={`w-full grid grid-cols-[32px_105px_1fr_20px] items-center gap-2 px-2.5 py-1.5 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#ede3d0] font-bold text-[#14120e] border border-[#191970]/40 shadow-2xs'
                        : 'hover:bg-[#f1e9da] text-[#2c2820] border border-transparent'
                    }`}
                    role="menuitem"
                    title={`${lang.name} (${lang.nativeName}) — ${lang.region}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center uppercase ${
                        isSelected
                          ? 'bg-[#191970] text-white'
                          : 'bg-[#e8dfcb] text-[#554d41]'
                      }`}
                    >
                      {lang.code}
                    </span>

                    <span className="text-sm font-bold text-[#14120e] truncate">
                      {lang.nativeName}
                    </span>

                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-[#2b2720] truncate">
                        {lang.name}
                      </span>
                      <span className="text-[10px] text-[#7a7262] truncate">
                        {lang.region}
                      </span>
                    </div>

                    <div className="w-5 h-5 flex items-center justify-end">
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-[#046A38] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Direct Native Select Quick Fallback */}
          <div className="mt-2.5 pt-2 border-t border-[#191970]/20 px-1 flex items-center justify-between gap-2 text-xs">
            <span className="text-[11px] text-[#554d41] font-semibold">Quick Switch:</span>
            <select
              aria-label="Direct Language Dropdown"
              value={currentLanguage}
              onChange={(e) => handleSelectLanguage(e.target.value)}
              className="px-2 py-1 text-xs rounded border border-[#191970]/40 bg-white text-[#191970] font-bold focus:outline-none focus:border-[#191970] cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeName} ({l.name})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
