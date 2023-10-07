import React from 'react';
import '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {props.list?.map((item, _, arr)=><i key={item.no}>

            {item}

            {item.no < arr.length - 1 ? " " : null}

          </i>, this) || null}

    </div>;
});
