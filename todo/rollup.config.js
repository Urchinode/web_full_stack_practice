import babel from 'rollup-plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: 'scripts/app.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife', // 즉시 실행 함수 형식
    name: 'bundle'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    terser()
  ]
};