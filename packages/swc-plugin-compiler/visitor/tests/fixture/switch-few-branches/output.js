import React from 'react';
import { Switch, Case } from '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {props.value === 1 ? <span>CaseBlock1</span> : props.value === 2 ? <span>CaseBlock2</span> : null}

    </div>;
});
