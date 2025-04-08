import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

export const umiBuild = async ({ server, root }: ToolContext) => {
  const BuildParams = z.object({
    ANALYZE: z
      .union([z.literal(1), z.literal(0)])
      .optional()
      .describe('用于分析 bundle 构成，默认关闭。'),
    ANALYZE_PORT: z.number().optional().describe('自定义端口'),
    BABEL_POLYFILL: z
      .enum(['none'])
      .optional()
      .describe('值为 none 禁用内置的补丁方案'),
    COMPRESS: z.enum(['none']).optional().describe('值为 none 时不压缩'),
    FS_LOGGER: z
      .enum(['none'])
      .optional()
      .describe('值为 none 时不保存物理日志'),
    SPEED_MEASURE: z
      .union([z.literal('CONSOLE'), z.literal('JSON')])
      .optional()
      .describe('分析 Webpack 编译时间'),
  });

  server.addTool({
    name: 'umi-build',
    description: 'Build the umi project.',
    parameters: BuildParams,
    execute: async (params) => {
      const { binPath } = parse(root);
      const env = { ...process.env };
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          env[key] = typeof value === 'number' ? value.toString() : value;
        }
      });

      const result = execSync(`${binPath} build`, { env });
      return result.toString();
    },
  });
};
