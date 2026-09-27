import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import {
  type AbortEnvironmentParams,
  AbortEnvironmentSchema
} from '../schemas/abort-environment-schema';

export function registerAbortEnvironmentTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'abort-environment',
    {
      title: 'Abort Environment',
      description:
        "Forcefully stop an environment's latest deployment while it is in progress. To cancel a deployment that is still queued or waiting for user approval, use cancel-environment instead.",
      inputSchema: AbortEnvironmentSchema.shape
    },
    async (params: AbortEnvironmentParams) => {
      try {
        await env0Service.abortEnvironment(params);
        return {
          content: [
            {
              type: 'text',
              text: `Environment aborted`
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error aborting environment: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
