import React, {useEffect} from "react";
import {StyledTable, StyledHead, StyledHeadCell, StyledBody, StyledRow, StyledCell} from 'baseui/table';
import {Avatar} from "baseui/avatar";
import {useDispatch, useSelector} from "react-redux";
import {fetchQuestions} from "../home/ActionCreators";

const LeaderboardContainer = () => {
    const login = useSelector(state => state.login);
    const home = useSelector(state => state.home);
    const dispatch = useDispatch();

    useEffect(() => {
        if (home.questions.isFetching) {
            dispatch(fetchQuestions())
        }
    }, [dispatch, home]);

    const renderTableBody = () => {
        const userList = login.users.data;
        return Object.keys(userList).sort((a, b) => (userList[b].questions.length + Object.keys(userList[b].answers).length) - (userList[a].questions.length + Object.keys(userList[a].answers).length)).map((userId) => {
            const userData = userList[userId];
            return (
                <StyledRow key={userId}>
                    <StyledCell>
                        <Avatar
                            name="Jane Doe"
                            size="scale1200"
                            src={`https://api.adorable.io/avatars/285/${userData.name}.png`}
                        />
                    </StyledCell>
                    <StyledCell>{userData.name}</StyledCell>
                    <StyledCell>{userData.questions.length}</StyledCell>
                    <StyledCell>{Object.keys(userData.answers).length}</StyledCell>
                </StyledRow>
            )
        });
    };

    return (
        <div style={{margin: '0 17px'}}>
            <StyledTable>
                <StyledHead>
                    <StyledHeadCell></StyledHeadCell>
                    <StyledHeadCell>Name</StyledHeadCell>
                    <StyledHeadCell>Questions Asked</StyledHeadCell>
                    <StyledHeadCell>Questions Answered</StyledHeadCell>
                </StyledHead>
                <StyledBody>{renderTableBody()}</StyledBody>
            </StyledTable>
        </div>
    )
}

export default LeaderboardContainer