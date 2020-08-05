import { H, Fragment, DelegateProps, Children } from './interface';
import { elements } from './register/element';

export function bind<HResult>(h?: H<HResult>, fragment?: Fragment) {
  return function(type, props, ...children) {
    const elDelegate = elements.get(type);
    if (elDelegate) {
      return elDelegate({ h, fragment }, props, ...children);
    }

    return h?.(type, props, ...children);
  } as H<HResult>;
}

export function adjustChildren(children: Children, delegateProps?: DelegateProps) {
  return children.length === 1
    ? children[0]
    : delegateProps.fragment
    ? delegateProps.h(delegateProps.fragment, null, children)
    : children;
}

export const jsx: H = bind();

export function jsxValue<T = any>(jsxElement: JSX.Element) {
  return (jsxElement as any) as T;
}
