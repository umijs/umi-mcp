import { umiAppdataList } from './tools/umi-appdata-list';
import { umiBuild } from './tools/umi-build';
import { umiChangelog } from './tools/umi-changelog';
import { umiConfig } from './tools/umi-config';
import { umiGenerate } from './tools/umi-generate';
import { umiHelp } from './tools/umi-help';
import { umiLint } from './tools/umi-lint';
import { umiPlugin } from './tools/umi-plugin';
import { umiRouteList } from './tools/umi-route-list';
import { umiSetup } from './tools/umi-setup';
import { umiVersion } from './tools/umi-version';
import { ToolContext } from './types';

export type { ToolContext };

export function registerTools(toolContext: ToolContext) {
  umiHelp(toolContext);
  umiConfig(toolContext);
  umiBuild(toolContext);
  umiVersion(toolContext);
  umiSetup(toolContext);
  umiPlugin(toolContext);
  umiGenerate(toolContext);
  umiLint(toolContext);
  umiRouteList(toolContext);
  umiAppdataList(toolContext);
}
