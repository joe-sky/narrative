import jsx from '@babel/plugin-syntax-jsx';
import { Visitor, NodePath } from '@babel/traverse';
import * as types from '@babel/types';
import * as astUtil from './utils/ast';
import { transformIf, SUB_TAGS_IF } from './tags/if';
import { transformSwitch, SUB_TAGS_SWITCH } from './tags/switch';

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
                !astUtil.isImportedByLib(nodeName, path, state?.opts?.importedLib) ||
                SUB_TAGS_IF[nodeName as keyof typeof SUB_TAGS_IF] ||
                SUB_TAGS_SWITCH[nodeName as keyof typeof SUB_TAGS_SWITCH]
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
