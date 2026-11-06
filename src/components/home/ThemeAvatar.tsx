import React from 'react';

interface ThemeAvatarProps {
  themeId: string;
  onClick: () => void;
}

export const ThemeAvatar: React.FC<ThemeAvatarProps> = ({ themeId, onClick }) => {
  if (themeId === 'sixties') {
    return (
      <div
        onClick={onClick}
        className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/90 shadow-md bg-[#e3dcc8] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
        title="Change Theme & Profile"
      >
        {/* Tom-inspired retro cartoon cat SVG with sailor/newsboy cap */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Background circle */}
          <circle cx="50" cy="50" r="50" fill="#ded4be" />

          {/* Ears */}
          <polygon points="20,15 35,42 12,38" fill="#5c6f84" stroke="#374554" strokeWidth="2" />
          <polygon points="20,20 32,40 16,36" fill="#e8a8a8" />
          <polygon points="80,15 65,42 88,38" fill="#5c6f84" stroke="#374554" strokeWidth="2" />
          <polygon points="80,20 68,40 84,36" fill="#e8a8a8" />

          {/* Head */}
          <ellipse cx="50" cy="55" rx="36" ry="32" fill="#5c6f84" stroke="#374554" strokeWidth="2" />

          {/* White muzzle cheeks */}
          <ellipse cx="40" cy="64" rx="14" ry="12" fill="#fdfbf7" />
          <ellipse cx="60" cy="64" rx="14" ry="12" fill="#fdfbf7" />
          <ellipse cx="50" cy="58" rx="8" ry="6" fill="#fdfbf7" />

          {/* Pink Nose */}
          <ellipse cx="50" cy="57" rx="5" ry="3.5" fill="#e07272" />

          {/* Eyes */}
          <ellipse cx="37" cy="46" rx="6.5" ry="9" fill="#fbfbda" stroke="#374554" strokeWidth="1.5" />
          <ellipse cx="63" cy="46" rx="6.5" ry="9" fill="#fbfbda" stroke="#374554" strokeWidth="1.5" />
          {/* Pupils */}
          <ellipse cx="39" cy="46" rx="3.5" ry="5.5" fill="#2d5e38" />
          <ellipse cx="39" cy="46" rx="2" ry="3.5" fill="#111111" />
          <circle cx="41" cy="44" r="1.2" fill="#ffffff" />
          <ellipse cx="61" cy="46" rx="3.5" ry="5.5" fill="#2d5e38" />
          <ellipse cx="61" cy="46" rx="2" ry="3.5" fill="#111111" />
          <circle cx="63" cy="44" r="1.2" fill="#ffffff" />

          {/* Smile and mouth */}
          <path d="M42 66 Q50 72 58 66" stroke="#374554" strokeWidth="1.8" fill="none" />

          {/* Whiskers */}
          <line x1="22" y1="62" x2="6" y2="60" stroke="#374554" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="66" x2="8" y2="69" stroke="#374554" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="78" y1="62" x2="94" y2="60" stroke="#374554" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="78" y1="66" x2="92" y2="69" stroke="#374554" strokeWidth="1.5" strokeLinecap="round" />

          {/* Vintage Yellow/Navy Newsboy Cap tilted */}
          <ellipse cx="48" cy="24" rx="24" ry="10" fill="#f0ce62" stroke="#8c7020" strokeWidth="1.5" />
          <path d="M26 25 Q48 12 70 25 Q58 29 26 25 Z" fill="#d8b244" />
          <path d="M30 26 Q50 33 72 24" stroke="#685012" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="48" cy="19" r="3" fill="#8c7020" />
        </svg>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border-2 border-[#fff8e6]/85 bg-[radial-gradient(circle_at_35%_28%,#f0d88a_0_26%,#c98066_27%_48%,#385c5d_49%)] text-[16px] font-bold text-[#675344] shadow-[0_3px_10px_#292a2540] transition-transform active:scale-95"
      aria-hidden="true"
      title="Change Theme & Profile"
    >
      Y
    </div>
  );
};
