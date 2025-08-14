import type Env0Client from './env0-client';
import type { CloudConfiguration } from './models/cloud-configuration';

export class Env0Service {
  constructor(
    private readonly config: { organizationId: string },
    private readonly env0Client: Env0Client
  ) {}

  async getCloudConfigurations(): Promise<CloudConfiguration[]> {
    return this.env0Client.request<CloudConfiguration[]>(
      `/cloud/configurations?organizationId=${this.config.organizationId}`
    );
  }
}
