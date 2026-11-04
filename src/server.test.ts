import assert from 'node:assert/strict';
import type { AddressInfo } from 'node:net';
import { after, describe, it } from 'node:test';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { startHttpServer } from './server';

const createTestServer = (): McpServer => new McpServer({ name: 'test', version: '0.0.0' });
const sharedTestServer = (): (() => McpServer) => {
  const server = createTestServer();
  return () => server;
};

describe('POST /messages', () => {
  it('does not echo an unknown session ID in the 400 response', async () => {
    const httpServer = await startHttpServer(0, sharedTestServer());
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

describe('POST /mcp', () => {
  it('accepts concurrent sessions when each session gets its own McpServer', async () => {
    const httpServer = await startHttpServer(0, createTestServer);
    after(() => httpServer.close());
    const { port } = httpServer.address() as AddressInfo;

    const initialize = (): ReturnType<typeof fetch> =>
      fetch(`http://localhost:${port}/mcp`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json, text/event-stream'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'initialize',
          params: {
            protocolVersion: '2025-06-18',
            capabilities: {},
            clientInfo: { name: 'test-client', version: '0.0.0' }
          }
        })
      });

    // With a single shared McpServer the second initialize fails with
    // "Already connected to a transport" (500).
    const responses = await Promise.all([initialize(), initialize(), initialize()]);

    assert.deepEqual(
      responses.map(r => r.status),
      [200, 200, 200]
    );
    const sessionIds = responses.map(r => r.headers.get('mcp-session-id'));
    assert.equal(new Set(sessionIds).size, 3);
    await Promise.all(responses.map(r => r.body?.cancel()));
  });
});
