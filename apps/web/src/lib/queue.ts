import { Queue } from 'bullmq';
import { redis } from './redis';
import { JobType, ProcessingJobPayload } from '@job-ats/shared-types';

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
};

export const jobQueue = new Queue('job-processing', { connection });

interface QueueJobParams {
  type: JobType;
  payload: ProcessingJobPayload;
}

export async function queueJob({ type, payload }: QueueJobParams) {
  const job = await jobQueue.add(
    type,
    payload,
    {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: {
        age: 86400, // 24 hours
        count: 1000,
      },
      removeOnFail: {
        age: 604800, // 7 days
      },
    }
  );

  return job.id;
}
