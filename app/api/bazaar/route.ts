import { NextRequest } from 'next/server';
import { useFacilitator } from 'x402/verify';
import { facilitator } from '@coinbase/x402';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get('limit');
  const offsetParam = searchParams.get('offset');

  const limit = Math.max(1, Math.min(100, Number(limitParam ?? 18) || 18));
  const offset = Math.max(0, Number(offsetParam ?? 0) || 0);

  try {
    const { list } = useFacilitator(facilitator);
    const result = await list({ limit, offset });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    // Log failure with context
    console.error('[BAZAAR_API_ERROR]', {
      url: request.url,
      limit,
      offset,
      userAgent: request.headers.get('user-agent') || 'unknown',
      error: {
        message: (e as Error)?.message,
        stack: (e as Error)?.stack,
        name: (e as Error)?.name,
      },
    });

    return new Response(
      JSON.stringify({ error: (e as Error).message || 'Failed to fetch bazaar services' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}


