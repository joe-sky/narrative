import React from 'react';
import { If, Else, ElseIf } from '@narrative/control-flow';

export default props => {
  return (
    <div>
      <If when={props.condition === 'foo'}>
        <span>left-side</span>
        <ElseIf when={props.condition === 'bar'}>
          <span>middle-side</span>
        </ElseIf>
        <Else>
          <span>right-side</span>
        </Else>
      </If>
    </div>
  );
};
