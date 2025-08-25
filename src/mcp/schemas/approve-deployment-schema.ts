import z from 'zod';

export const ApproveDeploymentSchema = z.object({
  environmentId: z.string().describe('The ID of the environment to approve')
});

export type ApproveDeploymentParams = z.infer<typeof ApproveDeploymentSchema>;
