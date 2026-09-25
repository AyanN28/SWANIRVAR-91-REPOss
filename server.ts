import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  processVoiceWithGemini,
  generateHyperLocalFeasibilityAI,
} from './src/server/geminiCompanion';
import {
  financialRouter,
  generateHyperLocalBusinessReport,
  extractVoiceEnterpriseIntent,
} from './src/server/ruralBusinessAdvisoryCore';
import { translateTextsBatch } from './src/server/translationService';
import {
  transcribeAudioWithGemini,
  generateSpeechWithGemini,
} from './src/server/geminiAudioService';
import {
  reverseGeocodeOsm,
  fetchOverpassPois,
  fetchCensusAndEconomicData,
  fetchMandiPriceAnalysis,
} from './src/server/spatialDataService';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));

  // API routes FIRST
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // 1. Reverse Geocode via OSM Nominatim
  app.get('/api/location/reverse-geocode', async (req, res) => {
    try {
      const lat = parseFloat(req.query.lat as string) || 9.9252;
      const lng = parseFloat(req.query.lng as string) || 78.1198;
      const geocoded = await reverseGeocodeOsm(lat, lng);
      res.json(geocoded);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Geocoding failed' });
    }
  });

  // 2. Overpass API Real POIs & Competition Scan
  app.post('/api/location/scan-pois', async (req, res) => {
    try {
      const { lat, lng, radiusKm, businessType } = req.body;
      const parsedLat = parseFloat(lat) || 9.9252;
      const parsedLng = parseFloat(lng) || 78.1198;
      const parsedRadius = (parseInt(radiusKm, 10) || 10) as 5 | 10 | 15;
      const result = await fetchOverpassPois(parsedLat, parsedLng, parsedRadius, businessType || 'Rural Enterprise');
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Spatial POI scan failed' });
    }
  });

  // 3. Census 2011 & World Bank Per Capita Income API
  app.get('/api/data/census-economic', async (req, res) => {
    try {
      const district = (req.query.district as string) || 'Madurai';
      const state = (req.query.state as string) || 'Tamil Nadu';
      const data = await fetchCensusAndEconomicData(district, state);
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Economic data retrieval failed' });
    }
  });

  // 4. Mandi Near Me & Agmarknet Pricing
  app.get('/api/data/mandis-pricing', async (req, res) => {
    try {
      const lat = parseFloat(req.query.lat as string) || 9.9252;
      const lng = parseFloat(req.query.lng as string) || 78.1198;
      const district = (req.query.district as string) || 'Madurai';
      const state = (req.query.state as string) || 'Tamil Nadu';
      const businessType = (req.query.businessType as string) || 'Rural Enterprise';
      const mandis = await fetchMandiPriceAnalysis(lat, lng, district, state, businessType);
      res.json({ mandis });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Mandi pricing query failed' });
    }
  });

  // 4b. Hyper-Local Feasibility & Competitor Synthesis with Gemini
  app.post('/api/business/feasibility-ai', async (req, res) => {
    try {
      const result = await generateHyperLocalFeasibilityAI(req.body);
      res.json(result);
    } catch (err: any) {
      console.error('Feasibility AI route error:', err);
      res.status(500).json({ error: err?.message || 'Hyper-local feasibility analysis failed' });
    }
  });

  // 4c. Core Module 2: Deterministic Smart Financial Calculator & Scheme Router
  app.all(['/calculate-finance', '/api/calculate-finance'], (req, res) => {
    try {
      const margin =
        parseFloat((req.method === 'POST' ? req.body?.margin_capital || req.body?.margin : req.query?.margin_capital || req.query?.margin) as string) ||
        100000;
      const result = financialRouter(margin);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ eligible: false, reason: err?.message || 'Financial calculation failed' });
    }
  });

  // 4d. Core Module 1: Hyper-Local Business Feasibility Report (AI + Spatial RAG)
  app.all(['/generate-report', '/api/generate-report'], async (req, res) => {
    try {
      const params = req.method === 'POST' ? req.body : req.query;
      const result = await generateHyperLocalBusinessReport({
        village: params.village || params.locationName,
        block: params.block || params.blockName,
        district: params.district || params.districtName,
        state: params.state || params.stateName,
        category: params.category || params.businessType,
        marginCapital: parseFloat(params.marginCapital || params.margin_capital || params.capitalAmount) || 50000,
        language: params.language,
        lat: parseFloat(params.lat) || 24.1800,
        lng: parseFloat(params.lng) || 88.5400,
      });
      res.json(result);
    } catch (err: any) {
      console.error('Report generation error:', err);
      res.status(500).json({ error: err?.message || 'Feasibility report generation failed' });
    }
  });

  // 4e. Indic NLP Entity Extraction from Voice / Natural Language
  app.post('/api/nlp/extract-intent', async (req, res) => {
    try {
      const { utterance } = req.body;
      const result = await extractVoiceEnterpriseIntent(utterance || '');
      res.json(result);
    } catch (err: any) {
      console.error('NLP extraction error:', err);
      res.status(500).json({ error: err?.message || 'NLP entity extraction failed' });
    }
  });

  // 5. Gemini Voice Recognition (Speech-to-Text)
  app.post('/api/voice/transcribe', async (req, res) => {
    try {
      const { audio, mimeType, languageHint } = req.body;
      if (!audio) {
        return res.status(400).json({ error: 'Audio data is required' });
      }
      const result = await transcribeAudioWithGemini(audio, mimeType, languageHint);
      res.json(result);
    } catch (err: any) {
      console.error('Transcription route error:', err);
      res.status(500).json({ error: err?.message || 'Speech transcription failed' });
    }
  });

  // 6. Gemini Voice Output (Text-to-Speech)
  app.post('/api/voice/tts', async (req, res) => {
    try {
      const { text, voiceName } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Text is required for TTS' });
      }
      const result = await generateSpeechWithGemini(text, voiceName || 'Kore');
      if (!result) {
        return res.json({ fallback: true });
      }
      res.json(result);
    } catch (err: any) {
      console.warn('TTS route error:', err);
      res.json({ fallback: true, error: err?.message });
    }
  });

  // 7. Gemini Voice Saathi Companion & Intent Processor
  app.post(['/api/voice-assistant', '/api/companion/chat'], async (req, res) => {
    try {
      const result = await processVoiceWithGemini(req.body);
      res.json(result);
    } catch (err: any) {
      console.error('Voice assistant error:', err);
      res.status(500).json({ error: err?.message || 'Error processing speech with Gemini' });
    }
  });

  // 8. Gemini Dynamic Universal UI Translation Batch
  app.post('/api/translate-batch', async (req, res) => {
    try {
      const { texts, targetLang } = req.body;
      const translations = await translateTextsBatch(texts, targetLang);
      res.json({ translations });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Translation error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SWANIRVAR Server running on http://localhost:${PORT}`);
  });
}

startServer();
