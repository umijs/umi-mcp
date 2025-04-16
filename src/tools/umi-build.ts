import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

export const umiBuild = async ({
  server,
  root,
  frameworkName,
}: ToolContext) => {
  const BuildParams = z.object({
    ANALYZE: z
      .literal(1)
      .optional()
      .describe('Analyze the bundle composition, disabled by default.'),
    ANALYZE_PORT: z.number().optional().describe('Custom port'),
    BABEL_POLYFILL: z
      .enum(['none'])
      .optional()
      .describe("Value 'none' disables the built-in patching scheme"),
    COMPRESS: z
      .enum(['none'])
      .optional()
      .describe("Value 'none' disables compression"),
    FS_LOGGER: z
      .enum(['none'])
      .optional()
      .describe("Value 'none' disables saving physical logs"),
    SPEED_MEASURE: z
      .union([z.literal('CONSOLE'), z.literal('JSON')])
      .optional()
      .describe('Analyze Webpack compilation time'),
  });

  server.addTool({
    name: `${frameworkName}-build`,
    description: `Build the ${frameworkName} project.`,
    parameters: BuildParams,
    execute: async (params) => {
      try {
        const { binPath } = parse(root);
        const env = { ...process.env };
        for (const [key, value] of Object.entries(params)) {
          if (value !== undefined && (value === 1 || value === 'none')) {
            env[key] = typeof value === 'number' ? value.toString() : value;
          }
        }
        const result = execSync(`${binPath} build`, {
          env,
          cwd: root,
          timeout: 5 * 60000,
        });
        return result.toString();
      } catch (error) {
        throw new Error(
          `Build failed. Please check the error message above.\n${error}`,
        );
      }
    },
  });
};
