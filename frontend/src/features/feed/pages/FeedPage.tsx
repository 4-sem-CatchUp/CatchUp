import React from 'react';
import FeedFilter from '../components/FeedSortAndFilter';
import FeedCardList from '../components/FeedCardList';
import Sidebar from '@/components/sidebar/Sidebar';

export default function FeedPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-gray-900 dark:text-stone-50 dark:bg-gray-950">
      <div className="mx-auto max-w-screen-xl py-10">
        {/* PROFILE HEADER */}

        {/* MAIN GRID: 75 / 25 split on md+ */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 75% column */}

          <div className="md:col-span-3 space-y-6">
            <FeedCardList />
          </div>

          {/* 25% sidebar */}
          <aside className="md:col-span-1">
            <Sidebar />
          </aside>
        </section>
      </div>
    </main>
  );
}
