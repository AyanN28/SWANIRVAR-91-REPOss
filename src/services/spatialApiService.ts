import {
  GeocodedAddress,
  SpatialPoi,
  CensusEconomicProfile,
  MandiPriceReport,
} from '../server/spatialDataService';
import {
  FeasibilityAiRequest,
  FeasibilityAiResponse,
} from '../server/geminiCompanion';
import {
  FinancialRouterResult,
  HyperLocalReportRequest,
  HyperLocalReportResponse,
  VoiceNlpExtractResult,
} from '../server/ruralBusinessAdvisoryCore';

export async function fetchCalculateFinance(
  marginCapital: number
): Promise<FinancialRouterResult> {
  const res = await fetch(`/api/calculate-finance?margin_capital=${marginCapital}`);
  if (!res.ok) {
    throw new Error('Financial calculation failed');
  }
  return res.json();
}

export async function fetchGenerateReport(
  req: HyperLocalReportRequest
): Promise<HyperLocalReportResponse> {
  const res = await fetch('/api/generate-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    throw new Error('Feasibility report generation failed');
  }
  return res.json();
}

export async function fetchExtractIntentNlp(
  utterance: string
): Promise<VoiceNlpExtractResult> {
  const res = await fetch('/api/nlp/extract-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ utterance }),
  });
  if (!res.ok) {
    throw new Error('NLP extraction failed');
  }
  return res.json();
}

export async function fetchFeasibilityAi(
  req: FeasibilityAiRequest
): Promise<FeasibilityAiResponse> {
  const res = await fetch('/api/business/feasibility-ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    throw new Error('Feasibility AI analysis failed');
  }
  return res.json();
}

export async function fetchReverseGeocode(lat: number, lng: number): Promise<GeocodedAddress> {
  const res = await fetch(`/api/location/reverse-geocode?lat=${lat}&lng=${lng}`);
  if (!res.ok) {
    throw new Error('Reverse geocode failed');
  }
  return res.json();
}

export async function fetchOverpassSpatialScan(
  lat: number,
  lng: number,
  radiusKm: 5 | 10 | 15,
  businessType: string
): Promise<{
  pois: SpatialPoi[];
  counts: { competitors: number; mandis: number; suppliers: number; farms: number; densityIndex: number };
  source: string;
}> {
  const res = await fetch('/api/location/scan-pois', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lng, radiusKm, businessType }),
  });
  if (!res.ok) {
    throw new Error('POI scan failed');
  }
  return res.json();
}

export async function fetchCensusEconomicData(
  district: string,
  state: string
): Promise<CensusEconomicProfile> {
  const res = await fetch(
    `/api/data/census-economic?district=${encodeURIComponent(district)}&state=${encodeURIComponent(state)}`
  );
  if (!res.ok) {
    throw new Error('Census & economic data fetch failed');
  }
  return res.json();
}

export async function fetchMandisPricing(
  lat: number,
  lng: number,
  district: string,
  state: string,
  businessType: string
): Promise<MandiPriceReport[]> {
  const res = await fetch(
    `/api/data/mandis-pricing?lat=${lat}&lng=${lng}&district=${encodeURIComponent(
      district
    )}&state=${encodeURIComponent(state)}&businessType=${encodeURIComponent(businessType)}`
  );
  if (!res.ok) {
    throw new Error('Mandi pricing fetch failed');
  }
  const json = await res.json();
  return json.mandis || [];
}
