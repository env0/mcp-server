import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import { type GenerateIaCParams, GenerateIaCSchema } from '../schemas/generate-iac-schema';

export function registerGenerateIaCTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'generate-iac',
    {
      title: 'Generate Infrastructure as Code',
      description:
        'Generate Infrastructure as Code (IaC) for cloud resources. This tool initiates a long-running job and returns a job ID for tracking progress.',
      inputSchema: GenerateIaCSchema.shape
    },
    async (params: GenerateIaCParams) => {
      try {
        const result = await env0Service.generateIaC(params);

        return {
          content: [
            {
              type: 'text',
              text: `IaC generation job started successfully!\n\nJob ID: ${result.jobId}\n\nUse the 'check-iac-job-status' tool with this job ID to monitor progress and retrieve results when complete.`
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error starting IaC generation job: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
