import { useEffect, useMemo, useState } from 'react';
import type { Post } from './useFeedPosts'; // reuse your Post interface

const NO_SUB = '(no-sub)';

function extractSubs(posts: Post[]): string[] {
  const s = new Set<string>();
  for (const p of posts) s.add(p.sub ?? NO_SUB);
  return Array.from(s).sort();
}

export interface UseFeedSubsResult {
  availableSubs: string[];
  selectedSubs: Set<string>;
  toggleSub: (sub: string) => void;
  selectAll: () => void;
  clearAll: () => void;
}

/** All subs selected by default; unchecking hides that sub’s posts. */
export function useFeedSubs(posts: Post[]): UseFeedSubsResult {
  const availableSubs = useMemo(() => extractSubs(posts), [posts]);
  const [selectedSubs, setSelectedSubs] = useState<Set<string>>(() => new Set(availableSubs));

  // Auto-include new subs that appear later.
  useEffect(() => {
    setSelectedSubs((prev) => {
      let changed = false;
      const next = new Set(prev);
      for (const s of availableSubs) {
        if (!next.has(s)) {
          next.add(s);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [availableSubs]);

  const toggleSub = (sub: string) => {
    setSelectedSubs((prev) => {
      const next = new Set(prev);
      next.has(sub) ? next.delete(sub) : next.add(sub);
      return next;
    });
  };

  const selectAll = () => setSelectedSubs(new Set(availableSubs));
  const clearAll = () => setSelectedSubs(new Set());

  return { availableSubs, selectedSubs, toggleSub, selectAll, clearAll };
}

export { NO_SUB };
