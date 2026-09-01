import z from 'zod/v3';

export const DeployEnvironmentSchema = z.object({
  environmentId: z.string(),
  revision: z.string().optional(),
  comment: z.string().optional()
});

export type DeployEnvironmentParams = z.infer<typeof DeployEnvironmentSchema>;
