import {_getQuestions} from "../../_DATA";
import {fetchQuestionsSuccess} from "./Actions";

export const fetchQuestions = () => {
    return async (dispatch) => {
        const questions = await _getQuestions();
        dispatch(fetchQuestionsSuccess(questions))
    }
};