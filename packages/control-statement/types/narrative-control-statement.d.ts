/*!
 * @narrative/control-statement v0.3.3
 * (c) 2020-present Joe_Sky
 * Released under the MIT License.
 */
import { Childrenable, AttributeResult } from '@narrative/core/types/narrative-core';
import { JSXChild, JSXNode } from '@narrative/core';

declare type LoopFunc = (item: any, index: number, len: number, lenObj: number) => any;
declare type EachType = 1 | 2 | 3 | 4;
declare function each(record: any, func: LoopFunc, type?: EachType): void;

/**
 * Narrative Element `If`, example:
 *
 * `<If condition={false}><input /></If>`
 */
declare const If: (
  props: {
    condition: any;
  } & Childrenable
) => JSX.Element;
/**
 * Narrative Element `Else`, example:
 *
 * `<If condition={foo > 10}><input /><Else><input type="button" /></Else></If>`
 */
declare const Else: (props: Childrenable) => JSX.Element;
/**
 * Narrative Element `Empty`, example:
 *
 * `<For of={[1, 2, 3]}>{(item, { index }) => <i key={index}>{item}</i>}<Empty>nothing</Empty></For>`
 */
declare const Empty: (props: Childrenable) => JSX.Element;
/**
 * Narrative Element `Default`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
declare const Default: (props: Childrenable) => JSX.Element;
/**
 * Narrative Element `ElseIf`, example:
 *
 * `<If condition={foo > 10}><input /><ElseIf condition={foo > 5}><input type="button" /></ElseIf></If>`
 */
declare const ElseIf: (
  props: {
    condition: any;
  } & Childrenable
) => JSX.Element;

interface ForCallbackMeta<K = number> {
  index: number;
  length: number;
  key: K;
  isFirst: boolean;
  isLast: boolean;
}
declare type ForCallback<T = any, K = number> = (item: T, meta: ForCallbackMeta<K>) => JSXChild;
declare function ForFunc<K extends object, V>(props: {
  ofMap: WeakMap<K, V> | null | undefined;
  children: ForCallback<V, K> | (ForCallback<V, K> | JSXNode)[];
}): JSX.Element;
declare function ForFunc<K, V>(props: {
  ofMap: Map<K, V> | null | undefined;
  children: ForCallback<V, K> | (ForCallback<V, K> | JSXNode)[];
}): JSX.Element;
declare function ForFunc<V extends object>(props: {
  ofSet: WeakSet<V> | null | undefined;
  children: ForCallback<V, number> | (ForCallback<V, number> | JSXNode)[];
}): JSX.Element;
declare function ForFunc<V>(props: {
  ofSet: Set<V> | null | undefined;
  children: ForCallback<V, number> | (ForCallback<V, number> | JSXNode)[];
}): JSX.Element;
declare function ForFunc<T>(props: {
  of: Iterable<T> | ArrayLike<T> | null | undefined;
  children: ForCallback<T, number> | (ForCallback<T, number> | JSXNode)[];
}): JSX.Element;
declare function ForFunc<O extends {}, K extends keyof O>(props: {
  in: O | null | undefined;
  children: ForCallback<O[K], K> | (ForCallback<O[K], K> | JSXNode)[];
}): JSX.Element;
/**
 * Narrative Element `For`, example:
 *
 * `<For of={[1, 2, 3]}><i key={index}>{item}</i></For>`
 */
declare const For: typeof ForFunc;
/**
 * Narrative Element `Each`, example:
 *
 * `<Each of={[1, 2, 3]}><i key={index}>{item}</i></Each>`
 */
declare const Each: typeof ForFunc;

/**
 * Narrative Element `Switch`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
declare const Switch: (
  props: {
    expression: any;
  } & Childrenable
) => JSX.Element;
/**
 * Narrative Element `Case`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
declare const Case: (
  props: {
    value: any;
  } & Childrenable
) => JSX.Element;

/**
 * Narrative Attribute `show`, example:
 *
 * `<input {...show(false)} />`
 */
declare const show: AttributeResult<boolean, any, any, any, any>;

export {
  Case,
  Default,
  Each,
  EachType,
  Else,
  ElseIf,
  Empty,
  For,
  ForCallback,
  ForCallbackMeta,
  If,
  Switch,
  each,
  show
};
