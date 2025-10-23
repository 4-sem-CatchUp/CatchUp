import React from 'react';
import Card from '../ui/Card';

export default function SidebarAchievements() {
  return (
    <Card title="Achievements">
      <ul>
        <li>Logged in 7 days in a row</li>
        <li>Commented 70 times</li>
        <li>Chatted with 5 people</li>
      </ul>
    </Card>
  );
}
