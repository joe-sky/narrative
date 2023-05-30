import React from 'react';
import { For, Empty } from '@narrative/control-flow';

export default props => {
  return (
    <div>
      <For of={props.list}>
        {(item, { index }) => <i key={index}>{item}</i>}
        <Empty>No Data</Empty>
      </For>
    </div>
  );
};
