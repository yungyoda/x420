import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEntries, type GetEntriesParams, type Entry } from '@/lib/api';

export function usePaginatedEntries(initialSort: GetEntriesParams['sort'] = 'newest') {
  const [sort, setSort] = useState<GetEntriesParams['sort']>(initialSort);
  const [allEntries, setAllEntries] = useState<Entry[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['entries', { sort, offset: 0 }], // Always start from offset 0 for new queries
    queryFn: async () => {
      const result = await getEntries({ sort, limit: 20, offset: 0 });
      setAllEntries(result.entries);
      setOffset(20);
      setHasMore(result.pagination.hasMore);
      return result;
    },
    staleTime: 15_000,
  });

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const result = await getEntries({ sort, limit: 20, offset });
      setAllEntries(prev => [...prev, ...result.entries]);
      setOffset(prev => prev + 20);
      setHasMore(result.pagination.hasMore);
    } catch (error) {
      console.error('Failed to load more entries:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [sort, offset, hasMore, isLoadingMore]);

  const changeSort = useCallback((newSort: GetEntriesParams['sort']) => {
    setSort(newSort);
    setAllEntries([]);
    setOffset(0);
    setHasMore(true);
  }, []);

  return {
    entries: allEntries,
    pagination: data?.pagination,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    changeSort,
    currentSort: sort,
    refetch,
  };
}
