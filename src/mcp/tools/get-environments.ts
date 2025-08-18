import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import z from 'zod';

export function registerGetEnvironmentsTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'get-environments',
    {
      title: 'Get Environments',
      description: 'Get the environments from env0',
      inputSchema: {
        projectId: z.string().optional(),
        name: z.string().optional(),
        limit: z.number().int().positive().max(100).optional(),
        offset: z.number().int().nonnegative().optional(),
      },
    },
    async ({ projectId, name, limit, offset }) => {
      try {
        const environments = await env0Service.getEnvironments({
          projectId,
          name,
          limit,
          offset,
        });

        if (environments.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: 'No environments found.',
              },
            ],
          };
        }

        const environmentList = environments
          .map(env => {
            let serializedEnv = `- ID: ${env.id}
Name: ${env.name}
Organization ID: ${env.organizationId}
Project ID: ${env.projectId}
User ID: ${env.userId}
Workspace: ${env.workspaceName}
Status: ${env.status}
Requires Approval: ${env.requiresApproval}
Continuous Deployment: ${env.continuousDeployment}
Pull Request Plan Deployments: ${env.pullRequestPlanDeployments}
Auto Deploy On Path Changes Only: ${env.autoDeployOnPathChangesOnly}
Is Remote Backend: ${env.isRemoteBackend}
Is Locked: ${env.isLocked}
Drift Status: ${env.driftStatus}
Is Archived: ${env.isArchived}
Marked For Auto Destroy: ${env.markedForAutoDestroy}`;

            if (env.user.name) {
              serializedEnv += `\nUser: ${env.user.name} (${env.user.email})`;
            }

            if (env.latestDeploymentLog) {
              serializedEnv += `\nLatest Deployment: ${env.latestDeploymentLog.type} - ${env.latestDeploymentLog.status}`;
              if (env.latestDeploymentLog.startedAt) {
                serializedEnv += ` (Started: ${env.latestDeploymentLog.startedAt})`;
              }
            }

            if (env.lifespanEndAt) {
              serializedEnv += `\nLifespan Ends: ${env.lifespanEndAt}`;
            }

            if (env.nextScheduledDates.deploy) {
              serializedEnv += `\nNext Deploy: ${env.nextScheduledDates.deploy}`;
            }

            if (env.nextScheduledDates.destroy) {
              serializedEnv += `\nNext Destroy: ${env.nextScheduledDates.destroy}`;
            }

            return serializedEnv;
          })
          .join('\n\n');

        return {
          content: [
            {
              type: 'text',
              text: `Environments (${environments.length} found):

${environmentList}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching environments: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
