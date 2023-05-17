import * as types from '@babel/types';
import type {
  JSXElement,
  JSXIdentifier,
  JSXAttribute,
  JSXExpressionContainer,
  react,
  JSXText,
  JSXSpreadChild,
  JSXFragment,
  JSXEmptyExpression
} from '@babel/types';
import type { NodePath } from '@babel/traverse';
import { NT_CONTROL_FLOW } from './';

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
  func: types.ArrowFunctionExpression;
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

/**
 * Test if this is a custom JSX element with the given name.
 *
 * @param node - Current node to test
 * @param tagName - Name of element
 */
export function isTag(node: JSXElement, tagName: string) {
  return getTagName(node) === tagName;
}

/**
 * Get expression from given attribute.
 *
 * @param attribute
 */
export function getExpression(attribute: JSXAttribute) {
  if (types.isJSXExpressionContainer(attribute.value)) {
    return attribute.value.expression as types.Expression;
  } else {
    return attribute.value as types.Expression;
  }
}

/**
 * Get all attributes from given element.
 *
 * @param node - Current node from which attributes are gathered
 * @returns Map of all attributes with their name as key
 */
export function getAttributeMap(node: JSXElement) {
  return node.openingElement.attributes.reduce((result, attr) => {
    if (types.isJSXAttribute(attr)) {
      result[((attr as JSXAttribute).name as JSXIdentifier).name] = attr;
    }
    return result;
  }, {} as Record<string, types.JSXAttribute>);
}

/**
 * Get the string value of a node's key attribute if present.
 *
 * @param node - Node to get attributes from
 * @returns The string value of the key attribute of this node if present, otherwise undefined.
 */
export function getKey(node: JSXElement): string | undefined {
  const key = getAttributeMap(node).key;
  return key ? (key.value as types.StringLiteral).value : undefined;
}

/**
 * Get all children from given element. Normalizes JSXText and JSXExpressionContainer to expressions.
 *
 * @param node - Current node from which children are gathered
 * @returns List of all children
 */
export function getChildren(node: JSXElement) {
  return ((types as any).react.buildChildren as typeof react.buildChildren)(node);
}

/**
 * Adds attribute "key" to given node, if not already preesent.
 *
 * @param node - Current node to which the new attribute is added
 * @param keyValue - Value of the key
 */
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

/**
 * Return either a NullLiteral (if no content is available) or
 * the single expression (if there is only one) or an ArrayExpression.
 *
 * @param blocks - the content blocks
 * @param keyPrefix - a prefix to use when automatically generating keys
 */
export function getSanitizedExpressionForContent(blocks: JSXChild[], keyPrefix?: string, callFunc?: boolean) {
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
