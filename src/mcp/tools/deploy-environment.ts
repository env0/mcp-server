import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import {
  type DeployEnvironmentParams,
  DeployEnvironmentSchema
} from '../schemas/deploy-environment-schema';

export function registerDeployEnvironmentTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'deploy-environment',
    {
      title: 'Deploy Environment',
      description:
        'This tool creates a new deployment for an existing env0 environment.\n' +
        'You can use the "get-environments" or "get-environment" tool to find the environment ID of the environment you are looking for.\n' +
        'This action **ALWAYS** requires approval from the user before execution.',
      inputSchema: DeployEnvironmentSchema.shape
    },
    async (params: DeployEnvironmentParams) => {
      try {
        const result = await env0Service.deployEnvironment(params);
        return {
          content: [
            {
              type: 'text',
              text: `Environment deployed successfully. Result: ${JSON.stringify(result)}`
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error deploying environment: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
