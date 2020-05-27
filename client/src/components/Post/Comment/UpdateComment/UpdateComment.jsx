import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateComment } from '../../../../store/actions/post';
import {
    MDBContainer,
    MDBRow,
    MDBCol
} from 'mdbreact';
const UpdateComment = ({ updateComment, auth: { isAuthenticated, loading, user }, textContent, postId, commentId, commentAuthorId }) => {
    const [text, setText] = useState(textContent);

    useEffect(() => {
        setText(textContent)
    }, [textContent])

    // on enter key press it will initiate the form submission
    const enterKeySubmit = (e) => {
        if (!loading && isAuthenticated) {
            if (e.keyCode === 13 || e.code === 'Enter' || e.code === 'NumpadEnter') {
                if (!loading && commentAuthorId === user._id) {
                    e.preventDefault();
                    const formData = {
                        text
                    }
                    updateComment(commentId, formData);
                }
                else {
                    return;
                }
            }
        }
    }

    // on button submit initiate update function
    const onSubmit = (e) => {
        e.preventDefault();
        if (!loading && isAuthenticated) {
            if (!loading && commentAuthorId === user._id) {
                const formData = {
                    text
                };
                updateComment(commentId, formData);
            }
        }
    }
    return (
        <MDBContainer fluid>
            <MDBRow>
                <MDBCol size="10" className="p-0">
                    <input
                        type="text"
                        name="text"
                        id="commentText"
                        className="form-control"
                        value={text}
                        onKeyDown={(e) => enterKeySubmit(e)}
                        onChange={(e) => setText(e.target.value)}
                    />
                </MDBCol>
                <MDBCol size="2" className="p-0">
                    <button type="button" onClick={onSubmit} style={{height: '100%'}}>Submit</button>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
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