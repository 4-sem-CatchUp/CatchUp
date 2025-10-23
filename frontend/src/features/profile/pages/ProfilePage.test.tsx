import { renderWithClient } from '@/test-utils'; // however you wrap QueryClientProvider

import { screen } from '@testing-library/react';
import ProfilePage from './ProfilePage';

test('renders all profile sections', () => {
  renderWithClient(<ProfilePage />);
  // Check headings for each section
  expect(screen.getByRole('heading', { name: /Activity/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Achievements/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Comments/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Friends/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Subbed Groups/i })).toBeInTheDocument();
});
