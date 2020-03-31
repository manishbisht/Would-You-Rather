import React , { useState }from 'react'
import { useSelector } from "react-redux";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import {useHistory} from "react-router-dom";

const HomePageContainer = () => {
    const history = useHistory();
    const login = useSelector(state => state.login);
    const home = useSelector(state => state.home);
    const [value, setValue] = useState("2");

    const renderQuestions = (isAnswered = false) => {
        const questions = Object.keys(home.questions.data).filter((questionKey) => isAnswered ? login.currentUser.answers[questionKey] : !login.currentUser.answers[questionKey]);
        const sortedByTimeQuestionList = questions.sort((a, b) => home.questions.data[b].timestamp - home.questions.data[a].timestamp );

        return sortedByTimeQuestionList.map((questionKey) => {
            const questionData = home.questions.data[questionKey];
            return (
                <Card key={questionKey} overrides={{
                    Root: { style: { marginBottom: "15px" } }
                }}>
                    <StyledBody>
                        {`This poll was created by ${questionData.author} on ${new Date(questionData.timestamp)}`}
                    </StyledBody>
                    <StyledAction>
                        <Button
                            overrides={{
                                BaseButton: { style: { width: "100%" } }
                            }}
                            onClick={() => history.push(`/questions/${questionKey}`)}
                        >
                            View Poll Details
                        </Button>
                    </StyledAction>
                </Card>
            );
        });
    };

    return (
        <div style={{margin: '0 17px'}}>
            <RadioGroup
                value={value}
                onChange={e => setValue(e.target.value)}
                name="pollType"
                align={ALIGN.horizontal}
            >
                <Radio value="1">Show Answered Polls</Radio>
                <Radio value="2">Show Un Answered Polls</Radio>
            </RadioGroup>
            <div style={{marginTop: 15}}>{renderQuestions(value === "1")}</div>
        </div>
    )
};

export default HomePageContainer;