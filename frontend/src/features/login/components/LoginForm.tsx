// File: src/components/AuthTabs.tsx
import React, { useId, useState } from 'react';

export type AuthTabsProps = {
  initialTab?: 'login' | 'register';
  onLogin?: (payload: { email: string; password: string }) => Promise<void> | void;
  onRegister?: (payload: { name: string; email: string; password: string }) => Promise<void> | void;
  isSubmitting?: boolean;
  title?: string;
  className?: string;
};

export default function LoginForm({
  initialTab = 'login',
  onLogin,
  onRegister,
  isSubmitting: isSubmittingExternal,
  title = 'Welcome to CatchUp!',
  className = '',
}: AuthTabsProps) {
  const tablistId = useId();
  const loginTabId = useId();
  const registerTabId = useId();
  const loginPanelId = useId();
  const registerPanelId = useId();

  const ids = {
    tablist: tablistId,
    loginTab: loginTabId,
    registerTab: registerTabId,
    loginPanel: loginPanelId,
    registerPanel: registerPanelId,
  };

  const [active, setActive] = useState<'login' | 'register'>(initialTab);
  const [internalSubmitting, setInternalSubmitting] = useState(false);
  const isSubmitting = isSubmittingExternal ?? internalSubmitting;

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  function onKeyDownTabs(e: React.KeyboardEvent) {
    // Why: a11y keyboard support per ARIA Tabs
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      setActive((prev) => (prev === 'login' ? 'register' : 'login'));
    }
  }

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const { email, password } = loginForm;
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    try {
      if (!isSubmittingExternal) setInternalSubmitting(true);
      await onLogin?.({ email, password });
      setMessage('Logged in successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      if (!isSubmittingExternal) setInternalSubmitting(false);
    }
  }

  async function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const { name, email, password } = registerForm;
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
    try {
      if (!isSubmittingExternal) setInternalSubmitting(true);
      await onRegister?.({ name, email, password });
      setMessage('Account created.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed.');
    } finally {
      if (!isSubmittingExternal) setInternalSubmitting(false);
    }
  }

  const tabBase =
    'rounded-none inline-flex w-full m-0 items-center justify-center p-4 text-sm font-medium focus:outline-none border-r border-gray-200 dark:border-gray-700';
  const activeTab = 'text-gray-900 bg-gray-100 focus:ring-blue-300 dark:bg-gray-700 dark:text-white';
  const inactiveTab =
    'bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-blue-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white';

  return (
    // ✅ Centers horizontally & vertically; add px for small screens
    <div className={`md:min-h-screen grid place-items-center mt-10 md:mt-0 px-4 ${className}`}>
      <div className="w-full max-w-md rounded-2xl shadow-sm ring-2 ring-gray-200 dark:ring-gray-800 overflow-hidden">
        <div className="px-6 pt-6">
          <h2 className="text-xl font-semibold text-center">{title}</h2>
        </div>

        {/* Tabs */}
        <div className="mt-4">
          <ul
            role="tablist"
            aria-labelledby={ids.tablist}
            className="text-sm flex justify-center items-center font-medium text-center text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"
            onKeyDown={onKeyDownTabs}
          >
            <li className="flex w-full">
              <button
                id={ids.loginTab}
                role="tab"
                aria-controls={ids.loginPanel}
                aria-selected={active === 'login'}
                type="button"
                className={`${tabBase} ${active === 'login' ? activeTab : inactiveTab}`}
                onClick={() => setActive('login')}
              >
                Login
              </button>
            </li>
            <li className="flex w-full">
              <button
                id={ids.registerTab}
                role="tab"
                aria-controls={ids.registerPanel}
                aria-selected={active === 'register'}
                type="button"
                className={`${tabBase} ${active === 'register' ? activeTab : inactiveTab}`}
                onClick={() => setActive('register')}
              >
                Register
              </button>
            </li>
          </ul>
        </div>

        {/* Feedback */}
        {(error || message) && (
          <div className="px-6 pt-4">
            {error && (
              <div className="text-red-600 dark:text-red-500 text-sm" role="alert">
                {error}
              </div>
            )}
            {message && (
              <div className="text-green-600 dark:text-green-500 text-sm" role="status">
                {message}
              </div>
            )}
          </div>
        )}

        {/* Panels */}
        <div className="p-6">
          {/* Login Panel */}
          <div id={ids.loginPanel} role="tabpanel" aria-labelledby={ids.loginTab} hidden={active !== 'login'}>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium ">
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center  px-4 py-2  font-medium  focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-60"
              >
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </div>

          {/* Register Panel */}
          <div id={ids.registerPanel} role="tabpanel" aria-labelledby={ids.registerTab} hidden={active !== 'register'}>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label htmlFor="register-name" className="block text-sm font-medium ">
                  Full name
                </label>
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="register-email" className="block text-sm font-medium ">
                  Email
                </label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="register-password" className="block text-sm font-medium ">
                  Password
                </label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center px-4 py-2 text-white font-medium  focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-60"
              >
                {isSubmitting ? 'Creating account…' : 'Create account'}
              </button>
            </form>
          </div>
        </div>

        <div className="px-6 pb-6 text-center text-xs text-gray-500 dark:text-gray-400">
          By continuing, you agree to our Terms and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
