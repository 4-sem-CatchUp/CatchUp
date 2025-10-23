import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import NoHeaderLayout from './layout/NoHeaderLayout';

// Use alias OR relative; both shown work.
// Using alias (requires vite.config.js alias + server restart):
import { FeedPage } from '@/features/feed';
import { PostPage } from '@/features/post';
import { ProfilePage } from '@/features/profile';
import { LoginPage } from '@/features/login';

/**
 * Application router
 *
 * Defines the client-side routes for the app using React Router.
 * Structure:
 * - Root path "/" uses AppLayout, which includes GlobalHeader, Outlet, and GlobalFooter
 * - Nested routes:
 *   - "/" (index): renders FeedPage
 *   - "/post/:id": renders PostPage (individual post view)
 *   - "/profile/:username": renders ProfilePage (user profile view)
 *
 * Uses Vite path alias "@" for cleaner imports.
 */

export const router = createBrowserRouter([
  // Routes WITH global header
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <FeedPage /> },
      { path: 'post/:id', element: <PostPage /> },
      { path: 'profile/:username', element: <ProfilePage /> },
    ],
  },
  // Routes WITHOUT global header
  {
    path: '/',
    element: <NoHeaderLayout />,
    children: [{ path: 'login', element: <LoginPage /> }],
  },
]);
