/*!
 * @narrative/control-statement v0.0.1
 * (c) 2020-present Joe_Sky
 * Released under the MIT License.
 */
import { JSXChild } from '@narrative/core';

declare const isMap: (obj: any) => boolean;
declare const isWeakMap: (obj: any) => boolean;
declare const isSet: (obj: any) => boolean;
declare const isWeakSet: (obj: any) => boolean;
declare function isArrayLike(obj: any): boolean;
declare function each(obj: any, func: Function, isArr?: boolean): void;

declare type ForCallback<T = any, K = number> = (item: T, meta: {
    index: number;
    length: number;
    key: K;
    isFirst: boolean;
    isLast: boolean;
}) => JSXChild;

export { ForCallback, each, isArrayLike, isMap, isSet, isWeakMap, isWeakSet };
