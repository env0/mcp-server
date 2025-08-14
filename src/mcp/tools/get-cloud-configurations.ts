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
          .map(config => {
            let serializedConfig = `- ID: ${config.id}
Name: ${config.name}
Type: ${config.provider}
Organization ID: ${config.organizationId}
Cloud ID: ${config.cloudId}
Health: ${config.health}
Date From: ${config.dataFrom}
Date Until: ${config.dataUntil}
Earliest History: ${config.earliestHistory}
Latest History: ${config.latestHistory}`;
            if (config.lastScan) {
              serializedConfig += `Last Scan: ${config.lastScan.startedAt} (${config.lastScan.status})\n`;
            }
            if (config.lastTest) {
              serializedConfig += `Last Test Time: ${config.lastTest.testAt}\n`;
              if (config.lastTest.error)
                serializedConfig += `Last Test Error: ${config.lastTest.error}`;
            }
            return serializedConfig;
          })
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
