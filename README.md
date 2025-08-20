# Env0's MCP Server

The Env0 MCP Server connects AI tools Env0's platform.
This gives AI agents, assistants, and chatbots the ability to interact with environments in Env0's platform (for example, deploying, canceling and getting the logs of environments), as well as getting the resources from Env0's Cloud Compass.
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
