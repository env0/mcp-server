import type { Env0Config } from '../env0-service/env0-client';

export function getAndValidateConfig(overrides?: Partial<Env0Config>): Env0Config {
  const config: Env0Config = {
    apiUrl: overrides?.apiUrl || process.env.ENV0_API_URL || 'https://api.env0.com',
    organizationId: overrides?.organizationId || process.env.ENV0_ORGANIZATION_ID || '',
    apiAccessToken: overrides?.apiAccessToken || process.env.ENV0_API_ACCESS_TOKEN,
    apiKeyId: overrides?.apiKeyId || process.env.ENV0_API_KEY_ID,
    apiKeySecret: overrides?.apiKeySecret || process.env.ENV0_API_KEY_SECRET,
  };

  validateConfig(config);
  return config;
}

function validateConfig(config: Env0Config): void {
  const required = ['organizationId'] as const;
  const missing = required.filter(key => !config[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required env0 configuration: ${missing.join(', ')}`);
  }

  if (!config.apiAccessToken && (!config.apiKeyId || !config.apiKeySecret)) {
    throw new Error(
      'Missing required env0 API credentials (apiAccessToken or apiKeyId/apiKeySecret)'
    );
  }

  // Validate API URL format
  try {
    new globalThis.URL(config.apiUrl);
  } catch {
    throw new Error(`Invalid API URL: ${config.apiUrl}`);
  }
}
