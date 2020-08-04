declare namespace JSX {
  namespace NT {
    interface Childrenable {
      children?: Narrative.JSXChild;
    }

    interface If extends Childrenable {
      condition: boolean | number | string;
    }

    interface Elseif extends Childrenable {
      condition: boolean | number | string;
    }

    interface Else extends Childrenable {}

    interface Switch extends Childrenable {
      expression: any;
    }

    interface Case extends Childrenable {
      value: any;
    }

    interface Default extends Childrenable {}

    interface For<T = any> {
      of: Iterable<T> | ArrayLike<T> | null | undefined;
      children:
        | NtControlStatement.ForCallback<T, number>
        | (NtControlStatement.ForCallback<T, number> | Narrative.JSXNode)[];
    }

    interface Empty extends Childrenable {}
  }

  interface IntrinsicElements {
    /**
     * Narrative Custom Element `if`, example:
     *
     * `<if condition={false}><input /></if>`
     */
    if: NT.If;

    /**
     * Narrative Custom Element `if`, example:
     *
     * `<nt-if condition={false}><input /></nt-if>`
     */
    'nt-if': NT.If;

    /**
     * Narrative Custom Element `elseif`, example:
     *
     * `<if condition={foo > 10}><input /><elseif condition={foo > 5}><input type="button" /></elseif></if>`
     */
    elseif: NT.Elseif;

    /**
     * Narrative Custom Element `elseif`, example:
     *
     * `<nt-if condition={foo > 10}><input /><nt-elseif condition={foo > 5}><input type="button" /></nt-elseif></nt-if>`
     */
    'nt-elseif': NT.Elseif;

    /**
     * Narrative Custom Element `else`, example:
     *
     * `<if condition={foo > 10}><input /><else><input type="button" /></else></if>`
     */
    else: NT.Else;

    /**
     * Narrative Custom Element `else`, example:
     *
     * `<nt-if condition={foo > 10}><input /><nt-else><input type="button" /></nt-else></nt-if>`
     */
    'nt-else': NT.Else;

    /**
     * Narrative Custom Element `Switch`, example:
     *
     * `<nt-switch value={foo}><nt-case value={1}><input /></nt-case><nt-case value={2}><input type="button" /></nt-case><nt-default>nothing</nt-default></nt-switch>`
     */
    'nt-switch': NT.Switch;

    /**
     * Narrative Custom Element `case`, example:
     *
     * `<switch value={foo}><case value={1}><input /></case><case value={2}><input type="button" /></case><default>nothing</default></switch>`
     */
    case: NT.Case;

    /**
     * Narrative Custom Element `case`, example:
     *
     * `<nt-switch value={foo}><nt-case value={1}><input /></nt-case><nt-case value={2}><input type="button" /></nt-case><nt-default>nothing</nt-default></nt-switch>`
     */
    'nt-case': NT.Case;

    /**
     * Narrative Custom Element `default`, example:
     *
     * `<switch value={foo}><case value={1}><input /></case><case value={2}><input type="button" /></case><default>nothing</default></switch>`
     */
    default: NT.Default;

    /**
     * Narrative Custom Element `default`, example:
     *
     * `<nt-switch value={foo}><nt-case value={1}><input /></nt-case><nt-case value={2}><input type="button" /></nt-case><n-default>nothing</nt-default></nt-switch>`
     */
    'nt-default': NT.Default;

    /**
     * Narrative Custom Element `each`, example:
     *
     * `<for of={[1, 2, 3]}><i key={index}>{item}</i></for>`
     */
    for: NT.For;

    /**
     * Narrative Custom Element `each`, example:
     *
     * `<nt-for of={[1, 2, 3]}><i key={index}>{item}</i></nt-for>`
     */
    'nt-for': NT.For;

    /**
     * Narrative Custom Element `empty`, example:
     *
     * `<for of={[1, 2, 3]}><i key={index}>{item}</i><empty>nothing</empty></for>`
     */
    empty: NT.Empty;

    /**
     * Narrative Custom Element `empty`, example:
     *
     * `<nt-for of={[1, 2, 3]}><i key={index}>{item}</i><nt-empty>nothing</nt-empty></nt-for>`
     */
    'nt-empty': NT.Empty;

    each: NT.For;

    'nt-each': NT.For;
  }

  interface IntrinsicAttributes {
    children?: Narrative.JSXChild;

    /**
     * Narrative Custom Attribute `ntShow`, example:
     *
     * `<input ntShow={false} />`
     */
    ['ntShow']?: boolean | number | string;

    /**
     * Narrative Custom Attribute `ntDebounce`, example:
     *
     * `<input ntDebounce={200} />`
     */
    ['ntDebounce']?: number | string;
  }
}

declare module '@narrative/control-statement/lib/*';
