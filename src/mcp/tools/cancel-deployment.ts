import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import {
  type CancelDeploymentParams,
  CancelDeploymentSchema
} from '../schemas/cancel-deployment-schema';

export function registerCancelDeploymentTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'cancel-deployment',
    {
      title: 'Cancel Deployment',
      description: 'Cancel a deployment',
      inputSchema: CancelDeploymentSchema.shape
    },
    async (params: CancelDeploymentParams) => {
      try {
        await env0Service.cancelDeployment(params);
        return {
          content: [
            {
              type: 'text',
              text: `Canceled deployment`
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error canceling deployment: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
