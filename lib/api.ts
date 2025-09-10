export type CreateEntryPayload = {
  endpoint: string;
  title: string;
  description: string;
  amount: string;
  wallet: string;
};

export type CreateEntryResponse = {
  id: string;
};

export async function createEntry(payload: CreateEntryPayload, init?: RequestInit): Promise<CreateEntryResponse> {
  const res = await fetch('/api/entries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    ...init,
  });

  if (!res.ok) {
    let message = 'Failed to create entry';
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {}
    throw new Error(message);
  }

  return res.json();
}

export type Entry = {
  id: string;
  title: string;
  description: string;
  amount: string;
  wallet: string;
  createdAt: string;
  expiresAt: string | null;
};

export type PaginationInfo = {
  total: number;
  hasMore: boolean;
  nextOffset: number | null;
  limit: number;
  offset: number;
};

export type GetEntriesResponse = {
  entries: Entry[];
  pagination: PaginationInfo;
};

export type GetEntriesParams = {
  limit?: number;
  offset?: number;
  sort?: 'newest' | 'oldest' | 'amount_asc' | 'amount_desc';
};

export async function getEntries(params: GetEntriesParams = {}, init?: RequestInit): Promise<GetEntriesResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.limit !== undefined) searchParams.set('limit', params.limit.toString());
  if (params.offset !== undefined) searchParams.set('offset', params.offset.toString());
  if (params.sort) searchParams.set('sort', params.sort);

  const url = `/api/entries${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  
  const res = await fetch(url, {
    method: 'GET',
    ...init,
  });
  if (!res.ok) {
    throw new Error('Failed to fetch entries');
  }
  return res.json();
}

// Health check: fetch given endpoint through backend health proxy
export async function healthCheck(targetEndpoint: string, init?: RequestInit): Promise<Response> {
  const url = `/api/health?${new URLSearchParams({ endpoint: targetEndpoint }).toString()}`;
  const res = await fetch(url, { method: 'GET', cache: 'no-store', ...init });
  return res;
}


