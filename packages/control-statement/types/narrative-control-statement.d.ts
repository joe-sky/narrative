/*!
 * @narrative/control-statement v0.4.0
 * (c) 2020-present Joe_Sky
 * Released under the MIT License.
 */
/// <reference types="react" />
import { Childrenable, JSXChild, JSXNode } from '@narrative/core';
import { AttributeResult } from '@narrative/core/types/narrative-core';

declare type LoopFunc = (item: any, index: number, len: number, lenObj: number) => any;
declare type EachType = 1 | 2 | 3 | 4;
declare function each(record: any, func: LoopFunc, type?: EachType): void;

declare function IfFunc<T>(
  props: {
    condition: T;
  } & Childrenable
): JSX.Element;
/**
 * Narrative Element `If`, example:
 * ```tsx
 * <If condition={false}><input /></If>
 * ```
 */
declare const If: typeof IfFunc;
/**
 * Narrative Element `Else`, example:
 * ```tsx
 * <If condition={foo > 10}>
 *   <input />
 *   <Else><input type="button" /></Else>
 * </If>
 * ```
 */
declare const Else: (props: Childrenable) => JSX.Element;
/**
 * Narrative Element `Empty`, example:
 * ```tsx
 * <For of={[1, 2, 3]}>
 *   {(item, { index }) => <i key={index}>{item}</i>}
 *   <Empty>nothing</Empty>
 * </For>
 * ```
 */
declare const Empty: (props: Childrenable) => JSX.Element;
/**
 * Narrative Element `Default`, example:
 * ```tsx
 * <Switch expression={foo}>
 *   <Case value={1}><input /></Case>
 *   <Case value={2}><input type="button" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
declare const Default: (props: Childrenable) => JSX.Element;
/**
 * Narrative Element `ElseIf`, example:
 * ```tsx
 * <If condition={foo > 10}>
 *   <input />
 *   <ElseIf condition={foo > 5}><input type="button" /></ElseIf>
 * </If>
 * ```
 */
declare const ElseIf: typeof IfFunc;

interface ForCallbackMeta<K = number> {
  index: number;
  length: number;
  key: K;
  isFirst: boolean;
  isLast: boolean;
}
declare type ForCallback<T = any, K = number> = (item: T, meta: ForCallbackMeta<K>) => JSXChild | void;
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
 * ```tsx
 * <For of={[1, 2, 3]}>
 *   {(item, { index }) => <i key={index}>{item}</i>}
 * </For>
 * ```
 */
declare const For: typeof ForFunc;

declare function SwitchFunc<T>(
  props: {
    expression: T;
  } & Childrenable
): JSX.Element;
/**
 * Narrative Element `Switch`, example:
 * ```tsx
 * <Switch expression={foo}>
 *   <Case value={1}><input /></Case>
 *   <Case value={2}><input type="button" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
declare const Switch: typeof SwitchFunc;
declare function CaseFunc<T>(
  props: {
    value: T;
  } & Childrenable
): JSX.Element;
declare function CaseFunc<T>(
  props: {
    values: ArrayLike<T>;
  } & Childrenable
): JSX.Element;
/**
 * Narrative Element `Case`, example:
 * ```tsx
 * <Switch expression={foo}>
 *   <Case value={1}><input /></Case>
 *   <Case value={2}><input type="button" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
declare const Case: typeof CaseFunc;

/**
 * Narrative Attribute `show`, example:
 * ```tsx
 * <input {...show(false)} />
 * ```
 */
declare const show: AttributeResult<boolean, any, any, any, any>;

/**
 * Narrative Attribute `visible`, example:
 * ```tsx
 * <input {...visible(false)} />
 * ```
 */
declare const visible: AttributeResult<boolean, any, any, any, any>;

export {
  Case,
  Default,
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
  show,
  visible
};
