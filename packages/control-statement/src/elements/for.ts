import { Children, defineElement, JSXChild, JSXNode } from '@narrative/core';
import * as utils from '../utils';

export interface ForCallbackMeta<K = number> {
  index: number;
  length: number;
  key: K;
  isFirst: boolean;
  isLast: boolean;
}

export type ForCallback<T = any, K = number> = (item: T, meta: ForCallbackMeta<K>) => JSXChild | void;

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

function ForFunc<K extends object, V>(props: {
  ofMap: WeakMap<K, V> | null | undefined;
  children: ForCallback<V, K> | (ForCallback<V, K> | JSXNode)[];
}): JSX.Element;
function ForFunc<K, V>(props: {
  ofMap: Map<K, V> | null | undefined;
  children: ForCallback<V, K> | (ForCallback<V, K> | JSXNode)[];
}): JSX.Element;
function ForFunc<V extends object>(props: {
  ofSet: WeakSet<V> | null | undefined;
  children: ForCallback<V, number> | (ForCallback<V, number> | JSXNode)[];
}): JSX.Element;
function ForFunc<V>(props: {
  ofSet: Set<V> | null | undefined;
  children: ForCallback<V, number> | (ForCallback<V, number> | JSXNode)[];
}): JSX.Element;
function ForFunc<T>(props: {
  of: Iterable<T> | ArrayLike<T> | null | undefined;
  children: ForCallback<T, number> | (ForCallback<T, number> | JSXNode)[];
}): JSX.Element;
function ForFunc<O extends {}, K extends keyof O>(props: {
  in: O | null | undefined;
  children: ForCallback<O[K], K> | (ForCallback<O[K], K> | JSXNode)[];
}): JSX.Element;
function ForFunc() {
  return {} as JSX.Element;
}

/**
 * Narrative Element `For`, example:
 *
 * `<For of={[1, 2, 3]}>{(item, { index }) => <i key={index}>{item}</i>}</For>`
 */
export const For = defineElement<typeof ForFunc>((props, children) => {
  const _children = parseChildren(children);
  const { empty } = _children;
  let record = null;
  let type: utils.EachType = null;
  let ret = null;

  if (props) {
    const { of, ofMap, ofSet } = props;

    if (of) {
      record = of;
      type = 1;
    } else if (props.in) {
      record = props.in;
      type = 2;
    } else if (ofMap) {
      record = ofMap;
      type = 3;
    } else if (ofSet) {
      record = ofSet;
      type = 4;
    }
  }

  if (record) {
    ret = [];
    const isArrayLoop = type === 1 || type === 4;

    utils.each(
      record,
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
      type
    );

    if (!ret.length && empty) {
      ret = empty();
    }
  } else if (empty) {
    ret = empty();
  }

  return ret;
});

/**
 * Narrative Element `Each`, example:
 *
 * `<Each of={[1, 2, 3]}><i key={index}>{item}</i></Each>`
 */
export const Each = For;
