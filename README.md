# Env0's MCP Server

The Env0 MCP Server connects AI tools Env0's platform.
This gives AI agents, assistants, and chatbots the ability to interact with environments in Env0's platform (for example, deploying, canceling and getting the logs of environments), as well as getting the resources from Env0's Cloud Compass.
All through natural language interactions.

## 🛠️ Installation

### Requirements

- **Docker** - Required to run the MCP server container
- **MCP Client** - One of the following AI coding assistants:
  - Cursor, Claude Code, VSCode, Windsurf, Cline, Zed, JetBrains AI Assistant, or another MCP-compatible client
- **Env0 API Credentials** - You'll need to gather the following from your env0 account:

#### 🔑 API Key and Secret

Create an API key and secret by following the [env0 API Keys guide](https://docs.env0.com/docs/api-keys).

#### 🏢 Organization ID

Find your organization ID in the env0 dashboard:

1. Click on your organization icon in the bottom left corner
2. Select **Settings** from the left side panel
3. Go to the **General** tab under Organization Settings
4. Copy the **Organization ID**

For detailed instructions, see the [env0 Organizations documentation](https://docs.env0.com/docs/organizations#finding-my-organization-id).

> **Note:** The Organization ID is required if you belong to multiple organizations. If you only have access to one organization, this step ensures the MCP server connects to the correct one.

<details>
<summary><b>Install in Cursor</b></summary>

Go to: `Settings` -> `Cursor Settings` -> `MCP & Integrations` -> `New MCP Server`

Pasting the following configuration into your Cursor `~/.cursor/mcp.json` file is the recommended approach. You may also install in a specific project by creating `.cursor/mcp.json` in your project folder. See [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol) for more info.

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
        "env0/mcp-server"
      ]
    }
  }
}
```

</details>

<details>
<summary><b>Install in Claude Code</b></summary>

Run this command. See [Claude Code MCP docs](https://docs.anthropic.com/en/docs/claude-code/mcp) for more info.

```sh
claude mcp add env0 -- docker run -i --rm -e ENV0_API_KEY=your-api-key-here -e ENV0_API_SECRET=your-api-secret-here -e ENV0_ORGANIZATION_ID=your-org-id-here env0/mcp-server
```

</details>

<details>
<summary><b>Install in Windsurf</b></summary>

Add this to your Windsurf MCP raw config file. See [Windsurf MCP docs](https://docs.windsurf.com/windsurf/cascade/mcp) for more info.

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
        "env0/mcp-server"
      ]
    }
  }
}
```

</details>

<details>
<summary><b>Install in VS Code</b></summary>

Add this to your VS Code MCP config file. See [VS Code MCP docs](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) for more info.

```json
{
  "mcp": {
    "servers": {
      "env0": {
        "type": "stdio",
        "command": "docker",
        "args": [
          "run", "-i", "--rm",
          "-e", "ENV0_API_KEY=your-api-key-here",
          "-e", "ENV0_API_SECRET=your-api-secret-here",
          "-e", "ENV0_ORGANIZATION_ID=your-org-id-here",
          "env0/mcp-server"
        ]
      }
    }
  }
}
```

</details>

<details>
<summary><b>Install in Cline</b></summary>

