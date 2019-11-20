import React, {useEffect} from 'react'
import { useAlert } from 'react-alert'

const AlertComponent = ({text}) => {
    const alert = useAlert();

    useEffect(() =>{
       alert.show(text);
    }, []);

    return null;
};


export default AlertComponent;
