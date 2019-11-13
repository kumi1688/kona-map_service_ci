import React, {useEffect, useState} from 'react';
import InputRange from 'react-input-range';
import index from 'react-input-range/lib/css/index.css'

const InputBar = ({onRadiusChange, radius}) => {
    const [value, setValue] = useState({min: 0, max: 250});

    const onChange = (e)=>{
        onRadiusChange(e.max);
        setValue(e);
    };

    return (
        <div style={index.inputRange}>
            <InputRange
                maxValue={1500}
                minValue={0}
                value={value}
                formatLabel={value=>`${value}m`}
                onChange={onChange}/>
        </div>

    );
};

export default InputBar;
