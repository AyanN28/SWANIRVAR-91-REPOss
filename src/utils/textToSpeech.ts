// Intelligent Text-to-Speech Engine for all 12 Official Indian Languages & English

export type VoiceOutputLanguage =
  | 'bn'
  | 'hi'
  | 'en'
  | 'mr'
  | 'ta'
  | 'te'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'or'
  | 'as';

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export interface VoiceLanguageMeta {
  code: VoiceOutputLanguage;
  name: string;
  nativeName: string;
  defaultLocale: string;
  sampleNarration: string;
  welcomeMessage: string;
  websiteWelcomeMessage: string;
}

export const VOICE_LANGUAGES: Record<VoiceOutputLanguage, VoiceLanguageMeta> = {
  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    defaultLocale: 'bn-IN',
    sampleNarration:
      'স্বাগতম! স্বনির্ভর ভারত এবং গ্রামীণ স্বনির্ভর যোজনা পোর্টালে আপনাকে স্বাগতম। আপনি এখানে সরকারি অনুদান ও ঋণ সহায়তা পাবেন।',
    welcomeMessage: 'বাংলা ভাষায় পরিবর্তন করা হয়েছে।',
    websiteWelcomeMessage:
      'স্বনির্ভর ওয়েবসাইটে আপনাকে আন্তরিক স্বাগতম! স্বনির্ভর ভারত ও পশ্চিমবঙ্গ গ্রামীণ উদ্যোগ পোর্টালে আপনার যাত্রা শুভ হোক।',
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    defaultLocale: 'hi-IN',
    sampleNarration:
      'स्वनिर्भर भारत एवं ग्रामीण उद्यम पोर्टल में आपका स्वागत है। यहाँ आप स्वरोजगार, मुद्रा लोन और सरकारी योजनाओं की जानकारी पा सकते हैं।',
    welcomeMessage: 'वेबसाइट हिन्दी भाषा में बदल दी गई है।',
    websiteWelcomeMessage:
      'स्वनिर्भर वेबसाइट में आपका हार्दिक स्वागत है! आत्मनिर्भर भारत और ग्रामीण उद्यम पोर्टल में आपका स्वागत है।',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    defaultLocale: 'en-IN',
    sampleNarration:
      'Welcome to Swanirbhar Bharat! Empowering rural entrepreneurs, self-help groups, and local businesses with government support.',
    welcomeMessage: 'Language switched to English.',
    websiteWelcomeMessage:
      'Welcome to the Swanirvar website! Empowering rural entrepreneurs, self-help groups, and local businesses under Aatmanirbhar Bharat.',
  },
  mr: {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    defaultLocale: 'mr-IN',
    sampleNarration:
      'स्वनिर्भर भारत पोर्टलवर आपले सहर्ष स्वागत! ग्रामीण उद्योजक, शेतकरी आणि कारागिरांना शासकीय अनुदान व मुदत कर्ज मिळवून देणे हे आमचे ध्येय आहे.',
    welcomeMessage: 'भाषा मराठी मध्ये बदलण्यात आली आहे.',
    websiteWelcomeMessage:
      'स्वनिर्भर वेबसाइटवर आपले हार्दिक स्वागत आहे! महाराष्ट्र आणि देशभरातील उद्योजकांसाठी डिजिटल व्यासपीठ.',
  },
  ta: {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    defaultLocale: 'ta-IN',
    sampleNarration:
      'சுவநிர்பர் பாரத் போர்ட்டலுக்கு உங்களை அன்புடன் வரவேற்கிறோம்! கிராமப்புற தொழில்முனைவோர், கைவினைஞர்கள் மற்றும் சுயஉதவி குழுக்களுக்கு அரசு மானியங்கள் மற்றும் முத்ரா கடன் வசதிகள்.',
    welcomeMessage: 'மொழி தமிழுக்கு மாற்றப்பட்டுள்ளது.',
    websiteWelcomeMessage:
      'சுவநிர்பர் இணையதளத்திற்கு உங்களை அன்புடன் வரவேற்கிறோம்! சுயசார்பு இந்தியா திட்டத்தின் கீழ் உங்கள் தொழில் வளர்ச்சிக்கு வாழ்த்துகள்.',
  },
  te: {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    defaultLocale: 'te-IN',
    sampleNarration:
      'స్వనిర్భర్ భారత్ పోర్టల్‌కు స్వాగతం! గ్రామీణ వ్యాపారాలు, చేతివృత్తుల కళాకారులు మరియు మహిళా సంఘాలకు ప్రభుత్వ సబ్సిడీలు మరియు ముద్రా రుణ సదుపాయాలు.',
    welcomeMessage: 'భాష తెలుగులోకి మార్చబడింది.',
    websiteWelcomeMessage:
      'స్వనిర్భర్ వెబ్‌సైట్‌కు స్వాగతం! ఆత్మనిర్భర్ భారత్ గ్రామీణ వ్యాపార వేదికపై మీ విజయం ప్రారంభించండి.',
  },
  gu: {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    defaultLocale: 'gu-IN',
    sampleNarration:
      'સ્વનિર્ભર ભારત પોર્ટલમાં આપનું હાર્દિક સ્વાગત છે! ગ્રામીણ ઉદ્યોગસાહસિકો અને કારીગરો માટે સરકારી સબસિડી અને મુદ્રા લોનની સંપૂર્ણ સુવિધા.',
    welcomeMessage: 'ભાષા ગુજરાતીમાં બદલાઈ ગઈ છે.',
    websiteWelcomeMessage:
      'સ્વનિર્ભર વેબસાઇટમાં આપનું હાર્દિક સ્વાગત છે! આત્મનિર્ભર ભારત અભિયાન હેઠળ આપના વ્યવસાયનો વિકાસ કરો.',
  },
  kn: {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    defaultLocale: 'kn-IN',
    sampleNarration:
      'ಸ್ವನಿರ್ಭರ್ ಭಾರತ್ ಪೋರ್ಟಲ್‌ಗೆ ಸ್ವಾಗತ! ಗ್ರಾಮೀಣ ಉದ್ಯಮಿಗಳು, ಕುಶಲಕರ್ಮಿಗಳು ಮತ್ತು ಸ್ವಸಹಾಯ ಸಂಘಗಳಿಗೆ ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿ ಮತ್ತು ಮುದ್ರಾ ಸಾಲ ಸೌಲಭ್ಯಗಳು.',
    welcomeMessage: 'ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ.',
    websiteWelcomeMessage:
      'ಸ್ವನಿರ್ಭರ್ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಆತ್ಮೀಯ ಸ್ವಾಗತ! ಸ್ವಾವಲಂಬಿ ಭಾರತ ನಿರ್ಮಾಣದಲ್ಲಿ ನಿಮ್ಮ ಉದ್ಯಮವನ್ನು ಬೆಳೆಸಿ.',
  },
  ml: {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    defaultLocale: 'ml-IN',
    sampleNarration:
      'സ്വനിർഭർ ഭാരത് പോർട്ടലിലേക്ക് സ്വാഗതം! ഗ്രാമീണ സംരംഭകർക്കും വനിതാ സ്വയംസഹായ സംഘങ്ങൾക്കും സർക്കാർ സബ്‌സിഡിയും വായ്പാ സഹായങ്ങളും.',
    welcomeMessage: 'ഭാഷ മലയാളത്തിലേക്ക് മാറ്റിയിരിക്കുന്നു.',
    websiteWelcomeMessage:
      'സ്വനിർഭർ വെബ്സൈറ്റിലേക്ക് ഹൃദ്യമായ സ്വാഗതം! ആത്മനിർഭർ ഭാരത് പദ്ധതിയിലൂടെ നിങ്ങളുടെ ബിസിനസ്സ് സ്വപ്നങ്ങൾ സാക്ഷാത്കരിക്കുക.',
  },
  pa: {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    defaultLocale: 'pa-IN',
    sampleNarration:
      'ਸਵੈਨਿਰਭਰ ਭਾਰਤ ਪੋਰਟਲ ਵਿੱਚ ਤੁਹਾਡਾ ਨਿੱਘਾ ਸਵਾਗਤ ਹੈ! ਪੇਂਡੂ ਉੱਦਮੀਆਂ, ਕਾਰੀਗਰਾਂ ਅਤੇ ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹਾਂ ਲਈ ਸਰਕਾਰੀ ਸਬਸਿਡੀਆਂ ਅਤੇ ਮੁਦਰਾ ਕਰਜ਼ੇ।',
    welcomeMessage: 'ਭਾਸ਼ਾ ਪੰਜਾਬੀ ਵਿੱਚ ਬਦਲ ਦਿੱਤੀ ਗਈ ਹੈ।',
    websiteWelcomeMessage:
      'ਸਵੈਨਿਰਭਰ ਵੈੱਬਸਾਈਟ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ! ਆਤਮਨਿਰਭਰ ਭਾਰਤ ਮੁਹਿੰਮ ਨਾਲ ਆਪਣੇ ਕਾਰੋਬਾਰ ਨੂੰ ਨਵੀਂ ਉਚਾਈਆਂ ਦਿਓ।',
  },
  or: {
    code: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    defaultLocale: 'or-IN',
    sampleNarration:
      'ସ୍ୱନିର୍ଭର ଭାରତ ପୋର୍ଟାଲକୁ ସ୍ୱାଗତ! ଗ୍ରାମୀଣ ଉଦ୍ୟୋଗୀ, କାରିଗର ଏବଂ ସ୍ୱୟଂ ସହାୟକ ଗୋଷ୍ଠୀଙ୍କ ପାଇଁ ସରକାରୀ ଅନୁଦାନ ଓ ଋଣ ସହାୟତା।',
    welcomeMessage: 'ଭାଷା ଓଡ଼ିଆରେ ପରିବର୍ତ୍ତନ ହୋଇଛି।',
    websiteWelcomeMessage:
      'ସ୍ୱନିର୍ଭର ୱେବସାଇଟକୁ ସ୍ୱାଗତ! ଆତ୍ମନିର୍ଭର ଭାରତ ଅଭିଯାନରେ ଆପଣଙ୍କ ଉଦ୍ୟୋଗକୁ ଆଗକୁ ନିଅନ୍ତୁ।',
  },
  as: {
    code: 'as',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    defaultLocale: 'as-IN',
    sampleNarration:
      'স্বনিৰ্ভৰ ভাৰত প’ৰ্টেললৈ স্বাগতম! গ্ৰাম্য উদ্যোগী, শিপিনী আৰু আত্মসহায়ক গোটৰ বাবে চৰকাৰী ৰাজসাহায্য আৰু মুদ্ৰা ঋণৰ সুবিধা।',
    welcomeMessage: 'ভাষা অসমীয়ালৈ সলনি কৰা হৈছে।',
    websiteWelcomeMessage:
      'স্বনিৰ্ভৰ ৱেবছাইটলৈ আন্তৰিক স্বাগতম! আত্মনিৰ্ভৰ ভাৰত অভিযানৰ অধীনত আপোনাৰ উদ্যোগক গঢ়ি তোলক।',
  },
};

