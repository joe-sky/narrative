/*!
 * @narrative/control-flow v1.0.0-alpha.3
 * (c) 2021-present Joe_Sky
 * Released under the MIT License.
 */
/// <reference types="react" />

declare type JSXNode = JSX.Element | string | number | boolean | null | undefined | Record<any, any>;
declare type JSXChild = JSXNode | Array<JSXNode>;
interface Childrenable {
    children?: JSXChild;
}

/**
 * Narrative tag `If`, example:
 * ```tsx
 * <If when={false}><input /></If>
 * ```
 */
declare function If<T>(props: {
    when: T;
} & Childrenable): JSX.Element;
/**
 * Narrative tag `Else`, example:
 * ```tsx
 * <If when={foo > 10}>
 *   <input />
 *   <Else><input type="button" /></Else>
 * </If>
 * ```
 */
declare function Else(props: Childrenable): JSX.Element;
/**
 * Narrative tag `ElseIf`, example:
 * ```tsx
 * <If when={foo > 10}>
 *   <input />
 *   <ElseIf when={foo > 5}><input type="button" /></ElseIf>
 *   <Else><input type="radio" /></Else>
 * </If>
 * ```
 */
declare function ElseIf<T>(props: {
    when: T;
} & Childrenable): JSX.Element;

/**
 * Narrative tag `Switch`, example:
 * ```tsx
 * <Switch expr={foo}>
 *   <Case value={1}><input /></Case>
 *   <Case value={2}><input type="button" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
declare function Switch<T>(props: {
    expr: T;
} & Childrenable): JSX.Element;
/**
 * Narrative tag `Case`, example:
 * ```tsx
 * <Switch expr={foo}>
 *   <Case value={1}><input /></Case>
 *   <Case value={2}><input type="button" /></Case>
 *   <Case values={[3, 4, 5]}><input type="radio" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
declare function Case<T>(props: {
    value: T;
} & Childrenable): JSX.Element;
declare function Case<T>(props: {
    values: ArrayLike<T>;
} & Childrenable): JSX.Element;
/**
 * Narrative tag `Default`, example:
 * ```tsx
 * <Switch expr={foo}>
 *   <Case value={1}><input /></Case>
 *   <Case value={2}><input type="button" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
declare function Default(props: Childrenable): JSX.Element;

interface ForCallbackMeta<K = number> {
    index: number;
    length: number;
    key: K;
    isFirst: boolean;
    isLast: boolean;
}
declare type ForCallback<T = any, K = number> = (item: T, meta: ForCallbackMeta<K>) => JSXChild | void;
/**
 * Narrative tag `For`, example:
 * ```tsx
 * <For of={[1, 2, 3]}>
 *   {(item, { index }) => <i key={index}>{item}</i>}
 * </For>
 *
 * <For in={{ a: 1, b: 2, c: 3 }}>
 *   {(item, { key }) => <i key={key}>{item}</i>}
 * </For>
 * ```
 */
declare function For<T>(props: {
    of: Iterable<T> | ArrayLike<T> | null | undefined;
    children: ForCallback<T, number> | (ForCallback<T, number> | JSXNode)[];
}): JSX.Element;
declare function For<O extends {}, K extends keyof O>(props: {
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
declare function Empty(props: Childrenable): JSX.Element;

export { Case, Childrenable, Default, Else, ElseIf, Empty, For, ForCallback, ForCallbackMeta, If, JSXChild, JSXNode, Switch };
