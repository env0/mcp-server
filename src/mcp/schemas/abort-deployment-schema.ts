import z from 'zod';

export const AbortDeploymentSchema = z.object({
  deploymentId: z.string().describe('The ID of the deployment to abort')
});

export type AbortDeploymentParams = z.infer<typeof AbortDeploymentSchema>;
