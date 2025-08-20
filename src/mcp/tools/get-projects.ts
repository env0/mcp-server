import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';

export function registerGetProjectsTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'get-projects',
    {
      title: 'Get Projects',
      description: 'Get the projects from env0'
    },
    async () => {
      try {
        const projects = await env0Service.getProjects();

        if (projects.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: 'No projects found.'
              }
            ]
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: `Projects (${projects.length} found): ${JSON.stringify(projects)}`
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching projects: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
