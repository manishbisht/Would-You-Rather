import {FETCH_QUESTIONS} from "./ActionTypes";

export const fetchQuestionsSuccess = questions => ({
    type: FETCH_QUESTIONS,
    payload: questions
});