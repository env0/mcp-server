import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env0Service } from '../../env0-service/env0-service';
import {
  type GetErrorAnalysisParams,
  GetErrorAnalysisSchema
} from '../schemas/get-error-analysis-schema';

export function registerGetErrorAnalysisTool(server: McpServer, env0Service: Env0Service): void {
  server.registerTool(
    'get-error-analysis',
    {
      title: 'Get Error Analysis',
      description: `Analyzes errors in the latest deployment of an environment. For historical deployments use get-deployment-context instead.`,
      inputSchema: GetErrorAnalysisSchema.shape
    },
    async ({ environmentId }: GetErrorAnalysisParams) => {
      try {
        const errorAnalysis = await env0Service.getErrorAnalysis(environmentId);

        return {
          content: [
            {
              type: 'text',
              text: `Got error analysis result: ${JSON.stringify(errorAnalysis)}`
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error getting error analysis result: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
