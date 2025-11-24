import React from 'react';
import Card from '../ui/Card';
import { Link } from 'react-router-dom';

export default function SidebarFriends() {
  return (
    <Card title="Friends">
      <ul>
        <li><Link to="/profile/kenneth">Kenneth</Link></li>
        <li><Link to="/profile/burak">Burak</Link></li>
        <li><Link to="/profile/bo">Bo</Link></li>
        <li><Link to="/profile/peter">Peter</Link></li>
      </ul>
    </Card>
  );
}
