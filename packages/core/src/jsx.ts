export type H<HResult = any> = (type: any, props: Record<string, any>, ...children: any[]) => HResult;

export const tags: Record<string, any> = {};

export function bind<HResult>(h?: H<HResult>, fragment?) {
  return function(type, props, ...children) {
    const tagH = tags[type];
    if (tagH) {
      return tagH({ h, Fragment: fragment }, props, ...children);
    }

    return h && h(type, props, ...children);
  } as H<HResult>;
}

export const jsx: H = bind();
