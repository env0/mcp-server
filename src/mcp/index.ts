import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerGetCloudConfigurationsTool } from './tools/get-cloud-configurations';
import { registerGetEnvironmentsTool } from './tools/get-environments';
import { Env0Service } from '../env0-service/env0-service';
import { registerGetProjectsTool } from './tools/get-projects';
import { registerApproveEnvironmentTool } from './tools/approve-environment';
import { registerCancelEnvironmentTool } from './tools/cancel-environment';
import { registerAbortEnvironmentTool } from './tools/abort-environment';

export function createMcpServer(env0Service: Env0Service): McpServer {
  const server = new McpServer({
    name: 'env0-mcp-server',
    version: '1.0.0'
  });

  registerGetCloudConfigurationsTool(server, env0Service);
  registerGetEnvironmentsTool(server, env0Service);
  registerGetProjectsTool(server, env0Service);
  registerApproveEnvironmentTool(server, env0Service);
  registerCancelEnvironmentTool(server, env0Service);
  registerAbortEnvironmentTool(server, env0Service);

  return server;
}
