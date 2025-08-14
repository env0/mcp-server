export type ProviderType = 'AWS' | 'AzureLAW' | 'GCP';

export type ScanStatus = 'PASSED' | 'FAILED' | 'IN_PROGRESS';

export type AWSCloudConfiguration = {
  accountId: string;
  bucketName: string;
  prefix?: string;
  regions: string[];
  shouldPrefixUnderLogsFolder?: boolean;
};

export type AzureLawCloudConfiguration = {
  tenantId: string;
  clientId: string;
  logAnalyticsWorkspaceId: string;
};

export type GcpCloudConfiguration = {
  gcpProjectId: string;
  credentialConfigurationFileContent: string;
  gcpProjectNumber?: string;
};

export type CloudConfigurationData =
  | AWSCloudConfiguration
  | AzureLawCloudConfiguration
  | GcpCloudConfiguration;

export type CloudConfigurationScan = {
  startedAt: Date;
  finishedAt?: Date;
  startedBy?: string;
  status: ScanStatus;
  error?: string;
};

export type CloudConfigurationTest = {
  testAt: string;
  error?: string;
};

export type CloudConfiguration = {
  id?: string;
  organizationId: string;
  provider: ProviderType;
  name: string;
  cloudId: string;
  health: boolean;
  configuration: CloudConfigurationData;
  lastScan?: CloudConfigurationScan;
  lastTest?: CloudConfigurationTest;

  dataFrom?: Date;
  dataUntil?: Date;

  earliestHistory?: Date;
  latestHistory?: Date;
};
