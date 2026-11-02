import { NextRequest, NextResponse } from 'next/server';
import { saveResponse, getAllResponses } from '@/lib/db';
import { DateResponse } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body: DateResponse = await req.json();

    if (!body || !body.destination) {
      return NextResponse.json(
        { error: 'Incomplete date proposal details' },
        { status: 400 }
      );
    }

    const userAgent = req.headers.get('user-agent') || 'Unknown Device';
    const enrichedData: DateResponse = {
      ...body,
      shreya_name: 'Shreya',
      user_agent: userAgent,
    };

    const result = await saveResponse(enrichedData);

    return NextResponse.json({
      success: true,
      message: 'Love response recorded successfully! 💖',
      id: result.id,
      source: result.source,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pin = searchParams.get('pin');
    const secretPin = process.env.ADMIN_PIN || '143';

    if (pin !== secretPin) {
      return NextResponse.json(
        { error: 'Incorrect Passcode. Only for Shreya\'s boyfriend! 😉' },
        { status: 401 }
      );
    }

    const responses = await getAllResponses();
    return NextResponse.json({ success: true, count: responses.length, responses });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
