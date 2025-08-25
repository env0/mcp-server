import { z } from 'zod';

export const GenerateIaCSchema = z.object({
  cloudResourceIds: z.array(z.string()).describe('Array of cloud resource IDs to generate IaC for'),
  iacType: z.enum(['OpenTofu', 'Terraform']).describe('Type of IaC to generate')
});

export type GenerateIaCParams = z.infer<typeof GenerateIaCSchema>;
