import React from 'react';
import { Switch, Case } from '@narrative/control-flow';

export default props => {
  return (
    <div>
      <Switch value={props.value}>
        <Case is="1">
          <span>CaseBlock1</span>
        </Case>
        <Case is="2">
          <span>CaseBlock2</span>
        </Case>
        <Case in={['3', '4', '5']}>
          <span>CaseBlock3</span>
        </Case>
      </Switch>
    </div>
  );
};
