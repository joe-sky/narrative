/** @jsx jsx */
import { jsx } from '@narrative/core';
import { If, ElseIf, Else, For } from '@narrative/control-statement';
import * as types from '@babel/types';
import { JSXElement, JSXIdentifier, JSXAttribute, JSXExpressionContainer, Node } from '@babel/types';
import * as astUtil from '../utils/ast';

export const SUB_ELEMENTS_IF = {
  ElseIf: 'ElseIf',
  Else: 'Else'
};

function getBlocks(condition: any, children: any[], key: string) {
  const ret = {
    then: { condition: astUtil.getExpression(condition), children: null },
    elseifs: [],
    else: types.nullLiteral()
  };

  children.forEach(child => (
    <If condition={astUtil.isTag(child, SUB_ELEMENTS_IF.ElseIf)}>
      {() => {
        const attrs = astUtil.getAttributeMap(child);
        const childNodes = astUtil.getChildren(child);

        ret.elseifs.push({
          condition: astUtil.getExpression(attrs?.condition),
          children: astUtil.getSanitizedExpressionForContent(childNodes, key, true)
        });
      }}
      <ElseIf condition={astUtil.isTag(child, SUB_ELEMENTS_IF.Else)}>
        {() => {
          const childNodes = astUtil.getChildren(child);

          ret.else = astUtil.getSanitizedExpressionForContent(childNodes, key, true);
        }}
      </ElseIf>
      <Else>
        {() => {
          if (!ret.then.children) {
            ret.then.children = [];
          }

          ret.then.children.push(child);
        }}
      </Else>
    </If>
  ));

  ret.then.children = astUtil.getSanitizedExpressionForContent(ret.then.children, key, true);

  return ret;
}

export function transformIf(node: JSXElement) {
  const key = astUtil.getKey(node);
  const attrs = astUtil.getAttributeMap(node);
  const children = astUtil.getChildren(node);
  const blocks = getBlocks(attrs?.condition, children, key);
  let ternaryExpression: types.Expression = blocks.else;

  <For of={blocks.elseifs.reverse()}>
    {elseifBlock => {
      ternaryExpression = types.conditionalExpression(elseifBlock.condition, elseifBlock.children, ternaryExpression);
    }}
  </For>;

  return types.conditionalExpression(blocks.then.condition, blocks.then.children, ternaryExpression);
}
