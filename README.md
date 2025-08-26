# Env0's MCP Server

The Env0 MCP Server connects AI tools Env0's platform.
This gives AI agents, assistants, and chatbots the ability to interact with environments in Env0's platform (for example, deploying, canceling and getting the logs of environments), as well as getting the resources from Env0's Cloud Compass.
All through natural language interactions.

## Installation

### For Users

### Windsurf Integration

Add the following to your Windsurf mcp server raw configuration file:

```json
{
  "mcpServers": {
    "env0": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "ENV0_API_KEY=your-api-key-here",
        "-e", "ENV0_API_SECRET=your-api-secret-here",
        "-e", "ENV0_ORGANIZATION_ID=your-org-id-here",
        "env0-mcp-server"
      ]
    }
  }
}
```

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

## Authentication

To allow the MCP server to connect to Env0's platform, you need to provide your API credentials.
To create a new API key, please follow (this guide)[https://docs.env0.com/docs/api-keys]

Once you have your API credentials, you can configure them in the MCP server by setting the following environment variables:

```bash
export ENV0_API_KEY="your-api-key-id"
export ENV0_API_SECRET="your-api-key-secret"
export ENV0_ORGANIZATION_ID="your-organization-id"
```

You can also create a `.env` file like our example `.env.example` and fill in the values:

```dotenv
# Required: Your env0 API Key ID (Get this from the Env0 site using the guide above)
ENV0_API_KEY=your-api-key-id-here

# Required: Your env0 API Key Secret (Get this from the Env0 site using the guide above)
ENV0_API_SECRET=your-api-key-secret-here

# Your env0 Organization ID (found in your env0 organization settings). This is required if you have multiple organizations
ENV0_ORGANIZATION_ID=your-organization-id-here
```

## Docker Configuration

The env0 MCP server supports Docker deployment, making it easy to run in containerized environments and integrate with MCP clients.

### Building the Docker Image

1. **Build the Docker image:**

   ```bash
   docker build -t env0-mcp-server .
   ```

2. **Test the container:**

   ```bash
   docker run --rm -e ENV0_API_KEY=your-api-key -e ENV0_API_SECRET=your-api-secret -e ENV0_ORGANIZATION_ID=your-org-id env0-mcp-server
   ```

### Docker Transport Modes

The container supports both MCP transport modes:

#### 1. Stdio Transport (Default)
- Used by most MCP clients (Claude Desktop, Windsurf)
- Communication via stdin/stdout
- Use `-i` flag for interactive mode

#### 2. HTTP Transport
- For remote MCP server access
- Set `MCP_TRANSPORT` environment variable to `http` to enable

```bash
docker run -d -p 3000:3000 -e PORT=3000 -e MCP_TRANSPORT=http env0-mcp-server
```

Then, configure your MCP client to use the HTTP transport mode:
```json
{
  "mcpServers": {
    "env0": {
      "serverUrl": "http://localhost:3000/mcp"
    }
  }
}
```
