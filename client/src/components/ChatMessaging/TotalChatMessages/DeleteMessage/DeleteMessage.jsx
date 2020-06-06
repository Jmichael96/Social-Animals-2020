import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const DeleteMessage = ({ deleteChat, setModal, userId, chatId }) => {

    const onDeleteSubmit = () => {
        deleteChat(userId, chatId)
    }

    const configureModal = () => {
        setModal('Are you sure you want to delete this conversation?', 'Yes', onDeleteSubmit)
    }
    return (
        <Fragment>
            <button onClick={configureModal}>X</button>
        </Fragment>
    )
}

DeleteMessage.propTypes = {
    deleteChat: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    chatId: PropTypes.string.isRequired,
}
export default DeleteMessage;