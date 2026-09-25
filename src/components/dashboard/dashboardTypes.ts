import type { FeasibilityAiResponse } from '../../server/geminiCompanion';

export type DashboardTab =
  | 'overview'
  | 'location'
  | 'area'
  | 'people'
  | 'customer'
  | 'competitor'
  | 'market'
  | 'validation'
  | 'gtm'
  | 'financials'
  | 'dpr'
  | 'bank'
  | 'operations'
  | 'training';

export interface EnterpriseState {
  stateName: string;
  districtName: string;
  locationName: string;
  businessType: string;
  capitalAmount: number;
  observedPrice: string;
  category: 'General' | 'Special';
  locationType: 'Rural' | 'Urban';
  lat: number;
  lng: number;
  radiusKm: 5 | 10 | 15;
  scanned: boolean;
  lastSync?: string;
  aiFeasibilityData?: FeasibilityAiResponse;
}

export interface GisData {
  farms: number;
  suppliers: number;
  mandis: number;
  competitors: number;
  densityIndex: number;
  source: string;
}
