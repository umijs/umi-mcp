import assert from 'assert';
import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { z } from 'zod';
import { parse } from '../parse';
import { getPaths } from '../path';
import { ToolContext } from '../types';

export const umiRouteList = async ({
  server,
  root,
  frameworkName,
}: ToolContext) => {
  server.addTool({
    name: `${frameworkName}-route-list`,
    description: `List the routes of the ${frameworkName} project.`,
    parameters: z.object({}),
    execute: async (): Promise<any> => {
      try {
        const { absTmpPath } = getPaths(root, frameworkName);

        if (!existsSync(absTmpPath)) {
          const { binPath } = parse(root);
          execSync(`${binPath} setup`, { cwd: root });
        }

        const appDataPath = `${absTmpPath}/appData.json`;
        assert(
          existsSync(appDataPath),
          `${appDataPath} is not exist, please upgrade to the latest version of ${frameworkName}`,
        );
        const appDataJson = JSON.parse(readFileSync(appDataPath, 'utf-8'));
        const routes = appDataJson.defaultConfig?.routes || [];
        return {
          success: true,
          data: {
            type: 'text',
            text: JSON.stringify(routes, null, 2),
          },
        };
      } catch (error: any) {
        return {
          success: false,
          data: error.message || 'Failed to list routes',
        };
      }
    },
  });
};
