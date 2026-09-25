import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeftRight, TrendingUp, Check, Calendar, BarChart3, Minimize2, ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface MetricFiscalData {
  id: string;
  label: string;
  current: {
    displayValue: string;
    finalNum: number;
    decimals: number;
    prefix?: string;
    suffix: string;
    secondaryNum?: number;
    secondaryPrefix?: string;
    description: string;
  };
  previous: {
    displayValue: string;
    finalNum: number;
    decimals: number;
    prefix?: string;
    suffix: string;
    secondaryNum?: number;
    secondaryPrefix?: string;
    description: string;
  };
  yoyGrowth: string;
  yoyDelta: string;
  trend: 'up' | 'down' | 'neutral';
  isPositive: boolean;
  performanceNote: string;
  highlight?: boolean;
}

const METRIC_DATA: MetricFiscalData[] = [
  {
    id: 'admin_scale',
    label: 'National Administrative Scale',
    highlight: true,
    current: {
      displayValue: '36',
      finalNum: 36,
      decimals: 0,
      suffix: 'States & UTs',
      description: '36 (28 States and 8 Union Territories)',
    },
    previous: {
      displayValue: '36',
      finalNum: 36,
      decimals: 0,
      suffix: 'States & UTs',
      description: '36 (28 States and 8 Union Territories)',
    },
    yoyGrowth: '100% Saturation',
    yoyDelta: 'Stable Full Coverage',
    trend: 'neutral',
    isPositive: true,
    performanceNote: '100% pan-India administrative integration maintained across both fiscal years without disruption.',
  },
  {
    id: 'village_reach',
    label: 'Total Village Reach',
    current: {
      displayValue: '6.64',
      finalNum: 6.64,
      decimals: 2,
      suffix: 'Lakhs',
      description: 'Approximately 6.64 Lakhs (664,369 recorded rural jurisdictions across India)',
    },
    previous: {
      displayValue: '5.92',
      finalNum: 5.92,
      decimals: 2,
      suffix: 'Lakhs',
      description: '5.92 Lakhs (592,110 recorded rural habitations in FY 2024-25)',
    },
    yoyGrowth: '+12.2% YoY',
    yoyDelta: '+72,259 Villages Mapped',
    trend: 'up',
    isPositive: true,
    performanceNote: 'PMGSY-III GIS integration & LGD 2.0 expanded mapped rural footprint by over 72,000 habitations.',
  },
  {
    id: 'digital_infra',
    label: 'Grassroots Digital Infrastructure',
    current: {
      prefix: 'Over',
      displayValue: '2.5',
      finalNum: 2.5,
      decimals: 1,
      suffix: 'Lakh CSCs',
      description: 'Over 2.5 Lakh Common Service Centres (CSCs) deployed across Gram Panchayats nationwide',
    },
    previous: {
      prefix: 'Over',
      displayValue: '2.15',
      finalNum: 2.15,
      decimals: 2,
      suffix: 'Lakh CSCs',
      description: '2.15 Lakh Common Service Centres operational in FY 2024-25',
    },
    yoyGrowth: '+16.3% YoY',
    yoyDelta: '+35,000 New Centres',
    trend: 'up',
    isPositive: true,
    performanceNote: '35,000+ new Gram Panchayat digital delivery kiosks commissioned in the current fiscal year.',
  },
  {
    id: 'agent_workforce',
    label: 'Field Agent Workforce',
    current: {
      prefix: 'Over',
      displayValue: '5.5 - 6',
      finalNum: 5.5,
      secondaryNum: 6,
      secondaryPrefix: 'to',
      decimals: 1,
      suffix: 'Lakh+ VLEs',
      description: 'Over 5.5 to 6 Lakh+ active Village Level Entrepreneurs (VLEs) operating under CSC digital framework',
    },
    previous: {
      prefix: 'Over',
      displayValue: '4.8 - 5',
      finalNum: 4.8,
      secondaryNum: 5,
      secondaryPrefix: 'to',
      decimals: 1,
      suffix: 'Lakh+ VLEs',
      description: '4.8 to 5.0 Lakh active Village Level Entrepreneurs recorded in FY 2024-25',
    },
    yoyGrowth: '+18.8% YoY',
    yoyDelta: '+95,000 Active VLEs',
    trend: 'up',
    isPositive: true,
    performanceNote: 'Grassroots entrepreneur onboarding accelerated with 95,000+ certified local field partners.',
  },
];

