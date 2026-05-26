import { z } from 'zod';

export const GetDeploymentContextParamsSchema = z.object({
  deploymentLogId: z
    .string()
    .describe(
      "Required. The deployment to inspect. If you don't have one, call search-deployments first. For the latest deployment's plan log, prefer get-plan-logs — it doesn't require an ID."
    ),
  stepName: z
    .string()
    .optional()
    .describe(
      "Omit to auto-pick (failed step preferred, falls back to plan step). Common values: 'tf:plan', 'tf:apply', 'opentofu:plan', 'terragrunt:plan', 'pulumi:preview'. 'state:get' is blocked."
    )
});

export type GetDeploymentContextParams = z.infer<typeof GetDeploymentContextParamsSchema>;
