import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

export const umiDeadcode = async ({
  server,
  root,
  frameworkName,
}: ToolContext) => {
  server.addTool({
    name: `${frameworkName}-deadcode`,
    description: `Find the dead code of the ${frameworkName} project`,
    parameters: z.object({}),
    execute: async (): Promise<any> => {
      try {
        const { binPath } = parse(root);
        const result = execSync(`${binPath} deadcode`, { cwd: root });
        return {
          type: 'text',
          text: result.toString()
        };
      } catch (error: any) {
        return {
          type: 'text',
          text: error.message || 'Failed to run deadcode check'
        };
      }
    },
  });
};
