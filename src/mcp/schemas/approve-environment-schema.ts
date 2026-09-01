import z from 'zod/v3';

export const ApproveEnvironmentSchema = z.object({
  environmentId: z.string().describe('The ID of the environment to approve')
});

export type ApproveEnvironmentParams = z.infer<typeof ApproveEnvironmentSchema>;
