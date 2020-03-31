import {FETCH_QUESTIONS} from "./ActionTypes";

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
        default:
            return state;
    }
}

export default home;