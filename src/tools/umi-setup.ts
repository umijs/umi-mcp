import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

export const umiSetup = async ({ server, root }: ToolContext) => {
  server.addTool({
    name: 'umi-setup',
    description:
      'Setup the umi project and generate the tmp files in the `.umi` directory',
    parameters: z.object({}),
    execute: async () => {
      const { binPath } = parse(root);
      const result = execSync(`${binPath} setup`, { cwd: root });
      return result.toString();
    },
  });
};
