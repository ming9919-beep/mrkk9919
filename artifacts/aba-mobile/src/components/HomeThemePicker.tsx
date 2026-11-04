import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Palette, X } from 'lucide-react';
import angkorWallpaper from '../assets/angkor-home.svg?url';

export const HOME_THEMES = [
  { id: 'classic', name: 'បែបដើម', background: '#F3F2F7', account: '#E8002D', category: 'popular' },
  { id: 'garden', name: 'សួនបៃតង', background: '#E3EBDD', account: '#78947D', category: 'nature' },
  { id: 'sunrise', name: 'អង្គរពេលល្ងាច', background: '#F1E2D6', account: '#AC735C', category: 'festival' },
  { id: 'sky', name: 'មេឃស្រស់', background: '#E1EDF3', account: '#60869C', category: 'nature' },
  { id: 'angkor', name: 'ទេសភាពអង្គរ', background: '#84928A', account: '#F5F1E4', category: 'wallpaper' },
] as const;

export type HomeThemeId = (typeof HOME_THEMES)[number]['id'];

const categories = [
  { id: 'all', label: 'ទាំងអស់' },
  { id: 'popular', label: 'ពេញនិយម' },
  { id: 'nature', label: 'ធម្មជាតិ' },
  { id: 'festival', label: 'បុណ្យ និងវប្បធម៌' },
] as const;

