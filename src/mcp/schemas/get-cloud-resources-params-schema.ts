import z from 'zod';

const cloudProviderEnum = z.enum(['AWS', 'GCP', 'AzureLAW']);
const baseEQPattern = z.object({
  eq: z.string().optional(),
  in: z.array(z.string()).optional()
});

const optionalEQPattern = baseEQPattern.optional();

const textPattern = baseEQPattern.optional();

export const GetCloudResourcesParamsSchema = z.object({
  orderBy: z
    .array(
      z
        .array(z.string())
        .describe(
          'Array of field names to sort by and then either "ASC" or "DESC" (e.g., ["environmentId", "ASC"], ["managementType", "DESC"])'
        )
    )
    .optional(),
  paging: z
    .object({
      limit: z.number().int().positive().max(100),
      offset: z.number().int().nonnegative()
    })
    .optional(),
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
    managementType: optionalEQPattern.describe(
      'An Optional filter for a specific IaC management type, ' +
        "basically whether the resource is managed by IaC or not. Possible values for filtering are: 'IaC', 'ClickOps', 'API'"
    ),
    region: optionalEQPattern,
    type: textPattern.describe(
      'An Optional filter for a specific cloud resource type. ' +
        'For AWS it looks as follows: [ServiceName]:[ResourceType]. For example: "EC2:Instance", "S3:Bucket", "IAM:User", etc.'
    ),
    name: textPattern,
    accountId: optionalEQPattern,
    service: optionalEQPattern.describe(
      'An Optional filter for a specific cloud service. ' +
        'For AWS it looks as follows: "s3.amazonaws.com", "iam.amazonaws.com", etc.'
    ),
    resourceId: textPattern,
    cloudId: textPattern,
    severity: z
      .object({
        in: z.array(z.enum(['High', 'Medium', 'Low', 'Optimal', 'Ignored', 'Reset']))
      })
      .optional(),
    searchBy: textPattern,
    driftStatus: optionalEQPattern.describe(
      'An Optional filter for a specific drift status. ' +
        'Possible values are: "Drifted", "NotDrifted", "DriftRisk", "Unknown".'
    ),
    environmentId: optionalEQPattern
  })
});

export type GetCloudResourcesParams = z.infer<typeof GetCloudResourcesParamsSchema>;
