/*!
 * @narrative/core v0.3.0
 * (c) 2020-present Joe_Sky
 * Released under the MIT License.
 */
/// <reference types="react" />

declare type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
declare type Props = Record<string, any>;
declare type Children = any[];
declare type H<HResult = any> = (type: any, props: Props, ...children: Children) => HResult;
interface Fragment {}
interface HOption {
  Fragment?: Fragment;
  vue2?: boolean;
}
interface DelegateWithArgs {
  delegate: ElementDelegate | AttributeDelegate;
  args?: any[];
}
interface DelegateOption<HResult = any, HFragment = Fragment> {
  h?: H<HResult>;
  hOption?: HOption;
  type?: any;
  args?: any;
  prevDelegates?: (DelegateWithArgs | H)[];
}
interface ElementDelegate<HResult = any, HFragment = Fragment> {
  (props: Props, children: Children, option: DelegateOption<HResult, HFragment>): any;
}
interface AttributeDelegate<HResult = any, HFragment = Fragment> {
  (props: Props, children: Children, option: DelegateOption<HResult, HFragment>): any;
}
interface ElementOption {
  alias?: string[];
  [key: string]: any;
}
interface AttributeOption {
  [key: string]: any;
}
declare type JSXNode = JSX.Element | string | number | boolean | null | undefined | Record<any, any>;
declare type JSXChild = JSXNode | Array<JSXNode>;
interface Childrenable {
  children?: JSXChild;
}

declare const elements: Map<string | ElementDelegate, ElementDelegate>;
declare const elementOptions: Map<ElementDelegate, ElementOption>;
declare function registerElement<T, HResult = any, HFragment = Fragment>(
  name: string,
  delegate: ElementDelegate<HResult, HFragment>,
  options?: ElementOption
): T;

declare const attributes: Map<string, AttributeDelegate>;
declare const attributeOptions: Map<AttributeDelegate, AttributeOption>;
declare type AttributeResult<Arg1 = any, Arg2 = any, Arg3 = any, Arg4 = any, Arg5 = any> = (
  arg1?: Arg1,
  arg2?: Arg2,
  arg3?: Arg3,
  arg4?: Arg4,
  arg5?: Arg5,
  ...args: any[]
) => {
  __nt__: true;
  [name: string]: any;
};
declare function registerAttribute<
  Arg1 = any,
  Arg2 = any,
  Arg3 = any,
  Arg4 = any,
  Arg5 = any,
  HResult = any,
  HFragment = Fragment
>(
  name: string,
  delegate: AttributeDelegate<HResult, HFragment>,
  options?: AttributeOption
): AttributeResult<Arg1, Arg2, Arg3, Arg4, Arg5>;

declare function render(type: any, props: Props, children: Children, h: H, hOption: HOption): any;
declare function adjustChildren(children: Children, option?: DelegateOption, lazy?: boolean): any;
declare function renderPrevAttr(props: Props, children: Children, option: DelegateOption): any;

declare function bind<HResult>(h?: H<HResult>, hOption?: HOption): H<HResult>;
declare const h: H;
declare function jsx<T = any>(jsxElement: JSX.Element): T;

export {
  AttributeDelegate,
  AttributeOption,
  AttributeResult,
  Children,
  Childrenable,
  DelegateOption,
  DelegateWithArgs,
  ElementDelegate,
  ElementOption,
  Fragment,
  H,
  HOption,
  JSXChild,
  JSXNode,
  PropType,
  Props,
  adjustChildren,
  attributeOptions,
  attributes,
  bind,
  elementOptions,
  elements,
  h,
  jsx,
  registerAttribute,
  registerElement,
  render,
  renderPrevAttr
};
