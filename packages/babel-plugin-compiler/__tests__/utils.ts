import { transform, ParserOptions } from '@babel/core';
import NtCompiler, { CompilerOptions } from '../src';

export interface Test {
  name: string;
  from: string;
}

const parserPlugins: ParserOptions['plugins'] = [
  'jsx',
  'importMeta',
  // since the plugin now applies before esbuild transforms the code,
  // we need to enable some stage 3 syntax since they are supported in
  // TS and some environments already.
  'topLevelAwait',
  'classProperties',
  'classPrivateProperties',
  'classPrivateMethods',
  'typescript',
  'decorators-legacy'
];

export const transpile = (source: string, options: CompilerOptions = { importedLib: 'none' }) =>
  new Promise((resolve, reject) =>
    transform(
      source,
      {
        filename: '',
        parserOpts: {
          sourceType: 'module',
          allowAwaitOutsideFunction: true,
          plugins: parserPlugins
        },
        plugins: [[NtCompiler, options]],
        configFile: false
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result?.code);
      }
    )
  );
