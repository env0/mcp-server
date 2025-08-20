import z from 'zod';

export const GetEnvironmentsParamsSchema = z.object({
  projectId: z.string().optional(),
  name: z.string().optional(),
  limit: z.number().int().positive().max(100).optional(),
  offset: z.number().int().nonnegative().optional()
});

export type GetEnvironmentsParams = z.infer<typeof GetEnvironmentsParamsSchema>;
