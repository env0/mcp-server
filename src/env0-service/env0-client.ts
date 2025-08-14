import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export interface Env0Config {
  organizationId: string;
  apiUrl: string;
  apiAccessToken: string | undefined;
  apiKeyId: string | undefined;
  apiKeySecret: string | undefined;
}

export class Env0Client {
  private readonly client: AxiosInstance;

  constructor(config: Env0Config) {
    const authHeader = config.apiAccessToken
      ? `Basic ${config.apiAccessToken}`
      : `Basic ${Buffer.from(`${config.apiKeyId}:${config.apiKeySecret}`).toString('base64')}`;

    this.client = axios.create({
      baseURL: config.apiUrl,
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 30000, // 30 second timeout
    });
  }

  async request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.client.request<T>(config);
    return response.data;
  }
}

export default Env0Client;
