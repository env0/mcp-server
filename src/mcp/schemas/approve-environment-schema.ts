import z from 'zod';

export const ApproveEnvironmentSchema = z.object({
  environmentId: z.string().describe('The ID of the environment to approve')
});

export type ApproveEnvironmentParams = z.infer<typeof ApproveEnvironmentSchema>;
