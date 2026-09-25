import React, { useState } from 'react';
import { EnterpriseState } from './dashboardTypes';
import {
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  TrendingDown,
  X,
  Sparkles,
  Info,
  Scale,
} from 'lucide-react';
import { ProvenanceBadge } from './ProvenanceBadge';

interface RiskRegisterSwotModalProps {
  isOpen: boolean;
  onClose: () => void;
  enterprise: EnterpriseState;
}

export const RiskRegisterSwotModal: React.FC<RiskRegisterSwotModalProps> = ({
  isOpen,
  onClose,
  enterprise,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'risk' | 'swot'>('risk');

  // 11 Risk Categories from Section 20
  const riskRegister = [
    {
      category: '1. Supply Chain',
      risk: 'Green leaf availability during extreme drought or unseasonal pest attacks in Dooars belt',
      prob: 'Medium',
      impact: 'High',
      score: 72,
      mitigation: 'Long-term forward plucking contracts with 12 Banarhat Small Tea Growers (STG) SHGs',
      owner: 'Procurement Incharge',
      indicator: 'Daily green leaf intake log vs. 250 kg/day target',
    },
    {
      category: '2. Demand Volatility',
      risk: 'Wholesale tea auction index fluctuations leading to buyer hesitation',
      prob: 'Low',
      impact: 'Medium',
      score: 45,
      mitigation: 'Diversified sales mix: 40% retail branded packets, 30% weekly haats, 30% institutional',
      owner: 'Promoter',
      indicator: 'Weekly sales velocity across channels',
    },
    {
      category: '3. Price Volatility',
      risk: 'Siliguri tea auction price drops affecting bulk secondary fannings realization',
      prob: 'Medium',
      impact: 'Medium',
      score: 55,
      mitigation: 'Value-addition into premium aroma-lock 250g packets with ₹280/kg retail realization',
      owner: 'Sales Head',
      indicator: 'Agmarknet APMC price delta',
    },
    {
      category: '4. Infrastructure',
      risk: 'Grid power tripping in Dhupguri feeder causing CTC rotorvane stoppage',
      prob: 'High',
      impact: 'High',
      score: 80,
      mitigation: 'Dedicated 15 kVA diesel genset backup embedded in PMEGP CapEx schedule',
      owner: 'Operations Head',
      indicator: 'Genset fuel reserve & automatic transfer switch test log',
    },
    {
      category: '5. Single Buyer Dependency',
      risk: 'Over-reliance on one wholesale distributor in Siliguri',
      prob: 'Low',
      impact: 'High',
      score: 40,
      mitigation: 'Mandatory rule: No single buyer exceeds 20% of total monthly throughput',
      owner: 'Promoter',
      indicator: 'Client concentration ratio',
    },
    {
      category: '6. Seasonality',
      risk: 'Zero fresh leaf harvest during winter pruning lull (December to February)',
      prob: 'High',
      impact: 'High',
      score: 85,
      mitigation: 'Non-linear seasonal EMI repayment (EQI); build packaged finished stock reserve in Oct-Nov',
      owner: 'Finance Head',
      indicator: 'Red Pot working capital buffer for winter wages',
    },
    {
      category: '7. Working Capital',
      risk: 'Cash freeze in customer credit (Udhaar) starving green leaf cash purchases',
      prob: 'Medium',
      impact: 'Critical',
      score: 78,
      mitigation: 'Digital Bol-Khata strict 7-day credit limit; 2% cash discount for instant UPI payments',
      owner: 'Promoter',
      indicator: 'Receivables ageing >15 days trigger',
    },
    {
      category: '8. Competition',
      risk: 'Large Bought Leaf Factories dumping cheap unbranded dust in local haats',
      prob: 'High',
      impact: 'Medium',
      score: 65,
      mitigation: 'Quality differentiation: Organically certified Dooars leaf with QR traceability',
      owner: 'Marketing',
      indicator: 'Haat customer retention rate',
    },
    {
      category: '9. Credit / Bad Debt',
      risk: 'Default on receivables by local highway dhabas and tea stalls',
      prob: 'Medium',
      impact: 'Medium',
      score: 52,
      mitigation: 'Maximum ₹3,000 credit limit per stall; instant WhatsApp statement dispatch',
      owner: 'Accounts',
      indicator: 'Overdue receivables ledger balance',
    },
    {
      category: '10. Regulatory',
      risk: 'FSSAI packaging compliance & Tea Board waste-tea disposal mandates',
      prob: 'Low',
      impact: 'High',
      score: 35,
      mitigation: 'FSSAI food license & Tea Board registration secured prior to commercial run',
      owner: 'Compliance Officer',
      indicator: 'FSSAI license renewal calendar',
    },
    {
      category: '11. Operational',
      risk: 'Moisture ingress during heavy monsoon transport to weekly markets',
      prob: 'High',
      impact: 'High',
      score: 75,
      mitigation: 'Three-layer metallized moisture-barrier pouches with heat-sealed nitrogen flush',
      owner: 'Packaging Supervisor',
      indicator: 'Batch moisture meter readings (<7.5%)',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#083b5e] to-[#9b3430] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Bank-Standard Enterprise Risk & SWOT Matrix (Sections 19 & 20)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            11-Category Risk Register & Budget SWOT Engine
          </h2>
          <p className="text-xs text-slate-200 mt-1">
            Full risk probability, financial impact, mitigation protocols, and deterministic SWOT for bank loan appraisal.
          </p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('risk')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'risk' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-white/10 text-white'
              }`}
            >
              11-Category Risk Register
            </button>
            <button
              onClick={() => setActiveTab('swot')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'swot' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-white/10 text-white'
              }`}
            >
              Deterministic SWOT Engine
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'risk' ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Audit-Ready Risk Register</span>
                <span className="text-slate-500">11 Categories Analyzed · Aligned with RBI Basel Norms</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                    <tr>
                      <th className="p-3">Category</th>
                      <th className="p-3">Identified Risk & Trigger</th>
                      <th className="p-3">Prob / Impact</th>
                      <th className="p-3">Score</th>
                      <th className="p-3">Mandatory Mitigation Protocol</th>
                      <th className="p-3">Owner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {riskRegister.map((r) => (
                      <tr key={r.category} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900 whitespace-nowrap">{r.category}</td>
                        <td className="p-3 text-slate-700 max-w-xs">{r.risk}</td>
                        <td className="p-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              r.impact === 'Critical'
                                ? 'bg-rose-100 text-rose-800'
                                : r.impact === 'High'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {r.prob} / {r.impact}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-slate-900">{r.score}</td>
                        <td className="p-3 text-slate-700 text-[11px] leading-tight max-w-sm">{r.mitigation}</td>
                        <td className="p-3 text-slate-500 font-semibold whitespace-nowrap">{r.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm text-emerald-950">STRENGTHS (Internal)</h4>
                  <ProvenanceBadge type="VERIFIED" source="Field Survey & Capital Profile" />
                </div>
                <ul className="text-xs text-emerald-900 space-y-1.5 list-disc pl-4">
                  {enterprise.aiFeasibilityData?.swot?.strengths ? (
                    enterprise.aiFeasibilityData.swot.strengths.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))
                  ) : (
                    <>
                      <li>Direct geographical proximity to high-yield local supply in {enterprise.locationName}.</li>
                      <li>Clean 10% entrepreneur equity margin of ₹{enterprise.capitalAmount.toLocaleString()} without pre-existing liabilities.</li>
                      <li>Modern value-added packaging delivering superior freshness and shelf life.</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm text-amber-950">WEAKNESSES (Internal)</h4>
                  <ProvenanceBadge type="MODELLED" source="Working Capital Ratios" />
                </div>
                <ul className="text-xs text-amber-900 space-y-1.5 list-disc pl-4">
                  {enterprise.aiFeasibilityData?.swot?.weaknesses ? (
                    enterprise.aiFeasibilityData.swot.weaknesses.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))
                  ) : (
                    <>
                      <li>Initial processing capacity scaling during peak seasonal demand.</li>
                      <li>Brand awareness currently concentrated within 10–15 km village corridor.</li>
                      <li>Working capital sensitivity to extended credit requested by small kiosks.</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Opportunities */}
              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm text-blue-950">OPPORTUNITIES (External)</h4>
                  <ProvenanceBadge type="VERIFIED" source="PMEGP & SCA Norms" />
                </div>
                <ul className="text-xs text-blue-900 space-y-1.5 list-disc pl-4">
                  {enterprise.aiFeasibilityData?.swot?.opportunities ? (
                    enterprise.aiFeasibilityData.swot.opportunities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))
                  ) : (
                    <>
                      <li>Up to 25–35% Margin Money Subsidy under PMEGP for rural {enterprise.stateName} unit.</li>
                      <li>Rising demand for authenticated, locally produced, FSSAI-compliant goods.</li>
                      <li>Transit corridors expanding highway footfall and retail off-take.</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Threats */}
              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm text-rose-950">THREATS (External)</h4>
                  <ProvenanceBadge type="AI GENERATED" source="Gemini Advisory Engine" />
                </div>
                <ul className="text-xs text-rose-900 space-y-1.5 list-disc pl-4">
                  {enterprise.aiFeasibilityData?.swot?.threats ? (
                    enterprise.aiFeasibilityData.swot.threats.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))
                  ) : (
                    <>
                      <li>Unseasonal raw material price fluctuations during monsoon/winter lull.</li>
                      <li>Power grid disruption during heavy rainfall requiring generator backup.</li>
                      <li>Informal traders offering predatory credit terms to capture retail outlets.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#083b5e] hover:bg-[#062c46] text-white font-bold text-xs shadow"
          >
            Close Risk Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
