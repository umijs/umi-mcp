import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

export const umiConfig = async ({ server, root }: ToolContext) => {
  server.addTool({
    name: 'umi-config-list',
    description: 'List all available umi config',
    parameters: z.object({}),
    execute: async () => {
      const { binPath } = parse(root);
      const result = execSync(`${binPath} config list`);
      return result.toString();
    },
  });

  server.addTool({
    name: 'umi-config-get',
    description: 'Get the value of a config of the umi project',
    parameters: z.object({
      key: z.string(),
    }),
    execute: async ({ key }) => {
      const { binPath } = parse(root);
      const result = execSync(`${binPath} config get ${key}`);
      return result.toString();
    },
  });

  server.addTool({
    name: 'umi-config-set',
    description: 'Set the value of a config of the umi project',
    parameters: z.object({
      key: z.string(),
      value: z.string(),
    }),
    execute: async ({ key, value }) => {
      const { binPath } = parse(root);
      const result = execSync(`${binPath} config set ${key} ${value}`);
      return result.toString();
    },
  });

  server.addTool({
    name: 'umi-config-remove',
    description: 'Remove a config of the umi project',
    parameters: z.object({
      key: z.string(),
    }),
    execute: async ({ key }) => {
      const { binPath } = parse(root);
      const result = execSync(`${binPath} config remove ${key}`);
      return result.toString();
    },
  });
};
