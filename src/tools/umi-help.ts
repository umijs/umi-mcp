import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

export const umiHelp = async ({ server, root, frameworkName }: ToolContext) => {
  server.addTool({
    name: `${frameworkName}-help`,
    description: `Get help description for ${frameworkName}`,
    parameters: z.object({}),
    execute: async (): Promise<any> => {
      try {
        const { binPath } = parse(root);
        const result = execSync(`${binPath} help`, { cwd: root });
        return {
          type: 'text',
          text: result.toString(),
        };
      } catch (error: any) {
        console.error(`error: ${error}`);
        return { type: 'text', text: error.message || 'Failed to get help' };
      }
    },
  });
};
