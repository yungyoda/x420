import { NextRequest } from 'next/server';

// Simple health-check proxy that bypasses x402 and fetches the given endpoint.
// Usage: GET /api/health?endpoint=https%3A%2F%2Fapi.example.com%2Fping
export async function GET(request: NextRequest) {
  const incomingUrl = new URL(request.url);
  const endpoint = incomingUrl.searchParams.get('endpoint');

  if (!endpoint) {
    return new Response(JSON.stringify({ error: 'Missing endpoint parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Only allow http/https
  let targetUrl: URL;
  try {
    targetUrl = new URL(endpoint);
    if (!/^https?:$/i.test(targetUrl.protocol)) {
      return new Response(JSON.stringify({ error: 'Only http/https endpoints are allowed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid endpoint URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Forward all query params except our own "endpoint" to the target
  incomingUrl.searchParams.forEach((value, key) => {
    if (key !== 'endpoint') {
      targetUrl.searchParams.set(key, value);
    }
  });

  const headers = new Headers(request.headers);
  headers.delete('host');

  try {
    const response = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    const proxiedHeaders = new Headers(response.headers);
    proxiedHeaders.delete('content-encoding');
    proxiedHeaders.delete('content-length');
    // Surface that this was proxied by the health check utility
    proxiedHeaders.set('x-proxied-by', 'x402-healthcheck');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: proxiedHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to reach endpoint' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


