import { H, Fragment, DelegateProps, Children } from './interface';
import { elements } from './register/element';

export function bind<HResult>(h?: H<HResult>, fragment?: Fragment | boolean) {
  return function(type, props, ...children) {
    const elDelegate = elements.get(type);
    if (elDelegate) {
      return elDelegate({ h, fragment }, props, ...children);
    }

    if (h) {
      if (fragment) {
        return h(type, props, ...children);
      } else {
        return h(type, props, children);
      }
    }
  } as H<HResult>;
}

export function adjustChildren(children: Children, delegateProps?: DelegateProps) {
  if (children.length === 1) {
    return children[0];
  } else {
    const { h, fragment } = delegateProps;
    if (fragment) {
      return h(fragment, null, ...children);
    } else {
      return children;
    }
  }
}

export const jsx: H = bind();

export function jsxValue<T = any>(jsxElement: JSX.Element) {
  return (jsxElement as any) as T;
}
