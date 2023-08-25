import React from 'react';
import '@narrative/control-flow';
export default ((props)=>{
    return <div>

      {((__obj)=>{
        const __keys = __obj ? Object.keys(__obj) : [];
        if (__keys.length) {
            return __keys.map((key, index)=>{
                const item = __obj[key];
                const obj = __obj;
                return <i key={key}>

            {item}

            {index < Object.keys(obj).length - 1 ? " " : null}

          </i>;
            }, this);
        }
        return "no data";
    })(props.params)}

    </div>;
});
