import { useQuery } from '@tanstack/react-query'
import { getFeed } from '@/services/feedService'

export function useFeed() {
  return useQuery({ queryKey: ['feed'], queryFn: getFeed })
}