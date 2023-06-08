import * as types from '@babel/types';
import type { JSXElement } from '@babel/types';
import type { BabelFile, NodePath } from '@babel/core';
import * as astUtil from '../utils/ast';
import { displayError, IF, SUB_TAGS_IF, ATTRS_IF } from '../utils/common';

function getBlocks(condition: types.Expression, children: astUtil.JSXChild[], path: NodePath, key?: string) {
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
        displayError(
          path.get(`children.${index}`) as NodePath,
          `Attribute "when" is required for the <${SUB_TAGS_IF.ELSE_IF}> tag.`
        );
      }

      const childNodes = astUtil.getChildren(child);

      ret.elseifs.push({
        condition: astUtil.getExpression(attrs?.[ATTRS_IF.WHEN]),
        children: astUtil.getSanitizedExpressionForContent(childNodes, key, true)
      });
    } else if (types.isJSXElement(child) && astUtil.isTag(child, SUB_TAGS_IF.ELSE)) {
      if (!child.closingElement) {
        displayError(path.get(`children.${index}`) as NodePath, `<${SUB_TAGS_IF.ELSE}> should have a closing tag.`);
      }

      const childNodes = astUtil.getChildren(child);
      ret.else = astUtil.getSanitizedExpressionForContent(childNodes, key, true);
    } else {
      thenChildren.push(child);
    }
  });

  ret.then.children = astUtil.getSanitizedExpressionForContent(thenChildren, key, true);

  return ret;
}

export function transformIf(node: JSXElement, path: NodePath, file: BabelFile) {
  const key = astUtil.getKey(node);
  const attrs = astUtil.getAttributeMap(node);
  const whenAttr = attrs?.[ATTRS_IF.WHEN];
  if (!whenAttr) {
    throw displayError(path, `Attribute "when" is required for the <${IF}> tag.`);
  }

  const children = astUtil.getChildren(node);
  const blocks = getBlocks(astUtil.getExpression(attrs?.[ATTRS_IF.WHEN]), children, path, key);
  let ternaryExpression = blocks.else;

  blocks.elseifs?.reverse().forEach(elseifBlock => {
    ternaryExpression = types.conditionalExpression(elseifBlock.condition, elseifBlock.children, ternaryExpression);
  });

  return types.conditionalExpression(blocks.then.condition, blocks.then.children, ternaryExpression);
}
