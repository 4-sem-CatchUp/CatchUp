/** ---------- Interfaces ----------*/

export interface Profile {
  id: number;
  username: string;
  name: string;
  bio: string;
  rank: number;
}

export interface Achievement {
  id: number;
  title: string;
  date: string;
}

export interface Comment {
  id: number;
  text: string;
  date: string;
}

export interface Activity {
  id: number;
  type: 'post' | 'comment';
  content: string;
  date: string;
}
