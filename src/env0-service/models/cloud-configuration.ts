export interface Env0CloudConfiguration {
  id: string;
  name: string;
  type: 'AWS' | 'GCP' | 'AZURE';
  organizationId: string;
  createdAt: string;
  updatedAt: string;
  isDefault?: boolean;
  status?: 'ACTIVE' | 'INACTIVE';
  lastTestAt?: string;
  lastTestStatus?: 'SUCCESS' | 'FAILED';
}
