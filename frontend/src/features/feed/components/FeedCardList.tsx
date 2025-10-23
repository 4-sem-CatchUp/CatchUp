import React, { useMemo } from 'react';
import FeedCard from './FeedCard';
import FeedSortAndFilter from './FeedSortAndFilter';
import { useFeedPosts, Post, SortOption } from '../hooks/useFeedPosts';
import { useFeedSubs } from '../hooks/useFeedSubs'; // from earlier

// local helper (or reuse from hook)
const NO_SUB = '(no-sub)';
function filterBySubs(posts: Post[], selected: Set<string>): Post[] {
  if (selected.size === 0) return []; // hide all when nothing checked
  return posts.filter((p) => selected.has(p.sub ?? NO_SUB));
}
function getTime(d: string | Date) {
  return new Date(d).getTime();
}
function sortPosts(posts: Post[], sortBy: SortOption): Post[] {
  const arr = [...posts];
  switch (sortBy) {
    case 'newest':
      return arr.sort((a, b) => getTime(b.date) - getTime(a.date));
    case 'hottest':
      return arr.sort((a, b) => {
        const sA = (a.upvotes ?? 0) - (a.downvotes ?? 0);
        const sB = (b.upvotes ?? 0) - (b.downvotes ?? 0);
        return sB !== sA ? sB - sA : getTime(b.date) - getTime(a.date);
      });
    case 'topRated':
      return arr.sort((a, b) => {
        const aUp = a.upvotes ?? 0;
        const bUp = b.upvotes ?? 0;
        return bUp !== aUp ? bUp - aUp : getTime(b.date) - getTime(a.date);
      });
  }
}

export default function FeedCardList() {
  // SINGLE instance: owns sortBy + gives rawPosts
  const { rawPosts, sortBy, setSortBy, isLoading, isError, error } = useFeedPosts();

  // Subs state derived from the SAME rawPosts
  const { availableSubs, selectedSubs, toggleSub, selectAll, clearAll } = useFeedSubs(rawPosts);

  // compute filtered → sorted
  const filtered = useMemo(() => filterBySubs(rawPosts, selectedSubs), [rawPosts, selectedSubs]);
  const posts = useMemo(() => sortPosts(filtered, sortBy), [filtered, sortBy]);

  if (isLoading) return <p className="p-4">Loading…</p>;
  if (isError) return <p className="p-4">Error: {String((error as any)?.message || 'failed')}</p>;

  return (
    <div className="grid gap-6">
      <FeedSortAndFilter
        value={sortBy}
        onChange={setSortBy}
        subs={availableSubs}
        selectedSubs={selectedSubs}
        onToggleSub={toggleSub}
        onSelectAll={selectAll}
        onClearAll={clearAll}
      />
      {posts.map((p) => (
        <FeedCard
          key={p.id}
          postTitle={p.postTitle}
          profileImg={p.profileImg}
          featuredImg={p.featuredImg}
          profileName={p.profileName}
          sub={p.sub}
          commentCount={p.commentCount}
          upvotes={p.upvotes}
          downvotes={p.downvotes}
          postContent={p.postContent}
          date={p.date}
        />
      ))}
    </div>
  );
}
