import { useQuery } from '@tanstack/react-query';
import { getAchievement } from '@/services/profileService';
import { Achievement } from '@/types/types';

export function useAchievementQuery(username: string) {
  return useQuery<Achievement[]>({
    queryKey: ['achievements', username],
    queryFn: ({ signal }) => getAchievement(username, signal),
    enabled: Boolean(username),
  });
}
