import {_saveQuestion} from "../../_DATA";
import {fetchUsers} from "../login/ActionCreators";
import {fetchQuestions} from "../home/ActionCreators";

export const addQuestion = (question) => {
    return async (dispatch) => {
        await _saveQuestion(question);
        await dispatch(fetchUsers());
        await dispatch(fetchQuestions())
    }
};