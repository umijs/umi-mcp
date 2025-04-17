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
        return { success: true, data: result.toString() };
      } catch (error: any) {
        return { success: false, data: error.message || 'Failed to get help' };
      }
    },
  });
};
