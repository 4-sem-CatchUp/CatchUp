import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalHeader from './GlobalHeader';
import GlobalFooter from './GlobalFooter';

/**
 * AppLayout component
 *
 * Provides the global page structure for the application.
 * Layout:
 * - GlobalHeader at the top
 * - Main content area (renders nested routes via <Outlet />)
 * - GlobalFooter at the bottom
 *
 * Styling:
 * - Full viewport height with flexbox column layout
 * - Background color adapts to light/dark mode
 *
 * Purpose:
 * Ensures consistent header/footer across all pages,
 * while letting each route inject its own content.
 */

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-gray-900">
      <GlobalHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <GlobalFooter />
    </div>
  );
}
