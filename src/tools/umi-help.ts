import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

export const umiHelp = async ({ server, root }: ToolContext) => {
  server.addTool({
    name: 'umi-help',
    description: 'Get help description for umi',
    parameters: z.object({}),
    execute: async () => {
      const { binPath } = parse(root);
      const result = execSync(`${binPath} help`, { cwd: root });
      return result.toString();
    },
  });
};
