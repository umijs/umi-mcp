import { z } from 'zod';
import { ToolContext } from '../types';

export const umiChangelog = async ({ server }: ToolContext) => {
  server.addTool({
    name: 'umi-changelog',
    description: 'Show the changelog of the  umi and @umijs/max.',
    parameters: z.object({
      version: z
        .string()
        .describe('Get the changelog for the current version,eg: 4.4.6'),
    }),
    execute: async ({ version }) => {
      try {
        const result = await fetch(
          `https://api.github.com/repos/umijs/umi/releases/tags/v${version}`,
        );
        if (!result.ok) {
          throw new Error(`Failed to fetch changelog: ${result.statusText}`);
        }
        const { body } = await result.json();
        return { success: true, data: body };
      } catch (error: any) {
        return {
          success: false,
          data: error.message || 'Failed to fetch changelog',
        };
      }
    },
  });
};
