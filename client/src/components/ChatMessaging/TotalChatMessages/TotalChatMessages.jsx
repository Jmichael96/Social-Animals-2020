import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from "socket.io-client";
import { fetchAllChatMessages } from '../../../store/actions/chat';
import isEmpty from '../../../utils/isEmpty';
import { Link } from 'react-router-dom';

let socket = io.connect('http://localhost:8080');

const TotalChatMessages = ({ auth, fetchAllChatMessages, chat: { loading, allMessages } }) => {
    const [messageData, setMessageData] = useState([]);

    useEffect(() => {
        let isMounted = true;
        if (!auth.loading && !isEmpty(auth.user)) {
            fetchAllChatMessages(auth.user._id, socket);

            // socket.on('fetch-chat-messages', (res) => {
            //     setMessageData((msgDatas) => [...msgDatas, ...res.messages]);
            // })

        }

        return;
    }, [fetchAllChatMessages, auth])

    const renderMessages = () => {
        if (!loading && !isEmpty(allMessages)) {
            return Object.values(allMessages).map((msg) => {
                let str = msg.room.split(',')[1];
                return (
                    <div key={msg._id}>
                        <Link to={`/chat?room=${msg.room}`}>
                            <h4>{str}</h4>
                        </Link>
                    </div>
                )
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
    fetchAllChatMessages: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    chat: state.chat
});

export default connect(mapStateToProps, { fetchAllChatMessages })(TotalChatMessages);