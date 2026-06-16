import { Worker } from 'bullmq';
import axios from 'axios';

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
};

const WORKER_URL = process.env.WORKER_URL || 'http://localhost:8000';

const worker = new Worker(
  'job-processing',
  async (job) => {
    console.log(`Processing job ${job.id} of type ${job.name}`);

    try {
      switch (job.name) {
        case 'RESUME_PARSE':
          await axios.post(`${WORKER_URL}/process-resume`, job.data);
          break;
        case 'JOB_ANALYSIS':
          await axios.post(`${WORKER_URL}/analyze-job`, job.data);
          break;
        default:
          throw new Error(`Unknown job type: ${job.name}`);
      }

      return { success: true };
    } catch (error) {
      console.error(`Job ${job.id} failed:`, error);
      throw error;
    }
  },
  {
    connection,
    concurrency: 2,
  }
);

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});

console.log('Worker started and listening for jobs...');
