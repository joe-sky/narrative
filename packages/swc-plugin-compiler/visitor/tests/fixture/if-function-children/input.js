import React from 'react';
import { If, Else, ElseIf } from '@narrative/control-flow';

export default props => {
  return (
    <div>
      <If when={props.condition === 'foo'}>
        {() => <i>test1</i>}
        <ElseIf when={props.condition === 'bar'}>{() => <i>test2</i>}</ElseIf>
        <Else>
          {() => {
            const title = 'test3';

            return <i title={title}>test3</i>;
          }}
        </Else>
      </If>
    </div>
  );
};
