// @note: Ideally this would be handled in the middleware, but vercel has a 1MB limit for middleware

import { redis } from '@/lib/redis';
import { paymentMiddleware, Network } from 'x402-next';
import { NextRequest } from 'next/server';

type StoredEntry = {
  endpoint: string;
  title: string;
  description: string;
  amount: string;
  wallet: string;
  createdAt: string;
};

async function handleEntryRequest(request: NextRequest, entryId: string) {
  const entryKey = `entry:${entryId}`;
  const entry = (await redis.get(entryKey)) as StoredEntry | null;

  if (!entry) {
    return new Response(
      JSON.stringify({ error: 'Entry not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const network = ((process.env.X402_NETWORK as Network) || 'base-sepolia') as Network;

  // Create a custom handler that does payment verification AND proxying
  const customHandler = async (req: NextRequest) => {
    // First, handle payment verification
    const routes = {
      [`/api/${entryId}`]: {
        price: `$${entry.amount}`,
        network,
        config: {
          description: entry.title || `Access to ${entryId}`,
        },
      },
    } as Record<string, { price: string; network: Network; config?: { description?: string } }>;

    const paymentHandler = paymentMiddleware(entry.wallet as `0x${string}`, routes);
    const paymentResult = await paymentHandler(req);
    
    // If payment failed, return the payment response
    if (paymentResult.status !== 200) {
      return paymentResult;
    }

    // If payment succeeded, proxy to the target endpoint
    const incomingUrl = new URL(req.url);
    const targetUrl = new URL(entry.endpoint);
    
    // Preserve query string
    incomingUrl.searchParams.forEach((value, key) => {
      targetUrl.searchParams.set(key, value);
    });

    // Prepare headers for the proxied request
    const headers = new Headers(req.headers);
    headers.delete('host');

    // Proxy the request method and body
    const method = req.method;
    const hasBody = !['GET', 'HEAD'].includes(method.toUpperCase());

    const response = await fetch(targetUrl.toString(), {
      method,
      headers,
      body: hasBody ? req.body : undefined,
    });

    console.log('=== PROXY DEBUG ===');
    console.log('Target URL:', targetUrl.toString());
    console.log('Response status:', response.status);
    console.log('Response statusText:', response.statusText);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    console.log('Response body type:', response.body?.constructor.name);
    console.log('Response body locked:', response.body?.locked);
    console.log('==================');

    // Stream back the response with original headers and status
    const proxiedHeaders = new Headers(response.headers);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: proxiedHeaders,
    });
  };

  return customHandler(request);
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ entryId: string }> }) {
  const { entryId } = await params;
  return handleEntryRequest(request, entryId);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ entryId: string }> }) {
  const { entryId } = await params;
  return handleEntryRequest(request, entryId);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ entryId: string }> }) {
  const { entryId } = await params;
  return handleEntryRequest(request, entryId);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ entryId: string }> }) {
  const { entryId } = await params;
  return handleEntryRequest(request, entryId);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ entryId: string }> }) {
  const { entryId } = await params;
  return handleEntryRequest(request, entryId);
}

export async function HEAD(request: NextRequest, { params }: { params: Promise<{ entryId: string }> }) {
  const { entryId } = await params;
  return handleEntryRequest(request, entryId);
}

export async function OPTIONS(request: NextRequest, { params }: { params: Promise<{ entryId: string }> }) {
  const { entryId } = await params;
  return handleEntryRequest(request, entryId);
}
