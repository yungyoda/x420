import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

type Entry = {
  endpoint: string;
  title: string;
  description: string;
  amount: string;
  wallet: string;
  createdAt: string;
};

const ONE_DAY_SECONDS = 60 * 60 * 24;

function generateId(): string {
  // Prefer crypto.randomUUID when available
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return (crypto as any).randomUUID();
  }
  // Fallback simple unique id
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { endpoint, title, description, amount, wallet } = body ?? {};

    // Basic validation
    if (!endpoint || !title || !description || !amount || !wallet) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = generateId();

    const entry: Entry = {
      endpoint: String(endpoint),
      title: String(title),
      description: String(description),
      amount: String(amount),
      wallet: String(wallet),
      createdAt: new Date().toISOString(),
    };

    // Store as JSON string with 1-day TTL
    await redis.set(`entry:${id}`, JSON.stringify(entry), { ex: ONE_DAY_SECONDS });

    return NextResponse.json({ id });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100); // Max 100 entries
    const offset = parseInt(searchParams.get('offset') || '0');
    const sort = searchParams.get('sort') || 'newest'; // newest, oldest, amount_asc, amount_desc

    // Use SCAN instead of keys() for better performance
    const keys: string[] = [];
    let cursor = '0';
    
    do {
      const result = await redis.scan(cursor, {
        match: 'entry:*',
        count: 1000, // Process in batches
      });
      cursor = result[0]; // SCAN returns [cursor, keys]
      keys.push(...result[1]);
    } while (cursor !== '0');

    if (keys.length === 0) {
      return NextResponse.json({ 
        entries: [], 
        pagination: { 
          total: 0, 
          hasMore: false, 
          nextOffset: null,
          limit,
          offset 
        } 
      });
    }

    const values = await redis.mget(...keys) as (Entry | null)[];

    const entries = await Promise.all(
      values.map(async (entry, idx) => {
        if (!entry) return null;
        const id = keys[idx].replace('entry:', '');
        const ttl = await redis.ttl(keys[idx]);
        const expiresAt = ttl > 0 ? new Date(Date.now() + ttl * 1000).toISOString() : null;
        // Remove endpoint from response to frontend
        const { endpoint, ...entryWithoutEndpoint } = entry;
        return { id, ...entryWithoutEndpoint, expiresAt };
      })
    );

    // Filter out null entries and sort
    const validEntries = entries.filter(Boolean) as Array<{ id: string; createdAt: string; amount: string; [key: string]: any }>;
    
    // Apply sorting
    switch (sort) {
      case 'oldest':
        validEntries.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'amount_asc':
        validEntries.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
        break;
      case 'amount_desc':
        validEntries.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
        break;
      case 'newest':
      default:
        validEntries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    // Apply pagination
    const total = validEntries.length;
    const paginatedEntries = validEntries.slice(offset, offset + limit);
    const hasMore = offset + limit < total;
    const nextOffset = hasMore ? offset + limit : null;

    return NextResponse.json({ 
      entries: paginatedEntries,
      pagination: {
        total,
        hasMore,
        nextOffset,
        limit,
        offset
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to list entries' }, { status: 500 });
  }
}


