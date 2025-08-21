import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import {
  type GetCloudResourcesParams,
  GetCloudResourcesParamsSchema
} from '../schemas/get-cloud-resources-params-schema';

export function registerGetCloudResourcesTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'get-cloud-resources',
    {
      title: 'Get Cloud Resources',
      description: 'Get cloud resources from env0',
      inputSchema: GetCloudResourcesParamsSchema.shape
    },
    async (params: GetCloudResourcesParams) => {
      try {
        const resources = await env0Service.getCloudResources(params);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(resources)
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching cloud resources: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
