/*!
 * @narrative/control-statement v0.2.3
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
 * Narrative Custom Element `if`, example:
 *
 * `<If condition={false}><input /></If>`
 */
declare const If: (
  props: {
    condition: any;
  } & Childrenable
) => JSX.Element;
/**
 * Narrative Custom Element `else`, example:
 *
 * `<If condition={foo > 10}><input /><Else><input type="button" /></Else></If>`
 */
declare const Else: (props: Childrenable) => JSX.Element;
/**
 * Narrative Custom Element `empty`, example:
 *
 * `<For of={[1, 2, 3]}>{(item, { index }) => <i key={index}>{item}</i>}<Empty>nothing</Empty></For>`
 */
declare const Empty: (props: Childrenable) => JSX.Element;
/**
 * Narrative Custom Element `default`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
declare const Default: (props: Childrenable) => JSX.Element;
/**
 * Narrative Custom Element `elseif`, example:
 *
 * `<If condition={foo > 10}><input /><Elseif condition={foo > 5}><input type="button" /></Elseif></If>`
 */
declare const Elseif: (
  props: {
    condition: any;
  } & Childrenable
) => JSX.Element;

declare type ForCallback<T = any, K = number> = (
  item: T,
  meta: {
    index: number;
    length: number;
    key: K;
    isFirst: boolean;
    isLast: boolean;
  }
) => JSXChild;
declare function ForFunc<K, V>(props: {
  of: Map<K, V> | null | undefined;
  children: ForCallback<V, K> | (ForCallback<V, K> | JSXNode)[];
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
 * Narrative Custom Element `for`, example:
 *
 * `<For of={[1, 2, 3]}><i key={index}>{item}</i></For>`
 */
declare const For: typeof ForFunc;
/**
 * Narrative Custom Element `each`, example:
 *
 * `<Each of={[1, 2, 3]}><i key={index}>{item}</i></Each>`
 */
declare const Each: typeof ForFunc;

/**
 * Narrative Custom Element `switch`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
declare const Switch: (
  props: {
    expression: any;
  } & Childrenable
) => JSX.Element;
/**
 * Narrative Custom Element `case`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
declare const Case: (
  props: {
    value: any;
  } & Childrenable
) => JSX.Element;

/**
 * Narrative Spread Attribute `show`, example:
 *
 * `<input {...show(false)} />`
 */
declare const show: AttributeResult<boolean, any, any, any, any>;

export {
  Case,
  Default,
  Each,
  Else,
  Elseif,
  Empty,
  For,
  ForCallback,
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
