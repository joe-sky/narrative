import { Children, defineElement, adjustChildren } from '@narrative/core';
import { each } from '../utils';

interface ParseChildrenResult {
  then: Children;
  else: any;
  elseIfs: Children;
}

function parseChildren(children: Children) {
  const ret: ParseChildrenResult = { then: [], else: null, elseIfs: [] };
  children.forEach(child => {
    if (child?.ntElse) {
      ret.else = child.ntElse;
    } else if (child?.ntElseIf) {
      ret.elseIfs.push(child);
    } else {
      ret.then.push(child);
    }
  });

  return ret;
}

/**
 * Narrative Element `If`, example:
 *
 * `<If condition={false}><input /></If>`
 */
export const If = defineElement<{ condition: any }>((props, children, option) => {
  const _children = parseChildren(children);
  if (props?.condition) {
    return adjustChildren(_children.then, option, true);
  } else if (_children.elseIfs.length) {
    const l = _children.elseIfs.length;
    let ret = null;

    each(_children.elseIfs, (elseIf, i) => {
      if (elseIf.condition) {
        ret = elseIf.ntElseIf();
        return false;
      } else if (i === l - 1) {
        ret = _children.else?.();
      }
    });

    return ret;
  } else {
    return _children.else?.();
  }
});

/**
 * Narrative Element `Else`, example:
 *
 * `<If condition={foo > 10}><input /><Else><input type="button" /></Else></If>`
 */
export const Else = defineElement((props, children, option) => {
  return {
    ntElse() {
      return adjustChildren(children, option, true);
    }
  };
});

/**
 * Narrative Element `Empty`, example:
 *
 * `<For of={[1, 2, 3]}>{(item, { index }) => <i key={index}>{item}</i>}<Empty>nothing</Empty></For>`
 */
export const Empty = Else;

/**
 * Narrative Element `Default`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
export const Default = Else;

/**
 * Narrative Element `ElseIf`, example:
 *
 * `<If condition={foo > 10}><input /><ElseIf condition={foo > 5}><input type="button" /></ElseIf></If>`
 */
export const ElseIf = defineElement<{ condition: any }>((props, children, option) => {
  return {
    condition: props?.condition,
    ntElseIf() {
      return adjustChildren(children, option, true);
    }
  };
});
