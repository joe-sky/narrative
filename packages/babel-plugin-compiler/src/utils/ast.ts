import * as types from '@babel/types';
import { JSXElement, JSXIdentifier, JSXAttribute, JSXExpressionContainer, Node } from '@babel/types';
import { NodePath } from '@babel/traverse';

const NT_CONTROL_STATEMENT = '@narrative/control-statement';

export function isImportedByLib(
  identifier: string,
  path: NodePath<JSXElement>,
  libName: string | string[] = [NT_CONTROL_STATEMENT]
) {
  if (!Array.isArray(libName)) {
    libName = [libName];
    libName.push(NT_CONTROL_STATEMENT);
  }

  const bindingPath = path.scope.getBinding(identifier)?.path;
  if (types.isImportDeclaration(bindingPath?.parent)) {
    return libName.includes(bindingPath.parent.source.value);
  }
}

function getTagName(node: Node) {
  return ((node as JSXElement).openingElement.name as JSXIdentifier).name;
}

/**
 * Test if this is a custom JSX element with the given name.
 *
 * @param {object} node - Current node to test
 * @param {string} tagName - Name of element
 */
export function isTag(node: Node, tagName: string) {
  return types.isJSXElement(node) && getTagName(node) === tagName;
}

/**
 * Get expression from given attribute.
 *
 * @param {JSXAttribute} attribute
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
 * @param {JSXElement} node - Current node from which attributes are gathered
 * @returns {object} Map of all attributes with their name as key
 */
export function getAttributeMap(node: Node): Record<string, any> {
  return (node as JSXElement).openingElement.attributes.reduce(function(result, attr: JSXAttribute) {
    result[(attr.name as JSXIdentifier).name] = attr;
    return result;
  }, {});
}

/**
 * Get the string value of a node's key attribute if present.
 *
 * @param {JSXElement} node - Node to get attributes from
 * @returns {string} The string value of the key attribute of this node if present, otherwise undefined.
 */
export function getKey(node: Node): string {
  const key = getAttributeMap(node).key;
  return key ? key.value.value : undefined;
}

/**
 * Get all children from given element. Normalizes JSXText and JSXExpressionContainer to expressions.
 *
 * @param {JSXElement} node - Current node from which children are gathered
 * @returns {array} List of all children
 */
export function getChildren(node: JSXElement): any {
  return (types as any).react.buildChildren(node);
}

/**
 * Adds attribute "key" to given node, if not already preesent.
 *
 * @param {JSXElement} node - Current node to which the new attribute is added
 * @param {string} keyValue - Value of the key
 */
export function addKeyAttribute(node: JSXElement, keyValue: string | number) {
  let keyFound = false;

  node.openingElement.attributes.forEach(function(attrib) {
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
 * @returns {NullLiteral|Expression|ArrayExpression}
 */
export function getSanitizedExpressionForContent(blocks: any[], keyPrefix?: string, callFunc?: boolean) {
  if (!blocks.length) {
    return types.nullLiteral();
  } else if (blocks.length === 1) {
    const firstBlock = blocks[0];

    if (keyPrefix && firstBlock.openingElement) {
      addKeyAttribute(firstBlock, keyPrefix);
    }

    if (callFunc && types.isArrowFunctionExpression(firstBlock)) {
      return types.callExpression(firstBlock, []);
    }

    return firstBlock;
  }

  for (let i = 0; i < blocks.length; i++) {
    const thisBlock = blocks[i];
    if (types.isJSXElement(thisBlock)) {
      const key = keyPrefix ? keyPrefix + '-' + i : i;
      addKeyAttribute(thisBlock, key);
    }
  }

  return types.arrayExpression(blocks);
}
