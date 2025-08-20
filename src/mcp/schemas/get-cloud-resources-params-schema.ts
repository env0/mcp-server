import z from 'zod';

const cloudProviderEnum = z.enum(['AWS', 'GCP', 'AzureLAW']);
const baseEQPattern = z.object({
  eq: z.string().optional(),
  in: z.array(z.string()).optional()
});

const optionalEQPattern = baseEQPattern.optional();

const textPattern = baseEQPattern
  .extend({
    like: z.string().optional()
  })
  .optional();

export const GetCloudResourcesParamsSchema = z.object({
  limit: z.number().int().positive().max(100).optional(),
  offset: z.number().int().nonnegative().optional(),
  orderBy: z.string().optional(),
  filters: z.object({
    cloudConfigurationId: optionalEQPattern.describe(
      'The cloud configuration ID, can be found using the Cloud Configurations tool. ' +
        "It's required that you provide either a configuration ID or a cloud provider"
    ),
    cloudProvider: z
      .object({
        eq: cloudProviderEnum.optional(),
        in: z.array(cloudProviderEnum).optional()
      })
      .optional()
      .describe(
        "The cloud provider ID. It's required that you provide either a configuration ID or a cloud provider"
      ),
    managementType: optionalEQPattern,
    region: optionalEQPattern,
    type: textPattern,
    name: textPattern,
    accountId: optionalEQPattern,
    service: optionalEQPattern,
    resourceId: textPattern,
    cloudId: textPattern,
    severity: z
      .object({
        in: z.array(z.enum(['High', 'Medium', 'Low', 'Optimal', 'Ignored', 'Reset']))
      })
      .optional(),
    searchBy: textPattern,
    driftStatus: optionalEQPattern,
    environmentId: optionalEQPattern
  })
});

export type GetCloudResourcesParams = z.infer<typeof GetCloudResourcesParamsSchema>;
