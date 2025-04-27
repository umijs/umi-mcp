import { UserError } from 'fastmcp';
import fs from 'fs';
import path from 'path';
import resolve from 'resolve';

export function parse(root: string) {
  if (!fs.existsSync(root)) {
    throw new UserError(`Root directory not found: ${root}`);
  }
  const pkgPath = path.join(root, 'package.json');
  const pkg = fs.existsSync(pkgPath)
    ? JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    : {};
  const deps = Object.keys(pkg.dependencies || {}).concat(
    Object.keys(pkg.devDependencies || {}),
  );
  const isUmi = deps.includes('umi');
  const isMax = deps.includes('@umijs/max');
  const isBigfish = deps.includes('@alipay/bigfish');
  if (!isUmi && !isMax && !isBigfish) {
    throw new UserError(
      `It is not a umi or @umijs/max or @alipay/bigfish project: ${root}`,
    );
  }
  const getBinPath = () => {
    try {
      if (isUmi) {
        return resolve.sync('umi/bin/umi.js', { basedir: root });
      }
      if (isMax) {
        return resolve.sync('@umijs/max/bin/max.js', { basedir: root });
      }
      return resolve.sync('@alipay/bigfish/bin/bigfish.js', { basedir: root });
    } catch (e) {
      const binDir = path.join(root, 'node_modules', '.bin');
      if (fs.existsSync(binDir)) {
        if (isUmi && fs.existsSync(path.join(binDir, 'umi'))) {
          return path.join(binDir, 'umi');
        }
        if (isMax && fs.existsSync(path.join(binDir, 'max'))) {
          return path.join(binDir, 'max');
        }
        if (fs.existsSync(path.join(binDir, 'bigfish'))) {
          return path.join(binDir, 'bigfish');
        }
      }
      throw new UserError(`Failed to resolve bin path: ${e}`);
    }
  };
  const binPath = getBinPath();
  const binName = (() => {
    if (isUmi) {
      return 'umi';
    }
    if (isMax) {
      return 'max';
    }
    return 'bigfish';
  })();
  return {
    isUmi,
    isMax,
    isBigfish,
    binPath,
    binName,
  };
}
