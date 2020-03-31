import {ADD_QUESTION} from "./ActionTypes";

export const fetchQuestionsSuccess = questions => ({
    type: ADD_QUESTION,
    payload: questions
});