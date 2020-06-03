import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../../utils/isEmpty';
import { Link } from 'react-router-dom';
import { fetchMessages } from '../../../store/actions/user'

const TotalChatMessages = ({ fetchMessages, auth, chat: { loading, allMessages } }) => {

    useEffect(() => {
        if (!auth.loading && !isEmpty(auth.user)) {
            fetchMessages();
        }
    }, [fetchMessages, auth])

    const renderMessages = () => {
        if (!loading && !isEmpty(allMessages)) {
            return Object.values(allMessages).map((msg) => {
                let users = msg.users;
                return Object.values(users).map((user) => {
                    if (user.userId.toString() !== auth.user._id) {
                        return (
                            <div key={msg._id}>
                                <Link to={`/chat?room=${msg.room}`}>
                                    <h4>{user.username}</h4>
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
    fetchMessages: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    chat: state.chat
});

export default connect(mapStateToProps, { fetchMessages })(TotalChatMessages);