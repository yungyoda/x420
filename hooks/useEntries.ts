import { useQuery } from '@tanstack/react-query';
import { getEntries, type GetEntriesResponse, type GetEntriesParams } from '@/lib/api';

export function useEntries(params: GetEntriesParams = {}) {
  return useQuery<GetEntriesResponse, Error>({
    queryKey: ['entries', params],
    queryFn: async () => getEntries(params),
    staleTime: 15_000,
  });
}


