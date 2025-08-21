import type { CallToolResult } from '@modelcontextprotocol/sdk/types';
import { serializeContent } from './serialize-content';

export type ToolCallback<TParams = any> = (params: TParams) => any | Promise<any>;
export type NoParamsToolCallback = () => any | Promise<any>;

/**
 * Wraps a callback function to automatically serialize its return value using serializeContent
 * @param callback - The callback function to wrap
 * @returns A function that returns a CallToolResult
 */
export function wrap<TParams = any>(
  callback: ToolCallback<TParams>
): (params: TParams) => Promise<CallToolResult>;
export function wrap(callback: NoParamsToolCallback): () => Promise<CallToolResult>;
export function wrap<TParams = any>(
  callback: ToolCallback<TParams> | NoParamsToolCallback
): (params?: TParams) => Promise<CallToolResult> {
  return async (params?: TParams): Promise<CallToolResult> => {
    const result =
      params !== undefined
        ? await (callback as ToolCallback<TParams>)(params)
        : await (callback as NoParamsToolCallback)();

    return serializeContent(result);
  };
}
