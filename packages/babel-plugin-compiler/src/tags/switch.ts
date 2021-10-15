import * as types from '@babel/types';
import { JSXElement, JSXIdentifier, JSXAttribute, JSXExpressionContainer, Node } from '@babel/types';
import * as astUtil from '../utils/ast';

export const SUB_TAGS_SWITCH = {
  CASE: 'Case',
  DEFAULT: 'Default'
};

export const ATTRS_SWITCH = {
  EXPR: 'expr',
  VALUE: 'value',
  VALUES: 'values'
};

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
        condition: attrs?.[ATTRS_SWITCH.VALUES]
          ? types.callExpression(
              types.memberExpression(astUtil.getExpression(attrs[ATTRS_SWITCH.VALUES]), types.identifier('includes')),
              [expression]
            )
          : types.binaryExpression('===', astUtil.getExpression(attrs?.[ATTRS_SWITCH.VALUE]), expression),
        children: astUtil.getSanitizedExpressionForContent(childNodes, key, true)
      });
    } else if (types.isJSXElement(child) && astUtil.isTag(child, SUB_TAGS_SWITCH.DEFAULT)) {
      const childNodes = astUtil.getChildren(child);
      ret.default = astUtil.getSanitizedExpressionForContent(childNodes, key, true);
    }
  });

  return ret;
}

export function transformSwitch(node: JSXElement) {
  const key = astUtil.getKey(node);
  const attrs = astUtil.getAttributeMap(node);
  const children = astUtil.getChildren(node);
  const blocks = getBlocks(astUtil.getExpression(attrs?.[ATTRS_SWITCH.EXPR]), children, key);
  let ternaryExpression = blocks.default;

  blocks.cases?.reverse().forEach(caseBlock => {
    ternaryExpression = types.conditionalExpression(caseBlock.condition, caseBlock.children, ternaryExpression);
  });

  return ternaryExpression;
}
