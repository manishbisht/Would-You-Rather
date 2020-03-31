import React from "react";
import { Button, KIND } from "baseui/button";
import { Tabs, Tab } from "baseui/tabs";
import {colors} from 'baseui/tokens';
import { useHistory} from "react-router-dom";

const Header = ({currentUser = null, handleLogout = () => {}}) => {
    const history = useHistory();

    const getDefaultActiveKey = () => {
        switch (history.location.pathname) {
            case "/":
                return "0";
            case "/leaderboard":
                return "1";
            case "/add":
                return "2";
            default:
                return "0";
        }
    };

    const [activeKey, setActiveKey] = React.useState(getDefaultActiveKey());

    const onTabChange = (activeKey) => {
        setActiveKey(activeKey);
        switch(activeKey) {
            case "0":
                history.push('/');
                break;
            case "1":
                history.push('/leaderboard');
                break;
            case "2":
                history.push('/add');
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <header style={{background: colors.gray700, color: colors.white, display: 'flex', alignItems: 'center', padding: 17}}>
                <div style={{flexGrow: 1}}><h1 style={{margin: 0, padding: 0}}>Would You Rather</h1></div>
                <div style={{padding: "0 17px"}}><h4>{`Hi ${currentUser ? currentUser.name : 'Guest'}`}</h4></div>
                <div><Button onClick={() => handleLogout()} kind={KIND.secondary}>Logout</Button></div>
            </header>
            <Tabs onChange={({ activeKey }) => onTabChange(activeKey)} activeKey={activeKey}>
                <Tab title="Home"></Tab>
                <Tab title="Leaderboard"></Tab>
                <Tab title="Add New Poll"></Tab>
            </Tabs>
        </div>
    )
}

export default Header