import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/routes'; // named import
import './styles/index.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/queryClient';

// Start MSW only in dev
if (import.meta.env.DEV) {
  const { worker } = await import('@/mocks/browser')
  worker.start()
}

/**
 * Application entry point
 *
 * Mounts the React application into the DOM.
 * - Wraps the app in React.StrictMode for highlighting potential issues
 * - Provides routing via RouterProvider with the configured router
 * - Imports global styles from index.css
 *
 * Root element: <div id="root"></div> in index.html
 */

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>
);
