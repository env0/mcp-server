import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { AxiosRequestConfig } from 'axios';
import type Env0Client from './env0-client';
import type { CloudConfiguration } from './models/cloud-configuration';
import { Env0Service } from './env0-service';

const config = {
  organizationId: 'org-1',
  apiUrl: 'https://api.env0.com',
  apiKeyId: 'id',
  apiKeySecret: 'secret'
};

const buildService = (
  providers: CloudConfiguration['provider'][]
): { service: Env0Service; requests: AxiosRequestConfig[] } => {
  const requests: AxiosRequestConfig[] = [];
  const client = {
    request: async (request: AxiosRequestConfig) => {
      requests.push(request);
      return request.url === '/mcp/cloud/configurations'
        ? providers.map(provider => ({ provider }))
        : { resources: [], total: 0 };
    }
  } as unknown as Env0Client;

  return { service: new Env0Service(config, client), requests };
};

describe('getCloudResources', () => {
  it('fills in the organization cloud provider when the search has no provider and no configuration', async () => {
    const { service, requests } = buildService(['GCP']);

    await service.getCloudResources({ filters: {} });

    assert.deepEqual(requests.at(-1)?.data.filters, { cloudProvider: { eq: 'GCP' } });
  });

  it('asks for a provider when the organization has more than one', async () => {
    const { service } = buildService(['AWS', 'GCP']);

    await assert.rejects(service.getCloudResources({ filters: {} }), /AWS, GCP/);
  });

  it('keeps the search as is when it already has a configuration ID', async () => {
    const { service, requests } = buildService(['AWS']);
    const filters = { cloudConfigurationId: { eq: 'config-1' } };

    await service.getCloudResources({ filters });

    assert.deepEqual(requests.at(-1)?.data.filters, filters);
    assert.equal(requests.length, 1);
  });
});
