import React from 'react';
import { EnterpriseState, DashboardTab } from './dashboardTypes';
import { JOURNEY_STEPS } from './DashboardHeader';
import {
  LayoutDashboard,
  MapPin,
  Compass,
  Users,
  Target,
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  IndianRupee,
  FileText,
  Landmark,
  ArrowRight,
  Sparkles,
  Volume2,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface OverviewModuleProps {
  enterprise: EnterpriseState;
  onSelectTab: (tab: DashboardTab) => void;
  onSpeak: (text: string) => void;
  onOpenOrchestrator?: () => void;
  onOpenOnboarding?: () => void;
  onOpenRiskSwot?: () => void;
  onOpenAgentMode?: () => void;
  onOpenAdmin?: () => void;
}

export const OverviewModule: React.FC<OverviewModuleProps> = ({
  enterprise,
  onSelectTab,
  onSpeak,
  onOpenOrchestrator,
  onOpenOnboarding,
  onOpenRiskSwot,
  onOpenAgentMode,
  onOpenAdmin,
}) => {
  const projectCost = enterprise.capitalAmount / 0.10;
  const maxLoan = projectCost * 0.90;

  const narration = `Welcome to the Swanirvar Sovereign Citizen Command Center for ${enterprise.businessType} in ${enterprise.locationName}, ${enterprise.districtName}. The complete eleven-stage enterprise journey is initialized: from live location and area intelligence to customer fit, competitor saturation, layered market prices, seven-dimensional validation, smart loan financial modeling, and bank-ready DPR generation. Available margin capital is rupees ${enterprise.capitalAmount.toLocaleString()}, supporting a project cost of rupees ${projectCost.toLocaleString()}.`;

  return (
    <div className="space-y-6">
      {/* Product Hero Command Banner */}
      <div className="bg-gradient-to-r from-[#083b5e] via-[#0d4f7d] to-[#173326] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/40 relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full font-mono">
              Live Location: {enterprise.locationName}, {enterprise.districtName} ({enterprise.stateName})
            </span>
            <span className="text-[11px] font-bold text-slate-300">
              PIN 735210 · Lat 26.5894° N, Lng 89.0070° E
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
            From Local Geographic Evidence to a Bank-Ready Business.
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            Swanirvar resolves the rural micro-enterprise challenge: studying your village + block + district + business to establish customer capacity, competition saturation, layered mandi pricing, and non-linear seasonal financing.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTab('location')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all transform hover:scale-[1.02]"
            >
              <span>Start 11-Stage Journey →</span>
            </button>

            {onOpenOrchestrator && (
              <button
                onClick={onOpenOrchestrator}
                className="bg-[#0c4f36] hover:bg-[#093d2a] text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-emerald-400/30 transition-all shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Run 16-Step Live Analysis</span>
              </button>
            )}

            {onOpenOnboarding && (
              <button
                onClick={onOpenOnboarding}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-3.5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 border border-white/20 transition-all"
                title="Change Village or Business Idea"
              >
                <Compass className="w-4 h-4 text-amber-300" />
                <span>Change / Recalibrate</span>
              </button>
            )}

            <button
              onClick={() => onSpeak(narration)}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-3.5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 border border-white/20 transition-all"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>Listen</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 47: BUSINESS COMMAND CENTRE */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="text-[11px] font-black uppercase text-amber-700 tracking-wider">
              Executive Briefing (Section 47)
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              YOUR BUSINESS COMMAND CENTRE
            </h2>
            <p className="text-xs text-slate-500">
              Deterministic synthesis of field geography, mandi pricing, competitor moats, and banking compliance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenRiskSwot && (
              <button
                onClick={onOpenRiskSwot}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Risk Register & SWOT
              </button>
            )}
            {onOpenAgentMode && (
              <button
                onClick={onOpenAgentMode}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                VLE Agent Mode
              </button>
            )}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Admin & ERD
              </button>
            )}
          </div>
        </div>

        {/* Command Centre Vital Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-[10px] font-bold text-slate-400 uppercase">7D SCORE</div>
            <div className="text-2xl sm:text-3xl font-black text-[#083b5e] mt-1">78 / 100</div>
            <div className="text-[10px] font-black text-emerald-700 uppercase mt-0.5">Bankable</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Market Opportunity</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">HIGH</div>
            <div className="text-[10px] font-semibold text-slate-500 mt-0.5">Dooars Leaf Gap</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Customer Fit</div>
            <div className="text-2xl sm:text-3xl font-black text-blue-700 mt-1">82 / 100</div>
            <div className="text-[10px] font-semibold text-slate-500 mt-0.5">High Repeat Rate</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Competition</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-700 mt-1">MODERATE</div>
            <div className="text-[10px] font-semibold text-slate-500 mt-0.5">5 Local Units</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 col-span-2 sm:col-span-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Financial Viability</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-800 mt-1">85 / 100</div>
            <div className="text-[10px] font-semibold text-slate-500 mt-0.5">DSCR 1.82x</div>
          </div>
        </div>

        {/* "WHAT WE FOUND" Structured Findings Grid */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
            Key Deterministic Findings:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1">
              <strong className="text-slate-900 block font-bold text-[13px]">Who will buy:</strong>
              <p className="text-slate-600 leading-snug">
                Plantation households, highway travelers on NH517, local tea stalls & dhabas in Gairkata and Dhupguri.
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1">
              <strong className="text-slate-900 block font-bold text-[13px]">Where to sell:</strong>
              <p className="text-slate-600 leading-snug">
                Gairkata Weekly Haat (Tues/Sat), Dhupguri wholesale APMC market, and direct roadside processing kiosk.
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1">
              <strong className="text-slate-900 block font-bold text-[13px]">What price:</strong>
              <p className="text-slate-600 leading-snug">
                ₹280/kg retail branded aroma-lock packets, ₹220/kg wholesale bulk leaf, vs ₹160/kg green leaf procurement.
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1">
              <strong className="text-slate-900 block font-bold text-[13px]">Why customers choose you:</strong>
              <p className="text-slate-600 leading-snug">
                Direct Banarhat STG farmgate leaf, airtight 3-ply foil pouch preserving North Bengal aroma, zero stale dust.
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1">
              <strong className="text-rose-700 block font-bold text-[13px]">What could go wrong:</strong>
              <p className="text-slate-600 leading-snug">
                Monsoon flush moisture spoilage and loose Khata credit defaults by tea stalls during seasonal rain lulls.
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1">
              <strong className="text-emerald-800 block font-bold text-[13px]">What you should do next:</strong>
              <p className="text-slate-600 leading-snug">
                Download the 40-Page NABARD-standard DPR, pre-audit KYC documents, and submit under PMEGP for 35% subsidy.
              </p>
            </div>
          </div>
        </div>

        {/* DPR Readiness Bar & Next Steps */}
        <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#083b5e]" />
              <span className="font-bold text-sm text-slate-900">DPR READINESS: 84%</span>
            </div>
            <p className="text-xs text-slate-600">
              40 official sections configured. Ready for submission to SBI / PNB Dhupguri branch loan appraisal.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onSelectTab('dpr')}
              className="px-4 py-2 rounded-xl bg-[#083b5e] hover:bg-[#062c46] text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <span>Generate Bank-Ready DPR</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
            <button
              onClick={() => onSelectTab('operations')}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <span>Bol-Khata & Operations</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Key KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Catchment Radius</div>
          <div className="text-2xl sm:text-3xl font-black text-[#083b5e] mt-1.5">{enterprise.radiusKm} km</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">OSM Ecosystem Scan</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Feasible Project Cost</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1.5">₹ {projectCost.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">10% Margin Engine</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">7D Validation Score</div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1.5">78 / 100</div>
          <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Deterministic Signal</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">DPR Status</div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-700 mt-1.5">40 Pages</div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-0.5">Bank-Ready PDF Ready</div>
        </div>
      </div>

      {/* 10-Stage Progressive Journey Matrix */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Complete 11-Stage Business Journey
            </h3>
            <p className="text-xs text-slate-500">
              Click any stage to inspect the underlying deterministic evidence layer.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            Full Pipeline Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3.5 pt-1">
          {JOURNEY_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                onClick={() => onSelectTab(step.id)}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-[#083b5e] transition-all cursor-pointer group flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-amber-700">Stage {idx + 1}</span>
                    <Icon className="w-4 h-4 text-slate-500 group-hover:text-[#083b5e] transition-colors" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-1 group-hover:text-[#083b5e]">
                    {step.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {idx === 0 && 'GPS intake & 5/10/15km OSM density scan'}
                    {idx === 1 && 'Population catchment & transport corridors'}
                    {idx === 2 && 'Occupation composition & wage seasonality'}
                    {idx === 3 && 'Customer fit, affordability & behaviour'}
                    {idx === 4 && 'Competitor saturation & moat strategy'}
                    {idx === 5 && '4-tier mandi prices & 3-market arbitrage'}
                    {idx === 6 && '7D mathematical judge & radar chart'}
                    {idx === 7 && 'Weekly haat calendar & 8-week forecast'}
                    {idx === 8 && '10% margin engine & seasonal EQI table'}
                    {idx === 9 && '40-page NABARD-standard PDF generator'}
                    {idx === 10 && 'KYC pre-audit & CAF application pre-fill'}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#083b5e] pt-1">
                  <span>Open Module</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
