import z from 'zod';

export const CancelEnvironmentSchema = z.object({
  environmentId: z.string().describe('The ID of the environment to cancel')
});

export type CancelEnvironmentParams = z.infer<typeof CancelEnvironmentSchema>;
