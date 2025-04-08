import { execSync } from 'child_process';
import { FastMCP } from 'fastmcp';
import { Mock, beforeEach, expect, test, vi } from 'vitest';
import { parse } from '../../parse';
import { umiBuild } from '../umi-build';

vi.mock('child_process');
vi.mock('../../parse');

const mockBinPath = '/mock/bin/umi';
const createMockServer = () =>
  ({
    addTool: vi.fn(),
  }) as unknown as FastMCP;

beforeEach(() => {
  vi.mocked(parse).mockReturnValue({
    isUmi: true,
    isMax: false,
    isBigfish: false,
    binPath: mockBinPath,
    binName: 'umi',
  });
});

test('Register umi-build tool with correct configuration', async () => {
  const mockServer = createMockServer();
  await umiBuild({ server: mockServer, root: '/mock/root' });

  expect(mockServer.addTool).toHaveBeenCalledTimes(1);
  const toolConfig = (mockServer.addTool as Mock).mock.calls[0][0];

  expect(toolConfig.name).toBe('umi-build');
});

test('Build the umi project without parameters', async () => {
  const mockServer = createMockServer();
  const mockOutput = 'build completed successfully';
  vi.mocked(execSync).mockReturnValue(Buffer.from(mockOutput));

  await umiBuild({ server: mockServer, root: '/mock/root' });

  const toolConfig = (mockServer.addTool as Mock).mock.calls[0][0];
  const result = await toolConfig.execute({});

  expect(execSync).toHaveBeenCalledWith(`${mockBinPath} build`, {
    env: expect.objectContaining({ ...process.env }),
  });
  expect(result).toBe(mockOutput);
});

test('Build with ANALYZE parameter', async () => {
  const mockServer = createMockServer();
  const mockOutput = 'build with analyze completed';
  vi.mocked(execSync).mockReturnValue(Buffer.from(mockOutput));

  await umiBuild({ server: mockServer, root: '/mock/root' });

  const toolConfig = (mockServer.addTool as Mock).mock.calls[0][0];
  const result = await toolConfig.execute({ ANALYZE: 1 });

  expect(execSync).toHaveBeenCalledWith(`${mockBinPath} build`, {
    env: expect.objectContaining({
      ...process.env,
      ANALYZE: '1',
    }),
  });
  expect(result).toBe(mockOutput);
});

test('Build with multiple parameters', async () => {
  const mockServer = createMockServer();
  const mockOutput = 'build with multiple params completed';
  vi.mocked(execSync).mockReturnValue(Buffer.from(mockOutput));

  await umiBuild({ server: mockServer, root: '/mock/root' });

  const toolConfig = (mockServer.addTool as Mock).mock.calls[0][0];
  const result = await toolConfig.execute({
    ANALYZE: 1,
    ANALYZE_PORT: 8888,
    COMPRESS: 'none',
    SPEED_MEASURE: 'CONSOLE',
  });

  expect(execSync).toHaveBeenCalledWith(`${mockBinPath} build`, {
    env: expect.objectContaining({
      ...process.env,
      ANALYZE: '1',
      ANALYZE_PORT: '8888',
      COMPRESS: 'none',
      SPEED_MEASURE: 'CONSOLE',
    }),
  });
  expect(result).toBe(mockOutput);
});
