export type JSXNode = JSX.Element | string | number | boolean | null | undefined | Record<any, any>;

export type JSXChild = JSXNode | JSXNode[];

export interface Childrenable {
  children?: JSXChild;
}
