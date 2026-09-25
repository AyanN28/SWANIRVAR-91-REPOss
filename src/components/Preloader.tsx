import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
  durationSeconds?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  durationSeconds = 5,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(durationSeconds);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Countdown timer
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Timeout to trigger smooth fade-out and unmount
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 900); // 900ms smooth cinematic fade & scale transition
    }, durationSeconds * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [durationSeconds, onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] w-screen h-screen flex flex-col items-center justify-center bg-[#f5efe1] select-none overflow-hidden transition-all duration-900 ease-out ${
        isFadingOut
          ? 'opacity-0 scale-105 filter blur-xs pointer-events-none'
          : 'opacity-100 scale-100 filter-none'
      }`}
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <style>{`
        @keyframes chakraSpinSmooth {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes chakraPulseZoom {
          0% { transform: scale(0.88); }
          50% { transform: scale(1.22); }
          100% { transform: scale(0.88); }
        }

        @keyframes ambientLightPulse {
          0%, 100% {
            transform: scale(0.96);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.95;
          }
        }

        @keyframes progressTick5s {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        @keyframes silkSheenWave {
          0% {
            transform: translateX(-400px) skewX(-20deg);
            opacity: 0;
          }
          15% {
            opacity: 0.45;
          }
          50% {
            opacity: 0.65;
          }
          85% {
            opacity: 0.35;
          }
          100% {
            transform: translateX(850px) skewX(-20deg);
            opacity: 0;
          }
        }

        .ambient-light-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 800px;
          height: 480px;
          margin-top: -240px;
          margin-left: -400px;
          border-radius: 50%;
          background: radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 245, 225, 0.6) 38%, rgba(245, 235, 215, 0.3) 65%, transparent 80%);
          pointer-events: none;
          filter: blur(35px);
          animation: ambientLightPulse 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .paper-texture {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.45;
          background-image: 
            radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.7) 0%, transparent 60%),
            radial-gradient(circle at 15% 20%, rgba(255, 103, 31, 0.03) 0%, transparent 45%),
            radial-gradient(circle at 85% 80%, rgba(4, 106, 56, 0.03) 0%, transparent 45%);
        }

        .swanirvar-svg {
          width: clamp(320px, 78vw, 880px);
          height: auto;
          overflow: visible;
        }

        .wordmark-static {
          fill: url(#wordmarkTirangaGrad);
          filter: drop-shadow(0 2px 4px rgba(45, 35, 20, 0.12));
        }

        .sheen-sweeper {
          animation: silkSheenWave 3.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          mix-blend-mode: soft-light;
          pointer-events: none;
        }

        .chakra-spinner-inst {
          transform-origin: 380px 48px;
          animation: chakraSpinSmooth 24s linear infinite;
        }

        .timeline-progress-bar {
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, #FF671F 0%, #d8caa9 48%, #FFFFFF 52%, #046A38 100%);
          box-shadow: 0 0 10px rgba(255, 103, 31, 0.4);
          transform-origin: left;
          animation: progressTick5s 5s linear forwards;
        }
      `}</style>

      {/* Top right skip button with timer indicator */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={handleSkip}
          className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-mono font-bold text-[#191970] border border-[#191970]/30 shadow-xs cursor-pointer transition-all hover:scale-105 flex items-center gap-2"
        >
          <span>Skip ({secondsRemaining}s)</span>
          <span className="text-[10px]">→</span>
        </button>
      </div>

      {/* 16:9 Landscape Cinema Stage */}
      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
        {/* Warm Heritage paper texture & ambient radial glow */}
        <div className="paper-texture" />
        <div className="ambient-light-glow" />

        {/* Primary Centered Tiranga Logo with Flag Waving Effect */}
        <div
          className="relative flex items-center justify-center z-10 select-none"
          style={{ width: '100%', maxWidth: '100vw', padding: '0 1.25rem', boxSizing: 'border-box' }}
        >
          <svg
            className="swanirvar-svg"
            fill="none"
            viewBox="0 0 760 170"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter height="145%" id="crispWordmarkShadow" width="130%" x="-15%" y="-20%">
                <feDropShadow dx="0" dy="2.5" floodColor="#1d1912" floodOpacity="0.35" stdDeviation="3" />
                <feDropShadow dx="0" dy="8" floodColor="#302618" floodOpacity="0.18" stdDeviation="10" />
              </filter>
              <linearGradient id="wordmarkTirangaGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#E65100" />
                <stop offset="22%" stopColor="#FF671F" />
                <stop offset="36%" stopColor="#FFF9F0" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="64%" stopColor="#F0FFF4" />
                <stop offset="78%" stopColor="#046A38" />
                <stop offset="100%" stopColor="#024724" />
              </linearGradient>
              <linearGradient id="stemTirangaGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#FF671F" />
                <stop offset="44%" stopColor="#FFFFFF" />
                <stop offset="56%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#046A38" />
              </linearGradient>
              <linearGradient id="shimmerLightBeam" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.12" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
              <clipPath id="swanirvarLetterClip">
                <path d="M 48 128 C 30 128 16 120 14 102 L 28 100 C 29 110 37 116 48 116 C 59 116 66 110 66 102 C 66 94 60 90 46 86 C 26 80 17 72 17 57 C 17 42 30 32 47 32 C 63 32 74 40 76 54 L 62 56 C 61 48 55 44 46 44 C 37 44 31 49 31 56 C 31 63 36 67 49 71 C 70 77 80 84 80 101 C 80 117 67 128 48 128 Z M 95 34 L 110 34 L 124 98 L 139 34 L 153 34 L 168 98 L 182 34 L 197 34 L 176 126 L 160 126 L 146 64 L 132 126 L 116 126 Z M 217 34 L 233 34 L 263 126 L 247 126 L 240 103 L 210 103 L 203 126 L 187 126 Z M 214 89 L 236 89 L 225 53 Z M 283 34 L 298 34 L 334 100 L 334 34 L 349 34 L 349 126 L 334 126 L 298 60 L 298 126 L 283 126 Z M 372.5 79 L 387.5 79 L 387.5 126 L 372.5 126 Z M 411 34 L 443 34 C 460 34 470 44 470 59 C 470 71 462 80 449 83 L 472 126 L 456 126 L 435 85 L 426 85 L 426 126 L 411 126 Z M 426 72 L 442 72 C 450 72 455 67 455 59 C 455 51 450 47 442 47 L 426 47 Z M 487 34 L 503 34 L 525 102 L 547 34 L 563 34 L 533 126 L 517 126 Z M 583 34 L 599 34 L 629 126 L 613 126 L 606 103 L 576 103 L 569 126 L 553 126 Z M 580 89 L 602 89 L 591 53 Z M 649 34 L 681 34 C 698 34 708 44 708 59 C 708 71 700 80 687 83 L 710 126 L 694 126 L 673 85 L 664 85 L 664 126 L 649 126 Z M 664 72 L 680 72 C 688 72 693 67 693 59 C 693 51 688 47 680 47 L 664 47 Z" />
              </clipPath>
            </defs>
            <g>
              <g>
                <path
                  className="wordmark-static"
                  d="M 48 128 C 30 128 16 120 14 102 L 28 100 C 29 110 37 116 48 116 C 59 116 66 110 66 102 C 66 94 60 90 46 86 C 26 80 17 72 17 57 C 17 42 30 32 47 32 C 63 32 74 40 76 54 L 62 56 C 61 48 55 44 46 44 C 37 44 31 49 31 56 C 31 63 36 67 49 71 C 70 77 80 84 80 101 C 80 117 67 128 48 128 Z"
                  stroke="#1e3a8a"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </g>
              <g>
                <path
                  className="wordmark-static"
                  d="M 95 34 L 110 34 L 124 98 L 139 34 L 153 34 L 168 98 L 182 34 L 197 34 L 176 126 L 160 126 L 146 64 L 132 126 L 116 126 Z"
                  stroke="#1e3a8a"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </g>
              <g>
                <path
                  className="wordmark-static"
                  d="M 217 34 L 233 34 L 263 126 L 247 126 L 240 103 L 210 103 L 203 126 L 187 126 Z M 214 89 L 236 89 L 225 53 Z"
                  stroke="#1e3a8a"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </g>
              <g>
                <path
                  className="wordmark-static"
                  d="M 283 34 L 298 34 L 334 100 L 334 34 L 349 34 L 349 126 L 334 126 L 298 60 L 298 126 L 283 126 Z"
                  stroke="#1e3a8a"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </g>
              <g>
                <path
                  d="M 372.5 79 L 387.5 79 L 387.5 126 L 372.5 126 Z"
                  fill="url(#stemTirangaGrad)"
                  filter="drop-shadow(0 2px 4px rgba(45, 35, 20, 0.12))"
                  stroke="#1e3a8a"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </g>
              <g>
                <path
                  className="wordmark-static"
                  d="M 411 34 L 443 34 C 460 34 470 44 470 59 C 470 71 462 80 449 83 L 472 126 L 456 126 L 435 85 L 426 85 L 426 126 L 411 126 Z M 426 72 L 442 72 C 450 72 455 67 455 59 C 455 51 450 47 442 47 L 426 47 Z"
                  stroke="#1e3a8a"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </g>
              <g>
                <path
                  className="wordmark-static"
                  d="M 487 34 L 503 34 L 525 102 L 547 34 L 563 34 L 533 126 L 517 126 Z"
                  stroke="#1e3a8a"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </g>
              <g>
                <path
                  className="wordmark-static"
                  d="M 583 34 L 599 34 L 629 126 L 613 126 L 606 103 L 576 103 L 569 126 L 553 126 Z M 580 89 L 602 89 L 591 53 Z"
                  stroke="#1e3a8a"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </g>
              <g>
                <path
                  className="wordmark-static"
                  d="M 649 34 L 681 34 C 698 34 708 44 708 59 C 708 71 700 80 687 83 L 710 126 L 694 126 L 673 85 L 664 85 L 664 126 L 649 126 Z M 664 72 L 680 72 C 688 72 693 67 693 59 C 693 51 688 47 680 47 L 664 47 Z"
                  stroke="#1e3a8a"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </g>
            </g>
            <g clipPath="url(#swanirvarLetterClip)" pointerEvents="none">
              <rect
                className="sheen-sweeper"
                fill="url(#shimmerLightBeam)"
                height="120"
                transform="skewX(-24)"
                width="140"
                x="0"
                y="20"
              />
            </g>
            <g
              className="chakra-clean-unit"
              style={{
                transformOrigin: '380px 48px',
                animation: 'chakraPulseZoom 3.5s ease-in-out infinite alternate',
              }}
            >
              <circle cx="380" cy="48" fill="#ffffff" r="19.5" />
              <circle cx="380" cy="48" fill="none" r="18" stroke="#000080" strokeWidth="1.8" />
              <circle
                cx="380"
                cy="48"
                fill="none"
                opacity="0.85"
                r="15.2"
                stroke="#000080"
                strokeDasharray="0.6, 2.75"
                strokeWidth="0.5"
              />
              <g className="chakra-spinner-inst">
                <g stroke="#000080" strokeLinecap="round" strokeWidth="0.85">
                  <line x1="380" x2="380" y1="48" y2="30" />
                  <line x1="380" x2="384.66" y1="48" y2="30.61" />
                  <line x1="380" x2="389" y1="48" y2="32.41" />
                  <line x1="380" x2="392.73" y1="48" y2="35.27" />
                  <line x1="380" x2="395.59" y1="48" y2="39.0" />
                  <line x1="380" x2="397.39" y1="48" y2="43.34" />
                  <line x1="380" x2="398" y1="48" y2="48" />
                  <line x1="380" x2="397.39" y1="48" y2="52.66" />
                  <line x1="380" x2="395.59" y1="48" y2="57.0" />
                  <line x1="380" x2="392.73" y1="48" y2="60.73" />
                  <line x1="380" x2="389" y1="48" y2="63.59" />
                  <line x1="380" x2="384.66" y1="48" y2="65.39" />
                  <line x1="380" x2="380" y1="48" y2="66" />
                  <line x1="380" x2="375.34" y1="48" y2="65.39" />
                  <line x1="380" x2="371" y1="48" y2="63.59" />
                  <line x1="380" x2="367.27" y1="48" y2="60.73" />
                  <line x1="380" x2="364.41" y1="48" y2="57.0" />
                  <line x1="380" x2="362.61" y1="48" y2="52.66" />
                  <line x1="380" x2="362" y1="48" y2="48" />
                  <line x1="380" x2="362.61" y1="48" y2="43.34" />
                  <line x1="380" x2="364.41" y1="48" y2="39.0" />
                  <line x1="380" x2="367.27" y1="48" y2="35.27" />
                  <line x1="380" x2="371" y1="48" y2="32.41" />
                  <line x1="380" x2="375.34" y1="48" y2="30.61" />
                </g>
                <circle cx="380" cy="48" fill="#000080" r="5.2" />
                <circle cx="380" cy="48" fill="#ffffff" r="4.2" />
                <circle cx="380" cy="48" fill="#000080" r="2.2" />
              </g>
              <g fill="#000080">
                <circle cx="380" cy="30.2" r="0.75" />
                <circle cx="384.6" cy="30.8" r="0.75" />
                <circle cx="388.9" cy="32.6" r="0.75" />
                <circle cx="392.6" cy="35.4" r="0.75" />
                <circle cx="395.4" cy="39.1" r="0.75" />
                <circle cx="397.2" cy="43.4" r="0.75" />
                <circle cx="397.8" cy="48.0" r="0.75" />
                <circle cx="397.2" cy="52.6" r="0.75" />
                <circle cx="395.4" cy="56.9" r="0.75" />
                <circle cx="392.6" cy="60.6" r="0.75" />
                <circle cx="388.9" cy="63.4" r="0.75" />
                <circle cx="384.6" cy="65.2" r="0.75" />
                <circle cx="380" cy="65.8" r="0.75" />
                <circle cx="375.4" cy="65.2" r="0.75" />
                <circle cx="371.1" cy="63.4" r="0.75" />
                <circle cx="367.4" cy="60.6" r="0.75" />
                <circle cx="364.6" cy="56.9" r="0.75" />
                <circle cx="362.8" cy="52.6" r="0.75" />
                <circle cx="362.2" cy="48.0" r="0.75" />
                <circle cx="362.8" cy="43.4" r="0.75" />
                <circle cx="364.6" cy="39.1" r="0.75" />
                <circle cx="367.4" cy="35.4" r="0.75" />
                <circle cx="371.1" cy="32.6" r="0.75" />
                <circle cx="375.4" cy="30.8" r="0.75" />
              </g>
            </g>
          </svg>
        </div>

        {/* 10-Second Progression Indicator with charcoal text and Tiranga accents */}
        <div
          className="absolute flex flex-col items-center select-none"
          style={{
            width: 'min(90vw, 460px)',
            bottom: '48px',
            left: '50%',
            transform: 'translateX(-50%)',
            gap: '14px',
            opacity: 1,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '9999px',
              background: 'rgba(74, 70, 62, 0.2)',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.12)',
              overflow: 'hidden',
            }}
          >
            <div className="timeline-progress-bar" style={{ borderRadius: '9999px' }} />
          </div>

          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'rgb(45, 38, 30)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              A new way towards aatmanirbhar BHARAT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