let cachedVoices: SpeechSynthesisVoice[] = [];
let bengaliVoiceFound: SpeechSynthesisVoice | null = null;
let isSearchingBengali = false;

// Initialize and cache browser speech synthesis voices with deep Bengali search
export function searchAndFetchBengaliVoice(): Promise<SpeechSynthesisVoice | null> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        cachedVoices = voices;
        // Search specifically for Bengali
        const bnVoice = voices.find((v) => {
          const lang = (v.lang || '').toLowerCase().replace('_', '-');
          const name = (v.name || '').toLowerCase();
          return (
            lang === 'bn-in' ||
            lang === 'bn-bd' ||
            lang.startsWith('bn') ||
            name.includes('bengali') ||
            name.includes('bangla') ||
            name.includes('বাংলা') ||
            name.includes('tapan') ||
            name.includes('bashkar')
          );
        });

        if (bnVoice) {
          bengaliVoiceFound = bnVoice;
          window.dispatchEvent(
            new CustomEvent('swanirvar_bengali_voice_ready', {
              detail: { voice: bnVoice, name: bnVoice.name },
            })
          );
          resolve(bnVoice);
          return true;
        }
      }
      return false;
    };

    if (checkVoices()) return;

    // Retry loop & voiceschanged listener for browsers loading voices asynchronously
    let attempts = 0;
    const intervalId = setInterval(() => {
      attempts++;
      if (checkVoices() || attempts > 15) {
        clearInterval(intervalId);
        resolve(bengaliVoiceFound);
      }
    }, 150);

    const onVoicesChanged = () => {
      if (checkVoices()) {
        window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
        clearInterval(intervalId);
        resolve(bengaliVoiceFound);
      }
    };

    window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
  });
}

function initVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  cachedVoices = window.speechSynthesis.getVoices();
  searchAndFetchBengaliVoice();
  return cachedVoices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  initVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    initVoices();
  };
}

/**
 * Get current status of Bengali Voice Output engine
 */
export function getBengaliVoiceStatus(): {
  fetched: boolean;
  voiceName: string;
  locale: string;
  isNativeBengali: boolean;
  totalVoicesAvailable: number;
} {
  const bnVoice = bengaliVoiceFound || getBestVoice('bn');
  const total = cachedVoices.length;
  if (bnVoice) {
    const isExact =
      (bnVoice.lang || '').toLowerCase().startsWith('bn') ||
      (bnVoice.name || '').toLowerCase().includes('bengali') ||
      (bnVoice.name || '').toLowerCase().includes('bangla');
    return {
      fetched: true,
      voiceName: bnVoice.name,
      locale: bnVoice.lang || 'bn-IN',
      isNativeBengali: isExact,
      totalVoicesAvailable: total,
    };
  }

  return {
    fetched: total > 0,
    voiceName: 'Default Speech Synthesizer (bn-IN mode)',
    locale: 'bn-IN',
    isNativeBengali: false,
    totalVoicesAvailable: total,
  };
}

/**
 * Find the best matching SpeechSynthesisVoice for Bengali, Hindi, or English
 */
