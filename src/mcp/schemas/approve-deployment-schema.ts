import z from 'zod';

export const ApproveDeploymentSchema = z.object({
  deploymentId: z.string().describe('The ID of the deployment to approve')
});

export type ApproveDeploymentParams = z.infer<typeof ApproveDeploymentSchema>;
