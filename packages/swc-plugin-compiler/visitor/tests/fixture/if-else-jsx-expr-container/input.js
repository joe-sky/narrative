import React from 'react';
import { If, Else } from '@narrative/control-flow';

export default props => {
  return (
    <div>
      <If when={props.condition === 'foo'}>
        {<span>left-side</span>}
        <Else>{<span>right-side</span>}</Else>
      </If>
    </div>
  );
};
