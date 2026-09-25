import { GoogleGenAI } from '@google/genai';
import { PHRASE_DICTIONARIES } from '../utils/domTranslator';

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

// Global in-memory cache of translations: targetLang -> text -> translatedText
const translationCache: Record<string, Record<string, string>> = {};

export async function translateTextsBatch(
  texts: string[],
  targetLang: string
): Promise<Record<string, string>> {
  if (!texts || !Array.isArray(texts) || texts.length === 0 || !targetLang || targetLang === 'en') {
    return {};
  }

  if (!translationCache[targetLang]) {
    translationCache[targetLang] = {};
  }

  const langCache = translationCache[targetLang];
  const dict = PHRASE_DICTIONARIES[targetLang] || {};
  const missingTexts: string[] = [];
  const result: Record<string, string> = {};

  // Check cache and static dictionary first
  for (const raw of texts) {
    const trimmed = (raw || '').trim();
    if (!trimmed || !isNaN(Number(trimmed)) || trimmed.length <= 1) {
      continue;
    }
    if (langCache[trimmed]) {
      result[trimmed] = langCache[trimmed];
    } else if (dict[trimmed]) {
      langCache[trimmed] = dict[trimmed];
      result[trimmed] = dict[trimmed];
    } else {
      missingTexts.push(trimmed);
    }
  }

  if (missingTexts.length === 0) {
    return result;
  }

  // Deduplicate and cap batch size to prevent model token limits
  const uniqueMissing = Array.from(new Set(missingTexts)).slice(0, 80);
  const ai = getGeminiClient();

  if (ai) {
    try {
      const prompt = `You are a high-speed, professional localization engine for an Indian sovereign digital public platform.
Translate the following array of user interface phrases, labels, and sentences into Indian language code: "${targetLang}".
Preserve numbers, currency symbols (₹), brand name SWANIRVAR, and acronyms (RBI, NABARD, MSME, VLE, CSC, GST, DPR).

Input texts to translate:
${JSON.stringify(uniqueMissing)}

Respond ONLY with valid JSON in this exact structure:
{
  "translations": {
    "original text": "translated text"
  }
}`;

      let response: any = null;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.1,
          },
        });
      } catch (firstErr) {
        console.warn('Primary model gemini-2.5-flash retry with gemini-2.5-pro:', firstErr);
        response = await ai.models.generateContent({
          model: 'gemini-2.5-pro',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.1,
          },
        });
      }

      const responseText = response.text || '{}';
      const parsed = JSON.parse(responseText);
      const newTranslations = parsed.translations || parsed;

      if (typeof newTranslations === 'object' && newTranslations !== null) {
        for (const [orig, trans] of Object.entries(newTranslations)) {
          if (typeof trans === 'string' && trans.trim()) {
            langCache[orig] = trans.trim();
            result[orig] = trans.trim();
          }
        }
      }
    } catch (err) {
      console.warn('Batch translation Gemini error (will fallback):', err);
    }
  }

  return result;
}
