import type { BabelFile } from '@babel/core';

export type State = {
  get: (name: string) => any;
  set: (name: string, value: any) => any;
  opts: CompilerOptions;
  file: BabelFile;
};

export interface CompilerOptions {
  importedLib?: string[] | 'none';
}
