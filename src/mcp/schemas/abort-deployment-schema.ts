import z from 'zod';

export const AbortDeploymentSchema = z.object({
  environmentId: z.string().describe('The ID of the environment to abort')
});

export type AbortDeploymentParams = z.infer<typeof AbortDeploymentSchema>;
