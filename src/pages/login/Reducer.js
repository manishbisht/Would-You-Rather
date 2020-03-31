import {FETCH_USERS, LOGIN_USER, LOGOUT_USER} from "./ActionTypes";

const initialState = {
    currentUser: null,
    users: {
        data: {},
        isFetching: true
    }
};

const login = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: {
                    data: action.payload,
                    isFetching: false
                },
                currentUser: state.currentUser ? action.payload[state.currentUser.id] : null
            };
        case LOGIN_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case LOGOUT_USER:
            return {
                ...state,
                currentUser: null
            };
        default:
            return state;
    }
}

export default login;