import { screen } from '@testing-library/react';
import { renderWithClient } from '@/test-utils';
import ProfileHeader from './ProfileHeader';
import { vi } from "vitest";

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ username: 'alice' }),
  };
});

vi.mock('@/services/profileService', () => ({
  getProfile: vi.fn((username: string) =>
    Promise.resolve({
      username,
      name: username.charAt(0).toUpperCase() + username.slice(1),
      bio: 'Test bio',
      rank: 42,
      achievements: [],
    })
  ),
}));

test('renders loading state initially', () => {
  renderWithClient(<ProfileHeader />);
  expect(screen.getByText(/Fetching user data/i)).toBeInTheDocument();
});

test('renders username in the header', async () => {
  renderWithClient(<ProfileHeader />);
  expect(await screen.findByRole("heading", {name: /Alice/i})).toBeInTheDocument();
});

test("renders rank after fetching user data", async () => {
    renderWithClient(<ProfileHeader />);
    expect(await screen.findByText(/Rank 42/i)).toBeInTheDocument();
});