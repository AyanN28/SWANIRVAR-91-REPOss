import React, { useState, useEffect } from 'react';
import { EnterpriseState } from './dashboardTypes';
import { fetchMandisPricing } from '../../services/spatialApiService';
import { MandiPriceReport } from '../../server/spatialDataService';
import {
  ShoppingBag,
  TrendingUp,
  Calendar,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
  Volume2,
  DollarSign,
  Tag,
  Clock,
  Sparkles,
  Zap,
  MapPin,
  Database,
  Truck,
} from 'lucide-react';

interface MarketGtmModuleProps {
  enterprise: EnterpriseState;
  activeSection: 'market' | 'gtm';
  onProceedNext: () => void;
  onSpeak: (text: string) => void;
}

export const MarketGtmModule: React.FC<MarketGtmModuleProps> = ({
  enterprise,
  activeSection,
  onProceedNext,
  onSpeak,
}) => {
  const [selectedTier, setSelectedTier] = useState<'all' | '1' | '2' | '3' | '4'>('all');
  const [activeTab, setActiveTab] = useState<'prices' | 'arbitrage' | 'deadstock'>('prices');
  const [mandis, setMandis] = useState<MandiPriceReport[]>([]);
  const [loadingMandis, setLoadingMandis] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoadingMandis(true);
    fetchMandisPricing(
      enterprise.lat,
      enterprise.lng,
      enterprise.districtName,
      enterprise.stateName,
      enterprise.businessType
    )
      .then((data) => {
        if (isMounted) setMandis(data);
      })
      .catch((err) => {
        console.warn('Mandi fetch error:', err);
      })
      .finally(() => {
        if (isMounted) setLoadingMandis(false);
      });

    return () => {
      isMounted = false;
    };
  }, [enterprise.lat, enterprise.lng, enterprise.districtName, enterprise.stateName, enterprise.businessType]);

  const nearestMandi = mandis[0] || {
    mandiName: `${enterprise.districtName} Central APMC`,
    distanceKm: 4.2,
    modalPrice: 7450,
  };

  const narration = activeSection === 'market'
    ? `Market Intelligence and 4-tier Mandi price architecture for ${enterprise.locationName}. Connected to Agmarknet and e-NAM data repositories via Open Government Data data.gov.in. Nearest wholesale market is ${nearestMandi.mandiName}, located ${nearestMandi.distanceKm} kilometers away, with modal market rate of rupees ${nearestMandi.modalPrice.toLocaleString()} per quintal. Three-market spatial arbitrage reveals a price spread of five point two percent between procurement and consuming mandis.`
    : `Go-To-Market and Seasonal Calendar Intelligence for ${enterprise.locationName}. Tracks recurring weekly haats, Kharif and Rabi harvest cycles, and festival demand windows. Recommends two to three week advance stocking to prevent stockouts while protecting working capital from dead-stock accumulation.`;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#083b5e] to-[#173326] text-white p-6 rounded-2xl shadow-lg border border-slate-700/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            {activeSection === 'market' ? <ShoppingBag className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
            <span>{activeSection === 'market' ? 'Step 6: Market Intelligence' : 'Step 8: Go-To-Market & Seasonal Forecast'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {activeSection === 'market'
              ? 'Agmarknet / e-NAM Mandis Near Me & Arbitrage'
              : 'GTM Strategy, Weekly Haats & 8-Week Forecast'}
          </h2>
          <p className="text-slate-200 text-sm max-w-2xl mt-1">
            {activeSection === 'market'
              ? `Real-time agricultural commodity prices, modal rates, daily arrivals, and 4-tier pricing bands via Agmarknet / e-NAM (data.gov.in) around ${enterprise.locationName}.`
              : `Weekly village haats, demand cycles, and forward supply planning synchronized with Kharif/Rabi harvest timings.`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSpeak(narration)}
            className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors border border-white/20"
          >
            <Volume2 className="w-4 h-4 text-amber-300" />
            <span>Listen</span>
          </button>
        </div>
      </div>

      {activeSection === 'market' ? (
        /* MARKET INTELLIGENCE */
        <div className="space-y-6">
          {/* Sub-Tabs: Layered Mandi, 3-Market Arbitrage, Dead-Stock */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setActiveTab('prices')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'prices' ? 'bg-[#083b5e] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Mandi Near Me & 4 Tiers ({mandis.length})
            </button>
            <button
              onClick={() => setActiveTab('arbitrage')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'arbitrage' ? 'bg-[#083b5e] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              3-Market Arbitrage Comparison
            </button>
            <button
              onClick={() => setActiveTab('deadstock')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'deadstock' ? 'bg-[#083b5e] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Dead-Stock & Reverse Auction
            </button>
          </div>

          {activeTab === 'prices' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#083b5e]" />
                      <span>APMC Mandis Near Me (Haversine Calibrated)</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Calculated from coordinates: {enterprise.lat.toFixed(4)}°, {enterprise.lng.toFixed(4)}°
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Agmarknet & e-NAM Sync</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mandis.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-md transition-all space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-slate-900 text-sm block">{item.mandiName}</span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Truck className="w-3 h-3 text-slate-400" />
                            <strong>{item.distanceKm} km</strong> away from hub
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                          {item.tier.split(' ')[0]} {item.tier.split(' ')[1]}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-200/60 flex justify-between">
                        <span>Commodity: <strong>{item.commodity}</strong></span>
                        <span>Arrivals: <strong>{item.arrivalsTodayTonnes} MT</strong></span>
                      </div>

                      <div className="flex justify-between items-baseline pt-1">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-400">Modal Price</div>
                          <div className="text-lg font-black text-[#083b5e]">₹{item.modalPrice.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ qtl</span></div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-bold ${item.priceTrend.startsWith('+') ? 'text-emerald-600' : item.priceTrend.startsWith('-') ? 'text-rose-600' : 'text-slate-500'}`}>
                            {item.priceTrend} today
                          </span>
                          <div className="text-[10px] text-slate-400">Range: ₹{item.minPrice} - ₹{item.maxPrice}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mandi Source Reference */}
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 flex items-center justify-between text-[11px] text-amber-950">
                  <div className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-amber-700" />
                    <span><strong>Data Source:</strong> Agmarknet / e-NAM API (Data.gov.in OGD Platform India)</span>
                  </div>
                  <span className="font-semibold text-amber-800">Resource ID: 9ef84268</span>
                </div>
              </div>

              <div className="md:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Coverage Hierarchy</h3>
                  <div className="space-y-2.5 mt-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <strong className="text-[#083b5e] block font-bold">Tier 1: e-NAM & Agmarknet</strong>
                      <span className="text-slate-500">Official Daily APMC rates streamed via OGD catalog APIs</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <strong className="text-emerald-700 block font-bold">Tier 2: Historical APMCs</strong>
                      <span className="text-slate-500">Seasonal price band modeling for non-digitized mandis</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <strong className="text-amber-700 block font-bold">Tier 3: Spatial Interpolation</strong>
                      <span className="text-slate-500">OpenStreetMap Overpass weekly village haat proxies</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <strong className="text-indigo-700 block font-bold">Tier 4: VLE Crowdsource</strong>
                      <span className="text-slate-500">CSC Village Level Entrepreneur ground-survey spot rates</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onProceedNext}
                  className="w-full bg-[#083b5e] hover:bg-[#062c46] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition-colors text-sm"
                >
                  <span>Proceed to 7D Validation</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'arbitrage' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">3-Market Arbitrage Comparison</h3>
                  <p className="text-xs text-slate-500">Buy low in procurement corridor; sell at high-demand consumer mandis</p>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  Opportunity Spread: +₹250 - ₹650 / qtl
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/40 space-y-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]">
                    OPTIMAL PROCUREMENT MARKET
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">{mandis[0]?.mandiName || 'Dhupguri Regulated APMC'}</h4>
                  <div className="text-2xl font-black text-emerald-800">
                    ₹{mandis[0]?.modalPrice.toLocaleString() || '3,600'} <span className="text-xs font-normal text-slate-500">/ qtl</span>
                  </div>
                  <p className="text-slate-600">
                    Direct grower arrivals ({mandis[0]?.arrivalsTodayTonnes || 185} MT). Lowest cost per kg for fresh fine plucked leaf.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="px-2 py-0.5 rounded bg-slate-600 text-white font-bold text-[10px]">
                    WHOLESALE AUCTION BENCHMARK
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">{mandis[1]?.mandiName || 'Siliguri Tea Auction Committee (STAC)'}</h4>
                  <div className="text-2xl font-black text-slate-800">
                    ₹{mandis[1]?.modalPrice.toLocaleString() || '26,500'} <span className="text-xs font-normal text-slate-500">/ qtl</span>
                  </div>
                  <p className="text-slate-600">
                    Institutional trade reference for finished CTC and Orthodox leaf grades across North Bengal and Dooars.
                  </p>
                </div>

                <div className="p-4 rounded-xl border-2 border-[#083b5e] bg-blue-50/40 space-y-2">
                  <span className="px-2 py-0.5 rounded bg-[#083b5e] text-white font-bold text-[10px]">
                    HIGH MARGIN LOCAL HAAT
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">{mandis[2]?.mandiName || `${enterprise.locationName} Weekly Haat`}</h4>
                  <div className="text-2xl font-black text-[#083b5e]">
                    ₹{mandis[2]?.modalPrice.toLocaleString() || '3,750'} <span className="text-xs font-normal text-slate-500">/ qtl</span>
                  </div>
                  <p className="text-slate-600">
                    Premium retail packet sales to village merchants, weekly visitors, and highway travelers on NH517.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deadstock' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Dead-Stock Liquidation & Reverse Auction</span>
                  </h3>
                  <p className="text-xs text-slate-500">Proactively liquidate unsold inventory before 45-day aging threshold</p>
                </div>
                <button
                  onClick={() => alert(`Broadcasted clearance batch to 18 registered tea merchants across ${enterprise.districtName} and Dooars corridor!`)}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Broadcast Clearance Batch</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                    <tr>
                      <th className="p-3">Stock SKU</th>
                      <th className="p-3">Aging</th>
                      <th className="p-3">Cost Basis</th>
                      <th className="p-3">Clearance Trigger</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Unblended Monsoon Rain Flush (Fannings Grade)</td>
                      <td className="p-3 text-amber-700 font-bold">38 Days</td>
                      <td className="p-3">₹38,500</td>
                      <td className="p-3 text-emerald-700 font-bold">15% Bulk Discount to Dhupguri Dhabas</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">Alert Triggered</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Excess 250g Metallized Foil Pouches</td>
                      <td className="p-3 text-slate-600">24 Days</td>
                      <td className="p-3">₹12,400</td>
                      <td className="p-3">Repack with festive Puja gift packs</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Healthy</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'market' && (
            <div className="flex justify-end pt-2">
              <button
                onClick={onProceedNext}
                className="bg-[#083b5e] hover:bg-[#062c46] text-white font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 shadow transition-colors text-sm"
              >
                <span>Proceed to Step 7: Validation</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* GTM STRATEGY & SEASONAL CALENDAR */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>8-Week Operational Go-To-Market Forecast</span>
              </h3>
              <p className="text-xs text-slate-500">
                Weekly haat presence and inventory replenishment planning for {enterprise.locationName}.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Weeks 1 - 2</div>
                  <div className="font-bold text-slate-900 mt-1">Village Haat Pilot</div>
                  <p className="text-slate-500 text-[11px] mt-1">Establish display stall in 2 local bi-weekly markets.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Weeks 3 - 4</div>
                  <div className="font-bold text-slate-900 mt-1">Direct B2B Tie-Ups</div>
                  <p className="text-slate-500 text-[11px] mt-1">Consign to 5 regional general kirana merchants.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Weeks 5 - 6</div>
                  <div className="font-bold text-slate-900 mt-1">Harvest Demand Surge</div>
                  <p className="text-slate-500 text-[11px] mt-1">Scale production 1.4x for post-harvest agrarian liquidity.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Weeks 7 - 8</div>
                  <div className="font-bold text-slate-900 mt-1">Regional Expansion</div>
                  <p className="text-slate-500 text-[11px] mt-1">Activate supply corridors to neighboring taluk hubs.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#083b5e]" />
                  <span>Channel Mix Strategy</span>
                </h3>
                <div className="space-y-3 mt-3 text-xs">
                  <div>
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span>Weekly Haats & Direct Fairgrounds</span>
                      <span className="text-[#083b5e]">45%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#083b5e]" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span>Village Kirana & Merchant Consignment</span>
                      <span className="text-emerald-700">35%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600" style={{ width: '35%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span>Direct WhatsApp / Digital Pre-Orders</span>
                      <span className="text-amber-600">20%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '20%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onProceedNext}
                className="w-full bg-[#083b5e] hover:bg-[#062c46] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition-colors text-sm"
              >
                <span>Proceed to Financials & Smart Loan Guide</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
