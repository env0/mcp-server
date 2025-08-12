# Envzero's MCP Server

> ⚠️ **Development Status**: This MCP server is currently in active development and has not been released yet. Features and APIs may change without notice.

The Envzero MCP Server connects AI tools Envzero's platform.
This gives AI agents, assistants, and chatbots the ability to interact with environments in Envzero's platform (for example, deploying, cancalling and getting the logs of environments), as well as getting the resources from Envzero's Cloud Compass.
All through natural language interactions.

## Installation

### For Users

Once released, you'll be able to install the MCP server via npm:

```bash
npm install -g @env0/mcp-server
```

Then configure it in your MCP-compatible client (like Claude Desktop) by adding it to your configuration file.

### For Development

To set up the development environment and test the server:

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd mcp-server
   npm install
   ```

2. **Run the server:**

   ```bash
   npm start
   ```

3. **Test with MCP Inspector:**

   Use the MCP Inspector tool for testing and debugging:

   ```bash
   npx @modelcontextprotocol/inspector npm start
   ```

   This will open a web interface at http://localhost:6274 where you can interact with the MCP server and test its capabilities.
