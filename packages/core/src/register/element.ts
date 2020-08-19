import { ElementDelegate, DelegateOption, ElementOption, Props, Children, Fragment } from '../interface';

export const elements: Map<string | ElementDelegate, ElementDelegate> = new Map();
export const elementOptions: Map<ElementDelegate, ElementOption> = new Map();

export function registerElement<T, HResult = any, HFragment = Fragment>(
  name: string,
  delegate: ElementDelegate<HResult, HFragment>,
  options: ElementOption = {}
): T {
  elements.set(name, delegate);
  elements.set(delegate, delegate);
  elementOptions.set(delegate, options);

  if (options.alias) {
    options.alias.forEach(_alias => elements.set(_alias, delegate));
  }

  return delegate as any;
}
