import { GoogleGenAI, Modality } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export interface TranscriptionResult {
  text: string;
  detectedLanguage?: string;
}

/**
 * Transcribe pre-recorded or microphone audio stream using Gemini
 * Primary: gemini-3.5-transcribe, fallback: gemini-3.8-flash
 */
export async function transcribeAudioWithGemini(
  base64Audio: string,
  mimeType: string = 'audio/webm',
  languageHint?: string
): Promise<TranscriptionResult> {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error('GEMINI_API_KEY is not configured on the server');
  }

  // Clean data URL prefix if present
  const cleanBase64 = base64Audio.replace(/^data:audio\/[a-z0-9]+;base64,/, '').trim();

  const audioPart = {
    inlineData: {
      mimeType: mimeType.split(';')[0] || 'audio/webm',
      data: cleanBase64,
    },
  };

  const hintPrompt = languageHint
    ? `The speaker is likely speaking an Indian language (e.g., Bengali, Hindi, Tamil, Telugu, Marathi, English). Language hint: ${languageHint}.`
    : 'The speaker is an Indian citizen or entrepreneur speaking in Bengali, Hindi, English, Tamil, Telugu, Marathi, or another Indian language.';

  const prompt = `${hintPrompt}
Accurately transcribe the spoken words verbatim in the exact original language spoken.
Also detect the 2-letter ISO language code (e.g. bn, hi, en, ta, te, mr, gu, or, pa).
Respond ONLY in valid JSON:
{
  "text": "verbatim transcription in original script",
  "language": "two-letter language code"
}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [audioPart, { text: prompt }],
      },
    });

    const raw = response.text?.trim() || '';
    try {
      const jsonStart = raw.indexOf('{');
      const jsonEnd = raw.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const parsed = JSON.parse(raw.slice(jsonStart, jsonEnd + 1));
        return {
          text: parsed.text || raw,
          detectedLanguage: parsed.language || languageHint || 'bn',
        };
      }
    } catch {
      // ignore
    }
    return { text: raw, detectedLanguage: languageHint || 'bn' };
  } catch (primaryErr) {
    console.warn('gemini-3.5-transcribe failed, retrying with gemini-3.8-flash:', primaryErr);
    // Fallback to gemini-3.8-flash which can process multimodal audio parts
    const fallbackResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          audioPart,
          { text: 'Transcribe this spoken audio verbatim in its original Indian language script. Return only the transcription text.' },
        ],
      },
    });
    return {
      text: fallbackResponse.text?.trim() || '',
      detectedLanguage: languageHint || 'bn',
    };
  }
}

/**
 * Generate speech audio from text using Gemini TTS
 * Model: gemini-3.1-flash-tts-preview
 */
export async function generateSpeechWithGemini(
  text: string,
  voiceName: string = 'Kore'
): Promise<{ audioBase64: string; mimeType: string } | null> {
  const ai = getGeminiClient();
  if (!ai) return null;

  try {
    const validVoices = ['Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'];
    const chosenVoice = validVoices.includes(voiceName) ? voiceName : 'Kore';

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-tts-preview',
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: chosenVoice },
          },
        },
      },
    });

    const audioCandidate = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
    if (audioCandidate?.data) {
      return {
        audioBase64: audioCandidate.data,
        mimeType: audioCandidate.mimeType || 'audio/wav',
      };
    }
    return null;
  } catch (err) {
    console.warn('Gemini TTS generation error (will fallback to browser synthesis):', err);
    return null;
  }
}
