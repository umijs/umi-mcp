import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { afterAll, beforeAll, expect, test } from 'vitest';

let client: Client;

beforeAll(async () => {
  const transport = new StdioClientTransport({
    command: 'npx',
    args: ['tsx', 'src/cli.ts', 'fixtures/normal'],
  });
  client = new Client({
    name: 'test',
    version: '1.0.0',
  });
  await client.connect(transport);
});

afterAll(async () => {
  await client.close();
});

test('list tools', async () => {
  const tools = await client.listTools();
  console.log(tools);
  expect(tools).toBeDefined();
});
