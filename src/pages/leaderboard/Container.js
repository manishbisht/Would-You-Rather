import React from "react";
import {StyledTable, StyledHead, StyledHeadCell, StyledBody, StyledRow, StyledCell} from 'baseui/table';
import {Avatar} from "baseui/avatar";
import {useSelector} from "react-redux";

const LeaderboardContainer = () => {
    const login = useSelector(state => state.login);

    const renderTableBody = () => {
        const userList = login.users.data;
        return Object.keys(userList).sort((a, b) => (userList[b].questions.length + Object.keys(userList[b].answers).length) - (userList[a].questions.length + Object.keys(userList[a].answers).length)).map((userId) => {
            const userData = userList[userId];
            return (
                <StyledRow key={userId}>
                    <StyledCell>
                        <Avatar
                            name={userData.name}
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