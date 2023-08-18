import { Childrenable } from '../utils';

/**
 * Narrative tag `If`
 * @example
 * ```tsx
 * <If when={foo > 0}><input /></If>
 *
 * Compiled ↓ ↓ ↓ ↓ ↓ ↓
 *
 * foo > 0 ? <input /> : null
 * ```
 */
export declare function If<T>(props: { when: T } & Childrenable): JSX.Element;

/**
 * Narrative tag `Else`
 * @example
 * ```tsx
 * <If when={foo > 0}>
 *   <input />
 *   <Else><input type="button" /></Else>
 * </If>
 *
 * Compiled ↓ ↓ ↓ ↓ ↓ ↓
 *
 * foo > 0 ? <input /> : <input type="button" />
 * ```
 */
export declare function Else(props: Childrenable): JSX.Element;

/**
 * Narrative tag `ElseIf`
 * @example
 * ```tsx
 * <If when={foo > 10}>
 *   <input />
 *   <ElseIf when={foo > 5}><input type="button" /></ElseIf>
 *   <Else><input type="radio" /></Else>
 * </If>
 *
 * Compiled ↓ ↓ ↓ ↓ ↓ ↓
 *
 * foo > 10 ? <input /> : foo > 5 ? <input type="button" /> : <input type="radio" />
 * ```
 */
export declare function ElseIf<T>(props: { when: T } & Childrenable): JSX.Element;
