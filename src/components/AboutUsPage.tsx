import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  FileText,
  CheckCircle2,
  X,
  Download,
  ArrowRight,
} from 'lucide-react';

interface AboutUsPageProps {
  onNavigateHome?: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigateHome }) => {
  const { t } = useLanguage();
  const [dprModalOpen, setDprModalOpen] = useState(false);
  const [activeNavSection, setActiveNavSection] = useState('pilot');
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDprModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { id: 'pilot', text: t('Pilot Context') },
    { id: 'capabilities', text: t('Core Capabilities') },
    { id: 'scoring', text: t('Financial Scoring') },
    { id: 'mandi', text: t('Mandi Intelligence') },
    { id: 'aa', text: t('Account Aggregator') },
    { id: 'dpr', text: t('DPR Generator') },
    { id: 'stakeholders', text: t('Stakeholders') },
  ];

  const capabilities = [
    {
      title: t('Voice Intake (Bol-Khata)'),
      description: t('Vernacular-first intent capture via voice. Transcripts stored with SHA-256 hash.'),
      status: t('Active'),
      module: 'intake-core',
    },
    {
      title: t('Deterministic Scoring Core'),
      description: t('Python modules produce all financial figures. No LLM in scoring path.'),
      status: t('Active'),
      module: 'scoring-core',
    },
    {
      title: t('Rule-Based Scheme Router'),
      description: t('Matches enterprise profile with NABARD, PMEGP, State schemes.'),
      status: t('Active'),
      module: 'scheme-router',
    },
    {
      title: t('GIS Market Intelligence'),
      description: t('Hyper-local mandi prices with four confidence tiers.'),
      status: t('Active'),
      module: 'gis-core',
    },
    {
      title: t('Dual-AI Simulation Suite'),
      description: t('Confidence training via deterministic + stochastic simulation.'),
      status: t('Testing'),
      module: 'simulation-core',
    },
    {
      title: t('Digital Gullak System'),
      description: t('Cash-flow discipline with envelope-budgeting interface.'),
      status: t('Active'),
      module: 'gullak-core',
    },
    {
      title: t('40-page DPR Generator'),
      description: t('Audit-ready Detailed Project Report with traceable calculations.'),
      status: t('Active'),
      module: 'dpr-generator',
    },
    {
      title: t('RBI Account Aggregator'),
      description: t('Consent-based financial data via Sahamati framework.'),
      status: t('Integrated'),
      module: 'aa-integration',
    },
  ];

  const financialData = [
    {
      parameter: t('Working Capital Requirement'),
      value: '₹3,50,000',
      confidence: t('High'),
      schemeMatch: t('PMEGP + TNRTP Artisan Grant'),
      subsidyEstimate: t('₹1,05,000 (preliminary)'),
    },
    {
      parameter: t('Debt Service Coverage Ratio'),
      value: '1.62',
      confidence: t('High'),
      schemeMatch: t('NABARD Off-Farm Refinance'),
      subsidyEstimate: t('Interest subvention eligible'),
    },
    {
      parameter: t('Promoter Contribution'),
      value: '₹1,20,000',
      confidence: t('Verified'),
      schemeMatch: t('All schemes'),
      subsidyEstimate: t('Meets equity margin norms'),
    },
    {
      parameter: t('Projected Margin'),
      value: '24%',
      confidence: t('Assumption'),
      schemeMatch: t('Not scheme-dependent'),
      subsidyEstimate: t('N/A'),
    },
    {
      parameter: t('Repayment Period'),
      value: t('5 years'),
      confidence: t('Standard'),
      schemeMatch: t('Bank term loan'),
      subsidyEstimate: t('Moratorium: 12 months'),
    },
  ];

  const mandiPrices = [
    {
      commodity: t('22K Gold Foil (Mukut Quality)'),
      unit: t('Booklet (25 leaves)'),
      livePrice: '₹3,450',
      historicalPrice: '₹3,100-₹3,650',
      estimatedPrice: '₹3,380',
      crowdsourcedPrice: '₹3,420',
      confidence: 'live',
    },
    {
      commodity: t('Teakwood Board (Mukhya Peetam)'),
      unit: t('Sq. Ft.'),
      livePrice: '₹480',
      historicalPrice: '₹420-₹520',
      estimatedPrice: '₹465',
      crowdsourcedPrice: '₹490',
      confidence: 'crowdsourced',
    },
    {
      commodity: t('Semi-Precious Jaipur Stones'),
      unit: t('100g Pouch'),
      livePrice: '₹680',
      historicalPrice: '₹600-₹750',
      estimatedPrice: '₹660',
      crowdsourcedPrice: 'N/A',
      confidence: 'historical',
    },
    {
      commodity: t('Framed Tanjore Artwork (18"x14")'),
      unit: t('Per Piece'),
      livePrice: '₹18,500',
      historicalPrice: '₹15,000-₹24,000',
      estimatedPrice: '₹17,800',
      crowdsourcedPrice: '₹19,200',
      confidence: 'estimated',
    },
  ];

  const dprSections = [
    { section: t('Executive Summary'), pages: '1-3', status: t('Auto-generated') },
    { section: t('Enterprise Profile'), pages: '4-7', status: t('From Bol-Khata') },
    { section: t('Market Analysis'), pages: '8-11', status: t('GIS Intelligence') },
    { section: t('Financial Projections'), pages: '12-15', status: t('Scoring Core') },
    { section: t('Scheme Alignment'), pages: '16-20', status: t('Scheme Router') },
    { section: t('Risk Assessment'), pages: '21-25', status: t('Dual-AI Simulation') },
    { section: t('Cash Flow Discipline'), pages: '26-30', status: t('Digital Gullak') },
    { section: t('Compliance Checklist'), pages: '31-35', status: t('Regulatory Core') },
    { section: t('Appendices'), pages: '36-40', status: t('Source Data') },
  ];

  const stakeholders = [
    {
      role: t('Rural Micro-Entrepreneur'),
      access: t('Voice interface (Bol-Khata), vernacular UI'),
      needs: t('Simple intent capture, subsidy matching, cash flow tracking'),
      training: t('Dual-AI confidence simulation'),
    },
    {
      role: t('VLE / CSC Agent'),
      access: t('Assisted-entry dashboard, GPS price reporting'),
      needs: t('Quick beneficiary onboarding, document scanning'),
      training: t('Agent training module'),
    },
    {
      role: t('Bank Official'),
      access: t('DPR review portal, scoring audit trail'),
      needs: t('Standardized reports, compliance checklist'),
      training: t('Scheme interpretation guide'),
    },
    {
      role: t('NABARD/SCA Evaluator'),
      access: t('Portfolio dashboard, GIS market maps'),
      needs: t('Sectoral analysis, subsidy impact assessment'),
      training: t('Policy alignment module'),
    },
  ];

  const scrollToSection = (id: string) => {
    setActiveNavSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleDownloadSample = () => {
    setDownloadNotification(t('DPR sample PDF generation initiated for Thirumangalam Tanjore Art Pilot.'));
    setTimeout(() => {
      setDownloadNotification(null);
    }, 4000);
  };

  return (
    <div
      className="w-full min-h-screen pt-[74px] text-[#1a1f36] bg-[#f4efe6]"
      style={{
        fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Institutional Breadcrumb & Sub-Header */}
      <div className="bg-[#1a1f36] text-[#faf7f1] border-b-4 border-[#c96a1f] py-5 sm:py-6 px-4 sm:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#FF9933] font-bold mb-1">
              <span>{t('About Us')}</span>
              <span>•</span>
              <span>{t('Institutional Framework')}</span>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
              style={{ fontFamily: "'Merriweather', Georgia, serif" }}
            >
              SWANIRVAR
            </h1>
            <p className="text-xs sm:text-sm mt-1 text-[#e0d7c4] opacity-90 max-w-2xl leading-relaxed">
              {t('Hybrid Vernacular-First Institutional Platform transforming unorganized rural micro-entrepreneur intent into bank-verified, NABARD-standard enterprises.')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onNavigateHome && (
              <button
                type="button"
                onClick={onNavigateHome}
                className="px-3.5 py-1.5 rounded-md bg-[#2d3450] hover:bg-[#3a446a] text-xs font-semibold text-white border border-[#4a5170] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>← {t('Back to Overview')}</span>
              </button>
            )}
          </div>
        </div>

        {/* In-page Anchor Nav Strip */}
        <div className="max-w-7xl mx-auto mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/15 overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium whitespace-nowrap pb-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                    activeNavSection === item.id
                      ? 'bg-[#c96a1f] text-white font-bold shadow-xs'
                      : 'text-[#e0d7c4] hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Document Content */}
      <main className="max-w-7xl mx-auto py-8 sm:py-10 px-4 sm:px-8">
        {/* Notification Toast */}
        {downloadNotification && (
          <div className="mb-6 p-4 rounded-lg bg-[#3a6e4f] text-white font-medium text-sm flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
              <span>{downloadNotification}</span>
            </div>
            <button
              type="button"
              onClick={() => setDownloadNotification(null)}
              className="text-white hover:opacity-75 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Section 1: Pilot Context Section */}
        <section
          id="pilot"
          className="mb-10 sm:mb-12 p-5 sm:p-8 bg-white border border-[#1a1f36] shadow-xs"
        >
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-[#c96a1f]/10 text-[#c96a1f] border border-[#c96a1f]/30">
              {t('PILOT ACTIVE')}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-[#3a6e4f]/10 text-[#3a6e4f] border border-[#3a6e4f]/30">
              {t('NABARD ALIGNED')}
            </span>
          </div>

          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-[#1a1f36]"
            style={{ fontFamily: "'Merriweather', Georgia, serif" }}
          >
            {t('Pilot Context: Thirumangalam, Madurai District, Tamil Nadu')}
          </h2>
          <p className="text-xs sm:text-sm text-[#4a5170] max-w-3xl mb-6 leading-relaxed">
            {t('Demonstrating deterministic financial scoring, grassroots telemetry capture, and formal bank syndication without black-box generative AI interference in the credit path.')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-4">
            <div className="p-4 sm:p-5 bg-[#ebe4d6] border border-[#1a1f36]/20">
              <h3
                className="font-bold text-base sm:text-lg mb-2 text-[#1a1f36]"
                style={{ fontFamily: "'Merriweather', Georgia, serif" }}
              >
                {t('Beneficiary')}
              </h3>
              <p className="text-base font-semibold text-[#2d3450]">{t('Venu of Thirumangalam')}</p>
              <p className="text-xs sm:text-sm text-[#4a5170] mt-1">{t('Tanjore painting artisan enterprise')}</p>
            </div>
            <div className="p-4 sm:p-5 bg-[#ebe4d6] border border-[#1a1f36]/20">
              <h3
                className="font-bold text-base sm:text-lg mb-2 text-[#1a1f36]"
                style={{ fontFamily: "'Merriweather', Georgia, serif" }}
              >
                {t('Promoter Contribution')}
              </h3>
              <p className="text-2xl font-bold text-[#3a6e4f]">₹1,20,000</p>
              <p className="text-xs sm:text-sm text-[#4a5170] mt-1">{t('Equity & studio tools')}</p>
            </div>
            <div className="p-4 sm:p-5 bg-[#ebe4d6] border border-[#1a1f36]/20">
              <h3
                className="font-bold text-base sm:text-lg mb-2 text-[#1a1f36]"
                style={{ fontFamily: "'Merriweather', Georgia, serif" }}
              >
                {t('Scoring Core')}
              </h3>
              <p className="text-base font-semibold text-[#2d3450]">{t('Deterministic Python modules')}</p>
              <p className="text-xs sm:text-sm text-[#4a5170] mt-1">{t('No LLM in scoring path')}</p>
            </div>
          </div>
        </section>

        {/* Section 2: Core Capabilities Grid */}
        <section id="capabilities" className="mb-10 sm:mb-14">
          <div className="border-b-2 border-[#1a1f36] pb-3 mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1f36]"
              style={{ fontFamily: "'Merriweather', Georgia, serif" }}
            >
              {t('Core Capabilities')}
            </h2>
            <span className="text-xs uppercase font-mono tracking-widest text-[#4a5170]">
              {t('8 Verified Modules')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {capabilities.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 bg-white border border-[#1a1f36] flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex justify-between items-start mb-2.5 gap-2">
                    <h3
                      className="font-bold text-sm sm:text-base text-[#1a1f36] leading-snug"
                      style={{ fontFamily: "'Merriweather', Georgia, serif" }}
                    >
                      {item.title}
                    </h3>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border shrink-0 ${
                        item.status === t('Active') || item.status === 'Active'
                          ? 'bg-[#3a6e4f]/10 text-[#3a6e4f] border-[#3a6e4f]/40'
                          : item.status === t('Integrated') || item.status === 'Integrated'
                          ? 'bg-[#3a5a8a]/10 text-[#3a5a8a] border-[#3a5a8a]/40'
                          : 'bg-[#c96a1f]/10 text-[#c96a1f] border-[#c96a1f]/40'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2d3450] mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#4a5170] pt-3 border-t border-[#e0d7c4]">
                  {item.module}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Financial Scoring & Scheme Routing */}
        <section
          id="scoring"
          className="mb-10 sm:mb-14 p-5 sm:p-8 bg-white border border-[#1a1f36] shadow-xs"
        >
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-[#1a1f36]"
            style={{ fontFamily: "'Merriweather', Georgia, serif" }}
          >
            {t('Financial Scoring & Scheme Router')}
          </h2>
          <p className="mb-6 text-xs sm:text-base text-[#2d3450] leading-relaxed">
            {t('Deterministic Python core produces all financial figures across scoring, scheme routing, and financial intelligence modules.')}
          </p>

          <div className="overflow-x-auto border border-[#1a1f36] -mx-1 sm:mx-0">
            <table className="min-w-[600px] w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#1a1f36] text-white">
                <tr>
                  <th className="py-3 px-3 sm:px-4 font-semibold uppercase tracking-wider text-[11px] sm:text-xs">{t('Parameter')}</th>
                  <th className="py-3 px-3 sm:px-4 font-semibold uppercase tracking-wider text-[11px] sm:text-xs">{t('Value')}</th>
                  <th className="py-3 px-3 sm:px-4 font-semibold uppercase tracking-wider text-[11px] sm:text-xs">{t('Confidence')}</th>
                  <th className="py-3 px-3 sm:px-4 font-semibold uppercase tracking-wider text-[11px] sm:text-xs">{t('Scheme Match')}</th>
                  <th className="py-3 px-3 sm:px-4 font-semibold uppercase tracking-wider text-[11px] sm:text-xs">{t('Subsidy Estimate')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0d7c4]">
                {financialData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#f4efe6]/50 transition-colors">
                    <td className="py-3 px-3 sm:px-4 font-medium text-[#1a1f36]">{row.parameter}</td>
                    <td className="py-3 px-3 sm:px-4 font-bold text-[#1a1f36]">{row.value}</td>
                    <td className="py-3 px-3 sm:px-4">
                      <span
                        className={`px-2 py-0.5 text-[11px] sm:text-xs font-bold uppercase border whitespace-nowrap ${
                          row.confidence === t('High') || row.confidence === t('Verified') || row.confidence === 'High' || row.confidence === 'Verified'
                            ? 'bg-[#3a6e4f]/15 text-[#2d5a40] border-[#3a6e4f]'
                            : row.confidence === t('Medium') || row.confidence === 'Medium'
                            ? 'bg-[#3a5a8a]/15 text-[#2d4870] border-[#3a5a8a]'
                            : 'bg-[#c96a1f]/15 text-[#a85413] border-[#c96a1f]'
                        }`}
                      >
                        {row.confidence}
                      </span>
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-[#2d3450]">{row.schemeMatch}</td>
                    <td className="py-3 px-3 sm:px-4 font-medium text-[#2d3450]">{row.subsidyEstimate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-3.5 sm:p-4 bg-[#ebe4d6] border-l-4 border-[#a8452c]">
            <p className="text-xs sm:text-sm text-[#4a5170] italic leading-relaxed">
              {t('The 24% margin rate is an analytical benchmark based on authentic 22K gold foil ornamentation and custom orders in Thirumangalam craft cluster, not a universal rule. Actual margins may vary based on local market conditions.')}
            </p>
          </div>
        </section>

        {/* Section 4: Mandi Data Confidence Tiers */}
        <section id="mandi" className="mb-10 sm:mb-14">
          <div className="border-b-2 border-[#1a1f36] pb-3 mb-4">
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1f36]"
              style={{ fontFamily: "'Merriweather', Georgia, serif" }}
            >
              {t('Mandi Price Intelligence')}
            </h2>
          </div>
          <p className="mb-6 text-xs sm:text-base text-[#2d3450] leading-relaxed">
            {t('Four confidence tiers: Live (Agmarknet / e-NAM), Historical, Estimated (~42,000 informal haats), Crowdsourced (VLE GPS + timestamp). Never show interpolated as live.')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
            <div className="p-4 bg-white border border-[#1a1f36]">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[11px] font-bold px-2 py-0.5 bg-[#e6f4ea] text-[#2d5a40] border border-[#3a6e4f]">
                  {t('LIVE')}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-[#1a1f36]">{t('Agmarknet / e-NAM')}</h3>
              </div>
              <p className="text-xs text-[#4a5170] leading-relaxed">{t('Real-time verified prices from regulated mandis')}</p>
            </div>

            <div className="p-4 bg-white border border-[#1a1f36]">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[11px] font-bold px-2 py-0.5 bg-[#f0f0f0] text-[#4a5170] border border-[#4a5170]">
                  {t('HISTORICAL')}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-[#1a1f36]">{t('Seasonal Archive')}</h3>
              </div>
              <p className="text-xs text-[#4a5170] leading-relaxed">{t('5-year price patterns for trend analysis')}</p>
            </div>

            <div className="p-4 bg-white border border-[#1a1f36]">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[11px] font-bold px-2 py-0.5 bg-[#fff3e0] text-[#a85413] border border-[#c96a1f]">
                  {t('ESTIMATED')}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-[#1a1f36]">{t('Spatial Interpolation')}</h3>
              </div>
              <p className="text-xs text-[#4a5170] leading-relaxed">{t('For ~42,000 informal haats without direct data')}</p>
            </div>

            <div className="p-4 bg-white border border-[#1a1f36]">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[11px] font-bold px-2 py-0.5 bg-[#e8f0fe] text-[#2d4870] border border-[#3a5a8a]">
                  {t('CROWDSOURCED')}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-[#1a1f36]">{t('VLE Field Data')}</h3>
              </div>
              <p className="text-xs text-[#4a5170] leading-relaxed">{t('GPS-timestamped local price reports')}</p>
            </div>
          </div>

          <div className="overflow-x-auto border border-[#1a1f36] bg-white -mx-1 sm:mx-0">
            <table className="min-w-[640px] w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#1a1f36] text-white">
                <tr>
                  <th className="py-3 px-3 sm:px-4 uppercase font-semibold text-[11px] sm:text-xs tracking-wider">{t('Commodity')}</th>
                  <th className="py-3 px-3 sm:px-4 uppercase font-semibold text-[11px] sm:text-xs tracking-wider">{t('Unit')}</th>
                  <th className="py-3 px-3 sm:px-4 uppercase font-semibold text-[11px] sm:text-xs tracking-wider">{t('Live Price')}</th>
                  <th className="py-3 px-3 sm:px-4 uppercase font-semibold text-[11px] sm:text-xs tracking-wider">{t('Historical Range')}</th>
                  <th className="py-3 px-3 sm:px-4 uppercase font-semibold text-[11px] sm:text-xs tracking-wider">{t('Estimated')}</th>
                  <th className="py-3 px-3 sm:px-4 uppercase font-semibold text-[11px] sm:text-xs tracking-wider">{t('Crowdsourced')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0d7c4]">
                {mandiPrices.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#f4efe6]/50">
                    <td className="py-3 px-3 sm:px-4 font-medium text-[#1a1f36]">{item.commodity}</td>
                    <td className="py-3 px-3 sm:px-4 text-[#4a5170]">{item.unit}</td>
                    <td className="py-3 px-3 sm:px-4 border-l-4 border-l-[#3a6e4f] font-bold text-[#1a1f36]">
                      {item.livePrice}
                      {item.confidence === 'live' && (
                        <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 bg-[#e6f4ea] text-[#2d5a40] border border-[#3a6e4f]">
                          {t('LIVE')}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-[#2d3450]">{item.historicalPrice}</td>
                    <td className="py-3 px-3 sm:px-4 text-[#2d3450]">
                      {item.estimatedPrice}
                      {item.confidence === 'estimated' && (
                        <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 bg-[#fff3e0] text-[#a85413] border border-[#c96a1f]">
                          {t('ESTIMATED')}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-[#2d3450]">
                      {item.crowdsourcedPrice}
                      {item.confidence === 'crowdsourced' && (
                        <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 bg-[#e8f0fe] text-[#2d4870] border border-[#3a5a8a]">
                          {t('CROWDSOURCED')}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Account Aggregator Framework */}
        <section
          id="aa"
          className="mb-10 sm:mb-14 p-5 sm:p-8 bg-white border border-[#1a1f36] shadow-xs"
        >
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#1a1f36]"
            style={{ fontFamily: "'Merriweather', Georgia, serif" }}
          >
            {t('Account Aggregator Integration')}
          </h2>
          <p className="mb-6 text-xs sm:text-base text-[#2d3450] leading-relaxed">
            {t('Uses RBI/Sahamati framework. Never uses UPI credentials. Consent-based data sharing with 24-hour validity.')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-4 sm:p-5 bg-[#ebe4d6] border border-[#1a1f36]/20">
              <h3
                className="font-bold text-base sm:text-lg mb-3 text-[#1a1f36]"
                style={{ fontFamily: "'Merriweather', Georgia, serif" }}
              >
                {t('Consent Flow')}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#2d3450]">
                <li className="flex items-start gap-2">
                  <span className="text-[#3a6e4f] font-bold">✓</span>
                  <span>{t('Beneficiary initiates consent via AA app')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3a6e4f] font-bold">✓</span>
                  <span>{t('Specifies data type (bank statements, GST returns)')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3a6e4f] font-bold">✓</span>
                  <span>{t('24-hour validity period')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3a6e4f] font-bold">✓</span>
                  <span>{t('FIUs receive encrypted data')}</span>
                </li>
              </ul>
            </div>

            <div className="p-4 sm:p-5 bg-[#ebe4d6] border border-[#1a1f36]/20">
              <h3
                className="font-bold text-base sm:text-lg mb-3 text-[#1a1f36]"
                style={{ fontFamily: "'Merriweather', Georgia, serif" }}
              >
                {t('Financial Data Retrieved')}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#2d3450]">
                <li className="flex items-start justify-between border-b border-[#1a1f36]/10 pb-2 gap-2">
                  <span className="text-xs uppercase font-mono tracking-wider text-[#4a5170]">
                    {t('Bank Statements')}
                  </span>
                  <span className="font-semibold text-right">{t('Last 12 months cash flow')}</span>
                </li>
                <li className="flex items-start justify-between border-b border-[#1a1f36]/10 pb-2 gap-2">
                  <span className="text-xs uppercase font-mono tracking-wider text-[#4a5170]">
                    {t('GST Returns')}
                  </span>
                  <span className="font-semibold text-right">{t('If registered under GST')}</span>
                </li>
                <li className="flex items-start justify-between border-b border-[#1a1f36]/10 pb-2 gap-2">
                  <span className="text-xs uppercase font-mono tracking-wider text-[#4a5170]">
                    {t('Investment Proof')}
                  </span>
                  <span className="font-semibold text-right">{t('FDs, mutual fund statements')}</span>
                </li>
                <li className="flex items-start justify-between gap-2">
                  <span className="text-xs uppercase font-mono tracking-wider text-[#4a5170]">
                    {t('Credit Report')}
                  </span>
                  <span className="font-semibold text-right">{t('Through RBI-approved CICs')}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Audit-Ready DPR Generator */}
        <section id="dpr" className="mb-10 sm:mb-14">
          <div className="border-b-2 border-[#1a1f36] pb-3 mb-4">
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1f36]"
              style={{ fontFamily: "'Merriweather', Georgia, serif" }}
            >
              {t('Audit-Ready DPR Generator')}
            </h2>
          </div>
          <p className="mb-6 text-xs sm:text-base text-[#2d3450] leading-relaxed">
            {t('40-page Detailed Project Report with bank-ready sections. All calculations traceable to source modules.')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
            {dprSections.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border border-[#1a1f36] flex justify-between items-start gap-2"
              >
                <div>
                  <h3
                    className="font-bold text-sm sm:text-base text-[#1a1f36]"
                    style={{ fontFamily: "'Merriweather', Georgia, serif" }}
                  >
                    {item.section}
                  </h3>
                  <p className="text-xs text-[#4a5170] mt-1">{t('Pages')} {item.pages}</p>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#c96a1f] font-bold bg-[#c96a1f]/10 px-2 py-0.5 border border-[#c96a1f]/30 shrink-0">
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 sm:p-6 bg-white border-2 border-[#1a1f36] flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-[#a8452c]/10 text-[#a8452c] border border-[#a8452c]/30 shrink-0">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h3
                  className="font-bold text-base sm:text-lg text-[#1a1f36] mb-1"
                  style={{ fontFamily: "'Merriweather', Georgia, serif" }}
                >
                  {t('DPR Output Sample')}
                </h3>
                <p className="text-xs sm:text-sm text-[#2d3450] max-w-xl leading-relaxed">
                  {t('Generates PDF with watermarked page numbers, digital signature of scoring core, and audit metadata.')}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDprModalOpen(true)}
              className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#c96a1f] hover:bg-[#a85413] transition-colors border border-[#1a1f36] shadow-xs cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap self-stretch sm:self-auto"
            >
              <span>{t('View Sample Pages')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Section 7: Stakeholder Access Points */}
        <section id="stakeholders" className="mb-12 sm:mb-16">
          <div className="border-b-2 border-[#1a1f36] pb-3 mb-6">
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1f36]"
              style={{ fontFamily: "'Merriweather', Georgia, serif" }}
            >
              {t('Stakeholder Access Points')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stakeholders.map((sh, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 bg-white border border-[#1a1f36] flex flex-col justify-between"
              >
                <div>
                  <h3
                    className="font-bold text-base sm:text-lg mb-3 text-[#1a1f36]"
                    style={{ fontFamily: "'Merriweather', Georgia, serif" }}
                  >
                    {sh.role}
                  </h3>

                  <div className="mb-3">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#4a5170] mb-0.5">
                      {t('Access')}
                    </p>
                    <p className="text-xs sm:text-sm text-[#2d3450] font-medium leading-relaxed">
                      {sh.access}
                    </p>
                  </div>

                  <div className="mb-3">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#4a5170] mb-0.5">
                      {t('Primary Needs')}
                    </p>
                    <p className="text-xs sm:text-sm text-[#2d3450] leading-relaxed">
                      {sh.needs}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#e0d7c4]">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#4a5170] mb-0.5">
                    {t('Training Module')}
                  </p>
                  <p className="text-xs font-semibold text-[#3a6e4f]">
                    {sh.training}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1a1f36]/10">
                  <a
                    href="#signup"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-[#1a1f36] bg-[#ebe4d6] hover:bg-[#1a1f36] hover:text-white border border-[#1a1f36] transition-colors"
                  >
                    <span>{t('Authenticate Portal')}</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* DPR Sample Pages Modal (Pages 12-15) */}
      {dprModalOpen && (
        <div
          className="fixed inset-0 bg-black/75 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setDprModalOpen(false);
            }
          }}
        >
          <div className="bg-white w-full max-w-4xl p-5 sm:p-8 border-2 border-[#1a1f36] shadow-2xl relative my-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#1a1f36]">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#c96a1f] font-bold">
                  {t('Audit-Ready Inspection')}
                </span>
                <h2
                  className="text-xl sm:text-2xl font-bold text-[#1a1f36]"
                  style={{ fontFamily: "'Merriweather', Georgia, serif" }}
                >
                  {t('DPR Sample: Pages 12-15')}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setDprModalOpen(false)}
                className="p-1.5 text-[#1a1f36] hover:bg-[#f4efe6] transition-colors cursor-pointer"
                aria-label={t('Close')}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6 max-h-[65vh] overflow-y-auto pr-1">
              <div className="p-4 sm:p-5 bg-[#ebe4d6] border border-[#1a1f36]/20">
                <h3
                  className="font-bold text-base sm:text-lg mb-1 text-[#1a1f36]"
                  style={{ fontFamily: "'Merriweather', Georgia, serif" }}
                >
                  {t('Page 12: Financial Projections')}
                </h3>
                <p className="text-xs text-[#4a5170] mb-4 leading-relaxed">
                  {t('3-year cash flow projection based on deterministic scoring core')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-white border border-[#1a1f36]/20">
                    <p className="text-xs uppercase font-mono text-[#4a5170]">{t('Year 1')}</p>
                    <p className="text-lg sm:text-xl font-bold text-[#3a6e4f] mt-1">₹4,85,000</p>
                    <p className="text-[11px] text-[#4a5170] mt-0.5">{t('Projected Net Surplus')}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-white border border-[#1a1f36]/20">
                    <p className="text-xs uppercase font-mono text-[#4a5170]">{t('Year 2')}</p>
                    <p className="text-lg sm:text-xl font-bold text-[#3a6e4f] mt-1">₹6,40,000</p>
                    <p className="text-[11px] text-[#4a5170] mt-0.5">{t('Projected Net Surplus')}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-white border border-[#1a1f36]/20">
                    <p className="text-xs uppercase font-mono text-[#4a5170]">{t('Year 3')}</p>
                    <p className="text-lg sm:text-xl font-bold text-[#3a6e4f] mt-1">₹8,25,000</p>
                    <p className="text-[11px] text-[#4a5170] mt-0.5">{t('Projected Net Surplus')}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-[#ebe4d6] border border-[#1a1f36]/20">
                <h3
                  className="font-bold text-base sm:text-lg mb-1 text-[#1a1f36]"
                  style={{ fontFamily: "'Merriweather', Georgia, serif" }}
                >
                  {t('Page 14: Market Intelligence')}
                </h3>
                <p className="text-xs text-[#4a5170] mb-4 leading-relaxed">
                  {t('Thirumangalam & Madurai craft corridor market analysis with confidence-tiered pricing')}
                </p>

                <div className="bg-white p-3 sm:p-4 border border-[#1a1f36]/20 space-y-2">
                  <p className="text-xs sm:text-sm">
                    {t('22K Gold Foil price:')}{' '}
                    <span className="font-bold text-[#1a1f36]">₹3,450/booklet</span>{' '}
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#e6f4ea] text-[#2d5a40] border border-[#3a6e4f] ml-2">
                      {t('LIVE')}
                    </span>
                  </p>
                  <p className="text-xs sm:text-sm">
                    {t('Framed 18"x14" Tanjore art price:')}{' '}
                    <span className="font-bold text-[#1a1f36]">₹19,200/piece</span>{' '}
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#e8f0fe] text-[#2d4870] border border-[#3a5a8a] ml-2">
                      {t('CROWDSOURCED')}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-[#1a1f36]/20 flex flex-col sm:flex-row justify-end gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setDprModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-semibold text-[#1a1f36] hover:bg-[#f4efe6] border border-[#1a1f36] cursor-pointer text-center"
              >
                {t('Close')}
              </button>
              <button
                type="button"
                onClick={handleDownloadSample}
                className="w-full sm:w-auto px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#3a6e4f] hover:bg-[#2d5a40] border border-[#1a1f36] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>{t('Download Sample (PDF)')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
