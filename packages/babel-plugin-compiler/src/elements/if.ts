import * as types from '@babel/types';
import { JSXElement, JSXIdentifier, JSXAttribute, JSXExpressionContainer, Node } from '@babel/types';
import * as astUtil from '../utils/ast';

const ELEMENTS = {
  If: 'If',
  ElseIf: 'ElseIf',
  Else: 'Else'
};

function getBlocks(condition: any, children: any[], key: string) {
  const ret = {
    then: { condition: astUtil.getExpression(condition), children: null },
    elseifs: [],
    else: types.nullLiteral()
  };

  children.forEach(child => {
    if (astUtil.isTag(child, ELEMENTS.ElseIf)) {
      const attrs = astUtil.getAttributeMap(child);
      const childNodes = astUtil.getChildren(child);

      ret.elseifs.push({
        condition: astUtil.getExpression(attrs?.condition),
        children: astUtil.getSanitizedExpressionForContent(childNodes, key, true)
      });
    } else if (astUtil.isTag(child, ELEMENTS.Else)) {
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
  const blocks = getBlocks(attrs?.condition, children, key);
  let ternaryExpression: types.Expression = blocks.else;

  blocks.elseifs.reverse().forEach(function(elseifBlock) {
    ternaryExpression = types.conditionalExpression(elseifBlock.condition, elseifBlock.children, ternaryExpression);
  });

  return types.conditionalExpression(blocks.then.condition, blocks.then.children, ternaryExpression);
}
