/*!
 * @narrative/control-statement v0.3.1
 * (c) 2020-present Joe_Sky
 * Released under the MIT License.
 */
/// <reference types="react" />
import { Childrenable, JSXChild, JSXNode } from '@narrative/core';
import { AttributeResult } from '@narrative/core/types/narrative-core';

declare const isMap: (obj: any) => boolean;
declare const isWeakMap: (obj: any) => boolean;
declare const isSet: (obj: any) => boolean;
declare const isWeakSet: (obj: any) => boolean;
declare function isArrayLike(obj: any): boolean;
declare function each(obj: any, func: Function, isArr?: boolean): void;

/**
 * Narrative Custom Element `If`, example:
 *
 * `<If condition={false}><input /></If>`
 */
declare const If: (
  props: {
    condition: any;
  } & Childrenable
) => JSX.Element;
/**
 * Narrative Custom Element `Else`, example:
 *
 * `<If condition={foo > 10}><input /><Else><input type="button" /></Else></If>`
 */
declare const Else: (props: Childrenable) => JSX.Element;
/**
 * Narrative Custom Element `Empty`, example:
 *
 * `<For of={[1, 2, 3]}>{(item, { index }) => <i key={index}>{item}</i>}<Empty>nothing</Empty></For>`
 */
declare const Empty: (props: Childrenable) => JSX.Element;
/**
 * Narrative Custom Element `Default`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
declare const Default: (props: Childrenable) => JSX.Element;
/**
 * Narrative Custom Element `ElseIf`, example:
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
  of: WeakMap<K, V> | null | undefined;
  children: ForCallback<V, K> | (ForCallback<V, K> | JSXNode)[];
}): JSX.Element;
declare function ForFunc<K, V>(props: {
  of: Map<K, V> | null | undefined;
  children: ForCallback<V, K> | (ForCallback<V, K> | JSXNode)[];
}): JSX.Element;
declare function ForFunc<V extends object>(props: {
  of: WeakSet<V> | null | undefined;
  children: ForCallback<V, number> | (ForCallback<V, number> | JSXNode)[];
}): JSX.Element;
declare function ForFunc<T>(props: {
  of: Iterable<T> | ArrayLike<T> | null | undefined;
  children: ForCallback<T, number> | (ForCallback<T, number> | JSXNode)[];
}): JSX.Element;
declare function ForFunc<O extends {}, K extends keyof O>(props: {
  of: O | null | undefined;
  children: ForCallback<O[K], K> | (ForCallback<O[K], K> | JSXNode)[];
}): JSX.Element;
/**
 * Narrative Custom Element `For`, example:
 *
 * `<For of={[1, 2, 3]}><i key={index}>{item}</i></For>`
 */
declare const For: typeof ForFunc;
/**
 * Narrative Custom Element `Each`, example:
 *
 * `<Each of={[1, 2, 3]}><i key={index}>{item}</i></Each>`
 */
declare const Each: typeof ForFunc;

/**
 * Narrative Custom Element `Switch`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
declare const Switch: (
  props: {
    expression: any;
  } & Childrenable
) => JSX.Element;
/**
 * Narrative Custom Element `Case`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
declare const Case: (
  props: {
    value: any;
  } & Childrenable
) => JSX.Element;

/**
 * Narrative Custom Attribute `show`, example:
 *
 * `<input {...show(false)} />`
 */
declare const show: AttributeResult<boolean, any, any, any, any>;

export {
  Case,
  Default,
  Each,
  Else,
  ElseIf,
  Empty,
  For,
  ForCallback,
  ForCallbackMeta,
  If,
  Switch,
  each,
  isArrayLike,
  isMap,
  isSet,
  isWeakMap,
  isWeakSet,
  show
};
