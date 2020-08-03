export type Props = Record<string, any>;

export type Children = any[];

export type H<HResult = any> = (type: any, props: Props, ...children: Children) => HResult;

export interface Fragment {}

export interface DelegateProps<HResult = any, HFragment = Fragment> {
  h?: H<HResult>;
  fragment?: HFragment;
}

export interface DelegateOption {
  alias?: string[];
  [key: string]: any;
}
