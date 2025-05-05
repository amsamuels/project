import { NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0'; // adjust the import if needed

export const GET = async () => {
  try {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { token: accessToken } = await auth0.getAccessToken();

    const apiPort = process.env.API_PORT || '3001';
    const response = await fetch(`http://localhost:${apiPort}/api/shows`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return NextResponse.json(
        { error: 'Failed to fetch shows', details: errorBody },
        { status: response.status }
      );
    }

    const shows: unknown = await response.json();
    return NextResponse.json(shows);
  } catch (error) {
    const err = error as Error & { status?: number };
    return NextResponse.json(
      { error: err.message },
      { status: err.status || 500 }
    );
  }
};
