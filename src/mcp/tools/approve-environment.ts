import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import {
  type ApproveEnvironmentParams,
  ApproveEnvironmentSchema
} from '../schemas/approve-environment-schema';

export function registerApproveEnvironmentTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'approve-environment',
    {
      title: 'Approve Environment',
      description: 'Approve an environment',
      inputSchema: ApproveEnvironmentSchema.shape
    },
    async (params: ApproveEnvironmentParams) => {
      try {
        await env0Service.approveEnvironment(params);
        return {
          content: [
            {
              type: 'text',
              text: `Environment approved`
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error approving environment: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
