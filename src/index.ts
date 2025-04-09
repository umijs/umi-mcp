import { umiBuild } from "./tools/umi-build";
import { umiConfig } from "./tools/umi-config";
import { umiGenerate } from "./tools/umi-generate";
import { umiHelp } from "./tools/umi-help";
import { umiPlugin } from "./tools/umi-plugin";
import { umiSetup } from "./tools/umi-setup";
import { umiVersion } from "./tools/umi-version";
import { ToolContext } from "./types";

export type { ToolContext };

export function registerTools(toolContext: ToolContext) {
  umiHelp(toolContext);
  umiConfig(toolContext);
  umiBuild(toolContext);
  umiVersion(toolContext);
  umiSetup(toolContext);
  umiPlugin(toolContext);
  umiGenerate(toolContext);
}
