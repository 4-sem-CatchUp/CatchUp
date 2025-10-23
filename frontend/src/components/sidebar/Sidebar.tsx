// src/components/sidebar/Sidebar.jsx
import React from 'react';
//import SidebarAchievements from './SidebarAchievements';
import SidebarSubbedGroups from './SidebarSubbedGroups';
import SidebarFriends from './SidebarFriends';

export default function Sidebar() {
  return (
    <div className="space-y-6">
      <SidebarFriends />
      <SidebarSubbedGroups />
    </div>
  );
}
