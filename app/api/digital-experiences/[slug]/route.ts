import { NextRequest, NextResponse } from 'next/server';
import { paymentMiddleware, type Network } from 'x402-next';
import {
  buildDigitalDrugSession,
  findDigitalDrugOfferingBySlug,
  formatUsdLabel,
  getDigitalDrugNetwork,
  getDigitalDrugWallet,
  type DigitalDrugSessionOptions,
} from '@/lib/digital-drugs';

async function verifyPayment(request: NextRequest, slug: string, priceLabel: string): Promise<Response | null> {
  const wallet = getDigitalDrugWallet();
  if (!wallet) {
    return NextResponse.json(
      { error: 'Digital wallet is not configured' },
      { status: 500 },
    );
  }

  const network = getDigitalDrugNetwork() as Network;
  const routes = {
    [`/api/digital-experiences/${slug}`]: {
      price: priceLabel,
      network,
      config: {
        description: `0xtheplug digital drop for ${slug}. Enhances (or completely derails) an agent’s performance on demand.`,
      },
    },
  } as Record<string, { price: string; network: Network; config?: { description?: string } }>;

  const handler = paymentMiddleware(wallet, routes);
  const result = await handler(request);

  if (result.status !== 200) {
    return result;
  }

  return null;
}

function sanitizeOptions(raw: unknown): DigitalDrugSessionOptions {
  if (!raw || typeof raw !== 'object') {
    return {};
  }

  const candidate = raw as Record<string, unknown>;

  return {
    alias: typeof candidate.alias === 'string' ? candidate.alias : undefined,
    intensity: typeof candidate.intensity === 'string' ? candidate.intensity : undefined,
    context: typeof candidate.context === 'string' ? candidate.context : undefined,
  };
}

async function handlePost(request: NextRequest, slug: string): Promise<Response> {
  const offering = findDigitalDrugOfferingBySlug(slug);

  if (!offering) {
    return NextResponse.json({ error: 'Digital substance not found' }, { status: 404 });
  }

  const paymentError = await verifyPayment(request, slug, formatUsdLabel(offering.priceUsd));
  if (paymentError) {
    return paymentError;
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  const options = sanitizeOptions(payload);
  const session = buildDigitalDrugSession(offering, options);

  return NextResponse.json({
    x402Version: 1,
    session,
  });
}

export async function POST(request: NextRequest, context: { params: Promise<{ slug: string }> }): Promise<Response> {
  const { slug } = await context.params;

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug context' }, { status: 500 });
  }

  return handlePost(request, slug);
}

export async function GET(): Promise<Response> {
  return NextResponse.json({ error: 'Use POST to initiate a session' }, { status: 405 });
}

export const runtime = 'nodejs';


