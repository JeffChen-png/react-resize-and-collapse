import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';

const isDev = process.env.ROLLUP_WATCH;

const commonPlugins = [
  resolve({
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    dedupe: ['react', 'react-dom'],
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  commonjs(),
  postcss({
    modules: true,
    extract: false,
    sourceMap: true,
    minimize: true,
  }),
  typescript({
    tsconfig: './tsconfig.json',
  }),
];

// Конфигурация для разработки
const devConfig = {
  input: 'src/Example.tsx',
  output: {
    file: 'public/bundle.js',
    format: 'iife',
  },
  plugins: commonPlugins.concat([
    serve({
      open: true,
      contentBase: ['public'],
      host: 'localhost',
      port: 3001,
    }),
    livereload(['public', 'src']),
  ]),
  external: [],
};

// Конфигурация для production сборки
const prodConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: commonPlugins.concat([peerDepsExternal(), terser()]),
};

export default isDev ? devConfig : prodConfig;
