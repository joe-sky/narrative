import { tags } from '../jsx';

export function registerTag(name: string, delegate: Function) {
  tags[name] = delegate;
}
