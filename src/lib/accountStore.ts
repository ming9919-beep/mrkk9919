/* ─── Account edit store ─────────────────────────────────────────────────────
   Overlays user edits on top of the static accounts in src/data/accounts.ts.
   Persisted to localStorage so edits survive refresh. Mirrors the pattern
   used by balanceStore.ts / txnStore.ts.
────────────────────────────────────────────────────────────────────────────── */

import { accounts as staticAccounts, type Account } from '../data/accounts';

const KEY = 'aba.accountEdits.v1';

type AccountEdits = Record<string, Partial<Account>>;

function load(): AccountEdits {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as AccountEdits;
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {};
    return parsed;
  } catch {
    return {};
  }
}

function save(edits: AccountEdits) {
  try { localStorage.setItem(KEY, JSON.stringify(edits)); } catch { /* storage unavailable */ }
}

let cache: AccountEdits | null = null;
function edits(): AccountEdits {
  if (!cache) cache = load();
  return cache;
}

/** Return all accounts with user edits applied. */
export function getEditedAccounts(): Account[] {
  const e = edits();
  return staticAccounts.map((a) => (e[a.id] ? { ...a, ...e[a.id] } : a));
}

/** Return a single account (by id) with user edits applied. */
export function getEditedAccount(id: string): Account | undefined {
  const e = edits();
  const base = staticAccounts.find((a) => a.id === id);
  if (!base) return undefined;
  return e[id] ? { ...base, ...e[id] } : base;
}

/** Save edits for one account field set. */
export function saveAccountEdit(id: string, patch: Partial<Account>): void {
  const e = edits();
  e[id] = { ...e[id], ...patch };
  save(e);
}

/** Reset all edits (used by tests). */
export function resetAccountEdits(): void {
  cache = null;
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
}
