import { Childrenable } from '../utils';

/**
 * Narrative tag `Switch`
 * @example
 * ```tsx
 * <Switch value={foo}>
 *   <Case is={1}><input /></Case>
 *   <Case is={2}><input type="button" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
export declare function Switch<T>(props: { value: T } & Childrenable): JSX.Element;

/**
 * Narrative tag `Case`
 * @example
 * ```tsx
 * <Switch value={foo}>
 *   <Case is={1}><input /></Case>
 *   <Case is={2}><input type="button" /></Case>
 *   <Case in={[3, 4, 5]}><input type="radio" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
export declare function Case<T>(props: { is: T } & Childrenable): JSX.Element;
export declare function Case<T>(props: { in: ArrayLike<T> } & Childrenable): JSX.Element;

/**
 * Narrative tag `Default`
 * @example
 * ```tsx
 * <Switch value={foo}>
 *   <Case is={1}><input /></Case>
 *   <Case is={2}><input type="button" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
export declare function Default(props: Childrenable): JSX.Element;
