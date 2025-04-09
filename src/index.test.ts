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

test('umi-help', async () => {
  const result = await client.callTool({
    name: 'umi-help',
    arguments: {},
  });
  console.log(result);
  expect(result).toBeDefined();
});

test('umi-version', async () => {
  const result = await client.callTool({
    name: 'umi-version',
    arguments: {},
  });
  console.log(result);
  expect(result).toBeDefined();
});

test('umi-plugin-list', async () => {
  const result = await client.callTool({
    name: 'umi-plugin-list',
    arguments: {},
  });
  console.log(result);
  expect(result).toBeDefined();
});

test('umi-config-list', async () => {
  const result = await client.callTool({
    name: 'umi-config-list',
    arguments: {},
  });
  console.log(result);
  expect(result).toBeDefined();
});

test('umi-config-get', async () => {
  const result = await client.callTool({
    name: 'umi-config-get',
    arguments: {
      key: 'routes',
    },
  });
  console.log(result);
  expect(result).toBeDefined();
});

test('umi-config-set and umi-config-remove', async () => {
  const setResult = await client.callTool({
    name: 'umi-config-set',
    arguments: {
      key: 'mako',
      value: '{}',
    },
  });
  console.log(setResult);
  expect(setResult).toBeDefined();

  const removeResult = await client.callTool({
    name: 'umi-config-remove',
    arguments: {
      key: 'mako',
    },
  });
  console.log(removeResult);
  expect(removeResult).toBeDefined();
});

test('umi-setup', async () => {
  const result = await client.callTool({
    name: 'umi-setup',
    arguments: {},
  });
  console.log(result);
  expect(result).toBeDefined();
});

test('umi-generate-component', async () => {
  const result = await client.callTool({
    name: 'umi-generate-component',
    arguments: {
      name: 'TestComponent',
    },
  });
  console.log(result);
  expect(result).toBeDefined();
});

test('umi-lint', async () => {
  const result = await client.callTool({
    name: 'umi-lint',
    arguments: {},
  });
  console.log(result);
  expect(result).toBeDefined();
});
