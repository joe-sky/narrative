export type H<HResult = any> = (type: any, props: Record<string, any>, ...children: any[]) => HResult;

export function bind<HResult>(h?: H<HResult>) {
  return function(type, props) {} as H<HResult>;
}

export const jsx: H = bind();
