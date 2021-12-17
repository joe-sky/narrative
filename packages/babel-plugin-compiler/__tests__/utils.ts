import { transform } from '@babel/core';
import NtCompiler, { NtCompilerOptions } from '../src';

export interface Test {
  name: string;
  from: string;
}

export const transpile = (source: string, options: NtCompilerOptions = { importedLib: 'none' }) =>
  new Promise((resolve, reject) =>
    transform(
      source,
      {
        filename: '',
        presets: null,
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
