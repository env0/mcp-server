import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerGetCloudConfigurationsTool } from './tools/get-cloud-configurations';
import { Env0Service } from '../env0-service/env0-service';

export function createMcpServer(env0Service: Env0Service): McpServer {
  const server = new McpServer({
    name: 'env0-mcp-server',
    version: '1.0.0',
  });

  registerGetCloudConfigurationsTool(server, env0Service);

  return server;
}
