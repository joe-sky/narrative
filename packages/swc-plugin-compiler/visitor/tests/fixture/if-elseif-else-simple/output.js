import React from 'react';
import { If, Else, ElseIf } from '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {props.condition === 'foo' ? <span>left-side</span> : props.condition === 'bar' ? <span>middle-side</span> : <span>right-side</span>}

    </div>;
});
