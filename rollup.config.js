import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';

const isDev = !!process.env.ROLLUP_WATCH;

// Static assets will vary depending on the application
const copyConfig = {
  targets: [
    { src: 'node_modules/@webcomponents', dest: 'docs/node_modules' },
    { src: 'img', dest: 'docs' },
    { src: 'data', dest: 'docs' },
    { src: 'public/*', dest: 'docs' },
  ],
};

// The main JavaScript bundle for modern browsers that support
// JavaScript modules and other ES2015+ features.
const config = {
  input: 'src/main.js',
  output: {
    file: 'docs/bundle.js',
    format: 'es',
    sourcemap: isDev
  },
  plugins: [
    minifyHTML(),
    copy(copyConfig),
    resolve(),
    del({ targets: 'docs', runOnce: isDev })
  ],
  preserveEntrySignatures: false,
};

if (!isDev) {
  config.plugins.push(terser());
}

export default config;
