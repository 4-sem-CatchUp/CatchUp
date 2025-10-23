import React from 'react';
import Card from '../../../components/ui/Card';
import { useParams } from 'react-router-dom';
import { useCommentQuery } from '../api/index';

/**
 * ProfileComments component
 *
 * Displays the comments section on a user’s profile.
 * Includes:
 * - A list of previous comments made about the profile
 * - An input area where visitors can add a new comment
 *
 * Currently placeholder text, but intended for future
 * integration with a comments system.
 */

export default function ProfileComments() {
  const { username } = useParams<{ username: string }>();
  const { data: comment } = useCommentQuery(username!);
  return (
    <Card title="Comments">
      <ul>
        {comment?.map((item) => (
          <li key={item.id}>
            {item.text}
            <span className="text-xs text-gray-500 dark:text-gray-400"> ({item.date})</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
