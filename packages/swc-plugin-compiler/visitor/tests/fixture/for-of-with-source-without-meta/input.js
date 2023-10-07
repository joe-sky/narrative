import React from 'react';
import { For, If } from '@narrative/control-flow';

export default props => {
  return (
    <div>
      <For of={props.list}>
        {(item, _, arr) => (
          <i key={item.no}>
            {item}
            <If when={item.no < arr.length - 1}> </If>
          </i>
        )}
      </For>
    </div>
  );
};
