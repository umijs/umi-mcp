import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

type GeneratorOptions = {
  name: string;
  type: string;
  args?: Record<string, any>;
};

// 生成命令的工具函数
const buildCommand = (
  binPath: string,
  { type, name, args = {} }: GeneratorOptions,
): string => {
  let command = `${binPath} g ${type} ${name}`;

  Object.entries(args).forEach(([key, value]) => {
    if (value === undefined) return;
    if (typeof value === 'boolean' && value) {
      command += ` --${key}`;
    } else if (typeof value === 'string' || typeof value === 'number') {
      command += ` --${key} ${typeof value === 'string' ? `"${value}"` : value}`;
    }
  });

  return command;
};

const executeGenerator = (command: string): string => {
  const result = execSync(command);
  return result.toString();
};

export const umiGenerate = async ({ server, root }: ToolContext) => {
  const { binPath } = parse(root);

  // 页面生成器
  server.addTool({
    name: 'umi-generate-page',
    description: 'Generate a page for the umi project',
    parameters: z.object({
      name: z.string().describe('Page name to generate'),
      dir: z
        .boolean()
        .optional()
        .default(false)
        .describe('Generate as directory structure'),
    }),
    execute: async (params) => {
      const command = buildCommand(binPath, {
        type: 'page',
        name: params.name,
        args: params,
      });
      return executeGenerator(command);
    },
  });

  // 组件生成器
  server.addTool({
    name: 'umi-generate-component',
    description: 'Generate a component for the umi project',
    parameters: z.object({
      name: z.string().describe('Component name to generate'),
    }),
    execute: async (params) => {
      const command = buildCommand(binPath, {
        type: 'component',
        name: params.name,
        args: params,
      });
      return executeGenerator(command);
    },
  });

  // RouteAPI 生成器
  server.addTool({
    name: 'umi-generate-api',
    description: 'Generate a route API for the umi project',
    parameters: z.object({
      name: z.string().describe('API route name to generate'),
    }),
    execute: async (params) => {
      const command = buildCommand(binPath, {
        type: 'api',
        name: params.name,
      });
      return executeGenerator(command);
    },
  });

  // Mock 生成器
  server.addTool({
    name: 'umi-generate-mock',
    description: 'Generate a mock file for the umi project',
    parameters: z.object({
      name: z.string().describe('Mock file name to generate'),
    }),
    execute: async (params) => {
      const command = buildCommand(binPath, {
        type: 'mock',
        name: params.name,
      });
      return executeGenerator(command);
    },
  });

  // Prettier 生成器、Jest 生成器、TailwindCSS 生成器、Dva 生成器、Precommit 生成器
  server.addTool({
    name: 'umi-generate-others',
    description: 'Generate more tools for the umi project',
    parameters: z.object({
      type: z
        .enum(['prettier', 'jest', 'tailwindcss', 'dva', 'precommit'])
        .describe(
          'Configuration type to generate, e.g. prettier, jest, tailwindcss, dva, precommit',
        ),
    }),
    execute: async (params) => {
      return executeGenerator(`${binPath} g ${params.type}`);
    },
  });
};
