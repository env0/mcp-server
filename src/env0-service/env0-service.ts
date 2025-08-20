import type { GetEnvironmentsParams } from '../mcp/schemas/get-environments-params-schema';
import type { Env0Config } from './env0-client';
import type Env0Client from './env0-client';
import type { CloudConfiguration } from './models/cloud-configuration';
import type { CloudResource } from './models/cloud-resource';
import type { GetCloudResourcesParams } from '../mcp/schemas/get-cloud-resources-params-schema';

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

  async getEnvironments(environmentParams: GetEnvironmentsParams): Promise<object[]> {
    return this.env0Client.request({
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

  async getCloudResources({
    limit,
    offset,
    orderBy,
    cloudConfigurationId,
    cloudProvider
  }: GetCloudResourcesParams): Promise<CloudResource[]> {
    const data = {
      organizationId: this.config.organizationId || undefined,
      orderBy: orderBy || undefined,
      paging:
        limit || offset
          ? {
              limit: limit || undefined,
              offset: offset || 0
            }
          : undefined,
      filters: {
        ...(cloudConfigurationId && { cloudConfigurationId: { eq: cloudConfigurationId } }),
        ...(cloudProvider && { cloudProvider: { eq: cloudProvider } })
      }
    };
    console.log(data);
    return this.env0Client.request<CloudResource[]>({
      url: '/cloud/resources', // TODO: change to /mcp/cloud/resources
      method: 'POST',
      data
    });
  }

  async getProjects(): Promise<object[]> {
    return this.env0Client.request({
      url: '/mcp/projects',
      params: {
        organizationId: this.config.organizationId || undefined
      }
    });
  }
}
