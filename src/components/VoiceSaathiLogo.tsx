import React from 'react';

interface VoiceSaathiLogoProps {
  className?: string;
  size?: number | string;
  color?: string;
  accentColor?: string;
  showRays?: boolean;
}

/**
 * Official Voice Saathi Logo
 * Features the two high-fiving companion figures with celebration rays,
 * representing citizen-to-assistant partnership, trust, and empowerment.
 */
export const VoiceSaathiLogo: React.FC<VoiceSaathiLogoProps> = ({
  className = '',
  size = 28,
  color = 'currentColor',
  accentColor = '#FF671F',
  showRays = true,
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none shrink-0 ${className}`}
      aria-label="Voice Saathi Logo"
    >
      {/* 3 Radiating Celebration Rays at High Five Contact */}
      {showRays && (
        <g stroke={accentColor || color} strokeWidth="4.2" strokeLinecap="round">
          {/* Center Vertical Spark */}
          <line x1="50" y1="18" x2="50" y2="26" />
          {/* Left Angle Spark */}
          <line x1="42" y1="21" x2="46.5" y2="28" />
          {/* Right Angle Spark */}
          <line x1="58" y1="21" x2="53.5" y2="28" />
        </g>
      )}

      {/* Head of Left Companion Figure */}
      <circle
        cx="34"
        cy="39"
        r="7.5"
        stroke={color}
        strokeWidth="4.2"
        fill="none"
      />

      {/* Head of Right Companion Figure */}
      <circle
        cx="66"
        cy="39"
        r="7.5"
        stroke={color}
        strokeWidth="4.2"
        fill="none"
      />

      {/* Left Companion Figure: Outstretched Arm, High-Five Arm, Torso, and Legs */}
      <path
        d="
          M 29 49.5
          C 23 49.5, 17 50.5, 17 53.5
          C 17 56.5, 22 57.5, 29 57.5
          C 32.5 57.5, 34 56.5, 35.5 55
          L 34 66
          C 33 71, 28 77, 26 80
          C 24 83, 27 86, 30 85
          C 34 83.5, 37 76, 40 71
          C 42 67.5, 45 67.5, 46.5 71
          C 48 75.5, 49.5 83.5, 50 85
          C 50.5 84, 50 78, 49 71
          L 47.5 59
          C 48.5 54, 49.5 45, 50 37
          C 49 44, 42 50, 37 51
        "
        stroke={color}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Right Companion Figure: High-Five Arm, Outstretched Arm, Torso, and Legs */}
      <path
        d="
          M 71 49.5
          C 77 49.5, 83 50.5, 83 53.5
          C 83 56.5, 78 57.5, 71 57.5
          C 67.5 57.5, 66 56.5, 64.5 55
          L 66 66
          C 67 71, 72 77, 74 80
          C 76 83, 73 86, 70 85
          C 66 83.5, 63 76, 60 71
          C 58 67.5, 55 67.5, 53.5 71
          C 52 75.5, 50.5 83.5, 50 85
          C 49.5 84, 50 78, 51 71
          L 52.5 59
          C 51.5 54, 50.5 45, 50 37
          C 51 44, 58 50, 63 51
        "
        stroke={color}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Joined High-Five Clasp Contact Arch */}
      <path
        d="M 47.5 42 Q 50 35 52.5 42"
        stroke={color}
        strokeWidth="4.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
