import { z } from 'zod/v3';

export const CheckIaCJobStatusSchema = z.object({
  jobId: z.string().describe('Job ID returned from generate IaC request')
});

export type CheckIaCJobStatusParams = z.infer<typeof CheckIaCJobStatusSchema>;
