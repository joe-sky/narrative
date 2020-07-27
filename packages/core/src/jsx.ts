export type H = (type: any, props: Record<string, any>, ...children: any[]) => any;

let createElement: H;

export function bind(h: H) {
  createElement = h;
}

export const jsx: H = function(type, props) {};
