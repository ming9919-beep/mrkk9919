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
    localStorage.removeItem('aba.home-theme');
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

  it('opens the home theme picker from the edit home screen button', async () => {
    const user = userEvent.setup();
    renderWithMemoryLocation(<Home />);

    await user.click(screen.getByRole('button', { name: 'កែអេក្រង់ដើម' }));

    expect(screen.getByRole('dialog', { name: 'ស្បែកអេក្រង់' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ស្បែក សួនបៃតង' })).toBeInTheDocument();
  });

  it('applies and saves a selected home theme', async () => {
    const user = userEvent.setup();
    const { container } = renderWithMemoryLocation(<Home />);

    await user.click(screen.getByRole('button', { name: 'កែអេក្រង់ដើម' }));
    await user.click(screen.getByRole('button', { name: 'ស្បែក សួនបៃតង' }));
    await user.click(screen.getByRole('button', { name: 'ប្រើប្រាស់' }));

    expect(container.querySelector('[data-home-theme="garden"]')).toBeInTheDocument();
    expect(localStorage.getItem('aba.home-theme')).toBe('garden');
    expect(screen.queryByRole('dialog', { name: 'ស្បែកអេក្រង់' })).not.toBeInTheDocument();
  });

  it('switches the full home screen to the Angkor wallpaper style', async () => {
    const user = userEvent.setup();
    const { container } = renderWithMemoryLocation(<Home />);

    await user.click(screen.getByRole('button', { name: 'កែអេក្រង់ដើម' }));
    await user.click(screen.getByRole('button', { name: '+ រូបភាព' }));

    const angkorTheme = screen.getByRole('button', { name: 'ស្បែក ទេសភាពអង្គរ' });
    expect(angkorTheme).toBeInTheDocument();
    await user.click(angkorTheme);
    await user.click(screen.getByRole('button', { name: 'ប្រើប្រាស់' }));

    const home = container.querySelector('[data-home-theme="angkor"]');
    expect(home).toBeInTheDocument();
    expect(home).toHaveAttribute('data-home-wallpaper', 'angkor');
    expect(home).toHaveStyle({ backgroundColor: 'rgb(132, 146, 138)' });
    expect(localStorage.getItem('aba.home-theme')).toBe('angkor');
  });
});
