import React, { useState } from 'react';

import { THEMES, type ThemeConfig } from '@/lib/homeThemes';

export type { ThemeConfig };
export { THEMES };

interface ThemeModalProps {
  onClose: () => void;
  activeThemeId: string;
  onSelectTheme: (theme: ThemeConfig) => void;
  lang: 'en' | 'kh';
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  onClose,
  activeThemeId,
  onSelectTheme,
  lang,
}) => {
  const [selectedId, setSelectedId] = useState(activeThemeId);
  const [activeTab, setActiveTab] = useState<'themes' | 'wallpaper' | 'home' | 'fontsize'>('themes');

  const handlePick = (theme: ThemeConfig) => {
    setSelectedId(theme.id);
  };

  const handleApply = () => {
    const chosen = THEMES.find((t) => t.id === selectedId) || THEMES[1];
    onSelectTheme(chosen);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 bg-black/55 backdrop-blur-[2px] transition-all"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] bg-[#f7f5ed] rounded-t-[32px] pt-3 pb-8 px-5 shadow-2xl text-[#463e35] select-none animate-[slideUp_0.26s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}</style>

        {/* Modal Handle */}
        <div className="w-9 h-1 bg-[#d4cbbb] rounded-full mx-auto mb-3" />

        {/* Title: សណ្ឋាន */}
        <div className="mb-3.5 px-1">
          <h2 className="text-[19px] font-bold font-['Noto_Sans_Khmer','DM_Sans'] text-[#3e3831] tracking-tight">
            {lang === 'kh' ? 'សណ្ឋាន' : 'Appearance'}
          </h2>
        </div>

        {/* Segmented Pill Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#eae4d3] rounded-full mb-5 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => {
              setActiveTab('themes');
            }}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'themes'
                ? 'bg-white text-[#3e3831] shadow-sm'
                : 'text-[#766b5f] hover:text-[#3e3831]'
            }`}
          >
            {lang === 'kh' ? 'ម៉ូដរចនា' : 'Themes'}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('wallpaper');
            }}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'wallpaper'
                ? 'bg-white text-[#3e3831] shadow-sm'
                : 'text-[#766b5f] hover:text-[#3e3831]'
            }`}
          >
            {lang === 'kh' ? 'ផ្ទៃខាងក្រោយ' : 'Wallpaper'}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('home');
            }}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'home'
                ? 'bg-white text-[#3e3831] shadow-sm'
                : 'text-[#766b5f] hover:text-[#3e3831]'
            }`}
          >
            {lang === 'kh' ? 'អេក្រង់ដើម' : 'Home'}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('fontsize');
            }}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'fontsize'
                ? 'bg-white text-[#3e3831] shadow-sm'
                : 'text-[#766b5f] hover:text-[#3e3831]'
            }`}
          >
            {lang === 'kh' ? 'ទំហំអក្សរ' : 'Font Size'}
          </button>
        </div>

        {/* Carousel of Themes */}
        <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-3 pt-1 px-1 -mx-1 snap-x">
          {THEMES.map((theme) => {
            const isSelected = selectedId === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => handlePick(theme)}
                className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer snap-center group"
              >
                {/* Mini Smartphone Frame Preview */}
                <div
                  className={`relative w-[114px] h-[196px] rounded-[24px] overflow-hidden transition-all duration-200 bg-stone-800 ${
                    isSelected
                      ? 'ring-[3px] ring-[#00bcd4] ring-offset-2 ring-offset-[#f7f5ed] scale-[1.02]'
                      : 'border border-[#d4cbbb]/80 opacity-90 group-hover:opacity-100'
                  }`}
                >
                  {/* Background Image of the Theme */}
                  <img
                    src={theme.bgImage}
                    alt={theme.khName}
                    className="w-full h-full object-cover"
                  />

                  {/* Top camera hole */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-black/80 border border-white/20" />

                  {/* Mini Card Elements to mirror real homepage */}
                  <div className="absolute inset-x-2 top-8 rounded-lg bg-white/85 p-1.5 shadow-sm space-y-1">
                    <div className="w-10 h-1.5 rounded-full bg-stone-300" />
                    <div className="flex justify-between items-center pt-0.5">
                      <div className="w-7 h-2 rounded bg-stone-400" />
                      {theme.balanceIllustration === 'gramophone' && (
                        <div className="text-[9px] leading-none">📻</div>
                      )}
                    </div>
                  </div>

                  {/* Mini Grid Buttons */}
                  <div className="absolute inset-x-2 top-20 grid grid-cols-2 gap-1">
                    <div className="h-6 rounded bg-white/85 flex items-center justify-center text-[7px] text-stone-600 font-bold">
                      {theme.id === 'sixties' ? 'គណនី' : '•••'}
                    </div>
                    <div className="h-6 rounded bg-white/85 flex items-center justify-center text-[7px] text-stone-600 font-bold">
                      {theme.id === 'sixties' ? 'កាត' : '•••'}
                    </div>
                    <div className="h-6 rounded bg-white/85 flex items-center justify-center text-[7px] text-stone-600 font-bold">
                      {theme.id === 'sixties' ? 'ទូទាត់' : '•••'}
                    </div>
                    <div className="h-6 rounded bg-white/85 flex items-center justify-center text-[7px] text-stone-600 font-bold">
                      •••
                    </div>
                  </div>

                  {/* Car at bottom for 60s */}
                  {theme.id === 'sixties' && (
                    <div className="absolute bottom-1 inset-x-2 text-center text-[10px] drop-shadow">
                      🚘
                    </div>
                  )}
                </div>

                {/* Theme Name below phone */}
                <span
                  className={`text-xs font-bold font-['Noto_Sans_Khmer','DM_Sans'] transition-colors ${
                    isSelected ? 'text-[#00bcd4]' : 'text-[#584c41]'
                  }`}
                >
                  {lang === 'kh' ? theme.khName : theme.enName}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-[#e8e2d2]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('themes')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white text-[#463e35] text-xs font-semibold shadow-sm border border-[#e2dccb] hover:bg-[#fffdf7]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#00bcd4]" />
              <span>{lang === 'kh' ? 'សណ្ឋាន' : 'Themes'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
              setActiveTab('wallpaper');
              }}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-transparent text-[#6e6355] text-xs font-semibold hover:bg-black/5"
            >
              <span>+</span>
              <span>{lang === 'kh' ? 'ផ្ទាំងវិចិត្រ' : 'Custom'}</span>
            </button>
          </div>

          {/* Gradient Apply Button: រួចរាល់ */}
          <button
            type="button"
            onClick={handleApply}
            className="px-6 py-2.5 rounded-full text-white font-bold text-xs shadow-md active:scale-95 transition-transform"
            style={{
              background: 'linear-gradient(135deg, #d85c7a, #764b8e)',
            }}
          >
            {lang === 'kh' ? 'រួចរាល់' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
