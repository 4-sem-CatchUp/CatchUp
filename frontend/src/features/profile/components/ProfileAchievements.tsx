import React from 'react';
import Card from '../../../components/ui/Card';
import { useParams } from 'react-router-dom';
import { useAchievementQuery } from '../api/index';

/**
 * ProfileAchievements component
 *
 * Displays a list of the user’s achievements inside a Card.
 * Intended to show earned achievements, and potentially ongoing ones.
 *
 * Currently uses placeholder text, but can later be extended
 * with dynamic achievement data and progress indicators.
 */


export default function ProfileAchievements() {
  const { username } = useParams<{ username: string }>();
  const { data: achievement } = useAchievementQuery(username!);
  return (
    <Card title="Achievements">
      <ul>
        {achievement?.map((a) => (
          <li key={a.id}>
            {a.title} <span className="text-xs text-gray-500 dark:text-gray-400"> ({a.date})</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
