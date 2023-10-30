import React from 'react';
import '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {props.list?.map?.((item, i)=><i key={i}>{item}</i>, this) || null}

    </div>;
});
