import React from 'react';
import { For } from '@narrative/control-flow';

export default props => {
  return (
    <div>
      <For of={props.list}>{(item, { index }) => <i key={index}>{item}</i>}</For>
    </div>
  );
};
