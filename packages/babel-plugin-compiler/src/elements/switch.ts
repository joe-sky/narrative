import * as types from '@babel/types';
import { JSXElement, JSXIdentifier, JSXAttribute, JSXExpressionContainer, Node } from '@babel/types';
import * as astUtil from '../utils/ast';

const ELEMENTS = {
  Case: 'Case',
  Default: 'Default'
};

function getBlocks(expression: any, children: any[], key: string) {
  const ret = {
    cases: [],
    default: types.nullLiteral()
  };

  children.forEach(child => {
    if (astUtil.isTag(child, ELEMENTS.Case)) {
      const attrs = astUtil.getAttributeMap(child);
      const childNodes = astUtil.getChildren(child);

      ret.cases.push({
        condition: types.binaryExpression('===', astUtil.getExpression(attrs?.value), expression),
        children: astUtil.getSanitizedExpressionForContent(childNodes, key, true)
      });
    } else if (astUtil.isTag(child, ELEMENTS.Default)) {
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
  const blocks = getBlocks(astUtil.getExpression(attrs?.expression), children, key);
  let ternaryExpression: types.Expression = blocks.default;

  blocks.cases.reverse().forEach(function(caseBlock) {
    ternaryExpression = types.conditionalExpression(caseBlock.condition, caseBlock.children, ternaryExpression);
  });

  return ternaryExpression;
}
