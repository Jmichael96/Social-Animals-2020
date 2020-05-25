import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../../store/actions/post';

const AddComment = ({ postId, addComment }) => {
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
    postId: PropTypes.any
}

export default connect(null, { addComment })(AddComment);