import { Children, registerElement, JSXChild, JSXNode } from '@narrative/core';
import * as utils from '../utils';

export type ForCallback<T = any, K = number> = (
  item: T,
  meta: {
    index: number;
    length: number;
    key: K;
    isFirst: boolean;
    isLast: boolean;
  }
) => JSXChild;

interface ParseChildrenResult {
  for: ForCallback;
  empty: any;
}

function parseChildren(children: Children) {
  const ret: ParseChildrenResult = { for: null, empty: null };
  children.forEach(child => {
    if (child?.ntElse) {
      ret.empty = child.ntElse;
    } else {
      ret.for = child;
    }
  });

  return ret;
}

function ForFunc<K, V>(props: {
  of: Map<K, V> | null | undefined;
  children: ForCallback<V, K> | (ForCallback<V, K> | JSXNode)[];
}): JSX.Element;
function ForFunc<T>(props: {
  of: Iterable<T> | ArrayLike<T> | null | undefined;
  children: ForCallback<T, number> | (ForCallback<T, number> | JSXNode)[];
}): JSX.Element;
function ForFunc<O extends {}, K extends keyof O>(props: {
  of: O | null | undefined;
  children: ForCallback<O[K], K> | (ForCallback<O[K], K> | JSXNode)[];
}): JSX.Element;
function ForFunc() {
  return {} as JSX.Element;
}

/**
 * Narrative Custom Element `for`, example:
 *
 * `<For of={[1, 2, 3]}><i key={index}>{item}</i></For>`
 */
export const For = registerElement<typeof ForFunc>(
  'for',
  (props, children) => {
    const _children = parseChildren(children);
    const { empty } = _children;
    const list = props?.of;
    let ret = null;

    if (list) {
      ret = [];
      const isArrayLike = utils.isArrayLike(list);
      const isArrayLoop = isArrayLike || utils.isSet(list) || utils.isWeakSet(list);

      utils.each(
        list,
        (item, index, len, lenObj) => {
          const _index: number = isArrayLoop ? index : len;
          const _len: number = isArrayLoop ? len : lenObj;
          const isFirst = _index === 0;
          const isLast = _index === _len - 1;
          let key: number = null;

          if (!isArrayLoop) {
            key = index;
          }

          ret.push(_children.for(item, { index: _index, length: _len, key, isFirst, isLast }));
        },
        isArrayLike
      );

      if (!ret.length && empty) {
        ret = empty();
      }
    } else if (empty) {
      ret = empty();
    }

    return ret;
  },
  { alias: ['nt-for', 'each', 'nt-each'] }
);

/**
 * Narrative Custom Element `each`, example:
 *
 * `<Each of={[1, 2, 3]}><i key={index}>{item}</i></Each>`
 */
export const Each = For;
