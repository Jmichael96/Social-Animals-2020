import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../../store/actions/post';
import isEmpty from '../../../../utils/isEmpty';
import { notifyUser } from '../../../../store/actions/notification';

const AddComment = ({ postId, addComment, notifyUser, notifiedUser, userId, username, notificationType, profilePic }) => {
    const [text, setText] = useState('');

    const onCommentSubmit = (e) => {
        e.preventDefault();
        if (!text || text === '') {
            return;
        }
        const id = postId;
        const formData = {
            text
        }
        addComment(id, formData);
        let notifyObj = {
            notifiedUser: notifiedUser,
            userId: userId,
            username: username,
            notificationType: notificationType,
            profilePic: profilePic,
            link: `/my_profile`,
            type: 'nots'
        }
        notifyUser(notifyObj);
    }

    // on enter key press it will initiate the form submission
    const enterKeySubmit = (e) => {
        if (e.keyCode === 13 || e.code === 'Enter' || e.code === 'NumpadEnter') {
            onCommentSubmit(e);
            resetInput();
        }
    }

    // resetting input field to an empty string
    const resetInput = () => {
        setText('');
    }

    return (
        <Fragment>
                <input
                    type="text"
                    name="text"
                    id="commentText"
                    className="form-control"
                    value={text}
                    placeholder="Comment..."
                    onKeyDown={(e) => enterKeySubmit(e)}
                    onChange={(e) => setText(e.target.value)}
                />
        </Fragment>
    )
}

AddComment.propTypes = {
    addComment: PropTypes.func.isRequired,
    notifyUser: PropTypes.func.isRequired,
    postId: PropTypes.any,
    notifiedUser: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    notificationType: PropTypes.string.isRequired,
    profilePic: PropTypes.string.isRequired,
}

export default connect(null, { addComment, notifyUser })(AddComment);