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

export type HealthStatus = 'unknown' | 'healthy' | 'unhealthy';

type UseBazaarParams = {
  limit?: number;
};

export function useBazaar({ limit = 18 }: UseBazaarParams = {}) {
  const [services, setServices] = useState<BazaarService[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [statusByEndpoint, setStatusByEndpoint] = useState<Record<string, HealthStatus>>({});

  async function checkHealth(endpoints: string[]) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    try {
      await Promise.allSettled(
        endpoints.map(async (endpoint) => {
          try {
            const url = `/api/health?${new URLSearchParams({ endpoint }).toString()}`;
            const res = await fetch(url, { method: 'GET', cache: 'no-store', signal: controller.signal });
            // Consider 402 Payment Required as "reachable" (healthy) for x402-enabled services
            const ok = (res.status >= 200 && res.status < 400) || res.status === 402;
            setStatusByEndpoint((prev) => ({ ...prev, [endpoint]: ok ? 'healthy' : 'unhealthy' }));
          } catch {
            setStatusByEndpoint((prev) => ({ ...prev, [endpoint]: 'unhealthy' }));
          }
        })
      );
    } finally {
      clearTimeout(timeout);
    }
  }

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
      // initialize unknown status for new endpoints, then kick off health checks
      const endpoints = items.map((it) => it.resource);
      setStatusByEndpoint((prev) => {
        const next = { ...prev };
        for (const ep of endpoints) if (!(ep in next)) next[ep] = 'unknown';
        return next;
      });
      // fire and forget
      void checkHealth(endpoints);
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
      // add unknown status and trigger health checks for newly added endpoints only
      const newEndpoints = newItems.map((it) => it.resource);
      setStatusByEndpoint((prev) => {
        const next = { ...prev };
        for (const ep of newEndpoints) if (!(ep in next)) next[ep] = 'unknown';
        return next;
      });
      void checkHealth(newEndpoints);
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
    statusByEndpoint,
  } as const;
}


