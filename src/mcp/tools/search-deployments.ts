import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import {
  type SearchDeploymentsParams,
  SearchDeploymentsParamsSchema
} from '../schemas/search-deployments-schema';

const DESCRIPTION = `Find recent deployments for an environment, optionally filtered by status.
Use this to pick a deploymentLogId for follow-up debug via get-deployment-context.

Use when: user asks for deployment history, wants to find a failed deployment,
or needs to pick among multiple recent deployments.

Do NOT use for the latest deployment alone — get-plan-logs or get-error-analysis
already cover that without needing an ID.

Returns up to 10 deployments by default (raise limit to 25 max). Each entry
includes id, status, type, timestamps, trigger, comment, resourceCount,
blueprintRevision.`;

export function registerSearchDeploymentsTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'search-deployments',
    {
      title: 'Search Deployments',
      description: DESCRIPTION,
      inputSchema: SearchDeploymentsParamsSchema.shape
    },
    async (params: SearchDeploymentsParams) => {
      try {
        const result = await env0Service.searchDeployments(params);
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
              text: `Error fetching deployments: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
