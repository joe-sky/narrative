/*!
 * @narrative/control-statement v0.1.1
 * (c) 2020-present Joe_Sky
 * Released under the MIT License.
 */
/// <reference types="react" />
import { JSXChild } from '@narrative/core';

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
declare const If: (props: { condition: any }) => JSX.Element;
/**
 * Narrative Custom Element `else`, example:
 *
 * `<If condition={foo > 10}><input /><Else><input type="button" /></Else></If>`
 */
declare const Else: () => JSX.Element;
/**
 * Narrative Custom Element `empty`, example:
 *
 * `<For of={[1, 2, 3]}>{(item, { index }) => <i key={index}>{item}</i>}<Empty>nothing</Empty></For>`
 */
declare const Empty: () => JSX.Element;
/**
 * Narrative Custom Element `default`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
declare const Default: () => JSX.Element;
/**
 * Narrative Custom Element `elseif`, example:
 *
 * `<If condition={foo > 10}><input /><Elseif condition={foo > 5}><input type="button" /></Elseif></If>`
 */
declare const Elseif: (props: { condition: any }) => JSX.Element;

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
/**
 * Narrative Custom Element `for`, example:
 *
 * `<For of={[1, 2, 3]}><i key={index}>{item}</i></For>`
 */
declare const For: <T>(props: {
  of: Iterable<T> | ArrayLike<T> | null | undefined;
  children: ForCallback<T, number> | (ForCallback<T, number> | Narrative.JSXNode)[];
}) => JSX.Element;
/**
 * Narrative Custom Element `each`, example:
 *
 * `<Each of={[1, 2, 3]}><i key={index}>{item}</i></Each>`
 */
declare const Each: <T>(props: {
  of: Iterable<T> | ArrayLike<T>;
  children: ForCallback<T, number> | (string | number | boolean | JSX.Element | ForCallback<T, number>)[];
}) => JSX.Element;
/**
 * Narrative Custom Element `switch`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
declare const Switch: (props: { expression: any }) => JSX.Element;
/**
 * Narrative Custom Element `case`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
declare const Case: (props: { value: any }) => JSX.Element;

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
  isWeakSet
};
