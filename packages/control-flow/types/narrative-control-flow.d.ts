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
 * <If when={foo > 0}><input /></If>
 *
 * Compiled ↓ ↓ ↓ ↓ ↓ ↓
 *
 * foo > 0 ? <input /> : null
 * ```
 */
declare function If<T>(props: {
    when: T;
} & Childrenable): JSX.Element;
/**
 * Narrative tag `Else`
 * @example
 * ```tsx
 * <If when={foo > 0}>
 *   <input />
 *   <Else><input type="button" /></Else>
 * </If>
 *
 * Compiled ↓ ↓ ↓ ↓ ↓ ↓
 *
 * foo > 0 ? <input /> : <input type="button" />
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
 *
 * Compiled ↓ ↓ ↓ ↓ ↓ ↓
 *
 * foo > 10 ? <input /> : foo > 5 ? <input type="button" /> : <input type="radio" />
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
 *
 * Compiled ↓ ↓ ↓ ↓ ↓ ↓
 *
 * foo === 1 ? <input /> : foo === 2 ? <input type="button" /> : 'nothing'
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
 *
 * Compiled ↓ ↓ ↓ ↓ ↓ ↓
 *
 * foo === 1 ? <input /> : foo === 2 ? <input type="button" /> : [3, 4, 5].includes(foo) ? <input type="radio" /> : 'nothing'
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
 *
 * Compiled ↓ ↓ ↓ ↓ ↓ ↓
 *
 * foo === 1 ? <input /> : foo === 2 ? <input type="button" /> : 'nothing'
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
 * )([1, 2, 3])
 * ```
 */
declare function Empty(props: Childrenable): JSX.Element;

export { Case, Childrenable, Default, Else, ElseIf, Empty, For, ForCallback, ForCallbackMeta, If, JSXChild, JSXNode, Switch };
