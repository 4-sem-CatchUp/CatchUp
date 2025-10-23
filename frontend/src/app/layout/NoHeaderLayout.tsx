import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalFooter from './GlobalFooter';

export default function NoHeaderLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-gray-900">
      {/* No GlobalHeader here */}
      <main className="flex-1">
        <Outlet />
      </main>
      <GlobalFooter />
    </div>
  );
}
