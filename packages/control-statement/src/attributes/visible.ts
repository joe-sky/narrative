import { defineAttribute, renderPrevAttr } from '@narrative/core';

/**
 * Narrative Attribute `visible`, example:
 * ```tsx
 * <input {...visible(false)} />
 * ```
 */
export const visible = defineAttribute<boolean>((props, children, option) => {
  const { args } = option;
  if (!args?.[0]) {
    if (!props.style) {
      props.style = {};
    }

    if (Array.isArray(props.style)) {
      props.style.push({ display: 'none' });
    } else {
      props.style.display = 'none';
    }
  }

  return renderPrevAttr(props, children, option);
});
