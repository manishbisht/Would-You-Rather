import {FETCH_USERS, LOGIN_USER, LOGOUT_USER} from "./ActionTypes";

const initialState = {
    currentUser: {
        id: 'sarahedo',
        name: 'Sarah Edo',
        avatarURL: '',
        answers: {
            "8xf0y6ziyjabvozdd253nd": 'optionOne',
            "6ni6ok3ym7mf1p33lnez": 'optionTwo',
            "am8ehyc8byjqgar0jgpub9": 'optionTwo',
            "loxhs1bqm25b708cmbf3g": 'optionTwo'
        },
        questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    },
    users: {
        data: {},
        isFetching: true
    }
}

const login = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: {
                    data: action.payload,
                    isFetching: false
                }
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