"use client";

import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export type BazaarService = {
  accepts: Array<{
    asset: string;
    description?: string;
    extra?: Record<string, unknown> & { name?: string; version?: string };
    maxAmountRequired: string;
    maxTimeoutSeconds?: number;
    mimeType?: string;
    network?: string;
    outputSchema?: {
      input?: { method?: string; type?: string };
      output?: unknown | null;
    };
    payTo?: string;
    resource?: string;
    scheme?: string;
  }>;
  lastUpdated?: string;
  metadata?: Record<string, unknown>;
  resource: string;
  type: string;
  x402Version?: number;
  endpoint?: string; // Non-standard convenience alias for resource
};

export type BazaarListResponse = {
  items: BazaarService[];
  total?: number;
};

type UseBazaarParams = {
  limit?: number;
};

export function useBazaar({ limit = 18 }: UseBazaarParams = {}) {
  const [services, setServices] = useState<BazaarService[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [total, setTotal] = useState<number | undefined>(undefined);

  const query = useQuery<{ items: BazaarService[]; total?: number }, Error>({
    queryKey: ["bazaar", { limit, offset: 0 }],
    queryFn: async () => {
      const res = await fetch(`/api/bazaar?${new URLSearchParams({ limit: String(limit), offset: "0" }).toString()}`, { method: "GET", cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to fetch bazaar services");
      }
      const data: BazaarListResponse = await res.json();
      const items = (data?.items || []).map((s) => ({ ...s, endpoint: s.resource }));
      setServices(items);
      setOffset(items.length);
      setTotal(data?.total);
      const inferredHasMore = typeof data?.total === "number" ? items.length < (data.total || 0) : items.length === limit;
      setHasMore(inferredHasMore);
      return { items, total: data?.total };
    },
    staleTime: 30_000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const res = await fetch(`/api/bazaar?${new URLSearchParams({ limit: String(limit), offset: String(offset) }).toString()}`, { method: "GET", cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to fetch bazaar services");
      }
      const data: BazaarListResponse = await res.json();
      const newItems = (data?.items || []).map((s) => ({ ...s, endpoint: s.resource }));
      setServices((prev) => [...prev, ...newItems]);
      const newOffset = offset + newItems.length;
      setOffset(newOffset);
      const totalCount = typeof data?.total === "number" ? data.total : total;
      const inferredHasMore = typeof totalCount === "number"
        ? newOffset < totalCount
        : newItems.length === limit; // if full page, assume more
      setHasMore(inferredHasMore);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Failed to load more bazaar services:", e);
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasMore, isLoadingMore, limit, offset, total]);

  return {
    services,
    total: typeof total === "number" ? total : services.length,
    isLoading: query.isLoading,
    error: query.error,
    hasMore,
    isLoadingMore,
    loadMore,
  } as const;
}


