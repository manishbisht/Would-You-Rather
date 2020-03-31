import {_getUsers} from "../../_DATA";
import {fetchUsersSuccess, loginAction, logoutAction} from "./Actions";
import {fetchQuestions} from "../home/ActionCreators";

export const fetchUsers = () => {
    return async (dispatch) => {
        const users = await _getUsers();
        dispatch(fetchUsersSuccess(users))
    }
};

export const loginUser = (user) => {
    return async (dispatch) => {
        await dispatch(loginAction(user));
        await dispatch(fetchQuestions())
    }
};

export const logoutUser = () => {
    return async (dispatch) => {
        await dispatch(logoutAction());
    }
};