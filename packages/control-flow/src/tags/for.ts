import { Childrenable, JSXChild, JSXNode } from '../utils';

export interface ForCallbackMeta<K = number> {
  index: number;
  length: number;
  key: K;
  isFirst: boolean;
  isLast: boolean;
}

export type ForCallback<T = any, K = number> = (item: T, meta: ForCallbackMeta<K>) => JSXChild | void;

/**
 * Narrative tag `For`, example:
 * ```tsx
 * <For of={[1, 2, 3]}>
 *   {(item, { index }) => <i key={index}>{item}</i>}
 * </For>
 *
 * // Not implemented yet, will come soon
 * <For in={{ a: 1, b: 2, c: 3 }}>
 *   {(item, { key }) => <i key={key}>{item}</i>}
 * </For>
 * ```
 */
export declare function For<T>(props: {
  of: Iterable<T> | ArrayLike<T> | null | undefined;
  children: ForCallback<T, number> | (ForCallback<T, number> | JSXNode)[];
}): JSX.Element;
export declare function For<O extends {}, K extends keyof O>(props: {
  in: O | null | undefined;
  children: ForCallback<O[K], K> | (ForCallback<O[K], K> | JSXNode)[];
}): JSX.Element;

/**
 * Narrative tag `Empty`, example:
 * ```tsx
 * <For of={[1, 2, 3]}>
 *   {(item, { index }) => <i key={index}>{item}</i>}
 *   <Empty>nothing</Empty>
 * </For>
 * ```
 */
export declare function Empty(props: Childrenable): JSX.Element;
