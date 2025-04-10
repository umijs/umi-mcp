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
    execute: async () => {
      const { binPath } = parse(root);
      const result = execSync(`${binPath} config list`, { cwd: root });
      return result.toString();
    },
  });

  server.addTool({
    name: `${frameworkName}-config-get`,
    description: `Get the value of a config of the ${frameworkName} project`,
    parameters: z.object({
      key: z.string(),
    }),
    execute: async ({ key }) => {
      const { binPath } = parse(root);
      const result = execSync(`${binPath} config get ${key}`, { cwd: root });
      return result.toString();
    },
  });

  server.addTool({
    name: `${frameworkName}-config-set`,
    description: `Set the value of a config of the ${frameworkName} project`,
    parameters: z.object({
      key: z.string(),
      value: z.string(),
    }),
    execute: async ({ key, value }) => {
      const { binPath } = parse(root);
      const result = execSync(`${binPath} config set ${key} ${value}`, {
        cwd: root,
      });
      return result.toString();
    },
  });

  server.addTool({
    name: `${frameworkName}-config-remove`,
    description: `Remove a config of the ${frameworkName} project`,
    parameters: z.object({
      key: z.string(),
    }),
    execute: async ({ key }) => {
      const { binPath } = parse(root);
      const result = execSync(`${binPath} config remove ${key}`, {
        cwd: root,
      });
      return result.toString();
    },
  });
};
