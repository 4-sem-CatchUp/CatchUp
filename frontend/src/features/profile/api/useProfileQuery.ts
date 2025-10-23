import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/profileService';
import { Profile } from '@/types/types';

export function useProfileQuery(username: string) {
  return useQuery<Profile>({
    queryKey: ['profile', username],
    queryFn: ({ signal }) => getProfile(username, signal),
    enabled: Boolean(username),
  });
}
