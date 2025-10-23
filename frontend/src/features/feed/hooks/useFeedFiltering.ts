import { useEffect, useMemo, useState } from 'react';
import { Post } from './useFeedPosts';

const NO_SUB = '(no-sub)';

function getSubs(posts: Post[]): string[] {
  const set = new Set<string>();

  for (const p of posts) set.add(p.sub ?? NO_SUB);
  return Array.from(set).sort();
}

export interface UseSubFilterResult {
  availableSubs: string[];
  selectedSubs: Set<string>;
  toggleSub: (sub: string) => void;
  clearAll: () => void;
  selectAll: () => void;
  filtered: Post[];
}

export function useSubFilter(posts: Post[]): UseSubFilterResult {
  const availableSubs = useMemo(() => getSubs(posts), [posts]);
  const [selectedSubs, setSelectedSubs] = useState<Set<string>>(
    () => new Set(availableSubs) // all checked initially
  );

  // Auto-include any brand-new subs that appear later.
  useEffect(() => {
    setSelectedSubs((prev) => {
      // If already covers all, keep as-is; else add new ones.
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

  const clearAll = () => setSelectedSubs(new Set()); // none checked
  const selectAll = () => setSelectedSubs(new Set(availableSubs)); // all checked

  const filtered = useMemo(() => {
    // If nothing checked, show nothing (strict interpretation).
    if (selectedSubs.size === 0) return [];
    return posts.filter((p) => selectedSubs.has(p.sub ?? NO_SUB));
  }, [posts, selectedSubs]);

  return { availableSubs, selectedSubs, toggleSub, clearAll, selectAll, filtered };
}
