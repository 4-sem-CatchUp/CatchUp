import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOtter } from '@fortawesome/free-solid-svg-icons';

/**
 * GlobalFooter component
 *
 * Displays the application’s footer with branding and navigation links.
 * Layout:
 * - Top divider line with light/dark theme support
 * - First row: logo + app name (left), nav links (right)
 * - Second row: dark/light mode toggle (left), “Made with React” note (center),
 *   copyright with current year (right)
 *
 * Responsive: stacks vertically on small screens, switches to row layout on larger screens.
 */

export default function GlobalFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-stone-50 dark:bg-gray-900">
      {/* Divider med 1px og fade i begge sider: */}
      {/* <div className="h-px w-full bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 dark:via-gray-600" /> */}
      <div className="h-px w-full bg-[linear-gradient(to_right,theme(colors.gray.300),theme(colors.gray.300))] dark:bg-[linear-gradient(to_right,theme(colors.gray.600),theme(colors.gray.600))]" />

      <div className="mx-auto max-w-screen-xl py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left side: logo + catchup name */}
          <div className="flex items-center space-x-3">
            {/* Placeholder logo */}
            <div className="flex items-center justify-center font-bold text-3xl text-sky-500 dark:text-stone-50">
              <FontAwesomeIcon icon={faOtter} className="h-6 w-6" />
            </div>
            <span className="text-3xl font-bold font-heading text-sky-500 dark:text-stone-50">
              CatchUp
            </span>
          </div>

          {/* Right side: nav links */}
          <ul className="flex space-x-6 text-sm text-gray-900 dark:text-stone-50">
            <li>
              <a href="/about" className="hover:text-sky-500 transition">
                About
              </a>
            </li>
            <li>
              <a href="/help" className="hover:text-sky-500 transition">
                FAQ
              </a>
            </li>
            <li>
              <a href="/docs" className="hover:text-sky-500 transition">
                Docs
              </a>
            </li>
            <li>
              <a
                href="https://github.com/4-sem-CatchUp/frontend"
                className="hover:text-sky-500 transition"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* Second Row – left/right aligned */}

        <div className="mt-8 relative flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left aligned */}
          <div className="text-xs opacity-70 text-gray-900 dark:text-stone-50">
            Insert Dark/Light mode Toggle here
          </div>

          {/* Centered */}
          <div className="text-xs opacity-70 text-gray-900 dark:text-stone-50 md:absolute md:left-1/2 md:-translate-x-1/2 text-center">
            Made with ❤️ in React
          </div>

          {/* Right aligned */}
          <div className="text-xs opacity-70 text-gray-900 dark:text-stone-50 md:ml-auto">
            Copyright &copy; {year} CatchUp
          </div>
        </div>
      </div>
    </footer>
  );
}
