import { DelegateOption, Props, Children, H, Fragment } from './interface';

export function render(type: any, props: Props, children: Children, h: H, fragment?: Fragment) {
  if (fragment) {
    return h(type, props, ...children);
  } else {
    return h(type, props, children);
  }
}

export function adjustChildren(children: Children, option?: DelegateOption) {
  if (children.length === 1) {
    return children[0];
  } else {
    const { h, fragment } = option;
    if (fragment) {
      return h(fragment, null, ...children);
    } else {
      return children;
    }
  }
}

export function runPrevDelegate(props: Props, children: Children, option: DelegateOption) {
  const { prevDelegates, h, fragment, type } = option;
  const prevDelegate = prevDelegates.pop();

  if ('delegate' in prevDelegate) {
    return prevDelegate.delegate(props, children, { ...option, args: prevDelegate.args });
  } else {
    return render(type, props, children, h, fragment);
  }
}
