import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateComment } from '../../../../store/actions/post';

const UpdateComment = ({ updateComment, auth: { isAuthenticated, loading, user }, textContent, postId, commentId, commentAuthorId }) => {
    const [text, setText] = useState(textContent);

    useEffect(() => {
        setText(textContent)
    }, [textContent])

    // on enter key press it will initiate the form submission
    const enterKeySubmit = (e) => {
        if (isAuthenticated) {
            if (e.keyCode === 13 || e.code === 'Enter' || e.code === 'NumpadEnter') {
                if (!loading && commentAuthorId === user._id) {
                    const formData = {
                        text
                    }
                    updateComment(commentId, formData);
                }
                else {
                    console.log('You are not authorized to update this comment!');
                }
            }
        }
    }

    return (
        <input
            type="text"
            name="text"
            id="commentText"
            className="form-control"
            value={text}
            onKeyDown={(e) => enterKeySubmit(e)}
            onChange={(e) => setText(e.target.value)}
        />
    )
}
UpdateComment.propTypes = {
    updateComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.any,
    commentId: PropTypes.any,
    commentAuthorId: PropTypes.any,
};

export default connect(null, { updateComment })(UpdateComment);