import { Childrenable } from '../utils';

/**
 * Narrative tag `If`
 * @example
 * ```tsx
 * <If when={false}><input /></If>
 * ```
 */
export declare function If<T>(props: { when: T } & Childrenable): JSX.Element;

/**
 * Narrative tag `Else`
 * @example
 * ```tsx
 * <If when={foo > 10}>
 *   <input />
 *   <Else><input type="button" /></Else>
 * </If>
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
 * ```
 */
export declare function ElseIf<T>(props: { when: T } & Childrenable): JSX.Element;
