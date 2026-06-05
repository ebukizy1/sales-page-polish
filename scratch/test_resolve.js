import fs from 'fs';
import path from 'path';

// Create a mock package
const pkgDir = path.resolve('./scratch/mock-pkg');
fs.mkdirSync(path.join(pkgDir, 'node_modules', 'mock-dep'), { recursive: true });

// package.json for mock-dep
fs.writeFileSync(
  path.join(pkgDir, 'node_modules', 'mock-dep', 'package.json'),
  JSON.stringify({
    name: 'mock-dep',
    version: '1.0.0',
    type: 'module',
    exports: {
      '.': {
        import: './missing-file.js',
        default: './missing-file.js'
      }
    }
  }, null, 2)
);

// package.json for the root of the test
fs.writeFileSync(
  path.join(pkgDir, 'package.json'),
  JSON.stringify({ type: 'module' }, null, 2)
);

// Test script
fs.writeFileSync(
  path.join(pkgDir, 'test.js'),
  `import 'mock-dep';`
);

console.log('Mock pkg created, executing test...');
