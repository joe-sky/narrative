import { H, HOption, PropType, DelegateOption, DelegateWithArgs } from './interface';
import { isEl } from './register/element';
import { NT_ATTR } from './register/attribute';
import { render } from './utils';

export function bind<HResult>(h?: H<HResult>, hOption: HOption = {}) {
  return function(type, props, ...children) {
    if (props?.__nt__ != null) {
      delete props.__nt__;

      const attrDelegates: DelegateWithArgs[] = [];
      Object.keys(props).forEach(prop => {
        if (prop.startsWith(NT_ATTR)) {
          const attr = props[prop];
          attrDelegates.push({
            delegate: attr[0],
            args: attr[1]
          });

          delete props[prop];
        }
      });

      const lastIndex = attrDelegates.length - 1;
      const prevDelegates: PropType<DelegateOption, 'prevDelegates'> = attrDelegates.slice(0, lastIndex);
      if (isEl(type)) {
        prevDelegates.unshift({
          delegate: type
        });
      } else {
        prevDelegates.unshift(h);
      }

      const lastAttr = attrDelegates[lastIndex];
      return lastAttr.delegate(props, children, { h, hOption, type, args: lastAttr.args, prevDelegates });
    }

    if (isEl(type)) {
      return type(props, children, { h, hOption, type });
    }

    return render(type, props, children, h, hOption);
  } as H<HResult>;
}

export const h: H = bind();

export function jsx<T = any>(jsxElement: JSX.Element) {
  return (jsxElement as any) as T;
}
