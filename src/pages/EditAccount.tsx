import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, User, CreditCard, Wallet, Coins, Palette } from 'lucide-react';
import { useLocation, useParams } from 'wouter';
import { accounts } from '../data/accounts';
import { getEditedAccount, saveAccountEdit } from '@/lib/accountStore';
import type { Account } from '../data/accounts';

/* ── Color presets for the account card accent ── */
const COLOR_PRESETS = [
  '#29AEFF', '#9B59B6', '#C8102E', '#16A34A', '#F59E0B',
  '#0A1A6E', '#E8002D', '#7C3AED', '#00AAFF', '#FF6B6B',
];

/* ── Currency options ── */
const CURRENCIES: Array<{ value: 'USD' | 'KHR'; label: string }> = [
  { value: 'USD', label: 'USD 🇺🇸' },
  { value: 'KHR', label: 'KHR 🇰🇭' },
];

export default function EditAccount() {
  const [, setLocation] = useLocation();
  const params = useParams<{ id: string }>();

  // Load the account (with edits applied) or fall back to the first one.
  const existing = getEditedAccount(params.id) ?? accounts[0];

  // Local form state.
  const [name, setName] = useState(existing.name);
  const [number, setNumber] = useState(existing.number);
  const [balance, setBalance] = useState(existing.balance ?? '');
  const [currency, setCurrency] = useState<'USD' | 'KHR'>(existing.currency as 'USD' | 'KHR');
  const [card, setCard] = useState(existing.card);
  const [color, setColor] = useState(existing.color);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const patch: Partial<Account> = {
      name: name.trim() || existing.name,
      number: number.trim() || existing.number,
      balance: balance.trim() === '' ? null : balance.trim(),
      currency,
      card: card.trim() || existing.card,
      color,
      borderColor: color,
    };
    saveAccountEdit(params.id, patch);
    setSaved(true);
    // Show success tick for 800ms then go back.
    setTimeout(() => setLocation('/'), 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Header ── */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center gap-3 shadow-sm">
        <button
          onClick={() => setLocation('/')}
          className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-[18px] font-extrabold text-gray-900">
          កែអេក្រង់ដើម
        </h1>
        <span className="text-[12px] text-gray-400 ml-auto">Edit Account</span>
      </div>

      {/* ── Account preview card ── */}
      <div className="px-4 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 shadow-lg text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 60%, ${color}88 100%)` }}
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[11px] opacity-80 font-medium">{name || 'Account'}</p>
              <p className="text-[13px] font-bold tracking-wider mt-1">{number || '—'}</p>
            </div>
            <CreditCard className="w-7 h-7 opacity-80" />
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] opacity-70 uppercase tracking-wide">Balance</p>
              <p className="text-[22px] font-extrabold mt-0.5">
                {balance || '0.00'} {currency}
              </p>
            </div>
            <p className="text-[12px] opacity-80 font-medium">Card {card}</p>
          </div>
        </motion.div>
      </div>

      {/* ── Form ── */}
      <div className="px-4 pt-5 pb-4 space-y-4 flex-1">
        {/* Account name */}
        <div>
          <label className="text-[12px] text-gray-500 font-bold flex items-center gap-1.5 mb-1.5">
            <User className="w-3.5 h-3.5" /> ឈ្មោះអេក្រង់ · Account Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-[#E8002D] focus:ring-2 focus:ring-[#E8002D]/10 transition-all"
            placeholder="Enter account name"
          />
        </div>

        {/* Account number */}
        <div>
          <label className="text-[12px] text-gray-500 font-bold flex items-center gap-1.5 mb-1.5">
            <CreditCard className="w-3.5 h-3.5" /> លេខអេក្រង់ · Account Number
          </label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-[#E8002D] focus:ring-2 focus:ring-[#E8002D]/10 transition-all"
            placeholder="000 000 000"
          />
        </div>

        {/* Balance + Currency row */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-[12px] text-gray-500 font-bold flex items-center gap-1.5 mb-1.5">
              <Wallet className="w-3.5 h-3.5" /> សមត្ថភាព · Balance
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-[#E8002D] focus:ring-2 focus:ring-[#E8002D]/10 transition-all"
              placeholder="0.00"
            />
          </div>
          <div className="w-[120px]">
            <label className="text-[12px] text-gray-500 font-bold flex items-center gap-1.5 mb-1.5">
              <Coins className="w-3.5 h-3.5" /> រូបិយបណ្ណ · Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'USD' | 'KHR')}
              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-3 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-[#E8002D] focus:ring-2 focus:ring-[#E8002D]/10 transition-all"
            >
              {CURRENCIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Card number (masked) */}
        <div>
          <label className="text-[12px] text-gray-500 font-bold flex items-center gap-1.5 mb-1.5">
            <CreditCard className="w-3.5 h-3.5" /> លេខកាត · Card Number
          </label>
          <input
            type="text"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-[#E8002D] focus:ring-2 focus:ring-[#E8002D]/10 transition-all"
            placeholder="*000"
          />
        </div>

        {/* Color picker */}
        <div>
          <label className="text-[12px] text-gray-500 font-bold flex items-center gap-1.5 mb-2">
            <Palette className="w-3.5 h-3.5" /> ពណ៌ · Accent Color
          </label>
          <div className="flex flex-wrap gap-2.5">
            {COLOR_PRESETS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-9 h-9 rounded-full transition-all active:scale-90 ${
                  color === c ? 'ring-2 ring-offset-2 ring-gray-800 scale-110' : ''
                }`}
                style={{ backgroundColor: c }}
                aria-label={`Color ${c}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Save button ── */}
      <div className="px-4 pb-8 pt-2">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          className="w-full bg-[#E8002D] text-white py-4 rounded-xl text-[16px] font-extrabold shadow-lg flex items-center justify-center gap-2 active:bg-[#c70026] transition-colors"
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" />
              រក្សាទុក · Saved
            </>
          ) : (
            'រក្សាទុក · Save'
          )}
        </motion.button>
      </div>
    </div>
  );
}
