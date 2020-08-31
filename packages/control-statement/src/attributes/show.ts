import { registerAttribute, renderPrevAttr } from '@narrative/core';

/**
 * Narrative Custom Attribute `show`, example:
 *
 * `<input {...show(false)} />`
 */
export const show = registerAttribute<boolean>('ntShow', (props, children, option) => {
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
