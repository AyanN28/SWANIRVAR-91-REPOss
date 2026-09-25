import React, { useState } from 'react';
import { EnterpriseState } from './dashboardTypes';
import {
  Trophy,
  Swords,
  Landmark,
  Store,
  Users,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { ProvenanceBadge } from './ProvenanceBadge';

interface GamifiedTrainingModuleProps {
  enterprise: EnterpriseState;
  onSpeak: (text: string) => void;
}

interface Mission {
  id: string;
  title: string;
  triggerDimension: string;
  opponentName: string;
  opponentRole: string;
  scenario: string;
  options: {
    text: string;
    cashDelta: number;
    reputationDelta: number;
    complianceDelta: number;
    feedback: string;
  }[];
}

export const GamifiedTrainingModule: React.FC<GamifiedTrainingModuleProps> = ({
  enterprise,
  onSpeak,
}) => {
  const [activeMissionIndex, setActiveMissionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [cashScore, setCashScore] = useState(100);
  const [reputationScore, setReputationScore] = useState(85);
  const [complianceScore, setComplianceScore] = useState(90);
  const [history, setHistory] = useState<string[]>([]);

  const missions: Mission[] = [
    {
      id: 'm-1',
      title: 'Mission 1: The Tough Bank Branch Manager Pitch',
      triggerDimension: 'Financial Viability & DSCR',
      opponentName: 'Shri A. K. Mukherjee',
      opponentRole: 'Chief Manager, SBI Dhupguri Branch',
      scenario:
        `"Namaste. You are asking for ₹${(enterprise.capitalAmount * 9).toLocaleString()} term loan under PMEGP for your tea unit in Gairkata. But monsoon flush prices drop by 20%. How will you service the quarterly EMI during lean winter months when tea bushes are pruned?"`,
      options: [
        {
          text: 'Explain our Non-Linear Seasonal Amortization Schedule (EQI) where EMI payments are aligned with April-October peak flush revenues and lean in December-February.',
          cashDelta: 0,
          reputationDelta: +15,
          complianceDelta: +20,
          feedback:
            'Excellent! The Chief Manager is deeply impressed by your understanding of seasonal cash flows and approves the moratorium provision.',
        },
        {
          text: 'Offer to put up ancestral agricultural land as collateral security without checking whether PMEGP allows collateral-free credit.',
          cashDelta: -10,
          reputationDelta: -5,
          complianceDelta: -15,
          feedback:
            'Warning: PMEGP loans up to ₹50 Lakhs are covered by CGTMSE and are strictly collateral-free. The manager notes lack of scheme awareness.',
        },
        {
          text: 'Promise that you will borrow from local moneylenders if cash falls short.',
          cashDelta: -25,
          reputationDelta: -20,
          complianceDelta: -30,
          feedback:
            'Critical Failure: High interest informal debt triggers severe default probability. Bank loan application rejected.',
        },
      ],
    },
    {
      id: 'm-2',
      title: 'Mission 2: Siliguri Wholesale Mandi Price Squeeze',
      triggerDimension: 'Competition Saturation & Moats',
      opponentName: 'Ratan Lal Agrawal',
      opponentRole: 'Senior Tea Merchant, Siliguri Tea Auction Corridor',
      scenario:
        `"Bhaiya, big estate Bought Leaf Factories are dumping secondary fannings at ₹190/kg. Your price of ₹${enterprise.observedPrice || '280'}/kg is too high. Drop your rate by ₹40 or I buy from Malbazar."`,
      options: [
        {
          text: 'Do not drop price. Demonstrate your liquor density, fine two-leaves-and-a-bud Banarhat sourcing, and vacuum-sealed aroma-lock foil that delivers 35% more cups per kg.',
          cashDelta: +20,
          reputationDelta: +15,
          complianceDelta: +5,
          feedback:
            'Success! Ratan Lal conducts a cup test and orders 150 kg trial batch at full asking price, realizing the yield saves money per cup.',
        },
        {
          text: 'Immediately agree to drop price to ₹240/kg to secure the volume.',
          cashDelta: -15,
          reputationDelta: -10,
          complianceDelta: 0,
          feedback:
            'Price trap! You sacrificed your gross margin equity and established a low price precedent that hurts long-term sustainability.',
        },
        {
          text: 'Offer 45-day unhedged Khata credit without any advance deposit.',
          cashDelta: -30,
          reputationDelta: 0,
          complianceDelta: -20,
          feedback:
            'Liquidity Risk! 45-day unsecured credit starves your working capital when you need to pay green leaf growers on cash terms.',
        },
      ],
    },
    {
      id: 'm-3',
      title: 'Mission 3: Monsoon Moisture Crisis at Gairkata Depot',
      triggerDimension: 'Risk Assessment & Operations',
      opponentName: 'Biren Mondal',
      opponentRole: 'Head Plantation Master, Gairkata Ward 4',
      scenario:
        '"Continuous heavy Dooars rains have spiked humidity to 92%. A 400 kg lot of processed CTC tea in standard paper bags is beginning to absorb moisture and lose aroma."',
      options: [
        {
          text: 'Immediately activate the electric fluid-bed dehumidifier and transfer leaf into food-grade 3-ply metallized barrier pouches with nitrogen flush.',
          cashDelta: -5,
          reputationDelta: +25,
          complianceDelta: +25,
          feedback:
            'Flawless operational protocol! Total batch preserved with 100% cup freshness and zero mould spoilage.',
        },
        {
          text: 'Sun-dry the tea on plastic tarpaulins in open compound between rain showers.',
          cashDelta: -20,
          reputationDelta: -25,
          complianceDelta: -30,
          feedback:
            'Direct sun drying bleaches tea liquor and breaches FSSAI moisture safety standards. Quality rating degraded.',
        },
      ],
    },
  ];

  const currentMission = missions[activeMissionIndex];

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    const opt = currentMission.options[idx];
    setCashScore((prev) => Math.max(0, Math.min(150, prev + opt.cashDelta)));
    setReputationScore((prev) => Math.max(0, Math.min(100, prev + opt.reputationDelta)));
    setComplianceScore((prev) => Math.max(0, Math.min(100, prev + opt.complianceDelta)));
    setHistory((prev) => [
      ...prev,
      `[${currentMission.title}] Chose: "${opt.text.slice(0, 45)}..." -> ${opt.feedback}`,
    ]);

    onSpeak(opt.feedback);
  };

  const handleNextMission = () => {
    setSelectedOption(null);
    if (activeMissionIndex < missions.length - 1) {
      setActiveMissionIndex((prev) => prev + 1);
    } else {
      setActiveMissionIndex(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#17211b] via-[#083b5e] to-[#9b3430] text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-amber-400/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            <span>Gamified Business Simulator & AI Missions (Section 38)</span>
            <ProvenanceBadge type="MODELLED" source="Deterministic Mission Evaluator" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Enterprise Flight Simulator: Bank & Mandi Negotiations
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mt-1">
            Weak 7D dimensions automatically trigger real-world roleplay simulations against the Bank Branch Manager, Wholesale Tea Merchants, and Plantation Masters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCashScore(100);
              setReputationScore(85);
              setComplianceScore(90);
              setSelectedOption(null);
              setActiveMissionIndex(0);
              setHistory([]);
            }}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors border border-white/20"
            title="Reset Simulator"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Live Performance Meters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Cash Runway Score</span>
            <span className="text-[#083b5e] font-black">{cashScore} / 100</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                cashScore > 75 ? 'bg-emerald-600' : cashScore > 40 ? 'bg-amber-500' : 'bg-rose-600'
              }`}
              style={{ width: `${Math.min(100, cashScore)}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400">Survival capital after negotiation deals</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Community Reputation</span>
            <span className="text-emerald-700 font-black">{reputationScore} / 100</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${reputationScore}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400">Trust with growers, haats & buyers</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Bank & KYC Compliance</span>
            <span className="text-blue-700 font-black">{complianceScore} / 100</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${complianceScore}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400">Adherence to RBI & PMEGP guidelines</div>
        </div>
      </div>

      {/* Current Mission Encounter Box */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[11px] font-black uppercase text-amber-700 tracking-wider">
              {currentMission.triggerDimension}
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">{currentMission.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-slate-100 font-bold text-slate-700">
              Scenario {activeMissionIndex + 1} of {missions.length}
            </span>
          </div>
        </div>

        {/* Character Dialogue Box */}
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#083b5e] text-white flex items-center justify-center font-black text-base shrink-0 shadow-md">
            {activeMissionIndex === 0 ? <Landmark className="w-6 h-6 text-amber-300" /> : <Store className="w-6 h-6 text-amber-300" />}
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <div className="font-black text-slate-900 text-sm">{currentMission.opponentName}</div>
              <span className="text-[11px] text-slate-500 font-semibold">{currentMission.opponentRole}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
              {currentMission.scenario}
            </p>
          </div>
        </div>

        {/* Tactical Options */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
            Choose Your Tactical Response:
          </label>
          {currentMission.options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => selectedOption === null && handleSelectOption(idx)}
              className={`p-4 rounded-2xl border text-xs transition-all cursor-pointer ${
                selectedOption === idx
                  ? 'bg-blue-50/80 border-[#083b5e] shadow-sm font-semibold text-slate-900'
                  : selectedOption !== null
                  ? 'opacity-60 bg-slate-50 border-slate-200 cursor-default'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-[#083b5e]'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-slate-100 font-black text-[11px] flex items-center justify-center text-slate-700 shrink-0">
                  {idx + 1}
                </span>
                <div className="space-y-1 flex-1">
                  <p className="text-slate-800 leading-snug">{opt.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Referee AI After-Action Review (AAR) */}
        {selectedOption !== null && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-emerald-950 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Referee AI After-Action Evaluation</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-emerald-700">Cash: {currentMission.options[selectedOption].cashDelta >= 0 ? '+' : ''}{currentMission.options[selectedOption].cashDelta}</span>
                <span className="text-blue-700">Rep: {currentMission.options[selectedOption].reputationDelta >= 0 ? '+' : ''}{currentMission.options[selectedOption].reputationDelta}</span>
              </div>
            </div>
            <p className="text-xs text-emerald-900 font-medium">
              {currentMission.options[selectedOption].feedback}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextMission}
                className="px-4 py-2 rounded-xl bg-[#083b5e] hover:bg-[#062c46] text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <span>Proceed to Next Encounter</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
