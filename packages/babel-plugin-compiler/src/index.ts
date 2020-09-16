import jsx from '@babel/plugin-syntax-jsx';
import traverse, { Visitor, NodePath } from '@babel/traverse';
import * as types from '@babel/types';
import * as astUtil from './utils/ast';
import { transformIf, SUB_ELEMENTS_IF } from './elements/if';
import { transformSwitch, SUB_ELEMENTS_SWITCH } from './elements/switch';

const nodeTransforms = {
  If: transformIf,
  Switch: transformSwitch
};

interface State {
  opts?: {
    importedLib?: string[];
  };
}

export default function NtCompiler() {
  return {
    inherits: jsx,
    visitor: {
      JSXElement: {
        enter(path, state: State) {
          const elName = path.node.openingElement.name;
          if (!types.isJSXIdentifier(elName)) {
            return;
          }

          const nodeName = elName.name;
          if (!astUtil.isImportedByLib(nodeName, path, state?.opts?.importedLib)) {
            return;
          }

          const transform = nodeTransforms[nodeName];
          if (transform) {
            path.replaceWith(transform(path.node));
          }
        }
      },
      Program(path, state: State) {
        traverse(path.node, {
          JSXElement: {
            enter(_path) {
              if (!types.isJSXElement(_path.parent)) {
                return;
              }

              const elName = _path.node.openingElement.name;
              if (!types.isJSXIdentifier(elName)) {
                return;
              }

              const nodeName = elName.name;
              if (
                !astUtil.isImportedByLib(nodeName, _path, state?.opts?.importedLib) ||
                SUB_ELEMENTS_IF[nodeName] ||
                SUB_ELEMENTS_SWITCH[nodeName]
              ) {
                return;
              }

              _path.replaceWith(types.jsxExpressionContainer(_path.node));
            }
          }
        });
      }
    } as Visitor
  };
}
