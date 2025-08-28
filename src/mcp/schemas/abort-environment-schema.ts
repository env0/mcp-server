import z from 'zod';

export const AbortEnvironmentSchema = z.object({
  environmentId: z.string().describe('The ID of the environment to abort')
});

export type AbortEnvironmentParams = z.infer<typeof AbortEnvironmentSchema>;
