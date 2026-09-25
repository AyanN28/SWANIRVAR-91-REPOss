import React from 'react';
import { EnterpriseState } from './dashboardTypes';
import {
  Target,
  Users,
  Repeat,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Volume2,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface CustomerModuleProps {
  enterprise: EnterpriseState;
  onProceedNext: () => void;
  onSpeak: (text: string) => void;
}

export const CustomerModule: React.FC<CustomerModuleProps> = ({
  enterprise,
  onProceedNext,
  onSpeak,
}) => {
  const narration = `Customer Intelligence for ${enterprise.businessType} in ${enterprise.locationName}. Customer-fit score is seventy-eight out of one hundred with sixty-four percent repeat-purchase stickiness. Four customer segments identified: primary local households, farm-linked buyers, small local retailers, and bulk buyers. Price sensitivity is moderate to high, indicating value-driven pricing and avoidance of unhedged customer credit.`;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#173326] to-[#083b5e] text-white p-6 rounded-2xl shadow-lg border border-emerald-900/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Target className="w-4 h-4" />
            <span>Step 4: Customer Intelligence & Behaviour</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Customer Fit, Affordability & Behaviour Signals
          </h2>
          <p className="text-slate-200 text-sm max-w-2xl mt-1">
            Entrepreneurs need to know: Who will buy? What can they afford? Will they buy repeatedly? Understand demand dynamics before committing working capital.
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

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Addressable Buyers</div>
          <div className="text-2xl font-black text-[#083b5e] mt-1">8,420</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">5–10 km catchment</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Customer Fit Score</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">78 / 100</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Need + affordability</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Price Sensitivity</div>
          <div className="text-2xl font-black text-amber-600 mt-1">Moderate-High</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Value-conscious tier</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Repeat Potential</div>
          <div className="text-2xl font-black text-indigo-700 mt-1">64%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Stickiness proxy</div>
        </div>
      </div>

      {/* 2-Column Section: Segments Table + Behaviour Dynamics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Customer Segments */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#083b5e]" />
            <span>Target Customer Segments</span>
          </h3>
          <p className="text-xs text-slate-500">
            Categorization by purchasing power, order frequency, and channel fit.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Segment</th>
                  <th className="py-2.5 px-3">Core Need</th>
                  <th className="py-2.5 px-3">Capacity</th>
                  <th className="py-2.5 px-3">Fit Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">Primary Households</td>
                  <td className="py-3 px-3 text-slate-600">Daily utility & local trust</td>
                  <td className="py-3 px-3 text-slate-600">Moderate</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      High Fit (86)
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">Farm-Linked Buyers</td>
                  <td className="py-3 px-3 text-slate-600">Seasonal bulk purchases</td>
                  <td className="py-3 px-3 text-slate-600">Moderate</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      High Fit (82)
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">Small Local Retailers</td>
                  <td className="py-3 px-3 text-slate-600">Consistent trade margin & supply</td>
                  <td className="py-3 px-3 text-slate-600">High</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
                      Medium (74)
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">Bulk / Institutional</td>
                  <td className="py-3 px-3 text-slate-600">Contract volume & invoices</td>
                  <td className="py-3 px-3 text-slate-600">High</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                      Test Phase (60)
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Behaviour Dynamics & GTM Implication */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-600" />
              <span>Purchase Behaviour & Customer Risk</span>
            </h3>

            <div className="space-y-2.5 mt-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Purchase Cadence</span>
                <strong className="text-slate-900">Weekly / Fortnightly</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Transaction Mode</span>
                <strong className="text-slate-900">72% Digital UPI / 28% Cash</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Customer Credit Risk</span>
                <strong className="text-rose-600 font-bold">Avoid Unhedged Khata Credit</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Primary Channel</span>
                <strong className="text-slate-900">Direct Shop + Weekly Haat Stall</strong>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-xl mt-4 text-xs text-amber-900">
              <strong>GTM Strategic Rule:</strong> Micro-enterprises frequently fail due to loose customer credit (Udhaar). Restrict credit terms to verified repeat customers to protect working capital liquidity.
            </div>
          </div>

          <button
            onClick={onProceedNext}
            className="w-full bg-[#083b5e] hover:bg-[#062c46] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition-colors text-sm"
          >
            <span>Proceed to Step 5: Competitor Intelligence</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
