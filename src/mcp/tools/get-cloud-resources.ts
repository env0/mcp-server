import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import {
  type GetCloudResourcesParams,
  GetCloudResourcesParamsSchema
} from '../schemas/get-cloud-resources-params-schema';
import { wrap } from '../../common/wrap';

export function registerGetCloudResourcesTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'get-cloud-resources',
    {
      title: 'Get Cloud Resources',
      description: 'Get cloud resources from env0',
      inputSchema: GetCloudResourcesParamsSchema.shape
    },
    wrap((params: GetCloudResourcesParams) => env0Service.getCloudResources(params))
  );
}
