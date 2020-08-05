import { Children, registerElement, adjustChildren } from '@narrative/core';
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
 * Narrative Custom Element `switch`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
export const Switch: (props: { expression: any }) => JSX.Element = registerElement(
  'nt-switch',
  (_, props, ...children) => {
    const _children = parseChildren(children);
    const value = props?.expression;
    const l = _children.cases.length;
    let ret = null;

    each(
      _children.cases,
      (_case, i) => {
        if (value === _case.value) {
          ret = _case.ntCase();
          return false;
        } else if (i === l - 1) {
          ret = _children.default?.();
        }
      },
      true
    );

    return ret;
  }
);

/**
 * Narrative Custom Element `case`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
export const Case: (props: { value: any }) => JSX.Element = registerElement(
  'case',
  (_, props, ...children) => {
    return {
      value: props?.value,
      ntCase() {
        return adjustChildren(children, _);
      }
    };
  },
  { alias: ['nt-case'] }
);