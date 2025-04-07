import { execSync } from 'child_process';
import { FastMCP } from 'fastmcp';
import { Mock, expect, test, vi } from 'vitest';
import { parse } from '../../parse';
import { umiLint } from '../umi-lint';

vi.mock('child_process');
vi.mock('../../parse');

const mockBinPath = '/mock/bin/umi';

test('umi-lint registration and execution', async () => {
  const mockServer = {
    addTool: vi.fn(),
  } as unknown as FastMCP;

  const mockOutput = 'Lint completed successfully';

  vi.mocked(parse).mockReturnValue({
    isUmi: true,
    isMax: false,
    isBigfish: false,
    binPath: mockBinPath,
    binName: 'umi',
  });
  vi.mocked(execSync).mockReturnValue(Buffer.from(mockOutput));

  await umiLint({ server: mockServer, root: '/mock/root' });

  // 测试不带 fix 参数的执行
  const toolConfig = (mockServer.addTool as Mock).mock.calls[0][0];
  let result = await toolConfig.execute({});
  expect(execSync).toHaveBeenCalledWith(`${mockBinPath} lint`);
  expect(result).toBe(mockOutput);

  // 测试带 fix 参数的执行
  result = await toolConfig.execute({ fix: true });
  expect(execSync).toHaveBeenCalledWith(`${mockBinPath} lint --fix`);
  expect(result).toBe(mockOutput);
});
