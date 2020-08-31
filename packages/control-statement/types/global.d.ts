declare namespace JSX {
  namespace NT {
    interface If extends Narrative.Childrenable {
      condition: any;
    }

    interface ElseIf extends Narrative.Childrenable {
      condition: any;
    }

    interface Else extends Narrative.Childrenable {}

    interface Switch extends Narrative.Childrenable {
      expression: any;
    }

    interface Case extends Narrative.Childrenable {
      value: any;
    }

    interface Default extends Narrative.Childrenable {}

    interface For<T = any> {
      of: Iterable<T> | ArrayLike<T> | null | undefined;
      children:
        | NtControlStatement.ForCallback<T, number>
        | (NtControlStatement.ForCallback<T, number> | Narrative.JSXNode)[];
    }

    interface Empty extends Narrative.Childrenable {}
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
    elseif: NT.ElseIf;

    /**
     * Narrative Custom Element `elseif`, example:
     *
     * `<nt-if condition={foo > 10}><input /><nt-elseif condition={foo > 5}><input type="button" /></nt-elseif></nt-if>`
     */
    'nt-elseif': NT.ElseIf;

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
     * Narrative Custom Element `switch`, example:
     *
     * `<nt-switch expression={foo}><nt-case value={1}><input /></nt-case><nt-case value={2}><input type="button" /></nt-case><nt-default>nothing</nt-default></nt-switch>`
     */
    'nt-switch': NT.Switch;

    /**
     * Narrative Custom Element `case`, example:
     *
     * `<switch expression={foo}><case value={1}><input /></case><case value={2}><input type="button" /></case><default>nothing</default></switch>`
     */
    case: NT.Case;

    /**
     * Narrative Custom Element `case`, example:
     *
     * `<nt-switch expression={foo}><nt-case value={1}><input /></nt-case><nt-case value={2}><input type="button" /></nt-case><nt-default>nothing</nt-default></nt-switch>`
     */
    'nt-case': NT.Case;

    /**
     * Narrative Custom Element `default`, example:
     *
     * `<switch expression={foo}><case value={1}><input /></case><case value={2}><input type="button" /></case><default>nothing</default></switch>`
     */
    default: NT.Default;

    /**
     * Narrative Custom Element `default`, example:
     *
     * `<nt-switch expression={foo}><nt-case value={1}><input /></nt-case><nt-case value={2}><input type="button" /></nt-case><n-default>nothing</nt-default></nt-switch>`
     */
    'nt-default': NT.Default;

    /**
     * Narrative Custom Element `for`, example:
     *
     * `<for of={[1, 2, 3]}>{(item, { index }) => <i key={index}>{item}</i>}</for>`
     */
    for: NT.For;

    /**
     * Narrative Custom Element `for`, example:
     *
     * `<nt-for of={[1, 2, 3]}>{(item, { index }) => <i key={index}>{item}</i>}</nt-for>`
     */
    'nt-for': NT.For;

    /**
     * Narrative Custom Element `empty`, example:
     *
     * `<for of={[1, 2, 3]}>{(item, { index }) => <i key={index}>{item}</i>}<empty>nothing</empty></for>`
     */
    empty: NT.Empty;

    /**
     * Narrative Custom Element `empty`, example:
     *
     * `<nt-for of={[1, 2, 3]}>{(item, { index }) => <i key={index}>{item}</i>}<nt-empty>nothing</nt-empty></nt-for>`
     */
    'nt-empty': NT.Empty;

    /**
     * Narrative Custom Element `each`, example:
     *
     * `<each of={[1, 2, 3]}>{(item, { index }) => <i key={index}>{item}</i>}</each>`
     */
    each: NT.For;

    /**
     * Narrative Custom Element `each`, example:
     *
     * `<nt-each of={[1, 2, 3]}>{(item, { index }) => <i key={index}>{item}</i>}</nt-each>`
     */
    'nt-each': NT.For;
  }

  interface IntrinsicAttributes {
    /**
     * Narrative Spread Attribute sign, for detection.
     */
    __nt__?: boolean;
  }
}

declare module '@narrative/control-statement/lib/*';
