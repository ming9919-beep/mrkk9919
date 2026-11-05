import { useState } from 'react';
import { useLocation } from 'wouter';
import {
  ArrowRight, ArrowRightLeft, Bell, ChartNoAxesColumnIncreasing, CreditCard,
  Eye, EyeOff, Gift, Grid2X2, Heart, MessageCircle, QrCode, Receipt,
  Repeat2, Send, Settings, ShoppingBag, Smartphone, Wallet,
} from 'lucide-react';
import { defaultAccount } from '../data/accounts';
import { getBalance } from '../lib/balanceStore';
import angkorWallpaper from '../assets/angkor-home.svg?url';
import promotionImage from '../assets/promo_0.webp';

const shortcuts = [
  { label: 'ផ្ទេរប្រាក់', english: 'Transfer', Icon: Send, tint: 'mint', route: '/transfer' },
  { label: 'ទូទាត់វិក្កយបត្រ', english: 'Pay bills', Icon: Receipt, tint: 'peach', route: '/payments' },
  { label: 'បញ្ចូលកាត', english: 'Mobile top up', Icon: CreditCard, tint: 'gold', route: '/pay' },
  { label: 'គណនី', english: 'Accounts', Icon: Wallet, tint: 'blue', route: '/accounts' },
  { label: 'ស្កេនបង់ប្រាក់', english: 'Scan to pay', Icon: QrCode, tint: 'rose', route: '/scan' },
  { label: 'សេវាកម្មផ្សេងៗ', english: 'More services', Icon: Grid2X2, tint: 'lilac', route: '/settings/features' },
];

const providers = [
  { title: 'metfone', khmer: 'សេវាកម្មមិត្តហ្វូន', mark: 'metfone', Icon: Smartphone, color: '#e8002d', route: '/pay' },
  { title: 'Smart', khmer: 'ស្មាត អាស្យាកា', mark: 'Smart\n5G', Icon: Smartphone, color: '#00a651', route: '/pay' },
  { title: 'Cinema', khmer: 'សំបុត្រកុន', mark: 'play', Icon: Receipt, color: '#8037bb', route: '/payments' },
  { title: 'VET Express', khmer: 'វីអ៊ីធី អេ ចប្រេស', mark: 'VET', Icon: ShoppingBag, color: '#ee8b36', route: '/payments' },
  { title: 'Cambo 21', khmer: 'ខេមបូ-លីង 21 អិចប្រេស', mark: '21', Icon: ArrowRightLeft, color: '#2879ae', route: '/payments' },
  { title: 'BookMeBus', khmer: 'ប៊ុកមីបាស', mark: 'BUS', Icon: Smartphone, color: '#dc4e58', route: '/payments' },
];

const tools = [
  { title: 'កំណត់រហ័ស', subtitle: 'Quick settings', Icon: Settings, color: 'violet', route: '/settings' },
  { title: 'គ្រប់គ្រងកាត', subtitle: 'Manage your cards', Icon: CreditCard, color: 'navy', route: '/cards' },
  { title: 'សង្ខេបចំណាយ', subtitle: 'Spending summary', Icon: ChartNoAxesColumnIncreasing, color: 'plum', route: '/accounts' },
  { title: 'រង្វាន់ និងអត្ថប្រយោជន៍', subtitle: 'Rewards & benefits', Icon: Gift, color: 'coral', route: '/settings/features' },
];

const tabs = [
  { label: 'ទំព័រដើម', Icon: Grid2X2, route: '/' },
  { label: 'ផ្ទេរប្រាក់', Icon: ArrowRightLeft, route: '/transfer' },
  { label: 'ការទូទាត់', Icon: Receipt, route: '/payments' },
  { label: 'ចូលចិត្ត', Icon: Heart, route: '/accounts' },
  { label: 'ផ្សេងៗ', Icon: Grid2X2, route: '/settings' },
];

