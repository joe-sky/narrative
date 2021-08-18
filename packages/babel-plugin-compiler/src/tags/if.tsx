import * as types from '@babel/types';
import { JSXElement, JSXIdentifier, JSXAttribute, JSXExpressionContainer, Node } from '@babel/types';
import * as astUtil from '../utils/ast';
import { as } from '../utils';

export const SUB_TAGS_IF = {
  ElseIf: 'ElseIf',
  Else: 'Else'
};

export const ATTRS_IF = {
  when: 'when'
};

function getBlocks(condition: any, children: any[], key: string) {
  const ret = {
    then: { condition: astUtil.getExpression(condition), children: [] } as astUtil.Attrs,
    elseifs: [] as astUtil.Attrs[],
    else: types.nullLiteral()
  };

  children.forEach(child => {
    if (astUtil.isTag(child, SUB_TAGS_IF.ElseIf)) {
      const attrs = astUtil.getAttributeMap(child);
      const childNodes = astUtil.getChildren(child);

      ret.elseifs.push({
        condition: astUtil.getExpression(attrs?.[ATTRS_IF.when]),
        children: astUtil.getSanitizedExpressionForContent(childNodes, key, true)
      });
    } else if (astUtil.isTag(child, SUB_TAGS_IF.Else)) {
      const childNodes = astUtil.getChildren(child);
      ret.else = astUtil.getSanitizedExpressionForContent(childNodes, key, true);
    } else {
      if (!ret.then.children) {
        ret.then.children = [];
      }

      ret.then.children.push(child);
    }
  });

  ret.then.children = astUtil.getSanitizedExpressionForContent(ret.then.children, key, true);

  return ret;
}

export function transformIf(node: JSXElement) {
  const key = astUtil.getKey(node);
  const attrs = astUtil.getAttributeMap(node);
  const children = astUtil.getChildren(node);
  const blocks = getBlocks(attrs?.[ATTRS_IF.when], children, key);
  let ternaryExpression: types.Expression = blocks.else;

  blocks.elseifs?.reverse().forEach(elseifBlock => {
    ternaryExpression = types.conditionalExpression(elseifBlock.condition, as(elseifBlock.children), ternaryExpression);
  });

  return types.conditionalExpression(blocks.then.condition, as(blocks.then.children), ternaryExpression);
}
