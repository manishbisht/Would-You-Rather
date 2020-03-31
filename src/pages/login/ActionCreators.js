import {_getUsers} from "../../_DATA";
import {fetchUsersSuccess} from "./Actions";

export const fetchUsers = () => {
    return async (dispatch) => {
        const users = await _getUsers();
        dispatch(fetchUsersSuccess(users))
    }
};