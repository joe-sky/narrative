import { DelegateProps, DelegateOption, Props, Children, Fragment } from '../interface';

export interface ElementDelegate<HResult = any, HFragment = Fragment> {
  (delegateProps: DelegateProps<HResult, HFragment>, props: Props, ...children: Children): any;
}

export const elements: Record<string, ElementDelegate> = {};
export const elementOptions: Map<ElementDelegate, DelegateOption> = new Map();

export function registerElement<HResult = any, HFragment = Fragment>(
  name: string,
  delegate: ElementDelegate<HResult, HFragment>,
  options: DelegateOption = {}
) {
  elements[name] = delegate;
  if (options.alias) {
    options.alias.forEach(_alias => (elements[_alias] = delegate));
  }

  elementOptions.set(delegate, options);
}
