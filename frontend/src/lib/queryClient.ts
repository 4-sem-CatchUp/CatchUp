import { QueryClient } from '@tanstack/react-query'

// Central place for caching/retries/etc.
// Tweak defaults as you like.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,      // 30s: data considered fresh
      refetchOnWindowFocus: false,
      retry: 1,                  // retry failed queries once
    },
  },
})