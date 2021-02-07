/*!
 * @narrative/core v0.3.7
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
  __nt__?: boolean;
}
interface AttributeDelegate<HResult = any, HFragment = Fragment> {
  (props: Props, children: Children, option: DelegateOption<HResult, HFragment>): any;
}
declare type JSXNode = JSX.Element | string | number | boolean | null | undefined | Record<any, any>;
declare type JSXChild = JSXNode | Array<JSXNode>;
interface Childrenable {
  children?: JSXChild;
}

declare function isEl(type: any): type is ElementDelegate;
declare function defineElement<
  ElFunc extends (props: Childrenable) => JSX.Element,
  HResult = any,
  HFragment = Fragment
>(delegate: ElementDelegate<HResult, HFragment>): ElFunc;
declare function defineElement<ElProps extends {}, HResult = any, HFragment = Fragment>(
  delegate: ElementDelegate<HResult, HFragment>
): (props: ElProps & Childrenable) => JSX.Element;

declare type AttributeResult<Arg1 = any, Arg2 = any, Arg3 = any, Arg4 = any, Arg5 = any> = (
  arg1?: Arg1,
  arg2?: Arg2,
  arg3?: Arg3,
  arg4?: Arg4,
  arg5?: Arg5,
  ...args: any[]
) => {
  [name: string]: any;
};
declare const NT_ATTR = '__ntAttr__';
declare function defineAttribute<
  Arg1 = any,
  Arg2 = any,
  Arg3 = any,
  Arg4 = any,
  Arg5 = any,
  HResult = any,
  HFragment = Fragment
>(delegate: AttributeDelegate<HResult, HFragment>): AttributeResult<Arg1, Arg2, Arg3, Arg4, Arg5>;

declare function adjustChildren(children: Children, option?: DelegateOption, lazy?: boolean): any;
declare function renderPrevAttr(props: Props, children: Children, option: DelegateOption): any;
declare function as<R, T = any>(value: T): R;

declare function bind<HResult>(h?: H<HResult>, hOption?: HOption): H<HResult>;
declare const jsx: H;

export {
  AttributeDelegate,
  AttributeResult,
  Children,
  Childrenable,
  DelegateOption,
  DelegateWithArgs,
  ElementDelegate,
  Fragment,
  H,
  HOption,
  JSXChild,
  JSXNode,
  NT_ATTR,
  PropType,
  Props,
  adjustChildren,
  as,
  bind,
  defineAttribute,
  defineElement,
  isEl,
  jsx,
  renderPrevAttr
};
