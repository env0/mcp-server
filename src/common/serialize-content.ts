import type { CallToolResult } from '@modelcontextprotocol/sdk/types';

export async function serializeContent(content: any): Promise<CallToolResult> {
  let serializedContent: string;
  if (content instanceof Promise) {
    content = await content;
  }

  if (content === null || content === undefined) {
    serializedContent = 'No content found.';
  } else if (typeof content === 'string') {
    serializedContent = content;
  } else {
    serializedContent = JSON.stringify(content);
  }

  return {
    content: [
      {
        type: 'text',
        text: serializedContent
      }
    ]
  };
}
