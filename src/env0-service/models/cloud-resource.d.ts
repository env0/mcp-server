import { ProviderType } from './cloud-configuration';

export type ManagementType = 'IaC' | 'ClickOps' | 'API';
export type IacDriftStatus = `Unknown` | 'DriftRisk' | 'Drifted' | 'NotDrifted';
export type IacType = 'terraform' | 'opentofu' | 'terragrunt';

export interface StateResource {
  id?: string;

  iacType: IacType;
  cloudProvider: ProviderType | 'Unknown';
  isDrifted?: boolean;
  managed: boolean;

  resourceType: string; // e.g. Terraform: aws_s3_bucket, Pulumi: aws:s3/bucketv2:BucketV2, CloudFormation: AWS::S3::Bucket
  logicalName: string;
  iacProvider?: string; // e.g. provider[\"registry.opentofu.org/hashicorp/null\"].alias
  moduleName?: string;

  cloudCompassResourceId?: string; // Represents CloudResource.resourceId
  region?: string; // Represents CloudResource.region
  accountId?: string; // Represents CloudResource.accountId

  organizationId: string;
  environmentId: string;
  deploymentLogId: string;
}

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
  metadata?: Record<string, unknown>;

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
