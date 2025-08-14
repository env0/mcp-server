export interface Env0Config {
  organizationId: string;
  apiUrl: string;
  apiAccessToken: string | undefined;
  apiKeyId: string | undefined;
  apiKeySecret: string | undefined;
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
}

export class Env0Client {
  private readonly authHeader: string;

  constructor(private readonly config: Env0Config) {
    if (this.config.apiAccessToken) {
      this.authHeader = `Basic ${this.config.apiAccessToken}`;
    } else {
      // Fallback to Basic Auth with Key ID and Secret
      const credentials = Buffer.from(
        `${this.config.apiKeyId}:${this.config.apiKeySecret}`
      ).toString('base64');
      this.authHeader = `Basic ${credentials}`;
    }
  }

  async request<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.config.apiUrl}${endpoint}`;
    const { method = 'GET', body, headers = {} } = options;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: this.authHeader,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });

      if (response.status === 429) {
        throw new Error('Rate limit exceeded. env0 API allows up to 1K requests per 60 seconds.');
      }

      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key credentials.');
      }

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
}

export default Env0Client;
