import React, { useState } from 'react';
import { EnterpriseState } from './dashboardTypes';
import {
  IndianRupee,
  Calculator,
  Calendar,
  Layers,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Volume2,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Download,
  FileSpreadsheet,
  Printer,
  X,
  Clock,
  ShieldCheck,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface FinancialsModuleProps {
  enterprise: EnterpriseState;
  onUpdateEnterprise: (partial: Partial<EnterpriseState>) => void;
  onProceedNext: () => void;
  onSpeak: (text: string) => void;
}

interface QuarterScheduleItem {
  quarterNumber: number;
  periodLabel: string;
  phase: string;
  openingBalance: number;
  interestAmount: number;
  principalAmount: number;
  totalInstallment: number;
  closingBalance: number;
  isMoratorium: boolean;
  seasonTag: 'Moratorium' | 'Monsoon Lull' | 'Harvest Peak' | 'Standard';
}

export const FinancialsModule: React.FC<FinancialsModuleProps> = ({
  enterprise,
  onUpdateEnterprise,
  onProceedNext,
  onSpeak,
}) => {
  const [showFullScheduleModal, setShowFullScheduleModal] = useState(false);
  const [scheduleFilter, setScheduleFilter] = useState<'all' | 'moratorium' | 'harvest' | 'regular'>('all');

  // 1. The 10% Margin Engine & Statutory Upper Bound Clamping
  const projectCost = Math.round(enterprise.capitalAmount / 0.10);
  const isMicroFinance = projectCost <= 140000;
  const isExceedingCeiling = projectCost > 5000000; // Above ₹50.00 Lakh scheme ceiling

  // Statutory Loan Caps:
  // Micro Finance: Max ₹1.25 Lakh (even though 90% of ₹1.40L is ₹1.26L)
  // Term Loan: Max ₹45.00 Lakh (90% of ₹50.00L)
  const statutoryLoanCap = isMicroFinance ? 125000 : 4500000;
  const uncappedLoan = Math.round(projectCost * 0.90);
  const maxLoan = Math.min(uncappedLoan, statutoryLoanCap);
  const isMicroCapApplied = isMicroFinance && uncappedLoan > 125000;

  // 3. Scheme Router Logic A & B
  const interestRate = isMicroFinance ? 6.5 : 8.0;
  const tenureYears = isMicroFinance ? 3 : 7;
  const moratoriumMonths = isMicroFinance ? 3 : 6;
  const totalQuarters = tenureYears * 4; // 12 or 28 quarters
  const moratoriumQuarters = moratoriumMonths === 3 ? 1 : 2;

  // 4. Subsidy Calculation Engine (PMEGP / CA rules)
  let subsidyRate = 0.15;
  if (enterprise.category === 'Special') {
    subsidyRate = enterprise.locationType === 'Rural' ? 0.35 : 0.25;
  } else {
    subsidyRate = enterprise.locationType === 'Rural' ? 0.25 : 0.15;
  }
  const subsidyAmount = Math.round(projectCost * subsidyRate);

  // 7. OpEx vs Working Capital (Nayak Committee 20% turnover method)
  const estimatedAnnualTurnover = Math.round(projectCost * 0.85);
  const workingCapitalAllocation = Math.round(estimatedAnnualTurnover * 0.20);
  const termLoanCapEx = Math.max(0, maxLoan - workingCapitalAllocation);

  // 6. Full 12 or 28 Quarter Amortization Schedule Calculation
  const fullSchedule: QuarterScheduleItem[] = [];
  let runningBalance = maxLoan;
  const repayQuartersCount = totalQuarters - moratoriumQuarters;
  const baseQuarterlyPrincipal = repayQuartersCount > 0 ? runningBalance / repayQuartersCount : 0;

  for (let q = 1; q <= totalQuarters; q++) {
    const isMora = q <= moratoriumQuarters;
    const quarterlyInterestRate = interestRate / 100 / 4;
    const interest = Math.round(runningBalance * quarterlyInterestRate);
    let principal = 0;
    let seasonTag: 'Moratorium' | 'Monsoon Lull' | 'Harvest Peak' | 'Standard' = 'Standard';
    let phase = 'Regular Equated Installment';

    if (isMora) {
      principal = 0;
      seasonTag = 'Moratorium';
      phase = `Moratorium Period (Quarter ${q} of ${moratoriumQuarters})`;
    } else {
      const qInYear = ((q - 1) % 4) + 1; // 1 to 4
      if (q === totalQuarters) {
        // Last quarter clears the remainder exactly
        principal = runningBalance;
        seasonTag = 'Harvest Peak';
        phase = 'Final Settlement (Tenure Completion)';
      } else if (qInYear === 4) {
        // Post-Harvest Balloon
        principal = Math.round(Math.min(runningBalance, baseQuarterlyPrincipal * 1.35));
        seasonTag = 'Harvest Peak';
        phase = 'Post-Harvest Cashflow Peak (Accelerated Repayment)';
      } else if (qInYear === 3) {
        // Monsoon Lull
        principal = Math.round(Math.min(runningBalance, baseQuarterlyPrincipal * 0.65));
        seasonTag = 'Monsoon Lull';
        phase = 'Monsoon Agrarian Lull (Reduced Repayment Stress)';
      } else {
        principal = Math.round(Math.min(runningBalance, baseQuarterlyPrincipal));
        seasonTag = 'Standard';
        phase = 'Standard Active Amortization';
      }
    }

    const totalInstallment = interest + principal;
    const closing = Math.max(0, runningBalance - principal);

    fullSchedule.push({
      quarterNumber: q,
      periodLabel: `Quarter ${q} (Year ${Math.ceil(q / 4)})`,
      phase,
      openingBalance: runningBalance,
      interestAmount: interest,
      principalAmount: principal,
      totalInstallment,
      closingBalance: closing,
      isMoratorium: isMora,
      seasonTag,
    });

    runningBalance = closing;
  }

  const totalInterestPayable = fullSchedule.reduce((sum, item) => sum + item.interestAmount, 0);
  const totalPrincipalRepaid = fullSchedule.reduce((sum, item) => sum + item.principalAmount, 0);
  const totalOutflow = totalInterestPayable + totalPrincipalRepaid;

  // Filtered schedule for modal
  const filteredSchedule = fullSchedule.filter((item) => {
    if (scheduleFilter === 'moratorium') return item.isMoratorium;
    if (scheduleFilter === 'harvest') return item.seasonTag === 'Harvest Peak';
    if (scheduleFilter === 'regular') return item.seasonTag === 'Standard' || item.seasonTag === 'Monsoon Lull';
    return true;
  });

  // Export to CSV
  const downloadScheduleCSV = () => {
    const headers = [
      'Quarter Number',
      'Period Label',
      'Repayment Phase / Season',
      'Opening Balance (INR)',
      'Principal Component (INR)',
      'Interest Component (INR)',
      'Total Quarterly Outflow (INR)',
      'Closing Balance (INR)',
    ];

    const rows = fullSchedule.map((row) => [
      row.quarterNumber,
      `"${row.periodLabel}"`,
      `"${row.phase}"`,
      row.openingBalance,
      row.principalAmount,
      row.interestAmount,
      row.totalInstallment,
      row.closingBalance,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `SWANIRVAR_Quarterly_Repayment_Schedule_${enterprise.businessType.replace(/[^a-zA-Z0-9]/g, '_')}_${tenureYears}Y.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintSchedule = () => {
    window.print();
  };

  const narration = `Financial Intelligence and Smart Loan Structuring for ${enterprise.businessType}. Based on available margin capital of ₹${enterprise.capitalAmount.toLocaleString('en-IN')}, the 10 percent margin multiplier establishes a total project cost of ₹${projectCost.toLocaleString('en-IN')}. Under statutory rules, the system directs you to ${
    isMicroFinance
      ? `the Micro Finance Scheme at 6.5 percent concessional interest with 3-month moratorium, capped at ₹1.25 Lakh loan`
      : `the Term Loan Scheme at 8.0 percent interest over 7 years with a 6-month moratorium and ₹45.00 Lakh maximum loan cap`
  }. Total interest payable across all ${totalQuarters} quarters is ₹${totalInterestPayable.toLocaleString('en-IN')}.`;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#083b5e] to-[#0c4f36] text-white p-6 rounded-2xl shadow-lg border border-emerald-900/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            <span>Step 9: Smart Loan Guide & Financial Structuring</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            10% Margin Engine, Scheme Router & Full {totalQuarters}-Quarter Schedule
          </h2>
          <p className="text-slate-200 text-sm max-w-2xl mt-1">
            Institutional loan structuring: 10% own margin contribution, statutory loan capping (₹1.25L Micro / ₹45L Term), and non-linear seasonal quarterly repayment generator.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFullScheduleModal(true)}
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow"
          >
            <Calendar className="w-4 h-4" />
            <span>View All {totalQuarters} Quarters</span>
          </button>
          <button
            onClick={() => onSpeak(narration)}
            className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors border border-white/20"
          >
            <Volume2 className="w-4 h-4 text-amber-300" />
            <span>Listen</span>
          </button>
        </div>
      </div>

      {/* Warning if Exceeds Scheme Ceiling (> ₹50L Project Cost / > ₹5L Margin) */}
      {isExceedingCeiling && (
        <div className="bg-amber-50 border-2 border-amber-400 p-4 rounded-2xl flex items-start gap-3 shadow-sm">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <div className="font-bold text-amber-950 text-sm flex items-center gap-2">
              <span>Statutory Concessional Scheme Ceiling Notice</span>
              <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                Cap Applied: ₹45.00 Lakh Max Loan
              </span>
            </div>
            <p className="text-amber-900 leading-relaxed">
              Your calculated project cost of <strong>₹{projectCost.toLocaleString('en-IN')}</strong> exceeds the maximum statutory limit of <strong>₹50.00 Lakh</strong> under State Channelizing Agency (SCA/CA) concessional schemes.
              The maximum concessional loan has been capped at <strong>₹45.00 Lakh (90% of ₹50 Lakh)</strong>. Any additional capital requirement above this amount will require commercial bank syndication or CGTMSE collateral-free SME credit.
            </p>
            <p className="text-amber-800 font-semibold pt-1">
              💡 Recommended: For 100% concessional scheme approval at 8.0% p.a., adjust your available margin to ₹5,00,000 or below.
            </p>
          </div>
        </div>
      )}

      {/* 10% Margin Engine Slider Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-emerald-700" />
              <span>1. The 10% Margin Engine (Pure Algorithm)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Total Feasible Project Cost = Available Margin ÷ 0.10 | Maximum Loan = 90% (Subject to statutory caps)
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block uppercase font-bold">Your Available Margin Capital</span>
            <span className="text-xl font-black text-[#083b5e]">₹ {enterprise.capitalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min="10000"
            max="600000"
            step="5000"
            value={enterprise.capitalAmount}
            onChange={(e) => onUpdateEnterprise({ capitalAmount: parseInt(e.target.value, 10) })}
            className="w-full accent-[#083b5e] cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-bold">
            <span className={enterprise.capitalAmount <= 14000 ? 'text-emerald-700 font-black' : ''}>
              ₹14,000 (Micro Max)
            </span>
            <span>₹1,00,000 (₹10L Unit)</span>
            <span className={enterprise.capitalAmount === 500000 ? 'text-[#083b5e] font-black' : ''}>
              ₹5,00,000 (₹50L Scheme Ceiling)
            </span>
            <span>₹6,00,000 (Above Cap)</span>
          </div>
        </div>

        {/* 3 Metrics Cards with Statutory Clamping Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase">Margin Capital (10%)</span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              ₹ {enterprise.capitalAmount.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-slate-400">Borrower own equity contribution</span>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200">
            <span className="text-xs font-bold text-[#083b5e] uppercase">Total Feasible Project Cost</span>
            <div className="text-2xl font-black text-[#083b5e] mt-1">
              ₹ {projectCost.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-blue-600 font-semibold">100% bank-appraisal basis (10x Margin)</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 relative">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-emerald-800 uppercase">Maximum Concessional Loan</span>
              {isMicroCapApplied && (
                <span className="text-[9px] font-extrabold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
                  Cap: ₹1.25L
                </span>
              )}
              {isExceedingCeiling && (
                <span className="text-[9px] font-extrabold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
                  Cap: ₹45L
                </span>
              )}
            </div>
            <div className="text-2xl font-black text-emerald-700 mt-1">
              ₹ {maxLoan.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">
              {isMicroFinance
                ? '90% up to ₹1.25L statutory micro limit'
                : '90% up to ₹45.00L term loan limit'}
            </span>
          </div>
        </div>
      </div>

      {/* Scheme Router & Subsidy Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scheme Router */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">
              2 & 3. Zero-Hallucination Scheme Auto-Router
            </h3>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {isMicroFinance ? 'Logic A (≤ ₹1.40 Lakh)' : 'Logic B (₹1.40L - ₹50.00 Lakh)'}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Auto-Selected Scheme</span>
              <strong className="text-slate-900 font-bold text-sm">
                {isMicroFinance ? 'Micro Finance Scheme' : 'Term Loan Scheme (SCA / PMEGP)'}
              </strong>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Interest Rate</span>
                <strong className="text-sm sm:text-base font-black text-[#083b5e]">{interestRate}% p.a.</strong>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Tenure</span>
                <strong className="text-sm sm:text-base font-black text-emerald-700">{tenureYears} Years</strong>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Moratorium</span>
                <strong className="text-sm sm:text-base font-black text-amber-600">{moratoriumMonths} Months</strong>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Quarters</span>
                <strong className="text-sm sm:text-base font-black text-purple-700">{totalQuarters} Qtrs</strong>
              </div>
            </div>
          </div>

          {/* Scheme Stacking */}
          <div className="space-y-2 pt-2 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Statutory Scheme Parameters
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <strong className="block text-slate-900 font-bold">Margin Required</strong>
                <span className="text-emerald-700 font-black text-xs">Strictly 10%</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <strong className="block text-slate-900 font-bold">Max Funding</strong>
                <span className="text-[#083b5e] font-black text-xs">
                  {isMicroFinance ? '₹1.25 Lakh' : '₹45.00 Lakh'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <strong className="block text-slate-900 font-bold">Repayment Mode</strong>
                <span className="text-slate-600 font-black text-xs">Quarterly (EQI)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subsidy Calculation Engine */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">4. Subsidy & Grant Entitlement</h3>
            <p className="text-xs text-slate-500 mb-3">
              Computed under PMEGP & State Channelizing Agency statutory rules ({enterprise.category} Category, {enterprise.locationType} Area)
            </p>

            <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-amber-900 font-medium">Eligible Margin Money Subsidy</span>
                <strong className="text-amber-950 font-black text-base">{subsidyRate * 100}%</strong>
              </div>
              <div className="flex justify-between border-t border-amber-200/60 pt-2">
                <span className="text-amber-900 font-medium">Government Grant Amount</span>
                <strong className="text-emerald-700 font-black text-lg">
                  ₹ {subsidyAmount.toLocaleString('en-IN')}
                </strong>
              </div>
              <p className="text-[10px] text-amber-800 pt-1">
                Directly credited into lock-in Term Deposit (TDR) post-disbursement, reducing effective principal interest burden.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFullScheduleModal(true)}
              className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow transition-colors text-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>{totalQuarters}-Quarter Schedule</span>
            </button>
            <button
              onClick={onProceedNext}
              className="flex-1 bg-[#083b5e] hover:bg-[#062c46] text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow transition-colors text-xs"
            >
              <span>Bank DPR</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Non-Linear Seasonal EMI & OpEx Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Non-Linear Seasonal EMI Snapshot */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                5 & 6. Quarterly Repayment & Moratorium Breakdown
              </h3>
              <p className="text-xs text-slate-500">
                Quarterly installments (EQI) with {moratoriumMonths}-month moratorium and post-harvest cashflow alignment
              </p>
            </div>
            <button
              onClick={() => setShowFullScheduleModal(true)}
              className="text-xs font-bold text-[#083b5e] hover:underline flex items-center gap-1"
            >
              <span>View all {totalQuarters} quarters</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Quarter</th>
                  <th className="py-2.5 px-3">Opening (₹)</th>
                  <th className="py-2.5 px-3">Interest (₹)</th>
                  <th className="py-2.5 px-3">Principal (₹)</th>
                  <th className="py-2.5 px-3">Total Installment</th>
                  <th className="py-2.5 px-3">Phase / Season</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {fullSchedule.slice(0, 4).map((q) => (
                  <tr
                    key={q.quarterNumber}
                    className={
                      q.isMoratorium
                        ? 'bg-blue-50/40'
                        : q.seasonTag === 'Monsoon Lull'
                        ? 'bg-amber-50/50'
                        : q.seasonTag === 'Harvest Peak'
                        ? 'bg-emerald-50/40'
                        : ''
                    }
                  >
                    <td className="py-2.5 px-3 font-bold text-slate-900">{q.periodLabel}</td>
                    <td className="py-2.5 px-3">₹ {q.openingBalance.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3">₹ {q.interestAmount.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-700">
                      ₹ {q.principalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3 font-black text-slate-900">
                      ₹ {q.totalInstallment.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          q.isMoratorium
                            ? 'bg-blue-100 text-[#083b5e]'
                            : q.seasonTag === 'Monsoon Lull'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {q.phase}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-600">
              Showing preview of first 4 quarters. Total {totalQuarters} quarters over {tenureYears} years.
            </span>
            <button
              onClick={() => setShowFullScheduleModal(true)}
              className="font-bold text-[#083b5e] hover:text-[#062c46] flex items-center gap-1 text-xs"
            >
              <span>Open Full Amortization Table & Export</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 7. OpEx vs Working Capital */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900">7. CapEx vs Working Capital Allocation</h3>
          <p className="text-xs text-slate-500">
            Nayak Committee 20% turnover method allocation separating fixed asset term loans from revolving stock funds
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
              <div>
                <strong className="block text-slate-900 font-bold">Term Loan (CapEx Component)</strong>
                <span className="text-slate-500">Machinery, equipment, production infrastructure</span>
              </div>
              <strong className="text-base font-black text-[#083b5e]">
                ₹ {termLoanCapEx.toLocaleString('en-IN')}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
              <div>
                <strong className="block text-slate-900 font-bold">Working Capital (Revolving Limit)</strong>
                <span className="text-slate-500">Raw material inventory, packing & stock buffer</span>
              </div>
              <strong className="text-base font-black text-emerald-700">
                ₹ {workingCapitalAllocation.toLocaleString('en-IN')}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
              <div>
                <strong className="block text-slate-900 font-bold">Monthly Operational Outflow</strong>
                <span className="text-slate-500">Wages, utilities, power, transport</span>
              </div>
              <strong className="text-base font-black text-slate-900">
                ₹ {Math.round(workingCapitalAllocation / 4).toLocaleString('en-IN')}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* FULL REPAYMENT SCHEDULE MODAL (12 or 28 Quarters with CSV Export) */}
      {showFullScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="bg-white w-full max-w-5xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-[#083b5e] to-[#0c4f36] text-white flex justify-between items-center border-b border-emerald-900/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>Complete {totalQuarters}-Quarter Repayment Amortization Schedule</span>
                    <span className="bg-amber-400 text-slate-950 font-black text-xs px-2 py-0.5 rounded">
                      {tenureYears} Years ({interestRate}% p.a.)
                    </span>
                  </h3>
                  <p className="text-xs text-slate-200">
                    {enterprise.businessType} • {enterprise.locationName}, {enterprise.districtName} • Loan Amount: ₹{maxLoan.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFullScheduleModal(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-slate-200 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* KPI Summary Cards */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-400 uppercase font-bold text-[10px] block">Sanctioned Principal</span>
                <strong className="text-base font-black text-[#083b5e]">₹ {maxLoan.toLocaleString('en-IN')}</strong>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-400 uppercase font-bold text-[10px] block">Total Interest Payable</span>
                <strong className="text-base font-black text-amber-700">₹ {totalInterestPayable.toLocaleString('en-IN')}</strong>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-400 uppercase font-bold text-[10px] block">Total Cash Outflow</span>
                <strong className="text-base font-black text-slate-900">₹ {totalOutflow.toLocaleString('en-IN')}</strong>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-400 uppercase font-bold text-[10px] block">Moratorium Window</span>
                <strong className="text-base font-black text-emerald-700">{moratoriumMonths} Months ({moratoriumQuarters} Qtr)</strong>
              </div>
            </div>

            {/* Filter & Export Bar */}
            <div className="px-5 py-3 border-b border-slate-200 flex flex-wrap justify-between items-center gap-3 bg-white">
              <div className="flex items-center gap-1 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
                <button
                  onClick={() => setScheduleFilter('all')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                    scheduleFilter === 'all' ? 'bg-[#083b5e] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({fullSchedule.length})
                </button>
                <button
                  onClick={() => setScheduleFilter('moratorium')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                    scheduleFilter === 'moratorium' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Moratorium ({moratoriumQuarters})
                </button>
                <button
                  onClick={() => setScheduleFilter('harvest')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                    scheduleFilter === 'harvest' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Harvest Balloon
                </button>
                <button
                  onClick={() => setScheduleFilter('regular')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                    scheduleFilter === 'regular' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Active Amortization
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={downloadScheduleCSV}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow transition-colors"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Download CSV</span>
                </button>
                <button
                  onClick={handlePrintSchedule}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border border-slate-300"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Schedule</span>
                </button>
              </div>
            </div>

            {/* Scrollable Schedule Table */}
            <div className="flex-1 overflow-y-auto p-5">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-600 font-bold sticky top-0 border-b border-slate-300 shadow-sm z-10">
                  <tr>
                    <th className="py-2.5 px-3">Quarter</th>
                    <th className="py-2.5 px-3">Opening Balance</th>
                    <th className="py-2.5 px-3">Principal Repaid</th>
                    <th className="py-2.5 px-3">Interest ({interestRate}%)</th>
                    <th className="py-2.5 px-3">Total Installment</th>
                    <th className="py-2.5 px-3">Closing Balance</th>
                    <th className="py-2.5 px-3">Repayment Phase</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {filteredSchedule.map((q) => (
                    <tr
                      key={q.quarterNumber}
                      className={`hover:bg-slate-50 transition-colors ${
                        q.isMoratorium
                          ? 'bg-blue-50/60 font-semibold'
                          : q.seasonTag === 'Harvest Peak'
                          ? 'bg-emerald-50/50'
                          : q.seasonTag === 'Monsoon Lull'
                          ? 'bg-amber-50/50'
                          : ''
                      }`}
                    >
                      <td className="py-2 px-3 font-bold text-slate-900">
                        {q.periodLabel}
                      </td>
                      <td className="py-2 px-3">₹ {q.openingBalance.toLocaleString('en-IN')}</td>
                      <td className="py-2 px-3 font-bold text-emerald-700">
                        ₹ {q.principalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2 px-3 text-amber-800">
                        ₹ {q.interestAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2 px-3 font-black text-slate-950">
                        ₹ {q.totalInstallment.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2 px-3 font-semibold text-slate-700">
                        ₹ {q.closingBalance.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            q.isMoratorium
                              ? 'bg-blue-100 text-[#083b5e] border border-blue-200'
                              : q.seasonTag === 'Harvest Peak'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                              : q.seasonTag === 'Monsoon Lull'
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {q.phase}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-500">
                Statutory concessional amortization compliant with NABARD, PMEGP, and State Channelizing Agencies.
              </span>
              <button
                onClick={() => setShowFullScheduleModal(false)}
                className="bg-[#083b5e] hover:bg-[#062c46] text-white font-bold py-2 px-5 rounded-xl transition-colors"
              >
                Close Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
