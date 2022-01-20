import jsx from '@babel/plugin-syntax-jsx';
import { Visitor, NodePath } from '@babel/traverse';
import * as types from '@babel/types';
import * as astUtil from './utils/ast';
import { transformIf, SUB_TAGS_IF } from './tags/if';
import { transformSwitch, SUB_TAGS_SWITCH } from './tags/switch';
import { transformFor, SUB_TAGS_FOR } from './tags/for';
import { State, CompilerOptions } from './utils';

export { CompilerOptions };

const nodeTransforms = {
  If: transformIf,
  Switch: transformSwitch,
  For: transformFor
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
          const { importedLib } = state?.opts;
          if (importedLib !== 'none' && !astUtil.isImportedByLib(nodeName, path, importedLib)) {
            return;
          }

          const transform = nodeTransforms[nodeName as keyof typeof nodeTransforms];
          if (transform) {
            path.replaceWith(transform(path.node));
          }
        }
      },
      Program(_path, state: State) {
        _path.traverse({
          JSXElement: {
            enter(path) {
              if (!types.isJSXElement(path.parent)) {
                return;
              }

              const elName = path.node.openingElement.name;
              if (!types.isJSXIdentifier(elName)) {
                return;
              }

              const nodeName = elName.name;
              if (
                !astUtil.isImportedByLib(nodeName, path, state?.opts.importedLib) ||
                SUB_TAGS_IF[nodeName as keyof typeof SUB_TAGS_IF] ||
                SUB_TAGS_SWITCH[nodeName as keyof typeof SUB_TAGS_SWITCH] ||
                SUB_TAGS_FOR[nodeName as keyof typeof SUB_TAGS_FOR]
              ) {
                return;
              }

              path.replaceWith(types.jsxExpressionContainer(path.node));
            }
          }
        });
      }
    } as Visitor
  };
}
