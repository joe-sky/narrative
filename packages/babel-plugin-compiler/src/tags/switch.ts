import * as types from '@babel/types';
import type { JSXElement } from '@babel/types';
import type { BabelFile, NodePath } from '@babel/core';
import * as astUtil from '../utils/ast';
import { SUB_TAGS_SWITCH, ATTRS_SWITCH } from '../utils/common';

function getBlocks(expression: types.Expression, children: astUtil.JSXChild[], key?: string) {
  const ret = {
    cases: [] as astUtil.Attrs[],
    default: types.nullLiteral() as types.Expression
  };

  children.forEach(child => {
    if (types.isJSXElement(child) && astUtil.isTag(child, SUB_TAGS_SWITCH.CASE)) {
      const attrs = astUtil.getAttributeMap(child);
      const childNodes = astUtil.getChildren(child);

      ret.cases.push({
        condition: attrs?.[ATTRS_SWITCH.IN]
          ? types.callExpression(
              types.memberExpression(astUtil.getExpression(attrs[ATTRS_SWITCH.IN]), types.identifier('includes')),
              [expression]
            )
          : types.binaryExpression('===', astUtil.getExpression(attrs?.[ATTRS_SWITCH.IS]), expression),
        children: astUtil.getSanitizedExpressionForContent(childNodes, key, true)
      });
    } else if (types.isJSXElement(child) && astUtil.isTag(child, SUB_TAGS_SWITCH.DEFAULT)) {
      const childNodes = astUtil.getChildren(child);
      ret.default = astUtil.getSanitizedExpressionForContent(childNodes, key, true);
    }
  });

  return ret;
}

export function transformSwitch(node: JSXElement, path: NodePath, file: BabelFile) {
  const key = astUtil.getKey(node);
  const attrs = astUtil.getAttributeMap(node);
  const children = astUtil.getChildren(node);
  const blocks = getBlocks(astUtil.getExpression(attrs?.[ATTRS_SWITCH.VALUE]), children, key);
  let ternaryExpression = blocks.default;

  blocks.cases?.reverse().forEach(caseBlock => {
    ternaryExpression = types.conditionalExpression(caseBlock.condition, caseBlock.children, ternaryExpression);
  });

  return ternaryExpression;
}
