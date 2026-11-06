export interface ThemeConfig {
  id: string;
  khName: string;
  enName: string;
  bgImage: string;
  greetingKh: string;
  greetingEn: string;
  balanceIllustration?: 'gramophone' | 'angkor' | 'lotus' | 'none';
  cardTint: string;
  primaryActionColor: string;
  accentColor: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'sangkran',
    khName: 'មហាសង្ក្រាន្ត',
    enName: 'Maha Sangkran',
    bgImage: '/images/theme-sangkran.jpg',
    greetingKh: 'សួស្តី ឆ្នាំថ្មី!',
    greetingEn: 'Happy New Year!',
    balanceIllustration: 'lotus',
    cardTint: 'rgba(252, 248, 235, 0.92)',
    primaryActionColor: '#d85448',
    accentColor: '#e68e42',
  },
  {
    id: 'sixties',
    khName: 'ទសវត្សរ៍៦០',
    enName: 'The 60s Vintage',
    bgImage: '/images/theme-60s.jpg',
    greetingKh: 'សាយ័ណ្ហសួស្តី!',
    greetingEn: 'Good evening!',
    balanceIllustration: 'gramophone',
    cardTint: 'rgba(247, 243, 230, 0.94)',
    primaryActionColor: '#3e7569',
    accentColor: '#00bcd4',
  },
  {
    id: 'pchum_ben',
    khName: 'ភ្ជុំបិណ្ឌ',
    enName: 'Pchum Ben',
    bgImage: '/images/theme-sangkran.jpg',
    greetingKh: 'សូមអនុមោទនា!',
    greetingEn: 'Pchum Ben Blessings',
    balanceIllustration: 'lotus',
    cardTint: 'rgba(245, 238, 225, 0.92)',
    primaryActionColor: '#7a4387',
    accentColor: '#9c27b0',
  },
  {
    id: 'angkor',
    khName: 'សុវណ្ណភូមិ',
    enName: 'Suvarnabhumi',
    bgImage: '/images/theme-angkor.jpg',
    greetingKh: 'សួស្តី ពេលព្រឹក!',
    greetingEn: 'Good morning!',
    balanceIllustration: 'angkor',
    cardTint: 'rgba(250, 245, 230, 0.92)',
    primaryActionColor: '#b87333',
    accentColor: '#e5a93b',
  },
  {
    id: 'classic',
    khName: 'លំនាំដើម',
    enName: 'Classic Modern',
    bgImage: '/images/khmer-street.jpg',
    greetingKh: 'សួស្តី ពេលព្រឹក!',
    greetingEn: 'Good morning!',
    balanceIllustration: 'none',
    cardTint: 'rgba(250, 247, 233, 0.89)',
    primaryActionColor: '#3e7569',
    accentColor: '#51816f',
  },
];

export const DEFAULT_THEME_ID = 'sixties';
const THEME_STORAGE_KEY = 'aba.home.theme';

export const getThemeById = (id: string | null | undefined): ThemeConfig =>
  THEMES.find((theme) => theme.id === id) ?? THEMES.find((theme) => theme.id === DEFAULT_THEME_ID)!;

export const loadTheme = (): ThemeConfig => {
  if (typeof window === 'undefined') return getThemeById(DEFAULT_THEME_ID);
  return getThemeById(window.localStorage.getItem(THEME_STORAGE_KEY));
};

export const saveTheme = (theme: ThemeConfig) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme.id);
};