export const StatisticsSection: React.FC = () => {
  const { t } = useLanguage();
  const statsTrackRef = useRef<HTMLDivElement | null>(null);
  const animatedRef = useRef<boolean>(false);

  // State to track individual card compare mode
  const [comparedCards, setComparedCards] = useState<Record<string, boolean>>({});

  const toggleCompare = (id: string) => {
    setComparedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const allCompared = METRIC_DATA.every((m) => comparedCards[m.id]);

  const toggleAllCompare = () => {
    if (allCompared) {
      setComparedCards({});
    } else {
      const all: Record<string, boolean> = {};
      METRIC_DATA.forEach((m) => {
        all[m.id] = true;
      });
      setComparedCards(all);
    }
  };

  useEffect(() => {
    function formatIndianNumber(x: number): string {
      const s = Math.round(x).toString();
      if (s.length <= 3) return s;
      const lastThree = s.substring(s.length - 3);
      const otherNumbers = s.substring(0, s.length - 3);
      return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
    }

    const triggerStatsCounterAnimation = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;

      const metricValues = statsTrackRef.current?.querySelectorAll<HTMLElement>('.stat-metric-value');
      if (!metricValues) return;

      metricValues.forEach((el) => {
        const target = parseFloat(el.dataset.final || '0');
        const isIndian = el.dataset.format === 'indian';
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const duration = 1600;
        const startCountTime = performance.now();

        function updateVal(currentTime: number) {
          const elapsed = currentTime - startCountTime;
          const progress = Math.min(1, elapsed / duration);
          const ease = 1 - Math.pow(1 - progress, 4);
          const current = target * ease;

          el.textContent = isIndian
            ? formatIndianNumber(current)
            : current.toFixed(decimals);

          if (progress < 1) {
            requestAnimationFrame(updateVal);
          } else {
            el.textContent = isIndian
              ? formatIndianNumber(target)
              : target.toFixed(decimals);
          }
        }

        requestAnimationFrame(updateVal);
      });
    };

    const currentTrack = statsTrackRef.current;
    if (!currentTrack) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerStatsCounterAnimation();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(currentTrack);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      aria-label="National Administrative Scale and Telemetry"
      className="stats-strip-section reveal visible border-y-2 border-[#191970]/30 py-8 px-4 sm:px-8 bg-[#faf6ee]"
      id="statistics"
    >
      <div className="stats-strip-container">
        {/* Brand Col */}
        <div className="stats-brand-col">
          <div className="stats-handwritten-title">
            <span>{t('Statistics')}</span>
            <svg
              aria-hidden="true"
              className="stats-curved-arrow"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 54 36"
            >
              <path d="M4 8 C14 26, 26 34, 38 20 C42 15, 46 8, 48 4" />
              <path d="M38 4 L48 4 L48 14" />
            </svg>
          </div>
          <div className="stats-sub-beacon">
            <span className="beacon-dot" />
            <span>{t('National Scale Telemetry')}</span>
          </div>

          {/* Master FY Comparison Toggle */}
          <button
            onClick={toggleAllCompare}
            className={`mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-md border transition-all duration-200 shadow-xs cursor-pointer ${
              allCompared
                ? 'bg-[#191970] text-white border-[#191970] hover:bg-[#121250]'
                : 'bg-white/80 text-[#191970] border-[#191970]/30 hover:bg-[#191970]/10'
            }`}
            title="Toggle comparative view for all metric cards"
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#ff6b2b]" />
            <span>{allCompared ? t('Reset Compare') || 'Reset Compare' : t('Compare FY 24-25') || 'Compare FY 24-25'}</span>
          </button>
        </div>

        {/* 4 Requested Metrics Track with Per-Card Compare Toggle */}
        <div className="stats-metrics-track" id="stats-counter-track" ref={statsTrackRef}>
          {METRIC_DATA.map((metric) => {
            const isComparing = !!comparedCards[metric.id];

            return (
              <div
                key={metric.id}
                className={`stat-metric-card ${metric.highlight ? 'highlight' : ''} ${
                  isComparing ? 'ring-2 ring-[#ff6b2b]/40 bg-white/90 shadow-md p-3.5' : ''
                } transition-all duration-300 relative group`}
              >
                {/* Header row with Label & Per-Card Compare Button */}
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="stat-metric-label !mt-0 line-clamp-1">{t(metric.label)}</span>
                  
                  {/* Single Card Compare Toggle Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCompare(metric.id);
                    }}
                    className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-all duration-150 cursor-pointer ${
                      isComparing
                        ? 'bg-[#ff6b2b] text-white border-[#ff6b2b] shadow-xs'
                        : 'bg-white/70 text-[#191970] border-[#191970]/25 hover:bg-[#191970] hover:text-white hover:border-[#191970]'
                    }`}
                    aria-label={`Compare ${metric.label} with previous fiscal year`}
                    title={`Toggle FY 2024-25 comparison for ${metric.label}`}
                  >
                    <ArrowLeftRight className="w-2.5 h-2.5" />
                    <span>{isComparing ? t('Close') || 'Close' : t('Compare') || 'Compare'}</span>
                  </button>
                </div>

                {/* Standard View */}
                {!isComparing ? (
                  <>
                    <div className="stat-metric-number-row items-baseline flex-wrap">
                      {metric.current.prefix && (
                        <span className="text-sm font-bold text-[#14120e] mr-1 self-center">
                          {t(metric.current.prefix)}
                        </span>
                      )}
                      <span
                        className="stat-metric-value"
                        data-decimals={metric.current.decimals}
                        data-final={metric.current.finalNum}
                      >
                        {metric.current.finalNum}
                      </span>
                      {metric.current.secondaryNum !== undefined && (
                        <>
                          <span className="text-sm font-bold text-[#FF671F] mx-1 self-center">
                            {t(metric.current.secondaryPrefix || 'to')}
                          </span>
                          <span
                            className="stat-metric-value"
                            data-decimals="0"
                            data-final={metric.current.secondaryNum}
                          >
                            {metric.current.secondaryNum}
                          </span>
                        </>
                      )}
                      <span className="stat-metric-suffix">{t(metric.current.suffix)}</span>

                      {/* Small visual up/down arrow indicator showing YoY change vs previous FY */}
                      <span
                        className={`inline-flex items-center gap-0.5 ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold self-center border shadow-xs transition-transform hover:scale-105 select-none ${
                          metric.trend === 'up'
                            ? 'bg-[#138808]/12 text-[#046A38] border-[#046A38]/30'
                            : metric.trend === 'down'
                            ? 'bg-[#dc2626]/12 text-[#b91c1c] border-[#dc2626]/30'
                            : 'bg-[#191970]/10 text-[#191970] border-[#191970]/25'
                        }`}
                        title={`FY 2025-26 vs FY 2024-25: ${metric.yoyGrowth} (${metric.yoyDelta})`}
                        aria-label={`${metric.trend === 'up' ? 'Increased' : metric.trend === 'down' ? 'Decreased' : 'Stable'} compared to previous fiscal year`}
                      >
                        {metric.trend === 'up' && <ArrowUp className="w-2.5 h-2.5 text-[#046A38] stroke-[2.75]" />}
                        {metric.trend === 'down' && <ArrowDown className="w-2.5 h-2.5 text-[#b91c1c] stroke-[2.75]" />}
                        {metric.trend === 'neutral' && <Minus className="w-2.5 h-2.5 text-[#191970] stroke-[2.5]" />}
                        <span className="leading-none">{metric.yoyGrowth.split(' ')[0]}</span>
                      </span>
                    </div>

                    <div className="stat-metric-subtext">
                      {t(metric.current.description)}
                    </div>
                  </>
                ) : (
                  /* Comparative View (Current FY 25-26 vs Previous FY 24-25) */
                  <div className="space-y-2 mt-1.5 animate-fadeIn">
                    {/* Growth Badge */}
                    <div className="flex items-center justify-between gap-1 pb-1 border-b border-dashed border-[#191970]/20">
                      <div className={`inline-flex items-center gap-1 text-[10.5px] font-bold px-1.5 py-0.5 rounded ${
                        metric.trend === 'up'
                          ? 'text-[#138808] bg-[#138808]/10'
                          : metric.trend === 'down'
                          ? 'text-[#dc2626] bg-[#dc2626]/10'
                          : 'text-[#191970] bg-[#191970]/10'
                      }`}>
                        {metric.trend === 'up' && <ArrowUp className="w-3 h-3 text-[#138808] stroke-[2.5]" />}
                        {metric.trend === 'down' && <ArrowDown className="w-3 h-3 text-[#dc2626] stroke-[2.5]" />}
                        {metric.trend === 'neutral' && <Minus className="w-2.5 h-2.5 text-[#191970] stroke-[2.5]" />}
                        <span>{metric.yoyGrowth}</span>
                      </div>
                      <span className="text-[9.5px] font-semibold text-[#615c52] tracking-wider uppercase">
                        {metric.yoyDelta}
                      </span>
                    </div>

                    {/* Side-by-side FY Numbers */}
                    <div className="grid grid-cols-2 gap-2 bg-[#faf6ee] p-2 rounded-lg border border-[#191970]/15">
                      {/* Current FY */}
                      <div className="border-r border-[#191970]/15 pr-1.5">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-[#191970] uppercase tracking-wide">
                          <Calendar className="w-2.5 h-2.5 text-[#ff6b2b]" />
                          <span>FY 25-26 (Curr)</span>
                        </div>
                        <div className="text-[16px] font-bold text-[#191970] leading-tight font-serif mt-0.5 flex items-center gap-1">
                          <span>
                            {metric.current.prefix ? `${metric.current.prefix} ` : ''}
                            {metric.current.displayValue}
                            <span className="text-[10.5px] font-sans font-bold text-[#ff6b2b] ml-0.5">
                              {metric.current.suffix.replace('States & UTs', 'States').replace('Lakh CSCs', 'L CSCs').replace('Lakh+ VLEs', 'L VLEs')}
                            </span>
                          </span>
                          {metric.trend === 'up' && (
                            <span title="Increased vs FY 24-25" className="inline-flex items-center">
                              <ArrowUp className="w-3 h-3 text-[#046A38] stroke-[2.5] inline-block shrink-0" />
                            </span>
                          )}
                          {metric.trend === 'down' && (
                            <span title="Decreased vs FY 24-25" className="inline-flex items-center">
                              <ArrowDown className="w-3 h-3 text-[#b91c1c] stroke-[2.5] inline-block shrink-0" />
                            </span>
                          )}
                          {metric.trend === 'neutral' && (
                            <span title="Stable full coverage" className="inline-flex items-center">
                              <Minus className="w-2.5 h-2.5 text-[#191970] stroke-[2.5] inline-block shrink-0" />
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Previous FY */}
                      <div className="pl-1">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-[#615c52] uppercase tracking-wide">
                          <span>FY 24-25 (Prev)</span>
                        </div>
                        <div className="text-[15px] font-bold text-[#4a453b] leading-tight font-serif mt-0.5">
                          {metric.previous.prefix ? `${metric.previous.prefix} ` : ''}
                          {metric.previous.displayValue}
                          <span className="text-[10px] font-sans font-semibold text-[#7c7567] ml-0.5">
                            {metric.previous.suffix.replace('States & UTs', 'States').replace('Lakh CSCs', 'L CSCs').replace('Lakh+ VLEs', 'L VLEs')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Comparative Performance Note */}
                    <p className="text-[9px] leading-snug text-[#4a453b] font-medium italic">
                      {t(metric.performanceNote)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
