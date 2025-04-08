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

  expect(result).toBeDefined();
});

test('umi-version', async () => {
  const result = await client.callTool({
    name: 'umi-version',
    arguments: {},
  });

  expect(result).toBeDefined();
});

test('umi-plugin-list', async () => {
  const result = await client.callTool({
    name: 'umi-plugin-list',
    arguments: {},
  });

  expect(result).toBeDefined();
});

test('umi-config-list', async () => {
  const result = await client.callTool({
    name: 'umi-config-list',
    arguments: {},
  });

  expect(result).toBeDefined();
});

test('umi-config-get', async () => {
  const result = await client.callTool({
    name: 'umi-config-get',
    arguments: {
      key: 'publicPath',
    },
  });

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

  expect(setResult).toBeDefined();

  const removeResult = await client.callTool({
    name: 'umi-config-remove',
    arguments: {
      key: 'mako',
    },
  });

  expect(removeResult).toBeDefined();
});

test('umi-setup', async () => {
  const result = await client.callTool({
    name: 'umi-setup',
    arguments: {},
  });

  expect(result).toBeDefined();
});

test('umi-deadcode', async () => {
  const result = await client.callTool({
    name: 'umi-deadcode',
    arguments: {},
  });

  expect(result).toBeDefined();
});

test('umi-lint', async () => {
  const resultWithoutFix = await client.callTool({
    name: 'umi-lint',
    arguments: {
      fix: false,
    },
  });

  expect(resultWithoutFix).toBeDefined();

  const resultWithFix = await client.callTool({
    name: 'umi-lint',
    arguments: {
      fix: true,
    },
  });

  expect(resultWithFix).toBeDefined();
});

test('umi-build', async () => {
  const result = await client.callTool({
    name: 'umi-build',
    arguments: {
      ANALYZE: 1,
    },
  });

  expect(result).toBeDefined();
});

test('umi-generate-page', async () => {
  const result = await client.callTool({
    name: 'umi-generate-page',
    arguments: {
      name: 'test-page',
    },
  });

  expect(result).toBeDefined();
});

test('umi-generate-component', async () => {
  const result = await client.callTool({
    name: 'umi-generate-component',
    arguments: {
      name: 'TestComponent',
    },
  });

  expect(result).toBeDefined();
});

test('umi-generate-api', async () => {
  const result = await client.callTool({
    name: 'umi-generate-api',
    arguments: {
      name: 'test-api',
    },
  });

  expect(result).toBeDefined();
});

test('umi-generate-mock', async () => {
  const result = await client.callTool({
    name: 'umi-generate-mock',
    arguments: {
      name: 'test-mock',
    },
  });

  expect(result).toBeDefined();
});

test('umi-generate-others', async () => {
  const result = await client.callTool({
    name: 'umi-generate-others',
    arguments: {
      type: 'prettier',
    },
  });

  expect(result).toBeDefined();
});
