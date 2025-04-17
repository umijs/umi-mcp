import { execSync } from 'child_process';
import { z } from 'zod';
import { parse } from '../parse';
import { ToolContext } from '../types';

export const umiConfig = async ({
  server,
  root,
  frameworkName,
}: ToolContext) => {
  server.addTool({
    name: `${frameworkName}-config-list`,
    description: `List all available ${frameworkName} config`,
    parameters: z.object({}),
    execute: async (): Promise<any> => {
      try {
        const { binPath } = parse(root);
        const result = execSync(`${binPath} config list`, { cwd: root });
        return { success: true, data: result.toString() };
      } catch (error: any) {
        return { success: false, data: error.message || 'Failed to list config' };
      }
    },
  });

  server.addTool({
    name: `${frameworkName}-config-get`,
    description: `Get the value of a config of the ${frameworkName} project`,
    parameters: z.object({
      key: z.string(),
    }),
    execute: async ({ key }): Promise<any> => {
      try {
        const { binPath } = parse(root);
        const result = execSync(`${binPath} config get ${key}`, { cwd: root });
        return { success: true, data: result.toString() };
      } catch (error: any) {
        return { success: false, data: error.message || `Failed to get config key ${key}` };
      }
    },
  });

  server.addTool({
    name: `${frameworkName}-config-set`,
    description: `Set the value of a config of the ${frameworkName} project`,
    parameters: z.object({
      key: z.string(),
      value: z.string(),
    }),
    execute: async ({ key, value }): Promise<any> => {
      try {
        const { binPath } = parse(root);
        const result = execSync(`${binPath} config set ${key} ${value}`, {
          cwd: root,
        });
        return { success: true, data: result.toString() };
      } catch (error: any) {
        return { success: false, data: error.message || `Failed to set config key ${key}` };
      }
    },
  });

  server.addTool({
    name: `${frameworkName}-config-remove`,
    description: `Remove a config of the ${frameworkName} project`,
    parameters: z.object({
      key: z.string(),
    }),
    execute: async ({ key }): Promise<any> => {
      try {
        const { binPath } = parse(root);
        const result = execSync(`${binPath} config remove ${key}`, {
          cwd: root,
        });
        return { success: true, data: result.toString() };
      } catch (error: any) {
        return { success: false, data: error.message || `Failed to remove config key ${key}` };
      }
    },
  });
};
