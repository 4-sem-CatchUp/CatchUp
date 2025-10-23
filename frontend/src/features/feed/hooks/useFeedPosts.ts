import { useMemo, useState } from 'react';
import { useFeed } from '../api/useFeedQuery';

export type SortOption = 'newest' | 'hottest' | 'topRated';

// SORTING LOGIC - used in FeedCardList to render sorted posts
export interface Post {
  id: string | number;
  date: string | Date;
  upvotes?: number;
  downvotes?: number;
  postTitle?: string;
  profileImg?: string;
  featuredImg?: string;
  profileName?: string;
  sub?: string;
  commentCount?: number;
  postContent?: string;
}

function getTime(d: string | Date): number {
  return new Date(d).getTime();
}

function score(p: Post): number {
  return (p.upvotes ?? 0) - (p.downvotes ?? 0);
}

function sortPosts(posts: Post[], sortBy: SortOption): Post[] {
  const arr = [...posts];
  switch (sortBy) {
    case 'newest':
      return arr.sort((a, b) => getTime(b.date) - getTime(a.date));
    case 'hottest':
      return arr.sort((a, b) => {
        const sA = score(a);
        const sB = score(b);
        if (sB !== sA) return sB - sA;
        return getTime(b.date) - getTime(a.date);
      });
    case 'topRated':
      return arr.sort((a, b) => {
        const aUp = a.upvotes ?? 0;
        const bUp = b.upvotes ?? 0;
        if (bUp !== aUp) return bUp - aUp;
        return getTime(b.date) - getTime(a.date);
      });
    default:
      return posts;
  }
}

function filterBySubs(posts: Post[], selectedSubs?: Set<string>): Post[] {
  if (!selectedSubs) return posts;
  if (selectedSubs.size === 0) return [];
  return posts.filter((p) => selectedSubs.has(p.sub ?? '(no-sub)'));
}

export interface UseFeedPostsResult {
  posts: Post[]; // filtered + sorted
  rawPosts: Post[]; // unsorted and unfiltered
  sortBy: SortOption;
  setSortBy: (v: SortOption) => void;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}

export function useFeedPosts(selectedSubs?: Set<string>): UseFeedPostsResult {
  const { data = [], isLoading, isError, error } = useFeed();
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const posts = useMemo(() => {
    const filtered = filterBySubs(data, selectedSubs);
    return sortPosts(filtered, sortBy);
  }, [data, selectedSubs, sortBy]);

  return { posts, rawPosts: data, sortBy, setSortBy, isLoading, isError, error };
}
