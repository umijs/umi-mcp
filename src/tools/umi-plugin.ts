import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

export const umiPlugin = async ({
  server,
  root,
  frameworkName,
}: ToolContext) => {
  server.addTool({
    name: `${frameworkName}-plugin-list`,
    description: `List all plugins of the ${frameworkName} project`,
    parameters: z.object({}),
    execute: async (): Promise<any> => {
      try {
        const { binPath } = parse(root);
        const result = execSync(`${binPath} plugin list`, { cwd: root });
        return {
          type: 'text',
          text: result.toString()
        };
      } catch (error: any) {
        return {
          type: 'text',
          text: error.message || 'Failed to list plugins'
        };
      }
    },
  });
};
