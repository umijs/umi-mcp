import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

export const umiLint = async ({ server, root }: ToolContext) => {
  server.addTool({
    name: 'umi-lint',
    description: 'Run the linting of the umi project',
    parameters: z.object({
      fix: z.boolean().optional().default(false),
    }),
    execute: async ({ fix }) => {
      const { binPath } = parse(root);
      const command = fix ? `${binPath} lint --fix` : `${binPath} lint`;
      const result = execSync(command);
      return result.toString();
    },
  });
};
