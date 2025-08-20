import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';

export function registerGetCloudConfigurationsTool(
  server: McpServer,
  env0Service: Env0Service
): void {
  server.registerTool(
    'get-cloud-configurations',
    {
      title: 'Get Cloud Configurations',
      description: 'Get the compass cloud configurations'
    },
    async () => {
      try {
        const configurations = await env0Service.getCloudConfigurations();

        if (configurations.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: 'No cloud configurations found.'
              }
            ]
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: `Cloud Configurations (${configurations.length} found): ${JSON.stringify(configurations)}`
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching cloud configurations: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
