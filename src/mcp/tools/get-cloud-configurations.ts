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
      description: 'Get the compass cloud configurations',
    },
    async () => {
      try {
        const configurations = await env0Service.getCloudConfigurations();

        if (configurations.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: 'No cloud configurations found.',
              },
            ],
          };
        }

        const configList = configurations
          .map(
            config => `- ID: ${config.id}
  Name: ${config.name}
  Type: ${config.type}
  Organization ID: ${config.organizationId}
  Is Default: ${config.isDefault ? 'Yes' : 'No'}
  Status: ${config.status || 'N/A'}
  Last Test: ${config.lastTestAt || 'N/A'}
  Last Test Status: ${config.lastTestStatus || 'N/A'}
  Created: ${config.createdAt}
  Updated: ${config.updatedAt}`
          )
          .join('\n\n');

        return {
          content: [
            {
              type: 'text',
              text: `Cloud Configurations (${configurations.length} found):

${configList}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching cloud configurations: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