1. Open Cline.
2. Click the hamburger menu (☰) to open the side menu.
3. Go to the **MCP Servers** section.
4. Switch to the **Installed** tab.
5. Click on **Configure MCP Servers**.
6. Add the env0 MCP server to your configuration:

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
        "env0/mcp-server"
      ]
    }
  }
}
```

</details>

<details>
<summary><b>Install in Zed</b></summary>

Add this to your Zed `settings.json`. See [Zed Context Server docs](https://zed.dev/docs/assistant/context-servers) for more info.

```json
{
  "context_servers": {
    "env0": {
      "command": {
        "path": "docker",
        "args": [
          "run", "-i", "--rm",
          "-e", "ENV0_API_KEY=your-api-key-here",
          "-e", "ENV0_API_SECRET=your-api-secret-here",
          "-e", "ENV0_ORGANIZATION_ID=your-org-id-here",
          "env0/mcp-server"
        ]
      },
      "settings": {}
    }
  }
}
```

</details>

<details>
<summary><b>Install in Augment Code</b></summary>

To configure the env0 MCP server in Augment Code, you can use either the graphical interface or manual configuration.

### **A. Using the Augment Code UI**

1. Click the hamburger menu.
2. Select **Settings**.
3. Navigate to the **Tools** section.
4. Click the **+ Add MCP** button.
5. Enter the following command:

   ```
   docker run -i --rm -e ENV0_API_KEY=your-api-key-here -e ENV0_API_SECRET=your-api-secret-here -e ENV0_ORGANIZATION_ID=your-org-id-here env0/mcp-server
   ```

6. Name the MCP: **env0**.
7. Click the **Add** button.

### **B. Manual Configuration**

1. Press Cmd/Ctrl Shift P or go to the hamburger menu in the Augment panel
2. Select Edit Settings
3. Under Advanced, click Edit in settings.json
4. Add the server configuration to the `mcpServers` array in the `augment.advanced` object

```json
{
  "augment.advanced": {
    "mcpServers": [
      {
        "name": "env0",
        "command": "docker",
        "args": [
          "run", "-i", "--rm",
          "-e", "ENV0_API_KEY=your-api-key-here",
          "-e", "ENV0_API_SECRET=your-api-secret-here",
          "-e", "ENV0_ORGANIZATION_ID=your-org-id-here",
          "env0/mcp-server"
        ]
      }
    ]
  }
}
```

Once the MCP server is added, restart your editor.

</details>

<details>
<summary><b>Install in Roo Code</b></summary>

Add this to your Roo Code MCP configuration file. See [Roo Code MCP docs](https://docs.roocode.com/features/mcp/using-mcp-in-roo) for more info.

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
        "env0/mcp-server"
      ]
    }
  }
}
```

</details>

<details>
<summary><b>Install in Gemini CLI</b></summary>

See [Gemini CLI Configuration](https://google-gemini.github.io/gemini-cli/docs/tools/mcp-server.html) for details.

1. Open the Gemini CLI settings file. The location is `~/.gemini/settings.json` (where `~` is your home directory).
2. Add the following to the `mcpServers` object in your `settings.json` file:

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
        "env0/mcp-server"
      ]
    }
  }
}
```

If the `mcpServers` object does not exist, create it.

</details>

<details>
<summary><b>Install in Claude Desktop</b></summary>

Open Claude Desktop developer settings and edit your `claude_desktop_config.json` file to add the following configuration. See [Claude Desktop MCP docs](https://modelcontextprotocol.io/quickstart/user) for more info.

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
        "env0/mcp-server"
      ]
    }
  }
}
```

</details>

<details>
<summary><b>Install in Opencode</b></summary>

