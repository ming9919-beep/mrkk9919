import React from 'react';

/**
 * High fidelity retro 1960s Cambodian style icons matching the ABA Mobile theme screenshot
 */

export const RetroCompactIcon: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Open top lid with mirror */}
    <g transform="rotate(-25 24 24)">
      <ellipse cx="24" cy="18" rx="14" ry="7" fill="#698e88" stroke="#364d48" strokeWidth="1.8" />
      <ellipse cx="24" cy="18" rx="11" ry="5" fill="#c3deda" stroke="#87aba4" strokeWidth="1" />
      {/* Mirror reflection shine */}
      <path d="M19 18 Q24 15 28 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Hinge joint */}
    <rect x="22" y="24" width="7" height="4" rx="1.5" fill="#e09765" stroke="#4a3627" strokeWidth="1.2" />

    {/* Bottom powder compact case */}
    <ellipse cx="34" cy="38" rx="16" ry="12" fill="#ef9d73" stroke="#4a3627" strokeWidth="2" />
    <ellipse cx="34" cy="38" rx="14" ry="10" fill="#fbe8d5" stroke="#d5865a" strokeWidth="1" />

    {/* Dark interior base & dual powder wells */}
    <ellipse cx="34" cy="38" rx="12" ry="8.5" fill="#322c28" />
    <ellipse cx="29" cy="38" rx="4.5" ry="5.5" fill="#4d5f66" stroke="#25211e" strokeWidth="0.8" />
    <ellipse cx="39" cy="38" rx="4.5" ry="5.5" fill="#e2c8a2" stroke="#25211e" strokeWidth="0.8" />
  </svg>
);

export const RetroTicketIcon: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ticket with perforated scalloped side edges */}
    <g transform="rotate(-4 32 32)">
      {/* Background teal ticket body */}
      <path
        d="M14 20 C14 20, 18 20, 18 24 C18 28, 14 28, 14 28 L14 42 C14 42, 18 42, 18 46 C18 50, 14 50, 14 50 L50 50 C50 50, 46 50, 46 46 C46 42, 50 42, 50 42 L50 28 C50 28, 46 28, 46 24 C46 20, 50 20, 50 20 Z"
        fill="#5a8b84"
        stroke="#304e4a"
        strokeWidth="1.8"
      />
      {/* Inner dotted border */}
      <rect
        x="18"
        y="23"
        width="28"
        height="24"
        rx="2"
        fill="#edd8b4"
        stroke="#8b7352"
        strokeWidth="1.2"
        strokeDasharray="2 1.5"
      />
      {/* Peach Center Label */}
      <rect x="21" y="26" width="22" height="18" rx="3" fill="#ef9e7b" stroke="#bc6842" strokeWidth="1" />

      {/* Khmer numbers: ១៥២០ (1520) */}
      <text
        x="32"
        y="39"
        fill="#9e2a2b"
        fontSize="11"
        fontWeight="bold"
        fontFamily="sans-serif"
        textAnchor="middle"
        letterSpacing="0.5"
      >
        ១៥២០
      </text>
    </g>
  </svg>
);

export const RetroCashIcon: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fanned out banknotes */}
    {/* Note 1 (back) */}
    <g transform="rotate(-15 30 36)">
      <rect x="18" y="22" width="28" height="17" rx="2" fill="#4d7c75" stroke="#2a4541" strokeWidth="1.2" />
      <rect x="20" y="24" width="24" height="13" fill="#69968e" />
    </g>
    {/* Note 2 (middle) */}
    <g transform="rotate(-4 32 36)">
      <rect x="18" y="23" width="28" height="17" rx="2" fill="#669890" stroke="#2a4541" strokeWidth="1.2" />
      <rect x="20" y="25" width="24" height="13" fill="#88b5ad" />
    </g>
    {/* Note 3 (front, warm cream/tan bill) */}
    <g transform="rotate(8 34 36)">
      <rect x="19" y="23" width="28" height="17" rx="2" fill="#ebdcb7" stroke="#4d3a24" strokeWidth="1.5" />
      <rect x="21" y="25" width="24" height="13" fill="#f5eddc" stroke="#b0966b" strokeWidth="0.8" />
      <circle cx="33" cy="31.5" r="3.5" fill="#dfc093" />
    </g>

    {/* Gold coin on top with Riel symbol ៛ */}
    <circle cx="24" cy="22" r="3" fill="#e9a850" stroke="#8c581e" strokeWidth="1" />
    <circle cx="46" cy="28" r="8.5" fill="#f3ba5d" stroke="#8c581e" strokeWidth="1.6" />
    <circle cx="46" cy="28" r="6.8" fill="#f8cd79" stroke="#b67e31" strokeWidth="0.8" />
    <text
      x="46"
      y="32"
      fill="#b83824"
      fontSize="11"
      fontWeight="900"
      fontFamily="'Noto Sans Khmer', sans-serif"
      textAnchor="middle"
    >
      ៛
    </text>
  </svg>
);

