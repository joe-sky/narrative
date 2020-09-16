/** @jsx jsx */
import { jsx } from '@narrative/core';
import { If, ElseIf, Else, For } from '@narrative/control-statement';
import * as types from '@babel/types';
import { JSXElement, JSXIdentifier, JSXAttribute, JSXExpressionContainer, Node } from '@babel/types';
import * as astUtil from '../utils/ast';

export const SUB_ELEMENTS_SWITCH = {
  Case: 'Case',
  Default: 'Default'
};

function getBlocks(expression: any, children: any[], key: string) {
  const ret = {
    cases: [],
    default: types.nullLiteral()
  };

  children.forEach(child => (
    <If condition={astUtil.isTag(child, SUB_ELEMENTS_SWITCH.Case)}>
      {() => {
        const attrs = astUtil.getAttributeMap(child);
        const childNodes = astUtil.getChildren(child);

        ret.cases.push({
          condition: types.binaryExpression('===', astUtil.getExpression(attrs?.value), expression),
          children: astUtil.getSanitizedExpressionForContent(childNodes, key, true)
        });
      }}
      <ElseIf condition={astUtil.isTag(child, SUB_ELEMENTS_SWITCH.Default)}>
        {() => {
          const childNodes = astUtil.getChildren(child);

          ret.default = astUtil.getSanitizedExpressionForContent(childNodes, key, true);
        }}
      </ElseIf>
    </If>
  ));

  return ret;
}

export function transformSwitch(node: JSXElement) {
  const key = astUtil.getKey(node);
  const attrs = astUtil.getAttributeMap(node);
  const children = astUtil.getChildren(node);
  const blocks = getBlocks(astUtil.getExpression(attrs?.expression), children, key);
  let ternaryExpression: types.Expression = blocks.default;

  <For of={blocks.cases.reverse()}>
    {caseBlock => {
      ternaryExpression = types.conditionalExpression(caseBlock.condition, caseBlock.children, ternaryExpression);
    }}
  </For>;

  return ternaryExpression;
}
