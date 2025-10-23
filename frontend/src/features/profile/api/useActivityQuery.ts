import { useQuery } from '@tanstack/react-query';
import { getActivity } from '@/services/profileService';
import { Activity } from '@/types/types';

export function useActivityQuery(username: string) {
  return useQuery<Activity[]>({
    queryKey: ['activity', username],
    queryFn: ({ signal }) => getActivity(username, signal),
    enabled: Boolean(username),
  });
}
