import { execSync } from 'child_process';
import { FastMCP } from 'fastmcp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yParser from 'yargs-parser';
import { z } from 'zod';
import { parse } from './parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_NAME = 'Umi MCP Server';
const version = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'),
).version;

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
  version,
});

server.addTool({
  name: 'umi-help',
  description: 'Get help description for umi',
  parameters: z.object({}),
  execute: async () => {
    const { binPath } = parse(root);
    const result = execSync(`${binPath} help`);
    return result.toString();
  },
});

server.start({
  transportType: 'stdio',
});
