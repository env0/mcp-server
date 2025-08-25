import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import {
  type CancelEnvironmentParams,
  CancelEnvironmentSchema
} from '../schemas/cancel-environment-schema';

export function registerCancelEnvironmentTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'cancel-environment',
    {
      title: 'Cancel Environment',
      description: 'Cancel an environment',
      inputSchema: CancelEnvironmentSchema.shape
    },
    async (params: CancelEnvironmentParams) => {
      try {
        await env0Service.cancelEnvironment(params);
        return {
          content: [
            {
              type: 'text',
              text: `Environment canceled`
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error canceling environment: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
