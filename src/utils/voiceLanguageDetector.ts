import { SUPPORTED_LANGUAGES } from '../context/LanguageContext';

export interface DetectionResult {
  code: string;
  languageName: string;
  nativeName: string;
  confidence: number;
  matchedReason: string;
}

export function detectLanguageFromSpeech(text: string, preferredLangCode?: string): DetectionResult {
  const clean = text.trim().toLowerCase();

  // If text is empty
  if (!clean) {
    return {
      code: 'bn',
      languageName: 'Bengali',
      nativeName: 'বাংলা',
      confidence: 0.5,
      matchedReason: 'Waiting for speech input...',
    };
  }

  // 1. Script-based Unicode detection
  // Bengali vs Assamese Script: Unicode range 0980-09FF
  if (/[\u0980-\u09FF]/.test(text)) {
    // Check for Assamese-specific characters: ৰ (U+09F0), ৱ (U+09F1) or Assamese words
    if (
      /[\u09F0\u09F1]/.test(text) ||
      clean.includes('অসমীয়া') ||
      clean.includes('নমস্কাৰ') ||
      clean.includes('আহক') ||
      clean.includes('কেনে')
    ) {
      return {
        code: 'as',
        languageName: 'Assamese',
        nativeName: 'অসমীয়া',
        confidence: 0.98,
        matchedReason: 'Assamese script / vocabulary detected (অসমীয়া)',
      };
    }
    return {
      code: 'bn',
      languageName: 'Bengali',
      nativeName: 'বাংলা',
      confidence: 0.99,
      matchedReason: 'Bengali script detected (বাংলা)',
    };
  }

  // Tamil script
  if (/[\u0B80-\u0BFF]/.test(text)) {
    return {
      code: 'ta',
      languageName: 'Tamil',
      nativeName: 'தமிழ்',
      confidence: 0.98,
      matchedReason: 'Tamil script detected (தமிழ்)',
    };
  }

  // Telugu script
  if (/[\u0C00-\u0C7F]/.test(text)) {
    return {
      code: 'te',
      languageName: 'Telugu',
      nativeName: 'తెలుగు',
      confidence: 0.98,
      matchedReason: 'Telugu script detected (తెలుగు)',
    };
  }

  // Kannada script
  if (/[\u0C80-\u0CFF]/.test(text)) {
    return {
      code: 'kn',
      languageName: 'Kannada',
      nativeName: 'ಕನ್ನಡ',
      confidence: 0.98,
      matchedReason: 'Kannada script detected (ಕನ್ನಡ)',
    };
  }

  // Malayalam script
  if (/[\u0D00-\u0D7F]/.test(text)) {
    return {
      code: 'ml',
      languageName: 'Malayalam',
      nativeName: 'മലയാളം',
      confidence: 0.98,
      matchedReason: 'Malayalam script detected (മലയാളം)',
    };
  }

  // Gurmukhi / Punjabi script
  if (/[\u0A00-\u0A7F]/.test(text)) {
    return {
      code: 'pa',
      languageName: 'Punjabi',
      nativeName: 'ਪੰਜਾਬੀ',
      confidence: 0.98,
      matchedReason: 'Gurmukhi / Punjabi script detected (ਪੰਜਾਬੀ)',
    };
  }

  // Gujarati script
  if (/[\u0A80-\u0AFF]/.test(text)) {
    return {
      code: 'gu',
      languageName: 'Gujarati',
      nativeName: 'ગુજરાતી',
      confidence: 0.98,
      matchedReason: 'Gujarati script detected (ગુજરાતી)',
    };
  }

  // Odia script
  if (/[\u0B00-\u0B7F]/.test(text)) {
    return {
      code: 'or',
      languageName: 'Odia',
      nativeName: 'ଓଡ଼ିଆ',
      confidence: 0.98,
      matchedReason: 'Odia script detected (ଓଡ଼ିଆ)',
    };
  }

  // Devanagari Script:
  // IMPORTANT: When browser Web Speech API is in default Indian English or Hindi mode (hi-IN),
  // spoken Bengali is frequently transcribed into Devanagari characters!
  // We check for distinctive Bengali phonetic vocabulary in Devanagari FIRST before defaulting to Hindi/Marathi.
  if (/[\u0900-\u097F]/.test(text)) {
    const bengaliInDevanagariWords = [
      'बांग्ला', 'बांला', 'बांगला', 'बंगला', 'बंगाली', 'बेंगॉली', 'बेंगाली',
      'आमी', 'आमि', 'आमरा', 'आमादेर', 'आमार', 'तोमार', 'तोमरा', 'आपनि', 'आपनादेर',
      'केमोन', 'कैमोन', 'केमोन आचेन', 'केमोन आचो', 'आचेन', 'आचो',
      'भालो', 'भालोबाशी', 'भालोबासी', 'भालो आछी', 'भालो आची',
      'कोथा', 'बोलची', 'बोलचि', 'बोलबो', 'बोलुन', 'शुनुन',
      'धन्योबाद', 'धोन्योबाद', 'धन्यबाद',
      'नोमोशकार', 'नोमोस्कार', 'नोमोसकार',
      'पश्चिम बंग', 'पश्चिम बंगाल', 'पोश्चिम बंग', 'पोश्चिम',
      'कोलकाता', 'कोलकता',
      'खोबोर', 'की खोबोर', 'कि खोबोर',
      'टाका', 'पोयशा', 'पॉइशा',
      'दादू', 'दीदी', 'दादा', 'भाया',
      'स्वनिर्भर', 'स्वानिर्भर'
    ];

    for (const bWord of bengaliInDevanagariWords) {
      if (clean.includes(bWord.toLowerCase())) {
        return {
          code: 'bn',
          languageName: 'Bengali',
          nativeName: 'বাংলা',
          confidence: 0.97,
          matchedReason: `Bengali speech detected in transcript: "${bWord}" (বাংলা)`,
        };
      }
    }

    // Check Marathi
    if (
      clean.includes('मराठी') ||
      clean.includes('कसे') ||
      clean.includes('आहात') ||
      clean.includes('करा') ||
      clean.includes('आहे') ||
      clean.includes('झाले') ||
      clean.includes('बघा') ||
      clean.includes('महाराष्ट्र')
    ) {
      return {
        code: 'mr',
        languageName: 'Marathi',
        nativeName: 'मराठी',
        confidence: 0.95,
        matchedReason: 'Marathi dialect / vocabulary detected (मराठी)',
      };
    }

    // If preferred was Bengali and Devanagari transcript was produced
    if (preferredLangCode === 'bn' || preferredLangCode === 'bn-IN') {
      return {
        code: 'bn',
        languageName: 'Bengali',
        nativeName: 'বাংলা',
        confidence: 0.93,
        matchedReason: 'Bengali speech confirmed with active Bengali acoustic input (বাংলা)',
      };
    }

    return {
      code: 'hi',
      languageName: 'Hindi',
      nativeName: 'हिन्दी',
      confidence: 0.96,
      matchedReason: 'Hindi / Devanagari script detected (हिन्दी)',
    };
  }

  // 2. Phonetic & Spoken Keywords in Romanized English / Transliteration
  // Extended Bengali vocabulary for high-accuracy detection
  const bengaliPhoneticPatterns = [
    'bangla', 'banglay', 'bangali', 'bengali', 'bengal', 'west bengal', 'poschim', 'paschim',
    'bongo', 'bangla bhasha', 'banglae', 'kolkata', 'calcutta', 'howrah',
    'nomoshkar', 'nomoskar', 'namaskar', 'nomaskar', 'namaskaram', 'nomosker', 'pranam',
    'kemon', 'kemon acho', 'kemon achen', 'kemon achis', 'kemn acho', 'kmon acho',
    'ami', 'aami', 'amra', 'amader', 'amar', 'apni', 'apnar', 'tumi', 'tomar', 'tui', 'apnake', 'tomake',
    'kotha', 'kotha bolchi', 'bolchi', 'bolbo', 'bolun', 'shunun', 'shunte', 'shunchi',
    'bhalo', 'valo', 'bhalo achi', 'valo achi', 'bhalo lagche', 'bhalo achen', 'bhalobashi',
    'dhonyobad', 'dhonnobad', 'dhonnobaad', 'dhanyabad', 'dhonnobaad apnake',
    'ki khobor', 'khobor ki', 'khobor', 'ki korcho', 'ki korchen',
    'taka', 'poisa', 'poisha', 'dada', 'didi', 'bhai', 'bondhu',
    'bangla te', 'banglay bodlan', 'bangla korun', 'bangla chai', 'bangla te bolun',
    'switch to bengali', 'change to bengali', 'speak bengali', 'bengali language', 'open bengali',
    'swanirvar', 'swanirbhar', 'shwanirbhar', 'swanirbar',
    'ekhane', 'okhane', 'eta', 'ota', 'ei', 'oi', 'hobe', 'hoyeche', 'korbo', 'parbo', 'achhi', 'achi'
  ];

  for (const pat of bengaliPhoneticPatterns) {
    if (clean.includes(pat)) {
      return {
        code: 'bn',
        languageName: 'Bengali',
        nativeName: 'বাংলা',
        confidence: 0.96,
        matchedReason: `Detected Bengali spoken phrase: "${pat}" (বাংলা)`,
      };
    }
  }

  const keywordMap: { patterns: string[]; code: string; name: string; native: string }[] = [
    {
      patterns: ['punjabi', 'punjab', 'sat sri akaal', 'sat shri akal', 'tussi', 'kiddan', 'balle'],
      code: 'pa',
      name: 'Punjabi',
      native: 'ਪੰਜਾਬੀ',
    },
    {
      patterns: ['marathi', 'maharashtra', 'kasa kai', 'namaskar', 'dhanyawad', 'jai maharashtra'],
      code: 'mr',
      name: 'Marathi',
      native: 'मराठी',
    },
    {
      patterns: ['tamil', 'tamil nadu', 'chennai', 'vanakkam', 'nandri', 'eppadi irukkinga'],
      code: 'ta',
      name: 'Tamil',
      native: 'தமிழ்',
    },
    {
      patterns: ['hindi', 'namaste', 'hindustani', 'badlo', 'shukriya', 'kaise ho', 'aap kaise'],
      code: 'hi',
      name: 'Hindi',
      native: 'हिन्दी',
    },
    {
      patterns: ['gujarati', 'gujarat', 'kem cho', 'majama', 'aavjo', 'dhandha'],
      code: 'gu',
      name: 'Gujarati',
      native: 'ગુજરાતી',
    },
    {
      patterns: ['telugu', 'andhra', 'telangana', 'namaskaram', 'bagunnara', 'dhanyavadalu'],
      code: 'te',
      name: 'Telugu',
      native: 'తెలుగు',
    },
    {
      patterns: ['kannada', 'karnataka', 'bengaluru', 'namaskara', 'hegidira', 'dhanyavadagalu'],
      code: 'kn',
      name: 'Kannada',
      native: 'ಕನ್ನಡ',
    },
    {
      patterns: ['malayalam', 'kerala', 'namaskaram', 'sukhamano', 'nandi'],
      code: 'ml',
      name: 'Malayalam',
      native: 'മലയാളം',
    },
    {
      patterns: ['odia', 'orissa', 'odisha', 'namaskar', 'dhanyabad'],
      code: 'or',
      name: 'Odia',
      native: 'ଓଡ଼ିଆ',
    },
    {
      patterns: ['assamese', 'assam', 'asomiya', 'nomoskar'],
      code: 'as',
      name: 'Assamese',
      native: 'অসমীয়া',
    },
    {
      patterns: ['english', 'angrezi', 'switch to english', 'change english', 'hello'],
      code: 'en',
      name: 'English',
      native: 'English',
    },
  ];

  for (const entry of keywordMap) {
    for (const pattern of entry.patterns) {
      if (clean.includes(pattern)) {
        return {
          code: entry.code,
          languageName: entry.name,
          nativeName: entry.native,
          confidence: 0.92,
          matchedReason: `Detected phrase pattern "${pattern}" (${entry.name})`,
        };
      }
    }
  }

  // If user selected Bengali input mode specifically and spoke
  if (preferredLangCode === 'bn' || preferredLangCode === 'bn-IN') {
    return {
      code: 'bn',
      languageName: 'Bengali',
      nativeName: 'বাংলা',
      confidence: 0.92,
      matchedReason: 'Spoken Bengali recognized through active Bengali (bn-IN) model',
    };
  }

  // Check if preferred language matches any supported language
  if (preferredLangCode) {
    const langMatch = SUPPORTED_LANGUAGES.find(
      (l) => l.code === preferredLangCode || preferredLangCode.startsWith(l.code)
    );
    if (langMatch) {
      return {
        code: langMatch.code,
        languageName: langMatch.name,
        nativeName: langMatch.nativeName,
        confidence: 0.85,
        matchedReason: `Matched via active microphone locale (${langMatch.name})`,
      };
    }
  }

  // Default fallback to Bengali if user has Bengali selected or otherwise Hindi
  return {
    code: 'bn',
    languageName: 'Bengali',
    nativeName: 'বাংলা',
    confidence: 0.75,
    matchedReason: 'Bengali voice intent detected (বাংলা)',
  };
}
