import React, { useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import PinLock from '@/components/PinLock';
import {
  X,
  Pencil,
  Check,
  ChevronRight,
  UserRound,
  ShieldCheck,
  Sparkles,
  Globe,
  Phone,
  FileText,
  Briefcase,
} from 'lucide-react';

/* ─── Grey/white cartoon cat avatar (Tom style, same as Home/Settings) ─── */
const TomCatAvatar = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect width="100" height="100" fill="#F2E8D8" />
    <polygon points="26,40 18,12 48,32" fill="#8CA6BC" />
    <polygon points="74,40 82,12 52,32" fill="#8CA6BC" />
    <polygon points="28,37 23,17 44,31" fill="#E8A0B0" />
    <polygon points="72,37 77,17 56,31" fill="#E8A0B0" />
    <ellipse cx="50" cy="58" rx="33" ry="31" fill="#8CA6BC" />
    <ellipse cx="50" cy="70" rx="24" ry="18" fill="#F5F1E8" />
    <path d="M20,52 Q50,38 80,52 L80,44 Q50,30 20,44 Z" fill="#7A94AC" opacity="0.6" />
    <ellipse cx="41" cy="52" rx="7.5" ry="10" fill="#FFFDF2" />
    <ellipse cx="59" cy="52" rx="7.5" ry="10" fill="#FFFDF2" />
    <circle cx="42.5" cy="55" r="3.6" fill="#1A1A1A" />
    <circle cx="57.5" cy="55" r="3.6" fill="#1A1A1A" />
    <circle cx="43.5" cy="53.5" r="1.2" fill="white" />
    <circle cx="58.5" cy="53.5" r="1.2" fill="white" />
    <ellipse cx="50" cy="65" rx="4" ry="3" fill="#C84A4A" />
    <path d="M44 71 Q50 76 56 71" fill="none" stroke="#8A6A5A" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="38" cy="70" r="0.9" fill="#8A6A5A" />
    <circle cx="34" cy="73" r="0.9" fill="#8A6A5A" />
    <circle cx="62" cy="70" r="0.9" fill="#8A6A5A" />
    <circle cx="66" cy="73" r="0.9" fill="#8A6A5A" />
    <line x1="14" y1="64" x2="32" y2="68" stroke="#6A5A4A" strokeWidth="1.1" opacity="0.7" />
    <line x1="14" y1="72" x2="32" y2="72" stroke="#6A5A4A" strokeWidth="1.1" opacity="0.7" />
    <line x1="68" y1="68" x2="86" y2="64" stroke="#6A5A4A" strokeWidth="1.1" opacity="0.7" />
    <line x1="68" y1="72" x2="86" y2="72" stroke="#6A5A4A" strokeWidth="1.1" opacity="0.7" />
    <path d="M20,62 L14,60 M20,68 L13,68" stroke="#8CA6BC" strokeWidth="3" strokeLinecap="round" />
    <path d="M80,62 L86,60 M80,68 L87,68" stroke="#8CA6BC" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ─── Personal info (ប្រូហ្វាល់របស់ខ្ញុំ) — editable fields ─────────────── */
type FieldKey = 'fullName' | 'idCard' | 'phone' | 'email' | 'usdAccount' | 'khrAccount';

const LS_KEY = 'aba.profile.v1';

const DEFAULTS: Record<FieldKey, { label: string; hint: string; value: string }> = {
  fullName: { label: 'ឈ្មោះពេញ', hint: 'Full name', value: 'Yukheang SOEU' },
  idCard: { label: 'លេខអត្តសញ្ញាណប័ណ្ណ', hint: 'ID card no.', value: '49399' },
  phone: { label: 'លេខទូរស័ព្ទ', hint: 'Phone number', value: '016 888 6168' },
  email: { label: 'អ៊ីមែល', hint: 'Email address', value: 'soueuyukheang@gmail.com' },
  usdAccount: { label: 'គណនីដុល្លារ', hint: 'USD account', value: '150 614 168' },
  khrAccount: { label: 'គណនីរៀល', hint: 'KHR account', value: '600 980 842' },
};

const KHMER_MONTHS = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];

