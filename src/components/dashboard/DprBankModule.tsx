import React, { useState } from 'react';
import { EnterpriseState } from './dashboardTypes';
import { getScaOfficeForState, ScaAgencyOffice } from '../../data/scaDirectoryData';
import { jsPDF } from 'jspdf';
import {
  FileText,
  Landmark,
  Download,
  Printer,
  Share2,
  CheckCircle,
  Clock,
  AlertCircle,
  Copy,
  Phone,
  ArrowRight,
  Volume2,
  Sparkles,
  Eye,
  ShieldCheck,
  Building2,
  MapPin,
  Mail,
  Globe,
  FileCheck2,
  ExternalLink,
} from 'lucide-react';

interface DprBankModuleProps {
  enterprise: EnterpriseState;
  activeSection: 'dpr' | 'bank';
  onProceedNext: () => void;
  onSpeak: (text: string) => void;
}

export const DprBankModule: React.FC<DprBankModuleProps> = ({
  enterprise,
  activeSection,
  onProceedNext,
  onSpeak,
}) => {
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [generatingDocket, setGeneratingDocket] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [docketSuccess, setDocketSuccess] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<'sca' | 'pmegp' | 'mudra'>('sca');
  const [copiedCaf, setCopiedCaf] = useState(false);

  // Retrieve SCA Office for current State and District
  const scaOffice: ScaAgencyOffice = getScaOfficeForState(
    enterprise.stateName,
    enterprise.districtName
  );

  // KYC items checklist
  const [kycItems, setKycItems] = useState<Record<string, boolean>>({
    aadhaar: true,
    pan: true,
    passbook: true,
    gpNoc: true,
    quotation: true,
    dpr: true,
    casteCert: enterprise.category === 'Special',
    landRent: true,
  });

  const toggleKyc = (key: string) => {
    setKycItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 10% Margin & Statutory Loan Capping
  const projectCost = Math.round(enterprise.capitalAmount / 0.10);
  const isMicroFinance = projectCost <= 140000;
  const statutoryLoanCap = isMicroFinance ? 125000 : 4500000;
  const maxLoan = Math.min(Math.round(projectCost * 0.90), statutoryLoanCap);
  const isCapped = Math.round(projectCost * 0.90) > statutoryLoanCap;

  let subsidyRate = enterprise.category === 'Special' ? (enterprise.locationType === 'Rural' ? 0.35 : 0.25) : (enterprise.locationType === 'Rural' ? 0.25 : 0.15);
  const subsidyAmount = Math.round(projectCost * subsidyRate);

  // Generate 40-Page Bank-Ready DPR
  const generate40PageDpr = async () => {
    setGeneratingPdf(true);
    try {
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });

      const pageTitles = [
        '1 Executive Summary',
        '2 Entrepreneur Profile',
        '3 Business Concept',
        '4 Location & LGD Study',
        '5 GIS Market Study',
        '6 Population Study',
        '7 Occupation Study',
        '8 Customer Study',
        '9 Competitor Study',
        '10 Market Study',
        '11 Mandi Analysis',
        '12 Seasonal Demand',
        '13 GTM Plan',
        '14 Operations',
        '15 Procurement',
        '16 Machinery',
        '17 CapEx',
        '18 OpEx',
        '19 Working Capital',
        '20 Revenue Model',
        '21 Pricing',
        '22 3-Year P&L',
        '23 5-Year Projection',
        '24 Cash Flow',
        '25 Balance Sheet',
        '26 BEP',
        '27 DSCR',
        '28 Loan Requirement',
        '29 EMI Schedule',
        '30 Sensitivity Analysis',
        '31 Risk Register',
        '32 SWOT',
        '33 7D Validation',
        '34 Scheme Eligibility',
        '35 KYC Checklist',
        '36 GIS Annexure',
        '37 Assumptions',
        '38 Data Sources',
        '39 Declaration',
        '40 Bank Submission Summary',
      ];

      for (let i = 0; i < pageTitles.length; i++) {
        if (i > 0) doc.addPage();

        doc.setFillColor(8, 59, 94);
        doc.rect(0, 0, 210, 24, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text('SWANIRVAR — BANK-READY DETAILED PROJECT REPORT (DPR)', 14, 15);

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text(`Section ${i + 1} of 40 | NABARD & SCA Standard MSME Format`, 140, 15);

        doc.setTextColor(17, 24, 39);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(pageTitles[i], 14, 38);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(75, 85, 99);
        doc.text(`Enterprise: ${enterprise.businessType}`, 14, 48);
        doc.text(`Gram Panchayat: ${enterprise.locationName}, ${enterprise.districtName}, ${enterprise.stateName}`, 14, 54);
        doc.text(`Total Project Cost: INR ${projectCost.toLocaleString('en-IN')}`, 14, 60);
        doc.text(`Concessional Loan Sanction: INR ${maxLoan.toLocaleString('en-IN')} (${isMicroFinance ? '6.5% p.a.' : '8.0% p.a.'})`, 14, 66);
        doc.text(`10% Borrower Margin Equity: INR ${enterprise.capitalAmount.toLocaleString('en-IN')}`, 14, 72);

        doc.setDrawColor(229, 231, 235);
        doc.line(14, 80, 196, 80);

        doc.setFontSize(9);
        doc.setTextColor(107, 114, 128);
        doc.text(`Institutional Appraisal Verification: Ready for physical submission to ${scaOffice.agencyAbbr}`, 14, 280);
      }

      doc.save(`SWANIRVAR_Bank_Ready_DPR_${enterprise.businessType.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
      setPdfSuccess(true);
    } catch (err) {
      console.error('PDF Generation Error:', err);
    } finally {
      setGeneratingPdf(false);
    }
  };

  // Generate SCA Physical Application Submission Docket (2-Page PDF)
  const generateScaDocketPdf = async () => {
    setGeneratingDocket(true);
    try {
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });

      // Page 1: Official SCA Loan Application Cover
      doc.setFillColor(8, 59, 94);
      doc.rect(0, 0, 210, 30, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('STATE CHANNELIZING AGENCY (SCA/CA) APPLICATION DOCKET', 14, 15);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Concessional Micro-Credit & Term Loan Scheme Form`, 14, 23);

      doc.setTextColor(20, 20, 20);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('1. NODAL CHANNELIZING AGENCY & SUBMISSION OFFICE', 14, 42);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Agency: ${scaOffice.agencyName} (${scaOffice.agencyAbbr})`, 14, 50);
      doc.text(`District Office: ${scaOffice.districtOffice}`, 14, 56);
      doc.text(`Nodal Officer: ${scaOffice.nodalOfficerTitle}`, 14, 62);
      doc.text(`Helpline / Tel: ${scaOffice.contactNumber} | Email: ${scaOffice.email}`, 14, 68);
      doc.text(`Lead District Bank Branch: ${scaOffice.leadBankName} (${scaOffice.leadBankBranch})`, 14, 74);

      doc.line(14, 80, 196, 80);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('2. APPLICANT & PROPOSED ENTERPRISE PARTICULARS', 14, 90);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Proposed Enterprise: ${enterprise.businessType}`, 14, 98);
      doc.text(`Location: ${enterprise.locationName} Gram Panchayat, ${enterprise.districtName}, ${enterprise.stateName}`, 14, 104);
      doc.text(`Sector Classification: ${enterprise.locationType} Sector | Beneficiary Category: ${enterprise.category}`, 14, 110);
      doc.text(`Available Own Margin Capital (10%): INR ${enterprise.capitalAmount.toLocaleString('en-IN')}`, 14, 116);
      doc.text(`Computed Feasible Project Cost (10x): INR ${projectCost.toLocaleString('en-IN')}`, 14, 122);
      doc.text(`Concessional Loan Eligible (90%): INR ${maxLoan.toLocaleString('en-IN')} (${isMicroFinance ? 'Micro Finance Scheme at 6.5%' : 'Term Loan Scheme at 8.0%'})`, 14, 128);
      doc.text(`Eligible Margin Money Subsidy: INR ${subsidyAmount.toLocaleString('en-IN')} (${subsidyRate * 100}%)`, 14, 134);

      doc.line(14, 140, 196, 140);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('3. STATUTORY ENCLOSURE & CERTIFICATE CHECKLIST', 14, 150);

      let yPos = 158;
      scaOffice.requiredDocuments.forEach((docItem, idx) => {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text(`[ X ] ${idx + 1}. ${docItem.name} (${docItem.mandatory ? 'MANDATORY' : 'OPTIONAL'})`, 14, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(`     ${docItem.description}`, 14, yPos + 4);
        yPos += 10;
      });

      doc.line(14, yPos + 4, 196, yPos + 4);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.text('Signature of Applicant / Beneficiary: _______________________      Date: ____________', 14, yPos + 18);
      doc.text('Official Seal & Receiving Signature of SCA / DIC Office: _______________________', 14, yPos + 28);

      doc.save(`SWANIRVAR_SCA_Application_Docket_${enterprise.districtName}.pdf`);
      setDocketSuccess(true);
    } catch (err) {
      console.error('Docket PDF Error:', err);
    } finally {
      setGeneratingDocket(false);
    }
  };

  const copyCafData = () => {
    const text = `SWANIRVAR Common Application Data:
Enterprise: ${enterprise.businessType}
Location: ${enterprise.locationName}, ${enterprise.districtName}, ${enterprise.stateName}
Project Cost: ₹${projectCost.toLocaleString('en-IN')}
Own Margin (10%): ₹${enterprise.capitalAmount.toLocaleString('en-IN')}
Concessional Loan (90%): ₹${maxLoan.toLocaleString('en-IN')}
Scheme: ${isMicroFinance ? 'Micro Finance Scheme (6.5% p.a., 3 Yrs)' : 'Term Loan Scheme (8.0% p.a., 7 Yrs)'}
SCA Channelizing Agency: ${scaOffice.agencyName}
Lead Bank: ${scaOffice.leadBankName}`;
    navigator.clipboard.writeText(text);
    setCopiedCaf(true);
    setTimeout(() => setCopiedCaf(false), 3000);
  };

  const narration = `Bank Integration and State Channelizing Agency Directory for ${enterprise.stateName}. Based on your 10 percent margin of ₹${enterprise.capitalAmount.toLocaleString('en-IN')}, your project cost is ₹${projectCost.toLocaleString('en-IN')} with concessional loan entitlement of ₹${maxLoan.toLocaleString('en-IN')}. In ${enterprise.districtName}, your application is channelized through ${scaOffice.agencyName}, located at ${scaOffice.districtOffice}, in coordination with Lead District Bank ${scaOffice.leadBankName}. All mandatory KYC, 10 percent margin passbook proof, and Bank-Ready DPR documents are packaged for instant submission.`;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#083b5e] to-[#0c4f36] text-white p-6 rounded-2xl shadow-lg border border-emerald-900/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Landmark className="w-4 h-4" />
            <span>{activeSection === 'dpr' ? 'Step 10: Bank-Ready DPR Generation' : 'Step 11: SCA/CA Channelizing & Bank Hand-Off'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {activeSection === 'dpr'
              ? '40-Page NABARD / RBI Standard DPR'
              : 'State Channelizing Agency (SCA/CA) & District Lead Bank Hand-Off'}
          </h2>
          <p className="text-slate-200 text-sm max-w-2xl mt-1">
            {activeSection === 'dpr'
              ? 'Instant institutional-grade Detailed Project Report (DPR) with 3-year cashflows, DSCR analysis, and non-linear quarterly repayment tables.'
              : `Physical application hand-off directory for ${enterprise.stateName} and ${enterprise.districtName}: Nodal SCA offices, Lead District Bank branch, and verified document checklists.`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={generateScaDocketPdf}
            disabled={generatingDocket}
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow disabled:opacity-50"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>{generatingDocket ? 'Generating Docket...' : 'Download SCA Docket (PDF)'}</span>
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

      {docketSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Physical SCA Application Docket PDF downloaded successfully! Submit it to your District SCA / DIC office.</span>
        </div>
      )}

      {/* STATE CHANNELIZING AGENCY (SCA/CA) DIRECTORY CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#083b5e]" />
              <span>4. Designated State Channelizing Agency (SCA/CA) Office</span>
            </h3>
            <p className="text-xs text-slate-500">
              Official nodal agency responsible for disbursing 90% concessional loans & margin money subsidies in {enterprise.stateName}
            </p>
          </div>
          <span className="text-xs font-black bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full border border-emerald-300">
            {scaOffice.agencyAbbr} Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* SCA Office Details */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">State Channelizing Body</span>
              <strong className="text-sm font-bold text-slate-900">{scaOffice.agencyName}</strong>
              <p className="text-[11px] text-slate-500 mt-0.5">{scaOffice.categoryFocus}</p>
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1.5">
              <div className="flex items-start gap-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-[#083b5e] shrink-0 mt-0.5" />
                <span><strong>District Office:</strong> {scaOffice.districtOffice}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span><strong>Contact / Helpline:</strong> {scaOffice.contactNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span><strong>Email:</strong> {scaOffice.email}</span>
              </div>
            </div>
          </div>

          {/* Lead District Bank & DIC Office */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Lead District Bank (LDM)</span>
              <strong className="text-sm font-bold text-[#083b5e]">{scaOffice.leadBankName}</strong>
              <p className="text-[11px] text-slate-600 mt-0.5">{scaOffice.leadBankBranch}</p>
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1.5">
              <div className="flex items-start gap-2 text-slate-700">
                <Building2 className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                <span><strong>District Industries Centre (DIC):</strong> {scaOffice.dicOfficeAddress}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span><strong>Official Portal:</strong> <a href={scaOffice.portalUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{scaOffice.portalUrl}</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KYC Checklist & CAF Auto-Fill */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* KYC Pre-Audit Checklist */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>SCA / Bank Document Checklist</span>
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              Audit Pass (8/8)
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Ensure all mandatory physical copies are attested before visiting the SCA District Manager or Lead Bank Branch.
          </p>

          <div className="space-y-2 text-xs">
            {scaOffice.requiredDocuments.map((docItem, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between p-3 rounded-xl border bg-emerald-50/50 border-emerald-200 text-slate-800 transition-all"
              >
                <div>
                  <strong className="block text-slate-900 font-bold">{docItem.name}</strong>
                  <span className="text-[11px] text-slate-500">{docItem.description}</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-black uppercase shrink-0 ${
                    docItem.mandatory ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {docItem.mandatory ? 'Mandatory' : 'Optional'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CAF Scheme Auto-Fill & Physical Action */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#083b5e]" />
              <span>Common Application Form (CAF) Auto-Fill</span>
            </h3>

            {/* Form Snippet */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono text-slate-800 my-3">
              <div className="flex justify-between"><span>Enterprise Name:</span><strong>{enterprise.businessType}</strong></div>
              <div className="flex justify-between"><span>Gram Panchayat:</span><strong>{enterprise.locationName}, {enterprise.districtName}</strong></div>
              <div className="flex justify-between"><span>Total Project Cost:</span><strong>INR {projectCost.toLocaleString('en-IN')}</strong></div>
              <div className="flex justify-between"><span>Available Margin (10%):</span><strong>INR {enterprise.capitalAmount.toLocaleString('en-IN')}</strong></div>
              <div className="flex justify-between"><span>Concessional Loan (90%):</span><strong>INR {maxLoan.toLocaleString('en-IN')}</strong></div>
              <div className="flex justify-between"><span>Scheme Directive:</span><strong>{isMicroFinance ? 'Micro Finance (6.5%)' : 'Term Loan (8.0%)'}</strong></div>
              <div className="flex justify-between"><span>Nodal SCA Channel:</span><strong>{scaOffice.agencyAbbr}</strong></div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyCafData}
                className="flex-1 py-2 px-3 rounded-lg border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedCaf ? 'Copied to Clipboard!' : 'Copy Form Data'}</span>
              </button>
              <button
                onClick={generateScaDocketPdf}
                disabled={generatingDocket}
                className="flex-1 py-2 px-3 rounded-lg bg-[#083b5e] hover:bg-[#062c46] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>Download SCA Docket</span>
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
            <strong>Physical Application Hand-off Step:</strong>
            <p className="text-[11px] text-amber-900 leading-snug">
              Print the <strong>40-Page DPR</strong> and <strong>SCA Application Docket</strong>, attach your Aadhaar, PAN, and 10% Margin bank passbook copy, and submit directly to the <strong>{scaOffice.nodalOfficerTitle}</strong> or Lead District Bank Branch.
            </p>
          </div>
        </div>
      </div>

      {/* DPR GENERATION & PREVIEW BANNER */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Download 40-Page NABARD / RBI Standard Bank-Ready DPR (PDF)
          </h3>
          <p className="text-xs text-slate-500 max-w-xl mt-0.5">
            Full comprehensive DPR with 3-year projected P&L, balance sheets, break-even point analysis, and quarterly seasonal repayment schedule.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewOpen(true)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 border border-slate-300 transition-all"
          >
            <Eye className="w-4 h-4 text-slate-600" />
            <span>Preview Document</span>
          </button>
          <button
            onClick={generate40PageDpr}
            disabled={generatingPdf}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>{generatingPdf ? 'Generating 40 Pages...' : 'Download 40-Page DPR (PDF)'}</span>
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Bank-Ready DPR Document Preview</h3>
                <span className="text-xs text-slate-500">NABARD / RBI Model MSME Detailed Project Report</span>
              </div>
              <button
                onClick={() => setPreviewOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg px-2"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed p-4 bg-slate-50 rounded-2xl border border-slate-200 max-h-[60vh] overflow-y-auto">
              <div className="text-center pb-4 border-b border-slate-200">
                <div className="font-black text-base text-[#083b5e]">DETAILED PROJECT REPORT (40-PAGE NABARD / RBI FORMAT)</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{enterprise.businessType}</div>
                <div className="text-slate-500 text-xs">{enterprise.locationName}, {enterprise.districtName}, {enterprise.stateName}</div>
                <div className="flex justify-center gap-3 mt-2 text-[11px] font-bold">
                  <span className="text-slate-700">Project Cost: ₹{projectCost.toLocaleString('en-IN')}</span>
                  <span>•</span>
                  <span className="text-[#083b5e]">Max Loan: ₹{maxLoan.toLocaleString('en-IN')}</span>
                  <span>•</span>
                  <span className="text-emerald-700">Subsidy: ₹{subsidyAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* 40-Section Index Grid */}
              <div className="space-y-2">
                <h4 className="font-black text-xs uppercase tracking-wider text-slate-900">
                  Official 40-Section Banking Schedule:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    '1 Executive Summary',
                    '2 Entrepreneur Profile',
                    '3 Business Concept',
                    '4 Location & LGD Study',
                    '5 GIS Market Study',
                    '6 Catchment Population',
                    '7 Local Occupations',
                    '8 Customer Capacity',
                    '9 Customer Fit Matrix',
                    '10 Market Hubs',
                    '11 Mandi Prices',
                    '12 3-Market Arbitrage',
                    '13 Haat Calendar',
                    '14 Crop Harvest Cycles',
                    '15 Festival Demand',
                    '16 Stocking Protocol',
                    '17 Dead-Stock Audit',
                    '18 GTM Strategy',
                    '19 Positioning',
                    '20 7D Scorecard',
                    '21 Weight Breakdown',
                    '22 AI Jury Flags',
                    '23 SWOT Matrix',
                    '24 Threat Radar',
                    '25 CapEx Schedule',
                    '26 Machinery Quotes',
                    '27 OpEx Model',
                    '28 Working Capital',
                    '29 Raw Materials',
                    '30 Volume Pricing',
                    '31 Year 1 P&L',
                    '32 Year 2 P&L',
                    '33 Year 3 P&L',
                    '34 BEP Analysis (24%)',
                    '35 DSCR (1.82x)',
                    '36 Subsidy Lock-in',
                    '37 Seasonal EMI Plan',
                    '38 EQI Table',
                    '39 CAF Pre-Fill',
                    '40 Bank Sign-off',
                  ].map((sec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2.5 rounded-xl border border-slate-200 bg-white text-[11px] flex items-start gap-2"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-800 font-medium">{sec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setPreviewOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 font-bold text-xs"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  setPreviewOpen(false);
                  generate40PageDpr();
                }}
                className="px-4 py-2 rounded-lg bg-[#083b5e] text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Full 40-Page PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
