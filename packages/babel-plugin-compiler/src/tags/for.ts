import * as types from '@babel/types';
import { JSXElement, JSXIdentifier, JSXAttribute, JSXExpressionContainer, Node } from '@babel/types';
import * as astUtil from '../utils/ast';
import generate from '@babel/generator';

export const SUB_TAGS_FOR = {
  /**
   * ```tsx
   * <div>
   *   <For of={[1, 2, 3]}>
   *     {(item, { index, isFirst, isLast }) => <i key={index}>{item}</i>}
   *     <Empty>No Data</Empty>
   *   </For>
   * </div>
   *
   * ↓ ↓ ↓ ↓ ↓ ↓
   *
   * <div>
   *   {(__arr => {
   *     if (__arr && __arr.length) {
   *       return __arr.map((item, index, arr) => {
   *         const isFirst = index === 0;
   *         const isLast = index === arr.length - 1;
   *         return <i key={index}>{item}</i>;
   *       });
   *     }
   *
   *     return 'No Data';
   *   })([1, 2, 3])}
   * </div>
   * ```
   */
  EMPTY: 'Empty'
};

export const ATTRS_FOR = {
  /**
   * ```tsx
   * <div>
   *   <For of={[1, 2, 3]}>
   *     {(item, { index, isFirst, isLast }) => <i key={index}>{item}</i>}
   *   </For>
   * </div>
   *
   * ↓ ↓ ↓ ↓ ↓ ↓
   *
   * <div>
   *   {[1, 2, 3]?.map((item, index, arr) => {
   *     const isFirst = index === 0;
   *     const isLast = index === arr.length - 1;
   *     return <i key={index}>{item}</i>;
   *   }) || null}
   * </div>
   * ```
   */
  OF: 'of',

  /**
   * ```tsx
   * <div>
   *   <For in={{ a: 1, b: 2, c: 3 }}>
   *     {(item, { key }) => <i key={key}>{item}</i>}
   *     <Empty>No Data</Empty>
   *   </For>
   * </div>
   *
   * ↓ ↓ ↓ ↓ ↓ ↓
   *
   * <div>
   *   {(__obj => {
   *     const __keys = Object.keys(__obj);
   *
   *     if (__keys && __keys.length) {
   *       return __keys.map((key, index, arr) => {
   *         return <i key={key}>{__obj[key]}</i>;
   *       });
   *     }
   *
   *     return 'No Data';
   *   })({ a: 1, b: 2, c: 3 })}
   * </div>
   * ```
   */
  IN: 'in'
};

function getBlocks(source: types.Expression, children: astUtil.JSXChild[], key?: string) {
  const ret = {
    callback: { source } as astUtil.ForAttrs,
    empty: types.nullLiteral() as types.Expression
  };

  children.forEach(child => {
    if (types.isJSXElement(child) && astUtil.isTag(child, SUB_TAGS_FOR.EMPTY)) {
      const childNodes = astUtil.getChildren(child);
      ret.empty = astUtil.getSanitizedExpressionForContent(childNodes, key, true);
    } else if (types.isArrowFunctionExpression(child)) {
      ret.callback.func = child;
    }
  });

  return ret;
}

export function transformFor(node: JSXElement) {
  const key = astUtil.getKey(node);
  const attrs = astUtil.getAttributeMap(node);
  const children = astUtil.getChildren(node);
  const blocks = getBlocks(astUtil.getExpression(attrs?.[ATTRS_FOR.OF]), children, key);
  const funcParams = blocks.callback.func.params;
  const metaParam = funcParams[1] as types.ObjectPattern;
  const generatedParams: astUtil.FuncParam[] = [funcParams[0]];

  if (metaParam) {
    if (
      metaParam.properties.find(
        prop => types.isObjectProperty(prop) && types.isIdentifier(prop.key) && prop.key.name === 'index'
      )
    ) {
      generatedParams.push(types.identifier('index'));
    }
  }

  const ret = types.logicalExpression(
    '||',
    types.optionalCallExpression(
      types.optionalMemberExpression(blocks.callback.source, types.identifier('map'), false, true),
      [types.arrowFunctionExpression(generatedParams, blocks.callback.func.body), types.identifier('this')],
      false
    ),
    types.nullLiteral()
  );

  /* You can use @babel/generator here when debugging */
  // console.log(generate(ret).code);

  return ret;
}
