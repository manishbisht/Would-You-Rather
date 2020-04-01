import React, {useState } from "react";
import { useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {colors} from 'baseui/tokens';
import {Avatar} from "baseui/avatar";
import { RadioGroup, Radio } from "baseui/radio";
import {Button, KIND} from "baseui/button";
import Loader from "../../components/Loader";
import {saveQuestionAnswer} from "./ActionCreators";
import NotFound from "../../components/NotFound";

const QuestionContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [error, setError] = useState("");
    const login = useSelector(state => state.login);
    const home = useSelector(state => state.home);
    const params = useParams();
    const dispatch = useDispatch();
    const { questionId } = params;
    const questionData = home.questions.data[questionId];
    const selectedAnswer = login.currentUser.answers[questionId];

    const renderPollData = () => {
        const totalVotesCount = questionData['optionOne'].votes.length + questionData['optionTwo'].votes.length
        return (
            <div>
                <h2>{`You have selected "${questionData[selectedAnswer].text}" for this poll`}</h2>
                <h3>Option 1: {questionData['optionOne'].text}</h3>
                <h4>{`${questionData['optionOne'].votes.length} people voted for this option`}</h4>
                <h4>{`${((questionData['optionOne'].votes.length / totalVotesCount) * 100).toFixed(2)} % of people voted for this option`}</h4>
                <h3>Option 2: {questionData['optionTwo'].text}</h3>
                <h4>{`${questionData['optionTwo'].votes.length} people voted for this option`}</h4>
                <h4>{`${((questionData['optionTwo'].votes.length / totalVotesCount) * 100).toFixed(2)} % of people voted for this option`}</h4>
            </div>
        );
    };

    const submitForm = async () => {
        if (selectedOption && login.currentUser) {
            setIsLoading(true);
            const data = {
                authedUser: login.currentUser.id,
                qid: questionId,
                answer: selectedOption
            };
            await dispatch(saveQuestionAnswer(data));
            setIsLoading(false);
        } else {
            setError("Please select any one option")
        }
    };

    const clearForm = () => {
        setSelectedOption(null);
        setError("");
    };

    const renderPollSubmitForm  = () => {
        return (
            <div>
                <h1 style={{marginBottom: 0}}>Would You Rather ?</h1>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h4 style={{marginRight: 10}}>{`Poll created by `}</h4>
                    <Avatar
                        name={questionData.author}
                        size="scale800"
                        src={`https://api.adorable.io/avatars/285/${questionData.author}.png`}
                    />
                </div>
                <h5 style={{marginTop: 0}}>{`at ${new Date(questionData.timestamp)}`}</h5>
                <RadioGroup
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}
                    name="pollType"
                >
                    <Radio value="optionOne">{questionData.optionOne.text}</Radio>
                    <Radio value="optionTwo">{questionData.optionTwo.text}</Radio>
                </RadioGroup>
                <div style={{marginTop: 15, minHeight: 18, color: colors.red400}}>{error}</div>
                <div style={{display: 'flex', margin: "15px 0"}}>
                    <div style={{marginRight: 20}}><Button kind={KIND.secondary} onClick={clearForm}>Clear</Button></div>
                    <div style={{marginRight: 20}}><Button onClick={submitForm}>Add</Button></div>
                </div>
            </div>
        )
    };

    if (isLoading) {
        return <Loader/>
    }

    if (!questionData) {
        return <NotFound />
    }

    return (
        <div style={{margin: '0 17px'}}>
            {selectedAnswer ? renderPollData() : renderPollSubmitForm()}
        </div>
    );
};

export default QuestionContainer