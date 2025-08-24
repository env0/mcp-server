import z from 'zod';

export const CancelDeploymentSchema = z.object({
  deploymentId: z.string().describe('The ID of the deployment to cancel')
});

export type CancelDeploymentParams = z.infer<typeof CancelDeploymentSchema>;
