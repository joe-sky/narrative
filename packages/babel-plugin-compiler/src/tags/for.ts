import * as types from '@babel/types';
import { JSXElement, JSXIdentifier, JSXAttribute, JSXExpressionContainer, Node } from '@babel/types';
import * as astUtil from '../utils/ast';

/*
 <div> 
   <For of={[1, 2, 3]}>
     {(item, { index, isFirst, isLast }) => <i key={index}>{item}</i>}
   </For>
 <div>

 ↓ ↓ ↓ ↓ ↓ ↓

 <div>
   {[1, 2, 3].map((item, index, arr) => {
     const isFirst = index === 0;
     const isLast = index === arr.length - 1;
     return <i key={index}>{item}</i>;
   })}
 </div>
 */

export const SUB_TAGS_FOR = {
  EMPTY: 'Empty'
};

export const ATTRS_FOR = {
  OF: 'of',
  IN: 'in'
};

function getBlocks(condition: any, children: any[], key: string) {
  const ret = {
    loop: { condition: astUtil.getExpression(condition), children: [] } as astUtil.Attrs,
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
      if (!ret.loop.children) {
        ret.loop.children = [];
      }

      ret.loop.children.push(child);
    }
  });

  ret.loop.children = astUtil.getSanitizedExpressionForContent(ret.loop.children, key, true);

  return ret;
}

export function transformFor(node: JSXElement) {
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
