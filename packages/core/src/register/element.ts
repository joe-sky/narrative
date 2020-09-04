import { ElementDelegate, Childrenable, Fragment } from '../interface';

export function isEl(type: any): type is ElementDelegate {
  return (type as ElementDelegate)?.__nt__;
}

export function element<ElFunc extends (props: Childrenable) => JSX.Element, HResult = any, HFragment = Fragment>(
  delegate: ElementDelegate<HResult, HFragment>
): ElFunc;
export function element<ElProps extends {}, HResult = any, HFragment = Fragment>(
  delegate: ElementDelegate<HResult, HFragment>
): (props: ElProps & Childrenable) => JSX.Element;
export function element(delegate: ElementDelegate) {
  delegate.__nt__ = true;

  return delegate as any;
}
