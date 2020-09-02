import jsx from '@babel/plugin-syntax-jsx';
import { Visitor, NodePath } from '@babel/traverse';
import * as types from '@babel/types';
import * as astUtil from './utils/ast';
import { transformIf } from './elements/if';
import { transformSwitch } from './elements/switch';

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
      }
    } as Visitor
  };
}
