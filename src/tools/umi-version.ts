import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

const umiVersion = async ({ server, root }: ToolContext) => {
  server.addTool({
    name: 'umi-version',
    description: 'Get the version of the umi project.',
    parameters: z.object({}),
    execute: async () => {
      const { binPath } = parse(root);
      const result = execSync(`${binPath} version`);
      return result.toString();
    },
  });
};

export default umiVersion;
