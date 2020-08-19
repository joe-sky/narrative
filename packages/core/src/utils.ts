import { DelegateOption, Props, Children, H, Fragment } from './interface';

export function render(type: any, props: Props, children: Children, h: H, fragment?: Fragment) {
  if (fragment) {
    return h(type, props, ...children);
  } else {
    return h(type, props, children);
  }
}

export function adjustChildren(children: Children, option?: DelegateOption, lazy?: boolean) {
  if (children.length === 1) {
    const child = children[0];
    if (lazy && typeof child === 'function') {
      return child();
    }

    return child;
  } else {
    const { h, fragment } = option;
    if (fragment) {
      return h(fragment, null, ...children);
    } else {
      return children;
    }
  }
}

export function renderPrevDelegate(props: Props, children: Children, option: DelegateOption) {
  const { prevDelegates, h, fragment, type } = option;
  const prevDelegate = prevDelegates.pop();

  if ('delegate' in prevDelegate) {
    return prevDelegate.delegate(props, children, { ...option, args: prevDelegate.args });
  } else {
    return render(type, props, children, h, fragment);
  }
}
