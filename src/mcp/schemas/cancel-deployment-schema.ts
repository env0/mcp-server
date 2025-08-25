import z from 'zod';

export const CancelDeploymentSchema = z.object({
  environmentId: z.string().describe('The ID of the environment to cancel')
});

export type CancelDeploymentParams = z.infer<typeof CancelDeploymentSchema>;
