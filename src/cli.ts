import { FastMCP } from 'fastmcp';
import { createRequire } from 'module';
import path from 'path';
import yParser from 'yargs-parser';
import { umiBuild } from './tools/umi-build';
import { umiConfig } from './tools/umi-config';
import { umiDeadcode } from './tools/umi-deadcode';
import { umiGenerate } from './tools/umi-generate';
import { umiHelp } from './tools/umi-help';
import { umiLint } from './tools/umi-lint';
import { umiPlugin } from './tools/umi-plugin';
import { umiSetup } from './tools/umi-setup';
import { umiVersion } from './tools/umi-version';
import { ToolContext } from './types';

const require = createRequire(import.meta.url);
const packageJson = require('../package.json');

const SERVER_NAME = 'Umi MCP Server';

const args = yParser(process.argv.slice(2));
const root = (() => {
  if (!args._[0]) {
    console.error('Please provide a root directory');
    process.exit(1);
  }
  return path.resolve(process.cwd(), args._[0] as string);
})();

const server = new FastMCP({
  name: SERVER_NAME,
  version: packageJson.version,
});

const toolContext: ToolContext = {
  server,
  root,
};
umiHelp(toolContext);
umiConfig(toolContext);
umiBuild(toolContext);
umiVersion(toolContext);
umiSetup(toolContext);
umiPlugin(toolContext);
umiGenerate(toolContext);
umiLint(toolContext);
umiDeadcode(toolContext);

server.start({
  transportType: 'stdio',
});
