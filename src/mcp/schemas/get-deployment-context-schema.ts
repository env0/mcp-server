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
      "Omit to auto-pick the first failed step (status FAIL or TIMEOUT); returns log:null if no failure. Common values: 'tf:plan', 'tf:apply', 'opentofu:plan', 'terragrunt:plan', 'pulumi:preview', 'helm:diff', 'k8s:apply', 'cf:change-set', 'ansible:playbook', 'git:clone', 'spec:load'. Cannot target a NOT_STARTED step."
    )
});

export type GetDeploymentContextParams = z.infer<typeof GetDeploymentContextParamsSchema>;