function ShortcutIllustration({ index }: { index: number }) {
  const drawings = [
    <>
      <ellipse cx="25" cy="33" rx="14" ry="5" fill="#e99779" />
      <path d="M12 30q13-19 27-1l-4 9H17z" fill="#81aaa0" stroke="#527b72" strokeWidth="1.5" />
      <ellipse cx="25" cy="30" rx="10" ry="4" fill="#f3d9a0" stroke="#527b72" strokeWidth="1.5" />
      <circle cx="23" cy="30" r="5" fill="#bd6555" />
      <path d="m18 27 9 5m-8 0 7-5" stroke="#e8c879" strokeWidth="1.5" />
    </>,
    <>
      <rect x="7" y="12" width="36" height="27" rx="5" fill="#83b9aa" stroke="#527b72" strokeWidth="1.5" />
      <rect x="11" y="16" width="28" height="14" rx="2" fill="#eecb81" />
      <path d="M15 19h20m-18 4h16m-16 4h11" stroke="#b65c51" strokeWidth="2" strokeLinecap="round" />
      <circle cx="34" cy="35" r="2" fill="#f5eee0" />
    </>,
    <>
      <path d="M8 20 24 11l19 9-17 9z" fill="#e7bd72" stroke="#987442" strokeWidth="1.5" />
      <path d="m9 21 17 10v12L9 33z" fill="#d88468" stroke="#987442" strokeWidth="1.5" />
      <path d="m26 31 17-11v13L26 43z" fill="#83aaa0" stroke="#527b72" strokeWidth="1.5" />
      <path d="m18 22 17-8 7 4-17 9z" fill="#f5e5bb" stroke="#987442" strokeWidth="1.5" />
      <circle cx="29" cy="22" r="4" fill="#d86d5f" />
    </>,
    <>
      <rect x="7" y="13" width="36" height="26" rx="7" fill="#7fa9a0" stroke="#527b72" strokeWidth="1.5" />
      <path d="M15 13 19 8h12l4 5" fill="#e9c779" stroke="#527b72" strokeWidth="1.5" />
      <rect x="12" y="18" width="25" height="15" rx="3" fill="#e8c983" />
      <circle cx="24" cy="25" r="7" fill="#bd6555" />
      <circle cx="24" cy="25" r="4" fill="#f3dca5" />
      <circle cx="24" cy="25" r="1.5" fill="#527b72" />
    </>,
    <>
      <circle cx="25" cy="25" r="17" fill="#d88468" />
      <circle cx="25" cy="25" r="12" fill="#f2dbab" />
      <path d="M17 29a9 9 0 0 1 16-6M33 21l1 5-5-1" fill="none" stroke="#527b72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 14v4m0 14v4m-11-11h4m14 0h4" stroke="#b8844c" strokeWidth="1.5" />
    </>,
    <>
      <rect x="7" y="15" width="36" height="25" rx="5" fill="#86aaa0" stroke="#527b72" strokeWidth="1.5" />
      <path d="M18 15v-4h14v4M12 21h26" fill="none" stroke="#e8c879" strokeWidth="2" />
      <path d="m14 34 7-6 6 3 10-9m-5 0h5v5" fill="none" stroke="#bd6555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </>,
  ];

  return (
    <svg viewBox="0 0 50 50" className="h-full w-full" aria-hidden="true">
      {drawings[index]}
    </svg>
  );
}

function GramophoneIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="h-[98px] w-[98px]" aria-hidden="true">
      <path d="M66 12c-10-9-24-8-30 0-5 6-2 13 5 17l11 6 22-12c1-4-2-8-8-11Z" fill="#e8b866" stroke="#547b71" strokeWidth="2" />
      <path d="m46 31 23-13m-19 18 24-14m-29 9 23-13" stroke="#b77955" strokeWidth="1.5" />
      <path d="M52 34 40 56" stroke="#527b72" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 56c3 7 8 9 13 9" fill="none" stroke="#527b72" strokeWidth="3" strokeLinecap="round" />
      <path d="M25 58h49l-4 20H29z" fill="#80a99d" stroke="#527b72" strokeWidth="2" />
      <path d="M30 63h39m-36 5h33m-31 6h28" stroke="#e8c879" strokeWidth="2" />
      <ellipse cx="49" cy="57" rx="24" ry="7" fill="#e6c77e" stroke="#527b72" strokeWidth="2" />
      <ellipse cx="49" cy="56" rx="16" ry="4.5" fill="#536e67" />
      <circle cx="49" cy="56" r="3" fill="#d16f5f" />
      <circle cx="49" cy="56" r="1" fill="#f7edce" />
      <path d="M36 79v5m27-5v5m-34 2h45" stroke="#527b72" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 35c-4-3-4-7 0-10m4 13c-5-5-5-11 0-16m59 6c4-3 4-7 0-10" fill="none" stroke="#c87866" strokeWidth="2" strokeLinecap="round" />
      <path d="m17 18 2-4 2 4 4 2-4 2-2 4-2-4-4-2z" fill="#c87866" />
    </svg>
  );
}

