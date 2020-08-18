import { H, Fragment, PropType, DelegateOption, DelegateWithArgs } from './interface';
import { elements } from './register/element';
import { attributes } from './register/attribute';
import { render } from './utils';

export function bind<HResult>(h?: H<HResult>, fragment?: Fragment | boolean) {
  return function(type, props, ...children) {
    if (props?.__nt__) {
      delete props.__nt__;

      const attrDelegates: DelegateWithArgs[] = [];
      Object.keys(props).forEach(prop => {
        const attrDelegate = attributes.get(prop);
        if (attrDelegate) {
          attrDelegates.push({
            delegate: attrDelegate,
            args: props[prop]
          });
          delete props[prop];
        }
      });

      const lastIndex = attrDelegates.length - 1;
      const prevDelegates: PropType<DelegateOption, 'prevDelegates'> = attrDelegates.slice(0, lastIndex);
      const elDelegate = elements.get(type);
      if (elDelegate) {
        prevDelegates.unshift({
          delegate: elDelegate
        });
      } else {
        prevDelegates.unshift(h);
      }

      const lastAttr = attrDelegates[lastIndex];
      return lastAttr.delegate(props, children, { h, fragment, type, args: lastAttr.args, prevDelegates });
    }

    const elDelegate = elements.get(type);
    if (elDelegate) {
      return elDelegate(props, children, { h, fragment, type });
    }

    return render(type, props, children, h, fragment);
  } as H<HResult>;
}

export const jsx: H = bind();

export function jsxValue<T = any>(jsxElement: JSX.Element) {
  return (jsxElement as any) as T;
}
