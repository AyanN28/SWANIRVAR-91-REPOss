import React, { useState, useEffect } from 'react';
import { EnterpriseState } from './dashboardTypes';
import {
  CheckCircle2,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  X,
  FileText,
} from 'lucide-react';
import { ProvenanceBadge } from './ProvenanceBadge';

interface AnalysisOrchestratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  enterprise: EnterpriseState;
  onComplete: () => void;
}

export const AnalysisOrchestratorModal: React.FC<AnalysisOrchestratorModalProps> = ({
  isOpen,
  onClose,
  enterprise,
  onComplete,
}) => {
  if (!isOpen) return null;

  const steps = [
    { title: 'FETCHING LOCATION', desc: `Querying OpenStreetMap reverse-geocode for ${enterprise.locationName}` },
    { title: 'ANALYSING AREA', desc: `Scanning 5/10/15km concentric density corridor in ${enterprise.districtName}` },
    { title: 'UNDERSTANDING PEOPLE', desc: 'Ingesting Census 2011 & MoSPI PLFS rural workforce participation' },
    { title: 'MAPPING CUSTOMERS', desc: 'Calculating daily tea consumption basket & dhaba purchase velocity' },
    { title: 'MAPPING COMPETITION', desc: 'Benchmarking nearby Bought Leaf Factories & retail packet competitors' },
    { title: 'READING MARKET', desc: 'Fetching 4-tier Dhupguri APMC & Siliguri STAC tea price benchmarks' },
    { title: 'CHECKING SEASONALITY', desc: 'Forecasting First Flush, Monsoon and Autumn crop liquidity cycles' },
    { title: 'BUILDING FINANCIAL MODEL', desc: 'Executing 10% entrepreneur equity rule & 5-year DSCR schedule' },
    { title: 'RUNNING 7D JUDGE', desc: 'Computing mathematical formula across 7 weighted vectors' },
    { title: 'INVOKING AI JURY', desc: 'Asynchronous Gemini risk flagging & contradiction checking' },
    { title: 'FACT CHECK & CONFLICT RESOLUTION', desc: 'Filtering unverified AI assertions against deterministic data' },
    { title: 'BUDGET-TAILORED SWOT', desc: 'Generating operational strengths and tea supply chain bottlenecks' },
    { title: 'RISK REGISTER', desc: 'Structuring 11-category mitigation matrix for bank loan appraisal' },
    { title: 'GTM ENGINE', desc: 'Drafting 8-week haat and highway distribution rollout schedule' },
    { title: 'LOAN & SCHEME ROUTING', desc: 'Evaluating PMEGP (35% subsidy) and Tea Board STG scheme match' },
    { title: 'DPR READINESS', desc: 'Compiling 40-section NABARD/RBI standard loan document package' },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isFinished = currentStepIndex >= steps.length;

  useEffect(() => {
    if (currentStepIndex < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 420); // speedy yet visible progress
      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, steps.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#083b5e] to-[#0c4f36] text-white p-6 relative">
          {!isFinished && (
            <div className="absolute top-5 right-5 flex items-center gap-2 text-xs font-mono font-bold bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
              <span>Step {currentStepIndex + 1} of 16</span>
            </div>
          )}
          {isFinished && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Analysis Orchestrator (Section 45 & 47)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {isFinished ? 'Analysis Completed & Verified' : 'Executing 16-Stage Deterministic Pipeline'}
          </h2>
          <p className="text-xs text-slate-200 mt-1">
            {enterprise.businessType} · {enterprise.locationName}, {enterprise.districtName}
          </p>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, ((currentStepIndex + 1) / steps.length) * 100)}%` }}
            />
          </div>
        </div>

        {/* Step List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.title}
                className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                  isCurrent
                    ? 'bg-blue-50 border-[#083b5e] font-bold text-slate-900 shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-50/50 border-emerald-200 text-slate-700'
                    : 'bg-slate-50 border-slate-100 opacity-40 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-[#083b5e] animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <div>
                    <span className="font-bold text-[11px] uppercase tracking-wider">{step.title}</span>
                    <p className="text-[11px] text-slate-500 font-normal">{step.desc}</p>
                  </div>
                </div>

                {isCompleted && (
                  <span className="text-[10px] font-black uppercase text-emerald-700 font-mono">
                    Done
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center">
          <div className="text-xs font-bold text-slate-500">
            {isFinished ? 'Ready to inspect Bank-Ready DPR' : 'Calculating mathematical matrices...'}
          </div>

          {isFinished ? (
            <button
              onClick={() => {
                onClose();
                onComplete();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#083b5e] hover:bg-[#062c46] text-white font-bold text-xs flex items-center gap-2 shadow"
            >
              <span>View Business Command Centre</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          ) : (
            <div className="text-[11px] text-slate-400 italic">Please wait while workers complete jobs</div>
          )}
        </div>
      </div>
    </div>
  );
};
