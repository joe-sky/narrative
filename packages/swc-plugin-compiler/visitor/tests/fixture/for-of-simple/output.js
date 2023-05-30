import React from 'react';
import { For } from '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {props.list?.map((item, index)=><i key={index}>{item}</i>, this) || null}

    </div>;
});
