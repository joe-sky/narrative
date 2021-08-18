import { Childrenable } from '../utils';

/**
 * Narrative tag `Switch`, example:
 * ```tsx
 * <Switch expr={foo}>
 *   <Case value={1}><input /></Case>
 *   <Case value={2}><input type="button" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
export declare function Switch<T>(props: { expr: T } & Childrenable): JSX.Element;

/**
 * Narrative tag `Case`, example:
 * ```tsx
 * <Switch expr={foo}>
 *   <Case value={1}><input /></Case>
 *   <Case value={2}><input type="button" /></Case>
 *   <Case values={[3, 4, 5]}><input type="radio" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
export declare function Case<T>(props: { value: T } & Childrenable): JSX.Element;
export declare function Case<T>(props: { values: ArrayLike<T> } & Childrenable): JSX.Element;

/**
 * Narrative tag `Default`, example:
 * ```tsx
 * <Switch expr={foo}>
 *   <Case value={1}><input /></Case>
 *   <Case value={2}><input type="button" /></Case>
 *   <Default>nothing</Default>
 * </Switch>
 * ```
 */
export declare function Default(props: Childrenable): JSX.Element;
