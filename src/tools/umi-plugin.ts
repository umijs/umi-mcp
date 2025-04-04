import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

export const umiPlugin = async ({ server, root }: ToolContext) => {
  server.addTool({
    name: 'umi-plugin-list',
    description: 'List all plugins of the umi project',
    parameters: z.object({}),
    execute: async () => {
      const { binPath } = parse(root);
      const result = execSync(`${binPath} plugin list`);
      return result.toString();
    },
  });
};
