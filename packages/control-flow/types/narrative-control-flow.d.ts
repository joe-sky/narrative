/*!
 * @narrative/control-flow v1.1.0
 * (c) 2021-present Joe_Sky
 * Released under the MIT License.
 */
/// <reference types="react" />

type JSXNode = JSX.Element | string | number | boolean | null | undefined | Record<any, any>;
type JSXChild = JSXNode | JSXNode[];
interface Childrenable {
    children?: JSXChild;
}

/**
 * Narrative tag `If`
 * @example
 * ```tsx
 * <If when={false}><input /></If>
 * ```
 */
declare function If<T>(props: {
    when: T;
} & Childrenable): JSX.Element;
/**
 * Narrative tag `Else`
 * @example
 * ```tsx
 * <If when={foo > 10}>
 *   <input />
 *   <Else><input type="button" /></Else>
 * </If>
 * ```
 */
declare function Else(props: Childrenable): JSX.Element;
/**
 * Narrative tag `ElseIf`
 * @example
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
 * Narrative tag `Switch`
 * @example
 * ```tsx
 * <Switch value={foo}>
 *   <Case is={1}><input /></Case>
 *   <Case is={2}><input type="button" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
declare function Switch<T>(props: {
    value: T;
} & Childrenable): JSX.Element;
/**
 * Narrative tag `Case`
 * @example
 * ```tsx
 * <Switch value={foo}>
 *   <Case is={1}><input /></Case>
 *   <Case is={2}><input type="button" /></Case>
 *   <Case in={[3, 4, 5]}><input type="radio" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
declare function Case<T>(props: {
    is: T;
} & Childrenable): JSX.Element;
declare function Case<T>(props: {
    in: ArrayLike<T>;
} & Childrenable): JSX.Element;
/**
 * Narrative tag `Default`
 * @example
 * ```tsx
 * <Switch value={foo}>
 *   <Case is={1}><input /></Case>
 *   <Case is={2}><input type="button" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
declare function Default(props: Childrenable): JSX.Element;

interface ForCallbackMeta<K = number> {
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
type ForCallback<T = any, K = number, S = any> = (item: T, meta: ForCallbackMeta<K>, source: S) => JSXChild | void;
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
declare function For<T>(props: {
    of: Iterable<T> | ArrayLike<T> | null | undefined;
    children: ForCallback<T, number, T[]> | (ForCallback<T, number, T[]> | JSXNode)[];
}): JSX.Element;
declare function For<O extends Record<string, unknown>, K extends keyof O>(props: {
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
declare function Empty(props: Childrenable): JSX.Element;

export { Case, Childrenable, Default, Else, ElseIf, Empty, For, ForCallback, ForCallbackMeta, If, JSXChild, JSXNode, Switch };
