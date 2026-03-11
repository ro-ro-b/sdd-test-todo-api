import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
  },
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        module: 'commonjs',
        moduleResolution: 'node',
        esModuleInterop: true,
        strict: true,
      },
      include: ['src', 'test'],
    },
  },
});
