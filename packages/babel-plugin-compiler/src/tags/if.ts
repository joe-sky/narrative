import * as types from '@babel/types';
import type { JSXElement } from '@babel/types';
import type { BabelFile, NodePath } from '@babel/core';
import * as astUtil from '../utils/ast';
import { displayError, SUB_TAGS_IF, ATTRS_IF } from '../utils/common';

export function transformIf(node: JSXElement, path: NodePath, file: BabelFile) {
  const key = astUtil.getKey(node);
  const attrs = astUtil.getAttributeMap(node);
  const whenAttr = attrs?.[ATTRS_IF.WHEN];
  if (!whenAttr) {
    displayError(path, 'Attribute "when" is required for the <If> tag.');
  }

  const children = astUtil.getChildren(node);
  const blocks = parseIf(astUtil.getExpression(whenAttr), children, path, key);
  let ternaryExpression = blocks.else;

  blocks.elseifs?.reverse().forEach(elseifBlock => {
    ternaryExpression = types.conditionalExpression(elseifBlock.condition, elseifBlock.children, ternaryExpression);
  });

  return types.conditionalExpression(blocks.then.condition, blocks.then.children, ternaryExpression);
}

function parseIf(condition: types.Expression, children: astUtil.JSXChild[], path: NodePath, key?: string) {
  let elseFound = false;
  const ret = {
    then: { condition, children: types.nullLiteral() } as astUtil.Attrs,
    elseifs: [] as astUtil.Attrs[],
    else: types.nullLiteral() as types.Expression
  };
  const thenChildren: astUtil.JSXChild[] = [];

  children.forEach((child, index) => {
    if (types.isJSXElement(child) && astUtil.isTag(child, SUB_TAGS_IF.ELSE_IF)) {
      const attrs = astUtil.getAttributeMap(child);
      const whenAttr = attrs?.[ATTRS_IF.WHEN];
      if (!whenAttr) {
        displayError(path.get(`children.${index}`) as NodePath, 'Attribute "when" is required for the <ElseIf> tag.');
      }

      const childNodes = astUtil.getChildren(child);

      ret.elseifs.push({
        condition: astUtil.getExpression(whenAttr),
        children: astUtil.convertChildrenToExpression(childNodes, key, true)
      });
    } else if (types.isJSXElement(child) && astUtil.isTag(child, SUB_TAGS_IF.ELSE)) {
      if (!elseFound) {
        elseFound = true;
      } else {
        displayError(
          path.get(`children.${index}`) as NodePath,
          '<Else> can be used one per <If>, if you want multiple choises use <ElseIf> or <Switch>.'
        );
      }
      if (!child.closingElement) {
        displayError(path.get(`children.${index}`) as NodePath, '<Else> should have a closing tag.');
      }

      const childNodes = astUtil.getChildren(child);
      ret.else = astUtil.convertChildrenToExpression(childNodes, key, true);
    } else {
      thenChildren.push(child);
    }
  });

  ret.then.children = astUtil.convertChildrenToExpression(thenChildren, key, true);

  return ret;
}
