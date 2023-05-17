import React from 'react';
import { Switch, Case, Default } from '@narrative/control-flow';

export default props => {
  return (
    <div>
      <Switch value={props.value}>
        <Case is={1}>
          <span>CaseBlock1</span>
        </Case>
        <Case is={2}>
          <span>CaseBlock2</span>
        </Case>
        <Default>
          <span>DefaultBlock</span>
        </Default>
      </Switch>
    </div>
  );
};
