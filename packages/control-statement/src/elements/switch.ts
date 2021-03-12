import { Children, defineElement, adjustChildren, Childrenable } from '@narrative/core';
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

function SwitchFunc<T>(props: { expression: T } & Childrenable): JSX.Element {
  return {} as JSX.Element;
}

/**
 * Narrative Element `Switch`, example:
 * ```tsx
 * <Switch expression={foo}>
 *   <Case value={1}><input /></Case>
 *   <Case value={2}><input type="button" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
export const Switch = defineElement<typeof SwitchFunc>((props, children) => {
  const _children = parseChildren(children);
  const value = props?.expression;
  const l = _children.cases.length;
  let ret = null;

  each(_children.cases, (_case, i) => {
    if (('value' in _case && value === _case.value) || (Array.isArray(_case.values) && _case.values.includes(value))) {
      ret = _case.ntCase();
      return false;
    } else if (i === l - 1) {
      ret = _children.default?.();
    }
  });

  return ret;
});

function CaseFunc<T>(props: { value: T } & Childrenable): JSX.Element;
function CaseFunc<T>(props: { values: ArrayLike<T> } & Childrenable): JSX.Element;
function CaseFunc() {
  return {} as JSX.Element;
}

/**
 * Narrative Element `Case`, example:
 * ```tsx
 * <Switch expression={foo}>
 *   <Case value={1}><input /></Case>
 *   <Case value={2}><input type="button" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
export const Case = defineElement<typeof CaseFunc>((props, children, option) => {
  const ret: { value?: any; values?: any; ntCase: Function } = {
    ntCase() {
      return adjustChildren(children, option, true);
    }
  };

  if (props?.value) {
    ret.value = props.value;
  } else if (props?.values) {
    ret.values = props.values;
  }

  return ret;
});
