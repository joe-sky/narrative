export const NT_CONTROL_FLOW = '@narrative/control-flow';

export function as<R, T = any>(value: T): R {
  return (value as T | R) as R;
}
