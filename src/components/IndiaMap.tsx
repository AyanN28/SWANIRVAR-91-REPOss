import React, { useState } from 'react';
import { INDIA_STATES_GEO, INDIA_MAP_DIMENSIONS } from '../data/indiaGeoData';
import { Activity, ShieldCheck, MapPin, TrendingUp, Building2, Landmark, CheckCircle2 } from 'lucide-react';

/**
 * Interface representing a live prototype state's operational metadata
 */
export interface PrototypeStateMeta {
  id: string;
  name: string;
  nativeName: string;
  code: string;
  region: string;
  hub: string;
  enterprises: string;
  volume: string;
  growth: string;
  language: string;
  status: 'LIVE';
  centroid: [number, number];
  labelOffsetY: number;
}

/**
 * 4 Prototype States officially highlighted on the national deployment map
 * Punjab, Maharashtra, West Bengal, and Tamil Nadu
 */
export const HIGHLIGHTED_PROTOTYPE_STATES: Record<string, PrototypeStateMeta> = {
  punjab: {
    id: 'punjab',
    name: 'Punjab',
    nativeName: 'ਪੰਜਾਬ',
    code: '03',
    region: 'North-West Zone',
    hub: 'Ludhiana & Amritsar Agro-Industrial Node',
    enterprises: '14,200+ Verified Units',
    volume: '₹6,830 Cr',
    growth: '+15.6%',
    language: 'Punjabi (ਗੁਰਮੁਖੀ)',
    status: 'LIVE',
    centroid: [157.9, 163.9],
    labelOffsetY: -22,
  },
  maharashtra: {
    id: 'maharashtra',
    name: 'Maharashtra',
    nativeName: 'महाराष्ट्र',
    code: '27',
    region: 'Western Zone',
    hub: 'Pune-Nashik-Mumbai Industrial Corridor',
    enterprises: '38,500+ Registered Enterprises',
    volume: '₹14,820 Cr',
    growth: '+18.4%',
    language: 'Marathi (मराठी)',
    status: 'LIVE',
    centroid: [171.5, 408.3],
    labelOffsetY: -22,
  },
  westbengal: {
    id: 'westbengal',
    name: 'West Bengal',
    nativeName: 'পশ্চিমবঙ্গ',
    code: '19',
    region: 'Eastern Zone',
    hub: 'Kolkata-Howrah Maritime & MSME Exchange',
    enterprises: '22,800+ Artisan & Trade Units',
    volume: '₹7,440 Cr',
    growth: '+11.8%',
    language: 'Bengali (বাংলা)',
    status: 'LIVE',
    centroid: [401.4, 316.6],
    labelOffsetY: -22,
  },
  tamilnadu: {
    id: 'tamilnadu',
    name: 'Tamil Nadu',
    nativeName: 'தமிழ்நாடு',
    code: '33',
    region: 'Southern Zone',
    hub: 'Chennai-Coimbatore Engineering Cluster',
    enterprises: '31,400+ Smart Manufacturing Saathis',
    volume: '₹10,910 Cr',
    growth: '+14.9%',
    language: 'Tamil (தமிழ்)',
    status: 'LIVE',
    centroid: [216, 578.3],
    labelOffsetY: -22,
  },
};

