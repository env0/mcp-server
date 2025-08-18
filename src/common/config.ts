import type { Env0Config } from '../env0-service/env0-client';

export function getAndValidateConfig(overrides?: Partial<Env0Config>): Env0Config {
  const config: Env0Config = {
    apiUrl: overrides?.apiUrl || process.env.ENV0_API_URL || 'https://api.env0.com',
    organizationId: overrides?.organizationId || process.env.ENV0_ORGANIZATION_ID || '',
    apiAccessToken: overrides?.apiAccessToken || process.env.ENV0_API_ACCESS_TOKEN,
    apiKeyId: overrides?.apiKeyId || process.env.ENV0_API_KEY,
    apiKeySecret: overrides?.apiKeySecret || process.env.ENV0_API_SECRET,
  };

  validateConfig(config);
  return config;
}

function validateConfig(config: Env0Config): void {
  if (!config.apiAccessToken && (!config.apiKeyId || !config.apiKeySecret)) {
    throw new Error(
      'Missing required env0 API credentials (apiAccessToken or apiKeyId/apiKeySecret)'
    );
  }

  try {
    new URL(config.apiUrl);
  } catch {
    throw new Error(`Invalid API URL: ${config.apiUrl}`);
  }
}
