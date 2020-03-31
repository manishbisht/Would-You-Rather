import React from "react";
import {Select} from "baseui/select";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    SIZE,
    ROLE
} from "baseui/modal";

const LoginContainer = (props) => {
    const [value, setValue] = React.useState([]);

    const userOptions = () => {
        const { usersData } = props;
        return Object.keys(usersData).map((userId) => {
            return {
                label: usersData[userId].name,
                id: userId
            }
        })
    };

    const doLogin = () => {
        const { usersData, handleLogin } = props;
        if (value.length === 1) {
            handleLogin(usersData[value[0].id])
        }
    };

    return (
        <Modal
            closeable={false}
            isOpen={props.show}
            animate
            autoFocus
            size={SIZE.default}
            role={ROLE.dialog}
            unstable_ModalBackdropScroll={true}
        >
            <ModalHeader>Please Login to Continue</ModalHeader>
            <ModalBody>
                <Select
                    options={userOptions()}
                    value={value}
                    placeholder="Select user to continue"
                    onChange={params => setValue(params.value)}
                />
            </ModalBody>
            <ModalFooter>
                <ModalButton onClick={doLogin}>Login</ModalButton>
            </ModalFooter>
        </Modal>
    );
};

export default LoginContainer;