export const IndiaMap: React.FC = () => {
  const [activeStateKey, setActiveStateKey] = useState<string>('maharashtra');
  const [hoveredStateName, setHoveredStateName] = useState<string | null>(null);

  const activeState = HIGHLIGHTED_PROTOTYPE_STATES[activeStateKey] || HIGHLIGHTED_PROTOTYPE_STATES['maharashtra'];

  // Helper to match geo state name to our prototype state key
  const getPrototypeKey = (name: string): string | null => {
    const normalized = name.toLowerCase().replace(/[^a-z]/g, '');
    if (normalized === 'punjab') return 'punjab';
    if (normalized === 'maharashtra') return 'maharashtra';
    if (normalized === 'westbengal') return 'westbengal';
    if (normalized === 'tamilnadu') return 'tamilnadu';
    return null;
  };

  return (
    <div
      id="national-deployment-map-card"
      className="w-full bg-white rounded-3xl p-5 sm:p-7 border-2 border-[#191970] shadow-md relative overflow-hidden flex flex-col justify-between"
    >
      {/* =========================================================================
          MAP HEADER & LIVE PROTOTYPE TELEMETRY BADGE
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-3 border-b border-[#1E293B]/15 gap-2.5">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#191970]">
              National Deployment Map
            </span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-0.5 font-medium">
            Sovereign Inter-State Trade Corridor • Geographically Accurate Survey Baseline
          </p>
        </div>

        {/* Live Badge */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full bg-[#10B981]/10 text-[#047857] border border-[#10B981]/30">
            <Activity className="w-3.5 h-3.5 text-[#10b981]" />
            <span>4 Prototype States LIVE</span>
          </span>
        </div>
      </div>

      {/* Quick State Selection Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 no-scrollbar">
        {Object.values(HIGHLIGHTED_PROTOTYPE_STATES).map((state) => {
          const isSelected = activeStateKey === state.id;
          return (
            <button
              key={state.id}
              type="button"
              onClick={() => setActiveStateKey(state.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                isSelected
                  ? 'bg-[#191970] text-white border-[#191970] shadow-xs'
                  : 'bg-[#F8FAFC] text-[#1E293B] border-[#1E293B]/20 hover:bg-[#F1F5F9]'
              }`}
            >
              <span>{state.name}</span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSelected ? 'bg-[#FF9933]' : 'bg-[#10b981]'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          GEOGRAPHICALLY ACCURATE INDIA MAP SVG WITH FLOATING LABELS
          * Precise official boundaries for all 36 Indian States & UTs
          * Clean white/light gray background
          * Thin, dark navy blue outline (#1E293B, 1px)
          * Highlighted polygon fills: Punjab, Maharashtra, West Bengal, Tamil Nadu
          * Sleek modern floating labels: "[State Name] • LIVE" with circular pulse
          ========================================================================= */}
      <div className="relative w-full aspect-[600/680] max-h-[460px] flex items-center justify-center my-2 select-none bg-[#FAFAFA] rounded-2xl border border-[#1E293B]/10 overflow-hidden">
        {/* Subtle grid pattern background */}
        <svg
          viewBox={`0 0 ${INDIA_MAP_DIMENSIONS.width} ${INDIA_MAP_DIMENSIONS.height}`}
          className="w-full h-full"
          aria-label="Accurate Map of India highlighting Punjab, Maharashtra, West Bengal, and Tamil Nadu"
        >
          <defs>
            {/* Grid background */}
            <pattern id="india-map-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
            </pattern>

            {/* Gradient fill for selected state */}
            <linearGradient id="selectedStateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#191970" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            {/* Highlighted state polygon fill gradient */}
            <linearGradient id="highlightedStateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#BFDBFE" />
            </linearGradient>

            {/* Radar Wave Pulse for Markers */}
            <filter id="marker-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#10b981" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Background Map Canvas with clean grid */}
          <rect
            width={INDIA_MAP_DIMENSIONS.width}
            height={INDIA_MAP_DIMENSIONS.height}
            fill="#FFFFFF"
          />
          <rect
            width={INDIA_MAP_DIMENSIONS.width}
            height={INDIA_MAP_DIMENSIONS.height}
            fill="url(#india-map-grid)"
            opacity="0.8"
          />

          {/* =====================================================================
              ALL 36 INDIAN STATES & UTs - PRECISE OFFICIAL BOUNDARIES
              * Thin, dark navy blue outline (#1E293B, 1px)
              * Clean light gray / white background for non-highlighted states
              * Distinct polygon fill for Punjab, Maharashtra, West Bengal, Tamil Nadu
              ===================================================================== */}
          <g id="india-state-polygons">
            {INDIA_STATES_GEO.map((stateGeo) => {
              const protoKey = getPrototypeKey(stateGeo.name);
              const isHighlighted = protoKey !== null;
              const isSelected = protoKey === activeStateKey;
              const isHovered = hoveredStateName === stateGeo.name;

              // Determine exact fill color matching user specification
              let fillColor = '#F8FAFC'; // Clean white / light gray for default states
              let fillOpacity = 1;
              let strokeColor = '#1E293B'; // Thin, dark navy blue outline (#1E293B, 1px)
              let strokeWidth = 1;

              if (isHighlighted) {
                if (isSelected) {
                  fillColor = '#191970'; // Selected highlighted state
                  fillOpacity = 0.85;
                  strokeColor = '#1E293B';
                  strokeWidth = 2;
                } else {
                  fillColor = '#DBEAFE'; // Distinct polygon fill for prototype states
                  fillOpacity = 0.95;
                  strokeColor = '#1E293B';
                  strokeWidth = 1.5;
                }
              } else if (isHovered) {
                fillColor = '#F1F5F9';
              }

              return (
                <path
                  key={stateGeo.name}
                  id={`state-${stateGeo.code || stateGeo.name.toLowerCase().replace(/\s+/g, '-')}`}
                  d={stateGeo.path}
                  fill={fillColor}
                  fillOpacity={fillOpacity}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className={`transition-colors duration-200 ${
                    isHighlighted ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  onMouseEnter={() => setHoveredStateName(stateGeo.name)}
                  onMouseLeave={() => setHoveredStateName(null)}
                  onClick={() => {
                    if (protoKey) {
                      setActiveStateKey(protoKey);
                    }
                  }}
                >
                  <title>{`${stateGeo.name}${isHighlighted ? ' (Prototype LIVE)' : ''}`}</title>
                </path>
              );
            })}
          </g>

          {/* =====================================================================
              DATA MARKERS FOR HIGHLIGHTED STATES (PUNJAB, MAHARASHTRA, WEST BENGAL, TAMIL NADU)
              * Circular pulse radar beacon on exact geographic centroids
              ===================================================================== */}
          <g id="prototype-data-markers">
            {Object.values(HIGHLIGHTED_PROTOTYPE_STATES).map((state) => {
              const isSelected = activeStateKey === state.id;
              const [cx, cy] = state.centroid;

              return (
                <g
                  key={`marker-${state.id}`}
                  className="cursor-pointer"
                  onClick={() => setActiveStateKey(state.id)}
                >
                  {/* Outer Pulsing Radar Wave */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r="12"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    className="animate-ping"
                    opacity="0.6"
                  />

                  {/* Soft Glowing Aura */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r="6"
                    fill={isSelected ? '#FF9933' : '#10b981'}
                    fillOpacity="0.3"
                  />

                  {/* Core Precision Pinpoint Dot */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r="3.5"
                    fill={isSelected ? '#FF9933' : '#10b981'}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    filter="url(#marker-glow)"
                  />
                </g>
              );
            })}
          </g>
        </svg>

        {/* =====================================================================
            SLEEK, MODERN UI FLOATING LABELS OVER HIGHLIGHTED STATES
            * "[State Name] • LIVE"
            * Small circular pulse animation next to "LIVE"
            * Scaled and positioned with mathematical precision over state centroids
            ===================================================================== */}
        {Object.values(HIGHLIGHTED_PROTOTYPE_STATES).map((state) => {
          const isSelected = activeStateKey === state.id;
          const [cx, cy] = state.centroid;

          // Convert SVG 600x680 coordinate space to percentage for responsive HTML floating pill
          const leftPercent = (cx / INDIA_MAP_DIMENSIONS.width) * 100;
          const topPercent = ((cy + state.labelOffsetY) / INDIA_MAP_DIMENSIONS.height) * 100;

          return (
            <div
              key={`label-${state.id}`}
              className="absolute -translate-x-1/2 -translate-y-full pointer-events-auto z-10"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
              }}
            >
              <button
                type="button"
                onClick={() => setActiveStateKey(state.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-tight shadow-md backdrop-blur-xs transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#191970] text-white border-[#191970] ring-2 ring-[#FF9933]/50 scale-105 shadow-lg'
                    : 'bg-white/95 text-[#1E293B] border-[#1E293B]/20 hover:border-[#1E293B] hover:scale-105'
                }`}
                title={`Click to inspect live trade metrics for ${state.name}`}
              >
                <span>{state.name}</span>
                <span className={isSelected ? 'text-[#FF9933]' : 'text-[#1E293B]/40'}>•</span>
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-wider ${
                    isSelected ? 'text-[#FF9933]' : 'text-[#0F172A]'
                  }`}
                >
                  LIVE
                </span>

                {/* Small Circular Pulse Animation Next to LIVE */}
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10b981]" />
                </span>
              </button>

              {/* Minimalist Pointer Stem connecting label to the state centroid */}
              <div className="w-[1.5px] h-2 bg-[#1E293B]/40 mx-auto" />
            </div>
          );
        })}

        {/* Floating tooltip for general states on hover */}
        {hoveredStateName && !getPrototypeKey(hoveredStateName) && (
          <div className="absolute top-3 left-3 bg-[#1E293B]/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-sm pointer-events-none backdrop-blur-xs">
            <span>{hoveredStateName}</span>
            <span className="text-slate-300 ml-1.5 text-[10px]">(Expansion Zone)</span>
          </div>
        )}
      </div>

      {/* =========================================================================
          ACTIVE STATE METRICS DASHBOARD CARD
          ========================================================================= */}
      <div className="mt-2 bg-[#F8FAFC] rounded-2xl p-4 border border-[#1E293B]/15 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#1E293B]/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg text-[#1E293B]">
                {activeState.name}
              </span>
              <span className="text-xs text-[#64748B] font-medium font-mono">
                ({activeState.nativeName})
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#10B981]/15 text-[#047857] border border-[#10B981]/30">
                ● PROTOTYPE NODE
              </span>
            </div>
            <div className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#FF671F]" />
              <span className="truncate">{activeState.hub}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[11px] font-mono text-[#64748B]">Region:</span>
            <span className="text-xs font-bold text-[#1E293B] bg-white px-2 py-0.5 rounded-md border border-[#1E293B]/15">
              {activeState.region}
            </span>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white p-2.5 rounded-xl border border-[#1E293B]/10">
            <div className="text-[10px] text-[#64748B] font-mono uppercase tracking-wider flex items-center justify-center gap-1">
              <Building2 className="w-3 h-3 text-[#191970]" />
              <span className="hidden sm:inline">Verified</span> MSMEs
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#1E293B] mt-0.5">
              {activeState.enterprises}
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-[#1E293B]/10">
            <div className="text-[10px] text-[#64748B] font-mono uppercase tracking-wider flex items-center justify-center gap-1">
              <Landmark className="w-3 h-3 text-[#FF671F]" />
              Pilot Volume
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#1E293B] mt-0.5">
              {activeState.volume}
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-[#1E293B]/10">
            <div className="text-[10px] text-[#64748B] font-mono uppercase tracking-wider flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#046A38]" />
              Trade Growth
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#046A38] mt-0.5">
              {activeState.growth}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
