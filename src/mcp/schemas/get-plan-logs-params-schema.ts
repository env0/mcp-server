import { z } from 'zod';

export const GetPlanLogsParamsSchema = z.object({
  environmentId: z.string().describe('The ID of the environment to get plan logs for')
});

export type GetPlanLogsParams = z.infer<typeof GetPlanLogsParamsSchema>;
