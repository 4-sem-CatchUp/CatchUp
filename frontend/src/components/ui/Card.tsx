import React from 'react';
import type { ReactNode } from 'react';

/**
 * Card component
 *
 * Generic container component with a header and content area.
 * Props:
 * - title: string shown in the header
 * - icon: optional element displayed next to the title
 * - children: main content rendered inside the card body
 *
 * Styling:
 * - Rounded border and subtle shadow
 * - Dark mode and light mode background handling
 */

export interface CardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function Card({title, children, icon} : CardProps) {
  return (
    <div className="relative overflow-hidden rounded-sm border dark:border-gray-800 dark:bg-gray-900 bg-stone-50 shadow-sm">
      <div className="bg-gray-800 p-3 pt-2 pb-2 grid grid-cols-[auto_1fr] items-center gap-2">
        <h3>{title}</h3>
        {icon && <span className="text-lg text-green-400">{icon}</span>}
      </div>
      <div className="mt-2 p-3">
        <p>{children}</p>
      </div>
    </div>
  );
}
