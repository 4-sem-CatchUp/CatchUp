import { Profile, Achievement, Comment, Activity } from '@/types/types';

// src/services/profileService.js
const BASE_URL = '/api';

export async function getProfile(username: string, signal: AbortSignal): Promise<Profile> {
  const res = await fetch(`${BASE_URL}/profile/${encodeURIComponent(username)}`, { signal });
  if (!res.ok) throw new Error(`Profile fetch failed: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getAchievement(username: string, signal: AbortSignal): Promise<Achievement[]> {
  const res = await fetch(`${BASE_URL}/profile/${encodeURIComponent(username)}/achievement`, { signal });
  if (!res.ok) throw new Error(`Achievement fetch failed: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getComment(username: string, signal: AbortSignal): Promise<Comment[]> {
  const res = await fetch(`${BASE_URL}/profile/${encodeURIComponent(username)}/comment`, { signal });
  if (!res.ok) throw new Error(`Comment fetch failed: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getActivity(username: string, signal: AbortSignal): Promise<Activity[]> {
  const res = await fetch(`${BASE_URL}/profile/${encodeURIComponent(username)}/activity`, { signal });
  if (!res.ok) throw new Error(`Activity fetch failed: ${res.status} ${res.statusText}`);
  return res.json();
}
