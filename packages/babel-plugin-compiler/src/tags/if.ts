import * as types from '@babel/types';
import type { JSXElement } from '@babel/types';
import type { BabelFile } from '@babel/core';
import * as astUtil from '../utils/ast';

export const SUB_TAGS_IF = {
  ELSE_IF: 'ElseIf',
  ELSE: 'Else'
};

export const ATTRS_IF = {
  WHEN: 'when'
};

function getBlocks(condition: types.Expression, children: astUtil.JSXChild[], key?: string) {
  const ret = {
    then: { condition, children: types.nullLiteral() } as astUtil.Attrs,
    elseifs: [] as astUtil.Attrs[],
    else: types.nullLiteral() as types.Expression
  };

  const thenChildren: astUtil.JSXChild[] = [];

  children.forEach(child => {
    if (types.isJSXElement(child) && astUtil.isTag(child, SUB_TAGS_IF.ELSE_IF)) {
      const attrs = astUtil.getAttributeMap(child);
      const childNodes = astUtil.getChildren(child);

      ret.elseifs.push({
        condition: astUtil.getExpression(attrs?.[ATTRS_IF.WHEN]),
        children: astUtil.getSanitizedExpressionForContent(childNodes, key, true)
      });
    } else if (types.isJSXElement(child) && astUtil.isTag(child, SUB_TAGS_IF.ELSE)) {
      const childNodes = astUtil.getChildren(child);
      ret.else = astUtil.getSanitizedExpressionForContent(childNodes, key, true);
    } else {
      thenChildren.push(child);
    }
  });

  ret.then.children = astUtil.getSanitizedExpressionForContent(thenChildren, key, true);

  return ret;
}

export function transformIf(node: JSXElement, file: BabelFile) {
  const key = astUtil.getKey(node);
  const attrs = astUtil.getAttributeMap(node);
  const children = astUtil.getChildren(node);
  const blocks = getBlocks(astUtil.getExpression(attrs?.[ATTRS_IF.WHEN]), children, key);
  let ternaryExpression = blocks.else;

  blocks.elseifs?.reverse().forEach(elseifBlock => {
    ternaryExpression = types.conditionalExpression(elseifBlock.condition, elseifBlock.children, ternaryExpression);
  });

  return types.conditionalExpression(blocks.then.condition, blocks.then.children, ternaryExpression);
}
