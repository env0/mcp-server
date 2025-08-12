/**
 * Configuration interface for the Env0 client
 */
export interface Env0Config {
  organizationId: string;
  apiUrl: string;
  /** Pre-generated base64 API Access Token (preferred if provided) */
  apiAccessToken: string | undefined;
  /** API Key ID (used with apiKeySecret if apiAccessToken not provided) */
  apiKeyId: string | undefined;
  /** API Key Secret (used with apiKeyId if apiAccessToken not provided) */
  apiKeySecret: string | undefined;
}

/**
 * Common response structure for env0 API
 */
export interface Env0ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

/**
 * HTTP request options
 */
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
}

/**
 * Env0 API Client
 *
 * A comprehensive client for interacting with the env0 REST API.
 * Supports authentication via API Access Token (preferred) or API Key ID/Secret.
 * Provides methods for managing projects, environments, templates, and deployments.
 *
 * Authentication Options:
 * 1. API Access Token (preferred): A pre-generated base64 token
 * 2. API Key ID + Secret: Individual key components that get combined into Basic auth
 *
 * You can generate an API Access Token using:
 * echo -n "API_KEY_ID:API_KEY_SECRET" | base64
 */
export class Env0Client {
  private readonly authHeader: string;

  constructor(private readonly config: Env0Config) {
    // Create Auth header - prefer API Access Token over Key ID/Secret
    if (this.config.apiAccessToken) {
      // API Access Token is already base64 encoded, use directly with Basic auth
      this.authHeader = `Basic ${this.config.apiAccessToken}`;
    } else {
      // Fallback to Basic Auth with Key ID and Secret
      const credentials = Buffer.from(
        `${this.config.apiKeyId}:${this.config.apiKeySecret}`
      ).toString('base64');
      this.authHeader = `Basic ${credentials}`;
    }
  }

  /**
   * Make an authenticated HTTP request to the env0 API
   */
  async request<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.config.apiUrl}${endpoint}`;
    const { method = 'GET', body, headers = {} } = options;

    try {
      const response = await globalThis.fetch(url, {
        method,
        headers: {
          Authorization: this.authHeader,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });

      // Handle rate limiting
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. env0 API allows up to 1K requests per 60 seconds.');
      }

      // Handle authentication errors
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key credentials.');
      }

      // Handle authorization errors
      if (response.status === 403) {
        throw new Error('Access forbidden. Please check your API key permissions.');
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        return {} as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`env0 API request failed: ${error.message}`);
      }
      throw new Error('Unknown error occurred while making API request');
    }
  }

  /**
   * Get the current configuration (without sensitive data)
   */
  getConfig(): { apiUrl: string; apiKeyId?: string; organizationId: string } {
    return {
      apiUrl: this.config.apiUrl,
      organizationId: this.config.organizationId,
      ...(this.config.apiKeyId && { apiKeyId: this.config.apiKeyId }),
    };
  }
}

/**
 * Default export for convenience
 */
export default Env0Client;
