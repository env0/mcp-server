import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { config } from "dotenv";
import { resolve } from "path";
import { startHttpServer } from "./server.ts";
import { createServer } from "./mcp";

// Load .env from the current working directory
config({ path: resolve(process.cwd(), ".env") });
const port = process.env.PORT || 3000;

export async function startServer(): Promise<void> {
  const isStdioMode =
    process.env.NODE_ENV === "cli" || process.argv.includes("--stdio");

  const server = createServer();

  if (isStdioMode) {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } else {
    console.log(`Initializing Env0 MCP Server in HTTP mode on port ${port}...`);
    await startHttpServer(+port, server);
  }
}

// If we're being executed directly (not imported), start the server
if (process.argv[1]) {
  startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
}
