import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

/**
 * ESLint configuration
 *
 * Purpose:
 * - Enforces code quality rules (unused vars, React hooks)
 * - Disables ESLint’s built-in formatting rules to avoid conflicts with Prettier
 * - Integrates Prettier as a plugin, but turns off Prettier errors (formatting is handled separately)
 *
 * Key settings:
 * - Extends ESLint’s recommended rules + React hooks + React Refresh
 * - Ignores build artifacts in /dist
 * - Language options: modern ECMAScript, JSX enabled, browser globals
 * - Rules:
 *   - no-unused-vars: error, except for vars starting with uppercase/underscore
 *   - quotes: off (Prettier controls quotes instead)
 *   - prettier/prettier: off (no formatting errors from ESLint)
 */

export default defineConfig([
  globalIgnores(['dist', 'public/mockServiceWorker.js']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettier, // <- slår ESLints formateringsregler fra
    ],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.vitest },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    // eslint.config.js (kun rules-blokken vist)
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^[A-Z_]', // ignore unused vars starting with _ or uppercase
          argsIgnorePattern: '^_', // ignore unused function params starting with _
          caughtErrorsIgnorePattern: '^_', // ignore unused caught errors like (err)
          ignoreRestSiblings: true, // ignore when using object rest (...rest)
        },
      ],
      quotes: 'off', // lad ikke ESLint håndhæve quotes
      'prettier/prettier': [
        'off',
        {
          singleQuote: true,
          semi: true,
          endOfLine: 'lf',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
