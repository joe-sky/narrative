import React from 'react';
import '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {props.value === "1" ? <span>CaseBlock1</span> : props.value === "2" ? <span>CaseBlock2</span> : [
        '3',
        '4',
        '5'
    ].includes(props.value) ? <span>CaseBlock3</span> : null}

    </div>;
});