export const RetroCameraIcon: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Vintage teal box camera */}
    {/* Body */}
    <rect x="12" y="24" width="40" height="26" rx="4" fill="#669b93" stroke="#2b4743" strokeWidth="1.8" />
    {/* Top Plate */}
    <rect x="12" y="21" width="40" height="6" rx="2" fill="#ecd9b6" stroke="#2b4743" strokeWidth="1.5" />
    {/* Shutter button & dials */}
    <rect x="16" y="18" width="5" height="3" rx="1" fill="#e26d5c" stroke="#2b4743" strokeWidth="1" />
    <rect x="42" y="19" width="6" height="2" rx="1" fill="#9c7a4b" stroke="#2b4743" strokeWidth="1" />
    {/* Viewfinder window */}
    <rect x="26" y="23" width="6" height="3" rx="0.5" fill="#2b4743" />

    {/* Camera Lens */}
    <circle cx="36" cy="37" r="10.5" fill="#ebd6b0" stroke="#2b4743" strokeWidth="1.5" />
    <circle cx="36" cy="37" r="8" fill="#e2725b" stroke="#2b4743" strokeWidth="1.2" />
    <circle cx="36" cy="37" r="5" fill="#325450" />
    <circle cx="37.5" cy="35.5" r="1.5" fill="#ffffff" />
  </svg>
);

export const RetroAlbumIcon: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Vinyl Record peeking out to the right */}
    <circle cx="42" cy="34" r="14" fill="#262626" stroke="#111111" strokeWidth="1.2" />
    <circle cx="42" cy="34" r="10" stroke="#3b3b3b" strokeWidth="0.8" fill="none" />
    <circle cx="42" cy="34" r="6.5" fill="#df5c52" />
    <circle cx="42" cy="34" r="2" fill="#fdfdfd" />

    {/* Square Album Sleeve */}
    <rect x="12" y="20" width="28" height="28" rx="2" fill="#ecd49f" stroke="#4a3b22" strokeWidth="1.8" />
    {/* Sunrise graphic on album */}
    <rect x="14" y="22" width="24" height="24" rx="1" fill="#7ba5a0" />
    {/* Sun rays */}
    <circle cx="26" cy="36" r="6" fill="#f2c159" stroke="#b47c23" strokeWidth="0.8" />
    <path d="M26 25 L26 28 M19 28 L21 30 M33 28 L31 30" stroke="#ecd49f" strokeWidth="1.2" strokeLinecap="round" />
    {/* Waves */}
    <path d="M14 38 Q20 36 26 38 Q32 40 38 38 L38 46 L14 46 Z" fill="#4d7c76" />
  </svg>
);

export const RetroSuitcaseIcon: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Leather handle */}
    <path d="M26 21 Q32 16 38 21" stroke="#87562f" strokeWidth="2.5" strokeLinecap="round" fill="none" />

    {/* Trunk / Suitcase Body */}
    <rect x="14" y="22" width="36" height="25" rx="4" fill="#699e96" stroke="#2e4844" strokeWidth="1.8" />

    {/* Reinforced Leather Corners */}
    <path d="M14 26 L18 22 L14 22 Z" fill="#9c6d48" />
    <path d="M50 26 L46 22 L50 22 Z" fill="#9c6d48" />
    <path d="M14 43 L18 47 L14 47 Z" fill="#9c6d48" />
    <path d="M50 43 L46 47 L50 47 Z" fill="#9c6d48" />

    {/* Metal clasps */}
    <rect x="22" y="22" width="3" height="4" fill="#e6c378" stroke="#87562f" strokeWidth="0.6" />
    <rect x="39" y="22" width="3" height="4" fill="#e6c378" stroke="#87562f" strokeWidth="0.6" />

    {/* White / Cream front plaque */}
    <rect x="20" y="28" width="24" height="13" rx="2" fill="#f8f5eb" stroke="#a4977f" strokeWidth="0.8" />

    {/* Upward Trending Red Line with Arrow */}
    <path
      d="M23 37 L29 32 L34 35 L40 29"
      stroke="#d84c43"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <polygon points="41,27 38,32 41,31 43,30" fill="#d84c43" />
  </svg>
);
