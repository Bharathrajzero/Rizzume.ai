import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const { url } = await req.json();

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    
    const jobTitle = $('h1').first().text().trim() || 'Unknown Position';
    const company = $('[class*="company"]').first().text().trim() || 'Unknown Company';
    
    let jobDescription = '';
    $('[class*="description"], [class*="job-description"], .description').each((_, el) => {
      jobDescription += $(el).text() + '\n';
    });

    if (!jobDescription) {
      jobDescription = $('body').text().slice(0, 2000);
    }

    const application = await prisma.application.create({
      data: {
        userId: user.id,
        jobTitle,
        company,
        jobDescription: jobDescription.trim(),
        jobUrl: url,
        source: 'scraper',
        status: 'SAVED',
      },
    });

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    console.error('Scrape error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to scrape job posting' 
    }, { status: 500 });
  }
}
