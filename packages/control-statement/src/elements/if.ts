import { Children, registerElement, adjustChildren } from '@narrative/core';
import { each } from '../utils';

interface ParseChildrenResult {
  then: Children;
  else: any;
  elseifs: Children;
}

function parseChildren(children: Children) {
  const ret: ParseChildrenResult = { then: [], else: null, elseifs: [] };
  children.forEach(child => {
    if (child?.ntElse) {
      ret.else = child.ntElse;
    } else if (child?.ntElseif) {
      ret.elseifs.push(child);
    } else {
      ret.then.push(child);
    }
  });

  return ret;
}

registerElement(
  'if',
  (_, props, ...children) => {
    const _children = parseChildren(children);
    if (props?.condition) {
      return adjustChildren(_children.then, _);
    } else if (_children.elseifs.length) {
      const l = _children.elseifs.length;
      let ret = null;

      each(
        _children.elseifs,
        (elseif, i) => {
          if (elseif.condition) {
            ret = elseif.ntElseif();
            return false;
          } else if (i === l - 1) {
            ret = _children.else?.();
          }
        },
        true
      );

      return ret;
    } else {
      return _children.else?.();
    }
  },
  { alias: ['nt-if'] }
);

registerElement(
  'else',
  (_, props, ...children) => {
    return {
      ntElse() {
        return adjustChildren(children, _);
      }
    };
  },
  { alias: ['nt-else', 'empty', 'nt-empty', 'default', 'nt-default'] }
);

registerElement(
  'elseif',
  (_, props, ...children) => {
    return {
      condition: props?.condition,
      ntElseif() {
        return adjustChildren(children, _);
      }
    };
  },
  { alias: ['nt-elseif'] }
);
