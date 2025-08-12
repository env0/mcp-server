import type Env0Client from './env0-client';
import type { Env0CloudConfiguration } from './models/cloud-configuration';

export class Env0Service {
  constructor(
    private readonly config: { organizationId: string },
    private readonly env0Client: Env0Client
  ) {}

  async getCloudConfigurations(): Promise<Env0CloudConfiguration[]> {
    return this.env0Client.request<Env0CloudConfiguration[]>(
      `/cloud/configurations?organizationId=${this.config.organizationId}`
    );
  }
}
