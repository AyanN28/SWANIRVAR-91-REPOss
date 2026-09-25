import React, { useState } from 'react';
import {
  Shield,
  Database,
  Sliders,
  Users,
  Lock,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  X,
  FileCode,
  Sparkles,
  Server,
} from 'lucide-react';
import { ProvenanceBadge } from './ProvenanceBadge';

interface AdminConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminConsoleModal: React.FC<AdminConsoleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'weights' | 'schemes' | 'erd' | 'privacy' | 'observability'>('weights');

  // 7D Weights state
  const [weights, setWeights] = useState({
    demandSupplyGap: 25,
    competitionSaturation: 20,
    customerFootfall: 15,
    localTasteFit: 10,
    customerStickiness: 10,
    riskAssessment: 10,
    financialViability: 10,
  });

  // Thresholds state
  const [thresholds, setThresholds] = useState({
    proceedToDpr: 70,
    proceedWithCaution: 60,
    pivotRework: 40,
  });

  // 50 Postgres + PostGIS Tables from Section 5
  const databaseTables = [
    'users', 'user_profiles', 'business_profiles', 'business_locations', 'consents',
    'documents', 'kyc_records', 'business_ideas', 'analysis_sessions', 'analysis_steps',
    'population_data', 'demographic_data', 'occupation_data', 'income_data', 'customer_segments',
    'customer_behaviour', 'market_data', 'mandis', 'mandi_prices', 'haats',
    'competitors', 'suppliers', 'farms', 'gis_features', 'spatial_snapshots',
    'seasonal_calendars', 'festival_calendars', 'demand_forecasts', 'seven_d_scores', 'ai_jury_results',
    'swot_analysis', 'risk_register', 'gtm_plans', 'financial_models', 'loan_models',
    'scheme_matches', 'emi_schedules', 'dpr_projects', 'dpr_versions', 'dpr_documents',
    'caf_forms', 'ledger_entries', 'inventory', 'dead_stock_alerts', 'receivables',
    'payments', 'loan_accounts', 'repayment_events', 'business_health_scores', 'voice_events',
    'ocr_events', 'notifications', 'audit_logs', 'agent_sessions'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#083b5e] to-[#17211b] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>Sovereign Enterprise Administration & System Architecture</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            SWANIRVAR Enterprise Admin Console
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Configure mathematical 7D weights, manage priority refinance schemes, audit PostGIS schemas, and enforce DPDP privacy compliance.
          </p>

          {/* Sub Navigation */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { key: 'weights', label: '7D Algorithm Weights', icon: Sliders },
              { key: 'schemes', label: 'Scheme Rules Engine', icon: Layers },
              { key: 'erd', label: 'PostgreSQL & PostGIS ERD (50 Tables)', icon: Database },
              { key: 'privacy', label: 'DPDP Privacy & Consent', icon: Lock },
              { key: 'observability', label: 'System Observability', icon: Activity },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                    isActive ? 'bg-amber-400 text-slate-950 shadow-sm' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* TAB 1: 7D WEIGHTS & THRESHOLDS (SECTION 15 & 18) */}
          {activeTab === 'weights' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Configurable 7D Vector Weights (Must total 100%)
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Formula: Composite Score = 0.25(DemandSupplyGap) + 0.20(CompetitionSaturation) + 0.15(CustomerFootfall) + 0.10(LocalTasteFit) + 0.10(CustomerStickiness) + 0.10(RiskAssessment) + 0.10(FinancialViability)
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                  <div>
                    <label className="flex justify-between mb-1">
                      <span>Demand–Supply Gap</span>
                      <strong className="text-[#083b5e]">{weights.demandSupplyGap}%</strong>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="40"
                      value={weights.demandSupplyGap}
                      onChange={(e) => setWeights({ ...weights, demandSupplyGap: Number(e.target.value) })}
                      className="w-full accent-[#083b5e]"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between mb-1">
                      <span>Competition Saturation</span>
                      <strong className="text-[#083b5e]">{weights.competitionSaturation}%</strong>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="30"
                      value={weights.competitionSaturation}
                      onChange={(e) => setWeights({ ...weights, competitionSaturation: Number(e.target.value) })}
                      className="w-full accent-[#083b5e]"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between mb-1">
                      <span>Customer Footfall</span>
                      <strong className="text-[#083b5e]">{weights.customerFootfall}%</strong>
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="25"
                      value={weights.customerFootfall}
                      onChange={(e) => setWeights({ ...weights, customerFootfall: Number(e.target.value) })}
                      className="w-full accent-[#083b5e]"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between mb-1">
                      <span>Local Taste Fit</span>
                      <strong className="text-[#083b5e]">{weights.localTasteFit}%</strong>
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      value={weights.localTasteFit}
                      onChange={(e) => setWeights({ ...weights, localTasteFit: Number(e.target.value) })}
                      className="w-full accent-[#083b5e]"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between mb-1">
                      <span>Customer Stickiness</span>
                      <strong className="text-[#083b5e]">{weights.customerStickiness}%</strong>
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      value={weights.customerStickiness}
                      onChange={(e) => setWeights({ ...weights, customerStickiness: Number(e.target.value) })}
                      className="w-full accent-[#083b5e]"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between mb-1">
                      <span>Risk Assessment</span>
                      <strong className="text-[#083b5e]">{weights.riskAssessment}%</strong>
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      value={weights.riskAssessment}
                      onChange={(e) => setWeights({ ...weights, riskAssessment: Number(e.target.value) })}
                      className="w-full accent-[#083b5e]"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between mb-1">
                      <span>Financial Viability</span>
                      <strong className="text-[#083b5e]">{weights.financialViability}%</strong>
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      value={weights.financialViability}
                      onChange={(e) => setWeights({ ...weights, financialViability: Number(e.target.value) })}
                      className="w-full accent-[#083b5e]"
                    />
                  </div>
                </div>
              </div>

              {/* Thresholds */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-2">Action Routing Thresholds (Section 18)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-emerald-700 font-bold block mb-1">PROCEED TO DPR</span>
                    <input
                      type="number"
                      value={thresholds.proceedToDpr}
                      onChange={(e) => setThresholds({ ...thresholds, proceedToDpr: Number(e.target.value) })}
                      className="w-full p-2 border rounded font-black text-sm"
                    />
                    <span className="text-[10px] text-slate-400">Score &gt;= 70</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-amber-700 font-bold block mb-1">PROCEED WITH CAUTION</span>
                    <input
                      type="number"
                      value={thresholds.proceedWithCaution}
                      onChange={(e) => setThresholds({ ...thresholds, proceedWithCaution: Number(e.target.value) })}
                      className="w-full p-2 border rounded font-black text-sm"
                    />
                    <span className="text-[10px] text-slate-400">Score 60 - 69</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-rose-700 font-bold block mb-1">PIVOT / REWORK</span>
                    <input
                      type="number"
                      value={thresholds.pivotRework}
                      onChange={(e) => setThresholds({ ...thresholds, pivotRework: Number(e.target.value) })}
                      className="w-full p-2 border rounded font-black text-sm"
                    />
                    <span className="text-[10px] text-slate-400">Score 40 - 59</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCHEMES (SECTION 23) */}
          {activeTab === 'schemes' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Configurable Government Schemes & Refinance Norms
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: 'Prime Minister Employment Generation Programme (PMEGP)',
                    subsidy: '35% (Rural Special) / 25% (Rural General)',
                    maxCost: '₹50 Lakhs (Manufacturing) / ₹20 Lakhs (Service)',
                    margin: '5% (Special) / 10% (General)',
                    status: 'MATCHED',
                  },
                  {
                    name: 'Pradhan Mantri Formalisation of Micro Food Processing (PMFME)',
                    subsidy: '35% of project cost (Max ₹10 Lakhs)',
                    maxCost: '₹28.5 Lakhs project cap',
                    margin: '10% Entrepreneur Margin',
                    status: 'MATCHED',
                  },
                  {
                    name: 'Tea Board Small Tea Grower (STG) Modernisation Scheme',
                    subsidy: '25% capital grant on tea processing and packaging machinery',
                    maxCost: '₹35 Lakhs equipment package',
                    margin: '15% Margin Equity',
                    status: 'POSSIBLY MATCHED',
                  },
                  {
                    name: 'MUDRA Yojana (Tarun Category)',
                    subsidy: 'Zero direct subsidy; collateral-free credit guarantee',
                    maxCost: 'Up to ₹10 Lakhs',
                    margin: '10% borrower contribution',
                    status: 'MATCHED',
                  },
                ].map((s) => (
                  <div key={s.name} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="font-bold text-xs text-slate-900">{s.name}</div>
                      <div className="text-[11px] text-slate-600"><strong>Subsidy:</strong> {s.subsidy}</div>
                      <div className="text-[11px] text-slate-600"><strong>Cap:</strong> {s.maxCost} | <strong>Margin:</strong> {s.margin}</div>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: POSTGRES + POSTGIS ERD (SECTION 5 & 49) */}
          {activeTab === 'erd' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    PostgreSQL 16 + PostGIS Spatial Schema Model
                  </h3>
                  <p className="text-xs text-slate-500">
                    50 Enterprise schema tables defined with PostGIS spatial indices, UUID primary keys, and immutable audit logs.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-[#083b5e] text-white px-3 py-1 rounded-lg">
                  50 Tables Synced
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {databaseTables.map((tbl, idx) => (
                  <div
                    key={tbl}
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[11px] font-mono text-slate-800 flex items-center justify-between"
                  >
                    <span className="truncate">{tbl}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 font-bold">
                      #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DPDP PRIVACY & CONSENT (SECTION 42) */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Digital Personal Data Protection (DPDP) Act Privacy Center
              </h3>
              <p className="text-xs text-slate-500">
                Explicit consent logging with Purpose, Data Type, Recipient, Timestamp, and One-Click Withdrawal.
              </p>

              <div className="space-y-2 text-xs">
                {[
                  {
                    purpose: 'Hyper-Local Ecosystem Mapping',
                    dataType: 'GPS Geolocation & Osm POI Catchment',
                    status: 'CONSENT GRANTED',
                    time: '23 Sep 2026 10:30 IST',
                  },
                  {
                    purpose: 'Bank Loan Appraisal & DPR Preparation',
                    dataType: 'Aadhaar, PAN & Udyam Registration',
                    status: 'CONSENT GRANTED',
                    time: '23 Sep 2026 10:32 IST',
                  },
                  {
                    purpose: 'Account Aggregator Banking Read Access',
                    dataType: '6-Month Current/Savings Account Statement',
                    status: 'CONSENT ACTIVE (Valid 90d)',
                    time: '23 Sep 2026 10:34 IST',
                  },
                ].map((item) => (
                  <div key={item.purpose} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-900">{item.purpose}</div>
                      <div className="text-[11px] text-slate-500">{item.dataType} · {item.time}</div>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SYSTEM OBSERVABILITY (SECTION 51) */}
          {activeTab === 'observability' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Platform Health & Telemetry</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Average API Latency</div>
                  <div className="text-2xl font-black text-[#083b5e]">42 ms</div>
                  <div className="text-[10px] text-emerald-600 font-bold">Fast response &lt;100ms</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">AI Jury Latency (Gemini)</div>
                  <div className="text-2xl font-black text-amber-700">1.2 s</div>
                  <div className="text-[10px] text-slate-500 font-bold">Asynchronous Worker Thread</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Background Jobs Queue</div>
                  <div className="text-2xl font-black text-slate-900">0 Pending</div>
                  <div className="text-[10px] text-emerald-600 font-bold">Celery Workers Active</div>
                </div>
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
            Save Configurations & Close
          </button>
        </div>
      </div>
    </div>
  );
};
