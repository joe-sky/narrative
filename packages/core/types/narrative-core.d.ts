/*!
 * @narrative/core v0.2.1
 * (c) 2020-present Joe_Sky
 * Released under the MIT License.
 */
/// <reference types="react" />

declare type Props = Record<string, any>;
declare type Children = any[];
declare type H<HResult = any> = (type: any, props: Props, ...children: Children) => HResult;
interface Fragment {
}
interface DelegateOption<HResult = any, HFragment = Fragment> {
    h?: H<HResult>;
    fragment?: HFragment;
}
interface ElementOption {
    alias?: string[];
    [key: string]: any;
}
declare type JSXNode = JSX.Element | string | number | boolean | null | undefined;
declare type JSXChild = JSXNode | Array<JSXNode>;
interface Childrenable {
    children?: JSXChild;
}

interface ElementDelegate<HResult = any, HFragment = Fragment> {
    (props: Props, children: Children, option: DelegateOption<HResult, HFragment>): any;
}
declare const elements: Map<string | ElementDelegate, ElementDelegate>;
declare const elementOptions: Map<ElementDelegate, ElementOption>;
declare function registerElement<HResult = any, HFragment = Fragment>(name: string, delegate: ElementDelegate<HResult, HFragment>, options?: ElementOption): any;

declare function bind<HResult>(h?: H<HResult>, fragment?: Fragment | boolean): H<HResult>;
declare function adjustChildren(children: Children, option?: DelegateOption): any;
declare const jsx: H;
declare function jsxValue<T = any>(jsxElement: JSX.Element): T;

export { Children, Childrenable, DelegateOption, ElementDelegate, ElementOption, Fragment, H, JSXChild, JSXNode, Props, adjustChildren, bind, elementOptions, elements, jsx, jsxValue, registerElement };
