import { blobToBase64 } from '../utils/audioRecorder';

export interface FormBoxDefinition {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export interface CompanionRequest {
  message: string;
  pageContext?: 'home' | 'about' | 'auth' | 'dashboard' | 'feasibility' | 'dpr' | 'khata' | string;
  mode?: 'friend' | 'format_boxes' | 'read_outputs';
  targetBoxes?: FormBoxDefinition[];
  currentOutputSummary?: string;
  preferredLanguage?: string;
}

export interface CompanionResponse {
  detectedLanguage: {
    code: string;
    name: string;
    nativeName: string;
  };
  friendReply: string;
  structuredBoxes?: Record<string, string>;
  outputToRead: string;
}

/**
 * Transcribe recorded audio with Gemini STT (gemini-3.5-transcribe / gemini-3.8-flash)
 */
export async function transcribeVoiceWithGemini(
  audioBlob: Blob,
  mimeType?: string,
  languageHint?: string
): Promise<{ text: string; detectedLanguage?: string }> {
  try {
    const base64Audio = await blobToBase64(audioBlob);
    const res = await fetch('/api/voice/transcribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        audio: base64Audio,
        mimeType: mimeType || audioBlob.type || 'audio/webm',
        languageHint,
      }),
    });

    if (!res.ok) {
      throw new Error(`Transcription failed with status ${res.status}`);
    }

    const data = await res.json();
    return {
      text: data.text || '',
      detectedLanguage: data.detectedLanguage,
    };
  } catch (err) {
    console.warn('transcribeVoiceWithGemini error:', err);
    throw err;
  }
}

/**
 * Plays speech using Gemini TTS (gemini-3.1-flash-tts-preview)
 * Returns true if Gemini audio was successfully generated and played, false otherwise
 */
let currentGeminiAudio: HTMLAudioElement | null = null;

export async function playGeminiSpeech(
  text: string,
  voiceName: string = 'Kore',
  onStart?: () => void,
  onEnd?: () => void
): Promise<boolean> {
  try {
    if (currentGeminiAudio) {
      currentGeminiAudio.pause();
      currentGeminiAudio = null;
    }

    const res = await fetch('/api/voice/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voiceName }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    if (data.fallback || !data.audioBase64) {
      return false;
    }

    const audioSrc = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
    const audio = new Audio(audioSrc);
    currentGeminiAudio = audio;

    audio.onplay = () => {
      onStart?.();
    };

    audio.onended = () => {
      currentGeminiAudio = null;
      onEnd?.();
    };

    audio.onerror = () => {
      currentGeminiAudio = null;
      onEnd?.();
    };

    await audio.play();
    return true;
  } catch (err) {
    console.warn('Gemini TTS playback failed, falling back:', err);
    return false;
  }
}

/**
 * Stop any ongoing Gemini audio playback
 */
export function stopGeminiSpeech(): void {
  if (currentGeminiAudio) {
    try {
      currentGeminiAudio.pause();
    } catch {
      // ignore
    }
    currentGeminiAudio = null;
  }
}

/**
 * Sends speech text input to Gemini AI Voice Companion
 * Proxies cleanly to the server route /api/companion/chat
 */
export async function sendVoiceMessageToCompanion(
  req: CompanionRequest
): Promise<CompanionResponse> {
  try {
    const res = await fetch('/api/companion/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });

    if (res.ok) {
      const data: CompanionResponse = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('Server companion bridge error:', err);
  }

  // Fallback response if network is down
  return {
    detectedLanguage: {
      code: req.preferredLanguage || 'bn',
      name: 'Bengali',
      nativeName: 'বাংলা',
    },
    friendReply: 'নমস্কার বন্ধু! আমি আপনার ভয়েস সাথী। সরকারি প্রকল্প ও সহায়তা নিয়ে আপনার পাশে আছি।',
    structuredBoxes: {},
    outputToRead: 'নমস্কার বন্ধু! আমি আপনার ভয়েস সাথী। সরকারি প্রকল্প ও সহায়তা নিয়ে আপনার পাশে আছি।',
  };
}

/**
 * Dispatches structured boxes to the active page so forms automatically fill!
 */
export function dispatchAutoFillToPage(boxes: Record<string, string>) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('swanirvar_autofill_boxes', {
        detail: { boxes },
      })
    );
  }
}
