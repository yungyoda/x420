import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { paymentMiddleware, Network } from 'x402-next';

// Using direct env read so middleware can run at edge
const redis = Redis.fromEnv();

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow entries management endpoints without paywall
  if (pathname.startsWith('/api/entries')) {
    return NextResponse.next();
  }

  // Only handle /api/:entryId
  const match = pathname.match(/^\/api\/([^\/]+)(?:\/)??$/);
  if (!match) {
    return NextResponse.next();
  }

  const entryId = match[1];

  // Fetch entry data to get amount and wallet
  const entry = await redis.get(`entry:${entryId}`) as
    | { amount: string; wallet: `0x${string}`; title?: string; description?: string; endpoint: string }
    | null;

  if (!entry) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  }

  const network = ((process.env.X402_NETWORK as Network) || 'base-sepolia') as Network;

  // Create a custom handler that does payment verification AND proxying
  const customHandler = async (request: NextRequest) => {
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

    const paymentHandler = paymentMiddleware(entry.wallet, routes);
    const paymentResult = await paymentHandler(request);
    
    // If payment failed, return the payment response
    if (paymentResult.status !== 200) {
      return paymentResult;
    }

    // If payment succeeded, proxy to the target endpoint
    const incomingUrl = new URL(request.url);
    const targetUrl = new URL(entry.endpoint);
    
    // Preserve query string
    incomingUrl.searchParams.forEach((value, key) => {
      targetUrl.searchParams.set(key, value);
    });

    // Prepare headers for the proxied request
    const headers = new Headers(request.headers);
    headers.delete('host');

    // Proxy the request method and body
    const method = request.method;
    const hasBody = !['GET', 'HEAD'].includes(method.toUpperCase());

    const response = await fetch(targetUrl.toString(), {
      method,
      headers,
      body: hasBody ? request.body : undefined,
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

  return customHandler(req);
}

export const config = {
  matcher: ['/api/:path*'],
};


