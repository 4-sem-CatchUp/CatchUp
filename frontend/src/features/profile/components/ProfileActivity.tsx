import React from 'react';
import Card from '../../../components/ui/Card';
import { useParams } from 'react-router-dom';
import { useActivityQuery } from '../api/index';

/**
 * ProfileActivity component
 * 
 * Shows a user’s recent activity inside a Card.
 * Includes examples such as:
 * - Recent comments across different subs
 * - Recently created posts
 *
 * Currently static placeholder text, but designed to later
 * integrate with dynamic activity data from the platform.
 */

export default function ProfileActivity() {
  const { username } = useParams<{ username: string }>();
  const { data: activity } = useActivityQuery(username!);

  return (
    <Card title="Activity">
      <ul>
        {activity?.map((a) => (
          <li key={a.id}>
            <a href="/" className="hover:text-sky-500 transition">
              {a.content}
            </a>{' '}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({a.date} - {a.type})
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
