import { Childrenable, JSXChild, JSXNode } from '../utils';

export interface ForCallbackMeta<K = number> {
  index: number;
  /**
   * @internal Not yet implemented
   */
  length: number;
  key: K;
  keys: K[];
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

/**
 * Narrative tag `For`
 * @example
 * // For of an array:
 * ```tsx
 * <For of={[1, 2, 3]}>
 *   {(item, { index }) => <i key={index}>{item}</i>}
 * </For>
 * ```
 * @example
 * // For in an object:
 * ```tsx
 * <For in={{ a: 1, b: 2, c: 3 }}>
 *   {(item, { key }) => <i key={key}>{item}</i>}
 * </For>
 * ```
 */
export declare function For<T>(props: {
  of: Iterable<T> | ArrayLike<T> | null | undefined;
  children: ForCallback<T, number, T[]> | (ForCallback<T, number, T[]> | JSXNode)[];
}): JSX.Element;
export declare function For<O extends Record<string, unknown>, K extends keyof O>(props: {
  in: O | null | undefined;
  children: ForCallback<O[K], K, O> | (ForCallback<O[K], K, O> | JSXNode)[];
}): JSX.Element;

/**
 * Narrative tag `Empty`
 * @example
 * ```tsx
 * // Empty within For:
 * <For of={[1, 2, 3]}>
 *   {(item, { index }) => <i key={index}>{item}</i>}
 *   <Empty>nothing</Empty>
 * </For>
 * ```
 */
export declare function Empty(props: Childrenable): JSX.Element;
