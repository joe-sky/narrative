import React from 'react';
import '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {props.condition === 'foo' ? <span>left-side</span> : props.condition === 'bar' ? <span>middle-side</span> : <span>right-side</span>}

    </div>;
});