function ThemePreview({ theme }: { theme: (typeof HOME_THEMES)[number] }) {
  return (
    <div
      className="relative aspect-[0.58] overflow-hidden rounded-[15px] p-2.5"
      style={{
        backgroundColor: theme.background,
        ...(theme.id === 'angkor'
          ? {
              backgroundImage: `linear-gradient(rgba(49, 62, 53, .28), rgba(87, 67, 52, .35)), url(${angkorWallpaper})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }
          : {}),
      }}
    >
      {theme.id !== 'angkor' && (
        <div className="absolute inset-0 overflow-hidden opacity-20" aria-hidden="true">
          <svg viewBox="0 0 120 180" className="absolute right-0 top-3 h-28 w-20">
            <path d="M58 31 71 8l13 23 10 13H48zM45 46h50v8H45zM39 54h62v8H39zM48 62h44v42H48zM34 104h72v8H34zM28 112h84v8H28z" fill="#806D50" />
            <path d="M58 68h8v36h-8zm18 0h8v36h-8z" fill={theme.background} />
            <path d="M18 146h84" stroke="#806D50" strokeWidth="3" strokeLinecap="round" />
            <path d="m22 146 12-14 12 14m28 0 10-12 12 12" fill="none" stroke="#806D50" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      )}
      <div className="relative flex items-center justify-between">
        <span className="h-2 w-8 rounded-full bg-white/70" />
        <span className="flex gap-0.5">
          <i className="h-1 w-1 rounded-full bg-gray-500/60" />
          <i className="h-1 w-1 rounded-full bg-gray-500/60" />
          <i className="h-1 w-1 rounded-full bg-gray-500/60" />
        </span>
      </div>
      <div className="relative mt-3 rounded-lg p-2 shadow-sm" style={{ backgroundColor: theme.account }}>
        <div className={`h-2 w-12 rounded-full ${theme.id === 'angkor' ? 'bg-[#806d50]/55' : 'bg-white/75'}`} />
        <div className={`mt-1.5 h-1.5 w-7 rounded-full ${theme.id === 'angkor' ? 'bg-[#806d50]/30' : 'bg-white/45'}`} />
        <div className="mt-2 flex justify-between">
          <span className={`h-1 w-5 rounded-full ${theme.id === 'angkor' ? 'bg-[#806d50]/45' : 'bg-white/70'}`} />
          <span className={`h-1 w-5 rounded-full ${theme.id === 'angkor' ? 'bg-[#806d50]/45' : 'bg-white/70'}`} />
          <span className={`h-1 w-5 rounded-full ${theme.id === 'angkor' ? 'bg-[#806d50]/45' : 'bg-white/70'}`} />
        </div>
      </div>
      <div className="relative mt-2 grid grid-cols-2 gap-1">
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index} className="flex h-7 items-center justify-center rounded-md bg-white/85">
            <i className="h-3 w-3 rounded-md" style={{ backgroundColor: `${theme.account}88` }} />
          </span>
        ))}
      </div>
      <div className="relative mt-2 h-7 rounded-md bg-white/65" />
    </div>
  );
}

export default function HomeThemePicker({
  activeTheme,
  onApply,
  onClose,
}: {
  activeTheme: HomeThemeId;
  onApply: (theme: HomeThemeId) => void;
  onClose: () => void;
}) {
  const [selectedTheme, setSelectedTheme] = useState<HomeThemeId>(activeTheme);
  const [category, setCategory] = useState<(typeof categories)[number]['id'] | 'wallpaper'>('all');
  const themes = useMemo(
    () => HOME_THEMES.filter((theme) => category === 'all' || theme.category === category),
    [category],
  );

  return (
    <AnimatePresence>
      <motion.button
        key="theme-picker-backdrop"
        type="button"
        aria-label="បិទការជ្រើសរើសស្បែក"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 z-40 bg-black/40"
      />
      <motion.section
        key="theme-picker-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="home-theme-title"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 280 }}
        className="absolute inset-x-0 bottom-0 z-50 flex max-h-[72%] min-h-[430px] flex-col rounded-t-[30px] bg-[#F4F4F5] shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
      >
        <div className="mx-auto mt-2 h-1.5 w-14 shrink-0 rounded-full bg-gray-300" />
        <div className="flex items-center justify-between px-5 pb-3 pt-5">
          <h2 id="home-theme-title" className="text-[20px] font-extrabold text-gray-800">
            ស្បែកអេក្រង់
          </h2>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-gray-500 hover:bg-gray-200" aria-label="បិទ">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="hide-scrollbar flex shrink-0 gap-2 overflow-x-auto px-5 pb-4">
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-[12px] font-bold transition-colors ${
                category === item.id ? 'bg-white text-gray-800 shadow-sm' : 'bg-[#E8E8EA] text-gray-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hide-scrollbar flex min-h-0 flex-1 items-start gap-3 overflow-x-auto px-5 pb-4">
          {themes.map((theme) => {
            const selected = selectedTheme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                aria-pressed={selected}
                aria-label={`ស្បែក ${theme.name}`}
                onClick={() => setSelectedTheme(theme.id)}
                className="w-[132px] shrink-0 text-center"
              >
                <span className={`relative block rounded-[19px] border-[3px] p-1.5 transition-colors ${selected ? 'border-[#19B8C6]' : 'border-transparent'}`}>
                  <ThemePreview theme={theme} />
                  {selected && (
                    <span className="absolute ml-[-29px] mt-[-32px] flex h-6 w-6 items-center justify-center rounded-full bg-[#19B8C6] text-white shadow">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                  )}
                </span>
                <span className={`mt-2 block truncate text-[13px] font-bold ${selected ? 'text-[#19AAB9]' : 'text-gray-800'}`}>
                  {theme.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-gray-200/80 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3">
          <div className="flex items-center gap-1 rounded-full bg-[#E8E8EA] p-1">
            <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-[12px] font-bold text-[#19AAB9] shadow-sm">
              <Palette className="h-4 w-4" />
              ស្បែក
            </span>
            <button
              type="button"
              onClick={() => setCategory('wallpaper')}
              className={`rounded-full px-2 py-2 text-[12px] font-semibold ${
                category === 'wallpaper' ? 'bg-white text-[#19AAB9] shadow-sm' : 'text-gray-600'
              }`}
              aria-pressed={category === 'wallpaper'}
            >
              + រូបភាព
            </button>
          </div>
          <button
            type="button"
            onClick={() => onApply(selectedTheme)}
            className="rounded-full bg-gradient-to-r from-[#E9A0BD] to-[#9850A6] px-7 py-3 text-[14px] font-extrabold text-white shadow-md transition-transform active:scale-95"
          >
            ប្រើប្រាស់
          </button>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
