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

The env0 MCP server supports two authentication methods. **API Access Token is preferred** when available.

### Option 1: API Access Token (Recommended)

Use a pre-generated base64 API Access Token:

```bash
export ENV0_API_ACCESS_TOKEN="your-base64-encoded-token"
export ENV0_ORGANIZATION_ID="your-organization-id"
```

### Option 2: API Key ID and Secret

Use individual API Key components:

```bash
export ENV0_API_KEY="your-api-key-id"
export ENV0_API_SECRET="your-api-key-secret"
export ENV0_ORGANIZATION_ID="your-organization-id"
```

### Generating an API Access Token

If you have an API Key ID and Secret, you can generate an API Access Token using:

```bash
echo -n "YOUR_API_KEY_ID:YOUR_API_KEY_SECRET" | base64
```

### Getting Your Credentials

1. **Organization API Keys**: Go to your env0 organization settings → API Keys tab → Add API Key
2. **Personal API Keys**: Click your avatar → Personal Settings → API Keys tab → Add API Key

For more details, see the [env0 API Authentication Documentation](https://docs.env0.com/reference/authentication).

### Environment Variables

You can also set an optional custom API URL:

```bash
export ENV0_API_URL="https://api.env0.com"  # Default value
