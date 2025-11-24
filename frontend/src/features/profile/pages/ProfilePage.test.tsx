import { renderWithClient } from '@/test-utils';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';

test('renders all profile sections', () => {
  renderWithClient(
    <MemoryRouter initialEntries={['/profile/kenneth']}>
      <ProfilePage />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: /Activity/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Achievements/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Comments/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Friends/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Subbed Groups/i })).toBeInTheDocument();
});
