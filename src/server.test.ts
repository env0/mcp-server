import assert from 'node:assert/strict';
import type { AddressInfo } from 'node:net';
import { after, describe, it } from 'node:test';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { startHttpServer } from './server';

describe('POST /messages', () => {
  it('does not echo an unknown session ID in the 400 response', async () => {
    const httpServer = await startHttpServer(0, new McpServer({ name: 'test', version: '0.0.0' }));
    after(() => httpServer.close());
    const { port } = httpServer.address() as AddressInfo;
    const sessionId = '<script>alert(1)</script>';

    const response = await fetch(
      `http://localhost:${port}/messages?sessionId=${encodeURIComponent(sessionId)}`,
      { method: 'POST' }
    );

    assert.equal(response.status, 400);
    assert.doesNotMatch(await response.text(), /script/);
  });
});
