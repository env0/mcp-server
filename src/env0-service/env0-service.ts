import type { Env0Config } from './env0-client';
import type Env0Client from './env0-client';
import type { CloudConfiguration } from './models/cloud-configuration';
import type { Environment } from './models/environment';
import type { GetEnvironmentsParams } from '../mcp/schemas/get-environments-params-schema';

export class Env0Service {
  private readonly config: Env0Config;
  private readonly env0Client: Env0Client;

  constructor(config: Env0Config, env0Client: Env0Client) {
    this.config = config;
    this.env0Client = env0Client;
  }

  async getCloudConfigurations(): Promise<CloudConfiguration[]> {
    return this.env0Client.request<CloudConfiguration[]>({
      url: '/mcp/cloud/configurations',
      params: { organizationId: this.config.organizationId || undefined }
    });
  }

  async getEnvironments(environmentParams: GetEnvironmentsParams): Promise<Environment[]> {
    return this.env0Client.request<Environment[]>({
      url: '/mcp/environments',
      params: {
        organizationId: this.config.organizationId || undefined,
        projectId: environmentParams.projectId || undefined,
        name: environmentParams.name || undefined,
        limit: environmentParams.limit || undefined,
        offset: environmentParams.offset || undefined
      }
    });
  }
}
