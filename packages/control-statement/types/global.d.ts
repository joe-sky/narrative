declare namespace JSX {
  namespace NT {
    type Children = Element | string | number | boolean | null | typeof undefined;

    interface Childrenable {
      children?: Children | Children[];
    }

    interface If extends Childrenable {
      condition: boolean | number | string;
    }

    interface Elseif extends Childrenable {
      condition: boolean | number | string;
    }

    interface Else extends Childrenable {}

    interface Switch extends Childrenable {
      value: any;
    }

    interface Case extends Childrenable {
      value: any;
    }

    interface Default extends Childrenable {}

    interface Each<T = any> extends Childrenable {
      of: Iterable<T> | string;
      item?: string;
      index?: string;
      $key?: string;
      first?: string;
      last?: string;
    }

    interface With extends Childrenable {
      [id: string]: any;
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
     * `<each of={[1, 2, 3]}><i key={index}>{item}</i></each>`
     */
    each: NT.Each;

    /**
     * Narrative Custom Element `each`, example:
     *
     * `<nt-each of={[1, 2, 3]}><i key={index}>{item}</i></nt-each>`
     */
    'nt-each': NT.Each;

    /**
     * Narrative Custom Element `empty`, example:
     *
     * `<each of={[1, 2, 3]}><i key={index}>{item}</i><empty>nothing</empty></each>`
     */
    empty: NT.Empty;

    /**
     * Narrative Custom Element `empty`, example:
     *
     * `<nt-each of={[1, 2, 3]}><i key={index}>{item}</i><nt-empty>nothing</nt-empty></nt-each>`
     */
    'nt-empty': NT.Empty;

    for: NT.Each;

    'nt-for': NT.Each;

    with: NT.With;

    'nt-with': NT.With;
  }

  interface IntrinsicAttributes {
    children?: NT.Children | NT.Children[];

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
