import * as BabelCore from '@babel/core';

export const NT_CONTROL_FLOW = '@narrative/control-flow';

export type State = {
  get: (name: string) => any;
  set: (name: string, value: any) => any;
  opts: CompilerOptions;
  file: BabelCore.BabelFile;
};

export interface CompilerOptions {
  importedLib?: string[] | 'none';
}
