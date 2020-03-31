import React from "react";
import { Button, KIND } from "baseui/button";
import {colors} from 'baseui/tokens';

const Header = ({currentUser = null, handleLogout = () => {}}) => {
    return (
        <header style={{background: colors.gray700, color: colors.white, display: 'flex', alignItems: 'center', padding: 17}}>
            <div style={{flexGrow: 1}}><h1 style={{margin: 0, padding: 0}}>Would You Rather</h1></div>
            <div style={{padding: "0 17px"}}><h4>{`Hi ${currentUser ? currentUser.name : 'Guest'}`}</h4></div>
            <div><Button onClick={() => handleLogout()} kind={KIND.secondary}>Logout</Button></div>
        </header>
    )
}

export default Header