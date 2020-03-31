import React, {useState} from "react";
import {Input} from "baseui/input";
import {Button, KIND} from "baseui/button";
import {colors} from 'baseui/tokens';
import {useDispatch, useSelector} from "react-redux";
import {addQuestion} from "./ActionCreators";
import {useHistory} from "react-router-dom";
import Loader from "../../components/Loader";

const AddQuestionContainer = () => {
    const login = useSelector(state => state.login);
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const clearForm = () => {
        setAnswer1("");
        setAnswer2("");
        setError("");
    };

    const submitForm = async () => {
        if (answer1 && answer2 && login.currentUser) {
            setIsLoading(true);
            const question = {
                optionOneText: answer1,
                optionTwoText: answer2,
                author: login.currentUser.id
            };
            await dispatch(addQuestion(question));
            setIsLoading(false);
            history.push('/')
        } else {
            setError("Both the options are required")
        }
    };

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div style={{margin: '0 17px'}}>
            <h1>Would You Rather ?</h1>
            <h2>Option 1</h2>
            <Input
                value={answer1}
                onChange={e => setAnswer1(e.target.value)}
                placeholder="Enter Option 1"
            />
            <h2>Option 2:</h2>
            <Input
                value={answer2}
                onChange={e => setAnswer2(e.target.value)}
                placeholder="Enter Option 2"
            />
            <div style={{marginTop: 15, minHeight: 18, color: colors.red400}}>{error}</div>
            <div style={{display: 'flex', margin: "15px 0"}}>
                <div style={{marginRight: 20}}><Button kind={KIND.secondary} onClick={clearForm}>Clear</Button></div>
                <div style={{marginRight: 20}}><Button onClick={submitForm}>Add</Button></div>
            </div>
        </div>
    )
}

export default AddQuestionContainer