import type { Env0Config } from '../env0-service/env0-client';
import type { BearerAuthConfig } from '../auth/bearer-auth';

export type AuthMode = 'basic' | 'bearer';

export interface ServerConfig {
  env0: Env0Config;
  authMode: AuthMode;
  bearerAuth?: BearerAuthConfig | undefined;
}

export function getAndValidateConfig(overrides?: Partial<Env0Config>): ServerConfig {
  const authMode = (process.env.AUTH_MODE || 'basic') as AuthMode;

  if (authMode !== 'basic' && authMode !== 'bearer') {
    throw new Error(`Invalid AUTH_MODE: ${authMode}. Must be "basic" or "bearer".`);
  }

  const env0Config: Env0Config = {
    apiUrl: overrides?.apiUrl || process.env.ENV0_API_URL || 'https://api.env0.com',
    organizationId: overrides?.organizationId || process.env.ENV0_ORGANIZATION_ID || '',
    apiKeyId: overrides?.apiKeyId || process.env.ENV0_API_KEY || '',
    apiKeySecret: overrides?.apiKeySecret || process.env.ENV0_API_SECRET || ''
  };

  validateEnv0Config(env0Config);

  const serverConfig: ServerConfig = {
    env0: env0Config,
    authMode
  };

  if (authMode === 'bearer') {
    serverConfig.bearerAuth = getBearerAuthConfig();
  }

  return serverConfig;
}

function validateEnv0Config(config: Env0Config): void {
  if (!config.apiKeyId || !config.apiKeySecret) {
    throw new Error('Missing required env0 API credentials (ENV0_API_KEY and ENV0_API_SECRET)');
  }

  try {
    new URL(config.apiUrl);
  } catch {
    throw new Error(`Invalid API URL: ${config.apiUrl}`);
  }
}

function getBearerAuthConfig(): BearerAuthConfig {
  const issuer = process.env.OIDC_ISSUER;
  const jwksUri = process.env.JWKS_URI;
  const audience = process.env.AUTH_AUDIENCE;

  const resolvedJwksUri =
    jwksUri || (issuer ? `${issuer.replace(/\/$/, '')}/.well-known/jwks.json` : '');

  if (!resolvedJwksUri) {
    throw new Error(
      'Bearer auth requires JWKS_URI or OIDC_ISSUER to be set. ' +
        'Set JWKS_URI for a direct JWKS endpoint, or OIDC_ISSUER to derive it from the issuer URL.'
    );
  }

  try {
    new URL(resolvedJwksUri);
  } catch {
    throw new Error(`Invalid JWKS URI: ${resolvedJwksUri}`);
  }

  return {
    jwksUri: resolvedJwksUri,
    issuer,
    audience
  };
}
