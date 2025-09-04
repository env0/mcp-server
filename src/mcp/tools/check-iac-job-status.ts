import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import {
  type CheckIaCJobStatusParams,
  CheckIaCJobStatusSchema
} from '../schemas/check-iac-job-status-schema';

export function registerCheckIaCJobStatusTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'check-iac-job-status',
    {
      title: 'Check IaC Job Status',
      description:
        'Check the status and retrieve results of an Infrastructure as Code generation job. Use this tool after calling generate-iac to monitor progress and get results. Could take up to around 1 minute to get results.',
      inputSchema: CheckIaCJobStatusSchema.shape
    },
    async (params: CheckIaCJobStatusParams) => {
      try {
        const result = await env0Service.checkIaCJobStatus(params);

        return {
          content: [
            {
              type: 'text',
              text: `Job Status for ${params.jobId}:\n\n${JSON.stringify(result, null, 2)}`
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error checking job status: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
