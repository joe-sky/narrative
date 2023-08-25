import React from 'react';
import { For, Empty, If } from '@narrative/control-flow';

export default props => {
  return (
    <div>
      <For in={props.params}>
        {(item, { key, index }, obj) => (
          <i key={key}>
            {item}
            <If when={index < Object.keys(obj).length - 1}> </If>
          </i>
        )}
        <Empty>no data</Empty>
      </For>
    </div>
  );
};
