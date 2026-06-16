import { NextRequest, NextResponse } from 'next/server';
import { analyzeJobMatch } from '@/lib/worker-simple';

export async function POST(req: NextRequest) {
  try {
    const { applicationId } = await req.json();

    if (!applicationId) {
      return NextResponse.json({ error: 'Missing applicationId' }, { status: 400 });
    }

    // Process async
    analyzeJobMatch(applicationId).catch(console.error);

    return NextResponse.json({ success: true, message: 'Analysis started' });
  } catch (error) {
    console.error('Match error:', error);
    return NextResponse.json({ error: 'Match failed' }, { status: 500 });
  }
}
