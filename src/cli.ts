import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { config } from 'dotenv';
import { resolve } from 'path';
import { startHttpServer } from './server';
import { createMcpServer } from './mcp';
import { getAndValidateConfig } from './common/config';
import Env0Client from './env0-service/env0-client';
import { Env0Service } from './env0-service/env0-service';

// Load .env from the current working directory
config({ path: resolve(process.cwd(), '.env') });
const port = process.env.PORT || 3000;

export async function startServer(): Promise<void> {
  const isHttpMode = process.argv.includes('--http') || process.env.MCP_TRANSPORT === 'http';

  const config = getAndValidateConfig();
  const env0Client = new Env0Client(config);
  const env0Service = new Env0Service(config, env0Client);

  const server = createMcpServer(env0Service);

  if (isHttpMode) {
    console.log(`Initializing Env0 MCP Server in HTTP mode on port ${port}...`);
    await startHttpServer(+port, server);
  } else {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  }
}

// If we're being executed directly (not imported), start the server
if (process.argv[1]) {
  startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}
