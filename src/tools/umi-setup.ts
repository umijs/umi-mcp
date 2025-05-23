import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

export const umiSetup = async ({
  server,
  root,
  frameworkName,
}: ToolContext) => {
  server.addTool({
    name: `${frameworkName}-setup`,
    description: `Setup the ${frameworkName} project and generate tmp files in the .umi directory`,
    parameters: z.object({}),
    execute: async (): Promise<any> => {
      try {
        const { binPath } = parse(root);
        const result = execSync(`${binPath} setup`, { cwd: root });
        return {
          type: 'text',
          text: result.toString()
        };
      } catch (error: any) {
        return {
          type: 'text',
          text: error.message || 'Failed to run setup'
        };
      }
    },
  });
};
