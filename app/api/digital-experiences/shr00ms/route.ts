import { NextRequest } from 'next/server';
import { POST as basePost, GET as baseGet } from '../[slug]/route';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  return basePost(request, { params: Promise.resolve({ slug: 'shr00ms' }) });
}

export async function GET(request: NextRequest) {
  return baseGet(request, { params: Promise.resolve({ slug: 'shr00ms' }) });
}
