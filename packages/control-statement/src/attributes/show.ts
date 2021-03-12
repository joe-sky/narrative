import { defineAttribute, renderPrevAttr } from '@narrative/core';

/**
 * Narrative Attribute `show`, example:
 * ```tsx
 * <input {...show(false)} />
 * ```
 */
export const show = defineAttribute<boolean>((props, children, option) => {
  const { args } = option;
  if (!args?.[0]) {
    return null;
  }

  return renderPrevAttr(props, children, option);
});
