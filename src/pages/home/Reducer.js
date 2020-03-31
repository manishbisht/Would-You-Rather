import {FETCH_QUESTIONS} from "./ActionTypes";
import {ADD_QUESTION} from "../add/ActionTypes";

const initialState = {
    questions: {
        data: {},
        isFetching: true
    }
};

const home = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_QUESTIONS:
            return {
                ...state,
                questions: {
                    data: action.payload,
                    isFetching: false
                }
            };
        case ADD_QUESTION:
            return {
                ...state
            };
        default:
            return state;
    }
}

export default home;