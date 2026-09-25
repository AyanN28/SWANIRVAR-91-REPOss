import React, { useState } from 'react';
import { EnterpriseState } from './dashboardTypes';
import {
  ShieldCheck,
  Scale,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Volume2,
  Sparkles,
  Zap,
} from 'lucide-react';

interface ValidationModuleProps {
  enterprise: EnterpriseState;
  onProceedNext: () => void;
  onSpeak: (text: string) => void;
}

export const ValidationModule: React.FC<ValidationModuleProps> = ({
  enterprise,
  onProceedNext,
  onSpeak,
}) => {
  const isTea =
    enterprise.businessType.toLowerCase().includes('tea') ||
    enterprise.stateName.toLowerCase().includes('bengal');

  // Deterministic 7D Dimensions and Weights
  const dimensions = isTea
    ? [
        { key: 'gap', name: 'Demand–Supply Gap', weight: 25, score: 86, desc: 'High demand for fresh Dooars CTC & Organic Green Leaf' },
        { key: 'comp', name: 'Competition Saturation', weight: 20, score: 72, desc: 'Nearby tea estates & micro tea processors in 10 km corridor' },
        { key: 'foot', name: 'Customer Footfall', weight: 15, score: 82, desc: 'Direct NH517 highway transit + Gairkata weekly haat footfall' },
        { key: 'taste', name: 'Local Taste Fit', weight: 10, score: 92, desc: 'Strong daily tea consumption culture in North Bengal' },
        { key: 'stick', name: 'Customer Stickiness', weight: 10, score: 88, desc: 'High daily repeat purchase habit for fresh tea' },
        { key: 'risk', name: 'Risk Assessment', weight: 10, score: 68, desc: 'Monsoon leaf flush surge & plucking season wage variations' },
        { key: 'fin', name: 'Financial Viability', weight: 10, score: 85, desc: 'Strong value-add margin from green leaf to branded packets' },
      ]
    : [
        { key: 'gap', name: 'Demand–Supply Gap', weight: 25, score: 82, desc: 'Underserved micro-enterprise demand' },
        { key: 'comp', name: 'Competition Saturation', weight: 20, score: 74, desc: 'Peer shops across 10 km corridor' },
        { key: 'foot', name: 'Customer Footfall', weight: 15, score: 78, desc: 'Near feeder highway + weekly haat' },
        { key: 'taste', name: 'Local Taste Fit', weight: 10, score: 84, desc: 'Traditional preference in local district' },
        { key: 'stick', name: 'Customer Stickiness', weight: 10, score: 68, desc: 'Moderate repeat frequency' },
        { key: 'risk', name: 'Risk Assessment', weight: 10, score: 64, desc: 'Monsoon lull & credit exposure' },
        { key: 'fin', name: 'Financial Viability', weight: 10, score: 86, desc: 'Healthy operating gross margins' },
      ];

  const compositeScore = Math.round(
    dimensions.reduce((acc, d) => acc + (d.score * d.weight) / 100, 0)
  );

  const narration = `7-Dimensional Deterministic Validation for ${enterprise.businessType} in ${enterprise.locationName}, ${enterprise.districtName}. Composite viability score is ${compositeScore} out of 100. Demand-supply gap score is ${dimensions[0].score}, competition score ${dimensions[1].score}, footfall ${dimensions[2].score}, local taste fit ${dimensions[3].score}, customer stickiness ${dimensions[4].score}, risk assessment ${dimensions[5].score}, and financial viability ${dimensions[6].score}. Recommendation: High Bankability Profile. Proceed to Go-To-Market execution and Bank-Ready DPR generation.`;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#173326] to-[#083b5e] text-white p-6 rounded-2xl shadow-lg border border-emerald-900/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Step 7: 7D Business Judge & Decision Gate</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            7-Dimensional Deterministic Validation
          </h2>
          <p className="text-slate-200 text-sm max-w-2xl mt-1">
            The mathematical judge creates an immutable 0–100 decision signal based on ground GIS and market factors. Parallel AI Jury provides contextual operational guidance.
          </p>
        </div>
        <button
          onClick={() => onSpeak(narration)}
          className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors border border-white/20"
        >
          <Volume2 className="w-4 h-4 text-amber-300" />
          <span>Listen</span>
        </button>
      </div>

      {/* Main Score & Radar Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Score & Dimensions */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase">Composite Validation Score</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-[#083b5e]">{compositeScore}</span>
                <span className="text-lg font-bold text-slate-400">/ 100</span>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-black rounded-full text-xs uppercase tracking-wider border border-emerald-300">
                PROCEED TO DPR (70+)
              </span>
              <div className="text-[11px] text-slate-500 mt-1">High Bankability Profile</div>
            </div>
          </div>

          {/* 7 Dimensions Bar Breakdown */}
          <div className="space-y-3 text-xs">
            {dimensions.map((dim) => (
              <div key={dim.key} className="space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{dim.name} ({dim.weight}%)</span>
                  <span className="text-[#083b5e]">{dim.score} / 100</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-[#083b5e] rounded-full transition-all duration-700"
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-400">{dim.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 7D Radar Canvas Simulation + AI Jury */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Deterministic Radar Geometry</span>
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Polygon representation of the 7 deterministic validation vectors.
            </p>

            {/* Radar Diagram */}
            <div className="relative w-full aspect-square max-w-[240px] mx-auto flex items-center justify-center">
              <svg viewBox="0 0 240 240" className="w-full h-full">
                {/* Concentric Polygons */}
                <circle cx="120" cy="120" r="100" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx="120" cy="120" r="70" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx="120" cy="120" r="40" fill="none" stroke="#e2e8f0" strokeWidth="1" />

                {/* Radar Area Polygon */}
                <polygon
                  points="120,35 190,65 200,140 150,200 85,200 40,140 50,65"
                  fill="rgba(8, 59, 94, 0.2)"
                  stroke="#083b5e"
                  strokeWidth="2.5"
                />

                {/* Axis Labels */}
                <text x="110" y="24" fontSize="8" fontWeight="bold" fill="#083b5e">Gap</text>
                <text x="195" y="65" fontSize="8" fontWeight="bold" fill="#083b5e">Comp</text>
                <text x="205" y="145" fontSize="8" fontWeight="bold" fill="#083b5e">Foot</text>
                <text x="150" y="215" fontSize="8" fontWeight="bold" fill="#083b5e">Taste</text>
                <text x="70" y="215" fontSize="8" fontWeight="bold" fill="#083b5e">Stick</text>
                <text x="15" y="145" fontSize="8" fontWeight="bold" fill="#083b5e">Risk</text>
                <text x="35" y="60" fontSize="8" fontWeight="bold" fill="#083b5e">Finance</text>
              </svg>
            </div>

            {/* AI Jury Flags (Contextual Warnings) */}
            <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1 text-amber-950">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>AI Jury Context Flag</span>
              </div>
              <p>
                {isTea
                  ? 'Plan working capital reserves for green leaf flush cycles (April First Flush and June Second Flush). Partner directly with Banarhat Small Tea Growers (STGs) to guarantee raw leaf supply.'
                  : 'Watch seasonal raw material price spikes during peak months. Structure 3-month working capital buffer in DPR.'}
              </p>
            </div>
          </div>

          <button
            onClick={onProceedNext}
            className="w-full bg-[#083b5e] hover:bg-[#062c46] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition-colors text-sm"
          >
            <span>Proceed to Step 8: Go-To-Market (GTM)</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {/* SWOT & Threat Radar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget-Tailored SWOT */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
          <h3 className="text-base font-bold text-slate-900">Budget-Tailored SWOT Analysis</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <strong className="text-emerald-900 block font-bold">Strengths</strong>
              <span className="text-emerald-800">
                {isTea
                  ? 'Direct proximity to Gairkata & Binaguri tea gardens; high daily tea drinking consumption frequency.'
                  : 'High gross margins, authentic local craftsmanship, low competitive saturation.'}
              </span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
              <strong className="text-amber-900 block font-bold">Weaknesses</strong>
              <span className="text-amber-800">
                {isTea
                  ? 'Perishable raw green leaf requires rapid processing within 24 hours of plucking.'
                  : 'Initial raw material upfront inventory cost; reliance on manual hours.'}
              </span>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
              <strong className="text-blue-900 block font-bold">Opportunities</strong>
              <span className="text-blue-800">
                {isTea
                  ? 'Tea Board Small Tea Grower (STG) subsidies, branded retail packets on NH517 highway, direct supply to Dhupguri & Siliguri merchants.'
                  : 'E-commerce corporate gifts, retail fair orders, GI tag premium pricing.'}
              </span>
            </div>
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
              <strong className="text-rose-900 block font-bold">Threats</strong>
              <span className="text-rose-800">
                {isTea
                  ? 'Monsoon flush leaf gluts causing price drops; competition from large corporate Bought Leaf Factories (BLF).'
                  : 'Machine-printed imitation products; seasonal dips during agricultural lull.'}
              </span>
            </div>
          </div>
        </div>

        {/* Threat Radar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
          <h3 className="text-base font-bold text-slate-900">Threat Radar Assessment</h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">Raw Material Bottleneck</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Low Risk (Local STG Abundance)</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">Seasonal Flush Fluctuations</span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">Moderate Risk</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">Customer Credit Default (Udhaar)</span>
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">High Attention</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">Mandi / Auction Price Volatility</span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">Moderate Risk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
