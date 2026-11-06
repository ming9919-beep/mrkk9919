import React from 'react';

export const GramophoneIllustration: React.FC = () => {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center pointer-events-none select-none">
      {/* Floating Animated Music Notes */}
      <span className="absolute -top-1 right-2 text-rose-500 font-bold text-xs animate-bounce drop-shadow-sm">
        ♪
      </span>
      <span className="absolute top-1 -left-1 text-amber-600 font-bold text-sm animate-pulse drop-shadow-sm">
        ♫
      </span>
      <span className="absolute -top-3 left-3 text-emerald-600 font-bold text-[10px] animate-bounce">
        ♩
      </span>

      {/* Retro Turntable Gramophone SVG */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wooden Cabinet Base */}
        <path
          d="M20 62 L80 62 L74 84 L14 84 Z"
          fill="#5a8b80"
          stroke="#355e54"
          strokeWidth="1.5"
        />
        <path
          d="M14 84 L74 84 L71 88 L11 88 Z"
          fill="#3e6a60"
        />
        {/* Wooden front panel line and knob */}
        <line x1="22" y1="72" x2="72" y2="72" stroke="#48786e" strokeWidth="1" />
        <circle cx="28" cy="78" r="2.5" fill="#e6c378" stroke="#96783c" strokeWidth="0.8" />
        <circle cx="60" cy="78" r="2.5" fill="#e6c378" stroke="#96783c" strokeWidth="0.8" />

        {/* Turntable Platter Deck */}
        <ellipse cx="48" cy="60" rx="26" ry="6.5" fill="#dfd6c0" stroke="#8c826e" strokeWidth="1" />
        <ellipse cx="48" cy="59.5" rx="21" ry="5" fill="#2d2d2d" />
        <ellipse cx="48" cy="59.5" rx="8" ry="2" fill="#c93838" />
        <circle cx="48" cy="59.5" r="1.5" fill="#ffffff" />

        {/* Tone Arm */}
        <path
          d="M68 58 Q66 52 56 55 L51 58"
          stroke="#b89344"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Gramophone Brass Horn Pipe Support */}
        <path
          d="M68 56 Q75 48 68 38"
          stroke="#b08a3e"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Large Vintage Brass Gramophone Horn */}
        {/* Outer Fluted Petals */}
        <path
          d="M68 38 Q58 20 40 22 Q24 24 22 36 Q22 46 36 50 Q52 52 68 38 Z"
          fill="url(#brassGrad)"
          stroke="#946a25"
          strokeWidth="1.2"
        />
        {/* Inner Horn Shadow / Cone Depth */}
        <ellipse
          cx="34"
          cy="36"
          rx="12"
          ry="11"
          fill="url(#innerHornGrad)"
          transform="rotate(-15 34 36)"
        />

        <defs>
          <linearGradient id="brassGrad" x1="20" y1="20" x2="70" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f3dd96" />
            <stop offset="0.45" stopColor="#dca84c" />
            <stop offset="0.85" stopColor="#b67f2b" />
            <stop offset="1" stopColor="#7a5214" />
          </linearGradient>
          <radialGradient id="innerHornGrad" cx="34" cy="36" r="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#442a0b" />
            <stop offset="0.7" stopColor="#704b19" />
            <stop offset="1" stopColor="#b98532" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
