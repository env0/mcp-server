import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import {
  type GetDeploymentContextParams,
  GetDeploymentContextParamsSchema
} from '../schemas/get-deployment-context-schema';

const DESCRIPTION = `Fetch full debug context for one specific deployment: metadata, all step
statuses, and the log of the most relevant step (auto-picks the failed
step; falls back to the plan step on success).

Use when: user asks why a past deployment failed, names a deploymentLogId,
or wants to inspect a non-plan step (apply, destroy, custom flow).

Do NOT use for the latest deployment's plan log — use get-plan-logs
(no deploymentLogId needed, cheaper). For an error summary use
get-error-analysis.

deploymentLogId is REQUIRED. Use search-deployments first to find one.

Returns { deployment, steps, log }. log is null only for workflow envs
or when no plan-equivalent step exists. selectionReason in log explains
which step was picked: "explicit" | "failed-step" | "plan-step-fallback".

Common pitfalls: stepName 'state:get' is blocked. Step names look like
'tf:plan', 'tf:apply', 'terragrunt:plan', 'pulumi:preview' — call without
stepName to auto-pick.

Example chain:
  search-deployments(envId, statuses="FAILURE")
    → get-deployment-context(deploymentLogId=<first id>)`;

export function registerGetDeploymentContextTool(
  server: McpServer,
  env0Service: Env0Service
): void {
  server.registerTool(
    'get-deployment-context',
    {
      title: 'Get Deployment Context',
      description: DESCRIPTION,
      inputSchema: GetDeploymentContextParamsSchema.shape
    },
    async (params: GetDeploymentContextParams) => {
      try {
        const result = await env0Service.getDeploymentContext(params);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result)
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching deployment context: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
