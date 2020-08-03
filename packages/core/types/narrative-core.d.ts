/*!
 * @narrative/core v0.0.1
 * (c) 2020-present Joe_Sky
 * Released under the MIT License.
 */
declare type Props = Record<string, any>;
declare type Children = any[];
declare type H<HResult = any> = (type: any, props: Props, ...children: Children) => HResult;
interface Fragment {}
interface DelegateProps<HResult = any, HFragment = Fragment> {
  h?: H<HResult>;
  fragment?: HFragment;
}
interface DelegateOption {
  alias?: string[];
  [key: string]: any;
}

interface ElementDelegate<HResult = any, HFragment = Fragment> {
  (delegateProps: DelegateProps<HResult, HFragment>, props: Props, ...children: Children): any;
}
declare const elements: Record<string, ElementDelegate>;
declare const elementOptions: Map<ElementDelegate, DelegateOption>;
declare function registerElement<HResult = any, HFragment = Fragment>(
  name: string,
  delegate: ElementDelegate<HResult, HFragment>,
  options?: DelegateOption
): void;

declare function bind<HResult>(h?: H<HResult>, fragment?: Fragment): H<HResult>;
declare function adjustChildren(children: Children, delegateProps?: DelegateProps): any;
declare const jsx: H;

export {
  Children,
  DelegateOption,
  DelegateProps,
  ElementDelegate,
  Fragment,
  H,
  Props,
  adjustChildren,
  bind,
  elementOptions,
  elements,
  jsx,
  registerElement
};
