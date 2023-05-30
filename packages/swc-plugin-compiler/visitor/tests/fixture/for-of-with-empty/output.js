import React from 'react';
import { For, Empty } from '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {((__arr)=>{
        if (__arr?.length) {
            return __arr.map((item, index)=><i key={index}>{item}</i>, this);
        }
        return "No Data";
    })(props.list)}

    </div>;
});
