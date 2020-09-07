import { DelegateOption, Props, Children, H, HOption } from './interface';

export function render(type: any, props: Props, children: Children, h: H, hOption: HOption) {
  if (!hOption.vue2) {
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
    const { h, hOption } = option;
    if (hOption.Fragment) {
      return h(hOption.Fragment, null, ...children);
    } else {
      return children;
    }
  }
}

export function renderPrevAttr(props: Props, children: Children, option: DelegateOption) {
  const { prevDelegates, h, hOption, type } = option;
  const prevDelegate = prevDelegates.pop();

  if (prevDelegate && 'delegate' in prevDelegate) {
    return prevDelegate.delegate(props, children, { ...option, args: prevDelegate.args });
  } else {
    return render(type, props, children, h, hOption);
  }
}

export function toType<T = any>(value: any) {
  return value as T;
}
