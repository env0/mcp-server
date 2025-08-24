import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import {
  type AbortDeploymentParams,
  AbortDeploymentSchema
} from '../schemas/abort-deployment-schema';

export function registerAbortDeploymentTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'abort-deployment',
    {
      title: 'Abort Deployment',
      description: 'Abort a deployment',
      inputSchema: AbortDeploymentSchema.shape
    },
    async (params: AbortDeploymentParams) => {
      try {
        await env0Service.abortDeployment(params);
        return {
          content: [
            {
              type: 'text',
              text: `Aborted deployment`
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error aborting deployment: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
