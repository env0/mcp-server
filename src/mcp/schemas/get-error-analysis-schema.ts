import z from 'zod/v3';

export const GetErrorAnalysisSchema = z.object({
  environmentId: z.string().describe('The ID of the environment to get error analysis for')
});

export type GetErrorAnalysisParams = z.infer<typeof GetErrorAnalysisSchema>;
