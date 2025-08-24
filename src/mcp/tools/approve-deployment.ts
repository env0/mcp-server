import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import {
  type ApproveDeploymentParams,
  ApproveDeploymentSchema
} from '../schemas/approve-deployment-schema';

export function registerApproveDeploymentTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'approve-deployment',
    {
      title: 'Approve Deployment',
      description: 'Approve a deployment',
      inputSchema: ApproveDeploymentSchema.shape
    },
    async (params: ApproveDeploymentParams) => {
      try {
        await env0Service.approveDeployment(params);
        return {
          content: [
            {
              type: 'text',
              text: `Approved deployment`
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error approving deployment: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
