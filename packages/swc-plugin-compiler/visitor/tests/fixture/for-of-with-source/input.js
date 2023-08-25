import React from 'react';
import { For, If } from '@narrative/control-flow';

export default props => {
  return (
    <div>
      <For of={props.list}>
        {(item, { index }, arr) => (
          <i>
            {item}
            <If when={index < arr.length - 1}> </If>
          </i>
        )}
      </For>
    </div>
  );
};
