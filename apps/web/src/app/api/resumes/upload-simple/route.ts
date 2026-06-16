import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { processResume } from '@/lib/worker-simple';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!file || !userId) {
      return NextResponse.json({ error: 'Missing file or userId' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files allowed' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }

    // Convert to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    const resume = await prisma.resume.create({
      data: {
        userId,
        name: file.name,
        fileName: file.name,
        fileContent: base64,
        status: 'PENDING',
      },
    });

    // Process async
    processResume(resume.id).catch(console.error);

    return NextResponse.json({ success: true, data: resume });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
