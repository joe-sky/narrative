import React from 'react';
import { For } from '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {props.condition === 'foo' ? <span>left-side</span> : <span>right-side</span>}

    </div>;
});
