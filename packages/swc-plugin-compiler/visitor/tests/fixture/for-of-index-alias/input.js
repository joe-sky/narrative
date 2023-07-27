import React from 'react';
import { For } from '@narrative/control-flow';

export default props => {
  return (
    <div>
      <For of={props.list}>{(item, { index: i }) => <i key={i}>{item}</i>}</For>
    </div>
  );
};
