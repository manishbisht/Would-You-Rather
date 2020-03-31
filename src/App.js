import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';
import {Toast, KIND } from 'baseui/toast';
import {colors} from 'baseui/tokens';
import LoginContainer from "./pages/login/Container";
import {fetchUsers} from "./pages/login/ActionCreators";
import {login, logout} from "./pages/login/Actions";
import Header from "./components/Header";

const engine = new Styletron();

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(colors)
    }

    handleLogin(user) {
        const {dispatch} = this.props;
        dispatch(login(user))
    }

    handleLogout() {
        const {dispatch} = this.props;
        dispatch(logout())
    }

    showLogin() {
        const {login, dispatch} = this.props;

        if (login.currentUser) {
            return (
                <div style={{position: 'fixed', top: 15, right: 15}}>
                    <Toast kind={KIND.positive} autoHideDuration={5000}>{`Welcome back ${login.currentUser ? login.currentUser.name : 'Guest'}`}</Toast>
                </div>
            )
        } else {
            if (login.users.isFetching) {
                dispatch(fetchUsers());
            }
            return (
                <LoginContainer show={!login.currentUser}
                                usersData={login.users.data}
                                handleLogin={(a) => this.handleLogin(a)}/>
            )
        }
    }

    render() {
        const {login} = this.props;

        return (
            <StyletronProvider value={engine}>
                <BaseProvider theme={LightTheme}>
                        {this.showLogin()}
                        {login.currentUser && (
                            <div>
                                <Header currentUser={login.currentUser} handleLogout={() => this.handleLogout()}/>
                                <BrowserRouter>
                                    <Switch>
                                        {/*<Route path="/about">*/}
                                        {/*    <About />*/}
                                        {/*</Route>*/}
                                        {/*<Route path="/users">*/}
                                        {/*    <Users />*/}
                                        {/*</Route>*/}
                                        {/*<Route path="/">*/}
                                        {/*    <Home />*/}
                                        {/*</Route>*/}
                                    </Switch>
                                </BrowserRouter>
                            </div>
                        )}
                </BaseProvider>
            </StyletronProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
};

export default connect(mapStateToProps)(App);
