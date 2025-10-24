import { NextResponse } from 'next/server';
import {
  formatUsdLabel,
  getDigitalDrugAsset,
  getDigitalDrugBaseUrl,
  getDigitalDrugNetwork,
  getDigitalDrugWallet,
  listDigitalDrugOfferings,
} from '@/lib/digital-drugs';

export async function GET(): Promise<NextResponse> {
  const wallet = getDigitalDrugWallet();
  if (!wallet) {
    return NextResponse.json({ error: 'Digital experience wallet is not configured' }, { status: 500 });
  }

  const network = getDigitalDrugNetwork();
  const asset = getDigitalDrugAsset();
  const baseUrl = getDigitalDrugBaseUrl().replace(/\/$/, '');

  const offerings = listDigitalDrugOfferings().map((offering) => ({
    id: offering.id,
    slug: offering.slug,
    title: offering.title,
    description: offering.description,
    price: formatUsdLabel(offering.priceUsd),
    network,
    asset,
    maxTimeoutSeconds: offering.maxTimeoutSeconds,
    effectSummary: offering.effectSummary,
    endpoint: `${baseUrl}${offering.endpointPath}`,
    sessionDurationSeconds: offering.sessionDurationSeconds,
    intensities: offering.intensities.map((intensity) => ({
      key: intensity.key,
      label: intensity.label,
      cadence: intensity.cadence
    })),
    vibes: offering.vibes,
    soundtrack: offering.soundtrack,
    safetyNotes: offering.safetyNotes,
    tags: offering.tags
  }));

  return NextResponse.json({
    x402Version: 1,
    wallet,
    asset,
    network,
    offerings
  });
}


