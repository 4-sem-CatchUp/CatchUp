import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faOtter, faBars, faHouse, faPeopleGroup, faUser } from '@fortawesome/free-solid-svg-icons';

/**
 * GlobalHeader component
 *
 * Application-wide navigation bar.
 * Layout:
 * - Left: logo and app name (CatchUp)
 * - Center/right: search input (desktop) and collapsible menu (mobile)
 * - Nav links for Feed, Subs, and Profile
 *
 * Responsive behavior:
 * - On desktop: inline search input and nav links visible
 * - On mobile: search and nav items move into a collapsible menu
 * - Includes mobile controls (search + hamburger menu button)
 *
 * Styling:
 * - Light/dark theme with Tailwind classes
 * - Divider line below the header for visual separation
 */

export default function GlobalHeader() {
  return (
    <nav className="bg-white dark:bg-gray-900 sticky top-0 z-3">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto text-sky-500 dark:text-stone-50 pt-4 pb-4">
        <a href="/" className="flex items-center ml-4 space-x-3 rtl:space-x-reverse">
          <FontAwesomeIcon icon={faOtter} className="sm:text-base md:text-lg xl:text-3xl" />
          <span className="self-center whitespace-nowrap dark:text-stone-50 sm:text-base md:text-lg xl:text-3xl font-bold font-heading">
            CatchUp
          </span>
        </a>

        {/* Mobile controls */}
        <div className="flex md:order-1">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-900 dark:text-stone-50 focus:outline-none focus:ring-4   rounded-sm text-sm p-2.5 me-1"
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="h-5 w-5 text-gray-900 dark:text-stone-50"
            />
            <span className="sr-only">Search</span>
          </button>

          {/* Desktop - search input */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="md:text-xs text-gray-900 dark:text-stone-50"
              />
            </div>
            <input type="text" id="search-navbar" className="block w-full" placeholder="Search..." />
          </div>

          {/* Mobile - menu toggle */}
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-900 rounded-sm md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <FontAwesomeIcon
              icon={faBars}
              aria-hidden="true"
              viewBox="0 0 17 14"
              className="text-xs text-gray-900 dark:text-stone-50"
            />
          </button>
        </div>

        {/* Collapible section */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
          {/* Mobile - search input inside the menu */}
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="h-5 w-5 text-gray-900 dark:text-stone-50"
              />
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-sm focus:outline-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
          <ul className="flex flex-col text-sm xl:text-md p-4 md:p-0 mt-4 mr-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 px-3 sm:text-base md:text-lg text-gray-900 rounded-sm md:bg-transparent md:p-0 dark:text-stone-50  md:hover:text-sky-500 dark:md:hover:text-sky-500  aria-[current=page]:text-sky-500"
                aria-current="page"
              >
                <FontAwesomeIcon icon={faHouse} className="sm:text-base md:text-lg transition" />
                Feed
              </a>
            </li>
            <li>
              <a
                href="/subs"
                className="block py-2 px-3 sm:text-base md:text-lg text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent   md:hover:text-sky-500 md:p-0 md:dark:hover:text-sky-500 dark:text-stone-50 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 aria-[current=page]:text-sky-500"
              >
                <FontAwesomeIcon icon={faPeopleGroup} className="sm:text-base md:text-lg transition" />
                Subs
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block py-2 px-3 sm:text-base md:text-lg text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent   md:hover:text-sky-500 md:p-0 dark:text-stone-50 md:dark:hover:text-sky-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 aria-[current=page]:text-sky-500"
              >
                <FontAwesomeIcon icon={faUser} className="sm:text-base md:text-lg transition" />
                Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-px w-full bg-[linear-gradient(to_right,theme(colors.gray.300),theme(colors.gray.300))] dark:bg-[linear-gradient(to_right,theme(colors.gray.600),theme(colors.gray.600))]" />
    </nav>
  );
}
