import React from 'react';
import '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {props.list?.map((item, index, arr)=><i>

            {item}

            {index < arr.length - 1 ? " " : null}

          </i>, this) || null}

    </div>;
});