export default function HomeRedesign({ onSwitch }: { onSwitch: () => void }) {
  const [, setLocation] = useLocation();
  const [showBalance, setShowBalance] = useState(true);

  return (
    <main className="relative mx-auto flex h-[100dvh] min-h-[620px] w-full max-w-[390px] flex-col overflow-hidden bg-[#756f5c] font-sans text-[#463e35]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(180deg,rgba(49,67,59,.39),rgba(67,61,49,.48)),url(${angkorWallpaper})` }}
        aria-hidden="true"
      />
      <div className="relative flex-1 overflow-y-auto px-4 pb-5 pt-4 [scrollbar-width:none]">
        <header className="mb-4">
          <div className="flex h-9 items-center justify-end gap-4 text-[#fff9ec]">
            <button type="button" aria-label="Messages" onClick={() => setLocation('/chat')} className="relative">
              <MessageCircle size={21} />
            </button>
            <button type="button" aria-label="Notifications" onClick={() => setLocation('/notifications')} className="relative">
              <Bell size={21} />
              <span className="absolute -right-1 -top-0.5 h-2 w-2 rounded-full bg-[#e55c4e]" />
            </button>
            <button type="button" aria-label="Cards" onClick={() => setLocation('/cards')}>
              <CreditCard size={21} />
            </button>
            <button type="button" aria-label="ABA Pay QR" onClick={() => setLocation('/scan')} className="grid h-8 w-8 place-items-center rounded-lg bg-[#d84c43]">
              <QrCode size={18} />
            </button>
            <button
              type="button"
              aria-label="切换主页设计"
              title="切换主页设计"
              onClick={onSwitch}
              className="grid h-8 w-8 place-items-center rounded-lg border border-white/40 bg-white/15"
            >
              <Repeat2 size={18} />
            </button>
          </div>
          <button type="button" onClick={() => setLocation('/settings/profile')} className="mt-4 flex items-center gap-3 text-left text-[#fff9ec]">
            <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#fff8e6]/80 bg-gradient-to-br from-[#f0d88a] via-[#c98066] to-[#385c5d] font-bold text-white shadow-lg">
              <span className="text-xl">Y</span>
            </span>
            <span>
              <span className="block text-xs opacity-90">សួស្តី!</span>
              <span className="block text-xl font-bold">Yukheang</span>
            </span>
            <span className="ml-auto self-end pb-1 text-[9px] tracking-wide text-white/75">MOBILE BANKING</span>
          </button>
        </header>

        <section className="relative overflow-hidden rounded-[23px] border border-white/65 bg-[#faf7e9]/95 p-4 shadow-xl backdrop-blur-xl" aria-label="Account overview">
          <div className="pointer-events-none absolute right-3 top-2 opacity-95">
            <GramophoneIllustration />
          </div>
          <div className="relative z-[1] flex items-start justify-between pr-24">
            <div>
              <p className="mb-1 text-[11px] font-semibold text-[#82786a]">Available balance</p>
              <p className="text-[25px] font-bold tracking-tight text-[#443e34]" data-balance>
                {showBalance ? `$${getBalance(defaultAccount.id, defaultAccount.balance)}` : '••••••'}
                {showBalance && <span className="ml-1 text-sm font-semibold">USD</span>}
              </p>
            </div>
            <button
              type="button"
              aria-label={showBalance ? 'លាក់ចំនួនទឹកប្រាក់' : 'បង្ហាញចំនួនទឹកប្រាក់'}
              onClick={() => setShowBalance((value) => !value)}
              className="grid h-9 w-9 place-items-center rounded-xl bg-[#d8e8d9] text-[#4f806f]"
            >
              {showBalance ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
          <div className="relative z-[1] mt-2 flex items-center gap-2 text-[10px] text-[#776c5e]">
            <span className="rounded-md bg-[#e3ebd9] px-2 py-1 text-[#527563]">គណនីគោល</span>
            <span>{defaultAccount.name}</span>
            <span className="tracking-wider">•• {defaultAccount.number.slice(-4)}</span>
          </div>
          <div className="relative z-[1] my-3 h-px bg-[#665b47]/10" />
          <div className="relative z-[1] grid grid-cols-3">
            {[
              { label: 'គណនី', Icon: Wallet, route: '/accounts' },
              { label: 'ផ្ទេរប្រាក់', Icon: Send, route: '/transfer' },
              { label: 'ប្រវត្តិ', Icon: ChartNoAxesColumnIncreasing, route: '/accounts' },
            ].map(({ label, Icon, route }, index) => (
              <button
                type="button"
                key={label}
                onClick={() => setLocation(route)}
                className={`flex items-center justify-center gap-1.5 py-1 text-[11px] font-semibold text-[#516e61] ${index ? 'border-l border-[#5c503e]/20' : ''}`}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <div className="grid grid-cols-3 gap-2">
            {shortcuts.map(({ label, english, tint, route }, index) => (
              <button
                type="button"
                key={english}
                onClick={() => setLocation(route)}
                className="flex min-h-[98px] flex-col items-center justify-center gap-2 rounded-[20px] border border-white/65 bg-[#faf7ea]/95 text-[#6b5749] shadow-lg transition-transform active:scale-95"
              >
                <span className={`grid h-11 w-11 place-items-center rounded-[14px] ${tint}`}>
                  <ShortcutIllustration index={index} />
                </span>
                <span className="flex flex-col items-center text-center text-[10px] font-semibold leading-snug">
                  {label}
                  <span className="text-[9px] font-medium text-[#968a78]">{english}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="my-3 h-px shrink-0 bg-white/30" />
          <div className="mt-2 flex gap-2 overflow-x-auto [scrollbar-width:none]">
            {[
              { label: 'មីនីអាប់', Icon: Smartphone, route: '/settings/features' },
              { label: 'អាជីវករ ABA', Icon: ShoppingBag, route: '/payments' },
              { label: 'សេវាហិរញ្ញវត្ថុ', Icon: Wallet, route: '/accounts' },
            ].map(({ label, Icon, route }) => (
              <button
                type="button"
                key={label}
                onClick={() => setLocation(route)}
                className="flex min-h-11 shrink-0 items-center gap-2 rounded-[18px] border border-white/55 bg-[#f9f6e7]/95 px-3 text-[10px] font-semibold text-[#746253] shadow-md"
              >
                <Icon size={17} className="text-[#6b967d]" />
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <div className="mb-2 flex items-center justify-between text-[#fff8e6] drop-shadow">
            <div>
              <h2 className="text-base font-bold">ដំណឹង និង ប្រូម៉ូសិន</h2>
              <p className="text-[10px] text-white/80">News &amp; promotions</p>
            </div>
            <button type="button" onClick={() => setLocation('/payments')} className="flex items-center gap-1 text-[10px] font-semibold">
              See all <ArrowRight size={13} />
            </button>
          </div>
          <button type="button" onClick={() => setLocation('/payments')} className="relative h-[150px] w-full overflow-hidden rounded-[23px] border border-white/55 text-left shadow-xl">
            <img src={promotionImage} alt="ABA promotion" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/5" />
            <span className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
              <span className="text-xs font-bold">ដំណឹង និង ប្រូម៉ូសិន</span>
              <span className="rounded-full border border-white/50 bg-[#3d625d]/80 px-3 py-1 text-[10px] font-semibold">Discover →</span>
            </span>
          </button>
        </section>

        <section className="mt-5">
          <div className="mb-2 flex items-center justify-between text-[#fff8e6] drop-shadow">
            <div>
              <h2 className="text-base font-bold">មីនីអាប់</h2>
              <p className="text-[10px] text-white/80">Popular services</p>
            </div>
            <button type="button" onClick={() => setLocation('/settings/features')} className="flex items-center gap-1 text-[10px] font-semibold">
              See all <ArrowRight size={13} />
            </button>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none]">
            {providers.map(({ title, khmer, mark, Icon, color, route }) => (
              <button type="button" key={title} onClick={() => setLocation(route)} className="flex min-h-[135px] w-[100px] shrink-0 flex-col items-center rounded-[21px] border border-white/45 bg-[#f1ebd8]/85 px-2 py-3 shadow-lg">
                <span className={`relative mb-2 grid h-[66px] w-[66px] place-items-center rounded-[19px] border-2 border-white/80 text-white shadow-md ${mark === 'play' ? 'bg-gradient-to-br from-violet-600 via-pink-500 to-amber-400' : ''}`} style={mark === 'play' ? undefined : { backgroundColor: color }}>
                  {mark === 'play'
                    ? <Icon size={27} fill="white" />
                    : <span className={`px-1 text-center font-extrabold leading-tight ${mark.length > 4 ? 'text-[9px]' : 'text-sm'} ${mark.includes('\n') ? 'whitespace-pre-line' : ''}`}>{mark}</span>}
                </span>
                <span className="text-[10px] font-bold text-[#584c41]">{title}</span>
                <span className="mt-1 text-center text-[9px] leading-snug text-[#817563]">{khmer}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-5 pb-3">
          <div className="mb-2 flex items-center justify-between text-[#fff8e6] drop-shadow">
            <div>
              <h2 className="text-base font-bold">ការគ្រប់គ្រងគណនី</h2>
              <p className="text-[10px] text-white/80">Useful tools, close at hand</p>
            </div>
            <button type="button" onClick={() => setLocation('/settings')} className="flex items-center gap-1 text-[10px] font-semibold">
              Explore <ArrowRight size={13} />
            </button>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none]">
            {tools.map(({ title, subtitle, Icon, color, route }) => (
              <button type="button" key={title} onClick={() => setLocation(route)} className={`flex h-[165px] w-[140px] shrink-0 flex-col justify-between overflow-hidden rounded-[21px] border border-white/30 p-3 text-left text-white shadow-lg tool-${color}`}>
                <span className="grid h-14 w-14 place-items-center rounded-[18px] bg-white/15">
                  <Icon size={30} />
                </span>
                <span className="text-[11px] font-bold leading-relaxed">{title}<small className="block text-[9px] font-medium text-white/70">{subtitle}</small></span>
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setLocation('/settings/features')} className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-white/70 bg-[#e3f3df]/95 px-5 py-2.5 text-[11px] font-bold text-[#668276] shadow-md">
            <Grid2X2 size={16} /> សេវាកម្មទាំងអស់
          </button>
        </section>
      </div>

      <nav className="relative z-10 flex shrink-0 justify-around border-t border-[#5e4f3c]/10 bg-[#f6f1e1]/95 px-1 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-lg" aria-label="Main navigation">
        {tabs.map(({ label, Icon, route }, index) => (
          <button type="button" key={label} onClick={() => setLocation(route)} className={`flex min-w-[58px] flex-col items-center gap-1 text-[9px] ${index === 0 ? 'text-[#477865]' : 'text-[#9a8e7c]'}`}>
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <style>{`
        .mint { color: #51816f; background: #d9ebd9; }
        .peach { color: #bf6e54; background: #f5dfcb; }
        .gold { color: #a17b41; background: #f2e7c5; }
        .blue { color: #557c8b; background: #dce9e8; }
        .rose { color: #ba655b; background: #f3ded6; }
        .lilac { color: #7d6e8d; background: #e9e1e8; }
        .tool-violet { background: linear-gradient(145deg,#6655a3,#342f58 82%); }
        .tool-navy { background: linear-gradient(145deg,#4e7180,#172b40 78%); }
        .tool-plum { background: linear-gradient(145deg,#7a4387,#30233f 83%); }
        .tool-coral { background: linear-gradient(145deg,#bd654f,#603945 82%); }
      `}</style>
    </main>
  );
}
