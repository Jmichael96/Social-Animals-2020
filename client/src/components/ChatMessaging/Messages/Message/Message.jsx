import React from 'react';
import './message.css';
import ReactEmoji from 'react-emoji';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../../utils/isEmpty';

const Message = ({ auth, message: { message, username, userId }}) => {
    const checkUser = () => {
        if (!auth.loading && !isEmpty(auth.user)) {
            if (userId.toString() === auth.user._id) {
                return (
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">{username}</p>
                        <div className="messageBox backgroundBlue">
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
    auth: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Message);