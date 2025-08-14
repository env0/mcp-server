import type Env0Client from './env0-client';
import type { CloudConfiguration } from './models/cloud-configuration';

export class Env0Service {
  constructor(
    private readonly config: { organizationId?: string },
    private readonly env0Client: Env0Client
  ) {}

  async getCloudConfigurations(): Promise<CloudConfiguration[]> {
    return this.env0Client.request<CloudConfiguration[]>({
      url: '/mcp/cloud/configurations',
      params: { organizationId: this.config.organizationId || undefined },
    });
  }
}
