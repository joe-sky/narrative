import { AttributeDelegate, DelegateOption, AttributeOption, Props, Children, Fragment } from '../interface';

export const attributes: Map<string, AttributeDelegate> = new Map();
export const attributeOptions: Map<AttributeDelegate, AttributeOption> = new Map();

export type AttributeResult<Arg1 = any, Arg2 = any, Arg3 = any, Arg4 = any, Arg5 = any> = (
  arg1?: Arg1,
  arg2?: Arg2,
  arg3?: Arg3,
  arg4?: Arg4,
  arg5?: Arg5,
  ...args: any[]
) => {
  __nt__: true;
  [name: string]: any;
};

export function registerAttribute<
  Arg1 = any,
  Arg2 = any,
  Arg3 = any,
  Arg4 = any,
  Arg5 = any,
  HResult = any,
  HFragment = Fragment
>(
  name: string,
  delegate: AttributeDelegate<HResult, HFragment>,
  options: AttributeOption = {}
): AttributeResult<Arg1, Arg2, Arg3, Arg4, Arg5> {
  attributes.set(name, delegate);
  attributeOptions.set(delegate, options);

  return (...args) => ({
    __nt__: true,
    [name]: args
  });
}
