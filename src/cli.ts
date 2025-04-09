#!/usr/bin/env -S node --no-warnings=ExperimentalWarning
import { FastMCP } from 'fastmcp';
import { createRequire } from 'module';
import path from 'path';
import yParser from 'yargs-parser';
import { registerTools } from '.';
import { parse } from './parse';

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

const { binName } = parse(root);
registerTools({
  server,
  root,
  frameworkName: binName as 'umi' | 'bigfish' | 'max',
});

server.start({
  transportType: 'stdio',
});
