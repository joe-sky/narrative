import { H, Fragment, DelegateProps, Children } from './interface';
import { elements } from './register/element';

export function bind<HResult>(h?: H<HResult>, fragment?: Fragment) {
  return function(type, props, ...children) {
    const elH = elements[type];
    if (elH) {
      return elH({ h, fragment }, props, ...children);
    }

    return h && h(type, props, ...children);
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
