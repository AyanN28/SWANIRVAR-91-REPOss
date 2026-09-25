import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Volume2,
  X,
  User,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  FileSpreadsheet,
  MessageSquare,
  Lock,
  LogIn,
  UserPlus,
  Globe,
} from 'lucide-react';
import {
  speakText,
  speakWithGeminiOrLocal,
  stopSpeaking,
  getBengaliVoiceStatus,
  searchAndFetchBengaliVoice,
  VoiceOutputLanguage,
  VOICE_LANGUAGES,
} from '../utils/textToSpeech';
import { useLanguage } from '../context/LanguageContext';
import { VoiceSaathiLogo } from './VoiceSaathiLogo';
import { AudioRecorder } from '../utils/audioRecorder';
import { transcribeVoiceWithGemini } from '../services/voiceAssistantService';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'sathi';
  text: string;
  detectedLang?: {
    code: string;
    name: string;
    nativeName: string;
  };
  boxes?: Record<string, string>;
  timestamp: string;
}

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageContext?: string;
  currentOutputsSummary?: string;
}

const RECOGNITION_LOCALES: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  gu: 'gu-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  pa: 'pa-IN',
  or: 'or-IN',
  as: 'as-IN',
};

const WELCOME_MESSAGES: Record<string, string> = {
  bn: 'নমস্কার বন্ধু! আমি আপনার ভয়েস সাথী (Voice Saathi)। আপনার গ্রামীণ ব্যবসার স্বপ্ন, প্রকল্প বা ঋণ সম্পর্কিত যেকোনো কথা মন খুলে বলুন। আমি আপনার কথা শুনব, উত্তর দেব এবং ফর্মের বক্সে তথ্য সাজিয়ে দেব।',
  hi: 'नमस्ते दोस्त! मैं आपका वॉइस साथी (Voice Saathi) हूँ। अपने उद्यम, मुद्रा लोन या बिजनेस फॉर्म के बारे में बेझिझक बोलें या लिखें। मैं आपकी सहायता के लिए तैयार हूँ।',
  en: 'Hello friend! I am your Voice Saathi. Talk to me freely about your business dreams, credit subsidies, or let me format your details directly into form boxes.',
  mr: 'नमस्कार मित्रा! मी आपला व्हॉइस साथी (Voice Saathi) आहे. आपल्या ग्रामीण व्यवसायाबद्दल, मुद्रा कर्जाबद्दल किंवा शासकीय योजनांबद्दल मनमोकळेपणाने बोला.',
  ta: 'வணக்கம் நண்பரே! நான் உங்கள் வாய்ஸ் சாதி (Voice Saathi). உங்கள் தொழில் கனவுகள், அரசு மானியங்கள் மற்றும் முத்ரா கடன்கள் பற்றி என்னிடம் பேசுங்கள்.',
  te: 'నమస్కారం మిత్రమా! నేను మీ వాయిస్ సాథీ (Voice Saathi). మీ వ్యాపార ఆలోచనలు, ప్రభుత్వ రాయితీలు మరియు రుణాల గురించి నాతో మాట్లాడండి.',
  gu: 'નમસ્તે મિત્ર! હું આપનો વૉઇસ સાથી (Voice Saathi) છું. આપના વ્યવસાય, મુદ્રા લોન કે સરકારી સબસિડી વિશે મુક્તપણે વાત કરો.',
  kn: 'ನಮಸ್ಕಾರ ಸ್ನೇಹಿತರೇ! ನಾನು ನಿಮ್ಮ ವಾಯ್ಸ್ ಸಾಥಿ (Voice Saathi). ನಿಮ್ಮ ವ್ಯಾಪಾರ ಯೋಜನೆಗಳು ಮತ್ತು ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿಗಳ ಬಗ್ಗೆ ನನ್ನೊಂದಿಗೆ ಮಾತನಾಡಿ.',
  ml: 'നമസ്കാരം സുഹൃത്തേ! ഞാൻ നിങ്ങളുടെ വോയ്‌സ് സാഥി (Voice Saathi). നിങ്ങളുടെ ബിസിനസ്സ് സ്വപ്നങ്ങളും വായ്പാ സംശയങ്ങളും എന്നോട് ചോദിക്കൂ.',
  pa: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਦੋਸਤੋ! ਮੈਂ ਤੁਹਾਡਾ ਵੌਇਸ ਸਾਥੀ (Voice Saathi) ਹਾਂ। ਆਪਣੇ ਕਾਰੋਬਾਰ, ਮੁਦਰਾ ਕਰਜ਼ੇ ਅਤੇ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਬਾਰੇ ਖੁੱਲ੍ਹ ਕੇ ਗੱਲ ਕਰੋ।',
  or: 'ନମସ୍କାର ବନ୍ଧୁ! ମୁଁ ଆପଣଙ୍କ ଭଏସ୍ ସାଥୀ (Voice Saathi)। ଆପଣଙ୍କ ବ୍ୟବସାୟ ଓ ସରକାରୀ ଯୋଜନା ବିଷୟରେ ମୋ ସହିତ କଥା ହୁଅନ୍ତୁ।',
  as: 'নমস্কাৰ বন্ধু! মই আপোনাৰ ভইচ সাৰথি (Voice Saathi)। আপোনাৰ উদ্যোগ, চৰকাৰী ৰাজসাহায্য আৰু ঋণ সম্পৰ্কে মোৰ লগত কথা পাতক।',
};

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  pageContext = 'dashboard',
  currentOutputsSummary,
}) => {
  const { currentLanguage, setLanguage } = useLanguage();

  // Authentication check - block voice chatting before login
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !!localStorage.getItem('swanirvar_active_user');
    } catch {
      return false;
    }
  });

  // Assistant Mode: 'friend' (chat & advice) vs 'format_boxes' (form filling) vs 'read_outputs'
  const [activeMode, setActiveMode] = useState<'friend' | 'format_boxes' | 'read_outputs'>('friend');

  // Speech Recognition State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [manualInput, setManualInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [autoSpeakReplies, setAutoSpeakReplies] = useState<boolean>(true);
  const [isSpeakingNow, setIsSpeakingNow] = useState<boolean>(false);

  // Voice Status State
  const [bengaliVoiceStatus, setBengaliVoiceStatus] = useState(() => getBengaliVoiceStatus());
  const [isFetchingVoice, setIsFetchingVoice] = useState<boolean>(false);

  // Extracted Boxes Ready to be Applied
  const [lastExtractedBoxes, setLastExtractedBoxes] = useState<Record<string, string> | null>(null);
  const [boxesApplied, setBoxesApplied] = useState<boolean>(false);

  // Check authentication on modal open
  useEffect(() => {
    if (isOpen) {
      try {
        const user = localStorage.getItem('swanirvar_active_user');
        setIsAuthenticated(!!user);
      } catch {
        setIsAuthenticated(false);
      }
    }
  }, [isOpen]);

  // Conversation History with dynamically adapted welcome message
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      sender: 'sathi',
      text: WELCOME_MESSAGES[currentLanguage] || WELCOME_MESSAGES.bn,
      detectedLang: {
        code: currentLanguage,
        name: VOICE_LANGUAGES[currentLanguage as VoiceOutputLanguage]?.name || 'Bengali',
        nativeName: VOICE_LANGUAGES[currentLanguage as VoiceOutputLanguage]?.nativeName || 'বাংলা',
      },
      timestamp: 'Just now',
    },
  ]);

  // Update welcome message if language switches and there are no conversation messages yet
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome') {
      const langMeta = VOICE_LANGUAGES[currentLanguage as VoiceOutputLanguage] || VOICE_LANGUAGES.bn;
      setMessages([
        {
          id: 'welcome',
          sender: 'sathi',
          text: WELCOME_MESSAGES[currentLanguage] || WELCOME_MESSAGES.bn,
          detectedLang: {
            code: currentLanguage,
            name: langMeta.name,
            nativeName: langMeta.nativeName,
          },
          timestamp: 'Just now',
        },
      ]);
    }
  }, [currentLanguage]);

  const recognitionRef = useRef<any>(null);
  const audioRecorderRef = useRef<AudioRecorder>(new AudioRecorder());
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Search & Fetch Voice Engine on Mount
  useEffect(() => {
    if (isOpen) {
      setIsFetchingVoice(true);
      searchAndFetchBengaliVoice().then(() => {
        setBengaliVoiceStatus(getBengaliVoiceStatus());
        setIsFetchingVoice(false);
      });
    } else {
      stopSpeaking();
      setIsSpeakingNow(false);
      audioRecorderRef.current.cancel();
      if (isListening && recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
        setIsListening(false);
      }
    }
  }, [isOpen]);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing, interimTranscript]);

  // Handle Fetching Voice
  const handleRefreshVoice = async () => {
    setIsFetchingVoice(true);
    await searchAndFetchBengaliVoice();
    setBengaliVoiceStatus(getBengaliVoiceStatus());
    setIsFetchingVoice(false);

    const activeMeta = VOICE_LANGUAGES[currentLanguage as VoiceOutputLanguage] || VOICE_LANGUAGES.bn;
    speakWithGeminiOrLocal(activeMeta.welcomeMessage, currentLanguage as VoiceOutputLanguage, {
      onStart: () => setIsSpeakingNow(true),
      onEnd: () => setIsSpeakingNow(false),
      onError: () => setIsSpeakingNow(false),
    });
  };

  // Speak arbitrary text aloud using Gemini TTS or local synthesis in the selected language
  const handleSpeakText = (text: string, langCode: string = currentLanguage) => {
    stopSpeaking();
    const code = ((VOICE_LANGUAGES as any)[langCode] ? langCode : currentLanguage) as VoiceOutputLanguage;
    setIsSpeakingNow(true);
    speakWithGeminiOrLocal(text, code, {
      onStart: () => setIsSpeakingNow(true),
      onEnd: () => setIsSpeakingNow(false),
      onError: () => setIsSpeakingNow(false),
    });
  };

  // Send message to Gemini Voice Assistant (Server / Client Bridge)
  const handleSendMessage = async (textToSend: string) => {
    const query = textToSend.trim();
    if (!query) return;

    setManualInput('');
    setInterimTranscript('');
    setBoxesApplied(false);

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      const response = await fetch('/api/companion/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          mode: activeMode,
          pageContext,
          preferredLanguage: currentLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get companion reply');
      }

      const data = await response.json();
      const replyText = data.friendReply || data.reply || data.outputToRead || 'আমি বুঝতে পেরেছি। আপনার আবেদন বা প্রশ্নের উত্তর প্রস্তুত করা হচ্ছে।';

      const sathiMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'sathi',
        text: replyText,
        detectedLang: data.detectedLanguage || {
          code: currentLanguage,
          name: VOICE_LANGUAGES[currentLanguage as VoiceOutputLanguage]?.name || 'Bengali',
          nativeName: VOICE_LANGUAGES[currentLanguage as VoiceOutputLanguage]?.nativeName || 'বাংলা',
        },
        boxes: data.structuredBoxes || data.boxes || undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, sathiMsg]);

      const extractedBoxes = data.structuredBoxes || data.boxes;
      if (extractedBoxes && Object.keys(extractedBoxes).length > 0) {
        setLastExtractedBoxes(extractedBoxes);
      }

      // Auto readout voice response in the selected language using Gemini TTS
      if (autoSpeakReplies && sathiMsg.text) {
        handleSpeakText(sathiMsg.text, sathiMsg.detectedLang?.code || currentLanguage);
      }
    } catch (err) {
      console.error('Error in Voice Companion:', err);
      // Fallback friendly reply in active language
      const fallbackReplies: Record<string, string> = {
        bn: 'আমি আপনার কথা বুঝতে পেরেছি। সরকারি যোজনা ও অনুদানের আবেদন তৈরিতে আমি সর্বদা আপনার পাশে আছি।',
        hi: 'मैंने आपकी बात समझ ली है। सरकारी योजनाओं और सब्सिडी आवेदन में मैं आपकी पूरी मदद करूंगा।',
        en: 'I understood your query. I am here to help you access sovereign subsidies, Mudra loans, and form formatting.',
      };
      const fallbackText = fallbackReplies[currentLanguage] || fallbackReplies.bn;
      const sathiMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'sathi',
        text: fallbackText,
        detectedLang: {
          code: currentLanguage,
          name: VOICE_LANGUAGES[currentLanguage as VoiceOutputLanguage]?.name || 'Bengali',
          nativeName: VOICE_LANGUAGES[currentLanguage as VoiceOutputLanguage]?.nativeName || 'বাংলা',
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, sathiMsg]);
      if (autoSpeakReplies) {
        handleSpeakText(fallbackText, currentLanguage);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle Gemini Voice Recognition & Speech Microphone
  const toggleSpeechRecognition = async () => {
    if (isListening) {
      setIsListening(false);
      // Stop browser recognition if running
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }

      // Stop audio recording and send to Gemini Speech-to-Text
      try {
        setIsProcessing(true);
        setInterimTranscript(
          currentLanguage === 'bn'
            ? 'জেমিনি স্পিচ এআই দিয়ে কণ্ঠস্বর প্রক্রিয়া করা হচ্ছে...'
            : currentLanguage === 'hi'
            ? 'जेमिनी स्पीच एआई आवाज़ को पहचान रहा है...'
            : 'Transcribing speech with Gemini AI...'
        );

        const { blob, mimeType } = await audioRecorderRef.current.stop();
        let finalText = interimTranscript;

        try {
          const transcription = await transcribeVoiceWithGemini(blob, mimeType, currentLanguage);
          if (transcription.text && transcription.text.trim()) {
            finalText = transcription.text.trim();
          }
        } catch (transcribeErr) {
          console.warn('Gemini transcription fallback:', transcribeErr);
        }

        if (finalText && finalText.trim() && !finalText.includes('...')) {
          await handleSendMessage(finalText);
        } else if (interimTranscript.trim() && !interimTranscript.includes('...')) {
          await handleSendMessage(interimTranscript);
        }
      } catch (e) {
        console.warn('Error stopping audio recorder:', e);
      } finally {
        setIsProcessing(false);
        setInterimTranscript('');
      }
      return;
    }

    // Start listening
    try {
      await audioRecorderRef.current.start();
      setIsListening(true);
      setInterimTranscript('');

      // Also start Web Speech API for live interim visual feedback if supported
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognitionRef.current = recognition;
          recognition.continuous = false;
          recognition.interimResults = true;
          recognition.lang = RECOGNITION_LOCALES[currentLanguage] || 'bn-IN';

          recognition.onresult = (event: any) => {
            let text = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              text += event.results[i][0].transcript;
            }
            setInterimTranscript(text);
          };

          recognition.onerror = () => {
            // Audio recorder will provide audio to Gemini
          };

          recognition.start();
        } catch {
          // Audio recorder is capturing audio
        }
      }
    } catch (err) {
      console.warn('Microphone start failure:', err);
      setIsListening(false);
    }
  };

  // Apply formatted boxes to page
  const handleApplyBoxesToForm = () => {
    if (!lastExtractedBoxes) return;
    dispatchAutoFillToPage(lastExtractedBoxes);
    setBoxesApplied(true);
    const confMsg =
      currentLanguage === 'hi'
        ? 'जानकारी सफलतापूर्वक फॉर्म में भर दी गई है।'
        : currentLanguage === 'en'
        ? 'Details successfully autofilled into application form boxes.'
        : 'তথ্যগুলো সফলভাবে ড্যাশবোর্ডের ফর্ম বক্সে পূরণ করা হয়েছে।';
    handleSpeakText(confMsg, currentLanguage);
  };

  // Read current page outputs aloud
  const handleReadCurrentOutputs = () => {
    const summary =
      currentOutputsSummary ||
      (currentLanguage === 'hi'
        ? 'आपका उद्यम स्कोर 82 प्रतिशत है। प्रस्तावित लागत ₹12 लाख है जिसमें 35 प्रतिशत तक सरकारी सब्सिडी उपलब्ध है।'
        : currentLanguage === 'en'
        ? 'Your enterprise feasibility score is 82%. Project cost is ₹12,00,000 with up to 35% PMEGP government subsidy eligibility.'
        : 'আপনার এন্টারপ্রাইজ সম্ভাব্যতা স্কোর ৮২ শতাংশ। প্রস্তাবিত প্রকল্পের ব্যয় ১২ লক্ষ টাকা, যার মধ্যে ৩৫ শতাংশ পর্যন্ত সরকারি ভর্তুকি প্রাপ্য।');

    handleSpeakText(summary, currentLanguage);
  };

  if (!isOpen) return null;

  const currentLangMeta =
    VOICE_LANGUAGES[currentLanguage as VoiceOutputLanguage] || VOICE_LANGUAGES.bn;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-assistant-title"
      id="voice-saathi-modal"
    >
      <div className="relative w-full max-w-2xl bg-[#faf6ee] rounded-2xl sm:rounded-3xl border-2 border-[#191970] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with Voice Saathi Logo & Active Vernacular Identity */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#191970] text-white flex items-center justify-between gap-3 border-b-2 border-[#FF9933]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-md shrink-0">
              <VoiceSaathiLogo size={28} color="#ffffff" accentColor="#FF9933" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="voice-assistant-title" className="text-base sm:text-lg font-bold tracking-tight">
                  Voice Saathi (ভয়েস সাথী / वॉइस साथी)
                </h2>
                <span className="text-[10px] bg-[#046A38] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  AI Companion
                </span>
              </div>
              <p className="text-xs text-[#eedec6]">
                Gemini Voice Companion • Speaks & Understands {currentLangMeta.nativeName} ({currentLangMeta.name})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Language Indicator Badge in Header */}
            <div className="hidden sm:flex items-center gap-1 text-[11px] bg-white/15 px-2.5 py-1 rounded-full border border-white/30 text-white font-bold">
              <Globe className="w-3 h-3 text-[#FF9933]" />
              <span>{currentLangMeta.nativeName}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close Voice Saathi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Citizen Mode Banner for unauthenticated visitors */}
        {!isAuthenticated && (
          <div className="px-4 py-2 bg-[#FF9933]/15 border-b border-[#FF9933]/30 flex items-center justify-between text-xs text-[#191970]">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9933] shrink-0" />
              <span>
                {currentLanguage === 'hi'
                  ? 'नागरिक मोड: जेमिनी वॉइस पहचान व अनुवाद सक्रिय है।'
                  : currentLanguage === 'bn'
                  ? 'নাগরিক মোড: জেমিনি ভয়েস রিকগনিশন ও অনুবাদ সক্রিয়।'
                  : 'Citizen Mode: Gemini Voice Recognition & Translation Active site-wide.'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                window.location.hash = '#login';
              }}
              className="font-bold underline text-[#191970] hover:text-[#FF671F] ml-2 shrink-0 cursor-pointer text-[11px]"
            >
              {currentLanguage === 'hi' ? 'लॉगिन करें' : currentLanguage === 'bn' ? 'লগইন করুন' : 'Log In'}
            </button>
          </div>
        )}

        {/* Voice Engine Status Strip */}
            <div className="px-4 sm:px-6 py-2 bg-[#f1ebe0] border-b border-[#191970]/15 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="font-semibold text-[#191970]">
                  Voice Engine:
                </span>
                <span className="text-[#554e42] max-w-[200px] truncate">
                  {currentLangMeta.nativeName} ({currentLangMeta.defaultLocale})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRefreshVoice}
                  disabled={isFetchingVoice}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#191970] hover:text-[#FF671F] cursor-pointer"
                  title="Search and re-fetch regional audio voices in your browser"
                >
                  <RefreshCw className={`w-3 h-3 ${isFetchingVoice ? 'animate-spin' : ''}`} />
                  <span>Sync Voice</span>
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={() =>
                    handleSpeakText(
                      currentLangMeta.welcomeMessage,
                      currentLanguage as VoiceOutputLanguage
                    )
                  }
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#046A38] hover:underline cursor-pointer"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>Test Audio</span>
                </button>
              </div>
            </div>

            {/* Feature Mode Selector (Friend Chat | Smart Form Fill | Read Outputs) */}
            <div className="px-4 sm:px-6 py-2 bg-[#eae2d0] border-b border-[#191970]/15 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 bg-[#ded5c0] p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveMode('friend')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeMode === 'friend'
                      ? 'bg-[#191970] text-white shadow-xs'
                      : 'text-[#484236] hover:bg-[#d0c6af]'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Friend Chat</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMode('format_boxes')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeMode === 'format_boxes'
                      ? 'bg-[#191970] text-white shadow-xs'
                      : 'text-[#484236] hover:bg-[#d0c6af]'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Smart Form Fill</span>
                </button>
              </div>

              {/* Read Outputs Quick Action */}
              <button
                type="button"
                onClick={handleReadCurrentOutputs}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-[#046A38] text-white hover:bg-[#03532b] transition-all shadow-xs cursor-pointer"
                title="Read active dashboard outputs out loud in your language"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Read Outputs</span>
              </button>
            </div>

            {/* Chat History Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 min-h-[260px] max-h-[380px] bg-[#faf6ee]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'sathi' && (
                    <div className="w-8 h-8 rounded-full bg-[#191970] flex items-center justify-center shrink-0 mt-0.5 shadow-xs border border-[#FF9933]/50">
                      <VoiceSaathiLogo size={20} color="#ffffff" accentColor="#FF9933" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#191970] text-white rounded-tr-none'
                        : 'bg-white text-[#191970] border border-[#191970]/15 rounded-tl-none'
                    }`}
                  >
                    {/* Language Tag Badge */}
                    {msg.detectedLang && (
                      <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-current/10 text-[10px] font-bold">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#FF9933]" />
                          <span>
                            Understood in {msg.detectedLang.nativeName} ({msg.detectedLang.name})
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSpeakText(msg.text, msg.detectedLang?.code || currentLanguage)}
                          className="hover:underline flex items-center gap-0.5 cursor-pointer"
                          title="Listen to this message"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Hear</span>
                        </button>
                      </div>
                    )}

                    <p className="font-normal">{msg.text}</p>

                    {/* Structured Form Boxes Display */}
                    {msg.boxes && Object.keys(msg.boxes).length > 0 && (
                      <div className="mt-2.5 pt-2.5 border-t border-[#191970]/15 bg-[#faf6ee] p-2.5 rounded-xl border">
                        <div className="text-[11px] font-bold text-[#191970] mb-1.5 flex items-center gap-1">
                          <FileSpreadsheet className="w-3.5 h-3.5 text-[#FF671F]" />
                          <span>Formatted Form Boxes (বক্সের তথ্য):</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {Object.entries(msg.boxes).map(([key, val]) => (
                            <div
                              key={key}
                              className="bg-white px-2 py-1 rounded-md border border-[#191970]/10 text-[11px] flex items-center justify-between"
                            >
                              <span className="font-mono text-[#786e5e]">{key}:</span>
                              <span className="font-bold text-[#191970] truncate ml-1">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div
                      className={`text-[10px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[#FF9933] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Interim speech recognition bubble */}
              {interimTranscript && (
                <div className="flex justify-end gap-2">
                  <div className="bg-[#191970]/20 text-[#191970] rounded-2xl px-4 py-2 text-xs italic animate-pulse border border-[#191970]/30">
                    Listening in {currentLangMeta.nativeName}: "{interimTranscript}"...
                  </div>
                </div>
              )}

              {/* Thinking / Gemini processing spinner */}
              {isProcessing && (
                <div className="flex items-center gap-2 text-xs text-[#191970] font-semibold">
                  <div className="w-6 h-6 rounded-full bg-[#191970] text-[#FF9933] flex items-center justify-center animate-spin">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span>Voice Saathi is processing with Gemini AI...</span>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Quick-Apply Form Boxes Action Banner */}
            {lastExtractedBoxes && (
              <div className="px-4 sm:px-6 py-2 bg-[#fff8e7] border-t border-b border-[#FF9933]/30 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-[#191970] font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#046A38]" />
                  <span>
                    {Object.keys(lastExtractedBoxes).length} form boxes formatted!
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleApplyBoxesToForm}
                  disabled={boxesApplied}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                    boxesApplied
                      ? 'bg-[#046A38] text-white'
                      : 'bg-[#FF671F] hover:bg-[#e05814] text-white'
                  }`}
                >
                  {boxesApplied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Applied to Page Form!</span>
                    </>
                  ) : (
                    <>
                      <span>Write into Form Boxes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Conversational Prompt Suggestions - Adapts dynamically to language */}
            <div className="px-4 sm:px-6 py-2 bg-[#f5efe2] border-t border-[#191970]/10 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
              <span className="font-bold text-[#6d6453]">Try saying:</span>
              <button
                type="button"
                onClick={() =>
                  handleSendMessage(
                    'হুগলিতে তাঁতের শাড়ি ও মিষ্টির দোকান করতে চাই, ৫ লাখ টাকা লাগবে'
                  )
                }
                className="px-2.5 py-0.5 rounded-full bg-white border border-[#191970]/20 hover:bg-[#191970] hover:text-white transition-colors cursor-pointer text-[#191970]"
              >
                "হুগলিতে তাঁতের দোকান, ৫ লাখ টাকা" (বাংলা)
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSendMessage(
                    'मुझे डेयरी फार्म के लिए मुद्रा लोन की जानकारी चाहिए'
                  )
                }
                className="px-2.5 py-0.5 rounded-full bg-white border border-[#191970]/20 hover:bg-[#191970] hover:text-white transition-colors cursor-pointer text-[#191970]"
              >
                "डेयरी फार्म मुद्रा लोन" (हिन्दी)
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSendMessage('I want to open a rural agro processing unit')
                }
                className="px-2.5 py-0.5 rounded-full bg-white border border-[#191970]/20 hover:bg-[#191970] hover:text-white transition-colors cursor-pointer text-[#191970]"
              >
                "Agro processing unit" (English)
              </button>
            </div>

            {/* Voice Input & Text Box Controls Footer */}
            <div className="p-3 sm:p-4 bg-white border-t border-[#191970]/15 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {/* Big Mic Button */}
                <button
                  type="button"
                  onClick={toggleSpeechRecognition}
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full shrink-0 transition-all shadow-md cursor-pointer ${
                    isListening
                      ? 'bg-[#dc2626] text-white animate-pulse ring-4 ring-red-200'
                      : 'bg-[#191970] text-white hover:bg-[#23238a]'
                  }`}
                  title={
                    isListening
                      ? 'Click to stop listening'
                      : `Click to speak in ${currentLangMeta.nativeName} or any language`
                  }
                  aria-label="Toggle Voice Input"
                >
                  {isListening ? (
                    <MicOff className="w-6 h-6 text-white animate-bounce" />
                  ) : (
                    <Mic className="w-6 h-6 text-[#FF9933]" />
                  )}
                </button>

                {/* Typed Text Input */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage(manualInput);
                    }}
                    placeholder={`Speak or type in ${currentLangMeta.nativeName} (${currentLangMeta.name})...`}
                    className="w-full h-11 pl-3.5 pr-10 text-xs sm:text-sm bg-[#faf6ee] border border-[#191970]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#191970] text-[#191970]"
                  />
                  <button
                    type="button"
                    onClick={() => handleSendMessage(manualInput)}
                    disabled={!manualInput.trim()}
                    className="absolute right-1.5 top-1.5 w-8 h-8 rounded-lg bg-[#191970] text-white disabled:opacity-40 flex items-center justify-center cursor-pointer hover:bg-[#282894] transition-colors"
                    aria-label="Send"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sub-bar with Auto-Voice Readout toggle & Listening indicator */}
              <div className="flex items-center justify-between text-[11px] text-[#6d6453] px-1">
                <div className="flex items-center gap-1.5">
                  {isListening ? (
                    <span className="text-[#dc2626] font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                      Listening actively in {currentLangMeta.nativeName}... Speak now
                    </span>
                  ) : isSpeakingNow ? (
                    <span className="text-[#046A38] font-bold flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                      Voice Saathi speaking in {currentLangMeta.nativeName}...
                    </span>
                  ) : (
                    <span>Click mic to speak in {currentLangMeta.nativeName}, or type above</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={autoSpeakReplies}
                      onChange={(e) => setAutoSpeakReplies(e.target.checked)}
                      className="rounded border-[#191970] text-[#191970] focus:ring-0"
                    />
                    <span className="text-[11px] font-semibold text-[#191970]">
                      Readout Voice Aloud
                    </span>
                  </label>

                  {isSpeakingNow && (
                    <button
                      type="button"
                      onClick={() => {
                        stopSpeaking();
                        setIsSpeakingNow(false);
                      }}
                      className="text-[11px] font-bold text-red-600 hover:underline cursor-pointer"
                    >
                      Stop Audio
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
};

// Dispatch custom event to notify active form components
function dispatchAutoFillToPage(boxes: Record<string, string>) {
  if (typeof window === 'undefined') return;
  const event = new CustomEvent('swanirvar_voice_autofill', {
    detail: { boxes },
  });
  window.dispatchEvent(event);
}
