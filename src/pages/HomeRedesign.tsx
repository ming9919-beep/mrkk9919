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
  { title: 'Cellcard', khmer: 'សែលកាត', Icon: Smartphone, color: '#cf5662', route: '/pay' },
  { title: 'Smart', khmer: 'ស្មាត', Icon: Smartphone, color: '#398d70', route: '/pay' },
  { title: 'Cinema', khmer: 'សំបុត្រកុន', Icon: Receipt, color: '#80649b', route: '/payments' },
  { title: 'Markets', khmer: 'ផ្សារ និងហាង', Icon: ShoppingBag, color: '#c8874e', route: '/payments' },
  { title: 'Travel', khmer: 'ទេសចរណ៍', Icon: ArrowRightLeft, color: '#507d82', route: '/payments' },
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

export default function HomeRedesign({ onSwitch }: { onSwitch: () => void }) {
  const [, setLocation] = useLocation();
  const [showBalance, setShowBalance] = useState(true);

  return (
    <main className="relative mx-auto flex h-[100dvh] min-h-[620px] w-full max-w-[390px] flex-col overflow-hidden bg-[#756f5c] font-sans text-[#463e35]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(180deg,rgba(49,67,59,.55),rgba(67,61,49,.55)),url(${angkorWallpaper})` }}
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
              Y
            </span>
            <span>
              <span className="block text-xs opacity-90">សួស្តី!</span>
              <span className="block text-xl font-bold">Yukheang</span>
            </span>
            <span className="ml-auto self-end pb-1 text-[9px] tracking-wide text-white/75">MOBILE BANKING</span>
          </button>
        </header>

        <section className="rounded-[23px] border border-white/65 bg-[#faf7e9]/95 p-4 shadow-xl backdrop-blur-xl" aria-label="Account overview">
          <div className="flex items-start justify-between">
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
          <div className="mt-2 flex items-center gap-2 text-[10px] text-[#776c5e]">
            <span className="rounded-md bg-[#e3ebd9] px-2 py-1 text-[#527563]">គណនីគោល</span>
            <span>{defaultAccount.name}</span>
            <span className="tracking-wider">•• {defaultAccount.number.slice(-4)}</span>
          </div>
          <div className="my-3 h-px bg-[#665b47]/10" />
          <div className="grid grid-cols-3">
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
            {shortcuts.map(({ label, english, Icon, tint, route }) => (
              <button
                type="button"
                key={english}
                onClick={() => setLocation(route)}
                className="flex min-h-[98px] flex-col items-center justify-center gap-2 rounded-[20px] border border-white/65 bg-[#faf7ea]/95 text-[#6b5749] shadow-lg transition-transform active:scale-95"
              >
                <span className={`grid h-10 w-10 place-items-center rounded-[14px] ${tint}`}>
                  <Icon size={22} />
                </span>
                <span className="flex flex-col items-center text-center text-[10px] font-semibold leading-snug">
                  {label}
                  <span className="text-[9px] font-medium text-[#968a78]">{english}</span>
                </span>
              </button>
            ))}
          </div>
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
            {providers.map(({ title, khmer, Icon, color, route }) => (
              <button type="button" key={title} onClick={() => setLocation(route)} className="flex min-h-[135px] w-[100px] shrink-0 flex-col items-center rounded-[21px] border border-white/45 bg-[#f1ebd8]/85 px-2 py-3 shadow-lg">
                <span className="mb-2 grid h-[66px] w-[66px] place-items-center rounded-[19px] border-2 border-white/80 text-white shadow-md" style={{ backgroundColor: color }}>
                  <Icon size={25} />
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
