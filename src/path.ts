import { existsSync, statSync } from 'fs';
import { join } from 'path';

export function winPath(path: string) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);
  if (isExtendedLengthPath) {
    return path;
  }
  return path.replace(/\\/g, '/');
}

function winJoin(...args: string[]) {
  return winPath(join(...args));
}

export function getPaths(cwd: string) {
  const src = winJoin(cwd, 'src');
  const absSrcPath = existsSync(src) && statSync(src).isDirectory() ? src : cwd;
  const absTmpPath = winJoin(absSrcPath, '.umi');
  return {
    absSrcPath,
    absTmpPath,
  };
}
