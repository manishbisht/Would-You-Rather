import {FETCH_USERS, LOGIN_USER, LOGOUT_USER} from "./ActionTypes";

export const fetchUsersSuccess = users => ({
    type: FETCH_USERS,
    payload: users
});

export const login = (user) => ({
    type: LOGIN_USER,
    payload: user
});

export const logout = () => ({
    type: LOGOUT_USER
});