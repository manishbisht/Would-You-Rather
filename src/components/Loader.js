import React from "react";
import {colors} from 'baseui/tokens';
import './loaderStyle.css'

const Loader = ({message = "Please wait"}) => {
    return (
        <div style={{position: 'fixed', width: '100%', top: 0, left: 0, background: colors.gray700, height: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
            <h2 style={{color: colors.white}}>{message}</h2>
        </div>
    )
};

export default Loader