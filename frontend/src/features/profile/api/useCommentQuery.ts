import { useQuery } from '@tanstack/react-query';
import { getComment } from '@/services/profileService';
import { Comment } from '@/types/types';

export function useCommentQuery(username: string) {
  return useQuery<Comment[]>({
    queryKey: ['comment', username],
    queryFn: ({ signal }) => getComment(username, signal),
    enabled: Boolean(username),
  });
}
