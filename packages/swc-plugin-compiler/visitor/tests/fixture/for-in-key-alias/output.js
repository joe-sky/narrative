import React from 'react';
import '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {((__obj)=>{
        const __keys = __obj ? Object.keys(__obj) : [];
        if (__keys.length) {
            return __keys.map((k, i)=>{
                const item = __obj[k];
                return <i key={k}>

            {k}:{item}-{i}

          </i>;
            }, this);
        }
        return "No Data";
    })(props.params)}

    </div>;
});
