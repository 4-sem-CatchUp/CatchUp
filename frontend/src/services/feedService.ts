// src/services/feedService.js
const BASE_URL = '/api';

export async function getFeed() {
  const res = await fetch(`${BASE_URL}/feed`);
  if (!res.ok) throw new Error(`Feed fetch failed: ${res.status}`);
  return res.json();
}
