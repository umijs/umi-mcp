
export type ToolContext = {
  server: any;
  root: string;
  frameworkName: string;
};

export function registerTools(toolContext: ToolContext): void;
