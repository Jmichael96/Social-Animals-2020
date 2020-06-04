import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../../utils/isEmpty';
import { Link } from 'react-router-dom';
import { fetchMessages } from '../../../store/actions/user'

const TotalChatMessages = ({ auth: { loading, user, isAuthenticated} }) => {
    const [messages, setMessages] = useState();
    useEffect(() => {
        if (!loading && !isEmpty(user)) {
           setMessages(user.messages);
        }
    }, [loading, user])

    const renderMessages = () => {
        if (!loading && !isEmpty(messages)) {
            return Object.values(messages).map((msg) => {
                let msgUsers = msg.users;
                return Object.values(msgUsers).map((usr) => {
                    if (user._id !== usr.userId) {
                        return (
                            <div key={msg._id}>
                                <Link to={`/chat?roomid=${msg.createdId}`}>
                                    <h4>{usr.username}</h4>
                                </Link>
                            </div>
                        )
                    }
                })
            })
        }
    }

    return (
        <div>
            {renderMessages()}
        </div>
    )
}

TotalChatMessages.propTypes = {
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    chat: state.chat
});

export default connect(mapStateToProps, { fetchMessages })(TotalChatMessages);