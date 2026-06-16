import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import pdf from 'pdf-parse';

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Simple cosine similarity
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

export async function processResume(resumeId: string) {
  try {
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
    if (!resume) throw new Error('Resume not found');

    await prisma.resume.update({
      where: { id: resumeId },
      data: { status: 'PROCESSING' },
    });

    // Decode base64 PDF
    const pdfBuffer = Buffer.from(resume.fileContent, 'base64');
    const data = await pdf(pdfBuffer);
    const rawText = data.text;

    // Generate embedding
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: rawText.slice(0, 8000), // Limit to 8k chars
    });
    const embedding = embeddingResponse.data[0].embedding;

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        status: 'COMPLETED',
        rawText,
        embedding: JSON.stringify(embedding),
      },
    });

    console.log(`✅ Resume ${resumeId} processed successfully`);
  } catch (error) {
    console.error(`❌ Resume ${resumeId} failed:`, error);
    await prisma.resume.update({
      where: { id: resumeId },
      data: { status: 'FAILED' },
    });
  }
}

export async function analyzeJobMatch(applicationId: string) {
  try {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { resume: true },
    });

    if (!application || !application.resume) {
      throw new Error('Application or resume not found');
    }

    const { resume, jobDescription } = application;

    if (!resume.embedding || !resume.rawText) {
      throw new Error('Resume not processed yet');
    }

    // Get job embedding
    const jobEmbedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: jobDescription.slice(0, 8000),
    });
    const jobVector = jobEmbedding.data[0].embedding;
    const resumeVector = JSON.parse(resume.embedding);

    // Calculate similarity
    const similarity = cosineSimilarity(resumeVector, jobVector);
    const matchScore = Math.round(similarity * 100);

    // Get AI analysis
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an ATS expert. Analyze resume vs job description. Return only valid JSON.',
        },
        {
          role: 'user',
          content: `Job Description:\n${jobDescription}\n\nResume:\n${resume.rawText}\n\nProvide JSON with:\n1. missingKeywords: array of important missing keywords\n2. suggestions: array of {section, improvement, reason}\n3. tailoredResume: optimized resume text`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const analysis = JSON.parse(completion.choices[0].message.content || '{}');

    await prisma.application.update({
      where: { id: applicationId },
      data: {
        matchScore,
        missingKeywords: JSON.stringify(analysis.missingKeywords || []),
        suggestions: JSON.stringify(analysis.suggestions || []),
        tailoredResume: analysis.tailoredResume || resume.rawText,
      },
    });

    console.log(`✅ Application ${applicationId} analyzed - Score: ${matchScore}%`);
  } catch (error) {
    console.error(`❌ Application ${applicationId} analysis failed:`, error);
  }
}
