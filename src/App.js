import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';
import {Toast, KIND } from 'baseui/toast';
import LoginContainer from "./pages/login/Container";
import {fetchUsers, loginUser, logoutUser} from "./pages/login/ActionCreators";
import Header from "./components/Header";
import HomePageContainer from "./pages/home/Container";
import LeaderboardContainer from "./pages/leaderboard/Container";
import AddQuestionContainer from "./pages/add/Container";
import QuestionContainer from "./pages/question/Container";
import Loader from "./components/Loader";
import NotFound from "./components/NotFound";

const engine = new Styletron();

const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const login = useSelector(state => state.login);
    const dispatch = useDispatch();

    const fetchUsersList = useCallback(async () => {
        setIsLoading(true);
        await dispatch(fetchUsers());
        setIsLoading(false);
    }, [dispatch]);

    useEffect( () => {
        fetchUsersList()
    }, [fetchUsersList]);

    const handleLogin = async (user) => {
        setIsLoading(true);
        await dispatch(loginUser(user));
        setIsLoading(false);
    };

    const handleLogout = async () => {
        setIsLoading(true);
        await dispatch(logoutUser());
        window.location.replace('/');
        setIsLoading(false);
    };

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
                                handleLogin={(user) => handleLogin(user)}/>
            )
        }
    };

    if (isLoading) {
        return <Loader />
    }

    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                {showLogin()}
                {login.currentUser && (
                    <div>
                        <BrowserRouter>
                            <Header currentUser={login.currentUser} handleLogout={() => handleLogout()}/>
                            <Switch>
                                <Route path="/questions/:questionId" exact>
                                    <QuestionContainer />
                                </Route>
                                <Route path="/add" exact>
                                    <AddQuestionContainer />
                                </Route>
                                <Route path="/leaderboard" exact>
                                    <LeaderboardContainer />
                                </Route>
                                <Route path="/" exact>
                                    <HomePageContainer />
                                </Route>
                                <Route path="/">
                                    <NotFound />
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