Add this to your Opencode configuration file. See [Opencode MCP docs](https://opencode.ai/docs/mcp-servers) for more info.

```json
{
  "mcp": {
    "env0": {
      "type": "local",
      "command": [
        "docker", "run", "-i", "--rm",
        "-e", "ENV0_API_KEY=your-api-key-here",
        "-e", "ENV0_API_SECRET=your-api-secret-here",
        "-e", "ENV0_ORGANIZATION_ID=your-org-id-here",
        "env0/mcp-server"
      ],
      "enabled": true
    }
  }
}
```

</details>

<details>
<summary><b>Install in OpenAI Codex</b></summary>

See [OpenAI Codex](https://github.com/openai/codex) for more information.

Add the following configuration to your OpenAI Codex MCP server settings:

```toml
[mcp_servers.env0]
command = "docker"
args = [
  "run", "-i", "--rm",
  "-e", "ENV0_API_KEY=your-api-key-here",
  "-e", "ENV0_API_SECRET=your-api-secret-here",
  "-e", "ENV0_ORGANIZATION_ID=your-org-id-here",
  "env0/mcp-server"
]
```

</details>

<details>
<summary><b>Install in JetBrains AI Assistant</b></summary>

See [JetBrains AI Assistant Documentation](https://www.jetbrains.com/help/ai-assistant/configure-an-mcp-server.html) for more details.

1. In JetBrains IDEs go to `Settings` -> `Tools` -> `AI Assistant` -> `Model Context Protocol (MCP)`
2. Click `+ Add`.
3. Click on `Command` in the top-left corner of the dialog and select the As JSON option from the list
4. Add this configuration and click `OK`

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
        "env0/mcp-server"
      ]
    }
  }
}
```

5. Click `Apply` to save changes.
6. The same way env0 could be added for JetBrains Junie in `Settings` -> `Tools` -> `Junie` -> `MCP Settings`

</details>

<details>
<summary><b>Install in Kiro</b></summary>

See [Kiro Model Context Protocol Documentation](https://kiro.dev/docs/mcp/configuration/) for details.

1. Navigate `Kiro` > `MCP Servers`
2. Add a new MCP server by clicking the `+ Add` button.
3. Paste the configuration given below:

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
        "env0/mcp-server"
      ],
      "env": {},
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

4. Click `Save` to apply the changes.

</details>

<details>
<summary><b>Install in Trae</b></summary>

Use the Add manually feature and fill in the JSON configuration information for that MCP server.
For more details, visit the [Trae documentation](https://docs.trae.ai/ide/model-context-protocol?_lang=en).

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
        "env0/mcp-server"
      ]
    }
  }
}
```

</details>

<details>
<summary><b>Install in Amazon Q Developer CLI</b></summary>

Add this to your Amazon Q Developer CLI configuration file. See [Amazon Q Developer CLI docs](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/command-line-mcp-configuration.html) for more details.

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
        "env0/mcp-server"
      ]
    }
  }
}
```

</details>

<details>
<summary><b>Install in Warp</b></summary>

See [Warp Model Context Protocol Documentation](https://docs.warp.dev/knowledge-and-collaboration/mcp#adding-an-mcp-server) for details.

1. Navigate `Settings` > `AI` > `Manage MCP servers`.
2. Add a new MCP server by clicking the `+ Add` button.
3. Paste the configuration given below:

```json
{
  "env0": {
    "command": "docker",
    "args": [
      "run", "-i", "--rm",
      "-e", "ENV0_API_KEY=your-api-key-here",
      "-e", "ENV0_API_SECRET=your-api-secret-here",
      "-e", "ENV0_ORGANIZATION_ID=your-org-id-here",
      "env0/mcp-server"
    ],
    "env": {},
    "working_directory": null,
    "start_on_launch": true
  }
}
```

4. Click `Save` to apply the changes.

</details>

<details>
<summary><b>Install in LM Studio</b></summary>

See [LM Studio MCP Support](https://lmstudio.ai/blog/lmstudio-v0.3.17) for more information.

1. Navigate to `Program` (right side) > `Install` > `Edit mcp.json`.
2. Paste the configuration given below:

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
        "env0/mcp-server"
      ]
    }
  }
}
```

3. Click `Save` to apply the changes.
4. Toggle the MCP server on/off from the right hand side, under `Program`, or by clicking the plug icon at the bottom of the chat box.

</details>

<details>
<summary><b>Install in Visual Studio 2022</b></summary>

