import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import {
  type GetEnvironmentsParams,
  GetEnvironmentsParamsSchema
} from '../schemas/get-environments-params-schema';
import _ from 'lodash';

const getEnvironments = async (
  env0Service: Env0Service,
  params: GetEnvironmentsParams
): Promise<object[]> => {
  if (!_.isNil(params.environmentId)) {
    const environment = await env0Service.getEnvironment(params.environmentId);
    return [environment];
  }

  return await env0Service.getEnvironments(params);
};

export function registerGetEnvironmentsTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'get-environments',
    {
      title: 'Get Environments',
      description: 'Get the environments from env0',
      inputSchema: GetEnvironmentsParamsSchema.shape
    },
    async (params: GetEnvironmentsParams) => {
      try {
        const environments = await getEnvironments(env0Service, params);

        if (environments.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: 'No environments found.'
              }
            ]
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: `Environments (${environments.length} found): ${JSON.stringify(environments)}`
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching environments: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
