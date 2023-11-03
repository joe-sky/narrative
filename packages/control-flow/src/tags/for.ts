import { Childrenable, JSXChild, JSXNode } from '../utils';

export interface ForCallbackMeta<K = number> {
  index: number;
  key: K;
  keys: K[];
  /**
   * @internal Not yet implemented
   */
  length: number;
  /**
   * @internal Not yet implemented
   */
  isFirst: boolean;
  /**
   * @internal Not yet implemented
   */
  isLast: boolean;
}

export type ForCallback<T = any, K = number, S = any> = (
  item: T,
  meta: ForCallbackMeta<K>,
  source: S
) => JSXChild | void;

type ArraySource<T> = Iterable<T> | ArrayLike<T> | null | undefined;

type ObjectSource<O> = O | null | undefined;

/**
 * Narrative tag `For`
 * @example
 * For of an array:
 * ```tsx
 * <For of={[1, 2, 3]}>
 *   {(item, { index }) => <i key={index}>{item}</i>}
 * </For>
 *
 * Compiled ↓ ↓ ↓ ↓ ↓ ↓
 *
 * [1, 2, 3]?.map((item, index, arr) => <i key={index}>{item}</i>, this) || null
 * ```
 * @example
 * For in an object:
 * ```tsx
 * <For in={{ a: 1, b: 2, c: 3 }}>
 *   {(item, { key }) => <i key={key}>{item}</i>}
 * </For>
 *
 * Compiled ↓ ↓ ↓ ↓ ↓ ↓
 *
 * (__obj => {
 *   const __keys = __obj ? Object.keys(__obj) : [];
 *   if (__keys.length) {
 *     return __keys.map(key => {
 *       const item = __obj[key];
 *       return <i key={key}>{item}</i>;
 *     }, this);
 *   }
 * })({ a: 1, b: 2, c: 3 })
 * ```
 */
export declare function For<T, S>(props: {
  of: S extends ArraySource<T> ? S : ArraySource<T>;
  children: ForCallback<T, number, S> | (ForCallback<T, number, S> | JSXNode)[];
}): JSX.Element;
export declare function For<O extends Record<string, unknown>, K extends keyof O, S>(props: {
  in: S extends ObjectSource<O> ? S : ObjectSource<O>;
  children: ForCallback<O[K], K, S> | (ForCallback<O[K], K, S> | JSXNode)[];
}): JSX.Element;

/**
 * Narrative tag `Empty`
 * @example
 * Empty within For:
 * ```tsx
 * <For of={[1, 2, 3]}>
 *   {(item, { index }) => <i key={index}>{item}</i>}
 *   <Empty>nothing</Empty>
 * </For>
 *
 * Compiled ↓ ↓ ↓ ↓ ↓ ↓
 *
 * (__arr => {
 *   if (__arr?.length) {
 *     return __arr.map((item, index) => <i key={index}>{item}</i>, this);
 *   }
 *   return 'nothing';
 * })([1, 2, 3])
 * ```
 */
export declare function Empty(props: Childrenable): JSX.Element;
