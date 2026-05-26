import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import {
  type GetDeploymentContextParams,
  GetDeploymentContextParamsSchema
} from '../schemas/get-deployment-context-schema';

const DESCRIPTION = `Fetch debug context for one specific deployment: metadata, all step
statuses, and the log of the first failed step (auto-picked: status
FAIL or TIMEOUT). Returns log:null on clean success — pass an explicit
stepName to inspect a successful step.

Use when: user asks why a past deployment failed, names a deploymentLogId,
or wants to inspect a specific step (apply, destroy, custom flow) of a
historical deployment.

Do NOT use for the latest deployment's plan log — use get-plan-logs
(no deploymentLogId needed, cheaper). For an error summary use
get-error-analysis.

deploymentLogId is REQUIRED. Use search-deployments first to find one.

Returns { deployment, steps, log }. log is { stepName, events, truncated }
or null when no failed step exists and no stepName was given. Step names
look like 'tf:plan', 'tf:apply', 'opentofu:plan', 'terragrunt:plan',
'pulumi:preview', 'helm:diff', 'k8s:apply', 'git:clone', 'spec:load'.
Targeting a NOT_STARTED step returns 400.

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
