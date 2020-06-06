import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../../utils/isEmpty';
import { Link } from 'react-router-dom';
import { fetchMessages, deleteChat } from '../../../store/actions/user'
import Wrapper from '../../Layout/Wrapper/Wrapper';
import { setModal } from '../../../store/actions/modal';
import DeleteMessage from './DeleteMessage/DeleteMessage';

const TotalChatMessages = ({ auth: { loading, user, isAuthenticated }, deleteChat, setModal }) => {
    const [messages, setMessages] = useState();
    useEffect(() => {
        if (!loading && !isEmpty(user)) {
            setMessages(user.messages);
        }
    }, [loading, user]);

    const onDeleteSubmit = () => {
        let userId =
            deleteChat()
    }

    const configureModal = () => {
        setModal('Are you sure you want to delete this conversation?', 'Yes', onDeleteSubmit)
    }
    const renderMessages = () => {
        if (!loading && !isEmpty(messages)) {
            return Object.values(messages).map((msg) => {
                let msgUsers = msg.users;
                return Object.values(msgUsers).map((usr) => {
                    if (user._id !== usr.userId) {
                        return (
                            <div key={msg._id}>
                                <Wrapper>
                                    <Link to={`/chat?roomid=${msg.createdId}`}>
                                        <h4>{usr.username}</h4>
                                    </Link>
                                    <DeleteMessage deleteChat={deleteChat} setModal={setModal} userId={user._id} chatId={msg._id} />
                                </Wrapper>
                            </div>
                        )
                    }
                })
            })
        }
    }

    return !loading && isEmpty(messages) ? (<div>You have no new messages</div>) : (
        <div>
            {renderMessages()}
        </div>
    )
}

TotalChatMessages.propTypes = {
    deleteChat: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    chat: state.chat
});

export default connect(mapStateToProps, { fetchMessages, deleteChat, setModal })(TotalChatMessages);