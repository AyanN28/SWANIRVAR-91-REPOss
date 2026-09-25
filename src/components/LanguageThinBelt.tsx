import React from 'react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';

export const LanguageThinBelt: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  // Duplicate language list for a seamless, continuous marquee flow
  const languageList = [...SUPPORTED_LANGUAGES, ...SUPPORTED_LANGUAGES];

  return (
    <div
      className="w-full bg-[#eee5d3] border-y-2 border-[#191970] py-2 overflow-hidden select-none relative shadow-xs"
      aria-label="Language flow belt"
    >
      <div className="animate-flow-left flex items-center gap-3">
        {languageList.map((lang, index) => {
          const isSelected = currentLanguage === lang.code;
          return (
            <button
              key={`${lang.code}-${index}`}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`shrink-0 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#191970] text-white border border-[#191970] shadow-xs'
                  : 'bg-[#faf6ee] text-[#14120e] border border-[#191970]/50 hover:border-[#191970] hover:bg-white'
              }`}
              title={`Switch language to ${lang.name} (${lang.nativeName})`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSelected ? 'bg-[#FF9933]' : 'bg-[#046A38]'
                }`}
              />
              <span className="font-bold">{lang.nativeName}</span>
              <span className="text-[11px] opacity-75 font-normal">({lang.name})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
