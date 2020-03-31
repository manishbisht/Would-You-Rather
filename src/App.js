import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';
import {Toast, KIND } from 'baseui/toast';
import LoginContainer from "./pages/login/Container";
import {fetchUsers} from "./pages/login/ActionCreators";
import {loginAction, logoutAction} from "./pages/login/Actions";
import Header from "./components/Header";
import HomePageContainer from "./pages/home/Container";
import LeaderboardContainer from "./pages/leaderboard/Container";
import {fetchQuestions} from "./pages/home/ActionCreators";

const engine = new Styletron();

const App = () => {
    const home = useSelector(state => state.home);
    const login = useSelector(state => state.login);
    const dispatch = useDispatch();

    useEffect(() => {
        if (login.users.isFetching) {
            dispatch(fetchUsers());
        }
        if (home.questions.isFetching) {
            dispatch(fetchQuestions())
        }
    }, [dispatch, login, home]);

    const showLogin = () => {
        if (login.currentUser) {
            return (
                <div style={{position: 'fixed', top: 15, right: 15}}>
                    <Toast kind={KIND.positive} autoHideDuration={5000}>{`Welcome back ${login.currentUser ? login.currentUser.name : 'Guest'}`}</Toast>
                </div>
            )
        } else {
            return (
                <LoginContainer show={!login.currentUser}
                                usersData={login.users.data}
                                handleLogin={(user) => { dispatch(loginAction(user)) }}/>
            )
        }
    };

    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                {showLogin()}
                {login.currentUser && (
                    <div>
                        <BrowserRouter>
                            <Header currentUser={login.currentUser} handleLogout={() => { dispatch(logoutAction()) }}/>
                            <Switch>
                                {/*<Route path="/about">*/}
                                {/*    <About />*/}
                                {/*</Route>*/}
                                <Route path="/leaderboard">
                                    <LeaderboardContainer />
                                </Route>
                                <Route path="/">
                                    <HomePageContainer />
                                </Route>
                            </Switch>
                        </BrowserRouter>
                    </div>
                )}
            </BaseProvider>
        </StyletronProvider>
    );
}

export default App
