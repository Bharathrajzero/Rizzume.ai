import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { queueJob } from '@/lib/queue';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { resumeId } = await req.json();

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
      include: { user: true },
    });

    if (!resume || resume.user.email !== session.user.email) {
      return NextResponse.json(
        { success: false, error: 'Resume not found' },
        { status: 404 }
      );
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: { status: 'PROCESSING' },
    });

    await queueJob({
      type: 'RESUME_PARSE',
      payload: {
        resumeId: resume.id,
        s3Key: resume.s3Key,
      },
    });

    return NextResponse.json({
      success: true,
      data: { status: 'processing' },
    });

  } catch (error) {
    console.error('Resume process error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
