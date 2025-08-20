import z from 'zod';

export const GetCloudResourcesParamsSchema = z.object({
  limit: z.number().int().positive().max(100).optional(),
  offset: z.number().int().nonnegative().optional(),
  orderBy: z.string().optional(),
  cloudConfigurationId: z
    .string()
    .optional()
    .describe(
      'The cloud configuration ID, can be found using the Cloud Configurations tool. ' +
        "It's required that you provide either a configuration ID or a cloud provider"
    ),
  cloudProvider: z
    .enum(['AWS', 'GCP', 'AzureLAW'])
    .optional()
    .describe(
      "The cloud provider ID. It's required that you provide either a configuration ID or a cloud provider"
    )
});

export type GetCloudResourcesParams = z.infer<typeof GetCloudResourcesParamsSchema>;
