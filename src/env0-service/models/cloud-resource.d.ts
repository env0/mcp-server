import { ManagementType, ProviderType, IacDriftStatus } from './cloud-configuration';

interface CloudResource {
  id?: string;

  organizationId: string;

  cloudConfigurationId?: string;
  cloudProvider: ProviderType;
  severity?: number;
  isIgnored: boolean;
  managementType: ManagementType;

  accountId?: string;
  region?: string;
  service: string;
  type?: string;
  resourceId: string;
  parentResourceId?: string;
  cloudId?: string;

  name?: string;
  metadata?: Record<string, any>;

  clickOpsCount: number;
  apiOpsCount: number;
  iacOpsCount: number;
  latestEventManagementType?: ManagementType;

  firstSeen: Date;
  lastSeen: Date;
  severityManuallySetAt?: Date;
  iacDriftStatus?: IacDriftStatus;
  stateResource?: StateResource;
}

export type CloudResourcesResponse = { resources: CloudResource[]; total: number };
