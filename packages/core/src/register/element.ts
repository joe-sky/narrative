import { DelegateProps, DelegateOption, Props, Children, Fragment } from '../interface';

export interface ElementDelegate<HResult = any, HFragment = Fragment> {
  (delegateProps: DelegateProps<HResult, HFragment>, props: Props, children: Children): any;
}

export const elements: Map<string | ElementDelegate, ElementDelegate> = new Map();
export const elementOptions: Map<ElementDelegate, DelegateOption> = new Map();

export function registerElement<HResult = any, HFragment = Fragment>(
  name: string,
  delegate: ElementDelegate<HResult, HFragment>,
  options: DelegateOption = {}
) {
  elements.set(name, delegate);
  elements.set(delegate, delegate);
  elementOptions.set(delegate, options);

  if (options.alias) {
    options.alias.forEach(_alias => elements.set(_alias, delegate));
  }

  return delegate as any;
}
