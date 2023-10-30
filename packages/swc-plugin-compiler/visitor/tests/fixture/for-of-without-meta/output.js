import React from 'react';
import '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {props.list?.map?.((item)=><i key={item.id}>{item}</i>, this) || null}

    </div>;
});
