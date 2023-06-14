import React from 'react';
import '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {props.value === 1 ? <span>CaseBlock1</span> : [
        2,
        3,
        4
    ].includes(props.value) ? <span>CaseBlock2</span> : null}

    </div>;
});
