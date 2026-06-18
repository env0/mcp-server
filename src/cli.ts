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

  if (isHttpMode) {
    // HTTP mode: credentials come per-request from each client's headers, not env vars
    const baseConfig = getAndValidateConfig(undefined, false);
    console.log(`Initializing Env0 MCP Server in HTTP mode on port ${port}...`);
    await startHttpServer(+port, headers => {
      const orgId = headers['x-env0-organization-id'];
      const config = {
        ...baseConfig,
        organizationId: (Array.isArray(orgId) ? orgId[0] : orgId) || baseConfig.organizationId,
        // authorization is guaranteed present (buildSessionServer 401s otherwise)
        ...(headers.authorization ? { authHeader: headers.authorization } : {})
      };
      return createMcpServer(new Env0Service(config, new Env0Client(config)));
    });
  } else {
    const config = getAndValidateConfig();
    const env0Service = new Env0Service(config, new Env0Client(config));
    const transport = new StdioServerTransport();
    await createMcpServer(env0Service).connect(transport);
  }
}

// If we're being executed directly (not imported), start the server
if (process.argv[1]) {
  startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}
