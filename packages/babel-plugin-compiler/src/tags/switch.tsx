import * as types from '@babel/types';
import { JSXElement, JSXIdentifier, JSXAttribute, JSXExpressionContainer, Node } from '@babel/types';
import * as astUtil from '../utils/ast';
import { as } from '../utils';

export const SUB_TAGS_SWITCH = {
  Case: 'Case',
  Default: 'Default'
};

export const ATTRS_SWITCH = {
  expr: 'expr',
  value: 'value',
  values: 'values'
};

function getBlocks(expression: any, children: any[], key: string) {
  const ret = {
    cases: [] as astUtil.Attrs[],
    default: types.nullLiteral()
  };

  children.forEach(child => {
    if (astUtil.isTag(child, SUB_TAGS_SWITCH.Case)) {
      const attrs = astUtil.getAttributeMap(child);
      const childNodes = astUtil.getChildren(child);

      ret.cases.push({
        condition: attrs?.[ATTRS_SWITCH.values]
          ? types.callExpression(
              types.memberExpression(astUtil.getExpression(attrs[ATTRS_SWITCH.values]), types.identifier('includes')),
              [expression]
            )
          : types.binaryExpression('===', astUtil.getExpression(attrs?.[ATTRS_SWITCH.value]), expression),
        children: astUtil.getSanitizedExpressionForContent(childNodes, key, true)
      });
    } else if (astUtil.isTag(child, SUB_TAGS_SWITCH.Default)) {
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
  const blocks = getBlocks(astUtil.getExpression(attrs?.[ATTRS_SWITCH.expr]), children, key);
  let ternaryExpression: types.Expression = blocks.default;

  blocks.cases?.reverse().forEach(caseBlock => {
    ternaryExpression = types.conditionalExpression(caseBlock.condition, as(caseBlock.children), ternaryExpression);
  });

  return ternaryExpression;
}
