import React from 'react';
import { For } from '@narrative/control-flow';

export default props => {
  return (
    <div>
      <For of={props.list}>{item => <i key={item.id}>{item}</i>}</For>
    </div>
  );
};
