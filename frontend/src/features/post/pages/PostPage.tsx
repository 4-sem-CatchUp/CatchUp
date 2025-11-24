import React from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import PostContent from '../components/PostContent';
import PostCommentSection from '../components/PostCommentSection';
import PostRelatedPosts from '../components/PostRelatedPosts';

export default function PostPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-gray-900 dark:text-stone-50 dark:bg-gray-950">
      <div className="mx-auto max-w-screen-xl py-10">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* MAIN COLUMN */}
          <article className="md:col-span-3 space-y-6">
            <PostContent
              title="Eksempel på Post"
              profileImg="/images/profile.jpg"
              profileName="Bo"
              sub="Frontend / React"
              date="2025-11-05"
              featuredImg="/images/sample-post.jpg"
              postText="Dette er selve postens indhold. Her kan der være længere tekstafsnit, billeder, kodeeksempler eller refleksioner. 
              CatchUp er bygget med React, Tailwind og TypeScript for at give en hurtig og moderne udviklingsoplevelse."
              upvotes={12}
              downvotes={1}
              commentCount={3}
            />
            <PostCommentSection /> 
            <PostRelatedPosts />
          </article>

          {/* SIDEBAR */}
          <aside className="md:col-span-1">
            <Sidebar />
          </aside>
        </section>
      </div>
    </main>
  );
}
