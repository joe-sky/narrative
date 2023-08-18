import type { NodePath } from '@babel/core';

export function displayError(path: NodePath, message: string) {
  let error: Error;
  try {
    error = path.buildCodeFrameError(message);
  } catch {
    error = new Error(message);
  }

  throw error;
}

export const NT_CONTROL_FLOW = '@narrative/control-flow';

export const IF = 'If';

export const SWITCH = 'Switch';

export const FOR = 'For';

export const SUB_TAGS_IF = {
  ELSE_IF: 'ElseIf',
  ELSE: 'Else'
};

export const ATTRS_IF = {
  WHEN: 'when'
};

export const SUB_TAGS_SWITCH = {
  CASE: 'Case',
  DEFAULT: 'Default'
};

export const ATTRS_SWITCH = {
  VALUE: 'value',
  IS: 'is',
  IN: 'in'
};

export const SUB_TAGS_FOR = {
  /**
   * ```tsx
   * <div>
   *   <For of={[1, 2, 3]}>
   *     {(item, { index, isFirst, isLast }) => <i key={index}>{item}</i>}
   *     <Empty>No Data</Empty>
   *   </For>
   * </div>
   *
   * Compiled ↓ ↓ ↓ ↓ ↓ ↓
   *
   * <div>
   *   {(__arr => {
   *     if (__arr?.length) {
   *       return __arr.map((item, index, arr) => {
   *         const length = arr.length;
   *         const isFirst = index === 0;
   *         const isLast = index === length - 1;
   *         return <i key={index}>{item}</i>;
   *       }, this);
   *     }
   *
   *     return 'No Data';
   *   })([1, 2, 3])}
   * </div>
   * ```
   */
  EMPTY: 'Empty'
};

export const ATTRS_FOR = {
  /**
   * ```tsx
   * <div>
   *   <For of={[1, 2, 3]}>
   *     {(item, { index, isFirst, isLast }) => <i key={index}>{item}</i>}
   *   </For>
   * </div>
   *
   * Compiled ↓ ↓ ↓ ↓ ↓ ↓
   *
   * <div>
   *   {[1, 2, 3]?.map((item, index, arr) => {
   *     const length = arr.length;
   *     const isFirst = index === 0;
   *     const isLast = index === length - 1;
   *     return <i key={index}>{item}</i>;
   *   }, this) || null}
   * </div>
   * ```
   */
  OF: 'of',

  /**
   * ```tsx
   * <div>
   *   <For in={{ a: 1, b: 2, c: 3 }}>
   *     {(item, { key }) => <i key={key}>{item}</i>}
   *     <Empty>No Data</Empty>
   *   </For>
   * </div>
   *
   * Compiled ↓ ↓ ↓ ↓ ↓ ↓
   *
   * <div>
   *   {(__obj => {
   *     const __keys = __obj ? Object.keys(__obj) : [];
   *
   *     if (__keys.length) {
   *       return __keys.map((key, index, arr) => {
   *         const item = __obj[key];
   *         const length = arr.length;
   *         const isFirst = index === 0;
   *         const isLast = index === length - 1;
   *         return <i key={key}>{item}</i>;
   *       }, this);
   *     }
   *
   *     return 'No Data';
   *   })({ a: 1, b: 2, c: 3 })}
   * </div>
   * ```
   */
  IN: 'in'
};

export const ARR_PARAM = '__arr';

export const OBJ_PARAM = '__obj';

export const KEYS_PARAM = '__keys';
