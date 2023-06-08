import jsx from '@babel/plugin-syntax-jsx';
import type { Visitor } from '@babel/traverse';
import * as types from '@babel/types';
import * as astUtil from './utils/ast';
import { IF, SWITCH, FOR } from './utils/common';
import { transformIf } from './tags/if';
import { transformSwitch } from './tags/switch';
import { transformFor } from './tags/for';
import { State, CompilerOptions } from './options';

export { CompilerOptions };

const nodeTransforms = {
  [IF]: transformIf,
  [SWITCH]: transformSwitch,
  [FOR]: transformFor
};

export default function NtCompiler() {
  return {
    inherits: jsx,
    name: '@narrative/babel-plugin-compiler',
    visitor: {
      JSXElement: {
        enter(path, state: State) {
          const elName = path.node.openingElement.name;
          if (!types.isJSXIdentifier(elName)) {
            return;
          }

          const nodeName = elName.name;
          const importedLib = state.opts?.importedLib;
          if (importedLib !== 'none' && !astUtil.isImportedByLib(nodeName, path, importedLib)) {
            return;
          }

          const transform = nodeTransforms[nodeName as keyof typeof nodeTransforms];
          if (transform != null) {
            const compiledAst = transform(path.node, path, state.file);
            compiledAst && path.replaceWith(compiledAst);
          }
        }
      },
      Program(_path, state: State) {
        _path.traverse({
          JSXElement: {
            enter(path) {
              if (!(types.isJSXElement(path.parent) || types.isJSXFragment(path.parent))) {
                return;
              }

              const elName = path.node.openingElement.name;
              if (!types.isJSXIdentifier(elName)) {
                return;
              }

              const nodeName = elName.name;
              const importedLib = state.opts?.importedLib;
              if (importedLib !== 'none' && !astUtil.isImportedByLib(nodeName, path, importedLib)) {
                return;
              }

              const transform = nodeTransforms[nodeName as keyof typeof nodeTransforms];
              if (transform != null) {
                path.replaceWith(types.jsxExpressionContainer(path.node));
              }
            }
          }
        });
      }
    } as Visitor
  };
}
