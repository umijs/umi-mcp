import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

export const umiBuild = async ({ server, root }: ToolContext) => {
  server.addTool({
    name: 'umi-build',
    description: 'Build the umi project.',
    parameters: z.object({
      ANALYZE: z.number().optional(),
      COMPRESS: z.string().optional(),
    }),
    execute: async () => {
      const { binPath } = parse(root);
      const result = execSync(`${binPath} build`);
      return result.toString();
    },
  });
};
