import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { config } from 'dotenv';
import { resolve } from 'path';
import { startHttpServer } from './server';
import { createMcpServer } from './mcp';
import { getAndValidateConfig } from './common/config';
import Env0Client from './env0-service/env0-client';
import { Env0Service } from './env0-service/env0-service';

// Load .env from the current working directory
config({ path: resolve(process.cwd(), '.env'), quiet: true });
const port = process.env.PORT || 3000;

type SessionMode = 'shared' | 'per-session';

function getSessionMode(): SessionMode {
  const mode = (process.env.MCP_SESSION_MODE || 'shared').trim().toLowerCase();
  if (mode !== 'shared' && mode !== 'per-session') {
    throw new Error(`Invalid MCP_SESSION_MODE: ${mode} (expected "shared" or "per-session")`);
  }
  return mode;
}

export async function startServer(): Promise<void> {
  const isHttpMode = process.argv.includes('--http') || process.env.MCP_TRANSPORT === 'http';

  const config = getAndValidateConfig();
  const env0Client = new Env0Client(config);
  const env0Service = new Env0Service(config, env0Client);

  if (isHttpMode) {
    const sessionMode = getSessionMode();
    console.log(
      `Initializing Env0 MCP Server in HTTP mode on port ${port} (session mode: ${sessionMode})...`
    );
    if (sessionMode === 'per-session') {
      // A new McpServer per session, so multiple sessions can be open concurrently.
      await startHttpServer(+port, () => createMcpServer(env0Service));
    } else {
      // One McpServer shared by every session (only one session can be connected at a time).
      const server = createMcpServer(env0Service);
      await startHttpServer(+port, () => server);
    }
  } else {
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
