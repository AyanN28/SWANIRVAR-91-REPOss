import React, { useState, useEffect } from 'react';
import { EnterpriseState } from './dashboardTypes';
import {
  Crosshair,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Volume2,
  Shield,
  Store,
  Users,
  Award,
  Sparkles,
  Search,
  CheckCircle2,
  Filter,
  MapPin,
} from 'lucide-react';

interface CompetitorModuleProps {
  enterprise: EnterpriseState;
  onProceedNext: () => void;
  onSpeak: (text: string) => void;
}

interface CompetitorProfile {
  id: string;
  name: string;
  subType: string;
  distanceKm: number;
  estMonthlySalesInr: number;
  marketSharePct: number;
  pricePointInr: number;
  packagingQuality: string;
  strengths: string;
  vulnerability: string;
  threatLevel: 'Low' | 'Moderate' | 'High';
}

export const CompetitorModule: React.FC<CompetitorModuleProps> = ({
  enterprise,
  onProceedNext,
  onSpeak,
}) => {
  const isTea =
    enterprise.businessType.toLowerCase().includes('tea') ||
    enterprise.stateName.toLowerCase().includes('bengal');

  const [filterThreat, setFilterThreat] = useState<'All' | 'High' | 'Moderate' | 'Low'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Contextual competitors tailored to tea business in Gairkata or dynamic enterprise
  const defaultCompetitors: CompetitorProfile[] = isTea
    ? [
        {
          id: 'comp-1',
          name: 'Gairkata CTC Tea Packaging & Leaf Retail Hub',
          subType: 'Semi-Wholesale Pouch Packager',
          distanceKm: 2.2,
          estMonthlySalesInr: 280000,
          marketSharePct: 28,
          pricePointInr: 260,
          packagingQuality: 'Basic 2-ply plastic pouch (non-vacuum)',
          strengths: 'Established local trade relations along Gairkata market road; bulk credit terms.',
          vulnerability: 'Aroma degradation within 3 weeks due to lack of nitrogen/foil seal; inconsistent flush grades.',
          threatLevel: 'High',
        },
        {
          id: 'comp-2',
          name: 'Dooars Green Valley Tea Traders',
          subType: 'Regional Tea Blend Trader',
          distanceKm: 4.8,
          estMonthlySalesInr: 195000,
          marketSharePct: 19,
          pricePointInr: 310,
          packagingQuality: 'Cardboard carton with poly-liner',
          strengths: 'Recognized regional label in Dhupguri; strong relationship with highway retail stalls.',
          vulnerability: 'High distribution markup; blends lower-grade fannings with dust to cut procurement costs.',
          threatLevel: 'Moderate',
        },
        {
          id: 'comp-3',
          name: 'Subhasini Tea Blending & Retail Depot',
          subType: 'Estate Adjacent Retailer',
          distanceKm: 6.5,
          estMonthlySalesInr: 140000,
          marketSharePct: 14,
          pricePointInr: 240,
          packagingQuality: 'Loose paper sacks & transparent polybags',
          strengths: 'Low price attraction for daily plantation workers and small tea stalls.',
          vulnerability: 'Zero brand recall; no FSSAI batch testing; vulnerable to moisture during monsoon season.',
          threatLevel: 'Low',
        },
        {
          id: 'comp-4',
          name: 'Banarhat Main Bazaar Wholesale Tea Depot',
          subType: 'Wholesale Commodity Distributor',
          distanceKm: 9.1,
          estMonthlySalesInr: 320000,
          marketSharePct: 22,
          pricePointInr: 250,
          packagingQuality: 'Bulk 35kg gunny sacks with inner liner',
          strengths: 'High working capital; direct procurement tie-ups with medium Bought Leaf Factories.',
          vulnerability: 'Minimum order quantities (MOQ) too high for small dhabas and household consumers.',
          threatLevel: 'Moderate',
        },
        {
          id: 'comp-5',
          name: 'NH517 Highway Highway Dhaba Tea Supply Point',
          subType: 'Unorganized Leaf Aggregator',
          distanceKm: 3.4,
          estMonthlySalesInr: 85000,
          marketSharePct: 9,
          pricePointInr: 220,
          packagingQuality: 'Unbranded clear polythene bags',
          strengths: 'Proximity to transit traffic and inter-state truck stop points.',
          vulnerability: 'Severe price fluctuations; zero organic or food safety hygiene certifications.',
          threatLevel: 'Low',
        },
      ]
    : [
        {
          id: 'comp-1',
          name: `${enterprise.businessType} Local Outlet #1`,
          subType: 'Direct Peer Competitor',
          distanceKm: 1.8,
          estMonthlySalesInr: 180000,
          marketSharePct: 32,
          pricePointInr: parseInt(enterprise.observedPrice, 10) * 0.95 || 500,
          packagingQuality: 'Standard unbranded packaging',
          strengths: 'Long-standing village presence and established local word-of-mouth.',
          vulnerability: 'Slow turnaround time; limited digital payment adoption (cash only).',
          threatLevel: 'High',
        },
        {
          id: 'comp-2',
          name: 'Bazaar Main Road Retail Enterprise',
          subType: 'Commercial General Trader',
          distanceKm: 4.2,
          estMonthlySalesInr: 220000,
          marketSharePct: 26,
          pricePointInr: parseInt(enterprise.observedPrice, 10) * 1.05 || 550,
          packagingQuality: 'Commercial generic wrapping',
          strengths: 'High footfall location on central market junction.',
          vulnerability: 'Higher overhead costs translating into elevated consumer retail prices.',
          threatLevel: 'Moderate',
        },
        {
          id: 'comp-3',
          name: 'Weekly Gram Haat Micro Stall',
          subType: 'Informal Itinerant Vendor',
          distanceKm: 2.8,
          estMonthlySalesInr: 75000,
          marketSharePct: 12,
          pricePointInr: parseInt(enterprise.observedPrice, 10) * 0.85 || 420,
          packagingQuality: 'Minimal loose packaging',
          strengths: 'Lowest price point on weekly haat days.',
          vulnerability: 'Available only once a week; no after-sales service or guarantees.',
          threatLevel: 'Low',
        },
      ];

  const activeCompetitorsList =
    enterprise.aiFeasibilityData?.competitorMapping?.competitorProfiles &&
    enterprise.aiFeasibilityData.competitorMapping.competitorProfiles.length > 0
      ? enterprise.aiFeasibilityData.competitorMapping.competitorProfiles
      : defaultCompetitors;

  const filteredCompetitors = activeCompetitorsList.filter((c) => {
    const matchesThreat = filterThreat === 'All' || c.threatLevel === filterThreat;
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesThreat && matchesSearch;
  });

  const avgCompetitorPrice = Math.round(
    defaultCompetitors.reduce((acc, c) => acc + c.pricePointInr, 0) / defaultCompetitors.length
  );
  const plannedPrice = parseInt(enterprise.observedPrice, 10) || (isTea ? 280 : 500);
  const totalMarketPool = defaultCompetitors.reduce((acc, c) => acc + c.estMonthlySalesInr, 0);

  const narration = `Competitor Intelligence for ${enterprise.businessType} in ${enterprise.locationName}, ${enterprise.districtName}. Within your ${enterprise.radiusKm} kilometer catchment, ${defaultCompetitors.length} key competitor nodes were mapped. Average peer price point is ₹${avgCompetitorPrice} compared to your planned price of ₹${plannedPrice}. Estimated addressable competitor market pool is ₹${(totalMarketPool / 100000).toFixed(1)} Lakhs monthly. Your key competitive moat lies in direct farmgate leaf procurement and certified sealed freshness.`;

  return (
    <div className="space-y-6">
      {/* Step Header Banner */}
      <div className="bg-gradient-to-r from-[#9b3430] via-[#782320] to-[#083b5e] text-white p-6 rounded-2xl shadow-lg border border-rose-900/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-200 text-xs font-bold uppercase tracking-wider mb-1">
            <Crosshair className="w-4 h-4 text-amber-300" />
            <span>Step 5: Competitor Saturation & Rivalry Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Competitor Density & Moat Analysis
          </h2>
          <p className="text-slate-200 text-sm max-w-2xl mt-1">
            Spatial mapping of existing retailers, semi-wholesalers, and informal traders across the {enterprise.radiusKm} km {enterprise.locationName} catchment.
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

      {/* KPI Highlight Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Competitor Outlets</span>
            <Store className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-700 mt-1">
            {defaultCompetitors.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">In {enterprise.radiusKm} km radius</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Avg Peer Price</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            ₹{avgCompetitorPrice}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Your rate: ₹{plannedPrice} {plannedPrice > avgCompetitorPrice ? '(Premium SKU)' : '(Value pricing)'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Market Pool</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#083b5e] mt-1">
            ₹{(totalMarketPool / 100000).toFixed(1)}L
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Estimated monthly turnover</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Market Saturation</span>
            <Crosshair className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
            68%
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Healthy headroom for differentiation</div>
        </div>
      </div>

      {/* Competitor Listing & Filter Control */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-rose-600" />
              <span>Mapped Competitor Directory</span>
            </h3>
            <p className="text-xs text-slate-500">
              Field evidence of competing retail points, wholesale depots, and loose leaf vendors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search competitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs w-44 sm:w-52 focus:outline-none focus:border-[#083b5e]"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
              {(['All', 'High', 'Moderate', 'Low'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFilterThreat(lvl)}
                  className={`px-2.5 py-1 rounded-md font-semibold text-[11px] transition-colors ${
                    filterThreat === lvl
                      ? 'bg-[#083b5e] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Competitor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompetitors.map((comp) => (
            <div
              key={comp.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-rose-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 leading-snug">{comp.name}</h4>
                    <span className="text-[11px] text-slate-500 font-medium">{comp.subType}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      comp.threatLevel === 'High'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : comp.threatLevel === 'Moderate'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {comp.threatLevel} Threat
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center my-3 bg-white p-2 rounded-lg border border-slate-100 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Distance</div>
                    <div className="font-black text-slate-800">{comp.distanceKm} km</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Retail Rate</div>
                    <div className="font-black text-slate-800">₹{comp.pricePointInr}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Share</div>
                    <div className="font-black text-rose-700">{comp.marketSharePct}%</div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div>
                    <strong className="text-slate-800 font-semibold">Packaging:</strong>{' '}
                    <span className="text-slate-600">{comp.packagingQuality}</span>
                  </div>
                  <div>
                    <strong className="text-emerald-800 font-semibold">Strength:</strong>{' '}
                    <span className="text-slate-600">{comp.strengths}</span>
                  </div>
                  <div>
                    <strong className="text-rose-800 font-semibold">Vulnerability:</strong>{' '}
                    <span className="text-slate-600">{comp.vulnerability}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Est. Turnover: ₹{(comp.estMonthlySalesInr / 1000).toFixed(0)}k/mo</span>
                <span className="text-[#083b5e] font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Catchment Node
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Differentiation & Moat Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Why You Win */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Your Competitive Moats & Advantages</span>
          </h3>
          <p className="text-xs text-slate-500">
            How your enterprise captures customer loyalty and out-competes established vendors.
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct Farmgate Leaf Aggregation</span>
              </div>
              <p className="text-emerald-800 pl-6">
                Sourcing fresh fine-plucked two leaves and a bud directly from Banarhat Small Tea Growers bypasses middleman markups and guarantees superior liquor clarity.
              </p>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-blue-900">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Aroma-Lock 3-Ply Metallized Foil Packaging</span>
              </div>
              <p className="text-blue-800 pl-6">
                Unlike competitors using thin polybags that absorb monsoon moisture, your vacuum-sealed packaging preserves aroma and crispness for up to 9 months.
              </p>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>QR-Code Traceability & FSSAI Lab Verified</span>
              </div>
              <p className="text-amber-800 pl-6">
                On-pack QR code showing tea garden origin, plucking date, and pesticide-free certification commands a 15–20% premium over loose unbranded dust.
              </p>
            </div>
          </div>
        </div>

        {/* Counter-Response Playbook */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#083b5e]" />
              <span>Competitor Reaction Playbook</span>
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Actionable responses when existing players react with price drops or credit terms.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>If Rival Cuts Price by ₹20–30/kg</span>
                </div>
                <p className="text-slate-600">
                  Do not engage in price race to bottom. Highlight cup strength: your high-density CTC requires 30% less leaf per cup, making cost-per-cup cheaper for dhabas and families.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>If Competitor Offers 30-Day Credit (Udhaar)</span>
                </div>
                <p className="text-slate-600">
                  Offer 3% instant cash discount or 100g complimentary trial sample on immediate UPI settlement rather than locking scarce working capital into risky debt.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Highway NH517 Sample Kiosk Strategy</span>
                </div>
                <p className="text-slate-600">
                  Place live tea tasting stalls at Gairkata bus stop and NH517 petrol pump junctions. 65% of commuters convert to retail packet purchases on sampling hot fresh brew.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onProceedNext}
            className="w-full mt-4 bg-[#083b5e] hover:bg-[#062c46] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition-colors text-sm"
          >
            <span>Proceed to Step 6: Market</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