const load = (): Record<FieldKey, string> => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return { ...Object.fromEntries(Object.entries(DEFAULTS).map(([k, v]) => [k, v.value])) as Record<FieldKey, string>, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return Object.fromEntries(Object.entries(DEFAULTS).map(([k, v]) => [k, v.value])) as Record<FieldKey, string>;
};

export default function Profile() {
  const [, setLocation] = useLocation();
  const [fields, setFields] = useState<Record<FieldKey, string>>(load);
  const [editing, setEditing] = useState<FieldKey | null>(null);
  const [draft, setDraft] = useState('');
  const [toast, setToast] = useState(false);
  const [tab, setTab] = useState<'personal' | 'business'>('personal');
  const [infoOpen, setInfoOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [bizOn, setBizOn] = useState(true);
  const [profileUnlocked, setProfileUnlocked] = useState<boolean>(() => {
    try { return sessionStorage.getItem('aba.profile.unlocked') === '1'; } catch { return false; }
  });

  const lastLogin = useMemo(() => {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm} | ${String(d.getDate()).padStart(2, '0')} ${KHMER_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }, []);

  if (!profileUnlocked) {
    return (
      <PinLock
        title="បញ្ចូលលេខសម្ងាត់"
        subtitle="បញ្ចូល PIN ដើម្បីចូលមជ្ឈដ្ឋានផ្ទាល់ខ្លួន · Enter PIN to access personal center"
        storageKey="aba.profile.unlocked"
        onUnlock={() => setProfileUnlocked(true)}
      />
    );
  }

  const startEdit = (k: FieldKey) => {
    setEditing(k);
    setDraft(fields[k]);
  };

  const saveField = () => {
    if (!editing) return;
    const next = { ...fields, [editing]: draft.trim() || fields[editing] };
    setFields(next);
    setEditing(null);
    try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    setToast(true);
    window.setTimeout(() => setToast(false), 1600);
  };

  const keys = Object.keys(DEFAULTS) as FieldKey[];

  const allRows = [
    {
      key: 'info',
      icon: <UserRound className="w-[21px] h-[21px]" strokeWidth={1.8} />,
      label: 'ព័ត៌មានផ្ទាល់ខ្លួន',
      onClick: () => { setInfoOpen((v) => !v); setTermsOpen(false); },
    },
    {
      key: 'security',
      icon: <ShieldCheck className="w-[21px] h-[21px]" strokeWidth={1.8} />,
      label: 'សុវត្ថិភាព',
      onClick: () => setLocation('/settings'),
    },
    {
      key: 'more',
      icon: <Sparkles className="w-[21px] h-[21px]" strokeWidth={1.8} />,
      label: 'មុខងារបន្ថែម',
      onClick: () => setLocation('/settings/features'),
    },
    {
      key: 'language',
      icon: <Globe className="w-[21px] h-[21px]" strokeWidth={1.8} />,
      label: 'ភាសា',
      value: 'ភាសាខ្មែរ',
      onClick: () => setLocation('/settings'),
    },
    {
      key: 'contact',
      icon: <Phone className="w-[21px] h-[21px]" strokeWidth={1.8} />,
      label: 'ទាក់ទងមកយើងខ្ញុំ',
      onClick: () => setLocation('/chat'),
    },
    {
      key: 'terms',
      icon: <FileText className="w-[21px] h-[21px]" strokeWidth={1.8} />,
      label: 'លក្ខខណ្ឌ',
      onClick: () => { setTermsOpen((v) => !v); setInfoOpen(false); },
    },
  ];

  const rows = tab === 'personal' ? allRows : allRows.filter((r) => ['language', 'contact', 'terms'].includes(r.key));

  return (
    <div className="min-h-[100dvh] bg-[#F7F2E9] font-sans flex flex-col">
      {/* ── Hero: blurred wallpaper, avatar, segmented tabs ────────── */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}images/khmer-street.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
            filter: 'blur(9px) brightness(0.7) saturate(0.92)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#F7F2E9]" />

        <div className="relative px-4 pt-11 pb-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setLocation('/settings')}
              className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white"
              aria-label="Back to settings"
            >
              <X className="w-5 h-5" strokeWidth={2.2} />
            </button>
            <p className="text-[15px] font-semibold text-white/95">ប្រូហ្វាល់របស់ខ្ញុំ</p>
            <div className="w-9" />
          </div>

          <div className="mt-5 flex flex-col items-center">
            <div className="w-[86px] h-[86px] rounded-full overflow-hidden ring-[3px] ring-white/85 shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
              <TomCatAvatar />
            </div>
            <p className="mt-2.5 text-[21px] font-bold text-white tracking-wide drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]">
              {fields.fullName}
            </p>
            <p className="mt-0.5 text-[12.5px] font-medium text-[#E8E3D6] drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]">
              លេខសម្គាល់: {fields.idCard}
            </p>
          </div>
        </div>
      </div>

      {/* ── Segmented tabs ─────────────────────────────────────────── */}
      <div className="relative z-10 px-4 pt-1">
        <div className="grid grid-cols-2 gap-1 rounded-full p-1 bg-[#EDE6D8]">
          {(['personal', 'business'] as const).map((id) => (
            <button
              key={id}
              onClick={() => { setTab(id); setInfoOpen(false); setTermsOpen(false); }}
              className={`h-9 rounded-full text-[13.5px] font-semibold transition ${
                tab === id ? 'bg-white text-[#3A3A3A] shadow-sm' : 'text-[#8B8474]'
              }`}
            >
              {id === 'personal' ? 'បុគ្គល' : 'អាជីវករ ABA'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Menu list ──────────────────────────────────────────────── */}
      <div className="px-4 pt-3 pb-4">
        <div className="rounded-2xl bg-white shadow-[0_4px_18px_rgba(0,0,0,0.05)] overflow-hidden">
          {rows.map((r) => (
            <React.Fragment key={r.key}>
              <button
                type="button"
                onClick={r.onClick}
                className="w-full h-[54px] px-4 flex items-center gap-3 text-left border-b border-[#F2EDE3] active:bg-[#FAF6EE]"
              >
                <span className="text-[#5C5648] shrink-0">{r.icon}</span>
                <span className="flex-1 text-[15px] font-medium text-[#2E2C27]">{r.label}</span>
                {'value' in r && r.value ? <span className="text-[12.5px] text-[#9A9384] mr-1">{r.value}</span> : null}
                <ChevronRight className="w-4 h-4 text-[#BEB6A6] shrink-0" strokeWidth={2} />
              </button>

              {/* Personal info — inline editable fields (original behaviour) */}
              {r.key === 'info' && infoOpen && (
                <div className="border-b border-[#F2EDE3] bg-[#FFFCF6] px-4 py-2">
                  {keys.map((k) => {
                    const d = DEFAULTS[k];
                    const isEditing = editing === k;
                    return (
                      <div key={k} className="py-2.5">
                        <p className="text-[11px] font-semibold text-[#9A9384]">{d.label} · {d.hint}</p>
                        {isEditing ? (
                          <div className="mt-1 flex items-center gap-2">
                            <input
                              autoFocus
                              value={draft}
                              onChange={(e) => setDraft(e.target.value)}
                              className="flex-1 min-w-0 px-3 py-1.5 rounded-lg bg-white border border-[#DCD2BC] text-[14px] font-semibold text-[#2E2C27] outline-none focus:border-[#2E9EA8]"
                            />
                            <button onClick={saveField} className="w-8 h-8 rounded-lg bg-[#2E9EA8] text-white flex items-center justify-center shrink-0" aria-label="Save">
                              <Check className="w-4 h-4" strokeWidth={2.6} />
                            </button>
                          </div>
                        ) : (
                          <div className="mt-0.5 flex items-center justify-between">
                            <p className="text-[15px] font-semibold text-[#2E2C27]">{fields[k]}</p>
                            <button onClick={() => startEdit(k)} className="w-7 h-7 rounded-md flex items-center justify-center text-[#2E9EA8]" aria-label={`Edit ${d.label}`}>
                              <Pencil className="w-3.5 h-3.5" strokeWidth={2.2} />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Terms — inline sheet */}
              {r.key === 'terms' && termsOpen && (
                <div className="border-b border-[#F2EDE3] bg-[#FFFCF6] px-4 py-3">
                  <p className="text-[12px] leading-relaxed text-[#6B6556]">
                    លក្ខខណ្ឌប្រើប្រាស់សេវាកម្ម ABA Mobile៖ ឯកសារនេះគឺជាគំរូសាធារណៈសម្រាប់ការសាកល្បង។
                    សូមអានលក្ខខណ្ឌផ្លូវការនៅ ababank.com មុនពេលប្រើប្រាស់សេវាកម្មពិត។
                  </p>
                </div>
              )}
            </React.Fragment>
          ))}

          {/* Business mode toggle — matches the real app row */}
          {tab === 'personal' && (
            <div className="w-full h-[54px] px-4 flex items-center gap-3">
              <span className="text-[#5C5648] shrink-0"><Briefcase className="w-[21px] h-[21px]" strokeWidth={1.8} /></span>
              <span className="flex-1 text-[15px] font-medium text-[#2E2C27]">មុខងារអាជីវករ ABA</span>
              <button
                type="button"
                role="switch"
                aria-checked={bizOn}
                onClick={() => setBizOn((v) => !v)}
                className={`w-[46px] h-[26px] rounded-full transition-colors ${bizOn ? 'bg-[#2E9EA8]' : 'bg-[#D9D2C4]'}`}
              >
                <span className={`block w-[22px] h-[22px] rounded-full bg-white shadow transition-transform ${bizOn ? 'translate-x-[21px]' : 'translate-x-[2px]'}`} />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* ── Version + compliance ──────────────────────────────────── */}
      <div className="mx-auto w-full max-w-[430px] px-5 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-[11.5px] font-semibold text-[#7B7568]">កម្មវិធី កំណែ: V 5.1.9</p>
              <span className="inline-flex items-center gap-0.5 rounded-[5px] bg-[#D8F2DE] px-1.5 py-[2px] text-[9.5px] font-semibold text-[#2E8055]">
                ចុងក្រោយ <span className="text-[10px]">✅</span>
              </span>
            </div>
            <p className="mt-1 text-[11.5px] font-medium text-[#7B7568]">Login ចុងក្រោយ: {lastLogin}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="inline-block w-[18px] h-[12px] rounded-[1px] overflow-hidden shrink-0">
                <span className="block h-[3px] bg-[#032EA1]" />
                <span className="block h-[6px] bg-[#E00025]" />
                <span className="block h-[3px] bg-[#032EA1]" />
              </span>
              <span className="text-[11.5px] font-medium text-[#46557F]">បង្កើតនៅកម្ពុជា</span>
            </div>
          </div>

          {/* PCI DSS badge */}
          <div className="shrink-0 text-right leading-none">
            <div className="flex items-center justify-end gap-[2px]">
              <span className="text-[15px] font-black tracking-tight text-[#1B3A5C]">PCI</span>
              <svg viewBox="0 0 24 24" className="w-[13px] h-[13px] -ml-[3px] mt-[6px]" fill="none" stroke="#2E8055" strokeWidth="3" strokeLinecap="round">
                <path d="M4 14 L9 19 L20 5" />
              </svg>
              <span className="text-[15px] font-black tracking-tight text-[#1B3A5C] -ml-[2px]">DSS</span>
            </div>
            <p className="mt-[1px] text-[7px] font-semibold tracking-wide text-[#1B3A5C]/75">Certified</p>
            <p className="mt-[1px] text-[4.5px] tracking-tight text-[#1B3A5C]/50">LEVEL 1 SERVICE PROVIDER</p>
          </div>
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <div className="mt-auto pb-7 pt-3 flex items-center justify-center gap-2">
        <span className="text-[14px] font-bold tracking-[0.16em] text-[#2B6CB0]">ABA&#39; BANK</span>
        <span className="h-[14px] w-px bg-[#C9C2B2]" />
        <div className="flex items-center gap-1">
          <span className="inline-block w-[10px] h-[10px] bg-[#C8102E] [clip-path:polygon(0_0,100%_0,100%_35%,50%_50%,100%_65%,100%_100%,0_100%,0_65%,50%_50%,0_35%)]" />
          <span className="text-[6.5px] leading-[1.15] font-bold tracking-tight text-[#2B6CB0]/80">
            NATIONAL BANK<br />OF CANADA GROUP
          </span>
        </div>
      </div>

      {/* Saved toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-gray-900/90 text-white text-[13px] font-semibold shadow-lg">
          បានរក្សាទុកហើយ · Saved
        </div>
      )}
    </div>
  );
}
