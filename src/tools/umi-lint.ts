import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

export const umiLint = async ({ server, root, frameworkName }: ToolContext) => {
  server.addTool({
    name: `${frameworkName}-lint`,
    description: `Run the linting of the ${frameworkName} project`,
    parameters: z.object({
      fix: z.boolean().optional().describe('Fix lint automatically'),
      eslintOnly: z
        .boolean()
        .optional()
        .describe('Only lint js, ts, tsx, jsx files'),
      stylelintOnly: z
        .boolean()
        .optional()
        .describe('Only lint css, less files'),
      cssinjs: z
        .boolean()
        .optional()
        .describe('Enable cssinjs mode for stylelint'),
    }),
    execute: async (params): Promise<any> => {
      try {
        const { fix, eslintOnly, stylelintOnly, cssinjs } = params;
        const { binPath, isUmi } = parse(root);
        if (isUmi) {
          throw new Error(
            'Please refer to https://umijs.org/en-US/docs/guides/lint for install manually before run umi-lint.',
          );
        }

        const flags = [
          fix ? '--fix' : '',
          eslintOnly ? '--eslint-only' : '',
          stylelintOnly ? '--stylelint-only' : '',
          stylelintOnly && cssinjs ? '--cssinjs' : '',
        ].filter(Boolean);
        const command = `${binPath} lint ${flags.join(' ')}`;
        try {
          const result = execSync(command, { cwd: root });
          return {
            type: 'text',
            text: result.toString(),
          };
        } catch (error: any) {
          if (error.stdout && error.stdout.length > 0) {
            return {
              type: 'text',
              text: error.stdout.toString(),
            };
          }
        }
      } catch (error: any) {
        return {
          type: 'text',
          text: error.message || 'Failed to run lint',
        };
      }
    },
  });
};
