import assert from 'assert';
import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { z } from 'zod';
import { parse } from '../parse';
import { getPaths } from '../path';
import { ToolContext } from '../types';

export const umiAppdataList = async ({
  server,
  root,
  frameworkName,
}: ToolContext) => {
  server.addTool({
    name: `${frameworkName}-appdata-list`,
    description: `List the appData of the ${frameworkName} project.`,
    parameters: z.object({}),
    execute: async () => {
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
      return {
        type: 'text',
        text: JSON.stringify(appDataJson, null, 2),
      };
    },
  });
};
