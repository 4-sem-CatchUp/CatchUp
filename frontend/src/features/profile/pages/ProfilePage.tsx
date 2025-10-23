import React from 'react';

import ProfileAchievements from '../components/ProfileAchievements';
import ProfileComments from '../components/ProfileComments';
import ProfileActivity from '../components/ProfileActivity';
import ProfileHeader from '../components/ProfileHeader';
import Sidebar from '@/components/sidebar/Sidebar';

/**
 * ProfilePage component
 *
 * Renders the main profile page layout.
 * Includes:
 * - ProfileHeader at the top
 * - Main grid with ProfileActivity, Achievements, and Comments
 * - Sidebar on the right (on medium+ screens)
 *
 * Layout is responsive: single column on mobile, 3/1 split on larger screens.
 */

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-gray-900 dark:text-stone-50 dark:bg-gray-950">
      <div className="mx-auto max-w-screen-xl py-10">
        {/* PROFILE HEADER */}
        <ProfileHeader />

        {/* MAIN GRID: 75 / 25 split on md+ */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 75% column */}
          <div className="md:col-span-3 space-y-6">
            <ProfileActivity />
            <ProfileAchievements />
            <ProfileComments />
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
