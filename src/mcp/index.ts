import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerAddTool } from './tools/add';

function createServer() {
  const server = new McpServer({
    name: 'env0-mcp-server',
    version: '1.0.0',
  });
  registerAddTool(server);
  return server;
}

export { createServer };