export function getBestVoice(langCode: VoiceOutputLanguage): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const meta = VOICE_LANGUAGES[langCode];
  const targetPrefix = langCode.toLowerCase();
  const targetLocale = meta.defaultLocale.toLowerCase();

  // If Bengali, check our cached prioritized Bengali voice first!
  if (langCode === 'bn' && bengaliVoiceFound) {
    return bengaliVoiceFound;
  }

  // 1. Exact locale match (e.g. bn-IN, bn-BD, hi-IN, en-IN)
  const exactLocale = voices.find(
    (v) => v.lang && v.lang.toLowerCase().replace('_', '-') === targetLocale
  );
  if (exactLocale) return exactLocale;

  // 2. Language prefix match (e.g. bn*, hi*, en*)
  const prefixMatch = voices.find((v) => {
    const l = (v.lang || '').toLowerCase();
    return l.startsWith(targetPrefix);
  });
  if (prefixMatch) return prefixMatch;

  // 3. Name-based search across all supported Indian languages
  const nameMatch = voices.find((v) => {
    const n = (v.name || '').toLowerCase();
    switch (langCode) {
      case 'bn':
        return n.includes('bengali') || n.includes('bangla') || n.includes('বাংলা') || n.includes('tapan') || n.includes('bashkar');
      case 'hi':
        return n.includes('hindi') || n.includes('हिन्दी') || n.includes('kalpana') || n.includes('hemant');
      case 'mr':
        return n.includes('marathi') || n.includes('मराठी');
      case 'ta':
        return n.includes('tamil') || n.includes('தமிழ்') || n.includes('valluvar');
      case 'te':
        return n.includes('telugu') || n.includes('తెలుగు') || n.includes('mohan');
      case 'gu':
        return n.includes('gujarati') || n.includes('ગુજરાતી') || n.includes('dhwani');
      case 'kn':
        return n.includes('kannada') || n.includes('ಕನ್ನಡ');
      case 'ml':
        return n.includes('malayalam') || n.includes('മലയാളം');
      case 'pa':
        return n.includes('punjabi') || n.includes('ਪੰਜਾਬੀ');
      case 'or':
        return n.includes('odia') || n.includes('oriya') || n.includes('ଓଡ଼ିଆ');
      case 'as':
        return n.includes('assamese') || n.includes('অসমীয়া');
      case 'en':
        return n.includes('english') || n.includes('india');
      default:
        return false;
    }
  });
  if (nameMatch) {
    if (langCode === 'bn') bengaliVoiceFound = nameMatch;
    return nameMatch;
  }

  // 4. For English fallback
  if (langCode === 'en') {
    return voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('en')) || voices[0] || null;
  }

  // Fallback to any Indian voice or first available voice if specific regional voice is absent
  const genericIndianVoice = voices.find((v) => (v.lang || '').toLowerCase().includes('-in'));
  if (genericIndianVoice) return genericIndianVoice;

  return null;

  // If no specific voice, return null to let browser use default speech engine with bn-IN lang code
  return null;
}