You can configure the env0 MCP server in Visual Studio 2022 by following the [Visual Studio MCP Servers documentation](https://learn.microsoft.com/visualstudio/ide/mcp-servers?view=vs-2022).

Add this to your Visual Studio MCP config file (see the [Visual Studio docs](https://learn.microsoft.com/visualstudio/ide/mcp-servers?view=vs-2022) for details):

```json
{
  "mcp": {
    "servers": {
      "env0": {
        "type": "stdio",
        "command": "docker",
        "args": [
          "run", "-i", "--rm",
          "-e", "ENV0_API_KEY=your-api-key-here",
          "-e", "ENV0_API_SECRET=your-api-secret-here",
          "-e", "ENV0_ORGANIZATION_ID=your-org-id-here",
          "env0/mcp-server"
        ]
      }
    }
  }
}
```

For more information and troubleshooting, refer to the [Visual Studio MCP Servers documentation](https://learn.microsoft.com/visualstudio/ide/mcp-servers?view=vs-2022).

</details>

<details>
<summary><b>Install in Crush</b></summary>

Add this to your Crush configuration file. See [Crush MCP docs](https://github.com/charmbracelet/crush#mcps) for more info.

```json
{
  "$schema": "https://charm.land/crush.json",
  "mcp": {
    "env0": {
      "type": "stdio",
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "ENV0_API_KEY=your-api-key-here",
        "-e", "ENV0_API_SECRET=your-api-secret-here",
        "-e", "ENV0_ORGANIZATION_ID=your-org-id-here",
        "env0/mcp-server"
      ]
    }
  }
}
```

</details>

<details>
<summary><b>Install in BoltAI</b></summary>

Open the "Settings" page of the app, navigate to "Plugins," and enter the following JSON:

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
        "env0/mcp-server"
      ]
    }
  }
}
```

More information is available on [BoltAI's Documentation site](https://docs.boltai.com/docs/plugins/mcp-servers). For BoltAI on iOS, [see this guide](https://docs.boltai.com/docs/boltai-mobile/mcp-servers).

</details>

<details>
<summary><b>Install in Rovo Dev CLI</b></summary>

Edit your Rovo Dev CLI MCP config by running the command below:

```bash
acli rovodev mcp
```

Add this configuration:

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
        "env0/mcp-server"
      ]
    }
  }
}
```

</details>

<details>
<summary><b>Install in Zencoder</b></summary>

To configure the env0 MCP server in Zencoder, follow these steps:

1. Go to the Zencoder menu (...)
2. From the dropdown menu, select Agent tools
3. Click on the Add custom MCP
4. Add the name and server configuration from below, and make sure to hit the Install button

```json
{
  "command": "docker",
  "args": [
    "run", "-i", "--rm",
    "-e", "ENV0_API_KEY=your-api-key-here",
    "-e", "ENV0_API_SECRET=your-api-secret-here",
    "-e", "ENV0_ORGANIZATION_ID=your-org-id-here",
    "env0/mcp-server"
  ]
}
```

Once the MCP server is added, you can easily continue using it.

</details>

<details>
<summary><b>Install in Qodo Gen</b></summary>

See [Qodo Gen docs](https://docs.qodo.ai/qodo-documentation/qodo-gen/qodo-gen-chat/agentic-mode/agentic-tools-mcps) for more details.

1. Open Qodo Gen chat panel in VSCode or IntelliJ.
2. Click Connect more tools.
3. Click + Add new MCP.
4. Add the following configuration:

#### Qodo Gen Docker Connection

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
        "env0/mcp-server"
      ]
    }
  }
}
```

</details>

<details>
<summary><b>Install in Perplexity Desktop</b></summary>

See [Local and Remote MCPs for Perplexity](https://www.perplexity.ai/help-center/en/articles/11502712-local-and-remote-mcps-for-perplexity) for more information.

1. Navigate `Perplexity` > `Settings`
2. Select `Connectors`.
3. Click `Add Connector`.
4. Select `Advanced`.
5. Enter Server Name: `env0`
6. Paste the following JSON in the text area:

```json
{
  "args": [
    "run", "-i", "--rm",
    "-e", "ENV0_API_KEY=your-api-key-here",
    "-e", "ENV0_API_SECRET=your-api-secret-here",
    "-e", "ENV0_ORGANIZATION_ID=your-org-id-here",
    "env0/mcp-server"
  ],
  "command": "docker",
  "env": {}
}
```

7. Click `Save`.

</details>

## 🔧 Available Tools

The Env0 MCP Server provides a comprehensive set of tools to interact with Env0's platform through natural language. These tools are organized into the following categories:

<details>
<summary><b>📋 Project & Environment Management</b></summary>

### **get-projects**
Retrieve all projects from your Env0 organization.
- **Description**: Get the projects from env0
- **Parameters**: None required
- **Usage**: "Show me all my projects" or "List projects"

### **get-environments** 
Retrieve environments from Env0, with optional filtering.
- **Description**: Get the environments from env0
- **Parameters**: 
  - `environmentId` (optional): Get a specific environment by ID
  - `name` (optional): Filter by environment name
  - `projectId` (optional): Filter by project ID
  - `limit` (optional): Maximum number of environments to return
  - `offset` (optional): Pagination offset
- **Usage**: "Show me all environments" or "Get environment with ID xyz"

</details>

<details>
<summary><b>🚀 Environment Operations</b></summary>

### **deploy-environment**
Create a new deployment for an existing environment.
- **Description**: Creates a new deployment for an existing env0 environment. Always requires user to approve the deployment in env0.
- **Parameters**:
  - `environmentId` (required): The environment ID to deploy
  - `comment` (optional): Deployment comment
  - `revision` (optional): Specific revision to deploy
- **⚠️ Important**: This action **ALWAYS** requires user approval before execution
- **Usage**: "Deploy environment xyz" or "Deploy the latest version of my staging environment"

### **abort-environment**
Abort a running environment's deployment.
- **Description**: Abort an environment's current deployment
- **Parameters**:
  - `environmentId` (required): The environment ID to abort
- **Usage**: "Abort the deployment of environment xyz"

### **approve-environment**
Approve an environment plan, pending approval for applying.
- **Description**: Approve an environment plan, pending approval for applying.
- **Parameters**:
  - `environmentId` (required): The environment ID to approve
- **Usage**: "Approve environment xyz"

### **cancel-environment**
Cancel an environment plan, pending user approval.
- **Description**: Cancel an environment plan that is pending user approval.
- **Parameters**:
  - `environmentId` (required): The environment ID to cancel
- **Usage**: "Cancel environment xyz"

</details>

<details>
<summary><b>📊 Monitoring & Logs</b></summary>

### **get-plan-logs**
Retrieve Terraform/OpenTofu plan logs (or any other IaC's dry runs results) for an environment.
- **Description**: Get plan logs for a specific environment from env0
- **Parameters**:
  - `environmentId` (required): The environment ID to get logs for
- **Note**: For full plan details, see the env0 console
- **Usage**: "Show me the plan logs for environment xyz"

### **get-error-analysis**
Analyze errors from the last environment deployment.
- **Description**: Analyzes errors in the last environment's deployment
- **Parameters**:
  - `environmentId` (required): The environment ID to analyze errors for
- **Usage**: "Analyze errors for environment xyz" or "What went wrong with my last deployment?"

### **get-deployment-context**
Fetch full debug context for one specific (historical) deployment: metadata, all step statuses, and the log of the most relevant step (auto-picks the failed step; falls back to the plan step on success).
- **Description**: Debug a past deployment by ID — metadata + steps + auto-picked step log
- **Parameters**:
  - `deploymentLogId` (required): The deployment to inspect. Use `search-deployments` first to find one.
  - `stepName` (optional): Inspect a specific step (e.g., `tf:apply`, `tf:destroy`). Omit to auto-pick (failed step preferred, falls back to plan step).
- **Note**: For the *latest* deployment's plan log, prefer `get-plan-logs` (no ID needed). For an error summary, prefer `get-error-analysis`. `state:get` is blocked.
- **Usage**: "Why did the deployment from yesterday on env X fail?" → chain via `search-deployments` then this tool.

</details>

<details>
<summary><b>☁️ Cloud Resources & Infrastructure</b></summary>

### **get-cloud-configurations**
Retrieve cloud configurations from Env0's Cloud Compass.
- **Description**: Get the compass cloud configurations
- **Parameters**: None required
- **Usage**: "Show me my cloud configurations"

### **get-cloud-resources**
Retrieve cloud resources with advanced filtering capabilities.
- **Description**: Get cloud resources from env0
- **Parameters**: Complex filtering options including:
  - `filters` (required): Object with various filter options:
    - `cloudProvider`: Filter by cloud provider (AWS, GCP, AzureLAW)
    - `cloudConfigurationId`: Filter by cloud configuration ID
    - `environmentId`: Filter by environment ID
    - `resourceId`: Filter by resource ID
    - `name`: Filter by resource name
    - `type`: Filter by resource type
    - `region`: Filter by region
    - `service`: Filter by service
    - `managementType`: Filter by management type
    - `driftStatus`: Filter by drift status
    - `severity`: Filter by severity (High, Medium, Low, Optimal, Ignored, Reset)
    - `searchBy`: General search term
  - `paging`: Pagination options (limit, offset)
  - `orderBy`: Sorting options
- **Usage**: "Show me all AWS resources" or "Find resources with high severity drift"

### **generate-iac**
Generate Infrastructure as Code (Terraform/OpenTofu) from existing cloud resources.
- **Description**: Generate Infrastructure as Code (IaC) for cloud resources
- **Parameters**:
  - `cloudResourceIds` (required): Array of cloud resource IDs to generate IaC for
  - `iacType` (required): Type of IaC to generate ("OpenTofu" or "Terraform")
- **Returns**: Job ID for tracking progress
- **Usage**: "Generate Terraform code for these resources" or "Create OpenTofu configuration for resource xyz"

### **check-iac-job-status**
Monitor the progress of IaC generation jobs.
- **Description**: Check the status and retrieve results of an Infrastructure as Code generation job
- **Parameters**:
  - `jobId` (required): Job ID returned from generate-iac request
- **Note**: Jobs can take up to around 1 minute to complete
- **Usage**: "Check the status of job abc123" or "Is my IaC generation ready?"

</details>

### 💡 Usage Examples

Here are some example natural language queries you can use with the MCP server:

**Project & Environment Management:**
- "Show me all my projects"
- "List environments in project xyz"
- "Get details for environment abc123"
- "Do I have any environments in project xyz that require my attention?"

**Deployments:**
- "Deploy my staging environment"
- "Deploy environment xyz with comment 'hotfix deployment'"
- "Abort the running deployment for environment xyz"

**Monitoring:**
- "Show me the plan logs for my production environment"
- "What's the status of environment abc123?"
- "Analyze errors for environment xyz" or "What went wrong with my last deployment?"
- "Why did the deployment from yesterday on env xyz fail?" (chains `search-deployments` → `get-deployment-context`)
- "Show me the apply log for deployment abc123"

**Cloud Resources:**
- "Show me all my AWS resources"
- "Find resources with drift issues"
- "List all S3 buckets in us-east-1 in AWS account xyz"
- "Generate Terraform code for resource xyz from AWS account xyz"
- "Check if my IaC generation job is complete"

### For Development of the MCP Server

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
   docker build -t env0/mcp-server .
   ```

2. **Test the container:**

   ```bash
   docker run --rm -e ENV0_API_KEY=your-api-key -e ENV0_API_SECRET=your-api-secret -e ENV0_ORGANIZATION_ID=your-org-id env0/mcp-server
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
docker run -d -p 3000:3000 -e PORT=3000 -e MCP_TRANSPORT=http env0/mcp-server
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
