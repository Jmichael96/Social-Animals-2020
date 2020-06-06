import React from 'react';
import './message.css';
import ReactEmoji from 'react-emoji';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../../utils/isEmpty';
import { deleteMessage } from '../../../../store/actions/chat';
import { setModal } from '../../../../store/actions/modal';

const Message = ({ auth, message: { _id, messageId, message, username, userId }, setModal, deleteMessage, socket, roomId, users }) => {

    const onDeleteSubmit = () => {
        if (!auth.loading && !isEmpty(auth.user)) {
            
            let deleteObj = {
                userId1: users[0].userId,
                userId2: users[1].userId,
                roomId: roomId,
                msgId: messageId
            }
            deleteMessage(socket, deleteObj);
        }
    }

    const configureModal = () => {
        setModal('Are you sure you want to delete your message?', 'Yes', onDeleteSubmit);
    }

    const checkUser = () => {
        if (!message) {
            return null;
        }
        if (!auth.loading && !isEmpty(auth.user)) {
            if (userId.toString() === auth.user._id) {
                return (
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">{username}</p>
                        <div className="messageBox backgroundBlue" onClick={configureModal}>
                            <p className="messageText colorWhite">{ReactEmoji.emojify(message)}</p>
                        </div>
                    </div>
                );
            }
            return (
                <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{ReactEmoji.emojify(message)}</p>
                    </div>
                    <p className="sentText pl-10 ">{username}</p>
                </div>
            );
        } else {
            return null;
        }
    }
    return (
        <div>
            {checkUser()}
        </div>
    );
}

Message.propTypes = {
    deleteMessage: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    roomId: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    socket: PropTypes.any,
}
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteMessage, setModal })(Message);