/**
 * Synthesizes speech with fallback audio cue support
 */
export function speakText(
  text: string,
  langCode: VoiceOutputLanguage = 'bn',
  options: SpeakOptions = {}
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported on this device');
    options.onError?.(new Error('SpeechSynthesis not supported'));
    return false;
  }

  try {
    // Cancel any active utterance
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const meta = VOICE_LANGUAGES[langCode] || VOICE_LANGUAGES.bn;

    utterance.lang = meta.defaultLocale;
    utterance.rate = options.rate ?? 0.95; // slightly slower for clear vernacular pronunciation
    utterance.pitch = options.pitch ?? 1.0;
    utterance.volume = options.volume ?? 1.0;

    const matchedVoice = getBestVoice(langCode);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    if (options.onStart) {
      utterance.onstart = () => options.onStart?.();
    }

    utterance.onend = () => {
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      options.onError?.(e);
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Failed to trigger speech synthesis:', err);
    options.onError?.(err);
    return false;
  }
}

/**
 * Stop active speech immediately (both browser and Gemini audio)
 */
export function stopSpeaking(): void {
  if (typeof window !== 'undefined') {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
  }
}

let activeGeminiAudio: HTMLAudioElement | null = null;

/**
 * High-fidelity speech playback:
 * First attempts Gemini TTS (gemini-3.1-flash-tts-preview via /api/voice/tts),
 * seamlessly falling back to high-grade local speech synthesis.
 */
export async function speakWithGeminiOrLocal(
  text: string,
  langCode: VoiceOutputLanguage = 'bn',
  options: SpeakOptions = {}
): Promise<boolean> {
  stopSpeaking();
  if (activeGeminiAudio) {
    activeGeminiAudio.pause();
    activeGeminiAudio = null;
  }

  // Attempt Gemini Studio TTS
  try {
    const res = await fetch('/api/voice/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voiceName: 'Kore' }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.audioBase64) {
        const audioSrc = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
        const audio = new Audio(audioSrc);
        activeGeminiAudio = audio;

        audio.onplay = () => options.onStart?.();
        audio.onended = () => {
          activeGeminiAudio = null;
          options.onEnd?.();
        };
        audio.onerror = () => {
          activeGeminiAudio = null;
          speakText(text, langCode, options);
        };

        await audio.play();
        return true;
      }
    }
  } catch (err) {
    console.info('Gemini TTS unavailable, using local synthesis:', err);
  }

  // Graceful local synthesis fallback
  return speakText(text, langCode, options);
}

/**
 * Check if speech synthesis is currently speaking
 */
export function isCurrentlySpeaking(): boolean {
  if (activeGeminiAudio && !activeGeminiAudio.paused) {
    return true;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
}

/**
 * Play official Welcome to Website speech in Bengali, English, or Hindi
 */
export function playWebsiteWelcome(
  langCode: VoiceOutputLanguage,
  options?: SpeakOptions
): boolean {
  const meta = VOICE_LANGUAGES[langCode] || VOICE_LANGUAGES.bn;
  return speakText(meta.websiteWelcomeMessage, langCode, options);
}
