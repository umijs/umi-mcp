import { execSync } from 'child_process';
import { FastMCP } from 'fastmcp';
import { Mock, expect, test, vi } from 'vitest';
import { parse } from '../../parse';
import { umiDeadcode } from '../umi-deadcode';

vi.mock('child_process');
vi.mock('../../parse');

const mockBinPath = '/mock/bin/umi';

test('umi-deadcode registration and execution', async () => {
  const mockServer = {
    addTool: vi.fn(),
  } as unknown as FastMCP;

  const mockOutput = 'Check dead code end';

  vi.mocked(parse).mockReturnValue({
    isUmi: true,
    isMax: false,
    isBigfish: false,
    binPath: mockBinPath,
    binName: 'umi',
  });
  vi.mocked(execSync).mockReturnValue(Buffer.from(mockOutput));

  await umiDeadcode({ server: mockServer, root: '/mock/root' });

  const toolConfig = (mockServer.addTool as Mock).mock.calls[0][0];
  const result = await toolConfig.execute();

  expect(execSync).toHaveBeenCalledWith(`${mockBinPath} deadcode`);
  expect(result).toBe(mockOutput);
});
