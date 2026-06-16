import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { queueJob } from '@/lib/queue';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { applicationId } = await req.json();

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { user: true, resume: true },
    });

    if (!application || application.user.email !== session.user.email) {
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
    }

    if (!application.resume) {
      return NextResponse.json({ success: false, error: 'No resume attached' }, { status: 400 });
    }

    await queueJob({
      type: 'JOB_ANALYSIS',
      payload: {
        applicationId: application.id,
        jobDescription: application.jobDescription,
      },
    });

    return NextResponse.json({ success: true, data: { status: 'processing' } });
  } catch (error) {
    console.error('Match error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
