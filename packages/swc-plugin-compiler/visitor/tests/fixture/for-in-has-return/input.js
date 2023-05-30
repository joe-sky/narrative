import React from 'react';
import { For, Empty } from '@narrative/control-flow';

export default props => {
  return (
    <div>
      <For in={props.params}>
        {(item, { key, index }) => {
          return (
            <i key={key}>
              {key}:{item}-{index}
            </i>
          );
        }}
        <Empty>No Data</Empty>
      </For>
    </div>
  );
};
