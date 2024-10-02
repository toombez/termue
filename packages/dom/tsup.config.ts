import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
    dts: true,
    entry: {
        index: './src/index.ts',
    },
    format: ['cjs', 'esm'],
    clean: !options.watch,
    minify: !options.watch,
}))
