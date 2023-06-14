import * as types from '@babel/types';
import type {
  JSXElement,
  JSXIdentifier,
  JSXAttribute,
  JSXExpressionContainer,
  JSXText,
  JSXSpreadChild,
  JSXFragment,
  JSXEmptyExpression
} from '@babel/types';
import type { NodePath } from '@babel/traverse';
import { NT_CONTROL_FLOW } from './common';

export type JSXChild =
  | JSXText
  | JSXExpressionContainer
  | JSXSpreadChild
  | JSXElement
  | JSXFragment
  | JSXEmptyExpression
  | types.Expression;

export interface Attrs {
  condition: types.Expression;
  children: types.Expression;
}

export interface ForAttrs {
  source: types.Expression;
  callback: types.ArrowFunctionExpression;
  empty?: types.Expression;
}

export type FuncParam = types.Identifier | types.Pattern | types.RestElement;

export function isImportedByLib(
  identifier: string,
  path: NodePath<JSXElement>,
  libName: string | string[] = [NT_CONTROL_FLOW]
) {
  if (!Array.isArray(libName)) {
    libName = [libName];
    libName.push(NT_CONTROL_FLOW);
  }

  const bindingPath = path.scope?.getBinding(identifier)?.path;
  if (types.isImportDeclaration(bindingPath?.parent)) {
    const value = bindingPath?.parent.source.value;
    return value && libName.includes(value);
  }
}

export function getTagName(node: JSXElement) {
  return (node.openingElement.name as JSXIdentifier).name;
}

export function isTag(node: JSXElement, tagName: string) {
  return getTagName(node) === tagName;
}

export function getExpression(attribute: JSXAttribute) {
  if (types.isJSXExpressionContainer(attribute.value)) {
    return attribute.value.expression as types.Expression;
  } else {
    return attribute.value as types.Expression;
  }
}

export function getAttributeMap(node: JSXElement) {
  return node.openingElement.attributes.reduce((result, attr) => {
    if (types.isJSXAttribute(attr)) {
      result[((attr as JSXAttribute).name as JSXIdentifier).name] = attr;
    }
    return result;
  }, {} as Record<string, types.JSXAttribute>);
}

export function getKey(node: JSXElement): string | undefined {
  const key = getAttributeMap(node).key;
  return key ? (key.value as types.StringLiteral).value : undefined;
}

export function getChildren(node: JSXElement) {
  return types.react.buildChildren(node);
}

export function addKeyAttribute(node: JSXElement, keyValue: string | number) {
  let keyFound = false;

  node.openingElement.attributes.forEach(attrib => {
    if (types.isJSXAttribute(attrib) && attrib.name.name === 'key') {
      keyFound = true;
      return false;
    }
  });

  if (!keyFound) {
    const keyAttrib = types.jsxAttribute(types.jsxIdentifier('key'), types.stringLiteral('' + keyValue));
    node.openingElement.attributes.push(keyAttrib);
  }
}

export function convertChildrenToExpression(blocks: JSXChild[], keyPrefix?: string, callFunc?: boolean) {
  if (!blocks.length) {
    return types.nullLiteral();
  } else if (blocks.length === 1) {
    const firstBlock = blocks[0];

    if (keyPrefix && types.isJSXElement(firstBlock) && firstBlock.openingElement) {
      addKeyAttribute(firstBlock, keyPrefix);
    }

    if (callFunc && types.isArrowFunctionExpression(firstBlock)) {
      return types.callExpression(firstBlock, []);
    }

    return firstBlock as types.Expression;
  }

  for (let i = 0; i < blocks.length; i++) {
    const thisBlock = blocks[i];
    if (types.isJSXElement(thisBlock)) {
      const key = keyPrefix ? keyPrefix + '-' + i : i;
      addKeyAttribute(thisBlock, key);
    }
  }

  return types.arrayExpression(blocks as types.Expression[]);
}

export function findPropByName(obj: types.ObjectPattern, name: string) {
  return obj.properties.find(
    prop => types.isObjectProperty(prop) && types.isIdentifier(prop.key) && prop.key.name === name
  ) as types.ObjectProperty;
}

export function noopArrowFunctionExpression() {
  return types.arrowFunctionExpression([], types.blockStatement([]));
}
