import {_saveQuestionAnswer} from "../../_DATA";
import {fetchUsers} from "../login/ActionCreators";
import {fetchQuestions} from "../home/ActionCreators";

export const saveQuestionAnswer = (data) => {
    return async (dispatch) => {
        await _saveQuestionAnswer(data);
        await dispatch(fetchUsers());
        await dispatch(fetchQuestions())
    }
};