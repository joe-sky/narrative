export type Props = Record<string, any>;

export type Children = any[];

export type H<HResult = any> = (type: any, props: Props, ...children: Children) => HResult;

export interface Fragment {}

export interface DelegateOption<HResult = any, HFragment = Fragment> {
  h?: H<HResult>;
  fragment?: HFragment;
}

export interface ElementOption {
  alias?: string[];
  [key: string]: any;
}

export type JSXNode = JSX.Element | string | number | boolean | null | undefined | Record<any, any>;

export type JSXChild = JSXNode | Array<JSXNode>;

export interface Childrenable {
  children?: JSXChild;
}
