import { z } from 'zod/v3';

export const SearchDeploymentsParamsSchema = z.object({
  environmentId: z.string().describe('The ID of the environment to list deployments for'),
  statuses: z
    .string()
    .optional()
    .describe(
      'Comma-separated deployment statuses to filter by. Common values: SUCCESS, FAILURE, IN_PROGRESS, CANCELLED, ABORTED, WAITING_FOR_USER, TIMEOUT.'
    ),
  limit: z
    .number()
    .int()
    .positive()
    .max(25)
    .optional()
    .describe('Maximum number of deployments to return. Defaults to 10, max 25.'),
  offset: z
    .number()
    .int()
    .nonnegative()
    .optional()
    .describe(
      'Number of deployments to skip from the start (newest-first). Use sparingly — prefer filtering via `statuses` first. Helpful only when you need to dig past the most recent page.'
    )
});

export type SearchDeploymentsParams = z.infer<typeof SearchDeploymentsParamsSchema>;
