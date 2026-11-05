import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'wouter';
import type { ReactNode } from 'react';
import Home from './Home';

function renderWithMemoryLocation(ui: ReactNode) {
  const memory = { path: '/' };
  const navigate = vi.fn((to: string) => {
    memory.path = to;
  });
  const hook = () => [memory.path, navigate] as [string, (to: string) => void];
  return { ...render(<Router hook={hook}>{ui}</Router>), memory, navigate };
}

describe('Home page → Cards entry', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it('renders a Cards tile that navigates to /cards', async () => {
    const user = userEvent.setup();
    const { navigate } = renderWithMemoryLocation(<Home />);

    const cardsTile = screen.getByRole('button', { name: /កាត/ });
    expect(cardsTile).toBeInTheDocument();

    await user.click(cardsTile);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate.mock.calls[0][0]).toBe('/cards');
  });

  it('opens the home theme picker and saves the selected theme', async () => {
    const user = userEvent.setup();
    renderWithMemoryLocation(<Home />);

    await user.click(screen.getByRole('button', { name: /កែអេក្រង់ដើម/ }));
    expect(screen.getByRole('dialog', { name: 'ស្បែកអេក្រង់' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'ស្បែក មេឃស្រស់' }));
    await user.click(screen.getByRole('button', { name: 'ប្រើប្រាស់' }));

    expect(window.localStorage.getItem('aba.home.theme')).toBe('sky');
    expect(screen.queryByRole('dialog', { name: 'ស្បែកអេក្រង់' })).not.toBeInTheDocument();
  });
});
