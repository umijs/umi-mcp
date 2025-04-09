import { FastMCP } from 'fastmcp';

export interface ToolContext {
  server: FastMCP;
  root: string;
  frameworkName: 'umi' | 'bigfish' | 'max';
}
