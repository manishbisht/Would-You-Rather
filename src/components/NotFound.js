import React from "react";
import {colors} from 'baseui/tokens';

const NotFound = () => {
    return (
        <div style={{
            position: 'fixed',
            width: '100%',
            top: 0,
            left: 0,
            background: colors.gray700,
            color: colors.white,
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h1>404</h1>
            <h1>Page Not Found</h1>
        </div>
    )
}

export default NotFound