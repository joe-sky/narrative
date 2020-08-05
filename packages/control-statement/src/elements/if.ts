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

/**
 * Narrative Custom Element `if`, example:
 *
 * `<If condition={false}><input /></If>`
 */
export const If: (props: { condition: any }) => JSX.Element = registerElement(
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

/**
 * Narrative Custom Element `else`, example:
 *
 * `<If condition={foo > 10}><input /><Else><input type="button" /></Else></If>`
 */
export const Else: () => JSX.Element = registerElement(
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

/**
 * Narrative Custom Element `empty`, example:
 *
 * `<For of={[1, 2, 3]}>{(item, { index }) => <i key={index}>{item}</i>}<Empty>nothing</Empty></For>`
 */
export const Empty = Else;

/**
 * Narrative Custom Element `default`, example:
 *
 * `<Switch expression={foo}><Case value={1}><input /></Case><Case value={2}><input type="button" /></Case><Default>nothing</Default></Switch>`
 */
export const Default = Else;

/**
 * Narrative Custom Element `elseif`, example:
 *
 * `<If condition={foo > 10}><input /><Elseif condition={foo > 5}><input type="button" /></Elseif></If>`
 */
export const Elseif: (props: { condition: any }) => JSX.Element = registerElement(
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
