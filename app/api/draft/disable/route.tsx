import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest, NextResponse } from 'next/server';
import { handleUnexpectedError, invalidRequestResponse, makeDraftModeWorkWithinIframes } from '../../utils';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const url = searchParams.get('url') ?? '/';

  try {
    // Avoid open redirect vulnerabilities
    if (!url.startsWith('/')) {
      return invalidRequestResponse('Invalid URL provided. Please try again.', 422);
    }

    draftMode().disable();
    makeDraftModeWorkWithinIframes();
  } catch (error) {
    return handleUnexpectedError(error);
  }

  redirect(url);
}
