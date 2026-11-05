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

  it('renders a Cards action that navigates to /cards', async () => {
    const user = userEvent.setup();
    const { navigate } = renderWithMemoryLocation(<Home />);

    const cardsButton = screen.getByRole('button', { name: 'Cards' });
    expect(cardsButton).toBeInTheDocument();

    await user.click(cardsButton);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate.mock.calls[0][0]).toBe('/cards');
  });

  it('switches between the new and classic home designs and saves the choice', async () => {
    const user = userEvent.setup();
    const { unmount } = renderWithMemoryLocation(<Home />);

    expect(screen.getByRole('region', { name: 'Account overview' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '切换主页设计' }));
    expect(window.localStorage.getItem('aba.home.layout')).toBe('classic');
    expect(screen.getByRole('button', { name: '切换主页设计' })).toBeInTheDocument();

    unmount();
    renderWithMemoryLocation(<Home />);
    expect(screen.queryByRole('region', { name: 'Account overview' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '切换主页设计' }));
    expect(window.localStorage.getItem('aba.home.layout')).toBe('new');
    expect(screen.getByRole('region', { name: 'Account overview' })).toBeInTheDocument();
  });
});
