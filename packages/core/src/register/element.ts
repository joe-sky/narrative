import { DelegateOption, ElementOption, Props, Children, Fragment } from '../interface';

export interface ElementDelegate<HResult = any, HFragment = Fragment> {
  (props: Props, children: Children, option: DelegateOption<HResult, HFragment>): any;
}

export const elements: Map<string | ElementDelegate, ElementDelegate> = new Map();
export const elementOptions: Map<ElementDelegate, ElementOption> = new Map();

export function registerElement<HResult = any, HFragment = Fragment>(
  name: string,
  delegate: ElementDelegate<HResult, HFragment>,
  options: ElementOption = {}
) {
  elements.set(name, delegate);
  elements.set(delegate, delegate);
  elementOptions.set(delegate, options);

  if (options.alias) {
    options.alias.forEach(_alias => elements.set(_alias, delegate));
  }

  return delegate as any;
}
