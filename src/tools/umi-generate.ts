import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

type GeneratorOptions = {
  name: string;
  type: string;
  args?: Record<string, any>;
};

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

const executeGenerator = (command: string, cwd: string): string => {
  const result = execSync(command, { cwd });
  return result.toString();
};

export const umiGenerate = async ({
  server,
  root,
  frameworkName,
}: ToolContext) => {
  const { binPath } = parse(root);

  // 页面生成器
  server.addTool({
    name: `${frameworkName}-generate-page`,
    description: `Generate a page for the ${frameworkName} project`,
    parameters: z.object({
      name: z.string().describe('Page name to generate'),
      dir: z
        .boolean()
        .optional()
        .default(false)
        .describe('Generate as directory structure'),
    }),
    execute: async (params): Promise<any> => {
      try {
        const command = buildCommand(binPath, {
          type: 'page',
          name: params.name,
          args: params,
        });
        const result = executeGenerator(command, root);
        return {
          type: 'text',
          text: result
        };
      } catch (error: any) {
        return {
          type: 'text',
          text: error.message || `Failed to generate page ${params.name}`
        };
      }
    },
  });

  // 组件生成器
  server.addTool({
    name: `${frameworkName}-generate-component`,
    description: `Generate a component for the ${frameworkName} project`,
    parameters: z.object({
      name: z.string().describe('Component name to generate'),
    }),
    execute: async (params): Promise<any> => {
      try {
        const command = buildCommand(binPath, {
          type: 'component',
          name: params.name,
          args: params,
        });
        const result = executeGenerator(command, root);
        return {
          type: 'text',
          text: result
        };
      } catch (error: any) {
        return {
          type: 'text',
          text: error.message || `Failed to generate component ${params.name}`
        };
      }
    },
  });

  // RouteAPI 生成器
  server.addTool({
    name: `${frameworkName}-generate-api`,
    description: `Generate a route API for the ${frameworkName} project`,
    parameters: z.object({
      name: z.string().describe('API route name to generate'),
    }),
    execute: async (params): Promise<any> => {
      try {
        const command = buildCommand(binPath, {
          type: 'api',
          name: params.name,
        });
        const result = executeGenerator(command, root);
        return {
          type: 'text',
          text: result
        };
      } catch (error: any) {
        return {
          type: 'text',
          text: error.message || `Failed to generate api ${params.name}`
        };
      }
    },
  });

  // Mock 生成器
  server.addTool({
    name: `${frameworkName}-generate-mock`,
    description: `Generate a mock file for the ${frameworkName} project`,
    parameters: z.object({
      name: z.string().describe('Mock file name to generate'),
    }),
    execute: async (params): Promise<any> => {
      try {
        const command = buildCommand(binPath, {
          type: 'mock',
          name: params.name,
        });
        const result = executeGenerator(command, root);
        return {
          type: 'text',
          text: result
        };
      } catch (error: any) {
        return {
          type: 'text',
          text: error.message || `Failed to generate mock ${params.name}`
        };
      }
    },
  });

  // Prettier 生成器、Jest 生成器、TailwindCSS 生成器、Dva 生成器、Precommit 生成器
  server.addTool({
    name: `${frameworkName}-generate-others`,
    description: `Generate more tools for the ${frameworkName} project`,
    parameters: z.object({
      type: z
        .enum(['prettier', 'jest', 'tailwindcss', 'dva', 'precommit'])
        .describe(
          'Configuration type to generate, e.g. prettier, jest, tailwindcss, dva, precommit',
        ),
    }),
    execute: async (params): Promise<any> => {
      try {
        const result = executeGenerator(`${binPath} g ${params.type}`, root);
        return {
          type: 'text',
          text: result
        };
      } catch (error: any) {
        return {
          type: 'text',
          text: error.message || `Failed to generate ${params.type}`
        };
      }
    },
  });
};
