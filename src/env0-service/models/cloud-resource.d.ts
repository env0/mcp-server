export interface CloudResource {
  id: string;
  name: string;
  type: string;
  provider: 'AWS' | 'GCP' | 'AZURE';
  region: string;
  cloudConfigurationId: string;
  createdAt: string;
  updatedAt: string;
  cost: number;
  tags: Record<string, string>;
}
