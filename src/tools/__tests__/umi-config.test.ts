import { execSync } from 'child_process';
import { FastMCP } from 'fastmcp';
import { Mock, beforeEach, expect, test, vi } from 'vitest';
import { parse } from '../../parse';
import { umiConfig } from '../umi-config';

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

test('List all available umi config', async () => {
  const mockServer = createMockServer();
  const mockOutput = 'config list output';
  vi.mocked(execSync).mockReturnValue(Buffer.from(mockOutput));

  await umiConfig({ server: mockServer, root: '/mock/root' });

  const toolConfig = (mockServer.addTool as Mock).mock.calls[0][0];
  const result = await toolConfig.execute();

  expect(execSync).toHaveBeenCalledWith(`${mockBinPath} config list`);
  expect(result).toBe(mockOutput);
});

test('Get the value of a config of the umi project', async () => {
  const mockServer = createMockServer();
  const mockOutput = 'config value';
  vi.mocked(execSync).mockReturnValue(Buffer.from(mockOutput));

  await umiConfig({ server: mockServer, root: '/mock/root' });

  const toolConfig = (mockServer.addTool as Mock).mock.calls[1][0];
  const result = await toolConfig.execute({ key: 'testKey' });

  expect(execSync).toHaveBeenCalledWith(`${mockBinPath} config get testKey`);
  expect(result).toBe(mockOutput);
});

test('Set the value of a config of the umi project', async () => {
  const mockServer = createMockServer();
  const mockOutput = 'config set successfully';
  vi.mocked(execSync).mockReturnValue(Buffer.from(mockOutput));

  await umiConfig({ server: mockServer, root: '/mock/root' });

  const toolConfig = (mockServer.addTool as Mock).mock.calls[2][0];
  const result = await toolConfig.execute({
    key: 'testKey',
    value: 'testValue',
  });

  expect(execSync).toHaveBeenCalledWith(
    `${mockBinPath} config set testKey testValue`,
  );
  expect(result).toBe(mockOutput);
});

test('Remove a config of the umi project', async () => {
  const mockServer = createMockServer();
  const mockOutput = 'config removed successfully';
  vi.mocked(execSync).mockReturnValue(Buffer.from(mockOutput));

  await umiConfig({ server: mockServer, root: '/mock/root' });

  const toolConfig = (mockServer.addTool as Mock).mock.calls[3][0];
  const result = await toolConfig.execute({ key: 'testKey' });

  expect(execSync).toHaveBeenCalledWith(`${mockBinPath} config remove testKey`);
  expect(result).toBe(mockOutput);
});
