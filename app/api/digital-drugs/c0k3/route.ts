import { NextRequest } from 'next/server';
import { POST as basePost, GET as baseGet } from '../[slug]/route';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  return basePost(request, { params: Promise.resolve({ slug: 'c0k3' }) });
}

export async function GET() {
  return baseGet();
}


