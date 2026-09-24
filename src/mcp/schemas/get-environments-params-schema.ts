import z from 'zod/v3';

export const GetEnvironmentsParamsSchema = z.object({
  projectId: z.string().optional().describe('The ID of the project to get environments for'),
  environmentId: z
    .string()
    .optional()
    .describe('The ID of the environment to get, if specified will ignore other parameters'),
  name: z.string().optional().describe('The name of the environment to get'),
  limit: z
    .number()
    .int()
    .positive()
    .max(100)
    .optional()
    .describe('The maximum number of environments to return'),
  offset: z.number().int().nonnegative().optional()
});

export type GetEnvironmentsParams = z.infer<typeof GetEnvironmentsParamsSchema>;
