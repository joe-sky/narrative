import React from 'react';
import '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {((__obj)=>{
        const __keys = __obj ? Object.keys(__obj) : [];
        if (__keys.length) {
            return __keys.map((key, index)=>{
                const item = __obj[key];
                return <i key={key}>

              {key}:{item}-{index}

            </i>;
            }, this);
        }
        return "No Data";
    })(props.params)}

    </div>;
});
