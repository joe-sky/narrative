import { Children, Childrenable, registerElement, adjustChildren } from '@narrative/core';
import { each } from '../utils';

interface ParseChildrenResult {
  default: any;
  cases: Children;
}

function parseChildren(children: Children) {
  const ret: ParseChildrenResult = { default: null, cases: [] };
  children.forEach(child => {
    if (child?.ntElse) {
      ret.default = child.ntElse;
    } else if (child?.ntCase) {
      ret.cases.push(child);
    }
  });

  return ret;
}

/**
 * Narrative Custom Element `Switch`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
export const Switch = registerElement<(props: { expression: any } & Childrenable) => JSX.Element>(
  'nt-switch',
  (props, children) => {
    const _children = parseChildren(children);
    const value = props?.expression;
    const l = _children.cases.length;
    let ret = null;

    each(_children.cases, (_case, i) => {
      if (value === _case.value) {
        ret = _case.ntCase();
        return false;
      } else if (i === l - 1) {
        ret = _children.default?.();
      }
    });

    return ret;
  }
);

/**
 * Narrative Custom Element `Case`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
export const Case = registerElement<(props: { value: any } & Childrenable) => JSX.Element>(
  'case',
  (props, children, option) => {
    return {
      value: props?.value,
      ntCase() {
        return adjustChildren(children, option, true);
      }
    };
  },
  { alias: ['nt-case'] }
);
