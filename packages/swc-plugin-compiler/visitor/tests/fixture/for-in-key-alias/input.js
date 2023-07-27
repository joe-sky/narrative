import React from 'react';
import { For, Empty } from '@narrative/control-flow';

export default props => {
  return (
    <div>
      <For in={props.params}>
        {(item, { key: k, index: i }) => (
          <i key={k}>
            {k}:{item}-{i}
          </i>
        )}
        <Empty>No Data</Empty>
      </For>
    </div>
  );
};
