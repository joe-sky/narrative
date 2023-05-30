import React from 'react';
import { If, Else, ElseIf } from '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {props.condition === 'foo' ? (()=><i>test1</i>)() : props.condition === 'bar' ? (()=><i>test2</i>)() : (()=>{
        const title = 'test3';
        return <i title={title}>test3</i>;
    })()}

    </div>;
});
