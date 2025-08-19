import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export interface Env0Config {
  organizationId: string;
  apiUrl: string;
  apiKeyId: string;
  apiKeySecret: string;
}

export class Env0Client {
  private readonly client: AxiosInstance;

  constructor(config: Env0Config) {
    const authHeader = `Basic ${Buffer.from(`${config.apiKeyId}:${config.apiKeySecret}`).toString('base64')}`;

    this.client = axios.create({
      baseURL: config.apiUrl,
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 30000, // 30 second timeout
    });

    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          const status = error.response.status;
          let message: string;

          switch (status) {
            case 401:
              message =
                'Authentication failed. Please check your ENV0_API_KEY and ENV0_API_SECRET credentials. They may be invalid or expired.';
              break;
            case 403:
              message =
                'Access forbidden. Your API key may not have sufficient permissions to access this resource. Please check your API key permissions in the env0 dashboard.';
              break;
            case 429:
              message =
                'Rate limit exceeded. Too many requests have been made to the env0 API. Please wait before making additional requests.';
              break;
            default:
              message = `Request failed with status ${status}: ${error.response.data}`;
          }

          error.message = message;
        }
        return Promise.reject(error);
      }
    );
  }

  async request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.client.request<T>(config);
    return response.data;
  }
}

export default Env0Client;
